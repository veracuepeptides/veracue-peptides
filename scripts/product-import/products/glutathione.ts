import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Glutathione (GSH). Research-use-only copy: molecular identity, GSH vs GSSG, assay-level biochemistry,
// analytical documentation. Facts come from docs/product-contents-1/veracue-glutathione-product-page.json;
// wellness, detox, skin, liver and regulatory-status content, placeholders and references are intentionally left out.

const NAME = 'Glutathione'
const SLUG = 'glutathione'

const SKU_CODE = 'GLUT'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '600mg', image: 'VERACUE_Glutathione_600mg.jpg' },
  { strength: '1500mg', image: 'VERACUE_Glutathione_1500mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Glutathione Research Peptide (GSH)'
const SEO_DESCRIPTION =
  "Glutathione comes as reduced GSH (CAS 70-18-8) or oxidized GSSG, so check which one your COA covers. 600 and 1500 mg, research use only."
const DESCRIPTION =
  "Glutathione is the tripeptide gamma-glutamyl-cysteinyl-glycine. In its reduced form, GSH, it has the formula C10H17N3O6S, an average mass of 307.32 g/mol and CAS 70-18-8. Its oxidized disulfide partner, GSSG, is a different compound with its own CAS number, so the certificate should say which one it covers. Vials come in 600 mg and 1500 mg for laboratory research use only, with form and salt details reported per lot."
function productDetails(): string {
  return [
    h4('What Is Glutathione?'),
    p('Glutathione is a tripeptide made of L-glutamate, L-cysteine and glycine. It exists in two interconvertible redox forms: reduced glutathione (GSH, the thiol form) and oxidized glutathione (GSSG, the disulfide). In biochemical research the plain name usually means GSH, CAS 70-18-8, molecular weight 307.32 g/mol. Veracue supplies it for laboratory research only.'),
    p('Glutathione is one of the most studied small molecules in redox biochemistry. Its short, well-defined structure and its free thiol group make it a common reference compound for enzyme-activity work, GSH/GSSG ratio measurements and analytical method development.'),
    h4('Glutathione at a Glance'),
    kvTable([
      ['Product name', 'Glutathione (reduced L-glutathione, GSH)'],
      ['Chemical name', 'gamma-L-Glutamyl-L-cysteinyl-glycine (reduced)'],
      ['Class', 'Tripeptide; thiol-containing small molecule'],
      ['Molecular formula', 'C10H17N3O6S'],
      ['Molecular weight', '307.32 g/mol'],
      ['CAS Registry Number', '70-18-8'],
      ['PubChem CID', '124886'],
      ['Redox form', 'Reduced (free thiol, -SH)'],
      ['Stereochemistry', 'L-amino acid configuration throughout'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These identifiers describe reduced glutathione as a reference structure and come from the PubChem record. They are not a statement about salt or counterion form, physical form, purity, lot results or storage conditions. Those are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Glutathione Is Not'),
    ul([
      'Not the same compound as oxidized glutathione (GSSG), which has a different formula, mass and CAS number.',
      'Not a conventional long-chain synthetic peptide. At 307.32 g/mol it is much smaller, and its gamma-glutamyl bond is unusual.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the glutathione structure look like?'),
    p('Reduced glutathione is built from L-glutamate, L-cysteine and glycine. The glutamate-cysteine bond is a gamma-glutamyl linkage, formed at the side-chain carboxyl group of glutamate rather than the alpha-carboxyl, and it makes the molecule resistant to most peptidases. The cysteine-glycine bond is a standard peptide bond.'),
    p('The free thiol (-SH) on the cysteine residue is the redox-active site. It is the reason GSH takes part in the electron-transfer and enzyme reactions described below.'),
    h5('How do GSH and GSSG differ?'),
    p('GSSG forms when two GSH molecules are joined by a disulfide bond between their cysteine residues during oxidation. The result is a different molecule with twice the mass, a different formula and a different CAS number. Research suppliers list the two as separate products, so a document that says only “glutathione” and gives no CAS number leaves the form open.'),
    table(
      ['Property', 'Reduced glutathione (GSH)', 'Oxidized glutathione (GSSG)'],
      [
        ['Other names', 'Glutathione; L-glutathione; GSH', 'Glutathione disulfide; GSSG; glutathione, oxidized'],
        ['Molecular formula', 'C10H17N3O6S', 'C20H32N6O12S2'],
        ['Molecular weight', '307.32 g/mol', '612.63 g/mol'],
        ['CAS number', '70-18-8', '27025-41-8'],
        ['Redox form', 'Reduced (free thiol, -SH)', 'Oxidized (disulfide, -S-S-)'],
        ['Role in assays', 'Active redox buffer; enzyme substrate', 'Product of GSH oxidation; recycled by glutathione reductase'],
      ],
    ),
    p('The table does not rank the two. It shows why formulas, molecular weights and CAS numbers should never be swapped between them in a protocol or a record.'),

    h4('Mechanism and Research Context'),
    h5('What does glutathione do in biochemical assays?'),
    p('Three roles are studied most. As a redox buffer, GSH donates electrons to reduce hydrogen peroxide and lipid peroxides and becomes GSSG in the process. Glutathione reductase converts GSSG back to two GSH using NADPH, and the GSH/GSSG ratio is used as an index of redox state in cell and tissue samples.'),
    p('As a cofactor, GSH is used by glutathione peroxidases to reduce peroxides, with GSSG as the by-product. As a conjugation substrate, it is attached to electrophilic compounds by the glutathione S-transferase (GST) family, which is a central pathway in drug-metabolism research.'),
    p('These are biochemical mechanisms described at the molecular and cellular level. They are not claims about what any research material does outside a laboratory.'),
    h5('Which enzymes come up around glutathione?'),
    table(
      ['Enzyme', 'Role in the GSH system'],
      [
        ['Glutathione peroxidase', 'Uses GSH to reduce H2O2 and lipid peroxides; generates GSSG'],
        ['Glutathione reductase', 'Recycles GSSG back to two GSH molecules; requires NADPH'],
        ['Glutathione S-transferases', 'Conjugate GSH to electrophilic substrates; several isoforms with different substrate specificities'],
        ['gamma-Glutamylcysteine ligase', 'Rate-limiting enzyme in GSH biosynthesis; joins glutamate and cysteine'],
        ['Glutathione synthetase', 'Adds glycine to gamma-glutamylcysteine to complete GSH synthesis'],
      ],
    ),
    h5('Where is reduced glutathione used in the laboratory?'),
    ul([
      'Redox biochemistry: measuring the GSH/GSSG ratio in cell or tissue samples and how it shifts after an oxidative challenge.',
      'Enzyme kinetics: glutathione peroxidase and glutathione reductase activity, substrate binding and inhibition profiles.',
      'Metabolism research: GST-mediated conjugation of electrophilic compounds in in vitro models.',
      'Analytical method development: GSH as a reference standard for HPLC and LC-MS method work.',
      'GSH/GSSG ratio assays: quantifying both forms at once, which needs derivatization such as NEM trapping of GSH to prevent oxidation artifacts before measurement.',
    ]),
    p('Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Glutathione Certificate of Analysis'),
    p('A certificate of analysis documents one lot, so read it as a set of linked facts. A rigorous glutathione COA should cover the items below, and certificates vary between laboratories, so treat this as what a COA may include.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Redox form and CAS number', 'Whether the record describes GSH (70-18-8) or GSSG (27025-41-8). This alone resolves the most common ambiguity.'],
        ['Purity by HPLC', 'The reported chromatographic purity, ideally with a chromatogram or a reference to the method.'],
        ['LC-MS identity result', 'Whether the measured mass fits the expected mass for the stated form.'],
        ['Lot number and test date', 'Which production run the results describe and how recent they are. The lot should match the vial.'],
        ['Method details', 'Enough detail to judge whether the method suits the compound.'],
        ['Laboratory identification', 'Who performed the analysis.'],
      ],
    ),
    p('A COA that gives a purity figure without naming the redox form or the method says less than it seems to. Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('HPLC and LC-MS Answer Different Questions'),
    table(
      ['Method', 'What it establishes', 'What it does not establish alone'],
      [
        ['HPLC (reverse-phase or HILIC)', 'Chromatographic purity as percent area of the main peak, and separation from impurities and degradation products', 'Molecular identity. A high purity figure does not show whether the compound is GSH or GSSG.'],
        ['LC-MS or LC-MS/MS', 'Molecular mass for identity, able to tell GSH (307.32) from GSSG (612.63)', 'Purity. Identity does not say what fraction of the sample is the target compound.'],
        ['MS/MS fragmentation', 'Structural confirmation from characteristic fragment ions', 'A standalone purity measurement'],
        ['Electrochemical or UV assay kits', 'Thiol redox activity, and in some kits GSH/GSSG ratios in biological samples', 'Specificity without chromatography. Other thiols can interfere, and the kits are not designed for raw material purity.'],
      ],
    ),
    p('A sample can show high HPLC purity and still be the wrong compound, and LC-MS rules that out. With a suitable method and reference standards, HPLC can also separate the GSH and GSSG peaks, but without careful method development one can co-elute with another species.'),

    h4('Why Oxidation Matters When You Read Results'),
    p('Reduced glutathione is reactive at its thiol group, which is why it is useful and also why it can oxidize. Oxygen, light, moisture and elevated temperature can convert GSH to GSSG, and oxidation proceeds faster in solution than in solid form. Repeated freeze-thaw cycles can also speed degradation.'),
    p('For GSH/GSSG measurement, sample preparation typically needs immediate derivatization, for example with N-ethylmaleimide (NEM), to trap GSH and prevent oxidation artifacts. That is an analytical consideration, not a Veracue protocol. Product-specific storage conditions and form are reported on each lot’s documentation.'),

    h4('Quick Answers on Verifying Glutathione'),
    h5('How do I confirm which form I have?'),
    p('Start with the CAS number on the COA: 70-18-8 for GSH and 27025-41-8 for GSSG. Then check that the formula and the LC-MS mass agree with it. Reduced glutathione is C10H17N3O6S at 307.32 g/mol, and the oxidized form is C20H32N6O12S2 at 612.63 g/mol. Using the wrong molecular weight in an assay calculation produces incorrect concentrations.'),
    h5('Can I match a public identifier to a vial?'),
    p('Not by itself. Identifiers such as CAS 70-18-8 and PubChem CID 124886 describe the molecule, not a lot. Confirming a lot takes analytical data tied to that lot number.'),

    h4('Want the paperwork for a specific lot?'),
    p('Ask the Veracue team about the documentation available for a lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Glutathione is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, dietary supplement, cosmetic or food product, and it is not intended for human or veterinary use, diagnostic procedures, or any form of administration. This page contains no dosing, administration or usage guidance of any kind. Nothing here is medical advice. Buyers confirm they are qualified researchers, laboratories or institutions acquiring the material for lawful research, and they are responsible for compliance with applicable rules. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is glutathione?',
    answer: 'Glutathione is a tripeptide of L-glutamate, L-cysteine and glycine, joined by a gamma-glutamyl bond and a standard peptide bond. It exists as reduced GSH and oxidized GSSG, and the plain name usually means GSH.',
  },
  {
    question: 'What is reduced glutathione (GSH)?',
    answer: 'GSH is the thiol form of glutathione, with a free sulfhydryl (-SH) group on the cysteine residue. Its CAS number is 70-18-8 and its molecular weight is 307.32 g/mol.',
  },
  {
    question: 'What is the difference between GSH and GSSG?',
    answer: 'They are distinct compounds. GSSG forms when two GSH molecules are joined by a cysteine disulfide bond, giving C20H32N6O12S2, 612.63 g/mol and CAS 27025-41-8, against C10H17N3O6S, 307.32 g/mol and CAS 70-18-8 for GSH.',
  },
  {
    question: 'What is the molecular weight of glutathione?',
    answer: 'Reduced glutathione is 307.32 g/mol with the formula C10H17N3O6S. Oxidized glutathione is about double at 612.63 g/mol because it is a dimer of two GSH units.',
  },
  {
    question: 'What is the CAS number for glutathione?',
    answer: 'The CAS number for reduced L-glutathione is 70-18-8, and its PubChem CID is 124886. The oxidized form has CAS 27025-41-8.',
  },
  {
    question: 'Is glutathione a peptide?',
    answer: 'Yes, it is a tripeptide made of three amino acid residues. It is also described as a small-molecule thiol, and its gamma-glutamyl linkage makes it structurally unusual compared with conventional peptides.',
  },
  {
    question: 'What does glutathione do in biochemical research?',
    answer: 'Three roles are studied most: redox buffering, where GSH becomes GSSG and the GSH/GSSG ratio indexes redox state; use as a substrate by glutathione peroxidases and reductase; and conjugation to electrophilic compounds by glutathione S-transferases. These are laboratory-level mechanisms.',
  },
  {
    question: 'What does HPLC show for glutathione?',
    answer: 'HPLC shows chromatographic purity, the share of detected signal in the main peak under the method used. It does not confirm identity on its own, so it cannot tell GSH from GSSG without mass spectrometry or a reference standard.',
  },
  {
    question: 'What does LC-MS show for glutathione?',
    answer: 'LC-MS measures the mass of what elutes from the column. It should show a molecular ion consistent with GSH (307.32) and can tell it from GSSG (612.63), but it does not measure purity.',
  },
  {
    question: 'How can GSH be told apart from GSSG analytically?',
    answer: 'LC-MS is the most direct route because the masses differ. HPLC can separate them with a suitable method and standards, and in biological samples derivatization with NEM traps GSH before analysis to prevent oxidation to GSSG.',
  },
  {
    question: 'What should a glutathione COA include?',
    answer: 'It should state the redox form with its CAS number, a purity result by HPLC, LC-MS identity confirmation, the lot number and test date, method details and the testing laboratory. The lot number should match the vial.',
  },
  {
    question: 'Does Veracue provide usage instructions for glutathione?',
    answer: 'No. Glutathione is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Glutathione',
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
