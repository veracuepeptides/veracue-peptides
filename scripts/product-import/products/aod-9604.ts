import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// AOD 9604 (Tyr-hGH 177-191). Research-use-only copy: molecular identity, assay-level context,
// analytical documentation. Facts come from docs/product-contents-1/veracue-aod9604-product-page.json;
// human study content, metabolic model outcomes, references and regulatory framing are intentionally left out.

const NAME = 'AOD 9604'
const SLUG = 'aod-9604'

const SKU_CODE = 'AOD9604'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_AOD_9604_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_AOD_9604_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate library', href: '/certificates' }]

const SEO_TITLE = 'AOD 9604 Research Peptide (hGH 177-191)'
const SEO_DESCRIPTION =
  "AOD 9604 is a 16-residue growth hormone fragment with a Cys7-Cys14 loop (CAS 221231-10-3). Sold in 5 and 10 mg vials for research use only."
const DESCRIPTION =
  "AOD 9604 is a 16-residue peptide, YLRIVQCRSVEGSCGF, made from residues 177 to 191 of growth hormone with an added N-terminal tyrosine and closed into a loop by a Cys7-Cys14 disulfide bond. Its free-base formula is C78H123N23O23S2, with an average mass of 1815.1 g/mol and CAS 221231-10-3. It is a modified fragment, not full-length growth hormone. Available in 5 mg and 10 mg vials for laboratory research only."
