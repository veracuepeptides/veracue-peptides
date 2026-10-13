import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import configPromise from '@payload-config'
import { attributeOrder } from '@/lib/affiliates/commission'
import { appendOrderToSheet } from '@/lib/google/sheets'
import { sendTrackedEmail } from '@/lib/emails/sendTrackedEmail'

/**
 * Centralized post-checkout logic: marks the order paid, clears the cart, attributes the
 * affiliate conversion, and sends the confirmation email. Inventory and the coupon's
 * usage/store-credit balance are NOT touched here anymore — they're reserved atomically at
 * order-creation time (see lib/orders/reserve.ts) to avoid the oversell/over-redeem race
 * that existed when they were only decremented here.
 *
 * The Stripe webhook, the client-triggered sync fallback, and the admin "mark as paid"
 * action can all call this for the same order — the isFinalized claim below is a single
 * atomic UPDATE, so only the first caller to arrive actually runs the side effects below;
 * every other concurrent/duplicate call is a safe no-op.
 */
export async function finalizeOrder(orderId: string | number, paymentIntentMetadata?: any) {
  try {
    const payload = await getPayload({ config: configPromise })
    const numericId = typeof orderId === 'string' ? parseInt(orderId, 10) : orderId
    const idToUse = isNaN(numericId as number) ? orderId : numericId

    const order = await payload.findByID({
      collection: 'orders',
      id: idToUse,
      depth: 0,
    })

    if (!order) {
      console.error(`finalizeOrder: Order ${orderId} not found`)
      return false
    }

    if (order.isFinalized) {
      console.warn(`finalizeOrder: Order ${orderId} already finalized. Skipping.`)
      return true
    }

    // Atomically claim this order for finalization — whichever caller wins this UPDATE is
    // the only one that proceeds past this point.
    const db = payload.db as any
    const claim: any = await db.drizzle.execute(sql`
      UPDATE "orders" SET "is_finalized" = true
      WHERE "id" = ${typeof idToUse === 'number' ? idToUse : Number(idToUse)} AND ("is_finalized" IS NOT TRUE)
      RETURNING "id"`)
    const claimRows = claim.rows || claim
    if (!claimRows || claimRows.length === 0) {
      console.warn(`finalizeOrder: Order ${orderId} was claimed by a concurrent call. Skipping.`)
      return true
    }

    // 1. Mark Order as Paid. Checked on the order's status as well as its payment status: marking
    // paymentStatus captured in the admin fires this function after the payment is already captured,
    // and the order must still move from pending to paid.
    //
    // This is the one step that must succeed. The claim above was already written, so if the update
    // fails the claim is released again: otherwise every retry from the payment provider would see
    // "already finalized" and return, leaving a paid order stuck unpaid with no email.
    if (order.paymentStatus !== 'captured' || order.status === 'pending') {
      // An order an admin already moved past "paid" (shipped, fulfilled, completed) only needs its
      // payment recorded; forcing status back to "paid" is an invalid transition and would throw.
      const pastPaid = ['paid', 'shipped', 'fulfilled', 'completed'].includes(String(order.status))
      try {
        await payload.update({
          collection: 'orders',
          id: idToUse,
          data: pastPaid
            ? { paymentStatus: 'captured' }
            : { status: 'paid', paymentStatus: 'captured' },
        })
      } catch (updateError) {
        await db.drizzle.execute(sql`
          UPDATE "orders" SET "is_finalized" = false
          WHERE "id" = ${typeof idToUse === 'number' ? idToUse : Number(idToUse)}`)
        throw updateError
      }
      // Update in-memory object so subsequent emails don't show unpaid instructions
      if (!pastPaid) order.status = 'paid';
      order.paymentStatus = 'captured';
    }

    // 2. Clear User Cart. Best effort: the payment is already recorded, so a failure here must not
    // undo it or block the confirmation email below.
    try {
      if (order.owner) {
        const userId = typeof order.owner === 'object' ? order.owner.id : order.owner

        // Clear user's Payload cart instantly
        const carts = await payload.find({ collection: 'carts', where: { user: { equals: userId } } });
        if (carts.docs.length > 0) {
          await payload.update({ collection: 'carts', id: carts.docs[0].id, data: { items: [] } });
        }
      } else if (paymentIntentMetadata?.cartId) {
        // Clear Guest Cart using metadata fallback
        await payload.update({ collection: 'carts', id: paymentIntentMetadata.cartId, data: { items: [] } });
      }
    } catch (cartError) {
      console.error(`finalizeOrder: could not clear the cart for order ${orderId}`, cartError)
    }

    // 3. Affiliate Attribution
    const affiliateId = paymentIntentMetadata?.affiliateId || (order as any).affiliateId;
    const clickId = paymentIntentMetadata?.clickId || (order as any).clickId; 
    
    if (affiliateId || order.couponCode) {
      attributeOrder(
        order as any,
        affiliateId || null,
        order.couponCode || null,
        clickId || null
      ).catch(console.error)
    }

    // 4. Send Email
    try {
        let customerEmail = order.guestEmail;
        if (!customerEmail && order.owner) {
            const userDoc = typeof order.owner === 'object' ? order.owner : await payload.findByID({ collection: 'users', id: order.owner });
            customerEmail = userDoc.email;
        }
        // Every payment method gets a confirmation once the payment is captured. For Zelle this is
        // the "we received your payment" message; the invoice sent at checkout only asked for it.
        if (customerEmail) {
            const { generateOrderInvoiceHtml } = await import('@/lib/emails/generateOrderEmail');
            const invoiceHtml = await generateOrderInvoiceHtml(order, payload);
            const isZelle = order.paymentMethod === 'zelle'

            await sendTrackedEmail(payload, {
                from: 'Veracue Orders <orders@veracuelabs.com>',
                to: customerEmail,
                bcc: 'orders@veracuelabs.com',
                subject: isZelle
                    ? `Payment received for Order #${order.orderNumber || order.id}`
                    : `Order Confirmation #${order.orderNumber || order.id}`,
                html: invoiceHtml,
            })
        }
    } catch (err) {
        console.error('Failed to send confirmation email', err)
    }

    return true

  } catch (error) {
    console.error('Error in finalizeOrder:', error)
    return false
  }
}
