'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { 
  ShoppingCart, 
  Menu, 
  Search, 
  User, 
  ChevronDown,
  ArrowRight,
  FlaskConical,
  Flame,
  Sparkles,
  Calculator,
  Activity,
  HeartPulse,
  Brain,
  Clock,
  TrendingUp,
  Zap,
  ShieldCheck,
  Building2,
  BookOpen,
  Users,
  HelpCircle,
  Headphones,
  FileCheck,
  ShieldAlert,
  FileText,
  Truck,
  Lock,
  Layers,
  CheckCircle2
} from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { useCartStore } from '@/lib/cart/store'
import { useUiStore } from '@/lib/ui/store'
import { useWishlistStore } from '@/lib/wishlist/store'
import dynamic from 'next/dynamic'
import { SearchOverlay } from './SearchOverlay'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer').then(mod => mod.CartDrawer), { ssr: false })

interface ClientHeaderProps {
  cartItemCount?: number
  wishlistItemCount?: number
  isLoggedIn?: boolean
  categories?: any[]
  initialWishlistItems?: any[]
  initialCartItems?: any[]
}

export function ClientHeader({
  cartItemCount = 0,
  wishlistItemCount = 0,
  isLoggedIn = false,
  categories: initialCategories = [],
  initialWishlistItems = [],
  initialCartItems = []
}: ClientHeaderProps) {
  const pathname = usePathname() || '/'
  const cartStore = useCartStore()
  const setCartItems = useCartStore((state) => state.setItems)
  const setWishlistItems = useWishlistStore((state) => state.setItems)
  const activeCartCount = cartStore.items.reduce((acc: any, i: any) => acc + (i.quantity || 1), 0)
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const setUiMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categoriesData, setCategoriesData] = useState<any[]>(initialCategories)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll reaction
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > 10)
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 6) {
      if (difference > 0 && y > 120) {
        setHidden(true)
      } else if (difference < 0) {
        setHidden(false)
      }
      lastYRef.current = y
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 10)
    }
  }, [])

  useEffect(() => {
    setUiMobileMenuOpen(mobileMenuOpen)
  }, [mobileMenuOpen, setUiMobileMenuOpen])

  useEffect(() => {
    if (initialCategories.length === 0) {
      import('@/app/(frontend)/actions/megaMenu')
        .then(module => module.getMegaMenuData())
        .then(data => {
          setCategoriesData(data || [])
        })
        .catch(() => {})
    } else {
      setCategoriesData(initialCategories)
    }
  }, [initialCategories])

  const cartHydrated = useRef(false)
  const wishlistHydrated = useRef(false)

  // Sync Cart with Backend
  useEffect(() => {
    if (isLoggedIn && !cartHydrated.current) {
      const localItems = cartStore.items
      if (initialCartItems.length > 0) {
        setCartItems(initialCartItems)
      } else if (localItems.length > 0) {
        import('@/app/(frontend)/actions/cart').then(m => m.syncCartToPayload(localItems))
      }
      cartHydrated.current = true
    }
  }, [isLoggedIn, initialCartItems, cartStore.items, setCartItems])

  // Sync Wishlist with Backend
  useEffect(() => {
    if (isLoggedIn && !wishlistHydrated.current) {
      const localItems = useWishlistStore.getState().items
      if (initialWishlistItems.length > 0) {
        setWishlistItems(initialWishlistItems)
      } else if (localItems.length > 0) {
        import('@/app/(frontend)/actions/wishlist').then(m => {
          localItems.forEach(item => m.toggleWishlistInPayload(item.id, true))
        })
      }
      wishlistHydrated.current = true
    }
  }, [isLoggedIn, initialWishlistItems, setWishlistItems])

  // Global Search Shortcut & Custom Event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    const handleOpenSearch = () => setIsSearchOpen(true)
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-search-modal', handleOpenSearch)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-search-modal', handleOpenSearch)
    }
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null)
  }, [pathname])

  const clearCloseTimeout = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
  }

  const handleDropdownEnter = (name: string) => {
    clearCloseTimeout()
    setActiveDropdown(name)
  }

  const handleDropdownLeave = () => {
    clearCloseTimeout()
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
  }

  // Active section detection
  const isShopActive = pathname === '/shop' || pathname.startsWith('/shop/') || pathname.startsWith('/product/')
  const isCollectionsActive = pathname.includes('category=')
  const isPagesActive = ['/about-us', '/blog', '/peptide-calculator', '/faq', '/contact-us'].some(p => pathname.startsWith(p))
  const isFeaturesActive = ['/certificates', '/affiliates', '/shipping-policy', '/refund-policy', '/terms-and-conditions', '/medical-disclaimer', '/privacy-policy'].some(p => pathname.startsWith(p))

  const displayCartCount = activeCartCount > 0 ? activeCartCount : 1

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 inset-x-0 z-50 px-2 sm:px-6 md:px-10 w-full mx-auto pointer-events-none transition-transform duration-300">
        <motion.div
          variants={{
            visible: { y: 0, opacity: 1 },
            hidden: { y: -80, opacity: 0 }
          }}
          initial="visible"
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="w-full"
        >
          {/* Main Floating Unified Capsule Header */}
          <div 
            style={{ backgroundColor: '#a5a58d' }}
            className={`pointer-events-auto w-full rounded-2xl md:rounded-[22px] border border-[#b7b7a4]/90 overflow-hidden relative transition-all duration-300 ${
              activeDropdown 
                ? 'shadow-[0_32px_72px_rgba(0,0,0,0.28)]' 
                : isScrolled 
                  ? 'shadow-[0_12px_32px_rgba(0,0,0,0.14)]' 
                  : 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            }`}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={handleDropdownLeave}
          >
            {/* Top Navbar Row (In-Flow) */}
            <div className="w-full h-[54px] sm:h-[64px] md:h-[70px] px-2.5 sm:px-6 lg:px-8 flex items-center justify-between relative">
              
              {/* LEFT: Desktop Nav Links (xl:flex) & Mobile/Tablet Profile + Search (xl:hidden) */}
              <div className="flex-1 flex items-center justify-start min-w-0">
                {/* Mobile / Tablet: Profile & Search Icons (xl:hidden) */}
                <div className="flex xl:hidden items-center gap-1 sm:gap-2">
                  {/* User Account Link */}
                  <Link
                    href={isLoggedIn ? '/account' : '/login'}
                    className="text-white/90 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer shrink-0"
                    title={isLoggedIn ? 'My Account' : 'Log In'}
                    aria-label="User Account"
                  >
                    <User size={18} className="sm:w-5 sm:h-5" strokeWidth={2} />
                  </Link>

                  {/* Search Button */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white/90 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer shrink-0"
                    aria-label="Search products"
                  >
                    <Search 
                      size={16} 
                      className="sm:w-[17px] sm:h-[17px]" 
                      strokeWidth={2} 
                    />
                  </button>
                </div>

                {/* Desktop Nav Items */}
                <nav 
                  className="hidden xl:flex items-center gap-6 lg:gap-8 h-full"
                  onMouseEnter={clearCloseTimeout}
                >
                  
                  {/* 1. Shop Trigger */}
                  <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleDropdownEnter('shop')}
                  >
                    <Link
                      href="/shop"
                      className={`flex items-center gap-1.5 py-2 text-[14px] sm:text-[14.5px] font-editorial tracking-[0.05em] transition-colors group cursor-pointer ${
                        isShopActive || activeDropdown === 'shop' ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <span>Shop</span>
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 opacity-80 group-hover:opacity-100 ${
                          activeDropdown === 'shop' ? 'rotate-180 text-white opacity-100' : ''
                        }`}
                      />
                    </Link>
                  </div>

                  {/* 2. Collections Trigger */}
                  <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleDropdownEnter('collections')}
                  >
                    <Link
                      href="/shop"
                      className={`flex items-center gap-1.5 py-2 text-[14px] sm:text-[14.5px] font-editorial tracking-[0.05em] transition-colors group cursor-pointer ${
                        isCollectionsActive || activeDropdown === 'collections' ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <span>Collections</span>
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 opacity-80 group-hover:opacity-100 ${
                          activeDropdown === 'collections' ? 'rotate-180 text-white opacity-100' : ''
                        }`}
                      />
                    </Link>
                  </div>

                  {/* 3. Pages Trigger */}
                  <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleDropdownEnter('pages')}
                  >
                    <button
                      className={`flex items-center gap-1.5 py-2 text-[14px] sm:text-[14.5px] font-editorial tracking-[0.05em] transition-colors group cursor-pointer ${
                        isPagesActive || activeDropdown === 'pages' ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <span>Pages</span>
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 opacity-80 group-hover:opacity-100 ${
                          activeDropdown === 'pages' ? 'rotate-180 text-white opacity-100' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* 4. Features Trigger */}
                  <div
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleDropdownEnter('features')}
                  >
                    <button
                      className={`flex items-center gap-1.5 py-2 text-[14px] sm:text-[14.5px] font-editorial tracking-[0.05em] transition-colors group cursor-pointer ${
                        isFeaturesActive || activeDropdown === 'features' ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                      }`}
                    >
                      <span>Features</span>
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 opacity-80 group-hover:opacity-100 ${
                          activeDropdown === 'features' ? 'rotate-180 text-white opacity-100' : ''
                        }`}
                      />
                    </button>
                  </div>

                </nav>
              </div>

              {/* CENTER: Logo using /veracue-images/logo-header.png */}
              <div 
                className="shrink-0 flex items-center justify-center px-1 sm:px-2 pointer-events-auto xl:absolute xl:left-1/2 xl:-translate-x-1/2"
                onMouseEnter={handleDropdownLeave}
              >
                <Link 
                  href="/" 
                  className="flex items-center justify-center hover:opacity-90 transition-opacity py-1 max-w-full"
                  aria-label="Veracue Home"
                >
                  <Image
                    src="/veracue-images/logo-header.png"
                    alt="Veracue"
                    width={180}
                    height={60}
                    priority
                    style={{ width: 'auto' }}
                    className="h-5 sm:h-6 md:h-7 lg:h-[30px] xl:h-[34px] w-auto max-w-[115px] xs:max-w-[130px] sm:max-w-none object-contain transition-all duration-200"
                  />
                </Link>
              </div>

              {/* RIGHT: Desktop Actions (Search Pill + User + Cart) & Mobile/Tablet Actions (Cart + Menu) */}
              <div 
                className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2.5 xl:gap-4 min-w-0"
                onMouseEnter={handleDropdownLeave}
              >
                {/* Desktop Search Pill button (xl:flex) */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden xl:flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer group shrink-0"
                  aria-label="Search products"
                >
                  <span className="text-[12.5px] sm:text-[13px] font-editorial tracking-[0.03em] text-white/90 group-hover:text-white font-normal">
                    What are you looking for?
                  </span>
                  <Search 
                    size={16} 
                    strokeWidth={2} 
                    className="text-white group-hover:scale-105 transition-transform" 
                  />
                </button>

                {/* Desktop User Account Link (xl:flex) */}
                <Link
                  href={isLoggedIn ? '/account' : '/login'}
                  className="hidden xl:flex text-white/90 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/15 items-center justify-center cursor-pointer shrink-0"
                  title={isLoggedIn ? 'My Account' : 'Log In'}
                  aria-label="User Account"
                >
                  <User size={19} strokeWidth={2} />
                </Link>

                {/* Shopping Cart with Terracotta Circular Badge (Visible on ALL viewports) */}
                <button
                  onClick={cartStore.openCart}
                  className="relative text-white/90 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Open Shopping Cart"
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" strokeWidth={2} />
                  
                  {/* Terracotta Badge (#cb997e) from the palette */}
                  <span 
                    style={{ backgroundColor: '#cb997e' }}
                    className="absolute -top-1 -right-1 min-w-[15px] sm:min-w-[17px] h-[15px] sm:h-[17px] px-0.5 sm:px-1 text-white text-[9px] sm:text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(203,153,126,0.4)]"
                  >
                    {displayCartCount}
                  </span>
                </button>

                {/* Mobile / Tablet Menu Button (xl:hidden) */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="xl:hidden p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Open navigation menu"
                >
                  <Menu size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
                </button>
              </div>

            </div>

            {/* UNIFIED FULL-WIDTH DROPDOWN SHELF (In-Flow inside same outer container) */}
            <AnimatePresence>
              {activeDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden xl:block w-full overflow-hidden pointer-events-auto"
                  onMouseEnter={clearCloseTimeout}
                >
                  {/* Crisp Hairline Divider separating Header bar from Dropdown Shelf */}
                  <div className="w-full h-[1px] bg-white/30" />

                  {/* Shelf Content */}
                  <div className="px-8 lg:px-12 py-7 lg:py-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDropdown}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >

                        {/* 1. SHOP SHELF */}
                        {activeDropdown === 'shop' && (
                          <div className="flex items-start gap-8 lg:gap-12">
                            {/* Left Column: / shop */}
                            <div className="w-[190px] lg:w-[230px] shrink-0 pt-0.5">
                              <span className="text-[25px] lg:text-[28px] font-editorial font-bold text-white tracking-[0.02em] block leading-none">
                                / shop
                              </span>
                              <span className="text-[10.5px] text-white/80 uppercase tracking-[0.18em] font-mono font-medium block mt-2.5">
                                Research Formulations
                              </span>
                              <Link
                                href="/shop"
                                onClick={() => setActiveDropdown(null)}
                                className="inline-flex items-center gap-1.5 text-[12px] font-editorial text-white hover:text-white/85 mt-5 group/all transition-colors underline decoration-white/40 underline-offset-4"
                              >
                                <span>Browse full catalog (40+)</span>
                                <ArrowRight size={12} className="group-hover/all:translate-x-1 transition-transform text-white" />
                              </Link>
                            </div>

                            {/* Right: 4 Horizontal Columns */}
                            <div className="flex-1 grid grid-cols-4 gap-4 lg:gap-6">
                              {/* Item 1: All Peptides */}
                              <Link
                                href="/shop"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <FlaskConical size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      All Peptides
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Complete catalog of 99%+ analytical grade compounds
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Item 2: Best Sellers */}
                              <Link
                                href="/shop?filter=best-sellers"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Flame size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] leading-snug">
                                        Best Sellers
                                      </span>
                                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/25 text-white border border-white/30">
                                        Hot
                                      </span>
                                    </div>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Most demanded &amp; peer-referenced compounds
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Item 3: New Syntheses */}
                              <Link
                                href="/shop?filter=newest"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Sparkles size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] leading-snug">
                                        New Syntheses
                                      </span>
                                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/25 text-white border border-white/30">
                                        New
                                      </span>
                                    </div>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Recently synthesized high-purity research batches
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Item 4: Reconstitution Calculator */}
                              <Link
                                href="/peptide-calculator"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Calculator size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Calculator
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Precision dilution volume &amp; unit dosing tool
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* 2. COLLECTIONS SHELF */}
                        {activeDropdown === 'collections' && (
                          <div className="flex items-start gap-8 lg:gap-12">
                            {/* Left Column: / collections */}
                            <div className="w-[190px] lg:w-[230px] shrink-0 pt-0.5">
                              <span className="text-[25px] lg:text-[28px] font-editorial font-bold text-white tracking-[0.02em] block leading-none">
                                / collections
                              </span>
                              <span className="text-[10.5px] text-white/80 uppercase tracking-[0.18em] font-mono font-medium block mt-2.5">
                                Research Fields
                              </span>
                              <div className="mt-5 flex items-center gap-2.5 text-[11.5px] text-white/90 font-editorial">
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                                  <CheckCircle2 size={13} strokeWidth={2.5} />
                                </div>
                                <span className="leading-tight">3rd-Party Analytical Lab Verified</span>
                              </div>
                            </div>

                            {/* Right: 8 Categories in 2 Rows x 4 Columns */}
                            <div className="flex-1 grid grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-3.5 lg:gap-y-4">
                              {[
                                { name: 'GLP-1 & Metabolic', query: 'GLP-1 & Metabolic', desc: 'Incretin mimetics & GLP-1/GIP agonists', icon: Activity },
                                { name: 'Healing & Recovery', query: 'Healing & Recovery', desc: 'BPC-157, TB-500 & tissue repair', icon: HeartPulse },
                                { name: 'Longevity & Aging', query: 'Longevity & Anti-Aging', desc: 'Epithalon, NAD+ & telomeres', icon: Clock },
                                { name: 'Cosmetic & Skin', query: 'Cosmetic & Skin', desc: 'GHK-Cu & matrix peptides', icon: Sparkles },
                                { name: 'Cognitive & Focus', query: 'Cognitive & Nootropic', desc: 'Semax, Selank & neurogenesis', icon: Brain },
                                { name: 'GH Secretagogues', query: 'Growth Hormone Secretagogue', desc: 'CJC-1295, Ipamorelin & GH axis', icon: TrendingUp },
                                { name: 'Energy & Biogenesis', query: 'Performance & Energy', desc: 'Mitochondrial stamina compounds', icon: Zap },
                                { name: 'Sexual & Hormonal', query: 'Sexual & Hormonal', desc: 'PT-141 & endocrine signaling', icon: Layers },
                              ].map((cat) => {
                                const CatIcon = cat.icon
                                return (
                                  <Link
                                    key={cat.name}
                                    href={`/shop?category=${encodeURIComponent(cat.query)}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                                  >
                                    <div className="flex items-start gap-3.5">
                                      <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                        <CatIcon size={16} strokeWidth={2.3} />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug truncate">
                                          {cat.name}
                                        </span>
                                        <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-0.5 line-clamp-1 transition-colors">
                                          {cat.desc}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* 3. PAGES SHELF */}
                        {activeDropdown === 'pages' && (
                          <div className="flex items-start gap-8 lg:gap-12">
                            {/* Left Column: / pages */}
                            <div className="w-[190px] lg:w-[230px] shrink-0 pt-0.5">
                              <span className="text-[25px] lg:text-[28px] font-editorial font-bold text-white tracking-[0.02em] block leading-none">
                                / pages
                              </span>
                              <span className="text-[10.5px] text-white/80 uppercase tracking-[0.18em] font-mono font-medium block mt-2.5">
                                Sciences &amp; Support
                              </span>
                              <Link
                                href="/contact-us"
                                onClick={() => setActiveDropdown(null)}
                                className="inline-flex items-center gap-1.5 text-[12px] font-editorial text-white hover:text-white/85 mt-5 group/desk transition-colors underline decoration-white/40 underline-offset-4"
                              >
                                <span>Contact Lab Desk</span>
                                <ArrowRight size={12} className="group-hover/desk:translate-x-1 transition-transform text-white" />
                              </Link>
                            </div>

                            {/* Right: 5 Horizontal Columns */}
                            <div className="flex-1 grid grid-cols-5 gap-3.5 lg:gap-5">
                              {/* Page 1: About Us */}
                              <Link
                                href="/about-us"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Building2 size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      About Us
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Synthesis standards, cleanroom labs &amp; mission
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Page 2: Research Journal */}
                              <Link
                                href="/blog"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <BookOpen size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Journal
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Clinical literature &amp; peer-reviewed studies
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Page 3: Affiliate Program */}
                              <Link
                                href="/affiliates"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Users size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Affiliates
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Institutional partnerships &amp; rewards
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Page 4: FAQ & Storage */}
                              <Link
                                href="/faq"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <HelpCircle size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      FAQ &amp; Storage
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Handling &amp; preservation protocols
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Page 5: Support */}
                              <Link
                                href="/contact-us"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Headphones size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Support
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Direct inquiries &amp; researcher assistance
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* 4. FEATURES SHELF */}
                        {activeDropdown === 'features' && (
                          <div className="flex items-start gap-8 lg:gap-12">
                            {/* Left Column: / features */}
                            <div className="w-[190px] lg:w-[230px] shrink-0 pt-0.5">
                              <span className="text-[25px] lg:text-[28px] font-editorial font-bold text-white tracking-[0.02em] block leading-none">
                                / features
                              </span>
                              <span className="text-[10.5px] text-white/80 uppercase tracking-[0.18em] font-mono font-medium block mt-2.5">
                                Standards &amp; Logistics
                              </span>
                              <div className="mt-5 flex items-center gap-2.5 text-[11.5px] text-white/90 font-editorial">
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                                  <ShieldCheck size={13} strokeWidth={2.5} />
                                </div>
                                <span className="leading-tight">100% Analytical &amp; Delivery Assurance</span>
                              </div>
                            </div>

                            {/* Right: 6 Items in 3 Columns x 2 Rows */}
                            <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4 lg:gap-y-5">
                              {/* Feature 1: Certificates of Analysis */}
                              <Link
                                href="/certificates"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <FileCheck size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] leading-snug">
                                        Certificates of Analysis
                                      </span>
                                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/25 text-white border border-white/30">
                                        COA
                                      </span>
                                    </div>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      HPLC &amp; Mass-Spec batch verification reports
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Feature 2: Medical Disclaimer */}
                              <Link
                                href="/medical-disclaimer"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <ShieldAlert size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Medical Disclaimer
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Strict in-vitro laboratory research-use notice
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Feature 3: Terms & Conditions */}
                              <Link
                                href="/terms-and-conditions"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <FileText size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Terms &amp; Conditions
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Institutional guidelines &amp; purchase compliance
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Feature 4: Tracked Shipping */}
                              <Link
                                href="/shipping-policy"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Truck size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Tracked Shipping
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Discreet, insulated domestic USA delivery
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Feature 5: Transit Guarantee */}
                              <Link
                                href="/refund-policy"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <ShieldCheck size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Transit Guarantee
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      Replacement protection for damaged shipments
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Feature 6: Data Confidentiality */}
                              <Link
                                href="/privacy-policy"
                                onClick={() => setActiveDropdown(null)}
                                className="group/item p-3 rounded-xl hover:bg-white/[0.15] active:bg-white/25 transition-all duration-200 block cursor-pointer"
                              >
                                <div className="flex items-start gap-3.5">
                                  <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-[#282a21] group-hover/item:scale-105 group-hover/item:shadow-sm transition-all duration-200 shrink-0 mt-0.5">
                                    <Lock size={16} strokeWidth={2.3} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[14px] font-editorial font-bold text-white group-hover/item:text-white tracking-[0.02em] block leading-snug">
                                      Confidentiality
                                    </span>
                                    <p className="text-[12px] text-white/80 group-hover/item:text-white leading-relaxed font-normal mt-1 transition-colors">
                                      256-bit encrypted checkout &amp; data privacy
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        onSearchClick={() => setIsSearchOpen(true)}
        categories={categoriesData}
      />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categoriesData}
      />
    </>
  )
}
