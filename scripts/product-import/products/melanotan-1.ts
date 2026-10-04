import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Melanotan 1 (linear alpha-MSH analogue, Nle4 / D-Phe7). Research-use-only copy: identity, sequence,
// formula, mass, CAS, Melanotan 1 vs Melanotan 2 comparison, receptor context at assay level, COA reading.
// Facts come from docs/product-contents-1/veracue-melanotan-1-product. Tanning, pigmentation, approval,
// trial, safety, dosing content, drug/brand names, references and internal notes are intentionally left out.

const NAME = 'Melanotan 1'
const SLUG = 'melanotan-1'

const SKU_CODE = 'MT1'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Melanotan_1_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Melanotan 1 Research Peptide (MT-1)'
const SEO_DESCRIPTION =
  "Melanotan 1 is a linear 13-residue peptide, unlike cyclic Melanotan II (CAS 75921-69-6). See the COA tips. For research use only, in a 10 mg vial."
const DESCRIPTION =
  'Melanotan 1 is a synthetic 13-residue peptide built on the alpha-MSH framework, with norleucine at position 4 and D-phenylalanine at position 7. Its sequence is Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2, formula C78H111N21O19, reference weight about 1,646.8 g/mol, CAS 75921-69-6. It is a linear chain, unlike the cyclic Melanotan 2, which is a separate molecule with a much lower mass. Supplied as a 10 mg vial and intended for laboratory research only.'

