// @vitest-environment node
import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

const currentUser = vi.hoisted(() => ({ value: null as any }))
const sessionUser = vi.hoisted(() => ({ value: null as any }))
// The wishlist action reads the NextAuth session, so the session carries the same test user.
vi.mock('next-auth', () => ({ getServerSession: vi.fn(async () => (sessionUser.value ? { user: { id: String(sessionUser.value.id) } } : null)) }))
vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => currentUser.value) }))
// One client address per run, so the contact form's per-IP limit is not shared with earlier runs.
const runIp = vi.hoisted(() => `198.51.100.${(Date.now() % 200) + 30}`)
vi.mock('next/headers', () => ({
  headers: async () => ({ get: (k: string) => (k === 'x-forwarded-for' ? runIp : null) }),
  cookies: async () => ({ get: () => undefined, set: () => {}, delete: () => {} }),
}))
vi.mock('next/cache', () => ({ revalidatePath: () => {}, revalidateTag: () => {} }))
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}))

import { deleteAddress, updateAddress } from '@/app/(frontend)/(shop)/account/addresses/actions'
import { toggleWishlistInPayload } from '@/app/(frontend)/actions/wishlist'
import { submitContactForm } from '@/app/(frontend)/contact-us/actions'

const runId = Date.now().toString(36).toLowerCase()
const PRODUCT_ID = 40
let payload: Payload

async function makeCustomer(tag: string) {
  const email = `qa-test-acct-${tag}-${runId}@example.com`
  const user = await payload.create({
    collection: 'users',
    data: { firstName: 'QA', lastName: tag, email, password: 'QaTest-Passw0rd-2026', role: 'customer', authProvider: 'credentials', emailVerified: true } as any,
    overrideAccess: true,
  })
  return { id: user.id as number, email, role: 'customer', asUser: { id: user.id, role: 'customer', email } as any }
}

async function makeAddress(owner: number, line1: string) {
  return payload.create({
    collection: 'addresses',
    data: { user: owner, firstName: 'QA', lastName: 'Address', phone: '5555550100', line1, city: 'Boston', state: 'MA', postalCode: '02118', country: 'US', label: 'Home' } as any,
    overrideAccess: true,
  })
}

describe('account: addresses belong to their owner', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('a customer can delete their own address', async () => {
    const a = await makeCustomer('addr-own')
    const addr = await makeAddress(a.id, '1 Own Street')
    currentUser.value = a.asUser
    await deleteAddress(String(addr.id))
    await expect(payload.findByID({ collection: 'addresses', id: addr.id, depth: 0, overrideAccess: true })).rejects.toBeTruthy()
  }, 180_000)

  it('a customer cannot delete or edit another customer\'s address', async () => {
    const owner = await makeCustomer('addr-owner')
    const intruder = await makeCustomer('addr-intruder')
    const addr = await makeAddress(owner.id, '2 Owner Street')
    currentUser.value = intruder.asUser

    const denied: any = await deleteAddress(String(addr.id)).catch((err: Error) => ({ success: false, error: err.message }))
    expect(denied.success).toBe(false)
    const fd = new FormData()
    fd.set('line1', 'Hijacked Street'); fd.set('city', 'X'); fd.set('state', 'X'); fd.set('postalCode', '00000'); fd.set('country', 'US')
    const editDenied: any = await updateAddress(String(addr.id), fd).catch((err: Error) => ({ success: false, error: err.message }))
    expect(editDenied.success).toBe(false)

    const still = await payload.findByID({ collection: 'addresses', id: addr.id, depth: 0, overrideAccess: true })
    expect(still.line1).toBe('2 Owner Street')
  }, 180_000)
})

describe('account: wishlists and carts are private', () => {
  it('adding to a wishlist stores it on the customer\'s own list', async () => {
    const a = await makeCustomer('wish')
    currentUser.value = a.asUser
    sessionUser.value = a.asUser
    const res: any = await toggleWishlistInPayload(PRODUCT_ID, true)
    expect(res?.success ?? true).toBeTruthy()
    const lists = await payload.find({ collection: 'wishlists', where: { user: { equals: a.id } }, depth: 0, overrideAccess: true })
    expect(lists.docs.length).toBe(1)
  }, 180_000)

  it('one customer cannot read another customer\'s wishlist through the API', async () => {
    const a = await makeCustomer('wishA')
    const b = await makeCustomer('wishB')
    currentUser.value = a.asUser
    sessionUser.value = a.asUser
    await toggleWishlistInPayload(PRODUCT_ID, true)
    const seen = await payload.find({ collection: 'wishlists', overrideAccess: false, user: b.asUser, depth: 0, limit: 50 })
    expect(seen.docs.every((w: any) => String(w.user?.id ?? w.user) !== String(a.id))).toBe(true)
  }, 180_000)

  it('a cart can only be read by its owner', async () => {
    const a = await makeCustomer('cartA')
    const b = await makeCustomer('cartB')
    const cart = await payload.create({
      collection: 'carts',
      data: { user: a.id, items: [{ product: PRODUCT_ID, variantSku: 'DEFAULT', quantity: 1, priceSnapshot: 36 }] } as any,
      overrideAccess: true,
    })
    const asB = await payload.find({ collection: 'carts', overrideAccess: false, user: b.asUser, depth: 0, limit: 5 })
    expect(asB.docs.find((c: any) => c.id === cart.id)).toBeUndefined()
    const asA = await payload.find({ collection: 'carts', overrideAccess: false, user: a.asUser, depth: 0, limit: 5 })
    expect(asA.docs.find((c: any) => c.id === cart.id)).toBeTruthy()
  }, 180_000)
})

