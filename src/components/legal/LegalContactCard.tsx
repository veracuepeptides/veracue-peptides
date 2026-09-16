'use client'

import React, { useState } from 'react'
import { Mail, Check, Copy, Clock, ShieldCheck } from 'lucide-react'

interface LegalContactCardProps {
  title?: string
  intro?: string
  supportLabel?: string
  orderLabel?: string
  closingText?: string
  supportEmail?: string
  ordersEmail?: string
}

export function LegalContactCard({
  title = 'Questions Regarding This Policy?',
  intro = 'Our compliance and laboratory support desk is available to assist research institutions and qualified investigators with policy clarifications, lot documentation, and order verification.',
  supportLabel = 'Scientific & Compliance Support',
  orderLabel = 'Order Inquiries & Fulfillment',
  closingText = 'Veracue Peptides reserves the right to update this policy in accordance with relevant statutory frameworks and laboratory compliance regulations.',
  supportEmail = 'support@veracuepeptides.com',
  ordersEmail = 'orders@veracuepeptides.com',
}: LegalContactCardProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => {
      setCopiedEmail(null)
    }, 2000)
  }

  return (
    <section
      id="contact"
      className="scroll-mt-36 mt-12 sm:mt-16 bg-[#242820] text-[#fff1e6] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 border border-[#3c4234] relative overflow-hidden shadow-lg"
    >
      {/* Ambient Olive & Sage Glow */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-64 h-64 bg-[#a5a58d]/25 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#cb997e]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        {/* Eyebrow in Olive Green */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#a5a58d]/20 border border-[#a5a58d]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#d6d6c2] mb-4">
          <ShieldCheck size={13} className="text-[#a5a58d]" />
          <span>Institutional Inquiry Desk</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight mb-3">
          {title}
        </h2>

        {/* Intro */}
        <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed max-w-3xl mb-8 font-light">
          {intro}
        </p>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Support Email Card */}
          <div className="bg-white/5 hover:bg-white/10 border border-[#a5a58d]/30 hover:border-[#a5a58d]/60 rounded-2xl p-4 sm:p-5 transition-colors flex flex-col justify-between group">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5a58d] font-semibold block mb-1">
                {supportLabel}
              </span>
              <a
                href={`mailto:${supportEmail}`}
                className="text-sm sm:text-base font-medium text-white hover:text-[#cb997e] transition-colors break-all"
              >
                {supportEmail}
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/70 flex items-center gap-1.5">
                <Clock size={11} className="text-[#a5a58d]" />
                <span>&lt;24h business reply</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(supportEmail)}
                className="inline-flex items-center gap-1 text-[11px] text-[#fff1e6] hover:text-white px-2.5 py-1 rounded-lg bg-white/15 hover:bg-[#a5a58d] transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail === supportEmail ? (
                  <>
                    <Check size={12} className="text-white" />
                    <span className="text-white font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Orders Email Card */}
          <div className="bg-white/5 hover:bg-white/10 border border-[#a5a58d]/30 hover:border-[#a5a58d]/60 rounded-2xl p-4 sm:p-5 transition-colors flex flex-col justify-between group">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5a58d] font-semibold block mb-1">
                {orderLabel}
              </span>
              <a
                href={`mailto:${ordersEmail}`}
                className="text-sm sm:text-base font-medium text-white hover:text-[#cb997e] transition-colors break-all"
              >
                {ordersEmail}
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/70 flex items-center gap-1.5">
                <Mail size={11} className="text-[#a5a58d]" />
                <span>Priority order queue</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(ordersEmail)}
                className="inline-flex items-center gap-1 text-[11px] text-[#fff1e6] hover:text-white px-2.5 py-1 rounded-lg bg-white/15 hover:bg-[#a5a58d] transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail === ordersEmail ? (
                  <>
                    <Check size={12} className="text-white" />
                    <span className="text-white font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Closing Note */}
        {closingText ? (
          <div className="pt-6 border-t border-white/10">
            <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed italic">
              {closingText}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
