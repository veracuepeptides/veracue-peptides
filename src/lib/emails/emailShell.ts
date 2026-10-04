// Shared chrome for the "curvy layered" email system (order confirmation, welcome, partner
// welcome, and all the transactional/admin templates). Each section is a solid color block; the
// boundary between two stacked sections is a seamless wave (a plain CSS background-color on the
// <td> for the "above" color, plus a pre-rendered transparent-background PNG carrying only the
// "below" color's curve shape) — no per-section shadow, only the outer card gets one ambient
// shadow. Nothing here is inline <svg>: Gmail's sanitizer strips or unreliably renders raw SVG
// markup across its web/Android/iOS surfaces, so every visible shape (wave dividers, badge icons,
// button arrows) is a rasterized image referenced by <img>.
//
// Every header uses the same olive band (matches the site's own header background) — no more
// per-template header color-coding; state differentiation (action-needed, failed, cancelled...)
// now lives only in the eyebrow text, status pill, and the closing accent section, never the logo
// band.

import { getSiteIdentity } from '@/lib/site/identity'

export const MARKETING_OPT_OUT_TEXT =
  'Prefer not to receive these emails? Reply with the word unsubscribe or write to support@veracuepeptides.com and we will remove you.'

export const MARKETING_EMAIL_HEADERS = {
  'List-Unsubscribe': '<mailto:support@veracuepeptides.com?subject=Unsubscribe>',
}

