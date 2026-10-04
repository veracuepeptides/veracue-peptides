import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Next 16 no longer runs ESLint as part of `next build` (the old `eslint.ignoreDuringBuilds`
  // option was removed from NextConfig) — lint separately with `pnpm lint`.
  images: {
    // Vercel's Image Optimization caches each source image at Vercel's edge after the first
    // fetch, so the R2 bucket's pub-*.r2.dev origin (a Cloudflare dev-only URL, not meant for
    // production traffic) only gets hit on cache misses instead of on every single page view.
    // Previously disabled site-wide over the Hobby plan's 1,000 unique-source-image/month cap,
    // but the catalog sits at ~60 media records — nowhere near that limit even with room to
    // grow — and leaving it disabled was the direct cause of intermittent broken product images
    // (every browser hitting the unreliable r2.dev URL directly, with no caching layer at all).
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-4c2ad32bd46946819b7bd8c103044a10.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        // Previous R2 bucket — kept in case any already-stored media URLs still point at it.
        protocol: 'https',
        hostname: 'pub-82f90d490a8048aa9629f0ae3ea6f567.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        // Current R2 bucket (veracue-media, set via R2_PUBLIC_URL).
        protocol: 'https',
        hostname: 'pub-ac7469377283406ab723756fc506e004.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return []
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  // Next.js streams <title>/meta/canonical/OG tags in on any page whose generateMetadata
  // depends on async data (every CMS-driven page here) instead of blocking on them, on the
  // assumption that the requester will render the follow-up JS and pick the tags up then.
  // Its default bot list already blocks-and-waits for Bing/Twitter/Facebook/etc. for exactly
  // this reason, but deliberately excludes plain "Googlebot", trusting its headless renderer
  // to catch the injected tags in a later render pass — a separate, slower queue than the
  // initial crawl. Adding Googlebot to the default list (verbatim, from next/dist/shared/lib/
  // router/utils/html-bots.js) forces the same safe blocking behavior for it too, so title/
  // description/canonical/robots are guaranteed present on Google's very first fetch.
  htmlLimitedBots:
    /Googlebot|[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i,
}

export default withSentryConfig(
  withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false }),
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    silent: !process.env.CI,
  },
)
