import { buildLlmsFullTxt } from '@/lib/llms/build'
import { loadLlmsSiteData } from '@/lib/llms/data'
import { llmsResponse } from '@/lib/llms/response'

// See llms.txt/route.ts: hourly regeneration from the CMS, no static file in public/.
export const revalidate = 3600
// Regeneration reads the full catalog from the database; the Vercel Hobby default (10s) is tight.
export const maxDuration = 60

export async function GET() {
  return llmsResponse(buildLlmsFullTxt(await loadLlmsSiteData()))
}
