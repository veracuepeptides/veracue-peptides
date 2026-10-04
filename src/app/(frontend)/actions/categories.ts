'use server'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

// The header calls this on every page view, so a plain query would hit the database (Vercel
// Hobby + a small connection pool) for every visitor. Cache it for an hour; the Categories
// collection also revalidates the 'categories' tag when an editor saves a category.
const loadVisibleCategories = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'categories',
      where: { isVisible: { equals: true } },
      sort: 'sortOrder',
      limit: 100,
      overrideAccess: true,
    })

    return res.docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      slug: doc.slug || '',
      description: doc.description || '',
    }))
  },
  ['visible-categories'],
  { revalidate: 3600, tags: ['categories'] },
)

export async function getVisibleCategories() {
  return loadVisibleCategories()
}
