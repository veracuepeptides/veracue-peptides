import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// LL-37 Spray. This is the first LL-37 listing on the site (no prior vial product existed), so all
// copy here is written from scratch. Research-use-only content: molecular identity (sequence,
// residue count, precursor relationship) and general research-literature context at the
// molecular/structural level only. Facts are drawn from docs/product-contents-2/ll37-spray.json,
// which gives the sequence, residue count, precursor relationship and cleavage pathway but does not
// state a CAS number, PubChem CID, molecular formula or molecular weight. The CAS number and average
// molecular weight below are commonly cited public reference-database values for the LL-37 sequence,
// labeled explicitly as reference values and not a Veracue lot result, following the pattern used for
// BPC-157 Spray and Epithalon Spray elsewhere in this batch. No molecular formula or PubChem CID is
// stated, since neither was confirmed. Human-trial, infection-indication, wound-treatment and dosing
// content from the source file is intentionally left out to match site policy; LL-37 is discussed only
// at the molecular and structural level (amphipathic alpha-helix formation, cathelicidin family
// membership, hCAP-18 precursor relationship).

const NAME = 'LL-37 Spray'
const SLUG = 'll-37-spray'

const SKU_CODE = 'LL37-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '1mg', image: 'VERACUE_Spray_LL_37_1mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'LL-37 Spray Research Peptide'
const SEO_DESCRIPTION =
  "Veracue packages LL-37, the human cathelicidin peptide, as a lab-ready spray format, with molecular identity notes for laboratory research use only."
