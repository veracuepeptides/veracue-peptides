import type { CollectionBeforeValidateHook } from 'payload'

export const beforeValidateReview: CollectionBeforeValidateHook = async ({ data, req, operation }) => {
  if (!data) return data

  // A review is always written by the signed-in user. The user field is never trusted from the request.
  if (operation === 'create') {
    if (!req.user) throw new Error('You must be signed in to write a review.')
    data.user = req.user.id
  }

  if (data.order) {
    const orderId = typeof data.order === 'object' ? (data.order as { id: number }).id : data.order
    const order = await req.payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 0,
      overrideAccess: true,
    }).catch(() => null)
    if (!order) throw new Error('Linked order not found')

    // Only the buyer can attach their order to a review. Order numbers are sequential, so without
    // this check anyone could cite someone else's delivered order as a verified purchase.
    const ownerId = typeof order.owner === 'object' && order.owner !== null ? (order.owner as { id: number }).id : order.owner
    if (!req.user || String(ownerId) !== String(req.user.id)) {
      throw new Error('That order does not belong to your account.')
    }

    const deliveredStatuses = ['shipped', 'completed']
    if (deliveredStatuses.includes(order.status)) {
      data.verifiedPurchase = true
    } else {
      throw new Error('Cannot create review: order not delivered')
    }
  }
  return data
}
