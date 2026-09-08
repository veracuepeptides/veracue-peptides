'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  X,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Lock,
  Truck,
  Check
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { QuantityStepper } from '@/components/shop/QuantityStepper'
import { useCartStore } from '@/lib/cart/store'
import { HeroButton } from '@/components/ui/hero-button'
import { toast } from 'sonner'

export function CartDrawer() {
  const t = useTranslations('checkout.cartDrawer')
  const { isOpen, closeCart, items, removeItem, updateQuantity } = useCartStore()

  // Lock body scroll when open
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

  // Esc key to close
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
    const timer = setTimeout(() => setIsReady(true), 500) // wait for hydration
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
      toast.success(t('freeShippingUnlockedToast') || 'Congratulations, you get Free Shipping!')
    }
    previousSubtotal.current = subtotal
  }, [subtotal, isReady, t, freeShippingThreshold])

  const progressToFreeShipping = freeShippingThreshold
    ? Math.min((subtotal / freeShippingThreshold) * 100, 100)
    : 0
  const amountToFreeShipping = freeShippingThreshold
    ? Math.max(freeShippingThreshold - subtotal, 0)
    : 0

  // Silky drawer animation variants
  const backdropVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } },
    open: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end pointer-events-auto select-none overflow-hidden font-sans">
          {/* Ambient Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Main Slide-Over Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="relative w-full sm:max-w-[460px] h-full bg-[#f0efeb] flex flex-col z-10 shadow-[-12px_0_40px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="h-[68px] sm:h-[74px] px-5 sm:px-7 flex items-center justify-between shrink-0 bg-[#f0efeb]/95 backdrop-blur-md border-b border-[#20221c]/10">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[20px] sm:text-[22px] font-editorial font-bold text-[#20221c] tracking-[0.02em]">
                  Shopping Cart
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide bg-[#20221c]/5 text-[#20221c]/70 border border-[#20221c]/8">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                </span>
              </div>

              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-white/80 border border-[#20221c]/10 text-[#20221c] hover:bg-white active:scale-95 transition-all flex items-center justify-center shadow-sm cursor-pointer"
                aria-label={t('closeCartAria')}
              >
                <X size={19} strokeWidth={2.2} />
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white border border-[#20221c]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-center mb-6 text-[#a5a58d]">
                  <ShoppingBag size={34} strokeWidth={1.75} />
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-editorial font-bold text-[#20221c] mb-2 tracking-[0.02em] leading-snug">
                  {t('emptyTitle')}
                </h3>
                <p className="text-[#20221c]/65 text-[14px] sm:text-[14.5px] font-sans max-w-xs mb-8 leading-relaxed font-normal">
                  {t('emptyText')}
                </p>

                <HeroButton
                  href="/shop"
                  onClick={closeCart}
                  text="Explore Research Catalog"
                  className="px-7 py-3.5"
                />

                {/* Quick Discovery Tags */}
                <div className="mt-10 pt-8 border-t border-[#20221c]/10 w-full max-w-xs">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#20221c]/45 block mb-3.5">
                    Popular Categories
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      { name: 'Metabolic', href: '/shop?category=Weight+Loss+%26+Metabolic' },
                      { name: 'Tissue Repair', href: '/shop?category=Cellular+Repair+%26+Healing' },
                      { name: 'Longevity', href: '/shop?category=Longevity+%26+Anti-Aging' },
                    ].map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={closeCart}
                        className="text-[12.5px] font-editorial font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[#20221c]/10 text-[#20221c] hover:border-[#cb997e] hover:text-[#cb997e] transition-colors shadow-xs tracking-[0.02em]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Populated Cart */
              <>
                {/* Free Shipping Milestone Bar */}
                {freeShippingThreshold !== null && (
                  <div className="px-5 sm:px-7 py-3.5 bg-white border-b border-[#20221c]/8">
                    <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                      <span className="text-[#20221c]/80 text-[12.5px] font-editorial tracking-[0.02em] flex items-center gap-1.5">
                        <Truck size={14} className="text-[#cb997e]" />
                        {amountToFreeShipping > 0 ? (
                          <span>
                            Add{' '}
                            <strong className="text-[#20221c] font-bold font-mono">
                              ${amountToFreeShipping.toFixed(2)}
                            </strong>{' '}
                            more for Free Shipping
                          </span>
                        ) : (
                          <span className="text-[#55724a] font-bold flex items-center gap-1">
                            <Check size={14} strokeWidth={2.5} /> Free Insulated Shipping Unlocked!
                          </span>
                        )}
                      </span>
                      <span className="text-[10.5px] font-mono font-bold text-[#20221c]/50">
                        {Math.round(progressToFreeShipping)}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#f0efeb] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          progressToFreeShipping >= 100 ? 'bg-[#6B8E5E]' : 'bg-[#cb997e]'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToFreeShipping}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 overscroll-contain">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.lineId}
                        layout
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#20221c]/8 shadow-[0_2px_12px_rgba(40,42,33,0.02)] hover:border-[#20221c]/16 transition-all flex gap-3.5 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 rounded-xl bg-[#f0efeb] shrink-0 overflow-hidden border border-[#20221c]/8">
                          <Image
                            src={
                              item.product?.imageUrl ||
                              '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp'
                            }
                            alt={item.product?.name || 'Product'}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col flex-1 justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <Link
                                href={`/product/${item.product?.slug || item.productId}`}
                                onClick={closeCart}
                                className="text-[15px] sm:text-[16px] font-editorial font-bold text-[#20221c] hover:text-[#cb997e] transition-colors line-clamp-1 leading-snug tracking-[0.01em]"
                              >
                                {item.product?.name}
                              </Link>

                              <button
                                onClick={() => removeItem(item.lineId)}
                                className="text-[#20221c]/35 hover:text-red-500 hover:bg-red-50 transition-colors p-1.5 rounded-lg -mt-1 -mr-1 cursor-pointer"
                                title={t('removeItemAria')}
                                aria-label={t('removeItemAria')}
                              >
                                <Trash2 size={15} strokeWidth={2} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11.5px] font-mono text-[#20221c]/60 font-medium">
                                {item.variantTitle || item.variantSku || 'Standard Vial'}
                              </span>
                              <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#6B8E5E]/12 text-[#4f6e42] border border-[#6B8E5E]/20">
                                ≥99% HPLC
                              </span>
                            </div>
                          </div>

                          {/* Stepper & Price Row */}
                          <div className="flex items-end justify-between mt-3 pt-2 border-t border-[#20221c]/5">
                            <QuantityStepper
                              value={item.quantity}
                              onChange={(val) => updateQuantity(item.lineId, val)}
                              theme="light"
                              size="sm"
                            />

                            <div className="text-right">
                              <span className="text-[16px] sm:text-[17px] font-bold font-editorial text-[#20221c] tracking-[0.02em]">
                                ${(item.priceSnapshot * item.quantity).toFixed(2)}
                              </span>
                              {item.quantity > 1 && (
                                <span className="block text-[10.5px] text-[#20221c]/50 font-mono font-normal">
                                  (${item.priceSnapshot.toFixed(2)} ea)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Sticky Bottom Order Summary */}
                <div className="px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-7 sm:pb-6 bg-white border-t border-[#20221c]/10 shrink-0 shadow-[0_-8px_24px_rgba(0,0,0,0.03)]">
                  {/* Financial Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs text-[#20221c]/70">
                      <span className="text-[12.5px] font-editorial uppercase tracking-[0.06em] font-medium text-[#20221c]/70">
                        {t('subtotal')}
                      </span>
                      <span className="text-[20px] sm:text-[22px] font-bold font-editorial text-[#20221c] tracking-[0.02em]">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-[#20221c]/70">
                      <span className="text-[12.5px] font-editorial uppercase tracking-[0.06em] font-medium text-[#20221c]/70">
                        {t('shipping')}
                      </span>
                      <span className="text-[13px] font-editorial font-semibold text-[#20221c]/80">
                        {freeShippingThreshold && subtotal >= freeShippingThreshold ? (
                          <span className="text-[#55724a] font-bold">FREE</span>
                        ) : (
                          t('calculatedAtCheckout')
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-[#20221c]/70">
                      <span className="text-[12.5px] font-editorial uppercase tracking-[0.06em] font-medium text-[#20221c]/70">
                        Insulated Packaging
                      </span>
                      <span className="text-[13px] font-editorial font-semibold text-[#55724a]">
                        Complimentary
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <div className="w-full mb-2.5">
                    <HeroButton
                      href="/checkout"
                      onClick={closeCart}
                      text="Proceed to Checkout"
                      className="w-full py-3.5 text-center justify-center text-[15px] font-editorial font-bold tracking-[0.03em]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="text-[11.5px] font-editorial font-semibold text-[#20221c]/65 hover:text-[#cb997e] uppercase tracking-[0.14em] transition-colors"
                    >
                      {t('viewFullCart') || 'View Full Cart'}
                    </Link>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-3 text-[10px] text-[#20221c]/55 font-mono font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Lock size={11} /> 256-Bit SSL
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={11} /> HPLC Verified
                      </span>
                    </div>
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
