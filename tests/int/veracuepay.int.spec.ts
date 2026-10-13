import { describe, it, beforeAll, afterAll, beforeEach, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'

// Real Payload, real database, real stock/coupon reservation, order hooks and finalization.
// Faked: the VeracuePay gateway (global fetch), cookies/headers (no request exists in a test) and
// outbound email (captured instead of sent). The gateway fake follows VeracuePayments' contract:
//   POST {base}/payments/create  -> { paymentIntentId }  (plain-text body on failure)
//   POST {base}/payments/status  -> { status, amount, currency, metadata, amountRefunded }
const env = vi.hoisted(() => {
  process.env.VERACUEPAY_API_BASE_URL = 'https://pay.test/api'
  process.env.VERACUEPAY_API_SECRET = 'a'.repeat(64)
  process.env.NEXT_PUBLIC_VERACUEPAY_CHECKOUT_URL = 'https://pay.test/pay'
  return { secret: 'a'.repeat(64) }
})

const jar = vi.hoisted(() => ({ values: new Map<string, string>() }))
const hdr = vi.hoisted(() => ({ extra: {} as Record<string, string> }))
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (jar.values.has(name) ? { name, value: jar.values.get(name) } : undefined),
    set: () => {},
    delete: (name: string) => { jar.values.delete(name) },
  }),
  headers: async () => new Headers({ origin: 'http://localhost:3000', host: 'localhost:3000', ...hdr.extra }),
}))
vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => null) }))
// The checkout throttles to 12 attempts per 10 minutes per address, counted in the shop's real Redis.
// This suite places dozens of orders, and the throttle is not what it tests, so it is switched off here
// (which also keeps the test run from using up the live counters).
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: vi.fn(async () => ({ allowed: true, remaining: 999 })) }))
const sent = vi.hoisted(() => [] as Array<{ to: string; subject: string; html: string; bcc?: string }>)
vi.mock('@/lib/emails/sendTrackedEmail', () => ({
  sendTrackedEmail: vi.fn(async (_p: unknown, args: any) => {
    sent.push({ to: args.to, subject: args.subject, html: args.html ?? '', bcc: args.bcc })
    return { ok: true }
  }),
}))

type FakeIntent = {
  status: string
  amount: number
  currency: string
  metadata: Record<string, string>
  amountRefunded: number
}
const gw = vi.hoisted(() => ({
  intents: new Map<string, FakeIntent>(),
  createCalls: [] as Array<{ auth: string | null; body: any }>,
  statusCalls: 0,
  createMode: 'ok' as 'ok' | 'http500' | 'noId' | 'throw',
  statusMode: 'ok' as 'ok' | 'http500' | 'throw',
  seq: 0,
}))

import { createVeracuepayPayment, syncVeracuepayPaymentStatus } from '@/app/(frontend)/(shop)/checkout/veracuepayActions'
import { createPayloadOrder } from '@/app/(frontend)/(shop)/checkout/actions'
import { findExistingVeracuepayPayment, syncVeracuepayRefund, isAuthorizedVeracuepayRequest, gatewayReference } from '@/lib/orders/veracuepayGateway'
import { POST as veracuepayWebhook } from '@/app/api/webhooks/veracuepay/route'
import { GET as expireUnpaid } from '@/app/api/cron/expire-unpaid-orders/route'
import { POST as nativeStripeWebhook } from '@/app/api/webhooks/stripe/route'
import Stripe from 'stripe'

const realFetch = globalThis.fetch
function installFakeGateway() {
  globalThis.fetch = (async (input: any, init?: any) => {
    const url = String(input)
    if (!url.startsWith('https://pay.test/api')) return realFetch(input, init)
    const auth = (init?.headers as Record<string, string>)?.Authorization ?? null
    const body = init?.body ? JSON.parse(init.body) : {}
    if (auth !== `Bearer ${env.secret}`) return new Response('Unauthorized', { status: 401 })

    if (url.endsWith('/payments/create')) {
      gw.createCalls.push({ auth, body })
      if (gw.createMode === 'throw') throw new Error('connect ECONNREFUSED')
      if (gw.createMode === 'http500') return new Response('Stripe is down', { status: 500 })
      if (gw.createMode === 'noId') return Response.json({ ok: true })
      const id = `pi_fake_${++gw.seq}_${Date.now()}`
      gw.intents.set(id, {
        status: 'requires_payment_method',
        amount: Math.round(body.amount * 100),
        currency: body.currency,
        metadata: { merchantId: 'veracue', orderId: String(body.orderId), returnUrl: body.returnUrl },
        amountRefunded: 0,
      })
      return Response.json({ paymentIntentId: id })
    }
    if (url.endsWith('/payments/status')) {
      gw.statusCalls++
      if (gw.statusMode === 'throw') throw new Error('connect ECONNREFUSED')
      if (gw.statusMode === 'http500') return new Response('boom', { status: 500 })
      const intent = gw.intents.get(body.paymentIntentId)
      if (!intent) return new Response('Not found', { status: 404 })
      return Response.json(intent)
    }
    return new Response('Not found', { status: 404 })
  }) as typeof fetch
}

// A well-stocked product, not the one the other suites use. Override with VP_TEST_PRODUCT_ID to spread
// reservations across products, since the orders these tests place are deliberately left in place.
const PRODUCT_ID = Number(process.env.VP_TEST_PRODUCT_ID || 5)
const runId = Date.now().toString(36).toUpperCase()
let email = ''
let counter = 0
let payload: Payload
let liveUnitPrice = 0
const createdOrderIds = new Set<number>()

