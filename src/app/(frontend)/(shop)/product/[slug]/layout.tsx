import { notFound } from 'next/navigation'
import { getActiveProduct } from '@/lib/products/getActiveProduct'

// A segment layout renders outside this route's loading.tsx Suspense boundary, so resolving the
// product here (before the skeleton streams) lets an unknown or inactive slug return a real HTTP
// 404. Doing it only inside page.tsx would flush the skeleton first and end up as 200 + noindex.
export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(await getActiveProduct(slug))) notFound()
  return <>{children}</>
}
