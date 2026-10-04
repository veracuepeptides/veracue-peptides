export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function toCleanSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function validateSlugFormat(value: unknown): true | string {
  if (typeof value !== 'string' || !value) return 'Slug is required'
  if (!SLUG_PATTERN.test(value)) {
    return 'Slug may only contain lowercase letters, numbers, and single hyphens (no leading or trailing hyphen)'
  }
  return true
}

export function validateBlogSlug(value: unknown): true | string {
  // Posts live under /blog/{slug}, so no top-level route can be shadowed; format is all that matters.
  return validateSlugFormat(value)
}
