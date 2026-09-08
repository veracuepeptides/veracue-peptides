'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

export interface HeroButtonProps {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  text?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  target?: string
  rel?: string
  ariaLabel?: string
  arrowSize?: number
  badgeClassName?: string
}

/**
 * Signature Hero Button Component
 * Replicates the exact pill button used in the Hero section:
 * - Rounded capsule pill with deep charcoal `#20221c` base and terracotta `#cb997e` hover
 * - Diagonal specular sheen reflection glide across the face
 * - Subtle forward text translation
 * - High-contrast circular white badge with dual-arrow slide animation
 */
export function HeroButton({
  href,
  onClick,
  children,
  text,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
  arrowSize = 14,
  badgeClassName = '',
}: HeroButtonProps) {
  const label = children || text

  const innerContent = (
    <>
      {/* Specular Light Sheen Reflection across button */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Label Text with Subtle Forward Glide */}
      <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium">
        {label}
      </span>

      {/* Circular Arrow Badge with Dual-Arrow Slide Effect */}
      <span className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white text-black flex items-center justify-center relative overflow-hidden shrink-0 shadow-xs ${badgeClassName}`}>
        {/* Arrow 1: Slides out to the right on hover */}
        <ArrowRight 
          size={arrowSize} 
          strokeWidth={2.5} 
          className="transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0" 
        />
        
        {/* Arrow 2: Slides in from the left on hover */}
        <ArrowRight 
          size={arrowSize} 
          strokeWidth={2.5} 
          className="absolute -translate-x-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" 
        />
      </span>
    </>
  )

  const baseClasses = `relative group inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] pl-5 sm:pl-7 pr-1.5 sm:pr-2 py-1.5 sm:py-2.5 rounded-full font-semibold text-[13px] sm:text-[14px] border border-neutral-800/80 hover:border-[#cb997e] transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden ${className}`

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        className={baseClasses}
      >
        {innerContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseClasses} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {innerContent}
    </button>
  )
}
