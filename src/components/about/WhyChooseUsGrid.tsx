'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Activity, Layers, FileCheck2 } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'

interface QualityPillar {
  key: string
  number: string
  tag: string
  spec: string
  icon: React.ElementType
  media: string
  alt: string
  title: string
  description: string
}

export function WhyChooseUsGrid() {
  const t = useTranslations('content.whyChooseUsGrid')

  const PILLARS: QualityPillar[] = [
    {
      key: 'analyticalEvaluation',
      number: '01.',
      tag: 'RP-HPLC CHROMATOGRAPHY',
      spec: 'Purity Per Batch COA',
      icon: CheckCircle2,
      media: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp',
      alt: 'HPLC analytical purity certification of Veracue peptides',
      title: 'HPLC Tested Per Batch',
      description: 'Every batch is analyzed by reverse-phase chromatography, and the chromatogram with the purity result for that batch is reported on its Certificate of Analysis.',
    },
    {
      key: 'clearClassification',
      number: '02.',
      tag: 'MOLECULAR MASS VALIDATION',
      spec: 'ESI-MS Molar Precision',
      icon: Activity,
      media: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp',
      alt: 'Mass Spectrometry identity validation for Veracue research peptides',
      title: 'Identity Check by Mass Spec',
      description: 'Each compound is classified strictly as research use only. Mass spectrometry compares the measured molecular weight with the expected value as an identity check.',
    },
    {
      key: 'controlledHandling',
      number: '03.',
      tag: 'LYOPHILIZED FORMAT',
      spec: 'Freeze-Dried Cake',
      icon: Layers,
      media: '/veracue-images/veracue-research-grade-gloved-hand.webp',
      alt: 'Careful gloved handling of a lyophilized peptide vial at Veracue',
      title: 'Supplied Lyophilized',
      description: 'Peptides are supplied as a freeze-dried lyophilized cake in a sealed glass vial, a stable format for storage until reconstitution.',
    },
    {
      key: 'operationalTransparency',
      number: '04.',
      tag: 'PUBLIC AUDIT ARCHIVE',
      spec: 'Lot-Specific COA Published',
      icon: FileCheck2,
      media: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
      alt: 'Operational transparency and batch COA records for Veracue',
      title: 'Every Lot Traceable to a COA',
      description: 'Analytical reports are published openly for researchers prior to ordering. Each vial carries a lot number you can use to find the matching batch documentation.',
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-cycle through pillars every 4.2 seconds when idle
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PILLARS.length)
    }, 4200)

    return () => clearInterval(timer)
  }, [isPaused, PILLARS.length])

  const handlePillarSelect = (index: number) => {
    setActiveIndex(index)
    setIsPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 7000)
  }

  const currentPillar = PILLARS[activeIndex]

  return (
    <section 
      id="analytical-standards"
      className="w-full bg-[#f0efeb] py-16 sm:py-20 md:py-24 lg:py-32 relative font-sans overflow-hidden select-none"
    >
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* ==================================================================== */}
        {/* SECTION HEADER: Split-Screen Editorial Header                        */}
        {/* ==================================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-16 gap-6 md:gap-12">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-block border border-[#eddcd2] rounded-full max-w-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-2xs">
              <span className="text-[#a5a58d] text-[9px] xs:text-[9.5px] sm:text-xs font-bold tracking-[0.02em] xs:tracking-[0.06em] sm:tracking-[0.2em] uppercase font-editorial whitespace-nowrap">
                {t('eyebrow')}
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#20221c] leading-[1] tracking-tight uppercase">
              {t('titleLine1')}{' '}
              <br className="hidden sm:inline" />
              <span className="text-neutral-900">{t('titleLine2')}</span>
            </h2>
          </div>

          {/* Narrative & Action */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-md">
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed text-left md:text-right font-sans font-light">
              {t('subtitle')}
            </p>

            <HeroButton href="/certificates">
              View Public COAs
            </HeroButton>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* MAIN STAGE: Interactive 4-Pillar Technical Cards + Visual Stage      */}
        {/* ==================================================================== */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: 4 Interactive Pillar Cards                      */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3.5 sm:gap-4 justify-between">
            {PILLARS.map((pillar, index) => {
              const isActive = activeIndex === index
              const IconComponent = pillar.icon

              return (
                <button
                  key={pillar.key}
                  type="button"
                  onClick={() => handlePillarSelect(index)}
                  onMouseEnter={() => handlePillarSelect(index)}
                  className={`w-full text-left rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 md:p-7 transition-all duration-400 relative overflow-hidden group cursor-pointer flex flex-col justify-between border ${
                    isActive
                      ? 'bg-[#a5a58d] border-[#a5a58d] shadow-[0_12px_32px_rgba(32,34,28,0.08)] scale-[1.01] z-10 text-[#fff1e6]'
                      : 'bg-white border-[#b7b7a4]/40 hover:border-[#a5a58d]/60 hover:bg-[#fff1e6]/30 shadow-[0_4px_16px_rgba(32,34,28,0.02)]'
                  }`}
                >
                  {/* Top Row: Number, Tag, and Arrow */}
                  <div className="flex items-center justify-between w-full mb-2.5 sm:mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`font-sans font-extrabold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-[#fff1e6]' : 'text-[#a5a58d]'
                      }`}>
                        {pillar.number}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                        isActive ? 'text-[#fff1e6]/90 font-semibold' : 'text-neutral-500'
                      }`}>
                        {pillar.tag}
                      </span>
                    </div>

                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'border-white/40 bg-white text-[#20221c]'
                        : 'border-[#20221c]/20 text-[#20221c]/60 group-hover:border-[#20221c] group-hover:text-[#20221c]'
                    }`}>
                      <ArrowUpRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Middle: Pillar Title */}
                  <h3 className={`font-heading font-extrabold text-base sm:text-lg md:text-xl uppercase tracking-tight leading-tight mb-2 transition-colors duration-300 ${
                    isActive ? 'text-[#fff1e6]' : 'text-[#20221c]'
                  }`}>
                    {pillar.title}
                  </h3>

                  {/* Bottom: Description & Spec Pill */}
                  <div className="flex flex-col gap-3">
                    <p className={`text-xs sm:text-[13px] leading-relaxed font-sans font-light transition-colors duration-300 ${
                      isActive ? 'text-[#f0efeb]/95' : 'text-neutral-600'
                    }`}>
                      {pillar.description}
                    </p>

                    <div className={`pt-2.5 border-t flex items-center justify-between text-xs font-sans transition-colors duration-300 ${
                      isActive ? 'border-white/20' : 'border-[#20221c]/10'
                    }`}>
                      <span className={`flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-medium ${
                        isActive ? 'text-[#fff1e6]' : 'text-[#6b705c]'
                      }`}>
                        <IconComponent size={13} className={isActive ? 'text-[#fff1e6]' : 'text-[#cb997e]'} />
                        <span>{pillar.spec}</span>
                      </span>

                      <span className={`text-[9.5px] sm:text-[10px] uppercase tracking-wider font-semibold ${
                        isActive ? 'text-[#eddcd2]' : 'text-neutral-400'
                      }`}>
                        DOCUMENTED
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: Synchronized Visual Showcase Stage             */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-6 xl:col-span-6 min-h-[380px] sm:min-h-[460px] lg:min-h-full rounded-[24px] sm:rounded-[32px] overflow-hidden relative bg-zinc-900 border border-[#b7b7a4]/50 shadow-[0_16px_40px_rgba(32,34,28,0.08)]">
            
            {/* Background Image Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.key}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentPillar.media}
                  alt={currentPillar.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Scrims for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex justify-between items-center z-10 pointer-events-none">
              <span className="bg-black/40 backdrop-blur-md border border-white/20 text-[#fff1e6] text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full">
                {currentPillar.tag}
              </span>
              <span className="text-white/60 font-sans text-xs font-bold tracking-wider">
                0{activeIndex + 1} / 0{PILLARS.length}
              </span>
            </div>

            {/* Bottom Floating Spec Summary Card */}
            <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7 z-10 pointer-events-none">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 text-white shadow-2xl">
                <span className="text-[#cb997e] font-sans text-[10px] sm:text-xs font-bold tracking-[0.16em] uppercase block mb-1">
                  SPECIFICATION STANDARD
                </span>
                <h4 className="text-lg sm:text-xl md:text-2xl font-heading font-extrabold uppercase tracking-tight leading-snug mb-2">
                  {currentPillar.title}
                </h4>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                  {currentPillar.description}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
