import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getPublishedPost as getPost, getAuthorProfile } from '@/lib/blog/getPublishedPost'

import { BlogPostCard } from '@/components/editorial/BlogPostCard'
import { StaggerChildren } from '@/components/motion/StaggerChildren'
import { ReadingProgress } from '@/components/editorial/ReadingProgress'
import { TableOfContents } from '@/components/editorial/TableOfContents'
import { BlogPostHero } from '@/components/blog/BlogPostHero'
import { PostRichText } from '@/components/blog/PostRichText'
import { KeyTakeaways } from '@/components/blog/KeyTakeaways'
import { FaqAccordion } from '@/components/blog/FaqAccordion'
import { ReferencesList } from '@/components/blog/ReferencesList'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { RelatedProductsSlider } from '@/components/blog/RelatedProductsSlider'
import { estimateReadingTime } from '@/lib/blog/readingTime'
import { splitFirstParagraph } from '@/lib/blog/splitContent'
import { getFeaturedImageUrl, formatPostDate, FALLBACK_BLOG_IMAGE as FALLBACK_IMAGE } from '@/lib/blog/postDisplay'
import { encodeImageUrl, getOgImageUrl, toAbsoluteUrl } from '@/lib/utils'
import { safeJsonLd } from '@/lib/seo/jsonLd'

// The root layout title template appends the brand, so strip any brand suffix already
// present in CMS-authored titles.
function stripBrandSuffix(title: string): string {
  return title.replace(/\s*\|\s*(Veracue Peptides|Veracue|Helix Bio)\s*$/i, '').trim()
}

