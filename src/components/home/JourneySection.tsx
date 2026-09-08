'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, Microscope, ThermometerSnowflake, Truck } from 'lucide-react'

interface StepItem {
  id: number
  number: string
  label: string
  subtitle: string
  description: string
  detail: string
  image: string
  tag: string
  icon: React.ElementType
}

const STEPS: StepItem[] = [
  {
    id: 1,
    number: '1',
    label: 'SOURCING & SYNTHESIS',
    subtitle: 'Where Purity Starts',
    description: 'CAREFUL SCREENING OF EVERY RAW MATERIAL BATCH FOR MAXIMUM MOLECULAR PURITY.',
    detail: 'HPLC-verified amino acid precursors synthesized under certified cleanroom standards with zero truncated peptide sequences.',
    image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp',
    tag: 'PURITY FOUNDATION',
    icon: Microscope,
  },
  {
    id: 2,
    number: '2',
    label: '3RD-PARTY TESTING',
    subtitle: 'Analytical Validation',
    description: 'INDEPENDENT LAB VERIFICATION CERTIFYING IDENTITY, PURITY, AND MASS CONFORMANCE.',
    detail: 'Double-blind RP-HPLC chromatography and ESI-MS spectrometry verification with publicly accessible batch COA documentation.',
    image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp',
    tag: 'INDEPENDENT AUDIT',
    icon: ShieldCheck,
  },
  {
    id: 3,
    number: '3',
    label: 'COLD-CHAIN PACKAGING',
    subtitle: 'Cryogenic Protection',
    description: 'VACUUM-SEALED TEMPERATURE-CONTROLLED PACKAGING PRESERVING PEPTIDE INTEGRITY.',
    detail: 'Vacuum-lyophilized under nitrogen in ISO-7 cleanrooms with butyl stoppers and thermal insulation to eliminate hydrolysis.',
    image: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp',
    tag: 'THERMAL SHIELD',
    icon: ThermometerSnowflake,
  },
  {
    id: 4,
    number: '4',
    label: 'LABORATORY DISPATCH',
    subtitle: 'Tracked Direct Delivery',
    description: 'FAST, TRACKED EXPEDITION IN INSULATED CONTAINERS DIRECT TO ACCREDITED INSTITUTES.',
    detail: 'Same-day priority dispatch with real-time courier telemetry, verified cold packaging, and tamper-evident custody seals.',
    image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    tag: 'SECURE CUSTODY',
    icon: Truck,
  },
]

