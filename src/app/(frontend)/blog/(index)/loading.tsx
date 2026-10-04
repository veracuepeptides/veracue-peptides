import React from 'react'
import { BlogPostCardSkeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full text-[#20221c] min-h-screen font-sans overflow-x-clip">
      {/* 1. Blog Hero Skeleton — light olive green */}
      <section className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-6 px-3 sm:px-6 md:px-10 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-5xl text-center animate-pulse mb-6">
          <div className="h-3 w-48 sm:w-64 bg-[#a5a58d]/25 rounded-full mb-3" />
          <div className="h-8 sm:h-12 w-3/4 max-w-xl bg-[#a5a58d]/20 rounded-2xl mb-3" />
          <div className="h-4 w-full max-w-md bg-[#a5a58d]/12 rounded-full mb-4" />
          <div className="h-11 sm:h-12 w-48 bg-[#a5a58d]/35 rounded-full shadow-xs" />
        </div>
      </section>

      {/* 2. Editorial Browser Area */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-4 pb-16 sm:pb-24">
        {/* Compliance Notice Placeholder */}
        <div className="bg-white/80 border border-[#a5a58d]/25 rounded-2xl p-4 sm:p-6 mb-8 flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-[#a5a58d]/20 shrink-0 hidden sm:block" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3.5 w-48 bg-[#a5a58d]/20 rounded" />
            <div className="h-3 w-full max-w-xl bg-[#a5a58d]/10 rounded" />
          </div>
        </div>

        {/* Categories / Search Bar Skeleton */}
        <div className="flex items-center justify-between gap-4 mb-8 animate-pulse">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-28 rounded-full bg-white border border-[#a5a58d]/25 shrink-0" />
            ))}
          </div>
          <div className="hidden md:block h-10 w-64 rounded-full bg-white border border-[#a5a58d]/25" />
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex h-full w-full">
              <BlogPostCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
