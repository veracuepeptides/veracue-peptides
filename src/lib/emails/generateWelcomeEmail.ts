import { BRAND, shellOpen, shellClose, pillButton, wave } from './emailShell'

const HERO_IMAGE = 'https://pub-ac7469377283406ab723756fc506e004.r2.dev/Product%20Images/veracue-nad-plus-10mg-studio.webp'

function benefitRow(number: string, title: string, body: string): string {
  return `
    <tr>
      <td style="padding-bottom:12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:18px;">
          <tr>
            <td width="34" valign="top" style="padding:18px 0 18px 20px;">
              <table cellpadding="0" cellspacing="0" border="0"><tr><td width="34" height="34" style="background-color:${BRAND.charcoal};color:${BRAND.linen};border-radius:10px;text-align:center;font-family:-apple-system,sans-serif;font-weight:700;font-size:13px;">${number}</td></tr></table>
            </td>
            <td valign="top" style="padding:18px 20px 18px 14px;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:${BRAND.charcoal};">${title}</p>
              <p style="margin:0;font-size:12.5px;line-height:1.5;color:rgba(32,34,28,0.55);">${body}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}

export async function generateWelcomeEmail(user: any): Promise<string> {
  const name = user.firstName || 'there'
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'

  return `${shellOpen({ title: 'Welcome to Veracue', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                <tr>
                  <td style="padding:0 24px;">
                    <img src="${HERO_IMAGE}" alt="Veracue research vial" width="100%" height="190" style="width:100%;max-width:552px;height:190px;object-fit:cover;border-radius:20px;display:block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px 36px;text-align:center;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">Welcome to Veracue</p>
                    <h1 style="margin:0 0 6px;font-family:-apple-system,sans-serif;font-weight:800;font-size:28px;color:${BRAND.charcoal};letter-spacing:-0.01em;">Good to have you, ${name}.</h1>
                    <p style="margin:0 0 16px;font-style:italic;font-size:17px;color:${BRAND.olive};">Precision research, delivered.</p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(32,34,28,0.6);">Your account is ready. Here's what you get as a member of the Veracue research community.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                ${benefitRow('01', 'Speed Through Checkout', 'Saved shipping and payment details for lightning-fast future orders.')}
                ${benefitRow('02', 'Track Your Research', 'View your entire order history and live shipping status in one place.')}
                ${benefitRow('03', 'Earn Veracue Points', 'Get rewarded automatically on every order, redeemable at checkout.')}
              </table>
              <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${wave(BRAND.linen, BRAND.olive, 44)}
          <tr>
            <td style="background-color:${BRAND.olive};padding:40px 24px 24px;text-align:center;">
              <p style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:800;font-size:19px;color:${BRAND.linen};">Ready to start researching?</p>
              <p style="margin:0 0 24px;font-size:13px;color:rgba(255,241,230,0.8);">Browse our full catalogue of research-grade peptides.</p>
              ${pillButton(`${serverUrl}/shop`, 'Start Shopping')}
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.olive, serverUrl, marketing: true })}`
}