// Cheap word count from Lexical JSON text nodes.
function countWords(node: any): number {
  if (!node) return 0
  let n = 0
  if (typeof node.text === 'string') n += node.text.trim().split(/\s+/).filter(Boolean).length
  if (Array.isArray(node.children)) for (const c of node.children) n += countWords(c)
  if (node.root) n += countWords(node.root)
  return n
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    limit: 200,
    depth: 0,
  })
  return docs.map((post: any) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Post Not Found', robots: { index: false, follow: false } }
  }

  const title = stripBrandSuffix(post.meta?.title || post.title)
  const description = post.meta?.description || post.excerpt || ''
  const path = `/blog/${slug}`
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const imageUrl = toAbsoluteUrl(baseUrl, getFeaturedImageUrl(post))
  const authorProfile = await getAuthorProfile()
  const authorName = authorProfile?.name || 'Veracue Research Team'
  const publishedIso = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : new Date(post.createdAt).toISOString()
  const modifiedIso = post.updatedAt ? new Date(post.updatedAt).toISOString() : publishedIso

  return {
    title,
    description,
    keywords: post.keywords
      ? post.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
      : undefined,
    authors: [{ name: authorName }],
    publisher: 'Veracue',
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'article',
      url: path,
      siteName: 'Veracue Peptides',
      section: post.category || undefined,
      tags: post.keywords
        ? post.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : undefined,
      publishedTime: publishedIso,
      modifiedTime: modifiedIso,
      authors: [authorName],
      images: [
        {
          url: getOgImageUrl(title, description, imageUrl, 'RESEARCH ARTICLE', 'veracue-klow-50mg-sunlit-water-ripples.webp'),
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
      images: [getOgImageUrl(title, description, imageUrl, 'RESEARCH ARTICLE', 'veracue-klow-50mg-sunlit-water-ripples.webp')],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const [{ docs: relatedDocs }, authorProfile] = await Promise.all([
    payload.find({
      collection: 'blog-posts',
      where: {
        and: [
          { slug: { not_equals: slug } },
          { status: { equals: 'published' } },
          ...(post.category ? [{ category: { equals: post.category } }] : []),
        ],
      },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    }),
    getAuthorProfile(),
  ])

  let relatedPosts = relatedDocs
  if (relatedPosts.length === 0) {
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { and: [{ slug: { not_equals: slug } }, { status: { equals: 'published' } }] },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    })
    relatedPosts = docs
  }

  const readTime = post.readTime || estimateReadingTime(post.content)
  const publishedDate = formatPostDate(post.publishedAt || post.createdAt)
  const featuredImageUrl = getFeaturedImageUrl(post)

  const relatedProducts = (post.relatedProducts || []).filter(
    (p: any) => typeof p === 'object',
  )

  // Products don't always have top-level images — many only have per-variant images
  // (e.g. BAC Water's 3mL/10mL/30mL variants), so fall back to the first variant image.
  function getProductImageUrl(product: any): string {
    const direct = product.images?.[0]?.image
    const variantImage = product.variants?.find((v: any) => v.images?.length > 0)?.images?.[0]?.image
    const image = (direct && typeof direct === 'object' ? direct : null) || (variantImage && typeof variantImage === 'object' ? variantImage : null)
    return image?.url ? encodeImageUrl(image.url) : FALLBACK_IMAGE
  }

  const sliderProducts = relatedProducts.slice(0, 6).map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    image: getProductImageUrl(product),
    category: typeof product.categories?.[0] === 'object' ? product.categories[0].title : '',
    price: Number(product.price || 0).toFixed(2),
  }))

  const { first: introContent, rest: restContent } = splitFirstParagraph(post.content)

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const postUrl = `${baseUrl}/blog/${slug}`
  const isoDate = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString()

  // Lean references only; the full Product node (price, availability) lives on the product page.
  const productMentions = relatedProducts.map((product: any) => {
    const productUrl = `${baseUrl}/product/${product.slug}`
    return {
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: product.name,
      url: productUrl,
    }
  })

  const authorDisplayName = authorProfile?.name || 'Veracue Research Team'
  const authorNode = /team/i.test(authorDisplayName)
    ? {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: authorDisplayName,
        url: baseUrl,
      }
    : { '@type': 'Person', name: authorDisplayName }
  const wordCount = countWords(post.content)
  const postDescription = post.meta?.description || post.excerpt || undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: String(post.title).slice(0, 110),
        description: postDescription,
        inLanguage: 'en',
        ...(wordCount > 0 ? { wordCount } : {}),
        // featuredImageUrl is already fully encoded (via encodeImageUrl) and may already
        // be an absolute R2 URL — only prefix baseUrl if it's relative, never re-encode.
        image: toAbsoluteUrl(baseUrl, featuredImageUrl),
        datePublished: isoDate,
        dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : isoDate,
        articleSection: post.category || undefined,
        keywords: post.keywords || undefined,
        author: authorNode,
        publisher: { '@id': `${baseUrl}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        ...(productMentions.length > 0 ? { mentions: productMentions } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Research Blog', item: `${baseUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq: any) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="bg-[#f0efeb] min-h-screen pb-32">
        <ReadingProgress />

        <BlogPostHero
          title={post.title}
          excerpt={post.excerpt ?? undefined}
          category={post.category ?? undefined}
          date={publishedDate}
          readTime={readTime}
          imageSrc={featuredImageUrl}
          imageAlt={post.title}
        />

        {/* Two Column Layout for Desktop (TOC + Content) */}
        <div className="px-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 xl:gap-24 pt-8">
          <aside className="hidden lg:block relative">
            <TableOfContents />
          </aside>

          <article className="max-w-[820px] w-full mx-auto lg:mx-0 space-y-10">
            <div className="space-y-10">
                {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                  <KeyTakeaways items={post.keyTakeaways.map((t: any) => t.text)} />
                )}

                {introContent && <PostRichText content={introContent} />}

                {sliderProducts.length > 0 && <RelatedProductsSlider products={sliderProducts} />}

                <PostRichText content={restContent} />

                {post.faqs && post.faqs.length > 0 && (
                  <div className="pt-4">
                    <span className="text-label-md uppercase tracking-wider text-[#a5732f] mb-2 block">
                      Got Questions?
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#20221c] uppercase tracking-tight leading-[1.1] mb-6">
                      Frequently Asked Questions
                    </h2>
                    <FaqAccordion faqs={post.faqs} />
                  </div>
                )}

                {post.references && post.references.length > 0 && (
                  <div className="pt-8 border-t border-[#eddcd2]">
                    <span className="text-label-md uppercase tracking-wider text-[#525b4c] mb-4 block">
                      References
                    </span>
                    <ReferencesList references={post.references} />
                  </div>
                )}

                <AuthorCard
                  name={authorProfile?.name || 'Veracue Research Team'}
                  title={authorProfile?.title ?? undefined}
                  bio={authorProfile?.bio ?? undefined}
                  credentials={authorProfile?.credentials ?? undefined}
                  photoUrl={
                    authorProfile?.photo && typeof authorProfile.photo === 'object'
                      ? encodeImageUrl((authorProfile.photo as any).url)
                      : undefined
                  }
                />
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-6 max-w-[1440px] mx-auto mt-24 pt-16 border-t border-[#eddcd2]">
            <div className="mb-12">
              <span className="text-label-md uppercase tracking-wider text-[#a5732f] mb-2 block">
                Related
              </span>
              <h3 className="text-editorial-lg font-heading font-black text-[#20221c] normal-case">
                Continue reading
              </h3>
            </div>

            <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <div key={relatedPost.slug} className="h-full">
                  <BlogPostCard
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    category={relatedPost.category}
                    excerpt={relatedPost.excerpt}
                    imageSrc={getFeaturedImageUrl(relatedPost)}
                    readTime={relatedPost.readTime || estimateReadingTime(relatedPost.content)}
                  />
                </div>
              ))}
            </StaggerChildren>
          </section>
        )}
      </div>
    </>
  )
}
