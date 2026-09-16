'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  Trash2,
  ShieldCheck,
  Snowflake,
  Truck,
  Tag,
  Minus,
  Plus,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import { HeroButton } from '@/components/ui/hero-button'
import { useCartStore } from '@/lib/cart/store'
import { ProductCard } from '@/components/shared/ProductCard'
import { StaggerChildren, staggerItemVariants } from '@/components/motion/StaggerChildren'
import { useSearchParams, useRouter } from 'next/navigation'
import { getProductsFromAffiliateCart } from '@/app/(frontend)/actions/cart'

export function CartClient() {
  const t = useTranslations('checkout.cartClient')
  const {
    items,
    removeItem,
    updateQuantity,
    couponCode: storedCouponCode,
    setCoupon,
    clear,
    setItems,
  } = useCartStore()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Dynamic Data States
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number | null>(null)
  const [taxAmount, setTaxAmount] = useState<number>(0)
  const [feePercentage, setFeePercentage] = useState<number | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  // Cart Hydration Guard
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    if (useCartStore.persist.hasHydrated()) {
      setHasHydrated(true)
      return
    }
    return useCartStore.persist.onFinishHydration(() => setHasHydrated(true))
  }, [])

  // Coupon States
  const [couponCode, setCouponCode] = useState('')
  const [couponState, setCouponState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [couponMessage, setCouponMessage] = useState('')
  const [activeCoupon, setActiveCoupon] = useState<any>(null)

  // Related Products State
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  // Base Subtotal & Quantity
  const subtotal = items.reduce((acc, item) => acc + item.priceSnapshot * item.quantity, 0)
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  // Handle Affiliate Cart URL Parameters
  useEffect(() => {
    const affiliateCartParams = searchParams.get('affiliate-cart')
    const shouldClear = searchParams.get('clear-cart') === '1'

    if (affiliateCartParams) {
      const origin = searchParams.get('origin')
      if (origin && /^[a-zA-Z0-9_-]{1,50}$/.test(origin)) {
        document.cookie = `order_source=${origin}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      }

      setIsLoadingData(true)
      getProductsFromAffiliateCart(affiliateCartParams)
        .then((fetchedItems) => {
          if (fetchedItems && fetchedItems.length > 0) {
            if (shouldClear) {
              setItems(fetchedItems)
            } else {
              const merged = [...items]
              fetchedItems.forEach((fi) => {
                const existing = merged.find(
                  (mi) => mi.productId === fi.productId && mi.variantSku === fi.variantSku
                )
                if (existing) {
                  existing.quantity += fi.quantity
                } else {
                  merged.push(fi)
                }
              })
              setItems(merged)
            }
          }

          const url = new URL(window.location.href)
          url.searchParams.delete('affiliate-cart')
          url.searchParams.delete('clear-cart')
          url.searchParams.delete('empty-cart')
          url.searchParams.delete('origin')
          url.searchParams.delete('utm_source')
          url.searchParams.delete('utm_medium')
          url.searchParams.delete('utm_campaign')
          router.replace(url.pathname + url.search)
        })
        .catch((err) => {
          console.error('Failed to parse affiliate cart:', err)
        })
        .finally(() => {
          setIsLoadingData(false)
        })
    }
  }, [searchParams, router, setItems, items])

  // Fetch Shipping Zones, Processing Fees, and Related Products
  useEffect(() => {
    if (!hasHydrated) return

    async function fetchCartData() {
      setIsLoadingData(true)
      try {
        const shippingRes = await fetch('/api/shippingzones')
        const shippingData = await shippingRes.json()

        let estimatedShipping = 15 // Fallback
        if (shippingData?.docs?.length > 0) {
          const firstZone = shippingData.docs[0]
          const methods = firstZone.methods || []
          if (methods.length > 0) {
            estimatedShipping = methods[0].price
            const freeMethod = methods.find((m: any) => m.price === 0 && m.minOrderAmount > 0)
            if (freeMethod) {
              setFreeShippingThreshold(freeMethod.minOrderAmount)
            }
          }
        }

        const feesRes = await fetch('/api/processing-fees')
        const feesData = await feesRes.json()

        let calculatedTax = 0
        let percentageFee: number | null = null
        if (feesData?.docs?.length > 0) {
          feesData.docs.forEach((fee: any) => {
            if (fee.isActive && !fee.isOptional) {
              if (fee.type === 'percentage') {
                calculatedTax += subtotal * (fee.amount / 100)
                percentageFee = fee.amount
              } else if (fee.type === 'fixed_amount') {
                calculatedTax += fee.amount
              }
            }
          })
        }

        setShippingCost(estimatedShipping)
        setTaxAmount(calculatedTax)
        setFeePercentage(percentageFee)
      } catch (err) {
        console.error('Error fetching dynamic cart data', err)
        setShippingCost(15)
      } finally {
        setIsLoadingData(false)
      }
    }

    async function fetchRelatedProducts() {
      try {
        const res = await fetch('/api/products?limit=4&depth=1')
        const data = await res.json()
        if (data?.docs?.length > 0) {
          const mapped = data.docs.map((p: any) => {
            let displayPrice = typeof p.price === 'number' ? p.price : 0
            let displaySalePrice =
              typeof p.salePrice === 'number' && p.salePrice > 0 ? p.salePrice : undefined
            let isFrom = false

            if (p.hasVariants && p.variants && p.variants.length > 0) {
              const prices = p.variants
                .map((v: any) =>
                  typeof v.salePrice === 'number' && v.salePrice > 0 ? v.salePrice : v.price
                )
                .filter(Boolean)
              if (prices.length > 0) {
                const minVariantPrice = Math.min(...prices)
                const maxVariantPrice = Math.max(...prices)
                if (minVariantPrice !== maxVariantPrice) {
                  isFrom = true
                }
                displayPrice = minVariantPrice

                const cheapestVariant = p.variants.find(
                  (v: any) => (v.salePrice || v.price) === minVariantPrice
                )
                if (
                  cheapestVariant &&
                  typeof cheapestVariant.salePrice === 'number' &&
                  cheapestVariant.salePrice > 0
                ) {
                  displaySalePrice = cheapestVariant.salePrice
                  displayPrice = cheapestVariant.price
                } else {
                  displaySalePrice = undefined
                }
              }
            }

            return {
              id: p.id,
              name: p.name,
              slug: p.slug,
              image: p.images?.[0]?.image?.url || p.imageUrl || '/placeholder.png',
              hoverImage: p.images?.[1]?.image?.url || undefined,
              shortDescription: p.shortDescription || p.description || p.descriptor || '',
              priceRange: displaySalePrice
                ? `${isFrom ? t('fromPricePrefix') || 'From ' : ''}$${displaySalePrice.toFixed(2)}`
                : `${isFrom ? t('fromPricePrefix') || 'From ' : ''}$${displayPrice.toFixed(2)}`,
              originalPrice:
                displaySalePrice && !isFrom ? `$${displayPrice.toFixed(2)}` : undefined,
              discountPercentage:
                displaySalePrice && displayPrice > 0
                  ? Math.round(((displayPrice - displaySalePrice) / displayPrice) * 100)
                  : undefined,
              category:
                typeof p.category === 'object'
                  ? p.category?.name
                  : t('categoryFallback') || 'Research Peptide',
            }
          })
          setRelatedProducts(mapped)
        }
      } catch (err) {
        console.error('Error fetching related products', err)
      }
    }

    fetchCartData()
    fetchRelatedProducts()
  }, [subtotal, hasHydrated, t])

  // Handle Coupon Application
  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = typeof codeToApply === 'string' ? codeToApply : couponCode
    if (!code) return

    setCouponState('loading')
    setCouponMessage('')

    try {
      const res = await fetch(`/api/validate-coupon?code=${encodeURIComponent(code.trim())}`)
      const data = await res.json()
      const coupon = data?.coupon

      if (coupon && coupon.isActive !== false) {
        try {
          const meRes = await fetch('/api/users/me')
          const meData = await meRes.json()
          const userId = meData?.user?.id

          if (userId) {
            const affRes = await fetch(
              `/api/affiliates?where[user][equals]=${userId}&where[couponCode][equals]=${coupon.code}`
            )
            const affData = await affRes.json()
            if (affData?.docs?.length > 0) {
              setCouponState('error')
              setCouponMessage('You cannot use your own affiliate coupon.')
              return
            }
          }
        } catch (e) {
          console.error('Error checking coupon affiliate:', e)
        }

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          setCouponState('error')
          setCouponMessage(t('couponExpired') || 'This coupon has expired.')
          return
        }

        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
          setCouponState('error')
          setCouponMessage(t('couponUsageLimitReached') || 'Coupon usage limit reached.')
          return
        }

        if (coupon.minSpend && subtotal < coupon.minSpend) {
          setCouponState('error')
          setCouponMessage(
            t('couponMinSpend', { amount: coupon.minSpend.toFixed(2) }) ||
              `Minimum spend of $${coupon.minSpend.toFixed(2)} required.`
          )
          return
        }

        setActiveCoupon(coupon)
        setCouponState('success')
        setCouponMessage(t('couponAppliedSuccess') || `Coupon "${coupon.code}" applied!`)
        setCoupon(coupon.code)
      } else {
        setCouponState('error')
        setCouponMessage(t('couponInvalid') || 'Invalid coupon code.')
      }
    } catch (err) {
      setCouponState('error')
      setCouponMessage(t('couponValidationError') || 'Unable to validate coupon.')
    }
  }

  const handleRemoveCoupon = () => {
    setActiveCoupon(null)
    setCouponCode('')
    setCouponState('idle')
    setCouponMessage('')
    setCoupon(null)
  }

  // Pre-fill stored coupon
  useEffect(() => {
    if (activeCoupon) {
      if (activeCoupon.minSpend && subtotal < activeCoupon.minSpend) {
        setActiveCoupon(null)
        setCouponCode('')
        setCouponState('error')
        setCouponMessage(
          t('couponMinSpend', { amount: activeCoupon.minSpend.toFixed(2) }) ||
            `Minimum spend of $${activeCoupon.minSpend.toFixed(2)} required.`
        )
        setCoupon(null)
      }
    } else if (storedCouponCode && couponState === 'idle') {
      setCouponCode(storedCouponCode)
      handleApplyCoupon(storedCouponCode)
    }
  }, [subtotal, storedCouponCode, activeCoupon, couponState, t])

  // Calculate Discounts
  let discountAmount = 0
  let isFreeShipping = false
  let eligibleSubtotal = 0

  if (activeCoupon) {
    if (activeCoupon.freeShipping) {
      isFreeShipping = true
    }

    items.forEach((item) => {
      let eligible = true
      if (activeCoupon.excludeSaleItems && (item.product as any)?.salePrice) {
        eligible = false
      }
      if (activeCoupon.applicableProductTypes && activeCoupon.applicableProductTypes !== 'all') {
        const isBulkBundle =
          typeof item.variantSku === 'string' && item.variantSku.includes(' - ')
        if (activeCoupon.applicableProductTypes === 'normal_only' && isBulkBundle) {
          eligible = false
        } else if (activeCoupon.applicableProductTypes === 'bulk_only' && !isBulkBundle) {
          eligible = false
        }
      }
      if (eligible && activeCoupon.appliesTo === 'specific_products') {
        const allowedProductIds = (activeCoupon.products || []).map((p: any) =>
          typeof p.product === 'object' ? p.product.id : p.product
        )
        if (!allowedProductIds.includes(item.productId)) eligible = false
      }
      if (eligible) {
        eligibleSubtotal += item.priceSnapshot * item.quantity
      }
    })

    if (activeCoupon.type === 'percentage') {
      discountAmount = eligibleSubtotal * (activeCoupon.value / 100)
    } else if (activeCoupon.type === 'fixed_amount') {
      discountAmount = Math.min(activeCoupon.value / 100, eligibleSubtotal)
    }
  }

  // Shipping logic
  const qualifiesForThresholdFreeShipping =
    freeShippingThreshold !== null && subtotal >= freeShippingThreshold
  const qualifiesForFreeShipping = isFreeShipping || qualifiesForThresholdFreeShipping
  const finalShipping = qualifiesForFreeShipping || subtotal === 0 ? 0 : shippingCost || 0
  const finalTotal = Math.max(0, subtotal - discountAmount + finalShipping + taxAmount)

  // Loading / Hydration State
  if (!hasHydrated) {
    return (
      <Container size="page" className="py-24 flex items-center justify-center min-h-[50vh]">
        <Loader2 size={24} className="animate-spin text-[#cb997e]" />
      </Container>
    )
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <Container size="page" className="py-12 sm:py-16 md:py-20">
        <div className="max-w-xl mx-auto rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-8 sm:p-14 text-center">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center mx-auto mb-6 text-[#cb997e] shadow-2xs">
            <ShoppingBag size={30} strokeWidth={1.5} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-neutral-900 tracking-tight mb-2.5">
            Your Shopping Cart is Empty
          </h1>

          <p className="text-sm sm:text-base text-neutral-500 max-w-sm mx-auto mb-8 font-sans leading-relaxed">
            Explore our verified research peptides and certified laboratory formulations.
          </p>

          <HeroButton
            href="/shop"
            variant="olive"
            text="Explore Research Catalog"
            className="px-8 py-3 font-sans font-semibold text-sm inline-flex justify-center"
          />

          {/* Quick Categories */}
          <div className="mt-10 pt-8 border-t border-[#eddcd2] w-full max-w-sm mx-auto">
            <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-3">
              Popular Research Areas
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
                  className="text-xs font-sans font-medium px-3.5 py-1.5 rounded-full bg-[#f0efeb] border border-[#eddcd2] text-neutral-800 hover:border-[#cb997e] hover:text-[#cb997e] hover:bg-white transition-all shadow-2xs"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div className="w-full mx-auto px-3 sm:px-6 md:px-10 max-w-7xl">
      {/* --- Breadcrumb Navigation --- */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-neutral-500 hover:text-[#cb997e] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* --- Page Heading --- */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-10">
        <h1 className="text-[24px] xs:text-[26px] sm:text-3xl md:text-4xl font-sans font-bold text-neutral-900 tracking-[-0.03em] leading-tight sm:leading-none">
          Shopping Cart
        </h1>
        <span className="whitespace-nowrap shrink-0 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-sans font-semibold bg-[#fff1e6] text-[#cb997e] border border-[#eddcd2]">
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* --- Main 2-Column Layout (Matching Reference Design) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================================================================== */}
        {/* LEFT COLUMN: Products Table Card                                     */}
        {/* ==================================================================== */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-5 sm:p-7 md:p-8 overflow-hidden">
            {/* Desktop / Tablet Table Header */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 pb-4 border-b border-[#eddcd2] text-[11px] sm:text-[11.5px] font-sans font-bold uppercase tracking-[0.14em] text-[#a5a58d]">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* Cart Item Rows */}
            <div className="divide-y divide-[#eddcd2]/80">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.lineId}
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden', padding: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-5 sm:py-6"
                  >
                    {/* Desktop & Tablet Row (Grid Layout matching reference) */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
                      {/* Product (Thumbnail + Name + Variant) */}
                      <div className="col-span-6 flex items-center gap-4 min-w-0">
                        <Link
                          href={`/product/${item.product?.slug || item.productId}`}
                          className="relative w-[68px] h-[90px] sm:w-[74px] sm:h-[98px] rounded-xl overflow-hidden bg-[#f0efeb] border border-[#eddcd2] shrink-0 group hover:border-[#cb997e] transition-colors"
                        >
                          <Image
                            src={
                              item.product?.imageUrl ||
                              '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp'
                            }
                            alt={item.product?.name || 'Product'}
                            fill
                            sizes="74px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="flex-1 min-w-0 pr-2">
                          <Link
                            href={`/product/${item.product?.slug || item.productId}`}
                            className="font-sans font-bold text-[15px] sm:text-[16px] text-neutral-900 hover:text-[#cb997e] transition-colors leading-snug line-clamp-1 block tracking-tight"
                          >
                            {item.product?.name}
                          </Link>

                          <p className="text-xs font-sans text-neutral-500 font-medium truncate mt-1">
                            {item.variantTitle || item.variantSku || 'Standard Vial'}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Stepper (Pill Shape matching reference) */}
                      <div className="col-span-3 flex justify-center">
                        <div className="inline-flex items-center rounded-full border border-[#eddcd2] bg-[#f0efeb]/70 p-1 shadow-2xs h-9">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-white disabled:opacity-25 transition-all cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={2.2} />
                          </button>

                          <span className="w-8 text-center text-xs font-price font-bold text-neutral-900 select-none">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:bg-white transition-all cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={2.2} />
                          </button>
                        </div>
                      </div>

                      {/* Total Price & Unit Price */}
                      <div className="col-span-2 text-right flex flex-col items-end justify-center">
                        <span className="text-[16px] sm:text-[17.5px] font-price font-bold text-neutral-900 tracking-tight leading-none">
                          ${(item.priceSnapshot * item.quantity).toFixed(2)}
                        </span>
                        <span
                          className={`text-[11px] font-price text-neutral-400 font-normal leading-tight mt-1 transition-opacity duration-150 ${
                            item.quantity > 1
                              ? 'opacity-100'
                              : 'opacity-0 select-none pointer-events-none'
                          }`}
                          aria-hidden={item.quantity <= 1}
                        >
                          ${item.priceSnapshot.toFixed(2)} each
                        </span>
                      </div>

                      {/* Action (Delete Trash Icon) */}
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.lineId)}
                          className="p-2 rounded-full text-neutral-400 hover:text-red-600 hover:bg-red-50/70 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Row (Responsive Stacked Layout) */}
                    <div className="flex flex-col gap-3 sm:hidden">
                      <div className="flex items-start gap-3.5">
                        <Link
                          href={`/product/${item.product?.slug || item.productId}`}
                          className="relative w-[64px] h-[85px] rounded-xl overflow-hidden bg-[#f0efeb] border border-[#eddcd2] shrink-0"
                        >
                          <Image
                            src={
                              item.product?.imageUrl ||
                              '/veracue-images/veracue-klow-50mg-sunlit-water-ripples.webp'
                            }
                            alt={item.product?.name || 'Product'}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${item.product?.slug || item.productId}`}
                              className="font-sans font-bold text-[14.5px] text-neutral-900 leading-snug line-clamp-2"
                            >
                              {item.product?.name}
                            </Link>

                            <button
                              type="button"
                              onClick={() => removeItem(item.lineId)}
                              className="text-neutral-400 hover:text-red-500 p-1 -mr-1 -mt-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} strokeWidth={1.8} />
                            </button>
                          </div>

                          <p className="text-xs font-sans text-neutral-500 font-medium truncate mt-1">
                            {item.variantTitle || item.variantSku || 'Standard Vial'}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Bottom: Stepper on Left, Price on Right */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="inline-flex items-center rounded-full border border-[#eddcd2] bg-[#f0efeb]/70 p-1 shadow-2xs h-8">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950 disabled:opacity-25"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} strokeWidth={2.2} />
                          </button>

                          <span className="w-7 text-center text-xs font-price font-bold text-neutral-900 select-none">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-950"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} strokeWidth={2.2} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-[16px] font-price font-bold text-neutral-900 tracking-tight leading-none block">
                            ${(item.priceSnapshot * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[11px] font-price text-neutral-400 font-normal leading-tight block mt-0.5">
                              ${item.priceSnapshot.toFixed(2)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: Order Summary Card (Matching Reference Design)        */}
        {/* ==================================================================== */}
        <div className="lg:col-span-4 w-full">
          <div className="rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-5 sm:p-7 sticky top-28">
            {/* Header */}
            <h2 className="text-xl font-sans font-bold text-neutral-900 tracking-tight mb-5">
              Order Summary
            </h2>

            {/* Discount Voucher / Active Coupon UI */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                {activeCoupon ? (
                  /* Modern Compact Applied Coupon Capsule */
                  <motion.div
                    key="applied-coupon"
                    initial={{ opacity: 0, scale: 0.98, y: -2 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -2 }}
                    transition={{ duration: 0.15 }}
                    style={{ backgroundColor: '#a5a58d' }}
                    className="h-11 px-3 sm:px-3.5 rounded-full border border-[#8f8f78] text-[#fff1e6] flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 mr-2">
                      <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                        <Tag size={12} strokeWidth={2.2} />
                      </span>
                      <span
                        className="font-sans font-bold text-[12px] sm:text-[12.5px] text-white tracking-wider uppercase truncate min-w-0"
                        title={activeCoupon.code}
                      >
                        {activeCoupon.code}
                      </span>
                      <span className="text-[10px] sm:text-[10.5px] font-price font-bold text-[#20221c] bg-[#fff1e6] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap shadow-2xs">
                        {activeCoupon.type === 'percentage'
                          ? `-${activeCoupon.value}%`
                          : activeCoupon.type === 'fixed_amount'
                          ? `-$${(activeCoupon.value / 100).toFixed(2)}`
                          : 'Free Shipping'}
                      </span>
                    </div>

                    {/* Polished Capsule Remove Button with Hover Color & Rotating Icon */}
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="group/remove h-7 px-2.5 sm:px-3 rounded-full bg-white/20 hover:bg-[#20221c] border border-white/30 hover:border-[#20221c] text-[11px] font-sans font-semibold text-white hover:text-[#fff1e6] active:scale-95 flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 shadow-2xs"
                      aria-label="Remove coupon"
                    >
                      <X
                        size={11}
                        strokeWidth={2.6}
                        className="transition-transform duration-300 ease-out group-hover/remove:rotate-90 group-hover/remove:scale-110"
                      />
                      <span>Remove</span>
                    </button>
                  </motion.div>
                ) : (
                  /* Standard Coupon Input + Olive Apply Button */
                  <motion.div
                    key="coupon-input"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Discount coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponState === 'loading'}
                        className="flex-1 min-w-0 h-10 px-4 rounded-full border border-[#eddcd2] bg-[#f0efeb]/40 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] focus:bg-white transition-colors disabled:opacity-50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleApplyCoupon()
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        disabled={!couponCode || couponState === 'loading'}
                        className="h-10 px-5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all shrink-0 cursor-pointer disabled:opacity-50 bg-[#a5a58d] hover:bg-[#20221c] text-[#fff1e6] border border-[#a5a58d]"
                      >
                        {couponState === 'loading' ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>

                    {/* Coupon Error Message (only displays on failure) */}
                    <AnimatePresence>
                      {couponMessage && couponState === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[11.5px] font-sans font-medium mt-2 flex items-center gap-1.5 text-red-500"
                        >
                          <span>{couponMessage}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cost Breakdown Rows (Pure numerical accounting) */}
            <div className="space-y-3 text-xs sm:text-[13px] font-sans text-neutral-600 pb-3.5">
              {/* Sub Total */}
              <div className="flex justify-between items-center">
                <span>Sub Total</span>
                <span className="font-price font-bold text-neutral-900">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>

              {/* Discount (Clean, uninterrupted typographic row with defensive truncation) */}
              {activeCoupon && discountAmount > 0 && (
                <div className="flex justify-between items-center text-[#55724a] gap-2">
                  <span className="flex items-center gap-1.5 font-medium min-w-0 flex-1 pr-1 truncate" title={activeCoupon.code}>
                    <Tag size={12} className="text-[#55724a] shrink-0" />
                    <span className="truncate">Discount ({activeCoupon.code})</span>
                  </span>
                  <span className="font-price font-bold whitespace-nowrap shrink-0">
                    -${discountAmount.toFixed(2)} USD
                  </span>
                </div>
              )}

              {/* Delivery Fee / Estimated Shipping */}
              <div className="flex justify-between items-center">
                <span>Delivery fee</span>
                <span className="font-price font-medium text-neutral-900">
                  {isLoadingData ? (
                    <Loader2 size={12} className="animate-spin text-neutral-400" />
                  ) : finalShipping === 0 ? (
                    <span className="text-[#55724a] font-semibold flex items-center gap-1">
                      <Check size={12} strokeWidth={2.5} /> FREE
                    </span>
                  ) : (
                    `$${finalShipping.toFixed(2)} USD`
                  )}
                </span>
              </div>

              {/* Processing Fee / Tax (if applicable) */}
              {taxAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span>Processing Fee{feePercentage ? ` (${feePercentage}%)` : ''}</span>
                  <span className="font-price font-medium text-neutral-900">
                    ${taxAmount.toFixed(2)} USD
                  </span>
                </div>
              )}
            </div>

            {/* Dedicated Cold-Chain Packaging Perk Card (Distinct separate container) */}
            <div className="my-3 rounded-2xl bg-[#fff1e6] border border-[#eddcd2] px-3 sm:px-3.5 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-full bg-[#cb997e]/15 text-[#cb997e] flex items-center justify-center shrink-0">
                  <Snowflake size={12} strokeWidth={2.2} />
                </span>
                <span className="text-xs font-sans font-bold text-neutral-900 leading-tight">
                  Cold-Chain Insulated Box
                </span>
              </div>
              <span className="shrink-0 text-[10px] sm:text-[10.5px] font-sans font-bold text-[#cb997e] bg-[#cb997e]/12 border border-[#cb997e]/25 px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                Complimentary
              </span>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-baseline pt-4 pb-6 border-t border-[#eddcd2]">
              <span className="text-base font-sans font-bold text-neutral-900">Total</span>
              <div className="text-right">
                {isLoadingData ? (
                  <Loader2 size={20} className="animate-spin text-[#cb997e]" />
                ) : (
                  <span className="text-2xl sm:text-[26px] font-price font-bold text-neutral-900 tracking-tight">
                    ${finalTotal.toFixed(2)} <span className="text-xs font-sans font-normal text-neutral-500">USD</span>
                  </span>
                )}
              </div>
            </div>

            {/* Primary Checkout CTA (Global HeroButton in Header Olive Green) */}
            <HeroButton
              href="/checkout"
              variant="olive"
              size="lg"
              text="Checkout Now"
              className="w-full justify-between py-3.5 sm:py-4 text-[15px] sm:text-base font-sans font-bold shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* --- Cross-Sells: Related Products --- */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-14 border-t border-[#eddcd2]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#cb997e] block mb-1">
                Verified Synthesis
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-neutral-900">
                Recommended for Research Protocols
              </h2>
            </div>

            <Link
              href="/shop"
              className="text-xs font-sans font-semibold uppercase tracking-wider text-neutral-500 hover:text-[#cb997e] transition-colors flex items-center gap-1.5 group"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StaggerChildren
            staggerDelay={0.05}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {relatedProducts.map((p) => (
              <motion.div variants={staggerItemVariants} key={p.id}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      )}
    </div>
  )
}
