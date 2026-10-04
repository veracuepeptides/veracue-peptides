import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// BPC-157/TB-500 Spray. This is the first-ever listing for this specific two-peptide combination on
// the site: there is no vial sibling for the combo itself, only two standalone sprays that already
// exist for each component (bpc-157-spray.ts, tb-500-spray.ts). Molecular identity facts for both
// peptides are reused unchanged from those listings: BPC-157's sequence, formula, CAS and PubChem CID
// come from bpc-157-spray.ts, and TB-500's sequence, formula, CAS, PubChem CID and its distinction from
// full-length thymosin beta-4 come from tb-500.ts (the live vial listing, source of truth for TB-500).
// Structure is mined from docs/product-contents-2/bpc-157-tb-500-spray.json; that draft's dosing
// figures, clinical/human-study framing, tissue-repair and healing-outcome claims, and reference
// citations are intentionally left out. Per site policy for this product, both peptides are described
// only at the molecular level (sequence, formula, mass, CAS, PubChem CID, naming) with no outcome or
// indication framing; TB-500's naming-ambiguity point is kept since it is an identity-verification
// fact, not an outcome claim.

const NAME = 'BPC-157/TB-500 Spray'
const SLUG = 'bpc-tb-500-spray'

const SKU_CODE = 'BPCTB500-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg/5mg', image: 'VERACUE_Spray_BPC_TB_500_5_5mg.jpg' },
  { strength: '10mg/10mg', image: 'VERACUE_Spray_BPC_TB_500_10_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const BPC_SPRAY_LINK = [{ phrase: 'BPC-157 Spray listing', href: '/product/bpc-157-spray' }]
const TB500_SPRAY_LINK = [{ phrase: 'TB-500 Spray listing', href: '/product/tb-500-spray' }]

const SEO_TITLE = 'BPC-157/TB-500 Spray Research Blend'
const SEO_DESCRIPTION =
  "BPC-157/TB-500 Spray packages two separately verified peptides, BPC-157 and TB-500, in one spray format for laboratory research only."
const DESCRIPTION =
  'BPC-157/TB-500 Spray combines two separate research peptides in one spray-dispensed container. BPC-157 is the 15-residue sequence GEPPPGKPADDAGLV, formula C62H98N16O22, about 1419.5 g/mol, CAS 137525-51-0. TB-500 here is the 7-residue fragment Ac-LKKTETQ, formula C38H68N10O14, about 889 g/mol, CAS 885340-08-9, a market name suppliers sometimes apply inconsistently, so its identity should be checked independently rather than assumed. Veracue supplies 5 mg of each peptide or 10 mg of each peptide, strictly for laboratory research use only.'
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
    h4('What Is BPC-157/TB-500 Spray?'),
    p('BPC-157/TB-500 Spray is Veracue\'s spray-dispensed packaging of two distinct synthetic peptides, BPC-157 and TB-500, offered together as a single listing. Each peptide is also documented on its own BPC-157 Spray listing and TB-500 Spray listing, and the molecular identity reported here is identical to what is reported there.', { links: [...BPC_SPRAY_LINK, ...TB500_SPRAY_LINK] }),
    p('"Spray" in this product\'s name is a packaging and dispensing descriptor only. It does not establish a route, a concentration or a formulation for either peptide, and none of those specifics should be inferred from the name. Chemical form, concentration, ratio between the two peptides, fill volume and storage conditions are reported on each lot\'s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('BPC-157/TB-500 Spray at a Glance'),
    kvTable([
      ['Product name', 'BPC-157/TB-500 Spray'],
      ['Components', 'BPC-157 and TB-500, two separate synthetic peptides'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['BPC-157 sequence', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV)'],
      ['TB-500 sequence', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ)'],
      ['BPC-157 identity', 'C62H98N16O22, about 1419.5 g/mol, CAS 137525-51-0, PubChem CID 9941957'],
      ['TB-500 identity', 'C38H68N10O14, about 889 g/mol, CAS 885340-08-9, PubChem CID 62707662'],
      ['Sizes offered', '5 mg of each peptide, and 10 mg of each peptide'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values are drawn from chemical databases for each reference molecule and are not a Veracue lot result.</em></p>`,
    p('Purity, chemical form, concentration and lot results for each peptide are reported on each lot\'s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why Combine Two Separate Listings?'),
    p('Veracue also lists BPC-157 and TB-500 individually, each in its own spray format, for research groups that only need one of the two materials. This combination listing exists for research groups tracking both peptides together, with lot records, images and documentation specific to the combined packaging a researcher actually ordered.'),
    h4('What BPC-157/TB-500 Spray Is Not'),
    ul([
      'Not a single peptide. It contains two separate molecules, each with its own sequence and formula.',
      'Not a different pair of molecules from the BPC-157 and TB-500 documented on the standalone spray listings.',
      'Not full-length thymosin beta-4, and not KPV or GHK-Cu, which are separate research peptides with their own sequences.',
      'Not a consumer, dietary or veterinary product, and not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity of Each Component'),
    p('This listing combines two chemically unrelated peptides. The reference values below describe each molecule on its own and are identical to the values reported on the BPC-157 Spray listing and the TB-500 Spray listing.', { links: [...BPC_SPRAY_LINK, ...TB500_SPRAY_LINK] }),
    table(
      ['Attribute', 'BPC-157', 'TB-500'],
      [
        ['Sequence', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV)', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ)'],
        ['Length', '15 residues', '7 residues'],
        ['Molecular formula', 'C62H98N16O22', 'C38H68N10O14'],
        ['Average molecular weight', 'About 1419.5 g/mol', 'About 889 g/mol'],
        ['CAS Registry Number', '137525-51-0', '885340-08-9'],
        ['PubChem CID', '9941957', '62707662'],
        ['Related to', 'A standalone synthetic sequence with no larger parent protein', 'Residues 17 to 23 of the 43-residue protein thymosin beta-4'],
      ],
    ),
    h5('Does the spray format or the combination change either molecule?'),
    p('No. Packaging two peptides into one listing does not change the sequence, formula or mass of either compound. BPC-157 and TB-500 remain exactly as documented on the BPC-157 Spray listing and the TB-500 Spray listing; what differs on this listing is that both are supplied together.', { links: [...BPC_SPRAY_LINK, ...TB500_SPRAY_LINK] }),

    h4('TB-500: A Name That Needs Its Own Verification'),
    p('"TB-500" is a market name rather than a formal chemical designation, and it has been applied inconsistently across suppliers: sometimes to the short Ac-LKKTETQ fragment described above, and sometimes to material described using full-length thymosin beta-4 data, a separate 43-residue protein with its own mass of roughly 4,963 g/mol. The name alone does not confirm which material a given product contains. Veracue\'s TB-500 refers specifically to the Ac-LKKTETQ fragment identified above, and that identity should be checked against a lot\'s own documentation rather than assumed from the name.'),
    p('BPC-157 does not carry this same naming ambiguity: its sequence, formula and CAS number are consistent across standard chemical database records.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue\'s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a ratio between BPC-157 and TB-500, a carrier or a route, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('A two-peptide listing makes this distinction more important, not less: a packaging word says nothing about how much of each peptide a given unit contains relative to the other. A researcher documenting materials in a methods section should cite the lot\'s own documentation for format-specific details rather than inferring them from the word "Spray."'),

    h4('Research Questions, Answered'),
    qa({
      h: 'How do I confirm what BPC-157 and TB-500 actually refer to in this listing?',
      problem: 'Both names are used loosely across suppliers and reference sources, which makes it hard to know exactly what a listing describes.',
      answer: 'Anchor on identifiers rather than names alone: BPC-157 is GEPPPGKPADDAGLV, C62H98N16O22, CAS 137525-51-0. TB-500 here is Ac-LKKTETQ, C38H68N10O14, CAS 885340-08-9. Stated together, each set of identifiers describes a specific molecule, and both should be checked against a lot\'s own documentation.',
      takeaway: 'Ask which sequence, which formula and which CAS number a listing is actually using for each peptide.',
    }),
    qa({
      h: 'Is the TB-500 in this spray the same as full-length thymosin beta-4?',
      problem: 'The two names are sometimes used interchangeably in the broader market, which can suggest they are the same material.',
      answer: 'No. Full-length thymosin beta-4 is a naturally occurring 43-residue protein weighing roughly 4,963 g/mol. TB-500 as supplied here is the much smaller Ac-LKKTETQ fragment, about 889 g/mol. They are related by sequence overlap, not identity, and findings for one should not be assumed to apply to the other.',
      takeaway: 'Confirm which of the two materials a record actually describes before comparing data.',
    }),
    qa({
      h: 'Is this combination listing a different formulation from the standalone BPC-157 Spray and TB-500 Spray listings?',
      problem: 'A combined listing can read as though it contains a new or different material from the individual listings.',
      answer: 'No. Both peptides in this listing carry the same sequence, formula, CAS number and PubChem CID reported on the BPC-157 Spray listing and the TB-500 Spray listing. The difference is packaging: this listing supplies both peptides together rather than as two separate purchases.',
      takeaway: 'Treat the combination as shared packaging of two already-documented molecules, not a new compound.',
      links: [...BPC_SPRAY_LINK, ...TB500_SPRAY_LINK],
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a COA for a Two-Peptide Spray Listing'),
    p('A certificate of analysis documents one lot, never a packaging format or a compound in general. For a two-peptide listing like this one, look for each item below to cover both BPC-157 and TB-500, because a result for one component says nothing about the other.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the container and the order record for the unit received.'],
        ['Peptide names, sequences or formulas', 'Whether the record names both BPC-157 and TB-500 and ties each to its own sequence.'],
        ['Chemical form', 'Free peptide, acetate or another salt, for each component separately.'],
        ['Identity result', 'Expected and observed mass for each peptide, with the method used, for example LC-MS or ESI-MS.'],
        ['HPLC or other purity method', 'Analytical purity under stated conditions, reported for each peptide.'],
        ['Test date and laboratory', 'Establishes when testing occurred and who performed it.'],
      ],
    ),
    p('Which fields appear varies by supplier and by lot, so check the specific document rather than assuming a standard set of tests was run. No purity figure, HPLC result or mass-spectrometry value is stated on this listing, since none is lot-specific until a given batch is tested. If a lot-specific certificate is available, use it as the primary source for that lot\'s reported results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Two Identity Checks and Two Masses'),
    p('Because this listing holds two peptides, a full identity check has two parts. BPC-157 should be matched to C62H98N16O22, average mass about 1419.5 g/mol, CAS 137525-51-0. TB-500 should be matched to C38H68N10O14, average mass about 889 g/mol, CAS 885340-08-9. A record confirming only one of the two leaves the other unverified.'),
    table(
      ['Component', 'Reference mass', 'Formula'],
      [
        ['BPC-157', 'About 1419.5 g/mol', 'C62H98N16O22'],
        ['TB-500 (Ac-LKKTETQ fragment)', 'About 889 g/mol', 'C38H68N10O14'],
      ],
    ),
    h5('Why do observed mass values differ from the data sheet?'),
    p('A mass spectrometer detects ions, not spray bottles. A peptide can carry one or more charges, so one molecule can show up at several m/z values, and observed signals will not match the molecular weight on a data sheet directly. Adducts and counterions can shift or add signals. The two reference masses here, about 1419.5 and about 889 g/mol, sit far enough apart that their signals should not be confused, and interpretation belongs to the analytical record and its stated method conditions.'),
    h5('Does a combination listing need different verification than the standalone sprays?'),
    p('No. The verification question is the same for either listing: does this lot match the stated molecules, and is each purity figure paired with a mass result from that same lot. Combining two peptides into one listing does not change what counts as adequate documentation for each one.'),

    h4('Need lot documentation for BPC-157/TB-500 Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('BPC-157/TB-500 Spray is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no administration or usage guidance of any kind, and Veracue does not provide dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is BPC-157/TB-500 Spray?',
    answer: 'It is Veracue\'s spray-dispensed packaging of two separate synthetic peptides, BPC-157 and TB-500, offered together as a single listing. Each peptide is also available on its own standalone spray listing. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue\'s packaging and dispensing format only. It is not a claim about route, concentration, ratio or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'What is the BPC-157 sequence and identity?',
    answer: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val, written as GEPPPGKPADDAGLV, 15 residues. Formula C62H98N16O22, average molecular weight about 1419.5 g/mol, CAS 137525-51-0, PubChem CID 9941957.',
  },
  {
    question: 'What is TB-500 and is it the same as thymosin beta-4?',
    answer: 'Veracue\'s TB-500 is the Ac-LKKTETQ fragment, 7 residues corresponding to residues 17 to 23 of thymosin beta-4, formula C38H68N10O14, average mass about 889 g/mol, CAS 885340-08-9. It is not the same material as full-length thymosin beta-4, a separate 43-residue protein weighing roughly 4,963 g/mol. "TB-500" is a market name applied inconsistently across suppliers, so its identity should be checked against a lot\'s own documentation.',
  },
  {
    question: 'Are the BPC-157 and TB-500 in this spray different from the standalone spray listings?',
    answer: 'No. Both peptides carry the same sequence, formula, CAS number and PubChem CID reported on the standalone BPC-157 Spray and TB-500 Spray listings. This listing differs only in that both peptides are supplied together.',
  },
  {
    question: 'What does 5mg/5mg and 10mg/10mg mean on this listing?',
    answer: 'The first figure is the BPC-157 content and the second is the TB-500 content, so 5mg/5mg means 5 mg of BPC-157 and 5 mg of TB-500 in the unit, and 10mg/10mg means 10 mg of each.',
  },
  {
    question: 'Is BPC-157 or TB-500 available on its own, outside this combination listing?',
    answer: 'Yes. Both BPC-157 and TB-500 are each available individually in Veracue\'s spray format, documented on their own standalone listings.',
  },
  {
    question: 'What should a BPC-157/TB-500 Spray certificate of analysis include?',
    answer: 'It should name both BPC-157 and TB-500 with their own sequences and formulas, state a lot number matching the container received, and report an HPLC purity result and a mass spectrometry identity result for each peptide, with test date and testing laboratory.',
  },
  {
    question: 'Why do mass spectrometry values not match the listed weights?',
    answer: 'A spectrometer reports m/z for charged ions, so one molecule can appear at several values, and adducts or counterions can shift signals further from the neutral average molecular weight.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means both peptides are supplied only for laboratory research, not for human or veterinary use, and neither has been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for BPC-157/TB-500 Spray?',
    answer: 'No. BPC-157/TB-500 Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'BPC-157/TB-500 Spray',
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
