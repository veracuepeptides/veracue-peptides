'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ArrowDown } from 'lucide-react'

export interface HeroButtonProps {
  href?: string
  onClick?: (e: React.MouseEvent<any>) => void
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
  direction?: 'right' | 'down'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

/**
 * Signature Global Hero Button Component
 * Replicates the exact pill button used in the Homepage Hero section:
 * - Rounded capsule pill with deep charcoal `#20221c` base and terracotta `#cb997e` hover
 * - Diagonal specular sheen reflection glide across the face
 * - Subtle forward text translation
 * - High-contrast circular white badge with dual-arrow slide animation (horizontal or vertical)
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
  direction = 'right',
  size = 'md',
  icon,
}: HeroButtonProps) {
  const label = children || text

  const sizeClasses = {
    sm: 'pl-4 sm:pl-5 pr-1.5 py-1.5 text-xs sm:text-[13px]',
    md: 'pl-5 sm:pl-7 pr-1.5 sm:pr-2 py-1.5 sm:py-2.5 text-[13px] sm:text-[15px]',
    lg: 'pl-6 sm:pl-8 pr-2 py-2.5 sm:py-3 text-[14px] sm:text-[16px]',
  }[size]

  const badgeSizeClasses = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 sm:w-8 h-7 sm:h-8',
    lg: 'w-8 sm:w-9 h-8 sm:h-9',
  }[size]

  const renderArrowAnimation = () => {
    if (icon) {
      return icon
    }

    if (direction === 'down') {
      return (
        <>
          {/* Arrow 1: Slides down and fades out */}
          <ArrowDown
            size={arrowSize}
            strokeWidth={2.5}
            className="transition-all duration-300 ease-out group-hover:translate-y-6 group-hover:opacity-0"
          />
          {/* Arrow 2: Slides in from top */}
          <ArrowDown
            size={arrowSize}
            strokeWidth={2.5}
            className="absolute -translate-y-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          />
        </>
      )
    }

    return (
      <>
        {/* Arrow 1: Slides right and fades out */}
        <ArrowRight
          size={arrowSize}
          strokeWidth={2.5}
          className="transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0"
        />
        {/* Arrow 2: Slides in from left */}
        <ArrowRight
          size={arrowSize}
          strokeWidth={2.5}
          className="absolute -translate-x-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
        />
      </>
    )
  }

  const innerContent = (
    <>
      {/* Specular Light Sheen Reflection across button */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Label Text with Subtle Forward Glide */}
      <span className="tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 select-none font-heading font-medium inline-flex items-center gap-1.5 whitespace-nowrap">
        {label}
      </span>

      {/* Circular Arrow Badge with Dual-Arrow Slide Effect */}
      <span
        className={`${badgeSizeClasses} rounded-full bg-white text-black flex items-center justify-center relative overflow-hidden shrink-0 shadow-xs ${badgeClassName}`}
      >
        {renderArrowAnimation()}
      </span>
    </>
  )

  const baseClasses = `relative group inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] ${sizeClasses} rounded-full font-semibold border border-neutral-800/80 hover:border-[#cb997e] transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer overflow-hidden whitespace-nowrap ${className}`

  if (href) {
    // If it's an anchor or external link, use native <a> to preserve smooth scroll without i18n routing
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={onClick}
          className={baseClasses}
        >
          {innerContent}
        </a>
      )
    }

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
