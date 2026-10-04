# Veracue Peptides: SEO / GEO / AEO Audit and Fix Plan

Brand: Veracue Peptides. Domain: https://veracuepeptides.com. Audit date: 2026-09-27.

Method: static code audit only (no running app, no live DB, no Lighthouse). Four parallel read-only reviews covered metadata/schema, product/shop/blog/404, components/performance, and GEO/AEO/brand/compliance. Items marked (verify) need a check on the deployed site or in the CMS.

Effort key: S = under 1 hour, M = 1 to 4 hours, L = more than 4 hours.

## Implementation status (2026-09-27)

Verified with `next build` (passes) and a production server: titles, canonicals, robots, JSON-LD parse, HTTP status codes, llms files, deleted routes.

**Done:** Phase 0 (all except 0.6 env vars, which is a hosting step), Phase 1 (noindex, robots, sitemap, 404 status incl. removing the root loading.tsx, catch-all 404s), Phase 2 (title template, OG on legal pages, product/blog metadata, manifest, home absolute title), Phase 4 (single Organization/WebSite graph, product/blog/shop schema, safeJsonLd), Phase 5.1 (llms.txt and llms-full.txt regenerated from the CMS), Phase 6 (fonts trimmed, dead gsap removed, AgeGate, reduced motion, priority), Phase 7 (one main, skip link, headings, FAQ answers in DOM, alt text, contrast on small labels), Phase 8 (dead code and Helix residue removed). The calculator was NOT changed (dosing, syringe, BMI/BMR and creatinine tools kept by owner decision; only its structured-data linking, single main tag and hero accessibility fixes apply).

**Also done (round 2):** blog posts moved to /blog/[slug] with 308 from the old root URLs and real 404s; fonts self-hosted with next/font; heavy images converted to WebP (public/ went from 33 MB to 5 MB); hardcoded purity/certification/SLA claims neutralized in components and FAQ data; env-driven company identity (COMPANY_POSTAL_ADDRESS, NEXT_PUBLIC_COMPANY_PHONE, NEXT_PUBLIC_SOCIAL_PROFILES) feeding Organization schema and email footers; marketing emails carry an opt-out line and List-Unsubscribe header; header categories cached for an hour; sitemap/llms regenerate on product, post and category saves; Sentry replay loaded lazily; Payload types regenerated.

**Intentionally not done:** category pages and category data changes (owner will update categories before hosting), redirect plugin (nothing indexed yet), fully static header (needs session/cart moved client-side).

