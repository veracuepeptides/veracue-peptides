'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Microscope, ShieldAlert, Activity, FileWarning, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ComplianceStatement() {
  const t = useTranslations('content.complianceStatement')
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-linked parallax calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Horizontal opposing translations for the ambient background typography
  const watermarkX1 = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])
  const watermarkX2 = useTransform(scrollYProgress, [0, 1], ['8%', '-6%'])

  // Header subtle parallax lift
  const headerY = useTransform(scrollYProgress, [0, 1], [25, -20])

  // Column-based differential parallax for cards
  const yColEven = useTransform(scrollYProgress, [0, 1], [30, -25])
  const yColOdd = useTransform(scrollYProgress, [0, 1], [55, -45])

  const STATEMENTS = [
    {
      icon: Microscope,
      number: '01',
      title: 'Laboratory Research Use Only',
      text: t('statements.researchOnly'),
    },
    {
      icon: ShieldAlert,
      number: '02',
      title: 'Strictly Non-Clinical / In-Vitro',
      text: t('statements.notForHumanAnimalUse'),
    },
    {
      icon: Activity,
      number: '03',
      title: 'No Diagnostic or Therapeutic Claims',
      text: t('statements.notForDiagnosisTreatment'),
    },
    {
      icon: FileWarning,
      number: '04',
      title: 'Independent Scientific Evaluation',
      text: t('statements.notFdaApproved'),
    },
  ]

  return (
    <section 
      id="compliance-statement"
      ref={sectionRef}
      style={{ backgroundColor: '#a5a58d' }}
      className="py-20 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden select-none font-sans border-y border-[#96967e]/60"
    >
      {/* ==================================================================== */}
      {/* BACKGROUND: Scroll-linked Marquee Ghost Typography                   */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none select-none overflow-hidden z-0">
        {/* Row 1: Left-to-Right Subtle Drift */}
        <motion.div 
          style={{ x: watermarkX1 }}
          className="whitespace-nowrap will-change-transform opacity-15"
        >
          <span className="font-heading font-black text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] text-white uppercase tracking-tighter leading-none block">
            REGULATORY COMPLIANCE • RUO PROTOCOLS • STRICT RESEARCH BOUNDARY • BATCH TRACEABILITY •
          </span>
        </motion.div>

        {/* Row 2: Right-to-Left Opposing Drift */}
        <motion.div 
          style={{ x: watermarkX2 }}
          className="whitespace-nowrap will-change-transform opacity-10"
        >
          <span className="font-heading font-black text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] text-white uppercase tracking-tighter leading-none block">
            VERACUE CHEMICAL SUPPLY • ISO-7 CLEANROOM • INDEPENDENT HPLC CERTIFIED • ZERO CLINICAL CLAIMS •
          </span>
        </motion.div>
      </div>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* ==================================================================== */}
        {/* HEADER: Prestigious Regulatory Seal & Title                         */}
        {/* ==================================================================== */}
        <motion.div 
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 md:mb-22 relative z-10"
        >
          <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 mb-5 bg-white/20 backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#fff1e6]" />
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#fff1e6] font-bold">
              {t('officialNotice')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight uppercase leading-[1.05] mb-4 drop-shadow-xs">
            {t('titleLine1')} {t('titleLine2')}
          </h2>

          <p className="text-white/85 uppercase tracking-[0.22em] text-xs sm:text-sm font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ==================================================================== */}
        {/* 4-CARD REGULATORY TENET GRID WITH SCROLL-BASED DEPTH PARALLAX        */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-6xl mx-auto relative z-10">
          {STATEMENTS.map((item, index) => {
            const IconComponent = item.icon
            const yParallax = index % 2 === 0 ? yColEven : yColOdd

            return (
              <motion.div 
                key={index} 
                style={{ y: yParallax, backgroundColor: '#1c1e17' }}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/15 rounded-[24px] sm:rounded-[32px] p-7 sm:p-9 md:p-11 relative overflow-hidden group hover:border-[#cb997e]/80 transition-all duration-500 flex flex-col justify-between shadow-[0_20px_48px_rgba(0,0,0,0.28)] hover:shadow-[0_28px_64px_rgba(0,0,0,0.38)] hover:-translate-y-1.5"
              >
                {/* Subtle Amber Top Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#cb997e] group-hover:w-full transition-all duration-500 ease-out" />
                
                {/* Number Watermark */}
                <span className="absolute -bottom-2 -right-2 text-7xl md:text-8xl font-heading font-black text-white/[0.04] leading-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-300">
                  {item.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    {/* High-Contrast Bold Icon Badge */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#cb997e] border border-white/20 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(203,153,126,0.4)] group-hover:scale-105 group-hover:bg-[#fff1e6] group-hover:text-[#20221c] transition-all duration-300 shrink-0">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25] text-white group-hover:text-[#20221c] transition-colors" />
                    </div>
                    <span className="font-sans text-xs text-[#cb997e] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      CLAUSE {item.number}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white uppercase tracking-tight mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed font-sans">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ==================================================================== */}
        {/* INSTITUTIONAL ASSURANCE BADGE                                        */}
        {/* ==================================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 sm:mt-18 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2.5 bg-black/25 backdrop-blur-md px-5 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#cb997e] animate-pulse" />
            <p className="text-xs sm:text-[13px] font-sans text-white/90 tracking-wider uppercase font-medium">
              Veracue Chemical Supply &bull; Regulated Research Distribution &bull; All Lots Serialized
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
