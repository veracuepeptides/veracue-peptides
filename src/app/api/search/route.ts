import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Fuse from 'fuse.js'

// Force dynamic rendering because this route uses searchParams (request.url)
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    // Nothing to search — return empty list
    if (!query) {
      return NextResponse.json([])
    }

    const payload = await getPayload({ config: configPromise })
    const locale = searchParams.get('locale') || 'en'

    let products: any[] = []

    try {
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

      if (productsRes.docs && productsRes.docs.length > 0) {
        products = productsRes.docs.map((doc: any) => {
          const categoryNames = doc.categories?.map((c: any) => c.title || c.name).join(' ') || ''
          const productName = typeof doc.name === 'string' ? doc.name : (doc.name?.en || doc.name?.es || '')
          const productDesc = typeof doc.description === 'string' ? doc.description : (doc.description?.en || doc.seoDescription?.en || doc.seoDescription || '')

          let imageUrl = null
          if (doc.images?.[0]?.image?.url) {
            imageUrl = doc.images[0].image.url
          } else if (typeof doc.images?.[0]?.image === 'string') {
            imageUrl = doc.images[0].image
          }

          return {
            id: doc.id,
            name: productName,
            slug: doc.slug,
            description: productDesc,
            price: doc.price,
            salePrice: doc.salePrice || null,
            imageUrl,
            categories: categoryNames,
            categoryList: doc.categories?.map((c: any) => ({
              id: c.id,
              name: c.title || c.name || '',
              slug: c.slug || '',
            })) || [],
            descriptor: doc.descriptor || '',
            coaPurity: doc.coaPurity || null,
            coaBatchNumber: doc.coaBatchNumber || null,
            stock: doc.stock ?? 100,
          }
        })
      }
    } catch (dbErr) {
      // Genuine failure: log server-side only, surface a generic 500 below.
      console.error('Search products fetch failed:', dbErr)
      throw dbErr
    }

    if (products.length === 0) {
      return NextResponse.json([])
    }

    // Configure Fuse.js for fuzzy searching
    const fuse = new Fuse(products, {
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

    const results = fuse.search(query)
    
    // Extract top 10 results
    const matchedProducts = results.slice(0, 10).map(result => result.item)

    return NextResponse.json(matchedProducts)
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 })
  }
}
