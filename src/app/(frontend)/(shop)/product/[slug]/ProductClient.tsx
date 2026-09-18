'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronRight, ChevronLeft, ChevronDown, ZoomIn, Download, Check, ShieldCheck, FlaskConical, MapPin, Zap, ShoppingCart, Truck, Sparkles, Award, Globe, Lock, RotateCcw } from 'lucide-react'
import { AnimatedWishlistHeart } from '@/components/shared/AnimatedWishlistHeart'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { PinterestGlassCard } from '@/components/home/PinterestGlassCard'
import { Badge } from '@/components/ui/badge'
import { StockIndicator } from '@/components/ui/stock-indicator'
import { useCartStore } from '@/lib/cart/store'
import { useWishlistStore } from '@/lib/wishlist/store'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Variant } from '@/components/shop/VariantSelector'
import { QuantityStepper } from '@/components/shop/QuantityStepper'
import { HeroButton } from '@/components/ui/hero-button'
import { ProductTabs, Tab } from '@/components/shop/ProductTabs'
import { ProductAccordion } from '@/components/shop/ProductAccordion'
import { ProductDetailTabs } from '@/components/shop/ProductDetailTabs'
import { PrimaryProductCard } from '@/components/shop/PrimaryProductCard'
import { ProductCard } from '@/components/shared/ProductCard'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { BlogPostCard } from '@/components/editorial/BlogPostCard'
import { FadeUp } from '@/components/motion/FadeUp'

interface ProductData {
  id: string
  name: string
  slug: string
  subtitle: string
  category: string
  categories?: string[]
  averageRating?: number
  reviewCount?: number

  sku?: string
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  badges?: string[]
  bulkBundles?: {
    id?: string
    name: string
    quantity: number
    discountPercentage?: number
    price?: number
    salePrice?: number
    image?: string
  }[]
  description: string
  shortDescription?: string
  images: string[]
  variants: Variant[]
  coaFile?: string
  tabs: Tab[]
  faqs?: any[]
  reviews: any[]
  relatedProducts: any[]
  suggestedBlogs?: any[]
}

interface ProductClientProps {
  product: ProductData
}

function SlideToCartButton({ onAdd, disabled, isAdded }: { onAdd: () => void, disabled: boolean, isAdded: boolean }) {
  const t = useTranslations('shop.productDetail')
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const handleDragEnd = (event: any, info: any) => {
    if (disabled || isAdded) return
    // threshold to trigger add to cart
    if (info.offset.x > 60) {
      onAdd()
    }
  }

  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const stop = (e: Event) => e.stopPropagation()
    node.addEventListener('pointerdown', stop)
    node.addEventListener('touchstart', stop, { passive: false })
    node.addEventListener('mousedown', stop)
    return () => {
      node.removeEventListener('pointerdown', stop)
      node.removeEventListener('touchstart', stop)
      node.removeEventListener('mousedown', stop)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`relative flex-1 h-16 bg-white border border-black/10 rounded-full flex items-center overflow-hidden z-10 transition-colors hover:border-black/30 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="absolute inset-0 flex items-center justify-center pl-10 text-[13px] font-bold text-black uppercase tracking-widest pointer-events-none select-none">
        {isAdded ? t('addedToCart') : <>{t('slideToAdd')} <ChevronRight size={16} className="inline ml-1 opacity-50" /></>}
      </div>
      
      <motion.button
        type="button"
        drag={disabled || isAdded ? false : "x"}
        dragConstraints={containerRef}
        dragElastic={0.05}
        dragSnapToOrigin={true}
        onDragEnd={handleDragEnd}
        whileTap={disabled || isAdded ? {} : { scale: 0.95 }}
        className={`absolute left-2 w-12 h-12 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-sm transition-colors duration-300 ${
          isAdded ? 'bg-green-600 text-white' : 'bg-black text-white'
        }`}
      >
        {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
      </motion.button>
    </div>
  )
}

export function ProductClient({ product }: ProductClientProps) {
  const t = useTranslations('shop.productDetail')
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(true)
  const [deliveryOpen, setDeliveryOpen] = useState(true)

  React.useEffect(() => {
    // Force scroll to top on mount to fix Next.js scroll restoration issues
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [product.id])

  // Mobile Sticky Bar Logic
  const [showMobileBar, setShowMobileBar] = useState(false)
  const { scrollY } = useScroll()

  // Science section scroll-linked animation
  const scienceSectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: scienceScrollProgress } = useScroll({
    target: scienceSectionRef,
    offset: ['start end', 'end start'],
  })
  // Watermark drifts, grows, and intensifies continuously across the whole time the section is in view
  const watermarkY = useTransform(scienceScrollProgress, [0, 1], ['-16%', '16%'])
  const watermarkScale = useTransform(scienceScrollProgress, [0, 0.5, 1], [0.75, 1.05, 1.3])
  const watermarkOpacity = useTransform(scienceScrollProgress, [0, 0.35, 0.65, 1], [0.04, 0.14, 0.14, 0.04])

  // Entrance is scroll-scrubbed (tied directly to scroll position, not a fixed-duration reveal)
  const { scrollYProgress: scienceEnterProgress } = useScroll({
    target: scienceSectionRef,
    offset: ['start 0.9', 'start 0.35'],
  })
  const headerY = useTransform(scienceEnterProgress, [0, 1], [90, 0])
  const headerOpacity = useTransform(scienceEnterProgress, [0, 1], [0, 1])
  const ruleScaleX = useTransform(scienceEnterProgress, [0.15, 1], [0, 1])

  // Swipe Cursor Logic
  const [isHoveringSlider, setIsHoveringSlider] = useState(false)
  const [isSliderAtEnd, setIsSliderAtEnd] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleSliderMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX - 36)
    cursorY.set(e.clientY - 36)
  }



  useEffect(() => {
    // Show initially on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const pageHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const isNearBottom = window.scrollY + viewportHeight >= pageHeight - 300
      setShowMobileBar(!isNearBottom)
    }
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const pageHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      // Hide when near the footer (bottom 300px)
      const isNearBottom = latest + viewportHeight >= pageHeight - 300

      if (!isNearBottom) {
        setShowMobileBar(true)
      } else {
        setShowMobileBar(false)
      }
    }
  })

  const [relatedEmblaRef, relatedEmblaApi] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps'
  }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  ])

  useEffect(() => {
    if (!relatedEmblaApi) return
    
    let isDragging = false
    
    const checkEnd = () => {
      if (isDragging) {
        setIsSliderAtEnd(!relatedEmblaApi.canScrollNext())
      }
    }

    const onPointerDown = () => {
      isDragging = true
      checkEnd()
    }
    
    const onPointerUp = () => {
      isDragging = false
      setIsSliderAtEnd(false) // Instantly reset to SWIPE when they let go
    }

    relatedEmblaApi.on('pointerDown', onPointerDown)
    relatedEmblaApi.on('pointerUp', onPointerUp)
    relatedEmblaApi.on('scroll', checkEnd)
    relatedEmblaApi.on('select', checkEnd)
  }, [relatedEmblaApi])



  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0]
  const currentStock = selectedVariant?.inStock ? 50 : 0 // Fake stock level for testing

  // Combine variant-specific images (first) with common product images (second). Remove duplicates.
  const allImages = [
    ...(selectedVariant?.images || []),
    ...(product.images || [])
  ]
  const galleryImages = Array.from(new Set(allImages)).filter(Boolean)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [selectedVariantId])

  // Split "NAD+ (Nicotinamide Adenine Dinucleotide)" into a short display
  // name and an italic scientific subtitle, when the name has that shape.
  const nameMatch = product.name.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  const shortName = nameMatch ? nameMatch[1].trim() : product.name
  const nameSubtitle = nameMatch ? nameMatch[2].trim() : null

  const [justAdded, setJustAdded] = useState(false)
  const cartStore = useCartStore()
  
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const isWishlistedGlobal = useWishlistStore(state => state.hasItem(product.id))
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  
  const [inWishlist, setInWishlist] = useState(false)
  const [isWishlistPending, setIsWishlistPending] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  useEffect(() => {
    setInWishlist(isWishlistedGlobal)
  }, [isWishlistedGlobal])

  const handleWishlistClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (!isSignedIn) {
      toast.error(t('signInRequired'), {
        description: t('signInRequiredDescription'),
      })
      return
    }

    setIsWishlistPending(true)

    try {
      if (inWishlist) {
        await removeItemFromWishlist(product.id)
        toast(t('removedFromWishlist'), {
          id: `wishlist-${product.id}`,
          description: t('removedFromWishlistDescription', { name: product.name }),
        })
      } else {
        await addItemToWishlist({
          id: product.id,
          name: product.name,
          slug: product.id, // Or product.slug if we had it
          image: product.images[0],
          priceRange: selectedVariant?.price || ''
        })

        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 1000)

        toast.success(t('addedToWishlist'), {
          id: `wishlist-${product.id}`,
          description: t('addedToWishlistDescription', { name: product.name }),
          action: {
            label: t('viewWishlist'),
            onClick: () => window.location.href = '/account/wishlist',
          },
        })
      }
    } catch (error: any) {
      toast.error(t('failedToUpdateWishlist'), {
        description: error.message || t('unexpectedError'),
      })
    } finally {
      setIsWishlistPending(false)
    }
  }

  // GA4 view_item tracking
  React.useEffect(() => {
    if (typeof window !== 'undefined' && selectedVariant && !sessionStorage.getItem(`ga_view_${product.id}_${selectedVariant.id}`)) {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ ecommerce: null });
      w.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'USD',
          value: parseFloat((selectedVariant.salePrice || selectedVariant.price).replace(/[^0-9.]/g, '')),
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.categories?.[0] || '',
            item_variant: selectedVariant.title,
            price: parseFloat((selectedVariant.salePrice || selectedVariant.price).replace(/[^0-9.]/g, ''))
          }]
        }
      });
      sessionStorage.setItem(`ga_view_${product.id}_${selectedVariant.id}`, 'true');
    }
  }, [product, selectedVariant]);

  const handleAddToCart = () => {
    if (!selectedVariant?.inStock) return

    const priceNum = parseFloat((selectedVariant.salePrice || selectedVariant.price).replace(/[^0-9.]/g, ''))

    cartStore.addItem(
      { id: product.id, name: product.name, imageUrl: selectedVariant.images?.[0] || product.images[0], slug: product.slug },
      selectedVariant.sku || selectedVariant.title,
      quantity,
      priceNum,
      selectedVariant.title
    )

    // GA4 add_to_cart tracking
    if (typeof window !== 'undefined') {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ ecommerce: null });
      w.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'USD',
          value: priceNum * quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            item_variant: selectedVariant.title,
            price: priceNum,
            quantity: quantity
          }]
        }
      });
    }

    setJustAdded(true)
    toast.success(t('addedToCart'), {
      action: { label: t('view'), onClick: cartStore.openCart }
    })

    // Auto-open drawer as per standard e-com flows, or just rely on pulse
    cartStore.openCart()

    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0efeb] overflow-x-clip">
      
      {/* 1. Full-Bleed Hero Section */}
      <section className="w-full relative z-10 flex flex-col lg:flex-row">

        {/* Left: Full-Bleed Sticky Image Panel */}
        <div className="w-full h-[65vh] lg:w-1/2 lg:sticky lg:top-0 lg:self-start lg:h-[100dvh] relative shrink-0 overflow-hidden bg-white">
          {galleryImages[activeImageIndex] && (
            <Image
              key={galleryImages[activeImageIndex]}
              src={galleryImages[activeImageIndex]}
              alt={shortName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}

          {/* Lab label sticker */}
          <div className="absolute top-20 left-4 sm:top-28 sm:left-10 bg-[#a5a58d] text-[#fff1e6] px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-md shadow-lg shadow-black/10">
            <div className="text-[7px] sm:text-[9px] font-bold tracking-[0.13em] sm:tracking-[0.16em] uppercase opacity-75 mb-0.5">{t('veracueResearch')}</div>
            <div className="font-heading text-[11px] sm:text-sm font-bold tracking-wide">{shortName} &middot; {selectedVariant?.title}</div>
          </div>

          {/* Zoom / view action */}
          <button
            onClick={() => setIsZoomOpen(true)}
            aria-label={t('viewLargerImage')}
            className="absolute top-20 right-4 sm:top-28 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 flex items-center justify-center text-[#20221c] shadow-lg shadow-black/10 hover:bg-white transition-colors"
          >
            <ZoomIn size={14} strokeWidth={2} className="sm:w-[17px] sm:h-[17px]" />
          </button>

          {/* Thumbnail rail on scrim */}
          {galleryImages.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 px-6 py-6 sm:px-10 sm:py-8 flex items-end justify-between bg-gradient-to-t from-[#20221c]/35 to-transparent">
              <div className="flex gap-2.5">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={t('viewImage', { number: idx + 1 })}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-[#fff1e6] opacity-100' : 'border-transparent opacity-70 hover:opacity-90'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
              <span className="text-[#fff1e6] text-[11px] font-semibold tracking-wide tabular-nums">
                {String(activeImageIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Right: Content Panel */}
        <div className="w-full lg:w-1/2 flex flex-col px-5 sm:px-10 lg:px-16 pt-8 lg:pt-[130px] pb-10 lg:pb-16 shrink-0">

          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-2 text-[11px] font-semibold text-[#20221c]/45 uppercase tracking-widest mb-7">
            <Link href="/" className="hover:text-[#20221c] transition-colors">{t('home')}</Link>
            <ChevronRight size={9} className="text-[#20221c]/30" />
            <Link href="/shop" className="hover:text-[#20221c] transition-colors">{t('shop')}</Link>
            <ChevronRight size={9} className="text-[#20221c]/30" />
            <span className="text-[#20221c]">{shortName}</span>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center max-w-full w-fit rounded-full px-3 sm:px-4 py-1 sm:py-1.5 bg-[#a5a58d] mb-6">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#fff1e6]">
              {(product.category as any)?.name || product.category || t('researchPeptide')}
            </span>
          </div>

          {/* Title + serif subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl/[1.08] md:text-[44px]/[1.08] font-extrabold text-[#20221c] leading-[1.08] tracking-tight mb-1.5"
          >
            {shortName}
          </motion.h1>
          {nameSubtitle && (
            <p className="font-serif italic font-medium text-lg text-[#a5a58d] mb-6">{nameSubtitle}</p>
          )}

          {/* Price */}
          <motion.div
            key={`price-${selectedVariantId}`}
            initial={{ opacity: 0.6, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2 mb-6"
          >
            <span className="font-heading text-[28px] sm:text-[30px] font-bold text-[#20221c] tracking-tight">
              {selectedVariant?.salePrice || selectedVariant?.price}
            </span>
            {selectedVariant?.salePrice && (
              <>
                <span className="text-[17px] text-[#20221c]/40 line-through font-medium">{selectedVariant.price}</span>
                <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#cb997e]">
                  {t('savePercent', { percent: Math.round(((parseFloat(selectedVariant.price.replace(/[^0-9.]/g, '')) - parseFloat(selectedVariant.salePrice.replace(/[^0-9.]/g, ''))) / parseFloat(selectedVariant.price.replace(/[^0-9.]/g, ''))) * 100) })}
                </span>
              </>
            )}
          </motion.div>

          {/* Short Description */}
          <p className="text-[#20221c]/62 text-[15px] leading-relaxed max-w-[480px] mb-7">
            {product.shortDescription || product.description?.substring(0, 200) + '...'}
          </p>

          {/* Spec strip — real, always-available fields (no fabricated lab claims) */}
          <div className="flex border-y border-[#b7b7a4]/35 mb-7">
            <div className="flex-1 min-w-0 py-4 pr-2 sm:pr-4 border-r border-[#b7b7a4]/35">
              <div className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#a5a58d] mb-1.5">{t('specSku')}</div>
              <div className="text-[12px] sm:text-[15px] font-bold text-[#20221c] break-words">{selectedVariant?.sku || '—'}</div>
            </div>
            <div className="flex-1 min-w-0 py-4 px-2 sm:px-4 border-r border-[#b7b7a4]/35">
              <div className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#a5a58d] mb-1.5">{t('specWeight')}</div>
              <div className="text-[12px] sm:text-[15px] font-bold text-[#20221c] break-words">{product.weight ? `${product.weight} kg` : '—'}</div>
            </div>
            <div className="flex-1 min-w-0 py-4 pl-2 sm:pl-4">
              <div className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#a5a58d] mb-1.5">{t('specCategory')}</div>
              <div className="text-[12px] sm:text-[15px] font-bold text-[#20221c] break-words">{(product.category as any)?.name || product.category || '—'}</div>
            </div>
          </div>

          {/* Variant Selector — no card wrapper */}
          {product.variants.length > 1 && (
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#20221c]/50 uppercase tracking-widest">{t('selectSize')}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedVariantId}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    className="text-[12px] text-[#a5a58d] font-semibold"
                  >
                    {selectedVariant?.title} {t('selected')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div
                className="grid gap-2.5"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))' }}
              >
                {product.variants.map((variant) => {
                  const isSelected = selectedVariantId === variant.id
                  return (
                    <motion.button
                      key={variant.id}
                      onClick={() => variant.inStock && setSelectedVariantId(variant.id)}
                      disabled={!variant.inStock}
                      whileTap={variant.inStock ? { scale: 0.94 } : undefined}
                      className={`relative min-w-0 flex flex-col items-center gap-0.5 py-3.5 px-2 rounded-2xl overflow-hidden ${
                        isSelected
                          ? 'text-[#fff1e6]'
                          : 'bg-transparent text-[#20221c] border-[1.5px] border-[#b7b7a4]/45 hover:border-[#a5a58d] transition-colors'
                      } ${!variant.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="variant-active-pill"
                          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                          className="absolute inset-0 bg-[#20221c] rounded-2xl -z-10"
                        />
                      )}
                      <motion.span
                        animate={isSelected ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                        className="text-sm font-bold"
                      >
                        {variant.title}
                      </motion.span>
                      <span className={`text-[11px] ${isSelected ? 'opacity-70' : 'opacity-55'}`}>
                        {variant.salePrice || variant.price}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Purchase row — Add to Cart is the site's actual HeroButton, matching the homepage hero exactly.
              Stacks on mobile/tablet so the button always has room to show its label; inlines from lg up. */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-4">
           <div className="flex items-center gap-3 self-start">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              className="!h-14 !w-[120px] !rounded-full shrink-0"
            />
            <motion.button
              onClick={handleWishlistClick}
              disabled={isWishlistPending}
              aria-label={t('toggleWishlist')}
              whileTap={{ scale: 0.85 }}
              className={`relative w-14 h-14 rounded-full border-[1.5px] flex items-center justify-center shrink-0 overflow-visible transition-colors duration-300 ${
                inWishlist ? 'border-[#cb997e] bg-[#fff1e6] text-[#cb997e]' : 'border-[#b7b7a4]/45 bg-white text-[#20221c]/45 hover:border-[#a5a58d]'
              }`}
            >
              <AnimatedWishlistHeart inWishlist={inWishlist} isPending={isWishlistPending} showBurst={showParticles} size={18} />
            </motion.button>
           </div>
            <HeroButton
              onClick={handleAddToCart}
              disabled={!selectedVariant?.inStock}
              icon={justAdded ? <Check size={14} strokeWidth={2.5} /> : <ShoppingCart size={14} strokeWidth={2} />}
              className="w-full lg:flex-1 !h-14"
            >
              {justAdded ? t('added') : (selectedVariant?.inStock ? t('addToCart') : t('outOfStock'))}
            </HeroButton>
          </div>

          {/* Buy Now — plain link, not a competing second button */}
          <button
            className="flex items-center justify-center gap-1.5 text-[12px] font-bold tracking-[0.08em] uppercase text-[#20221c] hover:text-[#cb997e] transition-colors mb-7 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => {
              handleAddToCart()
              setTimeout(() => window.location.href = '/checkout', 300)
            }}
            disabled={!selectedVariant?.inStock}
          >
            {t('buyNow')}
            <ChevronRight size={13} />
          </button>

          {/* Trust row — plain, hairline-divided on sm+; wraps as simple centered chips on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 mb-7">
            {[
              { Icon: Globe, label: t('shipsWorldwide') },
              { Icon: Lock, label: t('secureCheckout') },
              { Icon: FlaskConical, label: t('thirdPartyTested') },
            ].map(({ Icon, label }, i, arr) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <Icon size={15} strokeWidth={2.2} className="text-[#a5a58d] shrink-0" />
                  <span className="text-[11.5px] font-semibold text-[#20221c]/65 whitespace-nowrap">{label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:block w-px h-4 bg-[#b7b7a4]/40" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* COA Download (mobile / no left panel) */}
          {product.coaFile && (
            <a
              href={product.coaFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-[11px] font-bold text-[#20221c]/55 uppercase tracking-[0.2em] hover:text-[#20221c] transition-colors mb-7 lg:hidden bg-white py-4 rounded-full border border-[#b7b7a4]/30 shadow-sm"
            >
              <Download size={14} />
              {t('certificateOfAnalysis')}
            </a>
          )}

          {/* Bulk Bundles — no card wrapper */}
          {product.bulkBundles && product.bulkBundles.length > 0 && (
            <div className="border-t border-[#b7b7a4]/35 pt-5">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[12px] font-bold text-[#20221c] uppercase tracking-widest">{t('buyMoreSaveMore')}</span>
                <ChevronDown size={15} className="text-[#20221c]" />
              </div>
              <div className="flex flex-col">
                {product.bulkBundles.map((bundle, idx) => {
                  let priceNum = 0;
                  let salePriceNum = 0;
                  let discount = 0;
                  let bundleVariantSku = bundle.name;
                  let bundleVariantTitle = bundle.name;

                  const currentVariantSku = selectedVariant?.sku || selectedVariant?.title || t('variant');
                  const currentVariantTitle = selectedVariant?.title || t('variant');

                  const override = (bundle as any).variantOverrides?.find((vo: any) => vo.variantSku === currentVariantSku || vo.variantSku === selectedVariant?.sku || vo.variantSku === selectedVariant?.title);

                  if (override) {
                    priceNum = override.price;
                    salePriceNum = override.salePrice || 0;
                    discount = salePriceNum ? Math.round(((priceNum - salePriceNum) / priceNum) * 100) : 0;
                    bundleVariantSku = `${currentVariantSku} - ${bundle.name}`;
                    bundleVariantTitle = `${currentVariantTitle} - ${bundle.name}`;
                  } else if (typeof bundle.discountPercentage === 'number' && bundle.discountPercentage > 0) {
                    const basePrice = parseFloat(String(selectedVariant?.salePrice || selectedVariant?.price || 0).replace(/[^0-9.]/g, ''))
                    priceNum = basePrice * bundle.quantity
                    salePriceNum = priceNum * (1 - (bundle.discountPercentage / 100))
                    discount = bundle.discountPercentage
                    bundleVariantSku = `${currentVariantSku} - ${bundle.name}`
                    bundleVariantTitle = `${currentVariantTitle} - ${bundle.name}`;
                  } else {
                    priceNum = typeof bundle.price === 'number' ? bundle.price : parseFloat(String(bundle.price || 0).replace(/[^0-9.]/g, ''))
                    salePriceNum = bundle.salePrice ? (typeof bundle.salePrice === 'number' ? bundle.salePrice : parseFloat(String(bundle.salePrice).replace(/[^0-9.]/g, ''))) : 0
                    discount = salePriceNum ? Math.round(((priceNum - salePriceNum) / priceNum) * 100) : 0
                  }

                  return (
                    <button
                      key={bundle.id || idx}
                      onClick={() => {
                        cartStore.addItem({ id: product.id, name: product.name, imageUrl: product.images[0], slug: product.slug }, bundleVariantSku, 1, salePriceNum || priceNum, bundleVariantTitle)
                        setJustAdded(true)
                        toast.success(t('addedBundleToCart'), { action: { label: t('view'), onClick: cartStore.openCart } })
                        setTimeout(() => setJustAdded(false), 1500)
                      }}
                      className={`w-full flex items-center justify-between py-3.5 text-left group ${idx < product.bulkBundles!.length - 1 ? 'border-b border-[#b7b7a4]/25' : ''}`}
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-bold text-[#20221c] text-[14.5px] group-hover:text-[#cb997e] transition-colors">{bundle.name}</span>
                        {discount > 0 && (
                          <span className="text-[10.5px] font-bold text-[#a5a58d] uppercase tracking-widest">{t('savePercent', { percent: discount })}</span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#20221c] text-base">${(salePriceNum || priceNum).toFixed(2)}</span>
                        {salePriceNum > 0 && priceNum > 0 && salePriceNum !== priceNum && (
                          <span className="text-[12px] text-[#20221c]/40 line-through font-medium">${priceNum.toFixed(2)}</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 2. Credentials Section — same olive as the header, full-bleed, flush against the hero above */}
      <section ref={scienceSectionRef} className="relative overflow-hidden bg-[#a5a58d]">
        {/* Ghost watermark — white, continuously scroll-scrubbed (drifts, grows, intensifies) */}
        <motion.div
          style={{ y: watermarkY, scale: watermarkScale, opacity: watermarkOpacity }}
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-white select-none pointer-events-none leading-none tracking-tighter text-[140px] sm:text-[240px] lg:text-[380px] pr-4"
        >
          99.9
        </motion.div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28 relative z-10">

          {/* Header — scroll-scrubbed entrance, tied directly to scroll position */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <span className="text-white/70 text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase mb-4 block">{t('compoundProfile')}</span>
              <h2 className="font-heading font-black text-[32px]/[1.18] sm:text-[42px]/[1.14] lg:text-[52px]/[1.1] uppercase tracking-tighter text-white leading-[1.18] sm:leading-[1.14] lg:leading-[1.1] break-words">
                {t('theScienceHeadline')}
              </h2>
              <p className="font-serif italic font-medium text-lg sm:text-xl text-white/80 mt-2">
                {t('theScienceSubtitle')}
              </p>
            </div>
            {product.coaFile && (
              <HeroButton
                href={product.coaFile}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="self-start sm:self-auto"
              >
                {t('downloadCertificate')}
              </HeroButton>
            )}
          </motion.div>

          {/* Accent rule that draws itself in as you scroll */}
          <motion.div
            style={{ scaleX: ruleScaleX }}
            className="h-px w-full bg-white/25 origin-left mb-14 lg:mb-20"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-10 lg:gap-x-0 lg:divide-x lg:divide-white/20">
            {[
              { value: '≥99%',    label: t('statVerifiedPurityLabel'),  desc: t('statVerifiedPurityDesc')          },
              { value: t('statLabTestedValue'), label: t('statLabTestedLabel'),       desc: t('statLabTestedDesc')    },
              { value: t('statGradeQualityValue'),  label: t('statGradeQualityLabel'),    desc: t('statGradeQualityDesc')        },
              { value: 'COA',       label: t('statDocumentedLabel'),       desc: t('statDocumentedDesc')       },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-0 lg:px-6 xl:px-8 first:lg:pl-0 last:lg:pr-0 group"
              >
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#20221c]/40 group-hover:bg-[#cb997e] transition-colors duration-300 shrink-0" />
                  <span className="text-[#20221c]/70 text-[9px] sm:text-[10px] font-black tracking-[0.16em] sm:tracking-[0.2em] uppercase">
                    {stat.label}
                  </span>
                </div>
                <div className="font-display font-bold text-white text-[26px] sm:text-5xl lg:text-[3.5rem] tracking-tighter leading-none mb-2.5 sm:mb-3 break-words group-hover:text-[#20221c] transition-colors duration-300">
                  {stat.value}
                </div>
                <p className="text-white/75 text-[13px] sm:text-sm font-medium tracking-wide leading-relaxed max-w-[200px]">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Details Tab Section */}
      <section className="w-full relative z-10 py-20 lg:py-32 bg-[#f0efeb]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetailTabs tabs={product.tabs} />
        </div>
      </section>

      {/* 5. Related Editorial Carousel */}
      <section className="w-full py-24 bg-[#f0efeb] overflow-hidden relative">
        <Container size="wide" className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#a5a58d] text-[9px] sm:text-[11px] uppercase tracking-[0.28em] font-bold mb-3 sm:mb-4 block">{t('continueExploring')}</span>
              <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[48px] leading-none font-black tracking-tight text-[#20221c] uppercase break-words">
                {t('alsoConsidered')}
              </h2>
            </div>

            {/* Carousel Navigation */}
            <div className="flex gap-3">
              <button
                onClick={() => relatedEmblaApi?.scrollPrev()}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#20221c] text-[#fff1e6] flex items-center justify-center hover:bg-[#cb997e] transition-colors duration-300 shadow-[0_4px_14px_rgba(32,34,28,0.2)]"
                aria-label={t('previousProducts')}
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => relatedEmblaApi?.scrollNext()}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#20221c] text-[#fff1e6] flex items-center justify-center hover:bg-[#cb997e] transition-colors duration-300 shadow-[0_4px_14px_rgba(32,34,28,0.2)]"
                aria-label={t('nextProducts')}
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div 
            className="relative -mx-4 px-4 sm:mx-0 sm:px-0 md:cursor-none md:[&_*]:!cursor-none"
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
            onMouseMove={handleSliderMouseMove}
          >
            <div className="overflow-hidden -m-6 p-6" ref={relatedEmblaRef}>
              <div className="flex gap-6 lg:gap-8 pb-6">
                {product.relatedProducts.map((p) => (
                  <div key={p.id} className="flex-[0_0_100%] sm:flex-[0_0_45%] lg:flex-[0_0_calc(25%-1.5rem)] min-w-0">
                    <ProductCard product={p as any} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2.5 FAQs Section (Moved to Bottom) */}
      {product.faqs && product.faqs.length > 0 && (
        <SharedFaqSection
          title={t('frequentlyAsked')}
          faqs={product.faqs}
        />
      )}

      {/* 3. Suggested Blogs Section */}
      {product.suggestedBlogs && product.suggestedBlogs.length > 0 && (
        <section className="w-full py-24 bg-[#f0efeb] border-t border-gray-100">
          <Container size="wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[#a5732f] text-label-sm uppercase tracking-[0.2em] font-bold mb-4 block">{t('educationAndResearch')}</span>
                <h2 className="font-heading text-[44px] sm:text-[56px] lg:text-[64px] leading-none font-black tracking-tighter text-black uppercase">
                  {t('furtherReading')}
                </h2>
              </div>
              <Button variant="outline" className="rounded-full font-bold border-black/20 hover:bg-black hover:text-white transition-all shadow-sm w-fit shrink-0">
                {t('viewAllResearch')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {product.suggestedBlogs.map((post) => (
                <BlogPostCard key={post.id} {...(post as any)} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Mobile Fixed Action Bar */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex items-center gap-3 lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.05)] pb-safe"
          >
            <motion.button
              whileHover={isWishlistPending ? {} : { scale: 1.05 }}
              whileTap={isWishlistPending ? {} : { scale: 0.9 }}
              className={`relative w-11 h-11 p-0 flex-shrink-0 rounded-full font-bold border transition-colors duration-300 flex items-center justify-center group outline-none disabled:opacity-70 overflow-visible ${
                inWishlist ? 'border-[#cb997e] bg-[#fff1e6] text-[#cb997e] shadow-sm' : 'border-black/10 bg-white text-black/60 hover:text-black hover:bg-gray-50'
              }`}
              aria-label={t('toggleWishlist')}
              onClick={handleWishlistClick}
              disabled={isWishlistPending}
            >
              <AnimatedWishlistHeart inWishlist={inWishlist} isPending={isWishlistPending} showBurst={showParticles} size={18} />
            </motion.button>

            <Button 
              variant="outline" 
              className="w-11 h-11 p-0 flex-shrink-0 rounded-full font-bold text-black border border-black bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
              aria-label={t('addToCart')}
              onClick={handleAddToCart}
              disabled={!selectedVariant?.inStock || justAdded}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={18} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShoppingCart size={18} strokeWidth={1.5} className="group-hover:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <Button 
              variant="dark" 
              className="flex-1 h-11 rounded-full font-bold text-white bg-gradient-to-r from-black to-gray-800 hover:from-black hover:to-black transition-all duration-300 text-[11px] uppercase tracking-widest border-none shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
              onClick={() => {
                handleAddToCart()
                setTimeout(() => window.location.href = '/checkout', 300)
              }}
              disabled={!selectedVariant?.inStock}
            >
              {t('buyNow')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Swipe Cursor */}
      <AnimatePresence>
        {isHoveringSlider && (
          <motion.div
            initial={{ scale: 0, opacity: 0, padding: '0px' }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              padding: isSliderAtEnd ? '0 24px' : '0px'
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed top-0 left-0 h-[72px] bg-white/90 backdrop-blur-md text-black rounded-full flex items-center justify-center pointer-events-none z-[100] text-[10px] font-bold tracking-[0.2em] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-black/10 hidden md:flex overflow-hidden"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              minWidth: '72px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isSliderAtEnd ? 'end' : 'swipe'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="whitespace-nowrap"
              >
                {isSliderAtEnd ? t('sliderEnd') : t('swipe')}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Lightbox */}
      <AnimatePresence>
        {isZoomOpen && galleryImages[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[#20221c]/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setIsZoomOpen(false)}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              aria-label={t('closeZoom')}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-4xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[activeImageIndex]}
                alt={shortName}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
