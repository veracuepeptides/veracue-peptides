import React from 'react'
import { COARowSkeleton } from '@/components/ui/skeleton'

export default function CertificatesLoading() {
  return (
    <div style={{ backgroundColor: '#f0efeb' }} className="w-full min-h-screen font-sans pb-24">
      {/* 1. Certificates Hero Skeleton — light olive green */}
      <section className="w-full pt-[78px] sm:pt-[94px] md:pt-[128px] pb-6 px-3 sm:px-6 md:px-10 flex flex-col items-center">
        <div className="flex flex-col items-center w-full max-w-5xl text-center animate-pulse mb-6">
          <div className="h-3 w-56 sm:w-72 bg-[#a5a58d]/25 rounded-full mb-3" />
          <div className="h-8 sm:h-12 w-3/4 max-w-xl bg-[#a5a58d]/20 rounded-2xl mb-3" />
          <div className="h-4 w-full max-w-md bg-[#a5a58d]/12 rounded-full mb-4" />
          <div className="h-11 sm:h-12 w-52 bg-[#a5a58d]/35 rounded-full shadow-xs" />
        </div>
      </section>

      {/* 2. Main Certificates Browser Container */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pt-4">
        {/* Search & Filter Controls Toolbar */}
        <div className="bg-white border border-[#a5a58d]/25 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between animate-pulse">
          <div className="h-10 w-full md:w-80 bg-[#a5a58d]/10 border border-[#a5a58d]/25 rounded-xl" />
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-20 rounded-full bg-[#a5a58d]/10 border border-[#a5a58d]/25 shrink-0" />
            ))}
          </div>
        </div>

        {/* Certificates Table Container */}
        <div className="bg-white rounded-2xl md:rounded-[22px] border border-[#a5a58d]/25 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#a5a58d]/25 bg-[#a5a58d]/5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  <th className="py-3 px-4 sm:px-5">Product / Compound</th>
                  <th className="py-3 px-4 sm:px-5">HPLC Purity</th>
                  <th className="py-3 px-4 sm:px-5">Batch / Lot #</th>
                  <th className="py-3 px-4 sm:px-5">Lab & Date</th>
                  <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <COARowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
