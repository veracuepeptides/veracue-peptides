import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Script from 'next/script'
import { AuthSessionProvider } from '@/components/providers/AuthSessionProvider'
import { fontVariables } from '@/lib/fonts'
import { pickMessages } from '@/lib/i18n/pickMessages'
import '@/app/globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'),
  title: { default: 'Veracue Peptides', template: '%s | Veracue Peptides' },
  description: 'Laboratory Research Peptides & Analytical Standards',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: { index: false, follow: false },
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Auth pages only ever need the small 'auth' namespace (~2.7KB), not the full
  // site-wide messages file. See src/lib/i18n/pickMessages.ts.
  const messages = pickMessages(await getMessages(), ['auth'])

  return (
    <html lang="en" translate="no" className={`min-h-screen notranslate ${fontVariables}`} suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen lg:h-screen lg:overflow-hidden antialiased bg-[#f0efeb] text-[#20221c]" suppressHydrationWarning>
        <AuthSessionProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#f0efeb] text-[#20221c] selection:bg-[#20221c] selection:text-[#f0efeb]">
              {children}
            </div>
          </NextIntlClientProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
