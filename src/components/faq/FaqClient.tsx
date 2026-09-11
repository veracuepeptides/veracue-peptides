'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Search, X, MessageSquare, ArrowRight, ShieldAlert, Sparkles, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { faqData } from '@/data/faqs'
import { FaqCategorySection, formatCategoryName } from './FaqCategorySection'
import { FaqHero } from './FaqHero'
import { HeroButton } from '@/components/ui/hero-button'

export function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0]?.category || '')
  const [headerHidden, setHeaderHidden] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const pillContainerRef = useRef<HTMLDivElement>(null)
  const lastYRef = useRef(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - lastYRef.current
    if (Math.abs(diff) > 20) {
      if (diff > 0 && y > 150) {
        setHeaderHidden(true)
      } else {
        setHeaderHidden(false)
      }
      lastYRef.current = y
    }
  })

  // Intersection Observer for highlighting active tab while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = null
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSection = entry.target.getAttribute('data-category')
            break
          }
        }
        if (visibleSection && !searchQuery) {
          setActiveCategory(visibleSection)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [searchQuery])

  // Center active category pill in scroll container
  useEffect(() => {
    const container = pillContainerRef.current
    if (!container || !activeCategory) return

    const slug = activeCategory.replace(/\s+/g, '-').toLowerCase()
    const activeButton = document.getElementById(`pill-category-${slug}`)

    if (activeButton) {
      const scrollLeft =
        activeButton.offsetLeft - container.clientWidth / 2 + activeButton.clientWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeCategory])

  const scrollToCategory = (category: string) => {
    setActiveCategory(category)
    const element = document.getElementById(
      `faq-category-${category.replace(/\s+/g, '-').toLowerCase()}`
    )
    if (element) {
      const offset = 140
      const y = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Filter logic across all FAQ categories & items
  const filteredFaqData = useMemo(() => {
    if (!searchQuery.trim()) return faqData
    const q = searchQuery.toLowerCase().trim()
    return faqData
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [searchQuery])

  const totalFilteredCount = useMemo(() => {
    return filteredFaqData.reduce((acc, cat) => acc + cat.items.length, 0)
  }, [filteredFaqData])

  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="min-h-screen relative font-sans text-[#20221c]">
      {/* 1. Dedicated FAQ Hero Component */}
      <FaqHero />

      {/* 2. Interactive Search & Knowledge Navigation */}
      <div id="faq-search-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 md:pt-16">
        {/* Search Input Bar */}
        <div className="relative w-full mb-8">
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#cb997e] transition-colors pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search questions by keyword, compound, purity, or shipping..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-full border border-[#eddcd2] bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus:outline-none focus:border-[#cb997e] text-sm sm:text-base text-[#20221c] placeholder:text-neutral-400 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 p-1 rounded-full cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className="text-xs sm:text-[13px] text-neutral-600 font-sans mt-2 ml-4">
              Found <strong className="text-neutral-950 font-bold">{totalFilteredCount}</strong> matching questions across the knowledge base
            </p>
          )}
        </div>

        {/* Floating Category Pills (when not actively filtering by free search) */}
        {!searchQuery && (
          <div
            className={`sticky z-30 mb-8 sm:mb-10 w-full transition-all duration-300 ease-out ${
              headerHidden ? 'top-4' : 'top-[80px] sm:top-[90px] md:top-[100px]'
            }`}
          >
            <div className="bg-[#f0efeb]/90 backdrop-blur-2xl border border-[#eddcd2] rounded-full shadow-[0_8px_30px_rgba(32,34,28,0.06)] p-1.5 flex items-center relative">
              {/* Left Fade */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-[#f0efeb] to-transparent rounded-l-full pointer-events-none z-10 hidden sm:block" />
              {/* Right Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#f0efeb] to-transparent rounded-r-full pointer-events-none z-10" />

              <div
                ref={pillContainerRef}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-1 py-0.5 w-full"
              >
                {filteredFaqData.map((categoryData) => {
                  const isActive = activeCategory === categoryData.category
                  const displayName = formatCategoryName(categoryData.category)
                  return (
                    <button
                      key={categoryData.category}
                      id={`pill-category-${categoryData.category.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => scrollToCategory(categoryData.category)}
                      className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-full font-sans text-xs sm:text-[13px] font-medium tracking-normal transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#20221c] text-[#fff1e6] shadow-sm'
                          : 'bg-white/85 hover:bg-white text-neutral-700 hover:text-neutral-950 border border-[#eddcd2]'
                      }`}
                    >
                      {displayName}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Accordion Content */}
        <main className="w-full pb-20">
          {filteredFaqData.length > 0 ? (
            filteredFaqData.map((categoryData, i) => (
              <div
                key={categoryData.category}
                id={`faq-category-${categoryData.category.replace(/\s+/g, '-').toLowerCase()}`}
                data-category={categoryData.category}
                ref={(el) => {
                  sectionRefs.current[i] = el
                }}
                className="scroll-mt-36"
              >
                <FaqCategorySection category={categoryData} />
              </div>
            ))
          ) : (
            <div className="bg-white/90 border border-[#eddcd2] rounded-3xl p-8 sm:p-14 text-center my-10 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#f0efeb] border border-[#eddcd2] flex items-center justify-center mx-auto mb-4 text-neutral-400">
                <Search size={22} />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#20221c] mb-2">
                No Frequently Asked Questions Found
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-5 leading-relaxed">
                We couldn&apos;t find any documentation matching &ldquo;{searchQuery}&rdquo;. Try using broader terms such as &ldquo;HPLC&rdquo;, &ldquo;storage&rdquo;, or &ldquo;reconstitution&rdquo;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] px-6 py-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              >
                Clear Search Query
              </button>
            </div>
          )}

          {/* 4. Support Specialist Direct Contact Card */}
          <div className="mt-14 sm:mt-20 bg-[#b7b7a4]/20 border border-[#b7b7a4]/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#eddcd2] shrink-0">
                  <Image
                    src="/veracue-images/support-avatar.jpg"
                    alt="Veracue Research Specialist"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-sans font-bold uppercase tracking-wider text-[#a05a39] bg-[#cb997e]/15 border border-[#cb997e]/30 px-2.5 py-0.5 rounded-full mb-1.5">
                    <Clock size={12} strokeWidth={2.4} />
                    <span>Average Response: &lt; 2 Hours</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl md:text-[26px] text-[#20221c] tracking-tight leading-snug">
                    Need Direct Technical Assistance?
                  </h3>
                  <p className="font-sans text-neutral-700 text-[13.5px] sm:text-[14.5px] mt-2 max-w-lg leading-relaxed font-normal">
                    Our scientific team can provide lot-specific certificates of analysis, bulk procurement pricing, and storage recommendations.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <HeroButton href="/contact-us" className="w-full sm:w-auto justify-center">
                  Contact Specialist
                </HeroButton>
              </div>
            </div>
          </div>

          {/* 5. RUO Research Compliance Notice */}
          <div className="mt-8 bg-[#20221c] border border-neutral-800 rounded-3xl p-6 sm:p-8 md:p-10 text-[#fff1e6] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#cb997e] shrink-0">
                <ShieldAlert size={20} strokeWidth={2.2} />
              </div>
              <div>
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#cb997e] block mb-2">
                  Compliance &amp; Research Protocol Notice
                </span>
                <p className="font-sans text-neutral-200 text-[13px] sm:text-[14.5px] leading-relaxed font-normal">
                  All peptide compounds supplied by Veracue are intended strictly for controlled laboratory research and analytical evaluation in academic or institutional settings. Products are labeled <strong className="text-white font-semibold">Research Use Only (RUO)</strong> and are not intended for human or veterinary use, medical diagnosis, or therapeutic application.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
