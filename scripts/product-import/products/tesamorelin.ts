import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Tesamorelin. Research-use-only copy: molecular identity, free base vs acetate, GHRH-receptor
// assay context, analytical documentation. Facts come from
// docs/product-contents-1/veracue-tesamorelin-product-page.json; human study content, drug-product and
// regulatory framing, pharmacokinetics, references and internal notes are intentionally left out.

const NAME = 'Tesamorelin'
const SLUG = 'tesamorelin'

const SKU_CODE = 'TESA'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Tesamorelin_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Tesamorelin_20mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Tesamorelin Research Peptide (GRF 1-44)'
const SEO_DESCRIPTION =
  "Tesamorelin and tesamorelin acetate carry different CAS numbers (218949-48-5, 901758-09-6). See the COA notes. 10 and 20 mg, research use only."
const DESCRIPTION =
  'Tesamorelin is a synthetic 44-amino-acid analog of growth hormone-releasing factor: the full native GRF(1-44) chain with a trans-3-hexenoyl group on the N-terminal tyrosine and an amidated C-terminus. The free peptide is C221H366N72O67S, average mass about 5135.9 g/mol, CAS 218949-48-5, while the acetate salt has its own CAS, 901758-09-6. It is a GHRH receptor ligand, not a ghrelin receptor ligand like ipamorelin. Offered in 10 mg and 20 mg vials for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is Tesamorelin?'),
    p('Tesamorelin is a synthetic peptide of 44 amino acids that keeps the complete native GRF(1-44) chain and adds a trans-3-hexenoyl group to the N-terminal tyrosine. The C-terminus is an amide. In laboratory models it acts at the GHRH receptor. Veracue supplies it for laboratory research only.'),
    p('The N-terminal group is the only non-native element in the molecule. It is part of the identity of tesamorelin, and it is designed to slow enzymatic breakdown of the chain.'),
    h4('Tesamorelin at a Glance'),
    kvTable([
      ['Product name', 'Tesamorelin'],
      ['Compound class', 'Growth hormone-releasing factor (GRF) analog'],
      ['Length', '44 amino acids, C-terminal amide'],
      ['Modification', 'trans-3-hexenoyl group on the N-terminal tyrosine'],
      ['Molecular formula (free base)', 'C221H366N72O67S'],
      ['Molecular weight (average, free base)', 'About 5135.9 g/mol'],
      ['CAS Registry Number (free base)', '218949-48-5'],
      ['CAS Registry Number (acetate salt)', '901758-09-6'],
      ['PubChem CID', '16137828'],
      ['UNII', 'MQG94M5EEO (free base); LGW5H38VE3 (acetate)'],
      ['Receptor context', 'GHRH receptor (GHRHR)'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and identifiers are from the PubChem record and describe the free base as a reference structure. That is not a statement about the form Veracue supplies. Salt form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Tesamorelin Is Not'),
    ul([
      'Not the same as native GRF(1-44), which lacks the N-terminal trans-3-hexenoyl group.',
      'Not CJC-1295 or modified GRF(1-29), which carry a D-alanine at position 2 that tesamorelin does not have.',
      'Not a ghrelin receptor agonist such as ipamorelin.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What is the tesamorelin sequence?'),
    p('In one-letter code the sequence is YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH2, with the trans-3-hexenoyl group on the N-terminal tyrosine. In three-letter code it begins Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr and ends Gly-Ala-Arg-Ala-Arg-Leu-NH2. Nothing inside the chain is substituted.'),
    h5('Is position 2 L-alanine or D-alanine?'),
    p('L-alanine. Some vendor pages print D-Ala at position 2, but that substitution belongs to CJC-1295 and modified GRF(1-29). Copying it onto tesamorelin describes a different molecule, so run any identity check against the sequence above.'),
    h5('Why are there two CAS numbers?'),
    p('The free peptide is CAS 218949-48-5 and the acetate salt is CAS 901758-09-6. Both describe the same 44-residue peptide. The difference is the counterion that sits alongside it, not the sequence. Some vendor pages list other numbers for the acetate form that do not resolve to an authoritative record.'),
    h5('Free base or acetate: why does it matter?'),
    p('Synthetic peptides are usually isolated as a salt, and a counterion does not change which molecule you have. It does change the arithmetic: a vial filled by total mass holds peptide plus counterion plus residual water, so net peptide content is lower than the fill weight. That figure is lot-specific and belongs on the certificate.'),
    p('Trifluoroacetate is the other counterion researchers meet, often left over from purification. If the counterion matters to your work, confirm it against the lot documentation instead of assuming it from the product name.'),

    h4('Tesamorelin vs. Related GRF-Family Peptides'),
    table(
      ['Attribute', 'Tesamorelin', 'CJC-1295 and modified GRF(1-29)', 'Ipamorelin'],
      [
        ['Backbone', 'Full native GRF(1-44)', 'GRF(1-29) based', 'Short synthetic pentapeptide'],
        ['Position 2', 'L-alanine', 'D-alanine', 'Not applicable'],
        ['Receptor context', 'GHRH receptor', 'GHRH receptor', 'Ghrelin receptor'],
      ],
    ),
    p('The table separates identity only and does not rank the peptides.'),

    h4('Receptor and Mechanism Context'),
    h5('Which receptor does tesamorelin act on?'),
    p('The GHRH receptor (GHRHR), a class B G-protein-coupled receptor found on pituitary somatotroph cells. This is worth separating from ghrelin-receptor agonists such as ipamorelin, which reach growth hormone release through a different receptor entirely.'),
    h5('What does that mean in a laboratory model?'),
    p('In assay and laboratory-model work, GHRH receptor activation prompts somatotroph cells to release growth hormone. Tesamorelin does not supply growth hormone itself, which is the main point that separates it from recombinant growth hormone. These are receptor-level observations and describe a laboratory system, not a promise about any product.'),
    h5('What questions can this material help with?'),
    ul([
      'Which receptor does my assay respond to, GHRHR or the ghrelin receptor?',
      'Does my construct match the native GRF(1-44) chain plus the N-terminal modification?',
      'Which counterion does my lot carry, and how does it affect net peptide content?',
      'What does my mass spectrometry report compare against, average or monoisotopic mass?',
    ]),
    p('Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Tesamorelin Certificate of Analysis'),
    p('A certificate of analysis documents one lot, so read it as a set of linked facts. Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial.'],
        ['Product identity', 'The compound name, which should agree with the formula and mass shown.'],
        ['Molecular form', 'Free base, acetate or another counterion.'],
        ['Purity', 'The reported chromatographic purity value.'],
        ['HPLC method', 'The method and detection conditions behind the purity value.'],
        ['Mass spectrometry result', 'Whether the measured mass fits the tesamorelin reference mass.'],
        ['Net peptide content', 'How much of the vial mass is peptide rather than counterion and water, if reported.'],
        ['Testing laboratory and test date', 'Who ran the analysis and how recent it is.'],
      ],
    ),
    p('Any field above depends on the lot’s own documentation. Veracue confirms a field only when the lot certificate reports it, and the certificate page explains how to request lot documentation.', { links: CERT }),

    h4('What Each Analytical Method Can and Cannot Show'),
    table(
      ['Method', 'What it establishes', 'What it does not establish'],
      [
        ['RP-HPLC (UV detection)', 'Chromatographic purity as percentage peak area, separating the target peak from related peptides and process impurities.', 'Identity. A peak at the expected retention time is consistent with the target, not proof of it.'],
        ['LC-MS / mass spectrometry', 'Molecular identity, by comparing measured mass with theoretical mass.', 'Full impurity quantification. A mass match does not distinguish every isomeric possibility.'],
        ['Net peptide content', 'How much of the vial mass is peptide, apart from counterion and residual water.', 'Sequence correctness or the presence of modifications.'],
        ['Ion chromatography', 'Which counterion is present and in what proportion.', 'Peptide purity or identity.'],
      ],
    ),
    p('Run together, chromatography and mass spectrometry cover each other’s blind spots. A figure like 99 percent by HPLC is one measurement among several, and it does not speak to counterion, net peptide content or biological activity.'),

    h4('Average Mass and Monoisotopic Mass'),
    p('The 5135.9 g/mol figure is an average mass, calculated across natural isotope abundance. A mass spectrometry report often matches a monoisotopic mass instead, which is lower because it uses the most abundant isotope of each element. Neither number is wrong. A COA should state which convention its measured mass is compared against, and the observed m/z also depends on the charge state.'),

    h4('Want the Lot Paperwork for Tesamorelin?'),
    p('Ask the Veracue team about the documentation available for a specific lot, or look through the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/about-us">About Veracue</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Tesamorelin is supplied for laboratory research, scientific investigation and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration, and it has not been evaluated by the FDA. It is not a drug, supplement, cosmetic or food. Nothing here is medical advice, and no dosing, administration or usage guidance is provided. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is tesamorelin?',
    answer: 'Tesamorelin is a synthetic 44-amino-acid analog of growth hormone-releasing factor, carrying a trans-3-hexenoyl group on the N-terminal tyrosine and an amide at the C-terminus. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the tesamorelin sequence?',
    answer: 'In one-letter code it is YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH2, with the trans-3-hexenoyl group on the N-terminal tyrosine. It is the complete native GRF(1-44) chain with no internal substitutions.',
  },
  {
    question: 'Is position 2 of tesamorelin D-alanine?',
    answer: 'No, it is L-alanine. The D-Ala2 substitution belongs to CJC-1295 and modified GRF(1-29), so a source showing D-alanine describes a different molecule.',
  },
  {
    question: 'What are the molecular formula and weight of tesamorelin?',
    answer: 'The free base is C221H366N72O67S with an average molecular weight of about 5135.9 g/mol (PubChem CID 16137828). A mass spectrometry report may compare against a lower monoisotopic mass instead, so a certificate should state its convention.',
  },
  {
    question: 'What is the CAS number for tesamorelin?',
    answer: 'The free peptide is CAS 218949-48-5 and the acetate salt is CAS 901758-09-6. Both describe the same peptide sequence.',
  },
  {
    question: 'Is tesamorelin acetate different from tesamorelin?',
    answer: 'The peptide is identical, and acetate is the counterion paired with it. The counterion affects how much of the vial mass is actually peptide but does not change the sequence. The form of Veracue’s material is reported on each lot’s documentation.',
  },
  {
    question: 'What receptor does tesamorelin act on?',
    answer: 'The GHRH receptor, a class B G-protein-coupled receptor on pituitary somatotroph cells. Ghrelin-receptor agonists such as ipamorelin use a different receptor.',
  },
  {
    question: 'How is tesamorelin different from native GRF(1-44)?',
    answer: 'The chain is the same. Tesamorelin adds a trans-3-hexenoyl group on the N-terminal tyrosine, which is designed to slow enzymatic breakdown.',
  },
  {
    question: 'What should a tesamorelin COA include?',
    answer: 'A COA may include the lot number, product identity, molecular form, HPLC purity and method, a mass spectrometry result, testing laboratory and test date. Net peptide content and counterion are useful extras when reported.',
  },
  {
    question: 'Does a 99 percent HPLC result mean the material is 99 percent pure in every sense?',
    answer: 'No. HPLC reports chromatographic purity as percentage peak area under one set of conditions. It does not confirm identity or account for counterion and residual water, so pair it with mass spectrometry.',
  },
  {
    question: 'Does Veracue provide usage instructions for tesamorelin?',
    answer: 'No. Tesamorelin is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Tesamorelin',
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
