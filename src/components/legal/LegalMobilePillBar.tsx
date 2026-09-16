'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import type { LegalSectionItem } from './LegalSidebar'

interface LegalMobilePillBarProps {
  sections: LegalSectionItem[]
  activeSection: string
  onSelectSection: (id: string) => void
}

export function LegalMobilePillBar({
  sections,
  activeSection,
  onSelectSection,
}: LegalMobilePillBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track header visibility to dynamically take header position on mobile
  const [headerHidden, setHeaderHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 6) {
      if (difference > 0 && y > 120) {
        setHeaderHidden(true)
      } else if (difference < 0) {
        setHeaderHidden(false)
      }
      lastYRef.current = y
    }
  })

  // Automatically keep the active section button scrolled into view
  useEffect(() => {
    const container = containerRef.current
    if (!container || !activeSection) return

    const activeButton = container.querySelector(
      `[data-section-id="${activeSection}"]`
    ) as HTMLElement | null

    if (activeButton) {
      const scrollLeft =
        activeButton.offsetLeft -
        container.clientWidth / 2 +
        activeButton.clientWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeSection])

  return (
    <div
      className={`sticky z-30 w-full max-w-full overflow-hidden lg:hidden bg-[#f0efeb]/95 backdrop-blur-md border-y border-[#a5a58d]/30 py-2 px-3 shadow-xs transition-all duration-300 ease-out ${
        headerHidden ? 'top-0' : 'top-[74px] sm:top-[92px]'
      }`}
    >
      <div
        ref={containerRef}
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full"
      >
        {sections.map((section, idx) => {
          const isActive = activeSection === section.id
          const indexFormatted = String(idx).padStart(2, '0')

          return (
            <button
              key={section.id}
              data-section-id={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium font-sans transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#a5a58d] text-white shadow-xs font-semibold'
                  : 'bg-white/95 text-[#282e22] hover:text-[#1a1c15] border border-[#a5a58d]/25'
              }`}
            >
              <span
                className={`font-mono text-[10px] ${
                  isActive ? 'text-white font-bold' : 'text-[#a5a58d] font-semibold'
                }`}
              >
                {indexFormatted}
              </span>
              <span>{section.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
