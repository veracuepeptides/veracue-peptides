import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// One lookup shared by the product segment layout, generateMetadata and the page (deduped per
// request by React's cache). Only active, visible products resolve; anything else is a 404.
export const getActiveProduct = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'active' } },
        { isVisible: { equals: true } },
      ],
    },
    limit: 1,
    depth: 2, // categories and media
  })
  return docs[0] ?? null
})
