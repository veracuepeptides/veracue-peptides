import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

// The referral redirect reads the signed-in user to block self-referral. Auth is replaced so
// the test controls that, and nothing else is mocked: the affiliate lookup, the click record
// and the cookies all go through the real Payload instance and the real route handler.
const mockUser = vi.hoisted(() => ({ current: null as any }))
vi.mock('@/lib/auth/getPayloadUser', () => ({
  getPayloadUser: vi.fn(async () => mockUser.current),
}))

import { GET as referralGet } from '@/app/ref/[slug]/route'

let payload: Payload
const runTag = Date.now().toString(36)
const createdClickIds: number[] = []
let approvedSlug = ''
let approvedAffiliateId = 0
let approvedUserId = 0

function referralRequest(slug: string, headers: Record<string, string> = {}) {
  return referralGet(
    new Request(`http://localhost/ref/${slug}`, {
      // A user agent unique to this run, so the 30-minute click de-duplication from earlier runs
      // does not swallow the click this test is counting.
      headers: { 'user-agent': `qa-test-agent-${runTag}`, 'x-forwarded-for': '203.0.113.7', ...headers },
    }),
    { params: Promise.resolve({ slug }) },
  )
}

function setCookies(res: Response): string[] {
  const raw = (res.headers as any).getSetCookie?.() as string[] | undefined
  if (raw) return raw
  const single = res.headers.get('set-cookie')
  return single ? [single] : []
}

describe('affiliate referral links', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    mockUser.current = null
    const affiliate = (
      await payload.find({ collection: 'affiliates', where: { status: { equals: 'approved' } }, limit: 1, depth: 0, overrideAccess: true })
    ).docs[0]
    expect(affiliate, 'an approved affiliate must exist to test referrals').toBeTruthy()
    approvedSlug = affiliate.referralSlug as string
    approvedAffiliateId = affiliate.id as number
    approvedUserId = typeof affiliate.user === 'object' ? (affiliate.user as any).id : (affiliate.user as number)
  }, 180_000)


  it('an approved referral link records one click and sets the attribution cookies', async () => {
    const before = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    const res = await referralRequest(approvedSlug)

    expect(res.status).toBe(307)
    expect(new URL(res.headers.get('location') as string).pathname).toBe('/')

    const cookies = setCookies(res).join('; ')
    expect(cookies).toContain(`affiliate_ref=${approvedAffiliateId}`)
    expect(cookies).toMatch(/affiliate_click_id=\d+/)

    const after = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    expect(after.totalDocs).toBe(before.totalDocs + 1)

    const latest = await payload.find({
      collection: 'affiliate-clicks',
      sort: '-createdAt',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    createdClickIds.push(latest.docs[0].id as number)
    expect(latest.docs[0].source).toBe('referral_link')
  }, 180_000)

  it('an unknown slug redirects home with no cookie and no click', async () => {
    const before = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    const res = await referralRequest('no-such-affiliate-qa')
    expect(res.status).toBe(307)
    expect(setCookies(res).join('')).not.toContain('affiliate_ref')
    const after = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    expect(after.totalDocs).toBe(before.totalDocs)
  })

  it('an affiliate clicking their own link is not credited', async () => {
    mockUser.current = { id: approvedUserId, email: 'owner@example.com', role: 'customer' }
    const before = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    const res = await referralRequest(approvedSlug)
    mockUser.current = null
    expect(setCookies(res).join('')).not.toContain('affiliate_ref')
    const after = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    expect(after.totalDocs).toBe(before.totalDocs)
  })

  it('a repeat click from the same visitor within 30 minutes is recorded once, and the cookies are still set', async () => {
    const before = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    const first = await referralRequest(approvedSlug)
    const second = await referralRequest(approvedSlug)
    const after = await payload.count({ collection: 'affiliate-clicks', overrideAccess: true })
    // At most one new row for this visitor, however many times the link is hit in the window.
    expect(after.totalDocs - before.totalDocs).toBeLessThanOrEqual(1)
    expect(setCookies(first).join('')).toContain('affiliate_click_id=')
    expect(setCookies(second).join('')).toContain('affiliate_click_id=')
    const recent = await payload.find({ collection: 'affiliate-clicks', sort: '-createdAt', limit: 1, depth: 0, overrideAccess: true })
    if (after.totalDocs > before.totalDocs) createdClickIds.push(recent.docs[0].id as number)
  }, 180_000)
})
