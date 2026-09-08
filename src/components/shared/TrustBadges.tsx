'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight, CheckCircle2, Snowflake, Activity, FileCheck2, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function TrustBadges() {
  const t = useTranslations('home.trustBadges')
  
  // Ref for section scroll-driven parallax watermark
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })
  // Smooth scroll translation from right to left as user scrolls down
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['6%', '-26%'])

  // Default to Card 02 (index 1) active/popped, matching the reference image demonstration
  const [activeCard, setActiveCard] = useState<number>(1)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const autoResumeTimeout = useRef<NodeJS.Timeout | null>(null)

  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const pillars = [
    {
      number: '01.',
      tag: 'USA VERIFIED',
      eyebrow: 'Pure Chromatography',
      title: '99.1%+ Verified Purity',
      description: 'Every batch undergoes rigorous High-Performance Liquid Chromatography (RP-HPLC) analysis to guarantee a single symmetrical peak.',
      spec: 'RP-HPLC Confirmed',
      icon: CheckCircle2,
      iconColor: 'text-[#cb997e]',
      image: '/veracue-images/veracue-research-grade-50mg-gloved-hand.png',
      imageAlt: 'Veracue Research Grade 50mg Peptide Vial in Cleanroom Gloved Hand',
    },
    {
      number: '02.',
      tag: 'SEALED UNDER VACUUM',
      eyebrow: 'Cryogenic Preservation',
      title: 'Freeze-Dried for Stability',
      description: 'Vacuum-lyophilized under certified ISO-7 cleanroom conditions to safeguard peptide tertiary structure against ambient degradation.',
      spec: 'Moisture <1.5% • -20°C',
      icon: Snowflake,
      iconColor: 'text-[#6b705c]',
      image: '/veracue-images/veracue-research-grade-50mg-ice-dropper.png',
      imageAlt: 'Veracue 50mg Lyophilized Peptide Vial on Ice with Precision Dropper',
    },
    {
      number: '03.',
      tag: 'PRECISION DOSED',
      eyebrow: 'Mass Precision',
      title: 'Exact Milligram Dosing',
      description: 'Quantitative thresholds verified via Electrospray Ionization Mass Spectrometry (ESI-MS), guaranteeing absolute molar accuracy.',
      spec: '±0.5 Da • Zero Isomers',
      icon: Activity,
      iconColor: 'text-[#cb997e]',
      image: '/veracue-images/veracue-research-grade-50mg-molecular-helix.png',
      imageAlt: 'Veracue 50mg Research Peptide with Floating Glass Molecular Helix',
    },
    {
      number: '04.',
      tag: 'DOCUMENTED AUDIT',
      eyebrow: 'Chain-of-Custody',
      title: 'Batch COA Archive',
      description: 'Every batch is cross-referenced with publicly accessible third-party mass spectrometry and chromatograms published directly in our catalog.',
      spec: 'Public COA Archive',
      icon: FileCheck2,
      iconColor: 'text-[#6b705c]',
      image: '/veracue-images/veracue-research-grade-50mg-dish-leaf-droplets.png',
      imageAlt: 'Veracue 50mg Research Grade Peptide in Petri Dish with Leaf Droplets',
    },
  ]

  // Auto-interval timer to cycle the opened image every 3.8 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % pillars.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [isPaused, pillars.length])

  // Automatically scroll active card into view on mobile / tablet viewports
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const card = cardRefs.current[activeCard]
      const container = cardsContainerRef.current
      if (card && container) {
        const cardLeft = card.offsetLeft
        const cardWidth = card.offsetWidth
        const containerWidth = container.offsetWidth
        const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2)

        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        })
      }
    }
  }, [activeCard])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setIsPaused(true)
    if (autoResumeTimeout.current) clearTimeout(autoResumeTimeout.current)
    // Resume auto-cycle after 7 seconds of manual interaction
    autoResumeTimeout.current = setTimeout(() => {
      setIsPaused(false)
    }, 7000)
  }

  return (
    <section 
      ref={sectionRef}
      id="trust-badges"
      className="bg-[#f0efeb] pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-6 sm:pb-8 md:pb-10 lg:pb-12 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden font-sans select-none"
    >
      {/* Subtle Background Architectural Watermark Typography with Parallax Scroll Animation */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none opacity-[0.04] z-0 overflow-hidden">
        <motion.div 
          style={{ x: watermarkX }} 
          className="whitespace-nowrap will-change-transform flex gap-12"
        >
          <span className="font-heading font-black text-[10rem] sm:text-[14rem] md:text-[18rem] uppercase tracking-tighter text-[#20221c] leading-none">
            PRECISION • VERACUE • PURITY • INTEGRITY • ANALYTICAL STANDARD • PRECISION • VERACUE • PURITY • INTEGRITY • ANALYTICAL STANDARD •
          </span>
        </motion.div>
      </div>

      <div className="max-w-[88rem] mx-auto relative z-10">

        {/* ==================================================================== */}
        {/* SECTION HEADER: Clean Grotesque Typography with Registered Symbol (®) */}
        {/* ==================================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 md:mb-12 gap-6 md:gap-10">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-2xs">
              <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                {t('eyebrow')}
              </span>
            </div>

            {/* Main Heading with Trademark ® Symbol Matching Reference Design */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#20221c] leading-[0.95] tracking-tight uppercase">
              {t('titleLine1')}{' '}
              <br className="hidden sm:inline" />
              {t('titleLine2')}
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl align-super text-[#cb997e] font-sans font-bold ml-1">
                ®
              </span>
            </h2>

            <p className="text-[#6b705c] font-bold text-xs sm:text-sm tracking-[0.16em] uppercase mt-3 sm:mt-4">
              {t('subtitle')}
            </p>
          </div>

          {/* Header Right Column: Narrative & Signature Pill Button */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-md">
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed text-left md:text-right font-sans">
              {t('description')}
            </p>

            {/* Signature Luxury Pill Button */}
            <div className="relative group inline-block">
              <Link 
                href="/about-us"
                className="relative inline-flex items-center gap-2.5 sm:gap-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] pl-5 sm:pl-7 pr-1.5 sm:pr-2 py-2 sm:py-2.5 rounded-full font-semibold text-[12px] sm:text-[14px] border border-neutral-800/80 hover:border-[#cb997e] transition-colors duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium whitespace-nowrap">
                  {t('ctaText')}
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
        </div>

        {/* ==================================================================== */}
        {/* POP-OUT 4-CARD STAGE: Faithful to Reference Image Interactions      */}
        {/* Transparent visual pops out with balanced elevation & counter-tilt   */}
        {/* Active front card tilts clockwise (+4.5deg) with warm almond tint    */}
        {/* Generous padding & lg:overflow-visible prevent any side/bottom cuts  */}
        {/* ==================================================================== */}
        <div 
          ref={cardsContainerRef}
          className="flex overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-20 px-8 sm:px-10 lg:px-4 -mx-4 sm:-mx-6 lg:mx-0 scrollbar-none items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {pillars.map((item, index) => {
            const isActive = activeCard === index

            return (
              <div
                key={item.number}
                ref={(el) => { cardRefs.current[index] = el }}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => handleCardClick(index)}
                className="relative flex flex-col justify-end min-w-[280px] xs:min-w-[310px] sm:min-w-[340px] md:min-w-[360px] lg:min-w-0 snap-center flex-1 group cursor-pointer"
              >
                {/* ------------------------------------------------------------ */}
                {/* FLOATING TRANSPARENT IMAGE: Pure visual, NO background box!   */}
                {/* Pops up with authentic reference proportion (~50% above card) */}
                {/* Smooth feathering & mask ensures zero hard shadow top/bottom  */}
                {/* ------------------------------------------------------------ */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-0 w-[240px] sm:w-[270px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[330px] md:h-[360px] lg:h-[380px] z-10 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_4%,black_82%,transparent_98%)] ${
                    isActive
                      ? '-translate-y-32 sm:-translate-y-36 md:-translate-y-40 lg:-translate-y-44 rotate-[-5deg] scale-100 opacity-100 filter drop-shadow-[0_12px_24px_rgba(32,34,28,0.08)]'
                      : 'translate-y-4 rotate-0 scale-90 opacity-0 filter-none'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 270px, (max-width: 1024px) 300px, 320px"
                      className="object-contain select-none"
                      priority={index === 1}
                    />
                  </div>
                </div>

                {/* ------------------------------------------------------------ */}
                {/* FRONT CONTENT CARD: Borderless, tactile, luxury surface      */}
                {/* Soft diffused shadow (no hard cutoffs), authentic fan tilt   */}
                {/* Sage olive surface (#a5a58d) on active/hover, clean white on inactive */}
                {/* ------------------------------------------------------------ */}
                <div
                  className={`relative z-20 w-full rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 md:p-8 flex flex-col justify-between min-h-[330px] sm:min-h-[350px] md:min-h-[370px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] select-none border-0 ${
                    isActive
                      ? 'bg-[#a5a58d] shadow-[0_12px_32px_rgba(32,34,28,0.07),0_2px_8px_rgba(32,34,28,0.04)] rotate-[4deg] sm:rotate-[4.5deg] translate-y-1'
                      : 'bg-white hover:bg-[#a5a58d] shadow-[0_4px_20px_rgba(32,34,28,0.03)] rotate-0 translate-y-0 group-hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top: Clean Geometric Number (Faithful to Reference 01., 02., 03., 04.) */}
                  <div className="flex items-center justify-between gap-2 mb-10 sm:mb-14">
                    <span className={`font-sans font-extrabold text-2xl sm:text-3xl tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-[#fff1e6]' : 'text-[#20221c] group-hover:text-[#fff1e6]'
                    }`}>
                      {item.number}
                    </span>
                    <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-[#f0efeb]/90 font-semibold' : 'text-neutral-400 group-hover:text-[#f0efeb]/90'
                    }`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Bottom Content Group: Clean, modern, editorial */}
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase font-editorial block transition-colors duration-300 ${
                      isActive ? 'text-[#fff1e6]' : 'text-[#cb997e] group-hover:text-[#fff1e6]'
                    }`}>
                      {item.eyebrow}
                    </span>

                    <h3 className={`font-heading font-black text-lg sm:text-xl leading-tight uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-[#fff1e6]' : 'text-[#20221c] group-hover:text-[#fff1e6]'
                    }`}>
                      {item.title}
                    </h3>

                    <p className={`text-xs sm:text-[13px] leading-relaxed font-sans mt-1 transition-colors duration-300 ${
                      isActive ? 'text-[#f0efeb]/90' : 'text-neutral-600 group-hover:text-[#f0efeb]/90'
                    }`}>
                      {item.description}
                    </p>

                    {/* Protocol Spec Micro-Bar */}
                    <div className={`pt-3.5 mt-2 border-t flex items-center justify-between text-xs transition-colors duration-300 ${
                      isActive ? 'border-white/20' : 'border-black/[0.06] group-hover:border-white/20'
                    }`}>
                      <span className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-300 ${
                        isActive ? 'text-[#fff1e6]' : 'text-neutral-700 group-hover:text-[#fff1e6]'
                      }`}>
                        <item.icon size={13} className={isActive ? 'text-[#fff1e6]' : `${item.iconColor} group-hover:text-[#fff1e6]`} />
                        <span className="whitespace-nowrap">{item.spec}</span>
                      </span>
                      <span className={`text-[10px] uppercase font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-[#f0efeb]/85 group-hover:text-white' : 'text-neutral-400 group-hover:text-[#f0efeb]'
                      }`}>
                        Protocol &rarr;
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Carousel Progress Indicators (Mobile & Tablet) */}
        <div className="flex lg:hidden items-center justify-center gap-2.5 mt-2">
          {pillars.map((_, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCard === i
                  ? 'w-8 bg-[#cb997e]'
                  : 'w-2 bg-[#a5a58d]/40 hover:bg-[#a5a58d]'
              }`}
            />
          ))}
        </div>

        {/* Mobile Swipe Navigation Hint */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-3 text-xs font-medium text-neutral-500">
          <Sparkles size={12} className="text-[#cb997e]" />
          <span>Tap or swipe to explore analytical standards</span>
        </div>

      </div>
    </section>
  )
}
