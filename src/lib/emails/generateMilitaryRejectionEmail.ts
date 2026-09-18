import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, wave, iconBadge } from './emailShell'

export function generateMilitaryRejectionEmail(name: string): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const safeName = escapeHtml(name)

  return `${shellOpen({ title: 'Verification Update — Veracue', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 8px;text-align:center;">
              ${iconBadge('alert', BRAND.charcoal)}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.stone};">Verification Update</p>
              <h1 style="margin:0 0 12px;font-family:-apple-system,sans-serif;font-weight:800;font-size:24px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Hi ${safeName},</h1>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:rgba(32,34,28,0.6);">We received your request for our military discount program, but we weren't able to clearly verify the ID document provided, so it couldn't be approved at this time.</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;text-align:left;">
                <tr><td style="background-color:${BRAND.alabaster};border-radius:14px;padding:20px;">
                  <p style="margin:0;font-size:13px;color:rgba(32,34,28,0.7);line-height:1.6;">If you believe this was an error, try submitting a clearer photo of your ID on our website, or reply directly to this email to speak with our support team.</p>
                </td></tr>
              </table>
              <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
${shellClose({ footerWaveFrom: '#ffffff', serverUrl })}`
}
