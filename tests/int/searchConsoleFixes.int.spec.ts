import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { getPayload, Payload } from 'payload'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import config from '@/payload.config'

// Stands in for the build-time render of /shop, where reading the query string suspends the catalog.
vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  usePathname: () => '/shop',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => {
    throw new Promise(() => undefined)
  },
}))
vi.mock('@/app/(frontend)/(shop)/actions', () => ({ getShopProducts: async () => ({ success: true, products: [] }) }))
// The product page reads its messages through the server-side next-intl API, which needs a request.
vi.mock('next-intl/server', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next-intl/server')>()),
  getMessages: async () => JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8')),
  getLocale: async () => 'en',
  getTranslations: async (namespace: string) => {
    const all = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))
    return (key: string) => `${namespace}.${key}`.split('.').reduce((node: any, part) => node?.[part], all) ?? key
  },
}))

import { ShopClient } from '@/components/shop/ShopClient'
import { ShopDirectory } from '@/components/shop/ShopDirectory'
import { groupProductsForDirectory } from '@/lib/shop/directory'
import { loadSitemapEntries, renderSitemapXml } from '@/lib/sitemap/build'
import { FALLBACK_SHIPPING_METHODS, offerShippingDetails } from '@/lib/pricing/shipping'

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

describe('Product snippets: shipping details on an offer', () => {
  it('lists the standard fee under the free-shipping threshold and zero at or above it', () => {
    const under = offerShippingDetails(FALLBACK_SHIPPING_METHODS, 89.99, ['US'])
    expect(under.shippingRate).toEqual({ '@type': 'MonetaryAmount', value: '25.00', currency: 'USD' })
    const over = offerShippingDetails(FALLBACK_SHIPPING_METHODS, 300, ['US'])
    expect(over.shippingRate.value).toBe('0.00')
  })

  it('follows the shipping settings it is given, not a fixed number', () => {
    const methods = [{ method: 'Standard Shipping', price: 12, estimatedDays: 5 }]
    expect(offerShippingDetails(methods, 50, ['US']).shippingRate.value).toBe('12.00')
  })

  it('names the destination countries and the delivery window the shipping policy states', () => {
    const details = offerShippingDetails(FALLBACK_SHIPPING_METHODS, 50, ['US', 'CA'])
    expect(details['@type']).toBe('OfferShippingDetails')
    expect(details.shippingDestination).toEqual([
      { '@type': 'DefinedRegion', addressCountry: 'US' },
      { '@type': 'DefinedRegion', addressCountry: 'CA' },
    ])
    expect(details.deliveryTime.handlingTime).toMatchObject({ minValue: 1, maxValue: 3, unitCode: 'DAY' })
    expect(details.deliveryTime.transitTime).toMatchObject({ minValue: 3, maxValue: 7, unitCode: 'DAY' })
    // the visible Shipping Policy page says the same
    expect(messages.shippingPolicy?.section1Text ?? JSON.stringify(messages)).toContain('1–3 business day')
    expect(JSON.stringify(messages)).toContain('Within the U.S.: 3–7 business days')
  })
})

describe('the shop directory', () => {
  const docs = [
    { name: 'BPC-157', slug: 'bpc-157', categories: [{ name: 'Healing & Recovery Research Compounds', sortOrder: 2 }] },
    { name: 'Semaglutide', slug: 'semaglutide', categories: [{ name: 'GLP-1 & Metabolic Research Compounds', sortOrder: 1 }] },
    { name: 'TB-500', slug: 'tb-500', categories: [{ name: 'Healing & Recovery Research Compounds', sortOrder: 2 }, { name: 'Nasal Sprays', sortOrder: 5 }] },
    { name: 'Loose Compound', slug: 'loose', categories: [] },
    { name: 'No Slug', slug: '', categories: [] },
    { name: 'Id Only Category', slug: 'id-only', categories: [41] },
  ]

  it('groups products under their first category, in category order, with the short category name', () => {
    const groups = groupProductsForDirectory(docs)
    expect(groups.map((g) => g.name)).toEqual(['GLP-1 & Metabolic', 'Healing & Recovery', 'More Research Compounds'])
    expect(groups[1].products.map((p) => p.slug)).toEqual(['bpc-157', 'tb-500'])
    // a product with no usable category, or one the data could not populate, is still listed
    expect(groups[2].products.map((p) => p.slug).sort()).toEqual(['id-only', 'loose'])
    // a product with no slug has no page to link to
    expect(groups.flatMap((g) => g.products).map((p) => p.slug)).not.toContain('')
  })

  it('renders every product as a plain link to its page', () => {
    const html = renderToStaticMarkup(React.createElement(ShopDirectory, { groups: groupProductsForDirectory(docs) }))
    for (const slug of ['bpc-157', 'semaglutide', 'tb-500', 'loose', 'id-only']) expect(html).toContain(`href="/product/${slug}"`)
    expect(html).toContain('All Research Compounds')
  })

  it('renders nothing when there are no products', () => {
    expect(renderToStaticMarkup(React.createElement(ShopDirectory, { groups: [] }))).toBe('')
  })
})

