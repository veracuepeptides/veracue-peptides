'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, CheckCircle2, Activity, FileCheck2, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface PillarData {
  key: string
  number: string
  tag: string
  spec: string
  icon: React.ElementType
  media: string
  alt: string
}

const PILLARS_CONFIG: PillarData[] = [
  {
    key: 'hplcPurity',
    number: '01.',
    tag: 'PURITY SPECIFICATION',
    spec: 'RP-HPLC Confirmed • ≥99.0% Peak',
    icon: CheckCircle2,
    media: '/veracue-images/veracue-epithalon-50mg-water-ripples-landscape.webp',
    alt: 'High-Performance Liquid Chromatography analytical purity verification for Veracue research peptides',
  },
  {
    key: 'msIdentity',
    number: '02.',
    tag: 'MOLECULAR IDENTITY',
    spec: 'ESI-MS Precision • Molar Accuracy',
    icon: Activity,
    media: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp',
    alt: 'Electrospray Ionization Mass Spectrometry confirming exact molecular weight and identity',
  },
  {
    key: 'coaDocumentation',
    number: '03.',
    tag: 'PUBLIC AUDIT ARCHIVE',
    spec: 'Lot-Specific COA • Instant Access',
    icon: FileCheck2,
    media: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    alt: 'Batch-specific certificates of analysis publicly published for every Veracue peptide batch',
  },
]

