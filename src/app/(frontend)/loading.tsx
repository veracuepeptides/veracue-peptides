import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomepageLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="flex flex-col w-full min-h-screen font-sans overflow-x-clip">
      {/* 1. Hero Section Skeleton Mimic — light olive green / sage */}
      <section className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-4 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-between min-h-[100dvh] md:h-screen md:min-h-[620px]">
        
        {/* Top Header & Intro Block */}
        <div className="flex flex-col items-center text-center shrink-0 w-full max-w-5xl px-3 animate-pulse">
          {/* Eyebrow Tagline */}
          <div className="h-3 w-64 sm:w-80 bg-[#a5a58d]/25 rounded-full mb-3" />

          {/* Main Headline */}
          <div className="h-8 sm:h-12 md:h-14 w-4/5 max-w-2xl bg-[#a5a58d]/20 rounded-2xl mb-3" />

          {/* Sub-headline */}
          <div className="h-4 w-full max-w-lg bg-[#a5a58d]/12 rounded-full mb-2" />
          <div className="h-4 w-3/4 max-w-md bg-[#a5a58d]/12 rounded-full mb-5" />

          {/* CTA Pill Button Skeleton — light olive green */}
          <div className="h-11 sm:h-12 w-48 bg-[#a5a58d]/35 rounded-full shadow-xs" />
        </div>

        {/* Visual Feature Card Container */}
        <div className="w-full mx-auto px-1 sm:px-2 flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[250px] flex flex-col mt-4 mb-2">
          <div className="relative w-full h-full flex-1 rounded-2xl md:rounded-[18px] overflow-hidden bg-white/80 border border-[#a5a58d]/25 animate-pulse flex items-center justify-center">
            {/* Center compound logo/badge placeholder */}
            <div className="flex flex-col items-center gap-3 opacity-60">
              <div className="w-14 h-14 rounded-2xl bg-[#a5a58d]/15 border border-[#a5a58d]/30" />
              <div className="h-3 w-32 bg-[#a5a58d]/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges / Categories Section Skeleton Placeholder */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white/70 border border-[#a5a58d]/25 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a5a58d]/10 border border-[#a5a58d]/25 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 w-20 bg-[#a5a58d]/20 rounded-sm" />
                <div className="h-2.5 w-full bg-[#a5a58d]/10 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
