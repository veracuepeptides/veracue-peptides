import { buildPostMarkdown } from '@/lib/llms/build'
import { loadLlmsPost, siteBaseUrl } from '@/lib/llms/data'
import { markdownNotFound, markdownResponse } from '@/lib/llms/response'

// Reached through a rewrite in next.config.ts: /blog/<slug>.md serves this handler.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await loadLlmsPost(slug)
  if (!post) return markdownNotFound()

  const baseUrl = siteBaseUrl()
  const body = buildPostMarkdown(post, { baseUrl, generatedOn: new Date().toISOString().slice(0, 10) })
  return markdownResponse(body, post.url)
}
