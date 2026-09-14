'use client'

import React, { useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { FadeUp } from '@/components/motion/FadeUp'
import { BlogPostCard } from '@/components/editorial/BlogPostCard'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogNewsletter } from '@/components/blog/BlogNewsletter'
import { HeroButton } from '@/components/ui/hero-button'
import {
  Search,
  X,
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldAlert,
  Mail,
} from 'lucide-react'

export type BlogIndexPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  imageSrc: string
  readTime: string
  date: string
  sortDate: string
}

const ALL_LABEL = 'All Articles'
const DEFAULT_CATEGORIES = [
  'Recovery protocols',
  'Metabolic research',
  'Growth research',
  'Muscle studies',
  'Synthesis & Testing',
]

export function BlogIndexClient({ posts }: { posts: BlogIndexPost[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL)
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)
  const [isCopied, setIsCopied] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const categoriesScrollRef = useRef<HTMLDivElement>(null)
  const lastScrollYRef = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (typeof window !== 'undefined') {
      const currentScrollY = latest
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 140) {
        if (!isScrollingDown) setIsScrollingDown(true)
      } else if (currentScrollY < lastScrollYRef.current) {
        if (isScrollingDown) setIsScrollingDown(false)
      }
      lastScrollYRef.current = currentScrollY
    }
  })

  // Assemble unique categories
  const categories = useMemo(() => {
    const presentInPosts = new Set(posts.map((p) => p.category).filter(Boolean))
    const list = [ALL_LABEL]
    DEFAULT_CATEGORIES.forEach((cat) => {
      if (presentInPosts.has(cat) || posts.length === 0) {
        list.push(cat)
      }
    })
    // Add any remaining categories from posts
    presentInPosts.forEach((cat) => {
      if (!list.includes(cat)) {
        list.push(cat)
      }
    })
    return list
  }, [posts])

  // Sort posts by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
  }, [posts])

  // Apply category and search filters
  const filteredPosts = useMemo(() => {
    let result = sortedPosts

    if (activeCategory !== ALL_LABEL) {
      result = result.filter((post) => post.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      )
    }

    return result
  }, [sortedPosts, activeCategory, searchQuery])

  // Spotlight post (top post when on All Articles and not searching)
  const spotlightPost = activeCategory === ALL_LABEL && !searchQuery.trim() ? sortedPosts[0] : null
  const gridPosts = spotlightPost ? filteredPosts.slice(1) : filteredPosts

  const hasMore = visibleCount < gridPosts.length

  const handleShare = async (e: React.MouseEvent, post: BlogIndexPost) => {
    e.preventDefault()
    e.stopPropagation()
    const url = typeof window !== 'undefined' ? `${window.location.origin}/${post.slug}` : `/${post.slug}`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url,
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    }
  }

  return (
    <main style={{ backgroundColor: '#f0efeb' }} className="w-full text-[#20221c] min-h-screen font-sans overflow-x-clip">
      {/* 1. Signature Veracue Hero Section */}
      <BlogHero />

      {/* 2. Main Editorial Browser Anchor */}
      <div id="articles-archive" className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        
        {/* Compliance / Laboratory Notice Banner */}
        <section className="mb-8 sm:mb-12">
          <FadeUp delay={0.1}>
            <div className="bg-white/80 backdrop-blur-sm border border-[#eddcd2] rounded-2xl sm:rounded-[22px] p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-3.5 sm:gap-5 items-start sm:items-center">
              <div className="shrink-0 bg-[#20221c]/5 p-2.5 rounded-full hidden sm:flex items-center justify-center text-[#20221c]">
                <ShieldAlert className="w-5 h-5 text-[#cb997e]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert className="w-4 h-4 text-[#cb997e] sm:hidden shrink-0" />
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#20221c]">
                    Laboratory Research Standards &bull; Analytical Documentation
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  All articles, reconstitution guides, and scientific monographs published in the Veracue Research Archive are prepared exclusively for educational and laboratory investigation. Peptides referenced are distributed strictly for in-vitro analytical research.
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* 3. Sticky Filter & Live Search Capsule */}
        <section
          className={`sticky z-30 transition-all duration-300 mb-8 sm:mb-12 ${
            isScrollingDown ? 'top-3 sm:top-5' : 'top-[76px] sm:top-[88px] md:top-[100px]'
          }`}
        >
          <div className="bg-[#f0efeb]/90 backdrop-blur-2xl border border-[#eddcd2] rounded-2xl sm:rounded-[22px] p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(32,34,28,0.06)] flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-3">
              
              {/* Category Pills Strip */}
              <div className="relative flex-1 min-w-0 overflow-hidden">
                {/* Right Fade Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#f0efeb] to-transparent pointer-events-none z-10" />

                <div
                  ref={categoriesScrollRef}
                  className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 sm:gap-2 px-1 py-1"
                >
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat)
                          setVisibleCount(6)
                        }}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#20221c] text-[#fff1e6] shadow-sm'
                            : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 border border-[#eddcd2]/70'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Controls Group: Live Search & Active Counter */}
              <div className="flex items-center gap-2 shrink-0 pt-1 md:pt-0 border-t border-[#eddcd2]/50 md:border-t-0 px-1">
                <div className="relative flex-1 sm:w-52 md:w-64">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setVisibleCount(6)
                    }}
                    placeholder="Search articles & protocols..."
                    className="w-full pl-9 pr-7 py-2 sm:py-2.5 text-xs sm:text-[13px] bg-white/90 focus:bg-white border border-[#eddcd2] rounded-full text-[#20221c] placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 p-0.5 rounded-full"
                      aria-label="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Article Count Badge */}
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/80 border border-[#eddcd2] text-[11px] font-semibold text-neutral-600 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
                  <span>{filteredPosts.length} Articles</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Featured Spotlight Article Bento Card */}
        {spotlightPost && (
          <section className="mb-12 sm:mb-16">
            <FadeUp delay={0.2}>
              <div className="mb-4 sm:mb-6 px-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#cb997e]" />
                  <span className="font-serif uppercase tracking-[0.16em] text-xs font-semibold text-neutral-700">
                    Featured Research Monograph
                  </span>
                </div>
                <span className="text-xs text-neutral-400 hidden sm:inline-block">
                  Latest Scientific Publication
                </span>
              </div>

              <div className="group relative bg-white border border-[#eddcd2] rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(32,34,28,0.04)] hover:shadow-[0_16px_48px_rgba(32,34,28,0.08)] transition-all duration-500">
                <div className="flex flex-col lg:flex-row items-stretch">
                  
                  {/* Left Hero Visual */}
                  <div className="relative w-full lg:w-[54%] aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] bg-zinc-900 overflow-hidden shrink-0">
                    <Image
                      src={spotlightPost.imageSrc}
                      alt={spotlightPost.title}
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                    {/* Category & Verified Badge Overlay */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#20221c] text-xs font-bold uppercase tracking-wider shadow-md border border-white/60">
                        {spotlightPost.category || 'Featured'}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#20221c]/80 backdrop-blur-md text-[#fff1e6] text-xs font-bold uppercase tracking-wider border border-white/10">
                        Peer Reviewed
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 text-white/80 text-xs flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#cb997e]" />
                        {spotlightPost.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#cb997e]" />
                        {spotlightPost.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Right Editorial Info */}
                  <div className="w-full lg:w-[46%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#cb997e]" />
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#cb997e]">
                          Monograph Spotlight
                        </span>
                      </div>

                      <Link href={`/${spotlightPost.slug}`}>
                        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold font-heading text-[#20221c] leading-[1.2] mb-3 sm:mb-5 group-hover:text-[#cb997e] transition-colors duration-300">
                          {spotlightPost.title}
                        </h2>
                      </Link>

                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6 line-clamp-4">
                        {spotlightPost.excerpt}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-[#eddcd2]/70 flex items-center justify-between gap-3">
                      {/* Natural width button on mobile! */}
                      <Link
                        href={`/${spotlightPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Read Monograph</span>
                      </Link>

                      {/* Share Button */}
                      <button
                        onClick={(e) => handleShare(e, spotlightPost)}
                        className="p-2.5 sm:p-3 rounded-full bg-[#f0efeb] hover:bg-[#20221c] text-[#20221c] hover:text-white transition-colors duration-300 shrink-0 border border-[#eddcd2]"
                        aria-label="Share article"
                        title={isCopied ? 'Link copied!' : 'Share article'}
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </FadeUp>
          </section>
        )}

        {/* 5. Section Header for Grid */}
        <div className="mb-6 sm:mb-8 px-1 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-[#20221c] tracking-tight">
              {activeCategory === ALL_LABEL
                ? 'All Research Publications'
                : `${activeCategory} Articles`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
              {searchQuery
                ? `Matching "${searchQuery}" (${filteredPosts.length} results)`
                : `Showing ${filteredPosts.length} verified research articles`}
            </p>
          </div>
        </div>

        {/* 6. Article Grid */}
        <section className="mb-14 sm:mb-20">
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {gridPosts.slice(0, visibleCount).map((post, index) => (
                <FadeUp key={post.slug} delay={0.08 * (index % 3)}>
                  <BlogPostCard {...post} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <FadeUp>
              <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center bg-white/60 border border-[#eddcd2] rounded-2xl sm:rounded-[22px]">
                <div className="w-12 h-12 rounded-full bg-[#f0efeb] border border-[#eddcd2] flex items-center justify-center text-neutral-400 mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[#20221c] mb-2">
                  No matching research articles found
                </h3>
                <p className="text-sm text-neutral-500 max-w-md mb-6">
                  {searchQuery
                    ? `No publications matched "${searchQuery}" in ${activeCategory}. Try adjusting your search query or selecting a different category.`
                    : `No publications currently listed in ${activeCategory}. Check back shortly for new peer-reviewed monographs.`}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory(ALL_LABEL)
                    setSearchQuery('')
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  <span>Reset All Filters</span>
                </button>
              </div>
            </FadeUp>
          )}
        </section>

        {/* 7. Load More Action */}
        {hasMore && (
          <section className="mb-16 sm:mb-24 flex justify-center items-center px-4 w-full">
            <FadeUp>
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-xs font-bold tracking-widest uppercase cursor-pointer"
              >
                <span>Load More Publications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FadeUp>
          </section>
        )}

        {/* 8. Modern Veracue Research Digest Bulletin */}
        <section className="w-full">
          <FadeUp delay={0.2}>
            <BlogNewsletter />
          </FadeUp>
        </section>

      </div>
    </main>
  )
}