function productDetails(): string {
  return [
    h4('What Is AOD 9604?'),
    p('AOD 9604 is a synthetic 16-amino-acid peptide taken from the tail end of human growth hormone (residues 177-191), with an extra tyrosine added at the front and one disulfide bond between Cys7 and Cys14. Its sequence is YLRIVQCRSVEGSCGF. Veracue supplies it for laboratory research only.'),
    p('The peptide is sometimes written AOD9604 or AOD-9604, and it is also studied under the code LAT8881. Some suppliers list it as hGH Fragment 176-191, which is a slightly different sequence. See the research tab for how to tell them apart.'),
    h4('AOD 9604 at a Glance'),
    kvTable([
      ['Product name', 'AOD 9604 (also AOD9604, AOD-9604, LAT8881)'],
      ['Sequence', 'YLRIVQCRSVEGSCGF'],
      ['Length', '16 amino acids'],
      ['Disulfide bond', 'Cys7-Cys14'],
      ['Molecular formula (free base)', 'C78H123N23O23S2'],
      ['Average molecular weight', '1815.1 g/mol'],
      ['Monoisotopic mass', '1813.860 Da'],
      ['CAS Registry Number', '221231-10-3'],
      ['PubChem CID', '71300630'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and mass values describe the free base as a reference structure, taken from the PubChem record. They are not a statement about the form Veracue supplies. Vial contents, physical form, salt or counterion, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What AOD 9604 Is Not'),
    ul([
      'Not intact human growth hormone, only a short fragment of its C-terminal end.',
      'Not the same peptide as native hGH residues 176-191, which begin with phenylalanine instead of tyrosine.',
      'Not a drug, supplement or consumer product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the AOD 9604 sequence look like?'),
    p('The full sequence is Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe. Residues 2 to 16 match human growth hormone residues 177-191, and the tyrosine at position 1 is the addition. The two cysteines at positions 7 and 14 form a disulfide bond that closes part of the chain into a loop.'),
    h5('Is AOD 9604 the same as hGH Fragment 176-191?'),
    p('Not quite, although suppliers often use the names interchangeably. Native hGH residues 176-191 begin with phenylalanine (FLRIVQCRSVEGSCGF). AOD 9604 adds a tyrosine ahead of residues 177-191 (YLRIVQCRSVEGSCGF). Because listings are inconsistent, sequence, disulfide state, expected mass and lot-specific analytical data are the most reliable way to confirm which peptide a product actually is.'),
    h5('How is AOD 9604 different from related sequences?'),
    p('Match on the printed sequence. AOD 9604 begins Tyr-Leu-Arg, native hGH 176-191 begins Phe-Leu-Arg, and AOD9401 is a separate related analogue that appears in its own set of papers. Findings for one should not be applied to another.'),

    h4('Reference Specifications'),
    table(
      ['Property', 'Value'],
      [
        ['Sequence (three-letter)', 'Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe'],
        ['Length', '16 amino acids'],
        ['Disulfide bond', 'Cys7-Cys14'],
        ['Molecular formula (free base)', 'C78H123N23O23S2'],
        ['Average molecular weight', '1815.1 g/mol'],
        ['Monoisotopic mass', '1813.860 Da'],
        ['CAS number', '221231-10-3'],
        ['PubChem CID', '71300630'],
      ],
    ),
    p('These values describe the AOD 9604 molecule itself. They are reference data, not a result from a specific Veracue lot.'),

    h4('Research Context'),
    h5('Why do researchers work with AOD 9604?'),
    p('AOD 9604 is a handy example of isolating one part of a large hormone and asking how the fragment behaves compared with the whole. Its defined sequence and single disulfide bond also make it useful for method development, such as peptide characterization and stability testing.'),
    h5('What is known about its mechanism?'),
    p('The molecular target of AOD 9604 has not been established. In cell assays, it did not compete with hGH for growth-hormone-receptor binding and did not drive receptor-dependent cell growth. That is one reason it is not treated as a conventional growth hormone secretagogue.'),
    p('These are observations from specific laboratory models, not a confirmed pathway, and they should not be read as describing any particular research lot.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general research context. It cannot establish the identity, purity or content of a particular vial, which requires lot-specific testing. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an AOD 9604 Certificate of Analysis'),
    p('A useful COA confirms what the material is, how pure it is by a named method, and that the report belongs to the lot in hand. Certificates vary between laboratories, so treat the list below as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Peptide name and sequence', 'Whether the record ties the material to YLRIVQCRSVEGSCGF.'],
        ['Lot number', 'Which production run the results describe. It should match the vial.'],
        ['Purity and method', 'The reported purity value and the named method behind it, such as HPLC.'],
        ['Mass spectrometry result', 'Whether the measured mass fits the expected value for the tested form.'],
        ['Molecular form', 'Free base or a salt or counterion form.'],
        ['Testing laboratory and test date', 'Who ran the analysis and how recent it is.'],
      ],
    ),
    p('Veracue confirms a field only when the lot certificate reports it. Purity, mass results, lot number, test date and laboratory are reported on each lot’s documentation and can be requested through the certificate library or the contact page.', { links: [{ phrase: 'certificate library', href: '/certificates' }, { phrase: 'contact page', href: '/contact-us' }] }),

    h4('Chromatography and Mass Spectrometry'),
    p('HPLC helps assess chromatographic purity, while mass spectrometry helps assess molecular identity and mass. Neither one alone establishes everything about material quality. A single purity percentage does not confirm what a peptide is or how much of it is in a vial.'),
    table(
      ['Value', 'Figure'],
      [
        ['Monoisotopic mass (free base)', '1813.860 Da'],
        ['Average molecular weight (free base)', '1815.1 g/mol'],
      ],
    ),
    p('A salt form will weigh more than the free base, so the COA should state which form was tested. This is reference information only, not a result from any specific lot.'),

    h4('Common Verification Questions'),
    h5('How do I confirm that the material is AOD 9604?'),
    p('Check the sequence, the disulfide state and the expected mass together, then compare them with a lot-specific analytical result. Product names alone are not enough, since AOD 9604, AOD-9604 and hGH Fragment 176-191 are used loosely across listings.'),
    h5('Is a correct formula on a product page the same as a lot result?'),
    p('No. PubChem-level identity data and a lot’s certificate of analysis are two different things. Confirm purity and content only from the certificate that matches your lot.'),

    h4('Looking for AOD 9604 lot documentation?'),
    p('Ask the Veracue team about documentation for a specific lot, or browse the rest of the catalog.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the FAQ</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('AOD 9604 supplied by Veracue is intended solely for laboratory research and analytical characterization. It is not a drug, dietary supplement or food, it is not intended for human or veterinary use, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. Purchasers are responsible for using the material lawfully and in an appropriate research setting. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is AOD 9604?',
    answer: 'AOD 9604 is a synthetic 16-amino-acid peptide built from residues 177-191 of human growth hormone, with an added tyrosine at the N-terminus and one internal disulfide bond. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What is the sequence of AOD 9604?',
    answer: 'It is YLRIVQCRSVEGSCGF (Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe). A disulfide bond links the cysteines at positions 7 and 14 and closes part of the chain into a loop.',
  },
  {
    question: 'What is the molecular weight of AOD 9604?',
    answer: 'The free base has the formula C78H123N23O23S2, an average molecular weight of 1815.1 g/mol and a monoisotopic mass of 1813.860 Da. Salt forms weigh more, so check which form a document describes.',
  },
  {
    question: 'What is the CAS number of AOD 9604?',
    answer: 'The CAS number is 221231-10-3 and the PubChem CID is 71300630. These describe the molecule, not a particular vial.',
  },
  {
    question: 'Is AOD 9604 the same as hGH Fragment 176-191?',
    answer: 'Not quite, though the names are often used interchangeably. Native hGH 176-191 begins with phenylalanine, while AOD 9604 adds a tyrosine ahead of residues 177-191, so a certificate’s sequence is a more reliable guide than the product name.',
  },
  {
    question: 'Is AOD 9604 the same as LAT8881?',
    answer: 'LAT8881 is another code under which the same peptide has been studied. The name on a listing matters less than the sequence and mass on the lot documentation.',
  },
  {
    question: 'Is AOD 9604 the same as human growth hormone?',
    answer: 'No. It is a short fragment derived from the C-terminal end of human growth hormone, not the intact hormone. In cell assays it did not compete with hGH for receptor binding.',
  },
  {
    question: 'What should an AOD 9604 COA include?',
    answer: 'A COA may include the peptide name and sequence, a lot number matching the vial, purity by a named method such as HPLC, a mass spectrometry result, the molecular form, the testing laboratory and the test date.',
  },
  {
    question: 'How do I get lot documentation for AOD 9604?',
    answer: 'Purity, mass results and lot details are reported on each lot’s documentation. You can request them through the contact page or check the certificate library.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for AOD 9604?',
    answer: 'No. AOD 9604 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'AOD 9604',
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
