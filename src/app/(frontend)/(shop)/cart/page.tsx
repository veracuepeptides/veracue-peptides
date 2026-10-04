import React from 'react'
import { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { CartClient } from './CartClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cartPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  }
}

export default async function CartPage() {
  const pageMessages = pickMessages(await getMessages(), ['checkout.cartClient'])
  return (
    <div className="bg-[#f0efeb] min-h-screen">
      <div className="pt-24 sm:pt-32 lg:pt-40 pb-20">
        <NextIntlClientProvider messages={pageMessages}>
          <CartClient />
        </NextIntlClientProvider>
      </div>
    </div>
  )
}
