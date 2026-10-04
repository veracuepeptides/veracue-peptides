import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Epithalon (AEDG). Research-use-only copy: sequence identity, origin as a synthetic counterpart of epithalamin,
// bioregulator peptide comparison, analytical documentation. Facts come from
// docs/product-contents-1/epithalon-veracue-final.json; telomerase, ageing and lifespan claims, animal-model
// outcome areas, placeholders and study references are intentionally left out.

const NAME = 'Epithalon'
const SLUG = 'epithalon'

const SKU_CODE = 'EPITH'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Epithalon_10mg.jpg' },
  { strength: '50mg', image: 'VERACUE_Epithalon_50mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Epithalon Research Peptide (AEDG)'
const SEO_DESCRIPTION =
  "Epithalon and Epitalon are the same four-amino-acid peptide, AEDG. Learn how to confirm it on a COA. 10 and 50 mg vials, research use only."
const DESCRIPTION =
  "Epithalon, also spelled Epitalon, is a four-amino-acid synthetic peptide with the sequence Ala-Glu-Asp-Gly (AEDG). It was developed as a defined-sequence counterpart to epithalamin, a pineal-derived tissue preparation, which is why the two names often appear together and why checking the exact sequence matters. It is offered in 10 mg and 50 mg vials for laboratory research use only, and each lot's form and purity are reported in its documentation."
function productDetails(): string {
  return [
    h4('What Is Epithalon?'),
    p('Epithalon is a short synthetic peptide made of four amino acids, Ala-Glu-Asp-Gly, usually abbreviated AEDG. It was developed as a sequence-defined analog of epithalamin, a pineal-tissue preparation. Veracue supplies Epithalon for laboratory research only.'),
    p('Researchers pay attention to Epithalon because a four-residue sequence is easy to verify and because it gives a reproducible peptide in place of a variable tissue extract. That makes it a straightforward reference material for labs that want documented, sequence-checked material.'),
    h4('Epithalon at a Glance'),
    kvTable([
      ['Product name', 'Epithalon (also written Epitalon)'],
      ['Sequence', 'AEDG (Ala-Glu-Asp-Gly)'],
      ['Length', '4 amino acids (tetrapeptide)'],
      ['Related material', 'Epithalamin, a pineal-tissue preparation'],
      ['Sizes offered', '10 mg and 50 mg vials'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Epithalon Is Not'),
    ul([
      'Not the same material as epithalamin, the tissue-derived preparation it was designed to mirror.',
      'Not a different compound from Epitalon, which is only an alternate spelling.',
      'Not a drug, supplement or cosmetic ingredient.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Are Epithalon and Epitalon the same peptide?'),
    p('Yes. Epitalon is the more direct transliteration from Russian-language sources, and Epithalon is the spelling common in Western writing. Both point to the same AEDG tetrapeptide, and the difference is a translation artifact. Still, confirm the sequence on any documentation you are working from, because the two spellings occasionally get attached to unrelated products in careless listings.'),
    h5('What does the Epithalon sequence tell me?'),
    p('AEDG is four residues in this order: alanine, glutamic acid, aspartic acid and glycine. A record that resolves to a different length or a different order describes a different compound, so the sequence is the first thing to match against supplier paperwork.'),

    h4('Where Epithalon Comes From'),
    h5('How is Epithalon related to epithalamin?'),
    p('Epithalamin is a polypeptide extract from bovine or porcine pineal tissue, studied within a Russian research program associated with Vladimir Khavinson and colleagues. Epithalon was developed as a synthetic, sequence-defined counterpart to that extract, the idea being a reproducible peptide rather than a variable biological preparation.'),
    p('The two are related but not identical. Older literature does not always separate findings on one from findings on the other, so when you read a primary source, check which material the study actually used.'),

    h4('Research Context'),
    h5('What does the Epithalon literature look like?'),
    p('It is a laboratory-model literature made up of cell-culture work, animal studies and older Russian-language publications. Results are specific to the models and conditions used, and none of it should be read as an established mechanism of action.'),
    p('Retinal and ocular work is sometimes mentioned alongside this peptide family, but it is more strongly associated with a related peptide preparation, Retinalamin. If that is your angle, check the primary source rather than assuming it used Epithalon.'),

    h4('How Epithalon Relates to Other Tissue-Analog Peptides'),
    p('Epithalon comes out of the same research program as other short synthetic peptides, each developed as an analog of a different tissue-derived preparation.'),
    table(
      ['Peptide', 'Tissue analog'],
      [
        ['Epithalon (Epitalon)', 'Pineal gland (epithalamin)'],
        ['Thymalin', 'Thymus'],
        ['Cartalax', 'Cartilage'],
      ],
    ),
    p('Shared lineage does not mean shared findings. Each of these has its own separate literature, and results for one should not be assumed to apply to another.'),
    h5('What can and cannot this page tell me?'),
    p('It gives molecular reference information and general research context. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an Epithalon Certificate of Analysis'),
    p('A certificate of analysis documents one lot, so read it as a set of linked facts. Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial.'],
        ['Product identity', 'The compound name, which should agree with the sequence shown.'],
        ['Sequence', 'Whether the record ties the material to Ala-Glu-Asp-Gly.'],
        ['Purity', 'The reported chromatographic purity value.'],
        ['HPLC method', 'The method and detection conditions behind the purity value.'],
        ['Mass spectrometry result', 'Whether the measured mass fits the reference mass for the AEDG tetrapeptide.'],
        ['Molecular form', 'Free peptide, acetate, trifluoroacetate or another counterion.'],
        ['Testing laboratory and date', 'Who performed the analysis and how recent it is.'],
      ],
    ),
    p('Every field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. Check that the pieces agree with each other. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Chromatography and Mass Spectrometry: Two Different Questions'),
    p('HPLC helps assess chromatographic purity. Mass spectrometry helps assess molecular identity and mass. Neither one alone establishes every aspect of material quality, and HPLC purity should be read together with the method and detection conditions on the analytical record.'),
    p('Observed m/z depends on charge state and on ion or adduct conditions, so a report should not be judged against one universal value. Interpretation should rest on the complete spectrum and method.'),

    h4('What to Confirm Before Using Epithalon in a Study'),
    ul([
      'The sequence matches Ala-Glu-Asp-Gly on the documentation for your lot.',
      'A current certificate of analysis is available for that specific lot.',
      'Storage conditions match what the lot documentation calls for.',
    ]),
    p('Handling should follow your own institutional protocol. Veracue does not specify reconstitution volumes or exposure concentrations, since those are study-design decisions and not general recommendations.'),

    h4('Need lot documentation for Epithalon?'),
    p('Ask the Veracue team about the documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Epithalon is supplied for laboratory research and analytical characterization only, by qualified personnel in an appropriate institutional setting. It is not a drug, dietary supplement or cosmetic product, and it is not intended for human or veterinary use or self-administration. This page contains no dosing, administration or usage guidance of any kind. Use of this material should follow applicable institutional, local and federal rules. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Epithalon?',
    answer: 'Epithalon is a synthetic tetrapeptide with the sequence Ala-Glu-Asp-Gly (AEDG), developed as a defined counterpart to the pineal-tissue preparation epithalamin. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is Epitalon the same as Epithalon?',
    answer: 'Yes. They are alternate spellings of the same AEDG tetrapeptide, and the difference comes from translation, not from a different compound.',
  },
  {
    question: 'What is the Epithalon peptide sequence?',
    answer: 'The sequence is Ala-Glu-Asp-Gly, written AEDG in one-letter code. It is four amino acids long.',
  },
  {
    question: 'What is the difference between Epithalon and epithalamin?',
    answer: 'Epithalamin is the original tissue-derived pineal preparation, while Epithalon is the synthetic tetrapeptide made to reproduce it in a defined form. They are related but not the same material.',
  },
  {
    question: 'How does Epithalon relate to Thymalin and Cartalax?',
    answer: 'All three come from the same research program as short synthetic analogs of tissue-derived preparations: pineal for Epithalon, thymus for Thymalin and cartilage for Cartalax. Each has its own separate literature.',
  },
  {
    question: 'Which sizes of Epithalon does Veracue offer?',
    answer: 'Epithalon is offered in 10 mg and 50 mg vials. Both are for laboratory research use only.',
  },
  {
    question: 'What should an Epithalon COA include?',
    answer: 'A COA may include the lot number, product identity, sequence, purity, HPLC method, mass spectrometry result, molecular form, testing laboratory and test date. The lot number should match the vial.',
  },
  {
    question: 'How do I confirm my material is really Epithalon?',
    answer: 'Match the sequence Ala-Glu-Asp-Gly on the lot documentation, then check that the analytical data on the certificate is tied to your lot number.',
  },
  {
    question: 'Where can I find purity, form and storage details for a lot?',
    answer: 'They are reported on each lot’s documentation. You can request them through the contact page or check the certificates page.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and not as a drug, supplement or cosmetic ingredient.',
  },
  {
    question: 'Does Veracue provide usage instructions for Epithalon?',
    answer: 'No. Epithalon is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['longevity-anti-aging'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Epithalon',
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