function productDetails(): string {
  return [
    h4('What Is Melanotan 1?'),
    p('Melanotan 1 is a synthetic melanocortin peptide analogue built on the structure of α-MSH. It is a linear chain of thirteen amino acids, with norleucine in place of methionine at position 4 and D-phenylalanine in place of phenylalanine at position 7. Veracue supplies it for laboratory research only.'),
    p('Those two substitutions make the peptide far more resistant to enzymatic breakdown than native α-MSH, which degrades too quickly to study easily under controlled conditions. That stability is why it became a useful research tool.'),
    h4('Melanotan 1 at a Glance'),
    kvTable([
      ['Product name', 'Melanotan 1'],
      ['Also written', 'Melanotan-1, Melanotan-I, MT-1, MT1'],
      ['Structural name', '[Nle4, D-Phe7]-α-MSH'],
      ['Peptide class', 'Synthetic melanocortin peptide; α-MSH analogue'],
      ['Length', '13 residues, linear'],
      ['Sequence', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2'],
      ['Molecular formula', 'C78H111N21O19'],
      ['Reference molecular weight', 'Approximately 1,646.8 g/mol'],
      ['CAS number', '75921-69-6'],
      ['Size offered', '10 mg vial'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These are reference values for the molecule. Salt or counterion form, net peptide content, purity, lot number and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Melanotan 1 Is Not'),
    ul([
      'Not Melanotan 2, which is a different, cyclic molecule with a different mass.',
      'Not the native hormone α-MSH, which lacks the norleucine and D-phenylalanine substitutions.',
      'Not a consumer, cosmetic or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the structure look like?'),
    p('Melanotan 1 is a linear tridecapeptide with an acetylated N-terminus and an amidated C-terminus, which places it in the peptide class rather than among small molecules. Its full structural name is [Nle4, D-Phe7]-α-MSH.'),
    h5('Which identity details belong in a research record?'),
    p('Record the reference identity first: Melanotan 1, the structural notation [Nle4, D-Phe7]-α-MSH, the full sequence and CAS 75921-69-6. Abbreviations such as MT-1 are fine as shorthand once that identity is established, but they are ambiguous on their own. Then record the supplier, lot number and any analytical documentation for the specific material used, as a separate entry.'),
    h5('Why do mass figures sometimes differ between sources?'),
    p('Conventions vary. A source may report average or monoisotopic mass, and it may describe the free peptide or a salt form. When comparing figures, check which convention is in use before assuming two numbers disagree about identity.'),

    h4('Melanotan 1 vs Melanotan 2'),
    p('The two names are often used as if they were interchangeable. They are different molecules that share a receptor-recognition motif, and the comparison here is scientific only.'),
    table(
      ['Attribute', 'Melanotan 1', 'Melanotan 2'],
      [
        ['Molecular class', 'Linear α-MSH analogue', 'Cyclic α-MSH analogue'],
        ['Structure', 'Linear tridecapeptide', 'Cyclic heptapeptide (lactam-bridged)'],
        ['Sequence', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2'],
        ['Approximate molecular weight', '1,646.8 g/mol', '1,024.2 g/mol'],
        ['Relationship to α-MSH', 'Full-length analogue with Nle4 and D-Phe7 substitutions', 'Truncated, cyclised analogue keeping the His-D-Phe-Arg-Trp core'],
        ['Receptor research context', 'Described in the literature as acting predominantly at MC1R', 'Described in the literature as active across several melanocortin receptor subtypes'],
      ],
    ),
    p('For record keeping, treat them as separate entities. Mass calculations, published findings and identity checks do not carry across from one to the other, and figures quoted for Melanotan 2 should not be applied to Melanotan 1.'),

    h4('Research Context'),
    h5('Which receptor is involved?'),
    p('The research interest centres on the melanocortin 1 receptor (MC1R), which responds to α-MSH and its analogues. In receptor-expressing cell systems, activation of the receptor raises intracellular cyclic AMP. A stable analogue like Melanotan 1 gives researchers a practical tool for probing that signalling under controlled laboratory conditions.'),
    h5('How should results from different kinds of evidence be read?'),
    table(
      ['Evidence type', 'What it tells you', 'What it does not prove'],
      [
        ['Molecular / biochemical', 'Structural identity and chemical behaviour', 'Any biological outcome'],
        ['Receptor / cellular', 'Activity in a defined laboratory system', 'Behaviour in an intact organism'],
        ['Certificate of analysis', 'Lot-specific analytical results by the stated method', 'Biological activity or fitness for any use'],
      ],
    ),
    p('Mechanistic rationale explains why the peptide is studied. It does not establish an outcome or any product-specific effect.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general research context. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Melanotan 1 Certificate of Analysis'),
    p('A certificate of analysis links a set of analytical results to a specific lot. Confirm that the product name and lot number match the material in hand, not a representative batch. Then check how identity was established, what the assay or purity result actually measures, which method and date were used, and which laboratory did the testing.'),
    table(
      ['COA field', 'What to verify'],
      [
        ['Product name', 'Matches the material'],
        ['Lot number', 'Matches the supplied lot'],
        ['Identity', 'Shows how identity was evaluated'],
        ['Assay / purity', 'Defines exactly what was measured'],
        ['Analytical method', 'Identifies the method'],
        ['Analysis date', 'Establishes the testing date'],
        ['Laboratory', 'Identifies the testing source'],
        ['Specification', 'Shows the acceptance criterion where applicable'],
      ],
    ),

    h4('Reference Values Are Not Lot Results'),
    p('The formula, the reference weight of about 1,646.8 g/mol and the sequence describe the intended molecule. They are not a measurement of any particular vial. A supplier’s analytical result is a separate claim, tied to one lot and one method, so the two should be recorded and compared side by side rather than treated as the same thing.'),
    p('Salt or counterion form, net peptide content, purity result, analytical method and storage conditions are supplier-specific. Confirm them through the documentation for the lot you hold. Conditions for another Veracue peptide should not be transferred to this material.'),

    h4('Quick COA Check'),
    ul([
      'Product name and lot number match the vial label',
      'Identity method is described',
      'Assay or purity result states what was measured and by which method',
      'Analysis date and testing laboratory are shown',
      'A specification is listed where one applies',
    ]),
    p('The certificate page explains how to see lot documentation.', { links: CERT }),

    h4('Need the paperwork for a Melanotan 1 lot?'),
    p('Ask the Veracue team for the documentation that belongs to a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Melanotan 1 supplied by Veracue is for laboratory research purposes only. It is not a drug, supplement, cosmetic or food, and it is not intended for human or veterinary use, ingestion, injection or any form of administration. This page provides no dosing, administration or usage guidance. See the Medical Disclaimer and the Terms and Conditions for sitewide policies, or the Help and FAQ page for general questions.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        { phrase: 'Help and FAQ', href: '/faq' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Melanotan 1?',
    answer: 'Melanotan 1 is a synthetic α-MSH analogue with norleucine at position 4 and D-phenylalanine at position 7. Those changes make it far more stable than the native hormone. Veracue supplies it as a Research Use Only material.',
  },
  {
    question: 'What is the sequence of Melanotan 1?',
    answer: 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2, thirteen residues with an acetylated N-terminus and an amidated C-terminus.',
  },
  {
    question: 'What is the molecular formula and weight of Melanotan 1?',
    answer: 'The formula is C78H111N21O19 and the reference molecular weight is approximately 1,646.8 g/mol. Sources may differ slightly depending on whether they report average or monoisotopic mass.',
  },
  {
    question: 'What is the CAS number for Melanotan 1?',
    answer: '75921-69-6. Use it together with the structural name [Nle4, D-Phe7]-α-MSH to record the reference identity.',
  },
  {
    question: 'What is the difference between Melanotan 1 and Melanotan 2?',
    answer: 'They are different molecules. Melanotan 1 is linear at roughly 1,646.8 g/mol, while Melanotan 2 (also written Melanotan II) is a shorter cyclic peptide at roughly 1,024.2 g/mol. Neither is presented as preferable.',
  },
  {
    question: 'Is Melanotan 1 a peptide?',
    answer: 'Yes. It is a synthetic linear peptide of thirteen amino acid residues related to α-MSH. That describes its chemical class, not the grade or specification of any supplier’s material.',
  },
  {
    question: 'Which receptor is Melanotan 1 studied at?',
    answer: 'Mainly the melanocortin 1 receptor (MC1R), where it is described as acting predominantly. In receptor-expressing cell systems, activation raises intracellular cyclic AMP.',
  },
  {
    question: 'What should I look for on a Melanotan 1 COA?',
    answer: 'Check that the product name and lot number match your material. Then review how identity was confirmed, what the assay result measures, the method and date used, and the testing laboratory.',
  },
  {
    question: 'Are the reference values the same as a lot analysis?',
    answer: 'No. The formula, sequence and reference weight describe the intended molecule, while lot-specific results come only from the documentation for that lot, which can be requested through the contact page.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, ingestion, injection or any form of administration.',
  },
  {
    question: 'Does Veracue provide usage instructions for Melanotan 1?',
    answer: 'No. Melanotan 1 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Melanotan 1',
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
