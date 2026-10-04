import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Melanotan II. Research-use-only copy: molecular identity, melanocortin-receptor assay context,
// analytical documentation. Facts come from docs/product-contents-1/veracue-melanotan-2-product-page-v2.json;
// human study content, self-administration reports, regulatory framing, related drug names and references are left out.

const NAME = 'Melanotan II'
const SLUG = 'melanotan-ii'

const SKU_CODE = 'MT2'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Melanotan_II_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Melanotan II Research Peptide (MT2)'
const SEO_DESCRIPTION =
  "Melanotan II is a cyclic peptide with a lactam bridge (CAS 121062-08-6), unlike linear Melanotan 1. The 10 mg vial is for research use only."
const DESCRIPTION =
  'Melanotan II is a synthetic cyclic heptapeptide analogue of alpha-MSH, written Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2, with a lactam bridge joining the Asp and Lys side chains. Its formula is C50H69N15O9, its average mass about 1024.2 g/mol and its CAS number 121062-08-6. Names such as Melanotan 1 point to a different, linear thirteen-residue peptide, so identifiers matter. Veracue sells the 10 mg vial strictly for laboratory research.'

function productDetails(): string {
  return [
    h4('What Is Melanotan II?'),
    p('Melanotan II is a synthetic cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone, with the sequence Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2. A side-chain lactam bridge between aspartate and lysine closes the ring. In receptor assays it is described as a non-selective agonist across MC1R, MC3R, MC4R and MC5R. Veracue supplies it for laboratory research only.'),
    p('It is also written Melanotan 2, MT-II or MT2. All of those names refer to the same molecule, and all resolve to CAS 121062-08-6. It is easy to confuse with Melanotan I, which is a different peptide, so the comparison table in the research tab is worth a look.'),
    h4('Melanotan II at a Glance'),
    kvTable([
      ['Product name', 'Melanotan II (also Melanotan 2, MT-II, MT2)'],
      ['Peptide class', 'Synthetic cyclic heptapeptide analogue of alpha-MSH'],
      ['Sequence', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2'],
      ['Cyclization', 'Side-chain lactam bridge between Asp and Lys'],
      ['Molecular formula (free peptide)', 'C50H69N15O9'],
      ['Molecular weight (average)', 'About 1024.2 g/mol'],
      ['Monoisotopic mass', 'About 1023.5403 Da'],
      ['CAS Registry Number', '121062-08-6'],
      ['PubChem CID', '92432'],
      ['UNII', 'UPF5CJ93X7'],
      ['ChEMBL', 'CHEMBL430239'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe the molecule as recorded in public chemical databases. They are not a statement about the material in a particular vial. Salt form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Melanotan II Is Not'),
    ul([
      'Not the same molecule as Melanotan I (Melanotan 1), which is a longer, linear peptide.',
      'Not a disulfide-bridged peptide. The ring is a lactam and the formula contains no sulfur.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the Melanotan II structure look like?'),
    p('Melanotan II is a seven-residue peptide built around the His-Phe-Arg-Trp core sequence found in the melanocortin family. Four modifications set it apart from the matching fragment of the native hormone, and one structural feature defines its shape.'),
    table(
      ['Feature', 'What it is'],
      [
        ['N-terminal acetylation', 'The N-terminal amine is capped with an acetyl group, written Ac-, which removes a free charge at that end of the chain.'],
        ['Norleucine (Nle)', 'Norleucine stands in for methionine. It is close in shape but carries no sulfur, so it is not subject to methionine oxidation.'],
        ['D-phenylalanine (D-Phe)', 'The phenylalanine residue is the D-enantiomer rather than the usual L-form.'],
        ['C-terminal amide', 'The chain ends in an amide (-NH2) rather than a free carboxylic acid.'],
        ['Lactam bridge', 'The Asp side-chain carboxyl and the Lys side-chain amine are joined by an amide bond, closing the ring. It is not a disulfide, and there is no cysteine in the molecule.'],
      ],
    ),
    h5('Why do the residue numbers run from 4 to 10?'),
    p('Literature often keeps the parent hormone’s numbering: Nle4, Asp5, His6, D-Phe7, Arg8, Trp9 and Lys10. That is why a seven-residue peptide can appear with positions running from 4 to 10. It is the same molecule.'),

    h4('Melanotan II vs. Melanotan I at a Glance'),
    table(
      ['Attribute', 'Melanotan II', 'Melanotan I (Melanotan 1)'],
      [
        ['Names in use', 'Melanotan 2, MT-II, MT2', 'Melanotan 1, NDP-alpha-MSH'],
        ['Structure', 'Cyclic heptapeptide with a side-chain lactam bridge', 'Linear tridecapeptide'],
        ['Sequence', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2'],
        ['Formula', 'C50H69N15O9', 'C78H111N21O19'],
        ['Average mass', 'About 1024.2 g/mol', 'About 1646.9 g/mol'],
        ['CAS', '121062-08-6', '75921-69-6'],
        ['Relationship to alpha-MSH', 'Truncated, conformationally constrained analogue', 'Full-length analogue with Nle4 and D-Phe7 substitutions'],
        ['Receptor context', 'Described as non-selective across MC1R, MC3R, MC4R and MC5R', 'Reported as preferentially active at MC1R'],
      ],
    ),
    p('They are two different molecules with separate CAS registrations and separate formulas, and their masses differ by more than 600 Da. Data generated for one does not transfer to the other.'),

    h4('Receptor Context'),
    h5('What are the melanocortin receptors?'),
    p('The melanocortin system has five G protein-coupled receptors, MC1R through MC5R, which signal mainly through Gs and adenylyl cyclase. Melanotan II is characterized in receptor pharmacology as a non-selective agonist across MC1R, MC3R, MC4R and MC5R, with reported affinities and potencies that vary between receptor subtypes and between experimental systems. It is not described as an agonist at MC2R, which responds to ACTH rather than to MSH peptides.'),
    h5('How should a receptor result be read?'),
    p('These findings come from binding assays and functional assays, typically cAMP measurement in receptor-expressing cell lines. They describe how the molecule behaves at a defined target in a defined system. Values for the same receptor differ between laboratories and assay formats, so a single published EC50 or Ki is best read as one measurement rather than a fixed property.'),
    p('A ligand active across several subtypes is useful as a pharmacological tool and harder to interpret when an effect is seen, because more than one receptor may be involved. Receptor activity alone does not establish an outcome in an intact organism, which depends on distribution, metabolism, tissue receptor expression and species, each of which has to be shown separately.'),

    h4('Practical Questions Researchers Ask'),
    h5('Which compound do I actually have?'),
    p('Melanotan 2, Melanotan II, MT-II and MT2 all name one molecule, while Melanotan and Melanotan 1 name another. Product titles vary between suppliers, so match the CAS number (121062-08-6) and the stated sequence before the product name. Documentation that gives only a trade-style name cannot be checked against a reference record.'),
    h5('Is the database formula the same as the material in the vial?'),
    p('Not necessarily. C50H69N15O9 and about 1024.2 g/mol describe the free peptide. Peptides with basic residues are commonly isolated as salts, and salt forms carry different formulas, different molecular weights and a different mass of peptide per milligram of solid. The salt form of Veracue’s Melanotan II is not stated here and should not be assumed. It is reported on the lot documentation.'),
    h5('Why does the lactam ring matter?'),
    p('Lactam bridges are not cleaved by the reducing conditions used on disulfide-cyclized peptides. Method notes that describe a disulfide in Melanotan II are worth querying, since they may have been written for a different compound.'),
    h5('How do I read the sequence line?'),
    p('Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2 packs five pieces of information into one line. Ac- marks the acetylated N-terminus, Nle is norleucine in place of methionine, the bracketed residues sit inside the ring, D-Phe is the D-enantiomer of phenylalanine, and the final -NH2 marks the C-terminal amide. A record that leaves out the stereochemistry or the terminal amide has left out something that matters.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and receptor context at the assay level. It cannot establish the composition, purity, salt form or stability of a particular vial. Those questions are answered by lot-specific analytical documentation. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Melanotan II Certificate of Analysis'),
    p('What a certificate of analysis contains depends on the methods used, so treat the list below as what is generally worth looking for rather than a fixed standard.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Product name and reference identity', 'Which molecule the document concerns, ideally with a CAS number.'],
        ['Lot or batch reference', 'Which physical material the results apply to. It should match the vial.'],
        ['Identity method and result', 'How identity was confirmed and what was measured.'],
        ['Purity or assay result', 'The measured figure, reported with the method that produced it.'],
        ['Method detail', 'Enough of the analytical conditions for the result to be interpretable.'],
        ['Specification', 'The acceptance criterion the result is assessed against.'],
        ['Date of testing', 'When the work was carried out.'],
        ['Testing laboratory', 'Which laboratory produced the result.'],
        ['Analytical notes', 'Impurity profile or observations the method could not resolve, where reported.'],
      ],
    ),
    p('A specification sheet without a lot reference describes an intended standard rather than a tested batch. A label alone does not establish lot-specific identity or content, so look for a lot reference, a named method and a measured result together. The certificate page explains how to review and request lot documentation.', { links: CERT }),

    h4('Calculated Mass vs. Measured m/z'),
    table(
      ['Value', 'Figure'],
      [
        ['Calculated monoisotopic mass (neutral free peptide)', 'About 1023.5403 Da'],
        ['Average molecular weight', 'About 1024.2 g/mol'],
      ],
    ),
    p('Electrospray mass spectrometry measures ions rather than neutral molecules and can produce singly and multiply charged species, so the observed m/z depends on charge state and on analytical conditions. Singly protonated [M+H]+ and doubly protonated [M+2H]2+ species, sodium or potassium adducts and counterion-associated species may all appear depending on sample preparation and instrument settings. A spectrum is read against the charge states and adducts the method would be expected to produce, not against the calculated neutral mass alone.'),

    h4('Verification Questions, Answered'),
    h5('How do I confirm the material is Melanotan II?'),
    p('Start with the molecule: the sequence Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2, formula C50H69N15O9, average mass near 1024.2 g/mol, PubChem CID 92432 and CAS 121062-08-6. Those identifiers describe the molecule, not a vial. Confirming a lot takes analytical data tied to that lot number.'),
    h5('Why is a lot-specific certificate needed?'),
    p('Molecular characterization says nothing about the purity of a given lot, and a lot certificate says nothing about receptor pharmacology. They answer different questions and do not substitute for one another. No purity, identity or content claim for this compound should be inferred from sitewide analytical standards alone.'),

    h4('Need lot documentation for Melanotan II?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li><li><a href="/faq">Read the general research FAQs</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Melanotan II is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a medicine, supplement or consumer good, and it is not intended for human or veterinary use, or for ingestion, injection or any form of administration. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Melanotan II?',
    answer: 'Melanotan II is a synthetic cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone, sequence Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2, closed by a lactam bridge between aspartate and lysine. Receptor assays describe it as a non-selective agonist across MC1R, MC3R, MC4R and MC5R. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What do MT2 and Melanotan 2 mean?',
    answer: 'MT2, MT-II, Melanotan 2 and Melanotan II all name the same compound. The Roman and Arabic numeral forms are used interchangeably, and all refer to CAS 121062-08-6 and PubChem CID 92432.',
  },
  {
    question: 'Is Melanotan II the same as Melanotan I?',
    answer: 'No. Melanotan I is a linear thirteen-residue peptide with formula C78H111N21O19 and CAS 75921-69-6. Melanotan II is a cyclic seven-residue peptide, C50H69N15O9, CAS 121062-08-6, and the two differ in length, structure, mass and receptor profile.',
  },
  {
    question: 'What is the Melanotan II sequence?',
    answer: 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2. The ring is closed by a lactam bridge between the aspartate and lysine side chains, not by a disulfide bond.',
  },
  {
    question: 'What is the molecular weight and formula of Melanotan II?',
    answer: 'The free peptide has the formula C50H69N15O9, an average molecular weight of about 1024.2 g/mol and a monoisotopic mass of about 1023.5403 Da. Salt forms carry different formulas and different molecular weights.',
  },
  {
    question: 'Which melanocortin receptors is Melanotan II described at?',
    answer: 'Receptor pharmacology describes it as a non-selective agonist across MC1R, MC3R, MC4R and MC5R. It is not described as an agonist at MC2R, which responds to ACTH.',
  },
  {
    question: 'Is the Melanotan II ring a disulfide bond?',
    answer: 'No. The ring is a lactam, an amide bond between the aspartate and lysine side chains. The molecule has no cysteine and its formula contains no sulfur.',
  },
  {
    question: 'How should Melanotan II mass-spectrometry results be read?',
    answer: 'A calculated mass and an observed m/z value are not automatically the same number. Check the charge state, adducts and method first, since [M+H]+, [M+2H]2+ and sodium or potassium adducts can all appear.',
  },
  {
    question: 'What should a Melanotan II COA include?',
    answer: 'It generally covers the product name and reference identity, the lot reference, the identity method and result, a purity or assay result with its method, the specification, the date of testing and the testing laboratory. A document without a lot reference describes an intended standard rather than a tested batch.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Melanotan II?',
    answer: 'No. Melanotan II is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Melanotan II',
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
