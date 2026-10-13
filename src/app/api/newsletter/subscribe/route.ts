import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build')

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254
const MAX_NAME_LENGTH = 100

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const rawEmail = typeof (body as any)?.email === 'string' ? (body as any).email : ''
  const email = rawEmail.trim().toLowerCase()
  const rawName = typeof (body as any)?.firstName === 'string' ? (body as any).firstName : ''
  const firstName = rawName.trim().slice(0, MAX_NAME_LENGTH)

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
  }

  // Signup is public and creates a real contact, so it is rate limited per client IP. The
  // platform appends the real IP as the last x-forwarded-for entry, which a visitor can't forge.
  const forwarded = (req.headers.get('x-forwarded-for') || '').split(',').map((v) => v.trim()).filter(Boolean)
  const ip = forwarded[forwarded.length - 1] || req.headers.get('x-real-ip') || 'unknown'
  const { allowed } = await checkRateLimit(`newsletter:${ip}`, 10, 60 * 60)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many sign-up attempts. Please try again later.' }, { status: 429 })
  }

  try {
    const payload: Record<string, unknown> = {
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
    }
    if (process.env.RESEND_AUDIENCE_ID) {
      payload.audienceId = process.env.RESEND_AUDIENCE_ID
    }

    const { data, error } = await resend.contacts.create(payload as any)

    if (error) {
      console.error('Resend API Error:', error)
      return NextResponse.json({ error: 'We could not subscribe you right now. Please try again.' }, { status: 502 })
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter', data },
      { status: 201 },
    )
  } catch (error) {
    console.error('Newsletter Subscription Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
