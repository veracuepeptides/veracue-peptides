'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeUp } from '@/components/motion/FadeUp'
import { 
  AlertTriangle, 
  Calculator, 
  Syringe, 
  CheckCircle2, 
  Droplets, 
  ArrowRight, 
  ShieldCheck, 
  TrendingDown, 
  Snowflake,
  FlaskConical,
  Clock,
  BookOpen,
  Info,
  Sparkles,
  ChevronRight,
  Sliders,
  Thermometer,
  Layers
} from 'lucide-react'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { CalculatorsHub } from './components/CalculatorsHub'
import { CalculatorHero } from '@/components/calculator/CalculatorHero'
import Image from 'next/image'
import Link from 'next/link'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'] as const

export default function PeptideCalculatorPage() {
  const t = useTranslations('calculator.main')

  // Interactive Section States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [syringeTestUnit, setSyringeTestUnit] = useState<number>(10)
  const [tableFilter, setTableFilter] = useState<'all' | '250' | '500' | '1000'>('all')
  const [storageView, setStorageView] = useState<'powder' | 'liquid'>('powder')
  const [dangerSliderVal, setDangerSliderVal] = useState<number>(0.5)
  const [glossaryFilter, setGlossaryFilter] = useState<string>('all')

  const CALCULATOR_FAQS = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }))

  const STEP_DETAILS = [
    {
      num: '01',
      title: 'Wipe and Dry the Septa',
      sub: 'Sterilization & Air Drying',
      desc: 'Swab the rubber stopper on both the peptide vial and the bacteriostatic water vial with a fresh 70% isopropyl wipe, then let each one air dry for about 30 seconds before you go near it with a needle.',
      icon: ShieldCheck,
      color: '#a5a58d',
      metric: '70% Isopropyl Swab',
      duration: '30s Dry Time'
    },
    {
      num: '02',
      title: 'Add the Water Slowly',
      sub: 'Down the Glass, Not the Powder',
      desc: 'Draw the volume the calculator gave you, then angle the needle against the inside wall of the vial. Let the water run down the glass instead of hitting the lyophilized cake directly.',
      icon: Droplets,
      color: '#cb997e',
      metric: '0.9% Benzyl Alcohol',
      duration: 'Angle Against Glass'
    },
    {
      num: '03',
      title: 'Roll, Never Shake',
      sub: 'Zero Mechanical Shaking',
      desc: "Shaking stresses the peptide bonds. Roll the vial gently between your palms instead, in slow circles, until the cake fully dissolves into a clear solution with nothing floating in it.",
      icon: ArrowRight,
      color: '#55724a',
      metric: 'Zero Frothing',
      duration: 'Palm Roll Only'
    }
  ]

  const DILUTION_DATA = [
    { mass: '2 mg', bac: '1.0 mL', conc: '2.0 mg/mL (2,000 mcg/mL)', draw250: '12.5 Units (0.125 mL)', draw500: '25.0 Units (0.250 mL)', draw1000: '50.0 Units (0.500 mL)', highlight: '250' },
    { mass: '5 mg', bac: '2.0 mL', conc: '2.5 mg/mL (2,500 mcg/mL)', draw250: '10.0 Units (0.100 mL)', draw500: '20.0 Units (0.200 mL)', draw1000: '40.0 Units (0.400 mL)', highlight: '250' },
    { mass: '10 mg', bac: '2.0 mL', conc: '5.0 mg/mL (5,000 mcg/mL)', draw250: '5.0 Units (0.050 mL)', draw500: '10.0 Units (0.100 mL)', draw1000: '20.0 Units (0.200 mL)', highlight: '500' },
    { mass: '10 mg', bac: '3.0 mL', conc: '3.33 mg/mL (3,333 mcg/mL)', draw250: '7.5 Units (0.075 mL)', draw500: '15.0 Units (0.150 mL)', draw1000: '30.0 Units (0.300 mL)', highlight: '500' },
    { mass: '30 mg', bac: '3.0 mL', conc: '10.0 mg/mL (10,000 mcg/mL)', draw250: '2.5 Units (0.025 mL)', draw500: '5.0 Units (0.050 mL)', draw1000: '10.0 Units (0.100 mL)', highlight: '1000' },
  ]

  return (
    <main className="bg-[#f0efeb] min-h-screen relative overflow-x-clip font-sans text-neutral-900 selection:bg-[#a5a58d]/30">
      
      {/* ==================================================================== */}
      {/* 1. HERO SECTION (Full-Viewport, Homepage Architecture)               */}
      {/* ==================================================================== */}
      <CalculatorHero />

      {/* ==================================================================== */}
      {/* 2. CALCULATORS HUB (Full Width matching Header, Clean White & Olive)  */}
      {/* ==================================================================== */}
      <div className="relative z-20 -mt-6 sm:-mt-10 w-full">
        <div id="calculators-hub" className="scroll-mt-28">
          <CalculatorsHub />
        </div>
      </div>

      {/* EDITORIAL CONTENT FLOW */}
      <div className="flex flex-col gap-20 sm:gap-28 md:gap-32 pb-16 sm:pb-24">
        
        {/* ==================================================================== */}
        {/* SECTION 01: THE RISK & PRECISION IS NON-NEGOTIABLE                  */}
        {/* ==================================================================== */}
        <section id="reconstitution-guide" className="scroll-mt-28 w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Column: Interactive Steps Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-2xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#a5a58d]" />
                  <span>01 &bull; Reconstitution Steps</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-heading font-extrabold text-neutral-900 tracking-tight uppercase leading-[1.08] mb-4">
                  Precision is<br />
                  <span className="text-[#a5a58d]">Non-Negotiable.</span>
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mb-6">
                  Whether you're preparing a 2mg or 10mg lyophilized cake, guessing at the diluent math risks a compromised study, irreversible peptide shearing, and data you can't trust.
                </p>

                <div className="w-full h-px bg-[#b7b7a4]/40 mb-6" />

                <div className="space-y-3.5">
                  <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#a5a58d] hover:shadow-md transition-all duration-300">
                    <div className="flex gap-3.5 items-start">
                      <div className="w-9 h-9 rounded-xl bg-[#a5a58d]/10 border border-[#a5a58d]/30 flex items-center justify-center shrink-0 text-[#a5a58d] group-hover:bg-[#a5a58d] group-hover:text-white transition-colors">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wide">
                          Eliminate Peptide Hydrolysis
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-normal">
                          Improper dilution alters osmolarity and pH thresholds, accelerating molecular decomposition before experiments begin.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#a5a58d] hover:shadow-md transition-all duration-300">
                    <div className="flex gap-3.5 items-start">
                      <div className="w-9 h-9 rounded-xl bg-[#55724a]/10 border border-[#55724a]/30 flex items-center justify-center shrink-0 text-[#55724a] group-hover:bg-[#55724a] group-hover:text-white transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wide">
                          Consistent Across Sessions
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-normal">
                          An accurate draw today gives you the same dose next week, so results stay comparable across your whole study.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Visual Laboratory Feature */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <FadeUp delay={0.15}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-[#b7b7a4]/50 flex flex-col">
                  {/* Real Laboratory Photographic Header */}
                  <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[340px] overflow-hidden group bg-neutral-100">
                    <Image 
                      src="/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp" 
                      alt="Veracue analytical peptide reconstitution vials and laboratory workspace"
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 680px"
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />
                    
                    {/* Top Lab Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#a5a58d] text-white shadow-md">
                      <Calculator size={11} /> Automated Calibration Suite
                    </div>
                  </div>
                  
                  {/* Content Body (Guaranteed full readability on all devices, zero cutoff) */}
                  <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-neutral-900 uppercase tracking-tight mb-2">
                        No More Manual Math
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        Type in your vial mass, water volume, and target dose, and the calculator gives you the exact U-100 syringe reading.
                      </p>
                    </div>
                    
                    <div className="mt-5 pt-4 border-t border-[#b7b7a4]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
                      <span className="font-bold text-[#a5a58d] uppercase tracking-wider text-[11px]">
                        Standardized U-100 Graduations
                      </span>
                      <span className="font-price font-bold text-neutral-700 bg-[#f0efeb] px-2.5 py-1 rounded-lg border border-[#b7b7a4]/30">
                        &plusmn;0.01 mL Precision
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 02: INTERACTIVE STEP-BY-STEP PROCESS PIPELINE                */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  <FlaskConical className="w-3.5 h-3.5 text-[#a5a58d]" />
                  <span>02 &bull; Interactive Procedure</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 tracking-tight uppercase leading-tight">
                  The Reconstitution <span className="text-[#a5a58d]">Pipeline</span>
                </h2>
              </div>

              {/* Step Navigation Pill Selector */}
              <div className="inline-flex items-center bg-white border border-[#b7b7a4]/50 p-1.5 rounded-2xl shadow-sm">
                {STEP_DETAILS.map((step, idx) => (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                      activeStep === idx 
                        ? 'bg-[#a5a58d] text-white shadow-sm' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-[#f0efeb]'
                    }`}
                  >
                    <span>{step.num}</span>
                    <span className="hidden sm:inline-block">{step.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Connected Pipeline Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {STEP_DETAILS.map((step, idx) => {
                const isSelected = activeStep === idx
                const IconComponent = step.icon

                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between relative ${
                      isSelected 
                        ? 'bg-[#20221c] text-[#fff1e6] border-2 border-[#a5a58d] shadow-xl scale-[1.02]' 
                        : 'bg-white text-neutral-800 border border-[#b7b7a4]/50 hover:border-[#a5a58d]/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    {/* Top Step Header */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#a5a58d] text-white shadow-sm' : 'bg-[#f0efeb] text-[#a5a58d] border border-[#b7b7a4]/40'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`text-2xl font-price font-bold ${isSelected ? 'text-[#a5a58d]' : 'text-neutral-300'}`}>
                          {step.num}
                        </span>
                      </div>

                      <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.18em] block mb-1 ${
                        isSelected ? 'text-[#a5a58d]' : 'text-neutral-500'
                      }`}>
                        {step.sub}
                      </span>

                      <h3 className={`font-heading font-bold text-xl uppercase tracking-wide mb-3 ${
                        isSelected ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {step.title}
                      </h3>

                      <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-600'
                      }`}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom Technical Pill */}
                    <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between text-[11px] font-sans">
                      <span className={`font-bold ${isSelected ? 'text-[#a5a58d]' : 'text-neutral-500'}`}>
                        {step.metric}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-price font-semibold ${
                        isSelected ? 'bg-white/10 text-neutral-300' : 'bg-[#f0efeb] text-neutral-700'
                      }`}>
                        {step.duration}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 03: FULL WIDTH INTERACTIVE SYRINGE CALIBRATOR                */}
        {/* ==================================================================== */}
        {/* ==================================================================== */}
        {/* SECTION 03: FULL WIDTH INTERACTIVE SYRINGE CALIBRATOR                */}
        {/* ==================================================================== */}
        <section className="w-full mx-auto px-3 sm:px-6 md:px-10">
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[28px] p-4 sm:p-8 md:p-12 lg:p-14 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-10 md:mb-12">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-[10.5px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 max-w-full">
                  <Syringe className="w-3.5 h-3.5 text-[#a5a58d] shrink-0" />
                  <span className="truncate">03 &bull; Graduation Simulator</span>
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-extrabold text-neutral-900 tracking-tight uppercase mb-2 sm:mb-3">
                  Reading a Standard U-100 Syringe
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                  Tap any preset below to test and visualize exact barrel draw graduation marks in real time:
                </p>
              </div>

              {/* Dynamic Syringe Simulator Bar */}
              <div className="w-full max-w-5xl mx-auto mb-7 sm:mb-10">
                {/* Live Volume Readout (Cleanly positioned above barrel, never clipped) */}
                <div className="flex items-center justify-between mb-2.5 px-1 sm:px-2">
                  <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider text-neutral-500">
                    Current Simulation:
                  </span>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#20221c] text-white shadow-xs">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#a5a58d] animate-pulse" />
                    <span className="font-price font-bold text-xs sm:text-sm">
                      {syringeTestUnit} Units <span className="text-[#a5a58d]">({(syringeTestUnit / 100).toFixed(2)} mL)</span>
                    </span>
                  </div>
                </div>

                {/* Syringe Barrel */}
                <div className="relative h-14 sm:h-20 md:h-24 bg-[#f0efeb] border-2 border-[#b7b7a4]/60 rounded-full overflow-hidden flex items-center shadow-inner">
                  {/* Dynamic Fluid Fill */}
                  <motion.div 
                    animate={{ width: `${syringeTestUnit}%` }}
                    transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                    className="h-full bg-gradient-to-r from-[#a5a58d] to-[#cb997e] shadow-sm relative z-10"
                  />

                  {/* Graduation Tick Marks Overlay */}
                  <div className="absolute inset-0 flex justify-between px-[4%] items-end pb-1.5 sm:pb-2 pointer-events-none z-20">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((unit) => (
                      <div key={unit} className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <div className={`w-px ${unit % 20 === 0 ? 'h-5 sm:h-7 bg-neutral-900/60' : 'h-2.5 sm:h-4 bg-neutral-900/30'}`} />
                        <span className="text-[8px] sm:text-[10px] font-price font-bold text-neutral-600">
                          {unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Barrel Endmarks (Cleanly formatted on mobile without collision) */}
                <div className="flex justify-between mt-2 sm:mt-3 text-[10.5px] sm:text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 px-[4%]">
                  <span>0 U (0 mL)</span>
                  <span>50 U (0.50 mL)</span>
                  <span>100 U (1.00 mL)</span>
                </div>
              </div>

              {/* Interactive Presets (Clickable Action Cards) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
                {[
                  { ml: '0.10 mL', unit: 10, label: '10 Units', note: 'Initial Micro-Draw' },
                  { ml: '0.25 mL', unit: 25, label: '25 Units', note: 'Quarter Capacity' },
                  { ml: '0.50 mL', unit: 50, label: '50 Units', note: 'Half Capacity' },
                  { ml: '1.00 mL', unit: 100, label: '100 Units', note: 'Full Capacity' },
                ].map((item) => {
                  const isActive = syringeTestUnit === item.unit
                  return (
                    <button
                      key={item.unit}
                      onClick={() => setSyringeTestUnit(item.unit)}
                      className={`text-left p-3 sm:p-5 md:p-6 rounded-2xl transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-[#20221c] text-white border-2 border-[#a5a58d] shadow-md ring-2 ring-[#a5a58d]/30 sm:scale-105' 
                          : 'bg-[#f0efeb] text-neutral-800 border border-[#b7b7a4]/50 hover:border-[#a5a58d] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base sm:text-2xl md:text-3xl font-price font-bold">
                          {item.ml}
                        </span>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a5a58d] shrink-0" />}
                      </div>
                      <div className={`text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider mb-0.5 sm:mb-1 ${
                        isActive ? 'text-[#a5a58d]' : 'text-neutral-900'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-[9.5px] sm:text-[10.5px] font-sans leading-tight ${isActive ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {item.note}
                      </div>
                    </button>
                  )
                })}
              </div>
            </FadeUp>
          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 04: THE MATHEMATICS OF RECONSTITUTION                        */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#b7b7a4]/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  <Calculator className="w-3.5 h-3.5 text-[#a5a58d]" />
                  <span>04 &bull; Mathematical Formula</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 tracking-tight uppercase mb-3">
                  The Mathematics of Reconstitution
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
                  This is the exact formula behind every result above, so you can check it by hand whenever you want:
                </p>
              </div>

              {/* Universal Concentration Formula Box (Obsidian & Olive) */}
              <div className="bg-[#20221c] rounded-2xl p-6 sm:p-8 text-[#fff1e6] mb-8 border border-[#32352a] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10.5px] font-sans font-bold uppercase tracking-widest text-[#a5a58d] block mb-2">
                    Universal Dilution Formula
                  </span>
                  <div className="font-price font-bold text-sm sm:text-base md:text-xl text-white tracking-wide flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                    <span className="text-[#a5a58d]">(</span>
                    <span>Target Dose <span className="text-neutral-400 text-xs font-normal">mcg</span></span>
                    <span className="text-[#a5a58d]">&divide;</span>
                    <span>Total Peptide <span className="text-neutral-400 text-xs font-normal">mcg</span></span>
                    <span className="text-[#a5a58d]">)</span>
                    <span className="text-neutral-400">&times;</span>
                    <span>Diluent Volume <span className="text-neutral-400 text-xs font-normal">mL</span></span>
                    <span className="text-neutral-400">=</span>
                    <span className="text-[#cb997e] underline underline-offset-4">Draw Volume (mL)</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#a5a58d]">
                  <Calculator className="w-6 h-6" />
                </div>
              </div>

              {/* Step-by-Step Scenario Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-[#f0efeb] p-6 rounded-2xl border border-[#b7b7a4]/40">
                  <h4 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#a5a58d]" /> Benchmark Scenario
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                    <li className="flex justify-between pb-2 border-b border-[#b7b7a4]/30">
                      <span className="font-medium text-neutral-600">Lyophilized Cake:</span>
                      <span className="font-price font-bold text-neutral-900">5 mg (5,000 mcg)</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-[#b7b7a4]/30">
                      <span className="font-medium text-neutral-600">BAC Water Added:</span>
                      <span className="font-price font-bold text-neutral-900">2.0 mL</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-neutral-600">Target Dose:</span>
                      <span className="font-price font-bold text-neutral-900">250 mcg</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#f0efeb] p-6 rounded-2xl border border-[#b7b7a4]/40 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#55724a]" /> Mathematical Resolution
                    </h4>
                    <p className="font-price text-xs sm:text-sm text-neutral-700 mb-3">
                      (250 mcg &divide; 5,000 mcg) &times; 2.0 mL = <strong className="text-neutral-900">0.10 mL</strong>
                    </p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#b7b7a4]/50 flex items-center justify-between shadow-2xs">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-700">
                      U-100 Syringe Draw
                    </span>
                    <span className="text-lg font-price font-bold text-[#cb997e]">
                      10 Units (0.10 mL)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 text-center">
                Need to convert between mg, mcg, mL, and IU? Use the{' '}
                <Link
                  href="#calculators-hub"
                  className="font-bold text-[#a5a58d] underline underline-offset-4 hover:text-neutral-950 transition-colors"
                >
                  Unit Converter above &rarr;
                </Link>
              </p>
            </FadeUp>
          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 05: FULL WIDTH DILUTION GUIDELINES TABLE WITH FILTER         */}
        {/* ==================================================================== */}
        <section className="w-full mx-auto px-3 sm:px-6 md:px-10">
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[28px] p-6 sm:p-10 md:p-14 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <FadeUp>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                    <Droplets className="w-3.5 h-3.5 text-[#a5a58d]" />
                    <span>05 &bull; Standard Dilution Guidelines</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-extrabold text-neutral-900 tracking-tight uppercase leading-tight">
                    Dilution Ratios &amp; Concentrations
                  </h2>
                </div>

                {/* Filter Selector */}
                <div className="inline-flex items-center bg-[#f0efeb] border border-[#b7b7a4]/50 p-1.5 rounded-2xl">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-neutral-500 px-3 hidden sm:inline-block">
                    Highlight Dose:
                  </span>
                  {[
                    { key: 'all', label: 'All Ratios' },
                    { key: '250', label: '250 mcg' },
                    { key: '500', label: '500 mcg' },
                    { key: '1000', label: '1,000 mcg' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setTableFilter(filter.key as any)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                        tableFilter === filter.key
                          ? 'bg-[#a5a58d] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medical Table with Olive Green Header */}
              <div className="overflow-x-auto rounded-2xl border border-[#b7b7a4]/50 shadow-sm">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-[#a5a58d] text-white text-[11px] font-sans font-bold uppercase tracking-wider">
                      <th className="py-4 px-4 sm:px-6">Vial Content</th>
                      <th className="py-4 px-4 sm:px-6">BAC Water Added</th>
                      <th className="py-4 px-4 sm:px-6">Resulting Density</th>
                      <th className="py-4 px-4 sm:px-6">250 mcg Dose</th>
                      <th className="py-4 px-4 sm:px-6">500 mcg Dose</th>
                      <th className="py-4 px-4 sm:px-6">1,000 mcg Dose</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm font-sans divide-y divide-[#b7b7a4]/30 bg-white">
                    {DILUTION_DATA.map((row, i) => {
                      const isHighlighted = tableFilter === 'all' || row.highlight === tableFilter
                      return (
                        <tr 
                          key={i} 
                          className={`transition-colors ${
                            isHighlighted ? 'hover:bg-[#a5a58d]/10' : 'opacity-40 hover:opacity-100'
                          }`}
                        >
                          <td className="py-4 px-4 sm:px-6 font-price font-bold text-neutral-900">{row.mass}</td>
                          <td className="py-4 px-4 sm:px-6 font-price text-neutral-700">{row.bac}</td>
                          <td className="py-4 px-4 sm:px-6 font-price text-neutral-700">{row.conc}</td>
                          <td className={`py-4 px-4 sm:px-6 font-price font-bold ${
                            tableFilter === '250' ? 'text-[#cb997e] bg-[#cb997e]/10' : 'text-neutral-800'
                          }`}>
                            {row.draw250}
                          </td>
                          <td className={`py-4 px-4 sm:px-6 font-price font-bold ${
                            tableFilter === '500' ? 'text-[#cb997e] bg-[#cb997e]/10' : 'text-neutral-800'
                          }`}>
                            {row.draw500}
                          </td>
                          <td className={`py-4 px-4 sm:px-6 font-price font-bold ${
                            tableFilter === '1000' ? 'text-[#cb997e] bg-[#cb997e]/10' : 'text-neutral-800'
                          }`}>
                            {row.draw1000}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 06: STORAGE MASTERCLASS (Olive & Obsidian Contrast)          */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Lyophilized Powder Card */}
            <FadeUp>
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#b7b7a4]/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between hover:border-[#a5a58d] transition-colors">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55724a]/15 border border-[#55724a]/30 text-[10px] font-bold uppercase tracking-wider text-[#55724a] mb-5">
                    <ShieldCheck size={12} /> Solid-Phase Lyophilized Cake
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-900 uppercase tracking-tight mb-3">
                    Freeze-Dried Powder
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                    In desiccated freeze-dried cakes, peptide bonds maintain stability over long periods when shielded from light and humidity.
                  </p>
                  
                  <ul className="space-y-3 font-sans text-xs sm:text-sm">
                    <li className="flex items-center justify-between pb-2.5 border-b border-[#b7b7a4]/30">
                      <span className="text-neutral-700">Room Temp (20&deg;C &ndash; 25&deg;C)</span>
                      <span className="font-price font-bold text-neutral-900">30 &ndash; 60 Days</span>
                    </li>
                    <li className="flex items-center justify-between pb-2.5 border-b border-[#b7b7a4]/30">
                      <span className="text-neutral-700">Refrigerated (2&deg;C &ndash; 8&deg;C)</span>
                      <span className="font-price font-bold text-neutral-900">Up to 2 Years</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-neutral-700">Deep Freeze (&minus;20&deg;C)</span>
                      <span className="font-price font-bold text-[#55724a]">3 &ndash; 5 Years</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#b7b7a4]/30 text-[11px] text-neutral-500 font-sans">
                  *Keep sealed in amber desiccated vials away from condensation.
                </div>
              </div>
            </FadeUp>

            {/* Reconstituted Liquid Card (Obsidian Contrast) */}
            <FadeUp delay={0.15}>
              <div className="bg-[#20221c] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#32352a] shadow-lg h-full flex flex-col justify-between text-[#fff1e6]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[#a5a58d] mb-5">
                    <Snowflake size={12} /> Aqueous Solution Preservation
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white uppercase tracking-tight mb-3">
                    Reconstituted Liquid
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    Once hydrated, continuous refrigeration is non-negotiable to prevent rapid peptide bond cleavage.
                  </p>
                  
                  <ul className="space-y-3 font-sans text-xs sm:text-sm">
                    <li className="flex items-center justify-between pb-2.5 border-b border-white/10">
                      <span className="text-neutral-300">Refrigerated (2&deg;C &ndash; 8&deg;C)</span>
                      <span className="font-price font-bold text-[#a5a58d]">28 &ndash; 30 Days</span>
                    </li>
                    <li className="flex items-center justify-between pb-2.5 border-b border-white/10 text-red-400">
                      <span>Post-Reconstitution Freezing</span>
                      <span className="font-sans font-bold uppercase tracking-wider">NEVER FREEZE</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-neutral-300">Room Temperature Exposure</span>
                      <span className="font-price font-bold text-red-400">&lt; 24 Hours</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-neutral-400 font-sans">
                  *Store upright in refrigerator interior; avoid door movement vibrations.
                </div>
              </div>
            </FadeUp>

          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 07: 3 FATAL MISTAKES (Distinct Cards)                        */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <AlertTriangle className="w-3.5 h-3.5 text-[#a5a58d]" />
                <span>07 &bull; Quality Control</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 tracking-tight uppercase mb-2">
                3 Handling Mistakes That Ruin a Batch
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                These three errors are the most common way researchers accidentally degrade a compound before they even start.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-red-400/60 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 mb-4">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 text-lg uppercase tracking-wide mb-2">
                  1. Shaking the Vial
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Mechanical shearing permanently breaks fragile peptide tertiary structures. Never shake vigorously. Always roll the vial gently between palms.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-400/60 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-4">
                  <Snowflake size={18} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 text-lg uppercase tracking-wide mb-2">
                  2. Freezing Reconstituted Liquid
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Freezing a reconstituted solution forms sharp ice crystal lattices that permanently puncture and cleave amino acid polymers.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#a5a58d] hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#a5a58d]/15 border border-[#a5a58d]/30 flex items-center justify-center text-[#a5a58d] mb-4">
                  <Droplets size={18} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 text-lg uppercase tracking-wide mb-2">
                  3. Plain Sterile Water
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Standard sterile water lacks the 0.9% benzyl alcohol preservative required to suppress bacterial proliferation across multi-day draws.
                </p>
              </div>

            </div>
          </FadeUp>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 08: SYRINGE DANGER: U-100 VS U-40 (Interactive Slider)       */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#b7b7a4]/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[10.5px] font-bold uppercase tracking-wider text-[#a5a58d] mb-4">
                    <AlertTriangle size={12} /> Syringe Calibration Hazards
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 tracking-tight uppercase mb-4 leading-tight">
                    Syringe Calibration:<br />
                    <span className="text-[#a5a58d]">U-100</span> vs U-40
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                    Grabbing the wrong syringe is the single most common way a dose ends up way off target. Most research peptide work is standardized on U-100 syringes (100 units per 1.0 mL).
                  </p>
                  
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex gap-3 items-start bg-[#f0efeb] p-3.5 rounded-xl border border-[#b7b7a4]/40">
                      <CheckCircle2 size={16} className="text-[#55724a] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-900 block uppercase tracking-wide text-xs">U-100 Syringes (Research Standard)</strong>
                        <span className="text-neutral-600 text-xs">100 units = 1.0 mL. The standard for most peptide research.</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
                      <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-900 block uppercase tracking-wide text-xs">U-40 Syringes (Different Scale)</strong>
                        <span className="text-red-700 text-xs">40 units = 1.0 mL. Reading a U-100 result off a U-40 syringe delivers 2.5x more volume than intended.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Volume Comparison Box with Slider */}
                <div className="lg:col-span-6 bg-[#f0efeb] p-6 sm:p-8 rounded-2xl border border-[#b7b7a4]/40">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-sans font-bold uppercase tracking-wider text-xs text-neutral-700 flex items-center gap-1.5">
                      <Sliders size={13} className="text-[#a5a58d]" /> Test Liquid Volume:
                    </h4>
                    <span className="font-price font-bold text-sm text-neutral-900 bg-white px-3 py-1 rounded-lg border border-[#b7b7a4]/40">
                      {dangerSliderVal.toFixed(2)} mL
                    </span>
                  </div>

                  <input 
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={dangerSliderVal}
                    onChange={(e) => setDangerSliderVal(parseFloat(e.target.value))}
                    className="w-full accent-[#a5a58d] mb-6 cursor-pointer"
                  />

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-sans font-bold mb-1.5">
                        <span className="text-neutral-800">U-100 Syringe Draw</span>
                        <span className="font-price text-[#55724a]">{Math.round(dangerSliderVal * 100)} Units</span>
                      </div>
                      <div className="h-7 bg-white rounded-full border border-[#b7b7a4]/50 overflow-hidden p-0.5">
                        <motion.div 
                          animate={{ width: `${dangerSliderVal * 100}%` }}
                          className="h-full bg-[#55724a]/25 rounded-full border border-[#55724a] flex items-center justify-end pr-3"
                        >
                          <span className="text-[10.5px] font-price font-bold text-[#55724a]">
                            {Math.round(dangerSliderVal * 100)} U
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-sans font-bold mb-1.5">
                        <span className="text-neutral-800">U-40 Syringe Draw (Dangerously Altered)</span>
                        <span className="font-price text-red-600">{Math.round(dangerSliderVal * 40)} Units</span>
                      </div>
                      <div className="h-7 bg-white rounded-full border border-[#b7b7a4]/50 overflow-hidden p-0.5">
                        <motion.div 
                          animate={{ width: `${dangerSliderVal * 40}%` }}
                          className="h-full bg-red-500/25 rounded-full border border-red-500 flex items-center justify-end pr-2"
                        >
                          <span className="text-[10px] font-price font-bold text-red-700">
                            {Math.round(dangerSliderVal * 40)} U
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 text-center mt-5 font-sans">
                    The identical liquid volume represents {Math.round(dangerSliderVal * 100)} units on a U-100 syringe, but only {Math.round(dangerSliderVal * 40)} units on U-40.
                  </p>
                </div>

              </div>
            </FadeUp>
          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 09: FULL WIDTH DEGRADATION TIMELINE (Obsidian & Olive)       */}
        {/* ==================================================================== */}
        <section className="w-full mx-auto px-3 sm:px-6 md:px-10">
          <div className="w-full bg-[#20221c] rounded-2xl sm:rounded-3xl md:rounded-[28px] p-6 sm:p-10 md:p-14 border border-[#32352a] shadow-lg text-[#fff1e6]">
            <FadeUp>
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#a5a58d]" />
                  <span>09 &bull; Stability Degradation</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-extrabold text-white tracking-tight uppercase mb-3">
                  Storage Window Guidance
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  How long a reconstituted vial holds up depends on temperature and time. Here's the window we work within:
                </p>
              </div>

              {/* Storage Timeline Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { day: 'Days 1-7', purity: 'Refrigerated', status: 'Best Window', note: 'Use within this window for the most consistent results.', color: 'text-[#55724a]', pill: 'bg-[#55724a]/20 text-[#55724a]' },
                  { day: 'Days 8-30', purity: 'Refrigerated', status: 'Still Within Guidance', note: 'Keep at 2-8°C; this is the outer edge of the standard storage window.', color: 'text-[#a5a58d]', pill: 'bg-[#a5a58d]/20 text-[#a5a58d]' },
                  { day: 'Beyond 30 Days', purity: 'Not Recommended', status: 'No Support Data', note: "We don't have stability data supporting use past this point.", color: 'text-[#cb997e]', pill: 'bg-[#cb997e]/20 text-[#cb997e]' },
                  { day: 'Room Temp', purity: '< 24 Hours', status: 'Time-Sensitive', note: 'Once out of the fridge, plan to use it the same day.', color: 'text-red-400', pill: 'bg-red-500/20 text-red-400' },
                ].map((step, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-center flex flex-col justify-between hover:bg-white/10 transition-colors">
                    <div>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                        {step.day}
                      </span>
                      <div className="text-2xl sm:text-3xl font-price font-bold text-white mb-2">
                        {step.purity}
                      </div>
                      <span className={`inline-block text-[10.5px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${step.pill}`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans border-t border-white/10 pt-3 mt-2">
                      {step.note}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>


        {/* ==================================================================== */}
        {/* SECTION 10: ESSENTIAL RESEARCH GLOSSARY                              */}
        {/* ==================================================================== */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#a5a58d]" />
                <span>10 &bull; Laboratory Lexicon</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 tracking-tight uppercase mb-2">
                Essential Research Glossary
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Core scientific definitions governing synthetic peptide reconstitution:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { term: 'Lyophilized', tag: 'biochem', def: 'Freeze-dried into a stable powder. Removing the water this way keeps the peptide intact until you reconstitute it.' },
                { term: 'BAC Water', tag: 'dilution', def: 'Sterile water carrying 0.9% benzyl alcohol, which keeps bacteria from growing in the vial once it is opened.' },
                { term: 'mg vs mcg', tag: 'units', def: '1 milligram equals 1,000 micrograms. Mixing the two up is the easiest way to be off by a factor of 1,000.' },
                { term: 'U-100', tag: 'syringes', def: 'A syringe marked so that 100 units equals 1.0 mL. It is the scale this calculator uses for every result above.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-[#b7b7a4]/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#a5a58d] transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#a5a58d] uppercase tracking-wide mb-2.5">
                      {item.term}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {item.def}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

      </div>

      {/* ==================================================================== */}
      {/* SECTION 11: FULL WIDTH FAQS (Identical to Homepage FAQs Section)      */}
      {/* ==================================================================== */}
      <div className="w-full">
        <SharedFaqSection
          title={t('faq.title')}
          subtitle="FREQUENTLY ASKED QUESTIONS"
          description={t('faq.description')}
          faqs={CALCULATOR_FAQS}
          contactHeading="Still have dosing questions?"
          contactSubtext="Reach out through our contact page and our team will help you work through the math."
          contactButtonText="Contact Scientific Team"
          contactHref="/contact-us"
        />
      </div>

      {/* ==================================================================== */}
      {/* SECTION 12: RESEARCH COMPLIANCE DISCLAIMER (Full Width)             */}
      {/* ==================================================================== */}
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#b7b7a4]/50 flex items-start gap-3.5 shadow-sm">
          <Info className="w-5 h-5 text-[#a5a58d] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
            <strong className="text-neutral-900 uppercase font-bold tracking-wider block mb-1">
              Laboratory Research Disclaimer
            </strong>
            All calculators, formulas, dilution tables, and educational content on this page are provided strictly for theoretical in-vitro laboratory research and calibration. Compounds supplied by Veracue Peptides are intended exclusively for authorized laboratory and scientific evaluation, and not for human or veterinary therapeutic application.
          </div>
        </div>
      </div>

    </main>
  )
}
