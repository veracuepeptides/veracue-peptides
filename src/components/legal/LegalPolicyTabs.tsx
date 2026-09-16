'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ShieldAlert, FileText, Truck, RotateCcw, Lock } from 'lucide-react'

export type LegalSlug =
  | 'medical-disclaimer'
  | 'terms-and-conditions'
  | 'shipping-policy'
  | 'refund-policy'
  | 'privacy-policy'

interface LegalPolicyTabsProps {
  currentSlug: LegalSlug
}

const LEGAL_POLICIES: {
  slug: LegalSlug
  href: string
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string; size?: number }>
}[] = [
  {
    slug: 'medical-disclaimer',
    href: '/medical-disclaimer',
    label: 'Medical Disclaimer',
    shortLabel: 'Medical Disclaimer',
    icon: ShieldAlert,
  },
  {
    slug: 'terms-and-conditions',
    href: '/terms-and-conditions',
    label: 'Terms & Conditions',
    shortLabel: 'Terms',
    icon: FileText,
  },
  {
    slug: 'shipping-policy',
    href: '/shipping-policy',
    label: 'Shipping Policy',
    shortLabel: 'Shipping',
    icon: Truck,
  },
  {
    slug: 'refund-policy',
    href: '/refund-policy',
    label: 'Refund Policy',
    shortLabel: 'Refunds',
    icon: RotateCcw,
  },
  {
    slug: 'privacy-policy',
    href: '/privacy-policy',
    label: 'Privacy Policy',
    shortLabel: 'Privacy',
    icon: Lock,
  },
]

export function LegalPolicyTabs({ currentSlug }: LegalPolicyTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const activeTab = container.querySelector('[data-active="true"]') as HTMLElement | null
    if (activeTab) {
      const scrollLeft =
        activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [currentSlug])

  return (
    <div className="w-full max-w-full overflow-hidden mb-6 sm:mb-10">
      <div className="relative max-w-4xl w-full mx-auto overflow-hidden">
        {/* Horizontal scroll container with header-matching olive accents */}
        <div
          ref={containerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1.5 px-1.5 bg-white/90 backdrop-blur-xl rounded-full border border-[#a5a58d]/35 shadow-[0_4px_24px_rgba(40,49,33,0.06)]"
        >
          {LEGAL_POLICIES.map((policy) => {
            const isActive = policy.slug === currentSlug
            const Icon = policy.icon

            return (
              <Link
                key={policy.slug}
                href={policy.href}
                data-active={isActive ? 'true' : 'false'}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#a5a58d] text-white shadow-sm border border-[#a5a58d]'
                    : 'text-[#282e22] hover:text-[#1a1c15] hover:bg-[#a5a58d]/15 border border-transparent'
                }`}
              >
                <Icon
                  size={14}
                  className={isActive ? 'text-white' : 'text-[#a5a58d]'}
                />
                <span className="hidden sm:inline">{policy.label}</span>
                <span className="inline sm:hidden">{policy.shortLabel}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
