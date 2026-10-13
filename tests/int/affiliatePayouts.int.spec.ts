// @vitest-environment node
import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

const currentUser = vi.hoisted(() => ({ value: null as any }))
vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => currentUser.value) }))
vi.mock('next/headers', () => ({
  headers: async () => ({ get: () => null }),
  cookies: async () => ({ get: () => undefined, set: () => {}, delete: () => {} }),
}))

import { POST as payoutRequest } from '@/app/api/affiliates/payout-request/route'

const runId = Date.now().toString(36).toLowerCase()
let payload: Payload

async function makeAffiliate(tag: string, approvedCommission: number, status: 'approved' | 'pending' = 'approved') {
  const email = `qa-test-aff-${tag}-${runId}@example.com`
  const user = await payload.create({
    collection: 'users',
    data: { firstName: 'QA', lastName: tag, email, password: 'QaTest-Passw0rd-2026', role: 'customer', authProvider: 'credentials', emailVerified: true } as any,
    overrideAccess: true,
  })
  const affiliate = await payload.create({
    collection: 'affiliates',
    data: {
      user: user.id,
      status,
      referralSlug: `qa-aff-${tag}-${runId}`,
      displayName: `QA ${tag}`,
      cookieDurationDays: 30,
      minimumPayoutThreshold: 50,
      payoutCurrency: 'USD',
    } as any,
    overrideAccess: true,
  })
  if (approvedCommission > 0) {
    // Each conversion needs its own order, because a conversion is unique per order.
    const order = await payload.create({
      collection: 'orders',
      data: {
        guestEmail: email,
        customerFirstName: 'QA',
        customerLastName: 'Seed',
        status: 'paid',
        paymentStatus: 'captured',
        paymentMethod: 'zelle',
        fulfillmentStatus: 'unfulfilled',
        items: [{ product: 40, variant: 'DEFAULT', price: 36, quantity: 1 }],
        subtotal: approvedCommission * 10,
        total: approvedCommission * 10,
        shippingTotal: 0,
        discountTotal: 0,
        feeTotal: 0,
      } as any,
      overrideAccess: true,
    })
    await payload.create({
      collection: 'affiliate-conversions',
      data: {
        affiliate: affiliate.id,
        order: order.id,
        customerEmail: email,
        attributionSource: 'referral_link',
        orderSubtotal: approvedCommission * 10,
        orderDiscount: 0,
        eligibleSubtotal: approvedCommission * 10,
        commissionRate: 10,
        commissionAmount: approvedCommission,
        status: 'approved',
        pendingUntil: new Date(Date.now() - 1000).toISOString(),
      } as any,
      overrideAccess: true,
    })
  }
  return { user, affiliate, email }
}

const payoutBody = (overrides: Record<string, unknown> = {}) => ({
  amount: 60,
  method: 'zelle',
  details: 'qa-test-zelle@example.com',
  ...overrides,
})
const request = (body: unknown) =>
  payoutRequest(new Request('http://localhost/api/affiliates/payout-request', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }))

