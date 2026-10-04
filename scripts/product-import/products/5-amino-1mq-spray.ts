import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// 5-Amino-1MQ Spray. This is the first 5-Amino-1MQ listing on the site (no prior vial product
// existed), so all copy here is written from scratch. 5-Amino-1MQ is NOT a peptide: it is a small
// quinolinium cation studied mainly as an NNMT (nicotinamide N-methyltransferase) inhibitor, and that
// disambiguation is called out explicitly since this catalog otherwise lists peptides. Facts are drawn
// from docs/product-contents-2/5-amino-1mq-spray.json and cross-checked against the cation and iodide
// salt PubChem records given there (CID 950107 and CID 66522933) and the CAS number for the salt
// (42464-96-0); human-study, obesity/body-composition, dosing and clinical content from that source
// file is intentionally left out to match site policy. "Adiposity" and "energy expenditure" are
// weight-adjacent physiology terms banned by lib.ts, so the research angle here stays at the
// enzyme/pathway level (NNMT, NAD+ and SAM metabolism) rather than body-composition outcomes.

const NAME = '5-Amino-1MQ Spray'
const SLUG = '5-amino-1mq-spray'

const SKU_CODE = '5A1MQ-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '50mg', image: 'VERACUE_Spray_5_Amino_1_50mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = '5-Amino-1MQ Spray Research Compound'
const SEO_DESCRIPTION =
  "5-Amino-1MQ Spray is Veracue's liquid research format of the quinolinium NNMT-inhibitor compound, CAS 42464-96-0, for laboratory research use only."
