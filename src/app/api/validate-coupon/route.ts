import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { checkRateLimit } from '@/lib/rateLimit'

// Public, read-only coupon lookup for cart-page UX validation.
// The Coupons collection itself is staff-only now (it holds lockedEmails/remainingBalance,
// which are private), so this route hand-picks only the fields the cart UI needs to preview
// a discount. The authoritative check still happens server-side in verifyCoupon() at checkout.
export async function GET(request: Request) {
  // Limits how fast one client can probe codes. Real checkouts validate once per attempt, far
  // below this ceiling.
  const forwarded = (request.headers.get('x-forwarded-for') || '').split(',').map((v) => v.trim()).filter(Boolean)
  const ip = forwarded[forwarded.length - 1] || request.headers.get('x-real-ip') || 'unknown'
  const { allowed } = await checkRateLimit(`coupon-lookup:${ip}`, 30, 60)
  if (!allowed) {
    return NextResponse.json({ coupon: null, error: 'Too many lookups. Please wait a minute.' }, { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const code = (searchParams.get('code') || '').trim().toUpperCase().slice(0, 64)

  if (!code) {
    return NextResponse.json({ coupon: null })
  }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'coupons',
    where: { code: { equals: code } },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })

  const coupon = result.docs[0]
  if (!coupon) {
    return NextResponse.json({ coupon: null })
  }

  return NextResponse.json({
    coupon: {
      id: coupon.id,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      freeShipping: coupon.freeShipping,
      expiresAt: coupon.expiresAt,
      usageLimit: coupon.usageLimit,
      usageCount: coupon.usageCount,
      minSpend: coupon.minSpend,
      excludeSaleItems: coupon.excludeSaleItems,
      applicableProductTypes: coupon.applicableProductTypes,
      appliesTo: coupon.appliesTo,
      products: coupon.products,
      categories: coupon.categories,
      isActive: (coupon as any).isActive !== false,
    },
  })
}
