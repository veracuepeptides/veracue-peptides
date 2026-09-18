# Veracue — Page Content Rewrite Prompt

This is a fixed, reusable prompt. Use it once per page, in order, until every
page in the checklist is done. The goal: replace every piece of copy that
still traces back to the original cloned project (Helix Bio / Helix Bio
Chem / helixbiochem.com) with original, Veracue-specific writing that is
strong on classic SEO, GEO (getting cited/surfaced in AI answer engines like
Google AI Overviews, Perplexity, ChatGPT search), and AEO (structured so a
single paragraph or FAQ answer can be lifted whole as a direct answer) —
**without changing layout**. The designs on every page are already finished
and have already been fixed for overflow/wrapping bugs this session; new
copy must fit the space the old copy fit in, not the other way around.

---

## Why this exists

This codebase was cloned from a different, already-published brand's site
(Helix Bio / Helix Bio Chem) and re-skinned as Veracue Peptides
(veracuepeptides.com). The visual redesign is done. The **words** on most
pages, however, are still close enough to the source project's original
copy that search engines and AI crawlers could flag this as duplicate or
near-duplicate content once both sites are indexed — which suppresses
ranking and makes AI engines far less likely to cite Veracue as a source.
Every page needs its own, independently-written content pass.

---

## Fixed context (same for every page — do not change)

- **Brand:** Veracue Peptides — a U.S. supplier of research-grade
  (≥99% purity) peptides for laboratory and analytical research use.
- **Domain:** veracuepeptides.com
- **Audience:** researchers, lab professionals, and research institutions
  evaluating or purchasing research compounds — not consumers seeking
  medical or personal-use advice.
- **Compliance line (non-negotiable, every page, every field):** every claim
  is framed as laboratory/in-vitro **research** — never instructions for
  human use, personal dosing, or a therapeutic/medical claim. Never say a
  compound "treats/cures/prevents/is safe for humans." Use "research
  suggests," "in research models," "studied for." Avoid "you" implying
  personal use. This applies to headings, body copy, meta descriptions,
  FAQ answers, alt text — everywhere, not just long-form content.
- **Brand palette / tone words already established in the design:** precise,
  analytical, third-party verified, HPLC/mass-spec tested, cleanroom
  formulated, research-grade — lean into this vocabulary; it's already the
  site's visual and verbal identity, don't invent a different voice.
- **Never invent:** citations, study names, certifications, partner names,
  or specific numeric claims (purity %, testing methods, turnaround times)
  that aren't already stated elsewhere in this codebase. If a page needs a
  factual claim you can't verify from the existing site content, write
  around it or flag it — don't fabricate to fill space.

---

## What SEO / GEO / AEO actually mean here (concrete, not theoretical)

**SEO (classic search ranking):**
- One clear primary keyword/phrase per page, used naturally in the H1, the
  first paragraph, the meta title, and 1-2 subheadings — never stuffed.
- Meta title 50–60 characters, meta description 150–160 characters, both
  written to be clicked (not just accurate) and both containing the primary
  keyword near the front.
- Unique title/description per page — no two pages share one.

**GEO (getting cited by AI engines):**
- Every factual sentence should be **self-contained and quotable on its
  own** — an AI answer engine extracts single sentences out of context, so
  each one needs to make sense without the sentences around it.
- Prefer concrete, specific claims over vague marketing language ("every
  batch ships with independent HPLC and mass spectrometry testing" beats
  "we care about quality").
- Structured content (numbered steps, comparison points, short definition
  paragraphs) gets lifted into AI answers far more often than long
  unbroken prose.

**AEO (answer/featured-snippet friendly):**
- Every page that has or could have an FAQ section: answers should be
  1–3 sentences, lead with the direct answer in the first sentence, then
  add supporting detail.
