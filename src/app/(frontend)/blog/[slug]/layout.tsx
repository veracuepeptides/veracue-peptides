import { notFound } from 'next/navigation'
import { getPublishedPost } from '@/lib/blog/getPublishedPost'

// Resolving the post in a segment layout lets an unknown slug return a real HTTP 404 instead of
// streaming a 200 response first.
export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(await getPublishedPost(slug))) notFound()
  return <>{children}</>
}
