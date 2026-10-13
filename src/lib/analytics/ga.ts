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
