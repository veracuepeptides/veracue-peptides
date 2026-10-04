import { buildLlmsTxt } from '@/lib/llms/build'
import { loadLlmsSiteData } from '@/lib/llms/data'
import { llmsResponse } from '@/lib/llms/response'

// Regenerated hourly from the CMS, the same cadence as sitemap.xml, so the catalog, categories
// and guides listed here can never drift from the live site (and the host always follows
// NEXT_PUBLIC_SERVER_URL). There must be no static public/llms.txt: a file in public/ would
// shadow this route.
export const revalidate = 3600
// Regeneration reads the full catalog from the database; the Vercel Hobby default (10s) is tight.
export const maxDuration = 60

export async function GET() {
  return llmsResponse(buildLlmsTxt(await loadLlmsSiteData()))
}
