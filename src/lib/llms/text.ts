// Plain-text helpers for the generated llms.txt / llms-full.txt files.
// Everything here is dependency-free so it can run inside a route handler.

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
}

function decodeEntities(s: string): string {
  return s
    .replace(/&(nbsp|amp|lt|gt|quot|apos|#39);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
}

// Em and en dashes are avoided in all Veracue copy, including machine-readable files.
function normalizeDashes(s: string): string {
  return s.replace(/\s*[\u2013\u2014]\s*/g, ', ').replace(/\u2212/g, '-')
}

export function collapse(s: string): string {
  return normalizeDashes(s)
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function oneLine(s: string): string {
  return collapse(s).replace(/\s*\n+\s*/g, ' ')
}

export function truncate(s: string, max: number): string {
  const text = oneLine(s)
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, '')}...`
}

export function truncateBlock(s: string, max: number): string {
  const text = collapse(s)
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastBreak = Math.max(cut.lastIndexOf('\n'), cut.lastIndexOf('. '))
  return `${(lastBreak > max * 0.6 ? cut.slice(0, lastBreak + 1) : cut).trim()}`
}

export function htmlToText(html?: string | null): string {
  if (!html) return ''
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    // Headings inside a description become markdown subheadings, so a page's structure survives.
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, _level, inner) => {
      const label = String(inner).replace(/<[^>]+>/g, '').trim()
      return label ? `\n\n### ${label}\n\n` : '\n'
    })
    .replace(/<\/(p|div|ul|ol|table|thead|tbody)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi, ': ')
    .replace(/<[^>]+>/g, '')
  return collapse(decodeEntities(text).replace(/:\s*\n/g, ':\n'))
}

// Minimal Lexical (Payload rich text) to plain text. Unknown nodes fall back to their children.
export function lexicalToText(root: any): string {
  if (!root?.root) return ''

  const walk = (node: any, ctx: { listType?: string; index?: number } = {}): string => {
    if (!node) return ''
    switch (node.type) {
      case 'text':
        return node.text ?? ''
      case 'linebreak':
        return '\n'
      case 'heading': {
        const level = Number(String(node.tag ?? 'h2').replace('h', '')) || 2
        return `\n\n${'#'.repeat(Math.min(level + 1, 6))} ${children(node)}\n\n`
      }
      case 'paragraph':
        return `${children(node)}\n\n`
      case 'quote':
        return `> ${children(node)}\n\n`
      case 'list':
        return (
          (node.children ?? [])
            .map((c: any, i: number) => walk(c, { listType: node.listType, index: i + 1 }))
            .join('') + '\n'
        )
      case 'listitem':
        return `${ctx.listType === 'number' ? `${ctx.index}.` : '-'} ${children(node)}\n`
      case 'table':
        return `\n${(node.children ?? []).map((row: any) => walk(row)).join('')}\n`
      case 'tablerow':
        return `${(node.children ?? []).map((cell: any) => walk(cell).trim()).join(' | ')}\n`
      case 'tablecell':
        return children(node)
      case 'block':
        return node.fields?.text ? `${node.fields.text}\n\n` : ''
      case 'upload':
        return ''
      default:
        return children(node)
    }
  }
  const children = (node: any): string => (node.children ?? []).map((c: any) => walk(c)).join('')

  return collapse(walk(root.root))
}

// ---------------------------------------------------------------------------
// RUO safety net for CMS-sourced labels. The generated llms files are read by answer engines,
// so category names and blurbs that read as weight-loss, anti-aging, or therapeutic claims are
// neutralized here even if a category record in the CMS has not been renamed yet.
// ---------------------------------------------------------------------------
const CLAIM_TERMS =
  /weight[\s-]*loss|fat[\s-]*loss|obes|overweight|diabet|glyc[a]?emic|glucose|anti-?aging|\bheal(?:ing|s)?\b|therap|\btreat|\bdos(?:e|es|ing|age)\b|clinical|\bpatients?\b|GLP-1/i

export function ruoSafeCategoryName(name: string): string {
  const cleaned = name
    .replace(/weight[\s-]*loss\s*(?:&|and)\s*/i, '')
    .replace(/\s*(?:&|and)\s*anti-?aging/i, '')
    .replace(/\s*(?:&|and)\s*healing/i, '')
    .trim()
  if (!cleaned) return 'Research Compounds'
  return /^metabolic$/i.test(cleaned) ? 'Metabolic Research' : cleaned
}

export function ruoSafeBlurb(text: string, categoryName: string): string {
  if (!text || CLAIM_TERMS.test(text)) {
    return `Research compounds in the ${categoryName} category, supplied for laboratory use only.`
  }
  return text
}

// "10mg" becomes "10 mg" and "5000 IU" stays as it is; labels that are not a plain amount (for example
// "Pack of 10") are returned unchanged.
// Blends such as "5mg/5mg" are spaced the same way ("5 mg / 5 mg").
export function formatOption(label: string): string {
  const text = oneLine(label)
  const parts = text.split('/').map((part) => part.trim().match(/^(\d+(?:\.\d+)?)\s*(mg|mcg|g|ml|iu|µg)$/i))
  if (parts.some((match) => !match)) return text
  return parts
    .map((match) => `${match![1]} ${match![2].toLowerCase() === 'iu' ? 'IU' : match![2].toLowerCase()}`)
    .join(' / ')
}

// "a", "a and b", "a, b and c".
export function joinAnd(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

// First paragraph of a block of text, cut at the end of a sentence when it is longer than `max`.
export function firstParagraph(s: string, max: number): string {
  const text = collapse(s)
  // Skip a leading heading so the overview is always running text.
  const paragraph = text.split(/\n{2,}/).find((block) => block && !block.startsWith('#')) ?? ''
  if (paragraph.length <= max) return paragraph
  const cut = paragraph.slice(0, max)
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  return end > max * 0.5 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.-]+$/, '') + '.'
}

// Development code names that identify a marketed drug (for example LY1234567). Any sentence that
// mentions one is dropped from the generated files: the catalog uses neutral research names.
const CLINICAL_CODE = /\b(?:LY|AM|NN|TAK|MK)[-\s]?\d{3,}\b/

export function hasClinicalCode(text: string): boolean {
  return CLINICAL_CODE.test(text)
}

export function dropCodedSentences(text: string): string {
  return text
    .split(/\n/)
    .map((line) =>
      line
        .split(/(?<=[.!?])\s+/)
        .filter((sentence) => !CLINICAL_CODE.test(sentence))
        .join(' '),
    )
    .join('\n')
}

// Removes clinical development code names (for example "(LY1234567)") that identify a marketed
// drug; the catalog uses neutral research names instead.
export function scrubClinicalCodes(text: string): string {
  return text.replace(/\s*\((?:LY|AM|NN|TAK|MK)[-\s]?\d{3,}\)/g, '')
}
