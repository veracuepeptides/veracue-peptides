'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { 
  ArrowRight, 
  Package, 
  Heart, 
  Calendar, 
  MapPin, 
  Award,
  Clock, 
  Truck, 
  CheckCircle2, 
  XCircle,
  FileText, 
  Settings, 
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getBadgeStatus, type BadgeOrderStatus } from '@/lib/orders/statusLabel'
import { HeroButton } from '@/components/ui/hero-button'

export interface AccountOverviewProps {
  stats: {
    ordersPlaced: number
    wishlistCount: number
    hbPoints: number
    memberSince: string
  }
  recentOrders: {
    id: string
    orderNumber: string
    date: string
    status: string
    total: number
    itemCount?: number
  }[]
  defaultAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  } | null
  affiliateStatus?: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended'
  userName?: string
  userEmail?: string
  spending?: {
    year: number
    totalSpent: number
    categories: { label: string; color: string; value: number; pct: number }[]
  }
}

export function AccountOverviewClient({ 
  stats, 
  recentOrders, 
  defaultAddress, 
  affiliateStatus = 'none', 
  userName = 'User', 
  userEmail = '',
  spending 
}: AccountOverviewProps) {
  const t = useTranslations('account.overview')

  const STATUS_CONFIG: Record<BadgeOrderStatus, { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string; size?: number }> }> = {
    Delivered: {
      label: t('statusDelivered') || 'Delivered',
      bg: 'bg-[#edf0e8]',
      text: 'text-[#2c3327]',
      border: 'border-[#a5a58d]/40',
      icon: CheckCircle2,
    },
    Shipped: {
      label: t('statusShipped') || 'Shipped',
      bg: 'bg-[#3a442e]/10',
      text: 'text-[#3a442e]',
      border: 'border-[#3a442e]/30',
      icon: Truck,
    },
    Processing: {
      label: t('statusProcessing') || 'Processing',
      bg: 'bg-amber-500/10',
      text: 'text-amber-800',
      border: 'border-amber-300/60',
      icon: Clock,
    },
    Placed: {
      label: t('statusPlaced') || 'Placed',
      bg: 'bg-[#f4f4f0]',
      text: 'text-[#525b4c]',
      border: 'border-[#dce0d6]',
      icon: Package,
    },
    Cancelled: {
      label: 'Cancelled',
      bg: 'bg-rose-500/10',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: XCircle,
    },
  }

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
      
      {/* 1. Account Header Banner */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#dce0d6]/70">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block mb-1">
            Account Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
            Welcome back, {userName}
          </h1>
          <p className="text-sm text-[#525b4c] mt-1 font-light">
            Manage your orders, saved addresses, and rewards balance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#525b4c]">
          <Calendar size={13} className="text-[#a5a58d]" />
          <span>Member since {stats.memberSince || '2024'}</span>
        </div>
      </motion.div>

      {/* 2. Top Bento Grid: Olive Rewards Spotlight + Quick Account Overview */}
      <motion.div variants={itemVars} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Left: Deep Forest Olive Rewards Spotlight (5 Cols) */}
        <div className="lg:col-span-5 bg-[#2c3327] text-white rounded-[24px] p-6 sm:p-7 border border-[#3a442e] shadow-sm flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle olive ambient illumination */}
          <div 
            aria-hidden="true" 
            className="absolute -top-16 -right-16 w-48 h-48 bg-[#a5a58d]/20 rounded-full blur-2xl pointer-events-none" 
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                <Award size={13} className="text-amber-400" />
                Veracue Rewards
              </span>
              <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                1 pt = $1.00 USD
              </span>
            </div>

            <div className="mt-2">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                {Number(stats.hbPoints).toFixed(2)}{' '}
                <span className="text-base font-normal text-white/70">Points</span>
              </div>
              <p className="text-white/80 text-xs sm:text-[13px] mt-2 leading-relaxed font-light">
                Points are earned automatically on every purchase and can be applied as a direct cash discount at checkout.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/70">
              Value: <strong className="text-white font-medium">${stats.hbPoints.toFixed(2)}</strong>
            </span>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#edf0e8] bg-white/15 hover:bg-white/20 px-3.5 py-2 rounded-xl transition-colors"
            >
              <span>Shop Catalog</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right: Account Snapshot Tiles (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Tile 1: Orders Placed */}
          <Link 
            href="/account/orders"
            className="bg-white hover:bg-[#fafaf8] rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] transition-all duration-200 flex flex-col justify-between group shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-amber-400/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
                <Package size={18} />
              </div>
              <ChevronRight size={15} className="text-[#a5a58d] group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525b4c] block mb-1">
                Orders Placed
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-[#1a1f16]">
                {stats.ordersPlaced}
              </div>
              <span className="text-xs text-amber-800 font-medium mt-1 block group-hover:underline">
                View history →
              </span>
            </div>
          </Link>

          {/* Tile 2: Saved Wishlist */}
          <Link 
            href="/account/wishlist"
            className="bg-white hover:bg-[#fafaf8] rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] transition-all duration-200 flex flex-col justify-between group shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-rose-400/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/70 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
                <Heart size={18} className="fill-rose-500/20" />
              </div>
              <ChevronRight size={15} className="text-[#a5a58d] group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525b4c] block mb-1">
                Saved Wishlist
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-[#1a1f16]">
                {stats.wishlistCount}
              </div>
              <span className="text-xs text-rose-700 font-medium mt-1 block group-hover:underline">
                View wishlist →
              </span>
            </div>
          </Link>

          {/* Tile 3: Default Shipping Destination */}
          <Link 
            href="/account/addresses"
            className="bg-white hover:bg-[#fafaf8] rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] transition-all duration-200 flex flex-col justify-between group shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-emerald-400/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
                <MapPin size={18} />
              </div>
              <ChevronRight size={15} className="text-[#a5a58d] group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525b4c] block mb-1">
                Primary Destination
              </span>
              <div className="text-base sm:text-lg font-semibold text-[#1a1f16] truncate">
                {defaultAddress ? `${defaultAddress.city}, ${defaultAddress.state}` : 'None saved'}
              </div>
              <span className="text-xs text-emerald-800 font-medium mt-1 block group-hover:underline">
                Manage addresses →
              </span>
            </div>
          </Link>

        </div>

      </motion.div>

      {/* 3. Main Split Grid: Recent Orders (8 cols) + Account Tools (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column (8 cols): Recent Orders Ledger */}
        <motion.div variants={itemVars} className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#1a1f16]">
                Recent Orders
              </h2>
              {recentOrders.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#edf0e8] text-[10px] font-bold text-[#2c3327]">
                  {recentOrders.length}
                </span>
              )}
            </div>

            <Link 
              href="/account/orders" 
              className="text-xs font-semibold text-[#2c3327] hover:text-[#3a442e] transition-colors inline-flex items-center gap-1 group py-1"
            >
              <span>View all orders</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const badgeStatus = getBadgeStatus(order.status)
                const config = STATUS_CONFIG[badgeStatus] || STATUS_CONFIG.Placed
                const StatusIcon = config.icon

                return (
                  <Link 
                    href={`/account/orders/${order.id}`} 
                    key={order.id} 
                    className="bg-white hover:bg-[#fafaf8] rounded-[20px] p-5 sm:p-6 border border-[#dce0d6] transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-[#a5a58d]/60"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/70 shadow-xs">
                        <Package size={17} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-base font-semibold text-[#1a1f16] group-hover:text-amber-800 transition-colors">
                            Order #{order.orderNumber}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
                            <StatusIcon size={11} />
                            {config.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#525b4c] mt-1">
                          <span>{order.date}</span>
                          {order.itemCount !== undefined && order.itemCount > 0 && (
                            <>
                              <span>•</span>
                              <span>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#dce0d6]/60">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#525b4c] block">Total</span>
                        <span className="text-base font-semibold text-[#1a1f16]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-[#edf0e8] text-[#2c3327] flex items-center justify-center transition-transform group-hover:translate-x-0.5 shrink-0">
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              /* Clean Minimalist Empty State */
              <div className="py-12 px-6 flex flex-col items-center justify-center text-center bg-white rounded-[22px] border border-[#dce0d6] shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/70 flex items-center justify-center mb-3 shadow-xs">
                  <Package size={24} />
                </div>
                <h3 className="text-base font-semibold text-[#1a1f16]">
                  No orders placed yet
                </h3>
                <p className="text-xs sm:text-sm text-[#525b4c] mt-1 max-w-sm leading-relaxed">
                  When you make a purchase, shipment tracking numbers, batch receipts, and invoice records will appear here.
                </p>
                <div className="mt-5">
                  <Link 
                    href="/shop"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2c3327] hover:bg-[#3a442e] text-white text-xs font-semibold tracking-wide transition-colors"
                  >
                    <span>Browse Store Catalog</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column (4 cols): Shipping Details & Quick Links */}
        <motion.div variants={itemVars} className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Primary Shipping Address Card */}
          <div className="bg-white rounded-[24px] p-6 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#dce0d6]/70 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center shrink-0">
                  <MapPin size={14} />
                </div>
                <h3 className="text-sm font-semibold text-[#1a1f16]">
                  Default Address
                </h3>
              </div>
              <Link 
                href="/account/addresses" 
                className="text-xs font-semibold text-emerald-800 hover:underline"
              >
                {defaultAddress ? 'Manage' : 'Add'}
              </Link>
            </div>
            
            {defaultAddress ? (
              <div className="text-xs text-[#525b4c] leading-relaxed flex flex-col gap-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[#1a1f16]">
                    {defaultAddress.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#2c3327] text-white text-[10px] font-bold uppercase tracking-wider">
                    Default
                  </span>
                </div>
                <span>{defaultAddress.street}</span>
                <span>{defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}</span>
                <span className="text-[#a5a58d] mt-1">{defaultAddress.country}</span>
              </div>
            ) : (
              <div className="text-xs text-[#525b4c] py-2">
                <p>No default shipping address saved yet.</p>
                <Link 
                  href="/account/addresses"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 mt-2 hover:underline"
                >
                  + Add shipping address
                </Link>
              </div>
            )}
          </div>

          {/* Quick Account Links */}
          <div className="bg-white rounded-[24px] p-6 border border-[#dce0d6] shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <h3 className="text-sm font-semibold text-[#1a1f16] pb-3 border-b border-[#dce0d6]/70 mb-3">
              Account Shortcuts
            </h3>

            <div className="flex flex-col divide-y divide-[#dce0d6]/50">
              <Link 
                href="/certificates" 
                className="py-2.5 flex items-center justify-between text-xs text-[#525b4c] hover:text-[#1a1f16] group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 border border-sky-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText size={13} />
                  </div>
                  <span className="font-medium">Batch COA Lookup</span>
                </div>
                <ChevronRight size={13} className="text-[#a5a58d] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link 
                href="/account/wishlist" 
                className="py-2.5 flex items-center justify-between text-xs text-[#525b4c] hover:text-[#1a1f16] group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Heart size={13} className="fill-rose-500/20" />
                  </div>
                  <span className="font-medium">My Wishlist ({stats.wishlistCount})</span>
                </div>
                <ChevronRight size={13} className="text-[#a5a58d] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link 
                href="/account/settings" 
                className="py-2.5 flex items-center justify-between text-xs text-[#525b4c] hover:text-[#1a1f16] group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Settings size={13} />
                  </div>
                  <span className="font-medium">Security & Password</span>
                </div>
                <ChevronRight size={13} className="text-[#a5a58d] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link 
                href="/contact-us" 
                className="py-2.5 flex items-center justify-between text-xs text-[#525b4c] hover:text-[#1a1f16] group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <HelpCircle size={13} />
                  </div>
                  <span className="font-medium">Contact Support</span>
                </div>
                <ChevronRight size={13} className="text-[#a5a58d] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </motion.div>

      </div>
      
    </motion.div>
  )
}
