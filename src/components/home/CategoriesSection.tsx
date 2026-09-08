'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { ArrowRight } from 'lucide-react'

export interface HomeCategory {
  id: string | number
  name: string
  slug?: string
  description?: string
}

export interface CategoriesSectionProps {
  categories?: HomeCategory[]
}

// Curated 7 High-Resolution Scientific Peptide Visuals matching each research category
const CATEGORY_VISUALS_MAP: Record<string, { image: string; tag: string; count: string }> = {
  'weight-loss-metabolic': {
    image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp',
    tag: 'METABOLIC & GLP-1',
    count: '01',
  },
  'cellular-repair-healing': {
    image: '/veracue-images/veracue-glow-50mg-beach-shore-landscape.webp',
    tag: 'TISSUE REGENERATION',
    count: '02',
  },
  'longevity-anti-aging': {
    image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp',
    tag: 'SENESCENCE & TELOMERES',
    count: '03',
  },
  'cognitive-neuro-protection': {
    image: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp',
    tag: 'SYNAPTIC PLASTICITY',
    count: '04',
  },
  'growth-hormone-secretagogues': {
    image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp',
    tag: 'GHRH & SECRETIN',
    count: '05',
  },
  'immune-modulation': {
    image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    tag: 'ANTIMICROBIAL PEPTIDES',
    count: '06',
  },
  'mitochondrial-cellular-energy': {
    image: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp',
    tag: 'OXIDATIVE PHOSPHORYLATION',
    count: '07',
  },
}

const FALLBACK_VISUALS = [
  { image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp', tag: 'METABOLIC & GLP-1', count: '01' },
  { image: '/veracue-images/veracue-glow-50mg-beach-shore-landscape.webp', tag: 'TISSUE REGENERATION', count: '02' },
  { image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp', tag: 'SENESCENCE & TELOMERES', count: '03' },
  { image: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp', tag: 'SYNAPTIC PLASTICITY', count: '04' },
  { image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp', tag: 'GHRH & SECRETIN', count: '05' },
  { image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp', tag: 'ANTIMICROBIAL PEPTIDES', count: '06' },
  { image: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp', tag: 'OXIDATIVE PHOSPHORYLATION', count: '07' },
]

// Default 7 Categories in case Payload is booting or returns empty
const FALLBACK_CATEGORIES: HomeCategory[] = [
  { id: '1', name: 'Weight Loss & Metabolic', slug: 'weight-loss-metabolic' },
  { id: '2', name: 'Cellular Repair & Healing', slug: 'cellular-repair-healing' },
  { id: '3', name: 'Longevity & Anti-Aging', slug: 'longevity-anti-aging' },
  { id: '4', name: 'Cognitive & Neuro-Protection', slug: 'cognitive-neuro-protection' },
  { id: '5', name: 'Growth Hormone Secretagogues', slug: 'growth-hormone-secretagogues' },
  { id: '6', name: 'Immune Modulation', slug: 'immune-modulation' },
  { id: '7', name: 'Mitochondrial & Cellular Energy', slug: 'mitochondrial-cellular-energy' },
]

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  // Use loaded Payload categories or fallback to the 7 curated categories
  const activeCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES

  return (
    <section 
      id="research-categories"
      className="bg-[#f0efeb] py-16 sm:py-24 md:py-28 relative font-sans overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12"
        >
          <div>
            {/* Standardized Eyebrow Pill */}
            <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-3.5 bg-white shadow-sm">
              <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                RESEARCH CLASSIFICATIONS
              </span>
            </div>

            {/* Main Heading (Matching reference style) */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.06] uppercase">
              Select By Category
            </h2>
          </div>

          <p className="text-neutral-500 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            High-purity peptide sequences categorized by biological receptor pathway and analytical research application.
          </p>
        </motion.div>

        {/* Stacked Horizontal Pill Strips (Exact Match to Reference Design) */}
        <div className="flex flex-col gap-3 sm:gap-3.5 md:gap-4">
          {activeCategories.map((category, index) => {
            const visual = (category.slug && CATEGORY_VISUALS_MAP[category.slug]) || FALLBACK_VISUALS[index % FALLBACK_VISUALS.length]
            const displayName = getCategoryDisplayName(category.name)

            return (
              <motion.div
                key={category.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group relative w-full h-[72px] xs:h-[80px] sm:h-[94px] md:h-[106px] lg:h-[114px] rounded-full overflow-hidden flex items-center justify-between px-3.5 xs:px-4 sm:px-6 md:px-8 border border-neutral-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer"
                >
                  {/* Background Panoramic Macro Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <Image
                      src={visual.image}
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index < 3}
                    />
                    {/* Deep Atmospheric Contrast Tint Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/35 group-hover:from-black/65 transition-colors duration-500" />
                  </div>

                  {/* Left Side: Signature White Pill Badge Button with Horizontal Arrow */}
                  <div className="relative z-20 bg-white/95 group-hover:bg-white text-neutral-950 rounded-full px-4 xs:px-5 sm:px-6 md:px-7 py-2 xs:py-2.5 sm:py-3 md:py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-white/80 flex items-center gap-3 xs:gap-4 sm:gap-6 transition-transform duration-300 group-hover:scale-[1.02] shrink-0">
                    <span className="font-heading font-bold text-xs xs:text-sm sm:text-[15px] md:text-[16px] text-neutral-900 tracking-tight whitespace-nowrap">
                      {displayName}
                    </span>

                    {/* Minimalist Line-Arrow (matching reference image line ───→) */}
                    <div className="flex items-center gap-1 text-neutral-400 group-hover:text-black transition-colors shrink-0">
                      <span className="w-3.5 xs:w-5 sm:w-8 md:w-10 h-[1.5px] bg-neutral-300 group-hover:bg-black transition-colors rounded-full" />
                      <ArrowRight size={13} className="-ml-1 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Right Side: Enhanced Luxury Frosted Glass Tag & Serial Counter */}
                  <div className="relative z-20 hidden md:flex items-center gap-2.5 bg-black/55 backdrop-blur-md px-4 sm:px-5 py-2 rounded-full border border-white/30 text-[#fff1e6] shadow-[0_2px_12px_rgba(0,0,0,0.2)] shrink-0 transition-colors group-hover:bg-black/70 group-hover:border-white/45">
                    <span className="w-2 h-2 rounded-full bg-[#cb997e] shadow-xs shrink-0" />
                    <span className="font-heading font-bold text-[11.5px] sm:text-[12px] tracking-[0.14em] uppercase text-[#fff1e6] antialiased">
                      {visual.tag}
                    </span>
                    <span className="text-white/35 font-light text-xs select-none">/</span>
                    <span className="font-heading font-extrabold text-[11.5px] sm:text-[12px] text-[#eddcd2] tracking-wider">
                      {visual.count}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA: Explore Full Catalog */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/shop"
            className="relative group inline-flex items-center gap-3 sm:gap-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] pl-6 sm:pl-8 pr-1.5 sm:pr-2 py-2.5 sm:py-3 rounded-full font-semibold text-[13px] sm:text-[14px] border border-neutral-800 hover:border-[#cb997e] transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden"
          >
            {/* Specular Light Sheen Reflection */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

            <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium">
              Explore Complete Research Catalog
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
    </section>
  )
}
