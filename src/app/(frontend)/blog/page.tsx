import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogIndexClient, type BlogIndexPost } from '@/components/blog/BlogIndexClient'
import { getFeaturedImageUrl, formatPostDate } from '@/lib/blog/postDisplay'
import { estimateReadingTime } from '@/lib/blog/readingTime'
import { DUMMY_BLOG_POSTS } from '@/lib/blog/dummyBlogPosts'

export default async function BlogIndexPage() {
  let payloadPosts: BlogIndexPost[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })

    payloadPosts = docs.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      category: post.category || '',
      excerpt: post.excerpt || '',
      imageSrc: getFeaturedImageUrl(post),
      readTime: post.readTime || estimateReadingTime(post.content),
      date: formatPostDate(post.publishedAt || post.createdAt),
      sortDate: post.publishedAt || post.createdAt,
    }))
  } catch (err) {
    console.error('Error fetching blog posts from payload:', err)
  }

  // Combine payload posts with dummy posts for rich design preview and card evaluation
  const payloadSlugs = new Set(payloadPosts.map((p) => p.slug))
  const filteredDummyPosts = DUMMY_BLOG_POSTS.filter((dummy) => !payloadSlugs.has(dummy.slug))
  const allPosts = [...payloadPosts, ...filteredDummyPosts]

  return <BlogIndexClient posts={allPosts} />
}
