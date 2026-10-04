import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogIndexClient, type BlogIndexPost } from '@/components/blog/BlogIndexClient'
import { getFeaturedImageUrl, formatPostDate } from '@/lib/blog/postDisplay'
import { estimateReadingTime } from '@/lib/blog/readingTime'
import { getOgImageUrl } from '@/lib/utils'
import { BLOG_FAQS } from '@/lib/blog/blogFaqs'
import { safeJsonLd } from '@/lib/seo/jsonLd'

const title = 'Research Peptide Blog'
const description = 'Guides on peptide purity testing, reconstitution, storage, and lab compliance from the Veracue Peptides research team.'

export async function generateMetadata(): Promise<Metadata> {
  const path = '/blog'
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
          url: getOgImageUrl(title, description, undefined, 'RESEARCH BLOG & ARTICLES', 'veracue-klow-50mg-sunlit-water-ripples.webp'),
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
      images: [getOgImageUrl(title, description, undefined, 'RESEARCH BLOG & ARTICLES', 'veracue-klow-50mg-sunlit-water-ripples.webp')],
    },
  }
}

export default async function BlogIndexPage() {
  let payloadPosts: BlogIndexPost[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })

    payloadPosts = docs.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      category: post.category || '',
      excerpt: post.excerpt || '',
      imageSrc: getFeaturedImageUrl(post),
      readTime: post.readTime || estimateReadingTime(post.content),
      date: formatPostDate(post.publishedAt || post.createdAt),
      sortDate: post.publishedAt || post.createdAt,
    }))
  } catch (err) {
    console.error('Error fetching blog posts from payload:', err)
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const path = '/blog'
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
        inLanguage: 'en',
        isPartOf: { '@id': `${baseUrl}/#website` },
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: BLOG_FAQS.map((faq) => ({
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
      <BlogIndexClient posts={payloadPosts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
    </>
  )
}
