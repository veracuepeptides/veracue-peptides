'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { HeroButton } from '@/components/ui/hero-button'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { submitContactForm } from '@/app/(frontend)/contact-us/actions'

const TOPICS = [
  { id: 'general', label: 'General Question' },
  { id: 'order', label: 'Order Status' },
  { id: 'coa', label: 'Batch COA Request' },
  { id: 'bulk', label: 'Bulk Inquiry' },
]

export function ContactForm() {
  const t = useTranslations('content.contactForm')
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].label)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const form = formRef.current
      if (!form) {
        setIsSubmitting(false)
        return
      }

      const formData = new FormData(form)
      formData.set('department', selectedTopic)

      const res = await submitContactForm(formData)

      if (res?.error) {
        setErrorMessage(res.error)
      } else {
        setIsSubmitted(true)
        form.reset()
      }
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err?.message || 'Something went wrong while sending your message. Please email support@veracuepeptides.com directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      id="inquiry-form"
      className="bg-white border border-[#eddcd2] rounded-2xl sm:rounded-3xl p-6 sm:p-9 md:p-11 shadow-[0_4px_24px_rgba(0,0,0,0.03)] scroll-mt-28"
    >
      {/* Friendly, Non-AI Header */}
      <div className="mb-7 sm:mb-9">
        <div className="inline-block border border-[#eddcd2] rounded-full px-3.5 py-1 mb-3 bg-[#fff1e6] shadow-2xs">
          <span className="text-[#cb997e] text-[11px] font-bold tracking-[0.14em] uppercase font-sans">
            SEND A MESSAGE
          </span>
        </div>

        <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-[32px] text-[#20221c] tracking-tight leading-tight mb-2">
          {t('heading')}
        </h2>
        <p className="font-sans text-neutral-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-xl">
          {t('subheading')}
        </p>
      </div>

      {/* Success Notification Banner */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-950 flex items-start gap-3.5 shadow-2xs"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
              <CheckCircle2 size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <h4 className="font-heading font-bold text-sm sm:text-base text-emerald-950 mb-1">
                {t('sent')}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-emerald-800 leading-relaxed mb-3">
                We usually reply in under 2 hours during weekday business hours (8 AM – 6 PM EST).
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-semibold text-emerald-900 underline underline-offset-2 hover:text-emerald-950 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Alert Banner */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-7 bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-900 flex items-start gap-3 shadow-2xs"
          >
            <AlertCircle size={17} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="font-sans text-xs sm:text-sm leading-relaxed">{errorMessage}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Fields */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full"
      >
        <input type="hidden" name="department" value={selectedTopic} />

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-sans font-semibold text-[#20221c] mb-1.5"
            >
              {t('nameLabel')} <span className="text-[#cb997e]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t('namePlaceholder')}
              className="w-full bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white border border-[#eddcd2] focus:border-[#20221c] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#20221c] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#20221c] transition-all duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-sans font-semibold text-[#20221c] mb-1.5"
            >
              {t('emailLabel')} <span className="text-[#cb997e]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('emailPlaceholder')}
              className="w-full bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white border border-[#eddcd2] focus:border-[#20221c] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#20221c] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#20221c] transition-all duration-150"
            />
          </div>
        </div>

        {/* Row 2: Topic Choice (Clean, intuitive chips) */}
        <div>
          <label className="block text-xs font-sans font-semibold text-[#20221c] mb-2">
            {t('departmentLabel')}
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.label
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.label)}
                  className={`px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-all duration-150 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#20221c] text-white border-[#20221c] shadow-2xs'
                      : 'bg-[#f0efeb]/50 hover:bg-[#f0efeb] text-neutral-700 border-[#eddcd2]'
                  }`}
                >
                  {topic.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Row 3: Subject & Optional Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-sans font-semibold text-[#20221c] mb-1.5"
            >
              {t('subjectLabel')} <span className="text-[#cb997e]">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subjectPlaceholder')}
              className="w-full bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white border border-[#eddcd2] focus:border-[#20221c] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#20221c] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#20221c] transition-all duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block text-xs font-sans font-semibold text-[#20221c] mb-1.5"
            >
              {t('organizationLabel')}
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              placeholder={t('organizationPlaceholder')}
              className="w-full bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white border border-[#eddcd2] focus:border-[#20221c] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#20221c] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#20221c] transition-all duration-150"
            />
          </div>
        </div>

        {/* Row 4: Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-sans font-semibold text-[#20221c] mb-1.5"
          >
            {t('messageLabel')} <span className="text-[#cb997e]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder={t('messagePlaceholder')}
            className="w-full bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white border border-[#eddcd2] focus:border-[#20221c] rounded-xl p-4 text-xs sm:text-sm text-[#20221c] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#20221c] transition-all duration-150 resize-none leading-relaxed"
          />
        </div>

        {/* Bottom Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#eddcd2] mt-1">
          <p className="text-[11.5px] font-sans text-neutral-500 text-center sm:text-left">
            We respect your privacy and never share your email.
          </p>

          <div className="w-full sm:w-auto">
            <HeroButton
              type="button"
              disabled={isSubmitting}
              onClick={() => formRef.current?.requestSubmit()}
              className="w-full sm:w-auto justify-center"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span>{t('sending')}</span>
                </span>
              ) : (
                <span>{t('submit')}</span>
              )}
            </HeroButton>
          </div>
        </div>
      </form>
    </div>
  )
}
