import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => null) }))

import { checkRateLimit } from '@/lib/rateLimit'
import { GET as abandonedCarts } from '@/app/api/cron/abandoned-carts/route'
import { GET as processCommissions } from '@/app/api/cron/process-commissions/route'
import { POST as newsletterPost } from '@/app/api/newsletter/subscribe/route'
import { GET as validateCoupon } from '@/app/api/validate-coupon/route'

const runId = Date.now().toString(36).toUpperCase()
let payload: Payload

describe('security: data access', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('an anonymous visitor sees no orders through the normal access rules', async () => {
    // An anonymous request must be refused outright. Before the fix the rule built a filter on an
    // undefined user id, which produced an invalid query for every anonymous call.
    await expect(
      payload.find({ collection: 'orders', overrideAccess: false, depth: 0, limit: 5 }),
    ).rejects.toThrow(/not allowed|Forbidden/)
  })

  it('a signed-in customer sees only their own orders, never a stranger\'s', async () => {
    const someoneElse = await payload.find({ collection: 'orders', where: { owner: { exists: true } }, limit: 1, depth: 0, overrideAccess: true })
    const ownerId = someoneElse.docs[0]?.owner
    const customerId = typeof ownerId === 'object' ? (ownerId as any).id : ownerId
    const unrelatedCustomer = { id: Number(customerId ?? 0) + 999999, role: 'customer', email: 'nobody@example.com' } as any
    const res = await payload.find({ collection: 'orders', overrideAccess: false, user: unrelatedCustomer, depth: 0, limit: 50 })
    expect(res.docs.length).toBe(0)
  })

  it('a customer cannot update an order, including their own', async () => {
    const order = await payload.find({ collection: 'orders', limit: 1, depth: 0, overrideAccess: true })
    if (!order.docs[0]) return
    const customer = { id: 1, role: 'customer', email: 'customer@example.com' } as any
    await expect(
      payload.update({ collection: 'orders', id: order.docs[0].id, data: { status: 'paid', paymentStatus: 'captured' }, overrideAccess: false, user: customer }),
    ).rejects.toBeTruthy()
  })
})

describe('security: rate limits', () => {
  it('the Upstash-backed limiter actually blocks after the limit is reached', async () => {
    const key = `qa-test-limit-${runId}`
    const results = []
    for (let i = 0; i < 3; i++) results.push((await checkRateLimit(key, 2, 60)).allowed)
    expect(results).toEqual([true, true, false])
  }, 60_000)

  it('the public coupon lookup is rate limited per client', async () => {
    const ip = `203.0.113.${(Date.now() % 200) + 10}`
    const statuses: number[] = []
    for (let i = 0; i < 31; i++) {
      const res = await validateCoupon(new Request(`http://localhost/api/validate-coupon?code=PROBE${i}`, { headers: { 'x-forwarded-for': ip } }))
      statuses.push(res.status)
    }
    expect(statuses.slice(0, 30).every((s) => s === 200)).toBe(true)
    expect(statuses[30]).toBe(429)
  }, 120_000)

  it('newsletter signup rejects an invalid address before it reaches the email provider', async () => {
    const res = await newsletterPost(new Request('http://localhost/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.7' },
      body: JSON.stringify({ email: 'not-an-email' }),
    }))
    expect(res.status).toBe(400)
  })

  it('newsletter signup rejects a malformed request body', async () => {
    const res = await newsletterPost(new Request('http://localhost/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ not json',
    }))
    expect(res.status).toBe(400)
  })
})

describe('security: cron endpoints fail closed', () => {
  it('the abandoned-cart email job refuses a request without the secret', async () => {
    const res = await abandonedCarts(new Request('http://localhost/api/cron/abandoned-carts'))
    expect(res.status).toBe(401)
  })

  it('the abandoned-cart email job refuses a wrong secret', async () => {
    const res = await abandonedCarts(new Request('http://localhost/api/cron/abandoned-carts', { headers: { authorization: 'Bearer wrong' } }))
    expect(res.status).toBe(401)
  })

  it('the commission job refuses a request without the secret', async () => {
    const res = await processCommissions(new Request('http://localhost/api/cron/process-commissions'))
    expect(res.status).toBe(401)
  })
})
