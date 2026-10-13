import fs from 'node:fs'
import path from 'node:path'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { getPayload, Payload } from 'payload'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import config from '@/payload.config'

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}))
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'unauthenticated', data: null }) }))
vi.mock('@/app/(frontend)/actions/cart', () => ({
  syncCartToPayload: async () => {},
  getProductsFromAffiliateCart: async () => [],
}))

import { CartDrawer } from '@/components/cart/CartDrawer'
import { CartClient } from '@/app/(frontend)/(shop)/cart/CartClient'
import { SearchOverlay } from '@/components/shared/SearchOverlay'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { useCartStore } from '@/lib/cart/store'
import { categoryShopHref, productInCategory } from '@/lib/shop/categoryLinks'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

const render = (element: React.ReactElement) =>
  renderToStaticMarkup(React.createElement(NextIntlClientProvider as React.ComponentType<any>, { locale: 'en', messages }, element))

// The cart drawer and the cart page read the cart store, which a server-style render cannot see, so they are
// rendered the way a browser does it.
const mount = async (element: React.ReactElement) => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  await act(async () => {
    root.render(React.createElement(NextIntlClientProvider as React.ComponentType<any>, { locale: 'en', messages }, element))
  })
  return { html: host.innerHTML, unmount: () => act(async () => root.unmount()) }
}

// What the page sends to an anchor in the DOM: the ampersands in a name are written as &amp; in markup.
const inMarkup = (text: string) => text.replace(/&/g, '&amp;')
const hrefsIn = (html: string) => [...html.matchAll(/href="(\/shop\?category=[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&'))

describe('where categories are offered, against the real Payload data', () => {
  let categories: { id: number; name: string; slug: string; description: string }[] = []

  beforeAll(async () => {
    const payload: Payload = await getPayload({ config: await config })
    const res = await payload.find({
      collection: 'categories',
      where: { isVisible: { equals: true } },
      sort: 'sortOrder',
      limit: 100,
      overrideAccess: true,
    })
    categories = res.docs.map((doc: any) => ({ id: doc.id, name: doc.name, slug: doc.slug || '', description: doc.description || '' }))
  }, 180_000)

  beforeEach(() => {
    ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true
    class NoopObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    ;(globalThis as any).IntersectionObserver = (globalThis as any).IntersectionObserver || NoopObserver
    ;(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver || NoopObserver
    window.matchMedia =
      window.matchMedia ||
      ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as any)
    useCartStore.setState({ items: [], isOpen: true })
  })

  it('the cart drawer shortcuts are the first visible categories from Payload', async () => {
    const { html, unmount } = await mount(React.createElement(CartDrawer, { categories }))
    expect(html).toContain('Your bag is empty') // the empty state really rendered
    expect(hrefsIn(html)).toEqual(categories.slice(0, 3).map((c) => categoryShopHref(c.name)))
    for (const cat of categories.slice(0, 3)) expect(html).toContain(inMarkup(getCategoryDisplayName(cat.name)))
    expect(html).not.toContain('Weight+Loss')
    expect(html).not.toContain('Cellular+Repair')
    await unmount()
  })

  it('the cart drawer shows no shortcuts section when there are no categories', async () => {
    const { html, unmount } = await mount(React.createElement(CartDrawer, { categories: [] }))
    expect(html).toContain('Your bag is empty') // the empty state really rendered, so this is not a blank page
    expect(html).not.toContain('Featured Research Areas')
    expect(hrefsIn(html)).toEqual([])
    await unmount()
  })

  it('the empty cart page shortcuts are the first visible categories from Payload', async () => {
    const { html, unmount } = await mount(React.createElement(CartClient, { categories }))
    expect(html).toContain('Popular Research Areas') // the empty cart state really rendered
    expect(hrefsIn(html)).toEqual(categories.slice(0, 3).map((c) => categoryShopHref(c.name)))
    expect(html).not.toContain('Weight+Loss')
    await unmount()
  })

  it('the search modal lists every category, with links that open the shop at its products', () => {
    const html = render(React.createElement(SearchOverlay, { isOpen: true, onClose: () => {}, categories }))
    // the list of categories (it used to stop at six, which hid the last ones)
    expect(hrefsIn(html)).toEqual(categories.slice(0, 12).map((c) => categoryShopHref(c.name)))
    expect(categories.length).toBeGreaterThan(6)
    for (const cat of categories) {
      const label = inMarkup(getCategoryDisplayName(cat.name))
      // once as a tab and once in the list
      expect(html.split(label).length - 1, cat.name).toBeGreaterThanOrEqual(2)
    }
    expect(html).toContain('Nasal Sprays')
  })

  it('the home page category cards link to the shop at its products', () => {
    const html = render(React.createElement(CategoriesSection, { categories }))
    expect(hrefsIn(html)).toEqual(categories.map((c) => categoryShopHref(c.name)))
  })
})

describe('search result category tabs', () => {
  const withList = (names: string[]) => ({ categoryList: names.map((name) => ({ name })), categories: names.join(' ') })

  it('match a result by its own category list, exactly', () => {
    expect(productInCategory(withList(['Nasal Sprays']), 'Nasal Sprays')).toBe(true)
    expect(productInCategory(withList(['GLP-1 & Metabolic Research Compounds']), 'Nasal Sprays')).toBe(false)
    // a part of a name is not the category
    expect(productInCategory(withList(['GLP-1 & Metabolic Research Compounds']), 'GLP-1')).toBe(false)
  })

  it('match a result in more than one category', () => {
    const product = withList(['Healing & Recovery Research Compounds', 'Nasal Sprays'])
    expect(productInCategory(product, 'Nasal Sprays')).toBe(true)
    expect(productInCategory(product, 'Healing & Recovery Research Compounds')).toBe(true)
  })

  it('fall back to the joined names when the search sent no list', () => {
    expect(productInCategory({ categories: 'Nasal Sprays' }, 'nasal sprays')).toBe(true)
    expect(productInCategory({ categories: '' }, 'Nasal Sprays')).toBe(false)
    expect(productInCategory({}, 'Nasal Sprays')).toBe(false)
  })
})