beforeEach(() => {
  counter += 1
  email = `qa-test-order-${runId.toLowerCase()}-vp${counter}@example.com`
  jar.values.clear()
  sent.length = 0
  gw.createCalls.length = 0
  gw.statusCalls = 0
  gw.createMode = 'ok'
  gw.statusMode = 'ok'
  installFakeGateway()
})

const formData = (over: Record<string, string> = {}) => ({
  email, firstName: 'QA', lastName: 'VeracuePay', phone: '5555550100', address: '1 Test Street',
  apartment: '', city: 'Boston', state: 'MA', zip: '02118', country: 'US', ...over,
})
let variantSku: string | undefined
const lineFor = (quantity = 1, priceSnapshot = liveUnitPrice) => ({
  productId: PRODUCT_ID, quantity, priceSnapshot, variantSku, variantTitle: null,
})
const productStock = async () =>
  Number((await payload.findByID({ collection: 'products', id: PRODUCT_ID, depth: 0, overrideAccess: true })).stock ?? 0)
const loadOrder = (id: number | string) => payload.findByID({ collection: 'orders', id, depth: 0, overrideAccess: true })
async function waitFor<T>(fn: () => Promise<T | false | null | undefined>, timeoutMs = 30_000): Promise<T> {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const v = await fn()
    if (v) return v as T
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error('condition not met in time')
}

/** Places a VeracuePay order through the real action and returns the order id and its PaymentIntent. */
async function placeOrder(opts: { quantity?: number; over?: Record<string, string> } = {}) {
  const res: any = await createVeracuepayPayment([lineFor(opts.quantity ?? 1)], 'Standard', undefined, false, formData(opts.over), undefined, false)
  expect(res.error, `placing the order failed: ${res.error}`).toBeUndefined()
  const orderId = Number(res.orderId)
  createdOrderIds.add(orderId)
  const order = await loadOrder(orderId)
  // `ref` is what Stripe holds and what pings carry: the order number the customer sees.
  return { res, orderId, order, ref: gatewayReference(order as any), pi: order.veracuepayPaymentIntentId as string }
}
const pay = (pi: string) => { gw.intents.get(pi)!.status = 'succeeded' }

// A ping names the order by its order number. The tests think in internal ids, so `hit` translates an
// id of an order created in this run into that order's number; anything else (unknown ids, hostile
// strings) is sent exactly as given. `hitRaw` never translates, to prove internal ids are refused.
const hitRaw = (body: unknown, auth: string | null = `Bearer ${env.secret}`, raw?: string) =>
  veracuepayWebhook(new Request('http://localhost/api/webhooks/veracuepay', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(auth ? { authorization: auth } : {}) },
    body: raw ?? JSON.stringify(body),
  }))
const hit = async (body: any, auth: string | null = `Bearer ${env.secret}`, raw?: string) => {
  const id = Number(body?.orderId)
  if (body && typeof body === 'object' && Number.isInteger(id) && createdOrderIds.has(id)) {
    body = { ...body, orderId: gatewayReference((await loadOrder(id)) as any) }
  }
  return hitRaw(body, auth, raw)
}

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  const product: any = await payload.findByID({ collection: 'products', id: PRODUCT_ID, depth: 0, overrideAccess: true })
  // Products with variants must be ordered by a real variant (its own SKU and price).
  const variant = Array.isArray(product.variants) ? product.variants.find((v: any) => v?.sku) : undefined
  variantSku = variant?.sku
  const source = variant ?? product
  liveUnitPrice = Number(source.salePrice && source.salePrice > 0 ? source.salePrice : source.price)
  expect(liveUnitPrice).toBeGreaterThan(0)
}, 180_000)

afterAll(async () => {
  // Test orders are deliberately left in the database exactly as the tests ended, so they can be
  // inspected afterwards. Their guest emails all start with "qa-test-order-<run>-vp".
  console.log(`veracuepay test run ${runId}: ${createdOrderIds.size} orders left in place: ${[...createdOrderIds].join(', ')}`)
  globalThis.fetch = realFetch
}, 180_000)

