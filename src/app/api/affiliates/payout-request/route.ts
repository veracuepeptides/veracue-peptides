import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sql } from '@payloadcms/db-postgres'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { updateAffiliateStats } from '@/lib/affiliates/stats'
import { escapeHtml } from '@/lib/emails/escapeHtml'
import { sendTrackedEmail } from '@/lib/emails/sendTrackedEmail'

const ALLOWED_METHODS = ['zelle', 'cashapp', 'applepay'] as const
const DEFAULT_MINIMUM_PAYOUT = 50
const MAX_DETAILS_LENGTH = 500

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

export async function POST(request: Request) {
  try {
    const user = await getPayloadUser()
    if (!user) return fail('Unauthorized', 401)

    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'affiliates',
      where: { user: { equals: user.id } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const affiliate = docs[0]
    if (!affiliate) return fail('Affiliate not found', 404)
    // A suspended, rejected or pending affiliate has no right to request money, whatever they earned.
    if (affiliate.status !== 'approved') return fail('Your affiliate account is not active.', 403)

    const body = await request.json().catch(() => null)
    const amount = Number(body?.amount)
    if (!Number.isFinite(amount) || amount <= 0) return fail('Enter a valid amount.', 400)
    if (Math.abs(Math.round(amount * 100) - amount * 100) > 1e-6) {
      return fail('Amounts can have at most two decimal places.', 400)
    }

    const method = typeof body?.method === 'string' ? body.method : ''
    if (!(ALLOWED_METHODS as readonly string[]).includes(method)) return fail('Choose a valid payout method.', 400)

    const details = typeof body?.details === 'string' ? body.details.trim() : ''
    if (!details) return fail('Enter your payout details.', 400)
    if (details.length > MAX_DETAILS_LENGTH) return fail('Payout details are too long.', 400)

    const settings: any = await payload.findGlobal({ slug: 'affiliate-settings' }).catch(() => null)
    const threshold = Number(affiliate.minimumPayoutThreshold ?? settings?.defaultMinimumPayoutThreshold ?? DEFAULT_MINIMUM_PAYOUT)
    if (amount < threshold) return fail(`The minimum payout is $${threshold.toFixed(2)}.`, 400)

    // Refresh the cached totals from the real conversions and requests before checking the balance.
    await updateAffiliateStats(affiliate.id, payload)

    // Reserve the amount in one conditional statement, so two requests sent at the same moment
    // cannot both pass the balance check and together request more than was earned.
    // "requested" only counts pending/approved requests; once a request is marked paid it moves to
    // "paid", so the balance must subtract both or a paid-out amount becomes requestable again.
    const db = payload.db as any
    const reservation: any = await db.drizzle.execute(sql`
      UPDATE "affiliates"
      SET "total_commission_requested" = COALESCE("total_commission_requested", 0) + ${amount}
      WHERE "id" = ${affiliate.id}
        AND (COALESCE("total_commission_approved", 0)
             - COALESCE("total_commission_requested", 0)
             - COALESCE("total_commission_paid", 0)) >= ${amount}
      RETURNING "id"`)
    const reserved = reservation.rows || reservation
    if (!reserved || reserved.length === 0) return fail('Amount exceeds available balance', 400)

    try {
      await payload.create({
        collection: 'payout-requests',
        data: {
          affiliate: affiliate.id,
          amount,
          payoutMethod: method as any,
          payoutDetails: details,
          status: 'pending',
        },
        overrideAccess: true,
      })
    } catch (err) {
      // Give the reserved amount back if the request could not be saved.
      await db.drizzle.execute(sql`
        UPDATE "affiliates" SET "total_commission_requested" = GREATEST(0, COALESCE("total_commission_requested", 0) - ${amount})
        WHERE "id" = ${affiliate.id}`)
      throw err
    }

    await updateAffiliateStats(affiliate.id, payload)

    try {
      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb;">
        <div style="font-family: sans-serif; color: #111827; width: 100%; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; line-height: 1.6;">
          <h2 style="color: #000; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Affiliate Payout Request</h2>
          <p><strong>Affiliate:</strong> ${escapeHtml(String(affiliate.displayName || affiliate.referralSlug || 'Unknown'))} (${escapeHtml(String(user.email))})</p>
          <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
          <p><strong>Method:</strong> <span style="text-transform: uppercase;">${escapeHtml(method)}</span></p>
          <p><strong>Payout Details:</strong></p>
          <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; font-family: monospace;">${escapeHtml(details)}</p>
          <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">Please log in to the Payload admin panel to review, approve, and process this payout request.</p>
        </div>
</body>
</html>
      `
      await sendTrackedEmail(payload, {
        from: `"Veracue Support" <orders@veracuelabs.com>`,
        to: 'orders@veracuelabs.com',
        subject: `[Payout Request] $${amount.toFixed(2)} from ${affiliate.displayName || affiliate.referralSlug}`,
        html: emailHtml,
      })
    } catch (emailError) {
      console.error('Failed to send payout request email:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payout Request Error:', error)
    return fail('Internal Server Error', 500)
  }
}
