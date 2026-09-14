'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Award, PackageCheck, Sparkles, CheckCircle2 } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'

export interface AffiliateResearchPillar {
  id: string
  badge: string
  scriptTitle: string
  heading: string
  description: string
  spec: string
  image: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}

const AFFILIATE_RESEARCH_PILLARS: AffiliateResearchPillar[] = [
  {
    id: 'purity',
    badge: '≥99.2% PURITY',
    scriptTitle: 'Pure Synthesis',
    heading: 'HPLC & Mass Spec Verified',
    description:
      'Every batch undergoes independent third-party chromatographic analysis with public COAs. Uncompromising purity eliminates checkout hesitation and maximizes referral conversion.',
    spec: 'USP Grade • ≥99.2% Confirmed',
    image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp',
    icon: ShieldCheck,
  },
  {
    id: 'formulation',
    badge: 'ISO-7 CLEANROOM',
    scriptTitle: 'Precision Batch',
    heading: 'Controlled Formulation',
    description:
      'Synthesized in certified United States laboratories under strictly regulated laminar flow hoods. Reliable quality builds audience trust and generates lifelong customer retention.',
    spec: 'c-GMP Compliant • Sterile Vialing',
    image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp',
    icon: PackageCheck,
  },
  {
    id: 'expertise',
    badge: '10+ YEARS EXP',
    scriptTitle: 'Scientific Rigor',
    heading: 'Lyophilized Stability',
    description:
      'Engineered for molecular integrity, high cake density, and temperature resilience during transit. Minimal degradation protects your reputation as a trusted research partner.',
    spec: 'Cold-Chain Preserved • Lot COA',
    image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp',
    icon: Award,
  },
]

export function AffiliateDifferenceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-linked parallax: the text translates horizontally as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Alternating scroll translations for the 3 stacked typographic marquee rows
  const x1 = useTransform(scrollYProgress, [0, 1], [-260, 260])
  const x2 = useTransform(scrollYProgress, [0, 1], [260, -260])
  const x3 = useTransform(scrollYProgress, [0, 1], [-220, 220])

  return (
    <section
      ref={containerRef}
      className="font-sans relative z-20 w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-[#a5a58d] border-y border-[#b7b7a4]/60 overflow-hidden select-none"
    >
      {/* ==================================================================== */}
      {/* BACKGROUND: Giant Marquee Typography that translates on scroll       */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 flex flex-col justify-between py-2 sm:py-4 pointer-events-none select-none overflow-hidden opacity-90 z-0">
        {/* Row 1: Left-to-Right Translation */}
        <motion.div style={{ x: x1 }} className="whitespace-nowrap will-change-transform">
          <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
            RESEARCH STANDARDS • HPLC CERTIFIED • 99%+ PURITY • VERACUE LABS • HIGHER CONVERSION •
          </span>
        </motion.div>

        {/* Row 2: Right-to-Left Translation */}
        <motion.div style={{ x: x2 }} className="whitespace-nowrap will-change-transform">
          <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
            PURITY VERIFIED • BATCH COA • CLEANROOM SYNTHESIS • TRACEABLE • DUAL ATTRIBUTION •
          </span>
        </motion.div>

        {/* Row 3: Left-to-Right Translation */}
        <motion.div style={{ x: x3 }} className="whitespace-nowrap will-change-transform">
          <span className="font-heading font-black text-[5.5rem] xs:text-[7rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13.5rem] xl:text-[15rem] text-[#fff1e6]/85 uppercase tracking-tighter leading-[0.82] block">
            PRODUCE LOYALTY • ZERO REFUNDS • 15% RECURRING • VERACUE LABS • SCALE TOGETHER •
          </span>
        </motion.div>
      </div>

      {/* ==================================================================== */}
      {/* FOREGROUND: Header + Floating Editorial Cards + Bottom Action        */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff1e6] border border-[#eddcd2] text-[11px] font-bold uppercase tracking-[0.2em] text-[#20221c] font-heading shadow-xs mb-3">
            <span>✦</span>
            <span>Research Standards That Convert</span>
            <span>✦</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#20221c] font-heading leading-tight mb-3">
            The Product Quality Behind What You Promote.
          </h2>
          <p className="text-[#20221c]/80 text-sm sm:text-base leading-relaxed font-sans max-w-lg mx-auto">
            Audience trust is everything in peptide research. Recommending documented purity guarantees higher order conversion and continuous repeat purchases.
          </p>
        </div>

        {/* Cards Track: Mobile Swipeable, Tablet & Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide pt-2 pb-6 -mx-2 px-2 sm:mx-0 sm:px-0">
          {AFFILIATE_RESEARCH_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.id}
                className="shrink-0 w-[82vw] max-w-[340px] sm:w-auto sm:max-w-none snap-center group relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[3/4.3] bg-[#f0efeb] border border-white/60 shadow-[0_14px_36px_rgba(0,0,0,0.12)] sm:hover:-translate-y-3 transition-transform duration-500 cursor-pointer flex flex-col justify-between p-4 sm:p-6 select-none"
              >
                {/* Background Lifestyle Image */}
                <Image
                  src={pillar.image}
                  alt={pillar.heading}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />

                {/* Ambient Soft Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30 pointer-events-none" />

                {/* Top Bar: Pill Tag & Micro Icon Badge */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="bg-[#fff1e6] text-[#20221c] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold font-editorial tracking-[0.16em] uppercase shadow-sm border border-[#eddcd2]">
                    {pillar.badge}
                  </span>

                  <div className="w-9 h-9 rounded-full bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center text-[#20221c] shadow-sm">
                    <Icon className="w-4 h-4 text-[#20221c]" strokeWidth={2.2} />
                  </div>
                </div>

                {/* Center: Cursive Calligraphy Script Title */}
                <div className="relative z-10 my-auto text-center py-4 px-2">
                  <span
                    style={{
                      fontFamily: '"GERALDINE PERSONAL USE Italic", "Geraldine", cursive',
                    }}
                    className="font-script text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] text-white tracking-wide [text-shadow:_0_2px_10px_rgba(0,0,0,0.9),_0_4px_24px_rgba(0,0,0,0.85)] block leading-tight font-normal select-none"
                  >
                    {pillar.scriptTitle}
                  </span>
                </div>

                {/* Bottom: Solid Research Specification Dock */}
                <div className="relative z-10 bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-5 border border-[#eddcd2] shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] leading-snug tracking-tight flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#cb997e] shrink-0" />
                      {pillar.heading}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#20221c]/75 leading-relaxed font-sans line-clamp-2 mb-2.5 font-normal">
                    {pillar.description}
                  </p>

                  <div className="pt-2.5 border-t border-[#eddcd2] flex items-center justify-between text-xs font-semibold text-[#20221c]">
                    <span className="flex items-center gap-1.5 text-[#20221c]">
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
        {/* BOTTOM: Center Hero Button scrolling back up to Section 2 Apply Form */}
        {/* ==================================================================== */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <HeroButton href="#apply" direction="up" size="lg">
            Apply for Partnership
          </HeroButton>
        </div>
      </div>
    </section>
  )
}
