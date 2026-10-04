import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Thymosin Alpha-1 (Ta1). Research-use-only copy: molecular identity, assay-level receptor context,
// analytical documentation. Facts come from docs/product-contents-1/thymosin-alpha-1-product-page.json;
// human study content, outcome data, approval history, brand and drug-product names are intentionally left out.

const NAME = 'Thymosin Alpha-1'
const SLUG = 'thymosin-alpha-1'

const SKU_CODE = 'TA1'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Thymosin_Alpha_1_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Thymosin Alpha-1 Research Peptide (TA1)'
const SEO_DESCRIPTION =
  "Thymosin alpha-1 is a 28-residue peptide, not thymosin beta-4 (CAS 62304-98-7). See the COA guide. Supplied as a 10 mg vial, research use only."
const DESCRIPTION =
  'Thymosin Alpha-1 is a 28-residue peptide whose N-terminal serine is acetylated, written Ac-SDAAVDTSSEITTKDLKEKKEVVEEAEN-OH, and it is a fragment of the precursor protein prothymosin alpha. It has the formula C129H215N33O55, an average mass of about 3108.3 g/mol and CAS 62304-98-7. The name is easily confused with thymosin beta-4 and its TB-500 fragment, which are unrelated sequences. One 10 mg vial size is available, supplied strictly for laboratory research.'

