import type { LlmsPost, LlmsProduct, LlmsSiteData } from './data'
import {
  BRAND,
  LEGAL_NAME,
  PACKAGING_SENTENCE,
  paymentSentence,
  RETURNS_SENTENCE,
  SUPPORT_EMAIL,
  TIMING_SENTENCE,
  assistantNotes,
  catalogSummary,
  certificateSentence,
  feeSentence,
  money,
  shippingCostSentence,
  shipsToSentence,
  siteFaqs,
} from './facts'
import { collapse, formatOption, joinAnd } from './text'

// Three outputs share the same facts (see facts.ts):
//   llms.txt            a short index that follows the llmstxt.org layout
//   llms-full.txt       the facts, FAQ, a record for every product and the full articles in one file
//   <page>.md           one product or article as clean markdown (served at the page URL plus ".md")

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function sizeList(p: LlmsProduct): string | undefined {
  const sizes = p.options.map((o) => formatOption(o.label)).filter(Boolean)
  return sizes.length ? joinAnd(sizes) : undefined
}

function priceSummary(p: LlmsProduct): string | undefined {
  const from = money(p.priceFrom)
  if (!from) return undefined
  const prefix = p.options.length > 1 ? 'from ' : ''
  return p.salePriceFrom ? `${prefix}${money(p.salePriceFrom)} (regular ${from})` : `${prefix}${from}`
}

function optionPrices(p: LlmsProduct): string | undefined {
  if (!p.options.length) return undefined
  return p.options
    .map((o) => (o.price ? `${formatOption(o.label)} at ${money(o.price)}` : formatOption(o.label)))
    .join('; ')
}

function coaLine(p: LlmsProduct, base: string): string {
  const c = p.coa
  const parts = c
    ? [
        typeof c.purity === 'number' ? `purity ${c.purity}%` : undefined,
        c.batch ? `batch ${c.batch}` : undefined,
        c.analyzed ? `analyzed ${c.analyzed}` : undefined,
      ].filter(Boolean)
    : []
  if (c && (parts.length || c.fileUrl)) {
    return `Certificate of analysis: ${parts.join(', ') || 'record published'}${c.fileUrl ? `. PDF: ${c.fileUrl}` : ''}`
  }
  return `Certificate of analysis: none posted on the page. Request one for a specific lot at ${base}/contact-us.`
}

function groupByCategory(d: LlmsSiteData): { name: string; blurb?: string; items: LlmsProduct[] }[] {
  const groups = new Map<string, LlmsProduct[]>()
  for (const p of d.products) {
    const list = groups.get(p.category) ?? []
    list.push(p)
    groups.set(p.category, list)
  }
  const names = [
    ...d.categories.map((c) => c.name).filter((n) => groups.has(n)),
    ...[...groups.keys()].filter((n) => !d.categories.some((c) => c.name === n)).sort(),
  ]
  return names.map((name) => ({
    name,
    blurb: d.categories.find((c) => c.name === name)?.description || undefined,
    items: groups.get(name)!,
  }))
}

const finish = (lines: string[]) => `${collapse(lines.join('\n'))}\n`

