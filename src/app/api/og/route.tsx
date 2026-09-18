import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    let title = searchParams.get('title') || 'Veracue Peptides'
    // Strip redundant brand name suffixes to keep text short and clean
    title = title
      .replace(/ \| Veracue Peptides/gi, '')
      .replace(/ \| Veracue/gi, '')
      .replace(/ \| HelixBioPeptides/gi, '')
      .replace(/ \| Helix Bio/gi, '')
      .trim()
    if (!title) title = 'Veracue Peptides'
    title = title.slice(0, 85)

    let description = searchParams.get('description') || 'HPLC Verified Research Peptides • 99%+ Laboratory Purity'
    description = description.slice(0, 150)

    const category = (searchParams.get('category') || 'RESEARCH GRADE BIOCHEMISTRY').slice(0, 45)

    // Load fonts synchronously from disk for instant, reliable rendering
    const fontsDir = path.join(process.cwd(), 'public/fonts')
    const sora700 = fs.readFileSync(path.join(fontsDir, 'sora-700.woff'))
    const sora400 = fs.readFileSync(path.join(fontsDir, 'sora-400.woff'))

    // Load original header logo as base64 data URI
    const logoBuf = fs.readFileSync(path.join(process.cwd(), 'public/veracue-images/logo-header.png'))
    const logoDataUri = `data:image/png;base64,${logoBuf.toString('base64')}`

    // Determine background image (normalizing .webp to .jpg for Satori compatibility)
    let rawBg = searchParams.get('bg') || searchParams.get('backgroundImage') || 'veracue-peptides-multi-vials-collection-flatlay.jpg'
    rawBg = rawBg.replace(/\.webp$/i, '.jpg').replace(/^\/?veracue-images\//, '')

    let bgDataUri = ''
    const localBgPath = path.join(process.cwd(), 'public/veracue-images', rawBg)
    if (fs.existsSync(localBgPath)) {
      const bgBuf = fs.readFileSync(localBgPath)
      bgDataUri = `data:image/jpeg;base64,${bgBuf.toString('base64')}`
    } else {
      // Fallback to default collection flatlay if specific file not found
      const fallbackPath = path.join(process.cwd(), 'public/veracue-images/veracue-peptides-multi-vials-collection-flatlay.jpg')
      const bgBuf = fs.readFileSync(fallbackPath)
      bgDataUri = `data:image/jpeg;base64,${bgBuf.toString('base64')}`
    }

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
          {/* Layer 1: Edge-to-edge Background Image (Vibrant & Clear) */}
          <img
            src={bgDataUri}
            alt="Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Layer 2: Directional Stone / Muted Sage (#b7b7a4) Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage:
                'linear-gradient(90deg, rgba(183, 183, 164, 0.95) 0%, rgba(183, 183, 164, 0.88) 45%, rgba(183, 183, 164, 0.25) 75%, transparent 100%)',
            }}
          />

          {/* Layer 3: Foreground Content */}
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
            {/* Top Header Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* Original Header Logo */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={logoDataUri}
                  alt="Veracue"
                  style={{ height: '44px', objectFit: 'contain' }}
                />
              </div>

              {/* Lab Certification Pill Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(32, 34, 28, 0.85)',
                  border: '1px solid rgba(237, 220, 210, 0.4)',
                  borderRadius: '9999px',
                  padding: '9px 20px',
                  color: '#fff1e6',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    backgroundColor: '#cb997e',
                    marginRight: '10px',
                  }}
                />
                <span>HPLC VERIFIED • 99%+ PURITY</span>
              </div>
            </div>

            {/* Middle Content: Category, Title, Description */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '720px',
                gap: '16px',
              }}
            >
              {/* Category Kicker */}
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

              {/* Title */}
              <h1
                style={{
                  color: '#20221c',
                  fontSize: title.length > 45 ? '48px' : title.length > 25 ? '54px' : '60px',
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p
                  style={{
                    color: '#383b32',
                    fontSize: '21px',
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Bottom Footer Bar */}
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
              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: 'rgba(32, 34, 28, 0.8)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff1e6',
                  }}
                >
                  Third-Party Tested
                </div>
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: 'rgba(32, 34, 28, 0.8)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#fff1e6',
                  }}
                >
                  Lyophilized Solid
                </div>
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
              </div>

              {/* Domain Pill Badge (Terracotta with White Text) */}
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
                veracuepeptides.com
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Sora',
            data: sora700,
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Sora',
            data: sora400,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
