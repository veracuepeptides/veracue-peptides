// Shared between ContactClient.tsx (client component, renders the FAQ accordion) and
// page.tsx (server component, builds the FAQPage JSON-LD). Lives in its own plain module
// because Next's App Router doesn't reliably expose non-component named exports across
// the client/server boundary.
export const CONTACT_FAQS = [
  {
    question: 'How quickly will a scientific specialist respond to my inquiry?',
    answer:
      'Most inquiries receive a technical response from our scientific team within about 2 hours. Urgent requests are monitored continuously by our on-call analytical team.',
  },
  {
    question: 'Can I request lot-specific HPLC chromatograms prior to purchasing?',
    answer:
      'Yes. Every synthesis batch produced for Veracue is accompanied by third-party RP-HPLC and ESI Mass Spectrometry reports. You can request any lot-specific chromatogram by emailing support@veracuepeptides.com or specifying the compound in the inquiry form.',
  },
  {
    question: 'Do you accommodate university purchase orders (POs) and institutional billing?',
    answer:
      'Yes. We actively support university biochemistry laboratories, contract research organizations (CROs), and institutional departments with formal Net-30 invoice billing, custom volume quotes, and W-9 tax documentation on request.',
  },
  {
    question: 'How are research peptides packaged and shipped?',
    answer:
      'All peptide compounds are packaged as lyophilized powders in vacuum-sealed vials under inert argon gas to eliminate oxidation. Shipments are packed inside custom insulated thermal boxes with refrigerant gel packs to preserve compound structural integrity.',
  },
  {
    question: 'Are Veracue peptide compounds approved for clinical or diagnostic use?',
    answer:
      'No. All compounds offered by Veracue Peptides are supplied strictly for in-vitro laboratory research and analytical chemistry evaluation. Products are strictly labeled Research Use Only (RUO) and may not be used for medical diagnosis, veterinary, or clinical applications.',
  },
]
