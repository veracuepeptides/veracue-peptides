'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Award, ShieldCheck, FileCheck2, Sparkles } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'

const ABOUT_HERO_IMAGES = [
  {
    src: '/veracue-images/veracue-military-researcher-lab.jpg',
    alt: 'Veracue state-of-the-art laboratory and cleanroom facility',
    facility: 'US Cleanroom Facility',
  },
  {
    src: '/veracue-images/veracue-research-grade-50mg-gloved-hand.png',
    alt: 'Solid-phase peptide synthesis and analytical verification',
    facility: 'Solid-Phase Synthesis',
  },
  {
    src: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    alt: 'Veracue research peptides collection with batch COA documentation',
    facility: 'Batch COA Archives',
  },
]

const STATS_DATA = [
  {
    value: '2018',
    label: 'FOUNDING HERITAGE',
    detail: 'Dedicated synthesis protocols',
    icon: Award,
  },
  {
    value: '≥99.2%',
    label: 'HPLC VERIFIED PURITY',
    detail: 'Documented peak separation',
    icon: ShieldCheck,
  },
  {
    value: '100%',
    label: 'BATCH-SPECIFIC COAs',
    detail: 'Public analytical archives',
    icon: FileCheck2,
  },
  {
    value: '50+',
    label: 'RESEARCH COMPOUNDS',
    detail: 'Solid-phase peptide catalog',
    icon: Sparkles,
  },
]

