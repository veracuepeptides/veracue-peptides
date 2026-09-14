'use client'

import React, { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

export function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Unable to subscribe. Please try again.')
      }

      setStatus('success')
      setMessage("You've been added to the research dispatch list.")
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Subscription failed. Please verify your email and try again.')
    }
  }

  return (
    <div className="w-full bg-[#fff1e6] border border-[#eddcd2] rounded-2xl sm:rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(32,34,28,0.04)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
              <p className="font-serif tracking-[0.2em] text-[11px] sm:text-xs uppercase text-[#cb997e] font-semibold">
                The Veracue Dispatch
              </p>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#20221c] tracking-tight leading-[1.18] mb-3 sm:mb-4">
              Independent peptide research, directly to your bench.
            </h2>

            <p className="text-neutral-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-lg font-normal">
              Join over 3,800 university biochemists and independent investigators who receive our monthly monographs, HPLC purity analyses, and stability protocols.
            </p>
          </div>

          {/* Delivery Metadata */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-6 sm:mt-8 pt-5 border-t border-[#eddcd2]/80 text-xs text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Published 1st Tuesday monthly
            </span>
            <span className="text-neutral-300 hidden sm:inline">&bull;</span>
            <span>Zero promotional clutter</span>
            <span className="text-neutral-300 hidden sm:inline">&bull;</span>
            <span>1-click unsubscribe</span>
          </div>
        </div>

        {/* Right Column: Clean Form Module */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#eddcd2] rounded-2xl p-5 sm:p-7 shadow-sm">
            {status === 'success' ? (
              <div className="py-6 px-2 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-3">
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading font-bold text-base text-[#20221c] mb-1">
                  Subscription Confirmed
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mb-4">
                  {message}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-xs text-[#cb997e] hover:text-[#b8856c] font-semibold underline cursor-pointer"
                >
                  Register another address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#20221c] mb-1.5"
                  >
                    Laboratory Email Address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@institution.edu"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 bg-[#f0efeb]/60 focus:bg-white border border-[#eddcd2] rounded-xl text-sm text-[#20221c] placeholder:text-neutral-400 focus:outline-none focus:border-[#cb997e] transition-all"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-600 font-medium">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-[13px] uppercase tracking-wider bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Receive Monthly Monograph</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400 text-center mt-1 font-normal">
                  Exclusively for laboratory and clinical research personnel.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
