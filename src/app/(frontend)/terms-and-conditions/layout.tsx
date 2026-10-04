import React from 'react'
import type { Metadata } from 'next'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { getOgImageUrl } from '@/lib/utils'
import { safeJsonLd } from '@/lib/seo/jsonLd'

const breadcrumbName = 'Terms & Conditions'
const slug = 'terms-and-conditions'

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations('legal.termsAndConditions')
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
      siteName: 'Veracue Peptides',
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

export default async function TermsAndConditionsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: Promise<any>
}) {
  const locale = 'en'
  const t = await getTranslations('legal.termsAndConditions')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const path = true ? `/${slug}` : `/${locale}/${slug}`
  const url = `${baseUrl}${path}`

  const faqKeys = ['humanUseApproved', 'cancelOrder', 'shipsInternationally', 'damagedOrDelayed', 'ageRequirement', 'currency', 'orderQuestionsContact', 'termsChangeNotice']

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
      <NextIntlClientProvider messages={pickMessages(await getMessages(), ['legal.termsAndConditions'])}>{children}</NextIntlClientProvider>
    </>
  )
}
