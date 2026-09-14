'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  X,
  Search,
  Heart,
  User,
  LogIn,
  ShoppingCart,
  ChevronRight,
  FlaskConical,
  Calculator,
  BookOpen,
  ShieldCheck,
  Flame,
  FileCheck,
  Truck,
  Users,
  HelpCircle,
  Award,
  ArrowRight,
  Headphones
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getCategoryDisplayName } from '@/lib/categoryDisplay'
import { useCartStore } from '@/lib/cart/store'
import { useWishlistStore } from '@/lib/wishlist/store'

export interface MenuCategory {
  id: string | number
  name: string
  slug?: string
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn?: boolean
  onSearchClick?: () => void
  categories?: MenuCategory[]
}

// Curated 7 High-Resolution Scientific Peptide Visuals matching each research category
const CATEGORY_VISUALS_MAP: Record<string, { image: string; tag: string }> = {
  'weight-loss-metabolic': {
    image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp',
    tag: 'METABOLIC & GLP-1',
  },
  'cellular-repair-healing': {
    image: '/veracue-images/veracue-glow-50mg-beach-shore-landscape.webp',
    tag: 'TISSUE REGENERATION',
  },
  'longevity-anti-aging': {
    image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp',
    tag: 'SENESCENCE & TELOMERES',
  },
  'cognitive-neuro-protection': {
    image: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp',
    tag: 'SYNAPTIC PLASTICITY',
  },
  'growth-hormone-secretagogues': {
    image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp',
    tag: 'GHRH & SECRETIN',
  },
  'immune-modulation': {
    image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    tag: 'ANTIMICROBIAL PEPTIDES',
  },
  'mitochondrial-cellular-energy': {
    image: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp',
    tag: 'OXIDATIVE PHOSPHORYLATION',
  },
}

const FALLBACK_CATEGORIES: MenuCategory[] = [
  { id: '1', name: 'Weight Loss & Metabolic', slug: 'weight-loss-metabolic' },
  { id: '2', name: 'Cellular Repair & Healing', slug: 'cellular-repair-healing' },
  { id: '3', name: 'Longevity & Anti-Aging', slug: 'longevity-anti-aging' },
  { id: '4', name: 'Cognitive & Neuro-Protection', slug: 'cognitive-neuro-protection' },
  { id: '5', name: 'Growth Hormone Secretagogues', slug: 'growth-hormone-secretagogues' },
  { id: '6', name: 'Immune Modulation', slug: 'immune-modulation' },
  { id: '7', name: 'Mitochondrial & Cellular Energy', slug: 'mitochondrial-cellular-energy' },
]

