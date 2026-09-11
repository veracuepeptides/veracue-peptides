'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Key, Mail, Eye, EyeOff, X, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { HeroButton } from '@/components/ui/hero-button'
import {
  updatePasswordAction,
  requestEmailChangeAction,
  verifyEmailChangeAction,
} from '@/app/(frontend)/(shop)/account/settings/actions'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdatePasswordDialog({ open, onOpenChange, isGoogleOnly = false }: DialogProps & { isGoogleOnly?: boolean }) {
  const t = useTranslations('account.securityDialogs')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const resetState = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowCurrent(false)
    setShowNew(false)
    setShowConfirm(false)
    setError('')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetState()
    onOpenChange(newOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError(t('passwordMismatch'))
      return
    }

    setIsLoading(true)
    try {
      const result = await updatePasswordAction({
        currentPassword: isGoogleOnly ? undefined : currentPassword,
        newPassword,
      })
      if (!result.success) {
        setError(result.error || t('passwordUpdateError'))
        return
      }
      toast.success(t('passwordUpdateSuccess'))
      handleOpenChange(false)
    } catch {
      setError(t('passwordUpdateError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        showCloseButton={false} 
        className="max-w-[calc(100%-1.5rem)] sm:max-w-[480px] w-full bg-white rounded-[26px] sm:rounded-[28px] border border-[#dce0d6] shadow-[0_24px_64px_rgba(40,49,33,0.14)] p-0 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-[#dce0d6]/70 flex items-start justify-between gap-3 bg-[#fafaf8]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/70 shadow-2xs flex items-center justify-center shrink-0">
              <Key size={19} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block">
                Security Credentials
              </span>
              <DialogTitle className="text-lg sm:text-xl font-semibold text-[#1a1f16] tracking-tight">
                {t('updatePasswordTitle')}
              </DialogTitle>
            </div>
          </div>

          <DialogClose asChild>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#edf0e8] text-[#525b4c] hover:text-[#1a1f16] flex items-center justify-center transition-colors border border-[#dce0d6] cursor-pointer shrink-0 shadow-2xs"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </DialogClose>
        </div>

        {/* Modal Description */}
        <div className="px-6 sm:px-8 pt-4">
          <DialogDescription className="text-xs sm:text-[13px] text-[#525b4c] font-light leading-relaxed">
            {t('updatePasswordDescription')}
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 sm:px-8 py-4">
          {!isGoogleOnly && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current" className="text-xs font-semibold text-[#1a1f16]">
                {t('currentPassword')}
              </Label>
              <div className="relative">
                <Input
                  id="current"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                  className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 pr-10 text-sm text-[#1a1f16] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737c6d] hover:text-[#1a1f16] transition-colors p-1 cursor-pointer"
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new" className="text-xs font-semibold text-[#1a1f16]">
              {t('newPassword')}
            </Label>
            <div className="relative">
              <Input
                id="new"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 pr-10 text-sm text-[#1a1f16] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737c6d] hover:text-[#1a1f16] transition-colors p-1 cursor-pointer"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm" className="text-xs font-semibold text-[#1a1f16]">
              {t('confirmNewPassword')}
            </Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                required
                className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 pr-10 text-sm text-[#1a1f16] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737c6d] hover:text-[#1a1f16] transition-colors p-1 cursor-pointer"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-3 pt-4 border-t border-[#dce0d6]/70 flex items-center justify-end gap-3 -mx-6 sm:-mx-8 -mb-4 px-6 sm:px-8 py-4 bg-[#fafaf8]">
            <DialogClose asChild>
              <button 
                type="button" 
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8] transition-all cursor-pointer"
              >
                {t('cancel')}
              </button>
            </DialogClose>
            <HeroButton 
              type="submit" 
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin" />
                  <span>{t('saving')}</span>
                </span>
              ) : (
                <span>{t('updatePasswordTitle')}</span>
              )}
            </HeroButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ChangeEmailDialog({ open, onOpenChange }: DialogProps) {
  const t = useTranslations('account.securityDialogs')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'input' | 'verify'>('input')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    setIsLoading(true)
    try {
      const result = await requestEmailChangeAction(email)
      if (!result.success) {
        setError(result.error || t('emailPreparationError'))
        return
      }
      setStep('verify')
      toast.success(t('verificationCodeSent'))
    } catch {
      setError(t('emailPreparationError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    setIsLoading(true)
    try {
      const result = await verifyEmailChangeAction(code)
      if (!result.success) {
        setError(result.error || t('invalidVerificationCode'))
        return
      }
      toast.success(t('emailUpdateSuccess'))
      onOpenChange(false)
      resetState()
    } catch {
      setError(t('invalidVerificationCode'))
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setEmail('')
    setCode('')
    setStep('input')
    setError('')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetState()
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        showCloseButton={false} 
        className="max-w-[calc(100%-1.5rem)] sm:max-w-[480px] w-full bg-white rounded-[26px] sm:rounded-[28px] border border-[#dce0d6] shadow-[0_24px_64px_rgba(40,49,33,0.14)] p-0 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-[#dce0d6]/70 flex items-start justify-between gap-3 bg-[#fafaf8]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs flex items-center justify-center shrink-0">
              <Mail size={19} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block">
                  Account Verification
                </span>
                <span className="text-[9.5px] font-mono font-semibold px-2 py-0.2 rounded-full bg-indigo-100/70 text-indigo-800">
                  {step === 'input' ? 'Step 1 of 2' : 'Step 2 of 2'}
                </span>
              </div>
              <DialogTitle className="text-lg sm:text-xl font-semibold text-[#1a1f16] tracking-tight">
                {t('changeEmailTitle')}
              </DialogTitle>
            </div>
          </div>

          <DialogClose asChild>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#edf0e8] text-[#525b4c] hover:text-[#1a1f16] flex items-center justify-center transition-colors border border-[#dce0d6] cursor-pointer shrink-0 shadow-2xs"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </DialogClose>
        </div>

        {/* Modal Description */}
        <div className="px-6 sm:px-8 pt-4">
          <DialogDescription className="text-xs sm:text-[13px] text-[#525b4c] font-light leading-relaxed">
            {step === 'input'
              ? t('changeEmailDescriptionInput')
              : t('changeEmailDescriptionVerify', { email })}
          </DialogDescription>
        </div>

        {step === 'input' ? (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4 px-6 sm:px-8 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newEmail" className="text-xs font-semibold text-[#1a1f16]">
                {t('newEmailAddress')}
              </Label>
              <Input
                id="newEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.com"
                required
                className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-3 pt-4 border-t border-[#dce0d6]/70 flex items-center justify-end gap-3 -mx-6 sm:-mx-8 -mb-4 px-6 sm:px-8 py-4 bg-[#fafaf8]">
              <DialogClose asChild>
                <button 
                  type="button" 
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8] transition-all cursor-pointer"
                >
                  {t('cancel')}
                </button>
              </DialogClose>
              <HeroButton 
                type="submit" 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin" />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span>{t('sendCode')}</span>
                )}
              </HeroButton>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 px-6 sm:px-8 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="code" className="text-xs font-semibold text-[#1a1f16]">
                {t('verificationCode')}
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                maxLength={6}
                required
                className="tracking-[0.4em] font-mono text-center text-xl sm:text-2xl font-bold h-13 rounded-2xl bg-[#f5f6f2]/60 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 text-[#1a1f16] transition-all"
              />
              <span className="text-[11px] text-[#737c6d] text-center mt-1">
                Enter the 6-digit one-time code sent to your inbox.
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-3 pt-4 border-t border-[#dce0d6]/70 flex items-center justify-between gap-3 -mx-6 sm:-mx-8 -mb-4 px-6 sm:px-8 py-4 bg-[#fafaf8]">
              <button 
                type="button" 
                onClick={() => setStep('input')}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8] transition-all cursor-pointer"
              >
                {t('back')}
              </button>
              <HeroButton 
                type="submit" 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span>{t('verify')}</span>
                )}
              </HeroButton>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
