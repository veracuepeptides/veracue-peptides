import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Semax/Selank Spray: the same two heptapeptides documented on the live Semax/Selank vial listing
// (scripts/product-import/semax-selank.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts for both components (sequence, formula, mass, CAS, PubChem CID)
// are reused unchanged from the vial page since these are the same two compounds; everything else
// is written fresh and focused on what "Spray" means as a packaging/dispensing descriptor for a
// two-peptide listing, lot verification across both components, and format-specific framing.
// Research-use-only copy only: no human trial, cognitive/mood-outcome, or dosing content, consistent
// with scripts/product-import/semax-selank.ts and scripts/product-import/sermorelin-spray.ts.

const NAME = 'Semax/Selank Spray'
const SLUG = 'semax-selank-spray'

const SKU_CODE = 'SEMSEL-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg/10mg', image: 'VERACUE_Spray_Semax_Selank_10_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const VIAL_LINK = [{ phrase: 'Semax/Selank vial listing', href: '/product/semax-selank' }]

const SEO_TITLE = 'Semax/Selank Spray Research Blend'
const SEO_DESCRIPTION =
  "Semax/Selank Spray packages the heptapeptides Semax and Selank in Veracue's spray format, with full identity data for laboratory research only."
const DESCRIPTION =
  'Semax/Selank Spray combines two separate heptapeptides in one spray-dispensed container. Semax is Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP), built from the ACTH(4-7) fragment plus a Pro-Gly-Pro tail, formula C37H51N9O10S, about 813.93 g/mol, CAS 80714-61-0. Selank is Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP), a tuftsin analogue with the same tail addition, about 751.89 g/mol, CAS 129954-34-3. The two share a short synthetic tail but differ entirely in their parent sequence and origin. Veracue supplies 10 mg of each peptide, strictly for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Semax/Selank Spray?'),
    p('Semax/Selank Spray is Veracue’s spray-dispensed packaging of two distinct synthetic heptapeptides, Semax and Selank, documented together on the Semax/Selank vial listing. The underlying molecules are identical across both listings; only the packaging and dispensing format differs between them.', { links: VIAL_LINK }),
    p('"Spray" in this product’s name is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation for either peptide, and none of those specifics should be inferred from the name. Chemical form, concentration, ratio, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Semax/Selank Spray at a Glance'),
    kvTable([
      ['Product name', 'Semax/Selank Spray'],
      ['Components', 'Semax and Selank, two separate synthetic heptapeptides'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Semax sequence', 'Met-Glu-His-Phe-Pro-Gly-Pro (MEHFPGP)'],
      ['Selank sequence', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP)'],
      ['Average molecular weight (reference)', 'Semax 813.93 g/mol; Selank 751.89 g/mol'],
      ['CAS Registry Numbers', 'Semax 80714-61-0; Selank 129954-34-3'],
      ['Size offered', '10 mg of Semax and 10 mg of Selank'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formulas and masses above are reference values for the free-acid form of each peptide, carried over unchanged from the Semax/Selank vial listing since both listings describe the same two compounds. Purity, identity, chemical form and lot results are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why a Separate Listing for the Same Two Molecules?'),
    p('Veracue lists Semax/Selank in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Semax/Selank Spray Is Not'),
    ul([
      'Not a single peptide. It contains two separate molecules, each with its own sequence and formula.',
      'Not a different pair of molecules from the Semax and Selank documented on the vial listing.',
      'Not the same as full-length ACTH, ACTH(4-10) or tuftsin, which are related but different sequences.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity of Each Component, Carried Over From the Vial Listing'),
    p('Semax/Selank Spray and the Semax/Selank vial listing describe the same two molecules. Packaging format has no bearing on either peptide’s sequence, formula or mass, so the reference values below are identical across both listings.', { links: VIAL_LINK }),
    table(
      ['Attribute', 'Semax', 'Selank'],
      [
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
    h5('Does the spray format change either molecule?'),
    p('No. The two compounds reported under this listing are the same Semax and Selank reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not the chemical identity of either peptide.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a ratio between the two peptides, a carrier, or a route, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('A two-peptide listing makes this distinction more important, not less: a packaging word says nothing about how much of each peptide a given unit contains relative to the other. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray."'),

    h4('Semax and Selank Are Not One Molecule'),
    p('The two names appear together often enough that a single compound identifier can end up in a record where two belong. Semax keeps the first four residues of the ACTH(4-7) fragment and adds a Pro-Gly-Pro tail; Selank extends the tetrapeptide tuftsin with the same Pro-Gly-Pro tail. Composition tells them apart even though length does not: Semax carries sulfur through its methionine, and Selank does not.'),
    p('"ACTH-derived" and "tuftsin-derived" describe ancestry, not identity. Semax is not ACTH and not ACTH(4-10), and Selank is not tuftsin. Each is its own molecule with its own formula, mass and CAS number, listed in the table above.'),

    h4('Research Context at the Assay Level'),
    p('In an in vitro enzyme study, both peptides inhibited enkephalin-degrading enzymes, with reported IC50 values of about 10 µM for Semax and 20 µM for Selank. Separately, Semax has been reported to bind rat basal forebrain membranes and to raise BDNF mRNA in cultured rat glial cells, while Selank has been reported to act as a positive allosteric modulator of GABA binding in isolated rat brain membrane preparations.'),
    h5('How should these assay-level findings be read?'),
    p('Each finding above comes from a specific cell, tissue or membrane system studied under its own conditions, and it describes that system rather than a general property of either molecule. Semax work in the cited studies concentrates on neurotrophin signaling, while Selank work concentrates on GABA-related binding; only one of the studies cited here tested both peptides side by side, so the two bodies of work do not line up directly against each other.'),
    p('Nothing in the assay-level findings summarized here demonstrates a combined or synergistic effect between Semax and Selank. A combination would be its own experimental question with its own design and controls, and the mechanisms of both peptides individually are still being worked out.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a COA for a Two-Peptide Spray Listing'),
    p('A certificate of analysis documents one lot, never a packaging format or a compound in general. For a two-peptide listing like this one, look for each item below to cover both Semax and Selank, because a result for one component says nothing about the other.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the container and the order record for the spray-format unit received.'],
        ['Peptide names, sequences or formulas', 'Whether the record names both Semax and Selank and ties each to its own sequence.'],
        ['Analytical method and conditions', 'The method and detection conditions behind the results.'],
        ['HPLC chromatogram and purity result', 'How much of the material elutes as each target peak.'],
        ['Mass spectrometry identity result', 'Whether detected masses fit each expected molecule.'],
        ['Test date and laboratory information', 'Who performed the analysis and how recent it is.'],
        ['Chemical form', 'Free peptide, acetate or another salt, for each component separately.'],
      ],
    ),
    p('Packaging format has no bearing on which analytical methods apply or on what a complete certificate should contain. A spray-format lot and a vial-format lot of the same two peptides are verified against the same sequence, formula and mass references listed on the Semax/Selank Spray at a Glance table above. Request lot documentation through the certificate page.', { links: CERT }),

    h4('Two Identity Checks and Two Masses'),
    p('Because this listing holds two peptides, a full identity check has two parts. Semax should be matched to Met-Glu-His-Phe-Pro-Gly-Pro, C37H51N9O10S, average mass 813.93 g/mol, and Selank to Thr-Lys-Pro-Arg-Pro-Gly-Pro, C33H57N11O9, average mass 751.89 g/mol. A record confirming only one of the two leaves the other unverified, regardless of packaging format.'),
    table(
      ['Value', 'Semax', 'Selank'],
      [
        ['Calculated monoisotopic mass', '813.348 Da', '751.434 Da'],
        ['Average molecular weight', '813.93 g/mol', '751.89 g/mol'],
      ],
    ),
    h5('Why do observed mass values differ from the data sheet?'),
    p('A mass spectrometer detects ions, not spray bottles or vials. A peptide can carry one or more charges, so one molecule can show up at several m/z values, and observed signals will not match the molecular weight on a data sheet directly. Adducts, counterions and chemical modifications can shift or add signals, and methionine-containing peptides such as Semax can oxidize. Interpretation belongs to the analytical record and its stated method conditions.'),
    h5('Does a spray-format lot need different verification than a vial?'),
    p('No. The verification question is the same for either packaging format: does this lot match the stated molecules, and is each purity figure paired with a mass result from that same lot. Packaging format does not change what counts as adequate documentation for a two-peptide listing.'),

    h4('Need lot documentation for Semax/Selank Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Semax/Selank Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Semax/Selank Spray?',
    answer: 'Semax/Selank Spray is Veracue’s spray-dispensed packaging of two distinct synthetic heptapeptides, Semax and Selank, also documented on the Semax/Selank vial listing. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration, ratio or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Are the Semax and Selank molecules in this spray different from the vial listing?',
    answer: 'No. Both listings describe the same two compounds: Semax (Met-Glu-His-Phe-Pro-Gly-Pro, C37H51N9O10S, average mass 813.93 g/mol, CAS 80714-61-0) and Selank (Thr-Lys-Pro-Arg-Pro-Gly-Pro, C33H57N11O9, average mass 751.89 g/mol, CAS 129954-34-3). Only the packaging format differs.',
  },
  {
    question: 'What is the difference between Semax and Selank?',
    answer: 'Their sequences, parent fragments and masses differ. Semax derives from the ACTH(4-7) fragment and Selank derives from tuftsin, and the two share only a C-terminal Pro-Gly-Pro tail and matching chain length.',
  },
  {
    question: 'What are the CAS numbers and PubChem CIDs for Semax and Selank?',
    answer: 'Semax is CAS 80714-61-0, PubChem CID 9811102. Selank is CAS 129954-34-3, PubChem CID 11765600. These identify the molecules, not any particular lot or packaging format.',
  },
  {
    question: 'What does 10 mg/10 mg mean on this listing?',
    answer: 'It means the listing is offered with 10 mg of Semax and 10 mg of Selank. Concentration and ratio within the spray-dispensed unit are reported on lot-specific documentation rather than the listing name.',
  },
  {
    question: 'Does research show a combined effect of Semax and Selank?',
    answer: 'No. The assay-level findings summarized on this page do not demonstrate a combined or synergistic effect between the two peptides, and each has its own separate body of research.',
  },
  {
    question: 'Why does Veracue list Semax/Selank in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'What should a Semax/Selank Spray certificate of analysis include?',
    answer: 'It should name both Semax and Selank with their own sequences and formulas, state a lot number matching the container received, and report an HPLC purity result and a mass spectrometry identity result for each peptide, with test date and testing laboratory.',
  },
  {
    question: 'Why do mass spectrometry values not match the listed weights?',
    answer: 'A spectrometer reports m/z for charged ions, so one molecule can appear at several values. Adducts, counterions and methionine oxidation in Semax can shift signals further from the neutral average molecular weight.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Semax/Selank Spray?',
    answer: 'No. Semax/Selank Spray is offered for laboratory research use only, and Veracue provides no dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Semax/Selank Spray',
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
