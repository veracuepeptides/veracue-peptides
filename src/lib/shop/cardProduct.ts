import { getCategoryDisplayName } from '@/lib/categoryDisplay'

/**
 * A product as the storefront cards (ProductCard) show it. The shop grid and the product page's
 * "Also considered" row both build their cards from this, so the two always look the same: same category
 * label, same "From" pricing, same sale price and discount.
 *
 * `doc` is a Payload product read with depth 1 or more, so its images and categories are populated.
 */
export function toShopCardProduct(doc: any) {
  let imageUrl = '/veracue-images/vp-product-vial.webp'
  let hoverImageUrl: string | undefined = undefined

  if (doc.images && doc.images.length > 0) {
    const encodeUrl = (url: string) => {
      if (!url) return url
      try {
        // Check if it's an absolute URL
        if (url.startsWith('http://') || url.startsWith('https://')) {
          const parsed = new URL(url)
          parsed.pathname = parsed.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
          return parsed.toString()
        }
        // Relative URL
        return url.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
      } catch (e) {
        return url
      }
    }

    if (typeof doc.images[0].image === 'object' && doc.images[0].image !== null) {
      imageUrl = encodeUrl((doc.images[0].image as any).url) || imageUrl
    }
    if (doc.images.length > 1 && typeof doc.images[1].image === 'object' && doc.images[1].image !== null) {
      hoverImageUrl = encodeUrl((doc.images[1].image as any).url)
    }
  }
  
  // Fallback to variant images if no global image exists
  if (imageUrl === '/veracue-images/vp-product-vial.webp' && doc.hasVariants && doc.variants && doc.variants.length > 0) {
    for (const variant of doc.variants) {
      if (variant.images && variant.images.length > 0 && typeof variant.images[0].image === 'object' && variant.images[0].image !== null) {
        const encodeUrl = (url: string) => {
          if (!url) return url
          try {
            if (url.startsWith('http://') || url.startsWith('https://')) {
              const parsed = new URL(url)
              parsed.pathname = parsed.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
              return parsed.toString()
            }
            return url.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
          } catch (e) {
            return url
          }
        }
        imageUrl = encodeUrl((variant.images[0].image as any).url)
        
        // Try to find a hover image from the same or another variant
        if (variant.images.length > 1 && typeof variant.images[1].image === 'object' && variant.images[1].image !== null) {
          hoverImageUrl = encodeUrl((variant.images[1].image as any).url)
        }
        break
      }
    }
  }

  let categoryName = 'Research'
  if (doc.categories && doc.categories.length > 0 && typeof doc.categories[0] === 'object') {
    categoryName = getCategoryDisplayName((doc.categories[0] as any).name) || categoryName
  }


  let displayPrice = typeof doc.price === 'number' ? doc.price : 0
  let displaySalePrice = typeof doc.salePrice === 'number' && doc.salePrice > 0 ? doc.salePrice : undefined
  let isFrom = false

  if (doc.hasVariants && doc.variants && doc.variants.length > 0) {
    const prices = doc.variants.map((v: any) => typeof v.salePrice === 'number' && v.salePrice > 0 ? v.salePrice : v.price).filter(Boolean)
    if (prices.length > 0) {
      const minVariantPrice = Math.min(...prices)
      // If the variants have different prices, we can add "From " prefix
      const maxVariantPrice = Math.max(...prices)
      if (minVariantPrice !== maxVariantPrice) {
        isFrom = true
      }
      displayPrice = minVariantPrice
      
      // Try to find the original price of the cheapest variant to show the discount
      const cheapestVariant = doc.variants.find((v: any) => (v.salePrice || v.price) === minVariantPrice)
      if (cheapestVariant && typeof cheapestVariant.salePrice === 'number' && cheapestVariant.salePrice > 0) {
         displaySalePrice = cheapestVariant.salePrice
         displayPrice = cheapestVariant.price
      } else {
         displaySalePrice = undefined
      }
    }
  }

  return {
    id: doc.id as number,
    name: doc.name,
    slug: doc.slug || '',
    image: imageUrl,
    hoverImage: hoverImageUrl,
    shortDescription: doc.description || '',
    priceRange: displaySalePrice 
      ? `${isFrom ? 'From ' : ''}$${displaySalePrice.toFixed(2)}` 
      : `${isFrom ? 'From ' : ''}$${displayPrice.toFixed(2)}`,
    originalPrice: (displaySalePrice && !isFrom)
      ? `$${displayPrice.toFixed(2)}` 
      : undefined,
    discountPercentage: (displaySalePrice && displayPrice > 0)
      ? Math.round(((displayPrice - displaySalePrice) / displayPrice) * 100)
      : undefined,
    hasVariants: !!(doc.hasVariants && (doc.variants?.length || 0) > 1),
    category: categoryName
  }
}
