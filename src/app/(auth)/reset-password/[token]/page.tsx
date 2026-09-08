'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth'
import { resetPassword } from '../actions'

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const t = useTranslations('auth.resetPassword')
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) })

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError('')
    const result = await resetPassword(token, data)
    if (!result.success) {
      setServerError(result.error === 'invalidToken' ? (t('invalidToken') || 'This reset link is invalid or expired') : (t('mismatch') || 'Passwords do not match'))
      return
    }
    setSuccess(true)
    setTimeout(() => router.push('/login'), 2000)
  }

  return (
    <AuthSplitLayout mode="login">
      <div className="w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-[#20221c]/10 shadow-[0_10px_35px_-10px_rgba(32,34,28,0.07)] flex flex-col gap-5">
          <div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-[#20221c] tracking-tight font-sans">
              Choose a new password
            </h1>
            <p className="text-sm text-[#20221c]/60 mt-1 font-sans">
              Please enter your new password below.
            </p>
          </div>

          {success ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a5a58d]/20 text-[#20221c]">
                <CheckCircle2 size={28} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#20221c] font-sans">Your password has been reset successfully.</p>
              <p className="text-xs text-[#20221c]/60 font-sans">Redirecting you to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
              <div className="space-y-3">
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-[#20221c] mb-1.5 font-sans">
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="w-full bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3.5 py-2.5 text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                    {...register('password')}
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1 font-sans">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-[#20221c] mb-1.5 font-sans">
                    Confirm new password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className="w-full bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3.5 py-2.5 text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1 font-sans">{t('mismatch')}</p>}
                </div>
              </div>

              {serverError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-sans">
                  <AlertCircle size={14} className="shrink-0" />
                  <p className="text-xs font-medium">{serverError}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#20221c] hover:bg-[#20221c]/90 active:scale-[0.99] text-[#f0efeb] rounded-xl py-2.5 text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-60 font-sans"
              >
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </button>
            </form>
          )}

          <div className="flex justify-center items-center gap-1.5 text-xs text-[#20221c]/60 pt-0.5 font-sans">
            <Link href="/login" className="font-semibold text-[#20221c] hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthSplitLayout>
  )
}
