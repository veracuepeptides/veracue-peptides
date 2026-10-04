import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// Ipamorelin. Research-use-only copy: molecular identity, receptor context at assay level,
// analytical documentation. Facts come from docs/product-contents-1/veracue-ipamorelin-final-page (1).json;
// human/animal outcome studies, lot-specific figures, drug-status framing and usage content are left out.

const NAME = 'Ipamorelin'
const SLUG = 'ipamorelin'

const SKU_CODE = 'IPA'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_Ipamorelin_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_Ipamorelin_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Ipamorelin Research Peptide (GHS-R1a)'
const SEO_DESCRIPTION =
  "Ipamorelin is a five-residue peptide with non-standard amino acids (CAS 170851-70-4). Check its identity on the lot COA. 5 and 10 mg, research use only."
const DESCRIPTION =
  "Ipamorelin is a five-residue synthetic peptide, Aib-His-D-2-Nal-D-Phe-Lys-NH2, that includes non-standard residues such as aminoisobutyric acid (Aib) and D-2-naphthylalanine. It has the formula C38H49N9O5, an average mass of about 711.85 g/mol and CAS 170851-70-4, and it is described as a selective agonist of the ghrelin receptor GHS-R1a in receptor assays. Vials come in 5 mg and 10 mg, for laboratory research only, not for human or veterinary use."
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
    h4('What Is Ipamorelin?'),
    p('Ipamorelin is a synthetic pentapeptide with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2, the molecular formula C38H49N9O5, a molecular weight of about 711.85 g/mol and the CAS number 170851-70-4. In the scientific literature it is classified as a selective agonist of the ghrelin receptor (GHS-R1a) and as a growth hormone secretagogue. Veracue supplies it strictly for laboratory research.'),
    p('These are properties of the molecule itself. They are documented consistently across chemical references and can be checked by any laboratory with standard analytical methods, whichever supplier the material comes from. Purity, testing history and documentation belong to a specific research lot, and they are established separately through analytical work.'),
    h4('Ipamorelin at a Glance'),
    kvTable([
      ['Product name', 'Ipamorelin'],
      ['Molecular class', 'Synthetic pentapeptide'],
      ['Sequence', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2'],
      ['Receptor target', 'GHS-R1a (ghrelin receptor), agonist activity in receptor assays'],
      ['Molecular formula', 'C38H49N9O5'],
      ['Molecular weight (average)', 'About 711.85 g/mol'],
      ['CAS Registry Number', '170851-70-4'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Formula from the PubChem record. Molecular weight is calculated from that formula. CAS number as listed in chemical databases.</em></p>`,
    p('Physical form, salt or counterion, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What Ipamorelin Is Not'),
    ul([
      'Not a blend of several peptides.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('Ipamorelin is the name used on the vial label. Its sequence, Aib-His-D-2-Nal-D-Phe-Lys-NH2, includes non-standard residues: Aib (aminoisobutyric acid) and D-2-Nal (D-2-naphthylalanine), plus a D-phenylalanine and a C-terminal amide. The formula, molecular weight and CAS number in the table above are useful reference points when checking a certificate of analysis.'),
    h5('A small, five-residue peptide'),
    p('Ipamorelin is a pentapeptide, so its molecular weight is far lower than that of larger peptides. That keeps mass-spectrometry checks fairly direct, since the expected mass is easy to compare with an observed value.'),

    h4('Receptor Context'),
    table(
      ['Item', 'Description'],
      [
        ['Receptor', 'Growth hormone secretagogue receptor 1a (GHS-R1a), also called the ghrelin receptor'],
        ['Activity described in the literature', 'Selective agonist at GHS-R1a'],
        ['Classification', 'Growth hormone secretagogue'],
        ['Why selectivity is discussed', 'Studied for its receptor selectivity compared with earlier growth-hormone-releasing peptides'],
      ],
    ),

    h4('Research Context'),
    h5('How Ipamorelin appears in research'),
    p('Research on Ipamorelin spans a few connected levels. Receptor-binding and mechanistic studies have characterized its selectivity at GHS-R1a relative to older growth-hormone-releasing peptides. Laboratory and animal-model work has looked at it as part of broader endocrine and receptor-pharmacology research, not as standalone product testing.'),
    p('A finding from one experimental system describes that system only. It does not describe what a different sample of the same compound would do under other conditions, and it says nothing about the analytical status of a particular vial. So it helps to keep two things apart: what has been studied about Ipamorelin as a molecule, and what has been verified about a specific lot.'),

    h4('Research Questions, Answered'),
    qa({
      h: 'Why do Ipamorelin and CJC-1295 come up together?',
      problem: 'The two names are often searched side by side, which can suggest they are the same kind of compound.',
      answer: 'Both are studied in connection with the growth hormone axis, but through different receptor mechanisms: Ipamorelin as a ghrelin-receptor (GHS-R1a) agonist, and CJC-1295 as a growth-hormone-releasing-hormone (GHRH) receptor analog. Each has its own identity and its own documentation, and reviewing one is not a substitute for reviewing the other.',
      takeaway: 'Treat each compound as its own material with its own certificate.',
    }),
    qa({
      h: 'What does receptor selectivity mean here?',
      problem: 'Selectivity is a common word in Ipamorelin literature, and it helps to know what it refers to.',
      answer: 'It describes how strongly a compound acts at its intended receptor compared with related ones. For Ipamorelin, GHS-R1a is the receptor of interest, and comparisons are usually made against earlier growth-hormone-releasing peptides in assay systems.',
      takeaway: 'Selectivity is an assay-level property of the molecule, not a claim about any vial.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an Ipamorelin Certificate of Analysis'),
    p('A certificate of analysis documents one specific manufacturing lot, not the compound in general. Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Product name / identifier', 'What material the report refers to'],
        ['Lot number', 'Links the report to a specific batch; check it against the number on the vial'],
        ['Identity method', 'How identity was assessed'],
        ['MS / mass result', 'Supports molecular identity'],
        ['HPLC or other purity method', 'Reports analytical purity under the stated method'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
        ['Specification / acceptance criterion', 'Provides context for the reported result'],
      ],
    ),
    p('If a lot-specific certificate is available, use it as the primary source for that lot’s reported analytical results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('What Do HPLC and Mass Spectrometry Each Show?'),
    p('Purity and identity are measured separately, and a complete analytical picture needs both. Reverse-phase HPLC reports chromatographic purity: the share of a sample that resolves as a single, well-defined peak, separate from impurities and synthesis by-products, usually given as a percentage of peak area. It does not, by itself, show that the peak is Ipamorelin and not a structurally similar compound.'),
    p('Mass spectrometry covers that second question. It checks whether the measured molecular mass is consistent with the expected mass of about 711.85 g/mol, within a stated tolerance. A purity figure alone does not establish identity, and a mass result alone does not establish purity.'),
    p('Veracue’s analytical standards are described on the about page.', { links: [{ phrase: 'analytical standards', href: '/about-us' }] }),

    h4('Verification Questions, Answered'),
    qa({
      h: 'How do I confirm that the material is actually Ipamorelin?',
      problem: 'A name on a label tells you what a material is called, not what it is.',
      answer: 'Identity comes from analytical data compared with a defined reference. For Ipamorelin the reference is the published structure: sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2, formula C38H49N9O5. Mass spectrometry can show an intact mass consistent with that reference, while a clean HPLC peak shows uniformity and not identity.',
      takeaway: 'Ask which reference and which method a report used.',
    }),
    qa({
      h: 'What should I look for on an Ipamorelin COA?',
      problem: 'A certificate is only useful if you know what each line can and cannot show.',
      answer: 'Depending on the testing program, a lot-specific COA may include a product identifier, lot number, test date, analytical method, identity result, purity value, acceptance criterion and testing laboratory. The purity value should name its method, and the identity result should say what it was matched against.',
      takeaway: 'Read a COA for method, lot and identity basis, not just the percentage.',
    }),
    qa({
      h: 'Why does lot-specific testing matter?',
      problem: 'A stated purity percentage can look reassuring even when nothing ties it to the material in hand.',
      answer: 'A percentage without a linked laboratory report is a claim, not evidence. The underlying HPLC data, method and date are what support it, and the certificate has to match the lot number printed on the vial. A report for a different lot does not describe the material you received, even when the numbers look good.',
      takeaway: 'Match the lot number on the vial to the certificate before relying on it.',
    }),
    qa({
      h: 'What can a product page establish, and what needs lot documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'Sequence, formula, weight and receptor context describe the molecule. Purity, identity results, physical form and storage details belong to the lot record. Confirm which analytical methods stand behind a certificate, and do not assume a mass-spectrometry result exists just because HPLC data is published. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for Ipamorelin?'),
    p('Ask the Veracue team about available documentation for a specific lot, including which analytical methods were used, or review the certificate library. Institutional purchasing often needs a full documentation set, so it is worth asking early.'),
    `<ul><li><a href="/contact-us">Request documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Ipamorelin is supplied for laboratory research use only and is not intended for human or veterinary use. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer, the Terms and Conditions and the Research Use Only FAQ for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        { phrase: 'Research Use Only FAQ', href: '/faq' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Ipamorelin?',
    answer: 'Ipamorelin is a synthetic pentapeptide studied as a selective ghrelin receptor (GHS-R1a) agonist and growth hormone secretagogue, with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the molecular identity of Ipamorelin?',
    answer: 'The molecular formula is C38H49N9O5, the molecular weight is about 711.85 g/mol and the CAS number is 170851-70-4.',
  },
  {
    question: 'Which receptor does Ipamorelin act on?',
    answer: 'The ghrelin receptor, GHS-R1a. In the literature it is described as a selective agonist at that receptor, compared with earlier growth-hormone-releasing peptides.',
  },
  {
    question: 'Does Veracue provide a certificate of analysis for Ipamorelin?',
    answer: 'Lot documentation is reported for each lot and can be requested through the contact page. Certificates are also listed in the certificate library.',
  },
  {
    question: 'What does HPLC testing measure?',
    answer: 'Chromatographic purity, meaning the share of a sample that resolves as a single clean peak compared with impurities.',
  },
  {
    question: 'What does mass spectrometry measure?',
    answer: 'It checks whether a sample’s measured molecular mass is consistent with the expected mass of Ipamorelin, which is a separate question from purity.',
  },
  {
    question: 'Why does lot-specific testing matter?',
    answer: 'A certificate tied to a different lot than the one received does not confirm the material in hand. Matching the lot number on the vial to the certificate is what makes a COA meaningful.',
  },
  {
    question: 'What is the difference between Ipamorelin and CJC-1295?',
    answer: 'They act through different receptor mechanisms, Ipamorelin at the ghrelin receptor and CJC-1295 at the GHRH receptor, and each is documented separately with its own lot numbers.',
  },
  {
    question: 'Can published Ipamorelin research be treated as evidence for a specific batch?',
    answer: 'No. Published findings describe results under specific experimental conditions and do not establish the identity or purity of any individual vial. That takes lot-specific testing.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Ipamorelin?',
    answer: 'No. Ipamorelin is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Ipamorelin',
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
