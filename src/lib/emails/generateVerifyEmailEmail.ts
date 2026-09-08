import { escapeHtml } from './escapeHtml'
import { emailLayout } from './emailLayout'

export function generateVerifyEmailEmail(firstName: string | null | undefined, verifyUrl: string): string {
  const name = escapeHtml(firstName || 'there')
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com';
  return emailLayout({
    title: 'Verify your email - Veracue Peptides',
    serverUrl,
    content: `
              <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #20221c; text-align: center; font-weight: 700;">Welcome to Veracue Peptides</h2>
              <p style="margin: 0 0 24px 0; font-size: 15px; color: #4A4A4A; text-align: center; line-height: 1.6;">Hi ${name}, please confirm your email address to complete your researcher registration and activate your account.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background-color: #20221c; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 10px; letter-spacing: 0.05em; text-transform: uppercase;">Verify Email</a>
              </div>
              <p style="margin: 24px 0 0 0; font-size: 12px; color: #8A8A8A; text-align: center; line-height: 1.6;">This verification link expires in 48 hours. If you did not create this account, please disregard this email.</p>
    `
  })
}
