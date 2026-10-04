import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// AHK-Cu (copper tripeptide-3). Research-use-only copy: molecular identity, form-dependent molecular
// weights, CAS note, COA reading. Facts come from docs/product-contents-1/veracue-ahk-cu-product-page.json;
// the study section, evidence map, hair, follicle, skin and repair content, references and internal notes
// are intentionally left out.

const NAME = 'AHK-Cu'
const SLUG = 'ahk-cu'

const SKU_CODE = 'AHKCU'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '50mg', image: 'VERACUE_AHK_Cu_50mg.jpg' },
  { strength: '100mg', image: 'VERACUE_AHK_Cu_100mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'AHK-Cu Research Peptide (Ala-His-Lys)'
const SEO_DESCRIPTION =
  "AHK-Cu has a different molecular weight for each form, from 354.41 to 452.40 g/mol, so check the form on your COA. 50 and 100 mg, research use only."
const DESCRIPTION =
  'AHK-Cu is a copper(II) complex of the tripeptide alanyl-histidyl-lysine (Ala-His-Lys), also listed as Copper Tripeptide-3. Its molecular weight depends on the form: 354.41 g/mol for the free peptide, 415.94 for the neutral complex (C15H24CuN6O4) and 451.39 for a hydrochloride form, with CAS 682809-81-0 commonly listed by suppliers. It is easy to mix up with GHK-Cu, which starts with glycine instead of alanine. Veracue offers AHK-Cu in 50 mg and 100 mg vials for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is AHK-Cu?'),
    p('AHK-Cu is a small copper peptide: the tripeptide alanine-histidine-lysine bound to a copper(II) ion. The name is the one-letter codes of the three amino acids plus the metal. It is supplied by Veracue for laboratory research only, in 50 mg and 100 mg vials.'),
    p('Ingredient suppliers commonly list it as Copper Tripeptide-3, which keeps it distinct from Copper Tripeptide-1, the name used for GHK-Cu.'),
    h4('AHK-Cu at a Glance'),
    kvTable([
      ['Name', 'AHK-Cu'],
      ['Other names', 'Copper Tripeptide-3; Ala-His-Lys-Cu; L-alanyl-L-histidyl-L-lysine copper(II)'],
      ['Peptide sequence', 'Ala-His-Lys (A-H-K), three amino acids'],
      ['Metal', 'Copper(II)'],
      ['Closest relative', 'GHK-Cu (Gly-His-Lys copper), differing only in the first amino acid'],
      ['Molecular weight', 'Form-dependent, see the molecular form table'],
      ['Sizes offered', '50 mg and 100 mg vials'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical form, appearance, purity, molecular form, formula, molecular weight, CAS number and storage conditions for a given vial are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What AHK-Cu Is Not'),
    ul([
      'Not the same as GHK-Cu, which starts with glycine instead of alanine.',
      'Not the same as the free AHK peptide, which has no copper.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity and Composition'),
    h5('What is the peptide portion?'),
    p('The peptide portion is L-alanyl-L-histidyl-L-lysine. Chemical database nomenclature for the copper complex describes copper(II) bound through nitrogen atoms of the alanine terminus and the histidine residue, with two of the peptide’s N-H protons removed as the metal binds.'),
    h5('Why do published molecular weights for AHK-Cu differ?'),
    p('There is no single molecular weight for AHK-Cu that applies to every product. Published values differ because sources describe different forms: the free peptide, the copper complex written with different proton counts, or a hydrochloride salt. PubChem’s AHK-Cu record (CID 168431292) is a hydrochloride-associated entry. The table shows how each common representation produces a different number, so a COA or catalogue value can be matched to the form it describes.'),
    table(
      ['Representation', 'Formula', 'Molecular weight (g/mol)', 'Where you will see it'],
      [
        ['Uncomplexed tripeptide (AHK, no copper)', 'C15H26N6O4', '354.41', 'Peptide-only calculations'],
        ['Neutral Cu(II) complex, two N-H protons removed', 'C15H24CuN6O4', '415.94', 'Some catalogue listings (about 416)'],
        ['Cu(II) complex written with one additional proton', 'C15H25CuN6O4', '416.95', 'Common "about 416.9" listing value'],
        ['Hydrochloride form, PubChem CID 168431292 formula', 'C15H24ClCuN6O4', '451.39', 'PubChem and several supplier pages'],
        ['Hydrochloride form, alternative hydrogen count', 'C15H25ClCuN6O4', '452.40', 'Some chemical supplier listings'],
      ],
    ),
    p('Weights are calculated from standard atomic weights (C 12.011, H 1.008, N 14.007, O 15.999, Cl 35.45, Cu 63.546). Hydrates and other counter-ions would change these values again. The molecular form, formula and molecular weight for a given vial are reported on that lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h5('What about the CAS number?'),
    p('CAS 682809-81-0 is widely listed by suppliers for AHK-Cu, and at least one chemical supplier assigns it specifically to the hydrochloride while listing a separate CAS for the free base. Because suppliers attach these numbers to different forms, a CAS number is only meaningful when it is tied to the exact form stated on a lot’s documentation.'),

    h4('Research Context'),
    h5('Where is AHK-Cu used in the laboratory?'),
    p('Typical contexts are cell-culture and tissue-culture work, copper-peptide chemistry and analytical method development. The material is offered for in vitro and laboratory research only.'),
    h5('How does AHK-Cu compare with GHK-Cu?'),
    p('AHK-Cu and GHK-Cu are not the same compound. Both are copper(II) complexes of a tripeptide ending in histidine-lysine, but AHK-Cu starts with alanine and GHK-Cu starts with glycine. AHK-Cu is commonly listed as Copper Tripeptide-3 and GHK-Cu as Copper Tripeptide-1.'),
    table(
      ['Attribute', 'AHK-Cu', 'GHK-Cu'],
      [
        ['Sequence', 'Ala-His-Lys + Cu(II)', 'Gly-His-Lys + Cu(II)'],
        ['Common ingredient name', 'Copper Tripeptide-3', 'Copper Tripeptide-1'],
        ['First amino acid', 'Alanine', 'Glycine'],
      ],
    ),
    p('Findings reported for one should not be assumed to apply to the other.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general research context. It cannot establish what is in a particular vial, and a purity figure does not establish sterility or biological activity either. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an AHK-Cu Certificate of Analysis'),
    p('A purity percentage on its own answers only one question. A useful AHK-Cu COA should let you confirm what the material is, how pure it is by a stated method, how much is actually in the vial, and that the report belongs to the lot you received.'),
    p('Copper complexes add a wrinkle: the expected mass and molecular weight depend on whether a result refers to the free peptide, the copper complex or a salt form. A report should state which species its identity result was matched against.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to a specific production lot', 'Anything about quality unless it matches the vial label'],
        ['HPLC purity (%)', 'The share of detected signal in the main peak under the stated method conditions', 'Identity, net peptide content, water or counter-ion content, sterility, endotoxin level or biological activity'],
        ['Mass spectrometry / LC-MS', 'Whether an observed mass is consistent with the expected species', 'Purity, or the amount of material present'],
        ['Net peptide content', 'How much of the vial’s mass is peptide rather than salts, water or other components', 'Chromatographic purity'],
        ['Copper content (if tested)', 'Whether copper is present at the expected ratio to peptide', 'Purity of the peptide portion'],
        ['Stated form and formula', 'Which molecular weight applies to the material', 'Identity by itself, since it must be supported by analytical data'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
        ['Additional panels (endotoxin, microbial, heavy metals, residual solvents)', 'Results for those specific attributes, only where listed', 'Any attribute that was not tested'],
      ],
    ),
    h4('Quick COA Check'),
    ul([
      'Lot number on the COA matches the vial label',
      'Purity method is named, not just a percentage',
      'Identity result states the expected and observed values and the species matched',
      'Molecular form (free complex, hydrochloride, other) is stated',
      'Testing laboratory and date are shown',
      'Any extra panels are reported with results, not just listed as tested',
    ]),
    p('Store according to the conditions stated on the lot’s documentation and label, and handle the material as a laboratory chemical using appropriate personal protective equipment. The certificate page explains how to see lot documentation.', { links: CERT }),
    h4('Need the documentation for an AHK-Cu lot?'),
    p('Ask the Veracue team for the documentation that belongs to a specific lot, or look through the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('AHK-Cu supplied by Veracue is intended solely for laboratory research. It is not a drug, cosmetic, dietary supplement or food, and it must not be given to humans or animals. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is AHK-Cu?',
    answer: 'AHK-Cu is the copper(II) complex of the tripeptide alanine-histidine-lysine (Ala-His-Lys). It is often listed as Copper Tripeptide-3 and is supplied here as a laboratory research material.',
  },
  {
    question: 'Is AHK-Cu the same as GHK-Cu?',
    answer: 'No. They share the histidine-lysine end and both bind copper, but AHK-Cu starts with alanine and GHK-Cu starts with glycine. Findings for one should not be applied to the other.',
  },
  {
    question: 'What is Copper Tripeptide-3?',
    answer: 'Copper Tripeptide-3 is the ingredient name commonly used for AHK-Cu, while Copper Tripeptide-1 is used for GHK-Cu. Because suppliers may sell different salt forms under the same name, the COA, not the name, should confirm what a specific product contains.',
  },
  {
    question: 'What is the sequence of AHK-Cu?',
    answer: 'Alanine, histidine, lysine, in that order, with a copper(II) ion bound through nitrogen atoms of the alanine terminus and the histidine residue.',
  },
  {
    question: 'Why do sources list different molecular weights for AHK-Cu?',
    answer: 'Because they describe different forms. The free AHK peptide is about 354.4 g/mol, the copper complex about 416 g/mol depending on how protons are counted, and the hydrochloride form about 451 to 452 g/mol. The correct value for a product is the one matching the form stated on its COA.',
  },
  {
    question: 'What is the CAS number for AHK-Cu?',
    answer: 'CAS 682809-81-0 is the number most often listed by suppliers, and some assign it to the hydrochloride form with a different number for the free base. A CAS number is only meaningful when it is tied to the exact documented form of the material.',
  },
  {
    question: 'Which molecular form is in a Veracue AHK-Cu vial?',
    answer: 'The molecular form, formula and molecular weight are reported on each lot’s documentation. You can request them through the contact page.',
  },
  {
    question: 'What sizes of AHK-Cu does Veracue offer?',
    answer: 'AHK-Cu is offered as a 50 mg vial and a 100 mg vial, both for laboratory research use only.',
  },
  {
    question: 'What should an AHK-Cu Certificate of Analysis include?',
    answer: 'At minimum: a lot number matching the vial, a named purity method and result, an identity result with expected and observed values, the molecular form, and the testing laboratory and date. Net peptide content and copper content add useful context where reported.',
  },
  {
    question: 'Does high HPLC purity mean AHK-Cu is the right molecule?',
    answer: 'No. HPLC purity measures the proportion of detected signal in the main chromatographic peak. It does not confirm identity on its own, and it says nothing about sterility, endotoxin or biological activity.',
  },
  {
    question: 'What does Research Use Only mean for this product?',
    answer: 'It means the material is supplied for laboratory and in vitro research, not for human or veterinary use.',
  },
  {
    question: 'Does Veracue provide usage instructions for AHK-Cu?',
    answer: 'No. AHK-Cu is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'AHK-Cu',
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
