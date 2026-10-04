import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Lipo-C Spray: the same multi-component research blend documented on the live Lipo-C vial listing
// (scripts/product-import/lipo-c.ts), offered here in Veracue's spray-dispensed packaging format.
// The vial listing does not name Veracue's components, so none are named here either; that source is
// treated as the single source of truth and is not second-guessed or changed. Composition-adjacent
// facts (that Lipo-C is a multi-component formulation, not a peptide, and that the source material
// discusses B12 forms as possible formulation variants without confirming them) are reused unchanged
// from the vial page. Everything else is written fresh and focused on what "Spray" means as a
// packaging/dispensing descriptor for a blend, lot verification for this format, and format-specific
// comparisons. Research-use-only copy only: no weight-loss, fat-metabolism, energy, appetite or
// dosing content, consistent with scripts/product-import/lipo-c.ts.

const NAME = 'Lipo-C Spray'
const SLUG = 'lipo-c-spray'

const SKU_CODE = 'LIPOC-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '120mg', image: 'VERACUE_Spray_Lipo_C_120mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const LIPOC_LINK = [{ phrase: 'Lipo-C vial listing', href: '/product/lipo-c' }]

const SEO_TITLE = 'Lipo-C Spray Research Blend'
const SEO_DESCRIPTION =
  "Lipo-C Spray packages Veracue's multi-component research blend in a spray-top bottle; composition is set by lot documentation, laboratory research only."
