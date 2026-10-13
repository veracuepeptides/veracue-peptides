import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Fuse from 'fuse.js'

// Force dynamic rendering because this route uses searchParams (request.url)
export const dynamic = 'force-dynamic'

type SearchItem = {
  id: string | number
  name: string
  slug: string
  description: string
  price: number
  salePrice: number | null
  imageUrl: string | null
  categories: string
  categoryList: Array<{ id: string | number; name: string; slug: string }>
  descriptor: string
  coaPurity: number | null
  coaBatchNumber: string | null
  stock: number
}

type CatalogIndex = { items: SearchItem[]; fuse: Fuse<SearchItem>; builtAt: number }

// The catalog is small and changes rarely. Loading it on every keystroke-debounced request
// was the main database/egress cost of the header search, so the index is built once per
// locale and reused for CATALOG_TTL_MS. A product edit shows up in search within that window.
const CATALOG_TTL_MS = 5 * 60 * 1000
const catalogByLocale = new Map<string, CatalogIndex>()
const buildsInFlight = new Map<string, Promise<CatalogIndex>>()

const MAX_DESCRIPTION_CHARS = 280
const MAX_QUERY_CHARS = 80

function toPlainText(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

async function buildCatalogIndex(locale: string): Promise<CatalogIndex> {
  const payload = await getPayload({ config: configPromise })
  const productsRes = await payload.find({
    collection: 'products',
    where: {
      and: [{ status: { equals: 'active' } }, { isVisible: { equals: true } }],
    },
    overrideAccess: true,
    locale: locale as 'en' | 'es',
    fallbackLocale: 'en',
    depth: 1,
    limit: 500,
  })

  const items: SearchItem[] = (productsRes.docs || []).map((doc: any) => {
    const productName = typeof doc.name === 'string' ? doc.name : (doc.name?.en || doc.name?.es || '')
    const rawDescription =
      typeof doc.description === 'string'
        ? doc.description
        : (doc.description?.en || doc.seoDescription?.en || doc.seoDescription || '')
    const description = toPlainText(rawDescription).slice(0, MAX_DESCRIPTION_CHARS)

    let imageUrl: string | null = null
    if (doc.images?.[0]?.image?.url) {
      imageUrl = doc.images[0].image.url
    } else if (typeof doc.images?.[0]?.image === 'string') {
      imageUrl = doc.images[0].image
    }

    const categoryList = (doc.categories || []).map((c: any) => ({
      id: c.id,
      name: c.title || c.name || '',
      slug: c.slug || '',
    }))

    return {
      id: doc.id,
      name: productName,
      slug: doc.slug,
      description,
      price: doc.price,
      salePrice: doc.salePrice || null,
      imageUrl,
      categories: categoryList.map((c: { name: string }) => c.name).join(' '),
      categoryList,
      descriptor: doc.descriptor || '',
      coaPurity: doc.coaPurity || null,
      coaBatchNumber: doc.coaBatchNumber || null,
      stock: doc.stock ?? 100,
    }
  })

  // One Fuse instance per build, reused by every query until the next rebuild.
  const fuse = new Fuse(items, {
    keys: [
      { name: 'name', weight: 4 },
      { name: 'descriptor', weight: 2 },
      { name: 'categories', weight: 1.5 },
      { name: 'description', weight: 1 },
    ],
    threshold: 0.32,
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: true,
  })

  return { items, fuse, builtAt: Date.now() }
}

async function getCatalogIndex(locale: string): Promise<CatalogIndex> {
  const cached = catalogByLocale.get(locale)
  if (cached && Date.now() - cached.builtAt < CATALOG_TTL_MS) return cached

  // Concurrent cold requests share one build instead of each hitting the database.
  let pending = buildsInFlight.get(locale)
  if (!pending) {
    pending = buildCatalogIndex(locale)
      .then((index) => {
        catalogByLocale.set(locale, index)
        return index
      })
      .finally(() => buildsInFlight.delete(locale))
    buildsInFlight.set(locale, pending)
  }
  return pending
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = (searchParams.get('q') || '').trim().slice(0, MAX_QUERY_CHARS)
    const locale = searchParams.get('locale') || 'en'

    // Below two characters the fuzzy matcher returns noise and every keystroke costs a request.
    if (query.length < 2) {
      return NextResponse.json([], {
        headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600' },
      })
    }

    const index = await getCatalogIndex(locale)
    const matchedProducts = index.fuse
      .search(query)
      .slice(0, 10)
      .map((result) => result.item)

    return NextResponse.json(matchedProducts, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 })
  }
}
