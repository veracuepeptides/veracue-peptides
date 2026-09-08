# Blog Posts CMS — Full Setup Prompt

Hand this document to Claude Code (or any coding agent) in a **different
Payload + Next.js peptides-site project on the same tech stack** (Payload 3,
Next.js App Router, Postgres, `@payloadcms/richtext-lexical`,
`@payloadcms/plugin-seo`, optionally `@payloadcms/storage-s3`). It describes
exactly how the `blog-posts` CMS was built on this reference project, field
by field, file by file, so it can be replicated on the new one.

Say to the agent: *"Set up the blog CMS on this project exactly as
described in this document, adapting only the site name, domain, brand
colors/design classes, and product/page slugs to this project's own
catalog. Read the actual current state of this project's payload.config.ts,
Products collection, and design system first, then implement."*

---

## 0. Architecture summary

- **Collections:** `BlogPosts` (the posts), `BlogMedia` (a *separate* upload
  collection just for blog images — deliberately not shared with the
  product-image `Media` collection).
- **Global:** `BlogAuthorProfile` — a single site-wide byline object (name,
  bio, photo, socials) reused across every post, because there's exactly one
  author identity ("the [Brand] Team"), not per-user authorship.
- **Block:** `CalloutBox` — a lexical block type for inline info/tip/warning
  callouts inside the rich-text body.
- **Access:** a shared `accessContent` access-control object (public read of
  published docs only, admin-only write) reused by `BlogPosts` and `Pages`.
- **Storage:** blog images live on the same S3/R2-compatible bucket as
  product images (separate prefix), *never local disk* — local disk storage
  only works on the machine that wrote the file and breaks on any real
  deployment.
- **Frontend:** a single dynamic catch-all-ish `[slug]/page.tsx` route
  renders both blog posts and other slug-based content; a `/blog` listing
  page fetches from Payload server-side and hands off to a client component
  for filtering/pagination UI.
- **SEO:** `@payloadcms/plugin-seo` handles `meta.title`/`meta.description`/
  `meta.image`; the post page additionally hand-builds a JSON-LD `@graph`
  with `BlogPosting`, `BreadcrumbList`, `FAQPage`, and per-related-product
  `Product` schema.
- **Content pipeline:** a CLI import script (`scripts/import-blog-post.ts`)
  takes a JSON draft (title/excerpt/content-as-constrained-markdown/FAQs/
  etc.) + one image file and creates/updates a `blog-posts` document via the
  Payload local API — no manual admin data entry required per post.

---

## 1. Required packages

Already assumed present on a Payload 3 + Next.js stack; confirm these exist:

```
payload
@payloadcms/db-postgres      (or whichever DB adapter is already in use)
@payloadcms/richtext-lexical
@payloadcms/plugin-seo
@payloadcms/storage-s3       (only if this project also uses S3/R2 — otherwise adapt storage notes in §4)
sharp
tsx                           (dev dependency, for running scripts/*.ts directly)
```

---

## 2. Collection: `BlogPosts`

Create `src/collections/BlogPosts.ts`:

```ts
import { CollectionConfig } from 'payload'
import { lexicalEditor, EXPERIMENTAL_TableFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import { accessContent } from '../access/content'
import { CalloutBox } from '../blocks/CalloutBox'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { defaultColumns: ['title', 'author', 'status', 'publishedAt'] },
  access: accessContent,
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', admin: { position: 'sidebar' } },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'blog-media', label: 'Featured Image' },
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Short summary shown on blog listing cards and used as the default SEO/social description.' } },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({ blocks: [CalloutBox] }),
        ],
      }),
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      admin: { position: 'sidebar' },
      options: [
        // Replace with THIS project's own topic taxonomy — keep it short (3-5
        // options), matched to the site's actual content pillars.
        { label: 'Metabolic research', value: 'Metabolic research' },
        { label: 'Recovery protocols', value: 'Recovery protocols' },
        { label: 'Growth research', value: 'Growth research' },
        { label: 'Muscle studies', value: 'Muscle studies' },
      ],
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products', // match this project's actual products collection slug
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'readTime',
      type: 'text',
      admin: { description: "e.g. '12 min read'. Leave blank to auto-calculate from content length when rendered." },
    },
    {
      name: 'keyTakeaways',
      type: 'array',
      admin: { description: 'Short factual bullet points summarizing the post. Used for AI answer-engine (AEO/GEO) extraction and on-page "Key Takeaways" callouts.' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true }],
    },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Populates FAQPage schema.org markup and on-page FAQ accordion.' },
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'references',
      type: 'array',
      admin: { description: 'Peer-reviewed sources cited in this post (PubMed, DOI, journal links). Strengthens E-E-A-T trust signals and AI answer-engine citation likelihood.' },
      fields: [
        { name: 'citationText', type: 'text', required: true, admin: { description: 'e.g. "Smith et al., 2023, Journal of Peptide Science"' } },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'focusKeyphrase',
      type: 'text',
      admin: { position: 'sidebar', description: 'Primary target keyword/phrase for this post (editorial SEO guidance).' },
    },
    {
      name: 'keywords',
      type: 'text',
      admin: { position: 'sidebar', description: 'Comma-separated secondary keywords for meta keywords / internal search relevance.' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.slug && data.title) {
          data.slug = data.title.toLowerCase().replace(/\s+/g, '-')
        }
        return data
      },
    ],
  },
}
```

