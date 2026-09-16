'use client'

import React from 'react'
import { Check } from 'lucide-react'

interface LegalSectionProps {
  id: string
  number: number | string
  title: string
  children: React.ReactNode
  className?: string
}

export function LegalSection({
  id,
  number,
  title,
  children,
  className = '',
}: LegalSectionProps) {
  const formattedNumber =
    typeof number === 'number' ? String(number).padStart(2, '0') : number

  return (
    <section id={id} className={`scroll-mt-36 ${className}`}>
      {/* Section Header with Olive Green Accent */}
      <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-[#a5a58d]/25">
        <span className="w-8 h-8 rounded-xl bg-[#a5a58d] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
          {formattedNumber}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#1a1c15] tracking-tight">
          {title}
        </h2>
      </div>

      {/* Section Content with High Contrast Text */}
      <div className="space-y-4 text-[14.5px] sm:text-[15px] leading-relaxed text-[#24271f] font-sans">
        {children}
      </div>
    </section>
  )
}

interface LegalCalloutProps {
  children: React.ReactNode
  variant?: 'warning' | 'info' | 'tip'
}

export function LegalCallout({
  children,
  variant = 'warning',
}: LegalCalloutProps) {
  const borderStyles =
    variant === 'warning'
      ? 'border-[#cb997e] bg-[#fff1e6] text-[#1a1c15]'
      : variant === 'tip'
      ? 'border-[#a5a58d] bg-[#a5a58d]/10 text-[#1a1c15]'
      : 'border-[#a5a58d]/40 bg-[#f0efeb] text-[#1a1c15]'

  return (
    <div
      className={`border-l-3 p-4 sm:p-5 rounded-r-xl my-4 text-xs sm:text-[13.5px] leading-relaxed shadow-2xs ${borderStyles}`}
    >
      {children}
    </div>
  )
}

interface LegalListItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function LegalListItem({
  children,
  icon,
  className = '',
}: LegalListItemProps) {
  return (
    <li
      className={`group flex items-start gap-3.5 py-2 text-[14.5px] sm:text-[15px] leading-relaxed text-[#20221c] ${className}`}
    >
      <span className="text-[#cb997e] text-xs shrink-0 mt-1 select-none font-serif transition-transform duration-200 group-hover:scale-125">
        ✦
      </span>
      <div className="flex-1 font-sans text-[#20221c] leading-relaxed">
        {children}
      </div>
    </li>
  )
}
