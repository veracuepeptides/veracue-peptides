/**
 * The payment options checkout can offer, and the rules that turn the stored setting (the
 * "Payment Methods" global in the admin) into the list a customer sees. Shared by the checkout
 * page, the public endpoint and the server-side check made when an order is placed, so the three
 * can never disagree. Nothing here touches the database or the environment.
 */

// The methods that have a working checkout handler. A method can only be switched on or off, and
// reordered, from the admin; adding a new one means adding its handler first.
export const PAYMENT_METHOD_KEYS = ['veracuepay', 'zelle', 'stripe_link'] as const
export type PaymentMethodKey = (typeof PAYMENT_METHOD_KEYS)[number]

export type PaymentMethodRow = {
  key: PaymentMethodKey
  enabled: boolean
  label: string
  description: string
}

/** What the checkout page needs for one option. */
export type PublicPaymentMethod = Pick<PaymentMethodRow, 'key' | 'label' | 'description'>

// Used until the admin has saved the global, and whenever it cannot be read. This is exactly what
// the checkout offered before the setting existed, so a missing or unreadable setting never changes
// what customers see (or locks them out of paying).
export const DEFAULT_PAYMENT_METHODS: PaymentMethodRow[] = [
  {
    key: 'veracuepay',
    enabled: true,
    label: 'Credit / Debit Card',
    description: "You'll be securely redirected to our payment partner, VeracuePay, to enter your card details.",
  },
  {
    key: 'zelle',
    enabled: true,
    label: 'Zelle',
    description: "You'll receive Zelle payment instructions on the next page after placing your order.",
  },
  {
    key: 'stripe_link',
    enabled: true,
    label: 'Stripe (Custom Payment Link)',
    description: 'Secure payment via an emailed Stripe link.',
  },
]

const isKey = (value: unknown): value is PaymentMethodKey =>
  typeof value === 'string' && (PAYMENT_METHOD_KEYS as readonly string[]).includes(value)

/**
 * Turns whatever is stored into clean rows, in the stored order. Unknown keys and repeats are
 * dropped, and a blank label or description falls back to the default wording. A key that is not in
 * the stored list is simply not offered. When nothing usable is stored the defaults apply.
 */
export function normalizePaymentMethods(stored: unknown): PaymentMethodRow[] {
  if (!Array.isArray(stored)) return DEFAULT_PAYMENT_METHODS

  const seen = new Set<PaymentMethodKey>()
  const rows: PaymentMethodRow[] = []
  for (const raw of stored) {
    if (!raw || typeof raw !== 'object' || !isKey((raw as any).key) || seen.has((raw as any).key)) continue
    const key = (raw as any).key as PaymentMethodKey
    seen.add(key)
    const fallback = DEFAULT_PAYMENT_METHODS.find((row) => row.key === key)!
    const label = typeof (raw as any).label === 'string' ? (raw as any).label.trim() : ''
    const description = typeof (raw as any).description === 'string' ? (raw as any).description.trim() : ''
    rows.push({
      key,
      // Only an explicit "off" turns a method off; a row saved without the flag stays on.
      enabled: (raw as any).enabled !== false,
      label: label || fallback.label,
      description: description || fallback.description,
    })
  }
  return rows.length > 0 ? rows : DEFAULT_PAYMENT_METHODS
}

/**
 * The rows a customer can actually use: switched on, and (for the card option) the card gateway is
 * configured in this environment, so checkout never offers a card option that cannot work.
 */
export function availablePaymentMethods(rows: PaymentMethodRow[], options: { veracuepayConfigured: boolean }): PaymentMethodRow[] {
  return rows.filter((row) => row.enabled && (row.key !== 'veracuepay' || options.veracuepayConfigured))
}

export const PAYMENT_METHODS_UNAVAILABLE_MESSAGE =
  'That payment method is not available right now. Please choose another one.'
