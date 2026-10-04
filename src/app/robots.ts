import type { MetadataRoute } from 'next'

// Private, transactional pages. These also carry a noindex meta tag; the disallow saves crawl budget.
const PRIVATE_PATHS = [
  '/account',
  '/cart',
  '/checkout',
  '/wishlist',
  '/order-confirmation',
  '/affiliates/dashboard',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]

// Internal and non-content paths
const INTERNAL_PATHS = [
  '/admin',
  '/api',
  '/ref',
  '/the-upside-down',
  '/monitoring',
  '/email-preview',
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'

  const disallow = [
    ...INTERNAL_PATHS,
    ...PRIVATE_PATHS,
  ]

  return {
    rules: {
      userAgent: '*',
      // /api/og generates social share images and must stay crawlable.
      allow: ['/', '/api/og'],
      disallow,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
