import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// GLP-3RTA (LY3437943). Research-use-only copy: molecular identity, receptor profile at assay level,
// analytical documentation. Facts come from docs/product-contents-1/retatrutide-product-page.json;
// all clinical, regulatory, weight-related and drug-name content is intentionally left out.

const NAME = 'GLP-3RTA'
const SLUG = 'glp-3rta'

// Prices and stock are placeholders (owner updates prices later). SKUs are code + strength.
const SKU_CODE = 'GLP3RTA'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_GLP_3_RTA_10mg.jpg', price: 59 },
  { strength: '20mg', image: 'VERACUE_GLP_3_RTA_20mg.jpg', price: 99 },
  { strength: '30mg', image: 'VERACUE_GLP_3_RTA_30mg.jpg', price: 139 },
  { strength: '60mg', image: 'VERACUE_GLP_3_RTA_60mg.jpg', price: 199 },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'GLP-3RTA Research Peptide (LY3437943)'
const SEO_DESCRIPTION =
  "GLP-3RTA (LY3437943) is one 39-amino-acid molecule that engages the GIP, GLP-1 and glucagon receptors. Vials from 10 to 60 mg. Research use only."
const DESCRIPTION =
  "GLP-3RTA is a lab-grade synthetic peptide built as a single molecule that engages three receptors at once: GIP, GLP-1 and glucagon. Its 39-amino-acid backbone (formula C221H342N46O68, about 4,731 g/mol) carries a C20 fatty diacid on lysine 17, and its research code is LY3437943 (CAS 2381089-83-2). Because it is one engineered molecule and not a blend, identity is best confirmed by mass spectrometry. Choose 10, 20, 30 or 60 mg vials, sold strictly for laboratory research use."
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
    h4('What Is GLP-3RTA?'),
    p('GLP-3RTA is a synthetic peptide supplied for laboratory research. Its research code is LY3437943 (also written LY-3437943), and it is built as one engineered molecule: a 39-amino-acid peptide backbone carrying a C20 fatty diacid. That design lets a single compound engage three receptors in research systems, namely the GIP receptor (GIPR), the GLP-1 receptor (GLP-1R) and the glucagon receptor (GCGR).'),
    p('Veracue supplies GLP-3RTA strictly for laboratory use, and lot documentation is available on request.'),
    h4('GLP-3RTA at a Glance'),
    kvTable([
      ['Product name', 'GLP-3RTA'],
      ['Research code', 'LY3437943 (also LY-3437943)'],
      ['Molecular class', '39-amino-acid peptide conjugated to a C20 fatty diacid'],
      ['Receptor targets', 'GIPR, GLP-1R and GCGR (agonist activity in receptor assays)'],
      ['Lipid attachment', 'C20 fatty diacid through a linker at lysine 17'],
      ['Molecular formula', 'C221H342N46O68'],
      ['Molecular weight (average)', 'About 4,731 g/mol'],
      ['Monoisotopic mass', 'About 4,728.47 Da'],
      ['CAS Registry Number', '2381089-83-2'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Formula from the PubChem record (CID 171390338). Masses are calculated from that formula. CAS number as listed in chemical databases.</em></p>`,
    p('Physical form, salt or counterion, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What GLP-3RTA Is Not'),
    ul([
      'Not a physical mixture of three separate peptides or hormones.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('GLP-3RTA is the name Veracue uses for this material. The same molecule is catalogued under the research code LY3437943, also written LY-3437943, in PubChem and in the IUPHAR/BPS Guide to PHARMACOLOGY, which makes those records a useful reference when checking a certificate of analysis.'),
    h5('Peptide and lipid architecture'),
    p('The backbone is a 39-amino-acid peptide engineered from a GIP sequence, with a few non-standard residues that contribute to enzymatic stability and receptor activity. A C20 fatty diacid is attached through a linker at lysine 17. That lipid supports reversible albumin binding, which shapes how long the molecule persists in biological test systems. The residue-level sequence is available in the PubChem record.'),
    h5('One molecule, three receptor systems'),
    p('This is the central identity point. GLP-3RTA is a single engineered molecule, not a blend. In the reported receptor assays it showed a distinct balance of activity across GIPR, GLP-1R and GCGR, with greater relative activity at GIPR than at GLP-1R or GCGR.'),

    h4('Receptor Profile'),
    table(
      ['Receptor', 'Full name', 'Research background'],
      [
        ['GIPR', 'Glucose-dependent insulinotropic polypeptide receptor', 'Linked to glucose-dependent insulin secretion'],
        ['GLP-1R', 'Glucagon-like peptide-1 receptor', 'Linked to glucose-dependent insulin secretion'],
        ['GCGR', 'Glucagon receptor', 'Mainly known for glucagon’s role in glucose and energy metabolism'],
      ],
    ),

    h4('Research Context'),
    h5('Established receptor pharmacology'),
    `<p><em>Established.</em> In receptor and cell-based studies, GLP-3RTA activates GIPR, GLP-1R and GCGR. These receptors belong to a wider signaling network involved in glucose handling and energy metabolism.</p>`,
    h5('Proposed rationale'),
    `<p><em>Hypothesis.</em> Researchers have proposed that combining the three receptor activities in one molecule may produce signaling patterns that differ from single-receptor or dual-receptor peptides. The glucagon receptor is the most interesting addition, because glucagon is traditionally associated with raising blood glucose. How the three signals interact is still being worked out, so these ideas remain hypotheses.</p>`,

    h4('Research Questions, Answered'),
    qa({
      h: 'What does the fatty-acid conjugation mean?',
      problem: '“Peptide” suggests a plain chain of amino acids, yet GLP-3RTA also carries a lipid, and it helps to know what that adds.',
      answer: 'GLP-3RTA is described as a single peptide conjugated to a fatty diacid: a C20 diacid attached through a linker at lysine 17. The lipid supports reversible binding to albumin, a common design strategy for longer persistence in test systems. It also makes the molecule more hydrophobic, which is worth remembering when interpreting analytical data. None of this is a handling or preparation instruction. It describes how the molecule was designed.',
      takeaway: 'The lipid is part of the molecule’s identity, not an accessory.',
    }),
    qa({
      h: 'Why is GLP-3RTA called a triple agonist?',
      problem: '“Triple agonist” can sound like three compounds combined.',
      answer: 'The term describes the receptor profile of one molecule and does not mean three peptides mixed together. Activity at GIPR, GLP-1R and GCGR comes from a single structure with a lipid attached. A mixture of separate peptides would behave differently, because each component would have its own stability and behavior in an assay. The three-receptor activity is best treated as a property of the intact molecule.',
      takeaway: '“Triple” counts receptors, not ingredients.',
    }),
    qa({
      h: 'What do the three receptors each contribute?',
      problem: 'It is tempting to give each receptor a single job, but metabolic signaling is more interconnected than that.',
      answer: 'GLP-1R and GIPR are both linked to glucose-dependent insulin secretion, while the glucagon receptor is mainly known for glucagon’s role in glucose and energy metabolism. The hypothesis behind combining them is that the three signals together may shape metabolic readouts differently from single-receptor approaches. How the signals combine remains an open research question.',
      takeaway: 'Keep receptor biology and mechanistic hypotheses in separate boxes.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a GLP-3RTA Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Product name / identifier', 'What material the report refers to'],
        ['Lot number', 'Links the report to a specific batch'],
        ['Identity method', 'How identity was assessed'],
        ['MS / mass result', 'Supports molecular identity'],
        ['HPLC or other purity method', 'Reports analytical purity under the stated method'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
        ['Specification / acceptance criterion', 'Provides context for the reported result'],
      ],
    ),
    p('HPLC alone does not prove identity, and mass spectrometry alone does not prove purity. If a lot-specific certificate is available, use it as the primary source for that lot’s reported analytical results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('GLP-3RTA is a lipid-conjugated peptide: a 39-residue backbone carrying a C20 fatty diacid through a linker. Its calculated molecular weight (about 4,731 g/mol average, about 4,728.47 Da monoisotopic, from the PubChem formula) is not the same as an observed LC-MS m/z value, because instruments typically report multiply charged ions and adducts can shift peaks. Confirm the charge state and processing method, and check that the method detected the intact conjugate rather than a fragment. Identity and purity are also separate questions. Mass data speak to what a material is, while chromatographic purity speaks to how much of the detected signal belongs to a single component. A mass quoted without its method is therefore hard to verify.'),

    h4('Verification Questions, Answered'),
    qa({
      h: 'How do I confirm that the material is actually GLP-3RTA?',
      problem: 'Related lipidated peptides can look similar in product catalogs, and a name on a label tells you what a material is called, not what it is.',
      answer: 'Identity comes from analytical data compared with a defined reference. For GLP-3RTA, the reference is the published structure and the PubChem record: a 39-amino-acid peptide conjugated to a C20 fatty diacid, formula C221H342N46O68. Mass spectrometry can support that match by showing an intact mass consistent with the reference. A clean chromatography peak cannot do the same job, because it shows that a sample is uniform and not what the molecule is.',
      takeaway: 'A name is not an analytical identity. Ask which reference and which method a report used.',
    }),
    qa({
      h: 'What should I look for on a GLP-3RTA COA?',
      problem: 'A certificate of analysis is only useful if you know what each line can and cannot show.',
      answer: 'Depending on the testing program, a lot-specific COA may include a product identifier, lot number, test date, analytical method, identity result, purity or assay value, an acceptance criterion and the testing laboratory. Two points matter most for a lipidated peptide. The identity result should say what it was matched against, and the purity value should name its method. It also helps to confirm that the report refers to the lot in hand.',
      takeaway: 'Read a COA for method, lot and identity basis, not just the percentage.',
    }),
    qa({
      h: 'How should I interpret GLP-3RTA mass-spectrometry data?',
      problem: 'A single mass number appears on many listings, and it is easy to compare it with the wrong thing.',
      answer: 'A calculated molecular mass and an LC-MS m/z value are not automatically the same number. Average molecular weight and monoisotopic mass are both calculated from the formula and differ slightly, whereas an instrument usually reports m/z for multiply charged ions. An observed peak therefore has to be read alongside its charge state, any adducts and the deconvolution method. A figure quoted without those details cannot be checked.',
      takeaway: 'Ask which m/z values, charge states and processing method sit behind a mass claim.',
    }),
    qa({
      h: 'What can a product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'Identity, purity, physical form and storage details belong to the lot record, and a report for one lot does not describe another lot, even for the same compound. The product page provides molecular and research context, while lot-specific documentation provides the analytical results reported for that particular material. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for GLP-3RTA?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GLP-3RTA is supplied for laboratory research use only and is not intended for human or veterinary use. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GLP-3RTA?',
    answer: 'GLP-3RTA is a synthetic peptide with the research code LY3437943. It is a 39-amino-acid peptide conjugated to a C20 fatty diacid, designed to engage the GIP, GLP-1 and glucagon receptors from a single molecule, and Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is LY3437943?',
    answer: 'LY3437943, also written LY-3437943, is the research code under which the molecule is catalogued in PubChem and the IUPHAR/BPS Guide to PHARMACOLOGY. GLP-3RTA and LY3437943 refer to the same molecule.',
  },
  {
    question: 'Is GLP-3RTA a peptide?',
    answer: 'Yes. It has a 39-amino-acid peptide backbone conjugated to a C20 fatty diacid, so it is a lipid-conjugated peptide rather than a plain peptide chain.',
  },
  {
    question: 'Why is GLP-3RTA called a triple agonist?',
    answer: 'Because one molecule activates three receptors: GIPR, GLP-1R and GCGR. The term describes the receptor profile of a single peptide, not a mixture of three.',
  },
  {
    question: 'Which receptors does GLP-3RTA target?',
    answer: 'The glucose-dependent insulinotropic polypeptide receptor (GIPR), the glucagon-like peptide-1 receptor (GLP-1R) and the glucagon receptor (GCGR). In receptor assays it showed a distinct balance of activity across the three.',
  },
  {
    question: 'What are the molecular formula and weight of GLP-3RTA?',
    answer: 'The formula is C221H342N46O68, which gives an average molecular weight of about 4,731 g/mol and a monoisotopic mass of about 4,728.47 Da, calculated from the PubChem record. An observed LC-MS value will look different because instruments usually report multiply charged ions.',
  },
  {
    question: 'What should a GLP-3RTA COA show?',
    answer: 'A lot-specific COA may include a product identifier, lot number, test date, method, identity result, purity value, acceptance criterion and laboratory. The identity result should say what it was matched against, and the purity value should name its method.',
  },
  {
    question: 'How should mass-spectrometry results be interpreted?',
    answer: 'A calculated mass and an observed m/z value are not automatically the same number. Check the charge state, adducts and deconvolution method first, and remember that mass data speak to identity, not purity.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for GLP-3RTA?',
    answer: 'No. GLP-3RTA is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  legacySlugs: ['retatrutide'],
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GLP-3RTA',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image, price: v.price })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/retatrutide/i, /reta/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
