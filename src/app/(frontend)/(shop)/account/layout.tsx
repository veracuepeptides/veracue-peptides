import React from 'react'
import { AccountTopNav } from '@/components/account/AccountTopNav'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('account.layout')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getPayloadUser()
  const userName = user?.firstName || user?.email?.split('@')[0] || 'User'
  const userEmail = user?.email || ''
  const hbPoints = user?.hbPoints || 0

  let affiliateStatus: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended' = 'none'
  if (user) {
    const payload = await getPayload({ config })
    const { docs: affiliates } = await payload.find({
      collection: 'affiliates',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })
    if (affiliates.length > 0) {
      affiliateStatus = affiliates[0].status || 'pending'
    }
  }

  return (
    <div className="bg-[#f0efeb] min-h-screen text-[#1a1f16] selection:bg-[#a5a58d]/30 selection:text-[#1a1f16] flex flex-col relative pt-24 sm:pt-28 md:pt-[116px] lg:pt-[120px] pb-12 sm:pb-16">
      {/* Subtle architectural olive ambient depth contained to not disrupt sticky positioning */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-[#a5a58d]/15 via-[#edf0e8]/30 to-transparent blur-3xl opacity-60" 
        />
        <div 
          className="absolute top-1/4 -right-48 w-80 h-80 bg-[#a5a58d]/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Main Account Portal Container */}
      <div className="max-w-[1320px] w-full mx-auto px-3 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        {/* Navigation Tabs Pill Bar */}
        <AccountTopNav 
          userName={userName} 
          userEmail={userEmail}
          hbPoints={hbPoints} 
          affiliateStatus={affiliateStatus} 
        />

        {/* Main Content Area */}
        <main className="w-full mt-6 sm:mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
