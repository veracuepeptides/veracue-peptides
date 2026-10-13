'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { generateContactFormEmail } from '@/lib/emails/generateContactFormEmail'
import { sendTrackedEmail } from '@/lib/emails/sendTrackedEmail'
import { checkRateLimit } from '@/lib/rateLimit'
import { headers } from 'next/headers'

export async function submitContactForm(formData: FormData) {
  const t = await getTranslations('content.contactForm')
  try {
    // The platform appends the real client IP, so the last x-forwarded-for entry is the trustworthy one.
    const forwarded = ((await headers()).get('x-forwarded-for') || '').split(',').map((v) => v.trim()).filter(Boolean)
    const ip = forwarded[forwarded.length - 1] || 'unknown'
    const { allowed } = await checkRateLimit(`contact:${ip}`, 5, 60 * 60)
    if (!allowed) {
      return { error: t('errorUnexpected') }
    }

    const payload = await getPayload({ config: configPromise })

    const department = formData.get('department') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !subject || !message) {
      return { error: t('errorRequiredFields') }
    }
    // Field limits keep the support inbox usable and stop the form being used to send large payloads.
    if (name.length > 120 || subject.length > 200 || message.length > 5000 || email.length > 254) {
      return { error: t('errorUnexpected') }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return { error: t('errorUnexpected') }
    }

    const html = generateContactFormEmail(name, email, department, subject, message)

    await sendTrackedEmail(payload, {
      from: 'Veracue Labs Contact Form <orders@veracuelabs.com>',
      to: 'orders@veracuelabs.com',
      replyTo: email,
      subject: `[Veracue Research Inquiry] ${subject}`,
      html: html,
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error submitting contact form:', error)
    return { error: error.message || t('errorUnexpected') }
  }
}
