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

// A product or article as markdown, served at the page address plus ".md". The HTML page stays the
// canonical version: the header says so and the file is kept out of search indexes, so the plain-text
// copy can never compete with the page it describes.
export function markdownResponse(body: string, canonicalUrl: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
      Link: `<${canonicalUrl}>; rel="canonical", </llms.txt>; rel="describedby"; type="text/plain"`,
    },
  })
}

export function markdownNotFound(): Response {
  return new Response('Not found\n', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300',
      'X-Robots-Tag': 'noindex',
    },
  })
}
