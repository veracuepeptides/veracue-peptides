'use client'

import React, { useState, useEffect } from 'react'
import { LegalPolicyTabs, type LegalSlug } from './LegalPolicyTabs'
import { LegalPageHero } from './LegalPageHero'
import { LegalSidebar, type LegalSectionItem } from './LegalSidebar'
import { LegalMobilePillBar } from './LegalMobilePillBar'
import { LegalContactCard } from './LegalContactCard'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { ShieldAlert, CheckCircle2 } from 'lucide-react'
import { LegalLeftGutterArt, LegalRightGutterArt } from './LegalSideDecorations'

interface LegalPageLayoutProps {
  slug: LegalSlug
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  effectiveDate: string
  intro?: string
  introHeading?: string
  sections: LegalSectionItem[]
  contactProps?: {
    title?: string
    intro?: string
    supportLabel?: string
    orderLabel?: string
    closingText?: string
    supportEmail?: string
    ordersEmail?: string
  }
  faqs?: { question: string; answer: string }[]
  faqTitle?: string
  faqDescription?: string
  children: React.ReactNode
}

export function LegalPageLayout({
  slug,
  eyebrow,
  titleLine1,
  titleLine2,
  effectiveDate,
  intro,
  introHeading = 'Critical Research Notice & Regulatory Posture',
  sections,
  contactProps,
  faqs,
  faqTitle,
  faqDescription,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || 'intro'
  )

  // IntersectionObserver for tracking active section while reading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let bestId = activeSection

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            bestId = entry.target.id
          }
        })

        if (maxRatio > 0) {
          setActiveSection(bestId)
        }
      },
      {
        rootMargin: '-10% 0px -65% 0px',
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    const contactEl = document.getElementById('contact')
    if (contactEl) observer.observe(contactEl)

    const faqEl = document.getElementById('faq')
    if (faqEl) observer.observe(faqEl)

    return () => observer.disconnect()
  }, [sections, activeSection])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -70
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full overflow-x-clip lg:overflow-x-visible bg-[#f0efeb] min-h-screen text-[#20221c] font-sans pt-[76px] sm:pt-[92px] md:pt-[110px] pb-20 sm:pb-28 relative">
      {/* Left Flank Continuation Vector Art (visible on desktop) */}
      <div
        aria-hidden="true"
        className="hidden xl:block fixed left-6 2xl:left-14 top-32 pointer-events-none select-none z-0 opacity-70"
      >
        <LegalLeftGutterArt />
      </div>

      {/* Right Flank Continuation Vector Art (visible on desktop) */}
      <div
        aria-hidden="true"
        className="hidden xl:block fixed right-6 2xl:right-14 top-32 pointer-events-none select-none z-0 opacity-70"
      >
        <LegalRightGutterArt />
      </div>

      {/* 1. Policy Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <LegalPolicyTabs currentSlug={slug} />
      </div>

      {/* 2. Hero Header */}
      <LegalPageHero
        eyebrow={eyebrow}
        titleLine1={titleLine1}
        titleLine2={titleLine2}
        effectiveDate={effectiveDate}
        sectionCount={sections.length}
      />

      {/* 3. Mobile & Tablet Sticky Pill Bar */}
      <LegalMobilePillBar
        sections={sections}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* 4. Main Two-Column Grid: Sidebar + Document Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative">
          {/* Left Desktop Sticky Sidebar */}
          <LegalSidebar
            sections={sections}
            activeSection={activeSection}
            onSelectSection={scrollToSection}
          />

          {/* Right Document Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <article className="bg-white rounded-[20px] sm:rounded-[28px] md:rounded-[32px] p-5 sm:p-9 md:p-14 border border-[#a5a58d]/30 shadow-[0_4px_32px_rgba(40,49,33,0.04)] relative overflow-hidden">
              {/* Lead Introduction / Critical Notice */}
              {intro ? (
                <section id="intro" className="scroll-mt-36 mb-12 sm:mb-16 w-full max-w-full">
                  <div className="border-y border-[#b7b7a4]/40 py-8 sm:py-10 w-full max-w-full">
                    {/* Top Row: Eyebrow Pill & Protocol Ref */}
                    <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
                      <div className="inline-flex items-center gap-2 border border-[#eddcd2] rounded-full px-3.5 py-1 bg-[#fff1e6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
                        <span className="text-[#a5a58d] text-[11px] font-bold tracking-[0.2em] uppercase font-mono">
                          Regulatory Directive
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#a5a58d] tracking-widest uppercase hidden sm:inline">
                        Standard 21-CFR · In Vitro
                      </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-normal text-[#1a1c15] tracking-tight leading-tight mb-4 break-words">
                      {introHeading}
                    </h2>

                    {/* Lead Body */}
                    <p className="font-serif text-[15px] sm:text-base md:text-[17px] text-[#2c3024] leading-[1.8] max-w-4xl break-words">
                      {intro}
                    </p>
                  </div>
                </section>
              ) : null}

              {/* Document Body Sections */}
              <div className="relative z-10 space-y-10 sm:space-y-14">
                {children}
              </div>

              {/* Embedded Contact Card */}
              <LegalContactCard {...contactProps} />
            </article>
          </div>
        </div>
      </div>

      {/* 5. Optional FAQ Section */}
      {faqs && faqs.length > 0 ? (
        <div id="faq" className="scroll-mt-36 mt-14 sm:mt-20">
          <SharedFaqSection
            title={faqTitle || 'Frequently Asked Questions'}
            description={
              faqDescription ||
              'Find clear, authoritative answers regarding our policies, laboratory compliance, and research supply protocols.'
            }
            faqs={faqs}
          />
        </div>
      ) : null}
    </div>
  )
}
