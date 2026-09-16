'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Printer, Copy, MapPin, Truck, CreditCard, Wallet, ShieldCheck } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'
import { useCartStore } from '@/lib/cart/store'
import { toast } from 'sonner'

type OrderItem = {
  id: string
  name: string
  variant: string
  quantity: number
  price: number
  image: string
}

type OrderData = {
  id: string
  orderId: string
  customerName: string
  email: string
  shippingAddress: {
    line1: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  billingAddress: {
    line1: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  estimatedDeliveryType: 'express' | 'standard'
  items: OrderItem[]
  subtotal: number
  shipping: number
  processingFee: number
  processingFeePercentage?: number | null
  total: number
  discountTotal?: number
  redeemedPoints?: number
  couponCode?: string
  paymentMethod: 'stripe' | 'zelle' | 'amex' | 'circoflows' | 'stripe_link'
}

const ZELLE_RECIPIENT_PHONE = '832-705-9377'

const CONFETTI_PIECES = [
  { x: -80, y: -60, color: '#cb997e', delay: 0.0, rotation: 45, scale: 1.2 },
  { x: 40, y: -90, color: '#a5a58d', delay: 0.1, rotation: -20, scale: 0.9 },
  { x: 90, y: -30, color: '#ddbea9', delay: 0.05, rotation: 110, scale: 1.1 },
  { x: -90, y: 20, color: '#b7b7a4', delay: 0.15, rotation: -45, scale: 0.8 },
  { x: -50, y: 80, color: '#20221c', delay: 0.2, rotation: 60, scale: 1.3 },
  { x: 70, y: 60, color: '#cb997e', delay: 0.02, rotation: -80, scale: 1.0 },
  { x: 100, y: 20, color: '#a5a58d', delay: 0.12, rotation: 15, scale: 1.1 },
  { x: -20, y: -100, color: '#ddbea9', delay: 0.08, rotation: 75, scale: 0.9 },
  { x: 20, y: 90, color: '#eddcd2', delay: 0.18, rotation: -115, scale: 0.7 },
  { x: -100, y: -20, color: '#20221c', delay: 0.05, rotation: 30, scale: 1.2 },
  { x: 50, y: -50, color: '#cb997e', delay: 0.1, rotation: -60, scale: 0.8 },
  { x: -60, y: 40, color: '#a5a58d', delay: 0.0, rotation: 90, scale: 1.4 },
]

const ConfettiBurst = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 translate-y-[-16px]">
      {CONFETTI_PIECES.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: p.scale,
            opacity: 0,
            rotate: p.rotation
          }}
          transition={{
            duration: 0.8,
            delay: 0.2 + p.delay,
            ease: "easeOut"
          }}
          className="absolute w-2 h-2 md:w-3 md:h-3 rounded-[2px]"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}