const FALLBACK_VISUAL_ARRAY = [
  { image: '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp', tag: 'METABOLIC & GLP-1' },
  { image: '/veracue-images/veracue-glow-50mg-beach-shore-landscape.webp', tag: 'TISSUE REGENERATION' },
  { image: '/veracue-images/veracue-epithalon-50mg-water-bamboo.webp', tag: 'SENESCENCE & TELOMERES' },
  { image: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp', tag: 'SYNAPTIC PLASTICITY' },
  { image: '/veracue-images/veracue-nad-plus-500mg-sunlight-branches.webp', tag: 'GHRH & SECRETIN' },
  { image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp', tag: 'ANTIMICROBIAL PEPTIDES' },
  { image: '/veracue-images/veracue-nad-plus-50mg-water-caustics.webp', tag: 'OXIDATIVE PHOSPHORYLATION' },
]

const PRIMARY_NAV = [
  {
    key: 'shopFormulations',
    title: 'Shop All Peptides',
    subtitle: 'Browse 40+ research compounds with ≥99% HPLC purity',
    href: '/shop',
    icon: FlaskConical,
    iconBg: 'bg-[#a5a58d]/15 text-[#282a21]',
  },
  {
    key: 'peptideCalculator',
    title: 'Peptide Calculator',
    subtitle: 'Reconstitution, volume, vial dilution & research dosing tool',
    href: '/peptide-calculator',
    icon: Calculator,
    iconBg: 'bg-[#eddcd2]/50 text-[#282a21]',
  },
  {
    key: 'blog',
    title: 'Research Journal',
    subtitle: 'Scientific protocols, handling guides & clinical insights',
    href: '/blog',
    icon: BookOpen,
    iconBg: 'bg-[#fff1e6] text-[#282a21]',
  },
  {
    key: 'ourLaboratory',
    title: 'Purity & Standards',
    subtitle: 'ISO-7 cleanroom synthesis, 3rd party testing & COA lookup',
    href: '/about-us',
    icon: ShieldCheck,
    iconBg: 'bg-[#E8EFE3] text-[#55724a]',
  },
]

const QUICK_MODULES = [
  {
    title: 'Best Sellers',
    sub: 'Demanded peptides',
    href: '/shop?sort=popular',
    icon: Flame,
    color: 'text-[#cb997e]',
    bg: 'bg-[#cb997e]/10',
  },
  {
    title: 'COA Verification',
    sub: 'Batch test reports',
    href: '/certificates',
    icon: FileCheck,
    color: 'text-[#55724a]',
    bg: 'bg-[#6B8E5E]/10',
  },
  {
    title: 'Cold-Pack Shipping',
    sub: 'Insulated domestic USA',
    href: '/shipping-policy',
    icon: Truck,
    color: 'text-[#282a21]',
    bg: 'bg-[#282a21]/5',
  },
  {
    title: 'Affiliate Portal',
    sub: 'Partner with Veracue',
    href: '/affiliates',
    icon: Users,
    color: 'text-[#282a21]',
    bg: 'bg-[#282a21]/5',
  },
]

export function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn = false,
  onSearchClick,
  categories = [],
}: MobileMenuProps) {
  const t = useTranslations('mobileMenu')
  const cartStore = useCartStore()
  const cartItems = useCartStore((state) => state.items)
  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0

  const wishlistItems = useWishlistStore((state) => state.items)
  const wishlistCount = wishlistItems?.length || 0

  const displayCategories = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('mobile-menu-open')

      // Hide Tidio chat when menu opens
      if (typeof window !== 'undefined' && (window as any).tidioChatApi) {
        (window as any).tidioChatApi.hide()
      }

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        document.body.classList.remove('mobile-menu-open')

        // Show Tidio chat when menu closes
        if (typeof window !== 'undefined' && (window as any).tidioChatApi) {
          (window as any).tidioChatApi.show()
        }

        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, onClose])

  // Silky drawer animations
  const backdropVariants: Variants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  const drawerVariants: Variants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.28,
        ease: [0.32, 0, 0.67, 0],
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'spring',
        damping: 28,
        stiffness: 260,
        mass: 0.85,
      },
    },
  }

  const containerVariants: Variants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 14 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const getVisualForCategory = (cat: MenuCategory, index: number) => {
    const slug =
      cat.slug ||
      cat.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    if (CATEGORY_VISUALS_MAP[slug]) {
      return CATEGORY_VISUALS_MAP[slug]
    }
    return FALLBACK_VISUAL_ARRAY[index % FALLBACK_VISUAL_ARRAY.length]
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end pointer-events-auto select-none overflow-hidden font-sans">
          {/* Ambient Dimmed / Blurred Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Luxury Slide-Over Panel (Full width on mobile, max-w-[440px] on tablet) */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="relative w-full sm:max-w-[440px] h-full bg-[#f0efeb] flex flex-col z-10 shadow-[-12px_0_40px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Top Sticky Header */}
            <div className="h-[64px] sm:h-[70px] px-4 sm:px-6 flex items-center justify-between shrink-0 relative z-30 bg-[#f0efeb]/95 backdrop-blur-md border-b border-[#282a21]/10">
              {/* Logo */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 group py-1 active:opacity-75 transition-opacity"
                aria-label="Veracue Home"
              >
                <Image
                  src="/veracue-images/logo-header.png"
                  alt="Veracue"
                  width={140}
                  height={40}
                  priority
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </Link>

              {/* Close Button with Tactile Feedback */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/80 border border-[#282a21]/12 text-[#282a21] hover:bg-white active:scale-95 transition-all flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer"
                aria-label={t('closeMenu')}
              >
                <X size={20} strokeWidth={2.2} />
              </button>
            </div>

            {/* Scrollable Content Container (Smooth, In-Flow, Zero Obstructions) */}
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 px-4 sm:px-6 py-5 space-y-5 overscroll-contain pb-12"
            >
              {/* 1. Quick Utility Strip: Search Bar + 3 Quick Action Chips */}
              <motion.div variants={itemVariants} className="space-y-2.5">
                {/* Interactive Search Launcher */}
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onSearchClick?.()
                  }}
                  className="w-full flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-2xl bg-white border border-[#282a21]/10 shadow-[0_2px_12px_rgba(40,42,33,0.03)] hover:border-[#282a21]/20 active:scale-[0.99] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-[#282a21]/65 group-hover:text-[#282a21] min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#f0efeb] flex items-center justify-center text-[#282a21]/80 group-hover:text-[#282a21] transition-colors shrink-0">
                      <Search size={15} strokeWidth={2.2} />
                    </div>
                    <span className="text-[13px] sm:text-[13.5px] font-sans font-medium text-[#282a21]/70 group-hover:text-[#282a21] transition-colors truncate">
                      Search compounds, CAS, or research tags...
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f0efeb] text-[#282a21]/75 border border-[#282a21]/8 shrink-0 ml-2">
                    ⌘K
                  </span>
                </button>

                {/* 3 In-Flow Quick Chips: Wishlist, Cart, Account */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Wishlist */}
                  <Link
                    href="/account/wishlist"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white border border-[#282a21]/8 hover:border-[#282a21]/20 active:bg-black/5 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    <div className="relative">
                      <Heart size={16} strokeWidth={2} className="text-[#cb997e]" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold rounded-full bg-[#cb997e] text-white flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-semibold text-[#282a21] tracking-tight">
                      {t('dock.wishlist')}
                    </span>
                  </Link>

                  {/* Cart */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      cartStore.openCart()
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white border border-[#282a21]/8 hover:border-[#282a21]/20 active:bg-black/5 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)] cursor-pointer"
                  >
                    <div className="relative">
                      <ShoppingCart size={16} strokeWidth={2} className="text-[#a5a58d]" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold rounded-full bg-[#cb997e] text-white flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] font-semibold text-[#282a21] tracking-tight">
                      Cart
                    </span>
                  </button>

                  {/* Account / Log In */}
                  <Link
                    href={isLoggedIn ? '/account' : '/login'}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white border border-[#282a21]/8 hover:border-[#282a21]/20 active:bg-black/5 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    {isLoggedIn ? (
                      <>
                        <User size={16} strokeWidth={2} className="text-[#282a21]" />
                        <span className="text-[12px] font-semibold text-[#282a21] tracking-tight">
                          {t('dock.account')}
                        </span>
                      </>
                    ) : (
                      <>
                        <LogIn size={16} strokeWidth={2} className="text-[#282a21]" />
                        <span className="text-[12px] font-semibold text-[#282a21] tracking-tight">
                          {t('dock.login')}
                        </span>
                      </>
                    )}
                  </Link>
                </div>
              </motion.div>

              {/* 2. Primary Navigation Portals (Clean, No Crowding Badges) */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <div className="bg-white rounded-3xl p-1.5 sm:p-2 border border-[#282a21]/8 shadow-[0_4px_24px_rgba(40,42,33,0.03)] divide-y divide-[#282a21]/5">
                  {PRIMARY_NAV.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl hover:bg-[#f0efeb]/70 active:bg-[#f0efeb] transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 border border-[#282a21]/5 shadow-sm group-hover:scale-105 transition-transform duration-200`}
                          >
                            <Icon size={20} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <h2 className="text-[16px] sm:text-[16.5px] font-bold text-[#282a21] tracking-tight group-hover:text-[#cb997e] transition-colors leading-snug">
                              {t(`links.${item.key}`) || item.title}
                            </h2>
                            <p className="text-[12px] text-[#282a21]/60 font-normal leading-normal mt-0.5 truncate max-w-[210px] xs:max-w-[260px] sm:max-w-xs">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-[#282a21]/40 group-hover:text-[#282a21] group-hover:bg-black/10 transition-colors shrink-0 ml-2">
                          <ChevronRight size={16} strokeWidth={2.5} />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>

              {/* 3. Research Categories Carousel (Curated Veracue Photography) */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#282a21]/50">
                    {t('exploreCategories')}
                  </h3>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="text-[12px] font-semibold text-[#282a21]/70 hover:text-[#cb997e] flex items-center gap-1 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </Link>
                </div>

                <div className="flex overflow-x-auto gap-3 pb-2 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 no-scrollbar snap-x snap-mandatory">
                  {displayCategories.map((cat, index) => {
                    const visual = getVisualForCategory(cat, index)
                    return (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={onClose}
                        className="snap-center shrink-0 w-[230px] sm:w-[260px] aspect-[16/11] rounded-2xl overflow-hidden relative group border border-[#282a21]/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-200"
                      >
                        <Image
                          src={visual.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 230px, 260px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                        <div className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-between">
                          <div className="flex items-center justify-start">
                            <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                              {visual.tag}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-[15px] sm:text-[16px] tracking-tight leading-snug drop-shadow-md">
                              {getCategoryDisplayName(cat.name)}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] font-medium text-white/75 group-hover:text-white mt-1 transition-colors">
                              <span>Explore Compounds</span>
                              <ArrowRight
                                size={11}
                                strokeWidth={2.2}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </motion.div>

              {/* 4. Quick Laboratory Shortcuts (2x2 Grid) */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
                {QUICK_MODULES.map((mod) => {
                  const Icon = mod.icon
                  return (
                    <Link
                      key={mod.title}
                      href={mod.href}
                      onClick={onClose}
                      className="p-3.5 rounded-2xl bg-white border border-[#282a21]/8 hover:border-[#282a21]/20 active:bg-[#f0efeb] transition-all shadow-[0_2px_8px_rgba(40,42,33,0.02)] group flex flex-col justify-between min-h-[92px]"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl ${mod.bg} ${mod.color} flex items-center justify-center shrink-0`}
                      >
                        <Icon size={17} strokeWidth={2.2} />
                      </div>
                      <div className="mt-2">
                        <span className="text-[13px] font-bold text-[#282a21] group-hover:text-[#cb997e] transition-colors block leading-tight">
                          {mod.title}
                        </span>
                        <span className="text-[11px] text-[#282a21]/55 font-normal block mt-0.5 leading-tight">
                          {mod.sub}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </motion.div>

              {/* 5. Support & Researcher Assistance */}
              <motion.div variants={itemVariants} className="space-y-2.5">
                <h3 className="px-1 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#282a21]/50">
                  {t('support')}
                </h3>
                <div className="bg-white rounded-3xl p-1.5 border border-[#282a21]/8 shadow-[0_2px_12px_rgba(40,42,33,0.02)] divide-y divide-[#282a21]/5">
                  {/* Contact Support */}
                  <Link
                    href="/contact-us"
                    onClick={onClose}
                    className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#f0efeb]/70 active:bg-[#f0efeb] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#282a21]/5 flex items-center justify-center text-[#282a21]/70 group-hover:text-[#282a21] group-hover:bg-[#282a21]/10 transition-colors">
                        <Headphones size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-[#282a21] group-hover:text-[#cb997e] transition-colors block leading-snug">
                          {t('links.contactSupport') || 'Contact Support'}
                        </span>
                        <span className="text-[11.5px] text-[#282a21]/55 leading-tight block">
                          Direct inquiries &amp; researcher assistance
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-[#282a21]/30 group-hover:text-[#282a21] transition-colors"
                      strokeWidth={2.2}
                    />
                  </Link>

                  {/* FAQ */}
                  <Link
                    href="/faq"
                    onClick={onClose}
                    className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#f0efeb]/70 active:bg-[#f0efeb] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#282a21]/5 flex items-center justify-center text-[#282a21]/70 group-hover:text-[#282a21] group-hover:bg-[#282a21]/10 transition-colors">
                        <HelpCircle size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[14px] font-semibold text-[#282a21] group-hover:text-[#cb997e] transition-colors block leading-snug">
                          {t('links.faq') || 'Frequently Asked Questions'}
                        </span>
                        <span className="text-[11.5px] text-[#282a21]/55 leading-tight block">
                          Storage, reconstitution &amp; ordering FAQs
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-[#282a21]/30 group-hover:text-[#282a21] transition-colors"
                      strokeWidth={2.2}
                    />
                  </Link>

                  {/* Military & Veteran Program */}
                  <Link
                    href="/about-us#military-discount"
                    onClick={onClose}
                    className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#f0efeb]/70 active:bg-[#f0efeb] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#cb997e]/15 flex items-center justify-center text-[#cb997e] transition-colors">
                        <Award size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[14px] font-semibold text-[#282a21] group-hover:text-[#cb997e] transition-colors leading-snug">
                            Military &amp; Veteran Program
                          </span>
                          <span className="text-[9px] font-sans font-bold uppercase px-1.5 py-0.5 rounded bg-[#cb997e]/20 text-[#cb997e]">
                            15% OFF
                          </span>
                        </div>
                        <span className="text-[11.5px] text-[#282a21]/55 leading-tight block">
                          Honoring research service members
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-[#282a21]/30 group-hover:text-[#282a21] transition-colors"
                      strokeWidth={2.2}
                    />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
