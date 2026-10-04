import { BRAND, shellOpen, shellClose, pillButton, wave, iconBadge } from './emailShell'

function dataRow(label: string, value: string, valueColor = BRAND.charcoal): string {
  return `<tr>
    <td style="width:100%;padding:9px 0;border-bottom:1px solid rgba(183,183,164,0.25);font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">${label}</td>
    <td align="right" style="padding:9px 0;border-bottom:1px solid rgba(183,183,164,0.25);font-size:14px;font-weight:700;color:${valueColor};white-space:nowrap;">${value}</td>
  </tr>`
}

export function generateAdminAffiliateConversionEmail(order: any, affiliate: any, commissionAmount: number): string {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const affiliateName = affiliate.displayName || 'Partner'
  const orderNumber = order.orderNumber || order.id || 'N/A'
  const orderTotal = `$${(order.total || 0).toFixed(2)}`
  const commissionFormatted = `$${(commissionAmount || 0).toFixed(2)}`
  const customerEmail = (typeof order.owner === 'object' && order.owner !== null ? order.owner.email : order.guestEmail) || 'N/A'
  const adminUrl = `${serverUrl}/admin/collections/orders/${order.id}`

  return `${shellOpen({ title: 'New Affiliate Conversion | Veracue Admin', headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 8px;text-align:center;">
              ${iconBadge('bolt')}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">New Conversion Tracked</p>
              <h1 style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:800;font-size:22px;color:${BRAND.charcoal};letter-spacing:-0.01em;">An order just came in via affiliate.</h1>
              <p style="margin:0;font-size:13.5px;line-height:1.6;color:rgba(32,34,28,0.6);">A customer placed an order using an affiliate link or coupon code.</p>
            </td>
          </tr>
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:16px;padding:6px 20px;">
                <tr><td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                    ${dataRow('Affiliate', affiliateName)}
                    ${dataRow('Order Number', `#${orderNumber}`)}
                    ${dataRow('Order Total', orderTotal)}
                    ${dataRow('Commission', commissionFormatted, BRAND.terracotta)}
                    <tr>
                      <td style="width:60%;padding:9px 0;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.olive};">Customer</td>
                      <td align="right" width="40%" style="width:40%;padding:9px 0;font-size:13px;font-weight:600;color:${BRAND.charcoal};word-break:break-all;">${customerEmail}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>
              <div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          ${wave(BRAND.linen, BRAND.olive, 44)}
          <tr>
            <td style="background-color:${BRAND.olive};padding:36px 24px 40px;text-align:center;">
              ${pillButton(adminUrl, 'View Order in Admin')}
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.olive, serverUrl })}`
}
