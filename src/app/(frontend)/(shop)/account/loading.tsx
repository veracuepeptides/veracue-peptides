import React from 'react'
import { StatCardSkeleton, OrderRowSkeleton } from '@/components/ui/skeleton'

export default function AccountLoading() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 w-full animate-in fade-in duration-200 font-sans">
      
      {/* 1. Header Banner Skeleton — light olive green */}
      <div className="flex justify-between items-end pb-3 border-b border-[#a5a58d]/25 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-[#a5a58d]/30 rounded-md" />
          <div className="h-8 w-60 bg-[#a5a58d]/20 rounded-xl" />
          <div className="h-3 w-72 bg-[#a5a58d]/10 rounded-md" />
        </div>
        <div className="h-4 w-32 bg-[#a5a58d]/12 rounded-md" />
      </div>

      {/* 2. Top Bento Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left: Forest Olive Rewards Spotlight */}
        <div className="lg:col-span-5 bg-[#2c3327] rounded-[24px] p-6 sm:p-7 border border-[#3a442e] animate-pulse h-[220px] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="h-5 w-32 bg-[#a5a58d]/30 rounded-full" />
            <div className="h-9 w-40 bg-white/20 rounded-xl" />
            <div className="h-3 w-5/6 bg-white/10 rounded-md" />
          </div>
          <div className="h-9 w-28 bg-[#a5a58d]/25 rounded-xl self-end" />
        </div>

        {/* Right: Stat Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* 3. Main Split Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Orders */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex justify-between items-center px-1 mb-1">
            <div className="h-5 w-32 bg-[#a5a58d]/20 rounded-md animate-pulse" />
            <div className="h-4 w-20 bg-[#a5a58d]/25 rounded-md animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <OrderRowSkeleton key={i} />
          ))}
        </div>

        {/* Right: Address & Shortcuts */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-white rounded-[24px] p-6 border border-[#a5a58d]/25 animate-pulse h-44 flex flex-col justify-between">
            <div className="h-4 w-28 bg-[#a5a58d]/20 rounded-md" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 bg-[#a5a58d]/15 rounded-md" />
              <div className="h-3 w-48 bg-[#a5a58d]/10 rounded-md" />
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#a5a58d]/25 animate-pulse h-48 flex flex-col justify-between">
            <div className="h-4 w-32 bg-[#a5a58d]/20 rounded-md" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-full bg-[#a5a58d]/10 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
