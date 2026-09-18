'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  CheckCircle2,
  FileText,
  Download,
  Copy,
  Check,
  ShieldCheck,
  SlidersHorizontal,
  ExternalLink,
  X,
  Eye,
  Activity,
  ArrowUpRight,
  FlaskConical,
  Award,
  ChevronDown,
  LayoutGrid,
  Table as TableIcon,
  HelpCircle,
} from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { HeroButton } from '@/components/ui/hero-button'
import { CertificatesHero } from '@/components/certificates/CertificatesHero'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { type VerifiedCOA } from '@/lib/certificates/fallbackCertificates'

interface CertificatesClientProps {
  coas: VerifiedCOA[]
}

export function CertificatesClient({ coas }: CertificatesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [purityFilter, setPurityFilter] = useState<'all' | 'high'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [inspectingCoa, setInspectingCoa] = useState<VerifiedCOA | null>(null)
  const [copiedBatch, setCopiedBatch] = useState<string | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(coas.map((c) => c.category))).filter(Boolean)
    return ['All', ...cats.sort()]
  }, [coas])

  // Filtered COAs
  const filteredCOAs = useMemo(() => {
    return coas.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false
      }

      // Purity filter: high means >= 99.5%
      if (purityFilter === 'high') {
        const numPurity = parseFloat(item.purity.replace('%', ''))
        if (isNaN(numPurity) || numPurity < 99.5) {
          return false
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchProduct = item.product.toLowerCase().includes(query)
        const matchBatch = item.batch.toLowerCase().includes(query)
        const matchCategory = item.category.toLowerCase().includes(query)
        const matchLab = item.lab.toLowerCase().includes(query)
        const matchFormula = item.formula?.toLowerCase().includes(query) || false
        if (!matchProduct && !matchBatch && !matchCategory && !matchLab && !matchFormula) {
          return false
        }
      }

      return true
    })
  }, [coas, selectedCategory, purityFilter, searchQuery])

  // Copy batch number handler
  const handleCopyBatch = (batch: string) => {
    navigator.clipboard.writeText(batch)
    setCopiedBatch(batch)
    setTimeout(() => setCopiedBatch(null), 2000)
  }

  // FAQ Items
  const FAQ_ITEMS = [
    {
      question: 'What analytical techniques are used to verify Veracue batches?',
      answer:
        'Every Veracue batch undergoes orthogonal dual-method testing: High-Performance Liquid Chromatography (RP-HPLC) with photodiode array detection for chemical purity and area normalization, coupled with Mass Spectrometry (ESI-MS or MALDI-TOF) to confirm sequence identity and exact molecular mass.',
    },
    {
      question: 'How do I locate the batch number on my peptide vial?',
      answer:
        'Each Veracue vial features a laser-printed tamper-resistant lot tag on the base of the label (e.g. "VR-BPC-2603A"). Entering this alphanumeric string into the search bar above will immediately surface the corresponding analytical report.',
    },
    {
      question: 'What is the minimum purity threshold for Veracue research compounds?',
      answer:
        'We enforce a strict ≥99.0% baseline purity threshold. Batches failing to reach 99.0% area resolution are rejected and never compounded or fulfilled. Overfill percentages in peptide net content are explicitly noted on the testing docket.',
    },
    {
      question: 'Can academic institutions request raw chromatogram CSV or CDF files?',
      answer:
        'Yes. Registered academic investigators and laboratory directors may contact our quality assurance team with their lot code to receive raw chromatographic retention logs, baseline integration tables, and mass spectra data files.',
    },
  ]

  return (
    <div className="w-full bg-[#f0efeb] text-[#20221c] font-sans selection:bg-[#a5a58d]/30 selection:text-[#20221c] overflow-x-clip">
      {/* ==================================================================== */}
      {/* 1. SIGNATURE HERO: Matches Homepage, Shop, & Affiliates layout       */}
      {/* ==================================================================== */}
      <CertificatesHero />

      {/* ==================================================================== */}
      {/* 1.5. VERIFICATION BENCHMARK STRIP (Fully Responsive Mobile & Tablet) */}
      {/* ==================================================================== */}
      <section className="w-full px-3 sm:px-6 md:px-10 py-6 xs:py-8 sm:py-10 md:py-14 relative z-10">
        <div className="w-full max-w-[1540px] mx-auto">
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4 md:gap-5">
              {/* Card 1: Purity Standard */}
              <div className="bg-white rounded-2xl sm:rounded-[24px] p-3.5 xs:p-4 sm:p-5 md:p-6 border border-[#eddcd2] shadow-xs text-left group hover:border-[#a5a58d] transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-heading font-black text-lg xs:text-xl sm:text-2xl lg:text-3xl text-[#20221c] tracking-tight leading-none whitespace-nowrap">
                      ≥99.0%
                    </span>
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-[#a5a58d] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#a5a58d] font-heading block mb-1 sm:mb-1.5 leading-tight">
                    Purity Standard
                  </span>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Strict rejection threshold for any batch under 99.0% area resolution.
                  </p>
                </div>
              </div>

              {/* Card 2: Third-Party Tested */}
              <div className="bg-white rounded-2xl sm:rounded-[24px] p-3.5 xs:p-4 sm:p-5 md:p-6 border border-[#eddcd2] shadow-xs text-left group hover:border-[#a5a58d] transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-heading font-black text-lg xs:text-xl sm:text-2xl lg:text-3xl text-[#20221c] tracking-tight leading-none whitespace-nowrap">
                      100%
                    </span>
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-[#a5a58d] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#a5a58d] font-heading block mb-1 sm:mb-1.5 leading-tight">
                    Third-Party Tested
                  </span>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Independent US analytical laboratories test every lot prior to release.
                  </p>
                </div>
              </div>

              {/* Card 3: Cleanroom Synthesis */}
              <div className="bg-white rounded-2xl sm:rounded-[24px] p-3.5 xs:p-4 sm:p-5 md:p-6 border border-[#eddcd2] shadow-xs text-left group hover:border-[#a5a58d] transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-heading font-black text-lg xs:text-xl sm:text-2xl lg:text-3xl text-[#20221c] tracking-tight leading-none whitespace-nowrap">
                      ISO-7
                    </span>
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-[#a5a58d] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#a5a58d] font-heading block mb-1 sm:mb-1.5 leading-tight">
                    Cleanroom Synthesis
                  </span>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Controlled atmospheric compounding and sterile nitrogen vial backfill.
                  </p>
                </div>
              </div>

              {/* Card 4: Dual Verification */}
              <div className="bg-white rounded-2xl sm:rounded-[24px] p-3.5 xs:p-4 sm:p-5 md:p-6 border border-[#eddcd2] shadow-xs text-left group hover:border-[#a5a58d] transition-all flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className="font-heading font-black text-lg xs:text-xl sm:text-2xl lg:text-3xl text-[#20221c] tracking-tight leading-none whitespace-nowrap">
                      HPLC+MS
                    </span>
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-[#a5a58d] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#a5a58d] font-heading block mb-1 sm:mb-1.5 leading-tight">
                    Dual Verification
                  </span>
                  <p className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-600 leading-relaxed">
                    Liquid chromatography purity paired with mass spectrometry sequence match.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. COA LIBRARY EXPLORER (Search, Filters & Interactive Repository)   */}
      {/* ==================================================================== */}
      <section id="library" className="w-full px-2 sm:px-6 md:px-10 mb-24 sm:mb-32 scroll-mt-24 relative z-10">
        <div className="w-full bg-white rounded-3xl sm:rounded-[36px] p-5 sm:p-8 md:p-12 lg:p-14 border border-[#eddcd2] shadow-[0_12px_44px_rgba(0,0,0,0.04)]">
          {/* Top Control Bar: Search Input, Category Tabs, Mode Toggles */}
          <div className="flex flex-col gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#eddcd2]">
            {/* Row 1: Search and Results Counter */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by peptide name, batch code (e.g. VR-BPC), or lab..."
                  className="w-full pl-11 pr-10 py-3 rounded-full bg-[#f0efeb] border border-[#eddcd2] text-sm text-[#20221c] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#a5a58d] focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Counter & View Switcher */}
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#a5a58d] bg-[#a5a58d]/15 px-3 py-1.5 rounded-full border border-[#a5a58d]/25">
                  {filteredCOAs.length} {filteredCOAs.length === 1 ? 'Report' : 'Reports'} Available
                </span>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-[#f0efeb] p-1 rounded-full border border-[#eddcd2]">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-heading font-semibold flex items-center gap-1.5 transition-all ${
                      viewMode === 'table'
                        ? 'bg-[#a5a58d] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-[#20221c]'
                    }`}
                    aria-label="Table View"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-heading font-semibold flex items-center gap-1.5 transition-all ${
                      viewMode === 'cards'
                        ? 'bg-[#a5a58d] text-white shadow-xs'
                        : 'text-neutral-600 hover:text-[#20221c]'
                    }`}
                    aria-label="Cards View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Category Filter Pills (Olive Green #a5a58d for active) & Purity Filter Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category Pills with Olive Green Selected State */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-medium tracking-tight whitespace-nowrap shrink-0 transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[#a5a58d] text-white font-bold shadow-xs border border-[#a5a58d]'
                        : 'bg-[#f0efeb] hover:bg-[#eddcd2]/60 text-neutral-700 border border-[#eddcd2]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Purity Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 hidden sm:inline">
                  Filter Purity:
                </span>
                <div className="inline-flex rounded-full bg-[#f0efeb] p-0.5 border border-[#eddcd2] text-[11px] font-mono">
                  <button
                    onClick={() => setPurityFilter('all')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      purityFilter === 'all'
                        ? 'bg-[#a5a58d] text-white font-bold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    All (≥99%)
                  </button>
                  <button
                    onClick={() => setPurityFilter('high')}
                    className={`px-3 py-1 rounded-full transition-all ${
                      purityFilter === 'high'
                        ? 'bg-[#a5a58d] text-white font-bold'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Ultra (≥99.5%)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Library Content */}
          {coas.length === 0 ? (
            <div className="bg-[#f0efeb] rounded-2xl p-12 sm:p-16 text-center border border-dashed border-[#eddcd2]">
              <FileText className="w-10 h-10 text-[#a5a58d] mx-auto mb-4 stroke-1" />
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#20221c] mb-2">
                Certificates are being added
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                We're in the process of publishing batch-specific COAs to this library. Need a certificate for a product you've ordered? Request it directly and our team will send it over.
              </p>
              <HeroButton href="/contact-us">
                Request a Certificate
              </HeroButton>
            </div>
          ) : filteredCOAs.length === 0 ? (
            <div className="bg-[#f0efeb] rounded-2xl p-12 sm:p-16 text-center border border-dashed border-[#eddcd2]">
              <FileText className="w-10 h-10 text-[#a5a58d] mx-auto mb-4 stroke-1" />
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#20221c] mb-2">
                No matching testing certificates found
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                Try searching for a different compound or clear your active filters. If you are looking for an archived lot, you can request it below.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                  setPurityFilter('all')
                }}
                className="px-5 py-2.5 rounded-full bg-[#a5a58d] text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-[#20221c] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* DESKTOP / TABLET EDITORIAL TABLE */
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[580px] sm:min-w-full">
                <thead>
                  <tr className="border-b border-[#eddcd2] bg-[#a5a58d]/10">
                    <th className="py-3.5 px-4 sm:px-5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#a5a58d] font-heading rounded-l-xl min-w-[150px]">
                      Compound & Spec
                    </th>
                    <th className="py-3.5 px-4 sm:px-5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#a5a58d] font-heading whitespace-nowrap">
                      HPLC Purity
                    </th>
                    <th className="py-3.5 px-4 sm:px-5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#a5a58d] font-heading whitespace-nowrap">
                      Batch / Lot #
                    </th>
                    <th className="py-3.5 px-4 sm:px-5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#a5a58d] font-heading whitespace-nowrap">
                      Analytical Lab & Date
                    </th>
                    <th className="py-3.5 px-4 sm:px-5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#a5a58d] font-heading text-right rounded-r-xl whitespace-nowrap">
                      Verification Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eddcd2]/70">
                  {filteredCOAs.map((coa) => (
                    <tr
                      key={coa.id}
                      className="group hover:bg-[#fff1e6]/40 transition-colors"
                    >
                      {/* 1. Compound & Spec */}
                      <td className="py-4 px-4 sm:px-5 min-w-[150px]">
                        <div className="flex flex-col">
                          <span className="text-sm sm:text-base font-bold text-[#20221c] font-heading group-hover:text-[#cb997e] transition-colors">
                            {coa.product}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <span className="text-[9.5px] sm:text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#f0efeb] text-neutral-600 border border-[#eddcd2] whitespace-nowrap inline-flex items-center shrink-0 leading-normal">
                              {coa.category}
                            </span>
                            {coa.formula && (
                              <span className="text-[9.5px] sm:text-[10px] font-mono text-neutral-500 hidden md:inline whitespace-nowrap">
                                {coa.formula}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 2. Purity with High-Contrast Olive Green Badge */}
                      <td className="py-4 px-4 sm:px-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a5a58d] text-white shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="font-mono text-xs sm:text-sm font-bold">
                            {coa.purity}
                          </span>
                        </div>
                      </td>

                      {/* 3. Batch / Lot # with Copy */}
                      <td className="py-4 px-4 sm:px-5">
                        <button
                          onClick={() => handleCopyBatch(coa.batch)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-700 hover:text-[#20221c] bg-[#f0efeb] px-2.5 py-1 rounded-md border border-[#eddcd2] group/btn transition-all"
                          title="Click to copy lot number"
                        >
                          <span>{coa.batch}</span>
                          {copiedBatch === coa.batch ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-neutral-400 group-hover/btn:text-neutral-700" />
                          )}
                        </button>
                      </td>

                      {/* 4. Lab & Date */}
                      <td className="py-4 px-4 sm:px-5">
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-neutral-800">
                            {coa.analyzed}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-normal">
                            {coa.lab}
                          </span>
                        </div>
                      </td>

                      {/* 5. Actions */}
                      <td className="py-4 px-4 sm:px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setInspectingCoa(coa)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#20221c] text-[#fff1e6] hover:bg-[#a5a58d] text-xs font-heading font-semibold transition-all shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect</span>
                          </button>

                          {coa.coaUrl ? (
                            <a
                              href={coa.coaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-full bg-[#f0efeb] hover:bg-[#a5a58d] hover:text-white text-[#20221c] border border-[#eddcd2] transition-colors"
                              title="Download PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={() => setInspectingCoa(coa)}
                              className="p-1.5 rounded-full bg-[#f0efeb] hover:bg-[#a5a58d] hover:text-white text-[#20221c] border border-[#eddcd2] transition-colors"
                              title="View Document"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* CARD GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCOAs.map((coa) => (
                <div
                  key={coa.id}
                  className="bg-[#f0efeb]/60 rounded-2xl p-5 sm:p-6 border border-[#eddcd2] hover:border-[#a5a58d] hover:bg-white transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Card Header: Category & Purity */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-neutral-600 border border-[#eddcd2] whitespace-nowrap shrink-0 inline-flex items-center">
                        {coa.category}
                      </span>
                      <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#a5a58d] text-white shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="font-mono text-xs font-bold">
                          {coa.purity}
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-heading font-black text-lg sm:text-xl text-[#20221c] mb-1.5 group-hover:text-[#cb997e] transition-colors">
                      {coa.product}
                    </h3>
                    {coa.formula && (
                      <span className="text-[11px] font-mono text-neutral-500 block mb-4">
                        Formula: {coa.formula}
                      </span>
                    )}

                    {/* Metadata Grid */}
                    <div className="space-y-2 py-3 border-t border-b border-[#eddcd2] text-xs font-mono mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Lot Code:</span>
                        <button
                          onClick={() => handleCopyBatch(coa.batch)}
                          className="inline-flex items-center gap-1 font-bold text-[#20221c] hover:text-[#cb997e]"
                        >
                          <span>{coa.batch}</span>
                          {copiedBatch === coa.batch ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-neutral-400" />
                          )}
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Analyzed:</span>
                        <span className="font-medium text-neutral-800">{coa.analyzed}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">Laboratory:</span>
                        <span className="text-[11px] font-medium text-neutral-700 truncate max-w-[160px]">
                          {coa.lab}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setInspectingCoa(coa)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#20221c] text-[#fff1e6] hover:bg-[#a5a58d] text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect COA</span>
                    </button>

                    {coa.coaUrl ? (
                      <a
                        href={coa.coaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white border border-[#eddcd2] text-[#20221c] hover:bg-[#a5a58d] hover:text-white transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setInspectingCoa(coa)}
                        className="p-2.5 rounded-xl bg-white border border-[#eddcd2] text-[#20221c] hover:bg-[#a5a58d] hover:text-white transition-colors"
                        title="View Document"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. COA INSPECTOR MODAL (Interactive Analytical Sheet in Olive Green) */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {inspectingCoa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eddcd2] relative"
            >
              {/* Modal Top Header (Olive Green #a5a58d) */}
              <div className="bg-[#a5a58d] text-white p-6 sm:p-7 relative border-b border-[#a5a58d]/40">
                <button
                  onClick={() => setInspectingCoa(null)}
                  className="absolute right-5 top-5 p-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/90">
                    VERACUE ANALYTICAL QUALITY CONTROL &bull; DOCKET
                  </span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {inspectingCoa.product}
                </h3>
                <span className="text-xs font-mono text-white/90">
                  Batch: {inspectingCoa.batch} &bull; Analyzed {inspectingCoa.analyzed}
                </span>
              </div>

              {/* Modal Body: Analytical Specs & Chromatogram Peak Simulation */}
              <div className="p-6 sm:p-8 space-y-6 text-sm text-[#20221c] max-h-[75vh] overflow-y-auto">
                {/* Status & Purity Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#f0efeb] border border-[#eddcd2]">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a5a58d] block">
                      Chromatographic Purity
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#20221c]">
                      {inspectingCoa.purity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a5a58d] text-white text-xs font-heading font-bold uppercase tracking-wider shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      {inspectingCoa.status || 'Verified'}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 block mt-1">
                      Target Purity Standard: ≥99.00%
                    </span>
                  </div>
                </div>

                {/* Analytical Data Table */}
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#a5a58d] mb-3">
                    Assay Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#f0efeb] border border-[#eddcd2]">
                      <span className="text-neutral-500 block text-[10px]">Testing Laboratory:</span>
                      <span className="font-semibold text-neutral-900">{inspectingCoa.lab}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0efeb] border border-[#eddcd2]">
                      <span className="text-neutral-500 block text-[10px]">Analytical Method:</span>
                      <span className="font-semibold text-neutral-900">
                        {inspectingCoa.method || 'RP-HPLC & ESI-MS'}
                      </span>
                    </div>

                    {inspectingCoa.molecularWeight && (
                      <div className="p-3 rounded-xl bg-[#f0efeb] border border-[#eddcd2]">
                        <span className="text-neutral-500 block text-[10px]">Theoretical Mass:</span>
                        <span className="font-semibold text-neutral-900">
                          {inspectingCoa.molecularWeight}
                        </span>
                      </div>
                    )}

                    {inspectingCoa.observedWeight && (
                      <div className="p-3 rounded-xl bg-[#f0efeb] border border-[#eddcd2]">
                        <span className="text-neutral-500 block text-[10px]">Observed MS Mass:</span>
                        <span className="font-semibold text-neutral-900">
                          {inspectingCoa.observedWeight}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {inspectingCoa.notes && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#20221c] text-white border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-[#a5a58d]" />
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#fff1e6]">
                        Lab Notes
                      </span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed italic">
                      &ldquo;{inspectingCoa.notes}&rdquo;
                    </p>
                  </div>
                )}

                {/* Footer Modal Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#eddcd2]">
                  <button
                    onClick={() => handleCopyBatch(inspectingCoa.batch)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f0efeb] text-[#20221c] text-xs font-heading font-semibold border border-[#eddcd2] hover:bg-[#eddcd2]/50 transition-colors"
                  >
                    {copiedBatch === inspectingCoa.batch ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Lot Code</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Copy Lot Code</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    {inspectingCoa.productSlug && (
                      <Link
                        href={`/product/${inspectingCoa.productSlug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#20221c] border border-[#eddcd2] text-xs font-heading font-semibold hover:border-[#a5a58d] transition-colors"
                      >
                        <span>View Product</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <button
                      onClick={() => setInspectingCoa(null)}
                      className="px-5 py-2 rounded-full bg-[#a5a58d] text-white hover:bg-[#20221c] text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 4. THE 4-STAGE ANALYTICAL PIPELINE (Header-Width Card)               */}
      {/* ==================================================================== */}
      <section id="protocol" className="w-full px-2 sm:px-6 md:px-10 mb-24 sm:mb-32 scroll-mt-28 relative z-10">
        <div className="w-full bg-[#20221c] text-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_16px_50px_rgba(0,0,0,0.2)] border border-neutral-800 relative overflow-hidden">
          {/* Header Row */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-px bg-[#a5a58d]" />
              <span className="text-xs uppercase font-serif tracking-[0.24em] text-[#a5a58d] font-semibold">
                Quality Assurance Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fff1e6] font-heading tracking-tight mb-4 leading-tight">
              The 4-Stage Verification Protocol.
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Every batch undergoes a four-tier sequence of chemical validation before release. We document synthesis parameters, chromatography resolution, and molecular weight matching for reproducible scientific research.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-[#a5a58d]/50 transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-[#a5a58d] uppercase tracking-widest block mb-3">
                  STAGE 01 &bull; SYNTHESIS
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                  Solid-Phase Synthesis
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  Synthesized in ISO-7 cleanroom suites using high-grade Fmoc-protected amino acids to minimize truncated sequence fragments.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#a5a58d]">
                Standard: ISO-7 Environment
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-[#a5a58d]/50 transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-[#a5a58d] uppercase tracking-widest block mb-3">
                  STAGE 02 &bull; HPLC PURITY
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                  Reverse-Phase HPLC
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  C18 silica column separation detects trace peptide diastereomers and counterions via peak area normalization at 214 nm.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#a5a58d]">
                Threshold: ≥99.0% Baseline
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-[#a5a58d]/50 transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-[#a5a58d] uppercase tracking-widest block mb-3">
                  STAGE 03 &bull; IDENTITY
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                  Mass Spectrometry (MS)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  ESI-MS or MALDI-TOF confirms the molecular weight matches theoretical target mass within ±0.05 Da tolerance.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#a5a58d]">
                Tolerance: ±0.05 Da Mass
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-[#a5a58d]/50 transition-all">
              <div>
                <span className="text-xs font-mono font-bold text-[#a5a58d] uppercase tracking-widest block mb-3">
                  STAGE 04 &bull; STABILITY
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                  Lyophilized Quarantine
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  Freeze-dried into stable lyophilized cakes under inert nitrogen backfill to ensure stability during global transit.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-[#a5a58d]">
                Packaging: Sterile Sealed Glass
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. ARCHIVED BATCH LOOKUP / REQUEST SECTION                          */}
      {/* ==================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 mb-24 sm:mb-32 relative z-10">
        <div className="bg-[#fff1e6] rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#eddcd2] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a5a58d] font-heading block mb-2">
              Historical Testing Vault
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#20221c] tracking-tight mb-3">
              Looking for an Earlier Batch Report?
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              If your vial features a legacy lot code or you need batch-specific data for published research, our quality assurance team will furnish certified analytical documentation within 24 hours.
            </p>
          </div>

          <div className="shrink-0">
            <HeroButton href="/contact-us" direction="right" size="lg">
              Request Specific Lot COA
            </HeroButton>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. VERIFICATION FAQ SECTION (Full Width matching Homepage)          */}
      {/* ==================================================================== */}
      <SharedFaqSection
        subtitle="SCIENTIFIC CLARIFICATIONS"
        title={
          <>
            Have<br />questions?
          </>
        }
        description="Comprehensive answers regarding HPLC analytical purity verification, mass spectrometry sequence matching, and third-party laboratory dockets."
        faqs={FAQ_ITEMS}
        contactHeading="Need custom lot documentation?"
        contactSubtext="Reach out directly through our contact page and our analytical team will assist you."
        contactButtonText="Contact Us"
        contactHref="/contact-us"
      />

      {/* ==================================================================== */}
      {/* 7. FINAL CONVERSION BLOCK (Olive Green Card matching Header)        */}
      {/* ==================================================================== */}
      <section className="w-full px-2 sm:px-6 md:px-10 pb-20 relative z-10">
        <div 
          style={{ backgroundColor: '#a5a58d' }}
          className="w-full text-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 md:p-14 lg:p-16 border border-[#b7b7a4]/90 shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          <span className="text-white/80 font-mono tracking-widest text-xs font-bold uppercase mb-3">
            VERACUE RESEARCH REPOSITORY &bull; VERIFIED QUALITY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight mb-4 uppercase max-w-3xl leading-tight">
            Order Certified &ge;99% Purity Peptides.
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Every batch ships with its corresponding lot-verified Certificate of Analysis. Order today and study with confidence.
          </p>
          <HeroButton href="/shop" direction="right" size="lg">
            Shop All Verified Peptides
          </HeroButton>
        </div>
      </section>
    </div>
  )
}
