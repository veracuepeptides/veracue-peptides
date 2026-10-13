import { timingSafeEqual } from 'node:crypto'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Server-side helpers for talking to the VeracuePay gateway that are shared by the checkout
 * action and the webhook route. Deliberately NOT a 'use server' file: nothing in here should be
 * callable from a browser.
 */

export type VeracuepayStatus = {
  status: string
  amount: number
  currency: string
  metadata?: Record<string, string>
  amountRefunded?: number
}

/**
 * The reference Stripe holds for an order, and what VeracuePay pings come back with: the order
 * number customers see (#1281), so what is shown in the Stripe dashboard matches the real order.
 * Veracue's internal database id never leaves this site.
 */
export function gatewayReference(order: { id: number | string; orderNumber?: string | null }): string {
  return String(order.orderNumber || order.id)
}

/**
 * Finds the order a gateway reference (see gatewayReference) belongs to. Orders are matched on their
 * order number only: a reference is never treated as a database id, so a number that happens to equal
 * another order's id cannot reach the wrong order. A number that matches more than one order is
 * refused rather than guessed at. Only an order that has no number at all is referenced by its id.
 */
export async function findOrderByGatewayReference(reference: unknown) {
  const value = typeof reference === 'string' || typeof reference === 'number' ? String(reference).trim() : ''
  if (!value) return null
  const payload = await getPayload({ config: configPromise })
  const byNumber = await payload.find({
    collection: 'orders',
    where: { orderNumber: { equals: value } },
    limit: 2,
    depth: 0,
    overrideAccess: true,
  })
  if (byNumber.docs.length === 1) return byNumber.docs[0]
  if (byNumber.docs.length > 1) {
    console.error(`findOrderByGatewayReference: order number ${value} matches ${byNumber.docs.length} orders; refusing`)
    return null
  }
  const asId = await findOrderForGateway(value)
  return asId && !asId.orderNumber ? asId : null
}

/**
 * Loads an order for a gateway ping. Payload throws NotFound for an id that does not exist, and a
 * non-numeric id would fail as a database error; for a ping both simply mean "no such order", which
 * must be reported as such (a retry could never succeed) rather than as a server error.
 */
export async function findOrderForGateway(orderId: string | number) {
  const numericId = Number(orderId)
  if (!Number.isInteger(numericId) || numericId <= 0) return null
  const payload = await getPayload({ config: configPromise })
  try {
    return await payload.findByID({ collection: 'orders', id: numericId, depth: 0, overrideAccess: true })
  } catch (error: any) {
    if (error?.status === 404 || error?.name === 'NotFound') return null
    throw error
  }
}

/** True when the request carries VeracuePay's shared secret as a bearer token. */
export function isAuthorizedVeracuepayRequest(req: Request): boolean {
  const secret = process.env.VERACUEPAY_API_SECRET
  if (!secret) return false
  const supplied = Buffer.from(req.headers.get('authorization') ?? '')
  const expected = Buffer.from(`Bearer ${secret}`)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

/** Authenticated status lookup — the real, current PaymentIntent state straight from Stripe. */
export async function fetchVeracuepayStatus(paymentIntentId: string): Promise<VeracuepayStatus | null> {
  try {
    const response = await fetch(`${process.env.VERACUEPAY_API_BASE_URL}/payments/status`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERACUEPAY_API_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentIntentId }),
    })
    if (!response.ok) return null
    return (await response.json()) as VeracuepayStatus
  } catch {
    return null
  }
}

/**
 * Releases a still-pending order's reservation (stock, coupon, points) when its payment failed or
 * could not be started. A finalized order, or one that has moved past pending, is left alone.
 */
export async function cancelUnfinalizedOrder(orderId: string | number) {
  try {
    const payload = await getPayload({ config: configPromise })
    const order = await payload.findByID({ collection: 'orders', id: Number(orderId), depth: 0, overrideAccess: true })
    if (order && !order.isFinalized && order.status === 'pending') {
      await payload.update({ collection: 'orders', id: Number(orderId), data: { status: 'cancelled' }, overrideAccess: true, context: { paymentFailed: true } })
    }
  } catch (err) {
    console.error(`Failed to cancel unfinalized VeracuePay order ${orderId}:`, err)
  }
}

/**
 * Handles a 'failed' ping. A declined card is NOT the end of a payment: the same hosted page can be
 * retried with another card. Cancelling the order on every decline would release its stock, and a
 * successful retry would then mark it paid with nothing reserved (nothing re-reserves stock for a
 * cancelled order that is later paid). So the ping is verified with the gateway like every other:
 * the order is cancelled only when the PaymentIntent itself has been canceled, which is final.
 * Orders that are simply abandoned are released by the expiry sweep.
 */
