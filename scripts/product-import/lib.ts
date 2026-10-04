import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { getPayload, type Payload } from 'payload'
import configPromise from '../../src/payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const DOCS_DIR = path.resolve(__dirname, '../../docs')
export const CONTENT_DIR = path.join(DOCS_DIR, 'product-contents-1')
export const IMAGES_DIR = path.join(DOCS_DIR, 'product-images')

export const BRAND = 'Veracue Peptides'

// Every meta title ends with exactly one "| Veracue Peptides" (source files use "| Veracue").
export function brandTitle(t: string): string {
  const base = t.replace(/\s*\|\s*Veracue(?:\s+Peptides)?\s*$/i, '').trim()
  const out = `${base} | ${BRAND}`
  if (out.length > 60) console.warn(`  warning: seoTitle is ${out.length} chars (>60): ${out}`)
  return out
}

export async function boot(): Promise<Payload> {
  return getPayload({ config: configPromise })
}

export function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
}

// ---------- HTML builders (all text is escaped) ----------

export function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export type LinkSpec = { phrase: string; href: string }

// Escapes text, then wraps the first occurrence of each phrase in an internal link.
// Throws if a phrase is not found so a link is never silently dropped.
export function withLinks(text: string, links: LinkSpec[] = []): string {
  let out = esc(text)
  for (const l of links) {
    const ep = esc(l.phrase)
    const i = out.indexOf(ep)
    if (i < 0) throw new Error(`Link phrase "${l.phrase}" not found in: ${text.slice(0, 80)}...`)
    out = out.slice(0, i) + `<a href="${l.href}">${ep}</a>` + out.slice(i + ep.length)
  }
  return out
}

export const refMarks = (ids?: number[]) => (ids && ids.length ? ` <sup>[${ids.join(', ')}]</sup>` : '')

export const h4 = (t: string) => `<h4>${esc(t)}</h4>`
export const h5 = (t: string) => `<h5>${esc(t)}</h5>`

export function p(text: string, opts: { links?: LinkSpec[]; refs?: number[] } = {}): string {
  return `<p>${withLinks(text, opts.links)}${refMarks(opts.refs)}</p>`
}

export const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

export function kvTable(rows: string[][]): string {
  return `<table><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
}

// Wrapped so wide tables scroll sideways on phones instead of breaking the layout.
export function table(columns: string[], rows: string[][]): string {
  const head = `<thead><tr>${columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>`
  const body = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>`
  return `<div style="overflow-x:auto"><table>${head}${body}</table></div>`
}

// ---------- Images ----------

// Source JPGs are 3072x4096 (~2.9 MB). The storefront serves images unoptimized, so convert to a
// web-sized WebP (matches the existing "Product Images/*.webp" convention) before upload.
export async function toWebp(srcFile: string, outName: string) {
  const data = await sharp(path.join(IMAGES_DIR, srcFile))
    .rotate()
    .resize({ width: 1200, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()
  return { data, mimetype: 'image/webp', name: outName, size: data.length }
}

export async function getOrCreateMedia(payload: Payload, srcFile: string, outName: string, alt: string) {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: outName } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0]
  const file = await toWebp(srcFile, outName)
  console.log(`  uploading ${outName} (${Math.round(file.size / 1024)} KB)`)
  return payload.create({ collection: 'media', data: { alt }, file })
}

// ---------- Guards ----------

const PLACEHOLDER = /\[(?:VERIFY|ADD|INSERT|CONFIRM|TODO|TBD|PLACEHOLDER|FILL|PENDING)[^\]]{0,80}\]|\bTODO\b|\bTBD\b|undefined|\[object Object\]/i

// Research-use-only policy: no human trials, clinical data, weight-loss or disease language,
// approval/regulatory framing, weight-adjacent physiology, or dosing content on any product page.
const RUO_BANNED: [RegExp, string][] = [
  [/weight[\s-]*loss|lose weight|fat[\s-]*loss|slimming/i, 'weight-loss term'],
  [/obes|overweight|diabet|hba1c|glyc[a]?emic/i, 'disease or indication term'],
  [/clinical|phase\s*(?:[123]|i{1,3})\b|\btrials?\b|triumph|transcend|patients?|participants?|volunteers?/i, 'human trial term'],
  [/adverse|side[\s-]*effects?|tolerab/i, 'safety or adverse-event term'],
  [/investigational|\bapproved\b|\bapproval\b|regulator/i, 'approval or regulatory framing'],
  [/appetite|satiety|body weight|body mass|energy intake|energy expenditure|gastric emptying/i, 'weight-adjacent physiology'],
  [/\bdos(?:e|es|ed|age|ing)\b/i, 'dosing term'],
]
// The one allowed dosing mention: stating that no dosing guidance is provided.
const DOSING_OK = /(?:does not provide|not provide|no|without)\s+(?:human\s+)?dos(?:e|ing|age)\b/gi

