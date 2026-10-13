import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, it } from 'vitest'
import { generateOrderInvoiceHtml } from '@/lib/emails/generateOrderEmail'
import { OrderConfirmationClient } from '@/app/(frontend)/(shop)/order-confirmation/[id]/OrderConfirmationClient'

// Card orders (VeracuePay) tell the customer how the charge reads on their bank statement. The note
// must not appear for other payment methods, nor in the "payment failed" email, where there is no charge.

const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../messages/en.json'), 'utf8'))

const emailOrder = (paymentMethod: string, paymentStatus: string) => ({
  id: 4101,
  orderNumber: '1101',
  guestEmail: 'customer@example.com',
  customerFirstName: 'Test',
  customerLastName: 'Customer',
  paymentMethod,
  paymentStatus,
  items: [],
  subtotal: 100,
  shippingTotal: 25,
  feeTotal: 5,
  total: 130,
  shippingAddress: { line1: '1 Test St', city: 'Boston', state: 'MA', postalCode: '02118', country: 'US' },
})

const confirmationOrder = (paymentMethod: string, paymentStatus: string) => ({
  id: '1101',
  orderId: '4101',
  customerName: 'Test Customer',
  email: 'customer@example.com',
  shippingAddress: { line1: '1 Test St', city: 'Boston', state: 'MA', zip: '02118', country: 'US' },
  estimatedDeliveryType: 'standard' as const,
  items: [],
  subtotal: 100,
  shipping: 25,
  processingFee: 5,
  total: 130,
  paymentMethod,
  paymentStatus,
})

const page = (paymentMethod: string, paymentStatus: string) =>
  renderToStaticMarkup(
    React.createElement(
      NextIntlClientProvider as React.ComponentType<any>,
      { locale: 'en', messages },
      React.createElement(OrderConfirmationClient, { order: confirmationOrder(paymentMethod, paymentStatus) as any }),
    ),
  )

describe('card statement note in the order email', () => {
  it('is shown for a card order', async () => {
    const html = await generateOrderInvoiceHtml(emailOrder('veracuepay', 'captured'), undefined, undefined, 'success')
    expect(html).toContain('Kaivora LLC')
    expect(html).toContain('About This Charge')
  })

  it('is not shown when the payment failed, because there is no charge', async () => {
    const html = await generateOrderInvoiceHtml(emailOrder('veracuepay', 'unpaid'), undefined, undefined, 'failed')
    expect(html).not.toContain('Kaivora LLC')
  })

  it('is not shown for Zelle or the Stripe payment link', async () => {
    for (const method of ['zelle', 'stripe_link']) {
      const html = await generateOrderInvoiceHtml(emailOrder(method, 'unpaid'), undefined, undefined, 'success')
      expect(html).not.toContain('Kaivora LLC')
    }
  })
})

describe('card statement note on the order confirmation page', () => {
  it('is shown for a card order, whether or not payment has been verified yet', () => {
    expect(page('veracuepay', 'captured')).toContain('Kaivora LLC')
    expect(page('veracuepay', 'unpaid')).toContain('Kaivora LLC')
  })

  it('is not shown for other payment methods', () => {
    expect(page('zelle', 'unpaid')).not.toContain('Kaivora LLC')
    expect(page('stripe_link', 'unpaid')).not.toContain('Kaivora LLC')
  })
})
