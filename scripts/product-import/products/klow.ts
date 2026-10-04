import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// KLOW (multi-component research blend). Research-use-only copy: blend identity, the components as the
// source names them, blend COA reading. Facts come from
// docs/product-contents-1/veracue-klow-product-page-FINAL.json; benefit, evidence-by-model, safety,
// regulatory, dosing and reference content is intentionally left out.

const NAME = 'KLOW'
const SLUG = 'klow'

const SKU_CODE = 'KLOW'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '80mg', image: 'VERACUE_KLOW_80mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'KLOW Research Blend (Multi-Component)'
const SEO_DESCRIPTION =
  "KLOW is a multi-component blend, not one peptide. Learn what a COA should confirm before you compare listings. 80 mg vial, research use only."
const DESCRIPTION =
  'KLOW is a multi-component research blend, not a single peptide, offered as an 80 mg vial. Listings that use the name most often describe four separate components: KPV (Lys-Pro-Val), GHK-Cu (the copper(II) complex of Gly-His-Lys), BPC-157 (a pentadecapeptide) and TB-500 (a thymosin beta-4 fragment or the full-length protein). Because it is a mixture, no single sequence or molecular weight applies to it, and it is easily confused with any one component or with the Glow blend. Supplied for laboratory research use only, not for human or veterinary use.'

