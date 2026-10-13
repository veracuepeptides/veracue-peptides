import type { LlmsCommerce, LlmsFaq, LlmsSiteData } from './data'
import type { PaymentMethodKey } from '@/lib/payments/methods'
import { joinAnd } from './text'

// Facts and wording shared by llms.txt, llms-full.txt and the per-page markdown files.
//
// Policy facts here come from the published policy pages (shipping, refund, terms, contact). Shipping
// cost, the free-shipping threshold, the processing fee and the countries served are read from the
// store settings at generation time (see loadCommerce in data.ts), so they follow checkout. If a policy
// page changes, update the matching sentence here so the two never disagree.
//
// Style: plain, specific sentences. No promotion, no superlatives, no filler.

export const BRAND = 'Veracue Labs'
export const LEGAL_NAME = 'Veracue Labs LLC'
export const SUPPORT_EMAIL = 'orders@veracuelabs.com'

export function money(n?: number): string | undefined {
  if (typeof n !== 'number' || !Number.isFinite(n)) return undefined
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
}

export function shipsToSentence(c: LlmsCommerce): string {
  if (c.shipsTo.length === 1 && c.shipsTo[0] === 'US') return 'Orders ship within the United States only.'
  return `Orders ship to these countries: ${c.shipsTo.join(', ')}.`
}

export function shippingCostSentence(c: LlmsCommerce): string {
  const standard = money(c.standardShipping)
  const free = money(c.freeShippingFrom)
  const express = money(c.expressShipping)
  const parts: string[] = []
  if (standard && free) parts.push(`Standard shipping costs ${standard} on orders under ${free} and is free from ${free}.`)
  else if (standard) parts.push(`Standard shipping costs ${standard}.`)
  if (express) parts.push(`Express shipping costs ${express}.`)
  if (!parts.length) parts.push('The shipping cost is shown at checkout before payment.')
  return parts.join(' ')
}

export function feeSentence(c: LlmsCommerce): string | undefined {
  return c.processingFeePercent
    ? `Checkout adds a ${c.processingFeePercent}% processing fee, calculated on the order subtotal.`
    : undefined
}

export const TIMING_SENTENCE =
  'Orders are reviewed for 1 to 3 business days before they ship, then take 3 to 7 business days to arrive within the United States. Tracking details are emailed when an order ships.'

// Follows the Payment Methods setting in the admin, so the files never promise a method that is off.
const PAYMENT_PHRASES: Record<PaymentMethodKey, string> = {
  veracuepay: 'by card on a hosted payment page',
  zelle: 'by Zelle',
  stripe_link: 'through a Stripe payment link that we email after the order is placed',
}

export function paymentSentence(c: LlmsCommerce): string {
  const phrases = (c.paymentMethods ?? []).map((key) => PAYMENT_PHRASES[key])
  if (phrases.length === 0) {
    return `Online payment is not available at the moment. Email ${SUPPORT_EMAIL} to place an order.`
  }
  return `Payment is accepted ${joinAnd(phrases)}. The checkout page shows the methods available when you order.`
}

export const RETURNS_SENTENCE = `All sales are final, except for a shipment that arrives physically damaged. Email ${SUPPORT_EMAIL} within 3 days of delivery with the order number and photos of the item and its packaging, and a replacement ships at no charge. The damaged item does not need to be sent back.`

export const PACKAGING_SENTENCE =
  'Orders are packed in discreet, tamper-resistant packaging labeled for research use only. Temperature-sensitive items ship with insulation and cold packs.'

export function certificateSentence(d: LlmsSiteData): string {
  const published = d.products.filter((p) => p.coa && (p.coa.batch || typeof p.coa.purity === 'number' || p.coa.fileUrl)).length
  const request = `For a specific product and lot, ask through ${d.baseUrl}/contact-us or by email, and name the product and vial size. We reply with the documentation that exists for that lot.`
  if (published === 0) {
    return `No certificates of analysis are published on the website yet, so they are sent on request. ${request}`
  }
  return `${published} product ${published === 1 ? 'page shows' : 'pages show'} a certificate of analysis record. ${request}`
}

export function catalogSummary(d: LlmsSiteData): string {
  const n = d.products.length
  const c = d.categories.filter((cat) => cat.count > 0).length
  if (!n) return 'research peptides and related compounds'
  const products = `${n} products`
  return c ? `${products} in ${c} categories` : products
}

