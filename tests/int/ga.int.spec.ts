import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { trackAddToCart, trackEvent } from '@/lib/analytics/ga'

// gtag.js only acts on dataLayer entries that are an `arguments` object (what its own gtag() pushes).
// A plain object is the Google Tag Manager format and is ignored, which is why these events never
// reached GA4 before.
const isArguments = (value: unknown) => Object.prototype.toString.call(value) === '[object Arguments]'

describe('GA4 events', () => {
  const original = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  beforeEach(() => {
    delete (window as any).dataLayer
  })
  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = original
  })

  it('queues an event in the format gtag.js reads', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    trackEvent('purchase', { transaction_id: '1101', value: 130, currency: 'USD' })
    const layer = (window as any).dataLayer as unknown[]
    expect(layer).toHaveLength(1)
    expect(isArguments(layer[0])).toBe(true)
    expect(Array.from(layer[0] as ArrayLike<unknown>)).toEqual(['event', 'purchase', { transaction_id: '1101', value: 130, currency: 'USD' }])
  })

  it('does nothing when no measurement id is configured', () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    trackEvent('purchase', { value: 1 })
    expect((window as any).dataLayer).toBeUndefined()
  })

  it('keeps events already waiting in the queue', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    ;(window as any).dataLayer = ['existing']
    trackEvent('view_item', {})
    expect((window as any).dataLayer).toHaveLength(2)
    expect((window as any).dataLayer[0]).toBe('existing')
  })

  it('builds an add_to_cart event with the line total', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    trackAddToCart({ id: 42, name: 'GLP-T', price: 65.99, quantity: 3, variant: '10 mg' })
    const [command, name, params] = Array.from((window as any).dataLayer[0] as ArrayLike<any>)
    expect([command, name]).toEqual(['event', 'add_to_cart'])
    expect(params.currency).toBe('USD')
    expect(params.value).toBeCloseTo(197.97, 2)
    expect(params.items).toEqual([{ item_id: '42', item_name: 'GLP-T', item_variant: '10 mg', price: 65.99, quantity: 3 }])
  })

  it('defaults to a quantity of 1 and leaves out an empty variant', () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-TEST123456'
    trackAddToCart({ id: 'abc', name: 'Needles', price: 9.9 })
    const params = Array.from((window as any).dataLayer[0] as ArrayLike<any>)[2]
    expect(params.items[0]).toEqual({ item_id: 'abc', item_name: 'Needles', price: 9.9, quantity: 1 })
  })
})
