'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { resendVerificationEmail } from '@/app/(auth)/register/resendVerification'

function LoginForm() {
  const t = useTranslations('auth.login')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/account'
  const [serverError, setServerError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState('')
  const [resendState, setResendState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('veracue_remember_email')
      if (savedEmail) {
        setValue('email', savedEmail)
        setRememberMe(true)
      }
    } catch {
      // Ignore if localStorage unavailable (e.g., incognito)
    }
  }, [setValue])

  const onSubmit = async (data: LoginInput) => {
    setServerError('')
    setUnverifiedEmail('')
    setResendState('idle')
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl,
    })

    if (!result || result.error) {
      if (result?.error === 'EMAIL_NOT_VERIFIED') {
        setServerError(t('emailNotVerified') || "Please verify your email before logging in.")
        setUnverifiedEmail(data.email)
      } else if (result?.error === 'TOO_MANY_ATTEMPTS') {
        setServerError(t('tooManyAttempts') || 'Too many attempts. Please wait a few minutes and try again.')
      } else {
        setServerError(t('invalidCredentials') || 'Invalid email or password')
      }
      return
    }

    try {
      if (rememberMe) {
        localStorage.setItem('veracue_remember_email', data.email)
      } else {
        localStorage.removeItem('veracue_remember_email')
      }
    } catch {
      // Ignore if localStorage unavailable
    }

    router.push(callbackUrl)
    router.refresh()
  }

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return
    setResendState('sending')
    await resendVerificationEmail(unverifiedEmail)
    setResendState('sent')
  }

  const handleGoogle = () => {
    setIsGoogleLoading(true)
    signIn('google', { callbackUrl })
  }

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Responsive White Card */}
      <div className="w-full bg-white rounded-2xl p-5 sm:p-7 xl:p-8 border border-[#20221c]/10 shadow-[0_10px_35px_-10px_rgba(32,34,28,0.07)] flex flex-col gap-4 sm:gap-5">
        
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#20221c] tracking-tight font-sans">
            Sign in to your account
          </h1>
          <p className="text-xs sm:text-sm text-[#20221c]/60 mt-1 font-sans">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          
          <div className="space-y-3 sm:space-y-3.5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#20221c] mb-1.5 font-sans">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl px-3.5 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1 font-sans">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-medium text-[#20221c] font-sans">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-[#20221c]/60 hover:text-[#20221c] hover:underline underline-offset-4 transition-colors font-sans">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full h-11 sm:h-10 bg-white border border-[#20221c]/15 focus:border-[#20221c] focus:ring-1 focus:ring-[#20221c] rounded-xl pl-3.5 pr-11 text-base sm:text-sm text-[#20221c] placeholder:text-[#20221c]/30 transition-all outline-none font-sans"
                  {...register('password')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#20221c]/40 hover:text-[#20221c] transition-colors p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1 font-sans">{errors.password.message}</p>}
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none group py-1">
              <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center shrink-0 ${
                rememberMe ? 'bg-[#20221c] border-[#20221c]' : 'bg-white border-[#20221c]/25 group-hover:border-[#20221c]/50'
              }`}>
                {rememberMe && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={rememberMe} 
                onChange={(e) => {
                  const checked = e.target.checked
                  setRememberMe(checked)
                  if (!checked) {
                    try {
                      localStorage.removeItem('veracue_remember_email')
                    } catch {}
                  }
                }} 
              />
              <span className="text-xs text-[#20221c]/80 font-sans">Remember me</span>
            </label>
          </div>

          {/* Server Error & Email Verification Resend */}
          {serverError && (
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-sans">
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <p className="text-xs font-medium">{serverError}</p>
              </div>
              {unverifiedEmail && (
                resendState === 'sent' ? (
                  <p className="text-xs text-red-600 mt-1">
                    A new verification email has been sent. Please check your inbox.
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendState === 'sending'}
                    className="text-xs font-semibold text-red-800 hover:underline self-start disabled:opacity-50 mt-1"
                  >
                    {resendState === 'sending' ? 'Sending…' : 'Resend verification email'}
                  </button>
                )
              )}
            </div>
          )}

          {/* Primary Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-11 sm:h-10 bg-[#20221c] hover:bg-[#20221c]/90 active:scale-[0.99] text-[#f0efeb] rounded-xl text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 mt-0.5 disabled:opacity-60 font-sans"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center gap-3 my-0">
          <div className="h-px flex-1 bg-[#20221c]/10" />
          <span className="text-xs text-[#20221c]/40 font-sans">or</span>
          <div className="h-px flex-1 bg-[#20221c]/10" />
        </div>

        {/* Google SSO */}
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
          <span>Don't have an account?</span>
          <Link href="/register" className="font-semibold text-[#20221c] hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthSplitLayout mode="login">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthSplitLayout>
  )
}