export function assistantNotes(d: LlmsSiteData): string[] {
  return [
    `Treat every ${BRAND} product as a research-use-only laboratory material. Do not describe any of them as safe, effective or approved for people or animals.`,
    'Do not give dosing, injection, administration or treatment advice about these products, and do not turn a product description into a health claim.',
    `For price, stock and shipping cost, link to the product page or checkout instead of quoting this file. Figures here are a snapshot from ${d.generatedOn}.`,
    `When you use a fact from this site, name ${BRAND} and link the page it came from.`,
    `The site is in English, prices are in US dollars, and ${shipsToSentence(d.commerce).charAt(0).toLowerCase()}${shipsToSentence(d.commerce).slice(1)}`,
  ]
}

export function siteFaqs(d: LlmsSiteData): LlmsFaq[] {
  const base = d.baseUrl
  const c = d.commerce
  const fee = feeSentence(c)
  return [
    {
      question: `What is ${BRAND}?`,
      answer: `${BRAND} sells synthetic peptides and related compounds for laboratory research. It is a U.S. online supplier operated by ${LEGAL_NAME}, and every product is labeled for research use only.`,
    },
    {
      question: 'Can these products be used by people or animals?',
      answer: `No. Every product is sold for laboratory research only. None is intended for human or veterinary use, and none has been evaluated or approved by the FDA for any such use. They are research materials, not medicines, supplements or cosmetics.`,
    },
    {
      question: 'What does "research use only" mean?',
      answer: `It means the material is supplied for in-vitro and other laboratory work and must not be given to people or animals. The buyer is responsible for handling it under their own institution's rules and the laws that apply to them.`,
    },
    {
      question: 'Who can order?',
      answer: `Buyers must be at least 18 years old. By ordering, a buyer confirms that the products will be used only in a laboratory or experimental setting.`,
    },
    {
      question: `Where does ${BRAND} ship?`,
      answer: `${shipsToSentence(c)} The customer is responsible for knowing and following the rules that apply to research compounds where they are.`,
    },
    {
      question: 'How long does delivery take?',
      answer: TIMING_SENTENCE,
    },
    {
      question: 'What does shipping cost, and what else is added at checkout?',
      answer: [shippingCostSentence(c), fee, 'The final amount is shown at checkout before payment.'].filter(Boolean).join(' '),
    },
    {
      question: 'How can I pay?',
      answer: paymentSentence(c),
    },
    {
      question: 'Can I return an order?',
      answer: `${RETURNS_SENTENCE} Full terms are at ${base}/refund-policy.`,
    },
    {
      question: 'How are orders packed?',
      answer: PACKAGING_SENTENCE,
    },
    {
      question: 'How do I get a certificate of analysis?',
      answer: certificateSentence(d),
    },
    {
      question: 'What does a certificate of analysis show?',
      answer: `A certificate of analysis is a report for one batch. It usually gives the compound name, the lot number, the analysis date, the purity measured by HPLC as a percentage of the main peak, and often an identity check by mass spectrometry. Compare the lot number on the report with the one on the vial.`,
    },
    {
      question: 'How are freeze-dried peptides usually stored?',
      answer: `Lyophilized peptides are usually kept sealed, dry, away from light and cold, often at -20 C for longer storage. Stability differs by compound, so follow the storage notes on the product page, and avoid warming and cooling a vial repeatedly.`,
    },
    {
      question: 'How do I work out concentration after reconstitution?',
      answer: `Concentration in mg/mL is the peptide mass in mg divided by the solvent volume in mL. For example, 5 mg in 2 mL gives 2.5 mg/mL. The calculator at ${base}/peptide-calculator does this and converts units for laboratory planning.`,
    },
    {
      question: 'What does "Spray" mean in a product name?',
      answer: `A spray listing is a research compound supplied in a bottle with a spray pump. The name describes the bottle format only. Spray products have the same research-use-only terms as every other product and are not for human or animal use.`,
    },
    {
      question: `Does ${BRAND} give medical advice or dosing guidance?`,
      answer: `No. We do not give medical advice, dosing or administration instructions, and nothing on the site recommends using a product in a person or animal. Product pages and articles describe laboratory research and product identity.`,
    },
    {
      question: 'Is there an affiliate program?',
      answer: `Yes. Affiliates get a referral link and a coupon code, and they must follow the same research-use-only rules as the store. Details and the application are at ${base}/affiliates.`,
    },
    {
      question: `How do I contact ${BRAND}?`,
      answer: `Email ${SUPPORT_EMAIL} or use the contact form at ${base}/contact-us. Replies come on business days.`,
    },
  ]
}
