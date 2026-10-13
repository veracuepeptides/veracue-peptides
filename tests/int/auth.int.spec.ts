// @vitest-environment node
import { describe, it, beforeAll, expect, vi } from 'vitest'
import { getPayload, Payload } from 'payload'
import jwt from 'jsonwebtoken'
import config from '@/payload.config'

// Each registration arrives from its own address, so the per-IP sign-up limit never trips in tests.
const ipCounter = vi.hoisted(() => ({ n: Math.floor(Math.random() * 200) + 10 }))
vi.mock('next/headers', () => ({
  headers: async () => ({ get: (k: string) => (k === 'x-forwarded-for' ? `198.51.100.${(ipCounter.n++) % 250}` : null) }),
  cookies: async () => ({ get: () => undefined, set: () => {}, delete: () => {} }),
}))
const sent = vi.hoisted(() => [] as Array<{ to: string; subject: string }>)
vi.mock('@/lib/emails/sendTrackedEmail', () => ({
  sendTrackedEmail: vi.fn(async (_p: unknown, args: any) => {
    sent.push({ to: args.to, subject: args.subject })
    return { ok: true }
  }),
}))
vi.mock('@/lib/auth/getPayloadUser', () => ({ getPayloadUser: vi.fn(async () => null) }))

import { registerUser } from '@/app/(auth)/register/actions'
import { GET as verifyEmail } from '@/app/api/verify-email/route'
import { authOptions } from '@/lib/auth/authOptions'

const runId = Date.now().toString(36).toLowerCase()
const PASSWORD = 'QaTest-Passw0rd-2026'
// NextAuth keeps the real credential check on options; the top-level authorize is a placeholder.
const authorizeCredentials = (credentials: { email: string; password: string }) => {
  const provider: any = authOptions.providers.find((p: any) => p.id === 'credentials')
  return provider.options.authorize(credentials)
}
let payload: Payload

// Addresses are stored lower-case by the users hook, so the test always works in lower case too.
const newEmail = (tag: string) => `qa-test-auth-${tag}-${runId}@example.com`.toLowerCase()

