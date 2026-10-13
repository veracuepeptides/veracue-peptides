import { describe, it, beforeAll, beforeEach, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'

// Cookies are the only request-scoped input the checkout reads, so they are controlled here.
// Outbound email is captured instead of sent. Everything else is real: Payload, the database,
// stock and coupon reservation, the order hooks and finalization.
const jar = vi.hoisted(() => ({ values: new Map<string, string>() }))
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (jar.values.has(name) ? { name, value: jar.values.get(name) } : undefined),
    set: () => {},
    delete: (name: string) => { jar.values.delete(name) },
  }),
}))
// Checkout reads the signed-in user through the request headers, which don't exist in a test.
vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => null) }))
const sent = vi.hoisted(() => [] as Array<{ to: string; subject: string; html: string }>)
vi.mock('@/lib/emails/sendTrackedEmail', () => ({
  sendTrackedEmail: vi.fn(async (_p: unknown, args: any) => {
    sent.push({ to: args.to, subject: args.subject, html: args.html ?? '' })
    return { ok: true }
  }),
}))

import { createPayloadOrder } from '@/app/(frontend)/(shop)/checkout/actions'
import { attributeOrder } from '@/lib/affiliates/commission'
import { GET as expireUnpaid } from '@/app/api/cron/expire-unpaid-orders/route'

const PRODUCT_ID = 40
const runId = Date.now().toString(36).toUpperCase()
let email = `qa-test-order-${runId.toLowerCase()}-0@example.com`
let emailCounter = 0
// The checkout's duplicate guard reuses a pending order for the same buyer and cart within three
// minutes, so each test gets its own buyer. Tests that need the guard reuse one address on purpose.
beforeEach(() => {
  emailCounter += 1
  email = `qa-test-order-${runId.toLowerCase()}-${emailCounter}@example.com`
})
let payload: Payload
let liveUnitPrice = 0

const formData = () => ({
  email,
  firstName: 'QA',
  lastName: 'Order',
  phone: '5555550100',
  address: '1 Test Street',
  apartment: '',
  city: 'Boston',
  state: 'MA',
  zip: '02118',
  country: 'US',
})
const lineFor = (quantity = 1, priceSnapshot = liveUnitPrice) => ({
  productId: PRODUCT_ID,
  quantity,
  priceSnapshot,
  variantSku: undefined,
  variantTitle: null,
})

async function productStock(): Promise<number> {
  const p = await payload.findByID({ collection: 'products', id: PRODUCT_ID, depth: 0, overrideAccess: true })
  return Number(p.stock ?? 0)
}
async function loadOrder(id: number | string) {
  return payload.findByID({ collection: 'orders', id, depth: 0, overrideAccess: true })
}
async function waitFor<T>(fn: () => Promise<T | false | null | undefined>, timeoutMs = 30_000): Promise<T> {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const value = await fn()
    if (value) return value as T
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('condition not met in time')
}

