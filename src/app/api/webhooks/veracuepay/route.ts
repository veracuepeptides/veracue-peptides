import { isAuthorizedVeracuepayRequest } from '@/lib/orders/veracuepayGateway'

// Ping endpoint from VeracuePay's own Stripe webhook. The body is only ever used to learn which
// order to act on, never trusted as the actual payment verdict. A 'succeeded' ping triggers a
// fresh authenticated status check against VeracuePay's /api/payments/status before anything is
// finalized. A 'failed' ping is a card decline, which the customer can retry on the same payment, so
// it cancels the still-pending order only once the gateway confirms the payment itself is canceled.
// A 'refunded' ping re-reads the refunded amount from the gateway and marks the order refunded only
// for a full refund.
export async function POST(req: Request) {
  if (!isAuthorizedVeracuepayRequest(req)) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const { orderId, eventType } = await req.json()
    if (!orderId || !eventType) {
      return new Response('Missing orderId or eventType', { status: 400 })
    }

    if (eventType === 'succeeded' || eventType === 'refunded' || eventType === 'failed') {
      // The ping names the order by the number customers see, which is the reference VeracuePay holds.
      // It is resolved to the order here; Veracue's internal ids are never accepted from a ping, and an
      // unknown order will never become known, so say so (VeracuePay does not retry a 4xx).
      const { findOrderByGatewayReference } = await import('@/lib/orders/veracuepayGateway')
      const order = await findOrderByGatewayReference(orderId)
      if (!order) return new Response('Order not found', { status: 404 })
      const internalId = String(order.id)

      if (eventType === 'succeeded') {
        const { syncVeracuepayPaymentStatus } = await import(
          '@/app/(frontend)/(shop)/checkout/veracuepayActions'
        )
        const result = await syncVeracuepayPaymentStatus(internalId)
        // Anything but "not found" failed for a reason other than "not paid yet": let VeracuePay retry.
        if (result.error) return new Response(result.error, { status: result.notFound ? 404 : 500 })
      } else if (eventType === 'refunded') {
        const { syncVeracuepayRefund } = await import('@/lib/orders/veracuepayGateway')
        const result = await syncVeracuepayRefund(internalId)
        if (result.error) return new Response(result.error, { status: result.notFound ? 404 : 500 })
      } else {
        // A decline can still be retried on the same payment, so this only cancels once the gateway
        // confirms the payment itself is canceled (see handleVeracuepayFailure).
        const { handleVeracuepayFailure } = await import('@/lib/orders/veracuepayGateway')
        const result = await handleVeracuepayFailure(internalId)
        if (result.error) return new Response(result.error, { status: result.notFound ? 404 : 500 })
      }
    }

    return new Response('Webhook handled successfully', { status: 200 })
  } catch (error: any) {
    console.error('VeracuePay webhook error:', error)
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }
}
