import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, wave, iconBadge } from './emailShell'

export async function generateAffiliateSaleEmail(affiliate: any, commissionAmount: number, isVoid: boolean): Promise<string> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const amount = (commissionAmount || 0).toFixed(2)
  const name = escapeHtml(affiliate.displayName || 'Partner')
  const accent = isVoid ? BRAND.stone : BRAND.olive

  return `${shellOpen({ title: isVoid ? 'Sale Tracked (Voided) — Veracue Partners' : 'New Sale Tracked — Veracue Partners', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 36px;text-align:center;">
              ${iconBadge(isVoid ? 'x-circle' : 'coin', BRAND.charcoal)}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${accent};">${isVoid ? 'Sale Voided' : 'New Sale Tracked'}</p>
              <h1 style="margin:0 0 12px;font-family:-apple-system,sans-serif;font-weight:800;font-size:25px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Hi ${name},</h1>
              <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(32,34,28,0.6);">${
                isVoid
                  ? "A sale was recently tracked to your affiliate account, but it has been marked as void. This typically happens if our system detects a self-referral or a policy violation. If you believe this was in error, please contact our support team."
                  : 'Great news! A new sale has been tracked to your affiliate account. Keep up the great work.'
              }</p>
            </td>
          </tr>
          ${wave('#ffffff', accent, 44)}
          <tr>
            <td style="background-color:${accent};padding:${isVoid ? '30px' : '38px'} 24px 40px;text-align:center;">
              ${
                isVoid
                  ? `<p style="margin:0;font-size:13px;color:${BRAND.charcoal};">Questions? <a href="${serverUrl}/contact-us" style="color:${BRAND.charcoal};text-decoration:underline;font-weight:700;">Contact support</a></p>`
                  : `<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,241,230,0.75);">Commission Earned</p>
                     <p style="margin:0;font-family:-apple-system,sans-serif;font-weight:800;font-size:40px;color:${BRAND.linen};">$${amount}</p>`
              }
            </td>
          </tr>
${shellClose({ footerWaveFrom: accent, serverUrl })}`
}
