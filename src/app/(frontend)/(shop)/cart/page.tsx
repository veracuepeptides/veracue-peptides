import React from 'react'
import { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { CartClient } from './CartClient'
import { getVisibleCategories } from '@/app/(frontend)/actions/categories'

// Never cached: the cart is per visitor and must always reflect their latest items and prices. Without
// this, the page would inherit the long lifetime of the shared header cache (see actions/categories.ts).
export const dynamic = 'force-dynamic'

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
  // Cached, like the header's list. Used for the category shortcuts when the cart is empty.
  const categories = await getVisibleCategories().catch(() => [])
  return (
    <div className="bg-[#f0efeb] min-h-screen">
      <div className="pt-24 sm:pt-32 lg:pt-40 pb-20">
        <NextIntlClientProvider messages={pageMessages}>
          <CartClient categories={categories} />
        </NextIntlClientProvider>
      </div>
    </div>
  )
}
