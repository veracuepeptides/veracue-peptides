import React from 'react'
import { Container } from '@/components/ui/container'

export default function CartLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full min-h-screen font-sans pt-28 sm:pt-36 pb-24">
      <Container size="page" className="px-3 sm:px-6 md:px-10 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="h-3 w-40 bg-[#a5a58d]/15 rounded mb-6 animate-pulse" />

        {/* Header Title */}
        <div className="flex flex-col gap-2 mb-10 pb-6 border-b border-[#a5a58d]/25 animate-pulse">
          <div className="h-3.5 w-28 bg-[#a5a58d]/30 rounded-full" />
          <div className="h-9 sm:h-12 w-64 sm:w-80 bg-[#a5a58d]/20 rounded-xl" />
        </div>

        {/* 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 animate-pulse">
          {/* Left Column: Cart Items List */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#a5a58d]/25 flex items-center gap-4 sm:gap-6 shadow-2xs"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#a5a58d]/10 border border-[#a5a58d]/25 shrink-0" />
                
                {/* Details */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div className="h-4 sm:h-5 w-3/4 bg-[#a5a58d]/20 rounded-sm" />
                  <div className="h-3 w-24 bg-[#a5a58d]/25 rounded-full" />
                  <div className="h-5 w-20 bg-[#a5a58d]/30 rounded-md mt-1" />
                </div>

                {/* Quantity Pill Placeholder */}
                <div className="w-28 h-10 rounded-full bg-[#a5a58d]/10 border border-[#a5a58d]/25 shrink-0 hidden sm:block" />
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#a5a58d]/25 h-fit flex flex-col gap-5 shadow-sm">
            <div className="h-5 w-36 bg-[#a5a58d]/20 rounded-md" />

            {/* Subtotal lines */}
            <div className="flex flex-col gap-3 py-3 border-y border-[#a5a58d]/20">
              <div className="flex justify-between">
                <div className="h-3.5 w-20 bg-[#a5a58d]/15 rounded" />
                <div className="h-3.5 w-16 bg-[#a5a58d]/20 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3.5 w-24 bg-[#a5a58d]/15 rounded" />
                <div className="h-3.5 w-14 bg-[#a5a58d]/30 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3.5 w-28 bg-[#a5a58d]/15 rounded" />
                <div className="h-3.5 w-14 bg-[#a5a58d]/20 rounded" />
              </div>
            </div>

            {/* Total Line */}
            <div className="flex justify-between items-end">
              <div className="h-4 w-16 bg-[#a5a58d]/15 rounded" />
              <div className="h-7 w-24 bg-[#a5a58d]/35 rounded-lg" />
            </div>

            {/* Checkout Button — light olive green */}
            <div className="h-12 w-full rounded-full bg-[#a5a58d]/50 mt-2" />
          </div>
        </div>
      </Container>
    </div>
  )
}
