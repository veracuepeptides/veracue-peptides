'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MailCheck, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { registerUser } from '../actions'

export default function RegisterPage() {
  const t = useTranslations('auth.register')
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [ruoCertified, setRuoCertified] = useState(false)
  const [ruoError, setRuoError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterInput) => {
    if (!ruoCertified) {
      setRuoError(true)
      return
    }
    setRuoError(false)
    setServerError('')
    const result = await registerUser(data)

    if (!result.success) {
      setServerError(result.error === 'emailInUse' ? (t('emailInUse') || 'An account with this email already exists') : (t('genericError') || 'Something went wrong. Please try again.'))
      return
    }

    setIsSuccess(true)
  }

  const handleGoogle = () => {
    setIsGoogleLoading(true)
    signIn('google', { callbackUrl: '/account' })
  }

  return (
    <AuthSplitLayout mode="register">
      <div className="w-full flex flex-col items-center">
        
        {/* Responsive White Card */}
        <div className="w-full bg-white rounded-2xl p-5 sm:p-7 xl:p-8 border border-[#20221c]/10 shadow-[0_10px_35px_-10px_rgba(32,34,28,0.07)] flex flex-col gap-3.5 sm:gap-4">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a5a58d]/20 text-[#20221c]">
                <MailCheck size={28} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-[#20221c] tracking-tight font-sans">
                  Check your email
                </h1>
                <p className="text-xs sm:text-sm text-[#20221c]/60 max-w-[280px] mx-auto leading-relaxed font-sans">
                  We've sent a verification link to your email. Please check your inbox.
                </p>
              </div>
              <Link href="/login" className="w-full mt-2">
                <button 
                  type="button"
                  className="w-full h-11 sm:h-10 bg-[#20221c] hover:bg-[#20221c]/90 text-[#f0efeb] rounded-xl text-sm font-semibold tracking-wide transition-colors font-sans"
                >
                  Back to sign in
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#20221c] tracking-tight font-sans">
                  Create an account
                </h1>
                <p className="text-xs sm:text-sm text-[#20221c]/60 mt-1 font-sans">
                  Enter your details to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-3.5 w-full">
                
                <div className="space-y-2.5 sm:space-y-3">
                  {/* Name Fields (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-[#20221c] mb-1 font-sans">
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                        {...register('firstName')}
                      />
                      {errors.firstName && <p className="text-xs text-red-600 mt-0.5 font-sans">{errors.firstName.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-medium text-[#20221c] mb-1 font-sans">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                        {...register('lastName')}
                      />
                      {errors.lastName && <p className="text-xs text-red-600 mt-0.5 font-sans">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#20221c] mb-1 font-sans">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                      {...register('email')}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-0.5 font-sans">{errors.email.message}</p>}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-xs font-medium text-[#20221c] mb-1 font-sans">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl pl-3 pr-10 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                        {...register('password')}
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#20221c]/40 hover:text-[#20221c] transition-colors p-1"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-600 mt-0.5 font-sans">{errors.password.message}</p>}
                  </div>

                  {/* Natural RUO Checkbox */}
                  <div className="pt-0.5">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
                      <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center shrink-0 mt-0.5 ${
                        ruoCertified ? 'bg-[#20221c] border-[#20221c]' : 'bg-white border-[#20221c]/30 hover:border-[#20221c]/60'
                      }`}>
                        {ruoCertified && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={ruoCertified} 
                        onChange={(e) => {
                          setRuoCertified(e.target.checked)
                          if (e.target.checked) setRuoError(false)
                        }} 
                      />
                      <span className="text-xs text-[#20221c]/70 leading-snug font-sans">
                        I confirm that all purchases are for research use only (RUO).
                      </span>
                    </label>
                    {ruoError && (
                      <p className="text-xs text-red-600 mt-0.5 font-medium font-sans">
                        Please confirm that purchases are for research use only.
                      </p>
                    )}
                  </div>
                </div>

                {serverError && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-sans">
                    <AlertCircle size={14} className="shrink-0" />
                    <p className="text-xs font-medium">{serverError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-10 bg-[#20221c] hover:bg-[#20221c]/90 active:scale-[0.99] text-[#f0efeb] rounded-xl text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 mt-0.5 disabled:opacity-60 font-sans"
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </form>
              
              {/* Separator */}
              <div className="flex items-center gap-3 my-0">
                <div className="h-px flex-1 bg-[#20221c]/10" />
                <span className="text-xs text-[#20221c]/40 font-sans">or</span>
                <div className="h-px flex-1 bg-[#20221c]/10" />
              </div>

              {/* Google Registration */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={isGoogleLoading}
                className="w-full h-11 sm:h-10 bg-white hover:bg-neutral-50 text-[#20221c] border border-[#20221c]/15 hover:border-[#20221c]/30 rounded-xl flex items-center justify-center gap-2.5 transition-all text-sm font-medium shadow-xs font-sans"
              >
                {!isGoogleLoading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
              </button>

              {/* Footer Link */}
              <div className="flex justify-center items-center gap-1.5 text-xs text-[#20221c]/60 pt-0.5 font-sans">
                <span>Already have an account?</span>
                <Link href="/login" className="font-semibold text-[#20221c] hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          )}

        </div>

      </div>
    </AuthSplitLayout>
  )
}
