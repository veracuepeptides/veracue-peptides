import React from 'react'
import { ShopClient } from '@/components/shop/ShopClient'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { getShopProducts } from '../(shop)/actions'
import { safeJsonLd } from '@/lib/seo/jsonLd'

const SHOP_FAQ_KEYS = [
  'availablePeptides',
  'purityQualityTested',
  'standardPurityLevels',
  'interpretCoa',
  'customSynthesis',
  'storageInstructions',
  'reconstitution',
  'shelfLife',
  'shippingDamage',
  'aliquotAfterReconstitution',
  'orderDocumentation',
  'orderQuantities',
  'coaBeforeOrdering',
  'findSpecificPeptides',
  'productPageInfo',
  'manufacturedInUsa',
  'researchUseOnlyMeaning',
  'specialHandling',
  'nonResearchUse',
  'fdaApproval',
]

// No brand suffix: the root title template appends " | Veracue Peptides".
const title = 'Shop Research Peptides | HPLC Verified'
const description = 'Browse research peptides for laboratory use only. Product pages show batch Certificate of Analysis details, HPLC purity data, pricing, and stock from a U.S. supplier.'

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const path = true ? '/shop' : `/${locale}/shop`

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const shopOgImage = `${serverUrl}/veracue-images/shop-page-og.png`

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
          url: shopOgImage,
          width: 1119,
          height: 630,
          alt: 'Veracue Research Peptides Catalog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shopOgImage],
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch all categories for the sidebar
    const categoriesRes = await payload.find({
      collection: 'categories',
      where: { isVisible: { equals: true } },
      limit: 100,
      sort: 'name',
      overrideAccess: true,
    })

    categories = categoriesRes.docs.map(cat => ({
      id: cat.id as string | number,
      name: cat.name,
      slug: cat.slug || ''
    }))
  } catch (error: any) {
    console.error("DB Connection Error on /shop:", error)
    // Rethrow so error.tsx renders instead of a 200 page that leaks internals.
    throw error
  }

  // Fetch initial page of products
  const initialProductsRes = await getShopProducts({ page: 1, limit: 24 })

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'

  const listedProducts: any[] = initialProductsRes.success
    ? ((initialProductsRes.products as any[]) || []).filter((p) => p?.name && p?.slug)
    : []

  const t = await getTranslations('shop.shopClient')
  const shopFaqs = SHOP_FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }))

  const pageMessages = pickMessages(await getMessages(), ['shop.shopClient'])

  return (
    <>
      <NextIntlClientProvider messages={pageMessages}>
      <ShopClient
        initialProducts={initialProductsRes.success ? (initialProductsRes.products as any) : []}
        totalPages={initialProductsRes.success ? initialProductsRes.totalPages : 0}
        categories={categories}
      />
      </NextIntlClientProvider>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': `${siteUrl}/shop#collectionpage`,
                url: `${siteUrl}/shop`,
                name: title,
                description,
                isPartOf: { '@id': `${siteUrl}/#website` },
                publisher: { '@id': `${siteUrl}/#organization` },
                breadcrumb: { '@id': `${siteUrl}/shop#breadcrumb` },
                ...(listedProducts.length > 0 ? { mainEntity: { '@id': `${siteUrl}/shop#itemlist` } } : {}),
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `${siteUrl}/shop#breadcrumb`,
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
                  { '@type': 'ListItem', position: 2, name: 'Shop', item: `${siteUrl}/shop` },
                ],
              },
              ...(listedProducts.length > 0
                ? [
                    {
                      '@type': 'ItemList',
                      '@id': `${siteUrl}/shop#itemlist`,
                      itemListElement: listedProducts.map((p: any, i: number) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        name: p.name,
                        url: `${siteUrl}/product/${p.slug}`,
                      })),
                    },
                  ]
                : []),
              { '@id': `${siteUrl}/#website` },
              { '@id': `${siteUrl}/#organization` },
              {
                '@type': 'FAQPage',
                '@id': `${siteUrl}/shop#faq`,
                mainEntity: shopFaqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />
    </>
  )
}
