import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { OG_WIDTH, ogHeightForAspect } from '@/lib/ogSize'

export const runtime = 'nodejs'

const IMAGES_DIR = path.join(process.cwd(), 'public/veracue-images')
// A generic Veracue research-grade vial. Its label carries no compound name, so it is accurate for any
// page of the catalog (the old default, a flat lay of vials, showed names the store does not sell).
const DEFAULT_BG = 'veracue-research-grade-molecular-helix.webp'
const SAFE_BG = /^[a-z0-9][a-z0-9._-]*$/i
const MAX_REMOTE_IMAGE_BYTES = 10 * 1024 * 1024

// Fonts and logo are read from disk once per server instance, not once per request.
let assetsPromise: Promise<{ sora700: Buffer; sora400: Buffer; logoDataUri: string }> | null = null
function loadAssets() {
  if (!assetsPromise) {
    assetsPromise = (async () => {
      const fontsDir = path.join(process.cwd(), 'public/fonts')
      const [sora700, sora400, logoBuf] = await Promise.all([
        fs.promises.readFile(path.join(fontsDir, 'sora-700.woff')),
        fs.promises.readFile(path.join(fontsDir, 'sora-400.woff')),
        fs.promises.readFile(path.join(IMAGES_DIR, 'logo-header.png')),
      ])
      return { sora700, sora400, logoDataUri: `data:image/png;base64,${logoBuf.toString('base64')}` }
    })().catch((err) => {
      assetsPromise = null
      throw err
    })
  }
  return assetsPromise
}

type Picture = { dataUri: string; width: number; height: number }

// Satori cannot read WebP, so every picture is converted to JPEG. Transparent areas are flattened onto
// the page background colour.
async function toJpegPicture(input: Buffer, width: number | undefined): Promise<Picture> {
  const pipeline = sharp(input).rotate().flatten({ background: '#f0efeb' })
  const { data, info } = await (width ? pipeline.resize({ width }) : pipeline)
    .jpeg({ quality: 84 })
    .toBuffer({ resolveWithObject: true })
  return { dataUri: `data:image/jpeg;base64,${data.toString('base64')}`, width: info.width, height: info.height }
}