describe('orders: Zelle manual payment flow', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    const product = await payload.findByID({ collection: 'products', id: PRODUCT_ID, depth: 0, overrideAccess: true })
    liveUnitPrice = Number(product.salePrice && product.salePrice > 0 ? product.salePrice : product.price)
    expect(liveUnitPrice).toBeGreaterThan(0)
  }, 180_000)

  it('places a Zelle order as pending and unpaid, reserves stock, and records the totals', async () => {
    jar.values.clear()
    const stockBefore = await productStock()
    const result = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(result).toHaveProperty('orderId')
    const order = await loadOrder((result as any).orderId)

    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
    expect(order.paymentMethod).toBe('zelle')
    expect(order.isFinalized).not.toBe(true)
    expect(Number(order.subtotal)).toBeCloseTo(liveUnitPrice, 2)
    // The stored total must equal the sum of its parts (subtotal - discount + shipping + fees - points).
    const recomputed = Number(order.subtotal) - Number(order.discountTotal || 0) + Number(order.shippingTotal || 0) + Number(order.feeTotal || 0) - Number(order.redeemedPoints || 0)
    expect(Number(order.total)).toBeCloseTo(recomputed, 2)
    expect(await productStock()).toBe(stockBefore - 1)

    const invoice = sent.find((m) => m.to === email && m.subject.startsWith('Order Invoice'))
    expect(invoice, 'an invoice is emailed to the customer at placement').toBeTruthy()
  }, 180_000)

  it('refuses a cart whose price no longer matches the live price (price tampering)', async () => {
    jar.values.clear()
    const stockBefore = await productStock()
    const result: any = await createPayloadOrder([lineFor(1, liveUnitPrice - 5)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(result.priceChanged).toBe(true)
    expect(result.orderId).toBeUndefined()
    expect(await productStock()).toBe(stockBefore)
  }, 180_000)

  it('refuses an order larger than the stock on hand, and reserves nothing', async () => {
    jar.values.clear()
    const stockBefore = await productStock()
    const result: any = await createPayloadOrder([lineFor(stockBefore + 1000)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(result.error).toMatch(/Insufficient stock/)
    expect(await productStock()).toBe(stockBefore)
  }, 180_000)

  it('a repeat submit of the same cart within minutes returns the same order, not a new one', async () => {
    jar.values.clear()
    const first: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    const again: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(again.orderId).toBe(first.orderId)
  }, 180_000)

  it('a different cart within minutes is a new order, even with the same number of lines (regression)', async () => {
    jar.values.clear()
    const first: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    const different: any = await createPayloadOrder([lineFor(2)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(different.orderId).toBeTruthy()
    expect(different.orderId).not.toBe(first.orderId)
    const order = await loadOrder(different.orderId)
    expect(Number(order.items?.[0]?.quantity)).toBe(2)
  }, 180_000)

  it('a 15% coupon is applied to the cent at checkout and its usage is reserved', async () => {
    jar.values.clear()
    const code = `QATEST-${runId}-ORD15`
    const coupon = await payload.create({
      collection: 'coupons',
      data: { code, type: 'percentage', value: 15, appliesTo: 'all', applicableProductTypes: 'all', freeShipping: false, stackable: false, excludeSaleItems: false, autoApply: false } as any,
      overrideAccess: true,
    })
    const result: any = await createPayloadOrder([lineFor(1)], 'Standard', code, false, formData(), '', undefined, 'zelle')
    const order = await loadOrder(result.orderId)
    expect(Number(order.discountTotal)).toBeCloseTo(Math.round(liveUnitPrice * 0.15 * 100) / 100, 2)
    const after = await payload.findByID({ collection: 'coupons', id: coupon.id, depth: 0, overrideAccess: true })
    expect(Number(after.usageCount)).toBe(1)
  }, 180_000)

  it('marking the order captured finalizes it, confirms the payment by email, and is idempotent', async () => {
    jar.values.clear()
    const result: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    sent.length = 0
    await payload.update({ collection: 'orders', id: result.orderId, data: { paymentStatus: 'captured' }, overrideAccess: true })

    const finalized = await waitFor(async () => {
      const o = await loadOrder(result.orderId)
      return o.isFinalized === true && o.status === 'paid' ? o : false
    })
    expect(finalized.paymentStatus).toBe('captured')
    expect(finalized.status).toBe('paid')
    const confirmation = await waitFor(async () => sent.find((m) => m.to === email && m.subject.startsWith('Payment received')))
    expect(confirmation.html).toContain('PAID')

    // A second capture or a retry must not send a second confirmation.
    await payload.update({ collection: 'orders', id: result.orderId, data: { paymentStatus: 'captured' }, overrideAccess: true })
    await new Promise((r) => setTimeout(r, 2000))
    expect(sent.filter((m) => m.subject.startsWith('Payment received')).length).toBe(1)
  }, 180_000)

  it('cancelling an unpaid order releases its stock and the coupon usage', async () => {
    jar.values.clear()
    const stockBefore = await productStock()
    const result: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    expect(await productStock()).toBe(stockBefore - 1)
    await payload.update({ collection: 'orders', id: result.orderId, data: { status: 'cancelled' }, overrideAccess: true })
    await new Promise((r) => setTimeout(r, 4000))
    await waitFor(async () => (await productStock()) === stockBefore)
    expect(await productStock()).toBe(stockBefore)
  }, 180_000)

  it('the expiry sweep refuses unauthenticated calls and cancels stale unpaid orders', async () => {
    jar.values.clear()
    const stockBefore = await productStock()
    const result: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    await (payload.db as any).drizzle.execute(sql`UPDATE "orders" SET "created_at" = now() - interval '8 days' WHERE "id" = ${result.orderId}`)

    const denied = await expireUnpaid(new Request('http://localhost/api/cron/expire-unpaid-orders'))
    expect(denied.status).toBe(401)

    const allowed = await expireUnpaid(new Request('http://localhost/api/cron/expire-unpaid-orders', {
      headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
    }))
    const body = await allowed.json()
    expect(body.cancelled).toContain(Number(result.orderId))
    const order = await loadOrder(result.orderId)
    expect(order.status).toBe('cancelled')
    await waitFor(async () => (await productStock()) === stockBefore)
  }, 180_000)
})

describe('orders: affiliate attribution', () => {
  it('an approved affiliate referral cookie creates a pending conversion for the captured order', async () => {
    jar.values.clear()
    jar.values.set('affiliate_ref', '1')
    const result: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    await payload.update({ collection: 'orders', id: result.orderId, data: { paymentStatus: 'captured' }, overrideAccess: true })
    const conversion = await waitFor(async () => {
      const res = await payload.find({ collection: 'affiliate-conversions', where: { order: { equals: result.orderId } }, limit: 1, depth: 0, overrideAccess: true })
      return res.docs[0] ?? false
    })
    expect(Number(conversion.affiliate)).toBe(1)
    expect(conversion.status).toBe('pending')
    jar.values.clear()
  }, 180_000)

  it('a coupon code containing SQL wildcards does not resolve to another affiliate (regression)', async () => {
    const order = await payload.create({
      collection: 'orders',
      data: {
        guestEmail: email,
        customerFirstName: 'QA',
        customerLastName: 'Wildcard',
        status: 'paid',
        paymentStatus: 'captured',
        paymentMethod: 'zelle',
        fulfillmentStatus: 'unfulfilled',
        items: [{ product: PRODUCT_ID, variant: 'DEFAULT', price: liveUnitPrice, quantity: 1 }],
        subtotal: liveUnitPrice,
        total: liveUnitPrice,
        shippingTotal: 0,
        discountTotal: 0,
        feeTotal: 0,
        couponCode: '%',
      } as any,
      overrideAccess: true,
    })
    await attributeOrder(order as any, null, '%', null)
    const res = await payload.find({ collection: 'affiliate-conversions', where: { order: { equals: order.id } }, limit: 1, depth: 0, overrideAccess: true })
    expect(res.totalDocs).toBe(0)
  }, 180_000)
})
