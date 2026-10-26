import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as Sentry from '@sentry/nextjs'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type SitemapEntry = {
  url: string
  lastModified?: Date
  changeFrequency?: ChangeFrequency
  priority?: number
}

const baseUrl = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com').replace(/\/$/, '')

// Grouped by crawl priority rather than alphabetically, so the sitemap's own ordering
// reflects which pages matter most (highest first) — homepage/shop first, then core
// conversion-adjacent pages, then supporting/legal pages.
const STATIC_PATHS: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { path: '/peptide-calculator', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/certificates', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/about-us', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/affiliates', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact-us', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/shipping-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/medical-disclaimer', priority: 0.3, changeFrequency: 'yearly' },
]

function entry(
  path: string,
  opts?: { lastModified?: Date; priority?: number; changeFrequency?: ChangeFrequency },
): SitemapEntry {
  return {
    url: `${baseUrl()}${path}`,
    ...(opts?.lastModified ? { lastModified: opts.lastModified } : {}),
    ...(opts?.priority !== undefined ? { priority: opts.priority } : {}),
    ...(opts?.changeFrequency ? { changeFrequency: opts.changeFrequency } : {}),
  }
}

export async function loadSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = []

  // Posts are read first because the blog index is listed only once a post is published (it has
  // nothing to show before that). If the lookup fails the index stays listed, so a database
  // hiccup never drops it.
  let posts: { slug?: string | null; updatedAt?: string | null }[] = []
  let postsLoaded = false
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
    })
    posts = result.docs
    postsLoaded = true
  } catch (error) {
    console.error('sitemap: failed to fetch blog posts', error)
    Sentry.captureException(error, { tags: { route: 'sitemap.xml' } })
  }

  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    if (path === '/blog' && postsLoaded && posts.length === 0) continue
    entries.push(entry(path, { priority, changeFrequency }))
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: products } = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 1000,
      depth: 0,
    })

    for (const product of products) {
      const path = `/product/${product.slug}`
      const lastModified = product.updatedAt ? new Date(product.updatedAt) : undefined
      entries.push(entry(path, { lastModified, priority: 0.8, changeFrequency: 'weekly' }))
    }
  } catch (error) {
    console.error('sitemap: failed to fetch products', error)
    Sentry.captureException(error, { tags: { route: 'sitemap.xml' } })
  }

  for (const post of posts) {
    const path = `/blog/${post.slug}`
    const lastModified = post.updatedAt ? new Date(post.updatedAt) : undefined
    entries.push(entry(path, { lastModified, priority: 0.6, changeFrequency: 'monthly' }))
  }

  return entries
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries.map((item) => {
    const lines = [`<loc>${escapeXml(item.url)}</loc>`]
    if (item.lastModified) lines.push(`<lastmod>${item.lastModified.toISOString()}</lastmod>`)
    if (item.changeFrequency) lines.push(`<changefreq>${item.changeFrequency}</changefreq>`)
    if (item.priority !== undefined) lines.push(`<priority>${item.priority}</priority>`)
    return `<url>${lines.join('')}</url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>\n`
}
