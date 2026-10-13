import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  DEFAULT_PAYMENT_METHODS,
  availablePaymentMethods,
  normalizePaymentMethods,
  type PaymentMethodKey,
  type PaymentMethodRow,
} from './methods'

// Server-side access to the "Payment Methods" global. Server code only: it reads the database and
// the environment.

// The card option needs the gateway's settings as well as the switch in the admin. Without them an
// order could be created and then fail to open a payment page, so the option is left out instead.
export function isVeracuepayConfigured(): boolean {
  return !!(
    process.env.VERACUEPAY_API_BASE_URL &&
    process.env.VERACUEPAY_API_SECRET &&
    process.env.NEXT_PUBLIC_VERACUEPAY_CHECKOUT_URL
  )
}

async function readRows(): Promise<PaymentMethodRow[]> {
  const payload = await getPayload({ config: configPromise })
  const doc = await payload.findGlobal({ slug: 'payment-methods', depth: 0, overrideAccess: true })
  return normalizePaymentMethods(doc?.methods)
}

// The checkout page asks for this on every visit, so it is cached; saving the global in the admin
// revalidates the 'payment-methods' tag (see the global's hook). The time limit is only a backstop.
const readRowsCached = unstable_cache(readRows, ['payment-methods-rows'], {
  revalidate: 300,
  tags: ['payment-methods'],
})

/** All stored rows, switched on or off, in the admin's order. Falls back to the defaults if unreadable. */
export async function getPaymentMethodRows(): Promise<PaymentMethodRow[]> {
  try {
    return await readRowsCached()
  } catch (error) {
    console.error('payment methods: using defaults, the setting could not be read', error)
    return DEFAULT_PAYMENT_METHODS
  }
}

/** The options to show at checkout, in order. Cached. */
export async function getAvailablePaymentMethods(): Promise<PaymentMethodRow[]> {
  return availablePaymentMethods(await getPaymentMethodRows(), { veracuepayConfigured: isVeracuepayConfigured() })
}

/**
 * Whether an order may be placed with this method right now. Deliberately NOT cached: this runs once
 * per order, and a method switched off in the admin must stop taking orders immediately, not after a
 * cache expires. If the setting cannot be read the defaults apply, so a database hiccup does not stop
 * customers from paying.
 */
export async function isPaymentMethodAvailable(key: PaymentMethodKey): Promise<boolean> {
  let rows: PaymentMethodRow[]
  try {
    rows = await readRows()
  } catch (error) {
    console.error('payment methods: using defaults for an order check, the setting could not be read', error)
    rows = DEFAULT_PAYMENT_METHODS
  }
  return availablePaymentMethods(rows, { veracuepayConfigured: isVeracuepayConfigured() }).some((row) => row.key === key)
}
