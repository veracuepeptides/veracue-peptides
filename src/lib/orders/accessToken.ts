import crypto from 'crypto'

/**
 * Proof that the browser holding an `order_auth_<id>` cookie is the one that placed the order.
 *
 * The cookie used to hold the literal string "true", and order ids are sequential, so anyone could
 * send `Cookie: order_auth_123=true` and read the name, email and address on that order. The value
 * is now an HMAC of the order id under PAYLOAD_SECRET: it cannot be derived from the id alone, and a
 * token minted for one order is useless for any other.
 */
function secret(): string {
  return process.env.PAYLOAD_SECRET || ''
}

export function orderAccessToken(orderId: string | number): string | null {
  const key = secret()
  if (!key) return null
  return crypto.createHmac('sha256', key).update(`order-confirmation:${orderId}`).digest('base64url')
}

export function isValidOrderAccessToken(orderId: string | number, token: string | null | undefined): boolean {
  if (!token) return false
  const expected = orderAccessToken(orderId)
  if (!expected) return false
  const given = Buffer.from(token)
  const wanted = Buffer.from(expected)
  return given.length === wanted.length && crypto.timingSafeEqual(given, wanted)
}
