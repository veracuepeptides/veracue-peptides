'use client'

import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { WalletCards, Loader2, CheckCircle2, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

interface PayoutsClientProps {
  payoutRequests: {
    id: string;
    date: string;
    amount: number; // in dollars
    method: string;
    details: string;
    status: string;
  }[];
  availableBalance: number;
  totalPendingHold: number;
  minimumThreshold: number;
  pendingPeriodDays: number;
}

export function PayoutsClient({ payoutRequests, availableBalance, totalPendingHold, minimumThreshold, pendingPeriodDays }: PayoutsClientProps) {
  const t = useTranslations('affiliate.payouts')
  const router = useRouter()

  const statusLabel = (status: string) => {
    if (status === 'pending') return t('statusPending')
    if (status === 'paid') return t('statusPaid')
    if (status === 'rejected') return t('statusRejected')
    return t('statusProcessing')
  }

  const statusDotColor = (status: string) => {
    if (status === 'pending') return 'bg-amber-400'
    if (status === 'paid') return 'bg-[#3a442e]'
    if (status === 'rejected') return 'bg-rose-500'
    return 'bg-[#a5a58d]'
  }

  const [amount, setAmount] = useState<string>('')
  const [method, setMethod] = useState<'zelle' | 'cashapp' | 'applepay'>('zelle')
  const [details, setDetails] = useState<string>('')

  const [isRequesting, setIsRequesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const formatMoney = (dollars: number) => `$${dollars.toFixed(2)}`

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError(t('errorInvalidAmount'))
      return
    }

    if (parsedAmount < minimumThreshold) {
      setError(t('errorMinimumAmount', { amount: formatMoney(minimumThreshold) }))
      return
    }

    if (parsedAmount > availableBalance) {
      setError(t('errorExceedsBalance'))
      return
    }

    if (!details.trim()) {
      setError(t('errorMissingDetails'))
      return
    }

    setIsRequesting(true)

    try {
      const res = await fetch('/api/affiliates/payout-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parsedAmount,
          method,
          details,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(t('successRequestSubmitted'))
        setAmount('')
        setDetails('')
        router.refresh()
      } else {
        setError(data.error || t('errorSubmitFailed'))
      }
    } catch (err) {
      setError(t('errorUnexpected'))
    } finally {
      setIsRequesting(false)
    }
  }

  // Animation variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 sm:gap-10 w-full font-sans"
    >
      <motion.div variants={itemVars} className="pb-2 border-b border-[#dce0d6]/70">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block mb-1">
          {t('eyebrow', { fallback: 'Commission Payouts' })}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
          {t('pageTitle', { fallback: 'Payouts' })}
        </h1>
      </motion.div>

      {/* Top Balances */}
      <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="bg-[#2c3327] text-white rounded-[24px] p-6 sm:p-7 border border-[#3a442e] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div aria-hidden="true" className="absolute -top-16 -right-16 w-48 h-48 bg-[#a5a58d]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-[10.5px] font-semibold uppercase tracking-wider text-white/70">{t('availableBalanceTitle')}</h1>
            <p className="text-white/70 text-xs mt-1 max-w-sm font-light">{t('availableBalanceDesc')}</p>
          </div>
          <span className="relative z-10 text-4xl sm:text-5xl font-semibold text-white tracking-tight mt-6">{formatMoney(availableBalance)}</span>
        </div>

        <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[#a5a58d] mb-1">
              <Clock size={13} />
              <h1 className="text-[10.5px] font-semibold uppercase tracking-wider">{t('dayHoldTitle', { days: pendingPeriodDays })}</h1>
            </div>
            <p className="text-[#525b4c] text-xs max-w-sm font-light">{t('dayHoldDesc', { days: pendingPeriodDays })}</p>
          </div>
          <span className="text-4xl sm:text-5xl font-semibold text-[#1a1f16] tracking-tight mt-6">{formatMoney(totalPendingHold)}</span>
        </div>
      </motion.div>

      {/* Request Form */}
      <motion.div variants={itemVars} className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)] flex flex-col gap-6">
        <h2 className="text-sm font-semibold text-[#1a1f16] border-b border-[#dce0d6]/70 pb-4">
          {t('requestPayoutTitle')}
        </h2>

        <form onSubmit={handleRequestPayout} className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('amountLabel')}</label>
            <input
              type="number"
              step="0.01"
              min={minimumThreshold.toString()}
              max={availableBalance.toString()}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full bg-[#f0efeb] border border-[#dce0d6] rounded-xl px-4 py-3 text-lg text-[#1a1f16] font-semibold focus:outline-none focus:border-[#2c3327] focus:bg-white transition-colors"
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('methodLabel')}</label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value as any)}
              className="w-full bg-[#f0efeb] border border-[#dce0d6] rounded-xl px-4 py-3 text-sm text-[#1a1f16] font-semibold focus:outline-none focus:border-[#2c3327] focus:bg-white transition-colors"
            >
              <option value="zelle">{t('methodZelle')}</option>
              <option value="cashapp">{t('methodCashapp')}</option>
              <option value="applepay">{t('methodApplePay')}</option>
            </select>
          </div>

          <div className="flex-[2] w-full flex flex-col gap-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('detailsLabel')}</label>
            <input
              type="text"
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="w-full bg-[#f0efeb] border border-[#dce0d6] rounded-xl px-4 py-3 text-sm text-[#1a1f16] font-semibold focus:outline-none focus:border-[#2c3327] focus:bg-white transition-colors"
              placeholder={t('detailsPlaceholder')}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isRequesting || availableBalance < minimumThreshold}
            className="w-full lg:w-auto bg-[#2c3327] text-white px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1a1f16] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer h-[46px]"
          >
            {isRequesting ? <Loader2 className="w-4 h-4 animate-spin" /> : t('requestButton')}
          </button>
        </form>

        {error && (
          <div className="text-rose-600 text-sm font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="text-[#3a442e] text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </div>
        )}
      </motion.div>

      {/* Payout Ledger */}
      <motion.div variants={itemVars} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-[#1a1f16] px-1">
          {t('payoutHistoryTitle')}
        </h2>

        {payoutRequests.length === 0 ? (
          <div className="w-full bg-white rounded-[24px] border border-[#dce0d6] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-[0_1px_6px_rgba(40,49,33,0.02)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#f0efeb] text-[#a5a58d] border border-[#dce0d6] flex items-center justify-center mb-4 shadow-xs">
              <WalletCards size={28} strokeWidth={1.75} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1a1f16] tracking-tight mb-2">{t('emptyTitle')}</h3>
            <p className="text-xs sm:text-sm text-[#525b4c] font-light max-w-sm">{t('emptyDesc')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-5">
            {payoutRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-[22px] border border-[#dce0d6] p-5 sm:p-6 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-[#a5a58d]/70 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#f0efeb] text-[#a5a58d] border border-[#dce0d6] shadow-xs flex items-center justify-center shrink-0">
                    <WalletCards size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm sm:text-base text-[#1a1f16] capitalize">{req.method}</span>
                    <span className="text-xs text-[#525b4c] font-light truncate max-w-[220px]">{req.details}</span>
                    <span className="text-xs text-[#a5a58d] font-light">{req.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-[#dce0d6]/60">
                  <span className="text-lg sm:text-xl font-semibold text-[#1a1f16]">{formatMoney(req.amount)}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(req.status)}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#525b4c]">{statusLabel(req.status)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
