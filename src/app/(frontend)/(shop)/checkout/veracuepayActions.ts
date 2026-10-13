'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { createPayloadOrder, notifyAdminFailedPayment } from './actions'
import { cancelUnfinalizedOrder, fetchVeracuepayStatus, findExistingVeracuepayPayment, findOrderForGateway, gatewayReference } from '@/lib/orders/veracuepayGateway'

// Everything exported from a 'use server' file is callable from any browser, so the helpers that
// must stay server-only (cancelling an order, talking to the gateway) live in veracuepayGateway.

/**
 * Creates the pending order (same reservation/dedupe path as every other payment method), then
 * asks VeracuePay to open a PaymentIntent for it. The order's own number is passed as `orderId` so
 * the status check / webhook ping can find it back.
 */
export async function createVeracuepayPayment(
  items: any[],
  shippingMethodName: string,
  couponCode: string | undefined,
  isRedeemingPoints: boolean,
  formData: any,
  userId?: string,
  isNewAddress = false
): Promise<{ orderId?: string; redirectUrl?: string; error?: string; updatedItems?: any[]; priceChanged?: boolean; paymentMethodUnavailable?: boolean }> {
  // Read per call rather than at import, so a missing setting is reported on the checkout that
  // needs it instead of being frozen in at startup.
  const VERACUEPAY_API_BASE_URL = process.env.VERACUEPAY_API_BASE_URL
  const VERACUEPAY_API_SECRET = process.env.VERACUEPAY_API_SECRET
  const VERACUEPAY_CHECKOUT_URL = process.env.NEXT_PUBLIC_VERACUEPAY_CHECKOUT_URL
  if (!VERACUEPAY_API_BASE_URL || !VERACUEPAY_API_SECRET || !VERACUEPAY_CHECKOUT_URL) {
    console.error('VeracuePay is not configured: VERACUEPAY_API_BASE_URL, VERACUEPAY_API_SECRET and NEXT_PUBLIC_VERACUEPAY_CHECKOUT_URL are all required')
    return { error: 'Card payments are unavailable right now. Please choose another payment method.' }
  }

  const orderRes = await createPayloadOrder(
    items,
    shippingMethodName,
    couponCode,
    isRedeemingPoints,
    formData,
    'veracuepay_pending',
    userId,
    'veracuepay',
    isNewAddress
  )

  if (orderRes.error || !orderRes.orderId) {
    return orderRes
  }

  const payload = await getPayload({ config: configPromise })
  const order = await payload.findByID({ collection: 'orders', id: Number(orderRes.orderId), depth: 0, overrideAccess: true })
  if (!order) {
    return { error: 'Order not found after creation' }
  }

  const headersList = await headers()
  const origin = headersList.get('origin') || `https://${headersList.get('host')}`

  // The duplicate-click guard in createPayloadOrder can hand back an order that already has a
  // PaymentIntent. Keep that one rather than opening a second — see findExistingVeracuepayPayment.
  const existing = await findExistingVeracuepayPayment(order)
  if (existing.kind === 'reuse') {
    return { orderId: orderRes.orderId, redirectUrl: `${VERACUEPAY_CHECKOUT_URL}?pi=${existing.paymentIntentId}` }
  }
  if (existing.kind === 'already_paid') {
    // Paid (or paying) already: send them to the confirmation page, which verifies and finalizes.
    return { orderId: orderRes.orderId, redirectUrl: `${origin}/order-confirmation/${order.id}` }
  }

  try {
    const response = await fetch(`${VERACUEPAY_API_BASE_URL}/payments/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VERACUEPAY_API_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // The order number the customer sees (#1281). It is the one reference Stripe holds and the one
        // VeracuePay pings come back with, so the Stripe dashboard matches the real order. Veracue's
        // internal database id is never sent.
        orderId: gatewayReference(order),
        amount: order.total,
        currency: 'usd',
        returnUrl: `${origin}/order-confirmation/${order.id}`,
        customerEmail: order.guestEmail || formData.email || undefined,
        // Shown as the transaction description in the Stripe dashboard, e.g. "VL Order #1042".
        // The number matches the one customers see in their emails and on the confirmation page.
        description: `VL Order #${order.orderNumber || order.id}`,
      }),
    })

    // The gateway answers with JSON on success and plain text on failure.
    const raw = await response.text()
    let data: { paymentIntentId?: string } = {}
    try {
      data = JSON.parse(raw)
    } catch {
      // Not JSON — `raw` carries the gateway's error message.
    }

    if (!response.ok || !data.paymentIntentId) {
      // Release the reservation immediately rather than leaving a dead pending order sitting
      // on reserved stock/coupon/points.
      await cancelUnfinalizedOrder(order.id)
      await notifyAdminFailedPayment(String(order.id), raw || 'Failed to initialize VeracuePay payment session').catch(console.error)
      return { error: 'Failed to initialize payment. Please try again.' }
    }

    // Stored for support/reconciliation lookups and for the status-check fallback below.
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: { veracuepayPaymentIntentId: data.paymentIntentId },
      overrideAccess: true,
    })

    return { orderId: orderRes.orderId, redirectUrl: `${VERACUEPAY_CHECKOUT_URL}?pi=${data.paymentIntentId}` }
  } catch (error: any) {
    await cancelUnfinalizedOrder(order.id)
    await notifyAdminFailedPayment(String(order.id), error.message || 'VeracuePay session creation threw').catch(console.error)
    console.error('VeracuePay session creation failed:', error)
    return { error: 'Failed to reach the payment page. Please try again.' }
  }
}

