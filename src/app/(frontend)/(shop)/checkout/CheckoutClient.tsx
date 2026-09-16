'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Check, ChevronDown, ChevronUp, Lock, Loader2, ArrowRight, ArrowLeft, ShieldCheck, Tag, ShoppingCart, Sparkles, Truck, Zap, CreditCard, Wallet, Smartphone, Snowflake, X, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Container } from '@/components/ui/container'
import { HeroButton } from '@/components/ui/hero-button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckoutPageSkeleton } from '@/components/ui/skeleton'
import { COUNTRIES } from '@/lib/countries'
import { useCartStore } from '@/lib/cart/store'
import { verifyCoupon, getUserDefaultAddress, getUserHBPoints, getUserAddresses } from '../actions'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { StripeCheckoutForm } from './StripeCheckoutForm'
import { createPaymentIntent, getShippingMethods } from './actions'


// Card payments are temporarily disabled in favor of Zelle. Flip this back to re-enable Stripe —
// the rest of the Stripe integration below is left intact, just not rendered/called while off.
const ENABLE_STRIPE = false

// Toggle to enable/disable the CircoFlows hosted-card option without touching Stripe/Zelle/Amex.
const ENABLE_CIRCOFLOWS = false

const stripePromise = typeof window !== 'undefined' ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '') : null

