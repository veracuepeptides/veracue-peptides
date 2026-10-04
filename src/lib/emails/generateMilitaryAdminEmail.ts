import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, pillButton, outlineButton, wave, iconBadge } from './emailShell'

function field(label: string, value: string): string {
  return `
    <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">${label}</p>
    <p style="margin:0 0 14px;font-size:14px;color:${BRAND.charcoal};font-weight:600;">${value}</p>`
}

export function generateMilitaryAdminEmail(rawName: string, rawEmail: string, rawBranch: string, token: string): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const approveUrl = `${serverUrl}/api/military/action?action=approve&token=${token}`
  const rejectUrl = `${serverUrl}/api/military/action?action=reject&token=${token}`
  const name = escapeHtml(rawName)
  const email = escapeHtml(rawEmail)
  const branch = escapeHtml(rawBranch)

  return `${shellOpen({ title: 'Military Verification Request | Veracue Admin', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 8px;text-align:center;">
              ${iconBadge('shield', BRAND.charcoal)}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.terracotta};">Verification Requested</p>
              <h1 style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:800;font-size:22px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Please review the applicant.</h1>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(32,34,28,0.6);">A new military/first-responder discount verification request has been received. Please review the attached ID photo before deciding.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr><td style="background-color:#ffffff;border-radius:16px;padding:20px;text-align:left;">
                  ${field('Name', name)}
                  ${field('Email', email)}
                  <p style="margin:0 0 3px;font-size:9.5px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">Service Branch</p>
                  <p style="margin:0;font-size:14px;color:${BRAND.charcoal};font-weight:600;text-transform:capitalize;">${branch}</p>
                </td></tr>
              </table>
              <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${wave(BRAND.linen, BRAND.terracotta, 44)}
          <tr>
            <td style="background-color:${BRAND.terracotta};padding:36px 24px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:10px;">${pillButton(approveUrl, 'Approve', { bg: BRAND.charcoal, color: BRAND.linen, badgeBg: BRAND.olive, badgeColor: BRAND.charcoal })}</td>
                  <td style="padding-left:10px;">${outlineButton(rejectUrl, 'Deny', { borderColor: BRAND.charcoal, color: BRAND.charcoal })}</td>
                </tr>
              </table>
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.terracotta, serverUrl })}`
}
