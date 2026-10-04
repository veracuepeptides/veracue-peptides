import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// SS-31 (D-Arg-Dmt-Lys-Phe-NH2). Research-use-only copy: molecular identity, cardiolipin association at the
// laboratory-model level, analytical documentation. Facts come from docs/product-contents-1/veracue-ss-31-product-page.json;
// human study content, indication and syndrome material, regulatory framing, dosing and references are left out.

const NAME = 'SS-31'
const SLUG = 'ss-31'

const SKU_CODE = 'SS31'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_SS_31_10mg.jpg' },
  { strength: '50mg', image: 'VERACUE_SS_31_50mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'SS-31 Research Peptide (CAS 736992-21-5)'
const SEO_DESCRIPTION =
  "SS-31 is a four-residue peptide built around D-Arg and Dmt (CAS 736992-21-5). Salt forms differ, so read the COA. 10 and 50 mg, research use only."
const DESCRIPTION =
  "SS-31 is a synthetic tetrapeptide, D-Arg-Dmt-Lys-Phe-NH2, built around D-arginine and 2,6-dimethyltyrosine (Dmt). Its reference formula is C32H49N9O5, with a mass of about 639.8 g/mol and CAS 736992-21-5. In mitochondrial membrane models it is studied for its association with cardiolipin. Because salt forms differ, the exact form should be confirmed on the lot certificate. Available in 10 mg and 50 mg vials, for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is SS-31?'),
    p('SS-31 is a synthetic tetrapeptide with the sequence D-Arg-Dmt-Lys-Phe-NH2: D-arginine, 2,6-dimethyltyrosine, lysine and phenylalanine. Its molecular formula is C32H49N9O5 and its molecular weight is approximately 639.8 g/mol. Research on SS-31 centers on its association with cardiolipin, a lipid concentrated in the inner mitochondrial membrane. Veracue supplies it for laboratory use only.'),
    p('The peptide is also written elamipretide, and MTP-131 and Bendavia are other development codes for the same molecule. Match identifiers such as the CAS number and formula rather than the name alone when you compare supplier records.'),
    h4('SS-31 at a Glance'),
    kvTable([
      ['Product name', 'SS-31'],
      ['Other names', 'Elamipretide; MTP-131; Bendavia'],
      ['Sequence', 'D-Arg-Dmt-Lys-Phe-NH2 (D-arginyl-2,6-dimethyl-L-tyrosyl-L-lysyl-L-phenylalaninamide)'],
      ['Peptide length', '4 residues'],
      ['Molecular formula', 'C32H49N9O5'],
      ['Molecular weight', 'Approximately 639.8 g/mol'],
      ['CAS Registry Number', '736992-21-5 (parent compound)'],
      ['PubChem CID', '11764719'],
      ['InChIKey', 'SFVLTCAESLKEHH-WKAQUBQDSA-N'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe the parent compound as recorded in the PubChem record. They are public database values and not a statement about any specific lot. Hydrochloride, TFA and other salt forms have different formulas and masses. Physical form, salt or counterion form, purity, lot number and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What SS-31 Is Not'),
    ul([
      'Not an ordinary Arg-Tyr-Lys-Phe peptide. The D-arginine, the dimethylated tyrosine and the C-terminal amide are part of the molecule.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What is the exact chemical identity of SS-31?'),
    p('The full name is D-arginyl-2,6-dimethyl-L-tyrosyl-L-lysyl-L-phenylalaninamide, condensed to D-Arg-Dmt-Lys-Phe-NH2. That is a D-arginine, a 2,6-dimethyltyrosine, a lysine and a phenylalanine, ending in a C-terminal amide. Writing it as “Arg-Tyr-Lys-Phe” drops the modifications that make it SS-31 rather than a generic peptide of the same length.'),
    p('PubChem also lists the sequence in shorthand as RXKF, where X stands in for the modified tyrosine. That notation is a database convenience, so it should not be read as an ordinary Arg-Tyr-Lys-Phe peptide. A COA that lists only “RYKF” or “Arg-Tyr-Lys-Phe” has described a different, unmodified compound.'),
    h5('Are SS-31 and elamipretide the same molecule?'),
    p('Yes. SS-31 is the research name and elamipretide is the assigned generic name for the same molecule, with MTP-131 and Bendavia as development codes. Confirm equivalence by matching CAS 736992-21-5, PubChem CID 11764719 and formula C32H49N9O5. A different CAS number or formula on a listing may simply indicate a salt form, which is worth resolving with the supplier.'),
    h5('Does the chemical form change the numbers?'),
    p('Yes. Elamipretide is the parent compound, and salt or counterion forms have different molecular formulas and molecular weights. A vial marked SS-31 may contain the parent compound, a hydrochloride, a TFA salt or a di-TFA form. Net peptide content and gross vial fill are also different figures, and listings do not always say which one a stated mass refers to. Chemical form, purity and mass are properties of a lot, so only lot documentation can establish them for a given vial.'),

    h4('Mechanism and Research Context'),
    h5('Why is SS-31 described as mitochondrial-targeted?'),
    p('SS-31 has a net positive charge paired with an aromatic surface, and those properties promote association with mitochondrial membranes. Within that broader affinity, it has a documented interaction with cardiolipin, a phospholipid enriched in the inner mitochondrial membrane.'),
    p('“Targeted” describes an affinity for a membrane component. It does not establish selective targeting of particular mitochondria, or a guaranteed change in ATP output or oxidative stress.'),
    h5('Why is cardiolipin central to SS-31 research?'),
    p('Cardiolipin is a distinctive phospholipid, largely confined to the inner mitochondrial membrane, where it contributes to membrane organization and to the architecture of the respiratory chain. Cytochrome c can interact with cardiolipin in ways relevant to its peroxidase activity.'),
    p('SS-31 has been shown experimentally to associate with cardiolipin-containing membranes. Mechanistic studies use that association to ask whether it alters downstream behavior, such as respiratory chain activity, cristae structure and cytochrome c/cardiolipin peroxidase activity in isolated systems. Those are the laboratory models where the interaction was measured, in liposomes, bicelles and isolated mitochondria.'),
    h5('What is directly measured, and what is interpreted?'),
    p('What is directly measured, in defined systems, includes cytochrome c/cardiolipin peroxidase activity, respiration rates, and membrane or cristae structure by microscopy. The interpretation built on those measurements, that protecting cardiolipin preserves the structural scaffold the respiratory chain depends on, is a mechanistic model consistent with the data. Keep findings from isolated mitochondria, cultured cells and other model systems separate rather than blending them into one general claim.'),

    h4('SS-31 and MOTS-c Side by Side'),
    table(
      ['Attribute', 'SS-31', 'MOTS-c'],
      [
        ['Molecular identity', 'Synthetic tetrapeptide, C32H49N9O5, about 639.8 g/mol, CAS 736992-21-5, PubChem CID 11764719', 'Mitochondrial-DNA-encoded peptide, CAS 1627580-64-6, PubChem CID 146675088'],
        ['Peptide length', '4 residues, including D-arginine and 2,6-dimethyltyrosine, C-terminal amide', '16 residues, standard L-amino acids'],
        ['Mitochondrial relationship', 'Synthetic molecule that localizes to the inner mitochondrial membrane and interacts with cardiolipin', 'Encoded within the mitochondrial 12S rRNA gene; studied as a signaling peptide'],
        ['Proposed mechanism', 'Cardiolipin binding and modulation of the cytochrome c/cardiolipin interaction', 'Reported metabolic and nuclear gene signaling'],
      ],
    ),
    p('Two peptides studied in mitochondrial contexts, with different origins and structures. The table does not rank them, and they are not interchangeable or studied for the same proposed mechanism.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general research context. It cannot establish the purity, chemical form, mass or identity of any individual vial, which are lot-level facts supported only by lot documentation. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('What an SS-31 COA May Include'),
    p('A certificate of analysis is only useful if it ties measurements to a specific lot. Certificates vary between laboratories and testing programs, so treat this as what a thorough SS-31 COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'Why it matters'],
      [
        ['Lot or batch number', 'Ties the document to the vial in hand rather than a product line.'],
        ['Material identity', 'Should give the full modified sequence, not a four-letter shorthand.'],
        ['Chemical form', 'Parent compound, hydrochloride, TFA or di-TFA. This determines the expected formula and mass.'],
        ['HPLC purity and chromatogram', 'A percentage without the trace cannot be independently assessed.'],
        ['Mass spectrometry', 'Observed values and charge states, not only a pass or fail statement.'],
        ['Analytical method and instrument', 'Makes results comparable across lots and labs.'],
        ['Testing date and laboratory', 'Shows who performed the analysis and how recent it is.'],
      ],
    ),
    p('A certificate without a lot number describes a product line, not the vial in hand. Veracue confirms a field only when the lot documentation reports it, and the certificate page explains how to request that documentation.', { links: CERT }),

    h4('Reading SS-31 Mass Spectrometry Data'),
    p('The most common misreading of a peptide spectrum treats molecular weight and m/z as the same number. Molecular weight describes the neutral molecule, while m/z depends on how many charges the observed ion carries.'),
    p('Electrospray ionization commonly produces multiply charged ions, particularly for basic peptides like SS-31, which has both an arginine and a lysine available to protonate. Adducts and counterions shift the observed value further. A hydrochloride, mono-TFA or di-TFA form each has a different total mass than the parent compound.'),
    table(
      ['Value', 'Figure'],
      [
        ['Molecular formula (parent compound)', 'C32H49N9O5'],
        ['Molecular weight (parent compound)', 'Approximately 639.8 g/mol'],
      ],
    ),
    p('There is no single universally dominant peak to expect. Work out the chemical form and charge state for the material first, then compare the spectrum. An observed mass that differs from 639.8 g/mol may reflect the chemical form and not a failed identity check.'),

    h4('Confirming a Lot'),
    h5('How do I confirm that the material is SS-31?'),
    p('Start with the molecule: D-Arg-Dmt-Lys-Phe-NH2, formula C32H49N9O5, CAS 736992-21-5 and PubChem CID 11764719. Those identifiers describe the parent compound, not a vial. Confirming a lot takes analytical data tied to that lot number, such as a mass result consistent with the right chemical form and a chromatographic purity result.'),

    h4('Want the documentation behind an SS-31 lot?'),
    p('Contact the Veracue team about the documentation available for a specific lot, or browse the published certificates.'),
    `<ul><li><a href="/contact-us">Contact the Veracue team</a></li><li><a href="/certificates">View batch certificates</a></li><li><a href="/about-us">See how Veracue verifies its material</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('SS-31 supplied by Veracue is intended for laboratory research use only. It is not for human or veterinary use, and is not intended for ingestion, injection or any form of administration. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is SS-31?',
    answer: 'SS-31 is a synthetic tetrapeptide with the sequence D-Arg-Dmt-Lys-Phe-NH2. It is studied for its interaction with cardiolipin in the inner mitochondrial membrane, and Veracue supplies it for laboratory use only.',
  },
  {
    question: 'Is SS-31 the same as elamipretide?',
    answer: 'Yes. SS-31 is the research name and elamipretide is the generic name for the same molecule. MTP-131 and Bendavia are other development codes.',
  },
  {
    question: 'What is the SS-31 sequence?',
    answer: 'It is D-Arg-Dmt-Lys-Phe-NH2, or D-arginyl-2,6-dimethyl-L-tyrosyl-L-lysyl-L-phenylalaninamide. PubChem’s RXKF shorthand uses X for the modified tyrosine, not an ordinary one.',
  },
  {
    question: 'What is the molecular weight of SS-31?',
    answer: 'The parent compound is C32H49N9O5, approximately 639.8 g/mol, with PubChem CID 11764719 and CAS 736992-21-5. Hydrochloride and TFA salt forms have different formulas and masses.',
  },
  {
    question: 'What does SS-31 do at the mitochondrial level?',
    answer: 'Published laboratory work reports that SS-31 associates with cardiolipin-containing membranes and affects cytochrome c/cardiolipin peroxidase activity in isolated systems. These are mechanistic findings from model systems.',
  },
  {
    question: 'Why does SS-31 interact with cardiolipin?',
    answer: 'Cardiolipin is an anionic phospholipid concentrated in the inner mitochondrial membrane. SS-31’s charged and aromatic residues give it affinity for that lipid environment, as described in biophysical studies using liposomes and NMR.',
  },
  {
    question: 'What does mitochondrial-targeted mean for SS-31?',
    answer: 'It describes localization, not function. The peptide’s charge and aromatic structure give it affinity for mitochondrial membranes and for cardiolipin specifically.',
  },
  {
    question: 'How is SS-31 different from MOTS-c?',
    answer: 'SS-31 is a synthetic four-residue peptide that binds a membrane lipid. MOTS-c is a 16-residue peptide encoded in mitochondrial DNA and studied as a signaling peptide.',
  },
  {
    question: 'What should an SS-31 COA contain?',
    answer: 'A lot number, full material identity, chemical form, HPLC purity with chromatogram, mass spectrometry with observed values, analytical method, testing date and testing laboratory.',
  },
  {
    question: 'Why might an SS-31 mass spectrum not show 639.8?',
    answer: 'Molecular weight and m/z are different numbers, since electrospray often produces multiply charged ions. Salt forms and adducts also shift the observed values, so identify the chemical form and charge state first.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for SS-31?',
    answer: 'No. SS-31 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'SS-31',
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
