import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, pillButton, wave, iconBadge } from './emailShell'

export function generateMilitaryApprovalEmail(name: string, couponCode: string): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const safeName = escapeHtml(name)
  const safeCoupon = escapeHtml(couponCode)

  return `${shellOpen({ title: 'Thank You For Your Service | Veracue Peptides', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 36px;text-align:center;">
              ${iconBadge('star')}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.terracotta};">Verification Approved</p>
              <h1 style="margin:0 0 12px;font-family:-apple-system,sans-serif;font-weight:800;font-size:25px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Hi ${safeName},</h1>
              <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(32,34,28,0.6);">Your military ID has been verified by our team. We deeply appreciate your service, here's your discount code.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:32px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr><td style="background-color:${BRAND.charcoal};border-radius:20px;padding:30px 24px;text-align:center;">
                <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,241,230,0.5);">Your Discount Code</p>
                <p style="margin:0;font-family:-apple-system,sans-serif;font-weight:800;font-size:30px;letter-spacing:0.1em;color:${BRAND.linen};">${safeCoupon}</p>
                <div style="border-top:1.5px dashed rgba(255,241,230,0.25);margin:20px 0 14px;"></div>
                <p style="margin:0;font-size:11.5px;font-style:italic;color:rgba(255,241,230,0.65);">Locked to your email address, this code cannot be shared or transferred.</p>
              </td></tr></table>
              <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${wave(BRAND.linen, BRAND.terracotta, 44)}
          <tr>
            <td style="background-color:${BRAND.terracotta};padding:36px 24px 40px;text-align:center;">
              ${pillButton(`${serverUrl}/shop`, 'Shop Now', { bg: BRAND.charcoal, color: BRAND.linen, badgeBg: BRAND.olive, badgeColor: BRAND.charcoal })}
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.terracotta, serverUrl })}`
}
