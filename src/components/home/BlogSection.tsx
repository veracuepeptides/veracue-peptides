'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { BlogPostCard } from '@/components/editorial/BlogPostCard'
import { HeroButton } from '@/components/ui/hero-button'

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

  const displayPosts = posts.slice(0, 3)

  return (
    <section className="font-sans relative z-30 py-10 sm:py-14 md:py-18 px-3 sm:px-6 md:px-10 bg-[#f0efeb]">
      <div className="bg-[#eddcd2]/30 border border-[#eddcd2] rounded-2xl sm:rounded-3xl md:rounded-[36px] p-5 sm:p-8 md:p-12 lg:p-14 w-full mx-auto overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">

        {/* Header Split — same pattern as BestSellerSection */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 sm:mb-12 md:mb-14 gap-5 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-block border border-[#eddcd2] rounded-full max-w-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-sm">
              <span className="text-[#a5a58d] text-[9px] xs:text-[9.5px] sm:text-xs font-bold tracking-[0.02em] xs:tracking-[0.06em] sm:tracking-[0.2em] uppercase font-editorial whitespace-nowrap">
                {t('eyebrow')}
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.08] tracking-tight uppercase">
              {t('titleLine1')} {t('titleLine2')}
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayPosts.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
              imageSrc={post.imageSrc}
              readTime={post.readTime}
              date={post.date}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 md:mt-14 flex justify-center">
          <HeroButton href="/blog">
            {t('ctaText')}
          </HeroButton>
        </div>

      </div>
    </section>
  )
}
