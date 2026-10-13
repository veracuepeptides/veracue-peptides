import { headers } from 'next/headers'

/**
 * Best-effort client address for rate limiting. The platform appends the real client address to
 * x-forwarded-for, so the last entry is the one a caller cannot forge; the first entry is whatever
 * the client chose to send.
 */
export async function getClientIp(): Promise<string> {
  const h = await headers()
  const forwarded = (h.get('x-forwarded-for') || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  return forwarded[forwarded.length - 1] || h.get('x-real-ip') || 'unknown'
}
