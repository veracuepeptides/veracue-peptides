'use client'

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ShopHero } from '@/components/shop/ShopHero'
import { ProductCard } from '@/components/shared/ProductCard'
import { Product } from '@/components/shop/PrimaryProductCard'
import { motion, useInView, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ShieldCheck,
  Snowflake,
  FileCheck2,
  Truck,
  RotateCcw,
  Check,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { Category } from '@/components/shop/FilterSidebar'
import { getShopProducts } from '@/app/(frontend)/(shop)/actions'
import { useTranslations } from 'next-intl'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'

const SHOP_FAQ_KEYS = [
  'availablePeptides',
  'purityQualityTested',
  'standardPurityLevels',
  'interpretCoa',
  'customSynthesis',
  'storageInstructions',
  'reconstitution',
  'shelfLife',
  'shippingDamage',
  'aliquotAfterReconstitution',
  'orderDocumentation',
  'orderQuantities',
  'coaBeforeOrdering',
  'findSpecificPeptides',
  'productPageInfo',
  'manufacturedInUsa',
  'researchUseOnlyMeaning',
  'specialHandling',
  'nonResearchUse',
  'fdaApproval',
]

interface ShopClientProps {
  initialProducts: Product[]
  totalPages: number
  categories: Category[]
}

function ShopClientInner({ initialProducts, totalPages, categories }: ShopClientProps) {
  const t = useTranslations('shop.shopClient')
  const shopFaqs = SHOP_FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }))

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(totalPages > 1)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false)
  const lastScrollYRef = useRef(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (typeof window !== 'undefined') {
      const currentScrollY = latest
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 120) {
        if (!isScrollingDown) setIsScrollingDown(true)
      } else if (currentScrollY < lastScrollYRef.current) {
        if (isScrollingDown) setIsScrollingDown(false)
      }
      lastScrollYRef.current = currentScrollY
    }
  })

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(loadMoreRef, { margin: '400px' })
  const categoriesScrollRef = useRef<HTMLDivElement>(null)

  // Fetch filtered products whenever search params change
  useEffect(() => {
    const fetchFiltered = async () => {
      const categoriesParam = searchParams.getAll('category')
      const minP = searchParams.get('minPrice')
      const maxP = searchParams.get('maxPrice')

      const res = await getShopProducts({
        page: 1,
        categories: categoriesParam.length > 0 ? categoriesParam : undefined,
        inStock: searchParams.get('inStock') === 'true',
        onSale: searchParams.get('onSale') === 'true',
        minPrice: minP ? parseInt(minP, 10) : undefined,
        maxPrice: maxP ? parseInt(maxP, 10) : undefined,
        sort: searchParams.get('sort') || undefined,
      })

      if (res.success) {
        setProducts(res.products as Product[])
        setCurrentPage(1)
        setHasMore(res.hasNextPage || false)
      }
    }
    fetchFiltered()
  }, [searchParams])

  // Load more pages
  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return
    setIsLoadingMore(true)
    const nextPage = currentPage + 1
    const categoriesParam = searchParams.getAll('category')
    const minP = searchParams.get('minPrice')
    const maxP = searchParams.get('maxPrice')

    const res = await getShopProducts({
      page: nextPage,
      categories: categoriesParam.length > 0 ? categoriesParam : undefined,
      inStock: searchParams.get('inStock') === 'true',
      onSale: searchParams.get('onSale') === 'true',
      minPrice: minP ? parseInt(minP, 10) : undefined,
      maxPrice: maxP ? parseInt(maxP, 10) : undefined,
      sort: searchParams.get('sort') || undefined,
    })

    if (res.success && res.products) {
      setProducts((prev) => {
        const newProducts = (res.products as Product[]).filter((np) => !prev.some((p) => p.id === np.id))
        return [...prev, ...newProducts]
      })
      setCurrentPage(nextPage)
      setHasMore(res.hasNextPage || false)
    } else {
      setHasMore(false)
    }
    setIsLoadingMore(false)
  }

  // Infinite scroll trigger
  useEffect(() => {
    if (isInView && hasMore && !isLoadingMore && !searchQuery.trim()) {
      handleLoadMore()
    }
  }, [isInView, hasMore, isLoadingMore, currentPage, searchParams, searchQuery])

  // Client-side search filtering over loaded products
  const displayProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    const q = searchQuery.toLowerCase().trim()
    return products.filter((p: any) => {
      const name = (p.name || '').toLowerCase()
      const desc = (p.shortDescription || p.description || '').toLowerCase()
      const sku = (p.sku || p.slug || '').toLowerCase()
      return name.includes(q) || desc.includes(q) || sku.includes(q)
    })
  }, [products, searchQuery])

  // Active filter helper
  const activeCategories = searchParams.getAll('category')
  const isInStockActive = searchParams.get('inStock') === 'true'
  const isOnSaleActive = searchParams.get('onSale') === 'true'
  const currentSort = searchParams.get('sort') || 'newest'

  const activeFiltersCount =
    activeCategories.length +
    (isInStockActive ? 1 : 0) +
    (isOnSaleActive ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  const toggleCategoryFilter = (catIdentifier: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const existing = params.getAll('category')
    if (existing.includes(catIdentifier)) {
      params.delete('category')
      existing.filter((c) => c !== catIdentifier).forEach((c) => params.append('category', c))
    } else {
      params.delete('category')
      params.append('category', catIdentifier)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearAllCategories = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleStockFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (isInStockActive) {
      params.delete('inStock')
    } else {
      params.set('inStock', 'true')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleSaleFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (isOnSaleActive) {
      params.delete('onSale')
    } else {
      params.set('onSale', 'true')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const resetAllFilters = () => {
    setSearchQuery('')
    router.push(pathname, { scroll: false })
  }

  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full text-[#20221c] min-h-screen font-sans">
      {/* 1. Hero Section matching Homepage architecture */}
      <ShopHero />

      {/* 2. Catalog Anchor & Main Browser Section */}
      <div id="catalog-browser" className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        
        {/* Sticky Controls & Filter Capsule */}
        <div
          className={`sticky z-30 transition-all duration-300 mb-6 sm:mb-8 ${
            isScrollingDown
              ? 'top-3 sm:top-5'
              : 'top-[76px] sm:top-[88px] md:top-[100px]'
          }`}
        >
          <div className="bg-[#f0efeb]/90 backdrop-blur-2xl border border-[#eddcd2] rounded-2xl sm:rounded-[22px] p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(32,34,28,0.06)] flex flex-col gap-2">
            
            {/* Top Row: Categories Strip + Search & Sort */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-3">
              
              {/* Horizontal Scrollable Category Pills */}
              <div className="relative flex-1 min-w-0 overflow-hidden">
                {/* Left Fade Edge */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#f0efeb] to-transparent pointer-events-none z-10 hidden sm:block" />
                {/* Right Fade Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#f0efeb] to-transparent pointer-events-none z-10" />

                <div
                  ref={categoriesScrollRef}
                  className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 sm:gap-2 px-1 py-1"
                >
                  <button
                    onClick={clearAllCategories}
                    className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                      activeCategories.length === 0
                        ? 'bg-[#20221c] text-[#fff1e6] shadow-sm'
                        : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 border border-[#eddcd2]/70'
                    }`}
                  >
                    All Peptides
                  </button>

                  {categories.map((cat) => {
                    const isActive =
                      activeCategories.includes(cat.name) ||
                      (cat.slug && activeCategories.includes(cat.slug))
                    const displayName = getCategoryDisplayName(cat.name)

                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategoryFilter(cat.name)}
                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#20221c] text-[#fff1e6] shadow-sm'
                            : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 border border-[#eddcd2]/70'
                        }`}
                      >
                        {displayName}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Controls Group: Search, Quick Filters & Sort */}
              <div className="flex items-center gap-2 shrink-0 pt-1 md:pt-0 border-t border-[#eddcd2]/50 md:border-t-0 px-1">
                
                {/* Live Search Input */}
                <div className="relative flex-1 sm:w-48 md:w-56 lg:w-64">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search compounds..."
                    className="w-full pl-9 pr-7 py-2 sm:py-2.5 text-xs sm:text-[13px] bg-white/90 focus:bg-white border border-[#eddcd2] rounded-full text-[#20221c] placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800 p-0.5 rounded-full"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Filter Drawer / Quick Toggle Button */}
                <button
                  onClick={() => setShowFiltersDrawer((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer border ${
                    showFiltersDrawer || activeFiltersCount > 0
                      ? 'bg-[#20221c] text-[#fff1e6] border-[#20221c]'
                      : 'bg-white/90 hover:bg-white text-neutral-700 border-[#eddcd2]'
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#cb997e] text-white text-[10px] flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <Select
                  defaultValue={currentSort}
                  onValueChange={(val) => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('sort', val)
                    router.push(`${pathname}?${params.toString()}`, { scroll: false })
                  }}
                >
                  <SelectTrigger className="w-auto min-w-[125px] sm:min-w-[145px] bg-white/90 hover:bg-white border border-[#eddcd2] rounded-full px-3 sm:px-4 h-9 sm:h-10 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#20221c] gap-2 transition-all">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent
                    align="end"
                    className="bg-[#f0efeb] border border-[#eddcd2] rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] p-1.5 min-w-[180px] z-50"
                  >
                    <SelectItem value="newest" className="rounded-xl cursor-pointer text-xs uppercase tracking-wider font-semibold focus:bg-[#eddcd2]/60 focus:text-neutral-900 py-2.5 px-3">
                      Newest Arrivals
                    </SelectItem>
                    <SelectItem value="price-asc" className="rounded-xl cursor-pointer text-xs uppercase tracking-wider font-semibold focus:bg-[#eddcd2]/60 focus:text-neutral-900 py-2.5 px-3">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc" className="rounded-xl cursor-pointer text-xs uppercase tracking-wider font-semibold focus:bg-[#eddcd2]/60 focus:text-neutral-900 py-2.5 px-3">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name-asc" className="rounded-xl cursor-pointer text-xs uppercase tracking-wider font-semibold focus:bg-[#eddcd2]/60 focus:text-neutral-900 py-2.5 px-3">
                      Alphabetical A-Z
                    </SelectItem>
                  </SelectContent>
                </Select>

              </div>
            </div>

            {/* Expandable Filter Row (Stock & Sale Toggles) */}
            <AnimatePresence>
              {showFiltersDrawer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden border-t border-[#eddcd2]/70 pt-2 px-1"
                >
                  <div className="flex flex-wrap items-center gap-2 py-1">
                    <span className="text-xs font-mono uppercase text-neutral-500 mr-1 tracking-wider">
                      Quick Filters:
                    </span>

                    {/* In Stock Pill */}
                    <button
                      onClick={toggleStockFilter}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                        isInStockActive
                          ? 'bg-[#6B8E5E] text-white border-[#6B8E5E]'
                          : 'bg-white text-neutral-700 border-[#eddcd2] hover:border-neutral-400'
                      }`}
                    >
                      {isInStockActive && <Check size={12} strokeWidth={3} />}
                      In Stock Only
                    </button>

                    {/* On Sale Pill */}
                    <button
                      onClick={toggleSaleFilter}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                        isOnSaleActive
                          ? 'bg-[#cb997e] text-white border-[#cb997e]'
                          : 'bg-white text-neutral-700 border-[#eddcd2] hover:border-neutral-400'
                      }`}
                    >
                      {isOnSaleActive && <Check size={12} strokeWidth={3} />}
                      On Sale
                    </button>

                    {/* Clear all active filters if count > 0 */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={resetAllFilters}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-medium ml-auto transition-colors cursor-pointer"
                      >
                        <RotateCcw size={12} />
                        Reset All
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Active Chips & Product Count Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1 text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] font-heading font-medium tracking-tight text-neutral-800">
              Showing <strong className="text-neutral-950 font-bold">{displayProducts.length}</strong> Research Compounds
            </span>
            {searchQuery && (
              <span className="text-xs text-neutral-500 font-mono">
                matching &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          {/* Active Chips Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activeCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 bg-[#eddcd2] text-[#20221c] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#ddbea9]"
                >
                  {getCategoryDisplayName(cat)}
                  <button
                    onClick={() => toggleCategoryFilter(cat)}
                    className="hover:text-red-700 ml-0.5 cursor-pointer"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}

              {isInStockActive && (
                <span className="inline-flex items-center gap-1 bg-[#E8EFE3] text-[#6B8E5E] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#6B8E5E]/30">
                  In Stock
                  <button onClick={toggleStockFilter} className="hover:opacity-80 ml-0.5 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              {isOnSaleActive && (
                <span className="inline-flex items-center gap-1 bg-[#fff1e6] text-[#cb997e] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#cb997e]/30">
                  On Sale
                  <button onClick={toggleSaleFilter} className="hover:opacity-80 ml-0.5 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white text-neutral-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#eddcd2]">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-700 ml-0.5 cursor-pointer">
                    <X size={11} />
                  </button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="text-[11px] font-semibold text-[#cb997e] hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* 3. Products Grid Area */}
        {displayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 xl:gap-7">
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product.slug || product.id}
                  className="flex h-full w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (index % 8) * 0.04,
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Infinite Scroll Trigger & Load More */}
            {hasMore && !searchQuery.trim() && (
              <div ref={loadMoreRef} className="w-full flex justify-center pt-16 sm:pt-20 pb-8">
                {isLoadingMore ? (
                  <div className="flex flex-col items-center gap-3">
                    <Spinner className="w-7 h-7 text-[#20221c]" />
                    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
                      Loading Additional Compounds...
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="border-[#20221c]/30 hover:border-[#cb997e] hover:bg-[#cb997e] hover:text-white px-8 py-5 rounded-full font-heading text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xs cursor-pointer"
                  >
                    Load More Peptides
                  </Button>
                )}
              </div>
            )}

            {!hasMore && !searchQuery.trim() && (
              <div className="w-full text-center pt-16 sm:pt-20 pb-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
                — End of Catalog ({products.length} Compounds Total) —
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/80 border border-[#eddcd2] rounded-3xl p-8 sm:p-14 text-center my-8 shadow-xs">
            <EmptyState
              icon={Search}
              title="No Research Peptides Found"
              description="No peptide compounds match your currently active filters or query. Try resetting your search or clearing selected categories."
              action={
                <Button
                  onClick={resetAllFilters}
                  className="mt-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] rounded-full px-6 py-2.5 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Clear All Filters
                </Button>
              }
            />
          </div>
        )}

        {/* 4. Analytical Quality Assurance Strip */}
        <div className="mt-16 sm:mt-24 mb-12 sm:mb-16 bg-[#b7b7a4]/25 border border-[#b7b7a4]/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="font-serif tracking-[0.2em] text-xs uppercase text-neutral-700 font-normal mb-2">
              Laboratory Assurance
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#20221c] font-heading">
              Veracue Analytical Standards
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Every compound is synthesized to the highest scientific purity levels, strictly designated for analytical evaluation and in vitro cellular research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Standard 1 */}
            <div className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#eddcd2] shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#f0efeb] flex items-center justify-center text-[#20221c] mb-3.5 border border-[#eddcd2]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] mb-1">
                ≥99% HPLC Purity
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Quantitative High-Performance Liquid Chromatography verification on every batch lot.
              </p>
            </div>

            {/* Standard 2 */}
            <div className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#eddcd2] shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#f0efeb] flex items-center justify-center text-[#20221c] mb-3.5 border border-[#eddcd2]">
                <Snowflake size={20} />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] mb-1">
                Cold-Chain Packaged
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Thermal insulated packaging protecting lyophilized cake integrity from temperature fluctuation.
              </p>
            </div>

            {/* Standard 3 */}
            <div className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#eddcd2] shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#f0efeb] flex items-center justify-center text-[#20221c] mb-3.5 border border-[#eddcd2]">
                <FileCheck2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] mb-1">
                Lot-Specific COA
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Independent certificates of analysis documenting mass spectrometry data available with every order.
              </p>
            </div>

            {/* Standard 4 */}
            <div className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#eddcd2] shadow-xs flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-[#f0efeb] flex items-center justify-center text-[#20221c] mb-3.5 border border-[#eddcd2]">
                <Truck size={20} />
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] mb-1">
                Rapid U.S. Dispatch
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Domestic fulfillment from climate-controlled research logistics hubs across the United States.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Shared FAQ Section */}
      <div className="-mt-10 sm:-mt-14 relative z-20">
        <SharedFaqSection
          title={
            <>
              Research<br />Catalog FAQs
            </>
          }
          subtitle="Support & Documentation"
          description="Common technical questions regarding our synthetic peptides, storage, COA verification, and laboratory supply standards."
          faqs={shopFaqs}
        />
      </div>
    </div>
  )
}

export function ShopClient(props: ShopClientProps) {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#f0efeb' }} className="min-h-screen w-full" />}>
      <ShopClientInner {...props} />
    </Suspense>
  )
}
