// Serializes a JSON-LD object for use inside <script type="application/ld+json">.
// Escapes "<" (so "</script>" in CMS-authored text cannot break out of the tag) and the
// U+2028/U+2029 line separators, which are valid in JSON but not in older JS parsers.
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\u003c')
    .replace(/\u2028/g, '\u2028')
    .replace(/\u2029/g, '\u2029')
}
