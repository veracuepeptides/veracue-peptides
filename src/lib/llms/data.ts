import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as Sentry from '@sentry/nextjs'
import {
  htmlToText,
  lexicalToText,
  oneLine,
  ruoSafeBlurb,
  ruoSafeCategoryName,
  scrubClinicalCodes,
  truncate,
  truncateBlock,
} from './text'

export type LlmsFaq = { question: string; answer: string }

export type LlmsProduct = {
  name: string
  url: string
  slug: string
  sku?: string
  category: string
  categories: string[]
  priceFrom?: number
  salePriceFrom?: number
  options: { label: string; price?: number }[]
  summary: string
  sections: { title: string; text: string }[]
  coa?: { purity?: number; batch?: string; analyzed?: string; fileUrl?: string }
  faqs: LlmsFaq[]
}

export type LlmsPost = {
  title: string
  url: string
  publishedAt?: string
  updatedAt?: string
  category?: string
  excerpt: string
  takeaways: string[]
  body: string
  faqs: LlmsFaq[]
  references: { citation: string; url: string }[]
}

export type LlmsSiteData = {
  baseUrl: string
  generatedOn: string
  authorName: string
  categories: { name: string; description: string; count: number }[]
  products: LlmsProduct[]
  posts: LlmsPost[]
}

const UNCATEGORIZED = 'Research Compounds'

function abs(baseUrl: string, url?: string | null): string | undefined {
  if (!url) return undefined
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}

function isoDate(d?: string | Date | null): string | undefined {
  if (!d) return undefined
  const date = new Date(d)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
}

function shortCategory(name?: string | null): string {
  if (!name) return ''
  const short = name.replace(/\s*Research\s+Compounds?\s*$/i, '').trim() || name
  return ruoSafeCategoryName(short)
}

function toProduct(baseUrl: string, doc: any): LlmsProduct {
  const cats: string[] = (doc.categories ?? [])
    .map((c: any) => (typeof c === 'object' && c ? shortCategory(c.name) : ''))
    .filter(Boolean)

  const variants: any[] = doc.hasVariants && Array.isArray(doc.variants) ? doc.variants : []
  const options = variants
    .map((v) => ({
      label: oneLine((v.options ?? []).map((o: any) => o?.value).filter(Boolean).join(' / ')),
      price: typeof v.price === 'number' ? v.price : undefined,
    }))
    .filter((o) => o.label)

  const prices = [doc.price, ...variants.map((v) => v.price)].filter(
    (n): n is number => typeof n === 'number' && n > 0,
  )
  const salePrices = [doc.salePrice, ...variants.map((v) => v.salePrice)].filter(
    (n): n is number => typeof n === 'number' && n > 0,
  )

  const sectionDefs: [string, unknown][] = [
    [doc.productDetailsTitle || 'Product details', doc.productDetailsDescription],
    [doc.researchFocusTitle || 'Research focus', doc.researchFocusDescription],
    [doc.qualityPurityTitle || 'Quality and purity', doc.qualityPurityDescription],
    [doc.complianceNoticeTitle || 'Compliance notice', doc.complianceNoticeDescription],
  ]
  const sections = sectionDefs
    .map(([title, html]) => ({
      title: oneLine(String(title)),
      text: truncateBlock(htmlToText(typeof html === 'string' ? html : ''), 1100),
    }))
    .filter((s) => s.text)

  const hasCoa = doc.coaFile || doc.coaPurity || doc.coaBatchNumber
  const coaFileUrl = typeof doc.coaFile === 'object' ? doc.coaFile?.url : undefined

  const summarySource = doc.seoDescription || htmlToText(doc.description)

  return {
    name: oneLine(doc.name),
    url: `${baseUrl}/product/${doc.slug}`,
    slug: doc.slug,
    sku: doc.sku || undefined,
    category: cats[0] || UNCATEGORIZED,
    categories: cats,
    priceFrom: prices.length ? Math.min(...prices) : undefined,
    salePriceFrom:
      salePrices.length && prices.length && Math.min(...salePrices) < Math.min(...prices)
        ? Math.min(...salePrices)
        : undefined,
    options,
    summary: truncate(scrubClinicalCodes(summarySource || ''), 200),
    sections,
    coa: hasCoa
      ? {
          purity: typeof doc.coaPurity === 'number' ? doc.coaPurity : undefined,
          batch: doc.coaBatchNumber || undefined,
          analyzed: isoDate(doc.coaAnalyzedDate),
          fileUrl: abs(baseUrl, coaFileUrl),
        }
      : undefined,
    faqs: (doc.faqs ?? [])
      .filter((f: any) => f?.question && f?.answer)
      .map((f: any) => ({
        question: oneLine(f.question),
        answer: truncateBlock(htmlToText(f.answer), 700),
      })),
  }
}