function productDetails(): string {
  return [
    h4('What Is Thymosin Alpha-1?'),
    p('Thymosin Alpha-1 (Tα1, also written TA1) is a 28-amino-acid acidic peptide with an acetylated N-terminal serine. It is a proteolytic fragment of the precursor protein prothymosin alpha, with formula C129H215N33O55 and CAS 62304-98-7. Veracue supplies it for laboratory research only.'),
    p('Labs look at Thymosin Alpha-1 mainly in cell-based assays that involve Toll-like receptor signaling on dendritic cells and other innate immune cells. Its sequence and mass are well standardized across chemical databases, which makes it straightforward to check against a lot record.'),
    h4('Thymosin Alpha-1 at a Glance'),
    kvTable([
      ['Product name', 'Thymosin Alpha-1 (Tα1, TA1)'],
      ['Peptide length', '28 amino acids, Nα-acetylated at the N-terminal serine'],
      ['Parent protein', 'Prothymosin alpha (proteolytic fragment)'],
      ['Molecular formula', 'C129H215N33O55'],
      ['Molecular weight (average)', '3108.3 g/mol'],
      ['Monoisotopic mass', '3106.50 Da'],
      ['CAS Registry Number', '62304-98-7'],
      ['PubChem CID', '16130571'],
      ['Size offered', '10 mg vial'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These are reference-chemistry values for the molecule as documented across chemical databases, not a Veracue analytical result. Physical form, salt or counterion form, purity, net peptide content, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Thymosin Alpha-1 Is Not'),
    ul([
      'Not the same peptide as thymosin beta-4 or its TB-500 fragment.',
      'Not the full prothymosin alpha protein, only its 28-residue N-terminal fragment.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the Thymosin Alpha-1 sequence look like?'),
    p('Thymosin Alpha-1 is the first 28 residues of prothymosin alpha, with the N-terminal serine acetylated. In one-letter code it is Ac-SDAAVDTSSEITTKDLKEKKEVVEEAEN-OH.'),
    p('In three-letter code: Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn-OH. The sequence is rich in acidic residues, and the reported isoelectric point is about 4.0 to 4.3.'),
    p('Chemical databases, synthesis literature and supplier records converge on this same sequence, formula and mass. A record that shows a different length, a missing acetyl group or a different formula describes something else.'),
    table(
      ['Representation', 'Value'],
      [
        ['Molecular formula', 'C129H215N33O55'],
        ['Average molecular weight', '3108.3 g/mol'],
        ['Monoisotopic mass', '3106.50 Da'],
        ['CAS Number', '62304-98-7'],
        ['PubChem CID', '16130571'],
        ['Isoelectric point (pI)', 'About 4.0 to 4.3 (acidic peptide)'],
      ],
    ),
    h5('How is Thymosin Alpha-1 different from thymosin beta-4 and TB-500?'),
    p('They share a naming family but are unrelated peptides. Thymosin Alpha-1 is a 28-residue peptide, while thymosin beta-4 is a distinct, larger actin-binding peptide, and TB-500 is a synthetic fragment used as its research analog. A procurement record that says only “thymosin” is ambiguous, so match the sequence and CAS number.'),

    h4('Mechanism and Research Context'),
    h5('Which pathways do laboratories study with Thymosin Alpha-1?'),
    p('Laboratory studies describe Thymosin Alpha-1 acting through Toll-like receptor signaling, mainly TLR9 through the MyD88-dependent pathway and TLR2 through MyD88- and TRIF-dependent pathways, on dendritic cells and other innate immune cells.'),
    p('Downstream readouts in those assays include dendritic-cell maturation markers such as CD80, CD86 and MHC class I and II expression, and cytokine measurements such as IL-2 and IFN-γ. Findings vary by stimulus, cell type and study design, so they describe assay results and not a general property of the peptide.'),
    h5('What can and cannot this page tell me?'),
    p('The page gives molecular reference information and general assay-level context. It cannot establish what is in a particular vial, and published work may not say which chemical form was used. Veracue does not provide dosing, administration or usage guidance of any kind.'),
    h5('What questions can a lab ask with it?'),
    ul([
      'Which receptor pathways respond in a given dendritic-cell or innate-cell assay?',
      'Which maturation markers and cytokines change against a matched control?',
      'How does the response depend on the stimulus, cell type and chemical form of the peptide?',
      'Can an analytical method separate the full 28-residue peptide from truncation or deletion species?',
    ]),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Thymosin Alpha-1 Certificate of Analysis'),
    p('A purity percentage on its own answers only one question. A useful certificate lets you confirm what the material is, how pure it is by a stated method, how much of the vial is actually peptide, and that the report belongs to the lot you received.'),
    p('Because Thymosin Alpha-1 is a 28-residue peptide, mass-spectrometry identity and net peptide content are especially informative next to HPLC purity, since single-residue deletions and truncations are the most common synthesis impurities at this length.'),
    table(
      ['COA item', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to a specific production lot', 'Anything about quality unless it matches the vial label'],
        ['HPLC purity (%)', 'Share of detected signal in the main peak under stated conditions', 'Identity, net peptide content or biological activity'],
        ['Mass spectrometry or LC-MS', 'Whether the observed mass matches the expected 3108.3 Da average (3106.50 Da monoisotopic) species', 'Purity, or the amount of material present'],
        ['Net peptide content', 'How much of the vial’s mass is peptide rather than salts, counter-ions or water', 'Chromatographic purity'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    h4('Quick Checks Before You Rely on a Report'),
    ul([
      'The lot number on the COA matches the vial label.',
      'The purity method is named, not just a percentage.',
      'The identity result gives expected and observed mass (about 3108 Da average) and the method used.',
      'Net peptide content is reported alongside chromatographic purity.',
      'The testing laboratory and date are shown.',
    ]),
    h4('Chromatography and Mass Spectrometry Answer Different Questions'),
    p('HPLC helps assess chromatographic purity. Mass spectrometry helps assess molecular identity and mass. Neither alone establishes every aspect of material quality, so read the purity value together with the method and detection conditions on the analytical record.'),
    p('Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation, and storage conditions follow the label and documentation for the lot you hold.', { links: CERT }),

    h4('Need lot documentation for Thymosin Alpha-1?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Thymosin Alpha-1 is supplied solely for laboratory research, scientific investigation and analytical characterization. It is not a drug, cosmetic, dietary supplement or food, and it is not intended for human or veterinary use or for any form of administration. This page contains no dosing, administration or usage guidance of any kind. Purchasers are responsible for using the material lawfully and within an appropriate research setting. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Thymosin Alpha-1?',
    answer: 'Thymosin Alpha-1 (Tα1) is a 28-amino-acid, Nα-acetylated peptide that is a fragment of the precursor protein prothymosin alpha. Veracue supplies it as a laboratory research material only.',
  },
  {
    question: 'What is the Thymosin Alpha-1 amino acid sequence?',
    answer: 'The sequence is Ac-SDAAVDTSSEITTKDLKEKKEVVEEAEN-OH, or Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn-OH. The N-terminal serine is acetylated.',
  },
  {
    question: 'What are the formula and molecular weight of Thymosin Alpha-1?',
    answer: 'The formula is C129H215N33O55, the average molecular weight is 3108.3 g/mol and the monoisotopic mass is 3106.50 Da. The CAS number is 62304-98-7 and the PubChem CID is 16130571.',
  },
  {
    question: 'What does Thymosin Alpha-1 research focus on?',
    answer: 'Laboratory work centers on Toll-like receptor signaling, mainly TLR2 and TLR9, in dendritic cells and other innate immune cells. Assay readouts include maturation markers and cytokines such as IL-2 and IFN-γ.',
  },
  {
    question: 'How is Thymosin Alpha-1 different from thymosin beta-4 and TB-500?',
    answer: 'They are unrelated peptides that share a naming family. Thymosin Alpha-1 is a 28-residue peptide, thymosin beta-4 is a distinct, larger actin-binding peptide, and TB-500 is a synthetic fragment used as its research analog.',
  },
  {
    question: 'Is Thymosin Alpha-1 the same as prothymosin alpha?',
    answer: 'No. Thymosin Alpha-1 is the first 28 residues of prothymosin alpha, so it is a fragment and not the full precursor protein.',
  },
  {
    question: 'What size does Veracue offer?',
    answer: 'Thymosin Alpha-1 is offered as a 10 mg research vial. Form and lot details are reported on each lot’s documentation and can be requested through the contact page.',
  },
  {
    question: 'What should a Thymosin Alpha-1 COA include?',
    answer: 'A useful COA states the lot number, the HPLC purity method and result, mass-spectrometry identity against the expected mass of about 3108 Da, net peptide content, and the testing laboratory and date.',
  },
  {
    question: 'Why does net peptide content matter for a 28-residue peptide?',
    answer: 'It shows how much of the vial’s mass is peptide rather than salts, counter-ions or water, which HPLC purity does not tell you. Single-residue deletions and truncations are also common impurities at this length, so mass spectrometry is worth checking too.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Thymosin Alpha-1?',
    answer: 'No. Thymosin Alpha-1 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['immune-modulation'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Thymosin Alpha-1',
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
