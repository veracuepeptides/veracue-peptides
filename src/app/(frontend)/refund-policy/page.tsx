'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  LegalSection,
  LegalCallout,
  LegalListItem,
} from '@/components/legal/LegalSection'
import { AlertCircle, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react'

export default function RefundPolicyPage() {
  const t = useTranslations('legal.refundPolicy')

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
      slug="refund-policy"
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      effectiveDate={t('effectiveDate')}
      intro={t('intro')}
      introHeading="Analytical Quality Guarantee & All-Sales-Final Standards"
      sections={sections}
      contactProps={{
        title: t('contactTitle'),
        intro: t('contactIntro'),
        supportLabel: t('supportIssuesLabel'),
        orderLabel: t('orderQueriesLabel'),
        closingText: `${t('closingText1')} ${t('closingText2')}`,
        supportEmail: 'support@veracuepeptides.com',
        ordersEmail: 'orders@veracuepeptides.com',
      }}
    >
      {/* 01. Overview & Research-Grade Notice */}
      <LegalSection id="section1" number={1} title={t('section1Title')}>
        <p>{t('section1Text')}</p>
      </LegalSection>

      {/* 02. Damaged or Defective Items */}
      <LegalSection id="section2" number={2} title={t('section2Title')}>
        <p>{t('section2Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section2Item1')}</LegalListItem>
          <LegalListItem>{t('section2Item2')}</LegalListItem>
          <LegalListItem>{t('section2Item3')}</LegalListItem>
        </ul>
        <LegalCallout variant="warning">
          <div className="flex items-start gap-2.5">
            <AlertCircle size={16} className="text-[#cb997e] shrink-0 mt-0.5" />
            <span>{t('section2Important')}</span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 03. Return Eligibility & Non-Returnable Items */}
      <LegalSection id="section3" number={3} title={t('section3Title')}>
        <p>{t('section3Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section3Item1')}</LegalListItem>
          <LegalListItem>{t('section3Item2')}</LegalListItem>
          <LegalListItem>{t('section3Item3')}</LegalListItem>
          <LegalListItem>{t('section3Item4')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 04. Cancellation & Order Adjustments */}
      <LegalSection id="section4" number={4} title={t('section4Title')}>
        <p>{t('section4Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>
            {t.rich('section4Item1', {
              email: (chunks) => (
                <a
                  href="mailto:support@veracuepeptides.com"
                  className="font-medium text-[#cb997e] hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </LegalListItem>
          <LegalListItem>{t('section4Item2')}</LegalListItem>
          <LegalListItem>{t('section4Item3')}</LegalListItem>
          <LegalListItem>{t('section4Item4')}</LegalListItem>
          <LegalListItem>{t('section4Item5')}</LegalListItem>
        </ul>
        <LegalCallout variant="tip">
          <div className="flex items-start gap-2.5">
            <Sparkles size={16} className="text-[#a5a58d] shrink-0 mt-0.5" />
            <span>{t('section4Tip')}</span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 05. Refund Method & Processing Times */}
      <LegalSection id="section5" number={5} title={t('section5Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section5Item1')}</LegalListItem>
          <LegalListItem>{t('section5Item2')}</LegalListItem>
          <LegalListItem>{t('section5Item3')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 06. How to Request a Refund */}
      <LegalSection id="section6" number={6} title={t('section6Title')}>
        <p>{t('section6Intro')}</p>
        <div className="bg-[#f0efeb]/80 rounded-2xl p-4 sm:p-5 border border-[#eddcd2] space-y-2 mt-3">
          <p className="font-sans text-sm text-[#20221c]/80">
            {t('section6OrderQueriesLabel')}{' '}
            <a
              href="mailto:orders@veracuepeptides.com"
              className="font-medium text-[#cb997e] hover:underline"
            >
              orders@veracuepeptides.com
            </a>
          </p>
          <p className="text-xs sm:text-[13px] text-[#20221c]/70 leading-relaxed">
            {t('section6Text')}
          </p>
        </div>
      </LegalSection>

      {/* 07. Chargebacks & Disputed Transactions */}
      <LegalSection id="section7" number={7} title={t('section7Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section7Item1')}</LegalListItem>
          <LegalListItem>{t('section7Item2')}</LegalListItem>
          <LegalListItem>{t('section7Item3')}</LegalListItem>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  )
}