/**
 * Fallback status check for when the customer lands back on the confirmation page before the
 * webhook ping has arrived. Never trusts anything
 * the client passes beyond the orderId; the real status/amount always comes from an authenticated
 * call back to VeracuePay's /api/payments/status, which reads it straight from Stripe.
 */
export async function syncVeracuepayPaymentStatus(orderId: string): Promise<{ success?: boolean; status?: string; error?: string; notFound?: boolean }> {
  try {
    const order = await findOrderForGateway(orderId)
    if (!order) return { error: 'Order not found', notFound: true }

    // Only orders placed through VeracuePay can be settled by this check.
    if (order.paymentMethod !== 'veracuepay') return { error: 'Not a VeracuePay order' }

    const paymentIntentId = order.veracuepayPaymentIntentId
    if (!paymentIntentId) return { error: 'No payment reference on this order' }

    const data = await fetchVeracuepayStatus(paymentIntentId)
    if (!data) {
      return { error: 'Failed to reach VeracuePay for status check' }
    }

    // Never trust the caller-supplied orderId beyond using it to look up the order above — the
    // order to finalize is only ever the one VeracuePay's own PaymentIntent metadata names.
    const trueReference = data.metadata?.orderId
    if (!trueReference || trueReference !== gatewayReference(order)) {
      console.error(`syncVeracuepayPaymentStatus: order mismatch (order ${gatewayReference(order)}, PaymentIntent belongs to ${trueReference})`)
      return { error: 'Order/payment mismatch' }
    }

    if (data.status !== 'succeeded') {
      return { success: false, status: data.status }
    }

    const expectedCents = Math.round((order.total || 0) * 100)
    if (data.amount !== expectedCents) {
      console.error(`syncVeracuepayPaymentStatus: amount mismatch for order ${orderId} (paid ${data.amount}, expected ${expectedCents})`)
      return { error: 'Payment amount does not match order total' }
    }

    const { finalizeOrder } = await import('@/lib/orders/finalizeOrder')
    await finalizeOrder(orderId, data.metadata)
    return { success: true }
  } catch (error: any) {
    console.error('Failed to sync VeracuePay payment status:', error)
    return { error: error.message }
  }
}