function escapeText(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** "Veracue Peptides LLC, <address>" when COMPANY_POSTAL_ADDRESS is set, otherwise an empty string. */
export function companyAddressLine(): string {
  const { legalName, postalAddress } = getSiteIdentity()
  return postalAddress ? `${escapeText(legalName)}, ${escapeText(postalAddress)}` : ''
}

export const BRAND = {
  terracotta: '#cb997e',
  almond: '#eddcd2',
  linen: '#fff1e6',
  alabaster: '#f0efeb',
  sand: '#ddbea9',
  olive: '#a5a58d',
  stone: '#b7b7a4',
  charcoal: '#20221c',
}

const CARD_WIDTH = 640

function assetBase(): string {
  return (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '')
}

export function logoUrl(): string {
  return `${assetBase()}/assets/veracue-logo-white.png`
}

// Icon names map 1:1 to assets/icons/<name>.png on R2 (uploaded once, rasterized from the same
// stroke-icon set used across the design). `alert` covers both "action needed" and "failed";
// `x-circle` covers both "cancelled/refunded" and "voided" — same glyph, different copy around it.
export type IconName = 'check' | 'alert' | 'x-circle' | 'mail' | 'lock' | 'star' | 'coin' | 'bolt' | 'user' | 'message' | 'shield' | 'arrow-right'

export function iconUrl(name: IconName): string {
  return `${assetBase()}/assets/icons/${name}.png`
}

// Wave PNGs map 1:1 to assets/waves/wave-<name>.png — a 640x44 transparent PNG carrying only the
// curve shape in that color. The "above" half of the transition is just the <td>'s own
// background-color (plain CSS, always supported), so one image per color covers every pairing
// that color appears in as the "below" side.
const WAVE_NAMES: Record<string, string> = {
  '#ffffff': 'white',
  [BRAND.linen]: 'linen',
  [BRAND.olive]: 'olive',
  [BRAND.terracotta]: 'terracotta',
  [BRAND.charcoal]: 'charcoal',
  [BRAND.stone]: 'stone',
}

function waveUrl(colorBelow: string): string {
  const name = WAVE_NAMES[colorBelow.toLowerCase()] || WAVE_NAMES[colorBelow]
  if (!name) {
    throw new Error(`wave(): no pre-rendered wave asset for color "${colorBelow}" — add it to WAVE_NAMES and assets/waves/`)
  }
  return `${assetBase()}/assets/waves/wave-${name}.png`
}

// Colors user-confirmed (real Gmail Android screenshots) to survive dark mode untouched. Everything
// else (white/linen/alabaster/almond/sand, and stone by extension — it's a similarly light midtone
// that's never been confirmed safe) gets force-inverted to black by Gmail's unpublished heuristic.
const DARK_SAFE = new Set<string>([BRAND.olive, BRAND.terracotta, BRAND.charcoal])

// A seamless wave transition: `colorAbove` is the section that just ended, `colorBelow` is the
// section that follows immediately after. Both must be passed even when they're the same value
// as an adjacent section, so the shape is self-contained regardless of what's behind it.
//
// The curve is a rasterized <img> with the "below" color's shape baked into its pixels — like any
// image, Gmail's dark-mode repaint never touches it. Only `colorBelow` needs to be dark-safe: the
// image is full-bleed at the strip's left/right edges, so those edges must keep matching the real
// section that follows once Gmail (maybe) repaints it — that only holds if the baked pixel color
// never changes, i.e. colorBelow is in DARK_SAFE. `colorAbove` is just this strip's own flat CSS
// backdrop, showing through the curve's transparent middle — it always equals whatever the real
// preceding section already is, so it repaints in lockstep with that section either way, dark-safe
// or not. If colorBelow isn't dark-safe, we skip the image and let the two sections meet at a
// plain flat edge instead — still correct in both modes, just not curved at that one seam. To put
// an olive accent curve at a boundary that leads into an unsafe color (e.g. header → white body),
// call `wave(theActualNextColor, BRAND.olive)` — olive is always dark-safe, so the curve renders,
// and its edges are full-olive, matching the header (also olive) exactly on both sides.
export function wave(colorAbove: string, colorBelow: string, height = 44): string {
  if (!DARK_SAFE.has(colorBelow.toLowerCase())) {
    return ''
  }
  return `
    <tr>
      <td style="padding:0;line-height:0;font-size:0;background-color:${colorAbove};">
        <img src="${waveUrl(colorBelow)}" width="${CARD_WIDTH}" height="${height}" alt="" style="display:block;width:100%;height:auto;border:0;" />
      </td>
    </tr>`
}

// Section side-padding is 24px everywhere (an unconditional base value, not a media-query
// override) specifically so mobile width doesn't depend on Gmail's mobile apps actually applying
// an `@media` rule — every client, including ones with no responsive CSS support at all (Outlook
// desktop), gets a reasonable content width without any conditional logic in the way.
//
// [data-ogsc]/[data-ogsb] below are Outlook.com's dark-mode hooks (Outlook Group Style Color/
// Background) — NOT Gmail's. They only help Outlook.com/Outlook mobile app viewers; keeping them
// is still worthwhile for that audience, but they do nothing for Gmail. Gmail's dark mode (web,
// Android, iOS) repaints colors using its own unpublished heuristic and, per Gmail's own
// documented behavior, there is no supported CSS technique that reliably forces original colors
// back once Gmail decides to re-theme an element — `color-scheme`/`supported-color-schemes` are
// not honored by Gmail's apps in practice. The `color-scheme` CSS property below is included
// because it has marginally better support than the meta-tag-only version in a few other clients,
// not because it fixes Gmail.
// Tried and confirmed NOT to work on real Gmail Android, in order: [data-ogsc]/[data-ogsb]
// (Outlook.com-only, does nothing for Gmail), and a `@media (prefers-color-scheme: dark)`
// background swap (Gmail's repaint is a DOM-level post-process that ignores it entirely). Neither
// is reverted below — [data-ogsc]/[data-ogsb] still help the Outlook.com audience they were
// actually built for — but no CSS mechanism here should be assumed to affect Gmail's dark mode.
// The only thing that has actually worked is not using colors Gmail force-inverts in the first
// place: see DARK_SAFE in wave() below, which keeps every curve seam on colors confirmed (via real
// device screenshots) to survive untouched.
const GLOBAL_STYLE = `
  <style>
    :root { color-scheme: light; supported-color-schemes: light; }
    @media only screen and (max-width: 480px) {
      [style*=" 24px "] { padding-left: 16px !important; padding-right: 16px !important; }
    }
    [data-ogsb] [style*="background-color:#ffffff"] { background-color: #ffffff !important; }
    [data-ogsb] [style*="background-color:${BRAND.linen}"] { background-color: ${BRAND.linen} !important; }
    [data-ogsb] [style*="background-color:${BRAND.alabaster}"] { background-color: ${BRAND.alabaster} !important; }
    [data-ogsb] [style*="background-color:${BRAND.almond}"] { background-color: ${BRAND.almond} !important; }
    [data-ogsb] [style*="background-color:${BRAND.olive}"] { background-color: ${BRAND.olive} !important; }
    [data-ogsb] [style*="background-color:${BRAND.terracotta}"] { background-color: ${BRAND.terracotta} !important; }
    [data-ogsb] [style*="background-color:${BRAND.charcoal}"] { background-color: ${BRAND.charcoal} !important; }
    [data-ogsb] [style*="background-color:${BRAND.stone}"] { background-color: ${BRAND.stone} !important; }
    [data-ogsb] [style*="background-color:rgba(255,255,255"] { background-color: rgba(255,255,255,0.15) !important; }
    [data-ogsc] [style*="color:${BRAND.charcoal}"] { color: ${BRAND.charcoal} !important; }
    [data-ogsc] [style*="color:${BRAND.olive}"] { color: ${BRAND.olive} !important; }
    [data-ogsc] [style*="color:${BRAND.terracotta}"] { color: ${BRAND.terracotta} !important; }
    [data-ogsc] [style*="color:${BRAND.linen}"] { color: ${BRAND.linen} !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.4)"] { color: rgba(32,34,28,0.4) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.45)"] { color: rgba(32,34,28,0.45) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.55)"] { color: rgba(32,34,28,0.55) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.6)"] { color: rgba(32,34,28,0.6) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.65)"] { color: rgba(32,34,28,0.65) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.7)"] { color: rgba(32,34,28,0.7) !important; }
    [data-ogsc] [style*="color:rgba(32,34,28,0.75)"] { color: rgba(32,34,28,0.75) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.35)"] { color: rgba(255,241,230,0.35) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.5)"] { color: rgba(255,241,230,0.5) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.65)"] { color: rgba(255,241,230,0.65) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.7)"] { color: rgba(255,241,230,0.7) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.75)"] { color: rgba(255,241,230,0.75) !important; }
    [data-ogsc] [style*="color:rgba(255,241,230,0.8)"] { color: rgba(255,241,230,0.8) !important; }
  </style>`

export function shellOpen({
  title,
  headerColor,
  headerWaveInto,
}: {
  title: string
  headerColor: string
  headerWaveInto: string
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${title}</title>${GLOBAL_STYLE}
</head>
<body style="margin:0;padding:0;background-color:${BRAND.alabaster};font-family:-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${BRAND.alabaster};padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="${CARD_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${CARD_WIDTH}px;max-width:100%;border-radius:28px;overflow:hidden;box-shadow:0 20px 50px rgba(32,34,28,0.12);">
          <tr>
            <td style="background-color:${headerColor};padding:16px 0;text-align:center;">
              <img src="${logoUrl()}" alt="Veracue" width="190" style="display:inline-block;height:34px;width:auto;border:0;" />
            </td>
          </tr>
          <!-- wave-olive-top.png is wave-olive.png flipped vertically: opaque olive spans the FULL
               top edge (seamless against the header, which is always olive), receding to a dome of
               transparency toward the bottom-center that reveals headerWaveInto. Regular wave()
               assets are opaque at the BOTTOM edge instead, which is wrong here — that orientation
               left a gap between the header and the curve wherever the curve's top wasn't full-olive. -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;background-color:${headerWaveInto};">
              <img src="${assetBase()}/assets/waves/wave-olive-top.png" width="${CARD_WIDTH}" height="44" alt="" style="display:block;width:100%;height:auto;border:0;" />
            </td>
          </tr>`
}

export function shellClose({
  footerWaveFrom,
  serverUrl,
  marketing = false,
}: {
  footerWaveFrom: string
  serverUrl: string
  marketing?: boolean
}): string {
  const addressLine = companyAddressLine()
  return `
          ${wave(footerWaveFrom, BRAND.charcoal, 44)}
          <tr>
            <td style="background-color:${BRAND.charcoal};padding:8px 24px 36px;text-align:center;">
              <img src="${logoUrl()}" alt="Veracue" width="150" style="display:inline-block;height:26px;width:auto;border:0;margin:0 0 14px;" />
              <p style="margin:0 0 16px;font-size:11px;color:rgba(255,241,230,0.5);">&ge;99% HPLC-verified research-grade standards.</p>
              <p style="margin:0 0 16px;font-size:11px;">
                <a href="${serverUrl}/shop" style="color:rgba(255,241,230,0.75);text-decoration:none;margin:0 10px;">Shop</a>
                <a href="${serverUrl}/account" style="color:rgba(255,241,230,0.75);text-decoration:none;margin:0 10px;">Account</a>
                <a href="${serverUrl}/contact-us" style="color:rgba(255,241,230,0.75);text-decoration:none;margin:0 10px;">Support</a>
              </p>
              ${marketing ? `<p style="margin:0 0 10px;font-size:10px;color:rgba(255,241,230,0.5);">${MARKETING_OPT_OUT_TEXT}</p>` : ''}
              ${addressLine ? `<p style="margin:0 0 10px;font-size:10px;color:rgba(255,241,230,0.35);">${addressLine}</p>` : ''}
              <p style="margin:0;font-size:10px;color:rgba(255,241,230,0.35);">&copy; ${new Date().getFullYear()} Veracue Peptides. Research Use Only (RUO).</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function pillButton(href: string, label: string, opts: { bg?: string; color?: string; badgeBg?: string; badgeColor?: string } = {}): string {
  const bg = opts.bg || BRAND.charcoal
  const color = opts.color || BRAND.linen
  const badgeBg = opts.badgeBg || BRAND.olive
  // The arrow PNG is rasterized in charcoal (every real call site uses a light badge behind a
  // dark arrow); badgeColor is accepted for API symmetry with the rest of the shell but doesn't
  // change the icon's baked-in color.
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
      <tr>
        <td style="background-color:${bg};border-radius:9999px;padding:6px 6px 6px 26px;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle" style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;font-weight:600;font-size:15px;color:${color};white-space:nowrap;">
                <a href="${href}" style="text-decoration:none;color:${color};">${label}</a>
              </td>
              <td width="14"></td>
              <td width="30" height="30" align="center" valign="middle" style="background-color:${badgeBg};border-radius:9999px;">
                <a href="${href}"><img src="${iconUrl('arrow-right')}" width="13" height="13" alt="" style="display:block;border:0;" /></a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
}

export function outlineButton(href: string, label: string, opts: { borderColor?: string; color?: string } = {}): string {
  const borderColor = opts.borderColor || BRAND.charcoal
  const color = opts.color || BRAND.charcoal
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;">
      <tr>
        <td style="border:1.5px solid ${borderColor};border-radius:9999px;">
          <a href="${href}" style="display:inline-block;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;font-weight:600;font-size:14px;color:${color};padding:13px 26px;">${label}</a>
        </td>
      </tr>
    </table>`
}

export function iconBadge(icon: IconName, bg = BRAND.charcoal, size = 56, iconSize = 24): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;"><tr><td width="${size}" height="${size}" align="center" valign="middle" style="background-color:${bg};border-radius:16px;"><img src="${iconUrl(icon)}" width="${iconSize}" height="${iconSize}" alt="" style="display:block;border:0;" /></td></tr></table>`
}

export function statusPill(label: string, bg: string, color: string): string {
  return `<span style="display:inline-block;background-color:${bg};color:${color};font-size:10.5px;font-weight:700;letter-spacing:0.04em;padding:3px 9px;border-radius:9999px;">${label}</span>`
}
