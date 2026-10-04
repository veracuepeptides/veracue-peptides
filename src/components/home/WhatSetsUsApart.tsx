'use client'

import React from 'react'
import { HeroButton } from '@/components/ui/hero-button'

interface TopicItem {
  id: string
  title: string
  description: string
  iconType: 'rings' | 'triangles' | 'ripple' | 'star'
}

const TOPICS: TopicItem[] = [
  {
    id: 'hplc-purity',
    title: 'HPLC Purity Certification',
    description: 'Each batch is analyzed by reverse-phase HPLC, and the chromatogram and purity figure for that batch are reported on its Certificate of Analysis.',
    iconType: 'rings',
  },
  {
    id: 'mass-spec',
    title: 'ESI-MS Structural Identity',
    description: 'Mass spectrometry compares the measured molecular mass of a compound with its expected value, giving an identity check that sits alongside the HPLC data.',
    iconType: 'triangles',
  },
  {
    id: 'cleanroom',
    title: 'Lyophilized for Stability',
    description: 'Peptides are supplied as a freeze-dried lyophilized powder in sealed vials, a format chosen to keep the compound stable until it is reconstituted for research.',
    iconType: 'ripple',
  },
  {
    id: 'traceability',
    title: 'Traceable Batch COA & Cold Chain',
    description: 'Each batch has its own Certificate of Analysis, which you can look up by lot before ordering. Orders are packed for careful transit and shipped from the USA.',
    iconType: 'star',
  },
]

function TopicIcon({ type }: { type: TopicItem['iconType'] }) {
  switch (type) {
    case 'rings':
      return (
        /* Overlapping Tilted Circles (Inspired by Branding in reference) */
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          className="w-12 h-12 sm:w-14 sm:h-14 stroke-current shrink-0 transition-transform duration-500 ease-out group-hover:scale-108" 
          strokeWidth="1.25"
        >
          <circle cx="22" cy="32" r="16" />
          <circle cx="28" cy="28" r="16" />
          <circle cx="34" cy="28" r="16" />
          <circle cx="40" cy="32" r="16" />
        </svg>
      )
    case 'triangles':
      return (
        /* Cascading Layered Prisms (Inspired by Design in reference) */
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          className="w-12 h-12 sm:w-14 sm:h-14 stroke-current shrink-0 transition-transform duration-500 ease-out group-hover:scale-108" 
          strokeWidth="1.25"
        >
          <polygon points="14,40 32,16 32,40" />
          <polygon points="20,46 38,22 38,46" />
          <polygon points="26,52 44,28 44,52" />
          <polygon points="32,58 50,34 50,58" />
        </svg>
      )
    case 'ripple':
      return (
        /* Concentric Ripple Reticle (Inspired by Video in reference) */
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          className="w-12 h-12 sm:w-14 sm:h-14 stroke-current shrink-0 transition-transform duration-500 ease-out group-hover:scale-108" 
          strokeWidth="1.25"
        >
          <circle cx="32" cy="32" r="5" />
          <circle cx="32" cy="32" r="10" />
          <circle cx="32" cy="32" r="15" />
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="25" />
        </svg>
      )
    case 'star':
      return (
        /* Architectural 4-Pointed Star (Inspired by Content in reference) */
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          className="w-12 h-12 sm:w-14 sm:h-14 stroke-current shrink-0 transition-transform duration-500 ease-out group-hover:scale-108" 
          strokeWidth="1.25"
        >
          <path d="M32 7 C32 21 21 32 7 32 C21 32 32 43 32 57 C32 43 43 32 57 32 C43 32 32 21 32 7 Z" />
        </svg>
      )
  }
}

export function WhatSetsUsApart() {
  return (
    <section 
      id="what-sets-us-apart"
      className="bg-[#f0efeb] relative z-20 font-sans select-none py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
        
        {/* ==================================================================== */}
        {/* ARCHITECTURAL FRAMED CONTAINER (Reference Style)                     */}
        {/* Top and Bottom Horizontal Hairline Borders                           */}
        {/* Left Column: Heading + Paragraph + CTA | Right: 2x2 Topics Grid      */}
        {/* ==================================================================== */}
        <div className="border-t border-b border-[#b7b7a4]/50 flex flex-col lg:flex-row">
          
          {/* ================================================================== */}
          {/* LEFT COLUMN: Eyebrow, Heading, Paragraph & Signature CTA           */}
          {/* ================================================================== */}
          <div className="lg:w-[38%] xl:w-[35%] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-[#b7b7a4]/50">
            <div>
              {/* Standardized Eyebrow Pill */}
              <div className="inline-block border border-[#eddcd2] rounded-full max-w-full px-3 sm:px-4 py-1.5 mb-5 bg-[#fff1e6] shadow-xs">
                <span className="text-[#a5a58d] text-[9px] xs:text-[9.5px] sm:text-xs font-bold tracking-[0.02em] xs:tracking-[0.06em] sm:tracking-[0.2em] uppercase font-editorial whitespace-nowrap">
                  THE VERACUE STANDARD
                </span>
              </div>

              {/* Main Display Heading */}
              <h2 className="font-heading text-3xl/[1.15] sm:text-4xl/[1.12] md:text-5xl/[1.1] lg:text-[44px]/[1.1] xl:text-[50px]/[1.1] font-extrabold text-neutral-900 tracking-tight leading-[1.15] sm:leading-[1.12] md:leading-[1.1] lg:leading-[1.1] uppercase mb-4 sm:mb-6 text-balance">
                What Sets Us Apart
              </h2>

              {/* Editorial Description Paragraph */}
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans mb-8 max-w-lg">
                Every batch is analyzed by HPLC and the result is published on its Certificate of Analysis, so you can review the data first.
              </p>
            </div>

            {/* Signature Luxury Pill Button */}
            <div className="pt-2 sm:pt-4">
              <HeroButton href="/about-us">
                Explore Quality Standards
              </HeroButton>
            </div>
          </div>

          {/* ================================================================== */}
          {/* RIGHT COLUMN: 2x2 Topics Grid (Faithful Match to Reference)        */}
          {/* ================================================================== */}
          <div className="lg:w-[62%] xl:w-[65%] grid grid-cols-1 md:grid-cols-2">
            {TOPICS.map((topic, index) => {
              // Border styling for 2x2 grid:
              // Top row (index 0, 1) has bottom border on md+
              // Left column (index 0, 2) has right border on md+
              const isTopRow = index < 2
              const isLeftColumn = index % 2 === 0
              const isLastItem = index === TOPICS.length - 1

              return (
                <div
                  key={topic.id}
                  className={`group p-6 sm:p-8 md:p-9 lg:p-10 xl:p-12 flex flex-col justify-start transition-colors duration-300 hover:bg-[#fff1e6]/40 ${
                    isTopRow ? 'md:border-b border-[#b7b7a4]/50' : ''
                  } ${
                    isLeftColumn ? 'md:border-r border-[#b7b7a4]/50' : ''
                  } ${
                    !isLastItem ? 'border-b md:border-b-0 border-[#b7b7a4]/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-5 sm:gap-6">
                    {/* Geometric Wireframe Vector Icon */}
                    <div className="text-[#a5a58d] group-hover:text-[#cb997e] transition-colors duration-300 pt-0.5">
                      <TopicIcon type={topic.iconType} />
                    </div>

                    {/* Topic Content */}
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 tracking-wide uppercase mb-2.5 group-hover:text-[#cb997e] transition-colors duration-300 leading-snug">
                        {topic.title}
                      </h3>
                      <p className="text-neutral-600 text-sm sm:text-[14.5px] leading-relaxed font-sans">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
