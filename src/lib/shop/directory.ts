import { getCategoryDisplayName } from '@/lib/categoryDisplay'

/**
 * The catalog as plain links, for the directory at the bottom of /shop.
 *
 * The shop's product grid is filled in by the browser (it runs on the query string), so the server HTML of
 * /shop has no links to the products. This directory is what puts every active product one click from the
 * shop for a crawler, grouped by the category a product is filed under first.
 */

export type DirectoryProduct = { name: string; slug: string }
export type DirectoryGroup = { name: string; products: DirectoryProduct[] }

type ProductDoc = {
  name?: string | null
  slug?: string | null
  categories?: unknown[] | null
}

const OTHER_GROUP = 'More Research Compounds'

export function groupProductsForDirectory(docs: ProductDoc[]): DirectoryGroup[] {
  const groups = new Map<string, { name: string; sortOrder: number; products: DirectoryProduct[] }>()

  for (const doc of docs) {
    if (!doc?.name || !doc?.slug) continue
    const primary = (doc.categories || []).find((c): c is Record<string, any> => !!c && typeof c === 'object')
    const key = primary?.name ? String(primary.name) : OTHER_GROUP
    let group = groups.get(key)
    if (!group) {
      group = {
        name: primary?.name ? getCategoryDisplayName(String(primary.name)) : OTHER_GROUP,
        // A product without a category goes last.
        sortOrder: primary ? Number(primary.sortOrder ?? 0) : Number.MAX_SAFE_INTEGER,
        products: [],
      }
      groups.set(key, group)
    }
    group.products.push({ name: String(doc.name), slug: String(doc.slug) })
  }

  return [...groups.values()]
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
    .map(({ name, products }) => ({
      name,
      products: products.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true })),
    }))
}
