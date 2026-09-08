'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MailCheck, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { requestPasswordReset } from './actions'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword')
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = async (data: ForgotPasswordInput) => {
    await requestPasswordReset(data)
    setSubmitted(true)
  }

  return (
    <AuthSplitLayout mode="login">
      <div className="w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#20221c]/10 shadow-[0_10px_35px_-10px_rgba(32,34,28,0.07)] flex flex-col gap-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a5a58d]/20 text-[#20221c]">
                <MailCheck size={28} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#20221c] tracking-tight font-sans">
                  Check your email
                </h2>
                <p className="text-sm text-[#20221c]/60 max-w-[280px] mx-auto leading-relaxed font-sans">
                  If an account exists for that email, we've sent instructions to reset your password.
                </p>
              </div>
              <Link href="/login" className="w-full mt-2">
                <button 
                  type="button" 
                  className="w-full bg-[#20221c] hover:bg-[#20221c]/90 text-[#f0efeb] rounded-xl py-2.5 text-sm font-semibold tracking-wide transition-colors flex items-center justify-center font-sans"
                >
                  Back to sign in
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl sm:text-[26px] font-bold text-[#20221c] tracking-tight font-sans">
                  Reset your password
                </h1>
                <p className="text-sm text-[#20221c]/60 mt-1 font-sans">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#20221c] mb-1.5 font-sans">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className="w-full bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3.5 py-2.5 text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                    {...register('email')}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1 font-sans">{errors.email.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#20221c] hover:bg-[#20221c]/90 active:scale-[0.99] text-[#f0efeb] rounded-xl py-2.5 text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-60 font-sans"
                >
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <div className="flex justify-center items-center gap-1.5 text-xs text-[#20221c]/60 pt-0.5 font-sans">
                <Link href="/login" className="font-semibold text-[#20221c] hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthSplitLayout>
  )
}
