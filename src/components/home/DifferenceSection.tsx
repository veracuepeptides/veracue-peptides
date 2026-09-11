'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ShieldCheck, Award, PackageCheck, Sparkles, CheckCircle2 } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'

const RESEARCH_PILLARS = [
  {
    id: 'purity',
    badge: '≥99.2% PURITY',
    scriptTitle: 'Pure Synthesis',
    heading: 'HPLC & Mass Spec Verified',
    description: 'Every compound undergoes exhaustive independent chromatographic analysis guaranteeing documented peak chemical purity.',
    spec: 'USP Grade • ≥99.2% Confirmed',
    image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp',
    icon: ShieldCheck,
  },
  {
    id: 'formulation',
    badge: 'ISO-7 CLEANROOM',
    scriptTitle: 'Precision Batch',
    heading: 'Controlled Formulation',
    description: 'Synthesized in certified United States laboratories under strictly regulated laminar flow hoods and sterile cleanroom controls.',
    spec: 'c-GMP Compliant • Sterile Vialing',
    image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp',
    icon: PackageCheck,
  },
  {
    id: 'expertise',
    badge: '10+ YEARS EXP',
    scriptTitle: 'Scientific Rigor',
    heading: 'Lyophilized Stability',
    description: 'Over a decade of biomedical expertise optimizing molecular integrity, lyophilization cake density, and cold-chain resilience.',
    spec: 'Cold-Chain Preserved • Lot COA',
    image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp',
    icon: Award,
  },
]

export function DifferenceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-linked parallax: the text ONLY moves horizontally when the user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Alternating scroll translations for the stacked background marquee rows
  const x1 = useTransform(scrollYProgress, [0, 1], [-240, 240])
  const x2 = useTransform(scrollYProgress, [0, 1], [240, -240])
  const x3 = useTransform(scrollYProgress, [0, 1], [-200, 200])

  return (
    <section 
      ref={containerRef}
      className="font-sans relative z-20 w-full py-14 sm:py-18 md:py-22 lg:py-26 bg-[#a5a58d] border-y border-[#96967e] overflow-hidden select-none"
    >
        
        {/* ==================================================================== */}
        {/* BACKGROUND: Giant Marquee Typography that ONLY translates on scroll */}
        {/* ==================================================================== */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 sm:py-4 pointer-events-none select-none overflow-hidden opacity-90 z-0">
          {/* Row 1: Left-to-Right Scroll Translation */}
          <motion.div 
            style={{ x: x1 }}
            className="whitespace-nowrap will-change-transform"
          >
            <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
              RESEARCH STANDARDS • HPLC CERTIFIED • 99%+ PURITY • VERACUE LABS • RESEARCH STANDARDS •
            </span>
          </motion.div>

          {/* Row 2: Right-to-Left Scroll Translation */}
          <motion.div 
            style={{ x: x2 }}
            className="whitespace-nowrap will-change-transform"
          >
            <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
              PURITY VERIFIED • BATCH COA • CLEANROOM SYNTHESIS • TRACEABLE • PURITY VERIFIED •
            </span>
          </motion.div>

          {/* Row 3: Left-to-Right Scroll Translation */}
          <motion.div 
            style={{ x: x3 }}
            className="whitespace-nowrap will-change-transform"
          >
            <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
              RESEARCH STANDARDS • HPLC CERTIFIED • 10K+ FULFILLED • VERACUE LABS • RESEARCH STANDARDS •
            </span>
          </motion.div>
        </div>

        {/* ==================================================================== */}
        {/* FOREGROUND: Floating Editorial Cards */}
        {/* ==================================================================== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Cards Track: Mobile Swipeable, Tablet & Desktop Grid */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide pt-4 sm:pt-6 pb-6 sm:pb-2 -mt-4 sm:-mt-6 -mx-2 px-2 sm:mx-0 sm:px-0">
            {RESEARCH_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div 
                  key={pillar.id}
                  className="shrink-0 w-[82vw] max-w-[340px] sm:w-auto sm:max-w-none snap-center group relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[3/4.2] sm:aspect-[3/4.2] bg-[#f0efeb] border border-white/60 shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:hover:-translate-y-2.5 transition-transform duration-500 cursor-pointer flex flex-col justify-between p-4 sm:p-6 select-none"
                >
                  {/* Background Lifestyle Image */}
                  <Image 
                    src={pillar.image}
                    alt={pillar.heading}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  />

                  {/* Top Bar: Pill Tag & Micro Icon Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="bg-white text-neutral-950 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold font-editorial tracking-[0.16em] uppercase shadow-sm border border-neutral-200">
                      {pillar.badge}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-950 shadow-sm">
                      <Icon className="w-4 h-4 text-neutral-900" strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Center: Cursive Calligraphy Script Title (Matching Reference Image) */}
                  <div className="relative z-10 my-auto text-center py-4 px-2">
                    <span 
                      style={{ fontFamily: '"GERALDINE PERSONAL USE Italic", "Geraldine", cursive' }}
                      className="font-script text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] text-white tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9),_0_4px_24px_rgba(0,0,0,0.85)] block leading-tight font-normal select-none"
                    >
                      {pillar.scriptTitle}
                    </span>
                  </div>

                  {/* Bottom: Research Specification Solid Dock */}
                  <div className="relative z-10 bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 border border-neutral-200/90 shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-950 leading-snug tracking-tight flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#cb997e] shrink-0" />
                        {pillar.heading}
                      </h3>
                    </div>
                    
                    <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-sans line-clamp-2 mb-2.5 font-normal">
                      {pillar.description}
                    </p>

                    <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-900">
                      <span className="flex items-center gap-1.5 text-neutral-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#cb997e]" />
                        {pillar.spec}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ==================================================================== */}
          {/* BOTTOM: Center Pill Button (Matching Reference Image) */}
          {/* ==================================================================== */}
          <div className="mt-8 sm:mt-12 md:mt-14 flex justify-center">
            <HeroButton href="/shop" size="lg">
              Explore Research Standards
            </HeroButton>
          </div>

        </div>
    </section>
  )
}
