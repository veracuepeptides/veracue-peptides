import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/ui/container'

export default function OrderConfirmationLoading() {
  return (
    <div className="min-h-screen bg-[#f0efeb] pt-28 sm:pt-36 pb-24 font-sans">
      <Container size="page" className="px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-20">
          
          {/* LEFT COLUMN SKELETON */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8 animate-pulse">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Checkmark Box Placeholder — light olive green */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#a5a58d]/15 border border-[#a5a58d]/30 flex items-center justify-center mb-6 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#a5a58d]/35" />
              </div>
              {/* Titles */}
              <div className="h-3.5 w-32 bg-[#a5a58d]/30 rounded-full mb-3" />
              <div className="h-9 md:h-11 w-3/4 max-w-sm bg-[#a5a58d]/20 rounded-xl mb-3" />
              <div className="h-4 w-full max-w-md bg-[#a5a58d]/12 rounded-md mb-2" />
              <div className="h-4 w-4/5 max-w-sm bg-[#a5a58d]/12 rounded-md" />
            </div>

            {/* Action Banner Skeleton */}
            <div className="w-full h-44 rounded-2xl bg-white border border-[#a5a58d]/25 p-6 flex flex-col justify-between" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-36 rounded-2xl bg-white border border-[#a5a58d]/25 p-5 flex flex-col justify-between" />
              <div className="h-36 rounded-2xl bg-white border border-[#a5a58d]/25 p-5 flex flex-col justify-between" />
            </div>
          </div>

          {/* RIGHT COLUMN SKELETON (Order Summary Receipt Card) */}
          <div className="hidden lg:block w-full lg:w-[45%] xl:w-[45%]">
            <div className="w-full bg-white rounded-3xl border border-[#a5a58d]/25 p-6 md:p-8 flex flex-col gap-6 animate-pulse shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-[#a5a58d]/20">
                <div className="h-4 w-28 bg-[#a5a58d]/20 rounded" />
                <div className="h-4 w-20 bg-[#a5a58d]/30 rounded" />
              </div>

              {/* Items Placeholder */}
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 w-3/4 bg-[#a5a58d]/20 rounded-sm" />
                    <div className="h-3 w-1/3 bg-[#a5a58d]/25 rounded-sm" />
                  </div>
                  <div className="h-4 w-12 bg-[#a5a58d]/30 rounded-sm" />
                </div>
              ))}

              {/* Totals Box */}
              <div className="bg-[#a5a58d]/10 rounded-2xl p-4 flex flex-col gap-3 mt-2 border border-[#a5a58d]/20">
                <div className="flex justify-between">
                  <div className="h-3.5 w-16 bg-[#a5a58d]/15 rounded" />
                  <div className="h-3.5 w-12 bg-[#a5a58d]/20 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3.5 w-20 bg-[#a5a58d]/15 rounded" />
                  <div className="h-3.5 w-12 bg-[#a5a58d]/30 rounded" />
                </div>
                <div className="h-px w-full bg-[#a5a58d]/20" />
                <div className="flex justify-between items-end">
                  <div className="h-3.5 w-14 bg-[#a5a58d]/15 rounded" />
                  <div className="h-6 w-20 bg-[#a5a58d]/35 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}
