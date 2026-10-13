import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// The cart icon on a product card used to add the product straight to the cart as a "Default" variant,
// because a card cannot know which size the shopper wants. It must now only open the product page.

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn() }) }))
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'unauthenticated', data: null }) }))
// Syncing the cart needs a server; there is none here.
vi.mock('@/app/(frontend)/actions/cart', () => ({ syncCartToPayload: async () => {} }))

import { ProductCard } from '@/components/shared/ProductCard'
import { useCartStore } from '@/lib/cart/store'

const product = (extra: Record<string, unknown> = {}) => ({
  id: '36',
  name: 'GLP-T',
  slug: 'glp-t',
  image: '/veracue-images/vp-product-vial.webp',
  price: 65.99,
  category: 'GLP-1',
  ...extra,
})

const render = async (props: Record<string, unknown>) => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  await act(async () => {
    root.render(React.createElement(ProductCard, props as any))
  })
  return { host, unmount: () => act(async () => root.unmount()) }
}

describe('product card cart icon', () => {
  beforeEach(() => {
    ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true
    class NoopObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    ;(globalThis as any).IntersectionObserver = (globalThis as any).IntersectionObserver || NoopObserver
    window.matchMedia =
      window.matchMedia ||
      ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as any)
    push.mockClear()
    useCartStore.setState({ items: [], isOpen: false })
  })

  for (const hasVariants of [false, true, undefined]) {
    it(`opens the product page and adds nothing (hasVariants: ${String(hasVariants)})`, async () => {
      const { host, unmount } = await render({ product: product({ hasVariants }), compact: true })
      const button = host.querySelector('button[aria-label="Choose options"]') as HTMLButtonElement
      expect(button).toBeTruthy()
      await act(async () => {
        button.click()
      })
      expect(push).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledWith('/product/glp-t')
      expect(useCartStore.getState().items).toHaveLength(0)
      expect(useCartStore.getState().isOpen).toBe(false)
      await unmount()
    })
  }

  it('no longer offers an "Add to cart" button on the card', async () => {
    const { host, unmount } = await render({ product: product() })
    expect(host.querySelector('button[aria-label="Add to cart"]')).toBeNull()
    await unmount()
  })
})