// Fails loudly before anything is written if the payload breaks a content rule.
export function assertClean(data: unknown, label: string, opts: { forbidNames?: RegExp[] } = {}) {
  const problems: string[] = []
  const walk = (v: unknown, where: string) => {
    if (typeof v === 'string') {
      if (v.includes('—')) problems.push(`${where}: contains an em dash`)
      if (PLACEHOLDER.test(v)) problems.push(`${where}: contains a placeholder token`)
      if (/helix\s*bio/i.test(v)) problems.push(`${where}: mentions Helix Bio`)
      // No reference lists, citation markers or off-site links inside product copy.
      if (/<sup>\s*\[\d|Sources:\s*\[|>\s*References\s*</i.test(v)) problems.push(`${where}: contains references or citation markers`)
      if (/href="https?:\/\//i.test(v)) problems.push(`${where}: contains an external link`)
      const text = v.replace(DOSING_OK, '')
      for (const [re, why] of RUO_BANNED) {
        const m = text.match(re)
        if (m) problems.push(`${where}: ${why} ("${m[0]}")`)
      }
      for (const re of opts.forbidNames || []) {
        const m = v.match(re)
        if (m) problems.push(`${where}: forbidden name ("${m[0]}")`)
      }
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`))
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${where}.${k}`)
  }
  walk(data, label)
  if (problems.length) throw new Error('Content check failed:\n  ' + problems.join('\n  '))
}

export async function categoryIds(payload: Payload, slugs: string[]) {
  const res = await payload.find({ collection: 'categories', limit: 50 })
  return slugs.map((s) => {
    const c = res.docs.find((d: any) => d.slug === s)
    if (!c) throw new Error(`Category "${s}" not found`)
    return c.id
  })
}

// ---------- Shared product runner ----------

export type ProductDef = {
  name: string // no strength in the name
  slug: string
  legacySlugs?: string[] // earlier slugs of the same product, updated in place
  categorySlugs: string[] // existing Payload category slugs, or [] when none fits
  skuCode: string // short code, SKU = CODE-STRENGTH e.g. GLP3RTA-10MG
  weightKg?: number
  imageLabel: string // label text used for media filenames and alt text, e.g. "GLP-3RTA"
  variants: { strength: string; image: string; price?: number; sku?: string }[] // image = file in docs/product-images
  seoTitle: string // brand suffix is added or normalised automatically
  seoDescription: string
  description: string // short plain text shown in the page hero
  tabs: { details: string; research: string; quality: string; compliance: string }
  faqs: { question: string; answer: string }[]
  forbidNames?: RegExp[]
}

const dashed = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

// Deterministic placeholder price so reruns do not change values. The owner supplies real prices later.
export function placeholderPrice(slug: string, index: number): number {
  let h = 0
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 97
  return 35 + (h % 30) + index * 30
}

export async function runProduct(def: ProductDef) {
  const seoTitle = brandTitle(def.seoTitle)

  const errors: string[] = []
  if (/\d\s*(mg|iu|ml)\b/i.test(def.name)) errors.push('product name must not contain a strength')
  if (def.seoDescription.length < 120 || def.seoDescription.length > 155) errors.push(`meta description is ${def.seoDescription.length} chars (want 120-155)`)
  if (!/research use only|laboratory research/i.test(def.seoDescription)) errors.push('meta description must say research use only')
  if (def.faqs.length < 6) errors.push(`only ${def.faqs.length} FAQs (want at least 6)`)
  for (const [k, v] of Object.entries(def.tabs)) if (v.trim().length < 200) errors.push(`tab "${k}" is nearly empty`)
  for (const v of def.variants) {
    try { fs.accessSync(path.join(IMAGES_DIR, v.image)) } catch { errors.push(`image file missing: ${v.image}`) }
  }
  if (!def.variants.length) errors.push('no variants')
  // Descriptions must read like product copy: fact-led, not article-style or templated.
  const words = def.description.trim().split(/\s+/).length
  if (words < 60 || words > 110) errors.push(`description is ${words} words (want 60-110)`)
  const first = def.name.split(/[\s/]/)[0].toLowerCase()
  if (!def.description.toLowerCase().includes(first)) errors.push(`description should mention the product name ("${first}")`)
  for (const [label, text] of [['description', def.description], ['seoDescription', def.seoDescription]] as const) {
    if (/\bthis (page|guide|article|section)\b|\bmeet\b|\bthis listing covers\b/i.test(text)) errors.push(`${label} reads like an article (\"this page/guide\", \"meet\")`)
  }
  if (/with lot documentation available on request/i.test(def.description)) errors.push('description reuses the shared "lot documentation available on request" tail')
  if (errors.length) throw new Error('Product check failed:\n  ' + errors.join('\n  '))

  assertClean(
    { name: def.name, slug: def.slug, description: def.description, seoTitle, seoDescription: def.seoDescription, tabs: def.tabs, faqs: def.faqs },
    def.slug,
    { forbidNames: def.forbidNames },
  )

  if (process.argv.includes('--dry')) {
    console.log(
      `content OK for ${def.slug}. tab chars:`,
      Object.fromEntries(Object.entries(def.tabs).map(([k, v]) => [k, v.length])),
      `| FAQs ${def.faqs.length} | title ${seoTitle.length} | meta ${def.seoDescription.length} | variants ${def.variants.map((v) => v.strength).join(', ')}`,
    )
    if (process.env.DRY_JSON) {
      fs.writeFileSync(process.env.DRY_JSON, JSON.stringify({ slug: def.slug, name: def.name, seoTitle, seoDescription: def.seoDescription, description: def.description, faqs: def.faqs, tabs: def.tabs, variants: def.variants.map((v) => v.strength) }, null, 1))
    }
    if (process.env.DRY_OUT) {
      fs.writeFileSync(process.env.DRY_OUT, Object.entries(def.tabs).map(([k, v]) => `<h1>${k}</h1>${v}`).join('\n'))
    }
    process.exit(0)
  }

  const payload = await boot()
  const cats = def.categorySlugs.length ? await categoryIds(payload, def.categorySlugs) : []

  console.log(`Preparing images for ${def.slug}...`)
  const label = dashed(def.imageLabel)
  // Spray-format listings get spray-labeled media (filename and alt text), vial-format listings keep "vial".
  const container = /spray/i.test(def.name) || /spray/i.test(def.slug) ? 'spray' : 'vial'
  const media: any[] = []
  for (const v of def.variants) {
    const pretty = v.strength.replace(/(\d)\s*(mg|iu|ml)\b/i, '$1 $2')
    media.push(await getOrCreateMedia(payload, v.image, `veracue-${label}-${compact(v.strength)}-${container}.webp`, `Veracue ${def.imageLabel} ${pretty} research ${container}`))
  }

  const data: any = {
    name: def.name,
    slug: def.slug,
    description: def.description,
    seoTitle,
    seoDescription: def.seoDescription,
    categories: cats,
    images: [{ image: media[0].id }],
    price: def.variants[0].price ?? placeholderPrice(def.slug, 0),
    stock: 100,
    weight: def.weightKg ?? 0.05,
    hasVariants: true,
    variants: def.variants.map((v, i) => ({
      sku: v.sku ?? `${def.skuCode}-${v.strength.toUpperCase().replace(/[^A-Z0-9]+/g, '')}`,
      isKit: false,
      images: [{ image: media[i].id }],
      price: v.price ?? placeholderPrice(def.slug, i),
      stock: 100,
      options: [{ key: 'Strength', value: v.strength }],
    })),
    productDetailsTitle: 'Product Details',
    productDetailsDescription: def.tabs.details,
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: def.tabs.research,
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: def.tabs.quality,
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: def.tabs.compliance,
    faqs: def.faqs,
    status: 'active',
    isVisible: true,
    isBestSeller: false,
  }

  const slugs = [def.slug, ...(def.legacySlugs || [])]
  const found = await payload.find({ collection: 'products', where: { or: slugs.map((s) => ({ slug: { equals: s } })) }, limit: 1, depth: 0 })
  if (found.docs[0]) {
    await payload.update({ collection: 'products', id: found.docs[0].id, data })
    console.log(`Updated product id ${found.docs[0].id} -> /product/${def.slug}`)
  } else {
    const created = await payload.create({ collection: 'products', data })
    console.log(`Created product id ${created.id} -> /product/${def.slug}`)
  }
  process.exit(0)
}
