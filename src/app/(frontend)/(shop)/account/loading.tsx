import React from 'react'

export default function AccountLoading() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 w-full animate-in fade-in duration-200 font-sans">
      
      {/* 1. Header Banner Skeleton */}
      <div className="flex justify-between items-end pb-3 border-b border-[#dce0d6]/70 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-[#dce0d6] rounded-md" />
          <div className="h-8 w-60 bg-[#dce0d6] rounded-xl" />
          <div className="h-3 w-72 bg-[#e6e9e1] rounded-md" />
        </div>
        <div className="h-4 w-32 bg-[#e6e9e1] rounded-md" />
      </div>

      {/* 2. Top Bento Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-5 bg-[#2c3327]/80 rounded-[24px] p-6 sm:p-7 animate-pulse h-[220px] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="h-5 w-32 bg-white/20 rounded-full" />
            <div className="h-9 w-40 bg-white/20 rounded-xl" />
            <div className="h-3 w-5/6 bg-white/10 rounded-md" />
          </div>
          <div className="h-9 w-28 bg-white/15 rounded-xl self-end" />
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-[22px] p-5 sm:p-6 border border-[#dce0d6] animate-pulse flex flex-col justify-between h-[220px]">
              <div className="w-10 h-10 rounded-xl bg-[#edf0e8]" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-[#e6e9e1] rounded-md" />
                <div className="h-7 w-16 bg-[#dce0d6] rounded-lg" />
                <div className="h-3 w-20 bg-[#e6e9e1] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Split Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Orders */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex justify-between items-center px-1 mb-1">
            <div className="h-5 w-32 bg-[#dce0d6] rounded-md animate-pulse" />
            <div className="h-4 w-20 bg-[#e6e9e1] rounded-md animate-pulse" />
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#dce0d6] animate-pulse flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#edf0e8]" />
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-36 bg-[#dce0d6] rounded-md" />
                  <div className="h-3 w-24 bg-[#e6e9e1] rounded-md" />
                </div>
              </div>
              <div className="h-5 w-16 bg-[#dce0d6] rounded-md" />
            </div>
          ))}
        </div>

        {/* Right: Address & Shortcuts */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-white rounded-[24px] p-6 border border-[#dce0d6] animate-pulse h-44 flex flex-col justify-between">
            <div className="h-4 w-28 bg-[#dce0d6] rounded-md" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 bg-[#dce0d6] rounded-md" />
              <div className="h-3 w-48 bg-[#e6e9e1] rounded-md" />
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#dce0d6] animate-pulse h-48 flex flex-col justify-between">
            <div className="h-4 w-32 bg-[#dce0d6] rounded-md" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 w-full bg-[#e6e9e1] rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