export function OrderConfirmationClient({ order }: { order: OrderData }) {
  const t = useTranslations('orderConfirmation')
  const isZelle = order.paymentMethod === 'zelle'
  const isStripeLink = order.paymentMethod === 'stripe_link' || order.paymentMethod === 'amex'
  const isPreview = order.orderId === 'preview'

  React.useEffect(() => {
    if (isPreview) return

    // GA4 eCommerce tracking
    if (typeof window !== 'undefined' && !sessionStorage.getItem(`ga_tracked_${order.id}`)) {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ ecommerce: null }); // Clear previous eCommerce object
      w.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: order.orderId || order.id,
          value: order.total,
          tax: 0,
          shipping: order.shipping,
          currency: 'USD',
          coupon: order.couponCode || '',
          items: order.items.map((item, index) => ({
            item_id: item.id,
            item_name: item.name,
            item_variant: item.variant,
            price: item.price,
            quantity: item.quantity,
            index: index
          }))
        }
      });
      sessionStorage.setItem(`ga_tracked_${order.id}`, 'true');
    }

    useCartStore.getState().clear()
  }, [order, isPreview])

  React.useEffect(() => {
    if (isPreview) return
    if (order.paymentMethod === 'circoflows') {
      import('../../checkout/circoflowsActions').then(m => m.syncCircoFlowsPaymentStatus(order.orderId))
    }
  }, [order.paymentMethod, order.orderId, isPreview])

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id)
    toast.success('Order number copied!')
  }

  const PAYMENT_METHOD_LABELS: Record<OrderData['paymentMethod'], string> = {
    stripe: t('paymentMethodCard'),
    zelle: t('paymentMethodZelle'),
    amex: 'American Express',
    circoflows: t('paymentMethodCard'),
    stripe_link: 'Stripe (Custom Link)',
  }

  const renderOrderSummary = () => (
    <FadeUp delay={0.2} className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 border border-[#eddcd2]/80 lg:sticky lg:top-32 shadow-[0_24px_64px_rgba(32,34,28,0.06)]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#b7b7a4]/30">
        <h2 className="text-sm font-heading font-extrabold text-[#20221c] uppercase tracking-widest">Order Summary</h2>
        <button onClick={handleCopyOrderId} className="flex items-center gap-1.5 text-xs font-bold text-[#20221c]/55 hover:text-[#20221c] transition-colors bg-[#f0efeb] px-3 py-1.5 rounded-full border border-[#b7b7a4]/35">
          #{order.id} <Copy size={12} />
        </button>
      </div>

      {/* Items List (Flex Layout) */}
      <div className="flex flex-col gap-5 mb-8 max-h-[45vh] overflow-y-auto custom-scrollbar pr-2">
        {order.items.map(item => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-[14px] bg-[#f0efeb] border border-[#eddcd2] overflow-hidden shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col flex-grow min-w-0">
              <span className="font-bold text-[#20221c] text-sm line-clamp-2">{item.name}</span>
              {item.variant && !['DEFAULT', 'DEFAULT TITLE'].includes(item.variant.toUpperCase()) && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#a5a58d] mt-1">{item.variant}</span>
              )}
              <span className="text-xs text-[#20221c]/45 mt-1 font-medium">Qty: {item.quantity}</span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-[#20221c] text-sm">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Totals Box */}
      <div className="bg-[#f0efeb] rounded-[20px] p-5">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between text-[#20221c]/60">
            <span>{t('subtotal')}</span>
            <span className="font-medium text-[#20221c]">${order.subtotal.toFixed(2)}</span>
          </div>
          {!!order.discountTotal && order.discountTotal > 0 && (
            <div className="flex justify-between text-[#20221c]/60">
              <span>{t('discount')} {order.couponCode ? <span className="text-xs uppercase bg-[#eddcd2] text-[#20221c] px-1 rounded ml-1">{order.couponCode}</span> : ''}</span>
              <span className="font-bold text-[#cb997e]">-${order.discountTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#20221c]/60">
            <span>{t('shipping')}</span>
            <span className="font-medium text-[#20221c]">{order.shipping === 0 ? <span className="font-bold text-[#a5a58d]">{t('free')}</span> : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-[#20221c]/60 pb-4 border-b border-[#b7b7a4]/25">
            <span>{t('processingFee')} {order.processingFeePercentage ? <span className="text-[10px] uppercase bg-[#eddcd2] text-[#20221c] px-1 rounded ml-1">{order.processingFeePercentage}%</span> : ''}</span>
            <span className="font-medium text-[#20221c]">${order.processingFee.toFixed(2)}</span>
          </div>
          {!!order.redeemedPoints && order.redeemedPoints > 0 && (
            <div className="flex justify-between text-[#20221c]/60 pt-1 pb-4 border-b border-[#b7b7a4]/25">
              <span>HB Points</span>
              <span className="font-bold text-[#cb997e]">-${order.redeemedPoints.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/50">{t('totalUsd')}</span>
            <span className="text-2xl font-heading font-extrabold text-[#20221c]">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="text-[11px] text-[#20221c]/40 font-medium">
          {t.rich('questionsContactSupport', {
            link: (chunks) => <a href="mailto:support@helixbiochem.com" className="text-[#cb997e] hover:text-[#a5a58d] underline transition-colors">{chunks}</a>,
          })}
        </span>
      </div>
    </FadeUp>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}} />
      <div className="min-h-screen bg-[#f0efeb] pt-24 pb-32 print:bg-white print:pt-0 print:pb-0 print:min-h-0">
        <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 print:block print:w-full print:px-0 print:m-0 print:h-auto">

          {/* Print Invoice (Visible ONLY when printing) */}
          <div className="hidden print:block">
            <div className="flex items-start justify-between pb-6 mb-10 border-b-2 border-black">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/veracue-images/logo-header.png" alt="Veracue" className="h-9 w-auto object-contain" />
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-black uppercase tracking-wide mb-1">{t('receipt')}</p>
                <p className="text-xs text-gray-600">Order #{order.id}</p>
              </div>
            </div>

            {/* Ship To / Delivery & Payment meta */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{t('shippingAddress')}</p>
                <p className="font-bold text-black text-sm">{order.customerName}</p>
                <p className="text-sm text-gray-700">{order.shippingAddress.line1}</p>
                <p className="text-sm text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p className="text-sm text-gray-700">{order.shippingAddress.country}</p>
              </div>
              <div className="text-right">
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{t('estDelivery')}</p>
                  <p className="text-sm text-black font-medium">{t(order.estimatedDeliveryType === 'express' ? 'estimatedDeliveryExpress' : 'estimatedDeliveryStandard')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{t('paymentMethod')}</p>
                  <p className="text-sm text-black font-medium">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-sm mb-8 border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left font-bold uppercase tracking-widest text-[10px] text-black py-2">Item</th>
                  <th className="text-center font-bold uppercase tracking-widest text-[10px] text-black py-2 w-16">Qty</th>
                  <th className="text-right font-bold uppercase tracking-widest text-[10px] text-black py-2 w-24">Price</th>
                  <th className="text-right font-bold uppercase tracking-widest text-[10px] text-black py-2 w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-3 pr-4">
                      <p className="font-bold text-black">{item.name}</p>
                      {item.variant && !['DEFAULT', 'DEFAULT TITLE'].includes(item.variant.toUpperCase()) && (
                        <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{item.variant}</p>
                      )}
                    </td>
                    <td className="py-3 text-center text-gray-700">{item.quantity}</td>
                    <td className="py-3 text-right text-gray-700">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-black">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-12">
              <div className="w-64 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>{t('subtotal')}</span><span>${order.subtotal.toFixed(2)}</span>
                </div>
                {!!order.discountTotal && order.discountTotal > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>{t('discount')}{order.couponCode ? ` (${order.couponCode})` : ''}</span><span>-${order.discountTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>{t('shipping')}</span><span>{order.shipping === 0 ? t('free') : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-300">
                  <span>{t('processingFee')}{order.processingFeePercentage ? ` (${order.processingFeePercentage}%)` : ''}</span><span>${order.processingFee.toFixed(2)}</span>
                </div>
                {!!order.redeemedPoints && order.redeemedPoints > 0 && (
                  <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-300">
                    <span>HB Points</span><span>-${order.redeemedPoints.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t-2 border-black">
                  <span className="font-bold text-black uppercase tracking-wide text-xs">{t('totalUsd')}</span>
                  <span className="font-bold text-black text-lg">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-300">
              <p>Thank you for your order.</p>
              <p className="mt-1">Questions? Contact support@helixbiochem.com</p>
            </div>
          </div>

          {/* Main Layout: Split Screen on Desktop */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24 print:hidden">

            {/* LEFT COLUMN: Success Msg & Next Steps */}
            <div className="w-full lg:w-[55%] flex flex-col gap-10">

              {/* Header Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left print:hidden">
                <div className="relative">
                  <ConfettiBurst />

                  {/* Soft radial glow flash */}
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 3.4, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.1, delay: 0.05, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(203,153,126,0.55) 0%, rgba(203,153,126,0) 70%)' }}
                  />

                  {/* Expanding shockwave rings (staggered) */}
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0.9 }}
                    animate={{ scale: 2.7, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-[20px] border-2 border-[#cb997e] pointer-events-none"
                  />
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: 2.15, opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-[20px] border-2 border-[#a5a58d] pointer-events-none"
                  />

                  {/* Badge: springy overshoot pop-in with a rotation wind-up */}
                  <motion.div
                    initial={{ scale: 0, rotate: -160, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 0.9, 1.06, 1], rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-[20px] bg-[#20221c] text-[#fff1e6] flex items-center justify-center mb-8 shadow-[0_12px_32px_rgba(32,34,28,0.22)] relative z-10"
                  >
                    {/* Diagonal specular sheen sweeping across once the badge lands */}
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none">
                      <motion.span
                        initial={{ x: '-200%', opacity: 0 }}
                        animate={{ x: '500%', opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, delay: 0.55, ease: 'easeInOut' }}
                        className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg]"
                      />
                    </div>

                    {/* Checkmark draws itself on after the badge settles */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="relative">
                      <motion.path
                        d="M5 12.5l4.5 4.5L19 7"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                      />
                    </svg>
                  </motion.div>
                </div>

                <FadeUp delay={0.1}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/40 mb-3">{t('confirmationEmailSent')} {order.email}</p>
                  <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#20221c] mb-4 tracking-tight">
                    {isZelle || isStripeLink ? t('orderPlaced') : t('paymentSuccessful')}
                  </h1>
                  <p className="text-[#20221c]/60 text-sm md:text-base leading-relaxed max-w-lg">
                    {isZelle
                      ? t('thankYouZelle', { name: order.customerName })
                      : isStripeLink
                      ? "Thank you for your order! Your items have been successfully reserved."
                      : t('thankYouConfirmed', { name: order.customerName })}
                  </p>
                </FadeUp>
              </div>

              {/* Dynamic Action Modules (Zelle/Amex) */}
              {isZelle && (
                <FadeUp delay={0.15} className="print:hidden">
                  <div className="bg-white border border-[#eddcd2] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#cb997e]/8 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[14px] bg-[#fff1e6] flex items-center justify-center text-[#cb997e]">
                        <Wallet size={24} />
                      </div>
                      <div>
                        <h2 className="text-lg font-heading font-bold text-[#20221c]">{t('completeZellePayment')}</h2>
                        <p className="text-sm text-[#20221c]/50 font-medium">Follow the instructions to finalize</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#f0efeb] rounded-[16px] p-4 border border-[#eddcd2]">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-white border border-[#eddcd2] rounded-[10px] overflow-hidden p-1 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://pub-0b0f2f98407442588d161ae09cb84207.r2.dev/email-assets/HB-zelle-qr.webp" alt="Zelle QR" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col gap-3 w-full">
                         <div className="bg-white rounded-[10px] p-3 flex justify-between items-center w-full border border-[#eddcd2]/70">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/40">Send To (Phone)</span>
                             <span className="text-sm font-bold text-[#cb997e]">{ZELLE_RECIPIENT_PHONE}</span>
                           </div>
                         </div>
                         <div className="bg-white rounded-[10px] p-3 flex justify-between items-center w-full border border-[#eddcd2]/70">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/40">Amount</span>
                             <span className="text-sm font-bold text-[#20221c]">${order.total.toFixed(2)}</span>
                           </div>
                         </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-[#fff1e6] p-4 rounded-[16px]">
                      <ShieldCheck size={20} className="text-[#cb997e] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#20221c]/80 font-medium leading-relaxed">
                        {t.rich('includeOrderNumber', {
                          orderId: order.id,
                          bold: (chunks) => <span className="font-bold underline decoration-[#cb997e]/50 underline-offset-2">{chunks}</span>,
                        })}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              )}

              {isStripeLink && (
                <FadeUp delay={0.15} className="print:hidden">
                  <div className="bg-white border border-[#b7b7a4]/40 rounded-[24px] p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative overflow-hidden">
                    <div className="w-12 h-12 rounded-[14px] bg-[#a5a58d]/15 flex items-center justify-center text-[#a5a58d] shrink-0">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-heading font-bold text-[#20221c] mb-2">Secure Stripe Payment Link</h2>
                      <p className="text-sm text-[#20221c]/60 leading-relaxed">
                        One of our team members will reach out to you shortly via <strong className="text-[#20221c]">Email</strong> with a secure, custom Stripe payment link to finalize your order. Rest assured, your items are safely reserved for you in the meantime!
                      </p>
                    </div>
                  </div>
                </FadeUp>
              )}

              {/* MOBILE ONLY: Order Summary (Visible only on lg:hidden) */}
              <div className="block lg:hidden w-full print:hidden">
                {renderOrderSummary()}
              </div>

              {/* Customer Information Grid */}
              <FadeUp delay={0.2} className="flex flex-col gap-6 border-t border-[#b7b7a4]/30 pt-8 print:hidden">
                <h3 className="text-sm font-heading font-extrabold uppercase tracking-widest text-[#20221c] mb-2">{t('shippingAddress')} & Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Shipping Box */}
                  <div className="bg-white border border-[#eddcd2]/80 rounded-[22px] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 border-b border-[#b7b7a4]/25 pb-3">
                      <MapPin size={16} className="text-[#a5a58d]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#a5a58d]">{t('shippingAddress')}</span>
                    </div>
                    <div className="text-sm text-[#20221c]/70 flex flex-col gap-1">
                      <p className="font-bold text-[#20221c]">{order.customerName}</p>
                      <p>{order.shippingAddress.line1}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Delivery & Payment Box */}
                  <div className="bg-white border border-[#eddcd2]/80 rounded-[22px] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 border-b border-[#b7b7a4]/25 pb-3">
                      <Truck size={16} className="text-[#a5a58d]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#a5a58d]">Method</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/40 mb-1">{t('estDelivery')}</p>
                        <p className="text-sm font-bold text-[#20221c]">{t(order.estimatedDeliveryType === 'express' ? 'estimatedDeliveryExpress' : 'estimatedDeliveryStandard')}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#20221c]/40 mb-1">{t('paymentMethod')}</p>
                        <p className="text-sm font-bold text-[#20221c] flex items-center gap-2">
                           {isZelle ? <Wallet size={14} className="text-[#cb997e]"/> : isStripeLink ? <CreditCard size={14} className="text-[#a5a58d]" /> : <CreditCard size={14} className="text-[#a5a58d]/70" />}
                           {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </FadeUp>

              {/* Footer Actions (Desktop Left Col) */}
              <FadeUp delay={0.3} className="pt-8 flex flex-col sm:flex-row gap-6 items-center justify-between print:hidden">
                 <HeroButton href="/shop" size="lg" className="w-full sm:w-auto justify-center sm:justify-between" text={t('continueShopping')} />
                 <button onClick={() => window.print()} className="flex items-center gap-2 hover:text-[#20221c] transition-colors font-medium text-sm text-[#20221c]/55">
                   <Printer size={16} /> {t('printReceipt')}
                 </button>
              </FadeUp>

            </div>

            {/* DESKTOP ONLY: Order Summary (Sticky) (Visible only on lg:block) */}
            <div className="hidden lg:block w-full lg:w-[45%] xl:w-[40%] print:hidden">
              {renderOrderSummary()}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