describe('veracuepay: placing the order', () => {
  it('creates a pending, unpaid veracuepay order, reserves stock, and sends the gateway the exact order total', async () => {
    const stockBefore = await productStock()
    const { res, orderId, order, pi } = await placeOrder()

    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
    expect(order.paymentMethod).toBe('veracuepay')
    expect(order.isFinalized).not.toBe(true)
    expect(pi).toMatch(/^pi_fake_/)
    expect(await productStock()).toBe(stockBefore - 1)

    expect(gw.createCalls).toHaveLength(1)
    const call = gw.createCalls[0]
    expect(call.auth).toBe(`Bearer ${env.secret}`)
    // Stripe is given the order number the customer sees, never Veracue's internal database id, so the
    // Stripe dashboard matches the real order.
    expect(call.body.orderId).toBe(String(order.orderNumber))
    expect(call.body.orderId).not.toBe(String(orderId))
    expect(call.body.orderNumber).toBeUndefined()
    expect(call.body.description).toBe(`VL Order #${call.body.orderId}`)
    expect(call.body.amount).toBe(order.total)
    expect(call.body.currency).toBe('usd')
    expect(call.body.returnUrl).toBe(`http://localhost:3000/order-confirmation/${orderId}`)
    expect(call.body.customerEmail).toBe(email)
    // The Stripe dashboard shows this as the transaction description.
    expect(call.body.description).toBe(`VL Order #${order.orderNumber || order.id}`)
    expect(call.body.description).toMatch(/^VL Order #\S+$/)
    expect(res.redirectUrl).toBe(`https://pay.test/pay?pi=${pi}`)

    // No invoice/confirmation goes out before the customer has actually paid.
    expect(sent.filter((m) => m.to === email)).toHaveLength(0)
  }, 180_000)

  it('a repeat submit of the same cart reuses the same PaymentIntent instead of opening a second', async () => {
    const first = await placeOrder()
    const again: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData(), undefined, false)
    expect(again.orderId).toBe(String(first.orderId))
    expect(again.redirectUrl).toBe(`https://pay.test/pay?pi=${first.pi}`)
    expect(gw.createCalls).toHaveLength(1)
  }, 180_000)

  it('a repeat submit after the customer already paid goes to the confirmation page, not a new payment', async () => {
    const first = await placeOrder()
    pay(first.pi)
    const again: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData(), undefined, false)
    expect(again.redirectUrl).toBe(`http://localhost:3000/order-confirmation/${first.orderId}`)
    expect(gw.createCalls).toHaveLength(1)
  }, 180_000)

  it('a repeat submit when the earlier PaymentIntent was canceled opens a fresh one and stores it', async () => {
    const first = await placeOrder()
    gw.intents.get(first.pi)!.status = 'canceled'
    const again: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData(), undefined, false)
    expect(again.orderId).toBe(String(first.orderId))
    expect(gw.createCalls).toHaveLength(2)
    const stored = (await loadOrder(first.orderId)).veracuepayPaymentIntentId
    expect(stored).not.toBe(first.pi)
    expect(again.redirectUrl).toBe(`https://pay.test/pay?pi=${stored}`)
  }, 180_000)

  it('does not reuse a PaymentIntent whose amount or order does not match the order', async () => {
    const first = await placeOrder()
    gw.intents.get(first.pi)!.amount += 100
    const order = await loadOrder(first.orderId)
    expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'create' })
    gw.intents.get(first.pi)!.amount -= 100
    gw.intents.get(first.pi)!.metadata.orderId = '999999999'
    expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'create' })
    // The internal id is not the order's reference: a payment that names it is not this order's.
    gw.intents.get(first.pi)!.metadata.orderId = String(first.orderId)
    expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'create' })
    gw.intents.get(first.pi)!.metadata.orderId = first.ref
    expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'reuse', paymentIntentId: first.pi })
    for (const s of ['processing', 'succeeded', 'requires_capture']) {
      gw.intents.get(first.pi)!.status = s
      expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'already_paid' })
    }
    for (const s of ['requires_payment_method', 'requires_confirmation', 'requires_action']) {
      gw.intents.get(first.pi)!.status = s
      expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'reuse', paymentIntentId: first.pi })
    }
    // An unreachable gateway reads as "no usable payment", so a new one is attempted.
    gw.statusMode = 'throw'
    expect(await findExistingVeracuepayPayment(order as any)).toEqual({ kind: 'create' })
    expect(await findExistingVeracuepayPayment({ id: 1, total: 5 })).toEqual({ kind: 'create' })
  }, 180_000)

  for (const mode of ['http500', 'noId', 'throw'] as const) {
    it(`when the gateway fails (${mode}), the order is cancelled, stock released, the customer gets a calm error and support is alerted`, async () => {
      const stockBefore = await productStock()
      gw.createMode = mode
      const res: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData(), undefined, false)
      expect(res.redirectUrl).toBeUndefined()
      expect(res.error).toMatch(/try again/i)
      // Internal detail (gateway error text, stack) must never reach the customer.
      expect(res.error).not.toMatch(/Stripe is down|ECONNREFUSED|pi_/)

      const found = await payload.find({ collection: 'orders', where: { guestEmail: { equals: email } }, depth: 0, overrideAccess: true, limit: 5 })
      expect(found.totalDocs).toBe(1)
      createdOrderIds.add(Number(found.docs[0].id))
      expect(found.docs[0].status).toBe('cancelled')
      await waitFor(async () => (await productStock()) === stockBefore)
      const alert = await waitFor(async () => sent.find((m) => /Payment Failed/i.test(m.subject) || /Payment Failed/i.test(m.html)))
      expect(alert).toBeTruthy()
    }, 180_000)
  }

  it('when VeracuePay is not configured, no order is created and nothing is reserved', async () => {
    const stockBefore = await productStock()
    const saved = process.env.VERACUEPAY_API_SECRET
    delete process.env.VERACUEPAY_API_SECRET
    try {
      const res: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData(), undefined, false)
      expect(res.error).toMatch(/unavailable/i)
      expect(res.redirectUrl).toBeUndefined()
    } finally {
      process.env.VERACUEPAY_API_SECRET = saved
    }
    const found = await payload.find({ collection: 'orders', where: { guestEmail: { equals: email } }, depth: 0, overrideAccess: true })
    expect(found.totalDocs).toBe(0)
    expect(await productStock()).toBe(stockBefore)
    expect(gw.createCalls).toHaveLength(0)
  }, 180_000)

  it('refuses a tampered price, an oversized order and missing delivery details before ever calling the gateway', async () => {
    const stockBefore = await productStock()
    const tampered: any = await createVeracuepayPayment([lineFor(1, liveUnitPrice - 5)], 'Standard', undefined, false, formData(), undefined, false)
    expect(tampered.priceChanged).toBe(true)
    // A line is capped (100), so an order larger than the stock on hand is refused by that cap or, where
    // the stock is below it, by the stock check. Either way nothing is reserved and the gateway is not called.
    const huge: any = await createVeracuepayPayment([lineFor(Math.max(stockBefore + 1, 101))], 'Standard', undefined, false, formData(), undefined, false)
    expect(huge.error).toMatch(/Insufficient stock|quantity/i)
    expect(huge.orderId).toBeUndefined()
    const noPhone: any = await createVeracuepayPayment([lineFor(1)], 'Standard', undefined, false, formData({ phone: '' }), undefined, false)
    expect(noPhone.error).toMatch(/required/i)
    expect(gw.createCalls).toHaveLength(0)
    expect(await productStock()).toBe(stockBefore)
  }, 180_000)

  it('a coupon is applied and the gateway is charged the discounted total', async () => {
    const code = `QATEST-${runId}-VP15`
    const coupon = await payload.create({
      collection: 'coupons',
      data: { code, type: 'percentage', value: 15, appliesTo: 'all', applicableProductTypes: 'all', freeShipping: false, stackable: false, excludeSaleItems: false, autoApply: false } as any,
      overrideAccess: true,
    })
    const res: any = await createVeracuepayPayment([lineFor(1)], 'Standard', code, false, formData(), undefined, false)
    createdOrderIds.add(Number(res.orderId))
    const order = await loadOrder(res.orderId)
    expect(Number(order.discountTotal)).toBeCloseTo(Math.round(liveUnitPrice * 0.15 * 100) / 100, 2)
    expect(gw.createCalls[0].body.amount).toBe(order.total)
    const after = await payload.findByID({ collection: 'coupons', id: coupon.id, depth: 0, overrideAccess: true })
    expect(Number(after.usageCount)).toBe(1)
    // Cancelling gives the coupon slot back.
    await payload.update({ collection: 'orders', id: res.orderId, data: { status: 'cancelled' }, overrideAccess: true })
    await waitFor(async () => Number((await payload.findByID({ collection: 'coupons', id: coupon.id, depth: 0, overrideAccess: true })).usageCount) === 0)
  }, 180_000)
})

