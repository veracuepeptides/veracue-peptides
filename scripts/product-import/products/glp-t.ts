import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GLP-T (LY3298176). Research-use-only copy: molecular identity, dual GIP/GLP-1 receptor profile at assay level,
// analytical documentation. Facts come from docs/product-contents-1/veracue-glp-1trz-product-page.json;
// all trial, regulatory, weight-related, drug-name and comparison content is intentionally left out.

const NAME = 'GLP-T'
const SLUG = 'glp-t'

const SKU_CODE = 'GLPT'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_GLP_T_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_GLP_T_20mg.jpg' },
  { strength: '30mg', image: 'VERACUE_GLP_T_30mg.jpg' },
  { strength: '60mg', image: 'VERACUE_GLP_T_60mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'GLP-T Research Peptide (LY3298176)'
const SEO_DESCRIPTION =
  "GLP-T (LY3298176) is a 39-residue peptide with a C20 fatty diacid, CAS 2023788-19-2. See the COA notes. 10 to 60 mg, research use only."
const DESCRIPTION =
  'GLP-T is a synthetic 39-residue peptide built on the native GIP sequence, with aminoisobutyric acid at positions 2 and 13, a C-terminal amide and a C20 fatty diacid attached at lysine 20. Its formula is C225H348N48O68, its research code is LY3298176 and its CAS number is 2023788-19-2. It is easy to confuse with plain GIP or other lipid-modified incretin peptides, so identity is best checked against lot documentation. Vials come in 10, 20, 30 and 60 mg, for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is GLP-T?'),
    p('GLP-T is a synthetic 39-amino-acid peptide with the research code LY3298176 and CAS 2023788-19-2. It is built on the native GIP sequence, carries a C20 fatty diacid on lysine 20, and is studied as a dual GIP and GLP-1 receptor agonist in laboratory systems. Veracue supplies it for laboratory research only.'),
    p('A name printed on a vial tells you what a material is called, not what it is. What proves identity is the analytical paperwork that belongs to the lot in your hands, which is why this page spends as much time on documentation as on structure.'),
    h4('GLP-T at a Glance'),
    kvTable([
      ['Product name', 'GLP-T'],
      ['Research code', 'LY3298176'],
      ['Length', '39 amino acids'],
      ['Backbone origin', 'Based on the native GIP sequence'],
      ['Key substitutions', 'Aminoisobutyric acid (Aib) at positions 2 and 13'],
      ['C-terminus', 'Amide'],
      ['Lipid attachment', 'Lysine 20 linked to 1,20-eicosanedioic acid (a C20 fatty diacid) through a linker'],
      ['Molecular formula', 'C225H348N48O68'],
      ['Molecular weight (average)', 'About 4,813.5 g/mol (4813.53 and 4813.45 are both quoted)'],
      ['Monoisotopic mass', 'About 4,810.52 Da'],
      ['CAS Registry Number', '2023788-19-2'],
      ['PubChem CID', '156588324'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical form, salt or counterion, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What GLP-T Is Not'),
    ul([
      'Not a plain GIP peptide, and not a mixture of separate peptides.',
      'Not a material whose identity or purity can be read from its name or label alone.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What is the structure of GLP-T?'),
    p('The backbone is a 39-residue peptide based on the native GIP sequence. Two positions, 2 and 13, hold aminoisobutyric acid (Aib) instead of a standard residue, and the C-terminus is an amide. Lysine 20 carries 1,20-eicosanedioic acid, a C20 fatty diacid, through a linker.'),
    h5('Why does the C20 fatty diacid matter?'),
    p('The diacid drives binding to albumin, which is the reason the molecule persists in biological test systems instead of clearing in minutes. It is also the part of the molecule most worth confirming analytically, since a peptide without the lipid would give a clearly different mass.'),
    h5('Is the C-terminus an amide or a free acid?'),
    p('Published descriptions state a C-terminal amide. Some vendor pages state a free acid, which does not match. That is one more reason to ask what a lot report was compared against.'),

    h4('Receptor Profile'),
    table(
      ['Receptor', 'Full name', 'Role in this material'],
      [
        ['GIPR', 'Glucose-dependent insulinotropic polypeptide receptor', 'Agonist target in receptor assays'],
        ['GLP-1R', 'Glucagon-like peptide-1 receptor', 'Agonist target in receptor assays'],
      ],
    ),

    h4('Research Context'),
    h5('What do receptor studies show?'),
    p('GLP-T engages both the GIP receptor and the GLP-1 receptor from a single molecule, which is what makes it a dual agonist. The engagement is not symmetrical. A 2020 laboratory study described it as an imbalanced and biased dual agonist, with greater receptor occupancy at GIPR than at GLP-1R.'),
    p('At GIPR, signaling resembled that of native GIP. At GLP-1R, the molecule favored cAMP generation over beta-arrestin recruitment and drove receptor internalization less strongly than GLP-1 itself. That detail matters to anyone designing an assay, because the readout you choose changes what you see.'),

    h4('Research Questions, Answered'),
    h5('Does "dual agonist" mean two compounds mixed together?'),
    p('No. The term describes the receptor profile of one molecule. Activity at GIPR and GLP-1R comes from a single lipidated structure, so it is best treated as a property of the intact peptide.'),
    h5('Which assays fit this kind of material?'),
    p('Typical uses include incretin receptor pharmacology, GIP and GLP-1 signaling assays in cell systems, and analytical method development for lipidated peptides. None of this is a handling or preparation instruction. It describes how the material is used in research settings.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('What Should a GLP-T Certificate of Analysis Show?'),
    p('A percentage on its own answers one narrow question. A useful certificate answers four: what the material is, how pure it is by a stated method, how much is in the vial, and whether the report belongs to your lot.'),
    table(
      ['COA element', 'What it establishes', 'What it does not establish'],
      [
        ['Lot or batch number', 'That the report belongs to a specific production lot', 'Anything at all, unless it matches the vial label'],
        ['RP-HPLC purity (%)', 'Share of detected peak area under stated chromatographic conditions', 'Identity, net peptide content or biological activity'],
        ['Stated HPLC method', 'Column, mobile phase, gradient and detection wavelength, which is what makes a figure comparable', 'That impurities not retained or not detected were absent'],
        ['Mass spectrometry result', 'Whether the observed mass is consistent with the expected species', 'Purity, or the quantity of material present'],
        ['Mass convention used', 'Which figure the observed mass was matched against, average or monoisotopic', 'Identity on its own'],
        ['Net peptide content', 'How much of the vial’s mass is peptide rather than counterion, water or salts', 'Chromatographic purity'],
        ['Counterion (commonly TFA or acetate)', 'What the remaining mass is', 'Peptide quality'],
        ['Laboratory name and test date', 'Who ran the test and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist. Where a lot-specific certificate exists, use it as the primary source for that lot. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Why Is the Molecular Weight Printed Three Ways?'),
    p('Catalogs quote this molecule at 4813.53, 4813.45 and about 4810.52. None of them is wrong. They describe different measurements.'),
    table(
      ['Value', 'What it represents'],
      [
        ['4813.53 Da', 'Average molecular weight, one commonly quoted figure'],
        ['4813.45 g/mol', 'Average molecular weight listed by reference-standard suppliers, from the same formula'],
        ['About 4810.52 Da', 'Accurate (monoisotopic) mass, the figure a high-resolution mass spectrometer reports'],
      ],
    ),
    p('The gap between the first two is rounding in atomic mass tables applied to a 225-carbon molecule. The gap to the third is the difference between an averaged isotope distribution and the single lightest isotopologue. A COA that quotes an observed mass without saying which convention it used has left out what you need to judge it.'),

    h4('How Do HPLC and Mass Spectrometry Differ?'),
    p('They answer different questions, and neither one replaces the other.'),
    p('RP-HPLC separates the target peptide from related substances, truncated and deletion sequences and other chromatographic impurities. It supports a purity percentage under the stated conditions, but it does not say what the main peak actually is.'),
    p('Mass spectrometry measures mass-to-charge behavior and shows whether the observed mass is consistent with the expected molecule, including the lipidated lysine 20 conjugate. It does not say how much of the sample is that molecule.'),
    p('Run together, one supports identity and the other supports purity. Run alone, either leaves a gap, and neither speaks to sterility, endotoxin, residual solvents, water content or aggregation. A reported purity above 100 percent is a signal, not a rounding quirk, and is a reason to ask for the chromatogram and the method.'),

    h4('Need lot documentation for GLP-T?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GLP-T is supplied for laboratory research use only. It is not a drug, cosmetic, dietary supplement or food, and it is not intended for human or veterinary use. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind, and the scientific information here describes laboratory research and is not medical advice. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GLP-T?',
    answer: 'GLP-T is a synthetic 39-amino-acid peptide, catalogued under the research code LY3298176, that acts as a dual GIP and GLP-1 receptor agonist in laboratory systems. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is LY3298176?',
    answer: 'LY3298176 is the development code for this molecule and is still common in the scientific literature. Searching that code is the quickest way to reach primary sources instead of vendor pages.',
  },
  {
    question: 'How long is the GLP-T sequence and what is modified?',
    answer: 'It is 39 amino acids long and based on the native GIP sequence. Aminoisobutyric acid sits at positions 2 and 13, the C-terminus is an amide, and lysine 20 carries a C20 fatty diacid through a linker. The full residue-by-residue sequence for a given lot should come from its documentation.',
  },
  {
    question: 'What are the molecular formula and weight of GLP-T?',
    answer: 'The formula is C225H348N48O68. The average molecular weight is quoted as 4813.53 or 4813.45, and the monoisotopic mass is about 4810.52 Da. The values differ by convention, not by disagreement.',
  },
  {
    question: 'What is the CAS number for GLP-T?',
    answer: 'CAS 2023788-19-2, with PubChem CID 156588324. A CAS number attaches to a chemical identity, not to a vial, so it should not be assigned to a lot that has no identity testing behind it.',
  },
  {
    question: 'Which receptors does GLP-T act on?',
    answer: 'The GIP receptor and the GLP-1 receptor. Engagement is not equal: laboratory studies describe greater occupancy at GIPR and, at GLP-1R, signaling biased toward cAMP over beta-arrestin recruitment.',
  },
  {
    question: 'Why does GLP-T carry a fatty diacid?',
    answer: 'The C20 fatty diacid at lysine 20 drives binding to albumin, which slows clearance in biological test systems. It is also worth confirming analytically, because a peptide without the lipid would give a different mass.',
  },
  {
    question: 'How is GLP-T purity tested, and what does the number mean?',
    answer: 'Purity is normally reported by reversed-phase HPLC as a percentage of detected peak area under stated conditions. It describes chromatographic purity only, not identity, net peptide content or biological activity.',
  },
  {
    question: 'What is the difference between HPLC and LC-MS on a COA?',
    answer: 'HPLC separates the target from related substances and supports the purity figure. Mass spectrometry compares an observed mass with the expected one and supports identity. A COA that reports only one has answered half the question.',
  },
  {
    question: 'What does Research Use Only mean, and is usage guidance provided?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA. Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GLP-T',
  variants: VARIANTS,
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/tirz/i, /trz/i, /mounjaro/i, /zepbound/i, /retatrutide/i, /semaglutide/i, /liraglutide/i, /dulaglutide/i, /exenatide/i, /ozempic/i, /wegovy/i, /rybelsus/i, /victoza/i, /saxenda/i, /trulicity/i, /cagrilintide/i, /survodutide/i, /mazdutide/i, /orforglipron/i, /GLP-3RTA/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
