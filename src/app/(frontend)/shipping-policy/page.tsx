'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import {
  LegalSection,
  LegalCallout,
  LegalListItem,
} from '@/components/legal/LegalSection'
import { Truck, Clock, ThermometerSnowflake, ShieldAlert } from 'lucide-react'

export default function ShippingPolicyPage() {
  const t = useTranslations('legal.shippingPolicy')

  const sections = [
    { id: 'section1', label: t('section1Title') },
    { id: 'section2', label: t('section2Title') },
    { id: 'section3', label: t('section3Title') },
    { id: 'section4', label: t('section4Title') },
    { id: 'section5', label: t('section5Title') },
    { id: 'section6', label: t('section6Title') },
    { id: 'section7', label: t('section7Title') },
    { id: 'section8', label: t('section8Title') },
  ]

  return (
    <LegalPageLayout
      slug="shipping-policy"
      eyebrow={t('eyebrow')}
      titleLine1={t('titleLine1')}
      titleLine2={t('titleLine2')}
      effectiveDate={t('effectiveDate')}
      intro={t('intro')}
      introHeading="Delivery Windows, Packaging & Damage Reporting"
      sections={sections}
      contactProps={{
        title: t('contactTitle'),
        intro: t('contactIntro'),
        supportLabel: t('supportIssuesLabel'),
        orderLabel: t('orderQueriesLabel'),
        closingText: t('closingText'),
        supportEmail: 'support@veracuepeptides.com',
        ordersEmail: 'orders@veracuepeptides.com',
      }}
    >
      {/* 01. Order Processing Time */}
      <LegalSection id="section1" number={1} title={t('section1Title')}>
        <p>{t('section1Text')}</p>
        <LegalCallout variant="tip">
          <div className="flex items-start gap-2.5">
            <Clock size={16} className="text-[#a5a58d] shrink-0 mt-0.5" />
            <span>{t('section1Note')}</span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 02. Shipping Options */}
      <LegalSection id="section2" number={2} title={t('section2Title')}>
        <p>{t('section2Intro')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { label: t('section2Item1Label'), text: t('section2Item1Text') },
            { label: t('section2Item2Label'), text: t('section2Item2Text') },
            { label: t('section2Item3Label'), text: t('section2Item3Text') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f0efeb]/70 rounded-2xl p-4 border border-[#eddcd2] flex flex-col justify-between"
            >
              <span className="font-serif font-semibold text-[#20221c] text-sm block mb-1">
                {item.label}
              </span>
              <span className="text-xs text-[#20221c]/75 font-sans leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#20221c]/65 italic pt-1">{t('section2Note')}</p>
      </LegalSection>

      {/* 03. International Shipping & Customs */}
      <LegalSection id="section3" number={3} title={t('section3Title')}>
        <p>{t('section3Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section3Item1')}</LegalListItem>
          <LegalListItem>{t('section3Item2')}</LegalListItem>
        </ul>
        <LegalCallout variant="warning">
          <div className="flex items-start gap-2.5">
            <ShieldAlert size={16} className="text-[#cb997e] shrink-0 mt-0.5" />
            <span>{t('section3Note')}</span>
          </div>
        </LegalCallout>
      </LegalSection>

      {/* 04. Shipping Rates */}
      <LegalSection id="section4" number={4} title={t('section4Title')}>
        <p>{t('section4Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section4Item1')}</LegalListItem>
          <LegalListItem>{t('section4Item2')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 05. How We Package Orders */}
      <LegalSection id="section5" number={5} title={t('section5Title')}>
        <p>{t('section5Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section5Item1')}</LegalListItem>
          <LegalListItem>{t('section5Item2')}</LegalListItem>
          <LegalListItem>{t('section5Item3')}</LegalListItem>
        </ul>
        <div className="bg-[#fff1e6] rounded-2xl p-4 sm:p-5 border border-[#eddcd2] mt-3 flex items-start gap-3">
          <ThermometerSnowflake size={18} className="text-[#cb997e] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-[13px] text-[#20221c]/80 leading-relaxed font-sans">
            Lyophilized peptides stay stable at ambient temperature during standard transit. Once your order arrives, move it to the recommended storage (-20°C or colder) right away to preserve it long-term.
          </p>
        </div>
      </LegalSection>

      {/* 06. International Restrictions */}
      <LegalSection id="section6" number={6} title={t('section6Title')}>
        <p>{t('section6Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section6Item1')}</LegalListItem>
          <LegalListItem>{t('section6Item2')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 07. If a Shipment Arrives Damaged */}
      <LegalSection id="section7" number={7} title={t('section7Title')}>
        <p>{t('section7Intro')}</p>
        <ul className="space-y-3 pt-2">
          <LegalListItem>{t('section7Item1')}</LegalListItem>
          <LegalListItem>{t('section7Item2')}</LegalListItem>
        </ul>
      </LegalSection>

      {/* 08. Incorrect Shipping Addresses */}
      <LegalSection id="section8" number={8} title={t('section8Title')}>
        <ul className="space-y-3">
          <LegalListItem>{t('section8Item1')}</LegalListItem>
          <LegalListItem>{t('section8Item2')}</LegalListItem>
          <LegalListItem>{t('section8Item3')}</LegalListItem>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  )
}
