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
              "@id": "https://helixbiochem.com/#webpage",
              "url": "https://helixbiochem.com/",
              "name": title,
              "description": description
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": "https://helixbiochem.com/#breadcrumb",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://helixbiochem.com/" }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What does \"Research Use Only\" (RUO) mean for these peptides?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Research Use Only means a compound is intended strictly for laboratory and scientific research, not for human or veterinary consumption, diagnosis, or treatment. Helix Bio peptides are labeled and sold on this basis and are not evaluated by the FDA for safety or efficacy in those other contexts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is considered a research-grade peptide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A research-grade peptide is synthesized and tested to a documented purity standard, typically 98% or higher, with identity and concentration confirmed through HPLC and mass spectrometry rather than estimated. It is sold with supporting batch documentation for laboratory use, not formulated or labeled for clinical administration."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What should a peptide's certificate of analysis (COA) include?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A complete COA lists the batch or lot number, purity percentage as measured by HPLC, molecular weight confirmation by mass spectrometry, and the date of testing. Matching the batch number on the COA to the vial label confirms the document corresponds to the exact vial received."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do you verify peptide identity beyond mass spectrometry?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mass spectrometry confirms molecular weight, while HPLC separately verifies purity by isolating the target compound from any related impurities. Used together, the two methods cross-check both identity and purity rather than relying on a single test to carry the whole result."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What storage conditions are recommended for lyophilized peptides?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Unreconstituted (lyophilized) peptides are generally stored frozen or refrigerated, protected from light and moisture, until they're needed for a study. Once reconstituted, most peptides should stay refrigerated and be used within the window noted on the product page or COA."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do peptide reagents support laboratory research studies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Research peptides serve as standardized reagents in cellular, biochemical, and pharmacological studies, giving researchers a consistent, purity-verified compound to test against a defined protocol. Batch-to-batch consistency, backed by COA documentation, is what makes results comparable across a study."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are common impurities in synthetic peptides?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Typical impurities include truncated or deletion sequences from incomplete synthesis cycles, residual solvents, and trace amounts of related by-product peptides. HPLC purity testing is specifically designed to detect and quantify these impurities rather than assume a batch is clean."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do peptide reagents support receptor-binding studies?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In receptor-binding research, a peptide's purity and exact molecular identity directly affect how reliably it interacts with a target receptor in an assay. Verified purity and confirmed molecular weight reduce the risk that an impurity, rather than the compound itself, is driving an observed result."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What questions should I ask about a peptide supplier?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ask whether every batch is independently tested, whether the COA is available before you order, what purity threshold the supplier guarantees, and how orders are shipped and stored in transit. A supplier that answers all four clearly and documents them is easier to evaluate than one that only advertises purity claims."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I tell if a research peptide supplier is legitimate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Look for third-party batch testing rather than in-house-only claims, a COA you can review before purchase, transparent research-use labeling, and clear company information rather than an anonymous storefront. Consistency between what's advertised and what the documentation actually shows is the strongest signal."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://helixbiochem.com/#organization",
              "name": "Helix Bio",
              "url": "https://helixbiochem.com",
              "description": "USA-based supplier of research-use-only synthetic peptides for laboratory research.",
              "email": "support@helixbiochem.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://helixbiochem.com/HelixBio%20Images/hb-logo.png"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://helixbiochem.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://helixbiochem.com/shop?q={search_term_string}"
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