describe('the shop page before the browser takes over', () => {
  it('still sends the H1 and the FAQ when the catalog has to wait for the query string', () => {
    const html = renderToString(
      React.createElement(NextIntlClientProvider as React.ComponentType<any>, { locale: 'en', messages }, React.createElement(ShopClient, { initialProducts: [], totalPages: 0, categories: [] })),
    )
    expect(html).toContain('<h1')
    expect(html).toContain('Catalog FAQs')
    expect(html).toContain(messages.shop.shopClient.faqs.availablePeptides.question)
    // the catalog itself is the part that waits
    expect(html).not.toContain('id="catalog-browser"')
  })
})

describe('the sitemap, against the real catalog', () => {
  let payload: Payload

  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('lists exactly the active, visible products and the published posts', async () => {
    const entries = await loadSitemapEntries()
    const urls = new Set(entries.map((e) => e.url))
    const products = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 1000,
      depth: 0,
    })
    const listed = entries.filter((e) => e.url.includes('/product/'))
    expect(listed).toHaveLength(products.docs.length)
    for (const product of products.docs) expect([...urls].some((u) => u.endsWith(`/product/${product.slug}`))).toBe(true)

    // a product that is not active must not be listed
    const drafts = await payload.find({ collection: 'products', where: { status: { not_equals: 'active' } }, limit: 200, depth: 0 })
    for (const draft of drafts.docs) expect([...urls].some((u) => u.endsWith(`/product/${draft.slug}`)), draft.slug).toBe(false)
  }, 120_000)

  it('writes a valid sitemap document', () => {
    const xml = renderSitemapXml([
      { url: 'https://example.com/a&b', lastModified: new Date('2026-10-01T00:00:00Z'), changeFrequency: 'weekly', priority: 0.8 },
      { url: 'https://example.com/' },
    ])
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('<loc>https://example.com/a&amp;b</loc>')
    expect(xml).toContain('<lastmod>2026-10-01T00:00:00.000Z</lastmod>')
    expect(xml).toContain('<changefreq>weekly</changefreq><priority>0.8</priority>')
    expect(xml).toContain('<url><loc>https://example.com/</loc></url>')
  })
})

// ---- the structured data the real pages produce ----
// The product and blog pages are async server components, so they are called directly and the JSON-LD
// scripts are read out of the element tree they return.
const collectJsonLd = (node: any, found: any[] = []): any[] => {
  if (!node || typeof node !== 'object') return found
  if (Array.isArray(node)) {
    node.forEach((child) => collectJsonLd(child, found))
    return found
  }
  const props = node.props
  if (props?.type === 'application/ld+json' && props.dangerouslySetInnerHTML?.__html) {
    found.push(JSON.parse(props.dangerouslySetInnerHTML.__html))
  }
  if (props?.children) collectJsonLd(props.children, found)
  return found
}
// A component function in the tree (a server component) is not called by React here, so only the plain
// element tree the page itself builds is searched, which is where the page puts its scripts.

