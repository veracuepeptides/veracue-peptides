import { describe, expect, it } from 'vitest'
import {
  DEFAULT_PAYMENT_METHODS,
  availablePaymentMethods,
  normalizePaymentMethods,
  type PaymentMethodRow,
} from '@/lib/payments/methods'
import { CARD_STATEMENT_NAME, CARD_STATEMENT_NOTE } from '@/lib/payments/statement'

const row = (key: PaymentMethodRow['key'], enabled = true, label = `${key} label`, description = `${key} description`): PaymentMethodRow => ({
  key,
  enabled,
  label,
  description,
})

describe('payment methods: normalizing the stored setting', () => {
  it('uses the defaults, which match the old checkout, when nothing is stored', () => {
    for (const empty of [undefined, null, [], 'nope', 42]) {
      expect(normalizePaymentMethods(empty)).toEqual(DEFAULT_PAYMENT_METHODS)
    }
    expect(DEFAULT_PAYMENT_METHODS.map((m) => m.key)).toEqual(['veracuepay', 'zelle', 'stripe_link'])
    expect(DEFAULT_PAYMENT_METHODS.every((m) => m.enabled)).toBe(true)
  })

  it('keeps the stored order and the on/off flag', () => {
    const out = normalizePaymentMethods([row('zelle'), row('veracuepay', false), row('stripe_link')])
    expect(out.map((m) => [m.key, m.enabled])).toEqual([
      ['zelle', true],
      ['veracuepay', false],
      ['stripe_link', true],
    ])
  })

  it('drops unknown methods and repeats, so a bad row can never add a payment path', () => {
    const out = normalizePaymentMethods([
      row('zelle'),
      { key: 'circoflows', enabled: true, label: 'x', description: 'y' },
      { key: 'zelle', enabled: false, label: 'second zelle', description: 'z' },
      null,
      'junk',
    ])
    expect(out.map((m) => m.key)).toEqual(['zelle'])
    expect(out[0].enabled).toBe(true)
  })

  it('treats only an explicit "off" as off, and fills blank wording from the defaults', () => {
    const out = normalizePaymentMethods([{ key: 'zelle', label: '  ', description: '' }])
    expect(out[0].enabled).toBe(true)
    expect(out[0].label).toBe('Zelle')
    expect(out[0].description).toBe(DEFAULT_PAYMENT_METHODS.find((m) => m.key === 'zelle')!.description)
  })

  it('does not offer a method that is missing from the stored list', () => {
    const out = normalizePaymentMethods([row('zelle')])
    expect(out.map((m) => m.key)).toEqual(['zelle'])
  })
})

describe('payment methods: what a customer can use', () => {
  const all = [row('veracuepay'), row('zelle'), row('stripe_link')]

  it('lists the methods that are on, in order', () => {
    const rows = [row('zelle'), row('veracuepay', false), row('stripe_link')]
    expect(availablePaymentMethods(rows, { veracuepayConfigured: true }).map((m) => m.key)).toEqual(['zelle', 'stripe_link'])
  })

  it('hides the card option where the gateway is not configured, even when it is on', () => {
    expect(availablePaymentMethods(all, { veracuepayConfigured: false }).map((m) => m.key)).toEqual(['zelle', 'stripe_link'])
    expect(availablePaymentMethods(all, { veracuepayConfigured: true }).map((m) => m.key)).toEqual(['veracuepay', 'zelle', 'stripe_link'])
  })

  it('can come out empty, which checkout shows as "payment not available"', () => {
    const allOff = [row('veracuepay', false), row('zelle', false), row('stripe_link', false)]
    expect(availablePaymentMethods(allOff, { veracuepayConfigured: true })).toEqual([])
  })
})

describe('card statement note', () => {
  it('names the statement descriptor exactly and uses no em dash', () => {
    expect(CARD_STATEMENT_NAME).toBe('Kaivora LLC')
    expect(CARD_STATEMENT_NOTE).toContain('"Kaivora LLC"')
    expect(CARD_STATEMENT_NOTE).not.toMatch(/[–—]/)
  })
})
