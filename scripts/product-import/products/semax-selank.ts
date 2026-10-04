import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Semax/Selank 10/10 mg blend. Research-use-only copy: molecular identity of each component, assay-level
// context, analytical documentation. Facts come from docs/product-contents-1/semax-selank-product-page.json;
// human study content, disease models, regulatory framing, references and consumer search-term sections are left out.

const NAME = 'Semax/Selank'
const SLUG = 'semax-selank'

const SKU_CODE = 'SEMSEL'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg/10mg', image: 'VERACUE_Semax_Selank_10_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Semax/Selank Research Blend (2 Peptides)'
const SEO_DESCRIPTION =
  "Semax/Selank is two peptides in one 10/10 mg vial, so a COA should confirm both (CAS 80714-61-0 and 129954-34-3). Research use only."
const DESCRIPTION =
  'Semax/Selank is a research blend of two separate synthetic heptapeptides. Semax is Met-Glu-His-Phe-Pro-Gly-Pro (C37H51N9O10S, average mass 813.93, CAS 80714-61-0) and Selank is Thr-Lys-Pro-Arg-Pro-Gly-Pro (C33H57N11O9, average mass 751.89, CAS 129954-34-3). Both end in a Pro-Gly-Pro tail, which is why the two names are so easily mixed up. The vial holds 10 mg of each peptide and is supplied for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is Semax/Selank?'),
    p('Semax/Selank is a blend of two distinct synthetic heptapeptides. Semax (Met-Glu-His-Phe-Pro-Gly-Pro) is derived from an ACTH fragment, and Selank (Thr-Lys-Pro-Arg-Pro-Gly-Pro) is derived from the tuftsin sequence. Both carry a Pro-Gly-Pro tail. Veracue supplies the blend for laboratory research only.'),
    p('The two names turn up in the same searches, and terms like “semax and selank” can suggest a single molecule. They are two molecules with different first four residues, different parent sequences and different masses, so a finding for one should not be carried over to the other.'),
    h4('Semax/Selank at a Glance'),
    kvTable([
      ['Product name', 'Semax/Selank'],
      ['Components', 'Semax and Selank, two separate synthetic heptapeptides'],
      ['Semax sequence', 'Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP)'],
      ['Selank sequence', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP)'],
      ['Average molecular weight (reference)', 'Semax 813.93 g/mol; Selank 751.89 g/mol'],
      ['CAS Registry Numbers', 'Semax 80714-61-0; Selank 129954-34-3'],
      ['Size offered', '10 mg of Semax and 10 mg of Selank'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formulas and masses are reference values for the free-acid form of each peptide. They describe the molecules, not any particular vial. Purity, identity, chemical form and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Semax/Selank Is Not'),
    ul([
      'Not a single peptide. It contains two separate molecules.',
      'Not the same as full-length ACTH, ACTH(4-10) or tuftsin, which are related but different sequences.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity of Each Component'),
    h5('What are the identifiers for Semax and Selank?'),
    table(
      ['Attribute', 'Semax', 'Selank'],
      [
        ['Alternate names', 'ACTH(4-7)-Pro-Gly-Pro; MEHFPGP', 'Selanc; TKPRPGP'],
        ['Sequence', 'Met-Glu-His-Phe-Pro-Gly-Pro', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro'],
        ['Length', '7 amino acids', '7 amino acids'],
        ['Molecular formula', 'C37H51N9O10S', 'C33H57N11O9'],
        ['Average molecular weight', '813.93 g/mol', '751.89 g/mol'],
        ['Monoisotopic mass (calculated)', '813.348 Da', '751.434 Da'],
        ['CAS Registry Number', '80714-61-0', '129954-34-3'],
        ['PubChem CID', '9811102', '11765600'],
        ['Derived from', 'ACTH(4-7) fragment plus Pro-Gly-Pro', 'Tuftsin (Thr-Lys-Pro-Arg) plus Pro-Gly-Pro'],
      ],
    ),
    p('The two peptides are the same length and share the Pro-Gly-Pro ending, so length will not tell them apart. Composition will: Semax contains sulfur through its methionine and Selank does not. The table does not rank either peptide.'),
    h5('How do the ACTH and tuftsin names relate to each peptide?'),
    p('“ACTH-derived” describes ancestry, not identity. ACTH is a 39-residue hormone, and ACTH(4-10) is the seven-residue fragment Met-Glu-His-Phe-Arg-Trp-Gly. Semax keeps the first four residues of that fragment and swaps the last three for Pro-Gly-Pro. Semax is not ACTH and it is not ACTH(4-10).'),
    p('Tuftsin is a naturally occurring tetrapeptide, Thr-Lys-Pro-Arg. Selank is that sequence extended with Pro-Gly-Pro, a change described as improving metabolic stability. It is an analog, related in origin and different as a molecule, so tuftsin data should not be assumed for Selank.'),
    h5('Which chemical forms should I watch for?'),
    p('Semax acetate (C39H55N9O12S, about 874.0 g/mol) is a separate chemical form from the free peptide, and supplier naming is not always consistent about which one is meant. Salt forms of Selank, such as acetate, are likewise separate chemical forms. Names like “N-acetyl Semax” describe chemically modified compounds and are not covered here.'),

    h4('Research Context'),
    h5('What has been studied at the assay level?'),
    p('In an in vitro enzyme study, both peptides inhibited enkephalin-degrading enzymes, with reported IC50 values of about 10 µM for Semax and 20 µM for Selank. Labeled Semax has been shown to bind rat basal forebrain membranes, and it stimulated BDNF synthesis in cultured rat astrocytes. In rat hippocampal work, Semax was reported to raise BDNF protein and trkB signaling.'),
    p('For Selank, radioligand experiments reported positive allosteric modulation of GABA binding, and rat cortex studies found broad shifts in gene expression related to neurotransmission. Selank has also been reported to affect BDNF expression in rat hippocampus.'),
    h5('How should these findings be read?'),
    p('Most of this work comes from cell and rodent systems and from a small number of research groups, and routes, timing and models differ from paper to paper, so the results do not add up to one neat picture. Semax work leans toward neurotrophin signaling, while Selank work leans toward GABA-related signaling and gene expression. Only one in vitro study tested both peptides, so the two literatures cannot be lined up head to head.'),
    p('Nothing in the published work reviewed here demonstrates a combined or synergistic effect between the two peptides. A combination would be its own experimental question with its own design and controls. The mechanisms of both peptides are still being worked out, and observations in a tissue or cell system are not the same as an established mechanism.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a COA for a Two-Peptide Blend'),
    p('A certificate of analysis documents one lot, not the compounds in general. Depending on the laboratory, it may include the items below. For a blend, look for each item to cover both peptides, because a single result for one component does not describe the other.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial.'],
        ['Peptide names, sequences or formulas', 'Whether the record names both Semax and Selank and ties each to its own sequence.'],
        ['Analytical method and conditions', 'The method and detection conditions behind the results.'],
        ['HPLC chromatogram and purity result', 'How much of the material elutes as the target peak or peaks.'],
        ['Mass spectrometry identity result', 'Whether detected masses fit the expected molecules.'],
        ['Test date and laboratory information', 'Who performed the analysis and how recent it is.'],
        ['Chemical form', 'Free peptide, acetate or another salt, and sometimes counterion or water content.'],
      ],
    ),
    p('Check that the lot on the certificate matches your vial and that the named peptides and sequences match what you expect. Any field above depends on the lot’s own documentation, and the certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Two Identity Checks and Two Masses'),
    p('Because the vial holds two peptides, a full identity check has two parts. Semax should be matched to Met-Glu-His-Phe-Pro-Gly-Pro, C37H51N9O10S, average mass 813.93, and Selank to Thr-Lys-Pro-Arg-Pro-Gly-Pro, C33H57N11O9, average mass 751.89. A record that confirms only one of the two leaves the other unverified.'),
    table(
      ['Value', 'Semax', 'Selank'],
      [
        ['Calculated monoisotopic mass', '813.348 Da', '751.434 Da'],
        ['Average molecular weight', '813.93 g/mol', '751.89 g/mol'],
      ],
    ),
    h5('Chromatography and mass spectrometry answer different questions'),
    p('HPLC shows how much of the material elutes as the target peak, but it cannot say the peak is the right molecule. Mass spectrometry shows whether a detected mass fits the expected molecule, but it does not quantify purity. A COA that ties both results to a lot number matching your vial gives firmer assurance than one that does not.'),
    h5('Why do observed mass values differ from the data sheet?'),
    p('A mass spectrometer detects ions, not vials. A peptide can carry one or more charges, so one molecule can show up at several m/z values, and observed signals will not match the molecular weight on a data sheet. Adducts, counterions and chemical modifications can shift or add signals, and methionine-containing peptides such as Semax can oxidize. Interpretation belongs to the analytical record and its method conditions, which is why no expected peak values are listed here.'),
    h5('What do the different mass terms mean?'),
    p('Molecular weight is an average across natural isotopes and is the number on most data sheets. Monoisotopic mass uses the single most abundant isotope of each element, which is closer to what a high-resolution instrument resolves. m/z is mass divided by charge, for an ion rather than the neutral molecule. An expected mass describes the molecule. It does not show that a given vial contains it.'),

    h4('Need lot documentation for Semax/Selank?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library. Molecular facts belong to the molecule, while analytical facts belong to the lot, so ask for the documentation for your lot before treating any figure as verified.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li><li><a href="/faq">Read the Help and FAQ page</a></li><li><a href="/about-us">Learn about Veracue</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Semax and Selank are offered for laboratory research and analytical use only. They are not intended for human or veterinary use, for ingestion, injection or any form of administration, or to diagnose, treat, cure or prevent any disease. Statements on this page have not been evaluated by the U.S. Food and Drug Administration. This page provides no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Semax/Selank?',
    answer: 'Semax/Selank is a blend of two distinct synthetic heptapeptides, Semax and Selank. Veracue supplies it in a 10/10 mg vial for laboratory research only.',
  },
  {
    question: 'What is the difference between Semax and Selank?',
    answer: 'Their sequences, parent peptides and research literatures differ. Semax derives from an ACTH fragment and Selank derives from tuftsin, and they share a Pro-Gly-Pro tail.',
  },
  {
    question: 'What are the sequences and molecular weights of Semax and Selank?',
    answer: 'Semax is Met-Glu-His-Phe-Pro-Gly-Pro, C37H51N9O10S, average mass 813.93 g/mol. Selank is Thr-Lys-Pro-Arg-Pro-Gly-Pro, C33H57N11O9, average mass 751.89 g/mol, both as free-peptide reference values.',
  },
  {
    question: 'What are the CAS numbers for Semax and Selank?',
    answer: 'Semax is CAS 80714-61-0 and Selank is CAS 129954-34-3. These identify the molecules, not any particular lot.',
  },
  {
    question: 'What does 10/10 mg mean?',
    answer: 'It means the vial is listed with 10 mg of Semax and 10 mg of Selank. The lot documentation is where analytical results for the material are reported.',
  },
  {
    question: 'How can I tell Semax from Selank on paper?',
    answer: 'Start with the sequence, not the label. Both are seven residues ending in Pro-Gly-Pro, but Semax contains sulfur through methionine and Selank does not, and their masses are about 813.9 and 751.9.',
  },
  {
    question: 'Does research show a combined effect of Semax and Selank?',
    answer: 'No. Nothing in the published work reviewed here demonstrates a combined or synergistic effect, and each peptide has its own literature.',
  },
  {
    question: 'What should a Semax/Selank COA show?',
    answer: 'A COA may include the lot number, method, HPLC purity, mass spectrometry identity, test date, laboratory and chemical form. For a blend, look for identity results covering both peptides.',
  },
  {
    question: 'Does chemical form matter?',
    answer: 'Yes. A free peptide and an acetate salt have different formulas and masses, and Semax acetate, for example, is about 874.0 g/mol against 813.93 for the free form. The form of Veracue’s material is reported on each lot’s documentation.',
  },
  {
    question: 'Why do mass spectrometry values not match the listed weights?',
    answer: 'A spectrometer reports m/z for charged ions, so one molecule can appear at several values. Adducts, counterions and methionine oxidation can shift signals further.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA. Veracue provides no dosing, administration or usage guidance.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Semax/Selank',
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