**Why these specific fields exist** (so the agent doesn't cut any "unused-looking" ones):
- `keyTakeaways` + `faqs` + `references` aren't cosmetic — they directly drive `FAQPage` JSON-LD, the on-page FAQ accordion, and AI answer-engine extraction (AEO/GEO). Don't skip them as "just more content fields."
- `relatedProducts` drives both a cross-sell UI slider AND per-product `Product` JSON-LD schema on the post page (see §7).
- `focusKeyphrase`/`keywords` are editorial SEO aids, not auto-generated — keep them as plain text fields.

---

## 3. Collection: `BlogMedia`

Create `src/collections/BlogMedia.ts` — **a separate upload collection from
the product-image `Media` collection.** Do not reuse `Media` for blog
images; keeping them separate makes editorial content cleanly separable
from commerce assets (different prefixes, different admin browsing
context).

```ts
// src/collections/BlogMedia.ts
import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const BlogMedia: CollectionConfig = {
  slug: 'blog-media',
  labels: { singular: 'Blog Media', plural: 'Blog Media' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff' // match this project's actual role names
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff'
    },
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
    { name: 'caption', type: 'text', localized: true },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/blog-media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: { format: 'webp', options: { quality: 80 } },
  },
}
```

**Critical gotcha (learned the hard way on the reference project):** if this
project uses S3/R2 storage for its product `Media` collection, `BlogMedia`
**must** be added to that same storage config too (§4). Leaving it on local
disk (`staticDir` only) works fine in local dev but silently breaks in any
real deployment, because the uploaded file only ever exists on whichever
machine wrote it — a separately-deployed instance (or a serverless/ephemeral
filesystem) will 500 trying to serve it. Always check whether this
project's `Media`/`Documents` collections are on S3/R2 first, and if so,
put `blog-media` on the same bucket from day one.

---

## 4. Block: `CalloutBox`

Create `src/blocks/CalloutBox.ts` (a Payload lexical Block, used inside
`BlogPosts.content`'s rich-text editor):

```ts
import type { Block } from 'payload'

export const CalloutBox: Block = {
  slug: 'calloutBox',
  labels: { singular: 'Callout Box', plural: 'Callout Boxes' },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Tip', value: 'tip' },
        { label: 'Warning', value: 'warning' },
      ],
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Short highlighted note shown as a boxed callout within the article.' },
    },
  ],
}
```

---

## 5. Global: `BlogAuthorProfile`

Create `src/globals/BlogAuthorProfile.ts`:

```ts
import type { GlobalConfig } from 'payload'

export const BlogAuthorProfile: GlobalConfig = {
  slug: 'blog-author-profile',
  label: 'Blog Author Profile',
  admin: {
    group: 'Blog',
    description: 'The single byline used across every blog post (the [Brand] Team account is the only author). Feeds Author/Person schema.org markup for E-E-A-T.',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user && ['admin', 'staff'].includes(user.role as string),
  },
  fields: [
    { name: 'name', type: 'text', required: true, defaultValue: '[Brand] Team' },
    { name: 'title', type: 'text', admin: { description: 'e.g. "Research & Product Team"' } },
    { name: 'bio', type: 'textarea', admin: { description: 'Short author bio shown on post pages and used in Author/Person schema.' } },
    { name: 'credentials', type: 'text', admin: { description: 'e.g. "Reviewed by in-house research chemists"' } },
    { name: 'photo', type: 'upload', relationTo: 'blog-media', label: 'Author Photo' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', required: true, options: ['X', 'LinkedIn', 'Instagram', 'Facebook', 'YouTube'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
```

Why a Global and not a per-user field: there's only ever one editorial
byline for the whole site ("[Brand] Team"), so a Payload Global (singleton
document) is the right primitive — avoids duplicating bio fields onto every
customer/admin `Users` record.

---

## 6. Access control: shared `accessContent`

If this project doesn't already have one, create `src/access/content.ts`
and use it for `BlogPosts` (and optionally `Pages`):

```ts
export const accessContent: any = {
  create: ({ req }: any) => req.user?.role === 'admin',
  read: ({ req }: any) => {
    if (req.user?.role === 'admin') return true
    return { status: { equals: 'published' } }
  },
  update: ({ req }: any) => req.user?.role === 'admin',
  delete: ({ req }: any) => req.user?.role === 'admin',
}
```

**Critical gotcha:** the `read` function must return a `Where` clause
object (`{ status: { equals: 'published' } }`), **not** check
`data?.status === 'published'` directly. Payload only populates `data` for
single-document access checks — for list/REST queries `data` is
`undefined`, so a `data?.status === ...` check silently evaluates `false`
for everyone (including anonymous public reads), blocking all public list
access without ever throwing an error. This is an easy, very quiet bug:
single-document fetches (e.g. the post-detail page using Payload's *local*
API, which bypasses access control by default) will look like they work
fine in testing, while the public REST/GraphQL API — which anything
client-side hits, e.g. a header nav fetching post slugs — silently returns
nothing. Always use the `Where`-clause return form.

---

## 7. `payload.config.ts` wiring

1. **Import and register** `BlogPosts`, `BlogMedia` in the `collections`
   array, and `BlogAuthorProfile` in the `globals` array.

2. **SEO plugin** — add `'blog-posts'` to the `seoPlugin`'s `collections`
   array (alongside `'pages'` or whatever else this project already SEO's),
   and give it a `generateImage` fallback so posts always get a social
   image even if the editor never opens the SEO tab:

   ```ts
   seoPlugin({
     collections: ['pages', 'blog-posts'],
     tabbedUI: true,
     uploadsCollection: 'media',
     generateTitle: ({ doc }: any) => (doc?.title ? `${doc.title} | [Brand]` : '[Brand]'),
     generateDescription: ({ doc }: any) => doc?.excerpt || doc?.seoDescription || '',
     generateImage: ({ doc }: any) => doc?.featuredImage || doc?.meta?.image,
     generateURL: ({ doc }: any) => {
       const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://[domain]'
       return `${base}/${doc?.slug || ''}`
     },
   }),
   ```

   Note: `uploadsCollection: 'media'` means the plugin's own `meta.image`
   picker still points at the product `Media` collection, not
   `blog-media` — that's a plugin limitation (`uploadsCollection` only
   accepts one collection). Not worth fighting; `featuredImage` (the field
   that actually matters) is separate and correctly points at `blog-media`.

3. **S3/R2 storage** (only if this project already uses `@payloadcms/storage-s3`
   for its `Media`/`Documents` collections) — add a `blog-media` entry to the
   `s3Storage({ collections: { ... } })` config, same pattern as the existing
   entries, own prefix (e.g. `'Blog Images'`):

   ```ts
   'blog-media': {
     disableLocalStorage: true,
     disablePayloadAccessControl: true,
     prefix: 'Blog Images',
     generateFileURL: ({ filename, prefix }) => {
       const publicUrl = process.env.R2_PUBLIC_URL || ''
       const base = publicUrl.replace(/\/$/, '')
       return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
     },
   },
   ```

   If this project does **not** use S3/R2 at all (product images are
   local-only too), it's fine to leave `blog-media` on local disk — just
   make sure that's a deliberate, informed choice given the deployment
   target, not an oversight.

4. Run `payload generate:types` (or this project's equivalent script) after
   adding the collections/global, and confirm `BlogPost`, `BlogMedia`, and
   `BlogAuthorProfile` types appear in the generated types file.

---

## 8. Frontend: shared lib helpers

Create these three small files under `src/lib/blog/`:

**`src/lib/blog/readingTime.ts`**
```ts
const WORDS_PER_MINUTE = 200

function extractText(node: any): string {
  if (!node) return ''
  let text = typeof node.text === 'string' ? node.text : ''
  if (Array.isArray(node.children)) {
    text += ' ' + node.children.map(extractText).join(' ')
  }
  return text
}

export function estimateReadingTime(content: any): string {
  const root = content?.root
  const text = root ? extractText(root) : ''
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min read`
}
```

**`src/lib/blog/splitContent.ts`** (splits the first paragraph out of the
lexical tree so it can render above a mid-article component like a
related-products slider, with the rest of the article below):
```ts
export function splitFirstParagraph(content: any): { first: any; rest: any } {
  const children = content?.root?.children || []
  if (children.length === 0) {
    return { first: null, rest: content }
  }
  const [firstNode, ...restNodes] = children
  return {
    first: { root: { ...content.root, children: [firstNode] } },
    rest: { root: { ...content.root, children: restNodes } },
  }
}
```

**`src/lib/blog/postDisplay.ts`**
```ts
import { encodeImageUrl } from '@/lib/utils'

export const FALLBACK_BLOG_IMAGE = '/[some-existing-fallback-image-path].webp'

export function getFeaturedImageUrl(post: any): string {
  if (post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url) {
    return encodeImageUrl(post.featuredImage.url)
  }
  return FALLBACK_BLOG_IMAGE
}

export function formatPostDate(dateStr: string | undefined): string {
  const date = dateStr ? new Date(dateStr) : new Date()
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
```

**Add to `src/lib/utils.ts`** (or wherever this project keeps shared URL
helpers) — two small but load-bearing helpers:

```ts
// Some upload collections (e.g. products, blog-media) store already-absolute R2 URLs,
// while others store relative local paths — only prefix baseUrl onto relative ones, or
// absolute URLs get incorrectly doubled up (e.g. "http://site.comhttps://r2.dev/...").
export function toAbsoluteUrl(baseUrl: string, url: string): string {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}

export function encodeImageUrl(url: string | undefined): string {
  if (!url) return ''
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url)
      parsed.pathname = parsed.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
      return parsed.toString()
    }
    return url.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
  } catch (e) {
    return url
  }
}
```

**Critical gotcha:** `encodeImageUrl` already fully encodes a URL (handles
spaces in R2 "folder" prefixes like `Blog Images/`, etc.). Never wrap its
output in another `encodeURI(...)` call anywhere — that double-encodes
already-escaped `%20` into `%2520`, silently breaking every image URL that
has a space or special character in its path. This bug bit the reference
project twice (once on the `BlogPosting` JSON-LD `image` field, once on the
`Product` JSON-LD `image` field) before being caught. Use `toAbsoluteUrl`
alone for building an absolute URL from something `encodeImageUrl` already
produced — nothing else.

---

## 9. The constrained content-markdown parser

This is the single most important piece for making blog authoring
practical: `BlogPosts.content` is a lexical richText field, and Payload's
lexical JSON structure is not something you want an LLM (or a human)
hand-authoring directly. Instead, content is authored in a small,
constrained "content markdown" dialect, then parsed into real lexical
nodes by this module. It supports exactly the node types the editor above
was configured with — nothing more, nothing less (paragraphs, `##`/`###`
headings, `-`/`1.` lists, `>` blockquotes, pipe tables, `:::info|tip|warning`
callout fences, inline `**bold**`, and inline `[text](url)` links).

