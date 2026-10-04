import React from 'react'
import { ProductClient } from './ProductClient'
import { getOgImageUrl, encodeImageUrl } from '@/lib/utils'
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

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'

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
  const title = product.seoTitle || `${name} | Veracue Peptides`
  const plainDescription = product.description ? stripHtml(String(product.description)) : ''
  const description =
    product.seoDescription ||
    (plainDescription ? truncateAtWord(plainDescription, 155) : '') ||
    `${name} research peptide. Batch COA and HPLC purity data. For laboratory research use only.`

  // Get primary image for open graph
  let imageUrl = undefined
  if (product.images && product.images.length > 0 && typeof product.images[0].image === 'object' && product.images[0].image?.url) {
    imageUrl = product.images[0].image.url
    if (imageUrl.startsWith('/')) {
      imageUrl = `${BASE_URL}${imageUrl}`
    }
  }

  const ogImage = getOgImageUrl(title, description, imageUrl, 'RESEARCH PEPTIDE', 'veracue-ghk-cu-50mg-ice-bed-warm.webp')

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/product/${slug}`,
      siteName: 'Veracue Peptides',
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  }
}

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

  // Map images
  const mappedImages = rawProduct.images?.map((img: any) => {
    if (typeof img.image === 'object' && img.image?.url) {
      return encodeImageUrl(img.image.url)
    }
    return ''
  }).filter(Boolean) || []

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
      const mappedImages = v.images?.map((img: any) => {
        if (typeof img.image === 'object' && img.image?.url) {
          return encodeImageUrl(img.image.url)
        }
        return ''
      }).filter(Boolean) || []

      return {
        id: v.sku || `v-${index}`,
        sku: v.sku || '',
        title: v.options?.map((o: any) => o.value).join(' ') || `Variant ${index + 1}`,
        price: `$${Number(v.price || 0).toFixed(2)}`,
        salePrice: v.salePrice ? `$${Number(v.salePrice).toFixed(2)}` : undefined,
        inStock: (v.stock || 0) > 0,
        images: mappedImages,
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

      productData.relatedProducts = relatedDocs.map((p: any) => {
        let imageUrl = '/veracue-images/veracue-research-grade-studio-portrait.webp'
        let hoverImageUrl = undefined
        if (p.images && p.images.length > 0 && typeof p.images[0].image === 'object' && p.images[0].image?.url) {
          imageUrl = encodeImageUrl(p.images[0].image.url)
        }
        if (p.images && p.images.length > 1 && typeof p.images[1].image === 'object' && p.images[1].image?.url) {
          hoverImageUrl = encodeImageUrl(p.images[1].image.url)
        }

        // Fallback to variant images if no global image exists
        if (imageUrl === '/veracue-images/veracue-research-grade-studio-portrait.webp' && p.hasVariants && p.variants && p.variants.length > 0) {
          for (const variant of p.variants) {
            if (variant.images && variant.images.length > 0 && typeof variant.images[0].image === 'object' && variant.images[0].image?.url) {
              imageUrl = encodeImageUrl(variant.images[0].image.url)
              if (variant.images.length > 1 && typeof variant.images[1].image === 'object' && variant.images[1].image?.url) {
                hoverImageUrl = encodeImageUrl(variant.images[1].image.url)
              }
              break
            }
          }
        }

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          image: imageUrl,
          hoverImage: hoverImageUrl,
          shortDescription: p.seoDescription || 'High-purity research peptide for laboratory use.',
          category: typeof p.categories?.[0] === 'object' ? p.categories[0].title : '',
          priceRange: `$${(p.salePrice && p.salePrice < p.price ? p.salePrice : p.price)?.toFixed(2) || '0.00'}`,
          originalPrice: p.salePrice && p.salePrice < p.price ? `$${p.price.toFixed(2)}` : undefined,
          isFrom: p.bulkBundles && p.bulkBundles.length > 0,
        }
      })
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

    productData.relatedProducts = recentDocs.map((p: any) => {
      let imageUrl = '/veracue-images/veracue-research-grade-studio-portrait.webp'
      let hoverImageUrl = undefined
      if (p.images && p.images.length > 0 && typeof p.images[0].image === 'object' && p.images[0].image?.url) {
        imageUrl = encodeImageUrl(p.images[0].image.url)
      }
      if (p.images && p.images.length > 1 && typeof p.images[1].image === 'object' && p.images[1].image?.url) {
        hoverImageUrl = encodeImageUrl(p.images[1].image.url)
      }

      // Fallback to variant images if no global image exists
      if (imageUrl === '/veracue-images/veracue-research-grade-studio-portrait.webp' && p.hasVariants && p.variants && p.variants.length > 0) {
        for (const variant of p.variants) {
          if (variant.images && variant.images.length > 0 && typeof variant.images[0].image === 'object' && variant.images[0].image?.url) {
            imageUrl = encodeImageUrl(variant.images[0].image.url)
            if (variant.images.length > 1 && typeof variant.images[1].image === 'object' && variant.images[1].image?.url) {
              hoverImageUrl = encodeImageUrl(variant.images[1].image.url)
            }
            break
          }
        }
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: imageUrl,
        hoverImage: hoverImageUrl,
        shortDescription: p.seoDescription || 'High-purity research peptide for laboratory use.',
        category: typeof p.categories?.[0] === 'object' ? p.categories[0].title : '',
        priceRange: `$${(p.salePrice && p.salePrice < p.price ? p.salePrice : p.price)?.toFixed(2) || '0.00'}`,
        originalPrice: p.salePrice && p.salePrice < p.price ? `$${p.price.toFixed(2)}` : undefined,
        isFrom: p.bulkBundles && p.bulkBundles.length > 0,
      }
    })
  }

  // Generate JSON-LD Schemas
  
  // Fetch Suggested Blogs
  const { docs: blogDocs } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published'
      }
    },
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
  })

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
      priceValidUntil,
      availability: v.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      sku: v.sku || productData.sku || productData.id,
      seller: { '@id': `${baseUrl}/#organization` },
      hasMerchantReturnPolicy: merchantReturnPolicy,
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
      name: 'Veracue Peptides'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Veracue Peptides'
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
