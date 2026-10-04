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
    .replace(/<\/(p|div|h[1-6]|ul|ol|table|thead|tbody)>/gi, '\n')
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

// Removes clinical development code names (for example "(LY1234567)") that identify a marketed
// drug; the catalog uses neutral research names instead.
export function scrubClinicalCodes(text: string): string {
  return text.replace(/\s*\((?:LY|AM|NN|TAK|MK)[-\s]?\d{3,}\)/g, '')
}
