import React from 'react'
import { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { CheckoutClient } from './CheckoutClient'

// Never cached: checkout is per visitor and must always render fresh. Without this, the page would
// inherit the long lifetime of the shared header cache (see actions/categories.ts).
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('checkout')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  }
}

export default async function CheckoutPage() {
  const pageMessages = pickMessages(await getMessages(), [
    'checkout.checkoutClient',
    'checkout.couponSection',
  ])
  return (
    <NextIntlClientProvider messages={pageMessages}>
      <CheckoutClient />
    </NextIntlClientProvider>
  )
}
