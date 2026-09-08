'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  X, 
  Loader2, 
  ArrowRight, 
  CornerDownLeft, 
  ShieldCheck, 
  FlaskConical, 
  Dna, 
  FileCheck2, 
  CheckCircle2, 
  Layers, 
  TrendingUp,
  ChevronRight,
  Flame
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { useLenis } from 'lenis/react'

export interface QuickCategory {
  id: string | number
  name: string
  slug?: string
}

export interface SearchProduct {
  id: string | number
  name: string
  slug: string
  description?: string
  price: number
  salePrice?: number | null
  imageUrl?: string | null
  categories?: string
  categoryList?: Array<{ id: string | number; name: string; slug?: string }>
  descriptor?: string
  coaPurity?: number | null
  coaBatchNumber?: string | null
  stock?: number
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  categories?: QuickCategory[]
}

const TRENDING_SEARCHES = [
  'BPC-157',
  'GHK-Cu',
  'NAD+',
  'Epithalon',
  'Retatrutide',
  'Glutathione',
]

const DEFAULT_VERACUE_VIAL = '/veracue-images/veracue-research-grade-50mg-studio-portrait.png'
const VERACUE_FLATLAY = '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp'

export function SearchOverlay({ isOpen, onClose, categories = [] }: SearchOverlayProps) {
  const t = useTranslations('searchOverlay')
  const router = useRouter()
  const lenis = useLenis()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsContainerRef = useRef<HTMLDivElement>(null)

  // Lock background scroll and pause Lenis while search modal is open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = 'unset'
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, lenis])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery('')
      setResults([])
      setSelectedCategory('all')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsLoading(false)
      setSelectedIndex(0)
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data: SearchProduct[] = await res.json()
          setResults(data)
          setSelectedIndex(0)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }, 250) // 250ms debounce for quick responsiveness

    return () => clearTimeout(timeoutId)
  }, [query])

  // Filter results by selected category tab
  const filteredResults = useMemo(() => {
    if (selectedCategory === 'all') return results
    return results.filter((item) => {
      if (!item.categories) return false
      return item.categories.toLowerCase().includes(selectedCategory.toLowerCase())
    })
  }, [results, selectedCategory])

  // Active product for live inspector
  const activeProduct = useMemo(() => {
    if (filteredResults.length > 0) {
      return filteredResults[selectedIndex] || filteredResults[0]
    }
    return null
  }, [filteredResults, selectedIndex])

  // Navigate to product
  const handleSelectProduct = useCallback((product: SearchProduct) => {
    onClose()
    router.push(`/product/${product.slug}`)
  }, [onClose, router])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (filteredResults.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (activeProduct) {
          handleSelectProduct(activeProduct)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, activeProduct, handleSelectProduct, onClose])

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector<HTMLElement>(`[data-result-index="${selectedIndex}"]`)
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [selectedIndex])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 pointer-events-auto">
          {/* Deep Frosted Luxury Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0c0d0a]/65 backdrop-blur-md"
          />

          {/* Floating Command Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            className="relative z-10 w-full max-w-5xl bg-[#f0efeb] text-[#20221c] rounded-2xl sm:rounded-3xl border border-[#20221c]/15 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col h-[88vh] max-h-[88vh] sm:h-[82vh] sm:max-h-[82vh]"
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-[#20221c]/10 bg-[#f0efeb] relative z-20 shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#20221c]/5 text-[#20221c] shrink-0 border border-[#20221c]/10">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#a5a58d]" />
                ) : (
                  <Search className="w-5 h-5 text-[#20221c]/70" strokeWidth={2} />
                )}
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder={t('placeholder') || 'Search compounds, HPLC purity, CAS, or categories...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-lg sm:text-2xl font-light text-[#20221c] placeholder:text-[#20221c]/35 focus:outline-none tracking-tight"
              />

              {/* Clear Query Button */}
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setResults([])
                    inputRef.current?.focus()
                  }}
                  className="p-1.5 rounded-full hover:bg-[#20221c]/10 text-[#20221c]/50 hover:text-[#20221c] transition-colors"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Keyboard Shortcuts Hint */}
              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#20221c]/50">
                <span className="px-2 py-0.5 rounded-md bg-[#20221c]/5 border border-[#20221c]/10">ESC</span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-[#20221c]/5 hover:bg-[#20221c] text-[#20221c] hover:text-[#f0efeb] transition-all shrink-0 ml-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Category Filter Pills (when query or categories exist) */}
            {categories.length > 0 && (
              <div 
                data-lenis-prevent="true"
                className="px-4 sm:px-6 py-2.5 border-b border-[#20221c]/10 bg-[#e9e8e2]/60 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0"
              >
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-[#20221c] text-[#f0efeb] shadow-sm'
                      : 'bg-[#20221c]/5 text-[#20221c]/70 hover:bg-[#20221c]/10 hover:text-[#20221c]'
                  }`}
                >
                  All Syntheses
                </button>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? 'all' : cat.name)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                      selectedCategory === cat.name
                        ? 'bg-[#20221c] text-[#f0efeb] shadow-sm'
                        : 'bg-[#20221c]/5 text-[#20221c]/70 hover:bg-[#20221c]/10 hover:text-[#20221c]'
                    }`}
                  >
                    {getCategoryDisplayName(cat.name)}
                  </button>
                ))}
              </div>
            )}

            {/* Split-Screen Body */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden"
            >
              {/* Left Pane: Results or Discovery Stream */}
              <div 
                ref={resultsContainerRef}
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="flex-1 min-h-0 h-full p-4 sm:p-6 overflow-y-auto overscroll-contain border-b md:border-b-0 md:border-r border-[#20221c]/10 space-y-4 search-scrollbar"
              >
                {/* Empty State: Trending Syntheses & Laboratory Categories */}
                {!query && (
                  <div className="space-y-6 py-2">
                    {/* Trending Searches */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-3.5 h-3.5 text-[#cb997e]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#20221c]/50">
                          Trending Research Inquiries
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setQuery(item)
                              inputRef.current?.focus()
                            }}
                            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#20221c]/5 hover:bg-[#20221c] text-xs font-medium text-[#20221c] hover:text-[#f0efeb] border border-[#20221c]/10 transition-all cursor-pointer"
                          >
                            <TrendingUp className="w-3 h-3 text-[#a5a58d] group-hover:text-[#f0efeb]" />
                            <span>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Category Directory */}
                    {categories.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Layers className="w-3.5 h-3.5 text-[#a5a58d]" />
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#20221c]/50">
                            {t('quickCategories') || 'Research Focus Categories'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {categories.slice(0, 6).map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/shop?category=${encodeURIComponent(cat.name)}`}
                              onClick={onClose}
                              className="group flex items-center justify-between p-3 rounded-xl bg-white/60 hover:bg-white border border-[#20221c]/10 hover:border-[#20221c]/25 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-[#a5a58d]/20 flex items-center justify-center text-[#20221c] shrink-0 group-hover:bg-[#20221c] group-hover:text-[#f0efeb] transition-colors">
                                  <Dna className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-[#20221c] truncate">
                                  {getCategoryDisplayName(cat.name)}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#20221c]/30 group-hover:text-[#20221c] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Laboratory Assurance Banner */}
                    <div className="p-3.5 rounded-xl bg-[#20221c]/5 border border-[#20221c]/10 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#a5a58d] shrink-0" />
                      <div className="text-[11px] leading-relaxed text-[#20221c]/70">
                        <strong className="text-[#20221c] font-semibold">Verified ≥99% HPLC Purity:</strong> Every Veracue batch includes an authentic third-party Certificate of Analysis.
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading Indicator */}
                {query && isLoading && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-[#20221c]/50 gap-3">
                    <Loader2 className="w-7 h-7 animate-spin text-[#a5a58d]" />
                    <span className="text-xs uppercase tracking-widest font-mono">Querying Veracue Compound Database...</span>
                  </div>
                )}

                {/* Zero Results State */}
                {query && !isLoading && filteredResults.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#20221c]/5 flex items-center justify-center text-[#20221c]/40 mb-3">
                      <FlaskConical className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#20221c] mb-1">
                      {t('noResults') || 'No Research Syntheses Found'}
                    </p>
                    <p className="text-xs text-[#20221c]/60 max-w-sm mb-4">
                      No compounds matched &ldquo;{query}&rdquo;. Check spelling or explore our full research catalog.
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="px-4 py-2 rounded-full bg-[#20221c] text-[#f0efeb] text-xs font-bold uppercase tracking-wider hover:bg-[#34372e] transition-colors"
                    >
                      Browse All Formulations
                    </Link>
                  </div>
                )}

                {/* Active Results List */}
                {filteredResults.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#20221c]/50">
                      <span>{filteredResults.length} Syntheses Found</span>
                      <span className="hidden sm:inline font-mono font-normal">Use ↑ ↓ to navigate</span>
                    </div>

                    <div className="space-y-2">
                      {filteredResults.map((product, idx) => {
                        const isSelected = idx === selectedIndex
                        const displayPrice = product.salePrice ?? product.price
                        const purityTag = product.coaPurity ? `${product.coaPurity}% HPLC` : '≥99% HPLC'

                        return (
                          <div
                            key={product.id}
                            data-result-index={idx}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            onClick={() => handleSelectProduct(product)}
                            className={`group relative flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white border-2 border-[#20221c] shadow-md -translate-y-0.5'
                                : 'bg-white/65 hover:bg-white border border-[#20221c]/10'
                            }`}
                          >
                            {/* Product Thumbnail */}
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#f0efeb] shrink-0 border border-[#20221c]/10 flex items-center justify-center">
                              <Image
                                src={product.imageUrl || DEFAULT_VERACUE_VIAL}
                                alt={product.name}
                                fill
                                sizes="64px"
                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-xs sm:text-sm font-bold text-[#20221c] uppercase tracking-wider truncate">
                                  {product.name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full bg-[#a5a58d]/25 text-[#20221c] text-[10px] font-mono font-semibold shrink-0">
                                  {purityTag}
                                </span>
                              </div>

                              <p className="text-[11px] text-[#20221c]/60 truncate">
                                {product.descriptor || 'Lyophilized Research Compound'}
                              </p>

                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs font-bold text-[#20221c] font-mono">
                                  ${displayPrice.toFixed(2)}
                                </span>
                                {product.salePrice && (
                                  <span className="text-[10px] text-[#20221c]/40 line-through font-mono">
                                    ${product.price.toFixed(2)}
                                  </span>
                                )}
                                <span className="text-[10px] text-[#588157] font-medium flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#588157] inline-block" />
                                  In Stock
                                </span>
                              </div>
                            </div>

                            {/* Selection Indicator */}
                            <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#20221c]/5 group-hover:bg-[#20221c] group-hover:text-[#f0efeb] text-[#20221c] transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Pane: Live Compound Inspector & Quality Showcase (Desktop/Tablet) */}
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                className="hidden md:flex flex-col w-[42%] min-h-0 h-full bg-[#e9e8e2]/70 p-5 sm:p-6 justify-between overflow-y-auto overscroll-contain search-scrollbar shrink-0"
              >
                {activeProduct ? (
                  /* Active Compound Live Inspector */
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Badge & Purity */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-[#20221c] text-[#f0efeb] text-[10px] font-bold uppercase tracking-[0.15em]">
                          Live Inspector
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-[#588157]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>RP-HPLC Tested</span>
                        </div>
                      </div>

                      {/* Vial Preview Card */}
                      <div className="relative w-full h-44 rounded-2xl bg-white border border-[#20221c]/10 overflow-hidden shadow-sm flex items-center justify-center p-3">
                        <Image
                          src={activeProduct.imageUrl || DEFAULT_VERACUE_VIAL}
                          alt={activeProduct.name}
                          fill
                          sizes="(max-width: 1024px) 30vw, 400px"
                          className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Overview */}
                      <div>
                        <h3 className="text-base font-bold text-[#20221c] uppercase tracking-wider leading-snug">
                          {activeProduct.name}
                        </h3>
                        <p className="text-xs text-[#20221c]/65 mt-1 line-clamp-2">
                          {activeProduct.description || activeProduct.descriptor || 'High-grade laboratory research peptide synthesized under strict analytical standards.'}
                        </p>
                      </div>

                      {/* Analytical Spec Grid */}
                      <div className="bg-white/80 rounded-xl p-3 border border-[#20221c]/10 space-y-2 text-[11px]">
                        <div className="flex justify-between py-0.5 border-b border-[#20221c]/5">
                          <span className="text-[#20221c]/60">Purity Rating</span>
                          <span className="font-mono font-bold text-[#20221c]">
                            {activeProduct.coaPurity ? `${activeProduct.coaPurity}%` : '≥99.0%'} (HPLC)
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5 border-b border-[#20221c]/5">
                          <span className="text-[#20221c]/60">Batch Reference</span>
                          <span className="font-mono font-semibold text-[#20221c]">
                            {activeProduct.coaBatchNumber || 'VER-2026-HQ'}
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5 border-b border-[#20221c]/5">
                          <span className="text-[#20221c]/60">Format</span>
                          <span className="text-[#20221c] font-medium">Lyophilized Solid Cake</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-[#20221c]/60">Recommended Storage</span>
                          <span className="text-[#20221c] font-medium">-20°C Cryo Storage</span>
                        </div>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => handleSelectProduct(activeProduct)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#20221c] hover:bg-[#34372e] text-[#f0efeb] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                      >
                        <span>Inspect Compound (${(activeProduct.salePrice ?? activeProduct.price).toFixed(2)})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href="/certificates"
                        onClick={onClose}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-white/70 hover:bg-white border border-[#20221c]/10 text-[#20221c] text-xs font-medium transition-colors"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#a5a58d]" />
                        <span>Verify Certificate of Analysis</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Empty State Veracue Quality Showcase */
                  <div className="flex flex-col h-full justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-[#20221c] text-[#f0efeb] text-[10px] font-bold uppercase tracking-[0.15em]">
                          Analytical Standard
                        </span>
                        <span className="text-[10px] font-mono text-[#20221c]/50">ISO 17025 Compliant</span>
                      </div>

                      <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#20221c]/10 shadow-sm">
                        <Image
                          src={VERACUE_FLATLAY}
                          alt="Veracue Research Grade Peptide Collection"
                          fill
                          sizes="(max-width: 1024px) 30vw, 400px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#f0efeb]/80">Synthesis Integrity</p>
                          <h4 className="text-sm font-serif font-bold text-white leading-tight">Zero Degradation Packaging</h4>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#20221c]">
                          Third-Party Laboratory Assurance
                        </h4>
                        <p className="text-xs text-[#20221c]/70 leading-relaxed">
                          All Veracue research compounds undergo rigorous RP-HPLC and mass spectrometry testing to guarantee ≥99.0% purity before release.
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/certificates"
                      onClick={onClose}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-white/90 border border-[#20221c]/15 text-[#20221c] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-[#a5a58d]" />
                      <span>COA Batch Verification Portal</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Command Bar */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-[#20221c]/10 bg-[#e9e8e2]/90 flex items-center justify-between text-[11px] text-[#20221c]/60 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CornerDownLeft className="w-3 h-3 text-[#20221c]/40" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">Select Compound</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider">↑ ↓ Cycle</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-[#20221c]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a5a58d]" />
                <span>Veracue Peptides • ≥99% HPLC Verified Research Grade</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
