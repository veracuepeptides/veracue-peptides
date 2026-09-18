import { HomePreloaderWrapper } from '@/components/home/HomePreloaderWrapper'
import { Hero } from '@/components/home/Hero'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { TrustBadges } from '@/components/shared/TrustBadges'
import { VialSpecifications } from '@/components/home/VialSpecifications'
import { FaqSection } from '@/components/home/FaqSection'
import { BlogSection } from '@/components/home/BlogSection'
import { JourneySection } from '@/components/home/JourneySection'
import { WhatSetsUsApart } from '@/components/home/WhatSetsUsApart'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { FAQ_KEYS } from '@/lib/home/faqKeys'
import { DifferenceSection } from '@/components/home/DifferenceSection'
import { BestSellerSection } from '@/components/home/BestSellerSection'
import { MilitaryDiscountSection } from '@/components/home/MilitaryDiscountSection'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getOgImageUrl } from '@/lib/utils'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getFeaturedImageUrl, formatPostDate } from '@/lib/blog/postDisplay'
import { estimateReadingTime } from '@/lib/blog/readingTime'

export async function generateMetadata({
  params,
}: {
  params?: Promise<any>
}): Promise<Metadata> {
  const locale = 'en'
  const t = await getTranslations('home')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const path = true ? '/' : `/${locale}`

  return {
    title,
    description,
    keywords: [
      'research peptides',
      'research grade peptides USA',
      'HPLC verified purity peptides',
      'peptide certificate of analysis',
      'RUO peptides',
      'mass spectrometry tested peptides',
      'buy research peptides online',
      'USA peptide supplier',
    ],
    alternates: {
      canonical: path,

    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      images: [{ url: getOgImageUrl(title, description) }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getOgImageUrl(title, description)],
    },
  }
}

import { getShopProducts } from '@/app/(frontend)/(shop)/actions'
import { getVisibleCategories } from '@/app/(frontend)/actions/categories'

export default async function Homepage() {
  const t = await getTranslations('home')
  const title = t('metaTitle')
  const description = t('metaDescription')
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  // Single source of truth with the on-page FAQ list — pulling from the same FAQ_KEYS/t()
  // pair FaqSection itself uses means the structured data can never drift out of sync with
  // what's actually rendered on the page.
  const faqJsonLd = FAQ_KEYS.map((key) => ({
    '@type': 'Question',
    name: t(`faqSection.items.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faqSection.items.${key}.answer`),
    },
  }))
  let products: any[] = []
  let categories: any[] = []
  let blogPosts: any[] = []
  try {
    categories = await getVisibleCategories()
  } catch (e) {
    console.error("Failed to fetch categories", e)
  }
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 4,
      depth: 1,
    })
    blogPosts = docs.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      category: post.category || '',
      excerpt: post.excerpt || '',
      imageSrc: getFeaturedImageUrl(post),
      readTime: post.readTime || estimateReadingTime(post.content),
      date: formatPostDate(post.publishedAt || post.createdAt),
    }))
  } catch (e) {
    console.error("Failed to fetch blog posts", e)
  }
  try {
    const bestSellers = await getShopProducts({ limit: 8, sort: 'newest', bestSellersOnly: true })
    products = bestSellers.success && bestSellers.products ? (bestSellers.products as any[]) : []

    // Fill any remaining slots with other live products so the section is never sparse
    // before best sellers have been curated in the admin.
    if (products.length < 8) {
      const fallback = await getShopProducts({ limit: 8, sort: 'newest' })
      if (fallback.success && fallback.products) {
        const existingIds = new Set(products.map((p: any) => p.id))
        const filler = (fallback.products as any[]).filter(p => !existingIds.has(p.id))
        products = [...products, ...filler].slice(0, 8)
      }
    }
  } catch (e) {
    console.error("Failed to fetch featured products", e)
  }

  return (
    <>
      <div className="flex flex-col w-full min-h-screen relative z-10 bg-black overflow-x-clip">
        <Hero />
        <BestSellerSection products={products} />
        <DifferenceSection />
        <WhatSetsUsApart />
        <VialSpecifications />
        <CategoriesSection categories={categories} />
        <TrustBadges />
        <MilitaryDiscountSection />
        <JourneySection />
        <WhyChooseUs />
        <BlogSection posts={blogPosts} />
        <FaqSection />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": `${serverUrl}/#webpage`,
              "url": `${serverUrl}/`,
              "name": title,
              "description": description
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `${serverUrl}/#breadcrumb`,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${serverUrl}/` }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqJsonLd
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${serverUrl}/#organization`,
              "name": "Veracue Peptides",
              "url": serverUrl,
              "description": "USA-based supplier of research-use-only synthetic peptides for laboratory research.",
              "email": "support@veracuepeptides.com",
              "logo": {
                "@type": "ImageObject",
                "url": `${serverUrl}/veracue-images/logo-header.png`
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": serverUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${serverUrl}/shop?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            }
          ])
        }}
      />
    </>
  )
}
