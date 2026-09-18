'use client'

import React, { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { Copy, Check, ExternalLink, Edit2, X, Loader2, Link as LinkIcon, Tag } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { updateCouponCode } from './actions'

interface LinksClientProps {
  referralLink: string;
  couponCode: string;
  customerDiscount: number;
  commissionRate: number;
}

export function LinksClient({ referralLink, couponCode: initialCouponCode, customerDiscount, commissionRate }: LinksClientProps) {
  const t = useTranslations('affiliate.links')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Edit states
  const [couponCode, setCouponCode] = useState(initialCouponCode)
  const [isEditing, setIsEditing] = useState(false)
  const [newCode, setNewCode] = useState(initialCouponCode)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSaveCode = async () => {
    setError(null)
    setIsSaving(true)

    try {
      const result = await updateCouponCode(newCode)

      if (result.success && result.code) {
        setCouponCode(result.code)
        setNewCode(result.code)
        setIsEditing(false)
      } else {
        setError(result.error || t('errorUpdateFailed'))
      }
    } catch (err: any) {
      setError(err.message || t('errorUnexpected'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setNewCode(couponCode)
    setIsEditing(false)
    setError(null)
  }

  // Animation variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
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
      className="flex flex-col gap-8 sm:gap-10 w-full max-w-4xl font-sans"
    >
      <motion.div variants={itemVars} className="pb-2 border-b border-[#dce0d6]/70">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block mb-1">
          {t('eyebrow', { fallback: 'Share Tools' })}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-[#525b4c] mt-1 font-light max-w-xl">{t('subtitle')}</p>
      </motion.div>

      {/* Referral Link Card */}
      <motion.div variants={itemVars} className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)] flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-[#dce0d6]/70 pb-4">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 border border-sky-200/70 flex items-center justify-center shrink-0">
            <LinkIcon size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1a1f16]">{t('referralLinkTitle')}</h3>
            <p className="text-xs text-[#525b4c] mt-0.5">{t('referralLinkDesc')}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1 w-full flex flex-col gap-2">
            <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('yourReferralLink') || 'URL'}</label>
            <div className="bg-[#f0efeb] rounded-xl px-4 py-3.5 text-sm font-mono text-[#1a1f16] break-all border border-[#dce0d6] select-all">
              {referralLink}
            </div>
          </div>
          <div className="flex gap-2 shrink-0 w-full sm:w-auto h-11">
            <button
              onClick={() => handleCopy(referralLink, 'link')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl h-full px-5 text-[11px] font-semibold uppercase tracking-wider bg-white hover:bg-[#f0efeb] border border-[#dce0d6] text-[#1a1f16] transition-colors shadow-2xs cursor-pointer"
            >
              {copiedLink ? <Check size={15} className="text-[#3a442e]" /> : <Copy size={15} />}
              {copiedLink ? t('copied') : t('copy')}
            </button>
            <a href={referralLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-full rounded-xl bg-white hover:bg-[#f0efeb] border border-[#dce0d6] text-[#1a1f16] transition-colors shadow-2xs shrink-0">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Coupon Code Card */}
      <motion.div variants={itemVars} className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)] flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-[#dce0d6]/70 pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#edf0e8] text-[#2c3327] border border-[#a5a58d]/40 flex items-center justify-center shrink-0">
            <Tag size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1a1f16]">{t('couponCodeTitle')}</h3>
            <p className="text-xs text-[#525b4c] mt-0.5">
              {t.rich('couponCodeDesc', {
                discount: customerDiscount,
                commission: commissionRate,
                strong: (chunks) => <strong className="text-[#2c3327] font-semibold">{chunks}</strong>,
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 w-full flex flex-col gap-2"
              >
                <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('yourCouponCode') || 'CODE'}</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    placeholder={t('codePlaceholder')}
                    maxLength={20}
                    className="w-full bg-white border border-[#a5a58d] rounded-xl px-4 py-3.5 text-lg font-mono font-bold text-[#2c3327] focus:outline-none focus:border-[#2c3327] transition-colors"
                    autoFocus
                  />
                  {error && <span className="text-xs font-medium text-rose-600">{error}</span>}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 w-full flex flex-col gap-2"
              >
                <label className="text-[10.5px] font-semibold uppercase tracking-wider text-[#525b4c]">{t('yourCouponCode') || 'CODE'}</label>
                <div className="w-full bg-[#f0efeb] rounded-xl px-4 py-3.5 text-lg font-mono font-bold text-[#1a1f16] border border-[#dce0d6] flex items-center justify-between gap-3">
                  <span className="break-all min-w-0">{couponCode}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-[#a5a58d] hover:text-[#1a1f16] transition-colors cursor-pointer shrink-0"
                    title={t('editCodeTitle')}
                  >
                    <Edit2 size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-actions"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="flex gap-2 shrink-0 w-full sm:w-auto h-11"
              >
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none flex items-center justify-center rounded-xl h-full px-5 text-[11px] font-semibold uppercase tracking-wider bg-white text-[#525b4c] border border-[#dce0d6] hover:bg-[#f0efeb] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <X size={15} />
                </button>
                <button
                  onClick={handleSaveCode}
                  disabled={isSaving}
                  className="flex-1 sm:w-32 flex items-center justify-center gap-2 rounded-xl h-full px-5 text-[11px] font-semibold uppercase tracking-wider bg-[#2c3327] hover:bg-[#1a1f16] text-white transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  {isSaving ? t('saving') : t('save')}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="copy-action"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="shrink-0 w-full sm:w-auto h-11"
              >
                <button
                  onClick={() => handleCopy(couponCode, 'code')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl h-full px-6 text-[11px] font-semibold uppercase tracking-wider bg-[#2c3327] hover:bg-[#1a1f16] text-white transition-colors shadow-xs cursor-pointer"
                >
                  {copiedCode ? <Check size={15} /> : <Copy size={15} />}
                  {copiedCode ? t('copied') : t('copyCode')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </motion.div>
  )
}
