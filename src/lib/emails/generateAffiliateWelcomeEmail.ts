import { BRAND, shellOpen, shellClose, pillButton, wave, logoUrl } from './emailShell'

const HERO_IMAGE = 'https://pub-ac7469377283406ab723756fc506e004.r2.dev/Product%20Images/veracue-nad-plus-10mg-studio.webp'

export async function generateAffiliateWelcomeEmail(affiliate: any, user: any): Promise<string> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const affiliateName = affiliate.displayName || user?.firstName || 'Partner'
  const referralLink = `${serverUrl}/ref/${affiliate.referralSlug}`
  const couponCode = affiliate.couponCode || ''
  const commissionRate = affiliate.commissionRate || 15

  // shellOpen renders its own logo image inside the header <td>; render the "PARTNERS" wordmark
  // suffix as a header override so this stays a single shellOpen() call like the other templates.
  const header = shellOpen({ title: 'Welcome to the Partner Program', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })
    .replace(
      `<img src="${logoUrl()}" alt="Veracue" width="150" style="display:inline-block;height:26px;width:auto;border:0;" />`,
      `<img src="${logoUrl()}" alt="Veracue" width="150" style="display:inline-block;height:26px;width:auto;border:0;vertical-align:middle;" />&nbsp;&nbsp;<span style="font-family:-apple-system,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.1em;color:${BRAND.charcoal};vertical-align:middle;">PARTNERS</span>`,
    )

  return `${header}
          <tr>
            <td style="background-color:#ffffff;padding:8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr>
                  <td style="padding:0 24px;">
                    <img src="${HERO_IMAGE}" alt="Veracue research vial" width="100%" height="170" style="width:100%;max-width:552px;height:170px;object-fit:cover;border-radius:20px;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:26px 24px 32px;text-align:center;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.terracotta};">Application Approved</p>
                    <h1 style="margin:0 0 12px;font-family:-apple-system,sans-serif;font-weight:800;font-size:26px;color:${BRAND.charcoal};letter-spacing:-0.01em;">You're in, ${affiliateName}.</h1>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(32,34,28,0.6);">Your application was instantly approved. You're now an official Veracue partner &mdash; start earning ${commissionRate}% commission on every referral.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:32px 24px 8px;">
              <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">Your Partner Toolkit</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:14px;">
                <tr>
                  <td style="background-color:#ffffff;border-radius:16px;padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};">Your Referral Link</p>
                    <p style="margin:0;font-size:14px;font-weight:700;color:${BRAND.charcoal};word-break:break-all;">${referralLink}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
                <tr>
                  <td style="background-color:${BRAND.charcoal};border-radius:20px;padding:26px 24px;text-align:center;">
                    <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,241,230,0.5);">Your ${commissionRate}% Discount Code</p>
                    <p style="margin:0;font-family:-apple-system,sans-serif;font-weight:800;font-size:28px;letter-spacing:0.1em;color:${BRAND.linen};">${couponCode}</p>
                    <div style="border-top:1.5px dashed rgba(255,241,230,0.25);margin:20px 0 16px;"></div>
                    <p style="margin:0;font-size:12px;color:rgba(255,241,230,0.7);line-height:1.6;">Share it &mdash; they get ${commissionRate}% off, you earn ${commissionRate}% commission on the sale.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${wave(BRAND.linen, '#ffffff', 44)}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 38px;text-align:center;">
              <p style="margin:0 0 22px;font-size:13px;color:rgba(32,34,28,0.6);">Track clicks, conversions, and payouts from your partner dashboard.</p>
              ${pillButton(`${serverUrl}/account/partner`, 'View Your Dashboard')}
            </td>
          </tr>
${shellClose({ footerWaveFrom: '#ffffff', serverUrl })}`
}
