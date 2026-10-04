import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Selank (TKPRPGP). Research-use-only copy: molecular identity, assay-level research context,
// analytical documentation. Facts come from docs/product-contents-1/veracue-selank-product;
// human-use, nasal-spray and consumer-search content, placeholders and internal notes are left out.

const NAME = 'Selank'
const SLUG = 'selank'

const SKU_CODE = 'SELANK'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Selank_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Selank Research Peptide (TKPRPGP)'
const SEO_DESCRIPTION =
  "Selank (TKPRPGP) is a seven-residue tuftsin analog of about 751 g/mol. Compare it with Semax and read the COA. 10 mg vial available, research use only."
const DESCRIPTION =
  'Selank is a seven-residue synthetic peptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP) and a mass of about 751 g/mol. It is described as an analogue of tuftsin, a shorter, naturally occurring peptide, extended with a Pro-Gly-Pro tail. It shares that ending with Semax but differs in its first four residues, so the two are easy to mix up on paperwork. Veracue lists Selank as a single 10 mg vial for laboratory research only.'

function productDetails(): string {
  return [
    h4('What Is Selank?'),
    p('Selank is a synthetic heptapeptide, a chain of seven amino acids, with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro and a molecular weight of about 751 g/mol. Chemical references describe it as a structural analogue of tuftsin, a shorter, naturally occurring peptide. Veracue supplies Selank for laboratory research only.'),
    p('The sequence and molecular weight belong to the Selank molecule itself, and they can be checked with standard analytical chemistry whichever supplier a sample comes from. What they do not establish is anything about a particular vial. Purity, testing history and documentation belong to an individual lot, not to the published structure.'),
    h4('Selank at a Glance'),
    kvTable([
      ['Compound', 'Selank (synthetic heptapeptide)'],
      ['Sequence', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP)'],
      ['Length', '7 amino acids'],
      ['Approximate molecular weight', 'About 751 g/mol'],
      ['Structural relationship', 'Analogue of tuftsin, extended with a Pro-Gly-Pro tail'],
      ['Vial size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Selank Is Not'),
    ul([
      'Not the same molecule as tuftsin, which is a shorter peptide of four residues.',
      'Not the same peptide as Semax, which has a different sequence.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the Selank sequence tell me?'),
    p('TKPRPGP is seven residues: threonine, lysine, proline, arginine, proline, glycine and proline. The first four (TKPR) form the tuftsin core, and the last three (PGP) are an added Pro-Gly-Pro extension beyond it.'),
    p('The sequence matters when you compare supplier documents. Names vary, but a genuine Selank record should resolve to these same seven residues in this order and to a mass near 751 g/mol. A different length or order describes a different compound.'),
    h5('How is Selank different from Semax?'),
    p('They are different peptides with the same length and the same Pro-Gly-Pro ending. Selank is TKPRPGP and is described as tuftsin-related, while Semax is MEHFPGP and is ACTH-related. Their first four residues and their masses differ, so a record that only says “heptapeptide” is ambiguous.'),
    table(
      ['Attribute', 'Selank', 'Semax'],
      [
        ['Sequence', 'TKPRPGP (Thr-Lys-Pro-Arg-Pro-Gly-Pro)', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)'],
        ['General identity', 'Tuftsin-related synthetic peptide', 'ACTH-related synthetic peptide'],
        ['Length', '7 amino acids', '7 amino acids'],
        ['Approximate molecular weight', 'About 751 g/mol', 'About 814 g/mol'],
      ],
    ),
    p('The table compares identity only and does not rank the two.'),

    h4('Research Context'),
    h5('What do researchers study about Selank?'),
    p('Published laboratory work has looked at Selank in radioligand binding experiments involving GABA-A receptors, in assays of enkephalin-degrading enzyme activity, and in hippocampal BDNF expression in animal models. It also sits within broader peptide-signaling research because of its structural link to tuftsin.'),
    h5('Are these findings outcomes?'),
    p('No. They are research areas. A result from an isolated binding assay or an animal model describes that experimental system only, and it says nothing about any particular research vial sold under the Selank name. When you read a paper, look at the species or system, the comparator, the endpoint and the chemical form.'),
    h5('Can published findings vouch for a commercial vial?'),
    p('No. Published findings describe results under specific experimental conditions and do not confirm the identity, purity or documentation status of any individual material, including Veracue’s. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('What Is Known About the Molecule and What Belongs to the Lot?'),
    p('It helps to keep two questions apart. The first is what Selank is structurally, and that has a stable, published answer: a heptapeptide with a defined sequence and a molecular weight near 751 g/mol. The second is whether a specific vial has been tested and matches that structure at a stated purity. Only lot-specific analytical documentation can answer that one. The chemistry describes the target, and the testing describes the sample.'),

    h4('HPLC and Mass Spectrometry: Two Different Questions'),
    p('Two methods do most of the work in characterizing a research peptide. High-performance liquid chromatography (HPLC), usually run in reverse-phase mode for peptides, shows chromatographic purity: the share of material that resolves as a single, well-defined peak, apart from impurities or synthesis by-products. It is typically reported as a percentage of peak area.'),
    p('Mass spectrometry, commonly ESI-MS or MALDI-TOF for peptides, checks whether the measured molecular mass fits the intended peptide’s theoretical mass, which is about 751 g/mol for Selank, within a stated tolerance. Neither test replaces the other. An HPLC result describes cleanliness, not identity, and a mass result describes identity, not overall purity. A complete record for a lot reports both.'),

    h4('How to Read a Selank Certificate of Analysis'),
    p('A certificate of analysis documents one lot. It is not a general statement about Selank, and it should not be treated as valid for a different lot than the one it names.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot or batch number', 'Which production run the results describe. It should match the number on the vial.'],
        ['Product name and specification', 'The compound tested and the sequence and mass it was tested against.'],
        ['HPLC result', 'Chromatographic purity, meaning the proportion resolving as a single clean peak.'],
        ['Mass spectrometry result', 'Whether the measured mass is consistent with the Selank reference mass, with the stated tolerance.'],
        ['Testing laboratory and date', 'Who performed the analysis and how recent the result is.'],
      ],
    ),
    p('A document that does not tie its results to a matching lot number gives weaker assurance than one that does, even when the printed figures look the same. Veracue reports a field only when the lot documentation includes it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Is this vial really Selank?'),
    p('A label that names a peptide is a claim, not evidence. Look for a mass spectrometry result tied to the lot you received and compare it with the reference mass of about 751 g/mol.'),
    h5('Is a purity figure enough?'),
    p('No. A purity percentage without a linked report cannot be checked, and a very pure sample can still be the wrong molecule if identity was never tested. Ask for the underlying HPLC data, method and date, along with a mass spectrometry result.'),
    h5('Does the COA match my lot?'),
    p('A single certificate reused across batches cannot confirm what you received. The lot number on the certificate should match the lot number printed on the vial, and that same lot number is what lets you compare results between batches over time.'),
    h5('Where are storage and handling details?'),
    p('Storage and handling details are reported on each lot’s documentation rather than assumed from another product, and they can be requested through the contact page.', { links: CONTACT }),

    h4('Need lot documentation for Selank?'),
    p('Ask the Veracue team what documentation is available for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the research use FAQ</a></li><li><a href="/about-us">Learn about Veracue</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Selank is supplied for laboratory research, scientific investigation and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Selank?',
    answer: 'Selank is a synthetic heptapeptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP), described as an analogue of tuftsin. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the Selank peptide sequence?',
    answer: 'The sequence is Thr-Lys-Pro-Arg-Pro-Gly-Pro, written TKPRPGP in one-letter code. The first four residues form the tuftsin core, and Pro-Gly-Pro is an added extension.',
  },
  {
    question: 'What is the molecular weight of Selank?',
    answer: 'Selank has an approximate molecular weight of 751 g/mol. Exact figures for a lot depend on the form named in its documentation.',
  },
  {
    question: 'How is Selank related to tuftsin?',
    answer: 'Selank is described in chemical references as a structural analogue of tuftsin. It extends tuftsin’s four-residue core with a Pro-Gly-Pro sequence.',
  },
  {
    question: 'What is the difference between Selank and Semax?',
    answer: 'They are different seven-residue peptides. Selank (TKPRPGP) is tuftsin-related, while Semax (MEHFPGP) is ACTH-related, and their masses and first four residues differ.',
  },
  {
    question: 'What do researchers study about Selank?',
    answer: 'Published laboratory work has examined GABA-A receptor binding, enkephalin-degrading enzyme activity and hippocampal BDNF expression in animal models. These are research areas, not outcomes.',
  },
  {
    question: 'How do researchers verify Selank identity?',
    answer: 'Through mass spectrometry, which compares the measured mass with the theoretical mass of about 751 g/mol. The result should be tied to a specific lot number.',
  },
  {
    question: 'What does HPLC tell you about Selank?',
    answer: 'HPLC shows chromatographic purity, the proportion of a sample that resolves as one clean peak. It does not by itself confirm identity.',
  },
  {
    question: 'What should a Selank COA include?',
    answer: 'A COA should show the lot number, the HPLC and mass spectrometry results, the testing laboratory and the test date. The lot number should match the one on the vial.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Selank?',
    answer: 'No. Selank is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Selank',
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
