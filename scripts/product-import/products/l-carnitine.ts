import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// L-Carnitine (levocarnitine). A small-molecule quaternary ammonium compound, not a peptide.
// Facts come from docs/product-contents-1/veracue-l-carnitine (customer_facing only). Supplementation studies,
// weight, exercise and glycemic material, references and regulatory framing are intentionally left out.

const NAME = 'L-Carnitine'
const SLUG = 'l-carnitine'

const SKU_CODE = 'LCARN'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '400mg', image: 'VERACUE_L_Carnitine_400mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificates page', href: '/certificates' }]

const SEO_TITLE = 'L-Carnitine Research Compound (C7H15NO3)'
const SEO_DESCRIPTION =
  "L-Carnitine (levocarnitine) is a small molecule, not a peptide: C7H15NO3, CAS 541-15-1. Read the COA notes. 400 mg vial, research use only."
const DESCRIPTION =
  "L-Carnitine (levocarnitine) is a small molecule, not a peptide: a zwitterionic quaternary ammonium compound with the formula C7H15NO3, an average mass of 161.20 g/mol and CAS 541-15-1. It is the (R)-enantiomer of carnitine, so the L form is what the name refers to. In the laboratory it appears as a reference in carnitine shuttle and acylcarnitine assay work. A 400 mg vial is offered for research use only."
