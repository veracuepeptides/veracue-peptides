import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Semax (MEHFPGP). Research-use-only copy: molecular identity, neurotrophin-level research context,
// analytical documentation. Facts come from docs/product-contents-1/semax-product-page-final.json;
// human study content, injury-model outcomes, references and regulatory framing are intentionally left out.

const NAME = 'Semax'
const SLUG = 'semax'

const SKU_CODE = 'SEMAX'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Semax_10mg.jpg' },
  { strength: '30mg', image: 'VERACUE_Semax_30mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Semax Research Peptide (MEHFPGP)'
const SEO_DESCRIPTION =
  "Semax (MEHFPGP) is a seven-residue peptide: ACTH(4-7) plus a Pro-Gly-Pro tail (CAS 80714-61-0). See mass and COA tips. 10 and 30 mg, research use only."
const DESCRIPTION =
  "Semax is a seven-residue synthetic peptide, Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP), made by joining the ACTH(4-7) fragment to a Pro-Gly-Pro tail. It has the formula C37H51N9O10S, an average mass of about 813.9 g/mol and CAS 80714-61-0. In the laboratory it has been studied in neurotrophin signaling and gene-expression work, and it is often compared with Selank. It is offered in 10 mg and 30 mg vials for research use only."
function productDetails(): string {
  return [
    h4('What Is Semax?'),
    p('Semax is a synthetic heptapeptide with the sequence Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP), formula C37H51N9O10S, average molecular weight about 813.93 g/mol and CAS 80714-61-0. It joins the ACTH(4-7) fragment to a Pro-Gly-Pro tail. Veracue supplies Semax for laboratory research only.'),
    p('Researchers are interested in Semax because it has a short, defined sequence and has been examined in neurotrophin signaling and gene-expression work, mostly in rodent and cell systems. That makes it a useful reference peptide for labs that want well-documented material.'),
    h4('Semax at a Glance'),
    kvTable([
      ['Product name', 'Semax (also written ACTH(4-7)-Pro-Gly-Pro)'],
      ['Sequence', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)'],
      ['Length', '7 amino acids'],
      ['Molecular formula', 'C37H51N9O10S'],
      ['Molecular weight (average)', 'About 813.93 g/mol'],
      ['Monoisotopic mass', 'About 813.348 Da'],
      ['CAS Registry Number', '80714-61-0'],
      ['PubChem CID', '9811102'],
      ['UNII', 'I5FAL2585H'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and identifiers are from the PubChem record and describe the free peptide as a reference structure, H-Met-Glu-His-Phe-Pro-Gly-Pro-OH. That is not a statement about the form Veracue supplies. Salt or counterion form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Semax Is Not'),
    ul([
      'Not the same molecule as full-length ACTH, which is a 39-amino-acid hormone.',
      'Not interchangeable with N-acetyl Semax or Adamax, which are related but distinct compounds.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the Semax sequence tell me?'),
    p('MEHFPGP is seven residues: methionine, glutamic acid, histidine, phenylalanine, proline, glycine and proline. The first four (MEHF) match the ACTH(4-7) region. The last three (PGP) are an added Pro-Gly-Pro extension, which is thought to slow peptidase attack in biological test systems.'),
    p('The sequence matters when you compare supplier documents. Names and abbreviations vary, but a genuine Semax record should resolve to these same seven residues in this order. A different length, order or terminal modification describes a different compound.'),
    h5('Is Semax the same as ACTH?'),
    p('No. ACTH is a 39-amino-acid hormone, while Semax is a seven-residue synthetic peptide related to a short region of it. Findings about ACTH the hormone do not transfer to Semax, and the reverse is also true. Treat them as separate molecules that share ancestry.'),
    h5('How do Semax, ACTH(4-7), ACTH(4-10) and Pro-Gly-Pro differ?'),
    p('The four names describe four different sequences. Semax is MEHFPGP, ACTH(4-7) is MEHF, ACTH(4-10) is MEHFRWG, and Pro-Gly-Pro is PGP. Semax keeps MEHF and replaces the last three residues of ACTH(4-10) with PGP. Calculated average masses run about 814, 563, 962 and 269 g/mol respectively. Similar names cause real errors, so a procurement record that says only “ACTH fragment” is ambiguous.'),

    h4('Semax vs. Selank at a Glance'),
    table(
      ['Attribute', 'Semax', 'Selank'],
      [
        ['Sequence', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)', 'TKPRPGP (Thr-Lys-Pro-Arg-Pro-Gly-Pro)'],
        ['General identity', 'ACTH-related synthetic peptide', 'Tuftsin-related synthetic peptide'],
        ['Length', '7 amino acids', '7 amino acids'],
        ['Average molecular weight (calculated)', 'About 813.9 g/mol', 'About 751.9 g/mol'],
        ['Research areas', 'Neurotrophin and gene-expression research', 'Neurobiological research, including receptor-binding, enzyme-activity and BDNF-expression studies'],
      ],
    ),
    p('The two peptides share a Pro-Gly-Pro ending but differ in their first four residues and in mass. The table does not rank them.'),

    h4('Research Context'),
    h5('What does Semax and BDNF research look at?'),
    p('In rat hippocampal work, Semax exposure was reported alongside higher BDNF protein, TrkB phosphorylation and BDNF mRNA. Other studies in rat and glial-cell systems reported changes in NGF and BDNF transcripts. Taken together, these link Semax to neurotrophin markers in those systems.'),
    p('They do not identify the receptor, and the mechanism of Semax gene regulation is still unknown. These are animal and cell findings, so they do not translate automatically to other systems.'),
    h5('What does “neurobiological research” mean here?'),
    p('It means a measured difference in an experimental system compared with a control, such as a change in gene or protein markers. It describes a laboratory result and not a promise about any product. When you read a Semax paper, ask four questions: which species or system, which comparator, which endpoint, and which chemical form.'),
    h5('What can and cannot this page tell me?'),
    p('This page reports molecular reference information and general research context. It cannot establish what is in a particular vial. Many papers do not say whether they used the free peptide or a salt, so they cannot be matched to a specific research lot. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Semax Certificate of Analysis'),
    p('A certificate of analysis documents one lot, so read it as a set of linked facts. Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial.'],
        ['Product identity', 'The compound name, which should agree with the formula and weight shown.'],
        ['Sequence or molecular identity', 'Whether the record ties the material to MEHFPGP.'],
        ['Purity', 'The reported chromatographic purity value.'],
        ['HPLC or UPLC method', 'The method and detection conditions behind the purity value.'],
        ['Mass spectrometry result', 'Whether the measured mass fits the Semax reference mass.'],
        ['Molecular form', 'Free peptide, acetate, trifluoroacetate or another counterion.'],
        ['Testing laboratory', 'Who performed the analysis.'],
        ['Test date', 'How recent the result is.'],
        ['Content or moisture information', 'Peptide or water content, if reported.'],
      ],
    ),
    p('Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. Check that the pieces agree with each other, because a COA is only as useful as its consistency with the vial in hand. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Chromatography and Mass Spectrometry: Two Different Questions'),
    p('HPLC helps assess chromatographic purity. Mass spectrometry helps assess molecular identity and mass. Neither one alone establishes every aspect of material quality, and a single mass peak does not prove identity by itself. HPLC purity should be read together with the method and detection conditions reported on the analytical record.'),
    table(
      ['Value', 'Figure'],
      [
        ['Calculated monoisotopic mass', 'About 813.348 Da'],
        ['Average molecular weight', 'About 813.93 g/mol'],
      ],
    ),
    p('The observed m/z depends on the charge state and on ion or adduct conditions, so a report should not be judged against one universal value. Methionine oxidation can produce a mass shift of about +16 Da, so oxidation-related species may appear in an MS dataset. Interpretation should rest on the complete spectrum and method.'),

    h4('Verification Questions, Answered'),
    h5('How do I confirm that the material is actually Semax?'),
    p('Start with the molecule: MEHFPGP, formula C37H51N9O10S, average molecular weight near 813.93 g/mol, PubChem CID 9811102 and CAS 80714-61-0. Public databases hold more than one record, including records for salt forms, so match the exact name and formula rather than the name alone. Those identifiers describe the molecule, not a vial. Confirming a lot takes analytical data tied to that lot number: a mass result consistent with the reference and a chromatographic purity result.'),
    h5('Is Semax the same as Semax acetate?'),
    p('Semax acetate is the acetate salt of the same peptide, and it is listed as a separate substance from the free peptide. Some certificates titled Semax Acetate carry the free peptide’s CAS number, formula and molecular weight, which leaves the described substance unclear. This page does not state which form Veracue’s material is. The form belongs to the lot documentation.'),

    h4('Need lot documentation for Semax?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Semax is supplied for laboratory research, scientific investigation and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Semax?',
    answer: 'Semax is a synthetic heptapeptide with the sequence Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP). It combines the ACTH(4-7) fragment with a Pro-Gly-Pro tail, and Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the Semax peptide sequence?',
    answer: 'The sequence is Met-Glu-His-Phe-Pro-Gly-Pro, written MEHFPGP in one-letter code. The first four residues match the ACTH(4-7) region, and the last three, Pro-Gly-Pro, are an added extension.',
  },
  {
    question: 'What are the molecular formula and weight of Semax?',
    answer: 'The free-peptide reference form has the formula C37H51N9O10S, an average molecular weight near 813.93 g/mol and a monoisotopic mass of about 813.348 Da. The CAS number is 80714-61-0 and the PubChem CID is 9811102.',
  },
  {
    question: 'Is Semax the same as ACTH?',
    answer: 'No. ACTH is a 39-amino-acid hormone, while Semax is a seven-residue synthetic peptide related to a short ACTH region. It is also different from ACTH(4-7), which is MEHF, and ACTH(4-10), which is MEHFRWG.',
  },
  {
    question: 'What does research say about Semax and BDNF?',
    answer: 'A rat hippocampal study reported increased BDNF protein, TrkB phosphorylation and BDNF mRNA after Semax exposure. These are rat and cell findings, the mechanism is not settled, and the results do not translate automatically to other systems.',
  },
  {
    question: 'What is the difference between Semax and Selank?',
    answer: 'They are different seven-residue peptides. Semax (MEHFPGP) is ACTH-related, while Selank (TKPRPGP) is described as tuftsin-related, and their first four residues and masses differ.',
  },
  {
    question: 'Is Semax the same as Semax acetate?',
    answer: 'Semax acetate is the acetate salt of the same peptide and is listed as a separate substance from the free peptide. The form of Veracue’s material is reported on each lot’s documentation.',
  },
  {
    question: 'What should a Semax COA include?',
    answer: 'A COA may include the lot number, product identity, purity, HPLC or UPLC method, mass spectrometry result, molecular form, testing laboratory, test date, and peptide or water content. The lot number should match the vial.',
  },
  {
    question: 'How should Semax mass-spectrometry results be read?',
    answer: 'A calculated mass and an observed m/z value are not automatically the same number. Check the charge state, adducts and processing method first, and remember that methionine oxidation can add about 16 Da.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Semax?',
    answer: 'No. Semax is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Semax',
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