Create `src/lib/blog/markdownToLexical.ts` — copy this file verbatim (it's
generic, not tied to any product-specific naming):

```ts
// Converts the constrained "blog content markdown" format into Payload
// lexical richText JSON, using only the node types BlogPosts.content's
// editor actually supports: paragraph, heading (h2/h3), bullet/ordered
// list, blockquote, table, and the calloutBox block. Also supports inline
// **bold** and [text](/url) links within any text-bearing node.

function textNode(text: string, format = 0) {
  return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function linkNode(children: any[], url: string) {
  return {
    type: 'link',
    version: 3,
    fields: { url, newTab: /^https?:\/\//.test(url), linkType: 'custom' },
    format: '',
    indent: 0,
    direction: 'ltr',
    children,
  }
}

function parseBoldSegments(text: string): any[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  if (parts.length === 0) return [textNode('')]
  return parts.map((part) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/)
    return m ? textNode(m[1], 1) : textNode(part)
  })
}

export function parseInline(text: string): any[] {
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  const segments: { text: string; isLink?: boolean; url?: string }[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = linkRe.exec(text))) {
    if (match.index > lastIndex) segments.push({ text: text.slice(lastIndex, match.index) })
    segments.push({ text: match[1], isLink: true, url: match[2] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) segments.push({ text: text.slice(lastIndex) })

  const nodes: any[] = []
  for (const seg of segments) {
    if (seg.isLink) {
      nodes.push(linkNode(parseBoldSegments(seg.text), seg.url!))
    } else {
      nodes.push(...parseBoldSegments(seg.text))
    }
  }
  return nodes.length ? nodes : [textNode('')]
}

function paragraph(text: string) {
  return { type: 'paragraph', format: '', indent: 0, version: 1, children: parseInline(text), direction: 'ltr' }
}

function heading(tag: 'h2' | 'h3', text: string) {
  return { type: 'heading', tag, format: '', indent: 0, version: 1, children: parseInline(text), direction: 'ltr' }
}

function list(items: string[], ordered: boolean) {
  return {
    type: 'list',
    listType: ordered ? 'number' : 'bullet',
    tag: ordered ? 'ol' : 'ul',
    start: 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((item) => ({
      type: 'listitem',
      value: 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: parseInline(item),
    })),
  }
}

function quote(text: string) {
  return { type: 'quote', format: '', indent: 0, version: 1, children: parseInline(text), direction: 'ltr' }
}

function tableCell(text: string, isHeader: boolean) {
  return {
    type: 'tablecell',
    format: '',
    indent: 0,
    version: 1,
    headerState: isHeader ? 1 : 0,
    colSpan: 1,
    rowSpan: 1,
    backgroundColor: null,
    children: [paragraph(text)],
    direction: 'ltr',
  }
}

function tableRow(cells: string[], isHeader = false) {
  return {
    type: 'tablerow',
    format: '',
    indent: 0,
    version: 1,
    children: cells.map((c) => tableCell(c, isHeader)),
    direction: 'ltr',
  }
}

function table(headers: string[], rows: string[][]) {
  return {
    type: 'table',
    format: '',
    indent: 0,
    version: 1,
    children: [tableRow(headers, true), ...rows.map((r) => tableRow(r))],
    direction: 'ltr',
  }
}

function calloutBox(style: 'info' | 'tip' | 'warning', text: string) {
  return {
    type: 'block',
    format: '',
    version: 2,
    fields: {
      id: Math.random().toString(36).slice(2, 10),
      blockName: '',
      blockType: 'calloutBox',
      style,
      text,
    },
  }
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\||\|$/g, '')
  return trimmed.split('|').map((s) => s.trim())
}

export function parseContentMarkdown(md: string): any {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const nodes: any[] = []
  let i = 0

  const isBlockStart = (line: string) =>
    /^(##\s|###\s|:::|>\s|-\s|\d+\.\s|\|)/.test(line) || line.trim() === ''

  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') { i++; continue }

    const calloutMatch = line.match(/^:::(info|tip|warning)\s*$/)
    if (calloutMatch) {
      const style = calloutMatch[1] as 'info' | 'tip' | 'warning'
      i++
      const textLines: string[] = []
      while (i < lines.length && lines[i].trim() !== ':::') { textLines.push(lines[i]); i++ }
      i++
      nodes.push(calloutBox(style, textLines.join(' ').trim()))
      continue
    }

    const h3 = line.match(/^###\s+(.*)$/)
    if (h3) { nodes.push(heading('h3', h3[1].trim())); i++; continue }
    const h2 = line.match(/^##\s+(.*)$/)
    if (h2) { nodes.push(heading('h2', h2[1].trim())); i++; continue }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) { quoteLines.push(lines[i].slice(2)); i++ }
      nodes.push(quote(quoteLines.join(' ').trim()))
      continue
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^-\s+/.test(lines[i])) { items.push(lines[i].replace(/^-\s+/, '').trim()); i++ }
      nodes.push(list(items, false))
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, '').trim()); i++ }
      nodes.push(list(items, true))
      continue
    }

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) { tableLines.push(lines[i].trim()); i++ }
      const headerCells = parseTableRow(tableLines[0])
      const rows = tableLines.slice(2).map(parseTableRow) // tableLines[1] is the |---|---| separator, skipped
      nodes.push(table(headerCells, rows))
      continue
    }

    const paraLines = [line]
    i++
    while (i < lines.length && !isBlockStart(lines[i])) { paraLines.push(lines[i]); i++ }
    nodes.push(paragraph(paraLines.join(' ').trim()))
  }

  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: nodes } }
}

export function extractLinks(md: string): { text: string; url: string }[] {
  const links: { text: string; url: string }[] = []
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let match: RegExpExecArray | null
  while ((match = linkRe.exec(md))) { links.push({ text: match[1], url: match[2] }) }
  return links
}

export function extractLinkPlaceholders(md: string): string[] {
  const placeholders: string[] = []
  const re = /<!--\s*LINK:\s*([^>]*?)\s*-->/g
  let match: RegExpExecArray | null
  while ((match = re.exec(md))) { placeholders.push(match[1].trim()) }
  return placeholders
}
```

