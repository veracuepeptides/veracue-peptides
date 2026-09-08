'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { HeroButton } from '@/components/ui/hero-button'

export type FaqItemType = {
  question: string;
  answer: string | React.ReactNode;
};

export interface SharedFaqSectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  description?: string | React.ReactNode;
  faqs: FaqItemType[];
  contactHeading?: string;
  contactSubtext?: string;
  contactButtonText?: string;
  contactHref?: string;
}

export function SharedFaqSection({
  title,
  subtitle,
  description,
  faqs,
  contactHeading,
  contactSubtext,
  contactButtonText,
  contactHref,
}: SharedFaqSectionProps) {
  // Allow toggling items; start with first item open for instant clarity
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  return (
    <section 
      id="faq-section"
      className="bg-[#f0efeb] py-12 sm:py-16 md:py-20 lg:py-24 font-sans relative z-20 select-none"
    >
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
        
        {/* ==================================================================== */}
        {/* ARCHITECTURAL ROUNDED CARD (Faithful to Reference Image)             */}
        {/* Earthy Stone/Sage Background (#b7b7a4/35) with Hairline Border        */}
        {/* ==================================================================== */}
        <div className="bg-[#b7b7a4]/35 border border-[#b7b7a4]/60 rounded-2xl sm:rounded-3xl md:rounded-[36px] p-6 sm:p-8 md:p-12 lg:p-14 xl:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 xl:gap-20 relative">
            
            {/* ================================================================ */}
            {/* LEFT COLUMN: Pinned / Sticky on Desktop while Scrolling Questions */}
            {/* ================================================================ */}
            <div className="w-full lg:w-[35%] xl:w-[32%] lg:sticky lg:top-32 lg:self-start flex flex-col justify-between shrink-0 lg:h-[500px]">
              
              {/* Top Block: Title & Optional Eyebrow / Description */}
              <div>
                {subtitle && (
                  <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-5 bg-[#fff1e6] shadow-xs">
                    <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                      {subtitle}
                    </span>
                  </div>
                )}

                <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] xl:text-[66px] text-[#20221c] leading-[1.0] tracking-tight">
                  {title || (
                    <>
                      Have<br />questions?
                    </>
                  )}
                </h2>

                {description && (
                  <div className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-sm">
                    {description}
                  </div>
                )}
              </div>

              {/* Bottom Block (Desktop Sticky): Avatar + Contact Inquiry Prompt + Hero Button */}
              <div className="hidden lg:block pt-8 mt-auto">
                {/* Support Specialist Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-xs mb-3.5 bg-[#eddcd2] shrink-0">
                  <Image
                    src="/veracue-images/support-avatar.jpg"
                    alt="Research Support Specialist"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="font-heading font-bold text-[#20221c] text-base sm:text-lg leading-snug mb-3.5">
                  {contactHeading || "Still have questions?"}
                  <span className="block font-medium text-neutral-600 text-sm mt-0.5">
                    {contactSubtext || "Reach out to our research specialists via our contact page."}
                  </span>
                </div>

                <HeroButton
                  href={contactHref || "/contact"}
                  text={contactButtonText || "Contact Us"}
                />
              </div>

            </div>

            {/* ================================================================ */}
            {/* RIGHT COLUMN: Accordion Questions List with Elegant Dividers       */}
            {/* ================================================================ */}
            <div className="w-full lg:w-[64%] xl:w-[67%] flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openIndices.includes(index)

                return (
                  <div
                    key={index}
                    className="border-b border-[#a5a58d]/35 transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none select-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading font-bold text-base sm:text-lg md:text-[19px] text-[#20221c] group-hover:text-[#cb997e] transition-colors duration-200 leading-snug pr-4">
                        {faq.question}
                      </span>

                      {/* Soft circular pill toggle button */}
                      <span
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border shadow-xs ${
                          isOpen
                            ? 'bg-[#cb997e] text-[#fff1e6] border-[#cb997e] rotate-45'
                            : 'bg-[#fff1e6] text-neutral-800 border-[#eddcd2] group-hover:border-[#cb997e] group-hover:text-[#cb997e]'
                        }`}
                      >
                        <Plus size={18} strokeWidth={2.2} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                              opacity: { duration: 0.25, delay: 0.05 }
                            }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                              opacity: { duration: 0.15 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 sm:pb-7 pr-4 sm:pr-12 text-neutral-700 text-sm sm:text-base leading-relaxed font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* MOBILE & TABLET ONLY: Bottom Contact Block */}
              <div className="block lg:hidden mt-8 pt-8 border-t border-[#a5a58d]/35">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/80 shadow-xs bg-[#eddcd2] shrink-0 mb-3.5">
                  <Image
                    src="/veracue-images/support-avatar.jpg"
                    alt="Research Support Specialist"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-4">
                  <div className="font-heading font-bold text-[#20221c] text-base leading-snug">
                    {contactHeading || "Still have questions?"}
                  </div>
                  <div className="text-neutral-600 text-sm mt-0.5">
                    {contactSubtext || "Reach out to our research specialists via our contact page."}
                  </div>
                </div>

                <HeroButton
                  href={contactHref || "/contact"}
                  text={contactButtonText || "Contact Us"}
                  className="w-full sm:w-auto justify-center"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
