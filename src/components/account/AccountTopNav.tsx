'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Heart, 
  Settings, 
  LogOut, 
  BarChart, 
  Award
} from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'

const NAV_ITEMS = [
  { key: 'overview', href: '/account', icon: LayoutDashboard, iconColor: 'text-[#525b4c]', activeIconColor: 'text-[#1a1f16]' },
  { key: 'orders', href: '/account/orders', icon: Package, iconColor: 'text-amber-600', activeIconColor: 'text-amber-700' },
  { key: 'addresses', href: '/account/addresses', icon: MapPin, iconColor: 'text-emerald-600', activeIconColor: 'text-emerald-700' },
  { key: 'wishlist', href: '/account/wishlist', icon: Heart, iconColor: 'text-rose-500', activeIconColor: 'text-rose-600' },
  { key: 'settings', href: '/account/settings', icon: Settings, iconColor: 'text-indigo-600', activeIconColor: 'text-indigo-700' },
]

export function AccountTopNav({ 
  userName = 'User', 
  userEmail = '',
  hbPoints = 0,
  affiliateStatus = 'none' 
}: { 
  userName?: string
  userEmail?: string
  hbPoints?: number
  affiliateStatus?: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended'
}) {
  const t = useTranslations('account.sidebar')
  const pathname = usePathname() || ''

  // Scroll detection matching /shop & ClientHeader
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollYRef = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20)
    const difference = latest - lastScrollYRef.current
    if (Math.abs(difference) > 6) {
      if (difference > 0 && latest > 120) {
        if (!isScrollingDown) setIsScrollingDown(true)
      } else if (difference < 0) {
        if (isScrollingDown) setIsScrollingDown(false)
      }
      lastScrollYRef.current = latest
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 20)
    }
  }, [])

  const activeNavItems = [
    ...NAV_ITEMS,
    ...(affiliateStatus === 'approved' ? [{ key: 'affiliateDashboard', href: '/affiliates/dashboard', icon: BarChart, iconColor: 'text-purple-600', activeIconColor: 'text-purple-700' }] : [])
  ]

  return (
    <div 
      className={`sticky z-40 transition-all duration-300 ease-out w-full ${
        isScrollingDown
          ? 'top-2.5 sm:top-4'
          : 'top-[72px] sm:top-[88px] md:top-[98px]'
      }`}
    >
      <div 
        className={`w-full bg-white/95 backdrop-blur-md rounded-2xl border border-[#dce0d6] p-1 sm:p-2 transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 relative overflow-hidden ${
          isScrolled 
            ? 'shadow-[0_12px_32px_rgba(40,49,33,0.08)] border-[#dce0d6]/90' 
            : 'shadow-[0_1px_6px_rgba(40,49,33,0.03)]'
        }`}
      >
        
        {/* Mobile Top Sub-Row: Points Balance & Sign Out (Hidden on Tablet/Desktop) */}
        <div className="flex sm:hidden items-center justify-between px-1.5 py-1 border-b border-[#e6e9e1]">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
            <Award className="w-3 h-3 text-amber-600" />
            <span className="text-[10.5px] font-semibold">
              {Number(hbPoints).toFixed(0)} <span className="text-[9.5px] text-amber-700/80">Pts</span>
            </span>
          </div>

          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-1 text-[10.5px] font-medium text-[#737c6d] hover:text-rose-600 transition-colors px-2 py-0.5 rounded-md hover:bg-rose-50"
          >
            <LogOut size={11} className="text-neutral-400 group-hover:text-rose-600 transition-colors" />
            <span>{t('signOut')}</span>
          </button>
        </div>

        {/* Navigation Tabs: Adaptive 5-grid that fits perfectly even on 320px narrow screens */}
        <nav 
          aria-label="Account navigation"
          className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-0.5 sm:gap-1.5"
        >
          {activeNavItems.map((item) => {
            const isActive = item.href === '/account' 
              ? pathname === '/account' 
              : pathname.startsWith(item.href)
              
            return (
              <Link 
                key={item.key} 
                href={item.href}
                className={`
                  relative flex-1 sm:flex-initial px-0.5 xs:px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 text-center transition-all duration-150 group min-w-0 sm:min-w-fit shrink-0 sm:shrink-0
                  ${isActive 
                    ? 'text-[#1a1f16] bg-[#edf0e8] font-semibold border border-[#a5a58d]/40 shadow-xs' 
                    : 'text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#f0efeb]'
                  }
                `}
              >
                <item.icon 
                  size={14} 
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive 
                      ? `${item.activeIconColor} scale-105` 
                      : `${item.iconColor} opacity-80 group-hover:opacity-100`
                  }`} 
                />
                <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium tracking-tight sm:tracking-normal whitespace-nowrap leading-none block text-center">
                  {t(`nav.${item.key}`)}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="top-nav-active-indicator"
                    className="absolute inset-0 rounded-xl border border-[#a5a58d]/50 pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop & Tablet: Right Dock (Points Chip & Sign Out) */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          {/* Rewards Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[11px] font-semibold tracking-wide">
              {Number(hbPoints).toFixed(0)} <span className="text-[10px] text-amber-700/80">Pts</span>
            </span>
          </div>

          {/* Sign Out Button */}
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-1.5 text-xs font-medium text-[#737c6d] hover:text-rose-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-rose-50 group"
            title={t('signOut')}
          >
            <LogOut size={13} className="text-neutral-400 group-hover:text-rose-600 transition-colors" />
            <span className="hidden sm:inline">{t('signOut')}</span>
          </button>
        </div>

      </div>
    </div>
  )
}
