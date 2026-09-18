'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, MousePointerClick, Target, DollarSign, Wallet, Copy, Check, ExternalLink } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'

export interface DashboardClientProps {
  userName?: string;
  tier?: string;
  stats: {
    totalClicks: number;
    totalConversions: number;
    conversionRate: string;
    totalCommissionPending: number; // in dollars
    totalCommissionApproved: number; // in dollars
    totalCommissionPaid: number; // in dollars
    referralSlug: string;
    couponCode: string;
  };
  recentConversions: {
    id: string;
    date: string;
    amount: number; // commission amount in dollars
    status: string;
  }[];
}

export function DashboardClient({ userName = 'Affiliate', tier = 'standard', stats, recentConversions }: DashboardClientProps) {
  const t = useTranslations('affiliate.dashboard')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const statusLabel = (status: string) => {
    if (status === 'pending') return t('statusPending')
    if (status === 'approved') return t('statusApproved')
    if (status === 'paid') return t('statusPaid')
    return status
  }

  const statusDotColor = (status: string) => {
    if (status === 'pending') return 'bg-amber-400'
    if (status === 'approved') return 'bg-[#3a442e]'
    return 'bg-[#a5a58d]'
  }

  const handleCopy = (text: string, type: 'link' | 'code') => {
    navigator.clipboard.writeText(text)
    if (type === 'link') {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } else {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  // Formatting helpers
  const formatMoney = (dollars: number) => `$${dollars.toFixed(2)}`
  const [baseUrl, setBaseUrl] = useState('https://veracuepeptides.com')

  React.useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const referralUrl = `${baseUrl}/ref/${stats.referralSlug}`

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

      {/* 1. Header Banner */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#dce0d6]/70">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block mb-1">
            {t('eyebrow', { fallback: 'Partner Dashboard' })}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
            {t('welcomeBack', { fallback: 'Welcome back' })}, {userName}
          </h1>
          <p className="text-sm text-[#525b4c] mt-1 font-light">
            {t('overviewSubtitle', { fallback: 'Track clicks, conversions, and commission payouts.' })}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold capitalize w-fit">
          {tier} {t('tierSuffix', { fallback: 'Tier' })}
        </span>
      </motion.div>

      {/* 2. Stats Grid */}
      <motion.div variants={itemVars} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] shadow-[0_1px_4px_rgba(40,49,33,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/70 flex items-center justify-center mb-4 shadow-xs">
            <MousePointerClick size={18} />
          </div>
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c] mb-1">{t('totalClicks')}</span>
          <span className="text-2xl sm:text-3xl text-[#1a1f16] leading-none font-semibold tracking-tight">{stats.totalClicks}</span>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] shadow-[0_1px_4px_rgba(40,49,33,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center mb-4 shadow-xs">
            <Target size={18} />
          </div>
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c] mb-1">{t('conversions')}</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl sm:text-3xl text-[#1a1f16] leading-none font-semibold tracking-tight">{stats.totalConversions}</span>
            <span className="text-[10px] font-bold text-[#2c3327] bg-[#edf0e8] px-2 py-0.5 rounded-full mb-0.5">{stats.conversionRate}</span>
          </div>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] shadow-[0_1px_4px_rgba(40,49,33,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center mb-4 shadow-xs">
            <DollarSign size={18} />
          </div>
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c] mb-1">{t('pendingCommission')}</span>
          <span className="text-2xl sm:text-3xl text-[#1a1f16] leading-none font-semibold tracking-tight">{formatMoney(stats.totalCommissionPending)}</span>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] shadow-[0_1px_4px_rgba(40,49,33,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#edf0e8] text-[#2c3327] border border-[#a5a58d]/40 flex items-center justify-center mb-4 shadow-xs">
            <Wallet size={18} />
          </div>
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c] mb-1">{t('totalPaidOut')}</span>
          <span className="text-2xl sm:text-3xl text-[#1a1f16] leading-none font-semibold tracking-tight">{formatMoney(stats.totalCommissionPaid)}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">

        {/* Left Column: Recent Conversions (Ledger Style) */}
        <motion.div variants={itemVars} className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold text-[#1a1f16]">{t('recentConversions')}</h2>
            <Link href="/affiliates/dashboard/conversions" className="text-xs font-semibold text-[#2c3327] hover:text-[#3a442e] transition-colors inline-flex items-center gap-1 group py-1">
              <span>{t('viewAll')}</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="bg-white rounded-[22px] border border-[#dce0d6] shadow-[0_1px_4px_rgba(40,49,33,0.02)] overflow-hidden">
            {recentConversions.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-3 text-[#525b4c] px-6">
                <div className="w-14 h-14 rounded-2xl bg-[#f0efeb] text-[#a5a58d] border border-[#dce0d6] flex items-center justify-center shadow-xs">
                  <Target size={24} />
                </div>
                <p className="text-sm font-semibold text-[#1a1f16]">{t('noConversionsYet')}</p>
                <p className="text-xs text-[#525b4c]">{t('shareLinkToEarn')}</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[#dce0d6]/60">
                {recentConversions.map((conv, i) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 hover:bg-[#fafaf8] transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold text-[#1a1f16]">{t('orderNumber', { id: conv.id.substring(0, 8) })}</span>
                      <span className="text-xs text-[#525b4c] font-light">{conv.date}</span>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1">
                      <span className="text-sm sm:text-base text-[#1a1f16] font-semibold">+{formatMoney(conv.amount)}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(conv.status)}`} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#525b4c]">{statusLabel(conv.status)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Share Tools */}
        <motion.div variants={itemVars} className="flex flex-col bg-white rounded-[24px] p-6 sm:p-7 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
          <h3 className="text-sm font-semibold text-[#1a1f16] border-b border-[#dce0d6]/70 pb-4 mb-6">{t('shareTools')}</h3>

          {/* Referral Link */}
          <div className="flex flex-col gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('yourReferralLink')}</span>
            <div className="bg-[#f0efeb] rounded-xl px-4 py-3.5 text-xs font-mono text-[#1a1f16] break-all border border-[#dce0d6]">
              {referralUrl}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(referralUrl, 'link')}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl h-11 text-[11px] font-semibold uppercase tracking-wider bg-white hover:bg-[#f0efeb] border border-[#dce0d6] text-[#1a1f16] transition-colors shadow-2xs cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-[#3a442e]" /> : <Copy size={14} />}
                {copiedLink ? t('copied') : t('copy')}
              </button>
              <a href={referralUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-white hover:bg-[#f0efeb] border border-[#dce0d6] text-[#1a1f16] transition-colors shadow-2xs shrink-0">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {stats.couponCode && (
            <div className="flex flex-col gap-3 mt-8 pt-8 border-t border-[#dce0d6]/70">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('yourCouponCode')}</span>
              <div className="bg-[#2c3327] p-5 sm:p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden shadow-sm border border-[#3a442e]">
                <div aria-hidden="true" className="absolute -right-4 -top-4 w-32 h-32 bg-[#a5a58d]/20 rounded-full blur-2xl pointer-events-none" />
                <div className="text-lg sm:text-2xl font-mono font-bold text-white text-center relative z-10 tracking-widest py-1.5 break-all px-2">
                  {stats.couponCode}
                </div>
                <button
                  onClick={() => handleCopy(stats.couponCode, 'code')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl h-11 text-[11px] font-semibold uppercase tracking-wider bg-white hover:bg-[#edf0e8] text-[#2c3327] transition-colors shadow-xs relative z-10 cursor-pointer"
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  {copiedCode ? t('copied') : t('copyCode')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