export function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs')
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-cycle through pillars every 4.2 seconds when idle
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PILLARS_CONFIG.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [isPaused])

  const handlePillarSelect = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 7000)
  }

  const currentPillar = PILLARS_CONFIG[activeIndex]

  return (
    <section 
      id="why-choose-us"
      className="w-full bg-[#f0efeb] py-20 sm:py-24 md:py-28 lg:py-32 relative font-sans overflow-hidden select-none"
    >
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* ==================================================================== */}
        {/* SECTION HEADER: Modern Split-Screen Editorial Header                 */}
        {/* ==================================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-16 gap-6 md:gap-12">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-2xs">
              <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                {t('eyebrow')}
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#20221c] leading-[0.95] tracking-tight uppercase">
              {t('titleLine1')}{' '}
              <br className="hidden sm:inline" />
              {t('titleLine2')}
            </h2>
          </div>

          {/* Narrative & Quick Access Action */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-md">
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed text-left md:text-right font-sans">
              Every synthetic peptide supplied by Veracue is manufactured to verified analytical thresholds &mdash; with publicly accessible third-party chromatograms and mass spectrometry documentation published before you purchase.
            </p>

            {/* Signature Luxury Pill Button */}
            <Link 
              href="/certificates"
              className="relative group inline-flex items-center gap-2.5 sm:gap-4 bg-[#20221c] hover:bg-[#a5a58d] text-[#fff1e6] pl-5 sm:pl-7 pr-1.5 sm:pr-2 py-2 sm:py-2.5 rounded-full font-semibold text-[12px] sm:text-[14px] border border-neutral-800/80 hover:border-[#a5a58d] transition-colors duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium whitespace-nowrap">
                VIEW COA ARCHIVE
              </span>
              <span className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white text-black flex items-center justify-center relative overflow-hidden shrink-0">
                <ArrowRight 
                  size={14} 
                  strokeWidth={2.5} 
                  className="transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0" 
                />
                <ArrowRight 
                  size={14} 
                  strokeWidth={2.5} 
                  className="absolute -translate-x-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" 
                />
              </span>
            </Link>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* MAIN STAGE: Interactive 3-Pillar Technical Cards + Visual Stage      */}
        {/* ==================================================================== */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: 3 Interactive Pillar Cards                      */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {PILLARS_CONFIG.map((pillar, index) => {
              const isActive = activeIndex === index
              const title = t(`items.${pillar.key}.title`)
              const description = t(`items.${pillar.key}.description`)
              const IconComponent = pillar.icon

              return (
                <button
                  key={pillar.key}
                  type="button"
                  onClick={() => handlePillarSelect(index)}
                  onMouseEnter={() => handlePillarSelect(index)}
                  className={`w-full text-left rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 md:p-8 transition-all duration-500 relative overflow-hidden group cursor-pointer flex flex-col justify-between border ${
                    isActive
                      ? 'bg-[#a5a58d] border-[#a5a58d] shadow-[0_12px_32px_rgba(32,34,28,0.08)] scale-[1.01] z-10'
                      : 'bg-white border-[#20221c]/10 hover:border-[#a5a58d]/50 hover:bg-[#a5a58d]/5 shadow-[0_4px_16px_rgba(32,34,28,0.03)]'
                  }`}
                >
                  {/* Top Row: Number, Tag, and Arrow Indicator */}
                  <div className="flex items-center justify-between w-full mb-3 sm:mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`font-sans font-extrabold text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-[#fff1e6]' : 'text-[#a5a58d]'
                      }`}>
                        {pillar.number}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? 'text-[#fff1e6]/90 font-semibold' : 'text-neutral-500'
                      }`}>
                        {pillar.tag}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'border-white/30 bg-white text-[#20221c]'
                        : 'border-[#20221c]/20 text-[#20221c]/60 group-hover:border-[#20221c] group-hover:text-[#20221c]'
                    }`}>
                      <ArrowUpRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Middle: Pillar Title */}
                  <h3 className={`font-heading font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight leading-tight mb-2 transition-colors duration-300 ${
                    isActive ? 'text-[#fff1e6]' : 'text-[#20221c]'
                  }`}>
                    {title}
                  </h3>

                  {/* Bottom: Detailed Description & Technical Spec Pill */}
                  <div className="flex flex-col gap-3.5 mt-1">
                    <p className={`text-xs sm:text-[13px] leading-relaxed font-sans transition-colors duration-300 ${
                      isActive ? 'text-[#f0efeb]/95' : 'text-neutral-600'
                    }`}>
                      {description}
                    </p>

                    <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono transition-colors duration-300 ${
                      isActive ? 'border-white/20' : 'border-[#20221c]/10'
                    }`}>
                      <span className={`flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-medium ${
                        isActive ? 'text-[#fff1e6]' : 'text-[#6b705c]'
                      }`}>
                        <IconComponent size={13} className={isActive ? 'text-[#fff1e6]' : 'text-[#cb997e]'} />
                        <span>{pillar.spec}</span>
                      </span>

                      <span className={`text-[10px] uppercase tracking-wider font-semibold ${
                        isActive ? 'text-[#eddcd2]' : 'text-neutral-400'
                      }`}>
                        VERIFIED &rarr;
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: High-Definition Visual Stage                   */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-7 xl:col-span-7 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] rounded-[28px] sm:rounded-[32px] overflow-hidden relative border border-[#20221c]/15 shadow-[0_16px_48px_rgba(32,34,28,0.06)] bg-neutral-900 group">
            
            {/* Visual Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.key}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentPillar.media}
                  alt={currentPillar.alt}
                  fill
                  priority
                  className="object-cover object-center select-none"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Clean atmospheric vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Stage Tag */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-[#fff1e6] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#cb997e] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#fff1e6]">
                {currentPillar.tag}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="font-heading font-extrabold text-[10px] sm:text-[11px] text-[#eddcd2] tracking-wider uppercase">
                SPEC 0{activeIndex + 1}
              </span>
            </div>

            {/* Bottom Overlay: Active Technical Proof & Certificate Telemetry */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 p-5 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-black/65 backdrop-blur-md border border-white/20 text-[#fff1e6]">
              <div className="flex flex-col gap-1.5 max-w-md">
                <span className="text-[#cb997e] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase">
                  ACTIVE ANALYTICAL AUDIT:
                </span>
                <h4 className="font-heading font-black text-base sm:text-lg md:text-xl uppercase tracking-tight text-white leading-tight">
                  {t(`items.${currentPillar.key}.title`)}
                </h4>
                <p className="text-white/80 text-[11px] sm:text-xs font-sans leading-relaxed">
                  {currentPillar.spec} &mdash; cross-referenced with independent batch chromatograms.
                </p>
              </div>

              <Link
                href="/certificates"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/30 hover:border-white bg-white/20 hover:bg-white text-white hover:text-black transition-all duration-300 font-mono text-[11px] font-bold tracking-wider uppercase shrink-0 shadow-sm"
              >
                <span>OPEN COA</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
