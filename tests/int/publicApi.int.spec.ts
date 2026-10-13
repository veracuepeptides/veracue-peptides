import { describe, it, beforeAll, expect } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { GET as searchGet } from '@/app/api/search/route'
import { GET as validateCouponGet } from '@/app/api/validate-coupon/route'
import { POST as newsletterPost } from '@/app/api/newsletter/subscribe/route'

let payload: Payload
const runId = Date.now().toString(36).toUpperCase()
const createdCouponIds: number[] = []
const lockedCode = `QATEST-${runId}-PUB`

const searchRequest = (q: string | null) =>
  searchGet(new Request(`http://localhost/api/search${q === null ? '' : `?q=${encodeURIComponent(q)}`}`))

describe('header search API', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('returns an empty list for a missing query', async () => {
    const res = await searchRequest(null)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual([])
  })

  it('ignores single-character queries so each keystroke does not hit the catalog', async () => {
    const res = await searchRequest('s')
    expect(await res.json()).toEqual([])
    expect(res.headers.get('cache-control')).toContain('s-maxage')
  })

  it('finds a catalog product by name and returns at most 10 trimmed results', async () => {
    const res = await searchRequest('snap')
    expect(res.status).toBe(200)
    const items = (await res.json()) as any[]
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBeLessThanOrEqual(10)
    expect(items.some((p) => /snap/i.test(p.name))).toBe(true)
    for (const item of items) {
      expect(typeof item.description).toBe('string')
      expect(item.description.length).toBeLessThanOrEqual(280)
      expect(item).not.toHaveProperty('images')
      expect(item.slug).toBeTruthy()
    }
  })

  it('sends a shared-cache header so repeated queries are served without the database', async () => {
    const res = await searchRequest('snap')
    expect(res.headers.get('cache-control')).toMatch(/s-maxage=\d+/)
  })

  it('handles an oversized or hostile query without failing', async () => {
    const res = await searchRequest('a'.repeat(500) + '<script>')
    expect(res.status).toBe(200)
    expect(Array.isArray(await res.json())).toBe(true)
  })
})

describe('public coupon lookup (cart preview)', () => {
  beforeAll(async () => {
    const doc = await payload.create({
      collection: 'coupons',
      data: {
        code: lockedCode,
        type: 'percentage',
        value: 15,
        appliesTo: 'all',
        applicableProductTypes: 'all',
        lockedEmails: [{ email: 'private-person@example.com' }],
        remainingBalance: 0,
        freeShipping: false,
        stackable: false,
        excludeSaleItems: false,
        autoApply: false,
      } as any,
      overrideAccess: true,
    })
    createdCouponIds.push(doc.id as number)
  }, 180_000)


  it('returns null for an unknown code', async () => {
    const res = await validateCouponGet(new Request('http://localhost/api/validate-coupon?code=NOPE-QA-000'))
    expect(await res.json()).toEqual({ coupon: null })
  })

  it('returns the public preview fields for a real code, case-insensitively', async () => {
    const res = await validateCouponGet(new Request(`http://localhost/api/validate-coupon?code=${lockedCode.toLowerCase()}`))
    const { coupon } = await res.json()
    expect(coupon.code).toBe(lockedCode)
    expect(coupon.type).toBe('percentage')
    expect(coupon.value).toBe(15)
  })

  it('does not leak the locked-email list or store-credit balance to the public', async () => {
    const res = await validateCouponGet(new Request(`http://localhost/api/validate-coupon?code=${lockedCode}`))
    const text = await res.text()
    expect(text).not.toContain('private-person@example.com')
    expect(text).not.toContain('lockedEmails')
    expect(text).not.toContain('remainingBalance')
  })
})

describe('newsletter signup input handling', () => {
  // A valid address is deliberately not submitted here: that would create a real contact in
  // the Resend audience. These cases only exercise validation, which returns before any send.
  it('rejects a request with no email', async () => {
    const res = await newsletterPost(
      new Request('http://localhost/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ firstName: 'QA' }),
      }),
    )
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/Email is required/)
  })

  it('does not accept a malformed body as a subscription', async () => {
    const res = await newsletterPost(
      new Request('http://localhost/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: 'not json',
      }),
    )
    // Malformed input must never be reported as a successful subscription. The status itself is
    // not pinned here: a 400 would be better than the current 500 and is a separate fix.
    expect(res.status).not.toBe(201)
  })
})
