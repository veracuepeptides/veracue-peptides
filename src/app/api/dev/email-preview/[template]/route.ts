import { NextResponse } from 'next/server'
import { generateOrderInvoiceHtml } from '@/lib/emails/generateOrderEmail'
import { generateWelcomeEmail } from '@/lib/emails/generateWelcomeEmail'
import { generateAffiliateWelcomeEmail } from '@/lib/emails/generateAffiliateWelcomeEmail'
import { generateVerifyEmailEmail } from '@/lib/emails/generateVerifyEmailEmail'
import { generateForgotPasswordEmail } from '@/lib/emails/generateForgotPasswordEmail'
import { generateMilitaryApprovalEmail } from '@/lib/emails/generateMilitaryApprovalEmail'
import { generateMilitaryRejectionEmail } from '@/lib/emails/generateMilitaryRejectionEmail'
import { generateAffiliateSaleEmail } from '@/lib/emails/generateAffiliateSaleEmail'
import { generateAdminAffiliateConversionEmail } from '@/lib/emails/generateAdminAffiliateConversionEmail'
import { generateAdminAffiliateNotificationEmail } from '@/lib/emails/generateAdminAffiliateNotificationEmail'
import { generateContactFormEmail } from '@/lib/emails/generateContactFormEmail'
import { generateMilitaryAdminEmail } from '@/lib/emails/generateMilitaryAdminEmail'

// Dev-only preview of the real, currently-shipping email HTML — no send, no DB writes. Lets the
// redesigned templates be checked in a browser exactly as they'll render for a recipient, without
// needing the (currently unwired) admin email-previewer or an actual test send.

const PRODUCT_IMAGE = 'https://pub-ac7469377283406ab723756fc506e004.r2.dev/Product%20Images/veracue-nad-plus-500mg-pedestal-white.webp'
const VARIANT_IMAGE = 'https://pub-ac7469377283406ab723756fc506e004.r2.dev/Product%20Images/veracue-nad-plus-10mg-studio.webp'

function sampleOrder(overrides: Record<string, any> = {}) {
  return {
    id: 1000,
    orderNumber: '1000',
    createdAt: new Date('2026-09-16T20:00:00Z').toISOString(),
    customerFirstName: 'Alex',
    customerLastName: 'Morgan',
    guestEmail: 'alex.morgan@email.com',
    customerPhone: '(312) 555-0148',
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    shippingMethod: 'Standard',
    trackingLink: 'https://parcelsapp.com/en/tracking/1Z999AA10123456784',
    couponCode: 'WELCOME10',
    redeemedPoints: 0,
    subtotal: 24.0,
    discountTotal: 2.4,
    shippingTotal: 0,
    feeTotal: 0.95,
    total: 22.55,
    appliedFees: [{ feeType: 'percentage', percentage: 4 }],
    shippingAddress: { line1: '221B Baker Street', city: 'Boston', state: 'MA', postalCode: '02118', country: 'US' },
    billingAddress: null,
    items: [
      {
        id: 'item-1',
        variant: 'NADPLUS-10MG',
        variantTitle: '10mg',
        quantity: 1,
        price: 24.0,
        productSnapshot: {
          name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
          images: [{ image: { url: PRODUCT_IMAGE } }],
          variants: [{ sku: 'NADPLUS-10MG', images: [{ image: { url: VARIANT_IMAGE } }] }],
        },
      },
    ],
    ...overrides,
  }
}

const TEMPLATES: Record<string, () => Promise<string>> = {
  'order-confirmation': () => generateOrderInvoiceHtml(sampleOrder(), undefined, undefined, 'success'),
  'order-awaiting-payment': () =>
    generateOrderInvoiceHtml(
      sampleOrder({ paymentMethod: 'zelle', paymentStatus: 'unpaid', trackingLink: undefined, discountTotal: 0, couponCode: '', total: 24.95 }),
      undefined,
      undefined,
      'success',
    ),
  'order-awaiting-payment-amex': () =>
    generateOrderInvoiceHtml(
      sampleOrder({ paymentMethod: 'amex', paymentStatus: 'unpaid', trackingLink: undefined, discountTotal: 0, couponCode: '', total: 24.95 }),
      undefined,
      undefined,
      'success',
    ),
  'order-failed': () => generateOrderInvoiceHtml(sampleOrder({ paymentStatus: 'unpaid' }), undefined, undefined, 'failed'),
  'order-cancelled': () => generateOrderInvoiceHtml(sampleOrder({ redeemedPoints: 5 }), undefined, undefined, 'cancelled'),
  'order-refunded': () => generateOrderInvoiceHtml(sampleOrder(), undefined, undefined, 'refunded'),
  welcome: () => generateWelcomeEmail({ firstName: 'Alex' }),
  'affiliate-welcome': () =>
    generateAffiliateWelcomeEmail(
      { displayName: 'Alex Morgan', referralSlug: 'alex-morgan', couponCode: 'ALEX15', commissionRate: 15 },
      { firstName: 'Alex' },
    ),
  'verify-email': async () => generateVerifyEmailEmail('Alex', 'https://veracuepeptides.com/api/verify-email?token=sample-token'),
  'forgot-password': () => generateForgotPasswordEmail('https://veracuepeptides.com/reset-password/sample-token', { firstName: 'Alex' }),
  'military-approval': async () => generateMilitaryApprovalEmail('Alex Morgan', 'VETERAN30'),
  'military-rejection': async () => generateMilitaryRejectionEmail('Alex Morgan'),
  'affiliate-sale': () => generateAffiliateSaleEmail({ displayName: 'Alex Morgan' }, 42.5, false),
  'affiliate-sale-void': () => generateAffiliateSaleEmail({ displayName: 'Alex Morgan' }, 0, true),
  'admin-affiliate-conversion': async () =>
    generateAdminAffiliateConversionEmail(
      { id: 1000, orderNumber: '1000', total: 22.55, guestEmail: 'alex.morgan@email.com' },
      { displayName: 'Alex Morgan' },
      3.38,
    ),
  'admin-affiliate-notification': async () =>
    generateAdminAffiliateNotificationEmail(
      {
        displayName: 'Alex Morgan',
        websiteUrl: 'https://alexmorgan.example.com',
        estimatedMonthlyReach: '25,000',
        promotionMethods: 'Instagram posts, YouTube reviews, and a weekly newsletter.',
        niche: 'Longevity & biohacking',
        socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/alexmorgan' }],
      },
      { id: 501, couponCode: 'ALEXM15', referralSlug: 'alex-morgan' },
      { email: 'alex.morgan@email.com' },
    ),
  'contact-form': async () =>
    generateContactFormEmail(
      'Alex Morgan',
      'alex.morgan@email.com',
      'support',
      'Question about COA availability',
      "Hi, could you send me the Certificate of Analysis for the NAD+ 500mg batch I ordered last week? Thanks!",
    ),
  'military-admin': async () => generateMilitaryAdminEmail('Alex Morgan', 'alex.morgan@email.com', 'army', 'sample-token'),
}

export async function GET(_req: Request, { params }: { params: Promise<{ template: string }> }) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not found', { status: 404 })
  }

  const { template } = await params
  const build = TEMPLATES[template]
  if (!build) {
    return NextResponse.json({ error: 'Unknown template', available: Object.keys(TEMPLATES) }, { status: 404 })
  }

  const html = await build()
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
