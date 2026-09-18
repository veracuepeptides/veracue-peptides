'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { HeroButton } from '@/components/ui/hero-button'
import { Award, ShieldCheck, Activity, FlaskConical } from 'lucide-react'

const CERT_HERO_IMAGES = [
  {
    src: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    alt: 'Veracue Verified Lot Archive and Lyophilized Peptide Collection',
    topic: 'Verified Lot Archive',
    spec: 'Dual-Method Testing',
  },
  {
    src: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-white.webp',
    alt: 'Veracue Cleanroom Synthesis and HPLC Quality Assurance',
    topic: 'Cleanroom Synthesis',
    spec: 'ISO-7 Verified',
  },
  {
    src: '/veracue-images/veracue-klow-50mg-pool-water-ripples.webp',
    alt: 'Veracue Analytical Chromatography and Laboratory Purity Testing',
    topic: 'Analytical HPLC',
    spec: 'UV-214nm Detection',
  },
  {
    src: '/veracue-images/veracue-epithalon-50mg-water-ripples-landscape.webp',
    alt: 'Veracue High-Resolution Mass Spectrometry Sequence Confirmation',
    topic: 'Mass Spectrometry',
    spec: '±0.05 Da Mass Match',
  },
]

export function CertificatesHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance slides every 5.5 seconds matching Homepage & Affiliates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CERT_HERO_IMAGES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax scroll effect
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

  const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('library')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToProtocol = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('protocol')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      style={{ backgroundColor: '#f0efeb' }}
      className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-2.5 sm:pb-4 md:pb-5 font-sans min-h-[100dvh] md:h-screen md:min-h-[620px] flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Top Header & Intro Block */}
      <div className="flex flex-col items-center text-center shrink-0 w-full max-w-5xl px-3">
        {/* 1. Eyebrow Tagline with Olive Green (#a5a58d) Accent */}
        <p className="font-serif tracking-[0.16em] sm:tracking-[0.24em] text-[9.5px] sm:text-[11.5px] md:text-[12px] uppercase text-[#a5a58d] font-semibold mb-1.5 sm:mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d] inline-block" />
          <span>Analytical HPLC Verification &bull; Mass Spectrometry &bull; Third-Party US Labs</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d] inline-block" />
        </p>

        {/* 2. Main Headline (H1) */}
        <h1 className="text-[22px]/[1.15] xs:text-2xl/[1.15] sm:text-3xl/[1.12] md:text-4xl/[1.1] lg:text-[44px]/[1.08] xl:text-[50px]/[1.08] font-bold tracking-[-0.03em] text-neutral-900 leading-[1.15] sm:leading-[1.12] md:leading-[1.1] lg:leading-[1.08] mb-1.5 sm:mb-2.5 font-heading text-balance max-w-4xl">
          Verified Certificates of Analysis
        </h1>

        {/* 3. Sub-headline / Supporting Description */}
        <p className="text-neutral-500 text-[11.5px] sm:text-[13px] md:text-[14.5px] max-w-2xl leading-relaxed mb-2.5 sm:mb-4 font-normal px-1 line-clamp-3 sm:line-clamp-none">
          Study with absolute confidence. Every batch synthesized by Veracue ships with accredited US third-party HPLC chromatography and mass spectrometry reports verifying &ge;99.0% baseline purity.
        </p>

        {/* 4. Action HeroButtons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-4">
          <HeroButton
            href="#library"
            onClick={handleScrollToLibrary}
            direction="down"
          >
            Explore COA Library
          </HeroButton>
          <HeroButton
            href="#protocol"
            onClick={handleScrollToProtocol}
            variant="secondary"
          >
            Testing Methodology
          </HeroButton>
        </div>
      </div>

      {/* 5. The Visual Feature Card Container - Exactly matches Header width & alignment */}
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10 flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[250px] flex flex-col">
        <div className="relative w-full h-full flex-1 rounded-2xl md:rounded-[18px] overflow-hidden bg-zinc-900 border border-[#b7b7a4]/50 shadow-md">
          {/* Background Hero Images with Crossfade & Parallax */}
          <motion.div
            className="absolute inset-x-0 -top-[12%] h-[125%] w-full will-change-transform"
            style={{ y: imageY, scale: imageScale }}
          >
            {CERT_HERO_IMAGES.map((img, idx) => {
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40 pointer-events-none z-10" />

          {/* Top-Right Overlay: Slide Indicators & Active Topic Pill with Olive Green */}
          <div className="absolute top-3.5 sm:top-7 md:top-9 right-3.5 sm:right-7 md:right-9 z-20 flex items-center gap-1.5 sm:gap-2.5 bg-black/50 backdrop-blur-md px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#a5a58d]/40 shadow-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#a5a58d] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-white/90 tracking-[0.16em] hidden sm:inline-block">
              {CERT_HERO_IMAGES[currentImageIndex].topic}
            </span>
            <span className="text-[10px] font-mono text-[#a5a58d] hidden md:inline-block">
              &bull; {CERT_HERO_IMAGES[currentImageIndex].spec}
            </span>
            <div className="flex items-center gap-1.5 ml-0.5 sm:ml-1">
              {CERT_HERO_IMAGES.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="cursor-pointer py-1 group flex items-center"
                  aria-label={`Go to slide ${idx + 1}: ${img.topic}`}
                >
                  <span
                    className={`block h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentImageIndex
                        ? 'w-4 sm:w-6 bg-[#a5a58d]'
                        : 'w-1.5 sm:w-2 bg-white/40 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Top-Left Overlay: Purity Benchmark & Olive Green Verified Stamp */}
          <div className="absolute top-3.5 sm:top-7 md:top-9 left-3.5 sm:left-7 md:left-9 z-20 text-white text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#a5a58d] text-white text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider font-heading mb-1.5 sm:mb-2 shadow-sm border border-white/20 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Third-Party Verified</span>
            </div>
            <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-[-0.03em] text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
              &ge;99.0%
            </div>
            <p className="text-white/95 text-[10px] xs:text-[11px] sm:text-[13.5px] md:text-[15px] font-medium leading-snug mt-1 sm:mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-[150px] sm:max-w-[260px]">
              HPLC Area Normalization,<br />
              Mass Spectrometry Verified
            </p>
          </div>

          {/* Bottom-Right Overlay: Testing Scope */}
          <div className="absolute bottom-12 xs:bottom-14 sm:bottom-12 md:bottom-14 right-3 sm:right-7 md:right-10 z-20 text-white text-right sm:text-left max-w-[130px] xs:max-w-[170px] sm:max-w-[320px] md:max-w-[380px]">
            <div className="inline-flex items-center gap-1.5 text-[#a5a58d] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Orthogonal Validation</span>
            </div>
            <h3 className="text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-[26px] font-extrabold tracking-tight text-white leading-tight mb-0.5 sm:mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-heading">
              Accredited US<br className="sm:hidden" /> Laboratories
            </h3>
            <p className="hidden sm:block text-white/90 text-xs sm:text-[13px] md:text-[14.5px] font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Independent laboratory dockets verify sequence fidelity, purity percentage, and trace residual limits before catalog release.
            </p>
          </div>

          {/* Bottom-Center Inverted Scooped-Out Docked Pill with Moving Marquee */}
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
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">≥99%</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Purity</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="text-[#a5a58d] font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                    <span className="font-extrabold text-[#20221c]">HPLC</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Verified</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-[#a5a58d] bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">100%</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Lot Tested</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#a5a58d] to-transparent border border-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">US</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Laboratories</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="text-[#a5a58d] font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                    <span className="font-extrabold text-[#20221c]">MASS SPEC</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Confirmed</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-[#a5a58d] bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">ISO-7</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Synthesis</span>
                  </div>
                </div>

                {/* Set 2 (Duplicated for seamless loop) */}
                <div className="flex items-center gap-3 sm:gap-8 md:gap-12 shrink-0 pr-3 sm:pr-8 md:pr-12">
                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">≥99%</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Purity</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="text-[#a5a58d] font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                    <span className="font-extrabold text-[#20221c]">HPLC</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Verified</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-[#a5a58d] bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">100%</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Lot Tested</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-[#a5a58d] to-transparent border border-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">US</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Laboratories</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="text-[#a5a58d] font-bold text-[9px] xs:text-[10px] sm:text-base leading-none">✦</span>
                    <span className="font-extrabold text-[#20221c]">MASS SPEC</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Confirmed</span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2.5 text-[10.5px] xs:text-[11.5px] sm:text-[14px] md:text-[15.5px] tracking-[-0.015em] tabular-nums whitespace-nowrap">
                    <span className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full border border-[#a5a58d] bg-[#a5a58d] inline-block shrink-0" />
                    <span className="font-extrabold text-[#20221c]">ISO-7</span>
                    <span className="font-medium text-neutral-600 -ml-0.5 sm:-ml-1">Synthesis</span>
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
  )
}