export function CheckoutClient() {
  const t = useTranslations('checkout.checkoutClient')
  const { items, couponCode: storedCouponCode, setCoupon, removeItem, openCart } = useCartStore()
  const { data: session } = useSession()
  const user = session?.user
  
  // Mobile summary toggle
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(true)

  // Dynamic header visibility & sticky scroll tracker
  const [headerHidden, setHeaderHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 6) {
      if (difference > 0 && y > 120) {
        setHeaderHidden(true)
      } else if (difference < 0) {
        setHeaderHidden(false)
      }
      lastYRef.current = y
    }
  })

  // Stripe
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  // Maxx Points State
  const [availablePoints, setAvailablePoints] = useState(0)
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false)

  // Address Selection State
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | 'new'>('new')

  // Form State
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'zelle' | 'amex' | 'circoflows' | 'stripe_link'>('zelle')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    marketing: false,
    saveInfo: false
  })

  // Prefill Data
  useEffect(() => {
    const prefillData = async () => {
      if (!user) return
      
      setFormData(prev => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
      }))

      try {
        const userAddresses = await getUserAddresses()
        if (userAddresses && userAddresses.length > 0) {
          setAddresses(userAddresses)
          const defaultAddress = userAddresses.find((a: any) => a.isDefaultShipping) || userAddresses[0]
          setSelectedAddressId(String(defaultAddress.id))
          setFormData(prev => ({
            ...prev,
            address: defaultAddress.line1,
            apartment: defaultAddress.line2 || '',
            city: defaultAddress.city,
            state: defaultAddress.state,
            zip: defaultAddress.postalCode,
            country: defaultAddress.country || 'US',
            phone: defaultAddress.phone || ''
          }))
        }
      } catch (err) {
        console.error('Failed to load user addresses:', err)
      }

      const points = await getUserHBPoints()
      setAvailablePoints(points)
    }
    
    prefillData()
  }, [user])

  // Shipping State
  const [availableShippingMethods, setAvailableShippingMethods] = useState<any[]>([])
  const [shippingMethod, setShippingMethod] = useState<string>('')
  const [activeFees, setActiveFees] = useState<any[]>([])
  
  const [dataLoaded, setDataLoaded] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [isSavingAddress, setIsSavingAddress] = useState(false)

  const handleSaveAddressEdit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone) {
      toast.error(t('errorRequiredFields', { fallback: 'Please fill out all required fields' }))
      return
    }

    setIsSavingAddress(true)
    try {
      const { updateAddress } = await import('../account/addresses/actions')
      const fd = new FormData()
      fd.append('firstName', formData.firstName)
      fd.append('lastName', formData.lastName)
      fd.append('line1', formData.address)
      if (formData.apartment) fd.append('line2', formData.apartment)
      fd.append('city', formData.city)
      fd.append('state', formData.state)
      fd.append('zip', formData.zip)
      fd.append('country', formData.country || 'US')
      fd.append('phone', formData.phone)
      
      const res = await updateAddress(selectedAddressId, fd)
      if (res.success) {
        toast.success(t('addressUpdated', { fallback: 'Address updated successfully' }))
        setIsEditingAddress(false)
        setAddresses(prev => prev.map(a => 
          String(a.id) === selectedAddressId ? {
            ...a,
            firstName: formData.firstName,
            lastName: formData.lastName,
            line1: formData.address,
            line2: formData.apartment,
            city: formData.city,
            state: formData.state,
            postalCode: formData.zip,
            country: formData.country || 'US',
            phone: formData.phone
          } : a
        ))
      } else {
        toast.error(res.error || 'Failed to update address')
      }
    } catch (e: any) {
      toast.error(e.message || 'An error occurred')
    } finally {
      setIsSavingAddress(false)
    }
  }

  // Fetch data
  useEffect(() => {
    Promise.all([
      getShippingMethods(),
      fetch('/api/processing-fees').then(res => res.json()).catch(() => ({}))
    ]).then(([methods, data]) => {
      setAvailableShippingMethods(methods)
      if (methods.length > 0) {
        setShippingMethod(methods[0].method)
      }
      
      if (data?.docs) {
        const active = data.docs.filter((f: any) => f.isActive && !f.isOptional)
        setActiveFees(active)
      }
      
      setDataLoaded(true)
    }).catch(() => {
      setDataLoaded(true)
    })
  }, [])

  // Coupon State
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; freeShipping: boolean; description: string } | null>(null)
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false)

  // Order Calculations
  const subtotal = items.reduce((acc, item) => acc + item.priceSnapshot * item.quantity, 0)

  // Fire the free-shipping toast once per crossing, not on every render while above the threshold.
  const previousSubtotal = useRef(subtotal)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500) // wait for hydration
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    previousSubtotal.current = subtotal
  }, [subtotal, isReady, t])

  // Desktop Bidirectional Sticky Sidebar Tracker
  const sidebarContainerRef = useRef<HTMLDivElement>(null)
  const sidebarCardRef = useRef<HTMLDivElement>(null)
  const lastScrollYRef = useRef(0)
  const currentTopRef = useRef(112)

  useEffect(() => {
    const cardEl = sidebarCardRef.current
    if (!cardEl) return

    const handleScroll = () => {
      // Only execute on desktop screens (lg: >= 1024px)
      if (typeof window === 'undefined' || window.innerWidth < 1024) {
        cardEl.style.top = ''
        return
      }

      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      const windowHeight = window.innerHeight
      const cardHeight = cardEl.offsetHeight
      const topOffset = headerHidden ? 24 : 112
      const bottomOffset = 24

      // If card is shorter than viewport, it simply sticks to topOffset
      if (cardHeight <= windowHeight - topOffset - bottomOffset) {
        cardEl.style.top = `${topOffset}px`
        currentTopRef.current = topOffset
        return
      }

      const maxTop = topOffset
      const minTop = windowHeight - cardHeight - bottomOffset

      // When near or above the top of the parent container
      if (currentScrollY <= 80) {
        currentTopRef.current = maxTop
        cardEl.style.top = `${maxTop}px`
        return
      }

      // Smooth bidirectional scroll: adjust top by -delta and clamp between minTop and maxTop
      const newTop = Math.min(maxTop, Math.max(minTop, currentTopRef.current - delta))
      currentTopRef.current = newTop
      cardEl.style.top = `${newTop}px`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [headerHidden, items.length, appliedCoupon])

  // International orders (anything outside the US) get a single flat rate — configured in the
  // Payload admin's Shipping Zones as the method with "Is International Shipping" checked —
  // instead of the configured US shipping zone's methods. No free-shipping threshold, no
  // Express option, since the US zone's methods/thresholds don't reflect real international cost.
  const isInternational = !!formData.country && formData.country !== 'US'

  const internationalMethod = availableShippingMethods.find((method: any) => method.isInternational)
    || { method: 'International Shipping', price: 50, estimatedDays: null, minOrderAmount: 0 }

  const visibleShippingMethods = isInternational
    ? [internationalMethod]
    : availableShippingMethods.filter((method: any) => {
        if (method.isInternational) return false
        if (method.minOrderAmount && method.minOrderAmount > 0) {
          return subtotal >= method.minOrderAmount
        }
        return true
      })

  // Tracks which methods were visible last time this effect ran, so the "auto-upgrade to a
  // newly available cheaper method" branch only fires the moment that set actually changes
  // (e.g. crossing the free-shipping subtotal threshold) — not on every re-run triggered by
  // the user's own manual shippingMethod selection, which would otherwise immediately revert
  // any choice other than the cheapest option.
  const previousVisibleMethodsKey = useRef<string>('')

  useEffect(() => {
    if (visibleShippingMethods.length === 0) return

    const isCurrentValid = visibleShippingMethods.some(m => m.method === shippingMethod)
    const cheapestMethod = [...visibleShippingMethods].sort((a, b) => a.price - b.price)[0]

    if (!isCurrentValid) {
      // Previously selected method dropped out (e.g. subtotal fell below its own
      // minOrderAmount) — fall back to the cheapest available option.
      setShippingMethod(cheapestMethod.method)
      return
    }

    const visibleMethodsKey = visibleShippingMethods.map(m => m.method).sort().join(',')
    const methodsSetChanged = visibleMethodsKey !== previousVisibleMethodsKey.current
    previousVisibleMethodsKey.current = visibleMethodsKey

    if (methodsSetChanged) {
      const isCurrentExpress = shippingMethod.toLowerCase().includes('express')
      const currentMethodObj = visibleShippingMethods.find(m => m.method === shippingMethod)
      if (!isCurrentExpress && currentMethodObj && cheapestMethod.price < currentMethodObj.price) {
        // Auto-select the cheaper method (like Free Shipping) the moment it becomes available.
        setShippingMethod(cheapestMethod.method)
      }
    }
  }, [subtotal, availableShippingMethods, shippingMethod, isInternational])

  const selectedMethodObj = visibleShippingMethods.find(m => m.method === shippingMethod) || visibleShippingMethods[0]
  const shippingCost = selectedMethodObj?.price || 0
  const isExpressShipping = shippingMethod.toLowerCase().includes('express')
  const qualifiesForFreeShipping = appliedCoupon?.freeShipping || false
  const finalShipping = (qualifiesForFreeShipping && !isExpressShipping && !isInternational) ? 0 : shippingCost
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount)
  
  // Calculate dynamic fees
  let processingFeeAmount = 0
  let activeFeePercentage: number | null = null
  activeFees.forEach((fee: any) => {
    if (fee.type === 'percentage') {
      processingFeeAmount += subtotalAfterDiscount * (fee.amount / 100)
      activeFeePercentage = fee.amount
    } else if (fee.type === 'fixed_amount') {
      processingFeeAmount += fee.amount
    }
  })

  const totalBeforePoints = subtotalAfterDiscount + finalShipping + processingFeeAmount
  
  const pointsToRedeem = isRedeemingPoints ? Math.min(availablePoints, totalBeforePoints) : 0
  const total = totalBeforePoints - pointsToRedeem

  // Fetch client secret when order details change (skipped while Stripe is disabled)
  useEffect(() => {
    if (ENABLE_STRIPE && items.length > 0 && total > 0) {
      createPaymentIntent(items, shippingMethod, appliedCoupon?.code, isRedeemingPoints, formData.country)
        .then(res => {
          if (res.clientSecret && res.paymentIntentId) {
            setClientSecret(res.clientSecret)
            setPaymentIntentId(res.paymentIntentId)
          } else if (res.error) {
            toast.error(res.error)
            if ((res as any).priceChanged && (res as any).updatedItems) {
              const { useCartStore } = require('@/lib/cart/store')
              useCartStore.getState().setItems((res as any).updatedItems)
            }
          }
        })
    }
  }, [items, shippingMethod, appliedCoupon, isRedeemingPoints, formData.country])

  // GA4 begin_checkout tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && items.length > 0 && !sessionStorage.getItem('ga_begin_checkout')) {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ ecommerce: null });
      w.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: subtotal,
          items: items.map((item, index) => ({
            item_id: item.productId,
            item_name: item.product.name,
            item_variant: item.variantTitle,
            price: item.priceSnapshot,
            quantity: item.quantity,
            index: index
          }))
        }
      });
      sessionStorage.setItem('ga_begin_checkout', 'true');
    }
  }, [items, subtotal])

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleApplyCoupon = async (e?: React.FormEvent, codeToApply?: string) => {
    if (e) e.preventDefault()
    const code = (codeToApply || couponCode).trim().toUpperCase()
    if (!code) return

    setIsVerifyingCoupon(true)
    try {
      // First check via API endpoint matching /cart
      const res = await fetch(`/api/validate-coupon?code=${encodeURIComponent(code)}`)
      const data = await res.json()
      const coupon = data?.coupon

      if (coupon && coupon.isActive !== false) {
        // Expiration check
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          setAppliedCoupon(null)
          if (!codeToApply) toast.error('This coupon has expired.')
          if (codeToApply) setCoupon(null)
          return
        }
        // Usage limit check
        if (coupon.usageLimit && (coupon.usageCount || 0) >= coupon.usageLimit) {
          setAppliedCoupon(null)
          if (!codeToApply) toast.error('This coupon has reached its usage limit.')
          if (codeToApply) setCoupon(null)
          return
        }
        // Min spend check
        if (coupon.minSpend && subtotal < coupon.minSpend) {
          setAppliedCoupon(null)
          if (!codeToApply) toast.error(`Minimum spend of $${coupon.minSpend.toFixed(2)} required.`)
          if (codeToApply) setCoupon(null)
          return
        }

        // Calculate discount matching /cart
        let eligibleSubtotal = 0
        items.forEach((item) => {
          let eligible = true
          if (coupon.excludeSaleItems && (item.product as any)?.salePrice) {
            eligible = false
          }
          if (coupon.applicableProductTypes && coupon.applicableProductTypes !== 'all') {
            const isBulkBundle = typeof item.variantSku === 'string' && item.variantSku.includes(' - ')
            if (coupon.applicableProductTypes === 'normal_only' && isBulkBundle) {
              eligible = false
            } else if (coupon.applicableProductTypes === 'bulk_only' && !isBulkBundle) {
              eligible = false
            }
          }
          if (eligible && coupon.appliesTo === 'specific_products') {
            const allowedProductIds = (coupon.products || []).map((p: any) =>
              typeof p.product === 'object' ? p.product.id : p.product
            )
            if (!allowedProductIds.includes(Number(item.productId))) eligible = false
          }
          if (eligible) {
            eligibleSubtotal += item.priceSnapshot * item.quantity
          }
        })

        let discount = 0
        if (coupon.type === 'percentage' && coupon.value) {
          discount = eligibleSubtotal * (coupon.value / 100)
        } else if (coupon.type === 'fixed_amount' && coupon.value) {
          discount = Math.min(coupon.value, eligibleSubtotal)
        }

        setAppliedCoupon({
          code: coupon.code,
          discount,
          freeShipping: coupon.freeShipping || coupon.type === 'free_shipping',
          description: `${coupon.value}% off`
        })
        setCouponCode('')
        setCoupon(coupon.code)
        if (!codeToApply) toast.success(`Coupon "${coupon.code}" applied!`)
      } else {
        // Fallback to server action verifyCoupon
        const result = await verifyCoupon(code, subtotal, items)
        if (result.valid) {
          setAppliedCoupon({
            code: result.code || code,
            discount: result.discount || 0,
            freeShipping: result.freeShipping || false,
            description: result.description || 'Coupon applied'
          })
          setCouponCode('')
          setCoupon(result.code || code)
          if (!codeToApply) toast.success(result.description || 'Coupon applied successfully')
        } else {
          setAppliedCoupon(null)
          if (!codeToApply) toast.error(result.error || 'Invalid coupon code')
          if (codeToApply) setCoupon(null)
        }
      }
    } catch (err: any) {
      setAppliedCoupon(null)
      if (!codeToApply) toast.error('Unable to verify coupon')
      if (codeToApply) setCoupon(null)
    } finally {
      setIsVerifyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCoupon(null)
    toast.info(t('couponRemoved', { fallback: 'Coupon removed' }))
  }

  const handleZeroTotalCheckout = async () => {
    setAttemptedSubmit(true)
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone) {
      toast.error(t('fillRequiredFieldsOrder'))
      return
    }

    setIsProcessing(true)

    try {
      const { createPayloadOrder } = await import('./actions')
      const orderRes = await createPayloadOrder(
        items, shippingMethod, appliedCoupon?.code, isRedeemingPoints,
        { ...formData, email: user?.email || formData.email },
        'free_order',
        user?.id as string,
        'stripe',
        selectedAddressId === 'new'
      )

      if (orderRes.error || !orderRes.orderId) {
        toast.error(orderRes.error || t('freeOrderInitFailed'))
        if ((orderRes as any).priceChanged && (orderRes as any).updatedItems) {
          useCartStore.getState().setItems((orderRes as any).updatedItems)
        }
        setIsProcessing(false)
        return
      }

      toast.success(t('orderSuccessRedirecting'))
      useCartStore.getState().clear()
      window.location.href = `/order-confirmation/${orderRes.orderId}`
    } catch (e: any) {
      toast.error(t('unexpectedError'))
      setIsProcessing(false)
    }
  }

  // Zelle has no payment API — this creates the order as pending/unpaid immediately,
  // then the customer sends payment manually using the details shown. A human confirms
  // the transfer and updates the order's paymentStatus in the admin panel afterward.
  const handleZellePlaceOrder = async () => {
    setAttemptedSubmit(true)
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone) {
      toast.error(t('fillRequiredFieldsOrder'))
      return
    }

    setIsProcessing(true)

    try {
      const { createPayloadOrder } = await import('./actions')
      const orderRes = await createPayloadOrder(
        items, shippingMethod, appliedCoupon?.code, isRedeemingPoints,
        { ...formData, email: user?.email || formData.email },
        'zelle_pending',
        user?.id as string,
        'zelle',
        selectedAddressId === 'new'
      )

      if (orderRes.error || !orderRes.orderId) {
        toast.error(orderRes.error || t('freeOrderInitFailed'))
        if ((orderRes as any).priceChanged && (orderRes as any).updatedItems) {
          useCartStore.getState().setItems((orderRes as any).updatedItems)
        }
        setIsProcessing(false)
        return
      }

      toast.success(t('orderSuccessRedirecting'))
      useCartStore.getState().clear()
      window.location.href = `/order-confirmation/${orderRes.orderId}`
    } catch (e: any) {
      toast.error(t('unexpectedError'))
      setIsProcessing(false)
    }
  }

  const handleStripeLinkPlaceOrder = async () => {
    setAttemptedSubmit(true)
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone) {
      toast.error(t('fillRequiredFieldsOrder'))
      return
    }

    setIsProcessing(true)

    try {
      const { createPayloadOrder } = await import('./actions')
      const orderRes = await createPayloadOrder(
        items, shippingMethod, appliedCoupon?.code, isRedeemingPoints,
        { ...formData, email: user?.email || formData.email },
        'stripe_link_pending',
        user?.id as string,
        'stripe_link',
        selectedAddressId === 'new'
      )

      if (orderRes.error || !orderRes.orderId) {
        toast.error(orderRes.error || t('freeOrderInitFailed'))
        if ((orderRes as any).priceChanged && (orderRes as any).updatedItems) {
          useCartStore.getState().setItems((orderRes as any).updatedItems)
        }
        setIsProcessing(false)
        return
      }

      toast.success(t('orderSuccessRedirecting'))
      useCartStore.getState().clear()
      window.location.href = `/order-confirmation/${orderRes.orderId}`
    } catch (e: any) {
      toast.error(t('unexpectedError'))
      setIsProcessing(false)
    }
  }

  const handleCircoFlowsPlaceOrder = async () => {
    setAttemptedSubmit(true)
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone) {
      toast.error(t('fillRequiredFieldsOrder'))
      return
    }

    setIsProcessing(true)

    try {
      const { createCircoFlowsPayment } = await import('./circoflowsActions')
      const orderRes = await createCircoFlowsPayment(
        items, shippingMethod, appliedCoupon?.code, isRedeemingPoints,
        { ...formData, email: user?.email || formData.email },
        user?.id as string,
        selectedAddressId === 'new'
      )

      if (orderRes.error || !orderRes.redirectUrl) {
        toast.error(orderRes.error || t('freeOrderInitFailed'))
        if ((orderRes as any).priceChanged && (orderRes as any).updatedItems) {
          useCartStore.getState().setItems((orderRes as any).updatedItems)
        }
        setIsProcessing(false)
        return
      }

      // Cart is intentionally left intact here — the customer hasn't paid yet, they're only
      // being redirected to CircoFlows' hosted card page. It's cleared once payment actually
      // succeeds (see OrderConfirmationClient's sync fallback / the webhook-driven finalize).
      window.location.href = orderRes.redirectUrl
    } catch (e: any) {
      toast.error(t('unexpectedError'))
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (storedCouponCode && !isVerifyingCoupon) {
      handleApplyCoupon(undefined, storedCouponCode)
    }
  }, [storedCouponCode, subtotal])

  if (!isReady || (items.length > 0 && !dataLoaded)) {
    return <CheckoutPageSkeleton />
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#f0efeb] min-h-screen pt-28 sm:pt-36 pb-20 flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-4 text-center">
          <div className="rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-8 sm:p-14 text-center">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#fff1e6] border border-[#eddcd2] flex items-center justify-center mx-auto mb-6 text-[#cb997e] shadow-2xs">
              <ShoppingCart size={30} strokeWidth={1.5} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-neutral-900 tracking-tight mb-2.5">
              {t('emptyTitle')}
            </h1>

            <p className="text-sm sm:text-base text-neutral-500 max-w-sm mx-auto mb-8 font-sans leading-relaxed">
              {t('emptyText')}
            </p>

            <HeroButton
              href="/shop"
              variant="olive"
              text={t('shopNow')}
              className="px-8 py-3 font-sans font-semibold text-sm inline-flex justify-center"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f0efeb] min-h-screen pt-24 sm:pt-32 lg:pt-36 pb-20">
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10 max-w-7xl">
        {/* --- Top Header & Breadcrumb --- */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-neutral-500 hover:text-[#cb997e] transition-colors group mb-3 sm:mb-4"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('backToCart', { fallback: 'Back to Cart' })}</span>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-sans font-bold text-neutral-900 tracking-[-0.03em] leading-tight">
                {t('secureCheckout')}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-semibold bg-[#fff1e6] text-[#cb997e] border border-[#eddcd2]">
                <ShieldCheck size={13} strokeWidth={2.2} />
                SSL Encrypted
              </span>
            </div>
            <span className="whitespace-nowrap shrink-0 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-sans font-semibold bg-[#fff1e6] text-[#cb997e] border border-[#eddcd2]">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* --- Mobile Order Summary Accordion (Sticky) --- */}
        <div
          className={`lg:hidden mb-6 sm:mb-8 sticky z-30 transition-all duration-300 ease-out ${
            headerHidden ? 'top-3' : 'top-[76px] sm:top-[92px]'
          }`}
        >
          <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-[#eddcd2] shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-neutral-900 transition-colors bg-white/80 hover:bg-[#fff1e6]/40 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#cb997e]/15 text-[#cb997e] flex items-center justify-center shrink-0">
                  <ShoppingCart size={15} strokeWidth={2} />
                </span>
                <span className="text-xs sm:text-[13px] font-sans font-bold uppercase tracking-wider text-neutral-900">
                  {mobileSummaryOpen ? t('hideOrderSummary') : t('showOrderSummary')}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-price font-bold text-neutral-900">
                  ${total.toFixed(2)} <span className="text-xs font-normal text-neutral-500">USD</span>
                </span>
                <div className="w-6 h-6 rounded-full bg-[#f0efeb] flex items-center justify-center text-neutral-600">
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${mobileSummaryOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {mobileSummaryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-[#eddcd2]"
                >
                  <div className="p-4 sm:p-6 flex flex-col gap-5 bg-[#fff1e6]/20">
                    {/* Items List (Bounded scroll so it never traps the mobile viewport) */}
                    <div
                      className="divide-y divide-[#eddcd2]/70 max-h-[38vh] overflow-y-auto pr-1"
                      data-lenis-prevent="true"
                    >
                      {items.map((item) => {
                        const isMultiple = item.quantity > 1
                        const hasVariant =
                          (item.variantTitle || item.variantSku) &&
                          !['DEFAULT', 'DEFAULT TITLE'].includes(
                            (item.variantTitle || item.variantSku || '').toUpperCase()
                          )

                        return (
                          <div key={item.lineId} className="flex gap-3 py-3 w-full items-center">
                            {/* Clickable Clean Full-Bleed Image */}
                            <Link
                              href={`/product/${item.product?.slug || item.productId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative w-14 h-16 shrink-0 block rounded-xl overflow-hidden bg-[#f0efeb] border border-[#eddcd2] group/thumb hover:border-[#cb997e] transition-colors"
                              title={`View ${item.product?.name || 'product'} (opens in new tab)`}
                            >
                              <Image
                                src={item.product?.imageUrl || '/placeholder.png'}
                                alt={item.product?.name || 'Product'}
                                fill
                                sizes="56px"
                                className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                            </Link>

                            {/* Product Info & Dedicated Quantity Pill */}
                            <div className="flex-1 min-w-0 pr-1">
                              <Link
                                href={`/product/${item.product?.slug || item.productId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-[13px] font-sans font-bold text-neutral-900 hover:text-[#cb997e] transition-colors leading-snug truncate block"
                                title={item.product?.name}
                              >
                                {item.product?.name}
                              </Link>
                              <div className="flex items-center flex-wrap gap-1.5 mt-1">
                                {hasVariant && (
                                  <span className="text-[11px] text-neutral-500 font-sans truncate">
                                    {item.variantTitle || item.variantSku}
                                  </span>
                                )}
                                {hasVariant && <span className="text-[10px] text-neutral-300">•</span>}
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-sans font-bold bg-[#fff1e6] text-[#20221c] border border-[#eddcd2] shadow-2xs">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </div>

                            {/* Total, Unit Price & Delete Button */}
                            <div className="flex flex-col items-end shrink-0 pl-1">
                              <span className="text-xs sm:text-[13px] text-neutral-900 font-price font-bold">
                                ${(item.priceSnapshot * item.quantity).toFixed(2)}
                              </span>
                              {isMultiple && (
                                <span className="text-[10px] sm:text-[10.5px] font-price text-neutral-400 mt-0.5">
                                  ${item.priceSnapshot.toFixed(2)} ea
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  removeItem(item.lineId)
                                  toast.info(`${item.product?.name || 'Item'} removed from order`)
                                }}
                                className="mt-1 p-1 -mr-1 text-neutral-400 hover:text-red-500 hover:bg-red-50/80 rounded-md transition-all cursor-pointer group/remove"
                                title={`Remove ${item.product?.name || 'item'}`}
                                aria-label={`Remove ${item.product?.name || 'item'}`}
                              >
                                <Trash2 size={13} className="group-hover/remove:scale-110 transition-transform" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Quantity Edit Note */}
                    <div className="flex items-center justify-between text-[11px] font-sans text-neutral-500 bg-[#f0efeb]/60 rounded-xl px-3 py-2 border border-[#eddcd2]/80">
                      <span>To edit quantities:</span>
                      <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                        <Link
                          href="/cart"
                          className="hover:text-[#cb997e] underline decoration-[#eddcd2] underline-offset-2 transition-colors"
                        >
                          Cart page
                        </Link>
                        <span className="text-neutral-300 font-normal">or</span>
                        <button
                          type="button"
                          onClick={() => openCart()}
                          className="hover:text-[#cb997e] underline decoration-[#eddcd2] underline-offset-2 transition-colors cursor-pointer"
                        >
                          Cart drawer
                        </button>
                      </div>
                    </div>

                    {/* Promo Code Pill or Input */}
                    <div className="pt-1">
                      {appliedCoupon ? (
                        <div
                          style={{ backgroundColor: '#a5a58d' }}
                          className="h-11 px-3 sm:px-3.5 rounded-full border border-[#8f8f78] text-[#fff1e6] flex items-center justify-between shadow-xs"
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 mr-2">
                            <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                              <Tag size={12} strokeWidth={2.2} />
                            </span>
                            <span
                              className="font-sans font-bold text-[12px] text-white tracking-wider uppercase truncate min-w-0"
                              title={appliedCoupon.code}
                            >
                              {appliedCoupon.code}
                            </span>
                            <span className="text-[10px] font-price font-bold text-[#20221c] bg-[#fff1e6] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap shadow-2xs">
                              -${appliedCoupon.discount.toFixed(2)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="group/remove h-7 px-2.5 rounded-full bg-white/20 hover:bg-[#20221c] border border-white/30 hover:border-[#20221c] text-[11px] font-sans font-semibold text-white hover:text-[#fff1e6] active:scale-95 flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 shadow-2xs"
                            aria-label="Remove coupon"
                          >
                            <X
                              size={11}
                              strokeWidth={2.6}
                              className="transition-transform duration-300 ease-out group-hover/remove:rotate-90 group-hover/remove:scale-110"
                            />
                            <span>{t('remove')}</span>
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2 items-center">
                          <input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder={t('discountCodePlaceholder', { fallback: 'Discount coupon' })}
                            className="flex-1 min-w-0 h-10 px-4 rounded-full border border-[#eddcd2] bg-white text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] transition-colors"
                          />
                          <button
                            type="submit"
                            disabled={!couponCode.trim() || isVerifyingCoupon}
                            className="h-10 px-5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all shrink-0 cursor-pointer disabled:opacity-50 bg-[#a5a58d] hover:bg-[#20221c] text-[#fff1e6] border border-[#a5a58d]"
                          >
                            {isVerifyingCoupon ? <Loader2 size={13} className="animate-spin" /> : t('apply')}
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Maxx / HB Points Card */}
                    {availablePoints > 0 && (
                      <div className="p-3.5 rounded-2xl bg-white border border-[#eddcd2] flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Sparkles size={14} />
                          </span>
                          <div>
                            <span className="text-xs font-sans font-bold text-neutral-900 block">
                              HB Rewards Points
                            </span>
                            <span className="text-[10.5px] font-sans text-neutral-500 block">
                              {t('youHavePoints', { points: Number(availablePoints.toFixed(2)) })}
                            </span>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isRedeemingPoints}
                            onChange={() => setIsRedeemingPoints(!isRedeemingPoints)}
                          />
                          <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#cb997e]"></div>
                        </label>
                      </div>
                    )}

                    {/* Dedicated Cold-Chain Packaging Perk Card */}
                    <div className="rounded-2xl bg-[#fff1e6]/60 border border-[#eddcd2] px-4 py-3 flex items-center justify-between gap-2.5 shadow-2xs my-1">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-[#cb997e]/15 text-[#cb997e] flex items-center justify-center shrink-0">
                          <Snowflake size={13} strokeWidth={2.2} />
                        </span>
                        <span className="text-xs sm:text-[13px] font-sans font-bold text-neutral-900 leading-tight">
                          Cold-Chain Insulated Box
                        </span>
                      </div>
                      <span className="shrink-0 text-[10px] sm:text-[10.5px] font-sans font-bold text-[#cb997e] bg-[#cb997e]/12 border border-[#cb997e]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Complimentary
                      </span>
                    </div>

                    {/* Breakdown Rows with Clean Separation & Generous Spacing */}
                    <div className="border-t border-[#eddcd2] pt-4.5 pb-1 space-y-3.5 text-[13px] sm:text-[13.5px] font-sans text-neutral-600">
                      <div className="flex justify-between items-center py-0.5">
                        <span>{t('subtotal')}</span>
                        <span className="font-price font-bold text-neutral-900">${subtotal.toFixed(2)} USD</span>
                      </div>

                      {appliedCoupon && (
                        <div className="flex justify-between items-center py-0.5 text-[#55724a]">
                          <span className="flex items-center gap-1.5 font-medium truncate">
                            <Tag size={13} className="shrink-0" />
                            {t('discountWithCode', { code: appliedCoupon.code })}
                          </span>
                          <span className="font-price font-bold shrink-0">-${appliedCoupon.discount.toFixed(2)} USD</span>
                        </div>
                      )}

                      {isRedeemingPoints && pointsToRedeem > 0 && (
                        <div className="flex justify-between items-center py-0.5 text-[#55724a]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Sparkles size={13} className="shrink-0" /> {t('pointsApplied')}
                          </span>
                          <span className="font-price font-bold shrink-0">-${pointsToRedeem.toFixed(2)} USD</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center py-0.5">
                        <span>{t('shippingWithMethod', { method: selectedMethodObj?.method ? `(${selectedMethodObj.method})` : '' })}</span>
                        <span className="font-price font-medium text-neutral-900">{finalShipping === 0 ? t('free') : `$${finalShipping.toFixed(2)} USD`}</span>
                      </div>

                      <div className="flex justify-between items-center py-0.5">
                        <span>{t('processingFee')}{activeFeePercentage ? ` (${activeFeePercentage}%)` : ''}</span>
                        <span className="font-price font-medium text-neutral-900">${processingFeeAmount.toFixed(2)} USD</span>
                      </div>
                    </div>

                    {/* Total Row */}
                    <div className="flex justify-between items-baseline pt-4.5 pb-2 border-t border-[#eddcd2]">
                      <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-neutral-900">{t('total')}</span>
                      <span className="text-2xl sm:text-[26px] font-price font-bold text-neutral-900 tracking-tight">
                        ${total.toFixed(2)} <span className="text-xs font-normal text-neutral-500">USD</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- Main 2-Column Desktop Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ==================================================================== */}
          {/* LEFT COLUMN: Customer & Shipping & Payment Flow Form                 */}
          {/* ==================================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 self-start">
            <div className="rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-5 sm:p-7 md:p-8 space-y-8 sm:space-y-10">
              <input type="hidden" name="redeemPoints" value={isRedeemingPoints ? 'true' : 'false'} />
              <input type="hidden" name="couponCode" value={appliedCoupon?.code || ''} />

              {/* ---------------------------------------------------------- */}
              {/* SECTION 1: Contact Information                             */}
              {/* ---------------------------------------------------------- */}
              <section className="flex flex-col gap-4">
                <div>
                  <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-1">
                    01 / Contact
                  </span>
                  <h2 className="text-lg sm:text-xl font-sans font-bold text-neutral-900 tracking-tight">
                    {t('contactInformation')}
                  </h2>
                </div>

                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('emailAddress')}
                  type="email"
                  className={`h-12 sm:h-13 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all shadow-2xs ${
                    attemptedSubmit && !formData.email ? 'border-red-500 bg-red-50/30' : ''
                  }`}
                  required
                />

                <div className="flex items-start gap-3 mt-0.5 px-1">
                  <Checkbox
                    id="marketing"
                    name="marketing"
                    checked={formData.marketing}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, marketing: !!checked }))}
                    className="mt-0.5 rounded-md border-[#eddcd2] data-[state=checked]:bg-[#cb997e] data-[state=checked]:border-[#cb997e] text-white"
                  />
                  <label htmlFor="marketing" className="text-xs sm:text-sm text-neutral-600 font-sans cursor-pointer select-none">
                    {t('marketingOptIn')}
                  </label>
                </div>
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 2: Delivery Address                                */}
              {/* ---------------------------------------------------------- */}
              <section className="flex flex-col gap-4 pt-6 border-t border-[#eddcd2]">
                <div>
                  <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-1">
                    02 / Shipping
                  </span>
                  <h2 className="text-lg sm:text-xl font-sans font-bold text-neutral-900 tracking-tight">
                    {t('deliveryAddress')}
                  </h2>
                </div>

                {user && addresses.length > 0 && (
                  <div className="flex flex-col gap-3 mb-2">
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === String(addr.id)
                      return (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                              : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                          }`}
                        >
                          <input
                            type="radio"
                            name="addressSelection"
                            value={addr.id}
                            checked={isSelected}
                            onChange={() => {
                              setSelectedAddressId(String(addr.id))
                              setIsEditingAddress(false)
                              setFormData((prev) => ({
                                ...prev,
                                firstName: addr.firstName || prev.firstName,
                                lastName: addr.lastName || prev.lastName,
                                address: addr.line1,
                                apartment: addr.line2 || '',
                                city: addr.city,
                                state: addr.state,
                                zip: addr.postalCode,
                                country: addr.country || 'US',
                                phone: addr.phone || '',
                              }))
                            }}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                              isSelected ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-sans font-bold text-neutral-900 leading-tight">
                                {addr.firstName} {addr.lastName}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                {addr.isDefaultShipping && (
                                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#cb997e] bg-[#cb997e]/12 px-2 py-0.5 rounded-full border border-[#cb997e]/20">
                                    {t('defaultAddressBadge')}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setSelectedAddressId(String(addr.id))
                                    setFormData((prev) => ({
                                      ...prev,
                                      firstName: addr.firstName || prev.firstName,
                                      lastName: addr.lastName || prev.lastName,
                                      address: addr.line1,
                                      apartment: addr.line2 || '',
                                      city: addr.city,
                                      state: addr.state,
                                      zip: addr.postalCode,
                                      country: addr.country || 'US',
                                      phone: addr.phone || '',
                                    }))
                                    setIsEditingAddress(true)
                                  }}
                                  className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-[#f0efeb] rounded-lg transition-colors cursor-pointer"
                                  title="Edit address"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                </button>
                              </div>
                            </div>
                            <span className="text-xs text-neutral-600 font-sans mt-1">
                              {addr.line1}
                              {addr.line2 ? `, ${addr.line2}` : ''}
                            </span>
                            <span className="text-xs text-neutral-500 font-sans mt-0.5">
                              {addr.city}, {addr.state} {addr.postalCode}
                            </span>
                          </div>
                        </label>
                      )
                    })}

                    <label
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedAddressId === 'new'
                          ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                          : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="addressSelection"
                        value="new"
                        checked={selectedAddressId === 'new'}
                        onChange={() => {
                          setSelectedAddressId('new')
                          setIsEditingAddress(false)
                          setFormData((prev) => ({
                            ...prev,
                            address: '',
                            apartment: '',
                            city: '',
                            state: '',
                            zip: '',
                            country: 'US',
                            phone: '',
                          }))
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          selectedAddressId === 'new' ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {selectedAddressId === 'new' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs sm:text-sm font-sans font-bold text-neutral-900">
                        {t('addNewAddress')}
                      </span>
                    </label>
                  </div>
                )}

                <input type="hidden" name="addressId" value={selectedAddressId} />

                {(!user || selectedAddressId === 'new' || isEditingAddress) && (
                  <div className="flex flex-col gap-3.5 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={t('firstName')}
                        className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                          attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.firstName ? 'border-red-500 bg-red-50/30' : ''
                        }`}
                        required={selectedAddressId === 'new' || isEditingAddress}
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={t('lastName')}
                        className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                          attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.lastName ? 'border-red-500 bg-red-50/30' : ''
                        }`}
                        required={selectedAddressId === 'new' || isEditingAddress}
                      />
                    </div>

                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t('address')}
                      className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                        attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.address ? 'border-red-500 bg-red-50/30' : ''
                      }`}
                      required={selectedAddressId === 'new' || isEditingAddress}
                    />

                    <Input
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder={t('apartmentOptional')}
                      className="h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all"
                    />

                    <div className="grid grid-cols-6 gap-3.5">
                      <div className="col-span-6 sm:col-span-2">
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder={t('city')}
                          className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                            attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.city ? 'border-red-500 bg-red-50/30' : ''
                          }`}
                          required={selectedAddressId === 'new' || isEditingAddress}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <Input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder={t('state')}
                          className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                            attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.state ? 'border-red-500 bg-red-50/30' : ''
                          }`}
                          required={selectedAddressId === 'new' || isEditingAddress}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <Input
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder={t('zipCode')}
                          className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                            attemptedSubmit && (selectedAddressId === 'new' || isEditingAddress) && !formData.zip ? 'border-red-500 bg-red-50/30' : ''
                          }`}
                          required={selectedAddressId === 'new' || isEditingAddress}
                        />
                      </div>
                    </div>

                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 w-full shadow-2xs">
                        <SelectValue placeholder={t('country')} />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        sideOffset={8}
                        className="max-h-72 rounded-2xl border border-[#eddcd2] bg-white p-2 shadow-xl"
                      >
                        {COUNTRIES.map((c) => (
                          <SelectItem
                            key={c.code}
                            value={c.code}
                            className="rounded-xl py-2.5 px-3 text-sm font-sans cursor-pointer data-[highlighted]:bg-[#fff1e6] data-[state=checked]:font-bold data-[state=checked]:text-[#cb997e]"
                          >
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInternational && (
                      <p className="text-xs text-neutral-500 font-sans px-1 -mt-1">{t('internationalShippingNotice')}</p>
                    )}

                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('phoneForDelivery')}
                      type="tel"
                      className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all ${
                        attemptedSubmit && !formData.phone ? 'border-red-500 bg-red-50/30' : ''
                      }`}
                      required
                    />

                    {isEditingAddress && selectedAddressId !== 'new' && (
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingAddress(false)
                            const addr = addresses.find((a) => String(a.id) === selectedAddressId)
                            if (addr) {
                              setFormData((prev) => ({
                                ...prev,
                                firstName: addr.firstName || prev.firstName,
                                lastName: addr.lastName || prev.lastName,
                                address: addr.line1,
                                apartment: addr.line2 || '',
                                city: addr.city,
                                state: addr.state,
                                zip: addr.postalCode,
                                country: addr.country || 'US',
                                phone: addr.phone || '',
                              }))
                            }
                          }}
                          className="h-11 flex-1 rounded-full border border-[#eddcd2] bg-white text-neutral-700 font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#f0efeb] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={isSavingAddress}
                          onClick={handleSaveAddressEdit}
                          className="h-11 flex-1 rounded-full bg-[#a5a58d] hover:bg-[#20221c] text-white font-sans font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center"
                        >
                          {isSavingAddress ? <Loader2 className="animate-spin" size={14} /> : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {user && selectedAddressId !== 'new' && !isEditingAddress && (
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phoneForDelivery')}
                    type="tel"
                    className={`h-12 rounded-2xl bg-[#f0efeb]/40 border border-[#eddcd2] focus:border-[#cb997e] focus:bg-white text-sm font-sans text-neutral-900 placeholder:text-neutral-400 transition-all shadow-2xs ${
                      attemptedSubmit && !formData.phone ? 'border-red-500 bg-red-50/30' : ''
                    }`}
                    required
                  />
                )}
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 3: Shipping Method                                 */}
              {/* ---------------------------------------------------------- */}
              <section className="flex flex-col gap-4 pt-6 border-t border-[#eddcd2]">
                <div>
                  <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-1">
                    03 / Delivery
                  </span>
                  <h2 className="text-lg sm:text-xl font-sans font-bold text-neutral-900 tracking-tight">
                    {t('shippingMethod')}
                  </h2>
                </div>

                <div className="flex flex-col gap-3">
                  {visibleShippingMethods.map((method: any) => {
                    const isSelected = shippingMethod === method.method
                    return (
                      <label
                        key={method.method}
                        className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                          isSelected
                            ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                            : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 relative z-10">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.method}
                            checked={isSelected}
                            onChange={() => setShippingMethod(method.method)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-sans font-bold text-neutral-900 flex items-center gap-2">
                              {method.method.toLowerCase().includes('express') ? (
                                <Zap size={14} className="text-[#cb997e]" />
                              ) : (
                                <Truck size={14} className="text-[#a5a58d]" />
                              )}
                              {method.method}
                            </span>
                            {method.estimatedDays && (
                              <span className="text-xs text-neutral-500 font-sans mt-0.5">
                                {t('businessDays', { days: method.estimatedDays })}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-price font-bold text-neutral-900 relative z-10">
                          {(() => {
                            const isExpress = method.method.toLowerCase().includes('express')
                            const isFreeShipping = qualifiesForFreeShipping && !isExpress
                            if (isFreeShipping || method.price === 0) {
                              return <span className="text-[#55724a] font-bold">{t('free')}</span>
                            }
                            return `$${method.price.toFixed(2)} USD`
                          })()}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </section>

              {/* ---------------------------------------------------------- */}
              {/* SECTION 4: Payment Selection                               */}
              {/* ---------------------------------------------------------- */}
              <section className="flex flex-col gap-4 pt-6 border-t border-[#eddcd2]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <div>
                    <span className="text-[10.5px] font-sans font-bold uppercase tracking-[0.16em] text-[#a5a58d] block mb-0.5">
                      04 / Payment
                    </span>
                    <h2 className="text-lg sm:text-xl font-sans font-bold text-neutral-900 tracking-tight">
                      {t('payment')}
                    </h2>
                  </div>
                  <span className="text-[11.5px] sm:text-xs font-sans text-neutral-500 flex items-center gap-1.5 leading-normal">
                    <Lock size={12} className="text-[#a5a58d] shrink-0" />
                    <span>{t('encryptionNotice')}</span>
                  </span>
                </div>

                {total <= 0 ? (
                  <div className="w-full bg-[#55724a]/10 border border-[#55724a]/20 rounded-3xl flex flex-col items-center justify-center gap-4 shadow-sm relative overflow-hidden p-6 sm:p-8 text-center">
                    <div className="w-12 h-12 bg-[#55724a]/15 text-[#55724a] rounded-full flex items-center justify-center">
                      <Check size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-base font-sans font-bold text-neutral-900">
                      {t('orderFullyCovered')}
                    </span>
                    <HeroButton
                      onClick={handleZeroTotalCheckout}
                      disabled={isProcessing}
                      variant="olive"
                      size="lg"
                      text={isProcessing ? 'Processing...' : t('completeFreeOrder')}
                      className="w-full justify-center py-4 text-sm font-sans font-bold"
                    />
                  </div>
                ) : ENABLE_STRIPE && clientSecret && stripePromise && paymentIntentId ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                    <StripeCheckoutForm
                      amount={total}
                      items={items}
                      shippingMethod={shippingMethod}
                      couponCode={appliedCoupon?.code}
                      isRedeemingPoints={isRedeemingPoints}
                      formData={formData}
                      paymentIntentId={paymentIntentId}
                      userId={user?.id}
                    />
                  </Elements>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      {ENABLE_CIRCOFLOWS && (
                        <label
                          className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                            selectedPaymentMethod === 'circoflows'
                              ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                              : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 relative z-10">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="circoflows"
                              className="sr-only"
                              checked={selectedPaymentMethod === 'circoflows'}
                              onChange={() => setSelectedPaymentMethod('circoflows')}
                            />
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                selectedPaymentMethod === 'circoflows' ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                              }`}
                            >
                              {selectedPaymentMethod === 'circoflows' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-sans font-bold text-neutral-900 flex items-center gap-2">
                                <CreditCard size={14} className="text-[#a5a58d]" />
                                {t('payWithCard')}
                                <div className="flex gap-1.5 ml-2">
                                  <span className="px-1.5 py-0.5 border border-neutral-200 bg-white rounded shadow-2xs text-[8px] font-black italic text-blue-900 tracking-wider">VISA</span>
                                  <span className="px-1.5 py-0.5 border border-neutral-200 bg-white rounded shadow-2xs text-[8px] font-bold text-red-600 tracking-wider">MC</span>
                                </div>
                              </span>
                              <span className="text-xs text-neutral-500 font-sans mt-0.5">{t('circoflowsCheckoutNote')}</span>
                            </div>
                          </div>
                        </label>
                      )}

                      {/* Zelle Payment Option */}
                      <label
                        className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                          selectedPaymentMethod === 'zelle'
                            ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                            : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 relative z-10">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="zelle"
                            className="sr-only"
                            checked={selectedPaymentMethod === 'zelle'}
                            onChange={() => setSelectedPaymentMethod('zelle')}
                          />
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              selectedPaymentMethod === 'zelle' ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {selectedPaymentMethod === 'zelle' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-sans font-bold text-neutral-900 flex items-center gap-2">
                              <Wallet size={14} className="text-purple-600" />
                              Zelle
                              <span className="px-1.5 py-0.5 border border-[#eddcd2] bg-[#741acb] rounded shadow-2xs text-[8px] font-black text-white tracking-widest ml-1">
                                Z
                              </span>
                            </span>
                            <span className="text-xs text-neutral-500 font-sans mt-0.5">{t('zelleCheckoutNote')}</span>
                          </div>
                        </div>
                      </label>

                      {/* Stripe Custom Link Option */}
                      <label
                        className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                          selectedPaymentMethod === 'stripe_link'
                            ? 'border-[#a5a58d] bg-[#fff1e6]/40 shadow-xs ring-1 ring-[#a5a58d]'
                            : 'border-[#eddcd2] bg-white hover:border-[#cb997e]/60'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 relative z-10">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe_link"
                            className="sr-only"
                            checked={selectedPaymentMethod === 'stripe_link'}
                            onChange={() => setSelectedPaymentMethod('stripe_link')}
                          />
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              selectedPaymentMethod === 'stripe_link' ? 'border-[#a5a58d] bg-[#a5a58d]' : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {selectedPaymentMethod === 'stripe_link' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-sans font-bold text-neutral-900 flex items-center gap-2">
                              <CreditCard size={14} className="text-[#cb997e]" />
                              Stripe (Custom Payment Link)
                            </span>
                            <span className="text-xs text-neutral-500 font-sans mt-0.5">Secure payment via an emailed Stripe link.</span>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Place Order CTA Button */}
                    <div className="w-full mt-4 sm:mt-6">
                      <HeroButton
                        onClick={
                          selectedPaymentMethod === 'circoflows'
                            ? handleCircoFlowsPlaceOrder
                            : selectedPaymentMethod === 'zelle'
                            ? handleZellePlaceOrder
                            : handleStripeLinkPlaceOrder
                        }
                        disabled={isProcessing}
                        variant="olive"
                        size="lg"
                        text={isProcessing ? 'Processing Order...' : t('placeOrder')}
                        className="w-full justify-between py-3.5 sm:py-4 text-[15px] sm:text-base font-sans font-bold shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* ==================================================================== */}
          {/* RIGHT COLUMN: Order Summary Card (Desktop Bidirectional Sticky)      */}
          {/* ==================================================================== */}
          <div ref={sidebarContainerRef} className="hidden lg:block lg:col-span-5 xl:col-span-4 w-full h-full relative">
            <div
              ref={sidebarCardRef}
              className="rounded-3xl bg-white border border-[#eddcd2] shadow-sm p-5 sm:p-7 w-full sticky top-28"
            >
              {/* Header */}
              <h2 className="text-xl font-sans font-bold text-neutral-900 tracking-tight mb-5">
                {t('orderSummary')}
              </h2>

              {/* Items List (Actual height without internal scrollbar) */}
              <div className="flex flex-col gap-3.5 pb-4 mb-5 border-b border-[#eddcd2]">
                {items.map((item) => {
                  const isMultiple = item.quantity > 1
                  const hasVariant =
                    (item.variantTitle || item.variantSku) &&
                    !['DEFAULT', 'DEFAULT TITLE'].includes(
                      (item.variantTitle || item.variantSku || '').toUpperCase()
                    )

                  return (
                    <div key={item.lineId} className="flex gap-3.5 items-center">
                      {/* Clickable Clean Full-Bleed Image */}
                      <Link
                        href={`/product/${item.product?.slug || item.productId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-14 h-16 shrink-0 block rounded-xl overflow-hidden bg-[#f0efeb] border border-[#eddcd2] group/thumb hover:border-[#cb997e] transition-colors"
                        title={`View ${item.product?.name || 'product'} (opens in new tab)`}
                      >
                        <Image
                          src={item.product?.imageUrl || '/placeholder.png'}
                          alt={item.product?.name || 'Product'}
                          fill
                          sizes="56px"
                          className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Info & Dedicated Quantity Pill */}
                      <div className="flex-1 min-w-0 pr-1">
                        <Link
                          href={`/product/${item.product?.slug || item.productId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-[13px] font-sans font-bold text-neutral-900 hover:text-[#cb997e] transition-colors leading-snug truncate block"
                          title={item.product?.name}
                        >
                          {item.product?.name}
                        </Link>
                        <div className="flex items-center flex-wrap gap-1.5 mt-1">
                          {hasVariant && (
                            <span className="text-[11px] text-neutral-500 font-sans truncate">
                              {item.variantTitle || item.variantSku}
                            </span>
                          )}
                          {hasVariant && <span className="text-[10px] text-neutral-300">•</span>}
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-sans font-bold bg-[#fff1e6] text-[#20221c] border border-[#eddcd2] shadow-2xs">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Total, Unit Price & Delete Button */}
                      <div className="flex flex-col items-end shrink-0 pl-1">
                        <span className="text-xs sm:text-[13px] text-neutral-900 font-price font-bold">
                          ${(item.priceSnapshot * item.quantity).toFixed(2)}
                        </span>
                        {isMultiple && (
                          <span className="text-[10px] sm:text-[10.5px] font-price text-neutral-400 mt-0.5">
                            ${item.priceSnapshot.toFixed(2)} ea
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            removeItem(item.lineId)
                            toast.info(`${item.product?.name || 'Item'} removed from order`)
                          }}
                          className="mt-1 p-1 -mr-1 text-neutral-400 hover:text-red-500 hover:bg-red-50/80 rounded-md transition-all cursor-pointer group/remove"
                          title={`Remove ${item.product?.name || 'item'}`}
                          aria-label={`Remove ${item.product?.name || 'item'}`}
                        >
                          <Trash2 size={13} className="group-hover/remove:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quantity Edit Note */}
              <div className="flex items-center justify-between text-[11px] font-sans text-neutral-500 bg-[#f0efeb]/60 rounded-xl px-3 py-2 border border-[#eddcd2]/80 mb-4">
                <span>To edit quantities:</span>
                <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                  <Link
                    href="/cart"
                    className="hover:text-[#cb997e] underline decoration-[#eddcd2] underline-offset-2 transition-colors"
                  >
                    Cart page
                  </Link>
                  <span className="text-neutral-300 font-normal">or</span>
                  <button
                    type="button"
                    onClick={() => openCart()}
                    className="hover:text-[#cb997e] underline decoration-[#eddcd2] underline-offset-2 transition-colors cursor-pointer"
                  >
                    Cart drawer
                  </button>
                </div>
              </div>

              {/* Promo Code UI */}
              <div className="mb-4">
                {appliedCoupon ? (
                  <div
                    style={{ backgroundColor: '#a5a58d' }}
                    className="h-11 px-3 sm:px-3.5 rounded-full border border-[#8f8f78] text-[#fff1e6] flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 mr-2">
                      <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                        <Tag size={12} strokeWidth={2.2} />
                      </span>
                      <span
                        className="font-sans font-bold text-[12px] text-white tracking-wider uppercase truncate min-w-0"
                        title={appliedCoupon.code}
                      >
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[10px] font-price font-bold text-[#20221c] bg-[#fff1e6] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap shadow-2xs">
                        -${appliedCoupon.discount.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="group/remove h-7 px-2.5 rounded-full bg-white/20 hover:bg-[#20221c] border border-white/30 hover:border-[#20221c] text-[11px] font-sans font-semibold text-white hover:text-[#fff1e6] active:scale-95 flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 shadow-2xs"
                      aria-label="Remove coupon"
                    >
                      <X
                        size={11}
                        strokeWidth={2.6}
                        className="transition-transform duration-300 ease-out group-hover/remove:rotate-90 group-hover/remove:scale-110"
                      />
                      <span>{t('remove')}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 items-center">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder={t('discountCodePlaceholder', { fallback: 'Discount coupon' })}
                      className="flex-1 min-w-0 h-10 px-4 rounded-full border border-[#eddcd2] bg-[#f0efeb]/40 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] focus:bg-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!couponCode.trim() || isVerifyingCoupon}
                      className="h-10 px-5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all shrink-0 cursor-pointer disabled:opacity-50 bg-[#a5a58d] hover:bg-[#20221c] text-[#fff1e6] border border-[#a5a58d]"
                    >
                      {isVerifyingCoupon ? <Loader2 size={13} className="animate-spin" /> : t('apply')}
                    </button>
                  </form>
                )}
              </div>

              {/* Maxx / HB Points Card */}
              {availablePoints > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#fff1e6]/60 border border-[#eddcd2] flex items-center justify-between mb-4 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Sparkles size={14} />
                    </span>
                    <div>
                      <span className="text-xs font-sans font-bold text-neutral-900 block">
                        HB Rewards Points
                      </span>
                      <span className="text-[10.5px] font-sans text-neutral-500 block">
                        {t('youHavePointsWithValue', {
                          points: Number(availablePoints.toFixed(2)),
                          value: availablePoints.toFixed(2),
                        })}
                      </span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isRedeemingPoints}
                      onChange={() => setIsRedeemingPoints(!isRedeemingPoints)}
                    />
                    <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#cb997e]"></div>
                  </label>
                </div>
              )}

              {/* Dedicated Cold-Chain Packaging Perk Card */}
              <div className="my-3.5 rounded-2xl bg-[#fff1e6] border border-[#eddcd2] px-3.5 py-2.5 flex items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-[#cb997e]/15 text-[#cb997e] flex items-center justify-center shrink-0">
                    <Snowflake size={12} strokeWidth={2.2} />
                  </span>
                  <span className="text-xs font-sans font-bold text-neutral-900 leading-tight">
                    Cold-Chain Insulated Box
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-sans font-bold text-[#cb997e] bg-[#cb997e]/12 border border-[#cb997e]/25 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                  Complimentary
                </span>
              </div>

              {/* Cost Breakdown Rows (Pure numerical accounting) */}
              <div className="border-t border-[#eddcd2] pt-5 pb-2 space-y-3.5 text-[13px] sm:text-[13.5px] font-sans text-neutral-600">
                <div className="flex justify-between items-center py-0.5">
                  <span>{t('subtotal')}</span>
                  <span className="font-price font-bold text-neutral-900">${subtotal.toFixed(2)} USD</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center py-0.5 text-[#55724a] gap-2">
                    <span className="flex items-center gap-1.5 font-medium min-w-0 flex-1 pr-1 truncate" title={appliedCoupon.code}>
                      <Tag size={13} className="shrink-0" />
                      <span className="truncate">{t('discountWithCode', { code: appliedCoupon.code })}</span>
                    </span>
                    <span className="font-price font-bold whitespace-nowrap shrink-0">
                      -${appliedCoupon.discount.toFixed(2)} USD
                    </span>
                  </div>
                )}

                {isRedeemingPoints && pointsToRedeem > 0 && (
                  <div className="flex justify-between items-center py-0.5 text-[#55724a]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles size={13} className="shrink-0" /> {t('pointsApplied')}
                    </span>
                    <span className="font-price font-bold shrink-0">-${pointsToRedeem.toFixed(2)} USD</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-0.5">
                  <span>{t('estimatedShipping', { fallback: 'Shipping' })}</span>
                  <span className="font-price font-medium text-neutral-900">
                    {finalShipping === 0 ? <span className="text-[#55724a] font-bold">{t('free')}</span> : `$${finalShipping.toFixed(2)} USD`}
                  </span>
                </div>

                <div className="flex justify-between items-center py-0.5">
                  <span>{t('processingFee')}{activeFeePercentage ? ` (${activeFeePercentage}%)` : ''}</span>
                  <span className="font-price font-medium text-neutral-900">${processingFeeAmount.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-5 pb-6 border-t border-[#eddcd2]">
                <span className="text-base font-sans font-bold text-neutral-900">{t('total')}</span>
                <span className="text-2xl sm:text-[26px] font-price font-bold text-neutral-900 tracking-tight">
                  ${total.toFixed(2)} <span className="text-xs font-normal text-neutral-500">USD</span>
                </span>
              </div>

              {/* Bottom Security Trust Badges */}
              <div className="pt-4 border-t border-[#eddcd2] flex items-center justify-center gap-6 text-neutral-500 text-xs font-sans">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#a5a58d]" />
                  <span>256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Snowflake size={14} className="text-[#cb997e]" />
                  <span>Cold-Chain Box</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
