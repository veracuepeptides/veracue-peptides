import { BRAND, shellOpen, shellClose, pillButton, wave, iconBadge } from './emailShell'

function field(label: string, value: string): string {
  return `
    <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">${label}</p>
    <p style="margin:0 0 14px;font-size:14px;color:${BRAND.charcoal};font-weight:600;word-break:break-word;">${value}</p>`
}

export function generateAdminAffiliateNotificationEmail(application: any, affiliate: any, user: any): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const affiliateName = application.displayName || 'Partner'
  const website = application.websiteUrl || 'N/A'
  const reach = application.estimatedMonthlyReach || 'N/A'
  const promotionMethods = application.promotionMethods || 'N/A'
  const niche = application.niche || 'N/A'
  const adminUrl = `${serverUrl}/admin/collections/affiliates/${affiliate.id}`

  let socialLinksHtml = 'N/A'
  if (application.socialLinks && application.socialLinks.length > 0) {
    socialLinksHtml = application.socialLinks.map((link: any) => `<a href="${link.url}" style="color:${BRAND.terracotta};text-decoration:underline;">${link.platform}</a>`).join(' &middot; ')
  }

  return `${shellOpen({ title: 'New Partner Registration — Veracue Admin', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 8px;text-align:center;">
              ${iconBadge('user', BRAND.charcoal)}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.terracotta};">New Partner Registration</p>
              <h1 style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:800;font-size:22px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Auto-approved, ready to go.</h1>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(32,34,28,0.6);">A new partner registered and was automatically approved. Their coupon and referral link are already generated.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:14px;">
                <tr><td style="background-color:#ffffff;border-radius:16px;padding:20px;text-align:left;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND.terracotta};border-bottom:1px solid rgba(183,183,164,0.3);padding-bottom:10px;">Applicant Details</p>
                  ${field('Name', affiliateName)}
                  ${field('User Email', user?.email || 'N/A')}
                  ${field('Website / Primary Link', website)}
                  ${field('Social Links', socialLinksHtml)}
                  ${field('Estimated Reach', String(reach))}
                  ${field('Niche / Audience', niche)}
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">Promotion Strategy</p>
                  <p style="margin:0;font-size:13px;color:rgba(32,34,28,0.7);word-break:break-word;">${promotionMethods}</p>
                </td></tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr><td style="background-color:${BRAND.charcoal};border-radius:16px;padding:20px;text-align:left;">
                  <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,241,230,0.5);border-bottom:1px solid rgba(255,241,230,0.15);padding-bottom:10px;">Generated Assets</p>
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,241,230,0.5);">Assigned Coupon Code</p>
                  <p style="margin:0 0 14px;font-family:monospace;font-size:17px;font-weight:700;color:${BRAND.linen};word-break:break-word;">${affiliate.couponCode}</p>
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,241,230,0.5);">Referral Slug</p>
                  <p style="margin:0;font-family:monospace;font-size:15px;color:${BRAND.linen};word-break:break-word;">${affiliate.referralSlug}</p>
                </td></tr>
              </table>
              <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${wave(BRAND.linen, BRAND.terracotta, 44)}
          <tr>
            <td style="background-color:${BRAND.terracotta};padding:36px 24px 40px;text-align:center;">
              ${pillButton(adminUrl, 'View in Payload Admin', { bg: BRAND.charcoal, color: BRAND.linen, badgeBg: BRAND.olive, badgeColor: BRAND.charcoal })}
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.terracotta, serverUrl })}`
}
