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
import { CustomScrollbar } from '@/components/shared/CustomScrollbar'
import { AgeGate } from '@/components/shared/AgeGate'
import { HomePreloaderWrapper } from '@/components/home/HomePreloaderWrapper'
import { getOgImageUrl } from '@/lib/utils'

import '@/app/globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export async function generateMetadata() {
  const t = await getTranslations('common')
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://helixbiochem.com'),
    title: 'Veracue',
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
      images: [{ url: getOgImageUrl('Veracue', t('siteTagline')) }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [getOgImageUrl('Veracue', t('siteTagline'))],
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html lang="en" translate="no" className="min-h-screen notranslate" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pub-0b0f2f98407442588d161ae09cb84207.r2.dev" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Sora:wght@100..800&family=Syne:wght@500;600;700;800&family=Tenor+Sans&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@300..700&family=Big+Shoulders+Display:wght@100..900&family=Alex+Brush&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
        <link 
          href="https://db.onlinewebfonts.com/c/f54f980c88361538e9f438bddf5eb509?family=GERALDINE+PERSONAL+USE+Italic" 
          rel="stylesheet" 
          type="text/css" 
        />
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
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen bg-cream text-ink font-sans antialiased print:bg-white print:min-h-0">
              <AgeGate />
              <React.Suspense fallback={null}>
                <GlobalNavigationSpinner />
              </React.Suspense>
              <SmoothScroll>
                <CustomScrollbar />
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
