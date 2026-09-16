'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, FlaskConical, Microscope, ShieldCheck, ScrollText, FileText, type LucideIcon } from 'lucide-react'
import { Tab } from './ProductTabs'
import { cn } from '@/lib/utils'

interface ProductDetailTabsProps {
  tabs: Tab[]
}

// The CMS schema always emits these 4 tabs in this order (Product Details,
// Research Focus, Quality & Purity, Compliance) — map icons by position,
// with a safe fallback if that ever changes.
const TAB_ICONS: LucideIcon[] = [FlaskConical, Microscope, ShieldCheck, ScrollText]

export function ProductDetailTabs({ tabs }: ProductDetailTabsProps) {
  const [activeIds, setActiveIds] = useState<string[]>([tabs[0]?.id].filter(Boolean) as string[])

  if (!tabs || tabs.length === 0) return null

  const toggleTab = (id: string) => {
    setActiveIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto border-t border-[#b7b7a4]/30">
      {tabs.map((tab, index) => {
        const isActive = activeIds.includes(tab.id)
        const Icon = TAB_ICONS[index] || FileText

        return (
          <div
            key={tab.id}
            className={cn(
              "border-b border-[#b7b7a4]/30 transition-colors duration-500 rounded-[28px]",
              isActive && "bg-white shadow-[0_16px_48px_-16px_rgba(32,34,28,0.1)] border-b-transparent my-3 sm:my-4"
            )}
          >
            <div className="px-5 sm:px-10 lg:px-14">
              <button
                onClick={() => toggleTab(tab.id)}
                className="w-full flex items-center gap-4 sm:gap-6 py-7 sm:py-9 lg:py-10 group focus:outline-none text-left"
              >
                <span className={cn(
                  "font-heading text-[11px] sm:text-xs font-bold tracking-[0.1em] shrink-0 transition-colors duration-500 hidden sm:block",
                  isActive ? "text-[#cb997e]" : "text-[#20221c]/25"
                )}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className={cn(
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                  isActive
                    ? "bg-[#cb997e] text-[#20221c] shadow-[0_4px_14px_rgba(203,153,126,0.45)]"
                    : "bg-[#fff1e6] text-[#a5a58d] border border-[#eddcd2] group-hover:bg-[#eddcd2] group-hover:text-[#20221c]"
                )}>
                  <Icon size={17} strokeWidth={2.25} className="sm:w-[19px] sm:h-[19px]" />
                </span>

                <h3 className={cn(
                  "flex-1 min-w-0 font-heading font-black text-lg sm:text-3xl lg:text-4xl tracking-tight uppercase transition-colors duration-500",
                  isActive ? "text-[#20221c]" : "text-[#20221c]/30 group-hover:text-[#20221c]/55"
                )}>
                  {tab.label}
                </h3>

                <span className={cn(
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                  isActive
                    ? "bg-[#20221c] text-[#fff1e6] rotate-45 shadow-[0_4px_14px_rgba(32,34,28,0.25)]"
                    : "bg-white text-[#20221c]/40 border border-[#b7b7a4]/45 group-hover:border-[#a5a58d] group-hover:text-[#20221c]/70"
                )}>
                  <Plus size={16} strokeWidth={2.5} />
                </span>
              </button>

              {/* Always mounted (not conditionally rendered) so every tab's content — Product
                  Details, Research Focus & Mechanism, Quality & Purity, Compliance Notice — ships
                  in the server HTML, not just whichever tab starts open. Non-JS crawlers never
                  click a tab to reveal it, so a conditionally-mounted panel is invisible to them;
                  this is most of a product page's actual unique content. */}
              <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-9 sm:pb-12 lg:pb-14 sm:pl-[3.75rem] lg:pl-[4.75rem]">
                  {typeof tab.content === 'string' ? (
                    <div
                      className="text-[#20221c]/62 leading-[1.8] text-[14px] sm:text-[15px] lg:text-[17px] prose prose-lg max-w-none prose-headings:text-[#20221c] prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-a:text-[#cb997e] prose-a:underline-offset-4 prose-strong:text-[#20221c] prose-li:text-[#20221c]/62 prose-table:text-[13px] sm:prose-table:text-sm"
                      dangerouslySetInnerHTML={{ __html: tab.content }}
                    />
                  ) : (
                    <div className="text-[#20221c]/62 leading-[1.8] text-[14px] sm:text-[15px] lg:text-[17px]">
                      {tab.content}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
