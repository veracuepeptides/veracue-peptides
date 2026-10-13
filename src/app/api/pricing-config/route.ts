import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FALLBACK_SHIPPING_METHODS } from '@/lib/pricing/shipping'

// One small, CDN-cacheable answer for "what do shipping and fees look like", used by the cart page
// and the cart drawer. They used to call the generic /api/shippingzones and /api/processing-fees
// endpoints on every visit (two uncached Payload requests, about 4 s cold, and the drawer did it
// on every page of the site). The prices charged at checkout are always recomputed on the server
// from the database; this only feeds the estimate shown before checkout.
export const dynamic = 'force-dynamic'

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
}

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const [zones, fees] = await Promise.all([
      payload.find({ collection: 'shippingzones', limit: 1, depth: 0, overrideAccess: true }),
      payload.find({ collection: 'processing-fees', limit: 50, depth: 0, overrideAccess: true }),
    ])

    const zoneMethods = zones.docs[0]?.methods
    const methods = Array.isArray(zoneMethods) && zoneMethods.length > 0
      ? zoneMethods.map((m: any) => ({
          method: m.method,
          price: Number(m.price) || 0,
          estimatedDays: m.estimatedDays ?? null,
          minOrderAmount: m.minOrderAmount ?? null,
          isInternational: !!m.isInternational,
        }))
      : FALLBACK_SHIPPING_METHODS

    const activeFees = fees.docs
      .filter((fee: any) => fee.isActive !== false && !fee.isOptional)
      .map((fee: any) => ({ name: fee.name, amount: Number(fee.amount) || 0, type: fee.type }))

    return NextResponse.json({ methods, fees: activeFees }, { headers: CACHE_HEADERS })
  } catch (error) {
    console.error('pricing-config: falling back to defaults', error)
    // Do not let a CDN keep the fallback for long; the next request should try the database again.
    return NextResponse.json(
      { methods: FALLBACK_SHIPPING_METHODS, fees: [] },
      { headers: { 'Cache-Control': 'public, s-maxage=15' } },
    )
  }
}
