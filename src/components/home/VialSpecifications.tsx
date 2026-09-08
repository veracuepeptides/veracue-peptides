'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Microscope, Layers, QrCode } from 'lucide-react'

interface SpecificationCard {
  id: string
  step: string
  category: string
  badge: string
  title: string
  description: string
  technicalSpec: string
  pointerLabel: string
  pointerTargetY: string // percentage from top of vial for the connection node
  column: 'left' | 'right'
  icon: React.ElementType
}

const SPEC_CARDS: SpecificationCard[] = [
  {
    id: 'hplc-purity',
    step: '01',
    category: 'CHROMATOGRAPHY',
    badge: 'RP-HPLC ≥99%',
    title: '≥99% HPLC Certified Purity',
    pointerLabel: 'Pure Lyophilized Cake (≥99.2%)',
    pointerTargetY: '74%',
    description: 'Every synthesis lot undergoes high-resolution reverse-phase chromatography (RP-HPLC) testing. Peak separation verifies minimum 99.0% chemical purity with zero truncated sequences.',
    technicalSpec: 'USP Analytical Standards • Single Sharp Peak',
    column: 'left',
    icon: Microscope,
  },
  {
    id: 'lyophilization',
    step: '02',
    category: 'CLEANROOM FORMULATION',
    badge: 'ISO-7 / CLASS 10K',
    title: 'Sterile Lyophilization Matrix',
    pointerLabel: 'N₂ Gas High-Vacuum Butyl Stopper',
    pointerTargetY: '14%',
    description: 'Formulated in ISO-7 cleanroom laboratories and freeze-dried into a uniform lyophilized cake. Capped under high-vacuum nitrogen with butyl stoppers to eliminate moisture hydrolysis.',
    technicalSpec: 'Moisture <1.5% • High-Vacuum Nitrogen Shield',
    column: 'left',
    icon: Layers,
  },
  {
    id: 'mass-spec',
    step: '03',
    category: 'MASS SPECTROMETRY',
    badge: 'ESI-MS IDENTITY',
    title: 'ESI-MS Identity Validation',
    pointerLabel: 'Type-I Borosilicate Glass • ±0.5 Da',
    pointerTargetY: '46%',
    description: 'Electrospray Ionization Mass Spectrometry (ESI-MS) measures empirical molecular mass against theoretical sequence within ±0.5 Da, validating structural authenticity.',
    technicalSpec: 'Sequence Authenticated • Zero Isomers Confirmed',
    column: 'right',
    icon: ShieldCheck,
  },
  {
    id: 'batch-coa',
    step: '04',
    category: 'COLD CHAIN & COA',
    badge: 'SERIALIZED LOT',
    title: 'Traceable Batch COA & Cold Chain',
    pointerLabel: 'Tamper-Evident Serial QR Code',
    pointerTargetY: '62%',
    description: 'Every vial includes a tamper-evident label with a unique serial lot QR code linking to public analytical reports. Maintained at -20°C with insulated temperature protection.',
    technicalSpec: '100% Chain-of-Custody • -20°C Desiccated Storage',
    column: 'right',
    icon: QrCode,
  },
]

