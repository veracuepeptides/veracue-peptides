import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// BPC-157 Spray. This is the first BPC-157 listing on the site (no prior vial product existed), so all
// copy here is written from scratch. Research-use-only content: molecular identity (sequence, formula,
// CAS, PubChem CID), general research-literature context at the model/assay level, and analytical
// documentation guidance. Facts are drawn from docs/product-contents-2/bpc-157-spray.json and cross-checked
// against the sequence, formula, CAS and PubChem CID given there; human-study, regulatory, clinical and
// dosing content from that source file is intentionally left out to match site policy.

const NAME = 'BPC-157 Spray'
const SLUG = 'bpc-157-spray'

const SKU_CODE = 'BPC157-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_Spray_BPC_157_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_Spray_BPC_157_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'BPC-157 Spray Research Peptide'
const SEO_DESCRIPTION =
  "BPC-157 Spray is Veracue's liquid research format of the 15-residue BPC-157 peptide, CAS 137525-51-0, for laboratory research only."
const DESCRIPTION =
  "BPC-157 Spray is Veracue's liquid research format of the BPC-157 pentadecapeptide, a synthetic 15-residue compound with the sequence GEPPPGKPADDAGLV. The free peptide carries the molecular formula C62H98N16O22, an average molecular weight of about 1419.5 g/mol, CAS number 137525-51-0 and PubChem CID 9941957, though many lots are supplied instead as an acetate salt, which shifts the expected mass. Veracue offers this compound in 5 mg and 10 mg spray-dispensed sizes, strictly for laboratory research use only."

function qa(q: { h: string; problem: string; answer: string; takeaway: string; links?: any[] }) {
  return (
    h5(q.h) +
    p(q.problem) +
    p(q.answer, { links: q.links }) +
    `<p><strong>Researcher takeaway:</strong> ${esc(q.takeaway)}</p>`
  )
}

