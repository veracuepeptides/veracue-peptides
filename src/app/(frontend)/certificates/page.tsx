import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { CertificatesClient } from './CertificatesClient'
import { type VerifiedCOA } from '@/lib/certificates/fallbackCertificates'
import { getOgImageUrl } from '@/lib/utils'
import { safeJsonLd } from '@/lib/seo/jsonLd'

const slug = 'certificates'

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations('legal.certificates')
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
          url: getOgImageUrl(title, description, undefined, 'HPLC LABORATORY PURITY', 'veracue-ghk-cu-50mg-ice-bed-warm.webp'),
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
      images: [getOgImageUrl(title, description, undefined, 'HPLC LABORATORY PURITY', 'veracue-ghk-cu-50mg-ice-bed-warm.webp')],
    },
  }
}

export default async function CertificatesPage() {
  const locale = await getLocale()
  const t = await getTranslations('legal.certificates')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const payload = await getPayload({ config: configPromise })

  let dbCoas: VerifiedCOA[] = []

  try {
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        and: [
          { coaFile: { exists: true } },
          { status: { equals: 'active' } },
        ],
      },
      limit: 500,
      depth: 1,
      locale: locale as 'en' | 'es',
      fallbackLocale: 'en',
      overrideAccess: true,
      sort: '-coaAnalyzedDate',
    })

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    dbCoas = docs
      .filter((doc: any) => doc.coaFile && typeof doc.coaFile === 'object' && doc.coaFile.url)
      .map((doc: any) => ({
        id: doc.id,
        product: doc.name,
        category: (doc.categories?.[0] && typeof doc.categories[0] === 'object' ? doc.categories[0].name : null) || 'Research',
        purity: typeof doc.coaPurity === 'number' ? `${doc.coaPurity}%` : 'See COA',
        batch: doc.coaBatchNumber || `VR-${doc.id}`,
        analyzed: doc.coaAnalyzedDate ? dateFormatter.format(new Date(doc.coaAnalyzedDate)) : 'Recent Batch',
        lab: 'Analytical Testing Laboratory',
        status: 'Verified',
        coaUrl: doc.coaFile.url,
        productSlug: doc.slug,
      }))
  } catch (err) {
    console.error('Error querying product COAs from Payload:', err)
  }

  const coas: VerifiedCOA[] = dbCoas

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
          { '@type': 'ListItem', position: 2, name: 'Certificates' },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }}
      />
      <CertificatesClient coas={coas} />
    </>
  )
}
