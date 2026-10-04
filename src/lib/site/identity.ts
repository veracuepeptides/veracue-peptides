// Single source of truth for company identity details. Everything that is not a known constant
// comes from environment variables and is omitted when unset (never invent placeholder values).

export type PostalAddressNode = {
  '@type': 'PostalAddress'
  streetAddress: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

export type SiteIdentity = {
  legalName: string
  supportEmail: string
  postalAddress?: string
  telephone?: string
  sameAs: string[]
}

/**
 * Best-effort parse of "street, city, STATE zip, country" into a schema.org PostalAddress.
 * Falls back to the whole string as streetAddress when the shape is not recognised.
 */
export function parsePostalAddress(address: string): PostalAddressNode {
  const whole = address.trim()
  const fallback: PostalAddressNode = { '@type': 'PostalAddress', streetAddress: whole }
  const parts = whole.split(',').map((p) => p.trim()).filter(Boolean)
  if (parts.length < 3 || parts.length > 4) return fallback

  const hasCountry = parts.length === 4
  const stateZip = parts[hasCountry ? 2 : parts.length - 1]
  const match = stateZip.match(/^([A-Za-z]{2,})\s+([0-9A-Za-z][0-9A-Za-z -]{2,})$/)
  if (!match) return fallback

  const node: PostalAddressNode = {
    '@type': 'PostalAddress',
    streetAddress: parts[0],
    addressLocality: parts[1],
    addressRegion: match[1],
    postalCode: match[2],
  }
  if (hasCountry) node.addressCountry = parts[3]
  return node
}

function parseSameAs(raw: string | undefined): string[] {
  if (!raw) return []
  const out: string[] = []
  for (const part of raw.split(',')) {
    const value = part.trim()
    if (!value) continue
    try {
      const url = new URL(value)
      if (url.protocol === 'https:' && !out.includes(url.toString())) out.push(url.toString())
    } catch {
      // ignore invalid URLs
    }
  }
  return out
}

export function getSiteIdentity(): SiteIdentity {
  const postalAddress = process.env.COMPANY_POSTAL_ADDRESS?.trim() || undefined
  const telephone = process.env.NEXT_PUBLIC_COMPANY_PHONE?.trim() || undefined
  return {
    legalName: 'Veracue Peptides LLC',
    supportEmail: 'support@veracuepeptides.com',
    ...(postalAddress ? { postalAddress } : {}),
    ...(telephone ? { telephone } : {}),
    sameAs: parseSameAs(process.env.NEXT_PUBLIC_SOCIAL_PROFILES),
  }
}

/** Optional schema.org Organization fields (address, telephone, sameAs), present only when configured. */
export function getOrganizationIdentityFields(): {
  address?: PostalAddressNode
  telephone?: string
  sameAs?: string[]
} {
  const id = getSiteIdentity()
  return {
    ...(id.postalAddress ? { address: parsePostalAddress(id.postalAddress) } : {}),
    ...(id.telephone ? { telephone: id.telephone } : {}),
    ...(id.sameAs.length > 0 ? { sameAs: id.sameAs } : {}),
  }
}