export async function handleVeracuepayFailure(
  orderId: string,
): Promise<{ error?: string; notFound?: boolean; action?: 'cancelled' | 'kept' }> {
  try {
    const order = await findOrderForGateway(orderId)
    if (!order) return { error: 'Order not found', notFound: true }
    if (order.paymentMethod !== 'veracuepay' || !order.veracuepayPaymentIntentId) return { action: 'kept' }
    if (order.isFinalized || order.status !== 'pending') return { action: 'kept' }

    const data = await fetchVeracuepayStatus(order.veracuepayPaymentIntentId)
    if (!data) return { error: 'Failed to reach VeracuePay for status check' }
    if (data.metadata?.orderId !== gatewayReference(order)) {
      console.error(`handleVeracuepayFailure: order mismatch (order ${gatewayReference(order)}, PaymentIntent belongs to ${data.metadata?.orderId})`)
      return { error: 'Order/payment mismatch' }
    }
    if (data.status !== 'canceled') return { action: 'kept' }

    await cancelUnfinalizedOrder(orderId)
    return { action: 'cancelled' }
  } catch (error: any) {
    console.error('Failed to handle VeracuePay failure ping:', error)
    return { error: error.message }
  }
}

// PaymentIntent states where the customer can still (re)try paying on the hosted page.
const PAYABLE_STATUSES = ['requires_payment_method', 'requires_confirmation', 'requires_action']
// States where money has been, or is about to be, taken.
const PAID_OR_PAYING_STATUSES = ['succeeded', 'processing', 'requires_capture']

export type ExistingPayment =
  | { kind: 'reuse'; paymentIntentId: string }
  | { kind: 'already_paid' }
  | { kind: 'create' }

/**
 * An order must only ever have ONE PaymentIntent. Checkout's duplicate-click guard hands back the
 * same pending order for a repeat "Place order", and a fresh PaymentIntent for it would replace
 * the stored one — leaving the earlier one (which the customer may still have open in another
 * tab, and which Stripe's webhook still reports against this order) payable but no longer the
 * one we verify, so a real payment could land and never be recorded.
 *
 * So: if the order already has a PaymentIntent for the right order and amount, keep using it.
 */
export async function findExistingVeracuepayPayment(order: {
  id: number | string
  orderNumber?: string | null
  total?: number | null
  veracuepayPaymentIntentId?: string | null
}): Promise<ExistingPayment> {
  const paymentIntentId = order.veracuepayPaymentIntentId
  if (!paymentIntentId) return { kind: 'create' }

  const existing = await fetchVeracuepayStatus(paymentIntentId)
  if (!existing) return { kind: 'create' }

  const expectedCents = Math.round((order.total || 0) * 100)
  if (existing.metadata?.orderId !== gatewayReference(order) || existing.amount !== expectedCents) {
    return { kind: 'create' }
  }

  if (PAYABLE_STATUSES.includes(existing.status)) return { kind: 'reuse', paymentIntentId }
  if (PAID_OR_PAYING_STATUSES.includes(existing.status)) return { kind: 'already_paid' }
  return { kind: 'create' } // canceled — that PaymentIntent is dead, a new one is needed
}

/**
 * Keeps Veracue in step with a refund issued from the Stripe dashboard. Like every other
 * VeracuePay ping this never trusts the webhook body: the refunded amount is re-read from the
 * gateway. A full refund marks the order refunded (which runs the normal refund side effects —
 * restock, points/coupon release, customer email). A partial refund only leaves an internal
 * note, since what to do about the goods is a human decision.
 */
export async function syncVeracuepayRefund(
  orderId: string,
): Promise<{ error?: string; notFound?: boolean; action?: 'refunded' | 'partial_noted' | 'none' }> {
  try {
    const payload = await getPayload({ config: configPromise })
    const order = await findOrderForGateway(orderId)
    if (!order) return { error: 'Order not found', notFound: true }

    const paymentIntentId = order.veracuepayPaymentIntentId
    if (!paymentIntentId) return { error: 'No payment reference on this order' }

    const data = await fetchVeracuepayStatus(paymentIntentId)
    if (!data) return { error: 'Failed to reach VeracuePay for status check' }

    if (!data.metadata?.orderId || data.metadata.orderId !== gatewayReference(order)) {
      console.error(`syncVeracuepayRefund: order mismatch (order ${gatewayReference(order)}, PaymentIntent belongs to ${data.metadata?.orderId})`)
      return { error: 'Order/payment mismatch' }
    }

    const refunded = data.amountRefunded || 0
    if (data.status !== 'succeeded' || refunded <= 0) return { action: 'none' }

    if (refunded >= data.amount) {
      if (order.paymentStatus === 'refunded' && (order.status === 'refunded' || order.status === 'cancelled')) {
        return { action: 'none' }
      }
      // A cancelled order has already released its stock/coupon/points, and the status machine
      // has no cancelled → refunded step; only the payment state changes.
      const update: Record<string, string> =
        order.status === 'cancelled' ? { paymentStatus: 'refunded' } : { status: 'refunded', paymentStatus: 'refunded' }
      await payload.update({ collection: 'orders', id: order.id, data: update as any, overrideAccess: true })
      return { action: 'refunded' }
    }

    const noteText = `Partial refund of $${(refunded / 100).toFixed(2)} (of $${(data.amount / 100).toFixed(2)}) was issued in Stripe. Order status left unchanged.`
    const notes = Array.isArray(order.notes) ? order.notes : []
    if (notes.some((n: any) => n?.note === noteText)) return { action: 'none' }
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: { notes: [...notes, { type: 'internal', note: noteText }] } as any,
      overrideAccess: true,
    })
    return { action: 'partial_noted' }
  } catch (error: any) {
    console.error('Failed to sync VeracuePay refund:', error)
    return { error: error.message }
  }
}
