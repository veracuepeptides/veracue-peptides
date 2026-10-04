import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// PT-141 (cyclic melanocortin peptide). Research-use-only copy: molecular identity, lactam ring,
// melanocortin-receptor context at assay level, COA reading. Facts come from
// docs/product-contents-1/veracue-pt-141-product-page.json; the approved-product and generic names,
// human study content, behavior-model and sexual-function wording, safety information, nasal-spray
// history, regulatory framing, references and internal notes are intentionally left out.

const NAME = 'PT-141'
const SLUG = 'pt-141'

const SKU_CODE = 'PT141'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_PT_141_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate archive', href: '/certificates' }]

const SEO_TITLE = 'PT-141 Research Peptide (CAS 189691-06-3)'
const SEO_DESCRIPTION =
  "PT-141 is a cyclic lactam peptide that ends in a free acid, unlike Melanotan II (CAS 189691-06-3). Comes as a 10 mg vial, for research use only."
const DESCRIPTION =
  'PT-141 is a synthetic cyclic heptapeptide written Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH, where a lactam bridge between the aspartic acid and lysine side chains closes the ring. Its formula is C50H68N14O10, its average mass is about 1025.2 g/mol and its CAS number is 189691-06-3. It shares a cyclic core with Melanotan II but ends in a free acid rather than an amide, which makes them separate compounds. Veracue supplies PT-141 as a single 10 mg vial, strictly for laboratory research.'

