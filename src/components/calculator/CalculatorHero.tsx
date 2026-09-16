'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, Calculator } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'

const CALCULATOR_HERO_IMAGES = [
  {
    src: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    alt: 'Veracue research peptides collection with batch COA documentation',
    facility: 'Reconstitution Suite',
    label: 'U-100 Calibration',
  },
  {
    src: '/veracue-images/veracue-research-grade-50mg-gloved-hand.png',
    alt: 'Solid-phase peptide synthesis and analytical verification',
    facility: 'Solid-Phase Synthesis',
    label: 'Microgram Precision',
  },
  {
    src: '/veracue-images/veracue-klow-50mg-pool-water-ripples.webp',
    alt: 'Veracue aqueous solution reconstitution verification',
    facility: 'Aqueous Dilution',
    label: 'BAC Water Metrics',
  },
]

export function CalculatorHero() {
  const t = useTranslations('calculator.main.hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance hero slides every 5.5 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CALCULATOR_HERO_IMAGES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax scroll effect: as user scrolls, background moves gently
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            The Veracue Research Suite &bull; Precision Dosing &bull; Analytically Verified
          </p>

          {/* 2. Main Headline (H1) - Single line presentation on desktop */}
          <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-bold tracking-[-0.03em] text-neutral-900 leading-tight mb-1.5 sm:mb-2.5 sm:whitespace-nowrap">
            Peptide Reconstitution Calculator
          </h1>

          {/* 3. Sub-headline / Supporting Description */}
          <p className="text-neutral-500 text-[11.5px] sm:text-[13px] md:text-[14.5px] max-w-2xl leading-relaxed mb-2.5 sm:mb-4 font-normal px-1 line-clamp-3 sm:line-clamp-none">
            {t('description1') || 'The most precise peptide reconstitution calculator available for research laboratories. Enter your vial mass, bacteriostatic water volume, and target dose to obtain verified syringe draw units instantly.'}
          </p>

          {/* 4. Action HeroButtons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-4">
            <HeroButton 
              onClick={() => scrollToSection('calculators-hub')}
              className="cursor-pointer"
            >
              Launch Calculator
            </HeroButton>
            <HeroButton 
              variant="secondary"
              onClick={() => scrollToSection('reconstitution-guide')}
              className="cursor-pointer"
            >
              Reconstitution Guide &amp; Math
            </HeroButton>
          </div>
        </div>

        {/* 5. The Visual Feature Card Container - Exactly matches Header width */}
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10 flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[250px] flex flex-col">
          <div className="relative w-full h-full flex-1 rounded-2xl md:rounded-[18px] overflow-hidden bg-zinc-900">
            
            {/* Background Hero Images with Crossfade & Parallax */}
            <motion.div 
              className="absolute inset-x-0 -top-[12%] h-[125%] w-full will-change-transform"
              style={{ y: imageY, scale: imageScale }}
            >
              {CALCULATOR_HERO_IMAGES.map((img, idx) => {
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
                {CALCULATOR_HERO_IMAGES[currentImageIndex].facility}
              </span>
              <div className="flex items-center gap-1.5">
                {CALCULATOR_HERO_IMAGES.map((img, idx) => (
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

            {/* Top-Left Overlay (Key Stat: 100% Accuracy) */}
            <div className="absolute top-3.5 sm:top-7 md:top-9 left-3.5 sm:left-7 md:left-9 z-20 text-white text-left">
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-[-0.03em] text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
                100%
              </div>
              <p className="text-white/95 text-[10.5px] xs:text-xs sm:text-[13.5px] md:text-[15px] font-medium leading-snug mt-1 sm:mt-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-[140px] sm:max-w-[240px]">
                Analytical Accuracy,<br />Zero Manual Guesswork
              </p>
            </div>

            {/* Bottom-Right Overlay (U-100 & U-40 Calibration) */}
            <div className="absolute bottom-12 xs:bottom-14 sm:bottom-12 md:bottom-14 right-3 sm:right-7 md:right-10 z-20 text-white text-right sm:text-left max-w-[125px] xs:max-w-[160px] sm:max-w-[300px] md:max-w-[360px]">
              <h3 className="text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight text-white leading-tight mb-0.5 sm:mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
                Precision<br className="sm:hidden" /> Calibration
              </h3>
              <p className="hidden xs:block sm:hidden text-[9px] text-white/85 leading-snug line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Instant U-100 syringe units.
              </p>
              <p className="hidden sm:block text-white/90 text-xs sm:text-[13px] md:text-[14.5px] font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Accurately converts 2mg, 5mg, 10mg &amp; 30mg vials into exact unit graduations for laboratory protocols.
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
                      <span className="font-extrabold text-neutral-950">4-in-1</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Suite</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">U-100</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Syringe Standard</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">100%</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Mathematical Precision</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">ISO-7</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Cleanroom Synthesis</span>
                    </div>
                  </div>

                  {/* Set 2 */}
                  <div className="flex items-center gap-3 sm:gap-8 md:gap-12 shrink-0 pr-3 sm:pr-8 md:pr-12">
                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">4-in-1</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Suite</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">U-100</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Syringe Standard</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">100%</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Mathematical Precision</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                      <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border-[1.5px] sm:border-[2px] border-neutral-950 inline-block shrink-0" />
                      <span className="font-extrabold text-neutral-950">ISO-7</span>
                      <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Cleanroom Synthesis</span>
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
                <path d="M 58 58 L 56 58 C 29 58, 29 0, 2 0 L 0 0 L 0 58 Z" />
              </svg>
            </div>

          </div>
        </div>

      </section>
    </>
  )
}