describe('veracuepay: verifying a payment with the gateway', () => {
  it('a succeeded payment finalizes the order: paid, captured, one confirmation email, idempotent', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi)
    sent.length = 0

    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ success: true })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('paid')
    expect(order.paymentStatus).toBe('captured')
    expect(order.isFinalized).toBe(true)
    const confirmations = sent.filter((m) => m.to === email && m.subject.startsWith('Order Confirmation'))
    expect(confirmations).toHaveLength(1)
    expect(confirmations[0].html).toContain('Card')

    // The confirmation page, the webhook and a retry all call this: still exactly one email.
    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ success: true })
    expect(sent.filter((m) => m.subject.startsWith('Order Confirmation'))).toHaveLength(1)
  }, 180_000)

  it('five simultaneous verifications (webhook + confirmation page + retries) finalize exactly once', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi)
    sent.length = 0
    const results = await Promise.all([
      syncVeracuepayPaymentStatus(String(orderId)),
      syncVeracuepayPaymentStatus(String(orderId)),
      syncVeracuepayPaymentStatus(String(orderId)),
      hit({ orderId: String(orderId), eventType: 'succeeded' }),
      hit({ orderId: String(orderId), eventType: 'succeeded' }),
    ])
    expect(results.slice(0, 3).every((r: any) => r.success === true)).toBe(true)
    expect((results[3] as Response).status).toBe(200)
    expect((results[4] as Response).status).toBe(200)
    await new Promise((r) => setTimeout(r, 1500))
    expect(sent.filter((m) => m.to === email && m.subject.startsWith('Order Confirmation'))).toHaveLength(1)
    expect((await loadOrder(orderId)).status).toBe('paid')
  }, 180_000)

  for (const status of ['requires_payment_method', 'requires_action', 'processing', 'canceled']) {
    it(`reports "${status}" without finalizing or touching the order`, async () => {
      const { orderId, pi } = await placeOrder()
      gw.intents.get(pi)!.status = status
      expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ success: false, status })
      const order = await loadOrder(orderId)
      expect(order.status).toBe('pending')
      expect(order.paymentStatus).toBe('unpaid')
      expect(order.isFinalized).not.toBe(true)
      expect(sent.filter((m) => m.subject.startsWith('Order Confirmation'))).toHaveLength(0)
    }, 180_000)
  }

  it('refuses to finalize when the amount paid is not the order total (tampered or wrong PaymentIntent)', async () => {
    const { orderId, pi } = await placeOrder()
    gw.intents.get(pi)!.amount = 100
    pay(pi)
    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ error: 'Payment amount does not match order total' })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
    expect(order.isFinalized).not.toBe(true)
  }, 180_000)

  it('refuses to finalize an order using a PaymentIntent that belongs to a different order', async () => {
    const a = await placeOrder()
    const b = await placeOrder({ quantity: 2 })
    // Point order A at order B's (paid) PaymentIntent, as if the reference had been swapped.
    pay(b.pi)
    await payload.update({ collection: 'orders', id: a.orderId, data: { veracuepayPaymentIntentId: b.pi }, overrideAccess: true })
    expect(await syncVeracuepayPaymentStatus(String(a.orderId))).toEqual({ error: 'Order/payment mismatch' })
    expect((await loadOrder(a.orderId)).status).toBe('pending')
  }, 180_000)

  it('only settles VeracuePay orders — a paid-looking reference cannot finalize a Zelle order', async () => {
    const zelle: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    createdOrderIds.add(Number(zelle.orderId))
    const intent = `pi_fake_zelle_${Date.now()}`
    gw.intents.set(intent, { status: 'succeeded', amount: 1, currency: 'usd', metadata: { merchantId: 'veracue', orderId: String(zelle.orderId), returnUrl: 'x' }, amountRefunded: 0 })
    await payload.update({ collection: 'orders', id: zelle.orderId, data: { veracuepayPaymentIntentId: intent }, overrideAccess: true })
    expect(await syncVeracuepayPaymentStatus(String(zelle.orderId))).toEqual({ error: 'Not a VeracuePay order' })
    const order = await loadOrder(zelle.orderId)
    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
  }, 180_000)

  it('reports clean errors for a missing order, a missing reference and an unreachable gateway', async () => {
    expect(await syncVeracuepayPaymentStatus('987654321')).toEqual({ error: 'Order not found', notFound: true })
    expect(await syncVeracuepayPaymentStatus('abc')).toEqual({ error: 'Order not found', notFound: true })
    const veracue: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), 'veracuepay_pending', undefined, 'veracuepay')
    createdOrderIds.add(Number(veracue.orderId))
    expect(await syncVeracuepayPaymentStatus(String(veracue.orderId))).toEqual({ error: 'No payment reference on this order' })

    const { orderId, pi } = await placeOrder()
    pay(pi)
    gw.statusMode = 'throw'
    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ error: 'Failed to reach VeracuePay for status check' })
    gw.statusMode = 'http500'
    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ error: 'Failed to reach VeracuePay for status check' })
    expect((await loadOrder(orderId)).status).toBe('pending')
    gw.statusMode = 'ok'
    expect(await syncVeracuepayPaymentStatus(String(orderId))).toEqual({ success: true })
  }, 180_000)
})