function productDetails(): string {
  return [
    h4('What Is PT-141?'),
    p('PT-141 is a synthetic cyclic heptapeptide that acts as a melanocortin receptor agonist in laboratory assays. It has seven residues, an acetylated N-terminus and a lactam ring between Asp and Lys. Formula and molecular weight describe the molecule itself, while purity, salt form and lot identity come from the documentation for a specific lot. Veracue supplies PT-141 for laboratory research only.'),
    h4('PT-141 at a Glance'),
    kvTable([
      ['Product name', 'PT-141 (also written PT141)'],
      ['Peptide class', 'Cyclic heptapeptide, melanocortin receptor agonist'],
      ['Sequence', 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH'],
      ['Molecular formula', 'C50H68N14O10 (free peptide)'],
      ['Molecular weight (average)', 'About 1025.2 g/mol'],
      ['Monoisotopic mass', '1024.52428442 Da'],
      ['CAS Registry Number', '189691-06-3'],
      ['PubChem CID', '9941379'],
      ['UNII', '6Y24O4F92S'],
      ['Size offered', '10 mg vial'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These rows describe the free peptide as a reference molecule. Salt or counterion form, purity, physical form and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What PT-141 Is Not'),
    ul([
      'Not the same molecule as Melanotan II, which ends in an amide instead of a free acid.',
      'Not a disulfide-bonded peptide. The ring is a lactam, and there is no cysteine.',
      'Not a consumer product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('How should I read the PT-141 sequence and ring?'),
    p('Read it as Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH: seven residues, one acetyl cap and one lactam ring. The residues are norleucine, aspartic acid, histidine, D-phenylalanine, arginine, tryptophan and lysine. An acetyl group caps the N-terminus, and the C-terminus is a free carboxylic acid.'),
    p('The ring is a side-chain lactam (amide) linkage between Asp and Lys. It is not a disulfide bond, and no cysteine is present. Norleucine (Nle) is a non-proteinogenic residue, and D-phenylalanine is the D-enantiomer rather than the L-form found in native α-MSH. Single-letter strings such as XDHFRWK are handy for searching, but they leave out the acetyl group, the D-configuration and the ring, so check the three-letter form as well.'),
    table(
      ['Position', 'Residue', 'What to notice'],
      [
        ['1', 'Ac-Nle', 'Acetylated N-terminus. Norleucine is a non-proteinogenic residue and sits outside the ring.'],
        ['2', 'Asp', 'Its side-chain carboxyl forms one end of the lactam linkage.'],
        ['3', 'His', 'Part of the His-Phe-Arg-Trp core shared with α-MSH.'],
        ['4', 'D-Phe', 'The D-enantiomer, rather than the L-form found in α-MSH.'],
        ['5', 'Arg', 'Part of the core motif.'],
        ['6', 'Trp', 'Part of the core motif.'],
        ['7', 'Lys', 'Its side-chain amine closes the ring. The C-terminus stays a free carboxylic acid.'],
      ],
    ),
    h5('How do I confirm what “PT-141” refers to?'),
    p('PT-141 and PT141 are two spellings of one name. Databases anchor it with identifiers: PubChem CID 9941379, CAS 189691-06-3 and UNII 6Y24O4F92S all point to the free peptide. A shared name still does not make two materials identical, though. Salt form, water content and impurities can differ by supplier and lot, so lot documentation is what confirms a specific material.'),
    h5('Is a database entry proof of what is in the vial?'),
    p('No. The entries above describe the free peptide. An acetate salt of the same peptide has added acetic acid, a different composition and a higher molecular mass, so a database entry for the parent molecule should not be used as proof of the exact form in a vial. Veracue’s product-specific salt or counterion form is reported on each lot’s documentation.'),

    h4('PT-141 vs. Melanotan II at a Glance'),
    table(
      ['Attribute', 'PT-141', 'Melanotan II'],
      [
        ['Cyclic core', 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)', 'Same cyclic core'],
        ['C-terminus', 'Free carboxylic acid', 'C-terminal amide'],
        ['Molecular formula', 'C50H68N14O10', 'C50H69N15O9'],
        ['Relationship', 'Target compound', 'Related melanocortin peptide'],
      ],
    ),
    p('Both are structurally related melanocortin peptides built on the same cyclic core. That single C-terminal difference gives them different formulas and masses, so they are not synonyms. The table does not rank them.'),

    h4('Research Context'),
    h5('What does melanocortin receptor activity establish?'),
    p('Melanocortin receptors, MC1R through MC5R, are G protein-coupled receptors. PT-141 is described as activating several of these subtypes, and the pharmacology literature has looked at its activity at MC1R, MC3R and MC4R in particular.'),
    p('Activity at a receptor shows what a molecule does in a defined assay. It does not show which receptor is responsible for a response in a living organism. Affinity and potency values also vary with species and assay system, so none appear here.'),
    h5('What do researchers ask with a peptide like this?'),
    ul([
      'How does binding and activation compare across the melanocortin receptor subtypes in a defined cell assay?',
      'What does the lactam ring contribute compared with a linear analogue of α-MSH?',
      'How does the free C-terminal acid, compared with an amide, change identity data and behavior in an assay?',
      'How do the D-phenylalanine and norleucine residues compare with the native α-MSH sequence?',
    ]),
    p('Veracue does not provide dosing, administration or usage guidance of any kind, and this page reports molecular reference information and general research context only.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a PT-141 Certificate of Analysis'),
    p('A certificate of analysis documents one lot. A useful one shows what the material is, how a purity figure was obtained and which lot the report covers. Not every certificate carries every test, so a gap is a reason to ask a question, not an automatic failure.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Compound identity', 'May name PT-141, ideally with a formula or structure reference.'],
        ['Lot or batch number', 'Should match the label on your vial.'],
        ['Test date', 'Shows when the analysis ran.'],
        ['Testing laboratory', 'Names who performed the work.'],
        ['Analytical method', 'A named method with stated conditions is more useful than a percentage alone.'],
        ['Purity or assay result, if reported', 'Check what the number means. Chromatographic purity is not the same as net peptide content.'],
        ['Identity testing', 'May include mass spectrometry and any other method the laboratory lists.'],
        ['Mass spectrometry, where performed', 'Look for observed and expected values with the ion and charge state stated.'],
        ['Acceptance criteria, where applicable', 'The limit each result is measured against.'],
        ['Salt or counterion, where documented', 'Free peptide, acetate or another form.'],
      ],
    ),
    p('Check the certificate archive for any publicly available lot documentation. If the relevant PT-141 lot is not listed, contact Veracue to request the documentation available for that material.', { links: [...CERT, ...CONTACT.map(() => ({ phrase: 'contact Veracue', href: '/contact-us' }))] }),

    h4('How Should I Interpret PT-141 Mass-Spectrometry Data?'),
    p('Mass spectrometry reports mass-to-charge ratio (m/z), while molecular weight refers to the neutral molecule. Charge state, adducts and the material’s form can change the observed m/z, so an MS result should be read together with the reported ion, charge state and analytical method.'),
    table(
      ['Value', 'Figure'],
      [
        ['Exact monoisotopic mass of the free peptide', '1024.52428442 Da'],
        ['Average molecular weight', 'About 1025.2 g/mol'],
      ],
    ),
    p('A single missing or shifted peak does not automatically mean a failed identity test. Because Melanotan II differs from PT-141 by roughly one mass unit, it is also worth asking which resolution the laboratory used.'),

    h4('What Can a PT-141 Product Page Establish?'),
    table(
      ['Molecular reference information', 'Lot-specific documentation'],
      [
        ['Names, formula, molecular weight, CAS and PubChem identifiers, sequence and structural features. These hold for the molecule wherever it comes from.', 'Purity, salt or counterion, water content, mass-spectrometry results, testing laboratory, test date and lot number. These belong to the certificate for a specific lot.'],
      ],
    ),
    p('Once a certificate exists, it is the authority for that lot. Purity, physical form, storage, manufacturing details and lot results are reported on each lot’s documentation, and you can request them through the contact page.', { links: CONTACT }),

    h4('Need lot documentation for PT-141?'),
    p('Check the certificates, ask the Veracue team a specific question, or browse the rest of the research catalog.'),
    `<ul><li><a href="/certificates">Explore certificates</a></li><li><a href="/contact-us">Contact Veracue</a></li><li><a href="/shop">View the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Veracue’s PT-141 material is offered for laboratory research use only and is not intended for human or veterinary use. This page does not provide dosing, administration, therapeutic, cosmetic or consumer-use guidance. See the Medical Disclaimer and the Terms and Conditions for sitewide policies, or read more About Veracue.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        { phrase: 'About Veracue', href: '/about-us' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is PT-141?',
    answer: 'PT-141 is a synthetic cyclic heptapeptide that acts as a melanocortin receptor agonist. Veracue offers it as a Research Use Only material for laboratory work.',
  },
  {
    question: 'What is the PT-141 peptide sequence?',
    answer: 'Ac-Nle-cyclo(Asp-His-D-Phe-Arg-Trp-Lys)-OH, with an acetylated N-terminus, a free C-terminal acid and a lactam ring between Asp and Lys.',
  },
  {
    question: 'What is the molecular weight and formula of PT-141?',
    answer: 'About 1025.2 g/mol for the free peptide, formula C50H68N14O10, with a monoisotopic mass of 1024.52428442 Da. The CAS number is 189691-06-3.',
  },
  {
    question: 'Is PT-141 a cyclic peptide?',
    answer: 'Yes. A side-chain lactam between Asp and Lys closes the ring. It contains no cysteine, so it is not a disulfide-bonded peptide.',
  },
  {
    question: 'Is PT-141 the same as Melanotan II?',
    answer: 'No. They are related cyclic peptides, but PT-141 ends in a free carboxylic acid and Melanotan II in an amide, so their formulas and masses differ.',
  },
  {
    question: 'What receptors does PT-141 interact with?',
    answer: 'It activates several melanocortin receptor subtypes in assays. The literature has looked at MC1R, MC3R and MC4R in particular.',
  },
  {
    question: 'Does a database entry describe the exact material in the vial?',
    answer: 'No. The identifiers describe the free peptide. The exact material still depends on its salt form and purity, which are reported on each lot’s documentation.',
  },
  {
    question: 'What should I look for on a PT-141 COA?',
    answer: 'Look for the compound name, lot number, test date, laboratory, named methods, purity or assay results if reported, identity data such as mass spectrometry, and any salt or form information.',
  },
  {
    question: 'How should PT-141 mass-spectrometry results be read?',
    answer: 'Observed m/z is not the same number as molecular weight. Check the reported ion, charge state and method first, since adducts and material form can shift the value.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use.',
  },
  {
    question: 'Does Veracue provide usage instructions for PT-141?',
    answer: 'No. PT-141 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
  {
    question: 'Where can I find more answers on ordering, testing and shipping?',
    answer: 'The Veracue FAQ page covers ordering, testing and shipping, and the contact page is open for questions about a specific lot.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'PT-141',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/bremelanotide/i, /vyleesi/i, /scenesse/i, /afamelanotide/i, /melanotan\s*i\b(?!i)/i, /tanning/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