export function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-cycle through steps every 4.5 seconds unless paused by interaction
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleStepSelect = (index: number) => {
    setActiveStep(index)
    setIsPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }

  const currentStep = STEPS[activeStep]

  return (
    <section 
      id="journey-section"
      className="w-full bg-[#f0efeb] relative font-sans overflow-hidden select-none"
    >
      <div className="w-full relative z-10">
        
        {/* ==================================================================== */}
        {/* ARCHITECTURAL EDITORIAL POSTER CONTAINER (Edge-to-Edge Full Width)  */}
        {/* ==================================================================== */}
        <div className="w-full flex flex-col md:flex-row">
          
          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: Vertical Architectural Typography Strip          */}
          {/* Desktop: Rotated vertical text running alongside the content */}
          {/* Mobile: Horizontal header bar on top                         */}
          {/* ------------------------------------------------------------ */}
          <div className="w-full md:w-20 lg:w-28 xl:w-32 md:shrink-0 border-b md:border-b-0 md:border-r border-[#20221c]/15 flex md:flex-col items-center justify-between md:justify-center py-4 px-6 md:py-12 md:px-0 bg-[#f0efeb]">
            {/* Mobile / Tablet Header Label */}
            <div className="flex md:hidden items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#cb997e]" />
              <span className="font-heading font-black text-lg tracking-[0.2em] uppercase text-[#20221c]">
                PROCESS
              </span>
            </div>
            <span className="md:hidden text-[10px] font-mono tracking-widest uppercase text-neutral-500">
              0{activeStep + 1} / 04
            </span>

            {/* Desktop Vertical Ribbon Text */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <span className="font-heading font-black text-2xl lg:text-3xl xl:text-4xl text-[#20221c] tracking-[0.32em] [writing-mode:vertical-rl] rotate-180 uppercase select-none">
                PROCESS
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT MAIN PANEL: Top Visual & Intro Area + 4 Step Rows      */}
          {/* ------------------------------------------------------------ */}
          <div className="flex-1 flex flex-col">
            
            {/* Top Area: Aesthetic Visual Window + About Oval + Heading */}
            <div className="border-b border-[#20221c]/15 grid grid-cols-1 lg:grid-cols-12">
              
              {/* Visual Window: Smooth Image Cross-fade matching Active Step */}
              <div className="lg:col-span-5 xl:col-span-5 h-[280px] xs:h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[460px] relative border-b lg:border-b-0 lg:border-r border-[#20221c]/15 overflow-hidden bg-[#f0efeb] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentStep.image}
                      alt={currentStep.label}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    {/* Subtle atmospheric vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Seamless Top Gradient Blend into #f0efeb Section Background */}
                <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-[#f0efeb] via-[#f0efeb]/70 to-transparent z-10 pointer-events-none" />

                {/* Active Step Badge Overlay */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2.5 bg-black/65 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-[#fff1e6] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#cb997e] animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#fff1e6]">
                    {currentStep.tag}
                  </span>
                  <span className="text-white/40 text-xs">•</span>
                  <span className="font-heading font-extrabold text-[10px] sm:text-[11px] text-[#eddcd2] tracking-wider uppercase">
                    STAGE 0{currentStep.id}
                  </span>
                </div>
              </div>

              {/* Top Right Header & Narrative */}
              <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-between">
                
                {/* Top Row: Eyebrow + Signature Reference "ABOUT" Oval Button */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a5a58d] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                      4-STAGE INTEGRITY PROCESS
                    </span>
                  </div>

                  {/* Authentic Oval Pill Badge (Faithful to Reference Image) */}
                  <Link
                    href="/about-us"
                    className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full border border-[#20221c]/40 hover:border-[#20221c] bg-white/60 hover:bg-[#20221c] text-[#20221c] hover:text-[#fff1e6] transition-all duration-300 font-mono text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase shadow-2xs"
                  >
                    <span>ABOUT</span>
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Narrative Headline & Technical Specification */}
                <div className="flex flex-col gap-3 sm:gap-4 my-auto">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black text-[#20221c] leading-[1.05] tracking-tight uppercase">
                    Molecular Synthesis To Laboratory Bench
                  </h2>
                  
                  <p className="text-neutral-600 text-xs sm:text-sm md:text-base font-sans leading-relaxed max-w-2xl">
                    Every compound in the Veracue catalog adheres to an unbroken four-stage chain of custody &mdash; validating chemical sequence identity, mass precision, and cryogenic vacuum stability prior to authorized laboratory expedition.
                  </p>
                </div>

                {/* Active Step Technical Micro-Highlight */}
                <div className="pt-4 sm:pt-6 mt-4 border-t border-[#20221c]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6b705c] font-semibold tracking-wider uppercase text-[11px]">
                    CURRENT INSPECTION:
                  </span>
                  <span className="text-[#20221c] font-bold tracking-tight text-[11px] sm:text-xs">
                    {currentStep.label} &rarr;
                  </span>
                </div>

              </div>

            </div>

            {/* ------------------------------------------------------------ */}
            {/* THE 4 STEPS ROWS: Architectural Dividing Hairlines           */}
            {/* Clean circle numbers, bold titles, and technical descriptions */}
            {/* ------------------------------------------------------------ */}
            <div 
              className="flex flex-col"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {STEPS.map((step, index) => {
                const isActive = activeStep === index

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepSelect(index)}
                    onMouseEnter={() => handleStepSelect(index)}
                    className={`group relative border-b border-[#20221c]/15 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#a5a58d]/15 shadow-2xs'
                        : 'bg-transparent hover:bg-[#a5a58d]/5'
                    }`}
                  >
                    <div className="py-5 sm:py-6 md:py-7 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-8">
                      
                      {/* Left Side: Circular Step Number + Step Title */}
                      <div className="flex items-center gap-3.5 sm:gap-6 md:gap-8 shrink-0">
                        
                        {/* Circle Number (Styled with #a5a58d for active fill and inactive border/number) */}
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border transition-all duration-300 flex items-center justify-center font-heading font-extrabold text-sm sm:text-base md:text-xl shrink-0 ${
                            isActive
                              ? 'border-[#a5a58d] bg-[#a5a58d] text-[#fff1e6] scale-105 shadow-sm'
                              : 'border-[#a5a58d] text-[#a5a58d] group-hover:border-[#a5a58d] group-hover:bg-[#a5a58d] group-hover:text-[#fff1e6]'
                          }`}
                        >
                          {step.number}
                        </div>

                        {/* Step Title & Subtitle */}
                        <div className="flex flex-col">
                          <span className={`text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#cb997e] font-bold' : 'text-neutral-500 group-hover:text-[#cb997e]'
                          }`}>
                            {step.subtitle}
                          </span>
                          <h3 className="font-heading font-black text-base sm:text-lg md:text-xl lg:text-2xl text-[#20221c] tracking-tight uppercase leading-tight">
                            {step.label}
                          </h3>
                        </div>

                      </div>

                      {/* Right Side: Concise Uppercase Description (Matching Reference Layout) */}
                      <div className="lg:max-w-md xl:max-w-lg lg:text-right pl-[54px] sm:pl-18 lg:pl-0">
                        <p className={`text-[11px] sm:text-xs md:text-[12.5px] lg:text-[13px] font-sans font-medium tracking-wide uppercase leading-relaxed transition-colors duration-300 ${
                          isActive ? 'text-[#20221c]' : 'text-neutral-600 group-hover:text-[#20221c]'
                        }`}>
                          {step.description}
                        </p>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* ------------------------------------------------------------ */}
            {/* BOTTOM FOOTER STRIP (Matching Reference "FEELTHIS.COM" Style) */}
            {/* ------------------------------------------------------------ */}
            <div className="py-4 sm:py-5 px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-center bg-[#f0efeb]">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-500">
                VERACUE ANALYTICAL WORKFLOW • ISO-7 CLEANROOM STANDARDS
              </span>
              
              <Link
                href="/shop"
                className="font-mono tracking-[0.3em] text-xs font-bold uppercase text-[#20221c]/80 hover:text-[#20221c] transition-colors underline decoration-[#20221c]/30 underline-offset-4"
              >
                VERACUEPEPTIDES.COM
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