**Round 3: deep Helix Bio remnant sweep (2026-10-02).** A grep of every tracked and untracked file (excluding node_modules/.next/lockfiles), a read-only query of the live Products/Categories/BlogPosts/Media collections and the blog-author-profile global via this project's own dev server, and a review of git history turned up:
- `tailwind.config.ts`: the `primary`/`gold` color tokens were both `#92DCE5`, literally commented "Helix Bio Logo Blue". This color is actually rendered today (star ratings in ProductReviews, hover accents in ProductFaqs/EyebrowHeading/PullQuote/CompactProductCard/BlogPostHero, icon highlights in HolographicProductCard). Replaced with the approved palette's `#cb997e` (terracotta), matching AGENTS.md's documented role for that color (CTA hover states, conversion highlights). Removed the unused off-palette `dark`/`light`/`deep` sub-shades (all unused sky-blue leftovers).
- `BLOG_POST_GENERATION_PROMPT.md`: a live, reusable content-generation template (feeds `scripts/import-blog-post.ts`) still said "Site: Helix Bio", used a "| Helix Bio" title-suffix convention, referenced "the Helix Bio Team admin account", and had an em dash in its own title. Rewritten for Veracue: brand, purity wording (now points to the COA instead of a hard number), the metaTitle guidance (the app now appends the brand automatically, so the template must not), and the relatedProducts example (no mg in the name).
- `scripts/import-blog-post.ts`: fixed two "Helix Bio Team admin account" references (comment + error message) and an em dash; behavior unchanged (it already just looked up any admin-role user).
- Deleted 7 dead, unreferenced scripts carrying Helix branding or pointing at a folder that no longer exists: `compress.cjs`, `convert-logo.cjs`, `update-domain.cjs`, `scripts/import-categories.ts`, `scripts/verify-prices.ts`, `scripts/update-prices.ts`, `scripts/seed-blog-post.ts`. None were referenced by package.json or any app code (verified).
- Verified clean via the live CMS (read-only queries to this project's own dev server, not the stray server already running on port 3000 from a different project): all 72 products, 7 categories, the 1 blog post, and all 116 media records contain only legitimate peptide-science uses of "helix" (e.g. ARA-290's "helix B surface" of erythropoietin, LL-37's "amphipathic alpha-helix"). The `blog-author-profile` global already reads "Veracue Research Team" (set 2026-09-17), so the "HelixBio Research team" byline flagged in `docs/product-contents-1/veracue-nad-plus-product-page-deliverable.json` as a historical QA note is already resolved in the database.
- Left alone, by design: `scripts/product-import/lib.ts`'s `/helix\s*bio/i` guard (rejects the string in any future product content), `src/app/(frontend)/blog/[slug]/page.tsx`'s title-suffix stripper (defends against a stray "Helix Bio" suffix on old CMS data), and `src/lib/cart/store.ts`'s one-time localStorage migration off the old `'Helix Bio-cart-storage'` key, all added earlier this session as deliberate safety nets, not remnants.
- Left alone, not a Veracue issue: `scratch/` is gitignored (never shipped) and contains unrelated local test/debug artifacts, including a "GlobalGen Pharmaceuticals" logo PNG, a different third party, not Helix Bio.
- Left alone, accurate record-keeping, not live content: `docs/SEO_AUDIT_PLAN.md` (this file), `PAGE_CONTENT_UPDATE_PROMPT.md`, and `docs/product-contents-1/*.json` all reference "Helix Bio" only to document the clone's origin or as an explicitly-superseded structural reference ("structure only, no data carried over").

**Still open (needs a decision or data):** category landing pages and pagination (3.1, 3.2), moving blog posts to /blog/[slug] (3.5), redirect plugin (1.4), static header (3.9), image conversion to WebP/AVIF and next/font (6.1, 6.2), rename the CMS category "Weight Loss & Metabolic" and assign categories to the 9 uncategorized products, product seoTitle "(LY3437943)" style research codes, hardcoded ">=99.0%" purity claims in components, real social profile URLs and address/phone for Organization schema, unsubscribe link and postal address in emails, run `payload generate:types`.

---

## Phase 0. Launch blockers (fix before pointing the domain)

| # | Issue | Where | Fix | Effort |
|---|---|---|---|---|
| 0.1 | `llms.txt` and `llms-full.txt` are 100% Helix Bio. Zero "Veracue" mentions, about 33 links to helixbiochem.com, Helix FAQ text copied near-verbatim | `public/llms.txt`, `public/llms-full.txt` | Delete both. Replace with route handlers `src/app/llms.txt/route.ts` and `src/app/llms-full.txt/route.ts` that read active products, visible categories and published posts from Payload (same pattern as `sitemap.ts`), use `NEXT_PUBLIC_SERVER_URL`, `revalidate = 3600`. A static file in `public/` shadows a route, so it must be deleted | M |
| 0.2 | Helix Bio defaults leak into live pages | `src/globals/BlogAuthorProfile.ts:8,15` (default author "Helix Bio Team" feeds byline and BlogPosting author). `blog-drafts/*.json` metaTitle "\| Helix Bio". `src/data/blog-seo.ts:12,18` | Change default to Veracue Research Team, then check the saved value in admin (verify). Check whether the two Helix drafts were imported into the CMS (verify) | S |
| 0.3 | Two blog drafts are Helix clones and contain human dosing, weight-loss and treatment content, and they feed FAQPage JSON-LD | `blog-drafts/glp-1-...json`, `blog-drafts/tissue-repair-...json`, `src/data/blog-schemas.ts` | Unpublish or delete them from the CMS. Do not import. Rewrite from scratch later (see Phase 5). Delete `blog-schemas.ts`, `blog-seo.ts`, `blog-seo.es.ts`, `faqs.es.ts` (all dead code) | S |
| 0.4 | Site-wide default description is "Premium Peptides for Peak Performance" (performance-enhancement claim, used for root meta, OG, Twitter) | `messages/en.json:3` (`common.siteTagline`), `src/app/(frontend)/layout.tsx:29,49,62` | Replace with the RUO copy already used in `home.metaDescription` | S |
| 0.5 | Zelle phone in the order email is a placeholder `555-010-0199` (TODO in code) while the site shows a different number | `src/lib/emails/generateOrderEmail.ts:4` vs `OrderConfirmationClient.tsx:54` | Use one real number from one shared constant. Also `ZELLE_QR_URL` points at a dev R2 URL | S |
| 0.6 | Production env must be `https://veracuepeptides.com`. `.env.example` and `.env.local` use localhost, and `metadataBase`, canonicals, OG URLs, sitemap and robots all read `NEXT_PUBLIC_SERVER_URL` | Vercel/host env | Set `NEXT_PUBLIC_SERVER_URL`, `NEXTAUTH_URL`, `PAYLOAD_PUBLIC_SERVER_URL`, `R2_PUBLIC_URL`, `RESEND_FROM_EMAIL` (fallback in `payload.config.ts:218` is `onboarding@resend.dev`). Preview deployments need `X-Robots-Tag: noindex` so they are not indexed (verify) | S |
| 0.7 | Draft and archived products are served as 200 and indexable | `product/[slug]/page.tsx:19-26, 87-98` use Local API with default `overrideAccess: true`, no `status`/`isVisible` filter | Filter `status=active` and `isVisible=true` in both `generateMetadata` and page, else `notFound()`. Wrap the lookup in `React.cache()` (it currently runs twice per request) | S |
| 0.8 | Fabricated struck-through prices and "-20%" / "BESTSELLER" badges on every product card | `src/components/shared/ProductCard.tsx:41-48, 220-224, 242` (`compareVal = price * 1.25`, default price 45) | Show a discount only when `salePrice < price` or real `compareAtPrice`. Show BESTSELLER only when the flag is set. This is a deceptive-pricing and Merchant Center risk | S |
| 0.9 | `/api/search` returns invented products (fake COA purities, batch numbers, "Weight Loss" categories, mg in names) whenever the DB is empty or errors | `src/app/api/search/route.ts:9-130, 198-201` | Delete `FALLBACK_RESEARCH_COMPOUNDS`, return `[]` or 503. Same for hardcoded fallbacks in `BestSellerSection.tsx:10-91` (Semaglutide/Retatrutide/Tirzepatide with mg, invented slugs that 404) | S |
| 0.10 | Shop error state returns HTTP 200 with visible text "couldn't connect to Supabase on Vercel" plus the raw DB error | `shop/page.tsx:104-118` | Throw so `error.tsx` renders (5xx), no internal text | S |
| 0.11 | Debug and template routes live in production | `src/app/api/test-bac/route.ts`, `src/app/my-route/route.ts`, `src/app/(frontend)/email-preview/page.tsx`, `src/app/api/dev/email-preview` | Delete, or guard with `NODE_ENV !== 'production'` then `notFound()` | S |
| 0.12 | Path traversal via `?bg=` in OG route (`path.join` then `readFileSync` on user input) | `src/app/api/og/route.tsx:38-51` | Allow-list filenames with `path.basename` plus regex or a fixed Set | S |
| 0.13 | Calculator page is a human-dosing surface: title "Dosage", meta about "exact dosage", "mcg", syringe units, FAQ JSON-LD with "250mcg = 10 units on a U-100 syringe", plus BMI/BMR and creatinine-clearance calculators | `peptide-calculator/page.tsx:63-157`, `messages/en.json:2160-2290` | Retitle "Peptide Reconstitution Calculator" (absolute). Rewrite description and all FAQ answers as concentration (mg/mL) and volume math only, no doses or syringe units. Remove BMI/BMR/CrCl tabs and their schema mention. This contradicts RUO positioning and is a Merchant/Ads/AI-filter risk | M |

---

## Phase 1. Indexation and crawl control

1. **Noindex on private pages (High).** No page sets `robots`. `robots.ts` Disallow alone does not prevent indexing of linked URLs. Add `robots: { index: false, follow: false }` to: `(auth)/layout.tsx`, `account/layout.tsx`, `affiliates/dashboard/layout.tsx`, `cart/page.tsx`, `checkout/page.tsx`, `order-confirmation/[id]/page.tsx`. Also noindex `reset-password/[token]` and add `Referrer-Policy: no-referrer` for it. Note: Google can only see a noindex on a URL it may crawl, so either drop those paths from `Disallow` or accept the robots-only behavior deliberately. (S)
2. **`robots.ts` fixes.** (S)
   - `/api` Disallow also blocks `/api/og`, so Googlebot-Image and some scrapers cannot fetch OG images. Add `allow: ['/', '/api/og']` (Allow before Disallow).
   - Real admin path is `/the-upside-down`, not `/admin`. Add `/the-upside-down`, `/monitoring` (Sentry tunnel), `/email-preview` if kept. Remove stale `/my-route`. Prefer `X-Robots-Tag: noindex` on the admin path over advertising it in robots.txt.
   - Fix the stale "LOCALIZED_PRIVATE_PATHS" comment.
   - Decide policy for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Default allow is right for GEO; add explicit rules only if you want to restrict.
3. **Sitemap.** (S)
   - Static pages use `lastModified: new Date()` on every regeneration (`sitemap.ts:39`). Google learns to ignore lastmod. Omit for static pages or use real dates.
   - Exclude `isVisible=false` products (`sitemap.ts:56`).
   - Add category URLs once category pages exist (Phase 3).
   - Optional: drop `priority` and `changeFrequency` (ignored by Google).
4. **Redirect infrastructure (High).** `next.config.ts` `redirects()` returns `[]`. (M)
   - Add `@payloadcms/plugin-redirects` or a slug-history field so changing a product or post slug does not 404. Products.ts slug is `unique` but not `required`, has no format validation, and the hook uses `data.name.en` (breaks now that i18n is gone).
   - In the host: one primary host (non-www or www), 301 the other; force HTTPS. HSTS `preload` is set (`next.config.ts`), which commits you to HTTPS on all subdomains, so confirm before submitting to the preload list.
   - If any old domain (Helix, 99Purity, previous Veracue domain) was ever live, 301 it (verify).
5. **404 status (verify).** Product and blog routes sit under `loading.tsx` Suspense boundaries, so streaming can send 200 before `notFound()` fires (Next then injects noindex, but status stays 200 for non-`htmlLimitedBots` clients). Run `curl -I https://veracuepeptides.com/does-not-exist` and `/product/does-not-exist`. If 200, remove root-level `loading.tsx` from those routes or accept noindex-only. (S)
6. **Not-found page.** `not-found.tsx` is `'use client'` so it inherits the homepage title. Make it a server component exporting `title` and `robots: {index:false}`, use an H1 (currently H2), add links to categories and blog. (S)
7. **`[[...rest]]` on `/login` and `/register`** return 200 for arbitrary subpaths. `notFound()` when `rest` is non-empty. (S)
8. **`/ref/[slug]`.** Good (307, disallowed, no query params). Add `X-Robots-Tag: noindex, nofollow` to the redirect response, skip bots by user-agent, and return 404 for unknown slugs instead of a 307 to `/`. (S)

---

## Phase 2. Titles, metadata, canonicals

1. **Double-branded titles sitewide (High).** Root template `'%s | Veracue'` (`(frontend)/layout.tsx:27`) is applied on top of titles that already end in "| Veracue Peptides", giving e.g. "Privacy Policy | Veracue Peptides | Veracue". Blog posts get "X | Veracue | Veracue". Only the product page uses `{ absolute }`. (M)
   - Set template to `'%s | Veracue Peptides'`, strip the brand suffix from every `metaTitle` in `messages/en.json`, from `[slug]/page.tsx:60`, and from `payload.config.ts:208` (`generateTitle`). Convention from the project notes: exactly one "| Veracue Peptides".
   - Keep titles at or under about 60 characters. Currently over: home (68 final), about (64), shop (63), calculator (77), affiliates (76).
   - Home suggestion: `Buy Research Peptides USA | 99%+ Purity | Veracue Peptides` as an absolute title, only if the 99% claim is substantiated (Phase 6).
   - Shop and blog index titles are hardcoded in the page files while unused copies exist in `en.json`. Keep one source.
2. **OG/Twitter shallow-merge on legal pages (Medium).** Privacy, refund, shipping, terms, medical-disclaimer layouts define `openGraph`/`twitter` without `images` or `siteName`, which replaces the parent object. Result: no og:image, Twitter `summary_large_image` with no image. Add `siteName` and `images` via a shared `buildMetadata()` helper. (S)
3. **Product metadata (`product/[slug]/page.tsx:33-74`).** (S)
   - Description `substring(0,160)` cuts mid-word and can be empty. Strip HTML, cut on a word boundary, fall back to a template ("... research peptide. Batch COA and HPLC purity data. For laboratory research use only.").
   - Add `openGraph.url`. `type: 'website'` is fine; product OG type is optional.
   - Remove `robots: undefined`, dead locale code (`true ? ...`), and leftover `locale`/`fallbackLocale`.
4. **OG image is wrong on every product.** `getOgImageUrl` passes `image=` but the route only reads `bg`/`backgroundImage`, so every product card shows the GHK-Cu background. Either read a validated product slug in the route or use the real product image directly. Sign the URL or accept only a slug; the route currently renders arbitrary title/description text on your branded card and has an unbounded cache key space. Load fonts and logo once at module scope, set explicit `Cache-Control`. (M)
5. **OG sizes.** Home OG is 1200x675, shop OG 1119x630. Standard is 1200x630. Resize. (S)
6. **Blog post metadata.** Use `post.meta.image` when set; use `meta.description` in schema instead of `excerpt` only; add `article:section` and `article:tag`; wrap `getPost` and `findGlobal` in `React.cache`. (S)
7. **Duplicate blog index metadata and JSON-LD.** `blog/layout.tsx` and `blog/page.tsx` both emit metadata and a graph with identical `@id` values (WebPage, BreadcrumbList). Make the layout a pass-through. (S)
8. **Extend the SEO plugin** (`payload.config.ts:204`) to `products` and `categories`, or add length validators to `seoTitle`/`seoDescription`. Currently only `pages` (which has no route) and `blog-posts` use it. (M)
9. **`keywords` meta** is ignored by Google; drop it, and remove risky terms from keyword fields ("research weight loss peptides", "BPC-157 healing"). (S)
10. **Search Console and Bing verification.** No `verification` metadata exists. Add via `metadata.verification` or DNS. (S)
11. **Manifest (`public/site.webmanifest`).** Set `name` to "Veracue Peptides", add `description`, `start_url`, `id`, `lang`, and `purpose: "maskable"` icons. Colors already match the palette. (S)
12. **Duplicate icon declarations** in `layout.tsx` (metadata `icons` and manual `<link>` tags). Keep one. (S)

---

## Phase 3. Site architecture and crawlability

1. **Category landing pages do not exist (High).** Categories have `seoTitle`, `seoDescription`, `description`, `slug`, but no route. Header, mobile menu and homepage all link to `/shop?category=...`, which server-renders the same unfiltered first 24 products and canonicals to `/shop`. Build `/shop/[category]` (or `/category/[slug]`): unique H1, 150 to 300 words of intro copy, product grid, `CollectionPage` + `ItemList` schema, self-canonical, sitemap entries, internal links from header, footer and product pages. Point all category links at the new URLs. (L)
2. **Only 24 products are crawlable from `/shop`.** The rest load by infinite scroll/server action with no anchors, no `?page=N`. With 100+ products, everything past 24 relies on the sitemap alone. Add server-rendered pagination links or rely on category pages holding fewer than about 40 products each. `ShopClient` also refetches page 1 on mount. (M)
3. **Broken query-param links.** `/shop?filter=best-sellers`, `/shop?filter=newest` (`ClientHeader.tsx:507,533`) and `?q=` (home SearchAction) are never read by `ShopClient` (only category, minPrice, maxPrice, inStock, onSale, sort). Fix or remove. Header category labels (`ClientHeader.tsx:602-611`) do not match the 7 real categories (verify against DB). (S)
4. **Header nav not in initial HTML (High).** Pages and Features triggers are `<button>` with no `href`; shelves mount only on hover; mobile links only when the menu is open. Crawlers see almost no nav beyond the footer. Render the shelf markup server-side and hide it with CSS, or give triggers real `href`s. Add `aria-expanded` and keyboard support. (M)
5. **Blog URL structure (High).** Posts live at `/{slug}` and share the root namespace with static routes. A post slugged `shop`, `faq`, `cart`, `certificates` etc. is unreachable but still listed in the sitemap. `BlogPosts.ts` slug has no `unique`, no validator, and the auto-slug hook keeps punctuation. Recommended: move to `/blog/[slug]` with 301s from old URLs (do this now, before launch, so there is nothing to redirect). Minimum: `unique: true`, format validator, reserved-word list. Also remove the unused `pages` collection and `(frontend)/pages` route or give it a route. (M)
6. **Breadcrumbs.** No visible breadcrumb UI on any page; only JSON-LD (and the product page has a visible one). Add visible breadcrumbs on product, post and category pages. Fix: shop schema has two crumbs with the same URL (`shop/page.tsx:161-162`), home has a one-item breadcrumb (remove), product schema uses full name while UI uses `shortName`, add the category level. (S)
7. **Internal linking.** (M)
   - "View All Research" button on product page (`ProductClient.tsx:895`) has no href. Point to `/blog` or the category.
   - "Suggested blogs" are just the latest 3. Query posts whose `relatedProducts` contain this product.
   - Related products fallback is "newest 4". Use same category.
   - COA rows should link to the product page visibly (currently only inside a modal).
   - Homepage blog teaser shows 3 posts max. Link posts to products and categories.
   - Use descriptive anchor text instead of "Contact Us", "Explore", "OPEN COA".
8. **Footer.** Social links are bare `https://instagram.com` and `https://twitter.com` (`Footer.tsx:377,386`). Use real profile URLs or remove. Add `aria-label` to the three `<nav>` elements. Copyright says "Veracue", use "Veracue Peptides". (S)
9. **Revalidation.** No `generateStaticParams`, `revalidate` or `revalidatePath`/`revalidateTag` hooks on products; `/api/revalidate` is empty; `/shop` is `force-dynamic`; the Header queries session plus two Payload calls per request, which forces every page dynamic (no CDN cache, high TTFB). Fix: make the header static and move session/cart/wishlist client-side, cache category queries with `unstable_cache`, add `afterChange` hooks that revalidate `/product/[slug]`, `/shop`, category and blog paths, use ISR for products, shop and blog. Confirm with the `next build` route table. (L)

---

## Phase 4. Structured data (JSON-LD)

1. **One Organization and one WebSite, emitted once.** Currently Organization with the same `@id` appears on home, shop, contact, FAQ, certificates, blog index and calculator with conflicting property sets. Emit a single full node in the root layout: `@id`, `name`, `legalName` (Veracue Peptides LLC appears in legal copy), `url`, `logo` (ImageObject), `email`, `telephone`, `address`, `foundingDate`, `sameAs` (real social profiles), `contactPoint` (use `customer support`, not `scientific support`). Elsewhere reference `{ "@id": ".../#organization" }`. Only include phone or address if real. The footer phone `+1 (800) 837-2283` appears nowhere else (verify it is real). (M)
2. **WebSite node** needs `@id`, `name`, `publisher`. Remove the `SearchAction` (points at unsupported `/shop?q=`) unless you implement `?q=` on `/shop`. (S)
3. **Page nodes.** Add `isPartOf` and `breadcrumb` `@id` links; use `AboutPage`, `ContactPage`, `CollectionPage` types; merge the duplicate WebPage + CollectionPage on shop; add `ItemList` of products on shop and category pages. (M)
4. **Product schema (`product/[slug]/page.tsx:435-527`).** (M)
   - Add `@id` (`${url}#product`), `url`, `seller` linking to the Organization. Blog posts already reference `#product`, which currently dangles.
   - `weight`: `unitCode: 'GRM'` hardcoded but the CMS field and UI say kg or lbs. Use `KGM`/`LBR` correctly, or drop it (it is shipping weight, not product weight).
   - `shippingDetails` emits rate 0 for all orders, but site copy says free shipping over $300 and "Ships Worldwide" appears elsewhere. Make markup match the shipping policy exactly, or remove. It is also missing on the AggregateOffer branch, and `hasMerchantReturnPolicy` sits on the AggregateOffer where Google does not read it. Put both on each child Offer.
   - `MerchantReturnNotPermitted` conflicts with the refund page, which says damaged items are eligible for exchange. Align.
   - Add `priceValidUntil`; exclude zero or NaN prices; drop `mpn` unless it is a real MPN; do not inject the shared placeholder image for imageless products (omit `image`).
   - `description` is the full raw description. Use a plain-text summary of at most about 5,000 characters.
5. **Fake-rating latent risk.** `averageRating || 5.0` (`page.tsx:238`) plus `reviews: []`. Nothing is emitted today because counts default to 0, but if `reviewCount > 0` and rating is 0 it would publish a fabricated 5.0. Remove the fallback and emit `aggregateRating` only with real, visible, verified reviews. (S)
6. **Blog schema.** (M)
   - `author` is `Person` with a team name. Use `Organization`, or a real named author with `url`, credentials, `sameAs`.
   - Publisher name is "Veracue"; should be "Veracue Peptides" referencing the Organization `@id`.
   - Replace embedded full Product nodes in `mentions` with `{ @type, @id, name, url }` references (current ones emit `price "0.00"` and wrong availability for variant products, and compete with the product page).
   - Add `wordCount`, `inLanguage`, `image` array, `citation` from the references field, and truncate headlines over 110 chars.
   - Show a visible "Last updated" date. Note `dateModified` comes from `updatedAt`, so any admin save (including status flips) bumps it.
7. **FAQPage.** Answers that are not in the visible HTML are a mismatch. `SharedFaqSection.tsx:151-179` mounts only the open answer (home 10, about 10, shop 20, product FAQs). Always render answers and collapse with CSS, as `FaqCategorySection` already does. Also: Google restricts FAQ rich results to government and health sites, so this is for machine readability only. Trim the `/faq` page to about 50 items in JSON-LD, decode `&nbsp;`/`&amp;` in stripped answers. (M)
8. **`safeJsonLd()` helper.** No JSON-LD script escapes `<`. CMS-authored blocks (product, blog) are at risk from a `</script>` sequence. Escape `<`, ` `, ` `. (S)
9. **Home JSON-LD.** Each of 5 objects has its own `@context`; use one `@graph`. (S)
10. **Validate.** After changes run Rich Results Test and Schema.org validator on: home, one product, one post, shop, contact. (S)

---

## Phase 5. Content, GEO and AEO

**Already good:** direct-answer FAQ style, the new product importer (`scripts/product-import/`) with "What is X", at-a-glance spec tables, 6+ FAQs and a compliance guard, the NAD+ draft (cited, hedged, comparison tables), FAQ JSON-LD coverage, `htmlLimitedBots` for Googlebot.

1. **Correct llms.txt and llms-full.txt** (see 0.1). Content: H1 Veracue Peptides, summary blockquote (RUO supplier, testing approach, COA per batch only if true, US shipping, support email, domain); sections Company, Catalog (real categories, sitemap link), Research guides (generated from CMS), Tools, Policies, Optional (`llms-full.txt`); AI-assistant notes (RUO only, no dosing or human-use statements, prices change, English only). No em dashes. No "dosing/reconstitution data" claim for product pages. Do not tell crawlers to ignore other article URLs. (M)
2. **Category naming.** Live category slug `weight-loss-metabolic` (and the header's "GLP-1 & Metabolic", "Longevity & Aging", "Sexual & Hormonal") carries weight-loss framing. Rename to RUO-neutral names, and reconcile the three inconsistent category sets (7 in `CategoriesSection`, 8 in `ClientHeader`/`seed-categories.ts`, Helix taxonomy in dead `en.json` keys). Update `scripts/product-import/*` `categorySlugs` too (AOD-9604, Cagrilintide, others). (M)
3. **`src/data/faqs.ts` (live `/faq`, 183 Q&As).** Sections still named Tirzepatide, Semaglutide, Retatrutide, Survodutide, SLU-PP-332, and stems like "Is Retatrutide used in human clinical research by Veracue?". Project rules require GLP-3RTA/GLP-S/GLP-T naming. Rename, drop compounds you do not stock, and reduce the volume of "is it approved for human use" Q&As, which cue human-use associations. Question stems and category skeleton still mirror the Helix corpus (duplicate-content risk even with reworded answers). (L)
4. **Live copy compliance sweep** (line refs from audit, `messages/en.json` unless noted): `:3` peak performance; `:246-249` "anti-aging", "wound healing", "tissue regeneration", "glycemic control" (used by `BestSellerSection`); `:553-556` "Exact Milligram Dosing / Precision Dosed"; `:665,:717` drug names and "GLP-1 compounds"; `:263` "Clinical Reviews"; `:2291` "The U.S. Authority in Advanced Peptide Research"; `ClientHeader.tsx:603`; `CategoriesSection.tsx`, `MobileMenu.tsx` "Weight Loss & Metabolic"; blog categories in `BlogPosts.ts:41-46` ("Recovery protocols", "Muscle studies", "Growth research", limited to 4 and not matching product categories). Replace with RUO-neutral wording. `glp-3rta.ts` title includes "LY3437943" (a clinical code); consider removing. (M)
5. **Substantiate or remove claims** (E-E-A-T and false-advertising risk): "99%+", "99.1%", "98% or higher", "100% independently tested", "every batch" vs "random samples", "ISO-7 cleanroom", "USA MADE", "±0.5 Da", "Endotoxin-Free/LAL", "3rd-party US laboratories", "double-blind RP-HPLC", same-day shipping before 2 PM (contradicts the 1-3 day review in shipping policy), "response under 2 hours", "serialized lot QR code". Certificates page names no lab and defaults missing batch numbers to `VR-{id}`. Pick one purity statement and make every page, schema and OG image consistent with what COAs show. The OG route hardcodes "HPLC VERIFIED 99%+ PURITY" on every card. (M)
6. **E-E-A-T.** (M)
   - Populate author profile (name, title, bio, credentials, photo), add a reviewer line, link author to a profile page with `sameAs`.
   - Add company identity: legal name, address, phone, founding date on About, Contact and footer.
   - Certificates: name the lab, expose COA data (purity %, observed mass, method, date) as visible text on product pages and in schema, add an FAQ block on `/certificates` (trust hub, currently none). `emptyLibrary` copy says COAs "are being added": populate before launch.
7. **Blog quality.** Current state: 3 drafts, 2 are Helix clones, about 500 words each, claiming "11-14 min read", 2 of 3 have no references. Target 1,500+ words with PubMed citations, comparison tables, a definition paragraph and key takeaways at top, hedged in-vitro language, reviewer byline. Encoding bug in the NAD+ draft (`SIRT1�7` mojibake). Blog index FAQ promises "reconstitution guides" and "cited primary literature" that do not exist yet. (L)
8. **Content clusters to build (all RUO framed, no dosing):**
   - Purity and testing: what HPLC purity means, how to read a COA (HPLC and MS), endotoxin testing, lot traceability.
   - Handling: lyophilized storage and stability, reconstitution solvents and math (concentration only), bacteriostatic vs sterile water.
   - Compound glossary pages (`/compounds/<name>`): structure, MW, CAS, storage, COA link, cited literature, "what it is not". Reuse the importer's kvTable data.
   - Category hubs with comparison tables (Phase 3).
   - RUO education: RUO vs pharmaceutical, responsible sourcing (high AEO query set).
9. **Merchant/Ads note.** Several catalog compounds (PT-141, Melanotan, HCG, Tesamorelin, Kisspeptin) trigger Google Merchant Center and Ads restrictions regardless of copy. Organic search is less affected; do not plan a Shopping feed around them. (info)
10. **Emails (not SEO, but launch-critical and brand entity consistency).** No unsubscribe link and no physical address in any template, including the abandoned-cart email (`api/cron/abandoned-carts/route.ts`), a marketing-type message: CAN-SPAM and Gmail/Yahoo bulk-sender rules. Add both, plus one-click List-Unsubscribe header. Standardize brand to "Veracue Peptides" in `emailShell.ts` footer and subjects (mixed "Veracue", "Veracue Points" vs UI "Purity Points" at `en.json:823,954`). Contact-form email uses user input as the From display name (spoofing). Logos come from `R2_PUBLIC_URL` and a dev `r2.dev` host. (M)

---

## Phase 6. Performance and Core Web Vitals

1. **Fonts (High).** `layout.tsx:80-91` loads 11 Google Font families as one render-blocking stylesheet, plus a third-party `db.onlinewebfonts.com` stylesheet for GERALDINE "PERSONAL USE" (licensing risk for commercial use, and duplicates the local `@font-face` in `globals.css:1-19`, which itself is declared twice). `src/app/fonts.ts` (next/font) exists but nothing imports it. Move to `next/font` for the 3 to 4 families actually used, delete both `<link>` tags, subset Geraldine, drop the `.ttf`/`.woff` copies. Remove the preconnect to stale R2 host `pub-0b0f...r2.dev` (layout and `(auth)/layout.tsx`). (M)
2. **Images (High).** `images.unoptimized: true` means full-size originals ship everywhere and `sizes` is ignored. (M to L)
   - Heaviest: `TrustBadges.tsx` loads four PNGs of 2.0 to 3.1 MB each (about 10 MB) on the homepage; `veracue-military-us-flag.jpg` 834 KB with `priority` far below the fold; `support-avatar.jpg` 604 KB shown at 48 px.
   - Delete unreferenced `backup_*.png` files (about 10.7 MB) and `veracue-home-og-original.png` from `public/`.
   - Convert to WebP/AVIF at real display sizes, or enable optimization on self-hosting/paid plan (Dockerfile already supports sharp).
   - Remove `priority` from `MilitaryDiscountSection`, `JourneySection`, `WhyChooseUs`, `CategoriesSection` (index < 3), about timeline. Only the hero LCP image should have it. Add `fetchPriority="high"` there.
   - Filenames contain "50mg" (`veracue-research-grade-50mg-*.png`), visible in URLs; conflicts with the no-mg naming rule. Rename when re-exporting.
   - `public/placeholder.png` and `.jpg` are referenced in several files but do not exist (404 for any product without an image).
10. **Server rendering (High).** See Phase 3 item 9.
3. **Dead JS on every route.** `HomePreloaderWrapper.tsx` returns early ("temporarily disabled") but still imports `gsap` and `@gsap/react` and wraps the whole layout. Delete the dead code and import. `ogl` is installed but unused. Sentry `replayIntegration()` runs on every page; load lazily or disable. Consider `LazyMotion` for framer-motion. `TidioWidget.tsx` is unused. (S to M)
4. **Blog article hidden behind `FadeUp`.** `[slug]/page.tsx:292` wraps the whole article in a component that server-renders `opacity:0`. Text is in the DOM but delays paint and LCP, and JS-less clients see nothing. Remove the wrapper on article content. Same pattern: H1 `motion.h1` at opacity 0 on legal pages, product page, `BlogPostHero`. Animate transform only. (S)
5. **AgeGate.** Server HTML is clean, but after hydration a fixed full-screen overlay hides the page; Googlebot has no cookie, so rendered screenshots and any render-based signals will show the interstitial; its `priority` images can become the LCP candidate. Bypass known bots by user-agent, or convert to a non-blocking banner and gate only checkout/add-to-cart. Also a bug: on `/` it waits for a `preloader-done` event that is never fired now (preloader disabled), so it only shows after an 8 s fallback. Cookie lacks `SameSite=Lax; Secure`; the substring check `includes('age_verified=true')` is fragile. Add `role="dialog"`, `aria-modal`, focus trap. (M)
6. **Lenis smooth scroll** runs globally, ignores `prefers-reduced-motion`, hides the native scrollbar, and adds a rAF loop on every page (INP and accessibility). Disable on reduced-motion and touch, restore native scrollbar. (S)
7. **Auto-rotating carousels and marquee** have no pause and ignore reduced-motion (WCAG 2.2.2). Add a global `@media (prefers-reduced-motion: reduce)` rule and pause on hover/focus. (S)
8. **Cart badge bug.** `ClientHeader.tsx:200,420` shows "1" on an empty cart and can cause a hydration mismatch. (S)
9. **`translate="no"` and `<meta name="google" content="notranslate">`** block Google's translate feature. Fine for a deliberately English-only site; otherwise remove. (S)
10. **Third-party scripts.** GA and Clarity are `afterInteractive` (fine) but have no consent gating; Clarity records sessions. Decide on a consent banner for launch. (info)

---

## Phase 7. On-page semantics and accessibility (SEO-relevant)

1. **Nested `<main>` on almost every page** (High). `LayoutClientWrapper.tsx:39` already wraps children in `<main>`; pages add another: about-us, FaqClient, PeptideCalculatorClient, LegalPageLayout, BlogIndexClient, `[slug]`, product, account layout, affiliate dashboard layout, not-found, error. Change inner ones to `<div>`/`<article>`; add `id="main-content"` to the layout one. (S)
2. **Skip link** missing. Add before the header. (S)
3. **Decorative `<h3>` right after the H1** in every hero (home, shop, about, FAQ, contact, certificates, calculator, blog, affiliates; e.g. `Hero.tsx:168`). Change to `<p>`. `DifferenceSection.tsx:145` has H3s with no H2; marquee watermarks need `aria-hidden`. `MilitaryDiscountSection.tsx:206` H4 before the H2. Blog FAQ block is an H3 with no H2. `MobileMenu` renders nav items as `<h2>`. Footer injects two H2s on every page (newsletter promo should be `<p>`). `PayoutsClient.tsx:133,143,153` has three H1s (private). (S)
4. **H1 intent.** Home "Peptides Built for the Bench, Not the Hype" has no target keyword; suggest one containing "Research Peptides". Contact "Get in Touch with Our Team" is generic. Blog index H1 exists (`BlogHero.tsx:75`), despite an earlier doubt. (S)
5. **Product page body.** Tab HTML comes from plain textarea fields via `dangerouslySetInnerHTML` (`ProductDetailTabs.tsx:94`) with no sanitization and no heading constraint (an H1/H2 inside would break the outline). Sanitize and demote headings to H3+. (S)
6. **Alt text.** (S)
   - Hero images have technical alts describing things not pictured ("Analytical Chromatography and Laboratory Purity Testing", "cleanroom facility" on lifestyle photography). Describe what is shown.
   - Product and blog images ignore the required `Media.alt` / `BlogMedia.alt` fields (`ProductClient.tsx:411`, `BlogPostHero` uses post title). Use CMS alt with product name as fallback.
   - Gallery alts are "Product view N".
   - Blog cards `alt={title}` duplicates the adjacent link text; use `alt=""`.
7. **Contrast** against the brand palette (approximate ratios): `#a5a58d` on `#f0efeb` about 2.2:1 (small eyebrows across the site); white on `#a5a58d` header about 2.5:1 (nav links); `#cb997e` text on `#f0efeb` about 2.2:1. Use `#6b705c` (already in the site) for small text, or a darker header. (M)
8. **Forms and dialogs.** Newsletter input, certificate search, FAQ search and calculator inputs have no labels. MobileMenu, CartDrawer, SearchOverlay have no `role="dialog"`/`aria-modal`. FAQ accordion in `FaqCategorySection.tsx:34-44` is a clickable `div`, not a button; `SharedFaqSection` uses `focus:outline-none` with no visible replacement. `select-none` on whole sections blocks copying. (M)
9. **ProductCard** overlay link has only `aria-label`; put the visible name inside the anchor. (S)
10. **TableOfContents** assigns heading ids in `useEffect` (client only), so server HTML has no jump anchors. Generate ids in the Lexical heading converter. (S)
11. **RSS feed** missing (`/feed.xml`). Add for blog. (S)

---

## Phase 8. Cleanup (dead code and clone residue)

Delete or quarantine: `seed-real-products.ts` and `seed-full-products.ts` (about 741 Helix hits, clinical trial claims; Critical if ever re-run), `globalgen-broadcast-email.html`, `rename_brand.cjs`, `scratch_logo.*`, `scratch/helix-readonly-inspect.cjs`, unreferenced `scripts/*` that point at 99Purity paths, `src/data/faqs.es.ts`, `blog-seo*.ts`, `blog-schemas.ts`, `components/home/ImageSliderSection.tsx`, `ParallaxImageSection.tsx` (point at a non-existent `/HelixBio Images/` folder), `TidioWidget.tsx`, `about-page-content.md` and `faq-page-content.md` (0-byte), `README.md` (Payload boilerplate), `common.languageSwitcher.es`, `circoflowsCheckoutNote`, `data/faqs.es.ts`, dead `en.json` keys (Helix taxonomy in `searchOverlay.categories`, `mobileMenu.categories`, `home.categories`), dead locale ternaries (`true ? ... : /${locale}`) and unused `params`, `app/actions/setLocale.ts`, localStorage key `'Helix Bio-cart-storage'` in `src/lib/cart/store.ts:171` (rename; also has a space), Helix strip in `api/og/route.tsx:17-18`, `hbPoints` field name, unused `src/app/fonts.ts` (or start using it). Keep `.env.local` out of git. (M)

---

## Recommended order of work

1. Phase 0 (all), then 1.1, 1.2, 2.1, 2.2. This is about one focused day and removes every critical brand, compliance and indexing problem.
2. Phase 5.1, 5.4, 5.5 and Phase 4.1, 4.4 to 4.8 (entity, schema and llms.txt correctness).
3. Phase 3.5 (blog URL move) before launch, while there is nothing to redirect. Then 3.1 to 3.4 (categories, nav, pagination).
4. Phase 6.1 to 6.3 and 7.1 (performance and semantics). Run Lighthouse and PageSpeed on the deployed URL.
5. Phase 5 content build-out and Phase 8 cleanup on a rolling basis.

## Post-launch checklist

- Verify domain in Google Search Console and Bing Webmaster Tools; submit `https://veracuepeptides.com/sitemap.xml`.
- `curl -I` for 404 status on bogus product and root slugs; `curl -sI` for host/HTTPS redirects; view-source on home, one product, one post to confirm one canonical, one title, one `<main>`, correct JSON-LD.
- Confirm no page contains "Helix" (add a CI grep that fails the build on `helix|99purity|globalgen` in `src`, `public`, `messages`).
- Rich Results Test and Schema validator on key templates.
- PageSpeed Insights (mobile) for home, shop, a product, a post; target LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- Confirm preview deployments are noindex.
- Watch Search Console Pages report for "Crawled, currently not indexed" and duplicate-canonical flags on `/shop?category=` URLs.
