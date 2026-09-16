'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  LegalSection,
  LegalCallout,
  LegalListItem,
} from '@/components/legal/LegalSection'
import { Lock, ShieldCheck, Eye, Database, Key } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacyPolicy')

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
      slug="privacy-policy"
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      effectiveDate={t('effectiveDate')}
      intro={t('intro')}
      introHeading="Data Privacy, Encryption & Research Confidentiality"
      sections={sections}
      contactProps={{
        title: t('contactTitle'),
        intro: t('contactIntro'),
        supportLabel: t('supportIssuesLabel'),
        orderLabel: t('orderQueriesLabel'),
        closingText: 'Veracue Peptides applies industry-standard TLS encryption, strict data minimization, and secure tokenization across all transactions.',
        supportEmail: 'support@veracuepeptides.com',
        ordersEmail: 'orders@veracuepeptides.com',
      }}
    >
      {/* 01. Information We Collect */}
      <LegalSection id="section1" number={1} title={t('section1Title')}>
        <p>{t('section1Text')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {[
            { label: t('section1Item1Label'), text: t('section1Item1Text') },
            { label: t('section1Item2Label'), text: t('section1Item2Text') },
            { label: t('section1Item3Label'), text: t('section1Item3Text') },
            { label: t('section1Item4Label'), text: t('section1Item4Text') },
            { label: t('section1Item5Label'), text: t('section1Item5Text') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f0efeb]/70 rounded-2xl p-4 border border-[#eddcd2] space-y-1"
            >
              <span className="font-serif font-semibold text-[#20221c] text-sm block">
                {item.label}
              </span>
              <p className="text-xs text-[#20221c]/75 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </LegalSection>

      {/* 02. How We Use Your Information */}
      <LegalSection id="section2" number={2} title={t('section2Title')}>
        <p>{t('section2Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section2Item1')}</LegalListItem>
          <LegalListItem>{t('section2Item2')}</LegalListItem>
          <LegalListItem>{t('section2Item3')}</LegalListItem>
          <LegalListItem>{t('section2Item4')}</LegalListItem>
          <LegalListItem>{t('section2Item5')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 03. Sharing & Disclosure of Information */}
      <LegalSection id="section3" number={3} title={t('section3Title')}>
        <p>{t('section3Intro')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {[
            { label: t('section3Item1Label'), text: t('section3Item1Text') },
            { label: t('section3Item2Label'), text: t('section3Item2Text') },
            { label: t('section3Item3Label'), text: t('section3Item3Text') },
            { label: t('section3Item4Label'), text: t('section3Item4Text') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f0efeb]/70 rounded-2xl p-4 border border-[#eddcd2] space-y-1"
            >
              <span className="font-serif font-semibold text-[#20221c] text-sm block">
                {item.label}
              </span>
              <p className="text-xs text-[#20221c]/75 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </LegalSection>

      {/* 04. Cookies & Tracking Technologies */}
      <LegalSection id="section4" number={4} title={t('section4Title')}>
        <p>{t('section4Text1')}</p>
        <p className="pt-2">{t('section4Text2')}</p>
      </LegalSection>

      {/* 05. Your Privacy Rights & Choices */}
      <LegalSection id="section5" number={5} title={t('section5Title')}>
        <p>{t('section5Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section5Item1')}</LegalListItem>
          <LegalListItem>{t('section5Item2')}</LegalListItem>
          <LegalListItem>{t('section5Item3')}</LegalListItem>
          <LegalListItem>{t('section5Item4')}</LegalListItem>
        </ul>
        <div className="bg-[#fff1e6] rounded-2xl p-4 sm:p-5 border border-[#eddcd2] mt-4 space-y-2">
          <p className="text-xs sm:text-[13px] text-[#20221c]/85 leading-relaxed">
            {t('section5ContactText')}
          </p>
          <p className="text-xs sm:text-[13px] text-[#20221c]/85 font-medium">
            {t('section5EmailLabel')}{' '}
            <a
              href="mailto:support@veracuepeptides.com"
              className="text-[#cb997e] hover:underline"
            >
              support@veracuepeptides.com
            </a>
          </p>
        </div>
      </LegalSection>

      {/* 06. Data Security & Storage */}
      <LegalSection id="section6" number={6} title={t('section6Title')}>
        <p>{t('section6Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section6Item1')}</LegalListItem>
          <LegalListItem>{t('section6Item2')}</LegalListItem>
          <LegalListItem>{t('section6Item3')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 07. International Data Transfers & Children's Privacy */}
      <LegalSection id="section7" number={7} title={t('section7Title')}>
        <p>{t('section7Text1')}</p>
        <p className="pt-2">{t('section7Text2')}</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
