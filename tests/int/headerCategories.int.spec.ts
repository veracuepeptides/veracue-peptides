import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { getPayload, Payload } from 'payload'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import config from '@/payload.config'

// Stand-ins for the parts of the page that need a browser session or a running server.
vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  usePathname: () => '/shop',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'unauthenticated', data: null }) }))
vi.mock('@/app/(frontend)/actions/cart', () => ({ syncCartToPayload: async () => {} }))

import { ClientHeader } from '@/components/shared/ClientHeader'
import { CATALOG_ANCHOR, categoryIconKey, categoryShopHref } from '@/lib/shop/categoryLinks'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

describe('category links', () => {
  it('use the full category name and end in the shop anchor', () => {
    expect(categoryShopHref('GLP-1 & Metabolic Research Compounds')).toBe(
      '/shop?category=GLP-1%20%26%20Metabolic%20Research%20Compounds#catalog-browser',
    )
    expect(CATALOG_ANCHOR).toBe('catalog-browser')
  })

  it('pick an icon from the wording, with a neutral default for anything new', () => {
    expect(categoryIconKey('Nasal Sprays')).toBe('spray')
    expect(categoryIconKey('GLP-1 & Metabolic Research Compounds')).toBe('metabolic')
    expect(categoryIconKey('Healing & Recovery Research Compounds')).toBe('healing')
    expect(categoryIconKey('Longevity & Anti-Aging Research Compounds')).toBe('longevity')
    expect(categoryIconKey('Cosmetic & Skin Research Compounds')).toBe('skin')
    expect(categoryIconKey('Cognitive & Nootropic Research Compounds')).toBe('cognitive')
    expect(categoryIconKey('Growth Hormone Secretagogue Research Compounds')).toBe('growth')
    expect(categoryIconKey('Sexual & Hormonal Research Compounds')).toBe('hormonal')
    expect(categoryIconKey('Something Brand New')).toBe('default')
  })
})

describe('the header categories, against the real Payload data', () => {
  let payload: Payload
  let categories: any[] = []

  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    // The same query the header's server component uses (see getVisibleCategories).
    const res = await payload.find({
      collection: 'categories',
      where: { isVisible: { equals: true } },
      sort: 'sortOrder',
      limit: 100,
      overrideAccess: true,
    })
    categories = res.docs.map((doc: any) => ({ id: doc.id, name: doc.name, slug: doc.slug || '', description: doc.description || '' }))
  }, 180_000)

  it('has visible categories to show', () => {
    expect(categories.length).toBeGreaterThan(0)
  })

  it('every link resolves, the way the shop filters, to exactly its own category', async () => {
    for (const cat of categories) {
      const url = new URL(categoryShopHref(cat.name), 'https://example.test')
      expect(url.pathname).toBe('/shop')
      expect(url.hash).toBe(`#${CATALOG_ANCHOR}`)
      const wanted = url.searchParams.getAll('category')
      expect(wanted).toEqual([cat.name])
      // the lookup getShopProducts performs for the category parameter
      const matched = await payload.find({
        collection: 'categories',
        where: { or: [{ name: { in: wanted } }, { slug: { in: wanted } }] },
        limit: 10,
        overrideAccess: true,
      })
      expect(matched.docs.map((d: any) => d.id), cat.name).toEqual([cat.id])
    }
  })

  it('the rendered header lists those categories, in order, and nothing that is not in Payload', () => {
    const html = renderToStaticMarkup(
      React.createElement(
        NextIntlClientProvider as React.ComponentType<any>,
        { locale: 'en', messages },
        React.createElement(ClientHeader, { categories } as any),
      ),
    )
    const links = [...html.matchAll(/<a[^>]+href="(\/shop\?category=[^"#]*#catalog-browser)"/g)].map((m) => m[1].replace(/&amp;/g, '&'))
    const expected = categories.slice(0, 12).map((cat) => categoryShopHref(cat.name))
    // the dropdown's links, in Payload's order (the mobile menu may repeat them further down the page)
    expect(links.slice(0, expected.length)).toEqual(expected)
    for (const cat of categories) {
      expect(html, cat.name).toContain(getCategoryDisplayName(cat.name).replace(/&/g, '&amp;'))
    }
    // tiles that used to be hard-coded and are not categories in Payload
    for (const stale of ['Energy &amp; Biogenesis', 'Performance &amp; Energy', 'GH Secretagogues', 'Cognitive &amp; Focus']) {
      expect(html).not.toContain(stale)
    }
  })
})
