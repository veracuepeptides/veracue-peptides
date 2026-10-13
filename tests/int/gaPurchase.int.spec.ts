import fs from 'node:fs'
import path from 'node:path'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { NextIntlClientProvider } from 'next-intl'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Clearing the cart syncs it to the server; there is no server here.
vi.mock('@/app/(frontend)/actions/cart', () => ({ syncCartToPayload: async () => {} }))

import { OrderConfirmationClient } from '@/app/(frontend)/(shop)/order-confirmation/[id]/OrderConfirmationClient'

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

const order = (paymentStatus: string) => ({
  id: '1101',
  orderId: '4101',
  customerName: 'Test Customer',
  email: 'customer@example.com',
  shippingAddress: { line1: '1 Test St', city: 'Boston', state: 'MA', zip: '02118', country: 'US' },
  estimatedDeliveryType: 'standard' as const,
  items: [{ id: '9', name: 'GLP-T', variant: '10 mg', quantity: 2, price: 65.99, image: '/veracue-images/vp-product-vial.webp' }],
  subtotal: 131.98,
  shipping: 25,
  processingFee: 7.85,
  total: 164.83,
  couponCode: 'NEW10',
  paymentMethod: 'veracuepay' as const,
  paymentStatus,
})

const mount = async (data: ReturnType<typeof order>) => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  await act(async () => {
    root.render(
      React.createElement(
        NextIntlClientProvider as React.ComponentType<any>,
        { locale: 'en', messages },
        React.createElement(OrderConfirmationClient, { order: data as any }),
      ),
    )
  })
  return () => act(async () => root.unmount())
}

describe('GA4 purchase event on the order confirmation page', () => {
  const original = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  beforeEach(() => {
    ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    delete (window as any).dataLayer
    sessionStorage.clear()
    // jsdom has no IntersectionObserver or ResizeObserver; the page's scroll animations expect them.
    class NoopObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    ;(globalThis as any).IntersectionObserver = (globalThis as any).IntersectionObserver || NoopObserver
    ;(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver || NoopObserver
    window.matchMedia =
      window.matchMedia ||
      ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as any)
  })
  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = original
  })

  const purchases = () =>
    (((window as any).dataLayer as unknown[]) || [])
      .filter((e) => Object.prototype.toString.call(e) === '[object Arguments]')
      .map((e) => Array.from(e as ArrayLike<any>))
      .filter(([, name]) => name === 'purchase')

  it('queues one purchase in gtag format with the order total, shipping and line items', async () => {
    const unmount = await mount(order('captured'))
    const events = purchases()
    expect(events).toHaveLength(1)
    const [command, name, params] = events[0]
    expect([command, name]).toEqual(['event', 'purchase'])
    expect(params).toMatchObject({ transaction_id: '4101', value: 164.83, shipping: 25, currency: 'USD', coupon: 'NEW10' })
    expect(params.items).toEqual([{ item_id: '9', item_name: 'GLP-T', item_variant: '10 mg', price: 65.99, quantity: 2, index: 0 }])
    await unmount()
  })

  it('does not count the same order twice when the page is opened again', async () => {
    const first = await mount(order('captured'))
    await first()
    const second = await mount(order('captured'))
    expect(purchases()).toHaveLength(1)
    await second()
  })
})
