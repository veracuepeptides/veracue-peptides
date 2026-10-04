import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Lipo-C. Research-use-only copy: multi-component blend identity, how to verify composition, COA reading.
// Facts come from docs/product-contents-1/veracue-lipo-c. The source does not list Veracue's components,
// so none are named. Efficacy, marketing-context, ingredient-outcome and reference content is left out.

const NAME = 'Lipo-C'
const SLUG = 'lipo-c'

const SKU_CODE = 'LIPOC'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '120mg', image: 'VERACUE_Lipo_C_120mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificates page', href: '/certificates' }]

const SEO_TITLE = 'Lipo-C Research Blend (Multi-Component)'
const SEO_DESCRIPTION =
  "Lipo-C is a multi-component blend, so the lot specification tells you what is in the vial. See the COA guide. 120 mg, research use only."
const DESCRIPTION =
  "Lipo-C is a multi-component research blend, not a single molecule and not a peptide, so its identity comes from the product specification and lot documentation rather than the name alone. The source material discusses B12 forms (cyanocobalamin and methylcobalamin) as possible formulation variants, and other suppliers' Lipo-C formulas can differ from one another. Offered as a 120 mg vial for laboratory research use only, with ingredient forms and concentrations reported per lot."
function productDetails(): string {
  return [
    h4('What Is Lipo-C?'),
    p('Lipo-C is a name used for multi-component formulations rather than one defined molecule. It is not a single compound and not a peptide, so the name alone does not tell you what a product contains. Veracue supplies Lipo-C for laboratory research only.'),
    p('Search for Lipo-C and supplier listings, forum threads and reference pages all use the same name, but they are not always describing the same thing. There is no shared standard behind it, so each listing describes its own blend. That makes the name useful as a search term and unreliable as a specification.'),
    h4('Lipo-C at a Glance'),
    kvTable([
      ['Product name', 'Lipo-C'],
      ['Product type', 'Multi-component research formulation'],
      ['Size offered', '120 mg vial'],
      ['Research designation', 'Research Use Only'],
      ['Documentation', 'Certificates page, or contact Veracue for the documentation that applies to your material'],
    ]),
    p('The exact Veracue Lipo-C formulation should be confirmed against the applicable product specification and lot-specific documentation. Ingredient identities, forms, concentrations, volume, physical form and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Lipo-C Is Not'),
    ul([
      'Not a single molecule with a fixed structure.',
      'Not a peptide, since there is no single amino-acid sequence to cite.',
      'Not the same product from every supplier, because each defines its own blend.',
      'Not a drug, dietary supplement, food or cosmetic.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Composition and Identity'),
    h5('Is Lipo-C a peptide?'),
    p('No. A peptide is a defined chain of amino acids, while a multi-component formulation is a mixture of separate compounds. There is no single sequence and no single peptide molecular weight to cite. If first-party documentation for a specific lot says otherwise, that documentation governs.'),
    p('Lipo-C is often listed beside peptide products, so people pair the words and “Lipo-C peptide” is a common search phrase. It reflects how the material is listed, not how it is classified chemically.'),
    h5('Why is the name alone not enough?'),
    p('Two products called Lipo-C can differ in the ingredients they contain and the chemical forms used. They can also differ in how much of each is present and how the material is supplied. A researcher who records only “Lipo-C” in a lab notebook has recorded very little.'),
    h5('Two identities to keep apart'),
    p('The identity of the whole blend comes from a product specification and lot documentation. The identity of each ingredient comes from the reference data for that compound. Each answers a different question, and neither can stand in for the other. This matters most for reproducibility, because results cannot be traced back to a defined material when the composition is unclear.'),
    h5('What does “Lipo-C with B12” mean?'),
    p('It generally indicates a Lipo-C formulation that includes a vitamin B12 component, but the exact B12 form and concentration depend on the specific product specification. B12 is a family of related forms, including cyanocobalamin and methylcobalamin, so “B12” alone is not a complete identity. Whether a given formulation includes it, and in which form, should be confirmed from its documentation rather than assumed from the name.'),

    h4('What to Verify About the Composition'),
    table(
      ['What to verify', 'Why it matters'],
      [
        ['Ingredient name', 'Identifies the actual component'],
        ['Chemical form', 'Prevents ambiguity between related forms'],
        ['Concentration', 'Defines the quantity present'],
        ['Total volume or amount', 'Defines the supplied material'],
        ['Additional ingredients', 'Identifies the complete formulation'],
        ['Lot documentation', 'Connects the specification to a specific material'],
      ],
    ),
    p('Public listings use the Lipo-C name for different ingredient combinations and forms. Those differences are why the name alone is not a sufficient product specification.'),

    h4('Lipo-C vs. Other Research Materials'),
    table(
      ['Dimension', 'Lipo-C', 'Single-ingredient compound', 'Peptide'],
      [
        ['Identity', 'Set by the product specification; the name alone is not a complete identity', 'Usually defined by a reference identifier such as CAS or PubChem', 'Defined by its amino-acid sequence'],
        ['Composition', 'Several components; varies by formulation', 'One molecular entity', 'One defined chain'],
        ['Sequence', 'None; not a single chain', 'Not applicable', 'Fixed amino-acid sequence'],
        ['Documentation', 'Results for each component, plus lot documentation', 'Identity and assay for one compound, plus lot data', 'Sequence, mass and purity, plus lot data'],
      ],
    ),
    p('The table compares structure, not merit, since each category needs its own documentation.'),

    h4('Research Questions Worth Asking'),
    h5('Can another supplier’s Lipo-C formula stand in for this one?'),
    p('No. Another company’s ingredient list, concentrations or certificate describes that company’s product only. Public listings show, at most, that the name varies, and they should not be copied into a study record as if they described the material you hold.'),
    h5('How should ingredient-level literature be read?'),
    p('Match four things: the exact component, its chemical form, the model system and the endpoint measured. A study of one compound answers a question about that compound. It becomes relevant to a specific formulation only when the documented composition includes the component, and even then it stays ingredient-level information. Combination behavior has to be examined on the combination itself, because a blend can behave differently from its parts.'),
    h5('What should be recorded for reproducible work?'),
    p('Record the product name, specification version, lot number and receipt date. Add the ingredient list with forms and concentrations, physical form and COA reference from the applicable documentation. Where a field cannot be filled from documentation, mark it as unconfirmed rather than assuming, so the record shows exactly what was known when the work was done.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Lipo-C Certificate of Analysis'),
    p('For a blend, the useful question on any certificate is which components were measured, and how. A COA documents one lot, so read it as a set of linked facts.'),
    table(
      ['COA item', 'What to verify'],
      [
        ['Product name', 'Matches the material'],
        ['Lot number', 'Matches the supplied lot'],
        ['Tested components', 'Shows what was actually analyzed'],
        ['Method', 'Identifies the analytical approach'],
        ['Result', 'Shows the measured value'],
        ['Date', 'Identifies when testing occurred'],
        ['Laboratory', 'Identifies who performed the test'],
      ],
    ),
    p('A COA only supports the material, lot and tests it actually documents. An ingredient that does not appear on the certificate has not been confirmed by it. Compare the specification with the result rather than looking only for a pass mark.'),

    h4('Storage and Handling Records'),
    p('Product-specific storage and handling conditions are reported on the applicable Veracue documentation. Do not transfer storage conditions from another Lipo-C product or another Veracue product.'),

    h4('Ready to Check the Documentation?'),
    p('Review available reports on the certificates page. If your lot is not publicly listed, contact Veracue for the documentation that applies to your material.', {
      links: [
        { phrase: 'certificates page', href: '/certificates' },
        { phrase: 'contact Veracue', href: '/contact-us' },
      ],
    }),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
    p('Questions that apply to the whole catalog are answered on the Help & FAQ page.', { links: [{ phrase: 'Help & FAQ', href: '/faq' }] }),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Lipo-C is supplied for laboratory research only. It is not intended for human or veterinary use, is not a drug, dietary supplement, food, cosmetic or treatment, and is not intended for ingestion, injection or any form of administration. This page provides no dosing, administration or usage guidance. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Lipo-C?',
    answer: 'Lipo-C is a name used for multi-component research formulations. It is not a single molecule, and different suppliers use the name for different ingredient combinations, forms and concentrations. The product specification and lot documentation define what a particular product contains.',
  },
  {
    question: 'Is Lipo-C a peptide?',
    answer: 'No. A peptide is a defined amino-acid chain, whereas Lipo-C is a mixture of separate compounds with no single sequence. “Lipo-C peptide” is a common search phrase that reflects how the product is listed, not its chemistry.',
  },
  {
    question: 'What does Lipo-C contain?',
    answer: 'It depends on the formulation, and no single ingredient list applies to every product. The exact Veracue Lipo-C composition is confirmed against the product specification and lot documentation, which you can request through the contact page.',
  },
  {
    question: 'Is Lipo-C the same across suppliers?',
    answer: 'No. Ingredients, chemical forms, concentrations, total volume and physical form can all vary between suppliers. One supplier’s formula or certificate cannot describe another supplier’s material.',
  },
  {
    question: 'What does Lipo-C with B12 mean?',
    answer: 'It generally indicates a formulation that includes a vitamin B12 component. The exact B12 form and concentration depend on the specific product specification, so confirm them from the documentation.',
  },
  {
    question: 'Why do Lipo-C formulations differ?',
    answer: 'Because the name is not a universal formulation standard, each supplier decides which ingredients and chemical forms to use. The specification for each product is the only dependable reference.',
  },
  {
    question: 'Does ingredient-level information describe the full blend?',
    answer: 'No. Information about an individual ingredient does not automatically describe the complete Lipo-C formulation. A blend has to be assessed as a blend, with a defined composition.',
  },
  {
    question: 'How should I evaluate a Lipo-C COA?',
    answer: 'Check that the product name and lot number match your material, then look at the tested components, method, result, test date and laboratory. A COA only supports the material, lot and tests it documents.',
  },
  {
    question: 'How is Lipo-C different from a single-ingredient compound?',
    answer: 'A single-ingredient compound has one molecular identity that can be checked against a reference such as a CAS number. Lipo-C is a mixture, so its identity comes from a product specification and lot documentation.',
  },
  {
    question: 'What should I verify before laboratory use?',
    answer: 'Confirm the ingredient list with chemical forms and concentrations, the total volume or amount, physical form and any additional ingredients. Then check the lot number, COA contents, methods, test date and laboratory against Veracue documentation.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research and is not intended for human or veterinary use.',
  },
  {
    question: 'Does Veracue provide usage instructions for Lipo-C?',
    answer: 'No. Lipo-C is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Lipo-C',
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
