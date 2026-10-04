import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// One lookup shared by the blog post segment layout, generateMetadata and the page (deduped per
// request by React's cache). Only published posts resolve; anything else is a 404.
export const getPublishedPost = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 2,
  })
  return docs[0] || null
})

export const getAuthorProfile = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'blog-author-profile' })
})
