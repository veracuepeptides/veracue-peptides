import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Blog posts live at /blog/{slug}. Legacy root-level post URLs redirect there; anything else 404s.
export const metadata = { robots: { index: false, follow: false } }

export default async function LegacyPostRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 0,
  })
  if (docs[0]) permanentRedirect(`/blog/${slug}`)
  notFound()
}
