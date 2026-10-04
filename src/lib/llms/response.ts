// Shared headers for the generated llms files. Cached for an hour at the edge, then served stale
// while revalidating, matching the sitemap's hourly refresh.
export function llmsResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
