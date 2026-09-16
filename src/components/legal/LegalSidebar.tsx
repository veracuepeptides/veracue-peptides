'use client'

import React from 'react'
import { FileText, HelpCircle, Mail, ArrowUpRight } from 'lucide-react'

export interface LegalSectionItem {
  id: string
  label: string
}

interface LegalSidebarProps {
  sections: LegalSectionItem[]
  activeSection: string
  onSelectSection: (id: string) => void
}

export function LegalSidebar({
  sections,
  activeSection,
  onSelectSection,
}: LegalSidebarProps) {
  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 self-stretch relative h-full">
      {/* Sticky & independently scrollable container sized to viewport */}
      <div
        data-lenis-prevent
        className="sticky top-24 z-20 flex flex-col gap-4 max-h-[calc(100vh-6.5rem)] overflow-y-auto custom-scrollbar pr-1 pb-4 scroll-smooth"
      >
        {/* Contents Navigation Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#a5a58d]/30 shadow-[0_4px_20px_rgba(40,49,33,0.04)] shrink-0">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#a5a58d]/25">
            <div className="flex items-center gap-2">
              <FileText size={15} className="text-[#a5a58d]" />
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#494c3c]">
                Contents
              </h3>
            </div>
            <span className="font-mono text-[10px] font-semibold text-[#32362b] bg-[#a5a58d]/20 px-2 py-0.5 rounded-full">
              {sections.length} Parts
            </span>
          </div>

          <nav
            className="flex flex-col gap-1 text-xs font-sans"
            aria-label="Document table of contents"
          >
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id
              const indexFormatted = String(idx).padStart(2, '0')

              return (
                <button
                  key={section.id}
                  onClick={() => onSelectSection(section.id)}
                  className={`text-left flex items-start gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-[#a5a58d]/15 text-[#1a1c15] font-semibold border-l-3 border-[#a5a58d] shadow-2xs'
                      : 'text-[#2c3327]/80 hover:text-[#1a1c15] hover:bg-[#a5a58d]/10'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] pt-0.5 shrink-0 transition-colors ${
                      isActive ? 'text-[#a5a58d] font-bold' : 'text-[#a5a58d]/90'
                    }`}
                  >
                    {indexFormatted}
                  </span>
                  <span className="leading-snug line-clamp-2">
                    {section.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Need Clarification Card with generous, balanced padding */}
        <div className="bg-[#a5a58d]/10 rounded-2xl p-5 sm:p-5.5 border border-[#a5a58d]/30 shadow-2xs shrink-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={16} className="text-[#a5a58d] shrink-0" />
              <h4 className="font-serif text-sm sm:text-[15px] font-semibold text-[#1a1c15]">
                Need Clarification?
              </h4>
            </div>
            <p className="text-[12px] text-[#2c3327]/85 leading-relaxed mb-4 font-sans">
              Our compliance desk is available to assist with batch verification, COAs, and order questions.
            </p>
          </div>
          <a
            href="mailto:support@veracuepeptides.com"
            className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#a5a58d] hover:bg-[#20221c] text-white text-xs font-semibold tracking-wide transition-colors group shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Mail size={13} className="text-white shrink-0" />
              <span>Contact Compliance</span>
            </span>
            <ArrowUpRight size={13} className="text-white/80 group-hover:text-white transition-colors shrink-0" />
          </a>
        </div>
      </div>
    </aside>
  )
}
