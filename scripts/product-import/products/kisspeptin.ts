import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Kisspeptin (Kisspeptin-10, KP-10). Research-use-only copy: molecular identity, KP-10 vs KP-54 distinction,
// receptor at assay level, analytical documentation. Facts come from
// docs/product-contents-1/veracue-kisspeptin-10-product-page.json; human-evidence, hormone-axis framing,
// regulatory-status, shipping and blocker content is intentionally left out.

const NAME = 'Kisspeptin'
const SLUG = 'kisspeptin'

const SKU_CODE = 'KISS'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Kisspeptin_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Kisspeptin Research Peptide (KP-10)'
const SEO_DESCRIPTION =
  "Kisspeptin-10 is a fragment of kisspeptin-54 (CAS 374675-21-5). Learn how the two differ and what a COA should show. Research use only, 10 mg vial."
const DESCRIPTION =
  "Kisspeptin-10 (KP-10) is the ten-residue C-terminal fragment of kisspeptin-54, with the sequence Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2. The free base is C63H83N17O14 at 1302.45 g/mol, CAS 374675-21-5. In assays it is a reference ligand for the KISS1R (GPR54) receptor, and it is also listed as Metastin (45-54). It differs from the longer kisspeptin-54, so the fragment name matters when comparing suppliers. Sold as a 10 mg vial for laboratory research only."
