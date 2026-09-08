'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { FilterSidebar } from '@/components/shop/FilterSidebar'
import { ProductCard } from '@/components/shared/ProductCard'
import { Product } from '@/components/shop/PrimaryProductCard' // Re-use interface for now
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import { X, Filter, Search, ShieldCheck, FlaskConical, Award, ArrowRight, Flag, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { FluidButton } from '@/components/ui/fluid-button'
import { Category } from '@/components/shop/FilterSidebar'
import { getShopProducts } from '@/app/(frontend)/(shop)/actions'
import { useTranslations } from 'next-intl'

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
];

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
  const lastScrollYRef = React.useRef(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== 'undefined') {
      const currentScrollY = latest
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        if (!isScrollingDown) setIsScrollingDown(true)
      } else if (currentScrollY < lastScrollYRef.current) {
        if (isScrollingDown) setIsScrollingDown(false)
      }
      lastScrollYRef.current = currentScrollY
    }
  })
  
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(loadMoreRef, { margin: "400px" })

  const categoriesScrollRef = React.useRef<HTMLDivElement>(null)
  const isCategoriesInView = useInView(categoriesScrollRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isCategoriesInView) {
      const timer = setTimeout(() => {
        if (categoriesScrollRef.current) {
          if (categoriesScrollRef.current.scrollWidth > categoriesScrollRef.current.clientWidth) {
            categoriesScrollRef.current.scrollTo({ left: 40, behavior: 'smooth' })
            setTimeout(() => {
              if (categoriesScrollRef.current) {
                categoriesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
              }
            }, 350)
          }
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isCategoriesInView])

  // Filter update trigger
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
        minPrice: minP ? parseInt(minP) : undefined,
        maxPrice: maxP ? parseInt(maxP) : undefined,
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

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return;
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
      minPrice: minP ? parseInt(minP) : undefined,
      maxPrice: maxP ? parseInt(maxP) : undefined,
      sort: searchParams.get('sort') || undefined,
    })

    if (res.success && res.products) {
      setProducts(prev => {
        const newProducts = (res.products as Product[]).filter(np => !prev.some(p => p.id === np.id))
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
    if (isInView && hasMore && !isLoadingMore) {
      handleLoadMore()
    }
  }, [isInView, hasMore, isLoadingMore, currentPage, searchParams])

  const getActiveChips = () => {
    const chips: { key: string, label: string, value: string }[] = []
    searchParams.getAll('category').forEach(cat => chips.push({ key: `category-${cat}`, label: cat, value: cat }))
    if (searchParams.get('inStock') === 'true') chips.push({ key: 'inStock', label: t('inStock'), value: 'true' })
    if (searchParams.get('onSale') === 'true') chips.push({ key: 'onSale', label: t('onSale'), value: 'true' })
    return chips
  }

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (key.startsWith('category-')) {
      const currentCats = params.getAll('category').filter(c => c !== value)
      params.delete('category')
      currentCats.forEach(c => params.append('category', c))
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const activeChips = getActiveChips()

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen font-sans">
      
      {/* Editorial Grid Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-32 sm:pt-36 md:pt-44 pb-8 mx-auto max-w-[1920px]">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-ink uppercase tracking-tighter leading-[0.9] mb-2 sm:mb-4">
              Shop Research Peptides
            </h1>
            <p className="text-ink/50 text-sm md:text-base tracking-wide font-medium">
              Browse Helix Bio&apos;s full catalog of research-use-only peptides. Every batch is third-party tested for purity, shipped from the USA, and backed by a certificate of analysis you can review before you order.
            </p>
          </div>
        </div>

        {/* Banner Row */}
        <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-4 sm:mb-6 shadow-2xl group cursor-pointer bg-zinc-900">
          <Image
            src="/HelixBio Images/mutiple-vial-1.webp"
            alt="Helix Bio research peptide vials with certificate of analysis, USA laboratory supply"
            fill
            className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Frosted Info Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-4 sm:p-6 flex items-center justify-between transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex flex-col gap-2">
               <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max">
                 NEW BATCHES
               </span>
               <h3 className="text-white text-lg sm:text-2xl font-bold tracking-tight">
                 Leaders in high-purity synthesis
               </h3>
               <p className="text-white/60 text-[10px] sm:text-sm font-medium line-clamp-1">
                 Our products: research peptides, amino acids, and laboratory compounds.
               </p>
            </div>
            <button className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 flex items-end justify-between hover:shadow-lg transition-all duration-300 cursor-default border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-black text-ink font-heading tracking-tighter">
                99%
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-ink/50 uppercase tracking-widest mt-1">
                PURITY GUARANTEE
              </span>
            </div>
            <button className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center mb-1 hover:bg-primary transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 flex justify-between relative hover:shadow-lg transition-all duration-300 cursor-default border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
            <div className="flex flex-col justify-end h-full">
              <span className="text-4xl sm:text-5xl font-black text-ink font-heading tracking-tighter">
                30K+
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-ink/50 uppercase tracking-widest mt-1">
                VIALS SHIPPED TO U.S. LABS
              </span>
            </div>
            <span className="absolute top-6 right-6 border border-ink/10 text-ink/60 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-ink/5">
              RELIABLE
            </span>
          </div>

          <div className="bg-ink rounded-[1.5rem] p-6 sm:p-8 flex items-end relative hover:bg-black transition-all duration-300 cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-black text-white font-heading tracking-tighter">
                100%
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest mt-1">
                BATCHES COA-VERIFIED
              </span>
            </div>
          </div>
        </div>
      </div>

      <Container size="page" className="pb-12" id="products-grid">
        {/* Modern Minimal Category Pills */}
        <div className={`flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 py-4 sticky z-40 transition-all duration-300 ${isScrollingDown ? 'top-4 sm:top-6 opacity-100 translate-y-0' : 'top-[130px] sm:top-[140px] md:top-[150px] opacity-100 translate-y-0'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full bg-white/95 backdrop-blur-3xl rounded-2xl p-2 sm:p-3 border border-black/5 shadow-[0_4px_25px_rgb(0,0,0,0.04)] gap-2 sm:gap-0">
            
            {/* Scrollable Categories */}
            <div className="relative w-full sm:flex-1">
              {/* Fade Indicator for scroll */}
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 rounded-r-xl" />
              
              <div ref={categoriesScrollRef} className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2 px-1 relative z-0 pb-1 sm:pb-0">
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.delete('category')
                    router.push(`${pathname}?${params.toString()}`, { scroll: false })
                  }}
                  className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
                    activeChips.filter(c => c.key.startsWith('category-')).length === 0 
                      ? 'bg-ink text-white shadow-md' 
                      : 'bg-transparent text-ink/60 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  ALL
                </button>
                
                {categories.map((cat) => {
                  const isActive = activeChips.some(c => c.value === cat.slug)
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.delete('category')
                        if (!isActive) {
                          params.set('category', cat.slug)
                        }
                        router.push(`${pathname}?${params.toString()}`, { scroll: false })
                      }}
                      className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${
                        isActive 
                          ? 'bg-primary text-white shadow-[0_4px_15px_rgba(14,165,233,0.3)]' 
                          : 'bg-transparent text-ink/60 hover:bg-ink/5 hover:text-ink'
                      }`}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-ink/10 mx-2 sm:mx-4 shrink-0" />

            <div className="w-full sm:w-auto border-t border-ink/5 pt-2 sm:pt-0 sm:border-0 px-1 sm:px-0">
              <Select 
                defaultValue={searchParams.get('sort') || 'newest'}
                onValueChange={(val) => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('sort', val)
                  router.push(`${pathname}?${params.toString()}`, { scroll: false })
                }}
              >
                <SelectTrigger className="w-full sm:w-auto min-w-0 sm:min-w-[140px] bg-transparent border-0 focus:ring-0 shadow-none hover:bg-ink/5 rounded-xl px-2 sm:px-4 h-10 text-[10px] md:text-xs font-semibold uppercase tracking-widest text-ink gap-2 transition-all shrink">
                  <SelectValue placeholder={t('sortByPlaceholder')} />
                </SelectTrigger>
                <SelectContent align="end" className="bg-white/95 backdrop-blur-3xl border-ink/10 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] p-2 min-w-[180px] sm:min-w-[200px] w-[90vw] max-w-[280px] sm:w-auto sm:max-w-none">
                <SelectItem value="newest" className="rounded-xl cursor-pointer text-[10px] sm:text-xs uppercase tracking-widest font-bold focus:bg-primary/5 focus:text-primary py-3 px-4 transition-colors">{t('sortNewest')}</SelectItem>
                <SelectItem value="price-asc" className="rounded-xl cursor-pointer text-[10px] sm:text-xs uppercase tracking-widest font-bold focus:bg-primary/5 focus:text-primary py-3 px-4 transition-colors">{t('sortPriceAsc')}</SelectItem>
                <SelectItem value="price-desc" className="rounded-xl cursor-pointer text-[10px] sm:text-xs uppercase tracking-widest font-bold focus:bg-primary/5 focus:text-primary py-3 px-4 transition-colors">{t('sortPriceDesc')}</SelectItem>
                <SelectItem value="name-asc" className="rounded-xl cursor-pointer text-[10px] sm:text-xs uppercase tracking-widest font-bold focus:bg-primary/5 focus:text-primary py-3 px-4 transition-colors">{t('sortNameAsc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Chips Row removed as requested */}
      </div>

      {/* Results Area */}
        {products.length > 0 ? (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
              {products.map((product, index) => (
                <motion.div 
                  key={product.slug} 
                  className="flex h-full w-full"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 12) * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Infinite Scroll Trigger & Loader */}
            {hasMore && (
              <div ref={loadMoreRef} className="w-full flex justify-center pt-24 pb-12">
                {isLoadingMore ? (
                  <div className="flex flex-col items-center gap-4">
                    <Spinner className="w-8 h-8 text-ink" />
                    <span className="text-[10px] sm:text-xs font-bold text-ink/50 uppercase tracking-widest">{t('loadingMore')}</span>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={handleLoadMore}
                    className="border-gray-200 text-gray-500 hover:text-ink hover:border-ink px-8 py-6 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs"
                  >
                    Load More
                  </Button>
                )}
              </div>
            )}
            {!hasMore && (
              <div className="w-full text-center pt-24 pb-12 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink/30">
                {t('reachedEndOfCatalog')}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Search}
            title={t('noProductsFound')}
            description={t('noProductsFoundDescription')}
            action={
              <FluidButton
                onClick={() => router.push('/shop')}
                text={t('clearAllFilters')}
                variant="dark"
              />
            }
          />
        )}
      </Container>
      <div className="-mt-16">
        <SharedFaqSection
          title={t('faqTitle')}
          description={t('faqDescription')}
          faqs={shopFaqs}
        />
      </div>
    </div>
  )
}

export function ShopClient(props: ShopClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream w-full" />}>
      <ShopClientInner {...props} />
    </Suspense>
  )
}