function toPost(baseUrl: string, doc: any): LlmsPost {
  return {
    title: oneLine(doc.title),
    url: `${baseUrl}/blog/${doc.slug}`,
    publishedAt: isoDate(doc.publishedAt),
    updatedAt: isoDate(doc.updatedAt),
    category: doc.category || undefined,
    excerpt: truncate(doc.excerpt || '', 320),
    takeaways: (doc.keyTakeaways ?? []).map((k: any) => oneLine(k?.text || '')).filter(Boolean),
    body: truncateBlock(lexicalToText(doc.content), 14000),
    faqs: (doc.faqs ?? [])
      .filter((f: any) => f?.question && f?.answer)
      .map((f: any) => ({
        question: oneLine(f.question),
        answer: truncateBlock(htmlToText(f.answer), 900),
      })),
    references: (doc.references ?? [])
      .filter((r: any) => r?.citationText && r?.url)
      .map((r: any) => ({ citation: oneLine(r.citationText), url: r.url })),
  }
}

// Reads the live catalog, categories and published posts. Each block fails independently so a
// database hiccup still yields a valid (if shorter) file instead of an error response.
export async function loadLlmsSiteData(): Promise<LlmsSiteData> {
  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com').replace(/\/$/, '')
  const data: LlmsSiteData = {
    baseUrl,
    generatedOn: new Date().toISOString().slice(0, 10),
    authorName: 'Veracue Research Team',
    categories: [],
    products: [],
    posts: [],
  }

  let payload: Awaited<ReturnType<typeof getPayload>>
  try {
    payload = await getPayload({ config: configPromise })
  } catch (error) {
    console.error('llms: failed to init payload', error)
    Sentry.captureException(error, { tags: { route: 'llms.txt' } })
    return data
  }

  try {
    const { docs } = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 1000,
      depth: 1,
      sort: 'name',
      locale: 'en',
    })
    data.products = docs.map((d: any) => toProduct(baseUrl, d))
  } catch (error) {
    console.error('llms: failed to fetch products', error)
    Sentry.captureException(error, { tags: { route: 'llms.txt' } })
  }

  try {
    const { docs } = await payload.find({
      collection: 'categories',
      where: { isVisible: { equals: true } },
      limit: 200,
      depth: 0,
      sort: 'sortOrder',
      locale: 'en',
    })
    data.categories = docs.map((c: any) => {
      const name = shortCategory(c.name)
      return {
        name,
        description: ruoSafeBlurb(truncate(htmlToText(c.description || ''), 200), name),
        count: data.products.filter((p) => p.categories.includes(name)).length,
      }
    })
  } catch (error) {
    console.error('llms: failed to fetch categories', error)
    Sentry.captureException(error, { tags: { route: 'llms.txt' } })
  }

  try {
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 200,
      depth: 0,
      sort: '-publishedAt',
      locale: 'en',
    })
    data.posts = docs.map((d: any) => toPost(baseUrl, d))
  } catch (error) {
    console.error('llms: failed to fetch blog posts', error)
    Sentry.captureException(error, { tags: { route: 'llms.txt' } })
  }

  try {
    const author: any = await payload.findGlobal({ slug: 'blog-author-profile', depth: 0 })
    if (author?.name) data.authorName = oneLine(author.name)
  } catch {
    // The default byline above is fine.
  }

  return data
}
