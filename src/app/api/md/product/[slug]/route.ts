import { buildProductMarkdown } from '@/lib/llms/build'
import { loadLlmsProduct, siteBaseUrl } from '@/lib/llms/data'
import { markdownNotFound, markdownResponse } from '@/lib/llms/response'

// Reached through a rewrite in next.config.ts: /product/<slug>.md serves this handler, so the plain-text
// copy of a product page lives at the page's own address plus ".md" (the llmstxt.org convention).
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Same rule as the HTML page: only active, visible products exist.
  const product = await loadLlmsProduct(slug)
  if (!product) return markdownNotFound()

  const baseUrl = siteBaseUrl()
  const body = buildProductMarkdown(product, { baseUrl, generatedOn: new Date().toISOString().slice(0, 10) })
  return markdownResponse(body, `${baseUrl}/product/${product.slug}`)
}
