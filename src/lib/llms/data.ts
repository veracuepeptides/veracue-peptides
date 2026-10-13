import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as Sentry from '@sentry/nextjs'
import { FALLBACK_SHIPPING_METHODS, getFreeShippingThreshold, resolveShippingCountries } from '@/lib/pricing/shipping'
import { DEFAULT_PAYMENT_METHODS, availablePaymentMethods, type PaymentMethodKey } from '@/lib/payments/methods'
import { getAvailablePaymentMethods, isVeracuepayConfigured } from '@/lib/payments/settings'
import {
  dropCodedSentences,
  firstParagraph,
  hasClinicalCode,
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
  /** First paragraph of the product description, without development code names. */
  overview: string
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

/** Shipping and fee facts, read from the store settings so the files never disagree with checkout. */
export type LlmsCommerce = {
  shipsTo: string[]
  standardShipping?: number
  expressShipping?: number
  freeShippingFrom?: number
  processingFeePercent?: number
  /** Payment options switched on at checkout, in the admin's order. */
  paymentMethods?: PaymentMethodKey[]
}

export type LlmsSiteData = {
  baseUrl: string
  generatedOn: string
  authorName: string
  commerce: LlmsCommerce
  categories: { name: string; description: string; count: number }[]
  products: LlmsProduct[]
  posts: LlmsPost[]
}

const UNCATEGORIZED = 'Supplies and other products'

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

// `full` keeps every section and answer at its real length (used for the single-page markdown files);
// the default trims them so the two site-wide files stay a readable size.
export function toProduct(baseUrl: string, doc: any, full = false): LlmsProduct {
  const sectionLimit = full ? Number.POSITIVE_INFINITY : 1100
  const answerLimit = full ? Number.POSITIVE_INFINITY : 700
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
      text: dropCodedSentences(truncateBlock(htmlToText(typeof html === 'string' ? html : ''), sectionLimit)),
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
    overview: firstParagraph(dropCodedSentences(htmlToText(doc.description)), 520),
    sections,
    coa: hasCoa
      ? {
          purity: typeof doc.coaPurity === 'number' ? doc.coaPurity : undefined,
          batch: doc.coaBatchNumber || undefined,
          analyzed: isoDate(doc.coaAnalyzedDate),
          fileUrl: abs(baseUrl, coaFileUrl),
        }
      : undefined,
    // A question that is about a development code name is dropped whole; the catalog uses neutral names.
    faqs: (doc.faqs ?? [])
      .filter((f: any) => f?.question && f?.answer && !hasClinicalCode(String(f.question)))
      .map((f: any) => ({
        question: oneLine(f.question),
        answer: dropCodedSentences(truncateBlock(htmlToText(f.answer), answerLimit)),
      }))
      .filter((f: { answer: string }) => f.answer),
  }
}

export function toPost(baseUrl: string, doc: any, full = false): LlmsPost {
  const bodyLimit = full ? Number.POSITIVE_INFINITY : 9000
  return {
    title: oneLine(doc.title),
    url: `${baseUrl}/blog/${doc.slug}`,
    publishedAt: isoDate(doc.publishedAt),
    updatedAt: isoDate(doc.updatedAt),
    category: doc.category || undefined,
    excerpt: truncate(doc.excerpt || '', 320),
    takeaways: (doc.keyTakeaways ?? []).map((k: any) => oneLine(k?.text || '')).filter(Boolean),
    body: truncateBlock(lexicalToText(doc.content), bodyLimit),
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

function commerceFromMethods(methods: any[], feePercent?: number, paymentMethods?: PaymentMethodKey[]): LlmsCommerce {
  const domestic = methods.filter((m) => m && !m.isInternational)
  const isExpress = (m: any) => /express/i.test(String(m.method))
  const standard = domestic
    .filter((m) => !isExpress(m) && !(Number(m.minOrderAmount) > 0))
    .map((m) => Number(m.price))
    .filter((n) => Number.isFinite(n))
  const express = domestic.filter(isExpress).map((m) => Number(m.price)).filter((n) => Number.isFinite(n))
  return {
    shipsTo: resolveShippingCountries(process.env.SHIPPING_COUNTRIES),
    standardShipping: standard.length ? Math.min(...standard) : undefined,
    expressShipping: express.length ? Math.min(...express) : undefined,
    freeShippingFrom: getFreeShippingThreshold(methods) ?? undefined,
    processingFeePercent: feePercent,
    paymentMethods,
  }
}

// The payment options a customer would be offered when the setting cannot be read: the same defaults
// checkout falls back to.
function defaultPaymentMethods(): PaymentMethodKey[] {
  return availablePaymentMethods(DEFAULT_PAYMENT_METHODS, { veracuepayConfigured: isVeracuepayConfigured() }).map((m) => m.key)
}

// Used when the settings cannot be read: the same rules the store applies when none are configured.
function defaultCommerce(): LlmsCommerce {
  return commerceFromMethods(FALLBACK_SHIPPING_METHODS as any[], undefined, defaultPaymentMethods())
}

async function loadCommerce(payload: Awaited<ReturnType<typeof getPayload>>): Promise<LlmsCommerce> {
  const zones = await payload.find({ collection: 'shippingzones', limit: 1, depth: 0, overrideAccess: true })
  const fees = await payload.find({ collection: 'processing-fees', limit: 20, depth: 0, overrideAccess: true })
  const zoneMethods = (zones.docs[0] as any)?.methods
  const methods = Array.isArray(zoneMethods) && zoneMethods.length ? zoneMethods : FALLBACK_SHIPPING_METHODS
  const percent = (fees.docs as any[]).find((f) => f.isActive !== false && !f.isOptional && f.type === 'percentage')
  const payments = await getAvailablePaymentMethods().then(
    (rows) => rows.map((m) => m.key),
    () => defaultPaymentMethods(),
  )
  return commerceFromMethods(methods as any[], percent ? Number(percent.amount) : undefined, payments)
}

// One product or post for its own markdown file, at full length. Returns null when it does not exist
// or is not published, exactly like the HTML page.
export function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com').replace(/\/$/, '')
}

export async function loadLlmsProduct(slug: string): Promise<LlmsProduct | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'active' } },
        { isVisible: { equals: true } },
      ],
    },
    limit: 1,
    depth: 1,
    locale: 'en',
  })
  return docs[0] ? toProduct(siteBaseUrl(), docs[0], true) : null
}

export async function loadLlmsPost(slug: string): Promise<LlmsPost | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    limit: 1,
    depth: 0,
    locale: 'en',
  })
  return docs[0] ? toPost(siteBaseUrl(), docs[0], true) : null
}

// Reads the live catalog, categories and published posts. Each block fails independently so a
// database hiccup still yields a valid (if shorter) file instead of an error response.
export async function loadLlmsSiteData(): Promise<LlmsSiteData> {
  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com').replace(/\/$/, '')
  const data: LlmsSiteData = {
    baseUrl,
    generatedOn: new Date().toISOString().slice(0, 10),
    authorName: 'Veracue Research Team',
    commerce: defaultCommerce(),
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
    data.commerce = await loadCommerce(payload)
  } catch (error) {
    console.error('llms: failed to read shipping and fee settings', error)
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
