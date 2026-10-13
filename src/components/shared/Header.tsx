import { ClientHeader } from './ClientHeader'
import { getVisibleCategories } from '@/app/(frontend)/actions/categories'

// Deliberately free of anything per-visitor (no session, cookies or headers). The header is part of
// every page, so reading the session here made every page on the site dynamic and uncacheable.
// Whether the visitor is signed in, and their saved cart and wishlist, are resolved in the browser
// by ClientHeader (see actions/headerState.ts). The category list is cached (tag "categories").
export async function Header() {
  const categories = await getVisibleCategories().catch(() => [])
  return <ClientHeader categories={categories} />
}
