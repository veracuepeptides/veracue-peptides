// Shared between FaqSection.tsx (client component, renders the on-page FAQ accordion) and
// page.tsx (server component, builds the FAQPage JSON-LD) so both pull the exact same set of
// FAQ items from the exact same translation keys — they can never drift out of sync.
// Lives in its own plain module (not re-exported from a 'use client' file) because Next's App
// Router doesn't reliably expose non-component named exports across the client/server boundary.
export const FAQ_KEYS = [
  'ruoPeptide',
  'researchGradePurity',
  'coaContents',
  'massSpecIdentity',
  'lyophilizedStorage',
  'assayDevelopment',
  'commonImpurities',
  'receptorBindingStudies',
  'vendorQuestions',
  'supplierLegitimacy',
]
