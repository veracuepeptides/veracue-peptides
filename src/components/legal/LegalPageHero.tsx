'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, ShieldCheck, Clock } from 'lucide-react'

interface LegalPageHeroProps {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  effectiveDate: string
  sectionCount?: number
  estimatedReadTime?: string
}

export function LegalPageHero({
  eyebrow = 'Veracue Legal & Compliance',
  titleLine1,
  titleLine2,
  effectiveDate,
  sectionCount,
  estimatedReadTime = '5 min read',
}: LegalPageHeroProps) {

  return (
    <div className="relative text-center max-w-4xl mx-auto px-4 pt-1 sm:pt-4 pb-8 sm:pb-12 overflow-hidden">
      {/* Ambient Olive Green glow matching the header color */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[180px] sm:h-[220px] bg-[#a5a58d]/20 rounded-full blur-[60px] sm:blur-[100px] -z-10 pointer-events-none max-w-full"
      />

      {/* Eyebrow Badge in Olive Green */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#a5a58d] text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] mb-4 shadow-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>{eyebrow}</span>
      </motion.div>

      {/* Page Title with High Contrast & Editorial Elegance */}
      <motion.h1
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1a1c15] mb-5 sm:mb-6"
      >
        {titleLine1}{' '}
        <span className="font-serif italic font-normal text-[#cb997e]">
          {titleLine2}
        </span>
      </motion.h1>

      {/* Metadata Chips Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#282e22] font-sans"
      >
        {/* Effective Date */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#a5a58d]/35 shadow-2xs font-mono text-[11px] text-[#282e22]">
          <Calendar size={13} className="text-[#a5a58d]" />
          <span>{effectiveDate}</span>
        </span>

        {/* Institutional Verification Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#a5a58d]/35 shadow-2xs font-mono text-[11px] text-[#282e22]">
          <ShieldCheck size={13} className="text-[#a5a58d]" />
          <span>US Lab Research Protocols</span>
        </span>

        {/* Section Count / Read time */}
        {sectionCount ? (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-[#a5a58d]/35 shadow-2xs font-mono text-[11px] text-[#282e22]">
            <Clock size={13} className="text-[#a5a58d]" />
            <span>{sectionCount} Sections · {estimatedReadTime}</span>
          </span>
        ) : null}
      </motion.div>
    </div>
  )
}