describe('veracuepay: refunds issued from the Stripe dashboard', () => {
  async function paidOrder() {
    const placed = await placeOrder()
    pay(placed.pi)
    await syncVeracuepayPaymentStatus(String(placed.orderId))
    sent.length = 0
    return placed
  }

  it('a full refund marks the order refunded, tells the customer, and is idempotent', async () => {
    const { orderId, pi } = await paidOrder()
    const intent = gw.intents.get(pi)!
    intent.amountRefunded = intent.amount
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'refunded' })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('refunded')
    expect(order.paymentStatus).toBe('refunded')
    await waitFor(async () => sent.find((m) => m.to === email && /refunded/i.test(m.subject)))
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'none' })
    expect(sent.filter((m) => /refunded/i.test(m.subject))).toHaveLength(1)
  }, 180_000)

  it('a partial refund only leaves one internal note and never changes the order status', async () => {
    const { orderId, pi } = await paidOrder()
    gw.intents.get(pi)!.amountRefunded = 500
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'partial_noted' })
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'none' })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('paid')
    expect(order.paymentStatus).toBe('captured')
    const notes = (order.notes as any[]).filter((n) => /Partial refund of \$5\.00/.test(n.note))
    expect(notes).toHaveLength(1)
    expect(notes[0].type).toBe('internal')
    expect(sent.filter((m) => /refunded/i.test(m.subject))).toHaveLength(0)
  }, 180_000)

  it('does nothing when there is no refund, or the payment never succeeded', async () => {
    const { orderId } = await paidOrder()
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'none' })
    const pending = await placeOrder()
    gw.intents.get(pending.pi)!.amountRefunded = gw.intents.get(pending.pi)!.amount
    expect(await syncVeracuepayRefund(String(pending.orderId))).toEqual({ action: 'none' })
    expect((await loadOrder(pending.orderId)).status).toBe('pending')
  }, 180_000)

  it('a refund on an already-cancelled order only updates the payment state', async () => {
    const { orderId, pi } = await paidOrder()
    await payload.update({ collection: 'orders', id: orderId, data: { status: 'cancelled' }, overrideAccess: true })
    gw.intents.get(pi)!.amountRefunded = gw.intents.get(pi)!.amount
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ action: 'refunded' })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('cancelled')
    expect(order.paymentStatus).toBe('refunded')
  }, 180_000)

  it('rejects a refund check for a missing order, a missing reference, a mismatched order and an unreachable gateway', async () => {
    expect(await syncVeracuepayRefund('987654321')).toEqual({ error: 'Order not found', notFound: true })
    expect(await syncVeracuepayRefund('abc')).toEqual({ error: 'Order not found', notFound: true })
    const noRef: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), 'veracuepay_pending', undefined, 'veracuepay')
    createdOrderIds.add(Number(noRef.orderId))
    expect(await syncVeracuepayRefund(String(noRef.orderId))).toEqual({ error: 'No payment reference on this order' })
    const { orderId, pi, ref } = await paidOrder()
    gw.intents.get(pi)!.metadata.orderId = '1'
    gw.intents.get(pi)!.amountRefunded = 100
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ error: 'Order/payment mismatch' })
    gw.intents.get(pi)!.metadata.orderId = ref
    gw.statusMode = 'throw'
    expect(await syncVeracuepayRefund(String(orderId))).toEqual({ error: 'Failed to reach VeracuePay for status check' })
    expect((await loadOrder(orderId)).status).toBe('paid')
  }, 180_000)
})

