'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Award, Lock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const LAB_SLIDES = [
  {
    id: 0,
    tag: "RP-HPLC & ESI-MS SPECIFICATION",
    title: "HPLC purity reported on every lyophilized lot.",
    description: "Each batch is analyzed by reverse-phase HPLC, and the result is published on its Certificate of Analysis.",
    image: "/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp",
    stats: [
      { label: "Purity", value: "Per Batch COA" },
      { label: "Testing", value: "HPLC + MS" },
      { label: "Designation", value: "RUO Grade" }
    ]
  },
  {
    id: 1,
    tag: "BATCH-LEVEL COA ARCHIVE",
    title: "Analytical transparency for every batch.",
    description: "Certificates of analysis with chromatography and mass spectrometry data are published by lot for research review.",
    image: "/veracue-images/veracue-research-grade-gloved-hand.webp",
    stats: [
      { label: "Testing", value: "HPLC + MS" },
      { label: "Verification", value: "Lot-Specific" },
      { label: "Archive", value: "Public COAs" }
    ]
  },
  {
    id: 2,
    tag: "LYOPHILIZED VIAL FORMAT",
    title: "Supplied freeze-dried in sealed glass vials.",
    description: "Lyophilized powder is a stable format for storage and transit until the compound is reconstituted for research.",
    image: "/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp",
    stats: [
      { label: "Format", value: "Lyophilized" },
      { label: "Packaging", value: "Sealed Vial" },
      { label: "Shipping", value: "From the USA" }
    ]
  }
]

interface AuthSplitLayoutProps {
  children: React.ReactNode
  mode: 'login' | 'register'
}

