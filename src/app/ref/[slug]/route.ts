import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import crypto from 'crypto'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  // Cheap guard before any database work: an unlimited stream of referral hits is otherwise an
  // easy way to burn the small connection pool.
  const requestIp = (request.headers.get('x-forwarded-for') || '').split(',').map((v) => v.trim()).filter(Boolean).pop()
    || request.headers.get('x-real-ip') || 'unknown'
  const gate = await checkRateLimit(`ref:${requestIp}`, 40, 600)
  if (!gate.allowed) return NextResponse.redirect(new URL('/', request.url))

  const payload = await getPayload({ config })
  const { slug } = await params

  // Look up affiliate by slug
  const result = await payload.find({
    collection: 'affiliates',
    where: { referralSlug: { equals: slug } },
    limit: 1,
  })

  const affiliate = result.docs[0]

  if (!affiliate || affiliate.status !== 'approved') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Prevent self-referral
  const user = await getPayloadUser()
  const affiliateUserId = typeof affiliate.user === 'object' ? affiliate.user.id : affiliate.user
  if (user && user.id === affiliateUserId) {
    // Redirect to home without setting any affiliate cookies or tracking clicks
    return NextResponse.redirect(new URL('/', request.url))
  }

  // The platform appends the real client IP to x-forwarded-for, so the last entry is the one a
  // visitor cannot forge. The first entry is whatever the client sent.
  const forwarded = (request.headers.get('x-forwarded-for') || '').split(',').map((v) => v.trim()).filter(Boolean)
  const ip = forwarded[forwarded.length - 1] || request.headers.get('x-real-ip') || 'unknown'
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex')
  const userAgent = (request.headers.get('user-agent') || 'unknown').slice(0, 300)
  const referrer = (request.headers.get('referer') || '').slice(0, 500)

  // One visitor refreshing or re-clicking the link within 30 minutes is one click, not many.
  // The redirect and attribution cookie are still set, so nothing is lost for the visitor.
  // Deduped on address alone: keying on the user agent too let a script mint a new click per
  // request just by changing that header.
  const dedupeSince = new Date(Date.now() - 30 * 60 * 1000).toISOString()
  const recent = await payload.find({
    collection: 'affiliate-clicks',
    where: {
      and: [
        { affiliate: { equals: affiliate.id } },
        { ipHash: { equals: ipHash } },
        { clickedAt: { greater_than: dedupeSince } },
      ],
    },
    sort: '-clickedAt',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const click = recent.docs[0] ?? await payload.create({
    collection: 'affiliate-clicks',
    data: {
      affiliate: affiliate.id,
      source: 'referral_link',
      ipHash,
      userAgent,
      referrer,
      landingPage: '/',
      clickedAt: new Date().toISOString(),
    },
    overrideAccess: true,
  })

  // Set cookies
  const response = NextResponse.redirect(new URL('/', request.url))
  const maxAge = (affiliate.cookieDurationDays || 30) * 24 * 60 * 60 // seconds

  response.cookies.set('affiliate_ref', String(affiliate.id), {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  response.cookies.set('affiliate_click_id', String(click.id), {
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  if (affiliate.couponCode) {
    // We do NOT use httpOnly here because we want the client-side cart logic to read and clear this cookie
    response.cookies.set('affiliate_auto_coupon', affiliate.couponCode, {
      maxAge: 60 * 60, // 1 hour is plenty of time to apply it
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  return response
}
