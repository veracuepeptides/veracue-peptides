import { escapeHtml } from './escapeHtml'
import { BRAND, shellOpen, shellClose, pillButton, wave, statusPill, iconBadge, type IconName } from './emailShell'

const ZELLE_RECIPIENT_PHONE = '555-010-0199' // TODO: swap for the real Zelle recipient number before launch
const ZELLE_QR_URL = 'https://pub-ac7469377283406ab723756fc506e004.r2.dev/assets/zelle-qr.webp'

export async function generateOrderInvoiceHtml(order: any, payload?: any, customNote?: string, statusContext: 'success' | 'failed' | 'cancelled' | 'refunded' = 'success'): Promise<string> {
  const orderNumber = order.orderNumber || order.id;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com';

  const formatMoney = (amount: number) => `$${(amount).toFixed(2)}`;

  const subtotal = order.subtotal || 0;
  const discountTotal = order.discountTotal || 0;
  const redeemedPoints = order.redeemedPoints || 0;
  const shippingTotal = order.shippingTotal || 0;
  const feeTotal = order.feeTotal || 0;
  const total = order.total || 0;

  const customerName = escapeHtml(`${order.customerFirstName || ''} ${order.customerLastName || ''}`.trim() || 'Customer');
  const customerFirstName = escapeHtml(order.customerFirstName || 'there');

  let customerEmail = order.guestEmail || '';
  if (!customerEmail && order.owner && payload) {
    try {
      const userDoc = typeof order.owner === 'object' ? order.owner : await payload.findByID({ collection: 'users', id: order.owner, depth: 0 });
      if (userDoc?.email) customerEmail = userDoc.email;
    } catch (e) {
      console.error('Failed to fetch user email for invoice', e);
    }
  }

  const rawShipAddr = order.shippingAddress || {};
  const rawHasBilling = order.billingAddress && order.billingAddress.line1;
  const rawBillAddr = rawHasBilling ? order.billingAddress : rawShipAddr;
  const escapeAddr = (a: any) => ({
    line1: escapeHtml(a.line1),
    line2: escapeHtml(a.line2),
    city: escapeHtml(a.city),
    state: escapeHtml(a.state),
    postalCode: escapeHtml(a.postalCode),
    country: escapeHtml(a.country),
  })
  const shipAddr = escapeAddr(rawShipAddr);
  const billAddr = escapeAddr(rawBillAddr);

  let itemsHtml = '';
  if (order.items && Array.isArray(order.items)) {
    const itemPromises = order.items.map(async (item: any) => {
      const product = item.productSnapshot || {};
      const name = product.name || 'Product';
      const variantText = item.variantTitle || item.variant;
      const variant = variantText && variantText !== 'DEFAULT' ? variantText : '';

      let imageUrl = '';

      if (product.variants?.length) {
         const matchedVariant = product.variants.find((v: any) => v.sku === item.variant || (item.variant && item.variant.includes(v.sku)));
         if (matchedVariant && matchedVariant.images?.length > 0) {
            const vImgRef = matchedVariant.images[0].image;
            if (typeof vImgRef === 'object' && vImgRef?.url) {
               imageUrl = vImgRef.url;
            } else if ((typeof vImgRef === 'string' || typeof vImgRef === 'number') && payload) {
               try {
                  const mediaDoc = await payload.findByID({ collection: 'media', id: vImgRef, depth: 0 });
                  if (mediaDoc && mediaDoc.url) imageUrl = mediaDoc.url;
               } catch (e) {
                  console.error('Failed to fetch media for email variant image', e);
               }
            }
         }
      }

      if (!imageUrl && product.images && product.images.length > 0) {
        const imgRef = product.images[0].image;
        if (typeof imgRef === 'object' && imgRef?.url) {
          imageUrl = imgRef.url;
        } else if ((typeof imgRef === 'string' || typeof imgRef === 'number') && payload) {
          try {
            const mediaDoc = await payload.findByID({ collection: 'media', id: imgRef, depth: 0 });
            if (mediaDoc && mediaDoc.url) imageUrl = mediaDoc.url;
          } catch (e) {
             console.error('Failed to fetch media for email image', e)
          }
        }
      }

      if (imageUrl) {
         imageUrl = imageUrl.replace(/ /g, '%20');
      }

      const imgHtml = imageUrl
        ? `<img src="${imageUrl}" alt="${escapeHtml(name)}" width="52" height="52" style="width:52px;height:52px;object-fit:cover;border-radius:12px;display:block;" />`
        : `<div style="width:52px;height:52px;background-color:${BRAND.almond};border-radius:12px;"></div>`;

      return `
        <tr>
          <td style="padding-bottom:12px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border-radius:16px;">
              <tr>
                <td width="72" valign="middle" style="padding:12px 0 12px 12px;">${imgHtml}</td>
                <td valign="middle" style="padding:12px;">
                  <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:${BRAND.charcoal};">${escapeHtml(name)}</p>
                  ${variant ? `<p style="margin:0 0 3px;font-size:10.5px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${BRAND.olive};">${escapeHtml(variant)}</p>` : ''}
                  <p style="margin:0;font-size:12px;color:rgba(32,34,28,0.45);">Qty: ${item.quantity}</p>
                </td>
                <td valign="middle" align="right" style="padding:12px 16px 12px 0;white-space:nowrap;">
                  <p style="margin:0;font-size:14px;font-weight:700;color:${BRAND.charcoal};">${formatMoney(item.price)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    });

    const itemsHtmlArray = await Promise.all(itemPromises);
    itemsHtml = itemsHtmlArray.join('');
  }

  let feeLabel = 'Processing Fee'
  const appliedPercentageFee = Array.isArray(order.appliedFees)
    ? order.appliedFees.find((f: any) => f.feeType === 'percentage' && typeof f.percentage === 'number')
    : null
  if (appliedPercentageFee) feeLabel = `Processing Fee (${appliedPercentageFee.percentage}%)`

  const safeTrackingLink = typeof order.trackingLink === 'string' && /^https?:\/\//i.test(order.trackingLink)
    ? escapeHtml(order.trackingLink)
    : ''

  const paymentMethodLabels: Record<string, string> = {
    stripe: 'Card',
    zelle: 'Zelle',
    amex: 'American Express',
    circoflows: 'Card',
    stripe_link: 'Stripe (Custom Link)',
  }
  const paymentMethodLabel = paymentMethodLabels[order.paymentMethod] || 'Card'
  const isUnpaidAction = statusContext === 'success' && order.paymentStatus === 'unpaid' && ['zelle', 'amex', 'stripe_link'].includes(order.paymentMethod)

  // Header accent + greeting copy per state. Everything below the greeting (order meta, items,
  // totals, addresses, contact) is unconditional — the same for every state, matching the
  // original invoice. Only the greeting, the optional payment-instructions/tracking section, and
  // the closing accent color change per state.
  const accent =
    statusContext === 'failed' ? BRAND.terracotta :
    statusContext === 'cancelled' || statusContext === 'refunded' ? BRAND.charcoal :
    isUnpaidAction ? BRAND.terracotta :
    BRAND.olive

  const badgeIconName: IconName =
    statusContext === 'failed' || isUnpaidAction ? 'alert' :
    statusContext === 'cancelled' || statusContext === 'refunded' ? 'x-circle' :
    'check'

  const eyebrow =
    statusContext === 'failed' ? 'Payment Failed' :
    statusContext === 'cancelled' ? 'Order Cancelled' :
    statusContext === 'refunded' ? 'Order Refunded' :
    isUnpaidAction ? 'Action Needed' :
    'Order Confirmed'

  const heading =
    statusContext === 'failed' ? `We hit a snag, ${customerFirstName}.` :
    statusContext === 'cancelled' ? 'Your order has been cancelled.' :
    statusContext === 'refunded' ? 'Your order has been refunded.' :
    isUnpaidAction ? `Almost there, ${customerFirstName}.` :
    `Thank you, ${customerFirstName}.`

  const subtext =
    statusContext === 'failed'
      ? `We weren't able to process payment for order <strong>#${orderNumber}</strong>, so it hasn't been placed. You're welcome to try again.`
      : statusContext === 'cancelled' || statusContext === 'refunded'
      ? `Order <strong>#${orderNumber}</strong> has been ${statusContext}.${redeemedPoints ? ' Any Veracue Points used on this order have been credited back to your account.' : ''}`
      : isUnpaidAction
      ? `Your items are reserved. Complete your ${paymentMethodLabel} payment below to confirm order <strong>#${orderNumber}</strong>.`
      : `Your order is confirmed and being prepared for shipment from our lab. A copy of this receipt is below.`

  const statusBadgeLabel = order.paymentStatus === 'unpaid' ? 'AWAITING PAYMENT' : 'PAID'
  const statusBadgeBg = order.paymentStatus === 'unpaid' ? BRAND.terracotta : BRAND.olive
  const statusBadgeColor = order.paymentStatus === 'unpaid' ? BRAND.charcoal : BRAND.linen

  // Payment instructions are the single most time-sensitive thing in an "awaiting payment" email,
  // so they sit directly under the greeting — above the order recap — instead of being buried
  // below items/totals/addresses. Everything after it (order meta, items, totals, addresses)
  // keeps alternating white/linen for rhythm regardless of whether this section is present.
  let cursor = '#ffffff'
  let cursorHtml = ''
  if (order.paymentMethod === 'zelle' && isUnpaidAction) {
    cursorHtml = `
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:34px 24px 34px;text-align:center;">
              <p style="margin:0 0 4px;font-family:-apple-system,sans-serif;font-weight:700;font-size:16px;color:${BRAND.charcoal};">Pay via Zelle</p>
              <p style="margin:0 0 24px;font-size:13px;color:rgba(32,34,28,0.6);">Send exactly <strong style="color:${BRAND.charcoal};">${formatMoney(total)}</strong> using the details below.</p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="background-color:#ffffff;border-radius:16px;padding:16px 20px;">
                    <table cellpadding="0" cellspacing="0" border="0"><tr>
                      <td style="padding-right:18px;"><img src="${ZELLE_QR_URL}" alt="Zelle QR Code" width="112" height="112" style="width:112px;height:112px;display:block;border-radius:12px;" /></td>
                      <td align="left" valign="middle">
                        <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};">Send To (Phone)</p>
                        <p style="margin:0;font-size:15px;font-weight:700;color:${BRAND.charcoal};">${ZELLE_RECIPIENT_PHONE}</p>
                      </td>
                    </tr></table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr><td style="background-color:#ffffff;border-radius:14px;padding:16px 20px;">
                <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.65);line-height:1.6;">Please include order <strong style="color:${BRAND.terracotta};">#${orderNumber}</strong> in the Zelle memo so we can match your payment. Ignore this if you've already paid.</p>
              </td></tr></table>
            </td>
          </tr>`
    cursor = BRAND.linen
  } else if (order.paymentMethod === 'amex' && isUnpaidAction) {
    cursorHtml = `
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:34px 24px 34px;text-align:center;">
              <p style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:700;font-size:16px;color:${BRAND.charcoal};">Complete Your American Express Payment</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(32,34,28,0.6);">One of our team members will reach out to you shortly via <strong style="color:${BRAND.charcoal};">SMS</strong> with a secure invoice link to finalize your payment.</p>
            </td>
          </tr>`
    cursor = BRAND.linen
  } else if (order.paymentMethod === 'stripe_link' && isUnpaidAction) {
    cursorHtml = `
          ${wave('#ffffff', BRAND.linen, 44)}
          <tr>
            <td style="background-color:${BRAND.linen};padding:34px 24px 34px;text-align:center;">
              <p style="margin:0 0 8px;font-family:-apple-system,sans-serif;font-weight:700;font-size:16px;color:${BRAND.charcoal};">Complete Your Payment</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(32,34,28,0.6);">Our team will reach out shortly with a secure, custom Stripe payment link to finalize your order.</p>
            </td>
          </tr>`
    cursor = BRAND.linen
  }
  const metaColor = cursor === BRAND.linen ? '#ffffff' : BRAND.linen
  const totalsColor = metaColor === BRAND.linen ? '#ffffff' : BRAND.linen

  let html = `${shellOpen({ title: `Order Invoice #${orderNumber}`, headerColor: BRAND.olive, headerWaveInto: '#ffffff' })}
          <tr>
            <td style="background-color:#ffffff;padding:8px 24px 36px;text-align:center;">
              ${iconBadge(badgeIconName)}
              <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${accent};">${eyebrow}</p>
              <h1 style="margin:0 0 10px;font-family:-apple-system,sans-serif;font-weight:800;font-size:25px;color:${BRAND.charcoal};letter-spacing:-0.01em;">${heading}</h1>
              <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:rgba(32,34,28,0.6);">${subtext}</p>
              <span style="display:inline-block;background-color:${BRAND.alabaster};border:1px solid rgba(183,183,164,0.4);border-radius:9999px;padding:8px 16px;font-size:12px;font-weight:700;color:${BRAND.charcoal};">Order #${orderNumber}</span>
              ${statusContext === 'failed' ? `<div style="margin-top:24px;">${pillButton(`${serverUrl}/checkout`, 'Try Checking Out Again')}</div>` : ''}
              ${customNote ? `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:24px;text-align:left;">
                <tr><td style="background-color:${BRAND.alabaster};border-radius:14px;padding:20px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.charcoal};">Message Regarding Your Order</p>
                  <p style="margin:0;font-size:13px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:pre-wrap;">${escapeHtml(customNote)}</p>
                </td></tr>
              </table>` : ''}
            </td>
          </tr>
          ${cursorHtml}
          ${wave(cursor, metaColor, 44)}
          <tr>
            <td style="background-color:${metaColor};padding:30px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;padding-bottom:22px;border-bottom:1px solid rgba(183,183,164,0.35);margin-bottom:26px;">
                <tr>
                  <td valign="top" style="width:100%;padding-right:8px;">
                    <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Order Number</p>
                    <p style="margin:0 0 16px;font-size:13.5px;font-weight:700;color:${BRAND.charcoal};white-space:nowrap;">${orderNumber}</p>
                    <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Payment</p>
                    <p style="margin:0;font-size:13.5px;font-weight:700;color:${BRAND.charcoal};white-space:nowrap;">${escapeHtml(paymentMethodLabel)}</p>
                  </td>
                  <td valign="top" align="right" style="padding-left:8px;white-space:nowrap;">
                    <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Status</p>
                    <div style="margin:0 0 16px;white-space:nowrap;">${statusPill(statusBadgeLabel, statusBadgeBg, statusBadgeColor)}</div>
                    <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Date</p>
                    <p style="margin:0;font-size:13.5px;font-weight:700;color:${BRAND.charcoal};white-space:nowrap;">${orderDate}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.olive};">In This Order</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">${itemsHtml}</table>
            </td>
          </tr>
          ${wave(metaColor, totalsColor, 44)}
          <tr>
            <td style="background-color:${totalsColor};padding:8px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;font-size:13.5px;padding-bottom:18px;border-bottom:1px solid rgba(183,183,164,0.3);">
                <tr><td style="width:100%;padding:5px 12px 5px 0;color:rgba(32,34,28,0.6);">Subtotal</td><td align="right" style="padding:5px 0;font-weight:600;color:${BRAND.charcoal};white-space:nowrap;">${formatMoney(subtotal)}</td></tr>
                ${discountTotal > 0 ? `<tr><td style="width:100%;padding:5px 12px 5px 0;color:rgba(32,34,28,0.6);">Discount${order.couponCode ? ` (${escapeHtml(order.couponCode)})` : ''}</td><td align="right" style="padding:5px 0;font-weight:700;color:${BRAND.terracotta};white-space:nowrap;">&minus;${formatMoney(discountTotal)}</td></tr>` : ''}
                <tr><td style="width:100%;padding:5px 12px 5px 0;color:rgba(32,34,28,0.6);">Shipping (${escapeHtml(order.shippingMethod || 'Standard')})</td><td align="right" style="padding:5px 0;font-weight:600;color:${shippingTotal === 0 ? BRAND.olive : BRAND.charcoal};white-space:nowrap;">${shippingTotal === 0 ? 'Free' : formatMoney(shippingTotal)}</td></tr>
                ${feeTotal > 0 ? `<tr><td style="width:100%;padding:5px 12px 5px 0;color:rgba(32,34,28,0.6);">${feeLabel}</td><td align="right" style="padding:5px 0;font-weight:600;color:${BRAND.charcoal};white-space:nowrap;">${formatMoney(feeTotal)}</td></tr>` : ''}
                ${redeemedPoints > 0 ? `<tr><td style="width:100%;padding:5px 12px 5px 0;color:rgba(32,34,28,0.6);">Veracue Points Redeemed</td><td align="right" style="padding:5px 0;font-weight:700;color:${BRAND.terracotta};white-space:nowrap;">&minus;${formatMoney(redeemedPoints)}</td></tr>` : ''}
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;padding:16px 0 28px;">
                <tr><td style="width:100%;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(32,34,28,0.45);">Total</td><td align="right" style="font-family:-apple-system,sans-serif;font-size:23px;font-weight:800;color:${BRAND.charcoal};white-space:nowrap;">${formatMoney(total)}</td></tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;padding:22px 0;border-top:1px solid rgba(183,183,164,0.3);">
                <tr>
                  <td valign="top" style="width:100%;padding-right:8px;">
                    <p style="margin:0 0 8px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Shipping Address</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${customerName}</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${shipAddr.line1 || ''}</p>
                    ${shipAddr.line2 ? `<p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${shipAddr.line2}</p>` : ''}
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${shipAddr.city || ''}, ${shipAddr.state || ''} ${shipAddr.postalCode || ''}</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${shipAddr.country || ''}</p>
                  </td>
                  <td valign="top" align="right" style="padding-left:8px;">
                    <p style="margin:0 0 8px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};white-space:nowrap;">Billing Address</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${customerName}</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${billAddr.line1 || ''}</p>
                    ${billAddr.line2 ? `<p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${billAddr.line2}</p>` : ''}
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${billAddr.city || ''}, ${billAddr.state || ''} ${billAddr.postalCode || ''}</p>
                    <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;white-space:nowrap;">${billAddr.country || ''}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;padding:20px 0 24px;border-top:1px solid rgba(183,183,164,0.3);">
                <tr><td>
                  <p style="margin:0 0 8px;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND.olive};">Contact Information</p>
                  <p style="margin:0;font-size:12.5px;color:rgba(32,34,28,0.7);line-height:1.6;">${customerEmail ? `${escapeHtml(customerEmail)}` : ''}${customerEmail && order.customerPhone ? '<br>' : ''}${order.customerPhone ? escapeHtml(order.customerPhone) : ''}${!customerEmail && !order.customerPhone ? 'No contact information provided' : ''}</p>
                </td></tr>
              </table>
            </td>
          </tr>`

  // The tracking section already renders in `accent` (olive), so appending a same-color closing
  // section for the "View Full Order Status" link would need a wave between two identical colors
  // — which draws no curve, just a blank spacer row. Fold the link into the tracking section
  // itself in that case; every other case genuinely changes color, so it keeps its own section.
  const trackingSectionIsAccent = statusContext === 'success' && !!safeTrackingLink

  const viewStatusHref = `${serverUrl}/account/orders/${order.id}`
  const viewStatusLink = `<a href="${viewStatusHref}" style="display:inline-block;font-family:-apple-system,sans-serif;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${BRAND.charcoal};text-decoration:underline;">View Full Order Status &rarr;</a>`

  if (trackingSectionIsAccent) {
    html += `
          ${wave(totalsColor, BRAND.olive, 44)}
          <tr>
            <td style="background-color:${BRAND.olive};padding:38px 24px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-family:-apple-system,sans-serif;font-weight:800;font-size:17px;color:${BRAND.linen};">Your package is on the way</p>
              <p style="margin:0 0 22px;font-size:13px;color:rgba(255,241,230,0.8);">Track its progress from our lab to your door.</p>
              ${pillButton(safeTrackingLink, 'Track Your Order')}
              <p style="margin:18px 0 0;">${viewStatusLink}</p>
            </td>
          </tr>
${shellClose({ footerWaveFrom: BRAND.olive, serverUrl })}`
  } else {
    html += `
          ${wave(totalsColor, accent, 44)}
          <tr>
            <td style="background-color:${accent};padding:36px 24px 40px;text-align:center;">
              ${pillButton(viewStatusHref, 'View Full Order Status')}
            </td>
          </tr>
${shellClose({ footerWaveFrom: accent, serverUrl })}`
  }

  return html
}