describe('veracuepay: the webhook endpoint', () => {
  it('rejects every request that does not carry the shared secret', async () => {
    const body = { orderId: '1', eventType: 'succeeded' }
    expect((await hit(body, null)).status).toBe(401)
    expect((await hit(body, 'Bearer wrong')).status).toBe(401)
    expect((await hit(body, `Bearer ${env.secret}x`)).status).toBe(401)
    expect((await hit(body, `Bearer ${env.secret.slice(0, -1)}`)).status).toBe(401)
    expect((await hit(body, env.secret)).status).toBe(401) // missing the Bearer scheme
    expect((await hit(body, `bearer ${env.secret}`)).status).toBe(401)
    expect((await hit(body, 'Bearer ')).status).toBe(401)
    expect(isAuthorizedVeracuepayRequest(new Request('http://x', { headers: { authorization: `Bearer ${env.secret}` } }))).toBe(true)
  })

  it('fails closed when no secret is configured, even for a request with an empty bearer', async () => {
    const saved = process.env.VERACUEPAY_API_SECRET
    delete process.env.VERACUEPAY_API_SECRET
    try {
      expect((await hit({ orderId: '1', eventType: 'succeeded' }, 'Bearer undefined')).status).toBe(401)
      expect((await hit({ orderId: '1', eventType: 'succeeded' }, 'Bearer ')).status).toBe(401)
    } finally {
      process.env.VERACUEPAY_API_SECRET = saved
    }
  })

  it('rejects malformed and incomplete bodies', async () => {
    expect((await hit({ orderId: '1' })).status).toBe(400)
    expect((await hit({ eventType: 'succeeded' })).status).toBe(400)
    expect((await hit({})).status).toBe(400)
    expect((await hit(null, `Bearer ${env.secret}`, 'not json{')).status).toBe(400)
  })

  it('a succeeded ping verifies with the gateway and finalizes; a ping for an unpaid order does not', async () => {
    const unpaid = await placeOrder()
    expect((await hit({ orderId: String(unpaid.orderId), eventType: 'succeeded' })).status).toBe(200)
    expect((await loadOrder(unpaid.orderId)).status).toBe('pending')

    const paid = await placeOrder({ quantity: 2 })
    pay(paid.pi)
    expect((await hit({ orderId: String(paid.orderId), eventType: 'succeeded' })).status).toBe(200)
    expect((await loadOrder(paid.orderId)).status).toBe('paid')
  }, 180_000)

  it('a spoofed succeeded ping cannot mark an unpaid order paid — the verdict always comes from the gateway', async () => {
    const { orderId } = await placeOrder()
    for (let i = 0; i < 3; i++) await hit({ orderId: String(orderId), eventType: 'succeeded' })
    const order = await loadOrder(orderId)
    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
  }, 180_000)

  it('answers 500 (so the gateway retries) when verification fails for a reason other than "not paid yet"', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi)
    gw.statusMode = 'throw'
    expect((await hit({ orderId: String(orderId), eventType: 'succeeded' })).status).toBe(500)
    gw.statusMode = 'ok'
    expect((await hit({ orderId: String(orderId), eventType: 'succeeded' })).status).toBe(200)
    // An order that does not exist can never be verified: 404, so the gateway does not retry forever.
    expect((await hit({ orderId: '987654321', eventType: 'succeeded' })).status).toBe(404)
    expect((await hit({ orderId: '987654321', eventType: 'refunded' })).status).toBe(404)
  }, 180_000)

  it('a card decline (failed ping) leaves the order pending with its stock held, because the customer can retry', async () => {
    const stockBefore = await productStock()
    const { orderId } = await placeOrder()
    expect(await productStock()).toBe(stockBefore - 1)
    // The PaymentIntent is back at "requires_payment_method" after a decline: still payable.
    for (let i = 0; i < 3; i++) expect((await hit({ orderId: String(orderId), eventType: 'failed' })).status).toBe(200)
    const order = await loadOrder(orderId)
    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
    expect(await productStock()).toBe(stockBefore - 1)
    expect(sent.filter((m) => m.to === email && /payment failed/i.test(m.subject))).toHaveLength(0)
  }, 180_000)

  it('a payment canceled at the gateway is final: the order is cancelled, stock released, and the customer told', async () => {
    const stockBefore = await productStock()
    const { orderId, pi } = await placeOrder()
    expect(await productStock()).toBe(stockBefore - 1)
    gw.intents.get(pi)!.status = 'canceled'
    expect((await hit({ orderId: String(orderId), eventType: 'failed' })).status).toBe(200)
    expect((await loadOrder(orderId)).status).toBe('cancelled')
    await waitFor(async () => (await productStock()) === stockBefore)
    const note = await waitFor(async () => sent.find((m) => m.to === email && /payment failed/i.test(m.subject)))
    expect(note.bcc).toBe('orders@veracuelabs.com')
  }, 180_000)

  it('a failed ping is verified with the gateway: an unreachable or mismatched gateway reply never cancels', async () => {
    const { orderId, pi } = await placeOrder()
    gw.intents.get(pi)!.status = 'canceled'
    gw.statusMode = 'throw'
    expect((await hit({ orderId: String(orderId), eventType: 'failed' })).status).toBe(500)
    expect((await loadOrder(orderId)).status).toBe('pending')
    gw.statusMode = 'ok'
    gw.intents.get(pi)!.metadata.orderId = '1'
    expect((await hit({ orderId: String(orderId), eventType: 'failed' })).status).toBe(500)
    expect((await loadOrder(orderId)).status).toBe('pending')
    // Forged ping for an order that has no payment reference, or is not a VeracuePay order, does nothing.
    const zelle: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
    createdOrderIds.add(Number(zelle.orderId))
    expect((await hit({ orderId: String(zelle.orderId), eventType: 'failed' })).status).toBe(200)
    expect((await loadOrder(zelle.orderId)).status).toBe('pending')
  }, 180_000)

  it('a failed ping never cancels an order that has already been paid', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi)
    await syncVeracuepayPaymentStatus(String(orderId))
    expect((await hit({ orderId: String(orderId), eventType: 'failed' })).status).toBe(200)
    expect((await loadOrder(orderId)).status).toBe('paid')
  }, 180_000)

  it('a customer who is declined, retries on the same payment and succeeds ends with one paid order and its stock held once', async () => {
    const stockBefore = await productStock()
    const { orderId, pi } = await placeOrder()
    await hit({ orderId: String(orderId), eventType: 'failed' })
    await hit({ orderId: String(orderId), eventType: 'failed' })
    pay(pi)
    expect((await hit({ orderId: String(orderId), eventType: 'succeeded' })).status).toBe(200)
    const order = await loadOrder(orderId)
    expect(order.status).toBe('paid')
    expect(order.paymentStatus).toBe('captured')
    expect(await productStock()).toBe(stockBefore - 1)
    // One confirmation, and no "payment failed" email in between.
    expect(sent.filter((m) => m.to === email && /Order Confirmation/i.test(m.subject))).toHaveLength(1)
    expect(sent.filter((m) => m.to === email && /payment failed/i.test(m.subject))).toHaveLength(0)
  }, 180_000)

  it('a refunded ping re-reads the amount from the gateway and applies a full refund', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi)
    await syncVeracuepayPaymentStatus(String(orderId))
    // A forged refunded ping with no refund at the gateway changes nothing.
    expect((await hit({ orderId: String(orderId), eventType: 'refunded' })).status).toBe(200)
    expect((await loadOrder(orderId)).status).toBe('paid')
    gw.intents.get(pi)!.amountRefunded = gw.intents.get(pi)!.amount
    expect((await hit({ orderId: String(orderId), eventType: 'refunded' })).status).toBe(200)
    expect((await loadOrder(orderId)).status).toBe('refunded')
  }, 180_000)

  it("orders are named by their order number: a ping carrying Veracue's internal id is never accepted", async () => {
    const { orderId, pi, ref } = await placeOrder()
    pay(pi)
    expect(String(orderId)).not.toBe(ref)
    // Even though the payment really succeeded, a ping that names the order by its internal id does nothing.
    for (const eventType of ['succeeded', 'refunded', 'failed']) {
      expect((await hitRaw({ orderId: String(orderId), eventType })).status).toBe(404)
    }
    expect((await loadOrder(orderId)).status).toBe('pending')
    // The same ping with the order number the customer sees is accepted.
    expect((await hitRaw({ orderId: ref, eventType: 'succeeded' })).status).toBe(200)
    expect((await loadOrder(orderId)).status).toBe('paid')
  }, 180_000)

  it('an order number that matches more than one order is refused, never guessed at', async () => {
    const a = await placeOrder()
    const b = await placeOrder({ quantity: 2 })
    pay(a.pi)
    pay(b.pi)
    await payload.update({ collection: 'orders', id: b.orderId, data: { orderNumber: a.ref }, overrideAccess: true })
    try {
      expect((await hitRaw({ orderId: a.ref, eventType: 'succeeded' })).status).toBe(404)
      expect((await loadOrder(a.orderId)).status).toBe('pending')
      expect((await loadOrder(b.orderId)).status).toBe('pending')
    } finally {
      await payload.update({ collection: 'orders', id: b.orderId, data: { orderNumber: b.ref }, overrideAccess: true })
    }
  }, 180_000)

  it('ignores event types it does not know', async () => {
    const { orderId } = await placeOrder()
    expect((await hit({ orderId: String(orderId), eventType: 'dispute_created' })).status).toBe(200)
    expect((await hit({ orderId: String(orderId), eventType: '' })).status).toBe(400)
    expect((await loadOrder(orderId)).status).toBe('pending')
  }, 180_000)

  it('a non-numeric or hostile order id is handled without a crash or an injection', async () => {
    for (const orderId of ['abc', "1; DROP TABLE orders;--", '-1', '0', '1e999', ' ']) {
      const res = await hit({ orderId, eventType: 'succeeded' })
      expect(res.status, 'bad id ' + JSON.stringify(orderId)).toBe(404)
      expect((await hit({ orderId, eventType: 'refunded' })).status).toBe(404)
      expect((await hit({ orderId, eventType: 'failed' })).status).toBe(404)
    }
    const count = await payload.count({ collection: 'orders', overrideAccess: true })
    expect(count.totalDocs).toBeGreaterThan(0)
  }, 180_000)
})

