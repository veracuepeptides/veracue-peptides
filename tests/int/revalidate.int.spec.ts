// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'

// next/cache is replaced so the real collection hooks can be run and the exact paths they refresh recorded.
// Nothing here touches the database or any live content.
const revalidatePath = vi.hoisted(() => vi.fn())
const revalidateTag = vi.hoisted(() => vi.fn())
vi.mock('next/cache', () => ({ revalidatePath, revalidateTag }))

import { Products } from '@/collections/Products'
import { BlogPosts } from '@/collections/BlogPosts'

const refreshed = () => revalidatePath.mock.calls.map(([path]) => path as string)
const only = (prefix: string) => refreshed().filter((path) => path.startsWith(prefix)).sort()
const run = (hook: unknown, args: Record<string, unknown>) => (hook as (a: unknown) => unknown)(args)

beforeEach(() => revalidatePath.mockClear())

describe('saving a product refreshes only the pages it affects', () => {
  const afterChange = Products.hooks!.afterChange![0]
  const afterDelete = Products.hooks!.afterDelete![0]

  it('refreshes that product page, the shop listing and the homepage', () => {
    run(afterChange, { doc: { slug: 'snap8' }, previousDoc: { slug: 'snap8' } })
    expect(refreshed()).toEqual(expect.arrayContaining(['/product/snap8', '/shop', '/']))
  })

  it('leaves every other product page and every blog page cached', () => {
    run(afterChange, { doc: { slug: 'snap8' }, previousDoc: { slug: 'snap8' } })
    expect(only('/product/')).toEqual(['/product/snap8'])
    expect(refreshed()).not.toContain('/product/[slug]')
    expect(only('/blog')).toEqual([])
  })

  it('also refreshes the old address when the slug was changed', () => {
    run(afterChange, { doc: { slug: 'new-name' }, previousDoc: { slug: 'old-name' } })
    expect(only('/product/')).toEqual(['/product/new-name', '/product/old-name'])
  })

  it('refreshes a newly created product (no previous version)', () => {
    run(afterChange, { doc: { slug: 'brand-new' } })
    expect(only('/product/')).toEqual(['/product/brand-new'])
    expect(refreshed()).toEqual(expect.arrayContaining(['/shop', '/']))
  })

  it('refreshes the page, the shop and the homepage when a product is deleted', () => {
    run(afterDelete, { doc: { slug: 'snap8' } })
    expect(refreshed()).toEqual(expect.arrayContaining(['/product/snap8', '/shop', '/']))
  })

  it('keeps the sitemap and llms files fresh', () => {
    run(afterChange, { doc: { slug: 'snap8' }, previousDoc: { slug: 'snap8' } })
    expect(refreshed()).toEqual(expect.arrayContaining(['/sitemap.xml', '/llms.txt', '/llms-full.txt']))
  })

  it('returns the saved document, as Payload requires of an afterChange hook', () => {
    const doc = { slug: 'snap8' }
    expect(run(afterChange, { doc, previousDoc: doc })).toBe(doc)
  })
})

describe('saving a blog post refreshes only the pages it affects', () => {
  const afterChange = BlogPosts.hooks!.afterChange![0]
  const afterDelete = BlogPosts.hooks!.afterDelete![0]

  it('refreshes that post, the /blog listing and the homepage', () => {
    run(afterChange, { doc: { slug: 'ghrp-2-vs-pralmorelin' }, previousDoc: { slug: 'ghrp-2-vs-pralmorelin' } })
    expect(refreshed()).toEqual(expect.arrayContaining(['/blog/ghrp-2-vs-pralmorelin', '/blog', '/']))
  })

  it('leaves every other post and every product page cached', () => {
    run(afterChange, { doc: { slug: 'ghrp-2-vs-pralmorelin' }, previousDoc: { slug: 'ghrp-2-vs-pralmorelin' } })
    expect(only('/blog/')).toEqual(['/blog/ghrp-2-vs-pralmorelin'])
    expect(refreshed()).not.toContain('/blog/[slug]')
    expect(only('/product')).toEqual([])
    expect(refreshed()).not.toContain('/shop')
  })

  it('also refreshes the old address when the slug was changed', () => {
    run(afterChange, { doc: { slug: 'new-title' }, previousDoc: { slug: 'old-title' } })
    expect(only('/blog/')).toEqual(['/blog/new-title', '/blog/old-title'])
  })

  it('refreshes the post and the listing when a post is deleted', () => {
    run(afterDelete, { doc: { slug: 'some-post' } })
    expect(refreshed()).toEqual(expect.arrayContaining(['/blog/some-post', '/blog', '/']))
  })

  it('returns the saved document, as Payload requires of an afterChange hook', () => {
    const doc = { slug: 'some-post' }
    expect(run(afterChange, { doc, previousDoc: doc })).toBe(doc)
  })
})