export function VialSpecifications() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const leftCards = SPEC_CARDS.filter((c) => c.column === 'left')
  const rightCards = SPEC_CARDS.filter((c) => c.column === 'right')

  // Render Clean Modern Specification Card (Zero Cursive, Zero Glows)
  const renderCard = (card: SpecificationCard) => {
    const isHovered = activeCard === card.id
    const IconComponent = card.icon

    return (
      <div
        key={card.id}
        onMouseEnter={() => setActiveCard(card.id)}
        onMouseLeave={() => setActiveCard(null)}
        className={`group relative z-20 p-6 sm:p-7 rounded-[24px] sm:rounded-[28px] transition-all duration-300 border cursor-pointer bg-white flex flex-col justify-between ${
          isHovered
            ? '-translate-y-1.5 border-neutral-900/40 shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
            : 'border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        }`}
      >
        {/* Top Meta Bar: Technical Category + Modern Pill Badge + Step Number */}
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#20221c]' : 'bg-[#cb997e]'}`} />
              <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-neutral-500">
                {card.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/70 uppercase">
                {card.badge}
              </span>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors duration-300 ${
                isHovered ? 'bg-[#20221c] text-[#fff1e6]' : 'bg-neutral-100 text-neutral-900 border border-neutral-200/80'
              }`}>
                {card.step}
              </span>
            </div>
          </div>

          {/* Clean Modern Title (No Cursive) */}
          <div className="flex items-start gap-2.5 mt-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-center shrink-0 text-neutral-700 group-hover:text-neutral-950 group-hover:border-neutral-300 transition-colors">
              <IconComponent size={16} strokeWidth={2} />
            </div>
            <h3 className="font-heading font-extrabold text-neutral-900 text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.25] tracking-tight">
              {card.title}
            </h3>
          </div>

          {/* Analytical Description */}
          <p className="text-neutral-600 text-[13px] sm:text-[13.5px] leading-[1.65] font-sans mt-3">
            {card.description}
          </p>
        </div>

        {/* Bottom Technical Spec strip with verification mark */}
        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span className="flex items-center gap-1.5 font-medium text-neutral-600">
            <CheckCircle2 size={13} className="text-[#cb997e] shrink-0" />
            <span className="truncate">{card.technicalSpec}</span>
          </span>
          <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase shrink-0 pl-2">
            VALIDATED
          </span>
        </div>
      </div>
    )
  }

  return (
    <section 
      id="vial-specifications"
      className="font-sans relative z-30 py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 bg-[#a5a58d] overflow-hidden select-none"
    >
      {/* Background Architectural Blueprint Reticles (Clean, Zero Glow) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Crisp Corner Reticle Crosshairs */}
        <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-white/25 hidden md:block" />
        <div className="absolute top-12 right-12 w-4 h-4 border-t border-r border-white/25 hidden md:block" />
        <div className="absolute bottom-12 left-12 w-4 h-4 border-b border-l border-white/25 hidden md:block" />
        <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-white/25 hidden md:block" />
      </div>

      {/* Main Layout Container */}
      <div className="w-full max-w-[88rem] mx-auto relative z-10">

        {/* Section Header (No cursive, clean modern typography) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 relative z-10">
          
          {/* Eyebrow Pill (Standardized to Best Seller "MOST POPULAR" style) */}
          <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-sm">
            <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
              ANALYTICAL INTEGRITY &amp; VIAL ARCHITECTURE
            </span>
          </div>

          {/* Heading (Font Heading / Sora, Bold & Clean) */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-neutral-900 leading-[1.06] tracking-tight uppercase">
            Engineered For Precision.{' '}
            <span className="text-[#fff1e6]">
              Verified By Science.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-900/85 text-sm sm:text-base md:text-lg leading-relaxed font-sans mt-3 sm:mt-4 max-w-2xl mx-auto">
            Every Veracue peptide vial is formulated to the highest analytical research standard—incorporating high-vacuum nitrogen preservation, third-party HPLC purity certification, and full sequence confirmation.
          </p>
        </div>

        {/* Main Stage: Left Cards + Central Precision Viewport & Vial + Right Cards */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 xl:gap-10">
          
          {/* LEFT COLUMN: Cards 01 & 02 */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-2 lg:order-1 relative z-20">
            {leftCards.map(renderCard)}
          </div>

          {/* CENTER STAGE: Precision Viewport & Heroic Vial (Zero Glow, Clean Physics) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2 py-6 sm:py-10 lg:py-4 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] z-10">
            
            {/* Full-bleed Horizontal Datum Line passing through the EXACT center of the circle */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-[100vw] -right-[100vw] h-[1px] bg-white/30 pointer-events-none -z-10" />

            {/* Vertical Datum Line: Extended with smooth top and bottom fade gradients */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[680px] sm:h-[760px] lg:h-[820px] w-[1px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.28)_15%,rgba(255,255,255,0.28)_85%,transparent_100%)] pointer-events-none -z-10 hidden lg:block" />

            {/* Clean Architectural Viewfinder (Zero Glows, Crisp Calibration Marks) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              
              {/* Outer Framing Ring with Cardinal Registration Markers */}
              <div className="w-[300px] sm:w-[360px] md:w-[400px] lg:w-[420px] aspect-square rounded-full border border-white/30 relative flex items-center justify-center">
                
                {/* Cardinal Registration Ticks (Intersecting precisely with the datum lines) */}
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80" />
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80" />
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80" />
                
                {/* Inner Concentric Hairline */}
                <div className="w-[230px] sm:w-[270px] md:w-[300px] aspect-square rounded-full border border-white/20" />

                {/* Subtle Technical Markings */}
                <span className="absolute top-4 right-8 text-[9px] font-mono tracking-widest text-white/60 uppercase">
                  CALIB. 50MG
                </span>
                <span className="absolute bottom-4 left-8 text-[9px] font-mono tracking-widest text-white/60 uppercase">
                  TYPE-I GLASS
                </span>
              </div>
            </div>

            {/* LEVITATING VIAL & NATURAL STUDIO CONTACT SHADOW */}
            <div className="relative z-30 flex flex-col items-center">
              
              {/* Floating Vial Container */}
              <motion.div 
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex flex-col items-center"
              >
                {/* Large Heroic Vial Image */}
                <div className="w-[190px] xs:w-[220px] sm:w-[260px] md:w-[290px] lg:w-[305px] xl:w-[330px] aspect-[2/3] relative filter drop-shadow-[0_18px_32px_rgba(25,27,20,0.2)] transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/veracue-images/veracue-research-grade-50mg-droplets-portrait.png"
                    alt="Veracue Research Grade 50mg Lyophilized Peptide Vial"
                    fill
                    priority
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 290px, 330px"
                    className="object-contain select-none pointer-events-none"
                  />

                  {/* Interactive Hotspot Indicators: Activate cleanly on card hover */}
                  {SPEC_CARDS.map((card) => {
                    const isTargeted = activeCard === card.id
                    return (
                      <div
                        key={card.id}
                        className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${
                          isTargeted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}
                        style={{ top: card.pointerTargetY }}
                      >
                        <div className="flex items-center gap-2 bg-[#20221c] text-[#fff1e6] px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-700 whitespace-nowrap -translate-y-1/2">
                          <span className="w-2 h-2 rounded-full bg-[#cb997e]" />
                          <span className="text-[11px] font-mono font-medium tracking-wide">
                            {card.pointerLabel}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Natural Ground Contact Shadow (Clean Physics, No Glowing Halo) */}
                <motion.div
                  animate={{
                    scale: [1, 0.88, 1],
                    opacity: [0.28, 0.15, 0.28],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-36 sm:w-44 h-2.5 rounded-[100%] bg-neutral-950/40 blur-[4px] -mt-1 pointer-events-none"
                />
              </motion.div>

              {/* Minimalist Architectural Grounding Baseline (Clean, Crisp, Solid) */}
              <div className="w-36 sm:w-48 h-[1px] bg-white/40 -mt-1 pointer-events-none" />

            </div>

          </div>

          {/* RIGHT COLUMN: Cards 03 & 04 */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-3 relative z-20">
            {rightCards.map(renderCard)}
          </div>

        </div>

        {/* BOTTOM PREMIUM CTA DOCK */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/25 relative z-10 flex flex-col items-center justify-center text-center">
          
          {/* Centered Signature Luxury Pill Button */}
          <Link
            href="/certificates"
            className="relative group inline-flex items-center gap-3 sm:gap-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] pl-6 sm:pl-8 pr-1.5 sm:pr-2 py-2.5 sm:py-3 rounded-full font-semibold text-[13px] sm:text-[14px] border border-neutral-800 hover:border-[#cb997e] transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden"
          >
            {/* Specular Light Sheen Reflection */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

            {/* Label Text */}
            <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium">
              Review Batch Chromatograms
            </span>

            {/* Circular Arrow Badge with Dual-Arrow Slide */}
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

        {/* Legal EEAT In-Vitro Notice (Light colored, clean monospace with balanced contrast) */}
        <div className="mt-6 sm:mt-7 text-center text-[10px] sm:text-[11px] font-mono text-[#fff1e6]/70 uppercase tracking-[0.16em] relative z-10 flex items-center justify-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#fff1e6]/40 hidden sm:inline-block" />
          <span>Strictly for in-vitro laboratory research and analytical experimental use • Not for human or veterinary administration</span>
          <span className="w-1 h-1 rounded-full bg-[#fff1e6]/40 hidden sm:inline-block" />
        </div>

      </div>
    </section>
  )
}
