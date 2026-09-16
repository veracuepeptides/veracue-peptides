'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  LegalSection,
  LegalCallout,
  LegalListItem,
} from '@/components/legal/LegalSection'
import { AlertTriangle, ShieldCheck, Scale } from 'lucide-react'

const FAQ_KEYS = [
  'humanUseApproved',
  'cancelOrder',
  'shipsInternationally',
  'damagedOrDelayed',
  'ageRequirement',
  'currency',
  'orderQuestionsContact',
  'termsChangeNotice',
] as const

export default function TermsAndConditionsPage() {
  const t = useTranslations('legal.termsAndConditions')

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faqs.${key}.question`),
    answer: t(`faqs.${key}.answer`),
  }))

  const sections = [
    { id: 'section1', label: t('section1Title') },
    { id: 'section2', label: t('section2Title') },
    { id: 'section3', label: t('section3Title') },
    { id: 'section4', label: t('section4Title') },
    { id: 'section5', label: t('section5Title') },
    { id: 'section6', label: t('section6Title') },
    { id: 'section7', label: t('section7Title') },
    { id: 'section8', label: t('section8Title') },
    { id: 'section9', label: t('section9Title') },
    { id: 'section10', label: t('section10Title') },
    { id: 'section11', label: t('section11Title') },
    { id: 'section12', label: t('section12Title') },
    { id: 'section13', label: t('section13Title') },
  ]

  return (
    <LegalPageLayout
      slug="terms-and-conditions"
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      effectiveDate={t('effectiveDate')}
      intro={t('intro')}
      introHeading="Contractual Agreement & Research Protocols"
      sections={sections}
      contactProps={{
        title: t('contactTitle'),
        intro: t('contactIntro'),
        supportLabel: t('supportIssuesLabel'),
        orderLabel: t('orderQueriesLabel'),
        closingText: 'By placing an order on Veracue, you acknowledge and reaffirm your compliance with these Terms and Conditions.',
        supportEmail: 'support@veracuepeptides.com',
        ordersEmail: 'orders@veracuepeptides.com',
      }}
      faqs={faqs}
      faqTitle={t('faqTitle')}
      faqDescription={t('faqDescription')}
    >
      {/* 01. Agreement to Terms */}
      <LegalSection id="section1" number={1} title={t('section1Title')}>
        <p>{t('section1Text')}</p>
      </LegalSection>

      {/* 02. Research Use Only Notice */}
      <LegalSection id="section2" number={2} title={t('section2Title')}>
        <p>{t('section2Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section2Item1')}</LegalListItem>
          <LegalListItem>{t('section2Item2')}</LegalListItem>
          <LegalListItem>{t('section2Item3')}</LegalListItem>
        </ul>
        <LegalCallout variant="warning">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={16} className="text-[#cb997e] shrink-0 mt-0.5" />
            <span>
              Veracue maintains a zero-tolerance policy regarding human or animal consumption claims. Any accounts or orders indicating intent for non-laboratory use are subject to immediate cancellation without refund.
            </span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 03. Eligibility & Account Creation */}
      <LegalSection id="section3" number={3} title={t('section3Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section3Item1')}</LegalListItem>
          <LegalListItem>{t('section3Item2')}</LegalListItem>
          <LegalListItem>{t('section3Item3')}</LegalListItem>
          <LegalListItem>{t('section3Item4')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 04. Orders & Acceptance */}
      <LegalSection id="section4" number={4} title={t('section4Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section4Item1')}</LegalListItem>
          <LegalListItem>{t('section4Item2')}</LegalListItem>
          <LegalListItem>{t('section4Item3')}</LegalListItem>
          <LegalListItem>{t('section4Item4')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 05. Pricing & Payments */}
      <LegalSection id="section5" number={5} title={t('section5Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section5Item1')}</LegalListItem>
          <LegalListItem>{t('section5Item2')}</LegalListItem>
          <LegalListItem>{t('section5Item3')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 06. Shipping & Delivery */}
      <LegalSection id="section6" number={6} title={t('section6Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section6Item1')}</LegalListItem>
          <LegalListItem>{t('section6Item2')}</LegalListItem>
          <LegalListItem>{t('section6Item3')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 07. Intellectual Property */}
      <LegalSection id="section7" number={7} title={t('section7Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section7Item1')}</LegalListItem>
          <LegalListItem>{t('section7Item2')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 08. Disclaimer of Warranties */}
      <LegalSection id="section8" number={8} title={t('section8Title')}>
        <p>{t('section8Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section8Item1')}</LegalListItem>
          <LegalListItem>{t('section8Item2')}</LegalListItem>
          <LegalListItem>{t('section8Item3')}</LegalListItem>
        </ul>
        <LegalCallout variant="tip">
          <div className="flex items-start gap-2.5">
            <Scale size={16} className="text-[#a5a58d] shrink-0 mt-0.5" />
            <span>{t('section8Note')}</span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 09. Limitation of Liability */}
      <LegalSection id="section9" number={9} title={t('section9Title')}>
        <p>{t('section9Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section9Item1')}</LegalListItem>
          <LegalListItem>{t('section9Item2')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 10. Indemnification */}
      <LegalSection id="section10" number={10} title={t('section10Title')}>
        <p>{t('section10Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section10Item1')}</LegalListItem>
          <LegalListItem>{t('section10Item2')}</LegalListItem>
          <LegalListItem>{t('section10Item3')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 11. Governing Law & Dispute Resolution */}
      <LegalSection id="section11" number={11} title={t('section11Title')}>
        <p>{t('section11Text')}</p>
      </LegalSection>

      {/* 12. Severability */}
      <LegalSection id="section12" number={12} title={t('section12Title')}>
        <p>{t('section12Text')}</p>
      </LegalSection>

      {/* 13. Changes to Terms */}
      <LegalSection id="section13" number={13} title={t('section13Title')}>
        <p>{t('section13Text')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