function productDetails(): string {
  return [
    h4('What Is Kisspeptin-10?'),
    p('Kisspeptin-10 (KP-10) is the ten-residue C-terminal fragment of kisspeptin-54, the peptide product of the human KISS1 gene. Its sequence is Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2, and Veracue supplies it for laboratory research only, as a 10 mg vial.'),
    p('Many kisspeptin listings say only "Kisspeptin", with no fragment, sequence or mass. Here the fragment is Kisspeptin-10, and the identifiers below let you check that against your own records.'),
    h4('Kisspeptin-10 at a Glance'),
    kvTable([
      ['Product name', 'Kisspeptin (Kisspeptin-10, KP-10)'],
      ['Synonyms', 'KP-10, Metastin (45-54), KISS-1 (112-121)'],
      ['Sequence', 'Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2 (YNWNSFGLRF-NH2)'],
      ['Length', '10 amino acids, C-terminal amide'],
      ['Molecular formula', 'C63H83N17O14 (free base)'],
      ['Molecular weight', '1302.45 g/mol (free base)'],
      ['CAS Registry Number', '374675-21-5'],
      ['PubChem CID', '25240297'],
      ['Receptor', 'KISS1R (also called GPR54)'],
      ['Vial size', '10 mg'],
      ['Form', 'Lyophilized powder'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Molecular weight is quoted for the free base. Salt forms carry extra counterion mass, so a COA that reports net peptide content will read lower than the gross vial weight. Salt or counterion form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Kisspeptin-10 Is Not'),
    ul([
      'Not Kisspeptin-54. It is a shorter fragment with a different formula, mass and CAS number.',
      'Not the same thing as the KISS1 gene or the KISS1R receptor.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('How is Kisspeptin-10 related to Kisspeptin-54?'),
    p('KP-10 is a fragment, not a separate molecule. It is residues 45 to 54 of kisspeptin-54, equivalent to residues 112 to 121 of the KISS1 gene product. The amidated C-terminal tail is the minimum structure needed to activate KISS1R.'),
    p('The two forms are different chemical entities with different masses and CAS numbers. A record that says only "kisspeptin" is ambiguous, so match the fragment name and formula rather than the family name alone.'),
    table(
      ['Attribute', 'Kisspeptin-10', 'Kisspeptin-54'],
      [
        ['Residues', '10', '54'],
        ['Synonyms', 'Metastin (45-54), KISS-1 (112-121)', 'Metastin, KISS-1 (68-121)'],
        ['Molecular formula', 'C63H83N17O14', 'C258H401N79O78'],
        ['Molecular weight', '1302.45', '5857.43'],
        ['CAS Registry Number', '374675-21-5', '374683-24-6'],
        ['PubChem CID', '25240297', '71306396'],
      ],
    ),
    h5('Are KISS1, kisspeptin and KISS1R the same thing?'),
    p('No, and mixing them up is a frequent error. KISS1 is the gene that encodes the kisspeptin precursor protein. Kisspeptin is the peptide family produced when that precursor is cleaved, including KP-54, KP-14, KP-13 and KP-10. KISS1R, also called GPR54, is the receptor those peptides bind. A product cannot correctly be called a "KISS1 peptide".'),

    h4('Research Context'),
    h5('How does Kisspeptin-10 act at its receptor?'),
    p('In receptor assays, KP-10 binds KISS1R, a Gq/11-coupled receptor. Activation drives phospholipase C, which generates IP3 and DAG, which in turn raise intracellular calcium and activate protein kinase C. Published Ki values for KP-10 are 1.59 nM at the rat receptor and 2.33 nM at the human receptor, and KP-54 binds the same receptor with comparable affinity.'),
    h5('What do labs use Kisspeptin-10 for?'),
    ul([
      'Receptor pharmacology: binding and activation at KISS1R, including comparisons against KP-54 and truncated analogs.',
      'Signal-transduction assays that follow the Gq/11, calcium and protein kinase C cascade.',
      'Peptide stability work, since a short, unstructured peptide like KP-10 is a useful model for proteolytic degradation studies.',
    ]),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general assay-level context. It cannot establish what is in a particular vial, and a result obtained with one kisspeptin form does not carry over to another. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Kisspeptin-10 Certificate of Analysis'),
    p('A certificate of analysis documents one lot, so read it as a set of linked facts. Certificates vary between laboratories and testing programs, so treat the list below as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match your vial.'],
        ['Product identity', 'The compound name, which should agree with the formula and mass shown.'],
        ['Purity and HPLC method', 'The reported chromatographic purity and the method behind it.'],
        ['Mass spectrometry result', 'Whether the measured mass sits near 1302 Da for KP-10.'],
        ['Molecular form', 'Free base, acetate, trifluoroacetate or another counterion.'],
        ['Molecular weight convention', 'Whether figures are free base or net peptide content.'],
        ['Test date', 'How recent the result is.'],
      ],
    ),
    p('Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('What Each Analytical Method Can and Cannot Show'),
    table(
      ['Method', 'What it establishes', 'What it does not establish'],
      [
        ['RP-HPLC', 'Chromatographic purity as a share of total peak area, plus synthesis and degradation byproducts', 'Molecular identity. A 99% peak says one species dominates, not which one'],
        ['Mass spectrometry', 'Molecular mass, supporting identity. KP-10 near 1302 Da is clearly distinct from KP-54 near 5857 Da', 'Residue order. Peptides with the same composition share a mass'],
        ['MS/MS or peptide mapping', 'Sequence-level confirmation from fragment ion patterns, and detection of truncations or modifications', 'Quantitative purity. It complements HPLC'],
        ['Counterion analysis', 'Salt identity and net peptide content', 'Sequence or purity'],
      ],
    ),
    p('Two checks are worth making on any Kisspeptin-10 certificate. First, confirm the reported mass is near 1302 Da rather than near 5857 Da, which separates KP-10 from KP-54 immediately. Second, look for oxidation, since the tryptophan at position 3 is the residue most likely to pick up 16 Da.'),
    p('A purity figure describes one measurement of one lot. It does not establish sterility or biological activity.'),

    h4('Common Verification Questions'),
    h5('Does a high HPLC result confirm the material is Kisspeptin-10?'),
    p('No. HPLC measures how much of the sample is one dominant species, not which species it is. Mass confirmation does that job, so read the two results together.'),
    h5('Why does the mass on a COA differ from 1302.45?'),
    p('1302.45 is the free base. Synthetic peptides are usually supplied as acetate or trifluoroacetate salts, and the counterion adds mass. Neither is an error, but the certificate should state the convention it uses so figures can be compared.'),

    h4('Need lot documentation for Kisspeptin?'),
    p('Ask the Veracue team about documentation for a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the FAQ</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Kisspeptin is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, dietary supplement, cosmetic or food product, is not intended for human or veterinary use, and has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. Buyers confirm they are qualified researchers or institutions acquiring it for lawful research purposes. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'Which kisspeptin form is this product?',
    answer: 'It is Kisspeptin-10, the ten-residue fragment with the sequence YNWNSFGLRF-NH2 and CAS 374675-21-5. It is not Kisspeptin-54, which has a different formula, mass and CAS number.',
  },
  {
    question: 'What is the difference between Kisspeptin-10 and Kisspeptin-54?',
    answer: 'KP-10 is the C-terminal fragment of KP-54, residues 45 to 54. Both activate the same receptor with comparable affinity, but their masses are 1302.45 and 5857.43, so mass spectrometry tells them apart at once.',
  },
  {
    question: 'What is the Kisspeptin-10 sequence?',
    answer: 'The sequence is Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2, written YNWNSFGLRF-NH2. The C-terminal amide is part of the structure.',
  },
  {
    question: 'What are the formula, weight and CAS number of Kisspeptin-10?',
    answer: 'The free base has the formula C63H83N17O14 and a molecular weight of 1302.45 g/mol. The CAS number is 374675-21-5 and the PubChem CID is 25240297.',
  },
  {
    question: 'Are KISS1, kisspeptin and KISS1R the same thing?',
    answer: 'No. KISS1 is the gene, kisspeptin is the peptide family (KP-54, KP-14, KP-13 and KP-10), and KISS1R (GPR54) is the receptor those peptides bind.',
  },
  {
    question: 'How does Kisspeptin-10 act at KISS1R in assays?',
    answer: 'It binds KISS1R, a Gq/11-coupled receptor, which drives phospholipase C, IP3 and DAG, raising intracellular calcium and activating protein kinase C. Reported Ki values are 1.59 nM at the rat receptor and 2.33 nM at the human receptor.',
  },
  {
    question: 'Does a high HPLC purity result confirm this is Kisspeptin-10?',
    answer: 'No. HPLC shows how much of the sample is one dominant species, not which species it is. Mass confirmation identifies it, so read both results together.',
  },
  {
    question: 'What does mass spectrometry confirm, and what does it miss?',
    answer: 'It confirms the molecular mass matches the expected value, which supports identity and rules out the wrong fragment. It cannot confirm residue order, which needs MS/MS or peptide mapping.',
  },
  {
    question: 'What should I check on a Kisspeptin COA?',
    answer: 'Check that the lot number matches your vial and that the reported mass is near 1302 Da. Then look at the HPLC purity and method, the test date, and whether a counterion is identified.',
  },
  {
    question: 'Why might the molecular weight on a COA differ from 1302.45?',
    answer: '1302.45 is the free base, while synthetic peptides are usually supplied as salts whose counterion adds mass. The certificate should state whether it reports gross weight or net peptide content.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Kisspeptin?',
    answer: 'No. Kisspeptin is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Kisspeptin',
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
