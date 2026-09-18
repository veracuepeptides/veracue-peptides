import React from 'react'
import { redirect } from 'next/navigation'
import { AffiliateTopNav } from '@/components/affiliates/AffiliateTopNav'
import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('affiliate.dashboardLayout')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function AffiliateDashboardLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('affiliate.sidebar')
  const user = await getPayloadUser()
  if (!user) redirect('/login')

  const payload = await getPayload({ config })

  // Fetch Affiliate Data
  const { docs: affiliates } = await payload.find({
    collection: 'affiliates',
    where: { user: { equals: user.id } },
    limit: 1,
    overrideAccess: true,
  })

  // If no affiliate record or not approved, redirect to apply
  if (affiliates.length === 0 || affiliates[0].status !== 'approved') {
    redirect('/affiliates')
  }

  const affiliate = affiliates[0]
  const userName = affiliate.displayName || user?.firstName || user?.email?.split('@')[0] || t('defaultPartnerName')
  const tier = affiliate.tier || 'standard'

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

      {/* Main Portal Container */}
      <div className="max-w-[1400px] w-full mx-auto px-3 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        <AffiliateTopNav userName={userName} tier={tier} />

        {/* Main Content Area */}
        <main className="w-full mt-6 sm:mt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
