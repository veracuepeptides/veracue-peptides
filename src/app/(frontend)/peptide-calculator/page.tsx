import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PeptideCalculatorPage from './PeptideCalculatorClient'
import { getOgImageUrl } from '@/lib/utils'

const slug = 'peptide-calculator'
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'] as const

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations('calculator.page')
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
          url: getOgImageUrl(title, description, undefined, 'RESEARCH TOOLS & CALCULATOR', 'veracue-glow-50mg-beach-shore-landscape.webp'),
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
      images: [getOgImageUrl(title, description, undefined, 'RESEARCH TOOLS & CALCULATOR', 'veracue-glow-50mg-beach-shore-landscape.webp')],
    },
  }
}

export default async function Page({
  params,
}: {
  params?: Promise<any>
}) {
  const locale = 'en'
  const t = await getTranslations('calculator.page')
  const tMain = await getTranslations('calculator.main')
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const path = true ? `/${slug}` : `/${locale}/${slug}`
  const url = `${baseUrl}${path}`

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_KEYS.map((key) => ({
      "@type": "Question",
      "name": tMain(`faq.${key}.question`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": tMain(`faq.${key}.answer`)
      }
    }))
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('webApp.name'),
    "url": url,
    "description": t('webApp.description'),
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Veracue Peptides"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('breadcrumb.home'),
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('breadcrumb.calculator'),
        "item": url
      }
    ]
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: t('metaTitle'),
        description: t('metaDescription'),
        inLanguage: locale,
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Veracue Peptides',
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Veracue Peptides',
        url: baseUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PeptideCalculatorPage />
    </>
  )
}