function productDetails(): string {
  return [
    h4('What Is L-Carnitine?'),
    p('L-Carnitine, also called levocarnitine, is the naturally occurring L-form of carnitine: a small quaternary ammonium compound with the formula C7H15NO3 and an average molecular weight of 161.20 g/mol. It is a single small molecule, not a peptide, with no amino acid chain and no peptide bonds. Veracue supplies it for laboratory research only.'),
    p('Its best-known role in the laboratory is transport. Long-chain fatty acids cannot enter the mitochondrial matrix on their own, so carnitine carries their acyl groups across the inner membrane. That relay is called the carnitine shuttle, and it makes carnitine a standard reference point in studies of mitochondrial metabolism, fatty-acid oxidation and carnitine transport.'),
    h4('L-Carnitine at a Glance'),
    kvTable([
      ['Product name', 'L-Carnitine (levocarnitine)'],
      ['Chemical type', 'Small molecule, not a peptide'],
      ['Molecular formula', 'C7H15NO3'],
      ['Molecular weight (average)', '161.20 g/mol'],
      ['Exact mass', '161.1052 Da, calculated'],
      ['CAS Registry Number', '541-15-1'],
      ['PubChem CID', '10917'],
      ['Stereochemistry', 'One stereocenter; the L-form is the (R)-enantiomer'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe the reference molecule from the PubChem record. Form or salt, physical state, purity or assay, analytical methods and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What L-Carnitine Is Not'),
    ul([
      'Not a peptide: there is no sequence to confirm.',
      'Not interchangeable with acetyl-L-carnitine, the hydrochloride or the tartrate, which have their own formulas and weights.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity and Related Forms'),
    h5('How is L-carnitine defined chemically?'),
    p('The systematic name is (R)-3-carboxy-2-hydroxy-N,N,N-trimethyl-1-propanaminium, inner salt, with InChIKey PHIQHXFUZVPYII-ZCFIWIBFSA-N. It is a zwitterion with one stereocenter, and the L-form is the (R)-enantiomer. Cells build it from the amino acids lysine and methionine, but that origin does not make it a peptide.'),
    h5('How do related forms differ?'),
    table(
      ['Form', 'Formula', 'Molecular weight', 'CAS'],
      [
        ['L-Carnitine (levocarnitine)', 'C7H15NO3', '161.20 g/mol', '541-15-1'],
        ['L-Carnitine hydrochloride', 'C7H16ClNO3', '197.66 g/mol', '6645-46-1'],
        ['L-Carnitine L-tartrate (2:1)', 'C18H36N2O12', '472.49 g/mol', '36687-82-8'],
        ['Acetyl-L-carnitine', 'C9H17NO4', '203.24 g/mol', '3040-38-8'],
      ],
    ),
    p('Salts and derivatives have their own formulas and weights, so a molecular weight alone cannot tell you which form a material is. Related forms are not automatically equivalent to free L-carnitine.'),
    h5('How does L-carnitine differ from acetyl-L-carnitine?'),
    p('Acetyl-L-carnitine is the O-acetyl ester of L-carnitine (C9H17NO4, 203.24 g/mol against 161.20). In acylcarnitine profiling, free carnitine is reported as C0 and acetyl-L-carnitine as the short-chain species C2. The two are linked through metabolism, but each has its own literature, so findings about one do not carry over to the other.'),

    h4('Mechanism and Context in Laboratory Systems'),
    h5('What is the carnitine shuttle?'),
    p('Mitochondria cannot import long-chain acyl-CoA directly, so the acyl group is handed to carnitine and carried across. Three proteins do the work:'),
    ul([
      'CPT1, on the outer mitochondrial membrane, transfers the acyl group from coenzyme A to carnitine to form an acylcarnitine.',
      'CACT, the carnitine-acylcarnitine translocase, moves the acylcarnitine across the inner membrane in exchange for free carnitine.',
      'CPT2, on the inner membrane, hands the acyl group back to coenzyme A inside the matrix, ready for β-oxidation.',
    ]),
    p('Free carnitine then returns to the cytoplasm through CACT for another round. Medium- and short-chain fatty acids largely follow a different route, which is one reason one-line descriptions of carnitine miss most of the biochemistry. Carnitine also helps handle excess acyl groups and keeps free coenzyme A available.'),
    h5('Where is L-carnitine used as a research reference?'),
    table(
      ['Research area', 'What it looks at'],
      [
        ['Mitochondrial metabolism', 'Carnitine sits upstream of β-oxidation. Acylcarnitine levels reflect the balance of acyl-CoA to free coenzyme A inside mitochondria.'],
        ['Fatty-acid oxidation', 'Long-chain oxidation depends on the shuttle, and researchers also examine how it is regulated, for example through malonyl-CoA inhibition of CPT1.'],
        ['Carnitine transport', 'Cells accumulate carnitine through the high-affinity, sodium-driven OCTN2 transporter, encoded by SLC22A5. Transport assays use carnitine as the substrate.'],
        ['Acylcarnitine and metabolomics', 'Acylcarnitines are esters of carnitine with fatty acids of different chain lengths. Laboratories profile them by tandem mass spectrometry, reporting free carnitine as C0 and the esters by chain length.'],
      ],
    ),
    p('These are areas in which the molecule is studied. They describe the science, not an outcome from Veracue material.'),
    h5('What questions help when reading carnitine literature?'),
    ul([
      'Which form was used: free L-carnitine, a salt, or a derivative such as acetyl-L-carnitine?',
      'Is the finding about transport biochemistry, or about a specific test system?',
      'Does the paper describe endogenous biology, which cannot speak for a particular research lot?',
      'Which analytical readout was used, for example tandem mass spectrometry acylcarnitine profiling?',
    ]),
    p('Published studies do not validate a specific Veracue lot. Only lot documentation does. This page provides no dosing, administration or usage guidance.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an L-Carnitine Certificate of Analysis'),
    p('A certificate of analysis ties a lot to measured results, so these fields matter most. Certificates vary between laboratories, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA field', 'What to look for'],
      [
        ['Material identity', 'The name and CAS number should match the compound you intend to use.'],
        ['Form / salt', 'Free L-carnitine, the hydrochloride, the tartrate and acetyl-L-carnitine have different formulas. Confirm which one the certificate describes.'],
        ['Lot number', 'It should match the lot on your vial or order.'],
        ['Assay or purity, if reported', 'Note the value, the basis it is reported on (as received or anhydrous) and whether a specification appears beside it.'],
        ['Analytical method', 'The certificate should name the method actually used, such as titration, HPLC or mass spectrometry.'],
        ['Testing date and laboratory', 'Confirm when the analysis was done and who performed it, if reported.'],
      ],
    ),
    p('A molecular formula found in PubChem is reference information, not a lot-specific quality result. Veracue confirms a field only when the lot certificate reports it.'),

    h4('Checking Identity: Small Molecule, Not Peptide'),
    p('Peptide-style checks such as sequence confirmation do not apply here. Look for identity, assay and form instead, as you would for any small-molecule reagent. A molecular weight is easy to look up, but it is reference information about the molecule and not a lot result. Materials with the same molecular weight can still differ in form, water content or purity.'),
    table(
      ['Value', 'Figure'],
      [
        ['Average molecular weight', '161.20 g/mol'],
        ['Calculated exact mass', '161.1052 Da'],
        ['CAS for free L-carnitine', '541-15-1'],
        ['CAS for the hydrochloride', '6645-46-1'],
        ['CAS for the L-tartrate (2:1)', '36687-82-8'],
      ],
    ),
    p('Match the CAS number and formula on the documentation to the form you intend, and compare like with like because formula weights differ between forms.'),

    h4('Which claims are about the molecule, and which about a lot?'),
    p('Formula, weight and biochemistry are molecule-level. Purity, form, storage and test results belong to a specific lot and come only from its documentation. A statement that traces to neither of those sources deserves caution until you can confirm it.'),

    h4('Want the documentation for your lot?'),
    p('Lot documentation is available through the certificates page. If the certificate for your lot is not listed there yet, you can request it through the contact page.', { links: [...CERT, ...CONTACT] }),
    `<ul><li><a href="/certificates">View product documentation</a></li><li><a href="/contact-us">Contact Veracue</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Veracue Peptides offers L-Carnitine for laboratory research only. It is not a drug, dietary supplement, food or cosmetic, and it is not intended for human or veterinary use, ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance, and its statements have not been evaluated by the FDA. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is L-Carnitine?',
    answer: 'L-Carnitine is the naturally occurring L-form of carnitine, a small molecule (C7H15NO3) that cells make from lysine and methionine. It carries long-chain fatty acyl groups into mitochondria so they can enter β-oxidation, and researchers study it in mitochondrial metabolism, fatty-acid oxidation and carnitine transport.',
  },
  {
    question: 'Is L-Carnitine the same as levocarnitine?',
    answer: 'Yes. Levocarnitine is the pharmacopeial name for L-carnitine, the (R)-enantiomer (CAS 541-15-1, PubChem CID 10917). Salts and derivatives are related forms with different formulas and weights, so the name alone does not tell you which form a material is.',
  },
  {
    question: 'Is L-Carnitine a peptide?',
    answer: 'No. L-Carnitine is a single small molecule with no amino acid chain or peptide bonds. Its documentation should list identity and assay, not a peptide sequence.',
  },
  {
    question: 'What is the molecular formula of L-Carnitine?',
    answer: 'It is C7H15NO3 for the free molecule. The hydrochloride (C7H16ClNO3), the 2:1 tartrate (C18H36N2O12) and acetyl-L-carnitine (C9H17NO4) each have a different formula, so confirm the form from the lot documentation.',
  },
  {
    question: 'What is the molecular weight of L-Carnitine?',
    answer: 'The average molecular weight is 161.20 g/mol and the calculated exact mass is 161.1052 Da. Salts weigh more, for example 197.66 g/mol for the hydrochloride, and acetyl-L-carnitine is 203.24 g/mol.',
  },
  {
    question: 'What does L-Carnitine do in laboratory biochemistry?',
    answer: 'It carries long-chain fatty acyl groups across the inner mitochondrial membrane so they can enter β-oxidation, and it helps handle excess acyl groups and keep coenzyme A available. This is biochemistry and does not describe an effect of any product.',
  },
  {
    question: 'What is the carnitine shuttle?',
    answer: 'It is a three-protein relay. CPT1 forms the acylcarnitine at the outer membrane, CACT moves it across the inner membrane, and CPT2 returns the acyl group to coenzyme A in the matrix.',
  },
  {
    question: 'Is L-Carnitine the same as acetyl-L-carnitine?',
    answer: 'No. Acetyl-L-carnitine is the O-acetyl ester of L-carnitine (C9H17NO4, 203.24 g/mol). The two are related through metabolism but are different compounds with separate literature.',
  },
  {
    question: 'What should I look for on an L-Carnitine COA?',
    answer: 'Check the material identity and form, the lot number, the assay or purity with its method, and the testing date and laboratory. Make sure the lot number matches your vial. A PubChem formula is reference information, not a lot result.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory investigation, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for L-Carnitine?',
    answer: 'No. L-Carnitine is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'L-Carnitine',
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
