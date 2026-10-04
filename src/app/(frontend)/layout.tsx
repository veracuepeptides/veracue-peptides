import React from 'react'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'
import { AuthSessionProvider } from '@/components/providers/AuthSessionProvider'
import { LayoutClientWrapper } from '@/components/shared/LayoutClientWrapper'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { Toaster } from '@/components/ui/sonner'
import { GlobalNavigationSpinner } from '@/components/shared/GlobalNavigationSpinner'
import { AgeGate } from '@/components/shared/AgeGate'
import { HomePreloaderWrapper } from '@/components/home/HomePreloaderWrapper'
import { getOgImageUrl } from '@/lib/utils'
import { fontVariables } from '@/lib/fonts'
import { pickMessages, GLOBAL_MESSAGE_KEYS } from '@/lib/i18n/pickMessages'

import '@/app/globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export async function generateMetadata() {
  const t = await getTranslations('common')
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'),
    title: {
      default: 'Veracue Peptides | High-Purity Research Peptides',
      template: '%s | Veracue Peptides',
    },
    description: t('siteTagline'),
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
    openGraph: {
      type: 'website',
      siteName: 'Veracue Peptides',
      title: 'Veracue Peptides | High-Purity Research Peptides',
      description: t('siteTagline'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'}/veracue-images/veracue-home-og.png`,
          width: 1200,
          height: 675,
          alt: 'Veracue Peptides',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Veracue Peptides | High-Purity Research Peptides',
      description: t('siteTagline'),
      images: [`${process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'}/veracue-images/veracue-home-og.png`],
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  // Only the translations needed by components mounted on every page (header, footer,
  // age gate, mobile menu, search overlay, cart drawer) are sent to the client here.
  // Each route additionally scopes in its own page-specific namespaces via a nested
  // NextIntlClientProvider around its own content — see src/lib/i18n/pickMessages.ts.
  // getMessages() is request-memoized (React cache()), so calling it again per-page
  // costs nothing extra; this only reduces what gets serialized to the browser.
  const messages = await getMessages()
  const globalMessages = pickMessages(messages, GLOBAL_MESSAGE_KEYS)

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
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <AuthSessionProvider>
          <NextIntlClientProvider messages={globalMessages}>
            <div className="min-h-screen bg-[#f0efeb] text-[#20221c] font-sans antialiased print:bg-white print:min-h-0">
              <React.Suspense fallback={null}>
                <GlobalNavigationSpinner />
              </React.Suspense>
              <SmoothScroll>
                {/* Rendered inside SmoothScroll (not as a layout sibling) so its
                    useLenis() call resolves a real instance instead of null — it needs
                    to actually pause Lenis's own scroll loop while the gate is open,
                    not just rely on the overflow:hidden it also sets directly. */}
                <AgeGate />
                <LayoutClientWrapper header={<Header />} footer={<Footer />}>
                  <HomePreloaderWrapper>{children}</HomePreloaderWrapper>
                </LayoutClientWrapper>
                <Toaster />
              </SmoothScroll>
            </div>
          </NextIntlClientProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
