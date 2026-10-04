import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// GHRP-6. Research-use-only copy: molecular identity, receptor and pathway context at assay level,
// analytical documentation. Facts come from docs/product-contents-1/ghrp-6.json; all human study,
// appetite, hormone-response, dosing and status content is intentionally left out.

const NAME = 'GHRP-6'
const SLUG = 'ghrp-6'

const SKU_CODE = 'GHRP6'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_GHRP_6_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'GHRP-6 Research Peptide (Hexapeptide)'
const SEO_DESCRIPTION =
  "GHRP-6 (SKF-110679) is a six-residue peptide of 872.45 g/mol, CAS 87616-84-0. Read how to check its COA. Available in a 10 mg vial for research use only."
const DESCRIPTION =
  "GHRP-6, also called growth hormone-releasing hexapeptide or SKF-110679, is a six-residue synthetic peptide with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. The free peptide is C46H56N12O6 at 872.45 g/mol (CAS 87616-84-0). In secretagogue research it is used as a reference ligand for the ghrelin receptor, GHS-R1a, and it is often set beside GHRP-2. It is sold as a 10 mg vial for research use only."
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
    h4('What Is GHRP-6?'),
    p('GHRP-6 (growth hormone-releasing hexapeptide) is a synthetic six-amino-acid peptide with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. It binds the ghrelin receptor, GHS-R1a, and is used in the lab as a reference compound for secretagogue receptor pharmacology. Its formula is C46H56N12O6, its molecular weight is 872.45 g/mol for the free peptide, and its CAS number is 87616-84-0.'),
    p('GHRP-6 was one of the first members of the GHRP family, which grew out of enkephalin-derived screening work in the 1980s. Its receptor was later identified as GHS-R1a, the same receptor that binds the endogenous hormone ghrelin. Veracue supplies GHRP-6 as a lyophilized research material, strictly for laboratory use.'),
    h4('GHRP-6 at a Glance'),
    kvTable([
      ['Product name', 'GHRP-6'],
      ['Full name', 'Growth hormone-releasing peptide-6 (growth hormone-releasing hexapeptide)'],
      ['Developmental code', 'SKF-110679'],
      ['Sequence', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 (C-terminally amidated hexapeptide)'],
      ['Molecular formula', 'C46H56N12O6 (free peptide)'],
      ['Molecular weight', '872.45 g/mol (free peptide)'],
      ['CAS Registry Number', '87616-84-0 (free peptide); 145177-42-0 listed for the acetate salt in supplier chemical databases'],
      ['Peptide class', 'Synthetic growth hormone secretagogue (GHRP family)'],
      ['Receptor target', 'GHS-R1a (ghrelin receptor)'],
      ['Form', 'Lyophilized powder'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Reference data for the free peptide. A salt form such as acetate or TFA changes the measured molecular weight because the counter-ion mass is included.</em></p>`,
    p('Salt form, net peptide content, purity and lot results are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What GHRP-6 Is Not'),
    ul([
      'Not the same compound as ghrelin, which is the endogenous hormone that GHS-R1a naturally responds to.',
      'Not the same compound as GHRP-2, although the two share a receptor.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('GHRP-6 is also written GHRP 6 and is known by the developmental code SKF-110679. The free peptide carries CAS 87616-84-0, and supplier chemical databases list CAS 145177-42-0 for the acetate salt. Checking a certificate of analysis against these identifiers is a quick first test of whether it describes the right material.'),
    h5('Sequence and structure'),
    p('GHRP-6 is a C-terminally amidated hexapeptide, His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. Two of its residues are D-amino acids, D-Trp and D-Phe, which is a feature of the whole GHRP family. Its formula is C46H56N12O6 and its molecular weight is 872.45 g/mol as the free peptide.'),

    h4('How GHRP-6 Is Studied in Research'),
    p('Published pharmacology describes GHRP-6 as a GHS-R1a agonist. GHS-R1a is the same receptor that binds endogenous ghrelin, and it is expressed on pituitary somatotrophs and on a subset of hypothalamic arcuate-nucleus neurons. Receptor activation engages Gq and phospholipase-C signaling with downstream calcium mobilization, a route distinct from the cAMP-driven signaling used by GHRH-receptor agonists.'),
    p('Laboratory model work has also reported CD36 as a secondary binding site for GHRP-6, studied in a different experimental context from its pituitary receptor activity.'),

    h4('Why Researchers Study GHRP-6'),
    ul([
      'GHS-R1a receptor pharmacology: as one of the earliest characterized GHS-R1a agonists, GHRP-6 is used as a reference ligand in receptor-binding and signaling studies.',
      'Ghrelin-signaling research: because GHS-R1a is also the ghrelin receptor, GHRP-6 is used to probe ghrelin-pathway biology independently of endogenous ghrelin.',
      'Comparative secretagogue pharmacology: GHRP-6 is compared with ghrelin, GHRH and other GHRPs to map shared and divergent receptor pathways.',
      'Secondary target research: laboratory models have examined CD36 as an additional binding site separate from GHS-R1a.',
    ]),

    h4('GHRP-6 vs. GHRP-2'),
    p('GHRP-2 and GHRP-6 are the two most-referenced compounds in the growth hormone secretagogue literature. They are related, not interchangeable, and the comparison below is descriptive, not a ranking.'),
    table(
      ['Parameter', 'GHRP-6', 'GHRP-2'],
      [
        ['Sequence', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2', 'D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2'],
        ['Molecular weight', '872.45 g/mol (free peptide)', 'About 818 g/mol (free peptide)'],
        ['Generation', 'First-generation GHRP', 'Second-generation GHRP'],
        ['Receptor', 'GHS-R1a; CD36 reported as a secondary target', 'GHS-R1a'],
        ['Structural difference', 'His and D-Trp at positions 1 and 2', 'D-Ala and D-2-Nal at positions 1 and 2'],
      ],
    ),
    p('Study systems and assay methods differ across the published papers, so figures from one study are not directly interchangeable with another.'),

    h4('GHRP-6 vs. GHRH-Class Compounds'),
    p('CJC-1295, sermorelin and tesamorelin act on the GHRH receptor, a separate receptor system on the same pituitary somatotroph cells. GHS-R1a agonists such as GHRP-6 are reported to engage Gq, phospholipase-C and calcium signaling, while GHRH-receptor agonists are reported to engage Gs, adenylate-cyclase and cAMP signaling. This describes receptor-level relationships only. Veracue does not provide combination protocols.'),

    h4('Research Questions, Answered'),
    qa({
      h: 'Are GHRP-2 and GHRP-6 the same compound?',
      problem: 'The names look alike and both act at GHS-R1a, so they are often mixed up.',
      answer: 'No. They are structurally distinct hexapeptides that share a receptor. GHRP-6 and GHRP-2 differ at the first two positions of the sequence, and they have different molecular weights.',
      takeaway: 'A shared receptor does not make two peptides the same material.',
    }),
    qa({
      h: 'What does GHRP-6 actually bind to?',
      problem: 'A single named target can hide a more complicated binding picture.',
      answer: 'Its primary documented target is GHS-R1a, the receptor that endogenous ghrelin activates. CD36 has also been reported as an additional binding site in laboratory models, studied in a different experimental context.',
      takeaway: 'Keep the primary receptor and the secondary site in separate boxes.',
    }),
    qa({
      h: 'Is GHRP-6 the same thing as ghrelin?',
      problem: 'Both activate the same receptor, so the terms sometimes get swapped.',
      answer: 'No. Ghrelin is the endogenous 28-amino-acid hormone that GHS-R1a naturally responds to, while GHRP-6 is a synthetic hexapeptide that activates the same receptor. The two are structurally distinct molecules.',
      takeaway: 'Same receptor, different molecules.',
    }),
    qa({
      h: 'How is GHRP-6 different from GHRH-class compounds like CJC-1295 or sermorelin?',
      problem: 'Both groups are described as growth hormone secretagogues, which blurs the line between them.',
      answer: 'GHRP-6 acts on GHS-R1a, a receptor pharmacologically separate from the GHRH receptor used by CJC-1295, sermorelin and tesamorelin. The two receptors signal through different intracellular routes.',
      takeaway: 'Different receptor, different signaling pathway.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a GHRP-6 Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Product name / identifier', 'What material the report refers to'],
        ['Lot number', 'Links the report to a specific batch'],
        ['HPLC purity', 'Reverse-phase chromatography data showing chemical purity and any truncated or related sequences'],
        ['Mass spectrometry result', 'Whether the measured molecular mass matches the expected sequence'],
        ['Net peptide content and salt form', 'How much of the vial content is peptide, and which counter-ion is present'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
      ],
    ),
    p('HPLC alone does not prove identity, and mass spectrometry alone does not prove purity. A COA also does not establish sterility, endotoxin levels or biological activity in a particular assay, since activity is confirmed in the researcher’s own experimental work. If a lot-specific certificate is available, use it as the primary source for that lot’s reported results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('The calculated molecular weight of GHRP-6 (872.45 g/mol for the free peptide, from formula C46H56N12O6) is not the same as an observed LC-MS m/z value, because instruments typically report ions with one or more charges and adducts can shift peaks. Salt form matters too. Acetate and TFA forms report a higher nominal weight because the counter-ion mass is included, and net peptide content is different from total vial mass. Confirm the charge state and processing method behind any mass figure, and check whether it refers to the free peptide or a salt.'),

    h4('Verification Questions, Answered'),
    qa({
      h: 'How do I confirm that the material is actually GHRP-6?',
      problem: 'A name on a label tells you what a material is called, not what it is.',
      answer: 'Identity comes from analytical data compared with a defined reference. For GHRP-6, the reference is the hexapeptide sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 and its formula, C46H56N12O6. Mass spectrometry can support that match, whereas a clean chromatography peak only shows the sample is uniform.',
      takeaway: 'Ask which reference and which method a report used.',
    }),
    qa({
      h: 'What should I check on a GHRP-6 COA?',
      problem: 'A certificate is only useful if you know what each line can and cannot show.',
      answer: 'Look for a product identifier, lot number, HPLC purity with its method, a mass spectrometry identity result, net peptide content and salt form. Then confirm the lot number matches the vial in hand, because a generic or catalog-wide document does not describe a specific lot.',
      takeaway: 'Read a COA for method, lot and identity basis, not just the percentage.',
    }),
    qa({
      h: 'What can a product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'Identity, purity, salt form and physical form belong to the lot record, and a report for one lot does not describe another. The product page provides molecular and research context, while lot documentation provides the analytical results for that particular material. The certificate page explains how to request it.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for GHRP-6?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GHRP-6 is supplied for laboratory research use only and is not intended for human or veterinary use, ingestion, injection or any form of administration. It has not been evaluated by the FDA and is not intended to diagnose, treat, cure or prevent any disease. This page does not provide dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHRP-6?',
    answer: 'GHRP-6 is a synthetic hexapeptide that activates GHS-R1a, the ghrelin receptor. It has the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2, and Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is GHRP-6 a peptide?',
    answer: 'Yes. It is a six-amino-acid, C-terminally amidated peptide with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2.',
  },
  {
    question: 'What receptor does GHRP-6 act on?',
    answer: 'Primarily GHS-R1a, the ghrelin receptor. Laboratory model research has also reported CD36 as a secondary binding site.',
  },
  {
    question: 'What is the formula and molecular weight of GHRP-6?',
    answer: 'The formula is C46H56N12O6 and the molecular weight is 872.45 g/mol for the free peptide. Acetate and TFA salt forms report a higher nominal weight because the counter-ion is included.',
  },
  {
    question: 'What is the CAS number for GHRP-6?',
    answer: 'The free peptide is listed under CAS 87616-84-0. Supplier chemical databases list CAS 145177-42-0 for the acetate salt.',
  },
  {
    question: 'What is the difference between GHRP-6 and GHRP-2?',
    answer: 'Both bind GHS-R1a, but they differ in sequence at positions 1 and 2 and in molecular weight. GHRP-6 is the first-generation compound and GHRP-2 the second-generation one.',
  },
  {
    question: 'How does GHRP-6 differ from CJC-1295?',
    answer: 'GHRP-6 acts on GHS-R1a, while CJC-1295 acts on the separate GHRH receptor. The two receptors signal through different intracellular pathways.',
  },
  {
    question: 'Is GHRP-6 the same as ghrelin?',
    answer: 'No. Ghrelin is the endogenous hormone, while GHRP-6 is a synthetic peptide that activates the same receptor but is a structurally distinct molecule.',
  },
  {
    question: 'What should a GHRP-6 COA show?',
    answer: 'A lot-specific COA may include a lot number, HPLC purity, a mass spectrometry identity result, net peptide content, salt form, test date and laboratory. Match the lot number to the exact vial you received.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHRP-6?',
    answer: 'No. GHRP-6 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHRP-6',
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
