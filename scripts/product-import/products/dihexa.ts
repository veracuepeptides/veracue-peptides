import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Dihexa (PNB-0408). Research-use-only copy: molecular identity, HGF/c-Met pathway context at assay level,
// analytical documentation. Facts come from docs/product-contents-1/dihexa-product-page.json;
// disease-model framing, study citations and regulatory wording are intentionally left out.

const NAME = 'Dihexa'
const SLUG = 'dihexa'

const SKU_CODE = 'DIHEXA'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Dihexa_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Dihexa Research Peptide (PNB-0408)'
const SEO_DESCRIPTION =
  "Dihexa (PNB-0408) is an angiotensin IV-derived peptide, C27H44N4O5, CAS 1401708-83-5. See what its COA should show. A 10 mg vial for research use only."
const DESCRIPTION =
  "Dihexa, also known as PNB-0408, is a small synthetic oligopeptide derived from angiotensin IV. Its structure is N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group, giving the formula C27H44N4O5, a mass near 504.7 g/mol and CAS 1401708-83-5. In the lab it is studied for how it interacts with hepatocyte growth factor (HGF) and the c-Met receptor. A single 10 mg vial is offered for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is Dihexa?'),
    p('Dihexa is a synthetic research peptide derived from angiotensin IV and catalogued under the developmental code PNB-0408. It has the molecular formula C27H44N4O5, a molecular weight of about 504.7 g/mol and the CAS number 1401708-83-5. In the lab it is studied for its reported binding to hepatocyte growth factor (HGF) and its effect on the HGF receptor, c-Met.'),
    p('Angiotensin IV is a four-residue fragment of the renin-angiotensin system. Dihexa is a structurally modified analog of it, not the same molecule. Veracue supplies Dihexa strictly for laboratory use.'),
    h4('Dihexa at a Glance'),
    kvTable([
      ['Product name', 'Dihexa'],
      ['Compound class', 'Angiotensin IV-derived oligopeptide'],
      ['Alternative names', 'PNB-0408; N-hexanoyl-Tyr-Ile-(6)-aminohexanamide'],
      ['Structure', 'N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group'],
      ['Research focus', 'HGF/c-Met pathway research'],
      ['Molecular formula', 'C27H44N4O5'],
      ['Molecular weight', 'About 504.7 g/mol (sources report 504.66 to 504.672)'],
      ['CAS Registry Number', '1401708-83-5'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values describe the Dihexa molecule and come from public chemical literature. They are not lot-specific results.</em></p>`,
    p('Physical form, purity, storage conditions and batch details are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What Dihexa Is Not'),
    ul([
      'Not the same molecule as angiotensin IV, which is a shorter parent peptide.',
      'Not a drug, supplement or consumer product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Which names refer to Dihexa?'),
    p('Dihexa appears under several names across suppliers and papers: Dihexa, PNB-0408, N-hexanoyl-Tyr-Ile-(6)-aminohexanamide and the IUPAC-style name N-(1-oxohexyl)-L-tyrosyl-N-(6-amino-6-oxohexyl)-L-isoleucinamide. Treat them as one research entity. The CAS number 1401708-83-5 stays constant whichever name a source uses, so it is the best anchor when comparing listings or literature.'),
    h5('How is the molecule built?'),
    p('The backbone is a hexanoyl-modified tyrosine-isoleucine unit linked to a 6-aminohexanoic amide group. That combination distinguishes it from the shorter angiotensin IV peptide it was derived from.'),

    h4('Mechanism and Pathway Context'),
    h5('What does HGF/c-Met research look at?'),
    p('HGF and its receptor c-Met form a tyrosine kinase signaling pathway that is studied across many fields, including tissue biology and neurobiology. In the Dihexa literature, the reported mechanism is binding to HGF, which in turn potentiates HGF activity at c-Met. One cited binding value is a dissociation constant (Kd) near 65 picomolar.'),
    h5('Where does angiotensin IV fit in?'),
    p('Angiotensin IV has a long research history tied to a binding site once called the AT4 receptor, later linked by some researchers to insulin-regulated aminopeptidase (IRAP). A separate line of work proposed that several effects reported for angiotensin IV-derived peptides depend on the HGF/c-Met system instead. Dihexa was developed within that second line, as a stabilized analog for probing the pathway more directly.'),
    table(
      ['Research area', 'What it examines'],
      [
        ['Molecular', 'How the hexanoyl and aminohexanoic amide modifications affect stability and binding compared with the parent sequence'],
        ['Receptor / pathway', 'HGF binding and c-Met activation, with Dihexa used as a tool compound'],
        ['Cellular', 'Measures such as dendritic spine density in primary hippocampal neuron cultures'],
        ['Synaptic', 'Synaptogenesis, the formation of new synaptic connections in culture'],
        ['Analytical', 'Confirming that a sample matches CAS 1401708-83-5 and C27H44N4O5'],
      ],
    ),

    h4('Research Questions, Answered'),
    h5('Why does the compound name matter when reading papers?'),
    p('Angiotensin IV research spans decades and several receptor hypotheses. Findings about angiotensin IV itself should not be blended with findings about Dihexa. Check the methods section for the exact compound, by name or CAS number, before applying a result.'),
    h5('How should mechanistic findings be read?'),
    p('A finding that Dihexa potentiates HGF activity at c-Met explains how a compound might act in a given assay. It does not mean the same outcome appears in every system. Check the assay conditions, meaning the cell type, concentration range and readout, before assuming a result carries over to a different model.'),
    h5('Why trace a claim to its original paper?'),
    p('Much of the foundational Dihexa literature dates to the early-to-mid 2010s. Secondary summaries sometimes restate those findings as more settled than they are, so tracing a claim back to its source and noting the publication date keeps a literature review honest.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Dihexa Certificate of Analysis'),
    p('A purity percentage alone does not confirm what is in a vial. A useful certificate lets you confirm identity against CAS 1401708-83-5 and the formula C27H44N4O5, states the purity method, and ties the report to a specific lot.'),
    table(
      ['COA item', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to a specific production lot', 'Anything about quality unless it matches the vial label'],
        ['HPLC purity (%)', 'Share of detected signal in the main peak under stated conditions', 'Identity, net peptide content or biological activity'],
        ['Mass spectrometry / LC-MS', 'Whether an observed mass is consistent with C27H44N4O5 (about 504.7)', 'Purity, or the amount of material present'],
        ['Net peptide content', 'How much of the vial mass is peptide rather than salts or water', 'Chromatographic purity'],
        ['Stated form and identifier', 'That the CAS number and name match the material tested', 'Identity by itself, which needs analytical data'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    p('Certificates vary between laboratories, so treat this as what a COA may include, not a fixed checklist. If a lot-specific certificate is available, use it as the primary source for that lot. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Quick COA Check'),
    ul([
      'The lot number on the COA matches the vial label.',
      'The purity method is named, not just a percentage.',
      'The identity result states expected versus observed mass for C27H44N4O5.',
      'CAS 1401708-83-5 and the PNB-0408 designation are referenced consistently.',
      'The testing laboratory and date are shown.',
      'Any additional panels are reported with results, not just listed as tested.',
    ]),

    h4('Analytical Note'),
    p('Confirm identity with an appropriate method such as mass spectrometry before relying on a sample in a sensitive assay, and record the purity method and result alongside any data generated from that lot. Because Dihexa is sold under more than one name, lot-level records of supplier, batch identifier and receipt date also make results easier to reproduce later. The material in any single lot should not be assumed identical to the material used in a published study, since peptide source, synthesis method and purity can differ.'),

    h4('Verification Questions, Answered'),
    h5('How do I confirm the material is actually Dihexa?'),
    p('Identity comes from analytical data compared with a defined reference. Mass spectrometry can show that an intact mass is consistent with C27H44N4O5, while a clean chromatography peak only shows that a sample is uniform. A name on a label is not an analytical identity.'),
    h5('What can a product page establish, and what needs lot documentation?'),
    p('Form, purity, storage and batch details belong to the lot record, and a report for one lot does not describe another. The product page provides molecular and research context, and the lot documentation provides the analytical results for the material you receive. The certificate page explains how to request it.', { links: CERT }),

    h4('Need lot documentation for Dihexa?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Dihexa is supplied for laboratory research use only. It is not a drug, supplement or consumer product, and it is not intended for human or veterinary use. It has not been evaluated by the FDA. The scientific information on this page describes published laboratory research and is not medical advice. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Dihexa?',
    answer: 'Dihexa is a synthetic oligopeptide derived from angiotensin IV, also catalogued under the developmental code PNB-0408. It is studied in the lab for its interaction with hepatocyte growth factor (HGF) and the c-Met receptor.',
  },
  {
    question: 'What is Dihexa used for in research?',
    answer: 'Researchers use it to study HGF/c-Met receptor signaling, including its proposed role in synaptogenesis and dendritic spine formation in cultured neurons.',
  },
  {
    question: 'Is Dihexa the same as PNB-0408?',
    answer: 'Yes. PNB-0408 is the developmental code name for the same compound listed elsewhere as Dihexa, identified by CAS 1401708-83-5.',
  },
  {
    question: 'What is the relationship between Dihexa and angiotensin IV?',
    answer: 'Dihexa is a structurally modified analog derived from angiotensin IV, a fragment of the renin-angiotensin system. It is not identical to angiotensin IV and was engineered for greater stability.',
  },
  {
    question: 'What is HGF/c-Met research?',
    answer: 'It is the study of hepatocyte growth factor and its receptor, c-Met, a signaling pathway examined in tissue biology, cell biology and neurobiology. In the Dihexa literature, this pathway is the proposed mechanism behind reported synaptogenic effects in culture.',
  },
  {
    question: 'What are the molecular formula and CAS number of Dihexa?',
    answer: 'The formula is C27H44N4O5, with a molecular weight of about 504.7 g/mol, and the CAS number is 1401708-83-5. These describe the molecule itself, not a specific lot.',
  },
  {
    question: 'What kind of evidence exists for Dihexa research?',
    answer: 'The available findings come from in vitro assays, cultured cells or animal models. Those results describe the experimental systems used and nothing beyond them.',
  },
  {
    question: 'What should a Dihexa COA show?',
    answer: 'A lot-specific COA may include a lot number, test date, method, identity result, purity value and laboratory. The identity result should state expected versus observed mass for C27H44N4O5, and the purity value should name its method.',
  },
  {
    question: 'How should mass-spectrometry results be interpreted?',
    answer: 'Compare the observed mass with the calculated value of about 504.7 for C27H44N4O5, and check the ion type and method used. Mass data speak to identity, not purity.',
  },
  {
    question: 'How do I get lot documentation for Dihexa?',
    answer: 'Use the contact page to ask about documentation for a specific lot, or browse the certificate page. Purity, form, storage and batch details are reported per lot.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Dihexa?',
    answer: 'No. Dihexa is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Dihexa',
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
