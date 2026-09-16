'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  LegalSection,
  LegalCallout,
  LegalListItem,
} from '@/components/legal/LegalSection'
import { AlertOctagon, ShieldAlert, CheckCircle2 } from 'lucide-react'

const FAQ_KEYS = [
  'researchUseOnlyMeaning',
  'intendedForHumanConsumption',
  'isMedicalAdvice',
  'whoCanPurchase',
  'fdaRegulated',
  'selfAdministration',
  'misuseResponsibility',
  'contactAboutDisclaimer',
] as const

export default function MedicalDisclaimerPage() {
  const t = useTranslations('legal.medicalDisclaimer')

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
  ]

  return (
    <LegalPageLayout
      slug="medical-disclaimer"
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      effectiveDate={t('effectiveDate')}
      intro={t('intro')}
      introHeading="Critical Research Notice & Regulatory Posture"
      sections={sections}
      contactProps={{
        title: t('contactTitle'),
        intro: t('contactIntro'),
        supportLabel: t('supportIssuesLabel'),
        closingText: t('closingText'),
        supportEmail: 'support@veracuepeptides.com',
        ordersEmail: 'orders@veracuepeptides.com',
      }}
      faqs={faqs}
      faqTitle={t('faqTitle')}
      faqDescription={t('faqDescription')}
    >
      {/* 01. Research Use Only */}
      <LegalSection id="section1" number={1} title={t('section1Title')}>
        <p>{t('section1Text')}</p>
        <LegalCallout variant="warning">
          <div className="flex items-start gap-2.5">
            <AlertOctagon size={16} className="text-[#cb997e] shrink-0 mt-0.5" />
            <span>
              All compounds distributed by Veracue are strictly designated for <strong>in vitro experimentation</strong> and laboratory research purposes only. Under no circumstances are products intended for therapeutic, diagnostic, or clinical administration.
            </span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 02. No Medical Advice */}
      <LegalSection id="section2" number={2} title={t('section2Title')}>
        <p>{t('section2Text')}</p>
      </LegalSection>

      {/* 03. Purchaser Responsibility & Compliance */}
      <LegalSection id="section3" number={3} title={t('section3Title')}>
        <p>{t('section3Text')}</p>
      </LegalSection>

      {/* 04. Restricted Uses */}
      <LegalSection id="section4" number={4} title={t('section4Title')}>
        <p>{t('section4Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section4Item1')}</LegalListItem>
          <LegalListItem>{t('section4Item2')}</LegalListItem>
          <LegalListItem>{t('section4Item3')}</LegalListItem>
          <LegalListItem>{t('section4Item4')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 05. FDA & Regulatory Status */}
      <LegalSection id="section5" number={5} title={t('section5Title')}>
        <p>{t('section5Text')}</p>
        <div className="bg-[#f0efeb]/70 rounded-2xl p-4 sm:p-5 border border-[#eddcd2] mt-3">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#a5a58d]">
            <CheckCircle2 size={14} className="text-[#cb997e]" />
            <span>Analytical Purity &amp; Identity Documentation</span>
          </div>
          <p className="text-xs sm:text-[13px] text-[#20221c]/75 leading-relaxed">
            Every batch distributed by Veracue is accompanied by public, third-party HPLC and MS analytical reports. These certificates confirm identity and purity, but do not imply or constitute regulatory authorization for human or veterinary use.
          </p>
        </div>
      </LegalSection>

      {/* 06. Safe Handling & Biosafety */}
      <LegalSection id="section6" number={6} title={t('section6Title')}>
        <p>{t('section6Text')}</p>
      </LegalSection>

      {/* 07. Indemnification & Limitation of Liability */}
      <LegalSection id="section7" number={7} title={t('section7Title')}>
        <p>{t('section7Text')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
