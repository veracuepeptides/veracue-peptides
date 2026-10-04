import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Cagrilintide (AM833). Research-use-only copy from docs/product-contents-1/veracue-cagrilintide-product-page-FINAL.json.
// Molecular identity, receptor context at assay level and analytical guidance only. Trial, combination-product,
// approval, feeding and other-drug content is intentionally left out.

const NAME = 'Cagrilintide'
const SLUG = 'cagrilintide'
const SKU_CODE = 'CAGRI'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Cagrilintide_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate archive', href: '/certificates' }]

const SEO_TITLE = 'Cagrilintide Research Peptide (AM833)'
const SEO_DESCRIPTION =
  "Cagrilintide (AM833) is a 37-residue lipidated peptide (CAS 1415456-99-3). Read the identity data and COA checks. 10 mg vial, research use only."
const DESCRIPTION =
  'Cagrilintide is a synthetic, lipidated analogue of the amylin peptide, coded AM833. Its 37-residue backbone (KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP) carries an intramolecular disulfide bridge and a C20 fatty diacid on the lysine at position 1. Reference values are formula C194H312N54O59S2, about 4,409 g/mol as the free acid, and CAS 1415456-99-3. It is one peptide, so it should not be mixed up with native amylin. Offered as a 10 mg vial, strictly for laboratory research.'

