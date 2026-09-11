'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ShieldCheck, User, Globe, Bell, Key, Mail, CheckCircle2, Lock, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { UpdatePasswordDialog, ChangeEmailDialog } from '@/components/account/SecurityDialogs'
import { HeroButton } from '@/components/ui/hero-button'

export interface AccountSettingsProps {
  user: {
    firstName?: string | null
    lastName?: string | null
    email: string
    phone?: string | null
    authProvider?: string
    preferredLocale?: string
    acceptsMarketing?: boolean
    orderSmsUpdates?: boolean
  }
}

export function SettingsClient({ user }: AccountSettingsProps) {
  const t = useTranslations('account.settings')
  const [isPending, startTransition] = React.useTransition()
  const [language, setLanguage] = React.useState(user.preferredLocale === 'es' ? 'en' : (user.preferredLocale || 'en'))
  const [marketingEmails, setMarketingEmails] = React.useState(user.acceptsMarketing ?? false)
  const [orderSms, setOrderSms] = React.useState(user.orderSmsUpdates ?? false)

  const [passwordOpen, setPasswordOpen] = React.useState(false)
  const [emailOpen, setEmailOpen] = React.useState(false)

  const [initialProfile, setInitialProfile] = React.useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
  })
  const [firstName, setFirstName] = React.useState(initialProfile.firstName)
  const [lastName, setLastName] = React.useState(initialProfile.lastName)
  const [phone, setPhone] = React.useState(initialProfile.phone)

  React.useEffect(() => {
    const next = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
    }
    setInitialProfile(next)
    setFirstName(next.firstName)
    setLastName(next.lastName)
    setPhone(next.phone)
  }, [user.firstName, user.lastName, user.phone])

  const isProfileDirty = 
    firstName.trim() !== initialProfile.firstName.trim() ||
    lastName.trim() !== initialProfile.lastName.trim() ||
    phone.trim() !== initialProfile.phone.trim()

  async function savePreferences(update: Partial<{ preferredLocale: 'en' | 'es'; acceptsMarketing: boolean; orderSmsUpdates: boolean }>) {
    const { updatePreferencesAction } = await import('./actions')
    const result = await updatePreferencesAction(update)
    if (!result.success) {
      toast.error(result.error || t('toastUpdateFailed'))
      return
    }
    toast.success(t('toastUpdateSuccess'))
  }

  async function handleSubmit(formData: FormData) {
    if (!isProfileDirty) return
    startTransition(async () => {
      try {
        const { updateProfile } = await import('./actions')
        const result = await updateProfile(formData)
        if (!result?.success) {
          toast.error(result?.error || t('toastUpdateFailed'))
          return
        }
        setInitialProfile({ firstName, lastName, phone })
        toast.success(t('toastUpdateSuccess'))
      } catch (error: any) {
        toast.error(error.message || t('toastUnexpectedError'))
      }
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 w-full font-sans"
    >
      
      {/* Header Banner */}
      <div className="flex flex-col gap-1 pb-3 border-b border-[#dce0d6]/70">
        <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d]">
          Account Settings
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-sm text-[#525b4c] font-light">
          {t('subtitle')}
        </p>
      </div>

      {/* 2-Column Responsive Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Personal Information & Preferences (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Card 1: Personal Information */}
          <section className="bg-white rounded-[24px] border border-[#dce0d6] p-6 sm:p-7 shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <div className="flex items-center gap-3 pb-4 border-b border-[#dce0d6]/70 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-xs flex items-center justify-center shrink-0">
                <User size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1a1f16]">
                  {t('personalInformation')}
                </h2>
                <p className="text-xs text-[#525b4c] font-light">
                  Update your contact details and verified laboratory identity.
                </p>
              </div>
            </div>

            <form action={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="firstName" className="text-xs font-semibold text-[#1a1f16]">
                    {t('firstName')}
                  </Label>
                  <Input 
                    name="firstName" 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t('firstName')}
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lastName" className="text-xs font-semibold text-[#1a1f16]">
                    {t('lastName')}
                  </Label>
                  <Input 
                    name="lastName" 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t('lastName')}
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold text-[#1a1f16]">
                    {t('phoneNumber')}
                  </Label>
                  <Input 
                    name="phone" 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 000-0000"
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-[#1a1f16] flex items-center justify-between">
                    <span>Registered Email</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user.email} 
                    disabled
                    className="h-11 bg-[#f5f6f2] border border-[#dce0d6] rounded-xl px-3.5 text-sm text-[#525b4c] cursor-not-allowed select-none" 
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <HeroButton 
                  type="submit" 
                  disabled={!isProfileDirty || isPending}
                  size="sm"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={13} className="animate-spin" />
                      <span>{t('saving')}</span>
                    </span>
                  ) : (
                    <span>{t('saveChanges')}</span>
                  )}
                </HeroButton>
              </div>
            </form>
          </section>

          {/* Card 2: Preferences & Region */}
          <section className="bg-white rounded-[24px] border border-[#dce0d6] p-6 sm:p-7 shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <div className="flex items-center gap-3 pb-4 border-b border-[#dce0d6]/70 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/70 shadow-xs flex items-center justify-center shrink-0">
                <Globe size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1a1f16]">
                  {t('preferences')}
                </h2>
                <p className="text-xs text-[#525b4c] font-light">
                  Customize your portal language and catalog currency display.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="language" className="text-xs font-semibold text-[#1a1f16]">
                  {t('language')}
                </Label>
                <Select
                  value={language}
                  onValueChange={(value) => {
                    setLanguage(value)
                    startTransition(() => { savePreferences({ preferredLocale: 'en' }) })
                  }}
                >
                  <SelectTrigger id="language" className="h-11 bg-[#f5f6f2]/40 hover:bg-white border border-[#dce0d6] focus:border-[#2c3327] rounded-xl px-3.5 text-sm text-[#1a1f16]">
                    <SelectValue placeholder={t('selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-[#dce0d6] rounded-xl shadow-lg">
                    <SelectItem value="en" className="text-xs font-medium cursor-pointer">{t('languageEnglishUs')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="currency" className="text-xs font-semibold text-[#1a1f16]">
                  {t('currency')}
                </Label>
                <div id="currency" className="h-11 flex items-center bg-[#f5f6f2] border border-[#dce0d6] rounded-xl px-3.5 text-sm text-[#525b4c] select-none">
                  {t('currencyUsd')}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Sign In & Security + Notifications (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 3: Sign In & Security */}
          <section className="bg-white rounded-[24px] border border-[#dce0d6] p-6 sm:p-7 shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <div className="flex items-center gap-3 pb-4 border-b border-[#dce0d6]/70 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/70 shadow-xs flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1a1f16]">
                  {t('signInAndSecurity')}
                </h2>
                <p className="text-xs text-[#525b4c] font-light">
                  Credentials and authenticated session access.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-2.5">
                <Lock size={15} className="text-blue-700 shrink-0 mt-0.5" />
                <div className="text-xs text-[#525b4c] leading-relaxed">
                  <span className="font-semibold text-[#1a1f16] block">{t('authManagedSecurely')}</span>
                  <span>
                    Your credentials for <strong>{user.email}</strong> are encrypted via secure auth standards.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setPasswordOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#dce0d6] bg-white hover:bg-amber-50/60 text-xs font-semibold text-[#1a1f16] hover:border-amber-300 transition-all shadow-xs"
                >
                  <Key size={13} className="text-amber-600" />
                  <span>{t('updatePassword')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEmailOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#dce0d6] bg-white hover:bg-indigo-50/60 text-xs font-semibold text-[#1a1f16] hover:border-indigo-300 transition-all shadow-xs"
                >
                  <Mail size={13} className="text-indigo-600" />
                  <span>{t('changeEmail')}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Card 4: Notifications & Alerts */}
          <section className="bg-white rounded-[24px] border border-[#dce0d6] p-6 sm:p-7 shadow-[0_1px_6px_rgba(40,49,33,0.02)]">
            <div className="flex items-center gap-3 pb-4 border-b border-[#dce0d6]/70 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/70 shadow-xs flex items-center justify-center shrink-0">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#1a1f16]">
                  {t('notifications')}
                </h2>
                <p className="text-xs text-[#525b4c] font-light">
                  Automated shipment alerts and product announcements.
                </p>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#dce0d6]/60">
              {/* Marketing Emails */}
              <div className="py-3.5 first:pt-0 flex items-center justify-between gap-3">
                <div className="pr-2">
                  <span className="text-xs sm:text-sm font-semibold text-[#1a1f16] block">{t('marketingEmails')}</span>
                  <span className="text-[11px] text-[#525b4c] font-light leading-snug block">{t('marketingEmailsDescription')}</span>
                </div>
                
                <div className="flex bg-[#edf0e8] rounded-xl p-1 border border-[#a5a58d]/30 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setMarketingEmails(true); startTransition(() => { savePreferences({ acceptsMarketing: true }) }) }}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      marketingEmails 
                        ? 'bg-[#2c3327] text-white shadow-xs' 
                        : 'text-[#525b4c] hover:text-[#1a1f16]'
                    }`}
                  >
                    {t('on')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMarketingEmails(false); startTransition(() => { savePreferences({ acceptsMarketing: false }) }) }}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      !marketingEmails 
                        ? 'bg-white text-[#1a1f16] shadow-xs' 
                        : 'text-[#525b4c] hover:text-[#1a1f16]'
                    }`}
                  >
                    {t('off')}
                  </button>
                </div>
              </div>

              {/* Order SMS Updates */}
              <div className="py-3.5 last:pb-0 flex items-center justify-between gap-3">
                <div className="pr-2">
                  <span className="text-xs sm:text-sm font-semibold text-[#1a1f16] block">{t('orderSmsUpdates')}</span>
                  <span className="text-[11px] text-[#525b4c] font-light leading-snug block">{t('orderSmsUpdatesDescription')}</span>
                </div>
                
                <div className="flex bg-[#edf0e8] rounded-xl p-1 border border-[#a5a58d]/30 shrink-0">
                  <button
                    type="button"
                    onClick={() => { setOrderSms(true); startTransition(() => { savePreferences({ orderSmsUpdates: true }) }) }}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      orderSms 
                        ? 'bg-[#2c3327] text-white shadow-xs' 
                        : 'text-[#525b4c] hover:text-[#1a1f16]'
                    }`}
                  >
                    {t('on')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOrderSms(false); startTransition(() => { savePreferences({ orderSmsUpdates: false }) }) }}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      !orderSms 
                        ? 'bg-white text-[#1a1f16] shadow-xs' 
                        : 'text-[#525b4c] hover:text-[#1a1f16]'
                    }`}
                  >
                    {t('off')}
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>

      <UpdatePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} isGoogleOnly={user.authProvider === 'google'} />
      <ChangeEmailDialog open={emailOpen} onOpenChange={setEmailOpen} />
    </motion.div>
  )
}
