import fs from 'node:fs'
import path from 'node:path'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { NextIntlClientProvider } from 'next-intl'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  usePathname: () => '/checkout',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))
vi.mock('next-auth/react', () => ({ useSession: () => ({ status: 'unauthenticated', data: null }) }))
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: any) => React.createElement('a', { href, ...rest }, children),
}))
vi.mock('@stripe/stripe-js', () => ({ loadStripe: async () => null }))
vi.mock('@/app/(frontend)/(shop)/actions', () => ({
  verifyCoupon: async () => ({ valid: false }),
  getUserDefaultAddress: async () => null,
  getUserHBPoints: async () => 0,
  getUserAddresses: async () => [],
}))
vi.mock('@/app/(frontend)/actions/cart', () => ({
  syncCartToPayload: async () => undefined,
  getProductsFromAffiliateCart: async () => [],
}))
vi.mock('@/app/(frontend)/(shop)/checkout/actions', () => ({
  createPaymentIntent: async () => ({}),
  getShippingMethods: async () => [{ method: 'Standard Shipping', price: 25, estimatedDays: 5 }],
  getShippingCountries: async () => ['US'],
}))
// The pay button ends here with an error, so the test never tries to leave the page.
const createVeracuepayPayment = vi.fn(async () => ({ error: 'stopped by the test' }))
vi.mock('@/app/(frontend)/(shop)/checkout/veracuepayActions', () => ({
  createVeracuepayPayment: (...args: unknown[]) => (createVeracuepayPayment as any)(...args),
}))

import { CheckoutClient } from '@/app/(frontend)/(shop)/checkout/CheckoutClient'
import { useCartStore } from '@/lib/cart/store'

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

const sent = () =>
  ((window as any).dataLayer as ArrayLike<any>[])
    .map((entry) => Array.from(entry))
    .filter(([command]) => command === 'event')
    .map(([, name, params]) => ({ name: name as string, params }))

const setField = async (host: HTMLElement, name: string, value: string) => {
  const input = host.querySelector<HTMLInputElement>(`input[name="${name}"]`)
  expect(input, `input ${name}`).toBeTruthy()
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value)
    input!.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

const waitFor = async (check: () => boolean, label: string) => {
  for (let i = 0; i < 60; i++) {
    if (check()) return
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50))
    })
  }
  throw new Error(`timed out waiting for ${label}`)
}

describe('checkout analytics: the funnel steps between begin_checkout and purchase', () => {
  const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  beforeEach(() => {
    ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    delete (window as any).dataLayer
    sessionStorage.clear()
    class NoopObserver {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
    ;(globalThis as any).IntersectionObserver = (globalThis as any).IntersectionObserver || NoopObserver
    ;(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver || NoopObserver
    window.matchMedia =
      window.matchMedia ||
      ((query: string) => ({ matches: false, media: query, addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => false }) as any)
    window.scrollTo = vi.fn() as any
    globalThis.fetch = vi.fn(async (url: any) => {
      const body = String(url).includes('payment-methods')
        ? { methods: [{ key: 'veracuepay', label: 'Card', description: 'Pay by card' }] }
        : { fees: [] }
      return { ok: true, json: async () => body } as any
    }) as any
    useCartStore.setState({
      items: [
        {
          lineId: 'line-1',
          productId: '77',
          product: { id: '77', name: 'GLP-T', imageUrl: null, slug: 'glp-t' },
          variantSku: 'GLP-T-10',
          variantTitle: '10 mg',
          quantity: 2,
          priceSnapshot: 65.99,
        },
      ] as any,
      isOpen: false,
    })
  })
  afterEach(() => {
    if (originalId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId
    createVeracuepayPayment.mockClear()
  })

  it('sends add_shipping_info once the delivery details are in, and add_payment_info when the shopper pays', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    await act(async () => {
      root.render(
        React.createElement(NextIntlClientProvider as React.ComponentType<any>, { locale: 'en', messages }, React.createElement(CheckoutClient)),
      )
    })
    await waitFor(() => !!host.querySelector('input[name="email"]'), 'the checkout form')

    // begin_checkout is sent on arrival, and nothing later yet
    await waitFor(() => sent().some((e) => e.name === 'begin_checkout'), 'begin_checkout')
    expect(sent().map((e) => e.name)).toEqual(['begin_checkout'])

    // a partly filled form is not enough
    await setField(host, 'email', 'buyer@example.com')
    await setField(host, 'firstName', 'Test')
    await setField(host, 'address', '1 Main St')
    expect(sent().map((e) => e.name)).not.toContain('add_shipping_info')

    // the last required field completes the delivery details
    await setField(host, 'city', 'Austin')
    await setField(host, 'state', 'TX')
    await setField(host, 'zip', '78701')
    await setField(host, 'phone', '5125550100')
    await waitFor(() => sent().some((e) => e.name === 'add_shipping_info'), 'add_shipping_info')

    const shipping = sent().find((e) => e.name === 'add_shipping_info')!
    expect(shipping.params).toMatchObject({ currency: 'USD', shipping_tier: 'Standard Shipping' })
    expect(shipping.params.value).toBeCloseTo(131.98, 2)
    expect(shipping.params.items).toEqual([
      { item_id: '77', item_name: 'GLP-T', item_variant: '10 mg', price: 65.99, quantity: 2, index: 0 },
    ])

    // editing a field afterwards does not send it again
    await setField(host, 'city', 'Dallas')
    expect(sent().filter((e) => e.name === 'add_shipping_info')).toHaveLength(1)
    expect(sent().map((e) => e.name)).not.toContain('add_payment_info')

    // pressing the pay button with a valid form sends add_payment_info before the payment starts
    await waitFor(() => !!host.querySelector('input[name="paymentMethod"]'), 'the payment options')
    const pay = [...host.querySelectorAll('button')].find((b) => /place order/i.test(b.textContent || ''))
    expect(pay, 'the Place Order button').toBeTruthy()
    await act(async () => {
      pay!.click()
    })
    await waitFor(() => createVeracuepayPayment.mock.calls.length > 0, 'the payment request')
    const payment = sent().find((e) => e.name === 'add_payment_info')!
    expect(payment, 'add_payment_info').toBeTruthy()
    expect(payment.params).toMatchObject({ currency: 'USD', payment_type: 'veracuepay' })
    expect(sent().map((e) => e.name)).toEqual(['begin_checkout', 'add_shipping_info', 'add_payment_info'])

    await act(async () => root.unmount())
  }, 60_000)

  it('sends no add_payment_info when the form is incomplete', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const root = createRoot(host)
    await act(async () => {
      root.render(
        React.createElement(NextIntlClientProvider as React.ComponentType<any>, { locale: 'en', messages }, React.createElement(CheckoutClient)),
      )
    })
    await waitFor(() => !!host.querySelector('input[name="paymentMethod"]'), 'the payment options')
    const pay = [...host.querySelectorAll('button')].find((b) => /place order/i.test(b.textContent || ''))
    await act(async () => {
      pay!.click()
    })
    expect(createVeracuepayPayment).not.toHaveBeenCalled()
    expect(sent().map((e) => e.name)).not.toContain('add_payment_info')
    expect(sent().map((e) => e.name)).not.toContain('add_shipping_info')
    await act(async () => root.unmount())
  }, 60_000)
})
