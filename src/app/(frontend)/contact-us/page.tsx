import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactClient } from '@/components/contact/ContactClient'
import { getOgImageUrl } from '@/lib/utils'
import { CONTACT_FAQS } from '@/lib/contact/contactFaqs'

const slug = 'contact-us'

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations({ locale, namespace: 'content.contactPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  const path = true ? `/${slug}` : `/${locale}/${slug}`

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
      images: [
        {
          url: getOgImageUrl(title, description, undefined, 'CONTACT & SCIENTIFIC SUPPORT', 'veracue-glow-50mg-water-splash-grey-bg.webp'),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getOgImageUrl(title, description, undefined, 'CONTACT & SCIENTIFIC SUPPORT', 'veracue-glow-50mg-water-splash-grey-bg.webp')],
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params?: Promise<any>
}) {
  const locale = 'en'
  const t = await getTranslations({ locale, namespace: 'content.contactPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const path = true ? `/${slug}` : `/${locale}/${slug}`
  const url = `${baseUrl}${path}`

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
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Contact Us' },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Veracue Peptides',
        url: baseUrl,
        email: 'support@veracuepeptides.com',

        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'scientific support',
            email: 'support@veracuepeptides.com',
            areaServed: 'US',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: CONTACT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ContactClient />
    </>
  )
}
