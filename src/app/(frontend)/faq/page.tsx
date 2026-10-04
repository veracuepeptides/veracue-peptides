import React from 'react'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FaqClient } from '@/components/faq/FaqClient'
import { faqData } from '@/data/faqs'
import { getOgImageUrl } from '@/lib/utils'
import { safeJsonLd } from '@/lib/seo/jsonLd'

// Strip tags, decode common HTML entities, and collapse whitespace for structured data text.
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/s+/g, ' ')
    .trim()
}

const slug = 'faq'
const locale = 'en'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('content.faqPage')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const path = `/${slug}`

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
          url: getOgImageUrl(title, description, undefined, 'FREQUENTLY ASKED QUESTIONS', 'veracue-glow-50mg-water-splash-grey-bg.webp'),
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
      images: [getOgImageUrl(title, description, undefined, 'FREQUENTLY ASKED QUESTIONS', 'veracue-glow-50mg-water-splash-grey-bg.webp')],
    },
  }
}

export default async function FaqPage() {
  const t = await getTranslations('content.faqPage')
  const title = t('metaTitle')
  const description = t('metaDescription')

  // Generate structured data for SEO
  // Combine all FAQs from all categories for the JSON-LD
  const allFaqs = faqData.flatMap(category =>
    category.items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        // Clean plain text for structured data
        "text": toPlainText(item.answer)
      }
    }))
  ).slice(0, 50);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const path = `/${slug}`
  const url = `${baseUrl}${path}`

  const pageSchema = {
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
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'FAQ' },
        ],
      },
    ],
  }

  return (
    <>
      <FaqClient />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs
          })
        }}
      />
    </>
  )
}