export function AboutHero() {
  const t = useTranslations('content.aboutHero')
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance hero slides every 5.5 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ABOUT_HERO_IMAGES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax scroll effect: as the user scrolls, the background image gently moves and expands
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', shouldReduceMotion ? '0%' : '18%']
  )
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.08]
  )

  return (
    <>
      {/* ==================================================================== */}
      {/* HOMEPAGE-MATCHING FULL-VIEWPORT HERO SECTION                         */}
      {/* ==================================================================== */}
      <section 
        ref={containerRef}
        style={{ backgroundColor: '#f0efeb' }}
        className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-2.5 sm:pb-4 md:pb-5 font-sans min-h-[100dvh] md:h-screen md:min-h-[620px] flex flex-col items-center justify-between overflow-hidden"
      >
        
        {/* Top Header & Intro Block */}
        <div className="flex flex-col items-center text-center shrink-0 w-full max-w-5xl px-3">
          {/* 1. Eyebrow Tagline */}
          <p className="font-serif tracking-[0.16em] sm:tracking-[0.24em] text-[9.5px] sm:text-[11.5px] md:text-[12px] uppercase text-neutral-700 font-normal mb-1.5 sm:mb-2">
            The Veracue Pedigree &bull; Synthesized for Precision &bull; Verified for Purity
          </p>

          {/* 2. Main Headline (H1) */}
          <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-bold tracking-[-0.03em] text-neutral-900 leading-tight mb-1.5 sm:mb-2.5 sm:whitespace-nowrap">
            Synthesizing Purity. Advancing Science.
          </h1>

          {/* 3. Sub-headline / Supporting Description */}
          <p className="text-neutral-500 text-[11.5px] sm:text-[13px] md:text-[14.5px] max-w-2xl leading-relaxed mb-2.5 sm:mb-4 font-normal px-1 line-clamp-3 sm:line-clamp-none">
            {t('subtitle')}
          </p>

          {/* 4. Action HeroButtons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-4">
            <HeroButton href="/shop">
              Explore Peptides
            </HeroButton>
            <HeroButton 
              href="/certificates" 
              variant="secondary"
            >
              View Batch COAs
            </HeroButton>
          </div>
        </div>

        {/* 5. The Visual Feature Card Container - Exactly matches Homepage Hero */}
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10 flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[250px] flex flex-col">
          <div className="relative w-full h-full flex-1 rounded-2xl md:rounded-[18px] overflow-hidden bg-zinc-900">
            
            {/* Background Hero Images with Crossfade & Parallax */}
            <motion.div 
              className="absolute inset-x-0 -top-[12%] h-[125%] w-full will-change-transform"
              style={{ y: imageY, scale: imageScale }}
            >
              {ABOUT_HERO_IMAGES.map((img, idx) => {
                const isActive = idx === currentImageIndex
                return (
                  <motion.div
                    key={img.src}
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1.025 : 1,
                    }}
                    transition={{
                      opacity: { duration: 1.2, ease: 'easeInOut' },
                      scale: { duration: 5.5, ease: 'easeOut' },
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/35 pointer-events-none z-10" />

            {/* Top-Right Overlay: Slide Indicators & Active Facility */}
            <div className="absolute top-3.5 sm:top-7 md:top-9 right-3.5 sm:right-7 md:right-9 z-20 flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <span className="text-[10px] sm:text-[11px] font-sans font-medium uppercase text-white/85 tracking-[0.16em] hidden xs:inline-block">
                {ABOUT_HERO_IMAGES[currentImageIndex].facility}
              </span>
              <div className="flex items-center gap-1.5">
                {ABOUT_HERO_IMAGES.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setCurrentImageIndex(idx)}
                    className="cursor-pointer py-1 group flex items-center"
                    aria-label={`Go to slide ${idx + 1}: ${img.facility}`}
                  >
                    <span
                      className={`block h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentImageIndex
                          ? 'w-5 sm:w-6 bg-white'
                          : 'w-1.5 sm:w-2 bg-white/40 group-hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Top-Left Overlay (Key Stat & Purity) */}
            <div className="absolute top-3.5 sm:top-7 md:top-9 left-3.5 sm:left-7 md:left-9 z-20 text-white text-left">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-[-0.03em] text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
                2018
              </div>
              <p className="text-white/95 text-[10.5px] xs:text-xs sm:text-[13.5px] md:text-[15px] font-medium leading-snug mt-1 sm:mt-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-[140px] sm:max-w-[240px]">
                Founded Heritage,<br />HPLC Tested &amp; Certified
              </p>
            </div>

            {/* Bottom-Right Overlay (Third-Party Testing & Verification) */}
            <div className="absolute bottom-12 xs:bottom-14 sm:bottom-12 md:bottom-14 right-3 sm:right-7 md:right-10 z-20 text-white text-right sm:text-left max-w-[125px] xs:max-w-[160px] sm:max-w-[300px] md:max-w-[360px]">
              <h3 className="text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight text-white leading-tight mb-0.5 sm:mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
                Analytical<br className="sm:hidden" /> Rigor
              </h3>
              <p className="hidden xs:block sm:hidden text-[9px] text-white/85 leading-snug line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                RP-HPLC &amp; mass spec tested.
              </p>
              <p className="hidden sm:block text-white/90 text-xs sm:text-[13px] md:text-[14.5px] font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Every synthesis batch undergoes third-party chromatographic verification before lot release.
              </p>
            </div>

            {/* Bottom-Center Inverted Scooped-Out Docked Pill with Moving Marquee (Signature Homepage Element) */}
            <div 
              style={{ bottom: '-3px' }}
              className="absolute left-1/2 -translate-x-1/2 z-20 flex items-end"
            >
              {/* Left Scooped S-Curve Ear */}
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

              {/* Center Dock with Infinite Marquee */}
              <div 
                style={{ backgroundColor: '#f0efeb' }}
                className="h-8 xs:h-9 sm:h-11 md:h-14 w-[210px] xs:w-[260px] sm:w-[500px] md:w-[680px] lg:w-[840px] max-w-[calc(100vw-80px)] overflow-hidden relative z-10 flex items-center"
              >
                {/* Left edge fade overlay */}
                <div 
                  style={{ background: 'linear-gradient(to right, #f0efeb, transparent)' }}
                  className="absolute left-0 top-0 bottom-0 w-3.5 xs:w-5 sm:w-8 md:w-10 pointer-events-none z-20" 
                />
                
                {/* Right edge fade overlay */}
                <div 
                  style={{ background: 'linear-gradient(to left, #f0efeb, transparent)' }}
                  className="absolute right-0 top-0 bottom-0 w-3.5 xs:w-5 sm:w-8 md:w-10 pointer-events-none z-20" 
                />

                <div className="flex w-max animate-marquee items-center [animation-duration:22s] hover:[animation-play-state:paused] font-heading select-none">
                  {/* Set 1 */}
                  <div className="flex items-center gap-3 sm:gap-8 md:gap-12 shrink-0 pr-3 sm:pr-8 md:pr-12">
                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">2018</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Founded</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="text-neutral-950 font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                      <span className="font-extrabold text-neutral-950">HPLC</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Verified</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-neutral-950 bg-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">ISO-7</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Cleanroom</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-neutral-950 to-transparent border border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">USA</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Synthesized</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="text-neutral-950 font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                      <span className="font-extrabold text-neutral-950">99%+</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Purity</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-neutral-950 bg-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">Batch COA</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Published</span>
                    </div>
                  </div>

                  {/* Set 2 (Duplicate for Seamless -50% Marquee Loop) */}
                  <div className="flex items-center gap-3 sm:gap-8 md:gap-12 shrink-0 pr-3 sm:pr-8 md:pr-12" aria-hidden="true">
                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">2018</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Founded</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="text-neutral-950 font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                      <span className="font-extrabold text-neutral-950">HPLC</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Verified</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-neutral-950 bg-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">ISO-7</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Cleanroom</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-neutral-950 to-transparent border border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">USA</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Synthesized</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="text-neutral-950 font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                      <span className="font-extrabold text-neutral-950">99%+</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Purity</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-neutral-950 bg-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">Batch COA</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Published</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Scooped S-Curve Ear */}
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
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4-COLUMN KEY METRICS STRIP                                           */}
      {/* ==================================================================== */}
      <section className="w-full bg-[#f0efeb] py-8 sm:py-10 md:py-12 select-none font-sans">
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {STATS_DATA.map((stat, idx) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-[20px] sm:rounded-[24px] md:rounded-[28px] p-5 sm:p-6 md:p-7 border border-[#b7b7a4]/40 shadow-[0_4px_16px_rgba(32,34,28,0.03)] hover:shadow-[0_8px_24px_rgba(32,34,28,0.06)] hover:border-[#cb997e]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center text-[#cb997e]">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-sans text-neutral-400 font-bold uppercase tracking-[0.16em]">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 font-heading tracking-tight block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider block mt-1">
                      {stat.label}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-400 font-light block mt-0.5">
                      {stat.detail}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