**Content markdown syntax cheat sheet** (this exact spec must be handed to
whoever/whatever generates post content, since it's a *constrained* dialect,
not general markdown — no italics, no inline code, no images other than the
one featured image):

```
Plain text lines                = paragraph
## Heading                      = H2
### Heading                     = H3
- item                          = bullet list (consecutive lines)
1. item                         = numbered list (consecutive lines)
> quoted text                   = blockquote (consecutive lines)
| Header | Header |             = table
|---|---|
| cell | cell |
:::tip / :::info / :::warning   = callout box
Callout text
:::
**bold text**                   = inline bold
[anchor text](/product/<slug>)  = inline link to a product
[anchor text](/<slug>)          = inline link to another post/page
<!-- LINK: description -->      = unresolved-link placeholder (never guess a slug)
```

---

## 10. Frontend: display components

Build these under `src/components/blog/` (styling is entirely up to this
project's own design system — only the *data contract*/props shown below
needs to match what the `[slug]/page.tsx` route in §11 passes in):

| Component | Responsibility | Key props |
|---|---|---|
| `PostRichText` | Renders the lexical `content` via `@payloadcms/richtext-lexical/react`'s `RichText`, with custom converters for `blocks.calloutBox`, `table`, `tablerow`, `tablecell`, and `upload` (inline image figure, unused here but harmless to keep) | `content: any` |
| `CalloutBox` | Visual info/tip/warning box, rendered by `PostRichText`'s block converter | `style: 'info'|'tip'|'warning'`, `text: string` |
| `KeyTakeaways` | Bulleted "Key Takeaways" callout card | `items: string[]` |
| `FaqAccordion` | Expand/collapse FAQ list | `faqs: { question: string; answer: string }[]` |
| `ReferencesList` | Numbered, linked citation list | `references: { citationText: string; url: string }[]` |
| `AuthorCard` | Byline card sourced from the `BlogAuthorProfile` global | `name, title?, bio?, credentials?, photoUrl?` |
| `RelatedProductsSlider` | Cross-sell carousel of `relatedProducts` | `products: { id, name, slug, image, category, price }[]` |
| `BlogPostHero` | Post-detail hero (title, category, date, readTime, image) | `title, excerpt?, category?, date?, readTime?, imageSrc, imageAlt` |
| `BlogHero` | `/blog` listing page's hero banner | (static, no post data) |
| `TableOfContents` | Scroll-spy sidebar — **scans the DOM for real `<h2>`/`<h3>` tags inside a `.prose-article` container at mount time**, does not need heading data passed as props. Just make sure `PostRichText`'s wrapper has `className="prose-article"` and the converter emits real heading tags. | none |
| `BlogIndexClient` | Client component for the `/blog` listing page's filtering/pagination/hero UI | `posts: { slug, title, category, excerpt, imageSrc, readTime, date, sortDate }[]` |

