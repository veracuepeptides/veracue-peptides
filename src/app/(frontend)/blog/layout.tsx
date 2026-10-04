import React from 'react'

// Metadata and JSON-LD for the blog index live in blog/page.tsx; individual posts define their own.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
