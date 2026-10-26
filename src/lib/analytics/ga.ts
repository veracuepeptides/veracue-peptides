/**
 * Google Analytics 4 events.
 *
 * The site loads Google's gtag.js (see the layouts). gtag.js only acts on dataLayer entries that are an
 * `arguments` object, which is what its own gtag() helper pushes. Plain objects such as
 * `{ event: 'purchase', ecommerce: {...} }` are the Google Tag Manager format and are silently ignored,
 * so the ecommerce events were never reaching GA4. Everything here pushes the format gtag.js reads.
 *
 * An event fired before the GA script has finished loading waits in the queue and is sent when it does.
 * With no measurement id (local development, previews) nothing is queued at all.
 */

type EventParams = Record<string, unknown>

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
  try {
    const w = window as unknown as { dataLayer?: unknown[] }
    const queue = (w.dataLayer = w.dataLayer || [])
    // Same shape as `function gtag() { dataLayer.push(arguments) }` in the page's GA snippet.
    const gtag = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      queue.push(arguments)
    }
    gtag('event', name, params)
  } catch {
    // Analytics must never break the page.
  }
}

export type CartItemForAnalytics = {
  id: string | number
  name: string
  price: number
  quantity?: number
  variant?: string | null
}

export type CheckoutLineForAnalytics = {
  productId: string | number
  variantTitle?: string | null
  priceSnapshot: number
  quantity: number
  product: { name: string }
}

/**
 * GA4 add_shipping_info and add_payment_info, the two steps between begin_checkout and purchase. Without
 * them GA4's checkout funnel ("Add delivery", "Add payment") reads zero and shows nothing about where
 * shoppers leave. The one-page checkout has no separate steps, so add_shipping_info is sent once the
 * delivery details are filled in and add_payment_info when the shopper presses the pay button with a
 * valid form.
 */
export function trackCheckoutStep(
  step: 'add_shipping_info' | 'add_payment_info',
  details: {
    lines: CheckoutLineForAnalytics[]
    value: number
    coupon?: string | null
    shippingTier?: string
    paymentType?: string
  },
): void {
  trackEvent(step, {
    currency: 'USD',
    value: details.value,
    ...(details.coupon ? { coupon: details.coupon } : {}),
    ...(step === 'add_shipping_info' && details.shippingTier ? { shipping_tier: details.shippingTier } : {}),
    ...(step === 'add_payment_info' && details.paymentType ? { payment_type: details.paymentType } : {}),
    items: details.lines.map((line, index) => ({
      item_id: String(line.productId),
      item_name: line.product.name,
      ...(line.variantTitle ? { item_variant: line.variantTitle } : {}),
      price: line.priceSnapshot,
      quantity: line.quantity,
      index,
    })),
  })
}

/** GA4 add_to_cart for one line. Used wherever a shopper can add a product. */
export function trackAddToCart(item: CartItemForAnalytics): void {
  const quantity = item.quantity ?? 1
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: item.price * quantity,
    items: [
      {
        item_id: String(item.id),
        item_name: item.name,
        ...(item.variant ? { item_variant: item.variant } : {}),
        price: item.price,
        quantity,
      },
    ],
  })
}