`PostRichText`'s converter reference implementation (copy the `blocks`/
`table`/`tablerow`/`tablecell` parts verbatim; adapt `upload` and styling to
taste):

```tsx
import React from 'react'
import Image from 'next/image'
import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { CalloutBox } from './CalloutBox'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const value = node.value as any
    if (!value?.url) return null
    return (
      <figure>
        <Image src={value.url} alt={value.alt || ''} width={value.width || 1200} height={value.height || 800} className="w-full h-auto" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    )
  },
  blocks: {
    calloutBox: ({ node }: { node: any }) => (
      <CalloutBox style={node.fields.style as any} text={node.fields.text as string} />
    ),
  },
  table: ({ node, nodesToJSX }) => (
    <div className="overflow-x-auto my-8 -mx-1">
      <table className="min-w-full w-max border-collapse text-sm sm:text-base">
        <tbody>{nodesToJSX({ nodes: node.children })}</tbody>
      </table>
    </div>
  ),
  tablerow: ({ node, nodesToJSX }) => <tr>{nodesToJSX({ nodes: node.children })}</tr>,
  tablecell: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const isHeader = (node as any).headerState > 0
    const Tag = isHeader ? 'th' : 'td'
    return <Tag colSpan={(node as any).colSpan > 1 ? (node as any).colSpan : undefined}>{children}</Tag>
  },
})

export function PostRichText({ content }: { content: any }) {
  if (!content) return null
  return <RichText data={content} converters={jsxConverters} className="prose-article" />
}
```

