'use client'

import React from 'react'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'
import { Microscope, ShieldCheck, FileCheck, Snowflake } from 'lucide-react'

export function MissionPhilosophyJourney() {
  const t = useTranslations('content.missionPhilosophyJourney')

  const PHILOSOPHY_PILLARS = [
    {
      id: 'standard',
      number: '01',
      title: t('card1Title'),
      description: t('card1Text'),
      icon: Microscope,
    },
    {
      id: 'approach',
      number: '02',
      title: t('card2Title'),
      description: t('card2Text'),
      icon: FileCheck,
    },
    {
      id: 'integrity',
      number: '03',
      title: t('card3Title'),
      description: t('card3Text'),
      icon: ShieldCheck,
    },
    {
      id: 'cold-chain',
      number: '04',
      title: 'Cold-Chain Preservation',
      description: 'Maintained at -20°C in climate-monitored facilities with insulated packaging to eliminate temperature fluctuation and preserve lyophilized cake structure.',
      icon: Snowflake,
    },
  ]

  return (
    <section 
      id="philosophy-section"
      className="bg-[#f0efeb] relative z-20 font-sans select-none py-14 sm:py-18 md:py-22 lg:py-26"
    >
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
        
        {/* ==================================================================== */}
        {/* ARCHITECTURAL FRAMED CONTAINER (WhatSetsUsApart aesthetic)           */}
        {/* ==================================================================== */}
        <div className="border-t border-b border-[#b7b7a4]/50 flex flex-col lg:flex-row">
          
          {/* ================================================================== */}
          {/* LEFT COLUMN: Eyebrow, Heading, Narrative & Signature CTA           */}
          {/* ================================================================== */}
          <div className="lg:w-[38%] xl:w-[35%] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-[#b7b7a4]/50">
            <div>
              {/* Eyebrow Pill */}
              <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-5 bg-[#fff1e6] shadow-2xs">
                <span className="text-[#a5a58d] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                  {t('eyebrow')}
                </span>
              </div>

              {/* Main Display Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-neutral-900 tracking-tight leading-[1.08] uppercase mb-4 sm:mb-6">
                {t('title')}
              </h2>

              {/* Editorial Narrative */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans mb-8 max-w-lg font-light">
                Our approach to research integrity starts with refusing to treat compliance and analytical verification as afterthoughts. Every synthetic peptide supplied by Veracue is manufactured against defined purity specifications, verified through independent analytical testing, and paired with public documentation researchers can inspect before placing an order.
              </p>
            </div>

            {/* Signature Luxury Pill Button */}
            <div className="pt-2 sm:pt-4">
              <HeroButton href="/shop">
                Explore Compounds
              </HeroButton>
            </div>
          </div>

          {/* ================================================================== */}
          {/* RIGHT COLUMN: 2x2 Topics Grid with Hairline Dividers               */}
          {/* ================================================================== */}
          <div className="lg:w-[62%] xl:w-[65%] grid grid-cols-1 md:grid-cols-2">
            {PHILOSOPHY_PILLARS.map((pillar, index) => {
              const isTopRow = index < 2
              const isLeftColumn = index % 2 === 0
              const isLastItem = index === PHILOSOPHY_PILLARS.length - 1
              const IconComponent = pillar.icon

              return (
                <div
                  key={pillar.id}
                  className={`group p-6 sm:p-8 md:p-9 lg:p-10 xl:p-12 flex flex-col justify-between transition-colors duration-300 hover:bg-[#fff1e6]/40 ${
                    isTopRow ? 'md:border-b border-[#b7b7a4]/50' : ''
                  } ${
                    isLeftColumn ? 'md:border-r border-[#b7b7a4]/50' : ''
                  } ${
                    !isLastItem ? 'border-b md:border-b-0 border-[#b7b7a4]/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5 mb-6">
                    {/* Architectural Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#b7b7a4]/40 flex items-center justify-center shrink-0 text-[#a5a58d] group-hover:text-[#cb997e] group-hover:border-[#cb997e]/60 transition-colors duration-300 shadow-2xs">
                      <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-sans font-bold text-[#cb997e] uppercase tracking-[0.16em] block mb-1">
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 tracking-wide uppercase group-hover:text-[#cb997e] transition-colors duration-300 leading-snug">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed font-sans font-light">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
