import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Manual payment orders (Zelle, Amex, Stripe Link) reserve stock and coupon usage at checkout but
// are only paid when a person confirms the transfer. Without this sweep an unpaid order would hold
// that stock forever. Cancelling it runs the existing cancellation hook, which releases the stock,
// the coupon slot and any redeemed points, and emails the customer.
export const UNPAID_ORDER_EXPIRY_DAYS = 7
// VeracuePay is included because a customer can abandon its hosted page, which leaves the order
// pending with stock reserved and nothing else that would ever release it.
const MANUAL_PAYMENT_METHODS = ['zelle', 'amex', 'stripe_link', 'veracuepay'] as const
const BATCH_SIZE = 100

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  // Fail closed: with no secret configured, nothing may run.
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const cutoff = new Date(Date.now() - UNPAID_ORDER_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString()

  const stale = await payload.find({
    collection: 'orders',
    where: {
      and: [
        { paymentStatus: { equals: 'unpaid' } },
        { status: { equals: 'pending' } },
        { paymentMethod: { in: [...MANUAL_PAYMENT_METHODS] } },
        { createdAt: { less_than: cutoff } },
      ],
    },
    limit: BATCH_SIZE,
    depth: 0,
    sort: 'createdAt',
    overrideAccess: true,
  })

  const cancelled: Array<number | string> = []
  const failed: Array<{ id: number | string; error: string }> = []

  // Finalized orders are never expired. This is filtered here rather than in the query because
  // Payload's not_equals drops rows where the flag is NULL, which is how new orders are stored.
  const eligible = stale.docs.filter((order) => order.isFinalized !== true)

  for (const order of eligible) {
    try {
      await payload.update({
        collection: 'orders',
        id: order.id,
        data: { status: 'cancelled' },
        overrideAccess: true,
      })
      cancelled.push(order.id)
    } catch (error) {
      failed.push({ id: order.id, error: error instanceof Error ? error.message : 'unknown error' })
    }
  }

  return NextResponse.json({
    expiryDays: UNPAID_ORDER_EXPIRY_DAYS,
    matched: eligible.length,
    cancelled,
    failed,
  })
}