const DESCRIPTION =
  'LL-37 Spray contains LL-37, a 37-residue cationic peptide with the sequence LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES, corresponding to residues 134 to 170 of the human hCAP-18 precursor and released from it by proteinase 3 and related enzymes. It is the only cathelicidin-family peptide encoded in the human genome. Commonly cited reference values put its CAS number at 171680-04-3 and average mass near 4493.3 g/mol, consistent with a chain of this length and composition. Offered as a 1 mg spray-dispensed size for laboratory research use only.'
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
    h4('What Is LL-37?'),
    p('LL-37 is the common name for a synthetic peptide built from thirty-seven amino acids, with the sequence LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES. The name comes directly from the molecule\'s structure: the two leucine residues that open the sequence, and its total length of 37 residues. LL-37 corresponds to residues 134 to 170 of the human hCAP-18 precursor protein (human cationic antimicrobial protein, 18 kDa), the single gene product of the human CAMP gene, and is released from that precursor by proteinase 3 and related serine proteases.'),
    p('LL-37 is cationic and amphipathic, meaning its charged and hydrophobic residues can arrange onto separate faces of a folded structure under the right conditions. Veracue supplies LL-37 Spray strictly for laboratory use, and lot documentation is available on request through the contact page.', { links: CONTACT }),
    h4('LL-37 at a Glance'),
    kvTable([
      ['Product name', 'LL-37 Spray'],
      ['Reference molecule', 'LL-37 (synthetic 37-residue peptide)'],
      ['Sequence', 'LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES'],
      ['Length', '37 residues'],
      ['Precursor relationship', 'Residues 134-170 of the human hCAP-18 precursor protein (CAMP gene product)'],
      ['Release mechanism', 'Cleaved from hCAP-18 by proteinase 3 and related serine proteases'],
      ['Classification', 'Cathelicidin-family peptide; the only cathelicidin encoded in the human genome'],
      ['CAS Registry Number (reference value)', '171680-04-3'],
      ['Molecular weight (reference value)', 'About 4493.3 g/mol (average), consistent with a 37-residue sequence of this composition'],
      ['Sizes offered', '1 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>The CAS number and average molecular weight above are commonly cited public reference-database values for the LL-37 sequence, not a Veracue lot result. Molecular formula and PubChem CID are not stated here, since neither is confirmed against a specific database record.</em></p>`,
    p('Physical form, salt or counterion, concentration, carrier, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What "Spray" Means on This Listing'),
    p('"Spray" in this product\'s name describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation. Those specifics, along with carrier composition and fill volume, depend on the manufacturing and analytical documentation issued for a specific lot, not on the name of the listing.'),
    h4('What LL-37 Is Not'),
    ul([
      'Not the same molecule as hCAP-18, the full-length precursor protein it is cleaved from.',
      'Not the same molecule as KPV, Thymosin Alpha-1, or any other peptide in Veracue\'s immune-modulation research category; each has its own sequence, formula and research history.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('LL-37 is the name most commonly used for this sequence across chemical databases and research literature. Because supplier naming is not always consistent across the research-peptide market, the sequence and residue count together are a more reliable way to confirm identity than the name alone. The precursor relationship to hCAP-18 is also well documented: LL-37 is the C-terminal fragment released when proteinase 3 and related serine proteases cleave residues 134 to 170 from the full-length precursor.'),
    h5('Sequence and structure'),
    p('As a synthetic peptide, LL-37 is simply its thirty-seven-residue sequence assembled in order; there is no separate ingredient beyond that chain. In aqueous solution the chain is reported to exist largely without a fixed structure, while on contact with lipid membranes it can fold into an amphipathic alpha-helix, arranging its charged and hydrophobic residues onto separate faces. Appearance alone, such as a lyophilized powder, cannot distinguish LL-37 from an unrelated peptide of similar size, which is why analytical confirmation matters.'),

    h4('LL-37 and the Cathelicidin Family'),
    p('Cathelicidins are a family of peptides sharing a conserved N-terminal "cathelin-like" domain attached to a variable C-terminal segment that is cleaved off and activated when needed. Several species carry more than one cathelicidin gene, each producing a different peptide. Humans carry only one, the CAMP gene, whose protein product (hCAP-18) is processed into LL-37. This single-gene arrangement is why LL-37 functions as the default reference point whenever human cathelicidin biology is discussed, and findings from multi-gene animal models should not be assumed to map directly onto LL-37 alone.'),

    h4('LL-37 Alongside Other Research Peptides'),
    p('LL-37 is one of several short peptides studied in immune-related research contexts. The table below is for orientation only: it compares molecular identity and research context, not strength, safety or any ranking between materials.'),
    table(
      ['Research material', 'Molecular identity', 'Common research context'],
      [
        ['LL-37', 'Synthetic 37-residue peptide, hCAP-18 fragment', 'Membrane interaction, antimicrobial peptide biology, innate immune signaling'],
        ['KPV', 'Tripeptide, Lys-Pro-Val, C-terminal fragment of alpha-MSH', 'Immune and inflammation-related cell research'],
        ['Thymosin Alpha-1', 'Synthetic 28-residue peptide, prothymosin alpha fragment', 'Toll-like receptor signaling on dendritic and other innate immune cells'],
      ],
    ),
    p('These three materials are chemically distinct, with their own sequences, molecular identities and separate bodies of research. Shared placement in the same research category reflects a broad area of study, not a shared mechanism or interchangeable identity.'),

    h4('Research Literature Context'),
    h5('Scope of the published literature'),
    `<p><em>Established.</em> Research on LL-37 published to date is concentrated in laboratory, cell-culture and animal-model systems, examining the peptide\'s membrane interactions, its behavior in innate immune signaling assays, and its structural switch from an unstructured state in solution to an amphipathic alpha-helix on contact with lipid membranes. This describes the shape of the published literature, not a conclusion about effectiveness or safety for any use.</p>`,
    h5('Proposed rationale'),
    `<p><em>Hypothesis.</em> Researchers have proposed several signaling and membrane-interaction mechanisms that might explain outcomes observed in these model systems, including interactions with specific cell-surface receptors and effects on immune cell behavior in culture. These remain active research questions rather than settled mechanisms, and findings reported in one model system describe that system under its own conditions, not a general property of the molecule.</p>`,

    h4('Research Questions, Answered'),
    qa({
      h: 'How do I confirm what LL-37 actually refers to?',
      problem: 'The same name can be used loosely across suppliers and reference sources, which makes it hard to know exactly what a listing describes.',
      answer: 'Anchor on identifiers rather than the name alone: the sequence LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES, its 37-residue length, and its precursor relationship to residues 134-170 of hCAP-18. Stated together, they describe a specific molecule rather than a label, and they should agree across any source checked.',
      takeaway: 'Ask which sequence and which precursor relationship a listing is actually using.',
    }),
    qa({
      h: 'How is LL-37 different from hCAP-18?',
      problem: 'Supplier and search content sometimes use "LL-37" and "hCAP-18" interchangeably, blurring the line between the active peptide and its precursor protein.',
      answer: 'hCAP-18 is the full-length precursor protein produced from the CAMP gene. LL-37 is the specific 37-residue fragment, residues 134 to 170, released from that precursor by proteinase 3 and related serine proteases. Precursor-level and peptide-level data describe different molecules and should not be treated as interchangeable.',
      takeaway: 'Confirm whether a source describes the intact precursor or the cleaved 37-residue peptide before comparing findings.',
    }),
    qa({
      h: 'How should findings reported in a specific research model be read?',
      problem: 'A single reported outcome can be generalized well beyond the model it came from.',
      answer: 'Each published finding is tied to a specific model system and endpoint chosen by that study. A result from one model describes that model under those conditions, and it should be traced back to the source and checked against the question actually being asked before it is treated as a general statement about the molecule.',
      takeaway: 'Read a finding for its model and endpoint, not as a general claim.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an LL-37 Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Chemical form', 'Whether the report describes the free peptide or a named salt'],
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
    p('LL-37\'s commonly cited reference molecular weight is approximately 4493.3 g/mol (average), a figure consistent with a linear 37-residue peptide of this composition. In electrospray ionization mass spectrometry, a peptide this size usually appears as one or more multiply charged ions rather than a single peak at that neutral weight, so an observed mass-to-charge ratio (m/z) needs to be read alongside its charge state before it means anything as a comparison. Adducts, such as sodium or potassium attaching to the peptide, can shift an observed m/z further still. A mass that lands within a stated tolerance of the reference value supports identity; it does not, on its own, say anything about purity.'),
    p('Salt or counterion form, where applicable, is not reflected in the reference weight above and should be confirmed on the lot\'s own documentation before it is used in any mass-based calculation.'),

    h4('Verification Questions, Answered'),
    qa({
      h: 'What should I verify on an LL-37 COA?',
      problem: 'A purity percentage alone does not confirm what is in a vial, particularly when more than one salt or counterion form can circulate under the same name.',
      answer: 'A useful certificate states the exact chemical form, an identity result showing expected and observed mass with the method used, chromatographic purity with its detection conditions, and the lot number, laboratory and test date. Confirming the stated form first avoids most mismatches.',
      takeaway: 'Read a COA for form, method and lot, not just the percentage.',
    }),
    qa({
      h: 'How should I interpret LL-37 mass-spectrometry data?',
      problem: 'A single reference mass is often quoted as if it should match an instrument reading directly.',
      answer: 'An observed m/z value depends on the ionization charge state and any adducts formed during the run, so it is not automatically the same number as the peptide\'s neutral molecular weight. Compare an observed mass with the approximately 4493.3 g/mol reference value only after accounting for charge state, and treat a close match as support for identity rather than a purity measurement.',
      takeaway: 'Charge state and adducts have to be accounted for before a mass comparison means anything.',
    }),
    qa({
      h: 'What can this product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'This page can establish LL-37\'s sequence and precursor relationship and summarize the shape of the published research literature. It cannot establish this product\'s concentration, carrier composition, purity or delivery characteristics, since those depend on the manufacturing and testing records for that particular batch. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for LL-37 Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('LL-37 Spray is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page describes LL-37 at the molecular and structural level only, contains no administration or usage guidance of any kind, and Veracue does not provide dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is LL-37?',
    answer: 'LL-37 is the common name for a synthetic 37-residue peptide, sequence LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES, corresponding to residues 134-170 of the human hCAP-18 precursor protein. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What does "Spray" mean on this listing?',
    answer: 'It describes Veracue\'s packaging and dispensing format, a liquid supplied in a spray-top bottle. It is not a claim about route of administration, concentration or formulation; those specifics depend on lot-specific documentation.',
  },
  {
    question: 'What is the LL-37 sequence?',
    answer: 'LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES, 37 residues in total, named for its two N-terminal leucines and its length.',
  },
  {
    question: 'What is the molecular weight of LL-37?',
    answer: 'A commonly cited public reference value is about 4493.3 g/mol (average), consistent with a 37-residue peptide of this composition. This figure is a reference-database value, not a Veracue lot result.',
  },
  {
    question: 'What is the CAS number for LL-37?',
    answer: 'A commonly cited CAS Registry Number for this sequence is 171680-04-3. As with the molecular weight, this is a reference-database value and should be confirmed against lot-specific documentation.',
  },
  {
    question: 'How is LL-37 related to hCAP-18?',
    answer: 'LL-37 is the C-terminal fragment released when proteinase 3 and related serine proteases cleave residues 134-170 from hCAP-18, the full-length precursor protein encoded by the human CAMP gene.',
  },
  {
    question: 'Is LL-37 the only cathelicidin peptide found in humans?',
    answer: 'Yes. Humans carry a single cathelicidin gene, CAMP, which is processed into LL-37. Other species carry multiple cathelicidin genes, each producing a different peptide.',
  },
  {
    question: 'Is LL-37 the same as KPV or Thymosin Alpha-1?',
    answer: 'No. Each is a chemically distinct material with its own sequence, molecular identity and research history. Shared placement in the same research category reflects a broad area of study, not shared identity.',
  },
  {
    question: 'What does the published LL-37 research literature generally cover?',
    answer: 'Published work is concentrated in laboratory, cell-culture and animal-model systems examining membrane interaction, innate immune signaling and the peptide\'s structural switch to an amphipathic alpha-helix on contact with lipid membranes. This describes the shape of the literature, not a conclusion about effectiveness or safety for any use.',
  },
  {
    question: 'What should an LL-37 COA contain?',
    answer: 'Useful fields include the stated chemical form, an identity result with expected and observed mass and method, a purity result with its detection conditions, and the lot number, laboratory and test date.',
  },
  {
    question: 'How should LL-37 mass-spectrometry data be interpreted?',
    answer: 'An observed mass-to-charge ratio should be read alongside its charge state and any adducts before comparing it with the approximately 4493.3 g/mol reference value.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for LL-37 Spray?',
    answer: 'No. LL-37 Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['immune-modulation'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'LL-37 Spray',
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
