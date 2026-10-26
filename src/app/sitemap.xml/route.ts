import { loadSitemapEntries, renderSitemapXml } from '@/lib/sitemap/build'

// A route handler instead of the sitemap.ts metadata file: the metadata route was served as a static
// file that never refreshed after the deploy (the live sitemap still listed a product that had been
// switched to draft days earlier). This route is regenerated hourly, and saving a product or post in
// the admin refreshes it sooner (see revalidateGeneratedFiles in lib/revalidate.ts), the same way
// llms.txt works.
export const revalidate = 3600
// Regeneration queries the full catalog; the Vercel Hobby default (10s) is tight.
export const maxDuration = 60

export async function GET() {
  return new Response(renderSitemapXml(await loadSitemapEntries()), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