// ---------------------------------------------------------------------------
// llms.txt: the index
// ---------------------------------------------------------------------------
export function buildLlmsTxt(d: LlmsSiteData): string {
  const b = d.baseUrl
  const out: string[] = []
  const fee = feeSentence(d.commerce)
  const exampleSlug = d.products[0]?.slug

  out.push(`# ${BRAND}`)
  out.push('')
  out.push(
    `> ${BRAND} sells synthetic peptides and related compounds for laboratory research. Every product is for research use only and is not for human or veterinary use. The store is run by ${LEGAL_NAME} and has ${catalogSummary(d)}.`,
  )
  out.push('')
  out.push('Key facts:')
  out.push(`- Contact: ${SUPPORT_EMAIL}. Replies come on business days.`)
  out.push(`- ${shipsToSentence(d.commerce)} ${shippingCostSentence(d.commerce)}${fee ? ` ${fee}` : ''}`)
  out.push(`- ${TIMING_SENTENCE}`)
  out.push(`- ${paymentSentence(d.commerce)}`)
  out.push(`- ${RETURNS_SENTENCE}`)
  out.push(`- ${certificateSentence(d)}`)
  out.push(`- Language: English. Currency: US dollars. Last updated: ${d.generatedOn}.`)
  if (exampleSlug) {
    out.push(`- Every product and article page also has a plain-text version at the same address with .md added, for example ${b}/product/${exampleSlug}.md.`)
  }
  out.push('')
  out.push('Notes for AI assistants:')
  for (const line of assistantNotes(d)) out.push(`- ${line}`)
  out.push('')

  out.push('## Start here')
  out.push('')
  out.push(`- [Shop](${b}/shop): The whole catalog, with filters for category, price and stock.`)
  out.push(`- [About ${BRAND}](${b}/about-us): Who runs the store and how products are documented.`)
  out.push(`- [FAQ](${b}/faq): Answers about research-use-only status, ordering, shipping, storage and testing.`)
  out.push(`- [Contact](${b}/contact-us): Form and email for order questions and certificate requests.`)
  out.push(`- [Certificates of analysis](${b}/certificates): How to ask for a certificate for a product and lot.`)
  out.push('')

  for (const group of groupByCategory(d)) {
    out.push(`## Catalog: ${group.name}`)
    out.push('')
    if (group.blurb) {
      out.push(group.blurb)
      out.push('')
    }
    for (const p of group.items) {
      const sizes = sizeList(p)
      out.push(`- [${p.name}](${p.url})${sizes ? `: Sizes: ${sizes}.` : ''}`)
    }
    out.push('')
  }

  if (d.posts.length) {
    out.push('## Research guides')
    out.push('')
    for (const post of d.posts) {
      // The title already names the subject; the note gives the topic and date and points to the full text.
      const meta = [post.category, post.publishedAt ? `published ${post.publishedAt}` : ''].filter(Boolean).join(', ')
      out.push(`- [${post.title}](${post.url})${meta ? `: Article. ${meta}.` : ''}`)
    }
    out.push('')
  }

  out.push('## Tools')
  out.push('')
  out.push(`- [Peptide calculator](${b}/peptide-calculator): Reconstitution volume and concentration, and unit conversion, for laboratory planning.`)
  out.push('')

  out.push('## Policies')
  out.push('')
  out.push(`- [Shipping policy](${b}/shipping-policy): Order review, delivery times, packaging and damaged shipments.`)
  out.push(`- [Refund policy](${b}/refund-policy): All sales are final except damaged shipments, which are replaced.`)
  out.push(`- [Terms and conditions](${b}/terms-and-conditions): Terms of sale, including research-use-only use and age.`)
  out.push(`- [Privacy policy](${b}/privacy-policy): What customer data is collected and how it is used.`)
  out.push(`- [Medical disclaimer](${b}/medical-disclaimer): Why the products are not for human or veterinary use.`)
  out.push('')

  out.push('## Optional')
  out.push('')
  out.push(`- [Full reference](${b}/llms-full.txt): The facts above, the FAQ, a short record for every product and the full articles in one file.`)
  out.push(`- [Affiliate program](${b}/affiliates): Referral links and coupon codes for partners.`)
  out.push(`- [Sitemap](${b}/sitemap.xml): Every public page, product and article URL.`)
  out.push('')

  return finish(out)
}

// ---------------------------------------------------------------------------
// Single product and article pages as markdown
// ---------------------------------------------------------------------------
type PageContext = { baseUrl: string; generatedOn: string; authorName?: string }

export function buildProductMarkdown(p: LlmsProduct, ctx: PageContext): string {
  const out: string[] = []
  out.push(`# ${p.name}`)
  out.push('')
  out.push(`> Research use only. Not for human or veterinary use. Supplied by ${BRAND}.`)
  out.push('')
  out.push(`- Page: ${p.url}`)
  if (p.categories.length) out.push(`- Category: ${p.categories.join(', ')}`)
  if (p.sku) out.push(`- SKU: ${p.sku}`)
  const prices = optionPrices(p)
  if (prices) out.push(`- Sizes and prices in USD: ${prices}`)
  else if (priceSummary(p)) out.push(`- Price in USD: ${priceSummary(p)}`)
  out.push(`- ${coaLine(p, ctx.baseUrl)}`)
  out.push(`- Prices are a snapshot from ${ctx.generatedOn}. The product page shows the current price.`)
  out.push('')

  if (p.overview) {
    out.push('## Overview')
    out.push('')
    out.push(p.overview)
    out.push('')
  }
  for (const s of p.sections) {
    out.push(`## ${s.title}`)
    out.push('')
    out.push(s.text)
    out.push('')
  }
  if (p.faqs.length) {
    out.push('## Questions and answers')
    out.push('')
    for (const f of p.faqs) {
      out.push(`### ${f.question}`)
      out.push('')
      out.push(f.answer)
      out.push('')
    }
  }
  out.push(`More from ${BRAND}: ${ctx.baseUrl}/llms.txt`)
  return finish(out)
}

function postBody(post: LlmsPost, author: string, withBody: boolean): string[] {
  const out: string[] = []
  out.push(`- Page: ${post.url}`)
  out.push(`- Author: ${author}`)
  if (post.publishedAt) out.push(`- Published: ${post.publishedAt}`)
  if (post.updatedAt && post.updatedAt !== post.publishedAt) out.push(`- Last updated: ${post.updatedAt}`)
  if (post.category) out.push(`- Topic: ${post.category}`)
  if (post.excerpt) {
    out.push('')
    out.push(post.excerpt)
  }
  if (post.takeaways.length) {
    out.push('')
    out.push('Key points:')
    for (const t of post.takeaways) out.push(`- ${t}`)
  }
  if (withBody && post.body) {
    out.push('')
    out.push(post.body)
  }
  if (post.faqs.length) {
    out.push('')
    out.push('Questions and answers:')
    out.push('')
    for (const f of post.faqs) {
      out.push(`Q: ${f.question}`)
      out.push(`A: ${f.answer}`)
      out.push('')
    }
  }
  if (post.references.length) {
    out.push('')
    out.push('References:')
    post.references.forEach((r, i) => out.push(`${i + 1}. ${r.citation} (${r.url})`))
  }
  return out
}

