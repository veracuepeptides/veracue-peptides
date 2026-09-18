import React from 'react'
import { ProductCardSkeleton } from '@/components/ui/skeleton'

export default function ShopLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full min-h-screen flex flex-col font-sans">
      {/* 1. Shop Hero Skeleton — light olive green / sage */}
      <section className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-4 px-3 sm:px-6 md:px-10 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-5xl text-center animate-pulse mb-6">
          {/* Eyebrow */}
          <div className="h-3 w-56 sm:w-72 bg-[#a5a58d]/25 rounded-full mb-3" />
          {/* Headline */}
          <div className="h-8 sm:h-12 w-3/4 max-w-xl bg-[#a5a58d]/20 rounded-2xl mb-3" />
          {/* Description */}
          <div className="h-4 w-full max-w-md bg-[#a5a58d]/12 rounded-full mb-4" />
          {/* Explore Button — light olive green */}
          <div className="h-11 sm:h-12 w-52 bg-[#a5a58d]/35 rounded-full shadow-xs" />
        </div>

        {/* Feature Card Skeleton */}
        <div className="w-full max-w-[1400px] h-[300px] sm:h-[400px] md:h-[460px] bg-white/80 border border-[#a5a58d]/25 rounded-2xl md:rounded-[18px] animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 opacity-60">
            <div className="w-14 h-14 rounded-2xl bg-[#a5a58d]/15 border border-[#a5a58d]/30" />
            <div className="h-3 w-36 bg-[#a5a58d]/20 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. Catalog Grid Skeleton */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-10 pb-16">
        {/* Toolbar Skeleton */}
        <div className="h-14 w-full bg-white border border-[#a5a58d]/25 rounded-2xl mb-8 p-3 flex items-center justify-between animate-pulse">
          <div className="h-8 w-44 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/25 sm:hidden" />
            <div className="w-8 h-8 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/25 sm:hidden" />
            <div className="hidden sm:block h-8 w-36 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-full" />
            <div className="hidden sm:block h-8 w-24 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-full" />
            <div className="h-8 w-28 sm:w-32 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-full" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 xl:gap-7">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex h-full w-full">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
