'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  X,
  ShoppingBag,
  Trash2,
  Truck,
  Check,
  Minus,
  Plus,
  Snowflake,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCartStore } from '@/lib/cart/store'
import { HeroButton } from '@/components/ui/hero-button'
import { toast } from 'sonner'

export function CartDrawer() {
  const t = useTranslations('checkout.cartDrawer')
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isOpen])

  // Esc key closes drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closeCart])

  const subtotal = items.reduce((acc, item) => acc + item.priceSnapshot * item.quantity, 0)
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0)

  const [isReady, setIsReady] = useState(false)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number | null>(null)
  const previousSubtotal = useRef(subtotal)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let active = true
    fetch('/api/shippingzones')
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.docs?.length > 0) {
          const methods = data.docs[0].methods || []
          const freeMethod = methods.find((m: any) => m.price === 0 && m.minOrderAmount > 0)
          if (freeMethod) {
            setFreeShippingThreshold(freeMethod.minOrderAmount)
          }
        }
      })
      .catch((err) => console.error('Error fetching shipping zones for cart drawer', err))

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (
      isReady &&
      freeShippingThreshold &&
      subtotal >= freeShippingThreshold &&
      previousSubtotal.current < freeShippingThreshold
    ) {
      toast.success(t('freeShippingUnlockedToast') || 'Free Insulated Shipping Unlocked!')
    }
    previousSubtotal.current = subtotal
  }, [subtotal, isReady, t, freeShippingThreshold])

  const progressToFreeShipping = freeShippingThreshold
    ? Math.min((subtotal / freeShippingThreshold) * 100, 100)
    : 0
  const amountToFreeShipping = freeShippingThreshold
    ? Math.max(freeShippingThreshold - subtotal, 0)
    : 0

  // Backdrop animation
  const backdropVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    open: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  }

  // Smooth drawer slide-over animation
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
        damping: 30,
        stiffness: 280,
        mass: 0.85,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end pointer-events-auto select-none overflow-hidden font-sans">
          {/* Ambient Blurred Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeCart}
            className="absolute inset-0 bg-[#20221c]/45 backdrop-blur-[6px]"
            aria-hidden="true"
          />

          {/* Minimalist Slide-Over Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ maxWidth: '480px' }}
            className="relative w-full sm:w-[460px] md:w-[480px] h-[100dvh] bg-[#f0efeb] border-l border-[#eddcd2] flex flex-col z-10 shadow-[-20px_0_60px_rgba(32,34,28,0.12)] overflow-hidden"
          >
            {/* --- 1. Top Header --- */}
            <div className="h-16 sm:h-[72px] px-4 sm:px-6 flex items-center justify-between shrink-0 bg-[#f0efeb] border-b border-[#eddcd2]">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[19px] sm:text-[21px] font-heading font-bold text-neutral-900 tracking-tight">
                  Shopping Bag
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-[#fff1e6] text-[#cb997e] border border-[#eddcd2]">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </span>
              </div>

              <button
                onClick={closeCart}
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-[#eddcd2] text-neutral-700 hover:text-[#cb997e] hover:border-[#cb997e] hover:bg-white active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                aria-label={t('closeCartAria')}
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>

            {items.length === 0 ? (
              /* --- 2. Empty State (Clean, Warm, Minimal) --- */
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center overflow-y-auto">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center mb-4 text-[#cb997e] shadow-2xs">
                  <ShoppingBag size={26} strokeWidth={1.5} />
                </div>

                <h3 className="text-[19px] sm:text-[21px] font-heading font-bold text-neutral-900 mb-1.5 tracking-tight">
                  Your bag is empty
                </h3>

                <p className="text-neutral-500 text-[13px] sm:text-[13.5px] max-w-xs mb-6 leading-relaxed font-sans font-normal">
                  Explore our verified research peptides and certified laboratory formulations.
                </p>

                <HeroButton
                  href="/shop"
                  onClick={closeCart}
                  text="Explore Catalog"
                  className="px-6 py-2.5 font-heading font-bold text-[13.5px]"
                />

                {/* Popular Categories Shortcut */}
                <div className="mt-8 pt-6 border-t border-[#eddcd2] w-full max-w-xs">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-2.5">
                    Featured Research Areas
                  </span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {[
                      { name: 'Metabolic', href: '/shop?category=Weight+Loss+%26+Metabolic' },
                      { name: 'Tissue Repair', href: '/shop?category=Cellular+Repair+%26+Healing' },
                      { name: 'Longevity', href: '/shop?category=Longevity+%26+Anti-Aging' },
                    ].map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={closeCart}
                        className="text-[11.5px] font-sans font-medium px-3 py-1 rounded-full bg-white border border-[#eddcd2] text-neutral-800 hover:border-[#cb997e] hover:text-[#cb997e] transition-colors shadow-2xs"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* --- 3. Populated Cart --- */
              <>
                {/* Free Shipping Milestone Indicator */}
                {freeShippingThreshold !== null && (
                  <div className="px-4 sm:px-6 py-2.5 bg-[#fff1e6]/90 border-b border-[#eddcd2] shrink-0">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[12px] text-neutral-800 flex items-center gap-1.5 font-sans font-medium">
                        <Truck size={13} className="text-[#cb997e] shrink-0" />
                        {amountToFreeShipping > 0 ? (
                          <span>
                            Add{' '}
                            <strong className="text-[#cb997e] font-price font-bold">
                              ${amountToFreeShipping.toFixed(2)}
                            </strong>{' '}
                            more for Free Shipping
                          </span>
                        ) : (
                          <span className="text-[#55724a] font-semibold flex items-center gap-1">
                            <Check size={13} strokeWidth={2.5} /> Free Insulated Shipping Unlocked!
                          </span>
                        )}
                      </span>
                      <span className="text-[10.5px] font-sans font-bold text-[#a5a58d]">
                        {Math.round(progressToFreeShipping)}%
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-[#eddcd2] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          progressToFreeShipping >= 100 ? 'bg-[#55724a]' : 'bg-[#cb997e]'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToFreeShipping}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                {/* Items List (Natural Organic Spacing, No Stretched Gaps) */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 overscroll-contain bg-[#f0efeb]">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      return (
                        <motion.div
                          key={item.lineId}
                          layout="position"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden', padding: 0 }}
                          transition={{ duration: 0.2 }}
                          className="py-4 sm:py-4.5 border-b border-[#eddcd2]/80 last:border-b-0 flex gap-3.5 sm:gap-4 items-start group"
                        >
                          {/* 3:4 Portrait Product Thumbnail */}
                          <Link
                            href={`/product/${item.product?.slug || item.productId}`}
                            onClick={closeCart}
                            className="relative w-[66px] h-[88px] sm:w-[72px] sm:h-[96px] rounded-xl bg-white shrink-0 overflow-hidden border border-[#eddcd2] hover:border-[#cb997e] transition-colors"
                          >
                            <Image
                              src={
                                item.product?.imageUrl ||
                                '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp'
                              }
                              alt={item.product?.name || 'Product'}
                              fill
                              sizes="(max-width: 640px) 66px, 72px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* Product Details & Controls (Locked height matching image for exact bottom alignment) */}
                          <div className="flex-1 min-w-0 h-[88px] sm:h-[96px] flex flex-col justify-between">
                            {/* Top Section: Title, Delete & Variant */}
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <Link
                                  href={`/product/${item.product?.slug || item.productId}`}
                                  onClick={closeCart}
                                  className="text-[14px] sm:text-[15.5px] font-heading font-bold text-neutral-900 hover:text-[#cb997e] transition-colors line-clamp-1 leading-snug tracking-tight block"
                                >
                                  {item.product?.name}
                                </Link>

                                <button
                                  onClick={() => removeItem(item.lineId)}
                                  className="text-neutral-400 hover:text-[#cb997e] hover:bg-[#fff1e6] p-1 rounded-md transition-colors cursor-pointer shrink-0 -mt-0.5 -mr-1"
                                  title={t('removeItemAria')}
                                  aria-label={t('removeItemAria')}
                                >
                                  <Trash2 size={14} strokeWidth={1.75} />
                                </button>
                              </div>

                              {/* Specification / Variant */}
                              <p className="text-[11.5px] sm:text-[12px] font-sans text-neutral-500 font-medium truncate mt-0.5 leading-tight">
                                {item.variantTitle || item.variantSku || 'Standard Vial'}
                              </p>
                            </div>

                            {/* Bottom Section: Stepper & Price (Exact same bottom level as product image) */}
                            <div className="flex items-end justify-between gap-2">
                              {/* Well-Proportioned Stepper */}
                              <div className="inline-flex items-center rounded-lg border border-[#eddcd2] bg-white p-0.5 shadow-2xs h-7.5 sm:h-8">
                                <button
                                  onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded text-neutral-600 hover:text-neutral-950 hover:bg-[#f0efeb] disabled:opacity-25 transition-all cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={11} strokeWidth={2.2} />
                                </button>

                                <span className="w-6 sm:w-7 text-center text-[11.5px] sm:text-xs font-price font-bold text-neutral-900 select-none">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                                  className="w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded text-neutral-600 hover:text-neutral-950 hover:bg-[#f0efeb] transition-all cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={11} strokeWidth={2.2} />
                                </button>
                              </div>

                              {/* Total Price & Unit Price (Zero layout shift via reserved slot) */}
                              <div className="text-right shrink-0 flex flex-col items-end justify-end">
                                <span className="text-[15px] sm:text-[16.5px] font-price font-bold text-neutral-900 tracking-tight leading-none">
                                  ${(item.priceSnapshot * item.quantity).toFixed(2)}
                                </span>
                                <span
                                  className={`text-[11px] font-price text-neutral-400 font-medium leading-tight mt-0.5 transition-opacity duration-150 ${
                                    item.quantity > 1 ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'
                                  }`}
                                  aria-hidden={item.quantity <= 1}
                                >
                                  ${item.priceSnapshot.toFixed(2)} each
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* --- 4. Sticky Bottom Summary & Checkout Section --- */}
                <div className="px-4 sm:px-6 pt-3.5 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pt-4 sm:pb-5 bg-[#f0efeb] border-t border-[#eddcd2] shrink-0 shadow-[0_-8px_24px_rgba(32,34,28,0.04)]">
                  {/* Order Breakdown */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3.5">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] sm:text-[14px] text-neutral-700 font-medium font-sans">
                        Subtotal
                      </span>
                      <span className="text-[20px] sm:text-[22px] font-price font-bold text-neutral-900 tracking-tight">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Estimated Shipping */}
                    <div className="flex justify-between items-center text-xs text-neutral-600 font-sans">
                      <span className="text-[12px] sm:text-[12.5px] text-neutral-600">
                        Estimated Shipping
                      </span>
                      <span className="text-[12px] sm:text-[12.5px] font-medium text-neutral-900">
                        {freeShippingThreshold && subtotal >= freeShippingThreshold ? (
                          <span className="text-[#55724a] font-semibold flex items-center gap-1">
                            <Check size={12} strokeWidth={2.5} /> Free
                          </span>
                        ) : (
                          'Calculated at checkout'
                        )}
                      </span>
                    </div>

                    {/* Insulated Packaging */}
                    <div className="flex justify-between items-center text-xs text-neutral-600 font-sans">
                      <span className="text-[12px] sm:text-[12.5px] text-neutral-600 flex items-center gap-1.5">
                        <Snowflake size={11} className="text-[#cb997e]" /> Insulated Cold-Chain
                      </span>
                      <span className="text-[12px] font-semibold text-[#cb997e]">
                        Included
                      </span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA */}
                  <div className="w-full mb-2.5">
                    <HeroButton
                      href="/checkout"
                      onClick={closeCart}
                      className="w-full py-3 sm:py-3.5 text-center justify-between text-[14.5px] sm:text-[15px] font-heading font-bold tracking-tight shadow-sm"
                    >
                      <span>Proceed to Checkout</span>
                    </HeroButton>
                  </div>

                  {/* View Full Cart Link */}
                  <div className="pt-2 flex justify-center text-xs">
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="text-[12px] text-neutral-600 hover:text-[#cb997e] transition-colors font-medium font-sans underline underline-offset-4 py-0.5"
                    >
                      View Full Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