export function AuthSplitLayout({ children, mode }: AuthSplitLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LAB_SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % LAB_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + LAB_SLIDES.length) % LAB_SLIDES.length)

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen w-full bg-[#f0efeb] flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden font-sans">
      
      {/* Left Column: Form & Veracue Authentication Branding */}
      <div className="w-full lg:w-[48%] xl:w-[45%] min-h-screen lg:min-h-0 lg:h-full flex flex-col justify-between px-4 py-5 sm:px-8 sm:py-6 lg:px-8 lg:py-5 xl:px-12 xl:py-6 relative bg-[#f0efeb] shrink-0 z-20 overflow-y-auto scrollbar-none">
        
        {/* Top Header: Brand Logo & Return to Home */}
        <div className="flex items-center justify-between shrink-0 pb-3 sm:pb-4 w-full">
          <Link href="/" className="inline-block hover:opacity-85 transition-opacity">
            <Image 
              src="/veracue-images/logo-header.webp" 
              alt="Veracue Peptides" 
              width={160} 
              height={38} 
              className="h-7 sm:h-8 w-auto object-contain" 
              priority
            />
          </Link>
          
          <Link 
            href="/" 
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#20221c]/15 bg-white/70 hover:bg-[#20221c] text-[#20221c]/70 hover:text-[#f0efeb] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Storefront</span>
          </Link>
        </div>

        {/* Center Container: Dynamic Form Card + Mobile Image Showcase */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-2 sm:py-4 flex flex-col justify-center">
          
          {/* Mobile Visual Showcase Banner (Shown on mobile & tablet, hidden on desktop) */}
          <div className="lg:hidden w-full mb-3 rounded-2xl overflow-hidden relative h-36 xs:h-40 sm:h-48 border border-[#20221c]/10 shadow-xs shrink-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={LAB_SLIDES[currentSlide].image}
                  alt={LAB_SLIDES[currentSlide].title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* Top Tag on Mobile Banner */}
            <div className="absolute top-2.5 right-2.5 z-10">
              <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-sans font-semibold tracking-wider uppercase">
                RUO Grade
              </div>
            </div>

            {/* Bottom Title & Micro Indicators on Mobile Banner */}
            <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-end justify-between gap-2">
              <div className="max-w-[75%]">
                <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#cb997e] flex items-center gap-1 mb-0.5">
                  <Sparkles size={10} />
                  <span>{LAB_SLIDES[currentSlide].tag}</span>
                </p>
                <p className="text-xs sm:text-sm font-sans font-medium text-white line-clamp-1">
                  {LAB_SLIDES[currentSlide].title}
                </p>
              </div>

              {/* Micro slide indicators */}
              <div className="flex items-center gap-1 shrink-0 pb-0.5">
                {LAB_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {children}
        </div>

        {/* Bottom Bar: Responsive Trust Badges & Regulatory RUO Disclaimer */}
        <div className="pt-4 sm:pt-4 shrink-0 border-t border-[#20221c]/10 mt-4 sm:mt-auto flex flex-col gap-2.5">
          
          {/* Mobile Single-Row Badges (< sm) / Desktop Grid (>= sm) */}
          <div className="flex sm:hidden items-center justify-center flex-wrap gap-x-3 gap-y-1.5 text-center">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#20221c]">
              <ShieldCheck size={13} className="text-[#20221c]/80 shrink-0" />
              <span>256-Bit SSL</span>
            </div>
            <span className="text-[#20221c]/25 text-[10px]">&bull;</span>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#20221c]">
              <Award size={13} className="text-[#20221c]/80 shrink-0" />
              <span>HPLC Tested</span>
            </div>
            <span className="text-[#20221c]/25 text-[10px]">&bull;</span>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#20221c]">
              <Lock size={13} className="text-[#20221c]/80 shrink-0" />
              <span>Batch COAs</span>
            </div>
          </div>

          {/* Tablet & Desktop Detailed 3-Column Badges (>= sm) */}
          <div className="hidden sm:grid grid-cols-3 gap-3 text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#20221c]/5 flex items-center justify-center shrink-0">
                <ShieldCheck size={13} className="text-[#20221c]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#20221c] tracking-tight uppercase font-sans">256-Bit SSL</p>
                <p className="text-[10px] text-[#20221c]/60 font-medium leading-tight font-sans">Encrypted Ordering</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#20221c]/5 flex items-center justify-center shrink-0">
                <Award size={13} className="text-[#20221c]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#20221c] tracking-tight uppercase font-sans">HPLC Tested</p>
                <p className="text-[10px] text-[#20221c]/60 font-medium leading-tight font-sans">Purity Per Batch</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#20221c]/5 flex items-center justify-center shrink-0">
                <Lock size={13} className="text-[#20221c]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#20221c] tracking-tight uppercase font-sans">Batch COAs</p>
                <p className="text-[10px] text-[#20221c]/60 font-medium leading-tight font-sans">Lot-Specific Testing</p>
              </div>
            </div>
          </div>

          {/* Authentic Regulatory RUO Compliance Note */}
          <p className="text-[10px] sm:text-[11px] text-[#20221c]/65 leading-relaxed font-sans text-center sm:text-left">
            <strong className="font-bold text-[#20221c]">RUO Notice:</strong> All products are strictly for in-vitro laboratory research. Not for human consumption, therapeutic, or veterinary use.
          </p>
        </div>
      </div>

      {/* Right Column: Immersive Laboratory Editorial Showcase (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative h-full max-h-screen overflow-hidden bg-[#181a15] shrink-0">
        
        {/* Background Slide Visuals */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={LAB_SLIDES[currentSlide].image}
              alt={LAB_SLIDES[currentSlide].title}
              fill
              priority
              className="object-cover"
              sizes="55vw"
            />
            
            {/* Multi-layer luxury vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181a15] via-[#181a15]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181a15]/80 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top Header Tag on Imagery - Real RUO Standards */}
        <div className="absolute top-8 right-8 z-20">
          <div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-sans font-semibold tracking-wider uppercase shadow-lg">
            Research Use Only (RUO) &bull; In-Vitro Lab Standards
          </div>
        </div>

        {/* Bottom Frosted Glass Laboratory Editorial Card */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="bg-[#20221c]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-6 xl:p-7 text-white shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Badge Tag */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-sans font-semibold tracking-wider text-[#a5a58d] uppercase">
                  <Sparkles size={11} className="text-[#cb997e]" />
                  {LAB_SLIDES[currentSlide].tag}
                </div>
                
                {/* Pagination counter */}
                <span className="text-white/40 text-xs font-sans font-medium tracking-widest">
                  0{currentSlide + 1} / 0{LAB_SLIDES.length}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl xl:text-2xl font-serif font-normal text-white leading-snug tracking-tight mb-2">
                "{LAB_SLIDES[currentSlide].title}"
              </h3>
              <p className="text-xs xl:text-[13px] text-white/70 font-light leading-relaxed max-w-xl mb-4">
                {LAB_SLIDES[currentSlide].description}
              </p>

              {/* Stats Footer Row */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                {LAB_SLIDES[currentSlide].stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-sans uppercase tracking-wider text-white/50 font-medium">{stat.label}</p>
                    <p className="text-sm xl:text-base font-sans font-semibold text-[#f0efeb] mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              {LAB_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide} 
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-md"
                aria-label="Previous slide"
              >
                <ChevronLeft size={15} />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-md"
                aria-label="Next slide"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
