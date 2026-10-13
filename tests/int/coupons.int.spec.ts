// @vitest-environment node
import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import jwt from 'jsonwebtoken'
import { sql } from '@payloadcms/db-postgres'
import config from '@/payload.config'

// Auth and outbound email are replaced so the tests never depend on a browser session and
// never send real mail. Everything else (Payload, the database, the route handlers) is real.
const mockUser = vi.hoisted(() => ({ current: null as any }))
vi.mock('@/lib/auth/getPayloadUser', () => ({
  getPayloadUser: vi.fn(async () => mockUser.current),
}))
const sentEmails = vi.hoisted(() => [] as any[])
vi.mock('@/lib/emails/sendTrackedEmail', () => ({
  sendTrackedEmail: vi.fn(async (_payload: unknown, args: any) => {
    sentEmails.push(args)
    return { ok: true }
  }),
}))

import { verifyCoupon } from '@/app/(frontend)/(shop)/actions'
import { GET as militaryAction } from '@/app/api/military/action/route'
import { POST as militarySubmit } from '@/app/api/military/submit/route'
import { reserveCouponUsage } from '@/lib/orders/reserve'

// Test product (an active catalog item). Prices are supplied via priceSnapshot so the math
// under test is exact, independent of whatever the live catalog price is.
const TEST_PRODUCT_ID = 40
const runId = Date.now().toString(36).toUpperCase()
const createdCouponIds: number[] = []
const createdRequestIds: number[] = []
const createdCodes: string[] = []

let payload: Payload

