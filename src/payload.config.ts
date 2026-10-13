import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogMedia } from './collections/BlogMedia'
import { Documents } from './collections/Documents'
import { Addresses } from './collections/Addresses'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Carts } from './collections/Carts'
import { Coupons } from './collections/Coupons'
import { BlogPosts } from './collections/BlogPosts'
import { Pages } from './collections/Pages'
import { ContactMessages } from './collections/ContactMessages'
import { EmailLogs } from './collections/EmailLogs'
import { Wishlists } from './collections/Wishlists'
import { Reviews } from './collections/Reviews'
import { Orders } from './collections/Orders'
import { ShippingZones } from './collections/ShippingZones'
import { AffiliateApplications } from './collections/AffiliateApplications'
import { Affiliates } from './collections/Affiliates'
import { AffiliateClicks } from './collections/AffiliateClicks'
import { AffiliateConversions } from './collections/AffiliateConversions'
import { AffiliatePayouts } from './collections/AffiliatePayouts'
import { PayoutRequests } from './collections/PayoutRequests'
import { ProcessingFees } from './collections/ProcessingFees'
import { MilitaryDiscountRequests } from './collections/MilitaryDiscountRequests'
import { Trash } from './collections/Trash'
import { AffiliateSettings } from './globals/AffiliateSettings'
import { BlogAuthorProfile } from './globals/BlogAuthorProfile'
import { PaymentMethods } from './globals/PaymentMethods'
import { OrderCounters } from './collections/OrderCounters'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fail fast on boot rather than silently signing tokens/emails with an empty secret or
// sending customer-facing email from Resend's shared sandbox domain in production.
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is required and was not set.')
}
if (process.env.NODE_ENV === 'production' && !process.env.RESEND_API_KEY) {
  console.warn('WARNING: RESEND_API_KEY environment variable is missing in production.')
}
if (process.env.NODE_ENV === 'production' && !process.env.RESEND_FROM_EMAIL) {
  console.error('RESEND_FROM_EMAIL is not set — emails without an explicit "from" will send from Resend\'s sandbox domain.')
}
// Settings that fail quietly when missing (a limit that silently never applies, a cron that is
// rejected, errors that are never reported). One notice in the production logs lists the names,
// never the values, so a forgotten variable shows up on the first request instead of in an incident.
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
  const unset = [
    ['CRON_SECRET', process.env.CRON_SECRET],
    ['UPSTASH_REDIS_REST_URL', process.env.UPSTASH_REDIS_REST_URL],
    ['UPSTASH_REDIS_REST_TOKEN', process.env.UPSTASH_REDIS_REST_TOKEN],
    ['R2_BUCKET', process.env.R2_BUCKET],
    ['R2_PUBLIC_URL', process.env.R2_PUBLIC_URL],
    ['NEXT_PUBLIC_SERVER_URL', process.env.NEXT_PUBLIC_SERVER_URL],
    ['SENTRY_DSN or NEXT_PUBLIC_SENTRY_DSN', process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name)
  if (unset.length > 0) {
    console.warn(`Production settings not set: ${unset.join(', ')}. Rate limits fall back to per-instance memory, cron jobs are rejected, and uploads or error reports may be skipped until they are set.`)
  }
  if (process.env.DISABLE_OUTBOUND_EMAIL === 'true') {
    console.error('DISABLE_OUTBOUND_EMAIL is true in production: every tracked email (orders, resets, verification) is being skipped.')
  }
}

