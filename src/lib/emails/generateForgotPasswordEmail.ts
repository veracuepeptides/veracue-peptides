import { BRAND, shellOpen, shellClose, pillButton, wave, iconBadge } from './emailShell'

export async function generateForgotPasswordEmail(url: string, user?: any): Promise<string> {
  const name = user?.firstName || 'there'
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'

  return `${shellOpen({ title: 'Reset Your Password | Veracue Peptides', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 36px;text-align:center;">
              ${iconBadge('lock')}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">Password Reset Request</p>
              <h1 style="margin:0 0 10px;font-family:-apple-system,sans-serif;font-weight:800;font-size:25px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Hi ${name},</h1>
              <p style="margin:0;font-size:14px;line-height:1.65;color:rgba(32,34,28,0.6);">We received a request to reset the password on your Veracue account. If you authorized this, click below to proceed.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.olive, 44)}
          <tr>
            <td style="background-color:${BRAND.olive};padding:38px 24px 42px;text-align:center;">
              ${pillButton(url, 'Reset Password')}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:24px;">
                <tr><td style="background-color:rgba(255,255,255,0.15);border-radius:12px;padding:14px 18px;">
                  <p style="margin:0 0 6px;font-size:11px;color:rgba(255,241,230,0.75);">If the button doesn't work, copy this link:</p>
                  <p style="margin:0;font-size:11.5px;color:${BRAND.linen};word-break:break-all;"><a href="${url}" style="color:${BRAND.linen};text-decoration:underline;">${url}</a></p>
                </td></tr>
              </table>
              <p style="margin:18px 0 0;font-size:12px;color:rgba(255,241,230,0.8);">This link expires in 1 hour. If you didn't request this, your password stays unchanged.</p>
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.olive, serverUrl })}`
}