const DESCRIPTION =
  '5-Amino-1MQ Spray is Veracue’s spray-dispensed research format of 5-amino-1-methylquinolinium, a small quinolinium cation, not a peptide, best known as an inhibitor of nicotinamide N-methyltransferase (NNMT). As the free cation it is C10H11N2+, about 159.21 g/mol; the commonly supplied iodide salt, C10H11IN2, runs 286.11 g/mol and carries CAS 42464-96-0. Because it has no amino acid sequence, researchers should confirm which form a given lot represents before comparing masses. Supplied as a single 50 mg size for laboratory research use only.'
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
    h4('What Is 5-Amino-1MQ?'),
    p('5-Amino-1MQ is short for 5-amino-1-methylquinolinium, a small organic molecule built on a quinoline ring that carries a methyl group on its ring nitrogen and an amine substituent at the 5-position. That methylation leaves the ring nitrogen positively charged, so the compound exists as a cation rather than a neutral molecule. It is studied in the research literature chiefly as a membrane-permeable inhibitor of nicotinamide N-methyltransferase (NNMT).'),
    p('5-Amino-1MQ is not a peptide. It has no amino acid residues, no sequence and no peptide backbone, which sets it apart from most of the materials in this catalog. Its appearance alongside research peptides in search results and supplier listings reflects how it is marketed and discussed, not its chemical classification; by structure it is a small-molecule enzyme inhibitor.'),
    h4('5-Amino-1MQ at a Glance'),
    kvTable([
      ['Product name', '5-Amino-1MQ Spray'],
      ['Preferred chemical name', '5-Amino-1-methylquinolinium'],
      ['Common abbreviations', '5-Amino-1MQ, 5A1MQ, 5MQ'],
      ['Classification', 'Small-molecule quinolinium cation (not a peptide)'],
      ['Molecular formula (cation)', 'C10H11N2+'],
      ['Molecular weight (average, cation only)', 'About 159.21 g/mol'],
      ['PubChem CID (cation)', '950107'],
      ['Common salt form', '5-Amino-1-methylquinolinium iodide, C10H11IN2'],
      ['Molecular weight (average, iodide salt)', '286.11 g/mol'],
      ['CAS Registry Number (iodide salt)', '42464-96-0'],
      ['PubChem CID (iodide salt)', '66522933'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values are drawn from chemical databases for the reference molecule and are not a Veracue lot result.</em></p>`,
    p('The cation record and the iodide salt record describe two distinct chemical entities, not one compound reported inconsistently: PubChem CID 950107 is the bare cation, and PubChem CID 66522933 is the separately catalogued iodide salt with its own CAS number. Physical form, salt or counterion, concentration, carrier, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What "Spray" Means on This Listing'),
    p('"Spray" in this product\'s name describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation. Those specifics, along with carrier composition and fill volume, depend on the manufacturing and analytical documentation issued for a specific lot, not on the name of the listing.'),
    h4('What 5-Amino-1MQ Is Not'),
    ul([
      'Not a peptide: it has no amino acid sequence and no peptide bonds, unlike BPC-157, Sermorelin or other listings in this catalog.',
      'Not an NAD+ precursor or NAD+ product; it does not supply raw material to NAD+ metabolism.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('5-Amino-1-methylquinolinium is the systematic name for this compound, with 5-Amino-1MQ, 5A1MQ and 5MQ appearing as shorthand across the research literature and supplier listings. Because the same name is sometimes used loosely for either the bare cation or the isolable iodide salt, the molecular formula, molecular weight and, where a salt form is specified, the CAS number together confirm identity more reliably than the name alone.'),
    h5('Two records, two entities'),
    p('Public references to this compound carry two different masses because they describe two different chemical records, not two measurements of one thing. PubChem CID 950107 is the cation alone, formula C10H11N2+, about 159.21 g/mol. PubChem CID 66522933 is the separately catalogued iodide salt, formula C10H11IN2, CAS number 42464-96-0, 286.11 g/mol. Neither figure should be assumed to describe a given commercial listing unless the chemical form supplied is stated; Veracue states the cation and salt reference values above for identity purposes only.'),
    h5('Not a peptide'),
    p('As a single fused bicyclic ring system, 5-Amino-1MQ has no amino acid residues and no peptide backbone. This distinguishes it structurally from the peptide-based research materials that make up most of this catalog, even though it is frequently searched and marketed alongside them.'),

    h4('Primary Research Target: NNMT'),
    p('Nicotinamide N-methyltransferase (NNMT, EC 2.1.1.1) is a cytosolic enzyme that transfers a methyl group from S-adenosylmethionine (SAM) onto nicotinamide, producing 1-methylnicotinamide. Because nicotinamide feeds the NAD+ salvage pathway and SAM is the cell\'s principal methyl donor, NNMT activity sits at a junction between NAD+ availability and cellular methylation capacity. NNMT is expressed most heavily in liver and adipose tissue, which is why it draws interest from metabolic researchers.'),
    p('Genetic knockdown work first identified Nnmt as a gene of interest in mouse tissue-expression comparisons, which led to small-molecule inhibitors, including the methylquinolinium series that 5-Amino-1MQ belongs to, being developed to test the enzyme pharmacologically rather than only genetically. Reported work on this inhibitor series describes screening for selectivity against related SAM-dependent methyltransferases and NAD+ salvage enzymes, and measuring the NNMT reaction product 1-methylnicotinamide in cultured cells as a readout of target engagement.'),

    h4('5-Amino-1MQ Alongside Other Research Materials'),
    p('5-Amino-1MQ is often mentioned together with NAD+-related compounds and with research peptides. The table below is for orientation only: it compares molecular classification, not strength, safety or any ranking between materials.'),
    table(
      ['Research material', 'Molecular identity', 'Relationship to NNMT / NAD+ metabolism'],
      [
        ['5-Amino-1MQ', 'Small-molecule quinolinium cation, C10H11N2+', 'Studied as an NNMT inhibitor'],
        ['NAD+ precursor compounds (e.g. nicotinamide, NMN)', 'Small-molecule pyridine nucleotide precursors', 'Supply substrate to the NAD+ salvage pathway; no direct NNMT relationship'],
        ['BPC-157', 'Synthetic 15-residue peptide, C62H98N16O22', 'No relationship to NNMT or NAD+/SAM metabolism'],
        ['Sermorelin', 'Synthetic 29-residue peptide, C149H246N44O42S', 'No relationship to NNMT or NAD+/SAM metabolism'],
      ],
    ),
    p('The useful distinction is mechanism class, not search adjacency. 5-Amino-1MQ is a small-molecule enzyme inhibitor; NAD+ precursor compounds supply substrate to a different point in the same broad pathway; and research peptides are chemically unrelated chains of amino acids that typically act through receptor binding rather than on a cytosolic methyltransferase. None of these categories is interchangeable with another.'),

    h4('Research Literature Context'),
    h5('Scope of the published literature'),
    `<p><em>Established.</em> Published research on 5-Amino-1MQ is concentrated in biochemical, cell-based and rodent systems, examining the compound at the level of enzyme selectivity, intracellular NAD+ and SAM metabolism, and cell-line proliferation. This describes the shape of the published literature, not a conclusion about effectiveness for any use.</p>`,
    h5('Proposed rationale'),
    `<p><em>Hypothesis.</em> Researchers have proposed that inhibiting NNMT shifts the balance of nicotinamide and SAM available to a cell, and have used reported changes in 1-methylnicotinamide, NAD+ and SAM levels in cultured cells as evidence consistent with that mechanism. These remain active research questions rather than settled conclusions, and a finding reported in one model system describes that system under its own conditions, not a general property of the molecule.</p>`,

    h4('Research Questions, Answered'),
    qa({
      h: 'How do I confirm what 5-Amino-1MQ actually refers to?',
      problem: 'The same name is used for both the bare cation and its iodide salt across different sources, which makes it easy to assume one figure describes the other.',
      answer: 'Anchor on the identifiers rather than the name alone: the cation is C10H11N2+ at about 159.21 g/mol (PubChem CID 950107), and the commonly referenced iodide salt is C10H11IN2, CAS 42464-96-0, 286.11 g/mol (PubChem CID 66522933). Checking which record a listing is quoting avoids treating two different entities as one.',
      takeaway: 'Ask whether a quoted mass refers to the cation or to a named salt before comparing it with another source.',
    }),
    qa({
      h: 'Is 5-Amino-1MQ the same type of material as the peptides in this catalog?',
      problem: 'Catalog placement next to research peptides can suggest a shared chemical category.',
      answer: 'No. 5-Amino-1MQ has no amino acid sequence and no peptide backbone; it is a single small quinolinium ring system. It is grouped with metabolic research materials here because NNMT research is the closest fit among this site\'s categories, not because it shares a chemical class with the catalog\'s peptides.',
      takeaway: 'Treat 5-Amino-1MQ as a small-molecule enzyme inhibitor, not as a peptide, when designing or citing research.',
    }),
    qa({
      h: 'How should findings about NNMT inhibition be read?',
      problem: 'A single reported change in a cultured-cell assay can be generalized well beyond the system it came from.',
      answer: 'Each published finding is tied to a specific model system, cell type and readout. A reduction in 1-methylnicotinamide reported in one cell system describes that system under those conditions, and it should be traced back to the source and checked against the question actually being asked before it is treated as a general statement about the molecule.',
      takeaway: 'Read a finding for its model and readout, not as a general claim about the compound.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a 5-Amino-1MQ Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Chemical form', 'Whether the report describes the cation, the iodide salt, or another counterion'],
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
    p('5-Amino-1MQ\'s reference molecular weight depends on which chemical record is being compared: approximately 159.21 g/mol for the cation alone, or 286.11 g/mol for the iodide salt. In electrospray ionization mass spectrometry, an observed mass-to-charge ratio (m/z) reflects the ion actually formed during the run, so it needs to be read alongside the charge state and the chemical form in question before it means anything as a comparison. A mass that lands within a stated tolerance of the correct reference value supports identity; it does not, on its own, say anything about purity.'),
    table(
      ['Form', 'Average molecular weight'],
      [
        ['5-Amino-1MQ cation', 'About 159.21 g/mol'],
        ['5-Amino-1MQ iodide salt', '286.11 g/mol'],
      ],
    ),

    h4('Verification Questions, Answered'),
    qa({
      h: 'What should I verify on a 5-Amino-1MQ COA?',
      problem: 'A purity percentage alone does not confirm what is in a vial, particularly when a cation and a named salt circulate under the same shorthand name.',
      answer: 'A useful certificate states the exact chemical form tested, an identity result showing expected and observed mass with the method used, chromatographic purity with its detection conditions, and the lot number, laboratory and test date. Confirming the stated chemical form first avoids comparing a cation figure with a salt figure.',
      takeaway: 'Read a COA for chemical form, method and lot, not just the percentage.',
    }),
    qa({
      h: 'Why do two different molecular weights appear for the same compound name?',
      problem: 'Quoting 159.21 g/mol in one place and 286.11 g/mol in another can look like an error or an inconsistency.',
      answer: 'They are not the same figure describing one entity; they are two separate chemical database records for two related but distinct chemical entities, the bare cation and its iodide salt. Any mass-based calculation should state which record it is using and should not substitute one for the other.',
      takeaway: 'Always pair a molecular weight figure with the specific chemical form it describes.',
    }),
    qa({
      h: 'What can this product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'This page can establish 5-Amino-1MQ\'s verified molecular identity and summarize the shape of the published research literature. It cannot establish this product\'s concentration, carrier composition, purity, chemical form or delivery characteristics, since those depend on the manufacturing and testing records for that particular batch. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for 5-Amino-1MQ Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('5-Amino-1MQ Spray is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no administration or usage guidance of any kind, and Veracue does not provide dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is 5-Amino-1MQ?',
    answer: '5-Amino-1MQ is the short name for 5-amino-1-methylquinolinium, a small quinolinium cation studied mainly as an inhibitor of nicotinamide N-methyltransferase (NNMT). Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is 5-Amino-1MQ a peptide?',
    answer: 'No. 5-Amino-1MQ has no amino acid sequence and no peptide backbone; it is a single small ring system with the cation formula C10H11N2+. This sets it apart from the peptide-based materials elsewhere in this catalog, even though it is often searched and discussed alongside them.',
  },
  {
    question: 'What does "Spray" mean on this listing?',
    answer: 'It describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation; those specifics depend on lot-specific documentation.',
  },
  {
    question: 'What is the molecular weight of 5-Amino-1MQ?',
    answer: 'About 159.21 g/mol for the cation alone (PubChem CID 950107). The commonly referenced iodide salt form, CAS 42464-96-0 (PubChem CID 66522933), carries a different molecular weight of 286.11 g/mol, since it is a separate chemical record rather than the same figure restated.',
  },
  {
    question: 'What is the CAS number and PubChem CID for 5-Amino-1MQ?',
    answer: 'The bare cation is PubChem CID 950107. Its commonly referenced iodide salt carries CAS Registry Number 42464-96-0 and PubChem CID 66522933.',
  },
  {
    question: 'What is NNMT?',
    answer: 'NNMT is nicotinamide N-methyltransferase, a cytosolic enzyme that transfers a methyl group from S-adenosylmethionine onto nicotinamide, producing 1-methylnicotinamide. It is expressed most heavily in liver and adipose tissue and sits at a junction between NAD+ and SAM metabolism.',
  },
  {
    question: 'Is 5-Amino-1MQ the same as an NAD+ product?',
    answer: 'No. NAD+ precursor compounds supply substrate to the NAD+ salvage pathway. 5-Amino-1MQ does not supply anything; it is studied as an inhibitor of an enzyme that consumes nicotinamide. The two categories act at different points in the same broad pathway and are not interchangeable.',
  },
  {
    question: 'What does the published 5-Amino-1MQ research literature generally cover?',
    answer: 'Published work is concentrated in biochemical, cell-based and rodent systems, examining enzyme selectivity, intracellular NAD+ and SAM metabolism, and cell-line proliferation. This describes the shape of the literature, not a conclusion about effectiveness for any use.',
  },
  {
    question: 'What should a 5-Amino-1MQ COA contain?',
    answer: 'Useful fields include the stated chemical form (cation or a named salt), an identity result with expected and observed mass and method, a purity result with its detection conditions, and the lot number, laboratory and test date.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for 5-Amino-1MQ Spray?',
    answer: 'No. 5-Amino-1MQ Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: '5-Amino-1MQ Spray',
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