describe('veracuepay: abandoned checkouts', () => {
  it('the expiry sweep cancels a stale unpaid VeracuePay order and frees its stock, but spares a paid one', async () => {
    const stockBefore = await productStock()
    const stale = await placeOrder()
    const paid = await placeOrder({ quantity: 2 })
    pay(paid.pi)
    await syncVeracuepayPaymentStatus(String(paid.orderId))
    for (const id of [stale.orderId, paid.orderId]) {
      await (payload.db as any).drizzle.execute(sql`UPDATE "orders" SET "created_at" = now() - interval '8 days' WHERE "id" = ${id}`)
    }
    const res = await expireUnpaid(new Request('http://localhost/api/cron/expire-unpaid-orders', { headers: { authorization: `Bearer ${process.env.CRON_SECRET}` } }))
    const body = await res.json()
    expect(body.cancelled).toContain(stale.orderId)
    expect(body.cancelled).not.toContain(paid.orderId)
    expect((await loadOrder(stale.orderId)).status).toBe('cancelled')
    expect((await loadOrder(paid.orderId)).status).toBe('paid')
    // The paid order still holds its 2 units; the stale one's 1 unit is back.
    await waitFor(async () => (await productStock()) === stockBefore - 2)
  }, 180_000)
})

describe('veracuepay: an order is never paid without a confirmed payment', () => {
  // Everything that can reach a VeracuePay order short of a verified successful payment.
  const expectStillUnpaid = async (orderId: number) => {
    const order = await loadOrder(orderId)
    expect(order.status).toBe('pending')
    expect(order.paymentStatus).toBe('unpaid')
    expect(order.isFinalized).not.toBe(true)
  }

  it('placing the order, abandoning the pay page, and every unconfirmed event leave it pending and unpaid, with no confirmation email', async () => {
    const { orderId, pi } = await placeOrder()
    await expectStillUnpaid(orderId)

    // Customer sits on / abandons the pay page; the confirmation page keeps asking the gateway.
    for (const status of ['requires_payment_method', 'requires_action', 'processing']) {
      gw.intents.get(pi)!.status = status
      for (let i = 0; i < 3; i++) await syncVeracuepayPaymentStatus(String(orderId))
      await hit({ orderId: String(orderId), eventType: 'succeeded' })
      await expectStillUnpaid(orderId)
    }
    // Forged or unknown pings, and a refund ping for a payment that never succeeded.
    await hit({ orderId: String(orderId), eventType: 'refunded' })
    await hit({ orderId: String(orderId), eventType: 'paid' })
    await hit({ orderId: String(orderId), eventType: 'captured' })
    await expectStillUnpaid(orderId)
    expect(sent.filter((m) => m.to === email && /confirmation|payment received|paid/i.test(m.subject))).toHaveLength(0)
  }, 180_000)

  it('a gateway outage or an unreadable reply can never be mistaken for a payment', async () => {
    const { orderId, pi } = await placeOrder()
    pay(pi) // genuinely paid at the gateway, but the main site cannot confirm it
    for (const mode of ['throw', 'http500'] as const) {
      gw.statusMode = mode
      expect((await syncVeracuepayPaymentStatus(String(orderId))).success).toBeUndefined()
      expect((await hit({ orderId: String(orderId), eventType: 'succeeded' })).status).toBe(500)
      await expectStillUnpaid(orderId)
    }
    gw.statusMode = 'ok'
    expect((await syncVeracuepayPaymentStatus(String(orderId))).success).toBe(true)
  }, 180_000)

  it('a gateway reply for an unknown or swapped payment never marks the order paid', async () => {
    const { orderId, pi } = await placeOrder()
    await payload.update({ collection: 'orders', id: orderId, data: { veracuepayPaymentIntentId: 'pi_does_not_exist' }, overrideAccess: true })
    expect((await syncVeracuepayPaymentStatus(String(orderId))).error).toBeTruthy()
    await expectStillUnpaid(orderId)
    // A paid payment of a different amount, and one that names a different order.
    await payload.update({ collection: 'orders', id: orderId, data: { veracuepayPaymentIntentId: pi }, overrideAccess: true })
    gw.intents.get(pi)!.amount -= 1
    pay(pi)
    expect((await syncVeracuepayPaymentStatus(String(orderId))).error).toMatch(/amount/i)
    gw.intents.get(pi)!.amount += 1
    gw.intents.get(pi)!.metadata.orderId = '1'
    expect((await syncVeracuepayPaymentStatus(String(orderId))).error).toMatch(/mismatch/i)
    await expectStillUnpaid(orderId)
  }, 180_000)

  describe("Veracue's own native Stripe webhook", () => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET as string
    const signer = new Stripe('sk_test_placeholder')
    const post = async (type: string, metadata: Record<string, string>) => {
      const payload = JSON.stringify({
        id: 'evt_test_' + Date.now(), object: 'event', api_version: '2024-04-10', created: Math.floor(Date.now() / 1000), type,
        data: { object: { id: 'pi_native_test', object: 'payment_intent', amount: 100, metadata } },
      })
      hdr.extra = { 'stripe-signature': signer.webhooks.generateTestHeaderString({ payload, secret }) }
      try {
        return await nativeStripeWebhook(new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: payload }))
      } finally {
        hdr.extra = {}
      }
    }

    it('cannot mark a VeracuePay order paid, cancelled or refunded, even for a genuinely signed event naming its id', async () => {
      expect(secret, 'STRIPE_WEBHOOK_SECRET must be configured for this test').toBeTruthy()
      const { orderId } = await placeOrder()
      const stock = await productStock()
      const variants: Array<Record<string, string>> = [{ orderId: String(orderId) }, { orderId: String(orderId), merchantId: 'veracue' }]
      for (const metadata of variants) {
        expect((await post('payment_intent.succeeded', metadata)).status).toBe(200)
        expect((await post('payment_intent.payment_failed', metadata)).status).toBe(200)
        await expectStillUnpaid(orderId)
      }
      expect(await productStock()).toBe(stock)
    }, 180_000)

    it('cannot settle a Zelle order either — only native card orders are its business', async () => {
      const zelle: any = await createPayloadOrder([lineFor(1)], 'Standard', undefined, false, formData(), '', undefined, 'zelle')
      createdOrderIds.add(Number(zelle.orderId))
      expect((await post('payment_intent.succeeded', { orderId: String(zelle.orderId) })).status).toBe(200)
      expect((await post('payment_intent.payment_failed', { orderId: String(zelle.orderId) })).status).toBe(200)
      await expectStillUnpaid(Number(zelle.orderId))
    }, 180_000)

    it('rejects an unsigned or wrongly signed event outright', async () => {
      const bad = await nativeStripeWebhook(new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: '{}' }))
      expect(bad.status).toBe(400)
      hdr.extra = { 'stripe-signature': 't=1,v1=deadbeef' }
      const forged = await nativeStripeWebhook(new Request('http://localhost/api/webhooks/stripe', { method: 'POST', body: '{}' }))
      hdr.extra = {}
      expect(forged.status).toBe(400)
    })
  })
})
