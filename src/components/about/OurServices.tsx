'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Beaker, ShieldAlert, CheckCircle2, ArrowRight, FileText, Search, PackageCheck } from 'lucide-react'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'

export function OurServices() {
  const t = useTranslations('content.ourServices')

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#f0efeb] relative overflow-hidden select-none font-sans">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* ==================================================================== */}
        {/* HEADER: Pill & Display Title                                         */}
        {/* ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-2xs">
            <span className="text-[#a5a58d] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-editorial">
              {t('capabilitiesLabel')}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-neutral-900 tracking-tight uppercase leading-[1.05]">
            {t('titleLine1')} <br className="hidden sm:inline" />
            <span className="text-neutral-900">{t('titleLine2')}</span>
          </h2>
        </div>

        {/* ==================================================================== */}
        {/* BENTO GRID                                                           */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-[minmax(320px,auto)]">
          
          {/* Card 1: Broad Synthesis Catalog (Spans 2 columns) */}
          <div className="md:col-span-2 relative bg-white rounded-[24px] sm:rounded-[32px] border border-[#b7b7a4]/40 p-5 xs:p-6 sm:p-10 md:p-12 overflow-hidden shadow-[0_4px_20px_rgba(32,34,28,0.03)] hover:shadow-[0_12px_32px_rgba(32,34,28,0.06)] transition-all duration-300 flex flex-col justify-between">
            {/* Subtle Architectural Background Mesh */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#fff1e6]/60 via-transparent to-transparent pointer-events-none rounded-bl-full" />

            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center text-[#cb997e] mb-6 sm:mb-8">
                <Beaker strokeWidth={1.75} className="w-6 h-6" />
              </div>

              <span className="text-[10px] sm:text-xs font-sans font-bold text-[#cb997e] uppercase tracking-[0.16em] block mb-2">
                ASSAY-READY CATALOG
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-neutral-900 uppercase tracking-tight mb-4 leading-tight">
                {t('card1Title')}
              </h3>

              <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                {t('card1Text')}
              </p>
            </div>

            <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4">
              <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider font-medium">
                RP-HPLC &bull; ESI-MS Certified
              </span>
              <HeroButton href="/shop" size="sm" className="shrink-0">
                Shop Peptides
              </HeroButton>
            </div>
          </div>

          {/* Card 2: Exclusive Application (1 column) */}
          <div className="relative bg-white rounded-[24px] sm:rounded-[32px] border border-[#b7b7a4]/40 p-5 xs:p-6 sm:p-10 md:p-12 overflow-hidden shadow-[0_4px_20px_rgba(32,34,28,0.03)] hover:shadow-[0_12px_32px_rgba(32,34,28,0.06)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center text-[#cb997e] mb-6 sm:mb-8">
                <ShieldAlert strokeWidth={1.75} className="w-6 h-6" />
              </div>

              <span className="text-[10px] sm:text-xs font-sans font-bold text-[#cb997e] uppercase tracking-[0.16em] block mb-2">
                STRICT RUO SCOPE
              </span>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-neutral-900 uppercase tracking-tight mb-4 leading-tight">
                {t('card2Title')}
              </h3>

              <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed mb-4">
                {t('card2Text1')}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <p className="text-neutral-400 text-xs font-medium italic">
                {t('card2Text2')}
              </p>
            </div>
          </div>

          {/* Card 3: Research Commitment Footer Card (Spans all 3 columns) */}
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-[24px] sm:rounded-[32px] border border-[#b7b7a4]/40 p-5 xs:p-6 sm:p-10 md:p-12 shadow-[0_4px_20px_rgba(32,34,28,0.03)] hover:shadow-[0_12px_32px_rgba(32,34,28,0.06)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
              
              {/* Left Column Description */}
              <div className="w-full lg:w-1/3">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#cb997e]" />
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#a5a58d] font-bold">
                    {t('footerLabel')}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-neutral-900 uppercase tracking-tight mb-3">
                  {t('footerTitle')}
                </h3>
                
                <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  {t('footerText')}
                </p>
              </div>

              {/* Right Column: 4-Capability Grid */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { text: t('listItems.orderProcessing'), icon: PackageCheck, label: 'Fast Priority Dispatch' },
                  { text: t('listItems.documentationAccess'), icon: FileText, label: 'Downloadable Lot Reports' },
                  { text: t('listItems.productClassification'), icon: Search, label: 'Laboratory RUO Tagging' },
                  { text: t('listItems.sourcingInquiries'), icon: Beaker, label: 'Institutional Support' },
                ].map((item, i) => {
                  const ItemIcon = item.icon
                  return (
                    <div 
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0efeb]/60 border border-[#b7b7a4]/30 group/item hover:bg-white hover:border-[#cb997e]/60 hover:shadow-xs transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#b7b7a4]/40 flex items-center justify-center shrink-0 text-neutral-500 group-hover/item:text-[#cb997e] group-hover/item:border-[#cb997e] transition-colors">
                        <ItemIcon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-neutral-900 text-xs sm:text-sm uppercase tracking-tight block">
                          {item.text}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-sans block">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
