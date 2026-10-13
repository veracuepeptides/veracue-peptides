/**
 * Links from the header into a filtered shop.
 *
 * The shop matches `?category=` against a category's full name or its slug (see getShopProducts), and its
 * filter pills use the full name, so the full Payload name is what goes in the link. The link ends in the
 * shop's catalog anchor, so the visitor lands on the filter pills and the products instead of at the top of
 * the page, below the shop's full-screen hero.
 */

// The id of the shop's filter-and-products section (see ShopClient and ShopHero).
export const CATALOG_ANCHOR = 'catalog-browser'

export function categoryShopHref(categoryName: string): string {
  return `/shop?category=${encodeURIComponent(categoryName)}#${CATALOG_ANCHOR}`
}

export type CategoryIconKey =
  | 'metabolic'
  | 'healing'
  | 'longevity'
  | 'skin'
  | 'cognitive'
  | 'growth'
  | 'energy'
  | 'spray'
  | 'hormonal'
  | 'default'

// Payload categories have no icon field, so the icon follows the wording of the name. Anything that
// matches nothing gets the neutral icon, so a new category never shows a wrong or missing icon.
export function categoryIconKey(categoryName: string): CategoryIconKey {
  const name = categoryName.toLowerCase()
  if (/spray|nasal/.test(name)) return 'spray'
  if (/glp|metabolic/.test(name)) return 'metabolic'
  if (/healing|recovery|repair/.test(name)) return 'healing'
  if (/longevity|aging/.test(name)) return 'longevity'
  if (/cosmetic|skin/.test(name)) return 'skin'
  if (/cognitive|nootropic|focus/.test(name)) return 'cognitive'
  if (/growth hormone|secretagogue/.test(name)) return 'growth'
  if (/energy|performance|mitochond/.test(name)) return 'energy'
  if (/sexual|hormonal/.test(name)) return 'hormonal'
  return 'default'
}

/**
 * Whether a search result belongs to a category. Uses the result's own category list when the search sent
 * one, which is an exact comparison; otherwise falls back to the names joined into one string.
 */
export function productInCategory(
  product: { categoryList?: { name: string }[]; categories?: string },
  categoryName: string,
): boolean {
  if (product.categoryList && product.categoryList.length > 0) {
    return product.categoryList.some((category) => category.name === categoryName)
  }
  if (!product.categories) return false
  return product.categories.toLowerCase().includes(categoryName.toLowerCase())
}
