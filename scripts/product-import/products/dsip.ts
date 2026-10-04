import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// DSIP (WAGGDASGE). Research-use-only copy: molecular identity, analytical documentation.
// Facts come from docs/product-contents-1/veracue-dsip-product-page.json; discovery history, human study content,
// animal-model outcomes, regulatory status, references and evidence tables are intentionally left out.

const NAME = 'DSIP'
const SLUG = 'dsip'

const SKU_CODE = 'DSIP'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_DSIP_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'DSIP Research Peptide (WAGGDASGE)'
const SEO_DESCRIPTION =
  "DSIP is a nine-residue peptide, WAGGDASGE (CAS 62568-57-4). Check the mass and the lot COA. Sold as a 10 mg vial for research use only."
const DESCRIPTION =
  'DSIP is a synthetic nonapeptide with the sequence Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu (WAGGDASGE), built from L-amino acids with both ends left free. Its formula is C35H48N10O15, its average mass is 848.8 g/mol and its CAS number is 62568-57-4. The same molecule is indexed as Emideltide, and it should not be confused with acetylated or amidated versions, which carry different masses. The 10 mg vial is provided for research use in the laboratory only.'

function productDetails(): string {
  return [
    h4('What Is DSIP?'),
    p('DSIP, short for delta sleep-inducing peptide, is a synthetic nonapeptide with the sequence WAGGDASGE (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu). Its formula is C35H48N10O15 and its average molecular weight is 848.8 g/mol. It is also indexed as Emideltide. Veracue supplies it for laboratory research only.'),
    p('Buyers usually check four things first: the sequence, the mass, the CAS number and the database identifier. The same values should appear on the lot certificate you receive.'),
    h4('DSIP at a Glance'),
    kvTable([
      ['Product name', 'DSIP (also indexed as Emideltide)'],
      ['Sequence', 'WAGGDASGE (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu)'],
      ['Length', '9 amino acids (nonapeptide)'],
      ['Termini', 'Free N-terminus and free C-terminus; not acetylated, not amidated'],
      ['Stereochemistry', 'L-amino acids'],
      ['Molecular formula', 'C35H48N10O15'],
      ['Molecular weight (average)', '848.8 g/mol'],
      ['CAS Registry Number', '62568-57-4'],
      ['Additional registry number', '69431-45-4 (appears in NLM MeSH indexing for the same peptide)'],
      ['PubChem CID', '68816'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe the free peptide as a reference structure. Salt or counterion form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What DSIP Is Not'),
    ul([
      'Not an acetylated or amidated peptide. Both termini are free in the reference structure.',
      'Not a different compound just because a record uses another name. Emideltide and DSIP refer to the same molecule.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the DSIP sequence tell me?'),
    p('WAGGDASGE is nine residues: tryptophan, alanine, glycine, glycine, aspartic acid, alanine, serine, glycine and glutamic acid. Both ends of the chain are free, so the peptide is neither acetylated at the N-terminus nor amidated at the C-terminus.'),
    p('The sequence matters when you compare supplier documents. A record that shows a different length, residue order or terminal modification describes a different compound.'),
    h5('Why do two registry numbers appear?'),
    p('Chemical catalogs almost always use CAS 62568-57-4. NLM MeSH indexing records for the same peptide carry 69431-45-4 instead. Both point at the same peptide, so the second number on an indexing record is not a warning sign. An unexplained third number on a certificate is worth resolving before the vial goes into an assay.'),
    h5('Is Emideltide the same as DSIP?'),
    p('Yes. Emideltide is the nonproprietary name used in records for the same molecule. A shared name does not by itself confirm salt form, purity or isomeric composition, so check the certificate for those.'),

    h4('Identity Reference'),
    table(
      ['Field', 'Value'],
      [
        ['Other names', 'Emideltide; DSIP nonapeptide'],
        ['Sequence (1-letter)', 'WAGGDASGE'],
        ['Sequence (3-letter)', 'Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu'],
        ['Molecular formula', 'C35H48N10O15'],
        ['Average molecular weight', '848.8 g/mol'],
        ['CAS number', '62568-57-4'],
        ['PubChem CID', '68816'],
        ['InChIKey', 'ZRZROXNBKJAOKB-GFVHOAGBSA-N'],
      ],
    ),

    h4('Research Context'),
    h5('What is known about how DSIP works?'),
    p('Not much is settled. No receptor, precursor protein or gene for DSIP has been identified, and the mechanism is not established. Laboratory-model work has reported indirect interactions with several signaling systems, which describes pathway activity in those models and not a defined mechanism.'),
    h5('What should I ask when reading a DSIP paper?'),
    p('Ask four questions: which system was used, which comparator, which endpoint and which chemical form. Many papers do not say whether they used the free peptide or a salt, so they cannot be matched to a specific research lot. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a DSIP Certificate of Analysis'),
    p('A certificate of analysis answers narrow questions well and broad ones not at all. It documents one lot, so read it as a set of linked facts. Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial in your hand.'],
        ['Product identity', 'The compound name, which should agree with the formula and weight shown.'],
        ['Sequence or molecular identity', 'Whether the record ties the material to WAGGDASGE.'],
        ['Purity', 'The reported chromatographic purity value for that lot.'],
        ['HPLC method', 'The method and detection conditions behind the purity value.'],
        ['Mass spectrometry result', 'Whether the measured mass fits the DSIP reference mass.'],
        ['Molecular form', 'Free peptide, acetate or another counterion. Acetate content shifts the mass on the COA.'],
        ['Testing laboratory and date', 'Who performed the analysis and how recent it is.'],
      ],
    ),
    p('A generic certificate for an unnamed batch documents nothing about your material. Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('HPLC and Mass Spectrometry: Two Different Questions'),
    p('HPLC separates the peptide from related substances and reports chromatographic purity as a percentage of peak area. It shows how much of the detected material is the main peak. It does not identify that peak, and it does not give the net peptide content of the vial, because a peptide vial can also hold counter-ions, residual solvent and water.'),
    p('Mass spectrometry supplies the identity half. An observed mass consistent with the expected mass supports the assignment, and support is not proof. Mass cannot separate molecules with identical elemental composition.'),

    h4('Why Does the Aspartic Acid Residue Matter?'),
    p('DSIP has an aspartic acid at position five. Aspartyl residues in peptides are known to isomerize through a succinimide intermediate, giving isoaspartyl forms with the same elemental composition and therefore the same mass. Mass spectrometry alone will not separate those forms, and chromatography resolves them only with some methods. If isomeric composition matters to your work, ask which method was used and whether it was validated to resolve those peaks.'),
    p('Peptide-related impurities from incomplete coupling, truncation or side reactions during synthesis are also possible, which is another reason to read the purity value together with its method.'),

    h4('Need lot documentation for DSIP?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the help and FAQ page</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('DSIP is supplied for laboratory research, scientific investigation and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration. It is not a drug, supplement, cosmetic or food. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is DSIP?',
    answer: 'DSIP is a synthetic nonapeptide with the sequence WAGGDASGE, also indexed as Emideltide. Veracue supplies it as a research material for laboratory use only.',
  },
  {
    question: 'Is Emideltide the same thing as DSIP?',
    answer: 'Yes. Emideltide is the nonproprietary name used in records for the same peptide. A shared name does not confirm salt form, purity or isomeric composition, so still check the COA.',
  },
  {
    question: 'What is the DSIP sequence?',
    answer: 'Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu, written WAGGDASGE in single-letter code. Both termini are free rather than acetylated or amidated.',
  },
  {
    question: 'What is the molecular weight of DSIP?',
    answer: 'The average mass is 848.8 g/mol, from the molecular formula C35H48N10O15. If material is supplied as an acetate salt, the mass reported on the COA will differ, which is why the form is stated on lot documentation.',
  },
  {
    question: 'What is the CAS number for DSIP?',
    answer: 'It is 62568-57-4, the number chemical suppliers and databases use. NLM indexing records for the same peptide also carry 69431-45-4, so both may appear in literature searches.',
  },
  {
    question: 'What is the mechanism of DSIP?',
    answer: 'It has not been established. No DSIP receptor, precursor protein or gene has been identified, and laboratory-model reports describe indirect pathway interactions rather than a defined mechanism.',
  },
  {
    question: 'What does a DSIP certificate of analysis show?',
    answer: 'It documents the analytical result for one specific lot. Typically that means chromatographic purity by HPLC, an identity result by mass spectrometry and the lot number those results belong to. Check that the lot on the certificate matches the lot on the vial.',
  },
  {
    question: 'What does HPLC purity actually measure?',
    answer: 'It measures how much of the detected material sits in the main chromatographic peak, as a percentage of peak area. It does not identify that peak and does not give net peptide content, since a vial can also hold counter-ions, water and residual solvent.',
  },
  {
    question: 'What does mass spectrometry confirm?',
    answer: 'It supports identity by showing that the observed mass matches the expected mass. It cannot separate molecules with identical elemental composition, and DSIP has an aspartic acid residue that can isomerize to an isoaspartyl form with the same mass.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use.',
  },
  {
    question: 'Does Veracue provide usage instructions for DSIP?',
    answer: 'No. DSIP is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'DSIP',
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