const DESCRIPTION =
  'Lipo-C Spray is Veracue’s spray-dispensed form of Lipo-C, a name used across the research market for multi-component formulations rather than one defined molecule. Which ingredients a given Lipo-C blend contains, including whether it carries a B12 component such as cyanocobalamin or methylcobalamin, depends on the specific product specification, not on the name alone. Identity and composition for this listing come from Veracue’s own documentation rather than from general market usage of the name. Supplied as a 120 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Lipo-C Spray?'),
    p('Lipo-C Spray is Veracue’s spray-dispensed packaging of Lipo-C, a multi-component research formulation. The underlying formulation is the same one documented on Veracue’s Lipo-C vial listing; only the packaging and dispensing format differ between the two listings.', { links: LIPOC_LINK }),
    p('Lipo-C is not one defined molecule and not a peptide, so the name alone does not tell you what either listing contains. Search for Lipo-C and supplier pages, forum threads and reference pages all use the same name, but they are not always describing the same thing, which makes the name useful as a search term and unreliable as a specification.'),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Ingredient identities, forms, concentrations, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Lipo-C Spray at a Glance'),
    kvTable([
      ['Product name', 'Lipo-C Spray'],
      ['Product type', 'Multi-component research formulation'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Size offered', '120 mg'],
      ['Research designation', 'Research Use Only'],
      ['Documentation', 'Certificates page, or contact Veracue for the documentation that applies to your material'],
    ]),
    h4('Why a Separate Listing for the Same Blend?'),
    p('Veracue lists Lipo-C in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Lipo-C Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a single molecule with a fixed structure, and not a peptide, since there is no single amino-acid sequence to cite.',
      'Not a different formulation from the Lipo-C documented on the vial listing.',
      'Not the same product as every other supplier’s Lipo-C, because each defines its own blend.',
      'Not a drug, dietary supplement, food or cosmetic.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Composition and Identity, Carried Over From the Vial Listing'),
    p('Lipo-C Spray and Veracue’s Lipo-C vial listing describe the same formulation. Packaging format has no bearing on what a blend contains, so identity questions are answered the same way for both listings.', { links: LIPOC_LINK }),
    h5('Does the spray format change the composition?'),
    p('No. The formulation reported under this listing is the same one reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not what is combined inside it.'),

    h4('Is Lipo-C Spray a Peptide?'),
    p('No. A peptide is a defined chain of amino acids, while a multi-component formulation is a mixture of separate compounds. There is no single sequence and no single molecular weight to cite for Lipo-C Spray, in either packaging format. If first-party documentation for a specific lot says otherwise, that documentation governs.'),
    p('Lipo-C is often listed beside peptide products, so people pair the words and "Lipo-C peptide" is a common search phrase. It reflects how the material is listed, not how it is classified chemically.'),

    h4('Two Identities to Keep Apart'),
    p('The identity of the whole formulation comes from a product specification and lot documentation. The identity of each ingredient comes from the reference data for that compound. Each answers a different question, and neither can stand in for the other, regardless of whether the formulation is packaged as a vial or as a spray-dispensed bottle.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers, and it matters more for a multi-component formulation than for a single compound, since a packaging claim could otherwise be mistaken for a statement about which ingredients are present or in what concentration.'),

    h4('What Does "Lipo-C with B12" Mean?'),
    p('It generally indicates a Lipo-C formulation that includes a vitamin B12 component, but the exact B12 form and concentration depend on the specific product specification. B12 is a family of related forms, including cyanocobalamin and methylcobalamin, so "B12" alone is not a complete identity. Whether a given formulation includes it, and in which form, should be confirmed from its documentation rather than assumed from the name, and that holds equally for the spray and vial listings.'),

    h4('Lipo-C Spray vs. Other Research Materials'),
    table(
      ['Dimension', 'Lipo-C Spray', 'Single-ingredient compound', 'Peptide'],
      [
        ['Identity', 'Set by the product specification regardless of packaging; the name alone is not a complete identity', 'Usually defined by a reference identifier such as CAS or PubChem', 'Defined by its amino-acid sequence'],
        ['Composition', 'Several components; varies by formulation', 'One molecular entity', 'One defined chain'],
        ['Packaging formats Veracue offers', 'Vial and spray', 'Varies by listing', 'Varies by listing'],
        ['Documentation', 'Results for each component, plus lot documentation', 'Identity and assay for one compound, plus lot data', 'Sequence, mass and purity, plus lot data'],
      ],
    ),
    p('The table compares structure, not merit, since each category needs its own documentation and packaging format does not change which column a listing belongs in.'),

    h4('Research Questions Worth Asking'),
    h5('Can another supplier’s Lipo-C formula stand in for this one?'),
    p('No. Another company’s ingredient list, concentrations or certificate describes that company’s product only. Public listings show, at most, that the name varies, and they should not be copied into a study record as if they described the material you hold, whether that material arrived as a vial or as a spray-dispensed bottle.'),
    h5('What should be recorded for reproducible work?'),
    p('Record the product name, packaging format, specification version, lot number and receipt date. Add the ingredient list with forms and concentrations, physical form and COA reference from the applicable documentation. Where a field cannot be filled from documentation, mark it as unconfirmed rather than assuming, so the record shows exactly what was known when the work was done.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Lipo-C Spray Certificate of Analysis'),
    p('For a multi-component formulation, the useful question on any certificate is which components were measured, and how. A COA documents one lot, so read it as a set of linked facts, and packaging format has no bearing on which analytical methods apply.'),
    table(
      ['COA item', 'What to verify'],
      [
        ['Product name', 'Matches the material and the packaging format received'],
        ['Lot number', 'Matches the supplied lot'],
        ['Tested components', 'Shows what was actually analyzed'],
        ['Method', 'Identifies the analytical approach'],
        ['Result', 'Shows the measured value'],
        ['Date', 'Identifies when testing occurred'],
        ['Laboratory', 'Identifies who performed the test'],
      ],
    ),
    p('A COA only supports the material, lot and tests it actually documents. An ingredient that does not appear on the certificate has not been confirmed by it. Compare the specification with the result rather than looking only for a pass mark.'),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a formulation in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, each tested component’s chemical form, analytical result with the method used, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Storage and Handling Records'),
    p('Product-specific storage and handling conditions are reported on the applicable Veracue documentation. Do not transfer storage conditions from the Lipo-C vial listing to this spray-format listing, or from another Veracue product, since container and fill details differ by format.'),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: do the tested components match the specification, and is each result paired with a method and a lot number from the same batch. Packaging format does not change what counts as adequate documentation.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form of each tested component, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),

    h4('Need Lot Documentation for Lipo-C Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Lipo-C Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, is not a drug, dietary supplement, food or cosmetic, and is not intended for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Lipo-C Spray?',
    answer: 'Lipo-C Spray is Veracue’s spray-dispensed packaging of Lipo-C, a multi-component research formulation. It is not a single molecule, and the product specification and lot documentation define what a particular lot contains.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the formulation in Lipo-C Spray different from the Lipo-C vial listing?',
    answer: 'No. Both listings describe the same multi-component formulation. Only the packaging format differs between the spray-dispensed listing and the vial listing.',
  },
  {
    question: 'Is Lipo-C Spray a peptide?',
    answer: 'No. A peptide is a defined amino-acid chain, whereas Lipo-C is a mixture of separate compounds with no single sequence. "Lipo-C peptide" is a common search phrase that reflects how the product is listed, not its chemistry.',
  },
  {
    question: 'What does Lipo-C Spray contain?',
    answer: 'It depends on the formulation, and no single ingredient list applies to every product sold under this name. The exact Veracue composition is confirmed against the product specification and lot documentation, which can be requested through the contact page.',
  },
  {
    question: 'Is Lipo-C the same across suppliers?',
    answer: 'No. Ingredients, chemical forms, concentrations, total volume and physical form can all vary between suppliers. One supplier’s formula or certificate cannot describe another supplier’s material.',
  },
  {
    question: 'What does "Lipo-C with B12" mean?',
    answer: 'It generally indicates a formulation that includes a vitamin B12 component. The exact B12 form, such as cyanocobalamin or methylcobalamin, and its concentration depend on the specific product specification, so confirm them from the documentation.',
  },
  {
    question: 'Why does Veracue list Lipo-C in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Lipo-C Spray characterized?',
    answer: 'The same way as any Lipo-C lot: each tested component is checked against its own analytical method and the result is paired with a lot number. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Lipo-C Spray certificate of analysis include?',
    answer: 'It should state which components were tested, the chemical form of each, the analytical method and result, and the lot number, laboratory and test date, with the lot number matching the container received.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Lipo-C Spray?',
    answer: 'No. Lipo-C Spray is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Lipo-C Spray',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
