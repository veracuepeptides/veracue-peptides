import React from 'react'
import type { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { getOgImageUrl } from '@/lib/utils'
import { safeJsonLd } from '@/lib/seo/jsonLd'

const breadcrumbName = 'Medical Disclaimer'
const slug = 'medical-disclaimer'

// Cached for two days (172800s; Next.js needs a literal number here, not an expression). The page itself is a
// client component, which can't export this setting, so it lives on the layout. Nothing here depends on the visitor or the CMS.
export const revalidate = 172800

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations('legal.medicalDisclaimer')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const path = true ? `/${slug}` : `/${locale}/${slug}`

  const ogImage = getOgImageUrl(title, description, undefined, 'LEGAL INFORMATION', 'veracue-glow-50mg-water-splash-grey-bg.webp')

  return {
    title,
    description,
    alternates: {
      canonical: path,
      
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      siteName: 'Veracue Labs',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function MedicalDisclaimerLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: Promise<any>
}) {
  const locale = 'en'
  const t = await getTranslations('legal.medicalDisclaimer')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com'
  const path = true ? `/${slug}` : `/${locale}/${slug}`
  const url = `${baseUrl}${path}`

  const faqKeys = ['researchUseOnlyMeaning', 'intendedForHumanConsumption', 'isMedicalAdvice', 'whoCanPurchase', 'fdaRegulated', 'selfAdministration', 'misuseResponsibility', 'contactAboutDisclaimer']

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { '@id': `${baseUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbName },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqKeys.map((key) => ({
          '@type': 'Question',
          name: t(`faqs.${key}.question`),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(`faqs.${key}.answer`),
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <NextIntlClientProvider messages={pickMessages(await getMessages(), ['legal.medicalDisclaimer'])}>{children}</NextIntlClientProvider>
    </>
  )
}
