'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ContactHero } from './ContactHero'
import { ContactForm } from './ContactForm'
import { TrustBadges } from '@/components/shared/TrustBadges'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { HeroButton } from '@/components/ui/hero-button'
import {
  Mail,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ShieldAlert,
  Microscope,
  Building2,
  Truck,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react'

interface ContactChannel {
  id: string
  number: string
  title: string
  tag: string
  description: string
  email: string
  status: string
  icon: React.ElementType
}

const CHANNELS: ContactChannel[] = [
  {
    id: 'support',
    number: '01.',
    title: 'Scientific & Technical Support',
    tag: 'ANALYTICAL CHEMISTRY DESK',
    description: 'Direct consultation for lot-specific HPLC chromatograms, mass spectrometry verification, compound handling, and storage guidance.',
    email: 'support@veracuepeptides.com',
    status: '< 2 Hour Response',
    icon: Microscope,
  },
  {
    id: 'bulk',
    number: '02.',
    title: 'Institutional & Bulk Procurement',
    tag: 'VOLUME & CONTRACT ORDERS',
    description: 'Custom gram-scale synthesis quotes, university purchase order (PO) billing, and academic research laboratory tier pricing.',
    email: 'bulk@veracuepeptides.com',
    status: 'Formal Invoices & Quotes',
    icon: Building2,
  },
  {
    id: 'logistics',
    number: '03.',
    title: 'Cold-Chain Logistics Desk',
    tag: 'TEMPERATURE-CONTROLLED DISPATCH',
    description: 'Inquiries regarding insulated parcel tracking, cold-pack transit verification, and expedited delivery arrangements.',
    email: 'orders@veracuepeptides.com',
    status: 'Daily 2:00 PM EST Cutoff',
    icon: Truck,
  },
]

const CONTACT_FAQS = [
  {
    question: 'How quickly will a scientific specialist respond to my inquiry?',
    answer:
      'Inquiries submitted during active US laboratory hours (Monday through Friday, 8:00 AM – 6:00 PM EST) receive technical responses in under 2 hours. Urgent weekend requests are monitored continuously by our on-call analytical team and answered on the next business morning.',
  },
  {
    question: 'Can I request lot-specific HPLC chromatograms prior to purchasing?',
    answer:
      'Yes. Every synthesis batch produced for Veracue is accompanied by third-party RP-HPLC and ESI Mass Spectrometry reports. You can request any lot-specific chromatogram by emailing support@veracuepeptides.com or specifying the compound in the inquiry form.',
  },
  {
    question: 'Do you accommodate university purchase orders (POs) and institutional billing?',
    answer:
      'Yes. We actively support university biochemistry laboratories, contract research organizations (CROs), and institutional departments with formal Net-30 invoice billing, custom volume quotes, and W-9 tax documentation on request.',
  },
  {
    question: 'How are research peptides packaged and shipped?',
    answer:
      'All peptide compounds are packaged as lyophilized powders in vacuum-sealed vials under inert argon gas to eliminate oxidation. Shipments are packed inside custom insulated thermal boxes with refrigerant gel packs to preserve compound structural integrity.',
  },
  {
    question: 'Are Veracue peptide compounds approved for clinical or diagnostic use?',
    answer:
      'No. All compounds offered by Veracue Peptides are supplied strictly for in-vitro laboratory research and analytical chemistry evaluation. Products are strictly labeled Research Use Only (RUO) and may not be used for medical diagnosis, veterinary, or clinical applications.',
  },
]

export function ContactClient() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  // Live US EST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setCurrentTime(timeString)
      } catch {
        setCurrentTime('8:00 AM EST')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(null), 2500)
    }
  }

  return (
    <div className="bg-[#f0efeb] min-h-screen relative font-sans text-[#20221c] overflow-hidden select-none">
      {/* 1. Homepage-Style Hero Component */}
      <ContactHero />

      {/* 2. Framed Communication Channels Section (Matching Homepage WhatSetsUsApart / WhyChooseUs Layout) */}
      <section className="bg-[#f0efeb] py-12 sm:py-16 md:py-20 lg:py-24 font-sans relative z-20">
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
          
          <div className="border-t border-b border-[#b7b7a4]/50 flex flex-col lg:flex-row">
            {/* Left Column: Eyebrow, Heading, Paragraph & Signature CTA */}
            <div className="lg:w-[38%] xl:w-[35%] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-[#b7b7a4]/50">
              <div>
                <div className="inline-block border border-[#eddcd2] rounded-full px-4 py-1.5 mb-5 bg-[#fff1e6] shadow-xs">
                  <span className="text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase font-editorial">
                    DIRECT LIAISON DESKS
                  </span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold text-neutral-900 tracking-tight leading-[1.08] uppercase mb-4 sm:mb-6">
                  Communication Channels
                </h2>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-sans mb-8 max-w-lg">
                  Direct points of contact for HPLC chromatogram requests, volume procurement quotes, and temperature-controlled logistics verification. Our US-based scientific team monitors all inquiries continuously.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <HeroButton href="#inquiry-form" direction="down">
                  Initiate Research Inquiry
                </HeroButton>
              </div>
            </div>

            {/* Right Column: 3 Dedicated Channel Desks Grid */}
            <div className="lg:w-[62%] xl:w-[65%] grid grid-cols-1 md:grid-cols-3">
              {CHANNELS.map((channel, index) => {
                const Icon = channel.icon
                const isCopied = copiedEmail === channel.email
                const isLastItem = index === CHANNELS.length - 1

                return (
                  <div
                    key={channel.id}
                    className={`group p-6 sm:p-8 md:p-7 lg:p-8 xl:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-[#fff1e6]/40 ${
                      !isLastItem ? 'border-b md:border-b-0 md:border-r border-[#b7b7a4]/50' : ''
                    }`}
                  >
                    <div>
                      {/* Top: Clean Geometric Number (01., 02., 03.) */}
                      <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8">
                        <span className="font-sans font-extrabold text-2xl sm:text-3xl text-[#20221c] tracking-tight group-hover:text-[#cb997e] transition-colors duration-300">
                          {channel.number}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                          {channel.status}
                        </span>
                      </div>

                      {/* Wireframe Icon & Header */}
                      <div className="w-11 h-11 rounded-2xl bg-white border border-[#eddcd2] group-hover:border-[#cb997e]/40 flex items-center justify-center text-[#20221c] group-hover:text-[#cb997e] transition-colors mb-4 shadow-2xs">
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase font-editorial block text-[#cb997e] mb-1.5">
                        {channel.tag}
                      </span>

                      <h3 className="font-heading font-black text-base sm:text-lg leading-snug uppercase tracking-tight text-[#20221c] mb-2 group-hover:text-[#cb997e] transition-colors duration-300">
                        {channel.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] leading-relaxed font-sans text-neutral-600 mb-6">
                        {channel.description}
                      </p>
                    </div>

                    {/* Email Action Pill */}
                    <div className="pt-4 border-t border-[#b7b7a4]/30 flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${channel.email}`}
                        className="font-sans font-semibold text-xs text-[#20221c] hover:text-[#cb997e] truncate transition-colors flex items-center gap-1.5"
                      >
                        <Mail size={12} className="shrink-0 text-[#cb997e]" />
                        <span className="truncate">{channel.email}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyEmail(channel.email)}
                        className="w-7 h-7 rounded-full bg-white hover:bg-[#cb997e] text-neutral-600 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs"
                        title="Copy Email Address"
                        aria-label={`Copy email: ${channel.email}`}
                      >
                        {isCopied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Stage: Split Form & Live Lab Operations Dashboard */}
      <section className="bg-[#f0efeb] py-8 sm:py-12 md:py-16 font-sans relative z-20">
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Homepage-styled Inquiry Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ContactForm />
            </div>

            {/* Right Column: Lab Info & Specialist Direct Spotlight */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
              
              {/* 1. Live US Lab Operations Status Card */}
              <div className="bg-[#b7b7a4]/25 border border-[#b7b7a4]/60 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#b7b7a4]/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-heading font-bold text-sm sm:text-base text-[#20221c]">
                      Laboratory Live Status
                    </span>
                  </div>
                  {currentTime && (
                    <span className="text-[11px] font-sans font-semibold text-[#20221c] bg-[#fff1e6] border border-[#eddcd2] px-2.5 py-0.5 rounded-full">
                      {currentTime} EST
                    </span>
                  )}
                </div>

                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#eddcd2] flex items-center justify-center text-[#cb997e] shrink-0 mt-0.5 shadow-2xs">
                      <Calendar size={14} strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-bold text-[#20221c] block">Operating Hours</span>
                      <span className="text-neutral-600 block">Monday – Friday: 8:00 AM – 6:00 PM EST</span>
                      <span className="text-neutral-400 text-[11px] block">Weekend inquiries monitored by on-call lab staff</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#eddcd2] flex items-center justify-center text-[#20221c] shrink-0 mt-0.5 shadow-2xs">
                      <MapPin size={14} strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-bold text-[#20221c] block">Synthesis &amp; Testing Facility</span>
                      <span className="text-neutral-600 block">Research Triangle Park, NC, United States</span>
                      <span className="text-neutral-400 text-[11px] block">Accredited ISO-7 &amp; HPLC Testing Cleanroom</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#eddcd2] flex items-center justify-center text-[#cb997e] shrink-0 mt-0.5 shadow-2xs">
                      <Truck size={14} strokeWidth={2.2} />
                    </div>
                    <div>
                      <span className="font-bold text-[#20221c] block">Cold-Chain Dispatch Cutoff</span>
                      <span className="text-neutral-600 block">Same-day transit for orders before 2:00 PM EST</span>
                      <span className="text-neutral-400 text-[11px] block">Insulated thermal boxes with refrigerant cooling</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Direct Support Team Card */}
              <div className="bg-white/90 border border-[#eddcd2] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white shadow-xs bg-[#eddcd2] shrink-0">
                    <Image
                      src="/veracue-images/support-avatar.jpg"
                      alt="Veracue Support Team"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider text-[#a05a39] bg-[#cb997e]/15 border border-[#cb997e]/30 px-2.5 py-0.5 rounded-full mb-1">
                      <Clock size={11} strokeWidth={2.4} />
                      <span>Response &lt; 2h</span>
                    </div>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[#20221c]">
                      Veracue Support Team
                    </h4>
                    <p className="font-sans text-neutral-600 text-xs sm:text-[13px]">
                      US-Based Technical &amp; Order Support
                    </p>
                  </div>
                </div>

                <p className="font-sans text-neutral-700 text-xs sm:text-sm leading-relaxed mb-5">
                  Have questions about peptide handling, lot confirmation, or an order? Email our support team directly.
                </p>

                <HeroButton
                  href="mailto:support@veracuepeptides.com"
                  className="w-full justify-center"
                >
                  Email Support Directly
                </HeroButton>
              </div>

              {/* 3. Verified Standards Mini-Badge Card */}
              <div className="bg-white/70 border border-[#eddcd2] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs">
                <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-[#20221c]/70 block mb-3">
                  Analytical Verification Standards
                </span>
                <ul className="space-y-2.5 text-xs font-sans text-neutral-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#cb997e] shrink-0" />
                    <span>≥99.0% Purity Confirmed by Reverse-Phase HPLC</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#cb997e] shrink-0" />
                    <span>ESI Mass Spectrometry Sequence Identity Verification</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#cb997e] shrink-0" />
                    <span>Inert Argon Gas Packaging with Desiccant Seal</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#cb997e] shrink-0" />
                    <span>Publicly Searchable Lot Certificate of Analysis (COA)</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Homepage TrustBadges Component (Pop-Out 4-Card Stage) */}
      <TrustBadges />

      {/* 5. Signature Homepage SharedFaqSection Component */}
      <SharedFaqSection
        subtitle="CONTACT &amp; SUPPORT FAQS"
        title={
          <>
            Frequently Asked<br />Questions
          </>
        }
        faqs={CONTACT_FAQS}
        contactHeading="Need Direct Technical Assistance?"
        contactSubtext="Our scientific team can provide lot-specific certificates of analysis, bulk procurement pricing, and storage recommendations."
        contactButtonText="Initiate Inquiry"
        contactHref="#inquiry-form"
      />

      {/* 6. RUO Research Compliance Notice */}
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <div className="bg-[#20221c] border border-neutral-800 rounded-3xl p-6 sm:p-8 md:p-10 text-[#fff1e6] shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#cb997e] shrink-0">
              <ShieldAlert size={20} strokeWidth={2.2} />
            </div>
            <div>
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#cb997e] block mb-2">
                Compliance &amp; Research Protocol Notice
              </span>
              <p className="font-sans text-neutral-200 text-[13px] sm:text-[14.5px] leading-relaxed font-normal">
                All peptide compounds supplied by Veracue are intended strictly for controlled laboratory research and analytical evaluation in academic or institutional settings. Products are labeled <strong className="text-white font-semibold">Research Use Only (RUO)</strong> and are not intended for human or veterinary use, medical diagnosis, or therapeutic application.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
