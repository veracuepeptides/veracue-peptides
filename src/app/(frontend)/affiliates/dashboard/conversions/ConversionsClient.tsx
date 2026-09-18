'use client'

import React, { useState, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { Target } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ConversionsClientProps {
  conversions: {
    id: string;
    date: string;
    orderValue: number; // in dollars
    commissionAmount: number; // in dollars
    status: string;
  }[];
}

export function ConversionsClient({ conversions }: ConversionsClientProps) {
  const t = useTranslations('affiliate.conversions')
  const formatMoney = (dollars: number) => `$${dollars.toFixed(2)}`

  const statusLabel = (status: string) => {
    if (status === 'pending') return t('statusPending')
    if (status === 'approved') return t('statusApproved')
    if (status === 'paid') return t('statusPaid')
    if (status === 'rejected') return t('statusRejected')
    return status
  }

  const statusDotColor = (status: string) => {
    if (status === 'pending') return 'bg-amber-400'
    if (status === 'approved') return 'bg-sky-500'
    if (status === 'paid') return 'bg-[#3a442e]'
    return 'bg-rose-500'
  }

  // Animation variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  }

  // Pagination and sorting
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // Sort from newest to oldest just to be absolutely sure
  const sortedConversions = useMemo(() => {
    return [...conversions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [conversions])

  const paginatedConversions = useMemo(() => {
    return sortedConversions.slice(0, page * itemsPerPage)
  }, [sortedConversions, page])

  const hasMore = paginatedConversions.length < sortedConversions.length

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 sm:gap-10 w-full font-sans"
    >
      <motion.div variants={itemVars} className="pb-2 border-b border-[#dce0d6]/70">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block mb-1">
          {t('eyebrow', { fallback: 'Commission Ledger' })}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-[#525b4c] mt-1 font-light max-w-xl">{t('subtitle')}</p>
      </motion.div>

      {conversions.length === 0 ? (
        <motion.div variants={itemVars} className="w-full bg-white rounded-[24px] border border-[#dce0d6] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-[0_1px_6px_rgba(40,49,33,0.02)] my-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f0efeb] text-[#a5a58d] border border-[#dce0d6] flex items-center justify-center mb-4 shadow-xs">
            <Target size={28} strokeWidth={1.75} />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1f16] tracking-tight mb-2">{t('emptyTitle')}</h2>
          <p className="text-xs sm:text-sm text-[#525b4c] font-light max-w-sm">{t('emptyDesc')}</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5">
          {paginatedConversions.map((conv) => (
            <motion.div
              key={conv.id}
              variants={itemVars}
              className="bg-white rounded-[22px] border border-[#dce0d6] p-5 sm:p-6 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-[#a5a58d]/70 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#edf0e8] text-[#2c3327] border border-[#a5a58d]/40 shadow-xs flex items-center justify-center shrink-0">
                  <Target size={18} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm sm:text-base text-[#1a1f16]">
                    {t('orderIdLabel')} #{conv.id.substring(0, 8)}
                  </span>
                  <span className="text-xs text-[#525b4c] font-light">{conv.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#dce0d6]/60">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a5a58d]">{t('orderValueLabel')}</span>
                  <span className="text-sm sm:text-base font-semibold text-[#1a1f16]">{formatMoney(conv.orderValue)}</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#a5a58d]">{t('commissionLabel')}</span>
                  <span className="text-base sm:text-lg font-semibold text-[#3a442e]">+{formatMoney(conv.commissionAmount)}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(conv.status)}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#525b4c]">{statusLabel(conv.status)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {hasMore && (
        <motion.div variants={itemVars} className="flex justify-center mt-2">
          <button
            onClick={() => setPage(p => p + 1)}
            className="bg-[#2c3327] hover:bg-[#1a1f16] text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            {t('loadMore', { fallback: 'Load More' })}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
