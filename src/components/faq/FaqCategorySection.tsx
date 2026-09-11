'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FaqCategoryType, FaqItemType } from '@/data/faqs'

export function formatCategoryName(name: string) {
  if (!name) return ''
  return name
    .split(' ')
    .map((word) => {
      const upper = word.toUpperCase()
      if (['RUO', 'HPLC', 'USA', 'COA', 'FDA', 'ISO', 'DNA', 'RNA', 'GLP-1', 'GHRH'].includes(upper)) {
        return upper
      }
      if (word.toLowerCase() === '&') return '&'
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

const FaqItem = ({
  faq,
  index,
}: {
  faq: FaqItemType
  index: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const num = (index + 1).toString().padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.03 }}
      className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 group cursor-pointer overflow-hidden p-5 sm:p-6 md:p-7 mb-3 ${
        isOpen
          ? 'bg-white border-[#cb997e] shadow-[0_8px_30px_rgba(203,153,126,0.08)]'
          : 'bg-white/90 border-[#eddcd2] hover:border-[#cb997e]/60 hover:bg-white shadow-xs'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col w-full justify-between items-start">
        {/* Top: Num + Question + Rotating Plus Icon */}
        <div className="flex w-full items-start justify-between gap-3 sm:gap-5">
          <div className="flex flex-1 gap-3 sm:gap-4 items-start">
            {/* Smooth tabular number badge */}
            <span
              className={`font-sans text-xs sm:text-[13px] font-semibold tabular-nums px-2.5 py-1 rounded-full border transition-colors shrink-0 mt-0.5 select-none ${
                isOpen
                  ? 'bg-[#cb997e] text-white border-[#cb997e]'
                  : 'bg-[#fff1e6] text-[#cb997e] border-[#eddcd2]'
              }`}
            >
              {num}
            </span>

            {/* Highly readable, balanced question typography using Plus Jakarta Sans */}
            <h3 className="font-sans text-[15px] sm:text-[16.5px] md:text-[18px] font-semibold text-[#20221c] leading-snug group-hover:text-[#cb997e] transition-colors pr-2 tracking-[-0.01em]">
              {faq.question}
            </h3>
          </div>

          <div className="shrink-0 mt-0.5">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                isOpen
                  ? 'bg-[#cb997e] text-white border-[#cb997e]'
                  : 'bg-[#f0efeb] text-[#20221c] border-[#eddcd2] group-hover:border-[#cb997e] group-hover:text-[#cb997e]'
              }`}
            >
              <Plus size={15} strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        {/* Answer Content — stays mounted for complete SEO crawler indexing */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden w-full pl-0 sm:pl-[2.75rem] pr-2 sm:pr-6"
        >
          <div
            className="font-sans text-neutral-600 text-[13px] sm:text-[14.5px] md:text-[15px] leading-relaxed pt-3.5 pb-1 prose prose-sm max-w-none prose-p:my-1.5 prose-strong:text-[#20221c] prose-a:text-[#cb997e] hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function FaqCategorySection({
  category,
}: {
  category: FaqCategoryType
}) {
  const formattedTitle = formatCategoryName(category.category)

  return (
    <div className="mb-12 sm:mb-16">
      {/* Category Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5 px-1">
        {/* Highly readable, clean Category Title */}
        <h2 className="font-sans text-xl sm:text-2xl md:text-[25px] font-bold text-[#20221c] tracking-[-0.015em]">
          {formattedTitle}
        </h2>

        {/* Clean, anti-aliased Questions Count Badge */}
        <span className="font-sans text-xs sm:text-[13px] font-medium text-neutral-600 bg-white/90 border border-[#eddcd2] px-3.5 py-1 rounded-full shrink-0 shadow-xs select-none">
          {category.items.length} Questions
        </span>
      </div>

      {/* Accordion List */}
      <div>
        {category.items.map((faq, index) => (
          <FaqItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>
    </div>
  )
}
