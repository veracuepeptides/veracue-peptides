# Veracue Labs

Online store for research-use-only (RUO) peptides, at [veracuelabs.com](https://veracuelabs.com). Everything sold here is labeled for laboratory research use only; keep that in mind for any copy or feature work.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 3, Zustand, Framer Motion
- Payload CMS 3 (admin panel, collections, access control) on PostgreSQL (Supabase)
- next-auth 4 (email and password, Google), next-intl (English only), Resend (email)
- Cloudflare R2 for uploads (product images, blog images, documents), Upstash Redis for rate limits
- Sentry, Google Analytics and Microsoft Clarity (all optional)
- Hosted on Vercel; Node 24.x and pnpm 9 or 10

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values (see "Settings" below)
pnpm dev                     # http://localhost:3000
```

Useful commands:

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server. It also pushes schema changes to the database it points at. |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after changing a collection |
| `pnpm generate:importmap` | Regenerate the Payload admin import map after adding admin components |
| `pnpm test:int` | Vitest integration tests (`tests/int`) |
| `pnpm test:e2e` | Playwright tests (`tests/e2e`); run `pnpm build` first, they use the production build on port 3100 |
| `pnpm import:blog -- blog-drafts/<slug>.json` | Import a blog post draft into the CMS |

**Database warning.** Development, tests and scripts all use whatever `DATABASE_URI` points at, and there is currently one shared database. `pnpm dev` pushes schema changes to it, and the integration tests create real orders, coupons and users in it. Use a separate database for experiments, and run scripts as `NODE_ENV=test npx tsx --env-file=.env.local scripts/<file>.ts` so they do not trigger a schema push. The Supabase session pooler allows about 15 connections in total, so stop other servers before running scripts or a build.

## Project layout

```
src/
  app/(frontend)/   Storefront pages (home, shop, product, blog, cart, checkout, account, affiliates, legal)
  app/(auth)/       Login, register, password reset
  app/(payload)/    Payload admin, served at /the-upside-down
  app/api/          Route handlers (search, OG images, webhooks, cron, pricing config)
  collections/      Payload collections (products, orders, users, coupons, affiliates, ...)
  globals/          Payload globals
  access/, hooks/   Access control and collection hooks
  components/       UI components
  lib/              Business logic (orders, pricing, affiliates, emails, SEO, rate limiting)
  data/             Static content such as the FAQ
  migrations/       Payload migrations (see "Database changes")
messages/en.json    All site copy (next-intl)
scripts/            One-off maintenance scripts
tests/              Vitest and Playwright tests
docs/               Colour palette, audits and notes
```

## Settings (environment variables)

Set these in `.env.local` locally and in the Vercel project for production. `NEXT_PUBLIC_*` values are read at build time, so rebuild after changing them.

| Area | Names | Notes |
|---|---|---|
| Core | `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SERVER_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | `NEXT_PUBLIC_SERVER_URL` should be `https://veracuelabs.com` in production |
| Database pool | `DATABASE_POOL_MAX` | Optional. The pool size is chosen from the connection string: 3 per instance on the session pooler (port 5432), 10 on the transaction pooler (port 6543) |
| Email | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_AUDIENCE_ID`, `ADMIN_EMAIL` | `DISABLE_OUTBOUND_EMAIL=true` skips all tracked email and must never be set in production |
| Uploads | `R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL` | Without `R2_BUCKET` uploads fall back to local disk, which Vercel does not keep |
| Google sign-in | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Redirect URI is `/api/auth/callback/google` |
| Payments | `VERACUEPAY_API_BASE_URL`, `VERACUEPAY_API_SECRET`, `NEXT_PUBLIC_VERACUEPAY_CHECKOUT_URL` | Hosted card checkout. `STRIPE_*` exists but the embedded Stripe form is switched off |
| Protection | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CRON_SECRET` | Without Upstash, rate limits fall back to per-instance memory. Without `CRON_SECRET`, cron endpoints reject every call |
| Shipping | `SHIPPING_COUNTRIES` | Optional, comma-separated ISO codes. Defaults to `US` (the store ships within the US only) |
| Company details | `COMPANY_POSTAL_ADDRESS`, `NEXT_PUBLIC_COMPANY_PHONE`, `NEXT_PUBLIC_SOCIAL_PROFILES` | Optional. Feed the structured data and email footers when set |
| Monitoring | `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID` | All optional |
| Order mirroring | `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_ORDER_SPREADSHEET_ID` | Optional |

In production the server logs the names (never the values) of any important setting that is missing, the first time it starts.

## How things work

- **Checkout.** Payment methods are Zelle (confirmed by hand in the admin), a hosted card page through VeracuePay, and a manually sent payment link. Which of them appear, in what order and with what wording is set in the admin under Store Management, Payment Methods; the server checks that setting again when an order is placed, so a method that is off stops taking orders at once. The card option also needs the three VeracuePay variables above, and stays hidden without them. Card orders show the statement name ("Kaivora LLC", `src/lib/payments/statement.ts`) on the confirmation page and in the order email. Quantities, variants and prices are re-checked on the server; the browser is never trusted. Orders reserve stock, coupon use and points when they are created, and an unpaid order is cancelled after 7 days by a cron job, which releases them.
- **Shipping and fees.** Rules live in the ShippingZones and ProcessingFees collections: $25 standard shipping under a $300 subtotal, free from $300, and a mandatory 5% processing fee on the post-discount subtotal. The shipping rules are also built in as a fallback (`src/lib/pricing/shipping.ts`) for when no ShippingZones record exists; the fee exists only as a ProcessingFees record. The cart, the cart drawer and checkout all use the same helpers.
- **Caching.** Public pages (home, shop, product, blog, certificates and the static pages) are cached and refresh on a timer. Saving a product, category, post, page or document in the admin refreshes the affected pages straight away (`src/lib/revalidate.ts`). The header does not read the session on the server, so pages can be cached; the signed-in state and saved cart load in the browser.
- **Affiliates.** Referral links (`/ref/<slug>`), coupon attribution, commissions with a hold period, and payout requests that reserve the balance atomically.
- **Search and SEO.** `/sitemap.xml`, `/robots.txt`, `/llms.txt` and `/llms-full.txt` are generated from the CMS. Share images come from `/api/og` (product images are drawn at their own aspect ratio).
- **Cron jobs** (`vercel.json`, daily, which fits Vercel's Hobby plan): `process-commissions` and `expire-unpaid-orders`. `abandoned-carts` exists but is deliberately not scheduled (it has no age cutoff and no marketing-consent filter).

## Database changes

Schema changes are pushed by `pnpm dev` and are not applied by the build. The migration history in `src/migrations` cannot rebuild an empty database, and one migration (`convert_cents_to_dollars`) divides money values and is not safe to run twice. Do not add `payload migrate` to the build, and do not run it against this database: `payload_migrations` only records the dev push, so it would try to replay every earlier migration over live data. Apply a new migration on its own, inside a transaction, and write it so it can run twice (`IF NOT EXISTS`, guarded `DO` blocks). `20261013_120000_add_payment_methods_global` and `20261013_130000_remove_circoflows` follow that pattern. Before deploying code that adds a field, make sure the column exists in the production database.

## Scripts

- `scripts/import-blog-post.ts`: imports a blog draft from `blog-drafts/` (see `pnpm import:blog`).
- `scripts/product-import/`: helpers for bulk catalog edits (prices, status, categories). Most accept `--dry` to print changes without saving.

## Content and design rules

- Copy is research-use-only: no human-use, dosing, clinical or weight-loss claims on product pages, and certificates of analysis are described as available on request.
- No em dashes in site copy.
- Colours are limited to the brand palette in [AGENTS.md](AGENTS.md) and [docs/COLOR_PALETTE.md](docs/COLOR_PALETTE.md).
- All visible text lives in `messages/en.json` or `src/data`; compound names follow the catalog (for example GLP-S, GLP-T, GLP-3RTA).

## Security notes

- Access control is defined per collection in `src/collections` and `src/access`, including field-level access. Sensitive fields (role, points, email verification) are staff-only for both create and update.
- Server actions are public endpoints; validate input on the server (see `src/lib/orders/checkoutLines.ts` for the checkout rules).
- The admin panel is at `/the-upside-down`. Restrict it with a Vercel Firewall rule if possible.
- Never commit `.env` files or customer data.

The pre-launch review, with every finding and its status, is in [docs/LAUNCH_AUDIT.md](docs/LAUNCH_AUDIT.md).
