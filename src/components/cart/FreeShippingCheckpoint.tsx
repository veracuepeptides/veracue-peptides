'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Truck } from 'lucide-react'
import { Link } from '@/i18n/navigation'

type FreeShippingCheckpointProps = {
  /** Cart subtotal in dollars. */
  subtotal: number
  /** Subtotal at which standard shipping becomes free. */
  threshold: number
  /** What standard shipping costs below the threshold (0 when unknown). */
  shippingFee: number
  /** Called when the visitor leaves the drawer to keep shopping. */
  onKeepShopping?: () => void
}

// Whole dollars without decimals ($300), anything else with cents ($84.50).
const money = (amount: number) => (Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`)

function describe(progress: number, remaining: number, threshold: number, fee: number) {
  const left = `$${remaining.toFixed(2)}`
  const saving = fee > 0 ? `That saves you ${money(fee)} on this order.` : `Standard shipping is free from ${money(threshold)}.`

  if (progress >= 1) {
    return {
      headline: 'Free shipping unlocked',
      sub: fee > 0 ? `You are saving ${money(fee)} on shipping with this order.` : 'Standard shipping is free on this order.',
    }
  }
  if (progress >= 0.8) {
    return { headline: `Almost there: add ${left} and shipping is free`, sub: saving }
  }
  if (progress >= 0.5) {
    return { headline: `Add ${left} more to ship free`, sub: saving }
  }
  return {
    headline: `You are ${left} away from free shipping`,
    sub: fee > 0 ? `Orders under ${money(threshold)} pay ${money(fee)} for shipping.` : `Standard shipping is free from ${money(threshold)}.`,
  }
}

/**
 * Progress toward the free-shipping amount, shown at the top of the cart drawer. A marker follows the
 * subtotal along the track and the truck at the end is the checkpoint; the card changes to the dark
 * brand surface once the checkpoint is reached.
 */
export function FreeShippingCheckpoint({ subtotal, threshold, shippingFee, onKeepShopping }: FreeShippingCheckpointProps) {
  const reduceMotion = useReducedMotion()

  // Work in cents so a subtotal like 299.999 never reads as "$0.00 away".
  const thresholdCents = Math.round(threshold * 100)
  const subtotalCents = Math.round(subtotal * 100)
  if (thresholdCents <= 0) return null

  const progress = Math.min(subtotalCents / thresholdCents, 1)
  const remaining = Math.max(thresholdCents - subtotalCents, 0) / 100
  const reached = progress >= 1
  const percent = Math.round(progress * 100)
  const { headline, sub } = describe(progress, remaining, threshold, shippingFee)
  const duration = reduceMotion ? 0 : 0.5

  return (
    <div
      className={`px-4 sm:px-6 pt-3.5 pb-3 border-b shrink-0 transition-colors duration-300 ${
        reached ? 'bg-[#20221c] border-[#20221c]' : 'bg-[#fff1e6] border-[#eddcd2]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0" aria-live="polite">
          <p
            className={`text-[13px] sm:text-[13.5px] font-heading font-bold leading-snug tracking-tight flex items-center gap-1.5 ${
              reached ? 'text-[#fff1e6]' : 'text-[#20221c]'
            }`}
          >
            {reached && <Check size={14} strokeWidth={2.75} className="text-[#cb997e] shrink-0" />}
            {headline}
          </p>
          <p className={`text-[11.5px] sm:text-xs mt-0.5 leading-snug font-sans ${reached ? 'text-[#ddbea9]' : 'text-neutral-600'}`}>
            {sub}
          </p>
        </div>

        {!reached && (
          <Link
            href="/shop"
            onClick={onKeepShopping}
            className="shrink-0 text-[11.5px] font-sans font-semibold text-[#20221c] bg-white border border-[#eddcd2] hover:border-[#cb997e] hover:text-[#cb997e] rounded-full px-3 py-1 transition-colors"
          >
            Keep shopping
          </Link>
        )}
      </div>

      {/* Track, with the subtotal marker and the free-shipping checkpoint at the end */}
      <div className="relative mt-4 mb-1.5 mx-3">
        <div
          role="progressbar"
          aria-label="Progress toward free shipping"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-valuetext={reached ? 'Free shipping unlocked' : `${percent} percent of the way to free shipping`}
          className={`h-2 w-full rounded-full overflow-hidden ${reached ? 'bg-[#fff1e6]/20' : 'bg-[#eddcd2]'}`}
        >
          <motion.div
            className="h-full rounded-full bg-[#cb997e]"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration, ease: 'easeOut' }}
          />
        </div>

        {/* You are here */}
        {!reached && (
          <motion.span
            aria-hidden="true"
            className="absolute top-1 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-[#cb997e] shadow-sm"
            initial={false}
            animate={{ left: `${progress * 100}%` }}
            transition={{ duration, ease: 'easeOut' }}
          />
        )}

        {/* Checkpoint */}
        <span
          aria-hidden="true"
          className={`absolute top-1 right-0 w-7 h-7 translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
            reached ? 'bg-[#cb997e] border-[#cb997e] text-[#20221c]' : 'bg-[#fff1e6] border-[#cb997e] text-[#cb997e]'
          }`}
        >
          <Truck size={13} strokeWidth={2.25} />
        </span>
      </div>

      <div
        className={`flex items-center justify-between text-[10.5px] sm:text-[11px] font-sans font-semibold ${
          reached ? 'text-[#ddbea9]' : 'text-neutral-600'
        }`}
      >
        <span>{money(Math.round(subtotal * 100) / 100)} in your bag</span>
        <span>Free shipping at {money(threshold)}</span>
      </div>
    </div>
  )
}
