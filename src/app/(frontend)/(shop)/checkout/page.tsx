import React from 'react'
import { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { CheckoutClient } from './CheckoutClient'

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