describe('affiliate payouts: who may request, and how much', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('refuses a request from someone who is not signed in', async () => {
    currentUser.value = null
    const res = await request(payoutBody())
    expect(res.status).toBe(401)
  })

  it('refuses a request from an affiliate who is not approved, even with earnings', async () => {
    const { user } = await makeAffiliate('pending', 200, 'pending')
    currentUser.value = user
    const res = await request(payoutBody())
    expect(res.status).toBe(403)
  }, 180_000)

  it('refuses an amount below the minimum payout', async () => {
    const { user } = await makeAffiliate('minimum', 200)
    currentUser.value = user
    const res = await request(payoutBody({ amount: 10 }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/minimum payout/)
  }, 180_000)

  it('refuses an amount above what has been earned', async () => {
    const { user } = await makeAffiliate('overdraw', 100)
    currentUser.value = user
    const res = await request(payoutBody({ amount: 150 }))
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/exceeds available balance/)
  }, 180_000)

  it('refuses zero, negative, non-numeric and over-precise amounts', async () => {
    const { user } = await makeAffiliate('badamount', 200)
    currentUser.value = user
    for (const amount of [0, -20, 'abc', 60.123]) {
      const res = await request(payoutBody({ amount }))
      expect(res.status).toBe(400)
    }
  }, 180_000)

  it('refuses an unknown payout method or empty payout details', async () => {
    const { user } = await makeAffiliate('badmethod', 200)
    currentUser.value = user
    expect((await request(payoutBody({ method: 'wire-to-anywhere' }))).status).toBe(400)
    expect((await request(payoutBody({ details: '   ' }))).status).toBe(400)
  }, 180_000)

  it('a valid request is recorded as pending and reduces what can be requested next', async () => {
    const { user, affiliate } = await makeAffiliate('valid', 200)
    currentUser.value = user
    const first = await request(payoutBody({ amount: 120 }))
    expect(first.status).toBe(200)
    const stored = await payload.find({ collection: 'payout-requests', where: { affiliate: { equals: affiliate.id } }, depth: 0, overrideAccess: true })
    expect(stored.docs.length).toBe(1)
    expect(stored.docs[0].status).toBe('pending')
    expect(Number(stored.docs[0].amount)).toBe(120)

    const second = await request(payoutBody({ amount: 120 }))
    expect(second.status).toBe(400)
  }, 180_000)

  it('two requests sent at the same moment cannot together exceed the balance', async () => {
    const { user, affiliate } = await makeAffiliate('race', 200)
    currentUser.value = user
    const [a, b] = await Promise.all([request(payoutBody({ amount: 150 })), request(payoutBody({ amount: 150 }))])
    const statuses = [a.status, b.status].sort()
    expect(statuses).toEqual([200, 400])
    const stored = await payload.find({ collection: 'payout-requests', where: { affiliate: { equals: affiliate.id } }, depth: 0, overrideAccess: true })
    const total = stored.docs.reduce((sum, r) => sum + Number(r.amount), 0)
    expect(total).toBeLessThanOrEqual(200)
  }, 180_000)

  it('an affiliate suspended after earning cannot request payout', async () => {
    const { user, affiliate } = await makeAffiliate('suspended', 200)
    await payload.update({ collection: 'affiliates', id: affiliate.id, data: { status: 'suspended' }, overrideAccess: true })
    currentUser.value = user
    const res = await request(payoutBody({ amount: 60 }))
    expect(res.status).toBe(403)
  }, 180_000)
})

describe('affiliate settings: what the affiliate may change on their own record', () => {
  it('an affiliate cannot raise their own commission rate, status or earnings', async () => {
    const { user, affiliate } = await makeAffiliate('fields', 0)
    const asAffiliate = { id: user.id, role: 'customer', email: user.email } as any
    const before = await payload.findByID({ collection: 'affiliates', id: affiliate.id, depth: 0, overrideAccess: true })
    for (const data of [{ commissionRate: 99 }, { status: 'approved', tier: 'vip' }, { totalCommissionApproved: 99999 }, { couponCode: 'OWNCODE99' }]) {
      try {
        await payload.update({ collection: 'affiliates', id: affiliate.id, data: data as any, overrideAccess: false, user: asAffiliate })
      } catch {
        // refused is the expected outcome
      }
    }
    const after = await payload.findByID({ collection: 'affiliates', id: affiliate.id, depth: 0, overrideAccess: true })
    expect(after.commissionRate).toBe(before.commissionRate)
    expect(after.tier).toBe(before.tier)
    expect(after.totalCommissionApproved).toBe(before.totalCommissionApproved)
    expect(after.couponCode).toBe(before.couponCode)
    expect(after.status).toBe(before.status)
  }, 180_000)

  it('an affiliate can update their display name and payout details', async () => {
    const { user, affiliate } = await makeAffiliate('editable', 0)
    const asAffiliate = { id: user.id, role: 'customer', email: user.email } as any
    await payload.update({
      collection: 'affiliates',
      id: affiliate.id,
      data: { displayName: 'QA Renamed', payoutMethods: [{ type: 'paypal', isPrimary: true }] } as any,
      overrideAccess: false,
      user: asAffiliate,
    })
    const after = await payload.findByID({ collection: 'affiliates', id: affiliate.id, depth: 0, overrideAccess: true })
    expect(after.displayName).toBe('QA Renamed')
  }, 180_000)
})
