import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Sermorelin (GHRH(1-29) amide). Research-use-only copy: molecular identity, GHRH receptor context at assay level,
// analytical documentation. Facts come from docs/product-contents-1/veracue-sermorelin-product-page (1).json;
// former drug status, diagnostic and study content, references and regulatory framing are intentionally left out.

const NAME = 'Sermorelin'
const SLUG = 'sermorelin'

const SKU_CODE = 'SERM'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Sermorelin_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Sermorelin_20mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Sermorelin Research Peptide (GRF 1-29)'
const SEO_DESCRIPTION =
  "Sermorelin (CAS 86168-78-7) is the plain 29-residue GHRH(1-29) amide, unlike its modified relatives. Comes in 10 and 20 mg vials, research use only."
const DESCRIPTION =
  'Sermorelin is a linear 29-residue synthetic peptide, YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2, made of the first 29 amino acids of growth hormone-releasing hormone with a C-terminal amide. Its free-base reference formula is C149H246N44O42S, average mass about 3357.9 g/mol, CAS 86168-78-7. It is easily confused with Tesamorelin, CJC-1295 and Ipamorelin, which are different molecules, and it is not growth hormone itself. Vials come in 10 mg and 20 mg for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is Sermorelin?'),
    p('Sermorelin is a synthetic peptide made of the first 29 amino acids of growth hormone-releasing hormone (GHRH), with a C-terminal amide. Native GHRH has 44 residues. In the laboratory it is studied as a reference ligand for the GHRH receptor. Veracue supplies it for research use only.'),
    p('Sermorelin is not growth hormone, which is a much larger protein. The 1-29 sequence is a short, defined reference sequence, and that is why researchers keep coming back to it when they compare GHRH-related molecules.'),
    h4('Sermorelin at a Glance'),
    kvTable([
      ['Product name', 'Sermorelin (also written GRF 1-29, GHRH(1-29) amide)'],
      ['Sequence', 'YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2'],
      ['Length', '29 residues, linear, C-terminal amide'],
      ['Molecular formula (free-base reference value)', 'C149H246N44O42S'],
      ['Molecular weight (free-base reference value)', 'About 3357.9 g/mol (average)'],
      ['CAS Registry Number', '86168-78-7'],
      ['PubChem CID', '16132413'],
      ['Sizes offered', '10 mg and 20 mg vials'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and mass are free-base reference values from the PubChem record. A salt form has a different formula weight. Chemical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Sermorelin Is Not'),
    ul([
      'Not growth hormone. Sermorelin is a 29-residue fragment of GHRH, not the pituitary protein.',
      'Not Tesamorelin, CJC-1295 or Ipamorelin, which are separate molecules.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the Sermorelin sequence tell me?'),
    p('Sermorelin is a single linear chain with no cysteine and no disulfide bonds. The sequence carries three arginines, two lysines, a free N-terminal amine and one methionine at position 27. Those basic residues and the methionine matter when you characterize a lot, because they affect counterion binding and oxidation.'),
    h5('Is Sermorelin the same as Sermorelin acetate?'),
    p('Sermorelin acetate is the acetate salt of the same peptide. The sequence is identical, but the acetate counterions add mass, so the formula weight differs from the free-base value. The form on a lot’s documentation decides which formula weight applies.'),
    h5('Why do similar names cause errors?'),
    p('The peptide appears as Sermorelin, GRF(1-29)NH2 and GHRH(1-29)-NH2. Mod GRF 1-29 and CJC-1295 share its backbone but are different compounds. Anchor identity to the sequence rather than the name: any substitution, D-amino acid or added group makes a different molecule, even when the product name looks similar.'),

    h4('Sermorelin vs. Ipamorelin, Tesamorelin and CJC-1295'),
    table(
      ['Feature', 'Sermorelin', 'Ipamorelin', 'Tesamorelin', 'CJC-1295'],
      [
        ['Structure', 'Unmodified GHRH(1-29) amide', 'Synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2)', 'GHRH(1-44) with N-terminal trans-3-hexenoyl group', 'GHRH(1-29) with four substitutions plus an albumin-binding modified lysine'],
        ['Peptide length', '29 residues', '5 residues', '44 residues', '29 residues plus modified lysine'],
        ['Receptor', 'GHRH receptor', 'Ghrelin (GHS) receptor', 'GHRH receptor', 'GHRH receptor'],
        ['Signaling context', 'Adenylyl cyclase / cAMP', 'Phospholipase C / calcium', 'Adenylyl cyclase / cAMP', 'Adenylyl cyclase / cAMP'],
        ['Research role', 'Reference GHRH-receptor agonist', 'Selective GH secretagogue at the GHS receptor', 'Stabilized full-length GHRH analog', 'Long-acting GHRH analog'],
      ],
    ),
    p('The table compares structure and receptor context only and does not rank the molecules. CJC-1295 without DAC (Mod GRF 1-29) keeps the four substitutions without the albumin-binding group and is a separate compound.'),

    h4('Receptor Context'),
    h5('What does the GHRH receptor do in assays?'),
    p('The GHRH receptor is a G protein-coupled receptor on pituitary somatotroph cells, related to the receptors for VIP and secretin. It signals mainly through adenylyl cyclase and cyclic AMP. The ghrelin (GHS) receptor, by contrast, couples to phospholipase C and calcium. Sermorelin therefore sits on the GHRH side of growth-hormone-axis research.'),
    h5('Why is the unmodified sequence a stability question?'),
    p('Native GHRH is cleaved at its N-terminus in plasma to an inactive fragment, so the unmodified 1-29 sequence is enzymatically labile. Unrecognized degradation can look like a weak or inconsistent response, so researchers treat stability in their chosen system as an experimental variable and record preparation and handling conditions consistently. It also explains why later GHRH analogs such as CJC-1295 were designed for greater enzymatic resistance and cannot stand in for Sermorelin.'),
    h5('How do results get interpreted?'),
    p('Results depend on the experimental model, the endpoint, exposure conditions, assay method and species. A GH-release readout in cultured pituitary cells answers a different question from a receptor-binding assay. This page offers molecular reference information and general research context only. It cannot establish what is in a particular vial, and Veracue provides no dosing, administration or usage guidance of any kind.'),
    h5('Which comparator fits which question?'),
    p('Match comparators to the pathway being tested: GHRH-receptor ligands for GHRH-pathway questions and GHS-receptor ligands for ghrelin-pathway questions. Naming each molecule precisely in methods sections, including any substitutions or modifications, makes work reproducible.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Reverse-phase HPLC reports chromatographic purity: the share of detected material eluting as the main peak. It does not confirm identity, and a closely related peptide can give an equally clean trace. It also reflects only what the detector sees at the chosen wavelength.'),
    p('Mass spectrometry, usually ESI-MS or MALDI-TOF, checks whether the measured mass matches Sermorelin’s theoretical value. An intact mass cannot prove sequence order, so tandem MS or another orthogonal method adds confidence where it matters. ESI spectra usually show several multiply charged ions, so reported masses are typically deconvoluted values. Methionine oxidation is one example of a modified species that mass data can flag.'),
    p('Net peptide content, from amino acid or elemental analysis, shows how much of the powder is peptide rather than counterions and water. With five basic residues and a free N-terminus, Sermorelin binds counterions, so gross weight overstates the peptide present. Net content is a separate figure from HPLC purity, and two lots with identical purity can still differ in actual peptide amount.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Sermorelin', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('How to Read a Sermorelin Certificate of Analysis'),
    p('A certificate of analysis describes one lot, never the compound in general. The first check is simple: the lot number on the COA should match the vial and the order record.'),
    p('A complete Sermorelin COA separates product identity, lot number, chemical form, HPLC result with chromatogram, MS result with observed and theoretical mass, test date and testing laboratory. Net peptide content adds value when concentration accuracy matters. A useful COA reports measured results rather than target specifications. Chemical form, lot number, laboratory, test date, HPLC and mass results and storage conditions are reported on each lot’s documentation. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Common Questions About Verification'),
    h5('Does high purity prove the material is Sermorelin?'),
    p('No. A single sharp HPLC peak only shows that most detected material elutes together. Pair it with a mass spectrometry result from the same lot, reported as observed against theoretical mass. Documentation with only one of the two is incomplete, however high the purity figure.'),
    h5('Why must the chemical form be stated?'),
    p('Sermorelin and Sermorelin acetate share one sequence but not one formula weight. If the form is unstated, mass-based calculations can carry a silent error. Confirm the form on the lot’s COA and use the matching formula weight. Where the documentation does not state the form, record it as unknown rather than assuming one.'),
    h5('What makes a procurement record hold up later?'),
    p('For each lot, keep the listing snapshot, the lot-specific COA, the stated chemical form, net peptide content if available, the receipt date, labeled storage conditions and the experiments that used it. Consistent records make lot-to-lot differences visible and let unexpected results be traced back quickly.'),

    h4('Want lot documentation for Sermorelin?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Sermorelin is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Sermorelin?',
    answer: 'Sermorelin is a synthetic peptide made of the first 29 amino acids of growth hormone-releasing hormone, with a C-terminal amide. It is studied in the laboratory as a reference ligand for the GHRH receptor.',
  },
  {
    question: 'What is Sermorelin peptide made of?',
    answer: 'Its sequence is YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2. The free-base formula is C149H246N44O42S, with an average molecular weight of about 3357.9 g/mol.',
  },
  {
    question: 'What is the CAS number for Sermorelin?',
    answer: 'The CAS number is 86168-78-7 and the PubChem CID is 16132413. Sermorelin acetate is listed as a separate form, so match the exact name and formula.',
  },
  {
    question: 'What is Sermorelin acetate?',
    answer: 'It is the acetate salt of the same peptide. Its formula weight includes acetate counterions, so it differs from the free-base value.',
  },
  {
    question: 'Is Sermorelin the same as growth hormone?',
    answer: 'No. Growth hormone is a much larger pituitary protein. Sermorelin is a 29-residue fragment of GHRH, the peptide that acts on the GHRH receptor.',
  },
  {
    question: 'How is Sermorelin different from Ipamorelin?',
    answer: 'Sermorelin acts at the GHRH receptor, which signals mainly through cAMP. Ipamorelin is an unrelated pentapeptide acting at the ghrelin (GHS) receptor, which couples to phospholipase C and calcium.',
  },
  {
    question: 'How is Sermorelin different from Tesamorelin?',
    answer: 'Tesamorelin is the full 44-residue GHRH sequence with an N-terminal hexenoyl group. Sermorelin is the unmodified 1-29 fragment.',
  },
  {
    question: 'How is Sermorelin different from CJC-1295?',
    answer: 'CJC-1295 has four amino-acid substitutions and, in its original form, an albumin-binding group. Neither version is Sermorelin.',
  },
  {
    question: 'How is Sermorelin characterized?',
    answer: 'Mainly by RP-HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. HPLC does not confirm identity on its own.',
  },
  {
    question: 'What should a Sermorelin COA include?',
    answer: 'A COA should state product identity, chemical form, a lot number matching the vial, test date and testing laboratory. It should report an HPLC result with chromatogram and a mass spectrometry result with observed and theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration.',
  },
  {
    question: 'Does Veracue provide usage instructions for Sermorelin?',
    answer: 'No. Sermorelin is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Sermorelin',
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
