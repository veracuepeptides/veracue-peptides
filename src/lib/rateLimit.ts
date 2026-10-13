/**
 * Fixed-window rate limiter. Uses Upstash Redis's REST API when UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are set (shared across every serverless instance, no SDK needed).
 *
 * When Upstash is not configured, or a call to it fails, the limiter falls back to an in-memory
 * window instead of allowing everything. That memory is per server instance, so it is weaker than
 * Upstash (a determined client spread across instances gets more headroom), but a missing or broken
 * env var no longer turns every limit in the app off silently.
 */

type Bucket = { count: number; resetAt: number }

const memory = new Map<string, Bucket>()
let warnedMissingConfig = false

function memoryLimit(key: string, limit: number, windowSeconds: number): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Keep the map from growing without bound on a long-lived instance.
  if (memory.size > 5000) {
    for (const [bucketKey, bucket] of memory) {
      if (bucket.resetAt <= now) memory.delete(bucketKey)
    }
  }

  const bucket = memory.get(key)
  if (!bucket || bucket.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 })
    return { allowed: true, remaining: Math.max(0, limit - 1) }
  }

  bucket.count += 1
  return { allowed: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) }
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    if (!warnedMissingConfig && process.env.NODE_ENV === 'production') {
      warnedMissingConfig = true
      console.warn(
        'Rate limiting is running on the in-memory fallback because UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set. Limits are per server instance until they are configured.',
      )
    }
    return memoryLimit(key, limit, windowSeconds)
  }

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', `ratelimit:${key}`],
        ['EXPIRE', `ratelimit:${key}`, String(windowSeconds), 'NX'],
      ]),
    })
    if (!res.ok) {
      console.error('Rate limit check failed (Upstash request error):', res.status)
      return memoryLimit(key, limit, windowSeconds)
    }
    const [incrResult] = (await res.json()) as Array<{ result: number }>
    const count = incrResult?.result ?? 0
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) }
  } catch (err) {
    console.error('Rate limit check failed:', err)
    return memoryLimit(key, limit, windowSeconds)
  }
}
