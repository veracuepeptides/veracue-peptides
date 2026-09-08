import { emailLayout } from './emailLayout'

export async function generateForgotPasswordEmail(url: string, user?: any): Promise<string> {
  const name = user?.firstName || 'there'
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com';
  
  return emailLayout({
    title: 'Reset Your Password - Veracue Peptides',
    serverUrl,
    content: `
              <h2 style="margin: 0 0 16px 0; font-size: 24px; color: #20221c; font-weight: 700; letter-spacing: -0.5px;">Password Reset Request</h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #4A4A4A; line-height: 1.6;">Hi ${name},</p>
              <p style="margin: 0 0 30px 0; font-size: 15px; color: #4A4A4A; line-height: 1.6;">We received a request to reset the password associated with your account at Veracue Peptides. If you authorized this request, please click the secure link below to proceed:</p>
              
              <!-- CTAs -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 28px;">
                    <a href="${url}" style="display: inline-block; background-color: #20221c; color: #ffffff; text-decoration: none; padding: 15px 36px; border-radius: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-size: 13px; text-align: center;">Reset Password</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 10px 0; font-size: 13px; color: #4A4A4A; line-height: 1.6;">If the button above does not work, copy and paste the following URL into your browser:</p>
              <p style="margin: 0 0 28px 0; font-size: 12px; color: #20221c; font-weight: 500; line-height: 1.6; word-break: break-all; background: #f0efeb; padding: 12px 16px; border-radius: 8px;">
                <a href="${url}" style="color: #20221c; text-decoration: none;">${url}</a>
              </p>
              
              <p style="margin: 0; font-size: 12px; color: #8A8A8A; line-height: 1.6;">This link expires in 1 hour. If you did not request a password reset, you can safely disregard this email and your account credentials will remain untouched.</p>
    `
  })
}
