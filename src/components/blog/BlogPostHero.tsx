'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ShoppingBag } from 'lucide-react'

export function BlogPostHero({
  title,
  excerpt,
  category,
  date,
  readTime,
  authorName,
  imageSrc,
  imageAlt,
}: {
  title: string
  excerpt?: string
  category?: string
  date?: string
  readTime?: string
  authorName?: string
  imageSrc: string
  imageAlt: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"])

  // Marquee items — same scooped-pill dock component as the homepage Hero, just filled with
  // this post's own facts (category / date / read time) instead of the sitewide trust stats.
  const marqueeItems = [
    category || 'Research Article',
    date,
    readTime,
    authorName,
  ].filter(Boolean) as string[]

  return (
    <section
      style={{ backgroundColor: '#f0efeb' }}
      className="w-full pt-[100px] sm:pt-[116px] md:pt-[148px] pb-2.5 sm:pb-4 md:pb-5 font-sans min-h-[100dvh] md:h-screen md:min-h-[620px] flex flex-col overflow-hidden"
    >
      {/* Text block is shrink-0 (sized to its own content); the image below is flex-1, so a
          longer title/excerpt eats into the image's height instead of pushing the section
          taller than the viewport — same contract as the homepage Hero. */}
      <div className="w-full px-2 sm:px-6 md:px-10 shrink-0">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#525b4c] hover:text-[#20221c] text-xs font-bold uppercase tracking-widest transition-colors mb-3 sm:mb-5 md:mb-6"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Research Blog
          </Link>
        </motion.div>

        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 sm:mb-5 md:mb-6 max-w-4xl"
        >
          <h1 className="font-heading text-2xl/[1.16] xs:text-3xl/[1.15] sm:text-4xl/[1.12] md:text-5xl/[1.1] lg:text-[52px]/[1.08] font-bold text-[#20221c] tracking-[-0.02em] leading-[1.16] sm:leading-[1.12] md:leading-[1.1] lg:leading-[1.08] mb-2 sm:mb-4 text-balance">
            {title}
          </h1>

          {excerpt && (
            <p className="text-[#525b4c] text-xs sm:text-sm md:text-base tracking-wide font-medium leading-relaxed line-clamp-2 sm:line-clamp-none">
              {excerpt}
            </p>
          )}
        </motion.div>
      </div>

      {/* Visual Feature Card — the exact same rounded image card, cinematic vignette, and
          bottom scooped-pill marquee dock as the homepage Hero. flex-1 + min-h-0 lets it shrink
          to whatever space remains under the text block instead of forcing page scroll. */}
      <div className="w-full px-2 sm:px-6 md:px-10 flex-1 min-h-[130px] xs:min-h-[160px] sm:min-h-[200px] md:min-h-[220px] flex flex-col">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full flex-1 rounded-2xl md:rounded-[18px] overflow-hidden bg-zinc-900"
        >
          <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0 w-full h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Cinematic Vignette Overlay — identical to the homepage Hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35 pointer-events-none z-10" />

          {/* Top-Right: Category badge (same dock treatment as the homepage's slide-indicator chip) */}
          {category && (
            <div className="absolute top-3.5 sm:top-7 md:top-9 right-3.5 sm:right-7 md:right-9 z-20 flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase text-white/85 tracking-[0.16em]">
                {category}
              </span>
            </div>
          )}

          {/* Explore Products CTA (top-left, mirrors the homepage's overlay badge placement) */}
          <Link
            href="/shop"
            className="group absolute top-3.5 sm:top-7 md:top-9 left-3.5 sm:left-7 md:left-9 z-20 inline-flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-md text-[#20221c] rounded-full pl-3.5 pr-2 py-1.5 sm:pl-4 sm:pr-2 sm:py-2 shadow-xl transition-all duration-300 hover:scale-105 border border-white/60"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="font-heading font-bold uppercase tracking-widest text-[9px] sm:text-[10.5px]">
              Explore
            </span>
          </Link>

          {/* Bottom-Center Scooped Docked Pill with Moving Marquee — identical component to the
              homepage Hero, filled with this post's category / date / read time / author. */}
          <div
            style={{ bottom: '-3px' }}
            className="absolute left-1/2 -translate-x-1/2 z-20 flex items-end"
          >
            <svg
              style={{ color: '#f0efeb' }}
              className="w-7 xs:w-8 sm:w-11 md:w-14 h-8 xs:h-9 sm:h-11 md:h-14 shrink-0 pointer-events-none -mr-[1px]"
              viewBox="0 0 58 58"
              preserveAspectRatio="none"
              fill="currentColor"
              shapeRendering="geometricPrecision"
              aria-hidden="true"
            >
              <path d="M 0 58 L 2 58 C 29 58, 29 0, 56 0 L 58 0 L 58 58 Z" />
            </svg>

            <div
              style={{ backgroundColor: '#f0efeb' }}
              className="h-8 xs:h-9 sm:h-11 md:h-14 w-[210px] xs:w-[260px] sm:w-[420px] md:w-[560px] lg:w-[680px] max-w-[calc(100vw-80px)] overflow-hidden relative z-10 flex items-center"
            >
              <div
                style={{ background: 'linear-gradient(to right, #f0efeb, transparent)' }}
                className="absolute left-0 top-0 bottom-0 w-3.5 xs:w-5 sm:w-8 md:w-10 pointer-events-none z-20"
              />
              <div
                style={{ background: 'linear-gradient(to left, #f0efeb, transparent)' }}
                className="absolute right-0 top-0 bottom-0 w-3.5 xs:w-5 sm:w-8 md:w-10 pointer-events-none z-20"
              />

              <div className="flex w-max animate-marquee items-center [animation-duration:18s] hover:[animation-play-state:paused] font-heading select-none">
                {[0, 1].map((setIdx) => (
                  <div
                    key={setIdx}
                    aria-hidden={setIdx === 1}
                    className="flex items-center gap-3 sm:gap-8 md:gap-12 shrink-0 pr-3 sm:pr-8 md:pr-12"
                  >
                    {marqueeItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] whitespace-nowrap"
                      >
                        <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                        <span className="font-extrabold text-neutral-950">{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <svg
              style={{ color: '#f0efeb' }}
              className="w-7 xs:w-8 sm:w-11 md:w-14 h-8 xs:h-9 sm:h-11 md:h-14 shrink-0 pointer-events-none -ml-[1px]"
              viewBox="0 0 58 58"
              preserveAspectRatio="none"
              fill="currentColor"
              shapeRendering="geometricPrecision"
              aria-hidden="true"
            >
              <path d="M 0 0 L 2 0 C 29 0, 29 58, 56 58 L 58 58 L 0 58 Z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
