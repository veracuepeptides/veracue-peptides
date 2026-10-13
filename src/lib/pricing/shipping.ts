/**
 * Shipping rules shared by the cart, the cart drawer and checkout, so the three can never show
 * different fees. The data itself lives in the ShippingZones collection (see the 99 Purity-style
 * setup: a "free" method has price 0 and a minOrderAmount). FALLBACK_SHIPPING_METHODS only applies
 * when no ShippingZones document exists, and encodes the same store policy:
 *   - US orders under $300: $25 standard shipping
 *   - US orders of $300 or more: free standard shipping
 *   - express and international orders are never free
 */

export type ShippingMethodLike = {
  method: string
  price: number
  estimatedDays?: number | null
  minOrderAmount?: number | null
  isInternational?: boolean | null
}

export const FREE_SHIPPING_MIN_SUBTOTAL = 300

export const FALLBACK_SHIPPING_METHODS: ShippingMethodLike[] = [
  { method: 'Standard Shipping', price: 25, estimatedDays: 5 },
  { method: 'Free Shipping', price: 0, estimatedDays: 5, minOrderAmount: FREE_SHIPPING_MIN_SUBTOTAL },
  { method: 'Express Shipping', price: 50, estimatedDays: 2 },
  { method: 'International Shipping', price: 50, estimatedDays: null, isInternational: true },
]

/**
 * Countries the store ships to. The store currently ships within the US only. The international
 * method above stays defined so widening this later is only a settings change: set the
 * SHIPPING_COUNTRIES environment variable (comma-separated ISO codes, for example "US,CA") and
 * redeploy. Read on the server only; the checkout page asks the server for the list.
 */
export const DEFAULT_SHIPPING_COUNTRIES = ['US']

export function resolveShippingCountries(setting?: string | null): string[] {
  const parsed = String(setting ?? '')
    .split(',')
    .map((code) => code.trim().toUpperCase())
    .filter((code) => /^[A-Z]{2}$/.test(code))
  return parsed.length > 0 ? Array.from(new Set(parsed)) : DEFAULT_SHIPPING_COUNTRIES
}

/** The domestic methods a customer can pick at this subtotal (same filter checkout applies). */
export function visibleDomesticMethods(methods: ShippingMethodLike[], subtotal: number): ShippingMethodLike[] {
  return methods.filter((method) => {
    if (method.isInternational) return false
    if (method.minOrderAmount && method.minOrderAmount > 0) return subtotal >= method.minOrderAmount
    return true
  })
}

/** Subtotal at which standard shipping becomes free, or null when no such method is configured. */
export function getFreeShippingThreshold(methods: ShippingMethodLike[]): number | null {
  const thresholds = methods
    .filter((method) => !method.isInternational && method.price === 0 && (method.minOrderAmount ?? 0) > 0)
    .map((method) => method.minOrderAmount as number)
  return thresholds.length > 0 ? Math.min(...thresholds) : null
}

/**
 * The fee checkout selects by default for a US order at this subtotal: the cheapest method that is
 * available at that subtotal. Used by the cart so its estimate matches what checkout will charge.
 */
export function estimateDomesticShipping(methods: ShippingMethodLike[], subtotal: number): number {
  const visible = visibleDomesticMethods(methods, subtotal)
  if (visible.length === 0) return 0
  return Math.min(...visible.map((method) => method.price))
}
