'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getLocale } from 'next-intl/server'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { toShopCardProduct } from '@/lib/shop/cardProduct'
import { checkRateLimit } from '@/lib/rateLimit'
import { getClientIp } from '@/lib/requestIp'

export async function addToCart(productId: string | number, quantity = 1, providedVariantSku?: string, providedPriceSnapshot?: number, providedVariantTitle?: string) {
  try {
    const user = await getPayloadUser()
    if (!user) return { success: false, error: 'Must be logged in to add to cart' }

    const payload = await getPayload({ config: configPromise })

    // Fetch product details to get variantSku and priceSnapshot
    const product = await payload.findByID({ collection: 'products', id: productId as any })
    if (!product) return { success: false, error: 'Product not found' }

    // Normalize the product ID to a number so relationship fields and comparisons work
    const numericProductId = Number(product.id)

    const variantSku = providedVariantSku || product.sku || (product.variants && product.variants[0]?.sku) || `${product.id}`
    const priceSnapshot = providedPriceSnapshot !== undefined ? providedPriceSnapshot : (typeof product.salePrice === 'number' ? product.salePrice : (typeof product.price === 'number' ? product.price : 0))

    // Find existing cart — depth:0 so product comes back as raw ID
    const existingCarts = await payload.find({
      collection: 'carts',
      where: { user: { equals: user.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    let cart = existingCarts.docs[0]
    
    if (!cart) {
      cart = await payload.create({
        collection: 'carts',
        data: {
          user: user.id,
          items: [{
            product: numericProductId as any,
            variantSku,
            variantTitle: providedVariantTitle || null,
            quantity,
            priceSnapshot,
            addedAt: new Date().toISOString(),
          }],
        },
        overrideAccess: true,
      })
    } else {
      const items = (cart.items || []).map((i: any) => ({
        product: Number(typeof i.product === 'object' ? i.product.id : i.product),
        variantSku: String(i.variantSku ?? ''),
        variantTitle: i.variantTitle ?? null,
        quantity: Number(i.quantity ?? 1),
        priceSnapshot: Number(i.priceSnapshot ?? 0),
      }))

      const existingItemIndex = items.findIndex((i) =>
        i.product === numericProductId && i.variantSku === variantSku
      )

      if (existingItemIndex > -1) {
        items[existingItemIndex].quantity += quantity
        if (providedVariantTitle) items[existingItemIndex].variantTitle = providedVariantTitle
      } else {
        items.push({ product: numericProductId, quantity, variantSku, variantTitle: providedVariantTitle || null, priceSnapshot })
      }

      cart = await payload.update({
        collection: 'carts',
        id: cart.id,
        data: { items: items as any },
        overrideAccess: true,
      })
    }

    revalidatePath('/shop')
    revalidatePath('/cart')
    return { success: true, message: 'Added to cart' }
  } catch (error: any) {
    return { success: false, error: error.message || 'An unexpected error occurred' }
  }
}

async function calculateCartTotals(cartItems: any[], payload: any, coupon?: any) {
  let eligibleSubtotal = 0;
  let totalSubtotal = 0;
  const ineligibleReasons = new Set<string>();

  for (const item of cartItems) {
    let product = item.product;
    if (typeof product !== 'object' || product === null) {
      try {
        const prodId = Number(item.product || item.productId);
        if (!isNaN(prodId) && prodId > 0) {
          product = await payload.findByID({ collection: 'products', id: prodId });
        }
      } catch (err) {
        product = null;
      }
    }
    const itemPrice = typeof item.priceSnapshot === 'number' 
      ? item.priceSnapshot 
      : (product && typeof product.salePrice === 'number' ? product.salePrice : (product && typeof product.price === 'number' ? product.price : 0));
    const itemQuantity = item.quantity || 1;
    const itemTotal = itemPrice * itemQuantity;
    totalSubtotal += itemTotal;

    if (coupon) {
      let eligible = true;
      if (product) {
        if (coupon.excludeSaleItems && typeof product.salePrice === 'number' && product.salePrice > 0) {
          eligible = false;
          ineligibleReasons.add('sale_excluded');
        }

        // Check applicableProductTypes (Singles vs Kits)
        if (coupon.applicableProductTypes && coupon.applicableProductTypes !== 'all') {
          const matchedVariant = Array.isArray(product.variants)
            ? product.variants.find((v: any) => v.sku === item.variantSku)
            : null;

          // A variant is a Kit if 'isKit' is true, or falls back to legacy " - " bundle check
          const isKitBundle = (matchedVariant && matchedVariant.isKit) || (typeof item.variantSku === 'string' && item.variantSku.includes(' - '));

          if (coupon.applicableProductTypes === 'normal_only' && isKitBundle) {
            eligible = false; // Coupon is for Singles Only
            ineligibleReasons.add('kit_not_allowed');
          } else if (coupon.applicableProductTypes === 'bulk_only' && !isKitBundle) {
            eligible = false; // Coupon is for Kits Only
            ineligibleReasons.add('kit_required');
          }
        }
        if (coupon.appliesTo === 'specific_products') {
          const allowedProductIds = (coupon.products || []).map((p: any) => typeof p.product === 'object' ? p.product.id : p.product);
          if (!allowedProductIds.includes(product.id)) {
            eligible = false;
            ineligibleReasons.add('not_specific_product');
          }
        }
        if (coupon.appliesTo === 'specific_categories') {
          const allowedCategoryIds = (coupon.categories || []).map((c: any) => typeof c.category === 'object' ? c.category.id : c.category);
          const productCategoryIds = (product.categories || []).map((c: any) => typeof c === 'object' ? c.id : c);
          const hasIntersect = productCategoryIds.some((id: any) => allowedCategoryIds.includes(id));
          if (!hasIntersect) {
            eligible = false;
            ineligibleReasons.add('not_specific_category');
          }
        }
      }
      if (eligible) eligibleSubtotal += itemTotal;
    }
  }

  let discount = 0;
  let description = '';
  
  if (coupon) {
    if (eligibleSubtotal > 0 || coupon.type === 'free_shipping') {
      if (coupon.type === 'percentage' && coupon.value) {
        // Round to cents, not whole dollars: flooring turned a 15% coupon on a $48 item into
        // $7 (14.6%) and on a $19 item into $2 (10.5%).
        discount = Math.round(eligibleSubtotal * (coupon.value / 100) * 100) / 100;
        description = `${coupon.value}% off eligible items`;
      } else if (coupon.type === 'fixed_amount' && coupon.value) {
        discount = Math.min(coupon.value, eligibleSubtotal);
        description = `$${coupon.value.toFixed(2)} off eligible items`;
      } else if (coupon.type === 'free_shipping') {
        discount = 0;
        description = 'Free shipping';
      } else if (coupon.type === 'buy_one_get_one') {
        description = 'Buy one get one free';
      } else if (coupon.type === 'store_credit' && coupon.remainingBalance) {
        discount = Math.min(coupon.remainingBalance, eligibleSubtotal);
        description = `$${coupon.remainingBalance.toFixed(2)} store credit applied`;
      }
    } else {
      description = 'No eligible items for this coupon';
    }
  }

  let freeShipping = false;
  if (coupon && coupon.type === 'free_shipping') {
    freeShipping = true;
  }

  return { discount, description, eligibleSubtotal, totalSubtotal, freeShipping, ineligibleReasons: Array.from(ineligibleReasons) };
}

export async function verifyCoupon(couponCode: string, subtotal: number, clientCartItems?: any[]) {
  try {
    const user = await getPayloadUser()

    if (!couponCode || !couponCode.trim()) return { valid: false, error: 'Please enter a coupon code' }

    // Public endpoint whose "not found" vs other answers reveal which codes exist, so it is
    // limited per address (the /api/validate-coupon route used by the UI already has its own limit).
    const gate = await checkRateLimit(`verify-coupon:${await getClientIp()}`, 60, 600)
    if (!gate.allowed) return { valid: false, error: 'Too many coupon attempts. Please wait a few minutes and try again.' }

    const payload = await getPayload({ config: configPromise })
    const coupons = await payload.find({
      collection: 'coupons',
      where: { code: { equals: couponCode.trim().toUpperCase() } },
      limit: 1,
      overrideAccess: true,
    })



    const coupon = coupons.docs[0]
    if (!coupon) return { valid: false, error: 'Coupon code not found' }
    if ((coupon as any).isActive === false) return { valid: false, error: 'This coupon is no longer active' }

    // Prevent Self-Referral
    if (user) {
      const affiliates = await payload.find({
        collection: 'affiliates',
        where: {
          and: [
            { user: { equals: user.id } },
            { couponCode: { equals: coupon.code } }
          ]
        },
        limit: 1,
        overrideAccess: true,
      })
      
      if (affiliates.docs.length > 0) {
        return { valid: false, error: 'You cannot use your own affiliate coupon' }
      }
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return { valid: false, error: 'This coupon has expired' }
    }

    // Check usage limit
    if (coupon.usageLimit && (coupon.usageCount || 0) >= coupon.usageLimit) {
      return { valid: false, error: 'This coupon has reached its usage limit' }
    }

    // Verify actual items
    let cartItems: any[] = []
    if (clientCartItems && clientCartItems.length > 0) {
      cartItems = clientCartItems.map((item: any) => ({
        product: item.productId || item.product?.id || item.product,
        quantity: item.quantity || 1,
        priceSnapshot: item.priceSnapshot,
        variantSku: item.variantSku
      }))
    } else if (user) {
      const carts = await payload.find({
        collection: 'carts',
        where: { user: { equals: user.id } },
        limit: 1,
        overrideAccess: true,
      })
      cartItems = carts.docs[0]?.items || []
    } else {
      // Dummy cart for guest testing
      cartItems = [{ product: 1, quantity: 1 }]
    }

    if (cartItems.length === 0) {
      return { valid: false, error: 'Cart is empty' }
    }

    const { discount, description, eligibleSubtotal, totalSubtotal, ineligibleReasons } = await calculateCartTotals(cartItems, payload, coupon)

    // Check minimum spend (both minSpend and totalSubtotal are in dollars)
    if (coupon.minSpend && totalSubtotal < coupon.minSpend) {
      return { valid: false, error: `Minimum spend of $${coupon.minSpend.toFixed(2)} required` }
    }

    // Check locked emails
    if (coupon.lockedEmails && coupon.lockedEmails.length > 0) {
      if (!user) return { valid: false, error: 'You must log in to use this specific coupon' }
      // Case-insensitive: approved emails are stored lowercased, but account emails can be saved with capitals.
      const userEmail = String(user.email || '').trim().toLowerCase()
      const allowed = coupon.lockedEmails.some((e: any) => String(e.email || '').trim().toLowerCase() === userEmail)
      if (!allowed) return { valid: false, error: 'This coupon is not available for your account' }
    }

    // New customers only
    if ((coupon as any).newCustomersOnly) {
      if (!user) return { valid: false, error: 'You must be logged in to use this coupon' }
      const priorOrders = await payload.find({
        collection: 'orders',
        where: { owner: { equals: user.id } },
        limit: 1,
        overrideAccess: true,
      })
      if (priorOrders.docs.length > 0) {
        return { valid: false, error: 'This coupon is only valid for new customers with no previous orders' }
      }
    }

    if (eligibleSubtotal === 0 && coupon.type !== 'free_shipping') {
      const reasonMessages: Record<string, string> = {
        sale_excluded: 'This coupon cannot be combined with items already on sale',
        kit_not_allowed: 'This coupon only applies to single items, not kit/bundle products',
        kit_required: 'This coupon only applies to kit/bundle products',
        not_specific_product: 'This coupon only applies to specific products that are not in your cart',
        not_specific_category: 'This coupon only applies to specific product categories that are not in your cart',
      }
      const messages = (ineligibleReasons || []).map((r: string) => reasonMessages[r]).filter(Boolean)
      return {
        valid: false,
        error: messages.length > 0 ? messages.join('. ') + '.' : 'This coupon does not apply to any items in your cart',
      }
    }

    return {
      valid: true,
      code: coupon.code,
      discount,
      description,
      freeShipping: coupon.freeShipping || coupon.type === 'free_shipping',
    }
  } catch (error: any) {
    return { valid: false, error: error.message || 'An unexpected error occurred' }
  }
}

export async function getShopProducts(params: {
  page?: number
  limit?: number
  categories?: string[]
  inStock?: boolean
  onSale?: boolean
  minPrice?: number
  maxPrice?: number
  sort?: string
  bestSellersOnly?: boolean
}) {
  try {
    const payload = await getPayload({ config: configPromise })

    const where: any = {
      and: [
        { isVisible: { equals: true } },
        { status: { equals: 'active' } }
      ]
    }

    if (params.categories && params.categories.length > 0) {
      const cats = await payload.find({
        collection: 'categories',
        where: {
          or: [
            { name: { in: params.categories } },
            { slug: { in: params.categories } },
          ],
        },
        depth: 0,
        overrideAccess: true,
      })
      const catIds = cats.docs.map(c => c.id)
      if (catIds.length > 0) {
        where.and.push({ categories: { in: catIds } })
      } else {
        // If categories filter provided but none matched, return empty
        return { success: true, products: [], totalPages: 0, page: 1, hasNextPage: false }
      }
    }

    if (params.inStock) {
      where.and.push({ stock: { greater_than: 0 } })
    }

    if (params.onSale) {
      where.and.push({ salePrice: { greater_than: 0 } })
    }

    if (params.bestSellersOnly) {
      where.and.push({ isBestSeller: { equals: true } })
    }

    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      const priceQuery: any = {}
      if (params.minPrice !== undefined) priceQuery.greater_than_equal = params.minPrice
      if (params.maxPrice !== undefined) priceQuery.less_than_equal = params.maxPrice
      where.and.push({ price: priceQuery })
    }

    let sortParam = '-createdAt'
    if (params.sort === 'price-asc') sortParam = 'price'
    if (params.sort === 'price-desc') sortParam = '-price'
    if (params.sort === 'newest') sortParam = '-createdAt'
    if (params.sort === 'name-asc') sortParam = 'name'

    const limit = params.limit || 24
    const page = params.page || 1

    const locale = await getLocale()
    const results = await payload.find({
      collection: 'products',
      where,
      limit,
      page,
      sort: sortParam,
      depth: 1, // Fetches media URLs and category names
      overrideAccess: true,
      locale: locale as 'en' | 'es',
      fallbackLocale: 'en',
    })

    const uiProducts = results.docs.map(toShopCardProduct)

    return {
      success: true,
      products: uiProducts,
      totalPages: results.totalPages,
      page: results.page,
      hasNextPage: results.hasNextPage,
    }
  } catch (err: any) {
    return { success: false, error: err.message, products: [], totalPages: 0 }
  }
}

export async function getUserDefaultAddress() {
  try {
    const user = await getPayloadUser()
    if (!user) return null

    const payload = await getPayload({ config: configPromise })
    const addresses = await payload.find({
      collection: 'addresses',
      where: { 
        user: { equals: user.id },
        isDefaultShipping: { equals: true }
      },
      limit: 1,
      overrideAccess: true,
    })

    if (addresses.docs.length > 0) {
      return addresses.docs[0]
    }

    const anyAddress = await payload.find({
      collection: 'addresses',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })

    return anyAddress.docs.length > 0 ? anyAddress.docs[0] : null
  } catch (err) {
    return null
  }
}

export async function getUserHBPoints() {
  try {
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/auth/authOptions')
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return 0

    const payload = await getPayload({ config: configPromise })
    const payloadUser = await payload.findByID({
      collection: 'users',
      id: session.user.id,
      depth: 0,
    })

    return typeof payloadUser?.hbPoints === 'number' ? payloadUser.hbPoints : 0
  } catch (error) {
    console.error('Error fetching VL points:', error)
    return 0
  }
}

export async function syncGuestOrdersToUser(payload: any, user: any) {
  try {
    const guestOrders = await payload.find({
      collection: 'orders',
      where: {
        and: [
          { guestEmail: { equals: user.email } },
          { owner: { exists: false } }
        ]
      },
      limit: 100,
      overrideAccess: true,
    });

    for (const order of guestOrders.docs) {
      // 1. Save Address if it exists
      if (order.shippingAddress && order.shippingAddress.line1) {
        const existingAddr = await payload.find({
          collection: 'addresses',
          where: {
            and: [
              { user: { equals: user.id } },
              { line1: { equals: order.shippingAddress.line1 } },
              { postalCode: { equals: order.shippingAddress.postalCode } }
            ]
          },
          limit: 1,
          overrideAccess: true,
        });

        if (existingAddr.docs.length === 0) {
          await payload.create({
            collection: 'addresses',
            data: {
              user: user.id,
              label: 'Imported Address',
              firstName: order.customerFirstName || 'Customer',
              lastName: order.customerLastName || 'User',
              line1: order.shippingAddress.line1,
              line2: order.shippingAddress.line2 || '',
              city: order.shippingAddress.city || '',
              state: order.shippingAddress.state || '',
              postalCode: order.shippingAddress.postalCode || '',
              country: order.shippingAddress.country || 'US',
              phone: order.customerPhone || '',
              isDefaultShipping: false,
            },
            overrideAccess: true,
          });
        }
      }

      // 2. Claim Order
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: { owner: user.id },
        overrideAccess: true,
      });
    }
  } catch (e) {
    console.error('Failed to sync guest orders', e);
  }
}

export async function getUserAddresses() {
  try {
    const user = await getPayloadUser()
    if (!user) return []

    const payload = await getPayload({ config: configPromise })
    
    // Auto-claim any unowned guest orders and import their addresses
    await syncGuestOrdersToUser(payload, user)

    const addresses = await payload.find({
      collection: 'addresses',
      where: { user: { equals: user.id } },
      limit: 50,
      overrideAccess: true,
    })

    return addresses.docs || []
  } catch (err) {
    return []
  }
}