// Only bare file names inside public/veracue-images are accepted (no path traversal). The .webp and .jpg
// spellings of a file are interchangeable here.
const localCache = new Map<string, Promise<Picture>>()
function resolveLocalFile(raw: string): string {
  const cleaned = path.basename(raw.replace(/^\/?veracue-images\//, ''))
  if (SAFE_BG.test(cleaned)) {
    const candidates = [cleaned, cleaned.replace(/\.webp$/i, '.jpg'), cleaned.replace(/\.jpe?g$/i, '.webp')]
    for (const name of candidates) {
      const candidate = path.join(IMAGES_DIR, name)
      if (fs.existsSync(candidate)) return candidate
    }
  }
  return path.join(IMAGES_DIR, DEFAULT_BG)
}
function loadLocalPicture(raw: string): Promise<Picture> {
  const file = resolveLocalFile(raw)
  let pending = localCache.get(file)
  if (!pending) {
    if (localCache.size > 24) localCache.clear()
    pending = fs.promises.readFile(file).then((buf) => toJpegPicture(buf, OG_WIDTH))
    pending.catch(() => localCache.delete(file))
    localCache.set(file, pending)
  }
  return pending
}

// A product image may only come from the store's own storage (Cloudflare R2 public hosts, the configured
// R2 domain, or this site), and only from its media folders. This route fetches the URL server-side, so
// an open "image=" parameter would let anyone make the server request arbitrary addresses.
const ALLOWED_PATH_PREFIXES = ['/Product Images/', '/Blog Images/', '/veracue-images/', '/assets/']
function hostOf(value?: string): string | null {
  try {
    return value ? new URL(value).hostname : null
  } catch {
    return null
  }
}
function isAllowedImageUrl(url: URL): boolean {
  if (url.protocol !== 'https:') return false
  const hostOk =
    url.hostname.endsWith('.r2.dev') ||
    url.hostname === hostOf(process.env.R2_PUBLIC_URL) ||
    url.hostname === hostOf(process.env.NEXT_PUBLIC_SERVER_URL)
  if (!hostOk) return false
  let pathname = url.pathname
  try {
    pathname = decodeURIComponent(pathname)
  } catch {
    return false
  }
  return ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

async function loadRemotePicture(raw: string): Promise<Picture | null> {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  if (!isAllowedImageUrl(url)) return null
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
    if (!res.ok) return null
    if (Number(res.headers.get('content-length') || 0) > MAX_REMOTE_IMAGE_BYTES) return null
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length > MAX_REMOTE_IMAGE_BYTES) return null
    return await toJpegPicture(buf, OG_WIDTH)
  } catch (err) {
    console.error('OG image: could not load product image', err)
    return null
  }
}

// Text is never cut mid-word. Real titles and descriptions are far below these limits, which exist only
// to bound the work for an absurdly long query string; when one is exceeded the text ends at a word.
function fitAtWord(text: string, max: number): string {
  if (text.length <= max) return text
  const head = text.slice(0, max + 1)
  const lastSpace = head.lastIndexOf(' ')
  return (lastSpace > 0 ? head.slice(0, lastSpace) : text.slice(0, max)).replace(/[\s,;:.\-]+$/, '')
}

const BRAND_SUFFIX = / \| Veracue( Peptides| Labs)?$/i

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Strip redundant brand name suffixes to keep text short and clean
    let title = (searchParams.get('title') || 'Veracue Labs').replace(BRAND_SUFFIX, '').trim()
    if (!title) title = 'Veracue Labs'
    title = fitAtWord(title, 160)

    const description = fitAtWord(
      (searchParams.get('description') || 'Research peptides for laboratory use only').trim(),
      300,
    )
    const category = fitAtWord((searchParams.get('category') || 'RESEARCH GRADE BIOCHEMISTRY').trim(), 60)

    const { sora700, sora400, logoDataUri } = await loadAssets()

    // Product pages pass the product's own photo (`image`); it is drawn at its own aspect ratio rather than
    // cropped into a fixed 1200x630 frame. Everything else gets the landscape card on a background photo.
    const requestedImage = searchParams.get('image')
    const productPicture = requestedImage ? await loadRemotePicture(requestedImage) : null

    const fonts = [
      { name: 'Sora', data: sora700, weight: 700 as const, style: 'normal' as const },
      { name: 'Sora', data: sora400, weight: 400 as const, style: 'normal' as const },
    ]
    const headers = { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' }

    if (productPicture) {
      const height = ogHeightForAspect(productPicture.width, productPicture.height)
      const titleSize = title.length > 48 ? 54 : title.length > 28 ? 62 : 70

      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              position: 'relative',
              backgroundColor: '#f0efeb',
              fontFamily: 'Sora',
            }}
          >
            <img
              src={productPicture.dataUri}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Darkening only the lower part keeps the product itself clear and the text readable */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage:
                  'linear-gradient(180deg, rgba(32, 34, 28, 0) 0%, rgba(32, 34, 28, 0) 58%, rgba(32, 34, 28, 0.86) 80%, rgba(32, 34, 28, 0.94) 100%)',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: '52px 60px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 241, 230, 0.94)',
                    borderRadius: '9999px',
                    padding: '12px 26px',
                  }}
                >
                  <img src={logoDataUri} alt="Veracue" style={{ height: '44px', objectFit: 'contain' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span
                  style={{
                    color: '#ddbea9',
                    fontSize: '20px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {category}
                </span>
                <h1
                  style={{
                    color: '#fff1e6',
                    fontSize: `${titleSize}px`,
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {title}
                </h1>
                {description && (
                  <p style={{ color: '#eddcd2', fontSize: '26px', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
                    {description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      backgroundColor: 'rgba(255, 241, 230, 0.14)',
                      border: '1px solid rgba(237, 220, 210, 0.45)',
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#ddbea9',
                    }}
                  >
                    For Research Use Only
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#cb997e',
                      borderRadius: '9999px',
                      padding: '11px 28px',
                      color: '#ffffff',
                      fontSize: '19px',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                    }}
                  >
                    veracuelabs.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        { width: OG_WIDTH, height, headers, fonts },
      )
    }

    // Landscape card. A portrait background (the default) sits in the right half so the vial stays visible
    // next to the text; a landscape one fills the card as before.
    const rawBg = searchParams.get('bg') || searchParams.get('backgroundImage') || DEFAULT_BG
    const bg = await loadLocalPicture(rawBg)
    const portraitBg = bg.height > bg.width

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative',
            backgroundColor: '#b7b7a4',
            fontFamily: 'Sora',
          }}
        >
          {/* Layer 1: Background photo */}
          <img
            src={bg.dataUri}
            alt=""
            style={
              portraitBg
                ? { position: 'absolute', top: 0, right: 0, width: '620px', height: '100%', objectFit: 'cover', objectPosition: 'center 38%' }
                : { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }
            }
          />

          {/* Layer 2: Stone / Muted Sage (#b7b7a4) gradient so the text always sits on a calm field */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: portraitBg
                ? 'linear-gradient(90deg, rgba(183, 183, 164, 1) 0%, rgba(183, 183, 164, 1) 49%, rgba(183, 183, 164, 0) 60%, transparent 100%)'
                : 'linear-gradient(90deg, rgba(183, 183, 164, 0.95) 0%, rgba(183, 183, 164, 0.88) 45%, rgba(183, 183, 164, 0.25) 75%, transparent 100%)',
            }}
          />

          {/* Layer 3: Foreground content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              padding: '56px 64px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoDataUri} alt="Veracue" style={{ height: '44px', objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: portraitBg ? '600px' : '720px', gap: '16px' }}>
              <span
                style={{
                  color: '#8c583f',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </span>
              <h1
                style={{
                  color: '#20221c',
                  fontSize: title.length > 45 ? '46px' : title.length > 25 ? '54px' : '60px',
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
              {description && (
                <p style={{ color: '#383b32', fontSize: '21px', fontWeight: 500, margin: 0, lineHeight: 1.45 }}>
                  {description}
                </p>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                borderTop: '1px solid rgba(32, 34, 28, 0.2)',
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'rgba(32, 34, 28, 0.8)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#cb997e',
                }}
              >
                For Research Use Only
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#cb997e',
                  borderRadius: '9999px',
                  padding: '9px 24px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                veracuelabs.com
              </div>
            </div>
          </div>
        </div>
      ),
      { width: OG_WIDTH, height: 630, headers, fonts },
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