- Where a page implicitly answers a question in its body copy (e.g. "What
  does RUO mean"), make sure that answer exists as a single tight
  paragraph or list, not scattered across several paragraphs.

---

## Content-length discipline (read this before writing anything)

**The designs are final and have already been fixed for overflow bugs this
session** (pill labels wrapping to two lines, buttons pushing past the
viewport edge, cards clipping their own content on narrow screens). New
copy that's longer than what it replaces can reintroduce exactly those
bugs. Before replacing any string:

1. **Note the character count of the string you're replacing.** Your
   replacement should land within roughly ±15% of it, unless the element is
   plain flowing paragraph text with no line-clamp/fixed-height/nowrap
   constraint on it (check the component — if you're not sure, keep it the
   same length as the original).
2. Hard ceilings that come up repeatedly in this codebase, regardless of
   what you're replacing:
   - Eyebrow/badge pill labels (small uppercase rounded-pill text): **≤ 34
     characters.** These pills are `whitespace-nowrap` by design; longer
     text overflows the pill on mobile.
   - H1/section headings: **≤ 60 characters** (≤ 45 if the design shows it
     at a very large font size — check whether the heading is inside a
     multi-word `text-3xl`+ block that already wraps to 2-3 lines
     comfortably, vs. a single-line treatment).
   - Meta title: **50–60 characters.** Meta description: **150–160
     characters.**
   - Card/excerpt descriptions with a visible `line-clamp-2` or
     `line-clamp-3` in the component: match that — write to roughly 2-3
     short sentences, since anything past the clamp is invisible anyway.
   - Button/CTA label text: **≤ 34 characters** (buttons use `HeroButton`,
     which is `whitespace-nowrap`; longer labels only gracefully truncate
     down to a point before they visually break on narrow phones).
   - FAQ answers: **1–3 sentences**, no hard character cap, but don't pad.
3. If you genuinely need more room than the original had (the old copy was
   too thin to begin with), **say so explicitly** in your output rather
   than silently overflowing it, so the layout can be checked before the
   content ships.
4. When done with a page, if you have a live dev server available, render
   the page at 320px, 375px, and desktop width and visually confirm nothing
   wraps, clips, or overflows before moving to the next page.

---

## Where content actually lives in this codebase

Two patterns are mixed across the app — check which one applies before
editing:

1. **Translated content (`messages/en.json`)** — most page-level content
   (headings, body copy, meta title/description) is pulled via
   `useTranslations()` (client) or `getTranslations()` (server) from a
   namespace matching the page, commonly `content.<pageName>Page` for
   static pages (e.g. `content.aboutPage.metaTitle`) or `home.<section>`
   for homepage sections. Find the exact namespace by grepping the page's
   `page.tsx` for `getTranslations(` and its section components for
   `useTranslations(`.
2. **Hardcoded strings directly in the component `.tsx` file** — some
   sections (especially ones with dynamic arrays, like FAQ items or
   feature lists) hardcode English text directly in the component. Search
   the relevant component under `src/components/<area>/` for the string
   you're replacing.

For either pattern: after editing, run `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8'))"`
if you touched the JSON file (must stay valid), then `npx tsc --noEmit -p tsconfig.json`
to confirm nothing broke.

`generateMetadata()` in each `page.tsx` is where `<title>`, meta
description, Open Graph, and Twitter card data are actually set — always
check it even if you can't find a `keywords` field already there (Next's
`Metadata` type accepts one; add it as a short array of 5-8 target phrases
per page for internal SEO tracking even though most engines now ignore the
literal meta-keywords tag).

---

## Per-page checklist

Work through these in order. Check one off only once its `generateMetadata()`
(title, description, keywords, OG/Twitter), its on-page headings/body copy,
and any FAQ content have all been rewritten and verified against the length
rules above.

- [ ] `/` — Home
- [ ] `/about-us`
- [ ] `/shop` (listing page copy/meta — not individual product descriptions,
      those come from Payload's `products` collection, out of scope here)
- [ ] `/product/[slug]` (shared template copy/meta around the product
      content, not the per-product description itself)
- [ ] `/cart`
- [ ] `/checkout`
- [ ] `/account` (+ its subpages: addresses, orders, settings, wishlist —
      mostly UI chrome, light-touch pass only)
- [ ] `/blog` (index page copy/meta — individual posts go through
      `BLOG_POST_GENERATION_PROMPT.md`, not this one)
- [ ] `/affiliates`
- [ ] `/affiliates/dashboard` (+ subpages — mostly UI chrome, light-touch
      pass only)
- [ ] `/certificates`
- [ ] `/contact-us`
- [ ] `/faq`
- [ ] `/peptide-calculator`
- [ ] `/privacy-policy`
- [ ] `/terms-and-conditions`
- [ ] `/refund-policy`
- [ ] `/shipping-policy`
- [ ] `/medical-disclaimer`

(`/affiliates/dashboard` sub-routes, `/account` sub-routes, and
`/email-preview` are internal/logged-in-only or dev-only surfaces — no SEO
value, deprioritize unless asked.)

---

## Per-page output format

For each page, produce:

```
PAGE: <route>
FOCUS KEYPHRASE: <3-6 words, the one primary target phrase for this page>
SECONDARY KEYWORDS: <8-12 comma-separated, for internal reference / meta keywords array>

META TITLE (50-60 chars): <...>
META DESCRIPTION (150-160 chars): <...>

CONTENT CHANGES:
<one entry per string replaced — old length → new length, file + translation
key or component name, old text (or a short description if long), new text>

FLAGS: <anything you couldn't verify, anything that needed more room than
the original had, anything you skipped and why>
```

Then apply the changes directly (edit `messages/en.json` and/or the
component file), validate JSON + typecheck, and move to the next page.