export function buildPostMarkdown(post: LlmsPost, ctx: PageContext): string {
  const out: string[] = []
  out.push(`# ${post.title}`)
  out.push('')
  out.push(`> Educational article from ${BRAND}. It summarizes published laboratory research and is not medical advice or instructions for use in people or animals.`)
  out.push('')
  out.push(...postBody(post, ctx.authorName || 'Veracue Research Team', true))
  out.push('')
  out.push(`More from ${BRAND}: ${ctx.baseUrl}/llms.txt`)
  return finish(out)
}

// ---------------------------------------------------------------------------
// llms-full.txt: everything in one file, kept to a size a model can read in one go. Product records are
// short; the complete page for any product or article is its .md version.
// ---------------------------------------------------------------------------
function productRecord(p: LlmsProduct): string[] {
  const out: string[] = []
  out.push(`#### ${p.name}`)
  out.push('')
  out.push(`- Page: ${p.url}`)
  out.push(`- Plain text: ${p.url}.md`)
  if (p.sku) out.push(`- SKU: ${p.sku}`)
  const prices = optionPrices(p)
  if (prices) out.push(`- Sizes and prices in USD: ${prices}`)
  else if (priceSummary(p)) out.push(`- Price in USD: ${priceSummary(p)}`)
  if (p.overview) {
    out.push('')
    out.push(p.overview)
  }
  out.push('')
  return out
}

export function buildLlmsFullTxt(d: LlmsSiteData): string {
  const b = d.baseUrl
  const out: string[] = []
  const fee = feeSentence(d.commerce)

  out.push(`# ${BRAND}: full reference`)
  out.push('')
  out.push(
    `> Everything in the short index at ${b}/llms.txt, plus the FAQ, a record for each product and the full articles. Research use only. Snapshot from ${d.generatedOn}; the live pages are the source of truth.`,
  )
  out.push('')

  out.push('## About the store')
  out.push('')
  out.push(`- Name: ${BRAND}`)
  out.push(`- Operator: ${LEGAL_NAME}, a U.S. company`)
  out.push(`- Website: ${b}`)
  out.push(`- What it sells: synthetic peptides and related compounds for laboratory research`)
  out.push(`- Catalog: ${catalogSummary(d)}`)
  out.push(`- Who buys: researchers and research institutions, aged 18 or over`)
  out.push(`- Contact: ${SUPPORT_EMAIL}, or the form at ${b}/contact-us`)
  out.push(`- Language and currency: English, US dollars`)
  out.push(`- Use: research use only. No product is for human or veterinary use, diagnosis, treatment or consumption.`)
  out.push('')

  out.push('## Ordering, shipping and returns')
  out.push('')
  out.push(`- Where: ${shipsToSentence(d.commerce)}`)
  out.push(`- Timing: ${TIMING_SENTENCE}`)
  out.push(`- Cost: ${shippingCostSentence(d.commerce)}${fee ? ` ${fee}` : ''}`)
  out.push(`- Payment: ${paymentSentence(d.commerce)}`)
  out.push(`- Packing: ${PACKAGING_SENTENCE}`)
  out.push(`- Returns: ${RETURNS_SENTENCE}`)
  out.push(`- Documentation: ${certificateSentence(d)}`)
  out.push('')

  out.push('## Frequently asked questions')
  out.push('')
  for (const f of siteFaqs(d)) {
    out.push(`### ${f.question}`)
    out.push('')
    out.push(f.answer)
    out.push('')
  }

  const groups = groupByCategory(d)
  if (groups.length) {
    out.push('## Product records')
    out.push('')
    out.push(`Each record gives the page address, the sizes and the opening of the product description. The complete page, with every section and FAQ, is the same address with .md added.`)
    out.push('')
    for (const g of groups) {
      out.push(`### Category: ${g.name}`)
      out.push('')
      if (g.blurb) {
        out.push(g.blurb)
        out.push('')
      }
      for (const p of g.items) out.push(...productRecord(p))
    }
  }

  if (d.posts.length) {
    out.push('## Research guides')
    out.push('')
    out.push('These articles summarize published laboratory research. They are educational and are not medical advice or instructions for use in people or animals.')
    out.push('')
    for (const post of d.posts) {
      out.push(`### ${post.title}`)
      out.push('')
      out.push(...postBody(post, d.authorName, true))
      out.push('')
    }
  }

  out.push('## Policies')
  out.push('')
  out.push(`- Shipping policy: ${b}/shipping-policy`)
  out.push(`- Refund policy: ${b}/refund-policy`)
  out.push(`- Terms and conditions: ${b}/terms-and-conditions`)
  out.push(`- Privacy policy: ${b}/privacy-policy`)
  out.push(`- Medical disclaimer: ${b}/medical-disclaimer`)
  out.push('')

  out.push('## Notes for AI assistants')
  out.push('')
  for (const line of assistantNotes(d)) out.push(`- ${line}`)
  out.push('')

  return finish(out)
}