---

## 11. Frontend: routes

### `src/app/(frontend)/[slug]/page.tsx` — post detail page

This is the most important integration point. Fetch via the Payload
**local API** (`getPayload({ config: configPromise })`, not REST — local
API is faster and doesn't need public access-control to succeed for
server-side rendering), filtered to `status: 'published'`. Structure:

1. `getPost(slug)` — `payload.find({ collection: 'blog-posts', where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] }, depth: 2 })`. `depth: 2` is needed so `relatedProducts` resolve as full product docs (including their `images`/`variants`) instead of bare IDs.
2. `generateStaticParams()` — list all published slugs.
3. `generateMetadata()` — title/description/OG/Twitter tags, pulling the author name from the `blog-author-profile` global, and image via `toAbsoluteUrl(baseUrl, getFeaturedImageUrl(post))` (never raw string concatenation — see §8's gotcha).
4. Default export — fetches `post` + up to 3 related posts (same category, falling back to "any other published post" if none match) + `authorProfile`, then:
   - Computes `readTime` (`post.readTime || estimateReadingTime(post.content)`).
   - Builds `sliderProducts` from `post.relatedProducts`, resolving each product's image with a fallback chain: top-level `images[0]` → first variant with images → fallback image constant. **Products frequently only have variant-level images, not top-level ones** (e.g. a product sold in 3mL/10mL/30mL each with its own photo) — don't skip the variant fallback or images will silently show a generic placeholder.
   - Splits `post.content` via `splitFirstParagraph` so a related-products slider can render between the intro paragraph and the rest of the body.
   - Builds a JSON-LD `@graph` array containing:
     - `BlogPosting` (headline, description, image, dates, `articleSection: post.category`, `keywords: post.keywords`, author, publisher, `mentions` pointing at each related-product's `@id` if any exist). **`BlogPosting` already *is* a valid Article-type schema for Google's rich-results purposes — don't also emit a separate generic `Article` node, that's redundant/potentially confusing to crawlers.**
     - `BreadcrumbList` (Home → Blog index → post title).
     - `FAQPage` (only if `post.faqs.length > 0`).
     - One `Product` node per related product, with `@id`, `name`, `image`, `sku`, `url`, `brand`, and an `Offer` (price/availability) — each linked back from the `BlogPosting`'s `mentions` array.
   - Renders: JSON-LD `<script>`, `BlogPostHero`, a two-column `TableOfContents` + article layout containing (in order) `KeyTakeaways`, intro `PostRichText`, `RelatedProductsSlider`, rest-of-body `PostRichText`, `FaqAccordion`, `ReferencesList`, `AuthorCard`, then a "Related posts" grid below.

   Full reference implementation — copy this file's overall shape and
   adapt only the styling/className/brand-name strings:

   *(See the actual current file at `src/app/(frontend)/[slug]/page.tsx` in
   this project for the exact up-to-date source — read it directly rather
   than trusting a pasted snapshot, since it may have evolved since this
   document was written.)*

### `src/app/(frontend)/blog/page.tsx` — listing page

Keep this an **async server component** that fetches published posts
server-side and hands the mapped array to a `'use client'` component for
interactive filtering/pagination — don't fetch client-side, since that
delays first paint and hurts SEO for what should be a crawlable index page.

```tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogIndexClient, type BlogIndexPost } from '@/components/blog/BlogIndexClient'
import { getFeaturedImageUrl, formatPostDate } from '@/lib/blog/postDisplay'
import { estimateReadingTime } from '@/lib/blog/readingTime'

export default async function BlogIndexPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 100,
    depth: 1,
  })

  const posts: BlogIndexPost[] = docs.map((post: any) => ({
    slug: post.slug,
    title: post.title,
    category: post.category || '',
    excerpt: post.excerpt || '',
    imageSrc: getFeaturedImageUrl(post),
    readTime: post.readTime || estimateReadingTime(post.content),
    date: formatPostDate(post.publishedAt || post.createdAt),
    sortDate: post.publishedAt || post.createdAt,
  }))

  return <BlogIndexClient posts={posts} />
}
```

### `sitemap.ts`

Add a block that fetches published `blog-posts` and pushes a `/‹slug›`
entry per post, same pattern as however this project already lists
products in its sitemap.

### Homepage blog teaser section (if this project has one)

Fetch published posts (`limit: 3-4`) server-side in the homepage's page
component and pass them as props into the teaser section component —
don't leave it reading from a static/hardcoded array.

### Header/nav (if it needs to know "is this URL a blog post")

If any client component needs to check "is the current route a blog post"
(e.g. for conditional header styling), fetch the list of published slugs
via the **public REST API** client-side (`/api/blog-posts?where[status][equals]=published&...`)
rather than importing static data — and make sure `accessContent`'s `read`
function (§6) actually allows this (returns a `Where` clause, not a
`data?.status` check), or the fetch will silently return zero results.

---

## 12. Content import pipeline

Create `scripts/import-blog-post.ts` — a CLI script that takes a JSON draft
+ an image file and creates/updates a `blog-posts` document via the local
API. This is what makes bulk content creation practical (no manual admin
data entry per post).

```ts
// Imports a blog post into the blog-posts collection. Usage:
//   npm run import:blog -- blog-drafts/<slug>.json [blog-drafts/<slug>.webp]
// The JSON path's sibling image (same basename, .webp/.jpg/.jpeg/.png/.avif)
// is used automatically if a second argument isn't given.

import { config } from 'dotenv'
config({ path: '.env' })
config({ path: '.env.local' })

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import { parseContentMarkdown, extractLinks, extractLinkPlaceholders } from '../src/lib/blog/markdownToLexical'

type Draft = {
  title: string
  slug?: string
  category: string
  excerpt: string
  featuredImageBrief?: string
  featuredImageAlt: string
  content: string
  readTime?: string
  keyTakeaways?: string[]
  faqs?: { question: string; answer: string }[]
  focusKeyphrase?: string
  keywords?: string
  metaTitle?: string
  metaDescription?: string
  relatedProducts?: string[]
  references?: { citationText: string; url: string }[]
  status?: 'draft' | 'published'
  publishedAt?: string
}

const MIME_BY_EXT: Record<string, string> = {
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.avif': 'image/avif',
}

function findImageFile(jsonPath: string, explicitImagePath?: string): string | null {
  if (explicitImagePath) return explicitImagePath
  const dir = path.dirname(jsonPath)
  const base = path.basename(jsonPath, '.json')
  for (const ext of ['.webp', '.jpg', '.jpeg', '.png', '.avif']) {
    const candidate = path.join(dir, base + ext)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

// Keep this in sync with sitemap.ts's static route list — real pages that
// aren't Payload documents, so the link checker doesn't false-flag them.
const STATIC_ROUTES = new Set([
  '', 'shop', 'blog', /* ...this project's other static routes... */
])

async function verifyInternalLinks(payload: any, content: string, warnings: string[]): Promise<void> {
  const links = extractLinks(content)
  const productSlugs = new Set<string>()
  const postSlugs = new Set<string>()

  for (const link of links) {
    const m = link.url.match(/^\/product\/([^/]+)$/)
    if (m) productSlugs.add(m[1])
    else if (/^\/[^/]+$/.test(link.url) && !STATIC_ROUTES.has(link.url.slice(1))) postSlugs.add(link.url.slice(1))
  }

  if (productSlugs.size > 0) {
    const { docs } = await payload.find({ collection: 'products', where: { slug: { in: Array.from(productSlugs) } }, limit: productSlugs.size, depth: 0 })
    const found = new Set(docs.map((d: any) => d.slug))
    for (const slug of productSlugs) if (!found.has(slug)) warnings.push(`Broken product link /product/${slug} — no matching product, left in place for manual review.`)
  }

  if (postSlugs.size > 0) {
    const [{ docs: posts }, { docs: pages }] = await Promise.all([
      payload.find({ collection: 'blog-posts', where: { slug: { in: Array.from(postSlugs) } }, limit: postSlugs.size, depth: 0 }),
      payload.find({ collection: 'pages', where: { slug: { in: Array.from(postSlugs) } }, limit: postSlugs.size, depth: 0 }).catch(() => ({ docs: [] })),
    ])
    const found = new Set([...posts.map((d: any) => d.slug), ...pages.map((d: any) => d.slug)])
    for (const slug of postSlugs) if (!found.has(slug)) warnings.push(`Broken internal link /${slug} — no matching post or page, left in place for manual review.`)
  }

  for (const p of extractLinkPlaceholders(content)) warnings.push(`Unresolved link placeholder: <!-- LINK: ${p} --> — left as-is, needs a real slug.`)
}

async function resolveRelatedProducts(payload: any, names: string[], warnings: string[]): Promise<number[]> {
  const ids: number[] = []
  for (const name of names) {
    const { docs } = await payload.find({ collection: 'products', where: { name: { like: name } }, limit: 10, depth: 0 })
    if (docs.length === 0) { warnings.push(`Could not resolve relatedProducts entry "${name}" to a product — skipped.`); continue }
    // "like" is a substring match and doesn't rank exact matches first (e.g. "BPC-157"
    // would otherwise resolve to "BPC-157 Spray"), so prefer an exact case-insensitive
    // name match over the first substring hit.
    const exact = docs.find((d: any) => d.name?.toLowerCase() === name.toLowerCase())
    ids.push((exact || docs[0]).id)
  }
  return ids
}

async function run() {
  const [, , jsonArg, imageArg] = process.argv
  if (!jsonArg) { console.error('Usage: npm run import:blog -- <path-to-draft.json> [path-to-image]'); process.exit(1) }

  const jsonPath = path.resolve(process.cwd(), jsonArg)
  const draft: Draft = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
  const warnings: string[] = []
  const payload = await getPayload({ config: configPromise })

  const slug = draft.slug || draft.title.toLowerCase().replace(/\s+/g, '-')
  const { docs: existingPostDocs } = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
  const existingPost = existingPostDocs[0]
  const existingImageId = existingPost?.featuredImage
    ? (typeof existingPost.featuredImage === 'object' ? existingPost.featuredImage.id : existingPost.featuredImage)
    : null

  // Replace the existing upload in place on re-import instead of creating a new
  // blog-media doc each time (which would otherwise pile up as filename-1, -2, ...).
  const imagePath = findImageFile(jsonPath, imageArg ? path.resolve(process.cwd(), imageArg) : undefined)
  if (!imagePath) { console.error(`No featured image found next to ${jsonPath} ... and none passed as second argument.`); process.exit(1) }
  const imageData = fs.readFileSync(imagePath)
  const imageFile = { data: imageData, mimetype: MIME_BY_EXT[path.extname(imagePath).toLowerCase()] || 'image/webp', name: path.basename(imagePath), size: imageData.length }
  const featuredImage = existingImageId
    ? await payload.update({ collection: 'blog-media', id: existingImageId, data: { alt: draft.featuredImageAlt }, file: imageFile })
    : await payload.create({ collection: 'blog-media', data: { alt: draft.featuredImageAlt }, file: imageFile })

  await verifyInternalLinks(payload, draft.content, warnings)
  const content = parseContentMarkdown(draft.content)
  const relatedProductIds = draft.relatedProducts?.length ? await resolveRelatedProducts(payload, draft.relatedProducts, warnings) : []

  // Fixed single author — resolve to the one admin account (or however this
  // project designates its "editorial" account).
  const { docs: admins } = await payload.find({ collection: 'users', where: { role: { equals: 'admin' } }, limit: 1 })
  if (admins.length === 0) { console.error('No admin user found — create/designate the author account before importing.'); process.exit(1) }
  const authorUser = admins[0]

  const postData: any = {
    title: draft.title, slug, author: authorUser.id, featuredImage: featuredImage.id,
    excerpt: draft.excerpt, content,
    publishedAt: draft.publishedAt ? new Date(draft.publishedAt).toISOString() : new Date().toISOString(),
    status: draft.status === 'published' ? 'published' : 'draft',
    category: draft.category, relatedProducts: relatedProductIds,
    readTime: draft.readTime || '',
    keyTakeaways: (draft.keyTakeaways || []).map((text) => ({ text })),
    faqs: draft.faqs || [], references: draft.references || [],
    focusKeyphrase: draft.focusKeyphrase || '', keywords: draft.keywords || '',
  }
  if (draft.metaTitle || draft.metaDescription) {
    postData.meta = { ...(draft.metaTitle ? { title: draft.metaTitle } : {}), ...(draft.metaDescription ? { description: draft.metaDescription } : {}) }
  }

  if (existingPost) {
    await payload.update({ collection: 'blog-posts', id: existingPost.id, data: postData })
    console.log(`Updated existing blog post: ${slug}`)
  } else {
    await payload.create({ collection: 'blog-posts', data: postData })
    console.log(`Created blog post: ${slug}`)
  }

  if (warnings.length > 0) { console.log('\nWarnings (review before publishing):'); for (const w of warnings) console.log(`  - ${w}`) }
  console.log(`\nStatus: ${postData.status}. View it at: /${slug}`)
  process.exit(0)
}

run().catch((err) => { console.error(err); process.exit(1) })
```

Add to `package.json`:
```json
"import:blog": "cross-env NODE_OPTIONS=--no-deprecation tsx --env-file=.env.local scripts/import-blog-post.ts",
```

**The script never fabricates or silently guesses.** Broken product links,
broken post/page links, unresolved `<!-- LINK -->` placeholders, and
unmatched `relatedProducts` names are all reported as warnings and left
in place for manual review — never auto-corrected or dropped silently.
Keep that behavior; it's what makes the pipeline trustworthy for bulk
content creation.

---

## 13. Post-setup verification checklist

Have the agent verify all of this before calling the setup done:

1. `payload generate:types` runs clean; `BlogPost`, `BlogMedia`,
   `BlogAuthorProfile` types exist.
2. Admin panel shows the new `Blog Posts`, `Blog Media` collections and the
   `Blog Author Profile` global, all fields visible and editable.
3. Create one test post directly in the admin UI (or via the import script
   with a throwaway JSON draft) with a featured image, at least one FAQ,
   one related product, and one `content` paragraph — confirm:
   - `/‹slug›` renders the post (not a 404) once `status` is `published`.
   - `/‹slug›` returns "not found" while `status` is `draft` (confirms
     access control and the frontend query are both correctly filtering).
   - View source / fetch the page and confirm a `<script type="application/ld+json">`
     block exists containing `BlogPosting`, `BreadcrumbList`, and (if FAQs/
     related products were set) `FAQPage` and `Product` entries — check
     image URLs inside it are NOT double-encoded (no `%2520`).
   - `/blog` listing page includes the new post.
   - `sitemap.xml` includes `/‹slug›`.
   - Delete the test post + its blog-media doc afterward.
4. Confirm `blog-media` uploads actually land wherever the project's other
   media lives (R2/S3 bucket, or intentionally local disk) — not
   accidentally split across two different storage backends.
5. Run the project's full `next build` and confirm no new TypeScript errors
   were introduced by any of the above.
