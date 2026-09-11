'use client'

import React, { useState, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getBadgeStatus, type BadgeOrderStatus } from '@/lib/orders/statusLabel'
import { HeroButton } from '@/components/ui/hero-button'

export interface OrderItem {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

export interface AccountOrdersProps {
  orders: OrderItem[];
}

export function OrdersClient({ orders }: AccountOrdersProps) {
  const t = useTranslations('account.orders')
  const [filter, setFilter] = useState<'all' | 'processing' | 'delivered' | 'returned'>('all')

  const STATUS_LABELS: Record<BadgeOrderStatus, string> = {
    Placed: t('statusPlaced'),
    Processing: t('statusProcessing'),
    Shipped: t('statusShipped'),
    Delivered: t('statusDelivered'),
    Cancelled: t('statusCancelled'),
  }

  const STATUS_CONFIG: Record<BadgeOrderStatus, { 
    bg: string; 
    text: string; 
    border: string; 
    icon: React.ComponentType<{ className?: string; size?: number }> 
  }> = {
    Delivered: {
      bg: 'bg-[#edf0e8]',
      text: 'text-[#2c3327]',
      border: 'border-[#a5a58d]/40',
      icon: CheckCircle2,
    },
    Shipped: {
      bg: 'bg-[#3a442e]/10',
      text: 'text-[#3a442e]',
      border: 'border-[#3a442e]/30',
      icon: Truck,
    },
    Processing: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-800',
      border: 'border-amber-300/60',
      icon: Clock,
    },
    Placed: {
      bg: 'bg-[#f4f4f0]',
      text: 'text-[#525b4c]',
      border: 'border-[#dce0d6]',
      icon: Package,
    },
    Cancelled: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: XCircle,
    },
  }

  // Filter counts
  const counts = useMemo(() => {
    let all = orders.length
    let processing = 0
    let delivered = 0
    let returned = 0

    for (const o of orders) {
      const mapped = getBadgeStatus(o.status)
      if (mapped === 'Processing' || mapped === 'Placed') processing++
      else if (mapped === 'Delivered') delivered++
      else if (mapped === 'Cancelled') returned++
    }

    return { all, processing, delivered, returned }
  }, [orders])

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true
    const mapped = getBadgeStatus(o.status)
    if (filter === 'returned') return mapped === 'Cancelled'
    if (filter === 'processing') return mapped === 'Processing' || mapped === 'Placed'
    return mapped.toLowerCase() === filter
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 w-full font-sans"
    >
      
      {/* 1. Header Banner & Filter Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-3 border-b border-[#dce0d6]/70">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d]">
            Order Archive
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-[#525b4c] font-light">
            {t('subtitle')}
          </p>
        </div>

        {/* Segmented Filter Pills */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <div className="inline-flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#dce0d6] shadow-xs min-w-max">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`shrink-0 px-3 xs:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#2c3327] text-white shadow-xs'
                  : 'text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8]/60'
              }`}
            >
              <span>{t('filterAll')}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                filter === 'all' ? 'bg-white/20 text-white' : 'bg-[#edf0e8] text-[#525b4c]'
              }`}>
                {counts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('processing')}
              className={`shrink-0 px-3 xs:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                filter === 'processing'
                  ? 'bg-[#2c3327] text-white shadow-xs'
                  : 'text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8]/60'
              }`}
            >
              <span>{t('filterProcessing')}</span>
              {counts.processing > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  filter === 'processing' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {counts.processing}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFilter('delivered')}
              className={`shrink-0 px-3 xs:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                filter === 'delivered'
                  ? 'bg-[#2c3327] text-white shadow-xs'
                  : 'text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8]/60'
              }`}
            >
              <span>{t('filterDelivered')}</span>
              {counts.delivered > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  filter === 'delivered' ? 'bg-white/20 text-white' : 'bg-[#edf0e8] text-[#2c3327]'
                }`}>
                  {counts.delivered}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFilter('returned')}
              className={`shrink-0 px-3 xs:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                filter === 'returned'
                  ? 'bg-[#2c3327] text-white shadow-xs'
                  : 'text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8]/60'
              }`}
            >
              <span>{t('filterReturned')}</span>
              {counts.returned > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  filter === 'returned' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                }`}>
                  {counts.returned}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Orders Content */}
      <AnimatePresence mode="wait">
        {filteredOrders.length > 0 ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {filteredOrders.map((order) => {
              const mappedStatus = getBadgeStatus(order.status)
              const config = STATUS_CONFIG[mappedStatus] || STATUS_CONFIG['Placed']
              const StatusIcon = config.icon

              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-[22px] border border-[#dce0d6] p-5 sm:p-6 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-[#a5a58d]/70 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  {/* Left: Order Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 shadow-xs flex items-center justify-center shrink-0">
                      <Package size={20} />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Link 
                          href={`/account/orders/${order.id}`}
                          className="font-semibold text-base sm:text-lg text-[#1a1f16] hover:text-[#3a442e] transition-colors"
                        >
                          Order #{order.id}
                        </Link>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${config.bg} ${config.text} ${config.border} border`}>
                          <StatusIcon size={11} />
                          {STATUS_LABELS[mappedStatus] || mappedStatus}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#525b4c] font-light">
                        <span>Placed on {order.date}</span>
                        <span>•</span>
                        <span>{order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-[#dce0d6]/60">
                    <div className="flex flex-col md:text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#a5a58d]">
                        Total Amount
                      </span>
                      <span className="text-lg sm:text-xl font-semibold text-[#1a1f16]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>

                    <HeroButton 
                      href={`/account/orders/${order.id}`}
                      size="sm"
                    >
                      {t('viewDetails')}
                    </HeroButton>
                  </div>
                </div>
              )
            })}

            {/* Showing status counter */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between border-t border-[#dce0d6]/70 pt-5 gap-3 text-xs text-[#525b4c] font-light">
              <span>
                {t.rich('showingResults', {
                  bold: (chunks) => <span className="font-semibold text-[#1a1f16]">{chunks}</span>,
                  from: 1,
                  to: filteredOrders.length,
                  total: filteredOrders.length,
                })}
              </span>

              <div className="flex items-center gap-2">
                <button 
                  disabled 
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-[#a5a58d] border border-[#dce0d6] cursor-not-allowed opacity-50"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  disabled 
                  aria-label="Next page"
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-white text-[#a5a58d] border border-[#dce0d6] cursor-not-allowed opacity-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-white rounded-[24px] border border-[#dce0d6] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-[0_1px_6px_rgba(40,49,33,0.02)] my-4 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/70 shadow-xs flex items-center justify-center mb-4">
              <Package size={28} strokeWidth={1.75} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1f16] tracking-tight mb-2">
              {t('emptyTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#525b4c] font-light max-w-sm mb-6 leading-relaxed">
              {t('emptyDescription')}
            </p>
            <HeroButton href="/shop" size="sm">
              {t('startShopping')}
            </HeroButton>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
