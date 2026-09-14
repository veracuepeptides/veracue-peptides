'use server'

import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'

export async function submitAffiliateApplication(formData: FormData) {
  const t = await getTranslations('affiliate.landing')
  try {
    const user = await getPayloadUser()
    if (!user) {
      return { success: false, error: 'Unauthorized. Please log in to apply.' }
    }

    const payload = await getPayload({ config })

    // Check if user already has an application
    const existingApplication = await payload.find({
      collection: 'affiliate-applications',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })

    if (existingApplication.docs.length > 0) {
      return { success: false, error: t('errorAlreadyApplied') }
    }

    // Check if user is already an affiliate
    const existingAffiliate = await payload.find({
      collection: 'affiliates',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })

    if (existingAffiliate.docs.length > 0) {
      return { success: false, error: t('errorAlreadyAffiliate') }
    }

    // Extract form data
    const displayName = (formData.get('displayName') as string)?.trim() || ''
    const rawPhone = ((formData.get('phone') as string) || '').trim()
    const websiteUrl = (formData.get('websiteUrl') as string)?.trim() || ''
    const platform = (formData.get('platform') as string)?.trim() || ''
    const socialUrl = (formData.get('socialUrl') as string)?.trim() || ''
    const estimatedMonthlyReach = (formData.get('reach') as string)?.trim() || ''
    const niche = (formData.get('niche') as string)?.trim() || ''
    const promotionMethods = (formData.get('methods') as string)?.trim() || ''
    const agreedToTerms = formData.get('terms') === 'on' || formData.get('terms') === 'true'

    if (!displayName || !platform || !estimatedMonthlyReach || !promotionMethods || !agreedToTerms) {
      return { success: false, error: t('errorMissingFields') }
    }

    // Normalize and validate phone number
    let cleanPhone = ''
    if (rawPhone) {
      const digits = rawPhone.replace(/\D/g, '')
      if (rawPhone.startsWith('+')) {
        cleanPhone = `+${digits}`
      } else if (digits.length === 10) {
        // Standard US/Canada 10-digit number
        cleanPhone = `+1${digits}`
      } else if (digits.length === 11 && digits.startsWith('1')) {
        cleanPhone = `+${digits}`
      } else if (digits.length > 0) {
        cleanPhone = `+${digits}`
      }
    }

    if (!cleanPhone) {
      return { success: false, error: 'Please enter a valid contact phone number.' }
    }

    const e164Regex = /^\+?[1-9]\d{1,14}$/
    if (!e164Regex.test(cleanPhone)) {
      return {
        success: false,
        error: 'Please enter a valid phone number with country code (e.g. +1 555-123-4567).',
      }
    }

    // 1. Update the user's phone field in the users collection
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        phone: cleanPhone,
      } as any,
      overrideAccess: true,
    })

    // 2. Create the affiliate application
    await payload.create({
      collection: 'affiliate-applications',
      data: {
        user: user.id,
        status: 'approved',
        displayName,
        phone: cleanPhone,
        websiteUrl,
        socialLinks: socialUrl
          ? [
              {
                platform: platform as any,
                url: socialUrl,
              },
            ]
          : [],
        estimatedMonthlyReach: estimatedMonthlyReach as any,
        niche,
        promotionMethods,
        agreedToTerms,
      },
      overrideAccess: true,
    })

    revalidatePath('/affiliates')
    revalidatePath('/account/settings')

    return { success: true }
  } catch (error: any) {
    console.error('Error submitting affiliate application:', error)
    return { success: false, error: error.message || t('errorUnexpected') }
  }
}
