'use server'

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'

/**
 * The signed-in visitor's saved cart and wishlist, used once per page load to fill the header's cart
 * and wishlist stores.
 *
 * This used to run inside the server-rendered Header on every request (session lookup plus three
 * depth-2 queries), which made every page on the site dynamic and uncacheable for everyone, signed in
 * or not. As a server action called from the browser after sign-in is known, the pages themselves can
 * be cached and only signed-in visitors pay for these queries.
 */
export async function getHeaderUserState(): Promise<{ cartItems: any[]; wishlistItems: any[] }> {
  const empty = { cartItems: [] as any[], wishlistItems: [] as any[] }
  try {
    const user = await getPayloadUser()
    if (!user) return empty

    const payload = await getPayload({ config: configPromise })

    const [carts, wishlists] = await Promise.all([
      payload.find({
        collection: 'carts',
        where: { user: { equals: user.id } },
        limit: 1,
        depth: 2,
        overrideAccess: true,
      }),
      payload.find({
        collection: 'wishlists',
        where: { user: { equals: user.id } },
        limit: 1,
        depth: 2,
        overrideAccess: true,
      }),
    ])

    const cartItems = (carts.docs[0]?.items || []).map((item: any) => {
      const prod = item.product || {}
      let imageUrl = prod.images?.[0]?.image?.url || null
      if (prod.variants && item.variantSku) {
        const variant = prod.variants.find(
          (v: any) =>
            v.sku === item.variantSku || v.options?.map((o: any) => o.value).join(' ') === item.variantSku,
        )
        if (variant?.images?.[0]?.image?.url) {
          imageUrl = variant.images[0].image.url
        }
      }

      return {
        lineId: item.id || Math.random().toString(36).substring(2, 15),
        productId: String(prod.id || item.product),
        variantSku: item.variantSku || 'default',
        variantTitle: item.variantTitle || item.variantSku || null,
        quantity: item.quantity || 1,
        priceSnapshot: item.priceSnapshot || 0,
        product: {
          id: String(prod.id || item.product),
          name: prod.name || '',
          slug: prod.slug || '',
          imageUrl: imageUrl || '/placeholder.png',
        },
      }
    })

    const wishlistItems = (wishlists.docs[0]?.items || []).map((item: any) => {
      const prod = item.product || {}
      return {
        id: prod.id || item.product,
        name: prod.name || '',
        slug: prod.slug || '',
        image: prod.images?.[0]?.image?.url || '',
        priceRange: prod.price ? `$${prod.price}` : '',
        descriptor: prod.descriptor || '',
        price: prod.price ? `$${prod.price}` : '',
      }
    })

    return { cartItems, wishlistItems }
  } catch (error) {
    console.error('getHeaderUserState failed:', error)
    return empty
  }
}
