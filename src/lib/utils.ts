import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getOgImageUrl(
  title: string,
  description?: string,
  image?: string,
  category?: string,
  bg?: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://veracuepeptides.com'
  const url = new URL('/api/og', baseUrl)
  url.searchParams.set('title', title)
  if (description) {
    url.searchParams.set('description', description)
  }
  if (image) {
    url.searchParams.set('image', image)
  }
  if (category) {
    url.searchParams.set('category', category)
  }
  if (bg) {
    url.searchParams.set('bg', bg)
  }
  return url.toString()
}

// Some upload collections (e.g. products, blog-media) store already-absolute R2 URLs,
// while others store relative local paths — only prefix baseUrl onto relative ones, or
// absolute URLs get incorrectly doubled up (e.g. "http://site.comhttps://r2.dev/...").
export function toAbsoluteUrl(baseUrl: string, url: string): string {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}

export function encodeImageUrl(url: string | undefined): string {
  if (!url) return ''
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url)
      parsed.pathname = parsed.pathname.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
      return parsed.toString()
    }
    return url.split('/').map(s => encodeURIComponent(decodeURIComponent(s))).join('/')
  } catch (e) {
    return url
  }
}