async function createVerifiedCustomer(tag: string) {
  const email = newEmail(tag)
  const res = await registerUser({ firstName: 'QA', lastName: tag, email, password: PASSWORD, confirmPassword: PASSWORD } as any)
  expect(res.success).toBe(true)
  const doc = (await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
  await payload.update({ collection: 'users', id: doc.id, data: { emailVerified: true }, overrideAccess: true })
  return { id: doc.id as number, email, role: doc.role as string }
}

describe('auth: registration and email verification', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  }, 180_000)

  it('rejects an invalid registration without creating an account', async () => {
    const res: any = await registerUser({ firstName: '', lastName: '', email: 'not-an-email', password: 'x', confirmPassword: 'y' } as any)
    expect(res.success).toBe(false)
    expect(res.error).toBe('invalid')
  })

  it('creates a customer account that is unverified and stores the email in lower case', async () => {
    const email = `QA-Mixed-${runId}@Example.COM`
    const res = await registerUser({ firstName: 'QA', lastName: 'Case', email, password: PASSWORD, confirmPassword: PASSWORD } as any)
    expect(res.success).toBe(true)
    const doc = (await payload.find({ collection: 'users', where: { email: { equals: email.toLowerCase() } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    expect(doc).toBeTruthy()
    expect(doc.email).toBe(email.toLowerCase())
    expect(doc.email).toBe(`qa-mixed-${runId}@example.com`)
    expect(doc.role).toBe('customer')
    expect(doc.emailVerified).toBe(false)
    expect(sent.some((m) => m.to === email.toLowerCase() && m.subject.startsWith('Verify your email'))).toBe(true)
  }, 180_000)

  it('refuses a second account for the same address in a different letter case', async () => {
    const res: any = await registerUser({ firstName: 'QA', lastName: 'Dupe', email: `qa-mixed-${runId}@example.com`, password: PASSWORD, confirmPassword: PASSWORD } as any)
    expect(res.success).toBe(false)
    expect(res.error).toBe('emailInUse')
  })

  it('a valid verification link marks the account verified and redirects to login', async () => {
    const email = newEmail('verify')
    await registerUser({ firstName: 'QA', lastName: 'Verify', email, password: PASSWORD, confirmPassword: PASSWORD } as any)
    const doc = (await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    const token = jwt.sign({ userId: doc.id, purpose: 'verify-email' }, process.env.PAYLOAD_SECRET as string, { expiresIn: '1h' })
    const res = await verifyEmail(new Request(`http://localhost/api/verify-email?token=${token}`))
    expect(res.headers.get('location')).toMatch(/login\?verified=1/)
    const after = await payload.findByID({ collection: 'users', id: doc.id, depth: 0, overrideAccess: true })
    expect(after.emailVerified).toBe(true)
  }, 180_000)

  it('a tampered, expired or wrong-purpose token is rejected and verifies nothing', async () => {
    const email = newEmail('badtoken')
    await registerUser({ firstName: 'QA', lastName: 'Bad', email, password: PASSWORD, confirmPassword: PASSWORD } as any)
    const doc = (await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    const secret = process.env.PAYLOAD_SECRET as string
    const wrongPurpose = jwt.sign({ userId: doc.id, purpose: 'reset-password' }, secret, { expiresIn: '1h' })
    const expired = jwt.sign({ userId: doc.id, purpose: 'verify-email' }, secret, { expiresIn: -10 })
    const forged = jwt.sign({ userId: doc.id, purpose: 'verify-email' }, 'not-the-secret', { expiresIn: '1h' })
    for (const token of [wrongPurpose, expired, forged]) {
      const res = await verifyEmail(new Request(`http://localhost/api/verify-email?token=${token}`))
      expect(res.headers.get('location')).toMatch(/invalid_token/)
    }
    const after = await payload.findByID({ collection: 'users', id: doc.id, depth: 0, overrideAccess: true })
    expect(after.emailVerified).toBe(false)
  }, 180_000)

  it('login is refused until the email is verified, and allowed after', async () => {
    const email = newEmail('login')
    await registerUser({ firstName: 'QA', lastName: 'Login', email, password: PASSWORD, confirmPassword: PASSWORD } as any)
    const provider: any = authOptions.providers.find((p: any) => p.id === 'credentials')
    // An unverified account must not be signed in. Payload's own login refuses it, which surfaces here as null.
    let refused: unknown
    try {
      refused = await authorizeCredentials({ email, password: PASSWORD })
    } catch (err) {
      refused = err
    }
    expect(refused === null || refused instanceof Error).toBe(true)

    const doc = (await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    await payload.update({ collection: 'users', id: doc.id, data: { emailVerified: true }, overrideAccess: true })
    const user = await authorizeCredentials({ email, password: PASSWORD })
    expect(user?.email).toBe(email)
    expect(user?.role).toBe('customer')
  }, 180_000)

  it('a wrong password returns no user', async () => {
    const provider: any = authOptions.providers.find((p: any) => p.id === 'credentials')
    const user = await authorizeCredentials({ email: newEmail('login'), password: 'definitely-wrong' })
    expect(user).toBeNull()
  })
})

describe('auth: a customer cannot change what they are not allowed to change', () => {
  it('a customer cannot promote their own account to admin', async () => {
    const me = await createVerifiedCustomer('escalate')
    const asCustomer = { id: me.id, role: 'customer', email: me.email } as any
    let blocked = false
    try {
      await payload.update({ collection: 'users', id: me.id, data: { role: 'admin' }, overrideAccess: false, user: asCustomer })
    } catch {
      blocked = true
    }
    const after = await payload.findByID({ collection: 'users', id: me.id, depth: 0, overrideAccess: true })
    expect(after.role).toBe('customer')
  }, 180_000)

  it('a customer cannot mark their own email as verified through the account API', async () => {
    const email = newEmail('selfverify')
    await registerUser({ firstName: 'QA', lastName: 'Self', email, password: PASSWORD, confirmPassword: PASSWORD } as any)
    const doc = (await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]
    const asCustomer = { id: doc.id, role: 'customer', email } as any
    try {
      await payload.update({ collection: 'users', id: doc.id, data: { emailVerified: true }, overrideAccess: false, user: asCustomer })
    } catch {
      // refused is the expected outcome
    }
    const after = await payload.findByID({ collection: 'users', id: doc.id, depth: 0, overrideAccess: true })
    expect(after.emailVerified).toBe(false)
  }, 180_000)

  it('a customer cannot read another customer\'s account record', async () => {
    const a = await createVerifiedCustomer('readA')
    const b = await createVerifiedCustomer('readB')
    const asA = { id: a.id, role: 'customer', email: a.email } as any
    const res = await payload.find({ collection: 'users', where: { id: { equals: b.id } }, overrideAccess: false, user: asA, depth: 0, limit: 5 })
    expect(res.docs.length).toBe(0)
  }, 180_000)
})
