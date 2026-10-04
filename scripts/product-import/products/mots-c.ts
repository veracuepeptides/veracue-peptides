import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// MOTS-C (MRWQEMGYIFYPRKLR). Research-use-only copy: molecular identity, assay-level pathway context,
// analytical documentation. Facts come from docs/product-contents-1/veracue-mots-c-product-page (1).json;
// exercise, insulin-sensitivity, metabolic outcome, human-study content, references and dosing sections are left out.

const NAME = 'MOTS-C'
const SLUG = 'mots-c'

const SKU_CODE = 'MOTSC'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_MOTS_C_10mg.jpg' },
  { strength: '40mg', image: 'VERACUE_MOTS_C_40mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'MOTS-C Research Peptide (12S rRNA-c)'
const SEO_DESCRIPTION =
  "MOTS-C is a 16-residue peptide encoded in mitochondrial DNA (CAS 1627580-64-6). See the mass and COA tips. 10 and 40 mg, research use only."
const DESCRIPTION =
  "MOTS-C (also written MOTS-c) is a 16-residue mitochondrial-derived peptide with the sequence MRWQEMGYIFYPRKLR, encoded within the mitochondrial 12S rRNA gene. The free peptide has the formula C101H152N28O22S2, an average mass near 2174.6 g/mol and CAS 1627580-64-6. Laboratory work has looked at it in cell-level folate, AICAR and AMPK signaling models. Vials come in 10 mg and 40 mg, for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is MOTS-C?'),
    p('MOTS-C is a 16-amino-acid peptide with the sequence MRWQEMGYIFYPRKLR, encoded in a short open reading frame inside the mitochondrial 12S rRNA gene. It is classed as a mitochondrial-derived peptide. Veracue supplies it for laboratory research only.'),
    p('The name stands for mitochondrial open reading frame of the 12S rRNA-c, and the sequence is often written MOTS-c. Researchers look at it because it points to mitochondria as a source of signaling peptides, studied mainly in cultured cells.'),
    h4('MOTS-C at a Glance'),
    kvTable([
      ['Product name', 'MOTS-C (also written MOTS-c, MOTSc)'],
      ['Full name', 'Mitochondrial open reading frame of the 12S rRNA-c'],
      ['Sequence', 'MRWQEMGYIFYPRKLR'],
      ['Length', '16 amino acids'],
      ['Molecular formula (free peptide)', 'C101H152N28O22S2'],
      ['Molecular weight (average)', 'About 2174.6 g/mol'],
      ['Monoisotopic mass (calculated)', '2173.11 Da'],
      ['CAS Registry Number', '1627580-64-6 (as listed in reference databases)'],
      ['PubChem CID', '146675088'],
      ['Genomic origin', 'Short open reading frame within the mitochondrial 12S rRNA gene (MT-RNR1)'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and mass describe the free peptide as a reference structure. That is not a statement about the form Veracue supplies. Salt or counterion form, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What MOTS-C Is Not'),
    ul([
      'Not the same molecule as humanin, which is a separate mitochondrial-derived peptide from the 16S rRNA gene.',
      'Not SS-31, which is a synthetic tetrapeptide and is not encoded by mitochondrial DNA.',
      'Not a drug, supplement, food or cosmetic.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the MOTS-C sequence look like?'),
    p('MOTS-C is a linear peptide of 16 L-amino acids with a free amine at one end and a free carboxylic acid at the other. Three arginines and a lysine, set against a single glutamate, give it a strongly basic character.'),
    p('Two methionines (positions 1 and 6) and a tryptophan (position 3) are the residues most prone to oxidation. These features matter at the bench because they shape how the peptide behaves in chromatography and mass spectrometry.'),
    h5('Why does the sequence matter more than the name?'),
    p('MOTS-C, MOTS-c and MOTSc all point at the same target, but a name on a label is not evidence of what is in the vial. Treat MRWQEMGYIFYPRKLR as the identity of the material, and check that a COA states the sequence, the C-terminal form and the mass it was compared against.'),

    h4('MOTS-C vs. Other Mitochondrial-Context Compounds'),
    table(
      ['Attribute', 'MOTS-C', 'Humanin', 'SS-31'],
      [
        ['Compound class', 'Mitochondrial-derived peptide', 'Mitochondrial-derived peptide', 'Synthetic aromatic-cationic tetrapeptide'],
        ['Origin', 'Short ORF in the mitochondrial 12S rRNA gene', 'Short ORF in the mitochondrial 16S rRNA gene', 'Designed synthetic peptide'],
        ['Size', '16 amino acids', '24 amino acids (cytoplasmic translation); 21 (mitochondrial translation)', '4 residues: D-Arg-Dmt-Lys-Phe-NH2'],
        ['Structural features', 'All L-amino acids; free C-terminal acid; two Met, one Trp', 'Length variant depends on translation context', 'D-arginine, 2′,6′-dimethyltyrosine, C-terminal amide'],
        ['Research context', 'Folate and purine metabolism, AMPK, nuclear stress signaling in cells', 'Cytoprotection research', 'Cardiolipin binding at the inner mitochondrial membrane'],
      ],
    ),
    p('The comparison covers identity and research context only. It does not rank the compounds.'),

    h4('Research Context'),
    h5('What pathways has MOTS-C been examined in?'),
    p('In cultured cells, MOTS-C was reported to inhibit the folate cycle and the de novo purine pathway tied to it. The purine intermediate AICAR accumulated and AMPK, the cell’s energy-sensing kinase, became active. The authors proposed this route as partly responsible for the effects they saw.'),
    p('A later cell-culture study reported that, under metabolic stress, MOTS-C moved into the nucleus in an AMPK-dependent manner. There it was reported to interact with stress-responsive transcription factors such as NRF2 and to regulate genes carrying antioxidant response elements.'),
    h5('What is MOTS-C used for in the laboratory?'),
    p('Researchers use it as a tool to study mitochondrial-to-nuclear signaling, folate metabolism and purine synthesis. It also helps probe AMPK signaling and cellular responses to glucose restriction and oxidative stress, and it can serve for analytical method development on mid-sized basic peptides.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general assay-level context. It cannot establish what is in a particular vial, and cell findings do not carry over automatically to other systems. Veracue provides no dosing, administration or usage guidance of any kind.'),
    h5('How should I read a MOTS-C paper?'),
    p('Ask which cell type or system was used, which stressor and timing, whether endogenous or added peptide was measured, and which chemical form the authors used. Keep each claim at the level of its evidence, for example “activated AMPK in cultured cells”, and do not merge separate findings into one broad claim.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a MOTS-C Certificate of Analysis'),
    p('A useful COA answers four questions. What is the material? How pure is it by a named method? How much peptide is actually present? Does the report belong to your lot? A generic specification sheet is not a lot-specific COA.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Exact product name and sequence', 'Which peptide the report claims to describe', 'Identity, unless supported by analytical data'],
        ['Chemical form (terminus, counterion)', 'Which mass and molecular weight apply', 'Net peptide content'],
        ['Lot or batch number', 'Links the report to a production lot', 'Anything, unless it matches the vial label'],
        ['HPLC purity with method', 'Share of detected signal in the main peak', 'Identity, net content or biological activity'],
        ['Mass spectrometry result', 'Whether observed mass fits the expected species', 'Purity, sequence order or chirality'],
        ['Chromatogram and spectrum images', 'Whether the numbers are supported by raw data', 'Results for any other lot'],
        ['Net peptide content (if tested)', 'How much of the powder is peptide', 'Chromatographic purity'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    p('Every item above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Quick COA Check'),
    ul([
      'Lot number on the COA matches the vial label',
      'COA states the sequence MRWQEMGYIFYPRKLR and the C-terminal form',
      'COA names the purity method, not just a percentage',
      'Mass result gives expected and observed values and says monoisotopic or average',
      'COA addresses oxidized (+16 Da) species rather than ignoring them',
      'Testing laboratory and date are shown',
    ]),

    h4('HPLC and Mass Spectrometry: Two Different Questions'),
    h5('What does reversed-phase HPLC tell me?'),
    p('It reports how much of the detected signal falls in the main peak under stated conditions. Detection near 214 to 220 nm reports peptide bonds, while tryptophan and tyrosine also absorb near 280 nm, so the wavelength changes relative responses. HPLC does not establish identity, counterion, water content or net peptide content, and closely related variants can co-elute with the main peak.'),
    h5('What does mass spectrometry tell me?'),
    p('It tests whether the observed mass is consistent with MOTS-C. With four basic side chains, electrospray spectra usually show several charge states. A COA should state whether it reports monoisotopic or average mass, since mixing them creates an apparent 1.5 Da discrepancy. Intact mass alone cannot distinguish a scrambled sequence of the same composition, and it cannot detect D-amino-acid isomers.'),
    table(
      ['Species (calculated, free acid)', 'Value'],
      [
        ['Monoisotopic mass, M', '2173.11 Da'],
        ['Average mass', 'About 2174.6 Da'],
        ['[M+2H]2+', 'm/z 1087.56'],
        ['[M+3H]3+', 'm/z 725.38'],
        ['[M+4H]4+', 'm/z 544.28'],
        ['One methionine oxidized (+O)', '2189.10 Da'],
        ['Both methionines oxidized (+2O)', '2205.10 Da'],
        ['C-terminal amide variant', '2172.12 Da'],
      ],
    ),
    p('These reference values are calculated from the sequence for identification purposes. They are not Veracue lot results.'),
    h5('Which other methods add confidence?'),
    p('Tandem MS fragmentation or Edman sequencing confirms residue order. Amino acid analysis supports net peptide content, counterion analysis shows how much of the powder is trifluoroacetate or acetate, and chiral amino acid analysis addresses D-isomer content.'),

    h4('Need lot documentation for MOTS-C?'),
    p('Analytical results describe only the lot that was tested, so match the lot number on the COA to your vial. If a lot document is not in the certificate library, ask the Veracue team for it before the material enters a study.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('MOTS-C is supplied solely for laboratory research, scientific investigation and analytical characterization. It is not a drug, dietary supplement, food or cosmetic, and it is not intended for human or veterinary use. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is MOTS-C?',
    answer: 'MOTS-C is a 16-amino-acid peptide (MRWQEMGYIFYPRKLR) encoded in a short open reading frame of the mitochondrial 12S rRNA gene. It is classed as a mitochondrial-derived peptide.',
  },
  {
    question: 'What does MOTS-C stand for?',
    answer: 'Mitochondrial open reading frame of the 12S rRNA-c. The name records where the sequence sits: inside the mitochondrial gene for the small (12S) ribosomal RNA.',
  },
  {
    question: 'What is the molecular weight of MOTS-C?',
    answer: 'For the free peptide (C101H152N28O22S2), the average molecular weight is about 2174.6 g/mol and the calculated monoisotopic mass is 2173.11 Da. Salt forms such as acetate or trifluoroacetate change the weight of the powder, not of the peptide itself.',
  },
  {
    question: 'What is the CAS number for MOTS-C?',
    answer: 'Reference databases list CAS 1627580-64-6 and PubChem CID 146675088. Suppliers do not always state which salt form a CAS number refers to, so check the chemical form on the lot’s COA.',
  },
  {
    question: 'What pathways has MOTS-C been examined in?',
    answer: 'In cultured cells it was reported to inhibit the folate cycle and linked purine synthesis, raising AICAR and activating AMPK. Under metabolic stress it was reported to move into the nucleus and regulate stress-response genes.',
  },
  {
    question: 'How is MOTS-C purity tested?',
    answer: 'Purity is usually reported from reversed-phase HPLC as the share of detected signal in the main peak under stated conditions. It does not confirm identity or net peptide content, so read it together with mass spectrometry and the method details.',
  },
  {
    question: 'How does mass spectrometry confirm MOTS-C identity?',
    answer: 'It checks that the observed mass matches 2173.11 Da (monoisotopic, free acid), often seen as 2+, 3+ and 4+ ions. Intact mass cannot confirm residue order or chirality, so tandem MS or other orthogonal methods add certainty.',
  },
  {
    question: 'Is MOTS-C the same as humanin or SS-31?',
    answer: 'No. Humanin is a different mitochondrial-derived peptide, 24 residues long, from the 16S rRNA gene. SS-31 is a synthetic cardiolipin-targeting tetrapeptide and is not encoded by mitochondrial DNA.',
  },
  {
    question: 'What should a MOTS-C COA include?',
    answer: 'It should state the product name and sequence, chemical form, lot number, testing laboratory and date, HPLC purity with the method named, and a mass result giving expected and observed values. The lot must match the vial label.',
  },
  {
    question: 'Why does methionine oxidation matter for MOTS-C?',
    answer: 'MOTS-C has methionines at positions 1 and 6, so oxidized species at +16 Da (2189.10 Da) and +32 Da (2205.10 Da) can appear in an MS dataset. A good COA addresses them instead of ignoring them.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied strictly for laboratory and scientific research. It is not for human or veterinary use, and it is not a drug, supplement or food.',
  },
  {
    question: 'Does Veracue provide usage instructions for MOTS-C?',
    answer: 'No. MOTS-C is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'MOTS-C',
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