function productDetails(): string {
  return [
    h4('What Is Cagrilintide?'),
    p('Cagrilintide is a synthetic, long-acting analogue of amylin, a pancreatic hormone. It is a 37-amino-acid peptide, carries the development code AM833, and is studied in laboratory systems as a nonselective agonist of amylin receptors and the calcitonin receptor. Veracue supplies it strictly as a research material.'),
    h4('Cagrilintide at a Glance'),
    kvTable([
      ['Product name', 'Cagrilintide'],
      ['Development code', 'AM833'],
      ['Molecular class', 'Acylated (lipidated) amylin analogue'],
      ['Backbone', '37-amino-acid linear peptide with an intramolecular disulfide bridge'],
      ['Lipid attachment', 'C20 fatty diacid on the lysine at position 1, through a hydrophilic linker'],
      ['Sequence', 'KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP'],
      ['Molecular formula', 'C194H312N54O59S2 (free acid)'],
      ['Molecular weight', 'About 4,409 g/mol (free acid)'],
      ['CAS Registry Number', '1415456-99-3'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Reference values describe the molecule as recorded in public chemical registries. They are for comparison against a certificate of analysis and are not measurements taken on a specific lot. Physical form, quantity per vial beyond the labelled 10 mg, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Cagrilintide Is Not'),
    ul([
      'Not native amylin. It shares the backbone but is a deliberately modified molecule.',
      'Not a blend or a product combining several peptides.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('How is Cagrilintide built?'),
    p('It is a 37-amino-acid linear peptide based on the native amylin backbone. An intramolecular disulfide bridge, a feature shared across the calcitonin peptide family, sits within the chain. A C20 fatty diacid is attached at the lysine in position 1 through a hydrophilic linker.'),
    h5('What does the lipid change?'),
    p('The C20 fatty diacid binds reversibly to albumin, and the literature attributes the molecule’s extended persistence in test systems to that binding. This is the same acylation idea used in other long-acting peptides, applied to a different peptide family. It describes how the molecule was designed and is not a handling or preparation instruction.'),
    h5('Why is it not the same as amylin?'),
    p('Amylin is a naturally occurring 37-amino-acid pancreatic peptide. Cagrilintide shares that backbone, but the fatty-diacid conjugation at position 1 and its albumin binding change its behavior in a test system substantially. Research on native amylin explains why Cagrilintide is studied. It is not research on Cagrilintide.'),

    h4('Receptor Context'),
    p('Receptor pharmacology work characterizes Cagrilintide as an agonist across calcitonin-family G protein-coupled receptors, with reported binding at human, mouse and rat amylin receptors. It is commonly described as a dual amylin and calcitonin receptor agonist.'),
    table(
      ['Item', 'Detail'],
      [
        ['Receptor systems', 'Amylin receptors (AMY1 to AMY3) and the calcitonin receptor (CTR)'],
        ['Activity type', 'Nonselective agonist in receptor assays'],
        ['Receptor family', 'Calcitonin-family G protein-coupled receptors'],
        ['Species reported in binding work', 'Human, mouse and rat amylin receptors'],
      ],
    ),

    h4('Research Questions, Answered'),
    h5('Where does Cagrilintide appear in the literature?'),
    p('It appears in amylin and calcitonin receptor pharmacology, peptide lipidation and half-life engineering, and the analytical characterization of synthetic peptide analogues.'),
    h5('How should different kinds of evidence be read?'),
    p('Receptor pharmacology, structural characterization and laboratory-model work each answer a different question, and a finding from one should not be read across to another. Published studies describe the molecule itself. They do not establish the identity, purity or handling of a specific supplier’s lot.'),
    h5('Does similar receptor biology mean the same mechanism?'),
    p('No. Peptides that use fatty-acid acylation to extend persistence share an engineering strategy, not a mechanism. Cagrilintide acts through amylin and calcitonin receptors, so results from peptides acting on other receptor systems should not be read across to it.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Testing and Certificate Documentation'),
    p('HPLC separates a sample into its component species and reports what proportion of total detected peak area the target compound represents. That is chromatographic purity. It indicates related substances, truncated sequences or counterions, and it does not identify the main peak.'),
    p('Mass spectrometry measures molecular mass against the theoretical mass for the target sequence, within a stated tolerance. This is what establishes identity. For Cagrilintide the comparison point is a theoretical mass near 4,409 g/mol for the free-acid form. Material supplied as a salt or acetate will differ, which is worth confirming before flagging a mismatch.'),
    p('A certificate of analysis should carry the product name, lot number, test date, testing laboratory, the specification, and the measured result for each test, with enough method detail to interpret them. A specification is the threshold a batch must meet, while the result is what it measured. A certificate showing only specifications says what was required, not what was found.'),

    h4('How to Read a Cagrilintide COA'),
    p('Read it in this order.'),
    ul([
      'Confirm the compound name, and that any CAS number or formula matches Cagrilintide: 1415456-99-3 and C194H312N54O59S2 for the free acid.',
      'Find the lot number and check it against the vial.',
      'Read the purity result, not the specification, and note the method beside it.',
      'Find the identity result and confirm the measured mass falls within the stated tolerance of the theoretical mass for the form supplied.',
      'Check the testing laboratory and the test date, and confirm the date is consistent with the production run.',
    ]),
    p('If any of those five is missing, the document is incomplete, and an incomplete certificate is a fair reason to ask a supplier for more.'),

    h4('Verification Questions, Answered'),
    h5('Is a name on a label enough to confirm identity?'),
    p('No. A label states what a supplier intends to sell, not what is in the vial. Identity is established by measuring molecular mass against the theoretical mass, cross-referenced to CAS 1415456-99-3 and formula C194H312N54O59S2. Ask for the identity result, not the label.'),
    h5('Are purity and identity the same question?'),
    p('No. HPLC answers how much of a sample is one species. Mass spectrometry answers which species it is. A sample can return a sharp, high-purity peak and still be the wrong compound, so complete documentation reports both together.'),
    h5('Why does the lot number matter?'),
    p('Purity and identity vary between production runs. A certificate with no batch number, or one reused across listings and vial sizes, documents a sample rather than your sample. The lot code on the vial should match the lot number on the certificate, and it is best checked on receipt.'),
    h5('What makes a purity figure believable?'),
    p('A percentage with no method, wavelength, laboratory attribution or underlying chromatogram cannot be independently assessed. Useful documentation names the method, how purity was calculated, the technique used for mass spectrometry, the laboratory and the date.'),
    h5('Is a database entry always the right comparison?'),
    p('Not always. Registries hold records for salt and related forms as well as the free acid, so confirm which form a database entry or certificate refers to before comparing numbers.'),

    h4('Before You Order Research Material'),
    p('This checklist applies to any supplier.'),
    ul([
      'Exact compound identity, stated unambiguously',
      'CAS number on the listing and on the documentation, matching',
      'Stated quantity per vial and the supplied chemical form',
      'Current lot or batch number',
      'A lot-specific certificate of analysis, not a generic one',
      'HPLC result with the method stated, result and not just specification',
      'Identity testing, with the measured mass and tolerance',
      'Named testing laboratory and a test date consistent with the production run',
      'Certificate-to-vial traceability, checked on receipt',
      'Research Use Only designation on both listing and documentation',
    ]),

    h4('Need lot documentation for Cagrilintide?'),
    p('Purity results, identity results, physical form and storage conditions are reported on the documentation for each lot. Ask the Veracue team for the documentation on a specific lot, or review the certificate archive.', { links: CERT }),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Cagrilintide is supplied for laboratory research use only and is not intended for human or veterinary use, ingestion, injection, diagnosis or treatment. It has not been evaluated by the FDA. This page provides no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Cagrilintide?',
    answer: 'Cagrilintide is a synthetic long-acting analogue of amylin, a pancreatic hormone. It acts as a nonselective agonist at amylin receptors and the calcitonin receptor in laboratory assays and carries the development code AM833. Veracue supplies it strictly for research use.',
  },
  {
    question: 'What kind of peptide is Cagrilintide?',
    answer: 'An acylated (lipidated) amylin analogue. It is a 37-amino-acid peptide with an intramolecular disulfide bridge and a C20 fatty diacid on the lysine at position 1, joined through a hydrophilic linker.',
  },
  {
    question: 'How does Cagrilintide differ from native amylin?',
    answer: 'The backbone is shared. The difference is the C20 fatty diacid at position 1, which binds reversibly to albumin and is what the literature credits for the analogue’s extended persistence.',
  },
  {
    question: 'What are the formula, mass and CAS number of Cagrilintide?',
    answer: 'The formula is C194H312N54O59S2 and the molecular weight is about 4,409 g/mol, both for the free-acid form. The CAS number is 1415456-99-3. Salt or acetate forms will differ.',
  },
  {
    question: 'What is the sequence of Cagrilintide?',
    answer: 'The 37-residue sequence is KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP, with a C20 fatty diacid attached at the lysine in position 1.',
  },
  {
    question: 'Which receptors does Cagrilintide act on in research?',
    answer: 'Amylin receptors (AMY1 to AMY3) and the calcitonin receptor. Published work reports binding at human, mouse and rat amylin receptors, and it is commonly described as a dual amylin and calcitonin receptor agonist.',
  },
  {
    question: 'How is Cagrilintide identity verified?',
    answer: 'By mass spectrometry, comparing measured molecular mass against the theoretical mass for the sequence, and cross-referencing the CAS number and formula. Confirm which chemical form the certificate refers to, since a salt or acetate differs from the free acid.',
  },
  {
    question: 'What does HPLC show, and what does mass spectrometry show?',
    answer: 'HPLC shows chromatographic purity, meaning the share of detected peak area belonging to the target compound. Mass spectrometry shows identity by comparing measured and theoretical mass. Complete documentation reports both.',
  },
  {
    question: 'What should a Cagrilintide COA include?',
    answer: 'The product name, lot number, test date, testing laboratory, the specification for each test and the measured result. It should be traceable to the vial you received.',
  },
  {
    question: 'Where can I get lot documentation?',
    answer: 'Purity, identity, form and storage details are reported on each lot’s documentation. Request them through the contact page or check the certificate archive.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'The material is intended solely for laboratory research and scientific investigation, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Cagrilintide?',
    answer: 'No. Cagrilintide is supplied for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Cagrilintide',
  variants: VARIANTS,
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/cagrisema/i, /retatrutide/i, /semaglutide/i, /tirzepatide/i, /novo\s*nordisk/i, /redefine/i, /reimagine/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
