'use client'

import React, { useEffect } from 'react'
import { usePathname } from '@/i18n/navigation'
import { useCartStore } from '@/lib/cart/store'

const HIDDEN_HEADER_PREFIXES: string[] = []

export function LayoutClientWrapper({
  children,
  header,
  footer
}: {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}) {
  const setCoupon = useCartStore(state => state.setCoupon)
  const couponCode = useCartStore(state => state.couponCode)
  const pathname = usePathname() || ''
  const hideHeader = HIDDEN_HEADER_PREFIXES.some(prefix => pathname.startsWith(prefix))

  useEffect(() => {
    // Check if we have an auto_coupon cookie
    const match = document.cookie.match(new RegExp('(^| )affiliate_auto_coupon=([^;]+)'))
    if (match) {
      const code = decodeURIComponent(match[2])
      if (code && !couponCode) {
        setCoupon(code)
      }
      // Delete the cookie so it doesn't run again or prevent user from removing the coupon
      document.cookie = 'affiliate_auto_coupon=; Max-Age=0; path=/;'
    }
  }, [setCoupon, couponCode])

  return (
    <div className="flex min-h-screen flex-col relative z-0 isolate">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[10000] focus:rounded-full focus:bg-[#fff1e6] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#20221c] focus:outline-none focus:ring-2 focus:ring-[#a5a58d] focus:ring-offset-2 focus:ring-offset-[#f0efeb]"
      >
        Skip to main content
      </a>
      {!hideHeader && header}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col relative outline-none">
        {children}
      </main>
      <div className="relative z-40 isolate">
        {footer}
      </div>
    </div>
  )
}
