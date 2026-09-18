import React from 'react'
import { cn } from '@/lib/utils'

// Base Skeleton Primitive — light olive green / sage palette (#a5a58d, #b7b7a4)
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('skeleton rounded-lg animate-pulse bg-[#a5a58d]/15', className)}
      {...props}
    />
  )
}

// 1. ProductCard Skeleton — light olive green / sage shades
export function ProductCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[34px] p-2.5 sm:p-3.5 pb-4 sm:pb-5 border border-[#a5a58d]/25 flex flex-col relative select-none shadow-[0_4px_20px_rgba(165,165,141,0.06)] min-h-[390px] sm:min-h-[420px]">
      
      {/* Inner Image Canvas */}
      <div className="relative w-full aspect-[1/1.08] rounded-[20px] sm:rounded-[24px] bg-[#a5a58d]/10 overflow-hidden animate-pulse">
        
        {/* Floating Discount Badge Placeholder */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20">
          <div className="h-5 w-14 rounded-full bg-[#a5a58d]/20 border border-[#a5a58d]/30" />
        </div>

        {/* Floating Wishlist Heart Placeholder */}
        <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20">
          <div className="w-8 h-8 rounded-full bg-white/90 border border-[#a5a58d]/30" />
        </div>

        {/* Signature Scooped Corner Dock (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 z-20 bg-white pt-2.5 pl-2.5 sm:pt-3 sm:pl-3 rounded-tl-[18px] sm:rounded-tl-[22px]">
          {/* Concave fillet above dock */}
          <svg
            className="absolute -top-[19.5px] right-0 w-5 h-5 text-white pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M 20 0 C 20 11.046 11.046 20 0 20 L 20 20 Z" />
          </svg>

          {/* Concave fillet to the left of dock */}
          <svg
            className="absolute bottom-0 -left-[19.5px] w-5 h-5 text-white pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M 20 0 C 20 11.046 11.046 20 0 20 L 20 20 Z" />
          </svg>

          {/* Cart action button placeholder - light olive green */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#a5a58d]/30 flex items-center justify-center shadow-xs" />
        </div>
      </div>

      {/* Text Content Skeleton */}
      <div className="pt-3.5 px-1 sm:px-1.5 flex flex-col flex-1 gap-1.5">
        {/* Category Pill */}
        <div className="h-3 w-24 bg-[#a5a58d]/25 rounded-full mb-1 animate-pulse" />

        {/* Product Title */}
        <div className="h-5 sm:h-6 w-4/5 bg-[#a5a58d]/20 rounded-md mb-1 animate-pulse" />

        {/* Short Description */}
        <div className="space-y-1 mb-2">
          <div className="h-2.5 w-full bg-[#a5a58d]/10 rounded-sm animate-pulse" />
          <div className="h-2.5 w-3/4 bg-[#a5a58d]/10 rounded-sm animate-pulse" />
        </div>

        {/* Bottom Row: Price */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="h-6 sm:h-7 w-20 bg-[#a5a58d]/30 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// 2. BlogPostCard Skeleton — light olive green / sage shades
export function BlogPostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[22px] p-3 sm:p-4 border border-[#a5a58d]/25 flex flex-col h-full shadow-[0_4px_20px_rgba(165,165,141,0.06)] select-none">
      {/* Visual Thumbnail */}
      <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-[18px] overflow-hidden mb-4 sm:mb-5 bg-[#a5a58d]/10 border border-[#a5a58d]/20 animate-pulse">
        {/* Floating Category Tag */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
          <div className="h-4 w-16 rounded-full bg-white/90 border border-[#a5a58d]/30" />
        </div>

        {/* Read Time Pill */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10">
          <div className="h-4 w-14 rounded-full bg-[#a5a58d]/30" />
        </div>
      </div>

      {/* Content Body */}
      <div className="px-1 sm:px-1.5 flex flex-col flex-1">
        {/* Title */}
        <div className="space-y-1.5 mb-3">
          <div className="h-5 sm:h-6 w-full bg-[#a5a58d]/20 rounded-md animate-pulse" />
          <div className="h-5 sm:h-6 w-3/4 bg-[#a5a58d]/20 rounded-md animate-pulse" />
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5 mb-4">
          <div className="h-3 w-full bg-[#a5a58d]/10 rounded-sm animate-pulse" />
          <div className="h-3 w-4/5 bg-[#a5a58d]/10 rounded-sm animate-pulse" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3.5 border-t border-[#a5a58d]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d]/60" />
            <div className="h-3 w-24 bg-[#a5a58d]/15 rounded-sm animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-[#a5a58d]/15 rounded-sm animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// 3. ProductDetailSkeleton — light olive green / sage shades
export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0efeb] overflow-x-clip font-sans">
      {/* Full-Bleed Hero Section */}
      <section className="w-full relative z-10 flex flex-col lg:flex-row">
        
        {/* Left: Full-Bleed Sticky Image Panel */}
        <div className="w-full h-[65vh] lg:w-1/2 lg:sticky lg:top-0 lg:self-start lg:h-[100dvh] relative shrink-0 overflow-hidden bg-white border-b lg:border-b-0 lg:border-r border-[#a5a58d]/25 animate-pulse">
          {/* Lab Label Sticker */}
          <div className="absolute top-20 left-4 sm:top-28 sm:left-10 bg-[#a5a58d]/30 px-3 py-2 rounded-md">
            <div className="h-2 w-20 bg-white/50 rounded-sm mb-1" />
            <div className="h-3.5 w-36 bg-white/70 rounded-sm" />
          </div>

          {/* Zoom Button Placeholder */}
          <div className="absolute top-20 right-4 sm:top-28 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f0efeb] border border-[#a5a58d]/30" />

          {/* Thumbnail Rail Scrim at Bottom */}
          <div className="absolute inset-x-0 bottom-0 px-6 py-6 sm:px-10 sm:py-8 flex items-end justify-between bg-gradient-to-t from-[#a5a58d]/15 to-transparent">
            <div className="flex gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white border-2 border-[#a5a58d]/30" />
              ))}
            </div>
            <div className="h-3 w-12 bg-[#a5a58d]/30 rounded-sm" />
          </div>
        </div>

        {/* Right: Content Panel */}
        <div className="w-full lg:w-1/2 flex flex-col px-5 sm:px-10 lg:px-16 pt-8 lg:pt-[130px] pb-10 lg:pb-16 shrink-0 animate-pulse">
          {/* Breadcrumbs */}
          <div className="h-3 w-48 bg-[#a5a58d]/15 rounded mb-7" />

          {/* Category Pill */}
          <div className="h-6 w-32 bg-[#a5a58d]/15 border border-[#a5a58d]/30 rounded-full mb-4" />

          {/* Title */}
          <div className="h-9 sm:h-12 w-4/5 bg-[#a5a58d]/20 rounded-xl mb-3" />
          <div className="h-4 w-1/2 bg-[#a5a58d]/12 rounded mb-6" />

          {/* Price & Stock Pill */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#a5a58d]/25">
            <div className="h-8 sm:h-10 w-28 bg-[#a5a58d]/30 rounded-lg" />
            <div className="h-6 w-24 bg-[#a5a58d]/20 rounded-full" />
          </div>

          {/* Variant Selector */}
          <div className="mb-8">
            <div className="h-3 w-24 bg-[#a5a58d]/15 rounded mb-3" />
            <div className="flex flex-wrap gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-11 w-24 rounded-xl bg-white border border-[#a5a58d]/25" />
              ))}
            </div>
          </div>

          {/* Action Row (Quantity Stepper + Add To Cart) */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-32 h-12 bg-white border border-[#a5a58d]/25 rounded-full shrink-0" />
            <div className="flex-1 h-12 bg-[#a5a58d]/50 rounded-full" />
          </div>

          {/* Trust Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#a5a58d]/25">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#a5a58d]/25 flex flex-col gap-2">
                <div className="w-6 h-6 rounded-md bg-[#a5a58d]/20" />
                <div className="h-3.5 w-20 bg-[#a5a58d]/15 rounded-sm" />
                <div className="h-2.5 w-full bg-[#a5a58d]/10 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// 4. OrderRow Skeleton — light olive green / sage shades
export function OrderRowSkeleton() {
  return (
    <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#a5a58d]/25 animate-pulse flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#a5a58d]/10 border border-[#a5a58d]/25 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-[#a5a58d]/20 rounded-md" />
          <div className="h-3 w-24 bg-[#a5a58d]/12 rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-5 w-16 bg-[#a5a58d]/30 rounded-md" />
        <div className="h-6 w-20 bg-[#a5a58d]/20 rounded-full hidden sm:block" />
      </div>
    </div>
  )
}

// 5. StatCard Skeleton — light olive green / sage shades
export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#a5a58d]/25 animate-pulse flex flex-col justify-between h-[220px]">
      <div className="w-10 h-10 rounded-xl bg-[#a5a58d]/10 border border-[#a5a58d]/25" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-20 bg-[#a5a58d]/12 rounded-md" />
        <div className="h-7 w-16 bg-[#a5a58d]/25 rounded-lg" />
        <div className="h-3 w-24 bg-[#a5a58d]/12 rounded-md" />
      </div>
    </div>
  )
}

// 6. COA Table Row Skeleton — light olive green / sage shades
export function COARowSkeleton() {
  return (
    <tr className="border-b border-[#a5a58d]/20 animate-pulse">
      {/* 1. Compound & Spec */}
      <td className="py-4 px-4 sm:px-5 min-w-[150px]">
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-40 bg-[#a5a58d]/20 rounded-md" />
          <div className="h-4 w-24 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-full" />
        </div>
      </td>

      {/* 2. Purity Badge */}
      <td className="py-4 px-4 sm:px-5">
        <div className="h-6 w-20 rounded-full bg-[#a5a58d]/35" />
      </td>

      {/* 3. Batch Lot Pill */}
      <td className="py-4 px-4 sm:px-5">
        <div className="h-6 w-24 rounded-md bg-[#a5a58d]/10 border border-[#a5a58d]/25" />
      </td>

      {/* 4. Lab & Date */}
      <td className="py-4 px-4 sm:px-5">
        <div className="flex flex-col gap-1">
          <div className="h-3.5 w-20 bg-[#a5a58d]/15 rounded-sm" />
          <div className="h-3 w-16 bg-[#a5a58d]/10 rounded-sm" />
        </div>
      </td>

      {/* 5. Actions */}
      <td className="py-4 px-4 sm:px-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="h-7 w-20 rounded-full bg-[#a5a58d]/25" />
          <div className="w-7 h-7 rounded-full bg-[#a5a58d]/10 border border-[#a5a58d]/25" />
        </div>
      </td>
    </tr>
  )
}

// 7. Checkout Page Skeleton — light olive green / sage shades
export function CheckoutPageSkeleton() {
  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 bg-[#f0efeb] min-h-screen font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#a5a58d]/25 animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 bg-[#a5a58d]/30 rounded-full" />
            <div className="h-8 sm:h-12 w-64 sm:w-80 bg-[#a5a58d]/20 rounded-xl" />
          </div>
          <div className="h-4 w-44 bg-[#a5a58d]/15 rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 lg:gap-12 animate-pulse">
          
          {/* Left Column: Form Sections */}
          <div className="flex flex-col gap-6">
            {[
              { titleWidth: 'w-48', fields: 1 },
              { titleWidth: 'w-40', fields: 3 },
              { titleWidth: 'w-44', fields: 2 },
            ].map((section, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#a5a58d]/25 flex flex-col gap-4">
                <div className={`h-5 ${section.titleWidth} bg-[#a5a58d]/20 rounded-md mb-2`} />
                {Array.from({ length: section.fields }).map((_, j) => (
                  <div key={j} className="h-12 w-full bg-[#a5a58d]/8 border border-[#a5a58d]/20 rounded-xl" />
                ))}
              </div>
            ))}
            <div className="h-14 w-full bg-[#a5a58d]/50 rounded-full mt-2" />
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#a5a58d]/25 h-fit flex flex-col gap-6 shadow-sm">
            <div className="h-5 w-36 bg-[#a5a58d]/20 rounded-md" />
            
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-xl shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-[#a5a58d]/20 rounded-sm" />
                  <div className="h-3 w-1/3 bg-[#a5a58d]/25 rounded-sm" />
                </div>
                <div className="h-4 w-12 bg-[#a5a58d]/30 rounded-sm" />
              </div>
            ))}

            <div className="w-full h-px bg-[#a5a58d]/25" />

            <div className="flex flex-col gap-3">
               <div className="flex justify-between">
                 <div className="h-3.5 w-20 bg-[#a5a58d]/15 rounded-md" />
                 <div className="h-3.5 w-16 bg-[#a5a58d]/20 rounded-md" />
               </div>
               <div className="flex justify-between">
                 <div className="h-3.5 w-24 bg-[#a5a58d]/15 rounded-md" />
                 <div className="h-3.5 w-12 bg-[#a5a58d]/30 rounded-md" />
               </div>
            </div>

            <div className="w-full h-px bg-[#a5a58d]/25" />
            
            <div className="flex justify-between items-end">
               <div className="h-4 w-16 bg-[#a5a58d]/15 rounded-md" />
               <div className="h-7 w-24 bg-[#a5a58d]/35 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton }
