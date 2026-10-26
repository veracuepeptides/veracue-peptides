import React from 'react'
import { ProductClient } from './ProductClient'
import { getOgImageUrl, encodeImageUrl } from '@/lib/utils'
import { OG_WIDTH, ogHeightForAspect } from '@/lib/ogSize'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { safeJsonLd } from '@/lib/seo/jsonLd'
import { getActiveProduct } from '@/lib/products/getActiveProduct'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { pickMessages } from '@/lib/i18n/pickMessages'
import { toShopCardProduct } from '@/lib/shop/cardProduct'
import {
  FALLBACK_SHIPPING_METHODS,
  offerShippingDetails,
  resolveShippingCountries,
  type ShippingMethodLike,
} from '@/lib/pricing/shipping'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com'

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

// Cut on a word boundary at <= max chars with no dangling word or trailing punctuation.
function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max + 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, max)
  return base.replace(/[\s,;:.\-]+$/, '')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getActiveProduct(slug)

  if (!product) {
    notFound()
  }

  const name = product.name || 'Product'
  // seoTitle may already carry the brand; absolute avoids the root template appending it twice.
  // Stored seoTitle values can end with a stale "| Veracue Peptides" suffix, so strip any brand suffix and always append the current one.
  const baseTitle = (product.seoTitle || '').replace(/\s*\|\s*(Veracue\s+Peptides|Veracue\s+Labs|Veracue)\s*$/i, '').trim()
  const title = `${baseTitle || name} | Veracue Labs`
  const plainDescription = product.description ? stripHtml(String(product.description)) : ''
  const description =
    product.seoDescription ||
    (plainDescription ? truncateAtWord(plainDescription, 155) : '') ||
    `${name} research peptide. Analytical documentation available on request. For laboratory research use only.`

  // Get primary image for open graph
  let imageUrl = undefined
  let imageWidth: number | null = null
  let imageHeight: number | null = null
  if (product.images && product.images.length > 0 && typeof product.images[0].image === 'object' && product.images[0].image?.url) {
    imageUrl = product.images[0].image.url
    if (imageUrl.startsWith('/')) {
      imageUrl = `${BASE_URL}${imageUrl}`
    }
    imageWidth = product.images[0].image.width ?? null
    imageHeight = product.images[0].image.height ?? null
  }

  // The share card is drawn from this product's own photo, at that photo's aspect ratio (the route
  // computes the same height from the same formula), so the size declared below matches the image.
  // The generic default background is only used when a product has no usable photo.
  const firstCategory = Array.isArray(product.categories)
    ? product.categories.find((c: any) => c && typeof c === 'object' && c.name)
    : null
  const ogKicker = firstCategory ? getCategoryDisplayName((firstCategory as any).name).toUpperCase() : 'LABORATORY RESEARCH PRODUCT'
  const ogImage = getOgImageUrl(title, description, imageUrl, ogKicker)
  const ogHeight = imageUrl ? ogHeightForAspect(imageWidth, imageHeight) : 630

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/product/${slug}`,
      siteName: 'Veracue Labs',
      images: [
        {
          url: ogImage,
          width: OG_WIDTH,
          height: ogHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/product/${slug}`,
      types: { 'text/markdown': `/product/${slug}.md` },
    },
  }
}

// Without generateStaticParams a dynamic route is rendered fresh on every request even with a
// `revalidate` set. Returning an empty list turns caching on without pre-building every product at
// deploy time (which would read the whole catalog from the database during the build): each product
// page is rendered on its first visit and then served from the cache.
export async function generateStaticParams() {
  return []
}

