import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, pillButton, wave, iconBadge } from './emailShell'

export function generateVerifyEmailEmail(firstName: string | null | undefined, verifyUrl: string): string {
  const name = escapeHtml(firstName || 'there')

  return `${shellOpen({ title: 'Verify Your Email | Veracue Peptides', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 36px;text-align:center;">
              ${iconBadge('mail')}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">Confirm Your Email</p>
              <h1 style="margin:0 0 10px;font-family:-apple-system,sans-serif;font-weight:800;font-size:25px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Welcome, ${name}.</h1>
              <p style="margin:0;font-size:14px;line-height:1.65;color:rgba(32,34,28,0.6);">Please confirm your email address to complete your researcher registration and activate your account.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.olive, 44)}
          <tr>
            <td style="background-color:${BRAND.olive};padding:38px 24px 42px;text-align:center;">
              ${pillButton(verifyUrl, 'Verify Email')}
              <p style="margin:20px 0 0;font-size:12px;color:rgba(255,241,230,0.8);">This link expires in 48 hours. If you didn't create this account, you can safely ignore this email.</p>
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.olive, serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com' })}`
}