function productDetails(): string {
  return [
    h4('What Is BPC-157?'),
    p('BPC-157 is the common name for a synthetic peptide built from fifteen amino acids, with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val, written in one-letter code as GEPPPGKPADDAGLV. "Pentadecapeptide" simply names that chain length. The free peptide has the molecular formula C62H98N16O22, an average molecular weight of about 1419.5 g/mol, CAS number 137525-51-0 and PubChem CID 9941957, and these figures agree across standard chemical databases.'),
    p('BPC-157 is also referred to in reference sources as BPC 157 or Body Protection Compound-157; those are alternate names for the same sequence, not separate compounds. Veracue supplies BPC-157 Spray strictly for laboratory use, and lot documentation is available on request through the contact page.', { links: CONTACT }),
    h4('BPC-157 at a Glance'),
    kvTable([
      ['Product name', 'BPC-157 Spray'],
      ['Reference molecule', 'BPC-157 (synthetic pentadecapeptide)'],
      ['Sequence', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV)'],
      ['Length', '15 residues'],
      ['Molecular formula (free peptide)', 'C62H98N16O22'],
      ['Molecular weight (average, free peptide)', 'About 1419.5 g/mol'],
      ['CAS Registry Number', '137525-51-0'],
      ['PubChem CID', '9941957'],
      ['Common salt form', 'Often supplied as an acetate salt rather than the free peptide, which shifts the expected mass'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values are drawn from chemical databases for the reference molecule and are not a Veracue lot result.</em></p>`,
    p('Physical form, salt or counterion, concentration, carrier, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What "Spray" Means on This Listing'),
    p('"Spray" in this product\'s name describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top vial. It is not a claim about route of administration, concentration or formulation. Those specifics, along with carrier composition and fill volume, depend on the manufacturing and analytical documentation issued for a specific lot, not on the name of the listing.'),
    h4('What BPC-157 Is Not'),
    ul([
      'Not the same molecule as TB-500, KPV or GHK-Cu; each has its own sequence, formula and research history.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('BPC-157 is the name most commonly used for this sequence across chemical databases and research literature, with BPC 157 and Body Protection Compound-157 appearing as equivalent labels for the same molecule. Because supplier naming is not always consistent across the research-peptide market, the sequence, molecular formula and CAS number together are a more reliable way to confirm identity than the name alone.'),
    h5('Sequence and structure'),
    p('As a synthetic peptide, BPC-157 is simply its fifteen-residue sequence assembled in order; there is no separate ingredient beyond that chain. It may be supplied as the free peptide or as an acetate salt, and the two forms carry slightly different expected masses. Appearance alone, such as a lyophilized powder, cannot distinguish BPC-157 from an unrelated peptide of similar size, which is why analytical confirmation matters.'),

    h4('BPC-157 Alongside Other Research Peptides'),
    p('BPC-157 is often mentioned together with several other short research peptides. The table below is for orientation only: it compares molecular identity, not strength, safety or any ranking between materials.'),
    table(
      ['Research material', 'Molecular identity', 'Common research context'],
      [
        ['BPC-157', 'Synthetic 15-residue peptide, C62H98N16O22', 'Tissue injury and repair models across several organ systems'],
        ['TB-500', 'Synthetic 7-residue fragment related to thymosin beta-4', 'Actin biology and cell-motility research'],
        ['KPV', 'Tripeptide, Lys-Pro-Val', 'Immune and inflammation-related cell research'],
        ['GHK-Cu', 'Copper(II) complex of Gly-His-Lys', 'Skin, collagen and copper-peptide signaling research'],
      ],
    ),
    p('Naming inconsistency is a known issue in this space: "TB-500" has at times been applied to full-length thymosin beta-4 and at other times to a shorter synthetic fragment, so its sequence and formula should be checked independently rather than assumed from the name. BPC-157 is a chemically distinct molecule from all three materials in the table above, with its own sequence, formula and separate body of research.'),

    h4('Research Literature Context'),
    h5('Scope of the published literature'),
    `<p><em>Established.</em> Research on BPC-157 published to date is concentrated in laboratory and animal-model systems, examining the sequence in tissue injury and recovery models across several organ systems, with a substantial share of this literature originating from a small number of research groups. This describes the shape of the published literature, not a conclusion about effectiveness or safety for any use.</p>`,
    h5('Proposed rationale'),
    `<p><em>Hypothesis.</em> Researchers have proposed several signaling mechanisms that might explain outcomes observed in these model systems, including interactions with pathways involved in tissue recovery. These remain active research questions rather than settled mechanisms, and findings reported in one model system describe that system under its own conditions, not a general property of the molecule.</p>`,

    h4('Research Questions, Answered'),
    qa({
      h: 'How do I confirm what BPC-157 actually refers to?',
      problem: 'The same name can be used loosely across suppliers and reference sources, which makes it hard to know exactly what a listing describes.',
      answer: 'Anchor on identifiers rather than the name alone: the sequence GEPPPGKPADDAGLV, the molecular formula C62H98N16O22, and CAS number 137525-51-0. Stated together, they describe a specific molecule rather than a label, and they should agree across any source checked.',
      takeaway: 'Ask which sequence, which formula and which CAS number a listing is actually using.',
    }),
    qa({
      h: 'How should findings reported in a specific research model be read?',
      problem: 'A single reported outcome can be generalized well beyond the model it came from.',
      answer: 'Each published finding is tied to a specific model system and endpoint chosen by that study. A result from one model describes that model under those conditions, and it should be traced back to the source and checked against the question actually being asked before it is treated as a general statement about the molecule.',
      takeaway: 'Read a finding for its model and endpoint, not as a general claim.',
    }),
    qa({
      h: 'How is BPC-157 different from TB-500, KPV and GHK-Cu?',
      problem: 'These research peptides are frequently listed together, which can make them seem interchangeable.',
      answer: 'They are chemically distinct: different sequences, different molecular formulas and different research histories. "TB-500" in particular has been used inconsistently across suppliers, sometimes for full-length thymosin beta-4 and sometimes for a shorter fragment, so its identity should be checked independently rather than assumed from the name.',
      takeaway: 'Confirm each peptide\'s own sequence and formula rather than treating a pairing as equivalence.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a BPC-157 Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Chemical form', 'Whether the report describes the free peptide or a named salt, such as acetate'],
        ['Lot number', 'Links the report to a specific batch, and should match the vial or packaging'],
        ['Identity method', 'How identity was assessed, for example LC-MS or ESI-MS, with expected and observed mass'],
        ['HPLC or other purity method', 'Reports analytical purity under the stated conditions'],
        ['Reference and observed mass', 'Both figures, together with the tolerance used for comparison'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
      ],
    ),
    p('Which fields appear varies by supplier and by lot, so check the specific document rather than assuming a standard set of tests was run. No purity figure, HPLC result or mass-spectrometry value is stated on this listing, since none is lot-specific until a given batch is tested. If a lot-specific certificate is available, use it as the primary source for that lot\'s reported results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('BPC-157\'s reference molecular weight is approximately 1419.5 g/mol for the free peptide. In electrospray ionization mass spectrometry, a peptide this size usually appears as one or more multiply charged ions rather than a single peak at that neutral weight, so an observed mass-to-charge ratio (m/z) needs to be read alongside its charge state before it means anything as a comparison. Adducts, such as sodium or potassium attaching to the peptide, can shift an observed m/z further still. A mass that lands within a stated tolerance of the reference value supports identity; it does not, on its own, say anything about purity.'),
    table(
      ['Form', 'Average molecular weight'],
      [
        ['BPC-157 free peptide', 'About 1419.5 g/mol'],
        ['Acetate salt', 'Slightly higher than the free peptide; the exact figure depends on the acetate content reported for the lot'],
      ],
    ),

    h4('Verification Questions, Answered'),
    qa({
      h: 'What should I verify on a BPC-157 COA?',
      problem: 'A purity percentage alone does not confirm what is in a vial, particularly when more than one salt form circulates under the same name.',
      answer: 'A useful certificate states the exact chemical form (free peptide or acetate), an identity result showing expected and observed mass with the method used, chromatographic purity with its detection conditions, and the lot number, laboratory and test date. Confirming the stated form first avoids most mismatches.',
      takeaway: 'Read a COA for form, method and lot, not just the percentage.',
    }),
    qa({
      h: 'How should I interpret BPC-157 mass-spectrometry data?',
      problem: 'A single reference mass is often quoted as if it should match an instrument reading directly.',
      answer: 'An observed m/z value depends on the ionization charge state and any adducts formed during the run, so it is not automatically the same number as the peptide\'s neutral molecular weight. Compare an observed mass with the approximately 1419.5 g/mol reference value only after accounting for charge state, and treat a close match as support for identity rather than a purity measurement.',
      takeaway: 'Charge state and adducts have to be accounted for before a mass comparison means anything.',
    }),
    qa({
      h: 'What can this product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'This page can establish BPC-157\'s verified molecular identity and summarize the shape of the published research literature. It cannot establish this product\'s concentration, carrier composition, purity or delivery characteristics, since those depend on the manufacturing and testing records for that particular batch. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for BPC-157 Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('BPC-157 Spray is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no administration or usage guidance of any kind, and Veracue does not provide dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is BPC-157?',
    answer: 'BPC-157 is the common name for a synthetic 15-residue peptide, sequence GEPPPGKPADDAGLV, formula C62H98N16O22, CAS number 137525-51-0. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What does "Spray" mean on this listing?',
    answer: 'It describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top vial. It is not a claim about route of administration, concentration or formulation; those specifics depend on lot-specific documentation.',
  },
  {
    question: 'What is the BPC-157 sequence?',
    answer: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val, written in one-letter code as GEPPPGKPADDAGLV, 15 residues in total.',
  },
  {
    question: 'What is the molecular weight of BPC-157?',
    answer: 'About 1419.5 g/mol for the free peptide (average molecular weight). An acetate salt form, which is also commonly supplied, carries a slightly different mass.',
  },
  {
    question: 'What is the CAS number and PubChem CID for BPC-157?',
    answer: 'CAS Registry Number 137525-51-0 and PubChem CID 9941957, consistent with standard chemical database records for this sequence.',
  },
  {
    question: 'Is BPC-157 the same as TB-500, KPV or GHK-Cu?',
    answer: 'No. Each is a chemically distinct material with its own sequence, molecular formula and research history. "TB-500" in particular has been used inconsistently across suppliers, so its identity should be checked independently.',
  },
  {
    question: 'What does the published BPC-157 research literature generally cover?',
    answer: 'Published work is concentrated in laboratory and animal-model systems studying tissue injury and recovery across several organ systems. This describes the shape of the literature, not a conclusion about effectiveness or safety for any use.',
  },
  {
    question: 'What should a BPC-157 COA contain?',
    answer: 'Useful fields include the stated chemical form (free peptide or acetate), an identity result with expected and observed mass and method, a purity result with its detection conditions, and the lot number, laboratory and test date.',
  },
  {
    question: 'How should BPC-157 mass-spectrometry data be interpreted?',
    answer: 'An observed mass-to-charge ratio should be read alongside its charge state and any adducts before comparing it with the approximately 1419.5 g/mol reference value for the free peptide.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for BPC-157 Spray?',
    answer: 'No. BPC-157 Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'BPC-157 Spray',
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
