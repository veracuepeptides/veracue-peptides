import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Glow (multi-component research blend). Research-use-only copy: blend composition by component name,
// component identity table, TB-500 species ambiguity, blend COA reading. Facts come from
// docs/product-contents-1/veracue-glow-50mg-product-page.json; per-component amounts, the source's 50 mg total,
// skin/repair/animal-model research tables, regulatory sections, references and internal notes are left out.
// The vial label reads "Glow 70 mg" and the price sheet lists 70mg, so 70 mg is the size used everywhere.

const NAME = 'Glow'
const SLUG = 'glow'

const SKU_CODE = 'GLOW'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '70mg', image: 'VERACUE_Glow_70mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Glow Research Blend (Multi-Component)'
const SEO_DESCRIPTION =
  "Glow is a multi-component blend, not one peptide, so no single CAS or mass applies. See how a blend COA is read. 70 mg, research use only."
const DESCRIPTION =
  'Glow is a Veracue research blend of several peptides in one vial, not a single peptide. The components named for it are GHK-Cu (a copper complex of Gly-His-Lys, CAS 89030-95-5), BPC-157 (a 15-residue peptide, CAS 137525-51-0) and TB-500 (the acetylated fragment Ac-LKKTETQ, CAS 885340-08-9). Because it is a mixture, Glow has no CAS number or molecular weight of its own, and it should not be confused with any single component or with the related KLOW blend. Offered as a 70 mg vial for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is Glow?'),
    p('Glow is a research blend, not a single peptide. It combines GHK-Cu, BPC-157 and TB-500 in one vial, and the name is a supplier convention rather than a defined chemical entity. Veracue offers it as a 70 mg vial for laboratory research only.'),
    p('Because Glow is a mixture, it has no CAS number or molecular weight of its own. Two vials sold under the same name by different suppliers can hold different peptides in different ratios, so identity has to be checked component by component.'),
    h4('Glow at a Glance'),
    kvTable([
      ['Product name', 'Glow'],
      ['Type', 'Multi-component research blend'],
      ['Components named', 'GHK-Cu, BPC-157, TB-500'],
      ['Size offered', '70 mg vial'],
      ['CAS number for the blend', 'None; each component has its own'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Per-component amounts, salt form, purity, physical appearance and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Glow Is Not'),
    ul([
      'Not a single peptide, and not a substance with its own molecular weight.',
      'Not the same as any one of its components sold on its own.',
      'Not the same as KLOW, a related blend that should be compared at the composition level, not by name.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Component Identity'),
    h5('Why is each component checked separately?'),
    p('Each component is a separate compound with its own identifiers. A blend does not inherit a molecular weight from its parts, so identity has to be established one component at a time. The table sets out what the source gives for each.'),
    table(
      ['Component', 'Sequence or structure', 'Formula', 'CAS', 'Also listed as'],
      [
        ['GHK-Cu', 'Gly-His-Lys coordinated to Cu(II)', 'C14H22CuN6O4 (complex)', '89030-95-5 (complex); 49557-75-7 (free peptide)', 'Copper Tripeptide-1, Cu-GHK'],
        ['BPC-157', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV), 15 residues', 'C62H98N16O22', '137525-51-0', 'Body Protection Compound-157, PL 14736, Bepecin'],
        ['TB-500', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Ac-LKKTETQ), 7 residues', 'C38H68N10O14', '885340-08-9', 'Thymosin beta-4 fragment (17-23)'],
      ],
    ),
    h5('Is GHK-Cu the same as GHK?'),
    p('No. GHK is the free tripeptide, 340.38 g/mol, CAS 49557-75-7. GHK-Cu is the copper(II) complex, CAS 89030-95-5. Sources describe different species with different masses, so a COA should say which one its identity result was matched against.'),
    h5('Which TB-500 is in a vial?'),
    p('TB-500 is the most ambiguous name in this blend. The defined entity is the seven-residue acetylated fragment Ac-LKKTETQ, about 889 Da, which is the actin-binding motif of thymosin beta-4 (residues 17 to 23). Full-length thymosin beta-4 is a different molecule, a 43-residue protein of roughly 4963 Da.'),
    p('Products sold as TB-500 are sometimes the fragment and sometimes the full protein. The mass spectrometry result on the lot certificate settles it: an observed mass near 889 Da is the heptapeptide, and a mass near 4963 Da is the full protein. Which species is supplied in Glow is reported on each lot’s documentation.'),

    h4('Research Context'),
    h5('What does the blend name tell me?'),
    p('Very little on its own. Glow is a market naming convention, so formulations under the name differ between suppliers, and the composition of one vendor’s vial should not be read onto another’s.'),
    h5('Does research on one component apply to the blend?'),
    p('Not automatically. Each body of laboratory work describes the compound that was actually studied. The source found no controlled study that evaluated these components together, so a combined or synergistic effect is not established by the component literature. Published work under the name TB-500 may also have used full-length thymosin beta-4 rather than the fragment.'),
    h5('What does a product listing establish, and what needs the lot record?'),
    p('It reports molecular reference information for the named components. It cannot establish what is in a particular vial, and it does not show that concentrations used in cell culture correspond to any other amount or route. A purity figure does not establish sterility, endotoxin status or biological activity either. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Certificate of Analysis for a Blend'),
    p('A single purity percentage is the standard way blends are documented and the least useful. Area normalization on one chromatogram shows how the detected signal spreads across peaks. On a three-component blend, a well-resolved run gives three main peaks, and one overall purity number leaves open which peak is which and whether any component is short.'),
    p('Identity and quantity are separate questions from purity, and a blend needs all three answered per component. What a given Glow lot reports is stated on that lot’s own COA.'),
    table(
      ['COA element', 'What it establishes for a blend', 'What it does not establish'],
      [
        ['HPLC purity, single figure', 'Share of detected signal in the main peaks under stated conditions', 'Which component each peak is, or whether the ratio matches the label'],
        ['HPLC with per-component assignment', 'Separation and relative area of each named component, if the method is validated for this blend', 'Absolute amount of each component without reference standards'],
        ['LC-MS or ESI-MS', 'Whether observed masses are consistent with each expected component', 'Purity, ratio, or how much material is present'],
        ['Quantitative LC-MS against standards', 'Amount of each component, so the stated ratio can be checked', 'Sterility, endotoxin or biological activity'],
        ['Net peptide content', 'How much of the vial mass is peptide rather than counterion and water', 'The split between components'],
        ['Copper content', 'Whether copper is present at the expected ratio to the GHK peptide', 'Purity of the peptide portion'],
        ['Lot number and test date', 'That the report belongs to the vial in hand', 'Anything at all, unless it matches the vial label'],
      ],
    ),

    h4('Does a 70 mg Label Mean 70 mg of Peptide?'),
    p('Not necessarily. Synthetic peptides are normally supplied as acetate or trifluoroacetate salts, and residual counterion and water are part of the weighed mass. Net peptide content is the figure that answers the question, and it belongs on the lot certificate.'),

    h4('Quick COA Check'),
    ul([
      'Lot number on the COA matches the number on the vial',
      'Each component is named on the report, not just the blend',
      'Observed mass is stated for each component, with the species it was matched against',
      'For TB-500, the observed mass distinguishes the heptapeptide from full-length thymosin beta-4',
      'Purity method and conditions are named, not just a percentage',
      'Salt form and net peptide content are stated, so total mass can be converted to peptide mass',
      'Testing laboratory and date appear on the report',
    ]),
    p('Storage conditions follow the lot’s own documentation and label. Handle the material as a laboratory chemical with appropriate personal protective equipment. The certificate page explains how to see lot documentation.', { links: CERT }),

    h4('Need the paperwork for a Glow lot?'),
    p('Ask the Veracue team for the documentation that belongs to a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Glow supplied by Veracue is intended solely for laboratory research. It is not a drug, cosmetic, dietary supplement or food, and it must not be given to humans or animals. The information here describes molecular identity and analytical documentation and is not advice or a statement of efficacy or safety. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Glow?',
    answer: 'Glow is a research blend name, not a single compound. It combines GHK-Cu, BPC-157 and TB-500, and it has no CAS number or molecular weight of its own because it is a mixture.',
  },
  {
    question: 'Is Glow a single peptide or a blend?',
    answer: 'A blend. Each component has its own sequence, molecular weight and CAS number, so any identity or purity result has to be reported per component to mean much.',
  },
  {
    question: 'What size does Veracue offer?',
    answer: 'A 70 mg vial. Amounts per component are reported on each lot’s documentation and can be requested through the contact page.',
  },
  {
    question: 'Does 70 mg mean 70 mg of peptide?',
    answer: 'Not necessarily. The weighed mass includes counterion and residual water, so net peptide content is the figure that answers this, and it should appear on the lot certificate.',
  },
  {
    question: 'Is Glow the same as another supplier’s Glow?',
    answer: 'Not necessarily. Glow is a naming convention, and the components and ratios can differ by supplier. Compare stated composition rather than the name.',
  },
  {
    question: 'Which TB-500 is in Glow, the fragment or the full protein?',
    answer: 'The defined entity TB-500 is the acetylated heptapeptide Ac-LKKTETQ at about 889 Da, while full-length thymosin beta-4 is a 43-residue protein of roughly 4963 Da. The species supplied is reported on each lot’s documentation, and the observed mass on the certificate distinguishes them.',
  },
  {
    question: 'What does a single HPLC purity percentage tell me about a blend?',
    answer: 'Less than it appears to. It describes how detected signal is spread across peaks, not which peak is which component or whether the ratio matches the label. Component-level reporting answers those questions.',
  },
  {
    question: 'Can LC-MS confirm every component in the blend?',
    answer: 'It can confirm identity, since the components have distinct masses and each gives its own signal. Detecting a component is not the same as quantifying it, which needs a method run against reference standards.',
  },
  {
    question: 'Why do sources list two molecular weights for GHK-Cu?',
    answer: 'They describe different species. The free tripeptide Gly-His-Lys is 340.38 g/mol with CAS 49557-75-7, and the copper(II) complex has CAS 89030-95-5. A certificate should say which form its identity result was matched against.',
  },
  {
    question: 'Does research on one component apply to the whole blend?',
    answer: 'No. Each body of work describes the compound that was actually studied, and no controlled study of these components together was identified.',
  },
  {
    question: 'What does Research Use Only mean for Glow?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use or any form of administration.',
  },
  {
    question: 'Does Veracue provide usage instructions for Glow?',
    answer: 'No. Glow is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Glow',
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