describe('account: order tracking is visible only to the buyer', () => {
  it('the buyer sees the tracking link on their order, and nobody else does', async () => {
    const buyer = await makeCustomer('track')
    const stranger = await makeCustomer('trackstranger')
    const order = await payload.create({
      collection: 'orders',
      data: {
        owner: buyer.id,
        customerFirstName: 'QA',
        customerLastName: 'Track',
        status: 'shipped',
        paymentStatus: 'captured',
        paymentMethod: 'zelle',
        fulfillmentStatus: 'fulfilled',
        items: [{ product: PRODUCT_ID, variant: 'DEFAULT', price: 36, quantity: 1 }],
        subtotal: 36,
        total: 36,
        shippingTotal: 0,
        discountTotal: 0,
        feeTotal: 0,
        trackingLink: 'https://track.example.com/qa-test-package',
      } as any,
      overrideAccess: true,
    })
    const mine = await payload.findByID({ collection: 'orders', id: order.id, depth: 0, overrideAccess: false, user: buyer.asUser })
    expect(mine.trackingLink).toBe('https://track.example.com/qa-test-package')
    await expect(payload.findByID({ collection: 'orders', id: order.id, depth: 0, overrideAccess: false, user: stranger.asUser })).rejects.toBeTruthy()
  }, 180_000)
})

describe('reviews: only a buyer can review through their own order', () => {
  it('a buyer can review through their own shipped order, and the review is marked verified', async () => {
    const buyer = await makeCustomer('review')
    const order = await payload.create({
      collection: 'orders',
      data: {
        owner: buyer.id, customerFirstName: 'QA', customerLastName: 'Review', status: 'shipped', paymentStatus: 'captured',
        paymentMethod: 'zelle', fulfillmentStatus: 'fulfilled', items: [{ product: PRODUCT_ID, variant: 'DEFAULT', price: 36, quantity: 1 }],
        subtotal: 36, total: 36, shippingTotal: 0, discountTotal: 0, feeTotal: 0,
      } as any,
      overrideAccess: true,
    })
    const review = await payload.create({
      collection: 'reviews',
      data: { product: PRODUCT_ID, rating: 5, order: order.id } as any,
      user: buyer.asUser,
      overrideAccess: false,
    })
    expect(review.verifiedPurchase).toBe(true)
    expect(String((review.user as any)?.id ?? review.user)).toBe(String(buyer.id))
  }, 180_000)

  it('a customer cannot review using someone else\'s shipped order', async () => {
    const owner = await makeCustomer('reviewowner')
    const other = await makeCustomer('reviewother')
    const order = await payload.create({
      collection: 'orders',
      data: {
        owner: owner.id, customerFirstName: 'QA', customerLastName: 'Owner', status: 'shipped', paymentStatus: 'captured',
        paymentMethod: 'zelle', fulfillmentStatus: 'fulfilled', items: [{ product: PRODUCT_ID, variant: 'DEFAULT', price: 36, quantity: 1 }],
        subtotal: 36, total: 36, shippingTotal: 0, discountTotal: 0, feeTotal: 0,
      } as any,
      overrideAccess: true,
    })
    await expect(payload.create({
      collection: 'reviews',
      data: { product: PRODUCT_ID, rating: 1, order: order.id } as any,
      user: other.asUser,
      overrideAccess: false,
    })).rejects.toThrow(/does not belong/)
  }, 180_000)

  it('a customer cannot post a review in someone else\'s name', async () => {
    const poster = await makeCustomer('reviewposter')
    const victim = await makeCustomer('reviewvictim')
    const review = await payload.create({
      collection: 'reviews',
      data: { product: PRODUCT_ID, rating: 4, user: victim.id } as any,
      user: poster.asUser,
      overrideAccess: false,
    })
    expect(String((review.user as any)?.id ?? review.user)).toBe(String(poster.id))
  }, 180_000)
})

describe('contact form', () => {
  const form = (fields: Record<string, string>) => {
    const fd = new FormData()
    for (const [k, v] of Object.entries(fields)) fd.set(k, v)
    return fd
  }
  const good = { name: 'QA Contact', email: 'qa-test-contact@example.com', subject: 'Question', message: 'Testing the contact form.', department: 'general' }

  it('a complete, valid message is accepted', async () => {
    const res: any = await submitContactForm(form(good))
    expect(res.success).toBe(true)
  })

  it('a message with an invalid email address is refused', async () => {
    const res: any = await submitContactForm(form({ ...good, email: 'not-an-email' }))
    expect(res.error).toBeTruthy()
    expect(res.success).toBeUndefined()
  })

  it('an oversized message is refused', async () => {
    const res: any = await submitContactForm(form({ ...good, message: 'x'.repeat(5001) }))
    expect(res.error).toBeTruthy()
  })
})

describe('admin-only data stays with staff', () => {
  it('a customer cannot read the email log, coupons, or other customers\' affiliate data', async () => {
    const c = await makeCustomer('matrix')
    for (const collection of ['email-logs', 'coupons', 'payout-requests', 'contact-messages'] as const) {
      const res = await payload.find({ collection: collection as any, overrideAccess: false, user: c.asUser, depth: 0, limit: 3 }).catch(() => ({ docs: [] as any[] }))
      expect(res.docs.length, `customer read of ${collection}`).toBe(0)
    }
  }, 180_000)
})
