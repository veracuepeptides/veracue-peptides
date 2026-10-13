/**
 * Server-side checks for the cart lines a checkout request carries.
 *
 * Checkout actions are public POST endpoints, so everything in the request body is attacker
 * controlled regardless of what the UI allows. These helpers make sure a line can only resolve to
 * a real, purchasable product option with a sane quantity before any price is computed:
 *  - quantities must be whole numbers between 1 and MAX_LINE_QUANTITY (a negative line used to
 *    cancel out the rest of the subtotal and inflate stock);
 *  - a variant SKU must match an actual variant (an unknown one used to fall back to the cheapest
 *    base price while the client-supplied label was stored on the order);
 *  - draft, archived and hidden products cannot be bought.
 */

export const MAX_LINE_QUANTITY = 100
export const MAX_CART_LINES = 50

const MAX_TEXT_LENGTH = 200

type NormalizedResult = { items: any[] } | { error: string }

export function normalizeCheckoutItems(raw: unknown): NormalizedResult {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { error: 'Your cart is empty.' }
  }
  if (raw.length > MAX_CART_LINES) {
    return { error: `A single order can contain at most ${MAX_CART_LINES} different items.` }
  }

  const merged = new Map<string, any>()

  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') {
      return { error: 'One or more items in your cart are invalid. Please refresh your cart and try again.' }
    }
    const item = entry as Record<string, any>

    const productId = typeof item.productId === 'number' || typeof item.productId === 'string' ? String(item.productId).trim() : ''
    if (!productId || productId.length > MAX_TEXT_LENGTH) {
      return { error: 'One or more items in your cart are invalid. Please refresh your cart and try again.' }
    }

    const quantity = item.quantity
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
      return { error: `Each item quantity must be a whole number between 1 and ${MAX_LINE_QUANTITY}.` }
    }

    const priceSnapshot = Number(item.priceSnapshot)
    if (!Number.isFinite(priceSnapshot) || priceSnapshot < 0) {
      return { error: 'One or more items in your cart are invalid. Please refresh your cart and try again.' }
    }

    const variantSku =
      typeof item.variantSku === 'string' && item.variantSku.trim() ? item.variantSku.trim().slice(0, MAX_TEXT_LENGTH) : undefined
    const variantTitle =
      typeof item.variantTitle === 'string' && item.variantTitle.trim() ? item.variantTitle.trim().slice(0, MAX_TEXT_LENGTH) : undefined

    // The same product and option added on two lines is one line with the combined quantity.
    const key = `${productId}|${variantSku ?? ''}`
    const existing = merged.get(key)
    if (existing) {
      const combined = existing.quantity + quantity
      if (combined > MAX_LINE_QUANTITY) {
        return { error: `Each item quantity must be a whole number between 1 and ${MAX_LINE_QUANTITY}.` }
      }
      existing.quantity = combined
    } else {
      merged.set(key, { ...item, productId, quantity, priceSnapshot, variantSku, variantTitle })
    }
  }

  return { items: Array.from(merged.values()) }
}

/** Draft, archived and hidden products must not be orderable even if their id is known. */
export function isPurchasableProduct(product: any): boolean {
  return !!product && product.status === 'active' && product.isVisible !== false
}

const variantTitleOf = (variant: any): string =>
  variant?.options?.map((option: any) => option.value).join(' ') || `Variant ${variant?.sku}`

/**
 * Confirms the cart's variant reference points at something the product really offers, using the
 * same matching rules the price lookup uses (variant title or SKU, bundle composites, bundle name),
 * so a price can only ever come from the record that matched.
 */
export function matchPurchasableOption(
  product: any,
  variantSku: string | null | undefined,
): { ok: boolean; title: string | null } {
  const variants: any[] = Array.isArray(product?.variants) ? product.variants : []
  const bundles: any[] = Array.isArray(product?.bulkBundles) ? product.bulkBundles : []
  const sku = String(variantSku ?? '')

  // A product with no variants prices from its base price whatever the reference says.
  if (variants.length === 0) {
    const bundleMatch = bundles.some((bundle) => bundle?.name === sku)
    return { ok: true, title: bundleMatch ? sku : null }
  }

  for (const variant of variants) {
    const title = variantTitleOf(variant)
    if (sku === title || sku === variant.sku) return { ok: true, title }
    for (const bundle of bundles) {
      const composites = [`${title} - ${bundle.name}`, `${variant.sku} - ${bundle.name}`, `Variant - ${bundle.name}`]
      if (composites.includes(sku)) return { ok: true, title: sku }
    }
  }
  if (bundles.some((bundle) => bundle?.name === sku)) return { ok: true, title: sku }

  return { ok: false, title: null }
}
