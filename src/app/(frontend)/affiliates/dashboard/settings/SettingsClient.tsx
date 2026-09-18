'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Settings2, Save, Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { updatePayoutCurrency } from './actions'

interface SettingsClientProps {
  initialCurrency: string;
}

export function SettingsClient({ initialCurrency }: SettingsClientProps) {
  const t = useTranslations('affiliate.dashboardSettings')
  const [currency, setCurrency] = React.useState(initialCurrency || 'USD')
  const [isPending, startTransition] = React.useTransition()

  function handleSave() {
    startTransition(async () => {
      const result = await updatePayoutCurrency(currency)
      if (!result.success) {
        toast.error(result.error || 'Failed to save preferences')
        return
      }
      toast.success('Preferences saved')
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 w-full max-w-2xl font-sans"
    >
      <div className="flex flex-col gap-1 pb-3 border-b border-[#dce0d6]/70">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d]">
          {t('eyebrow', { fallback: 'Partner Settings' })}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-[#525b4c] font-light">{t('subtitle')}</p>
      </div>

      <section className="bg-white rounded-[24px] border border-[#dce0d6] p-6 sm:p-7 shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
        <div className="flex items-center gap-3 pb-4 border-b border-[#dce0d6]/70 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-xs flex items-center justify-center shrink-0">
            <Settings2 size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-[#1a1f16]">{t('payoutMethodTitle')}</h2>
            <p className="text-xs text-[#525b4c] font-light">{t('payoutMethodDesc')}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1a1f16]">{t('preferredCurrencyLabel')}</label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-11 w-full bg-[#f5f6f2]/40 hover:bg-white border border-[#dce0d6] focus:border-[#2c3327] rounded-xl px-3.5 text-sm text-[#1a1f16]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#dce0d6] rounded-xl shadow-lg">
                <SelectItem value="USD" className="text-xs font-medium cursor-pointer">{t('currencyUsd')}</SelectItem>
                <SelectItem value="BTC" className="text-xs font-medium cursor-pointer">{t('currencyBtc')}</SelectItem>
                <SelectItem value="ETH" className="text-xs font-medium cursor-pointer">{t('currencyEth')}</SelectItem>
                <SelectItem value="USDT_ERC20" className="text-xs font-medium cursor-pointer">{t('currencyUsdtErc20')}</SelectItem>
                <SelectItem value="USDT_TRC20" className="text-xs font-medium cursor-pointer">{t('currencyUsdtTrc20')}</SelectItem>
                <SelectItem value="STORE_CREDIT" className="text-xs font-medium cursor-pointer">{t('currencyStoreCredit')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center justify-center gap-2 rounded-xl h-11 px-6 text-xs font-semibold uppercase tracking-wider bg-[#2c3327] hover:bg-[#1a1f16] text-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {t('savePreferencesButton')}
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
