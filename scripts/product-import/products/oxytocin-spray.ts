import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Oxytocin Spray. This is the first Oxytocin listing on the site (no prior vial product existed),
// so all copy here is written from scratch. Facts are drawn from
// docs/product-contents-2/oxytocin-spray-final.json and cross-checked against the sequence,
// cyclization, formula, mass and CAS number given there (consistent with the standard 9-residue
// cyclic nonapeptide structure). The source file is saturated with social-bonding, obstetric,
// lactation, psychiatric/anxiety and clinical-drug framing (Pitocin/Syntocinon, "bonding hormone",
// uterine contraction mechanism, HPA-axis/anxiolytic research, intranasal human studies); none of
// that is reused. Copy here is restricted to strict molecular-level description: cyclic nonapeptide
// structure, the disulfide bond, oxytocin receptor (OXTR) as a GPCR research target at the
// assay/binding level, and the structural relationship to vasopressin, with no outcome, behavioral
// or indication claims. Research-use-only content only, consistent with
// scripts/product-import/sermorelin-spray.ts and scripts/product-import/bpc-157-spray.ts.

const NAME = 'Oxytocin Spray'
const SLUG = 'oxytocin-spray'

const SKU_CODE = 'OXY-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_Oxytocin_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Oxytocin Spray Research Peptide (OT)'
const SEO_DESCRIPTION =
  "Oxytocin Spray is Veracue's liquid research format of the cyclic nonapeptide oxytocin, CAS 50-56-6, for laboratory research use only."