async function makeCoupon(overrides: Record<string, any>) {
  const code = `QATEST-${runId}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const doc = await payload.create({
    collection: 'coupons',
    data: {
      code,
      type: 'percentage',
      value: 15,
      appliesTo: 'all',
      applicableProductTypes: 'all',
      freeShipping: false,
      stackable: false,
      excludeSaleItems: false,
      autoApply: false,
      ...overrides,
    } as any,
    overrideAccess: true,
  })
  createdCouponIds.push(doc.id as number)
  createdCodes.push(doc.code as string)
  return doc
}

const cart = (priceSnapshot: number, quantity = 1) => [
  { productId: TEST_PRODUCT_ID, quantity, priceSnapshot, variantSku: undefined },
]

describe('coupon math and enforcement', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    mockUser.current = null
    sentEmails.length = 0
  }, 180_000)


  it('15% of a $48.00 item is exactly $7.20 (was truncated to $7 before the fix)', async () => {
    await makeCoupon({ code: `QATEST-${runId}-A15` })
    const res = await verifyCoupon(`QATEST-${runId}-A15`, 48, cart(48))
    expect(res.valid).toBe(true)
    expect(res.discount).toBe(7.2)
  }, 180_000)

  it('15% of a $19.00 item is exactly $2.85 (was $2 before the fix)', async () => {
    await makeCoupon({ code: `QATEST-${runId}-B15` })
    const res = await verifyCoupon(`QATEST-${runId}-B15`, 19, cart(19))
    expect(res.valid).toBe(true)
    expect(res.discount).toBe(2.85)
  })

  it('15% over a multi-quantity line rounds to the nearest cent', async () => {
    await makeCoupon({ code: `QATEST-${runId}-C15` })
    // 3 x $19.99 = $59.97, 15% = $8.9955 -> $9.00
    const res = await verifyCoupon(`QATEST-${runId}-C15`, 59.97, cart(19.99, 3))
    expect(res.valid).toBe(true)
    expect(res.discount).toBe(9)
  })

  it('a locked coupon matches the account email regardless of letter case', async () => {
    await makeCoupon({ code: `QATEST-${runId}-LOCK`, lockedEmails: [{ email: 'Qa.Locked@Example.com' }] })
    mockUser.current = { id: 987654, email: 'qa.locked@example.COM' }
    const res = await verifyCoupon(`QATEST-${runId}-LOCK`, 48, cart(48))
    expect(res.valid).toBe(true)
    mockUser.current = null
  })

  it('a locked coupon is refused for a different account', async () => {
    await makeCoupon({ code: `QATEST-${runId}-LOCK2`, lockedEmails: [{ email: 'owner@example.com' }] })
    mockUser.current = { id: 987654, email: 'someone.else@example.com' }
    const res = await verifyCoupon(`QATEST-${runId}-LOCK2`, 48, cart(48))
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/not available for your account/)
    mockUser.current = null
  })

  it('a locked coupon is refused for guests', async () => {
    await makeCoupon({ code: `QATEST-${runId}-LOCK3`, lockedEmails: [{ email: 'owner@example.com' }] })
    mockUser.current = null
    const res = await verifyCoupon(`QATEST-${runId}-LOCK3`, 48, cart(48))
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/must log in/)
  })

  it('an expired coupon is refused', async () => {
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    // Payload's hook rejects past dates on write, so the expiry is set to a near-future date
    // and then moved into the past directly in the database, which is how a real coupon expires.
    const doc = await makeCoupon({ code: `QATEST-${runId}-EXP`, expiresAt: new Date(Date.now() + 3600 * 1000).toISOString() })
    const db = (payload.db as any).drizzle
    await db.execute(sql`UPDATE "coupons" SET "expires_at" = ${yesterday} WHERE "id" = ${doc.id}`)
    const res = await verifyCoupon(`QATEST-${runId}-EXP`, 48, cart(48))
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/expired/)
  })

  it('a coupon past its usage limit is refused at validation', async () => {
    // The create hook resets usageCount to 0 by design, so the count is set directly, as a
    // coupon that has already been redeemed would look in the database.
    const doc = await makeCoupon({ code: `QATEST-${runId}-USED`, usageLimit: 1 })
    await (payload.db as any).drizzle.execute(sql`UPDATE "coupons" SET "usage_count" = 1 WHERE "id" = ${doc.id}`)
    const res = await verifyCoupon(`QATEST-${runId}-USED`, 48, cart(48))
    expect(res.valid).toBe(false)
    expect(res.error).toMatch(/usage limit/)
  })

  it('usage reservation is atomic: a one-use coupon can be reserved once, not twice', async () => {
    const coupon = await makeCoupon({ code: `QATEST-${runId}-ONCE`, usageLimit: 1 })
    const first = await reserveCouponUsage(payload, coupon.id as number, 7.2, false)
    const second = await reserveCouponUsage(payload, coupon.id as number, 7.2, false)
    expect(first.success).toBe(true)
    expect(second.success).toBe(false)
  })
})

describe('military discount flow', () => {
  const qaEmail = `qa-test-military-${runId.toLowerCase()}@example.com`
  // A client address unique to this run, so the per-IP submission limit is not shared with earlier runs.
  const runClientIp = `198.51.100.${(Date.now() % 250) + 2}`

  it('submit creates a pending request once per day and refuses a second submission', async () => {
    const makeForm = () => {
      const form = new FormData()
      form.set('fullName', 'QA Military Tester')
      form.set('email', `  ${qaEmail.toUpperCase()}  `)
      form.set('branch', 'army')
      form.set('idPhoto', new File([new Uint8Array([0xff, 0xd8, 0xff])], 'id.jpg', { type: 'image/jpeg' }))
      return new Request('http://localhost/api/military/submit', { method: 'POST', body: form, headers: { 'x-forwarded-for': runClientIp } })
    }

    const first = await militarySubmit(makeForm() as any)
    expect(first.status).toBe(200)
    const created = await payload.find({
      collection: 'military-discount-requests',
      where: { email: { equals: qaEmail } },
      limit: 5,
      overrideAccess: true,
    })
    expect(created.totalDocs).toBe(1)
    expect(created.docs[0].status).toBe('pending')
    createdRequestIds.push(created.docs[0].id as number)

    const second = await militarySubmit(makeForm() as any)
    expect(second.status).toBe(429)

    // The admin notification carries the ID photo as an attachment.
    const adminMail = sentEmails.find((m) => m.to === 'orders@veracuelabs.com')
    expect(adminMail?.attachments?.length).toBe(1)
  }, 180_000)

  it('approving the request issues a 15% one-time coupon locked to that email, which works at checkout', async () => {
    const request = await payload.find({
      collection: 'military-discount-requests',
      where: { email: { equals: qaEmail } },
      limit: 1,
      overrideAccess: true,
    })
    const requestId = request.docs[0].id as number

    const token = jwt.sign(
      { name: 'QA Military Tester', email: qaEmail, branch: 'army', requestId },
      process.env.PAYLOAD_SECRET as string,
      { expiresIn: '7d' },
    )
    const approve = await militaryAction(
      new Request(`http://localhost/api/military/action?token=${encodeURIComponent(token)}&action=approve`) as any,
    )
    const html = await approve.text()
    expect(approve.status).toBe(200)
    expect(html).toContain('15% coupon')

    const updated = await payload.findByID({ collection: 'military-discount-requests', id: requestId, overrideAccess: true })
    expect(updated.status).toBe('approved')
    const code = updated.couponCode as string
    expect(code).toMatch(/^MIL-/)
    createdCodes.push(code)

    const coupon = (
      await payload.find({ collection: 'coupons', where: { code: { equals: code } }, limit: 1, overrideAccess: true })
    ).docs[0]
    createdCouponIds.push(coupon.id as number)
    expect(coupon.type).toBe('percentage')
    expect(coupon.value).toBe(15)
    expect(coupon.usageLimit).toBe(1)
    expect(coupon.applicableProductTypes).toBe('normal_only')
    expect((coupon.lockedEmails as any[]).map((e) => e.email)).toEqual([qaEmail])

    // Applies for the approved person (in any letter case) at checkout, at exactly 15%.
    mockUser.current = { id: 987654, email: qaEmail.toUpperCase() }
    const check = await verifyCoupon(code, 48, cart(48))
    expect(check.valid).toBe(true)
    expect(check.discount).toBe(7.2)

    // Refused for anyone else.
    mockUser.current = { id: 111111, email: 'not.the.veteran@example.com' }
    const other = await verifyCoupon(code, 48, cart(48))
    expect(other.valid).toBe(false)
    mockUser.current = null

    // A repeat click on the approval link does not mint a second coupon.
    const again = await militaryAction(
      new Request(`http://localhost/api/military/action?token=${encodeURIComponent(token)}&action=approve`) as any,
    )
    expect(await again.text()).toMatch(/Already Processed/)
  }, 180_000)
})
