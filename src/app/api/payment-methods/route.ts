import { NextResponse } from 'next/server'
import { getAvailablePaymentMethods, isVeracuepayConfigured } from '@/lib/payments/settings'
import { DEFAULT_PAYMENT_METHODS, availablePaymentMethods } from '@/lib/payments/methods'

// The payment options checkout shows. Small and cacheable, like /api/pricing-config. The cache is
// short because an option switched off in the admin should disappear quickly; the server also
// checks the setting again when an order is placed, so a stale answer can never take a payment
// through a method that is off.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const methods = (await getAvailablePaymentMethods()).map(({ key, label, description }) => ({ key, label, description }))
    return NextResponse.json({ methods }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } })
  } catch (error) {
    console.error('payment-methods: falling back to defaults', error)
    const methods = availablePaymentMethods(DEFAULT_PAYMENT_METHODS, { veracuepayConfigured: isVeracuepayConfigured() }).map(
      ({ key, label, description }) => ({ key, label, description }),
    )
    return NextResponse.json({ methods }, { headers: { 'Cache-Control': 'public, s-maxage=10' } })
  }
}