const DESCRIPTION =
  'Oxytocin Spray supplies oxytocin, a synthetic cyclic nonapeptide with the sequence Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2, closed into a ring by a disulfide bond between the cysteines at positions 1 and 6 and ending in a C-terminal amide. Reference values put its formula at C43H66N12O12S2, average mass about 1007.19 g/mol, CAS 50-56-6. Vasopressin, a structurally related cyclic nonapeptide differing at two positions, is a separate molecule and should not be confused with it. Offered as a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Oxytocin?'),
    p('Oxytocin is the common name for a synthetic cyclic peptide built from nine amino acids, with the sequence Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2. The cysteine residues at positions 1 and 6 are joined by a disulfide bond, closing a six-residue ring, with a three-residue C-terminal tail (Pro-Leu-Gly) ending in a C-terminal amide rather than a free carboxylic acid. "Nonapeptide" simply names the nine-residue chain length. The free base carries the reference molecular formula C43H66N12O12S2, an average molecular weight of approximately 1007.19 g/mol and CAS number 50-56-6, figures consistent with the cyclic nine-residue structure across standard chemical databases.'),
    p('Oxytocin is supplied by Veracue strictly for laboratory use, and lot documentation is available on request through the contact page.', { links: CONTACT }),
    h4('Oxytocin at a Glance'),
    kvTable([
      ['Product name', 'Oxytocin Spray'],
      ['Reference molecule', 'Oxytocin (synthetic cyclic nonapeptide)'],
      ['Sequence', 'Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2'],
      ['Length', '9 residues, cyclic, C-terminal amide'],
      ['Cyclization', 'Disulfide bond between cysteine residues at positions 1 and 6'],
      ['Molecular formula (free base, reference value)', 'C43H66N12O12S2'],
      ['Molecular weight (average, free base, reference value)', 'About 1007.19 g/mol'],
      ['CAS Registry Number', '50-56-6 (free base)'],
      ['Structurally related peptide', 'Vasopressin, a distinct cyclic nonapeptide differing at two residue positions'],
      ['Sizes offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values above are reference-database values for the free-base sequence and are not a Veracue lot result. Commercial peptide stock is often supplied as a salt rather than the free base, which shifts the expected mass; confirm the chemical form on a given lot\'s own documentation.</em></p>`,
    p('Physical form, salt or counterion, concentration, carrier, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What "Spray" Means on This Listing'),
    p('"Spray" in this product\'s name describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation. Those specifics, along with carrier composition and fill volume, depend on the manufacturing and analytical documentation issued for a specific lot, not on the name of the listing.'),
    h4('What Oxytocin Is Not'),
    ul([
      'Not the same molecule as vasopressin, which is a structurally related but chemically distinct cyclic nonapeptide with its own sequence and receptor profile.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('Oxytocin is the name most commonly used for this sequence across chemical databases and research literature. Because supplier naming is not always consistent across the research-peptide market, the sequence, molecular formula and CAS number together are a more reliable way to confirm identity than the name alone.'),
    h5('Sequence and cyclic structure'),
    p('As a synthetic peptide, oxytocin is its nine-residue sequence assembled in order and closed into a ring: a disulfide bond between the cysteines at positions 1 and 6 forms a six-residue cyclic segment, followed by a linear three-residue tail ending in a C-terminal amide rather than a free acid. It may be supplied as the free base or as a salt, and the two forms carry slightly different expected masses. Disulfide reduction or loss of the C-terminal amide would represent a distinct, degraded species, relevant to interpreting any future analytical or certificate-of-analysis data for this listing. Appearance alone, such as a lyophilized powder or a liquid fill, cannot distinguish oxytocin from an unrelated peptide of similar size, which is why analytical confirmation matters.'),

    h4('Oxytocin Receptor as a Research Target'),
    h5('What does the oxytocin receptor (OTR) represent at the assay level?'),
    p('The oxytocin receptor, abbreviated OTR, is a class A G-protein-coupled receptor (GPCR) studied in binding and functional assays as the primary research target for the oxytocin sequence. In vitro characterization of OTR typically involves radioligand or fluorescence-based binding assays and downstream signaling readouts measured in cultured cell systems expressing the receptor. This page describes OTR strictly as an assay-level research target and does not describe or imply any physiological, behavioral or outcome-based claim associated with receptor engagement.'),
    h5('How does oxytocin relate to vasopressin at the structural level?'),
    p('Oxytocin and arginine vasopressin are both cyclic nonapeptides with a disulfide bond between residues 1 and 6, differing at two amino acid positions in the ring and tail. Because of this structural similarity, binding assays for one peptide are routinely checked for cross-reactivity against the other peptide\'s receptor, and researchers typically report assay-specific cross-reactivity data rather than assuming full receptor selectivity for either sequence.'),

    h4('Oxytocin Alongside Other Short Research Peptides'),
    table(
      ['Research material', 'Molecular identity', 'Structural note'],
      [
        ['Oxytocin', 'Cyclic nonapeptide, C43H66N12O12S2', 'Disulfide ring (Cys1-Cys6) plus Pro-Leu-Gly-NH2 tail'],
        ['Vasopressin', 'Cyclic nonapeptide, structurally related to oxytocin', 'Disulfide ring (Cys1-Cys6); differs from oxytocin at two residue positions'],
        ['Sermorelin', 'Linear 29-residue peptide fragment', 'No cysteine, no disulfide bond'],
        ['BPC-157', 'Linear 15-residue peptide', 'No cysteine, no disulfide bond'],
      ],
    ),
    p('This table compares molecular structure only, not strength, purity or any other property. Oxytocin is a chemically distinct molecule from each material in the table above, with its own sequence, formula and separate identity record.'),

    h4('Reading Sequence and Assay Terminology Correctly'),
    h5('How do I confirm what Oxytocin actually refers to?'),
    p('Anchor on identifiers rather than the name alone: the sequence Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2, the disulfide bond between positions 1 and 6, the reference molecular formula C43H66N12O12S2, and CAS number 50-56-6. Stated together, they describe a specific molecule rather than a label, and they should agree across any source checked.'),
    h5('Why does the disulfide bond matter for identity checks?'),
    p('The cyclic structure formed by the disulfide bond, not just the amino acid sequence, defines intact oxytocin. A sample in which that bond has been reduced no longer matches the intact reference structure, even if the linear amino acid sequence is unchanged, which is why analytical methods capable of distinguishing cyclic from reduced forms are relevant to identity confirmation.'),
    h5('How should packaging format be recorded in a methods section?'),
    p('Because "Spray" describes packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and assay-level research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an Oxytocin Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Chemical form', 'Whether the report describes the free base or a named salt'],
        ['Lot number', 'Links the report to a specific batch, and should match the container and order record'],
        ['Identity method', 'How identity was assessed, for example LC-MS or ESI-MS, with expected and observed mass'],
        ['Disulfide-bond status', 'Whether the cyclic (intact) form or a reduced species was detected'],
        ['HPLC or other purity method', 'Reports analytical purity under the stated conditions'],
        ['Reference and observed mass', 'Both figures, together with the tolerance used for comparison'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
      ],
    ),
    p('Which fields appear varies by supplier and by lot, so check the specific document rather than assuming a standard set of tests was run. No purity figure, HPLC result or mass-spectrometry value is stated on this listing, since none is lot-specific until a given batch is tested. If a lot-specific certificate is available, use it as the primary source for that lot\'s reported results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('Oxytocin\'s reference molecular weight is approximately 1007.19 g/mol for the free base. In electrospray ionization mass spectrometry, a cyclic peptide this size usually appears as one or more multiply charged ions rather than a single peak at that neutral weight, so an observed mass-to-charge ratio (m/z) needs to be read alongside its charge state before it means anything as a comparison. Adducts, such as sodium or potassium attaching to the peptide, can shift an observed m/z further still. A mass that lands within a stated tolerance of the reference value supports identity; it does not, on its own, say anything about purity or about whether the disulfide bond remains intact.'),
    table(
      ['Form', 'Average molecular weight'],
      [
        ['Oxytocin free base', 'About 1007.19 g/mol'],
        ['Salt form', 'Higher than the free base; the exact figure depends on the counterion and salt content reported for the lot'],
      ],
    ),

    h4('Verification Questions, Answered'),
    h5('What should I verify on an Oxytocin COA?'),
    p('A useful certificate states the exact chemical form (free base or a named salt), an identity result showing expected and observed mass with the method used, confirmation that the disulfide-bonded cyclic form was detected rather than a reduced species, chromatographic purity with its detection conditions, and the lot number, laboratory and test date. Confirming the stated form first avoids most mismatches.'),
    h5('How should I interpret Oxytocin mass-spectrometry data?'),
    p('An observed m/z value depends on the ionization charge state and any adducts formed during the run, so it is not automatically the same number as the peptide\'s neutral molecular weight. Compare an observed mass with the approximately 1007.19 g/mol reference value only after accounting for charge state, and treat a close match as support for identity rather than a purity measurement.'),
    h5('What can this product page establish, and what needs lot-specific documentation?'),
    p('This page can establish oxytocin\'s verified molecular identity, including its cyclic structure and reference mass. It cannot establish this product\'s concentration, carrier composition, purity or delivery characteristics, since those depend on the manufacturing and testing records for that particular batch. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Need lot documentation for Oxytocin Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Oxytocin Spray is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no administration or usage guidance of any kind, and Veracue does not provide dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Oxytocin?',
    answer: 'Oxytocin is the common name for a synthetic cyclic nonapeptide, sequence Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2, closed by a disulfide bond between the cysteines at positions 1 and 6, free-base formula C43H66N12O12S2, CAS number 50-56-6. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What does "Spray" mean on this listing?',
    answer: 'It describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation; those specifics depend on lot-specific documentation.',
  },
  {
    question: 'What is the Oxytocin sequence and cyclic structure?',
    answer: 'Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2, nine residues in total, cyclized by a disulfide bond between the cysteine residues at positions 1 and 6, with a C-terminal amide rather than a free carboxylic acid.',
  },
  {
    question: 'What is the molecular weight of Oxytocin?',
    answer: 'About 1007.19 g/mol for the free base (average molecular weight). A salt form, which is also commonly supplied, carries a higher mass depending on the counterion.',
  },
  {
    question: 'What is the CAS number for Oxytocin?',
    answer: 'CAS Registry Number 50-56-6, consistent with standard chemical database records for the free-base sequence.',
  },
  {
    question: 'Is Oxytocin the same as vasopressin?',
    answer: 'No. Oxytocin and vasopressin are structurally related cyclic nonapeptides, each with a disulfide bond between residues 1 and 6, but they differ at two amino acid positions and are chemically distinct molecules with their own identity records.',
  },
  {
    question: 'What is the oxytocin receptor (OTR)?',
    answer: 'OTR is a class A G-protein-coupled receptor studied as the primary research target for the oxytocin sequence in binding and functional assays conducted in cultured cell systems. This listing describes OTR strictly as an assay-level research target.',
  },
  {
    question: 'What should an Oxytocin COA contain?',
    answer: 'Useful fields include the stated chemical form (free base or salt), an identity result with expected and observed mass and method, confirmation that the disulfide-bonded cyclic form was detected, a purity result with its detection conditions, and the lot number, laboratory and test date.',
  },
  {
    question: 'How should Oxytocin mass-spectrometry data be interpreted?',
    answer: 'An observed mass-to-charge ratio should be read alongside its charge state and any adducts before comparing it with the approximately 1007.19 g/mol reference value for the free base.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Oxytocin Spray?',
    answer: 'No. Oxytocin Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Oxytocin Spray',
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
