'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export type BlogSectionPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  imageSrc: string
  readTime: string
  date: string
}

export function BlogSection({ posts }: { posts: BlogSectionPost[] }) {
  const t = useTranslations('home.blogSection')

  if (!posts || posts.length === 0) return null

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 4)

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-32 font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-10 max-w-[1300px]">
        {/* Header */}
        <div className="flex flex-col mb-16">
          <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-sm w-fit">
            <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">Blog</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111] leading-[1.05] tracking-tight max-w-4xl font-heading">
            {t('titleLine1')} {t('titleLine2')}
          </h2>
        </div>

        {/* Featured Post (Horizontal) */}
        {featuredPost && (
          <Link href={`/${featuredPost.slug}`} className="group block mb-6">
            <div className="bg-white rounded-[2rem] p-4 lg:p-6 shadow-sm border border-black/5 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 flex flex-col lg:flex-row gap-6 lg:gap-12">
              
              <div className="relative w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto lg:h-[450px] rounded-[1.5rem] overflow-hidden shrink-0">
                <Image
                  src={featuredPost.imageSrc}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>

              <div className="flex flex-col justify-center flex-1 py-4 lg:py-8 pr-4 lg:pr-10">
                <div className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-6 w-fit">
                  {featuredPost.category}
                </div>
                <h3 className="text-3xl lg:text-[2.5rem] font-bold text-gray-900 mb-6 leading-[1.15] group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative">
                      <Image src="/HelixBio Images/hero-1.png" alt="HelixBio Research team author avatar" fill className="object-cover" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">HelixBio Research</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{featuredPost.date}</span>
                </div>
              </div>

            </div>
          </Link>
        )}

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="group block">
              <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-black/5 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 h-full flex flex-col">
                <div className="relative w-full aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6">
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                <div className="px-2 pb-2 flex flex-col flex-1">
                  <div className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-full mb-4 w-fit">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-[1.3] group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                     <span className="text-sm font-semibold text-gray-700">HelixBio</span>
                     <span className="text-xs text-gray-500 font-medium">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/blog" className="px-10 py-4 bg-[#222] text-white text-sm font-bold rounded-[10px] uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-black/10">
            {t('ctaText')}
          </Link>
        </div>

      </div>
    </section>
  )
}