function productDetails(): string {
  return [
    h4('What Is KLOW?'),
    p('KLOW is a blend name used in the research-peptide market, not a single peptide molecule. It labels several separate peptides supplied together in one vial, and each keeps its own identity inside the mixture. Veracue supplies it as an 80 mg research vial for laboratory use only.'),
    p('A single peptide name points to one sequence, one formula and one molecular weight. KLOW points to a mixture, so none of those apply to the blend as a whole. Combining the components does not create a new molecule.'),
    h4('KLOW at a Glance'),
    kvTable([
      ['Product name', 'KLOW (research blend)'],
      ['Product type', 'Multi-component research blend'],
      ['Size offered', '80 mg'],
      ['Components most often named in listings', 'KPV, GHK-Cu, BPC-157 and TB-500'],
      ['Single sequence or molecular weight', 'None applies, because the product is a mixture'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Component amounts, ratio, physical form, excipients, purity and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What KLOW Is Not'),
    ul([
      'Not a single peptide or one defined amino acid sequence.',
      'Not the same as any one of its components on its own.',
      'Not a standardized composition. Supplier blends sold under the same name can differ, so only the documentation for a specific lot describes that vial.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Component Identity'),
    p('The four components below are the ones most often named in listings that use the KLOW name. Each is a distinct molecule, and the descriptions cover identity only.'),
    h5('What is KPV?'),
    p('KPV is a tripeptide made of lysine, proline and valine. Its sequence corresponds to the C-terminal region of alpha-melanocyte-stimulating hormone.'),
    h5('What is GHK-Cu?'),
    p('GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine. It is a peptide-copper complex, not an unmodified peptide, so both the peptide identity and the copper content need to be specified.'),
    h5('What is BPC-157?'),
    p('BPC-157 is a synthetic pentadecapeptide, meaning a chain of fifteen amino acids. Its sequence corresponds to a partial sequence of a larger protein found in gastric juice.'),
    h5('What is TB-500?'),
    p('TB-500 is a market term whose meaning can vary between suppliers. It can refer to a short synthetic fragment of thymosin beta-4 or, in some listings, to the full-length protein. The exact species should be taken from the product documentation or lot-specific analytical record rather than assumed from the label.'),
    table(
      ['Component', 'Molecular class', 'Identity note'],
      [
        ['KPV', 'Tripeptide (Lys-Pro-Val)', 'Corresponds to the C-terminal region of alpha-melanocyte-stimulating hormone'],
        ['GHK-Cu', 'Peptide-copper complex', 'Copper(II) complex of Gly-His-Lys; copper content is its own measurement'],
        ['BPC-157', 'Pentadecapeptide', 'Synthetic; partial sequence of a larger protein found in gastric juice'],
        ['TB-500', 'Thymosin beta-4 fragment or full-length protein', 'Species varies between suppliers and should be confirmed from lot documentation'],
      ],
    ),

    h4('Research Context'),
    h5('Does research on one component describe the blend?'),
    p('No. Each component has its own separate literature, tied to its own models and materials. A finding for one peptide answers a question about that peptide, not about a four-component mixture, and no direct study of the KLOW combination was identified. Nothing here describes a combined effect.'),
    h5('Is KLOW the same as Glow?'),
    p('Not necessarily. KLOW and Glow are market blend names whose compositions can vary by supplier. Market usage often distinguishes KLOW by the addition of KPV, but that is not a universal formulation, so compare documentation rather than names.'),
    h5('What can and cannot this page tell me?'),
    p('It gives molecular identity and general research context for the components most often associated with the name. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a KLOW Certificate of Analysis'),
    p('A blend certificate has to answer more questions than a single-peptide one, because one headline number cannot describe several molecules. It should name the lot, identify every component and make clear which component each result refers to. Identity and purity are different measurements produced by different methods, and both should be named rather than implied.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to one production lot', 'Anything at all unless it matches the vial label'],
        ['Component identities', 'Which molecules the report says are present', 'That each is present at the stated amount'],
        ['Component-level results', 'How each individual component performed under test', 'Blend-level behavior in solution'],
        ['Named analytical methods', 'How each result was produced and under what conditions', 'Comparability with a result produced under different conditions'],
        ['HPLC purity', 'Share of detected signal in the stated peak or peaks', 'Identity or component amounts'],
        ['Mass spectrometry and identity data', 'Whether observed masses match the expected species', 'Purity, or how much material is present'],
        ['Purity scope (blend or component)', 'Whether the number covers the mixture or one ingredient', 'Component-level certainty, if the figure is blend-level'],
        ['Testing laboratory and date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
        ['Formulation and net content', 'What else is in the vial and how much material it holds', 'How that content divides across components'],
      ],
    ),
    p('A generic certificate for one component does not prove the identity, composition or purity of the finished blend. Certificates vary between laboratories, so treat this as what a COA may include, and see the certificate page for how lot documentation is published.', { links: CERT }),

    h4('Analytical Notes for a Multi-Component Blend'),
    p('HPLC helps assess chromatographic purity, and mass spectrometry helps assess molecular identity and mass. Neither one alone establishes every aspect of quality. In a blend, each component should have its own identity result and its own method.'),
    p('The components do not share analytical behavior. A small tripeptide, a copper complex, a fifteen-residue peptide and a thymosin beta-4 fragment or larger protein differ in size and chemistry. For the copper complex, copper content should be confirmed as its own measurement rather than assumed from the peptide result alone.'),

    h4('Verification Questions, Answered'),
    h5('Does the COA identify every component?'),
    p('It should. If a component is missing from the report, its presence is not confirmed by that document.'),
    h5('Does the lot number match the vial?'),
    p('Check it against the label. A report only describes the lot it names.'),
    h5('Is the purity blend-level or component-level?'),
    p('The report should say which. A single blended percentage can hide a shortfall in one component, so a value for each is more informative.'),
    h5('What if a field is not on the certificate?'),
    p('Then it is not confirmed. Physical form, storage conditions and other formulation details are reported on each lot’s documentation, and you can ask for anything missing through the contact page.', { links: CONTACT }),

    h4('Need lot documentation for KLOW?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li><li><a href="/faq">Read the FAQ</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('KLOW is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, cosmetic, supplement or food, and it is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. Handle the material as a laboratory chemical, with appropriate protective equipment and institutional safety practice. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is KLOW?',
    answer: 'KLOW is a blend name used in the research-peptide market, not a single peptide molecule or a defined amino acid sequence. It describes several separate peptides supplied together in one vial, each keeping its own identity.',
  },
  {
    question: 'Is KLOW a single peptide?',
    answer: 'No. KLOW names a mixture, so it has no single sequence, formula or molecular weight. Each component remains a distinct molecular species.',
  },
  {
    question: 'What is in KLOW?',
    answer: 'Listings that use the name most often describe four components: KPV, GHK-Cu, BPC-157 and TB-500. Component amounts and ratio are reported on each lot’s documentation and can be requested through the contact page.',
  },
  {
    question: 'What size does KLOW come in?',
    answer: 'The vial is offered at 80 mg. That figure describes the vial, and it does not state how the material divides between components.',
  },
  {
    question: 'Is the KLOW composition standardized?',
    answer: 'No. Supplier compositions can differ under the same blend name, so only the documentation for a specific lot describes that vial.',
  },
  {
    question: 'Have the KLOW components been studied together?',
    answer: 'No direct controlled study of the combination was identified. Each component has its own separate literature, and a result for one does not describe the mixture.',
  },
  {
    question: 'How is KLOW different from Glow?',
    answer: 'Both are market blend names whose compositions can vary by supplier. Market usage often distinguishes KLOW by the addition of KPV, but that is not a universal formulation.',
  },
  {
    question: 'Why is GHK-Cu identified separately in a blend?',
    answer: 'Because it is a peptide-copper complex, not an unmodified peptide. Its peptide identity and its copper content are separate things to confirm.',
  },
  {
    question: 'What does TB-500 mean in a KLOW listing?',
    answer: 'It is a market term that can refer to a short thymosin beta-4 fragment or to the full-length protein. The exact species should be confirmed from lot documentation.',
  },
  {
    question: 'What should a KLOW COA contain?',
    answer: 'It should state the lot number, identify every component, name the method behind each result, say whether purity is blend-level or component-level, and give the testing laboratory and date. A certificate for one component alone does not prove the finished blend.',
  },
  {
    question: 'Does Veracue provide usage instructions for KLOW?',
    answer: 'No. KLOW is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'KLOW',
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
