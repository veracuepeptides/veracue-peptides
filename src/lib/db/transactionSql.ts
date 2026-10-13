import type { Payload } from 'payload'

/**
 * Returns the drizzle handle to run raw SQL on for this request.
 *
 * Inside a Payload transaction (for example a hook running during an order create or update),
 * the statement must use the transaction's own connection. Using the shared pool there needs a
 * second connection while the transaction holds the first, which stalls on a small pool.
 * This mirrors how Payload picks its own transaction handle, and falls back to the pool otherwise.
 */
export async function getSqlExecutor(payload: Payload, req?: { transactionID?: unknown } | null) {
  const db = payload.db as any
  if (req?.transactionID) {
    const session = db.sessions?.[(await req.transactionID) as string | number]
    if (session?.db) return session.db
  }
  return db.drizzle
}
