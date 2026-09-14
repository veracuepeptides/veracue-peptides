'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, FlaskConical, ShieldCheck, Microscope, ArrowRight, CheckCircle2 } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'

interface ProcessStep {
  id: string
  stepNumber: string
  phase: string
  title: string
  subtitle: string
  description: string
  detail: string
  spec: string
  image: string
  icon: React.ElementType
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'sourcing',
    stepNumber: '01',
    phase: 'PHASE 01: PRECURSORS',
    title: 'Sourcing & Screening',
    subtitle: 'Precursor Verification',
    description: 'Every synthesis cycle begins with the careful evaluation of protected amino acid building blocks and coupling reagents. Precursors are screened against our internal baseline specifications before entering production.',
    detail: 'Raw precursors must meet ≥99% reagent purity standards before clearance into solid-phase synthesizer matrices.',
    spec: 'Raw Precursor Inspection • Zero Batch Contamination',
    image: '/veracue-images/veracue-research-grade-50mg-dish-leaf-droplets.png',
    icon: Package,
  },
  {
    id: 'synthesis',
    stepNumber: '02',
    phase: 'PHASE 02: ASSEMBLY',
    title: 'Solid-Phase Synthesis',
    subtitle: 'Stepwise Chain Elongation',
    description: 'Peptide sequences are assembled amino acid by amino acid using solid-phase peptide synthesis (SPPS) protocols. Automated cycle telemetry controls reaction duration, temperature, and wash cycles.',
    detail: 'Rigid stepwise monitoring prevents racemization and suppresses truncated peptide sequence formation.',
    spec: 'Solid-Phase Assembly • Monitored Coupling Efficiency',
    image: '/veracue-images/veracue-research-grade-50mg-molecular-helix.png',
    icon: FlaskConical,
  },
  {
    id: 'purification',
    stepNumber: '03',
    phase: 'PHASE 03: PURIFICATION',
    title: 'Preparative Purification',
    subtitle: 'ISO-7 Sterile Cleanroom',
    description: 'Post-cleavage crude peptides undergo multi-step preparative reverse-phase HPLC purification. The isolated compound is vacuum freeze-dried into a pristine lyophilized cake within ISO-7 certified cleanrooms.',
    detail: 'Vialed under dry nitrogen with butyl stoppers to eliminate ambient atmospheric moisture hydrolysis.',
    spec: 'Prep-HPLC Fractionation • Vacuum Lyophilization Cake',
    image: '/veracue-images/veracue-research-grade-50mg-ice-dropper.png',
    icon: ShieldCheck,
  },
  {
    id: 'verification',
    stepNumber: '04',
    phase: 'PHASE 04: RELEASE',
    title: 'Analytical Release',
    subtitle: 'Public COA Documentation',
    description: 'Purified batches undergo double-blind analytical verification using analytical RP-HPLC and ESI-Mass Spectrometry. Only lots confirming ≥99.0% purity and theoretical sequence mass are certified for release.',
    detail: 'Every serialized batch lot is archived and its certificate of analysis is made publicly available for research verification.',
    spec: 'HPLC & ESI-MS Certified • Public Audit Archive',
    image: '/veracue-images/veracue-epithalon-50mg-water-ripples-landscape.webp',
    icon: Microscope,
  },
]

export function ResearchProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance through process steps every 4.5 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length)
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

  const currentStep = PROCESS_STEPS[activeStep]
  const IconComponent = currentStep.icon

  return (
    <section 
      id="research-process"
      className="w-full bg-[#f0efeb] py-16 sm:py-20 md:py-24 lg:py-28 font-sans select-none overflow-hidden"
    >
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* ==================================================================== */}
        {/* HEADER: Eyebrow, Title & Narrative                                  */}
        {/* ==================================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-2xs">
              <span className="text-[#a5a58d] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                LABORATORY WORKFLOW
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1] tracking-tight uppercase">
              The Synthesis & <br className="hidden sm:inline" />
              Verification Journey
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-light">
              From screening amino acid precursors through multi-stage preparative purification and independent ESI-MS spectrometry, each phase is held to uncompromising analytical benchmarks.
            </p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* STEP PROGRESS NAVIGATION BAR                                         */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx
            const isPassed = activeStep > idx

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepSelect(idx)}
                className={`text-left p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#cb997e] shadow-[0_8px_24px_rgba(32,34,28,0.06)]'
                    : 'bg-white/60 border-[#b7b7a4]/30 hover:bg-white hover:border-[#b7b7a4]/60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`font-sans text-[11px] font-bold tracking-[0.16em] uppercase ${
                    isActive ? 'text-[#cb997e]' : 'text-neutral-400'
                  }`}>
                    STEP {step.stepNumber}
                  </span>
                  
                  <div className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-[#cb997e]' : isPassed ? 'bg-[#a5a58d]' : 'bg-neutral-300'
                  }`} />
                </div>

                <span className={`font-sans font-bold text-xs sm:text-[13px] uppercase tracking-normal line-clamp-1 ${
                  isActive ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                  {step.title}
                </span>

                {/* Animated active underline bar */}
                <div className="w-full h-1 bg-neutral-100 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#cb997e]"
                    initial={{ width: '0%' }}
                    animate={{ width: isActive ? '100%' : isPassed ? '100%' : '0%' }}
                    transition={{ duration: isActive ? 4.5 : 0.3, ease: 'linear' }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* ==================================================================== */}
        {/* DETAILED ACTIVE STAGE SHOWCASE                                       */}
        {/* ==================================================================== */}
        <div 
          className="bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-[#b7b7a4]/40 p-6 sm:p-8 md:p-12 lg:p-14 shadow-[0_16px_48px_rgba(32,34,28,0.04)] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center text-[#cb997e]">
                    <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#cb997e] uppercase tracking-[0.16em] block">
                      {currentStep.phase}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {currentStep.subtitle}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-neutral-900 uppercase tracking-tight mb-4">
                      {currentStep.title}
                    </h3>
                    
                    <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light mb-5">
                      {currentStep.description}
                    </p>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#f0efeb]/70 border border-[#b7b7a4]/30 mb-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#cb997e] shrink-0 mt-0.5" />
                        <p className="text-neutral-700 text-xs sm:text-sm font-medium leading-relaxed">
                          {currentStep.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Technical Spec Strip & Action */}
              <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-sans text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
                  <span>{currentStep.spec}</span>
                </div>

                <HeroButton href="/certificates" size="sm">
                  View COA Verification
                </HeroButton>
              </div>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-5 h-[300px] sm:h-[380px] md:h-[440px] rounded-[20px] sm:rounded-[28px] overflow-hidden relative bg-zinc-900 border border-[#b7b7a4]/40 shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentStep.image}
                    alt={currentStep.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Step Number */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-bold px-3 py-1 rounded-full">
                    {currentStep.stepNumber} / 04
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white text-xs font-sans tracking-wider uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                      {currentStep.spec}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
