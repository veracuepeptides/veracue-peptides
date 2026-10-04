import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, wave, iconBadge } from './emailShell'

function field(label: string, value: string): string {
  return `
    <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">${label}</p>
    <p style="margin:0 0 14px;font-size:14px;color:${BRAND.charcoal};font-weight:600;word-break:break-word;">${value}</p>`
}

export function generateContactFormEmail(
  rawName: string,
  rawEmail: string,
  rawDepartment: string,
  rawSubject: string,
  rawMessage: string,
): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const name = escapeHtml(rawName)
  const email = escapeHtml(rawEmail)
  const department = escapeHtml(rawDepartment) || 'General'
  const subject = escapeHtml(rawSubject)
  const message = escapeHtml(rawMessage)

  return `${shellOpen({ title: 'New Contact Form Submission | Veracue Admin', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 8px;text-align:center;">
              ${iconBadge('message')}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">Contact Form Submission</p>
              <h1 style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:800;font-size:22px;color:${BRAND.charcoal};letter-spacing:-0.01em;">New message from the site.</h1>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(32,34,28,0.6);">A new message was received from the contact page form.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:16px;">
                <tr><td style="background-color:#ffffff;border-radius:16px;padding:20px;text-align:left;">
                  ${field('Name', name)}
                  ${field('Email', email)}
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">Department</p>
                  <p style="margin:0 0 14px;font-size:14px;color:${BRAND.charcoal};font-weight:600;text-transform:capitalize;">${department}</p>
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">Subject</p>
                  <p style="margin:0;font-size:14px;color:${BRAND.charcoal};font-weight:600;word-break:break-word;">${subject}</p>
                </td></tr>
              </table>

              <p style="margin:0 0 10px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};">Message</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr><td style="background-color:#ffffff;border-radius:14px;padding:18px 20px;text-align:left;">
                  <p style="margin:0;font-size:13.5px;color:rgba(32,34,28,0.75);line-height:1.6;white-space:pre-wrap;word-break:break-word;">${message}</p>
                </td></tr>
              </table>

              <p style="margin:16px 0 0;font-size:11.5px;color:rgba(32,34,28,0.4);font-style:italic;text-align:center;">Reply directly to this email to respond to ${name}.</p>
              <div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.linen, serverUrl })}`
}