// Cached for two days (172800s; Next.js needs a literal number here, not an expression).
// Saving this product in the admin refreshes it straight away instead of waiting for this
// (see revalidateProductPages in lib/revalidate.ts). Nothing here depends on the visitor.
export const revalidate = 172800

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  const rawProduct = await getActiveProduct(slug)

  if (!rawProduct) {
    notFound()
  }

  // Map images, keeping each image's alt text (index-aligned with the URL list) so the gallery can use it
  const imageEntries = (list?: any[] | null) =>
    (list || []).flatMap((img: any) =>
      typeof img.image === 'object' && img.image?.url
        ? [{ url: encodeImageUrl(img.image.url), alt: typeof img.image.alt === 'string' ? img.image.alt : '' }]
        : [],
    )
  const productImageEntries = imageEntries(rawProduct.images)
  const mappedImages: string[] = productImageEntries.map((e) => e.url)
  const mappedImageAlts: string[] = productImageEntries.map((e) => e.alt)

  // If no images are uploaded globally, check if variants have images
  if (mappedImages.length === 0) {
    let hasVariantImages = false
    if (rawProduct.hasVariants && rawProduct.variants?.length) {
      for (const variant of rawProduct.variants) {
        if (variant.images && variant.images.length > 0 && typeof variant.images[0].image === 'object' && variant.images[0].image?.url) {
          hasVariantImages = true
          break
        }
      }
    }
    
    // Only push fallback if NO global images and NO variant images exist
    if (!hasVariantImages) {
      mappedImages.push('/veracue-images/veracue-research-grade-studio-portrait.webp')
    }
  }

  // Map categories
  const mappedCategories = rawProduct.categories?.map((cat: any) => {
    return typeof cat === 'object' ? getCategoryDisplayName(cat.name) : 'Category'
  }).filter(Boolean) || []

  // Map variants
  let mappedVariants = []
  if (rawProduct.hasVariants && rawProduct.variants?.length) {
    mappedVariants = rawProduct.variants.map((v: any, index: number) => {
      const variantImageEntries = imageEntries(v.images)
      const mappedImages = variantImageEntries.map((e) => e.url)

      return {
        id: v.sku || `v-${index}`,
        sku: v.sku || '',
        title: v.options?.map((o: any) => o.value).join(' ') || `Variant ${index + 1}`,
        price: `$${Number(v.price || 0).toFixed(2)}`,
        salePrice: v.salePrice ? `$${Number(v.salePrice).toFixed(2)}` : undefined,
        inStock: (v.stock || 0) > 0,
        images: mappedImages,
        imageAlts: variantImageEntries.map((e) => e.alt),
      }
    })
  } else {
    mappedVariants = [
      {
        id: rawProduct.sku || String(rawProduct.id),
        sku: rawProduct.sku || '',
        title: 'Standard',
        price: `$${Number(rawProduct.price || 0).toFixed(2)}`,
        salePrice: rawProduct.salePrice ? `$${Number(rawProduct.salePrice).toFixed(2)}` : undefined,
        inStock: (rawProduct.stock || 0) > 0,
        images: [] as string[],
      }
    ]
  }

  // Map tabs (Pass as strings to avoid Turbopack RSC serialization panics)
  const mappedTabs = []
  if (rawProduct.productDetailsDescription) {
    mappedTabs.push({
      id: 'product-details',
      label: rawProduct.productDetailsTitle || 'Product Details',
      content: rawProduct.productDetailsDescription
    })
  }
  if (rawProduct.researchFocusDescription) {
    mappedTabs.push({
      id: 'research-focus',
      label: rawProduct.researchFocusTitle || 'Research Focus & Mechanism Overview',
      content: rawProduct.researchFocusDescription
    })
  }
  if (rawProduct.qualityPurityDescription) {
    mappedTabs.push({
      id: 'quality-purity',
      label: rawProduct.qualityPurityTitle || 'Quality & Purity Standards',
      content: rawProduct.qualityPurityDescription
    })
  }
  if (rawProduct.complianceNoticeDescription) {
    mappedTabs.push({
      id: 'compliance-notice',
      label: rawProduct.complianceNoticeTitle || 'Compliance Notice',
      content: rawProduct.complianceNoticeDescription
    })
  }

  if (mappedTabs.length === 0 && rawProduct.description) {
    mappedTabs.push({
      id: 'description',
      label: 'Description',
      content: rawProduct.description
    })
  }

  // Map FAQs
  const mappedFaqs = rawProduct.faqs?.map((faq: any, i: number) => ({
    id: `faq-${i}`,
    question: faq.question,
    answer: faq.answer
  })) || []

  // Extract COA URL
  let coaFileUrl = undefined
  if (typeof rawProduct.coaFile === 'object' && rawProduct.coaFile?.url) {
    coaFileUrl = encodeImageUrl(rawProduct.coaFile.url)
  }

  // Map to ProductData interface
  const productData = {
    id: String(rawProduct.id),
    name: rawProduct.name,
    slug: rawProduct.slug || slug,
    subtitle: rawProduct.seoDescription || '',
    category: mappedCategories[0] || 'Product',
    categories: mappedCategories,
    sku: rawProduct.sku,
    weight: rawProduct.weight,
    dimensions: rawProduct.dimensions,
    badges: rawProduct.status === 'active' ? [] : ['DRAFT'],
    description: rawProduct.description || '',
    shortDescription: rawProduct.description || rawProduct.seoDescription || '',
    averageRating: rawProduct.averageRating || 5.0,
    reviewCount: rawProduct.reviewCount || 0,

    bulkBundles: rawProduct.bulkBundles?.map((b: any) => ({
      id: b.id,
      name: b.name,
      quantity: b.quantity,
      discountPercentage: b.discountPercentage,
      price: b.price,
      salePrice: b.salePrice,
      image: typeof b.image === 'object' && b.image?.url ? encodeImageUrl(b.image.url) : undefined,
      variantOverrides: b.variantOverrides?.map((vo: any) => ({
        variantSku: vo.variantSku,
        price: vo.price,
        salePrice: vo.salePrice
      })) || []
    })) || [],
    images: mappedImages,
    imageAlts: mappedImageAlts,
    variants: mappedVariants,
    coaFile: coaFileUrl,
    tabs: mappedTabs,
    faqs: mappedFaqs,
    reviews: [] as any[],
    relatedProducts: [] as any[],
    suggestedBlogs: [] as any[],
  }

  // Fetch related products (same category)
  if (rawProduct.categories && rawProduct.categories.length > 0) {
    const categoryIds = rawProduct.categories.map((c: any) => typeof c === 'object' ? c.id : c).filter(Boolean)
    
    if (categoryIds.length > 0) {
      const { docs: relatedDocs } = await payload.find({
        collection: 'products',
        where: {
          and: [
            {
              id: {
                not_equals: rawProduct.id,
              }
            },
            {
              'categories': {
                in: categoryIds,
              }
            },
            {
              status: {
                equals: 'active'
              }
            },
            {
              isVisible: {
                equals: true
              }
            }
          ]
        },
        limit: 4,
        depth: 1, // Only need basic info and main image
      })

      productData.relatedProducts = relatedDocs.map(toShopCardProduct)
    }
  }

  // If we couldn't find related products by category, just get the newest ones
  if (productData.relatedProducts.length === 0) {
    const { docs: recentDocs } = await payload.find({
      collection: 'products',
      where: {
        id: {
          not_equals: rawProduct.id,
        },
        status: {
          equals: 'active'
        },
        isVisible: {
          equals: true
        }
      },
      sort: '-createdAt',
      limit: 4,
      depth: 1,
    })

    productData.relatedProducts = recentDocs.map(toShopCardProduct)
  }

  // Generate JSON-LD Schemas
  
  // Suggested blogs: the published posts that list this product in their Related Products field come
  // first, newest first. Any spots left (the section shows three) are filled with the newest other posts.
  const SUGGESTED_BLOG_COUNT = 3
  const { docs: relatedBlogDocs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [{ status: { equals: 'published' } }, { relatedProducts: { equals: rawProduct.id } }],
    },
    sort: '-publishedAt',
    limit: SUGGESTED_BLOG_COUNT,
    depth: 1,
  })

  let blogDocs = relatedBlogDocs
  if (blogDocs.length < SUGGESTED_BLOG_COUNT) {
    const { docs: recentBlogDocs } = await payload.find({
      collection: 'blog-posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          ...(relatedBlogDocs.length > 0 ? [{ id: { not_in: relatedBlogDocs.map((post: any) => post.id) } }] : []),
        ],
      },
      sort: '-publishedAt',
      limit: SUGGESTED_BLOG_COUNT - blogDocs.length,
      depth: 1,
    })
    blogDocs = [...blogDocs, ...recentBlogDocs]
  }

  const mappedBlogs = blogDocs.map((post: any) => {
    let imageUrl = '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp'
    if (post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url) {
      imageUrl = encodeImageUrl(post.featuredImage.url)
    }
    return {
      id: String(post.id),
      title: post.title,
      slug: post.slug,
      author: typeof post.author === 'object' ? `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() || 'Admin' : 'Admin',
      date: new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      readTime: post.readTime || '5 min read',
      category: post.category || 'Research',
      excerpt: post.meta?.description || post.excerpt || 'Explore the latest research and clinical studies on this compound.',
      imageSrc: imageUrl
    }
  })

  productData.suggestedBlogs = mappedBlogs

  const baseUrl = BASE_URL
  const productUrl = `${baseUrl}/product/${slug}`
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  // Mirrors the published Refund Policy (/refund-policy): all sales are final,
  // except an exchange for items damaged in transit.
  const merchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
  }

  // The shipping terms in each offer come from the live shipping settings, the same ones checkout uses.
  let shippingMethods: ShippingMethodLike[] = FALLBACK_SHIPPING_METHODS
  try {
    const zones = await payload.find({ collection: 'shippingzones', limit: 1, depth: 0, overrideAccess: true })
    const zoneMethods = (zones.docs[0] as any)?.methods
    if (Array.isArray(zoneMethods) && zoneMethods.length > 0) shippingMethods = zoneMethods
  } catch {
    // The store's default shipping rules are right when the settings cannot be read.
  }
  const shippingCountries = resolveShippingCountries(process.env.SHIPPING_COUNTRIES)
  // Offers are valid from the day this page version is generated.
  const validFrom = new Date().toISOString().slice(0, 10)

  const toPrice = (v: { salePrice?: string; price: string }) =>
    Number((v.salePrice || v.price || '').replace(/[^0-9.]/g, ''))

  const offerNodes = productData.variants
    .map((v) => ({ v, price: toPrice(v) }))
    .filter(({ price }) => Number.isFinite(price) && price > 0)
    .map(({ v, price }) => ({
      '@type': 'Offer',
      ...(productData.variants.length > 1 ? { name: v.title } : {}),
      url: productUrl,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      validFrom,
      priceValidUntil,
      availability: v.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      sku: v.sku || productData.sku || productData.id,
      seller: { '@id': `${baseUrl}/#organization` },
      hasMerchantReturnPolicy: merchantReturnPolicy,
      shippingDetails: offerShippingDetails(shippingMethods, price, shippingCountries),
    }))

  const offerPrices = offerNodes.map((o) => Number(o.price))
  const offers =
    offerNodes.length > 1
      ? {
          '@type': 'AggregateOffer',
          url: productUrl,
          priceCurrency: 'USD',
          lowPrice: Math.min(...offerPrices).toFixed(2),
          highPrice: Math.max(...offerPrices).toFixed(2),
          offerCount: offerNodes.length,
          offers: offerNodes,
        }
      : offerNodes[0]

  // Only real product images; no shared placeholder for imageless products.
  const globalImages: string[] = (rawProduct.images || [])
    .map((img: any) => (typeof img.image === 'object' && img.image?.url ? encodeImageUrl(img.image.url) : ''))
    .filter(Boolean)
  const schemaImages: string[] =
    globalImages.length > 0
      ? globalImages
      : productData.variants.find((v) => v.images?.length > 0)?.images || []
  const absoluteImages = schemaImages.map((img: string) => (img.startsWith('http') ? img : `${baseUrl}${img}`))

  const schemaDescription = truncateAtWord(
    stripHtml(String(rawProduct.seoDescription || rawProduct.description || '')),
    5000,
  )

  const ratingCount = Number(rawProduct.reviewCount || 0)
  const ratingValue = Number(rawProduct.averageRating || 0)

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    url: productUrl,
    name: productData.name,
    ...(schemaDescription ? { description: schemaDescription } : {}),
    ...(absoluteImages.length > 0 ? { image: absoluteImages } : {}),
    sku: productData.sku || productData.id,
    productID: productData.sku || productData.id,
    category: productData.category,
    ...(productData.weight ? {
      weight: {
        '@type': 'QuantitativeValue',
        value: productData.weight,
        unitCode: 'KGM' // the product page renders weight in kg
      }
    } : {}),
    brand: {
      '@type': 'Brand',
      name: 'Veracue Labs'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Veracue Labs'
    },
    ...(offers ? { offers } : {}),
    ...(ratingCount > 0 && ratingValue > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue,
        reviewCount: ratingCount
      }
    } : {}),
  }

  const faqSchema = productData.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productData.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : undefined

  // Same label the visible breadcrumb in ProductClient shows (short name, without the
  // parenthetical scientific name). No category level: the visible trail is Home > Shop > Product.
  const nameMatch = String(productData.name).match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  const breadcrumbName = nameMatch ? nameMatch[1].trim() : productData.name

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${baseUrl}/shop`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: breadcrumbName,
        item: productUrl
      }
    ]
  }

  const pageMessages = pickMessages(await getMessages(), [
    'shop.productDetail',
    'shop.quantityStepper',
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(productSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <div className="flex-1">
        <NextIntlClientProvider messages={pageMessages}>
          <ProductClient product={productData as any} />
        </NextIntlClientProvider>
      </div>
    </div>
  )
}