// Database connection sizing.
//
// Supabase's session-mode pooler (port 5432) allows about 15 client connections in total, shared by
// every Vercel instance, the dev server, scripts and the build. Each process therefore keeps a
// small pool. Its transaction-mode pooler (port 6543, or ?pgbouncer=true) multiplexes many clients
// over few real connections, so a larger per-process pool is safe there. This picks the size from
// the connection string, so switching DATABASE_URI to the transaction pooler needs no code change.
// Keep the session or direct URL for schema pushes and migrations.
const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
const usesTransactionPooler = /:6543(?:[/?]|$)/.test(databaseUri) || /[?&]pgbouncer=true/i.test(databaseUri)
// `next build` renders pages in several parallel workers, each opening its own pool.
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'
const defaultPoolMax = isBuildPhase ? 2 : usesTransactionPooler ? 10 : 3

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: ['@/components/admin/NavBadges'],
    },
  },
  routes: {
    admin: '/the-upside-down',
  },
  globals: [
    AffiliateSettings,
    BlogAuthorProfile,
    PaymentMethods,
  ],
  collections: [
    Trash,
    OrderCounters,
    Users,
    Media,
    BlogMedia,
    Documents,
    Addresses,
    Categories,
    Products,
    Carts,
    Wishlists,
    Coupons,
    Orders,
    Reviews,
    ShippingZones,
    BlogPosts,
    Pages,
    ContactMessages,
    EmailLogs,
    AffiliateApplications,
    Affiliates,
    AffiliateClicks,
    AffiliateConversions,
    AffiliatePayouts,
    PayoutRequests,
    ProcessingFees,
    MilitaryDiscountRequests,
  ].map((collection) => {
    if (collection.slug === 'trash') return collection

    collection.hooks = collection.hooks || {}
    collection.hooks.beforeDelete = collection.hooks.beforeDelete || []
    
    collection.hooks.beforeDelete.push(async (args: any) => {
      const { req, id, doc } = args
      try {
        let fullDoc = doc
        if (!fullDoc) {
          fullDoc = await req.payload.findByID({ collection: collection.slug as any, id, req, depth: 0 })
        }
        
        // Dynamically figure out the title of the deleted item
        const docTitle = fullDoc?.name || fullDoc?.title || fullDoc?.orderNumber || fullDoc?.code || fullDoc?.email || String(id)

        await req.payload.create({
          collection: 'trash',
          req,
          data: {
            title: String(docTitle),
            collectionSlug: collection.slug,
            originalId: String(id),
            documentData: JSON.parse(JSON.stringify(fullDoc || {})),
          },
          overrideAccess: true,
        })
      } catch (err: any) {
        console.error(`Failed to move ${collection.slug} ${id} to trash:`, err)
        require('fs').appendFileSync('trash-error.log', `\n[${new Date().toISOString()}] Error moving ${collection.slug} ${id}: ${err.message || err.toString()}`)
      }
    })

    return collection
  }),
  editor: lexicalEditor(),
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Schema push only under the dev server. Tests run with NODE_ENV=test, and a push there
    // diffs and alters the live database on every test boot.
    push: process.env.NODE_ENV === 'development',
    pool: {
      connectionString: databaseUri,
      // Payload's Postgres adapter keeps one client checked out for its whole life (the startup
      // connection in db-postgres connect.js, still present in 3.89.0), so the usable pool is max - 1.
      // Each Vercel instance and dev server holds its own pool, and Supabase's session-mode pooler
      // allows about 15 clients in total (EMAXCONNSESSION -> "error initializing Payload"). The
      // transaction-mode pooler (port 6543) is the right home for a larger production pool.
      // DATABASE_POOL_MAX overrides the default.
      max: Number(process.env.DATABASE_POOL_MAX) || defaultPoolMax,
      // Fail fast when no connection is free instead of hanging until the function times out, and
      // hand idle connections back quickly: on the session-mode pooler each one counts against ~15.
      connectionTimeoutMillis: 15_000,
      idleTimeoutMillis: 10_000,
      // A runaway query or a leaked transaction would otherwise hold a pooled connection forever.
      statement_timeout: 30_000,
      idle_in_transaction_session_timeout: 30_000,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  sharp,
  plugins: [
    ...(process.env.R2_BUCKET ? [
      s3Storage({
        collections: {
          media: {
            disableLocalStorage: true,
            disablePayloadAccessControl: true,
            prefix: 'Product Images',
            generateFileURL: ({ filename, prefix }) => {
              const publicUrl = process.env.R2_PUBLIC_URL || ''
              const base = publicUrl.replace(/\/$/, '')
              return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
            },
          },
          documents: {
            disableLocalStorage: true,
            disablePayloadAccessControl: true,
            prefix: 'COA',
            generateFileURL: ({ filename, prefix }) => {
              const publicUrl = process.env.R2_PUBLIC_URL || ''
              const base = publicUrl.replace(/\/$/, '')
              return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
            },
          },
          'blog-media': {
            disableLocalStorage: true,
            disablePayloadAccessControl: true,
            prefix: 'Blog Images',
            generateFileURL: ({ filename, prefix }) => {
              const publicUrl = process.env.R2_PUBLIC_URL || ''
              const base = publicUrl.replace(/\/$/, '')
              return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
            },
          },
        },
        bucket: process.env.R2_BUCKET,
        config: {
          endpoint: process.env.R2_ENDPOINT || '',
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
          },
          region: 'auto',
          forcePathStyle: true,
        },
      })
    ] : []),
    seoPlugin({
      collections: ['pages', 'blog-posts'],
      tabbedUI: true,
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => (doc?.title ? `${doc.title} | Veracue Labs` : 'Veracue Labs'),
      generateDescription: ({ doc }: any) => doc?.excerpt || doc?.seoDescription || '',
      generateImage: ({ doc }: any) => doc?.featuredImage || doc?.meta?.image,
      generateURL: ({ doc, collectionSlug }: any) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuelabs.com'
        // Blog posts live under /blog; the (unused) pages collection resolves at the root.
        const prefix = collectionSlug === 'blog-posts' ? '/blog' : ''
        return `${base}${prefix}/${doc?.slug || ''}`
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    defaultFromName: 'Veracue',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
