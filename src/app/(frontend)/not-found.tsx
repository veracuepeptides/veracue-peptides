import type { Metadata } from 'next'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { NotFoundClient } from '@/components/shared/NotFoundClient'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default async function NotFound() {
  const pageMessages = pickMessages(await getMessages(), ['notFound'])
  return (
    <NextIntlClientProvider messages={pageMessages}>
      <NotFoundClient />
    </NextIntlClientProvider>
  )
}
