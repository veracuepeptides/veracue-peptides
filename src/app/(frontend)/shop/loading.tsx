import React from 'react'
import { ProductCardSkeleton } from '@/components/ui/skeleton'

export default function ShopLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full min-h-screen flex flex-col font-sans">
      {/* Hero Skeleton */}
      <section className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-4 px-3 sm:px-6 md:px-10 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-5xl text-center animate-pulse mb-6">
          <div className="h-3 w-48 sm:w-64 bg-[#eddcd2] rounded-full mb-3" />
          <div className="h-8 sm:h-12 w-3/4 max-w-lg bg-[#eddcd2] rounded-2xl mb-3" />
          <div className="h-4 w-full max-w-md bg-[#eddcd2]/70 rounded-full mb-4" />
          <div className="h-10 w-44 bg-[#eddcd2] rounded-full" />
        </div>

        {/* Feature Card Skeleton */}
        <div className="w-full max-w-[1400px] h-[320px] sm:h-[420px] md:h-[480px] bg-[#eddcd2]/60 rounded-2xl md:rounded-[18px] animate-pulse" />
      </section>

      {/* Catalog Grid Skeleton */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-10 pb-16">
        {/* Toolbar Skeleton */}
        <div className="h-14 w-full bg-white/70 border border-[#eddcd2] rounded-2xl mb-8 animate-pulse" />

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