describe('structured data on the real pages', () => {
  it('product offers carry validFrom and shippingDetails', async () => {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 1,
      depth: 0,
    })
    const slug = docs[0].slug as string
    const { default: ProductPage } = await import('@/app/(frontend)/(shop)/product/[slug]/page')
    const tree = await ProductPage({ params: Promise.resolve({ slug }) })
    const product = collectJsonLd(tree).find((j) => j['@type'] === 'Product')
    expect(product, 'a Product script').toBeTruthy()
    const offers = product.offers['@type'] === 'AggregateOffer' ? product.offers.offers : [product.offers]
    expect(offers.length).toBeGreaterThan(0)
    for (const offer of offers) {
      expect(offer.validFrom).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(offer.shippingDetails['@type']).toBe('OfferShippingDetails')
      expect(offer.shippingDetails.shippingRate.currency).toBe('USD')
      expect(Number(offer.shippingDetails.shippingRate.value)).toBeGreaterThanOrEqual(0)
      expect(offer.shippingDetails.shippingDestination[0]).toEqual({ '@type': 'DefinedRegion', addressCountry: 'US' })
    }
    // no invented rating
    expect(product.aggregateRating).toBeUndefined()
  }, 120_000)

  it('blog posts mention products as Thing nodes, never as Product nodes', async () => {
    const payload = await getPayload({ config: await config })
    const { docs } = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, limit: 50, depth: 0 })
    expect(docs.length).toBeGreaterThan(0)
    const { default: BlogPostPage } = await import('@/app/(frontend)/blog/[slug]/page')
    let mentionsSeen = 0
    for (const post of docs) {
      const tree = await BlogPostPage({ params: Promise.resolve({ slug: post.slug as string }) })
      const graph = collectJsonLd(tree).flatMap((j) => j['@graph'] || [j])
      expect(graph.filter((n: any) => n['@type'] === 'Product'), post.slug as string).toEqual([])
      const article = graph.find((n: any) => n['@type'] === 'BlogPosting')
      for (const mention of article?.mentions || []) {
        mentionsSeen++
        expect(mention['@type']).toBe('Thing')
        expect(mention.url).toContain('/product/')
      }
    }
    expect(mentionsSeen).toBeGreaterThan(0)
  }, 180_000)
})

// ---- the blog section of a product page ----
const findProp = (node: any, test: (props: any) => boolean): any => {
  if (!node || typeof node !== 'object') return undefined
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = findProp(child, test)
      if (hit) return hit
    }
    return undefined
  }
  if (node.props && test(node.props)) return node.props
  return node.props?.children ? findProp(node.props.children, test) : undefined
}

describe('the blog section of a product page', () => {
  const suggestedFor = async (slug: string): Promise<{ slug: string }[]> => {
    const { default: ProductPage } = await import('@/app/(frontend)/(shop)/product/[slug]/page')
    const tree = await ProductPage({ params: Promise.resolve({ slug }) })
    return findProp(tree, (props) => Array.isArray(props.product?.suggestedBlogs)).product.suggestedBlogs
  }

  it('shows the posts that list the product first, then tops up with the newest others', async () => {
    const payload = await getPayload({ config: await config })
    const posts = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, sort: '-publishedAt', limit: 50, depth: 0 })
    const recent = posts.docs.slice(0, 3).map((p) => p.slug)

    // a product that some published post lists in Related Products
    const related = posts.docs.find((p) => Array.isArray(p.relatedProducts) && p.relatedProducts.length > 0)
    expect(related, 'a published post with related products').toBeTruthy()
    const productId = typeof related!.relatedProducts![0] === 'object' ? (related!.relatedProducts![0] as any).id : related!.relatedProducts![0]
    const product = await payload.findByID({ collection: 'products', id: productId as number, depth: 0 })
    const listing = posts.docs.filter((p) => (p.relatedProducts || []).some((r: any) => (typeof r === 'object' ? r.id : r) === product.id))

    const shown = await suggestedFor(product.slug as string)
    expect(shown).toHaveLength(Math.min(3, posts.docs.length))
    // the posts that list this product lead, newest first
    expect(shown.slice(0, Math.min(3, listing.length)).map((p) => p.slug)).toEqual(listing.slice(0, 3).map((p) => p.slug))
    // no post appears twice
    expect(new Set(shown.map((p) => p.slug)).size).toBe(shown.length)
    // when the product has fewer than three, the rest are the newest posts that are not already shown
    if (listing.length < 3) {
      const filler = posts.docs.filter((p) => !listing.some((l) => l.id === p.id)).slice(0, 3 - listing.length).map((p) => p.slug)
      expect(shown.slice(listing.length).map((p) => p.slug)).toEqual(filler)
    }
    expect(recent.length).toBeGreaterThan(0)
  }, 120_000)

  it('falls back to the newest posts for a product no post lists', async () => {
    const payload = await getPayload({ config: await config })
    const posts = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, sort: '-publishedAt', limit: 50, depth: 0 })
    const listed = new Set(posts.docs.flatMap((p) => (p.relatedProducts || []).map((r: any) => (typeof r === 'object' ? r.id : r))))
    const products = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 200,
      depth: 0,
    })
    const unlisted = products.docs.find((p) => !listed.has(p.id))
    expect(unlisted, 'an active product no post lists').toBeTruthy()
    const shown = await suggestedFor(unlisted!.slug as string)
    expect(shown.map((p) => p.slug)).toEqual(posts.docs.slice(0, 3).map((p) => p.slug))
  }, 120_000)
})

// ---- product cards outside the shop ----
describe('product cards on the product page and in blog posts', () => {
  const shopCards = async () => {
    const actual = await vi.importActual<typeof import('@/app/(frontend)/(shop)/actions')>('@/app/(frontend)/(shop)/actions')
    const res: any = await actual.getShopProducts({ page: 1, limit: 200 })
    return res.products as any[]
  }

  it('the "Also considered" cards are the same cards the shop shows', async () => {
    const cards = await shopCards()
    const { default: ProductPage } = await import('@/app/(frontend)/(shop)/product/[slug]/page')
    const tree = await ProductPage({ params: Promise.resolve({ slug: cards[0].slug }) })
    const related: any[] = findProp(tree, (props) => Array.isArray(props.product?.relatedProducts)).product.relatedProducts
    expect(related.length).toBeGreaterThan(0)
    for (const card of related) {
      const inShop = cards.find((c) => c.slug === card.slug)
      expect(inShop, card.slug).toBeTruthy()
      expect(card, card.slug).toEqual(inShop)
      // a real category label, not the empty value that made the card say "Research Peptide"
      expect(card.category).toBeTruthy()
    }
  }, 180_000)

  it('the featured-product cards in a blog post carry the real category too', async () => {
    const cards = await shopCards()
    const payload = await getPayload({ config: await config })
    const posts = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, limit: 50, depth: 0 })
    const post = posts.docs.find((p) => Array.isArray(p.relatedProducts) && p.relatedProducts.length > 0)
    expect(post, 'a post with related products').toBeTruthy()
    const { default: BlogPostPage } = await import('@/app/(frontend)/blog/[slug]/page')
    const tree = await BlogPostPage({ params: Promise.resolve({ slug: post!.slug as string }) })
    const slider: any[] = findProp(tree, (props) => Array.isArray(props.products) && props.products.some((p: any) => p?.slug)).products
    expect(slider.length).toBeGreaterThan(0)
    for (const card of slider) expect(card, card.slug).toEqual(cards.find((c) => c.slug === card.slug))
  }, 180_000)
})

// ---- the sitemap route and the shop's link directory, as the live site will serve them ----
describe('what the live routes will serve', () => {
  it('the sitemap route lists every published blog post and no draft', async () => {
    const payload = await getPayload({ config: await config })
    const { GET } = await import('@/app/sitemap.xml/route')
    const response = await GET()
    expect(response.headers.get('content-type')).toContain('application/xml')
    const xml = await response.text()
    const listed = [...xml.matchAll(/<loc>([^<]*\/blog\/[^<]+)<\/loc>/g)].map((m) => m[1].split('/blog/')[1])

    const published = await payload.find({ collection: 'blog-posts', where: { status: { equals: 'published' } }, limit: 200, depth: 0 })
    expect(published.docs.length).toBeGreaterThan(1)
    expect(listed.sort()).toEqual(published.docs.map((p) => p.slug as string).sort())

    const unpublished = await payload.find({ collection: 'blog-posts', where: { status: { not_equals: 'published' } }, limit: 200, depth: 0 })
    for (const draft of unpublished.docs) expect(listed).not.toContain(draft.slug as string)
    // the blog index is listed because there are posts
    expect(xml).toContain('/blog</loc>')
  }, 120_000)

  it('the /shop page hands every active product to its link directory', async () => {
    const payload = await getPayload({ config: await config })
    const { default: ShopPage } = await import('@/app/(frontend)/shop/page')
    const tree: any = await ShopPage()
    const directory = findProp(tree, (props) => Array.isArray(props.groups))
    expect(directory, 'the directory on the shop page').toBeTruthy()
    const linked = directory.groups.flatMap((g: any) => g.products.map((p: any) => p.slug)).sort()

    const active = await payload.find({
      collection: 'products',
      where: { and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }] },
      limit: 1000,
      depth: 0,
    })
    expect(linked).toEqual(active.docs.map((p) => p.slug as string).sort())
    // and the markup it produces has a plain link for each one
    const html = renderToStaticMarkup(React.createElement(ShopDirectory, { groups: directory.groups }))
    for (const slug of linked) expect(html).toContain(`href="/product/${slug}"`)
  }, 120_000)
})
