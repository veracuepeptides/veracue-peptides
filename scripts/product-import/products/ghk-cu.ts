import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GHK-Cu (copper tripeptide). Research-use-only copy: molecular identity, copper-complex vs free-peptide
// distinction, molecular-form table, COA reading. Facts come from
// docs/product-contents-1/veracue-ghk-cu-product-page.json; skin, hair, wound, collagen, gene-expression
// and human study content, references, regulatory framing and internal notes are intentionally left out.

const NAME = 'GHK-Cu'
const SLUG = 'ghk-cu'

const SKU_CODE = 'GHKCU'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '50mg', image: 'VERACUE_GHK_Cu_50mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'GHK-Cu Research Peptide (CAS 89030-95-5)'
const SEO_DESCRIPTION =
  "GHK-Cu is a copper complex, not the free GHK peptide, so the form on your COA matters (CAS 89030-95-5). 50 mg vial, research use only."
const DESCRIPTION =
  "GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine, usually written Gly-His-Lys, and it is also sold as copper tripeptide-1. The standard complex holds one copper ion per peptide: C14H22CuN6O4, 401.91 g/mol, CAS 89030-95-5. That is a different substance from the free peptide GHK (CAS 49557-75-7), so the exact form named on the certificate matters. Available as a 50 mg vial, for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is GHK-Cu?'),
    p('GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine. The peptide is glycine, histidine and lysine in that order, which is where the initials come from. The standard complex holds one copper ion per peptide, and Veracue supplies it for laboratory research only.'),
    p('Ingredient suppliers list the complex as Copper Tripeptide-1, and older records call it prezatide copper. All three names point at the same chemistry.'),
    h4('GHK-Cu at a Glance'),
    kvTable([
      ['Product name', 'GHK-Cu (copper tripeptide)'],
      ['Other names', 'Copper Tripeptide-1; prezatide copper; glycyl-L-histidyl-L-lysine copper(II)'],
      ['Peptide sequence', 'Gly-His-Lys (G-H-K), three amino acids'],
      ['Metal', 'Copper(II), one ion per peptide in the standard 1:1 complex'],
      ['Neutral 1:1 complex formula', 'C14H22CuN6O4'],
      ['Molecular weight (neutral 1:1 complex)', '401.91 g/mol'],
      ['Copper complex CAS', '89030-95-5'],
      ['Free peptide (GHK) CAS', '49557-75-7'],
      ['Form', 'Lyophilized powder'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical appearance, purity, lot results, molecular form and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What GHK-Cu Is Not'),
    ul([
      'Not the same as GHK, which is the bare tripeptide without copper.',
      'Not the same as AHK-Cu, a related copper tripeptide that starts with alanine instead of glycine.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('How does copper bind to the peptide?'),
    p('Copper binds through nitrogen donors from the glycine terminus and the histidine side chain, and the peptide gives up amide protons as the metal locks in. That is why the complex is written with fewer hydrogens than the free peptide.'),
    h5('Is GHK the same as GHK-Cu?'),
    p('No. GHK is the free tripeptide, C14H24N6O4, 340.38 g/mol, CAS 49557-75-7, a white peptide solid. GHK-Cu is the copper complex, roughly 402 g/mol depending on how the form is written, CAS 89030-95-5, and copper gives it colour.'),
    p('Plenty of sources use the two names as if they were one compound. Some published laboratory work used the free peptide rather than the complex, so a finding reported for one does not automatically apply to the other. If a vendor labels a product GHK-Cu but the identity result matches 340 g/mol, the material is the free peptide and the copper is either absent or unaccounted for.'),
    h5('Why do sources list different molecular weights for GHK-Cu?'),
    p('At least five different numbers circulate. Most describe genuinely different species, and the table sets each representation against its formula so a catalogue value or a COA entry can be matched to the species it describes.'),
    table(
      ['Representation', 'Formula', 'MW (g/mol)', 'Where you will see it'],
      [
        ['Free tripeptide, no copper (GHK)', 'C14H24N6O4', '340.38', 'PubChem CID 73587; CAS 49557-75-7'],
        ['Neutral 1:1 Cu(II) complex, two protons displaced', 'C14H22CuN6O4', '401.91', 'CAS 89030-95-5; the value most research suppliers quote'],
        ['1:1 Cu complex written as a cation', 'C14H23CuN6O4+', '402.92', 'PubChem CID 71587328, titled Prezatide copper'],
        ['2:1 peptide to copper adduct', 'C28H48CuN12O8', '744.31', 'PubChem CID 133697840, confusingly titled GHK-Cu'],
        ['Prezatide copper acetate, 2:1 diacetate salt', 'C32H52CuN12O12', '860.39', 'CAS 130120-57-9; DrugBank DBSALT002420'],
      ],
    ),
    p('Two corrections are worth making plainly, because both circulate widely. First, a number of pages pair the formula C14H22CuN6O4 with a weight near 403.9 g/mol. That formula sums to 401.91. The 402.92 figure belongs to the cationic form PubChem draws, which carries one more hydrogen.'),
    p('Second, the acetate form is often listed around 462 to 467 g/mol, as though it were a 1:1 complex with one acetate attached. The registered substance behind CAS 130120-57-9 is not that. DrugBank records it as two peptide units, one copper and two acetates, averaging 860.39 g/mol. Some suppliers do sell a 1:1 mono-acetate, which is a different material again.'),
    p('For a research powder the practical question is narrow. Which species was synthesised, and which species did the identity test match against? A COA that reports a mass without naming the form leaves that unanswered.'),

    h4('Research Context'),
    h5('What is the proposed mechanism?'),
    p('In 1980 Pickart and colleagues proposed in a Nature paper that the peptide works largely by shuttling copper into cells. That copper-transport framing is still where most mechanistic work starts. It is a laboratory-model proposal about copper handling, and it says nothing about any particular product.'),
    h5('Where is GHK-Cu used in the laboratory?'),
    p('Typical contexts are cell-culture work, copper coordination chemistry and analytical method development. The material is offered for in vitro and laboratory research only.'),
    h5('How does GHK-Cu compare with AHK-Cu?'),
    p('Both are copper(II) complexes of a tripeptide ending in histidine and lysine. The only structural difference is the first residue: glycine in GHK-Cu, alanine in AHK-Cu. That single change gives them separate CAS numbers and separate ingredient names, with GHK-Cu called Copper Tripeptide-1 and AHK-Cu called Copper Tripeptide-3. The two are often mixed up on supplier pages, and findings from one should not be attributed to the other.'),
    h5('What can and cannot this page tell me?'),
    p('It reports molecular reference information and general research context. It cannot establish what is in a particular vial, and it does not show that concentrations used in culture medium correspond to any other amount or route. A purity figure does not establish sterility or biological activity either. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a GHK-Cu Certificate of Analysis'),
    p('A purity percentage answers one question out of six. A useful GHK-Cu COA should let you confirm what the material is, which form it is, how pure it is by a named method, how much peptide is actually in the vial, whether copper is present in the expected ratio, and that the report belongs to the lot in your hand.'),
    p('Copper complexes make the identity question sharper than it is for ordinary peptides. Because the free peptide, the neutral complex, the cationic form and the acetate salt all carry different masses, an identity result is only interpretable if the report states which species it was matched against.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to a specific production lot', 'Anything about quality unless it matches the vial label'],
        ['HPLC purity (%)', 'Share of detected signal in the main peak under stated conditions', 'Identity, net peptide content, sterility or biological activity'],
        ['LC-MS or mass spectrometry', 'Whether an observed mass is consistent with the expected species', 'Purity, or how much material is present'],
        ['Stated molecular form', 'Which of the GHK-Cu species the result refers to', 'Identity on its own; it must be backed by analytical data'],
        ['Copper content', 'Whether copper is present at the expected ratio to peptide', 'Purity of the peptide portion'],
        ['Net peptide content', 'How much of the vial mass is peptide rather than salt or water', 'Chromatographic purity'],
        ['Appearance and colour', 'A weak consistency check, since the complex is coloured and the free peptide is not', 'Anything quantitative'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),

    h4('HPLC and LC-MS Answer Different Questions'),
    p('These two methods get quoted together so often that they start to read like one test. They are not, and they fail in different directions.'),
    p('HPLC separates what is in the sample and reports how much of the detected signal sits under the main peak. It is a purity measure. It cannot tell you that the main peak is the molecule you wanted, because a clean chromatogram of the wrong compound still looks clean.'),
    p('Mass spectrometry answers the identity question by measuring mass. It tells you whether the species present matches an expected mass, which is exactly what a copper complex needs, since the metal changes the number. It does not tell you what fraction of the vial that species represents.'),
    table(
      ['Method', 'What it measures', 'What it cannot answer'],
      [
        ['HPLC', 'Chromatographic purity under stated conditions; presence of related substances', 'Whether the main peak is the intended molecule; how much peptide is in the vial'],
        ['LC-MS / MS', 'Whether an observed mass matches the expected species, including the copper-bound form', 'Purity; quantity; sterility'],
        ['Neither method', 'Not applicable', 'Endotoxin status or suitability for any use in a living system'],
      ],
    ),

    h4('Quick COA Check'),
    ul([
      'Lot number on the COA matches the vial label',
      'Purity method is named, not just a percentage',
      'Identity result states the expected mass, the observed mass and the species matched',
      'Molecular form is stated: neutral complex, cation, acetate salt or other',
      'Copper is accounted for, either by content testing or by the identity species',
      'Testing laboratory and date are shown',
      'Extra panels are reported with results, not just listed as tested',
    ]),
    p('Storage conditions follow the lot’s own documentation and label. Handle the material as a laboratory chemical with appropriate personal protective equipment. The certificate page explains how to see lot documentation.', { links: CERT }),

    h4('Want the paperwork for a GHK-Cu lot?'),
    p('Ask the Veracue team for the documentation that belongs to a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GHK-Cu supplied by Veracue is intended solely for laboratory research, scientific investigation and analytical characterization. It is not a drug, cosmetic, dietary supplement or food, and it must not be given to humans or animals. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHK-Cu?',
    answer: 'GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine, first described in human serum by Pickart and Thaler in 1973. It is supplied here as a laboratory research material.',
  },
  {
    question: 'Is GHK the same as GHK-Cu?',
    answer: 'No. GHK is the free tripeptide, C14H24N6O4, 340.38 g/mol, CAS 49557-75-7. GHK-Cu is the copper complex, CAS 89030-95-5, around 402 g/mol depending on the form.',
  },
  {
    question: 'Is GHK-Cu the same as Copper Tripeptide-1?',
    answer: 'Yes, chemically. Copper Tripeptide-1 is the name ingredient suppliers use for GHK-Cu, and it refers to CAS 89030-95-5.',
  },
  {
    question: 'What is the sequence of GHK-Cu?',
    answer: 'Glycine, histidine, lysine, in that order, with a copper(II) ion bound through nitrogen donors from the glycine terminus and the histidine side chain.',
  },
  {
    question: 'Why do sources list different molecular weights for GHK-Cu?',
    answer: 'Because they describe different species. The free peptide is 340.38, the neutral 1:1 copper complex is 401.91, PubChem’s cationic depiction is 402.92, a 2:1 adduct is 744.31, and prezatide copper acetate is 860.39. A value near 403.9 paired with C14H22CuN6O4 is an arithmetic error, since that formula sums to 401.91.',
  },
  {
    question: 'What is the CAS number for GHK-Cu?',
    answer: '89030-95-5 for the copper complex. The free peptide GHK is 49557-75-7, and prezatide copper acetate is 130120-57-9. Suppliers attach these numbers to different forms, so confirm which form a given lot represents.',
  },
  {
    question: 'What is prezatide copper?',
    answer: 'It is an older name for the copper complex of the GHK peptide, so it refers to the same chemistry as GHK-Cu. Prezatide copper acetate is a separate 2:1 diacetate salt with its own CAS number.',
  },
  {
    question: 'What is the difference between GHK-Cu and AHK-Cu?',
    answer: 'One amino acid. GHK-Cu starts with glycine and AHK-Cu starts with alanine, which gives them separate CAS numbers and ingredient names. Findings from one should not be attributed to the other.',
  },
  {
    question: 'What should a GHK-Cu Certificate of Analysis include?',
    answer: 'A lot number matching the vial, a named purity method, an identity result stating the expected mass, the observed mass and the species matched, the molecular form, copper accounting, net peptide content where measured, and the testing laboratory and date.',
  },
  {
    question: 'Does high HPLC purity say anything about identity?',
    answer: 'No. HPLC purity describes the share of detected signal under the main peak in one run. Identity needs a mass result that names the species it was matched against.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, ingestion, injection or any form of administration.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHK-Cu?',
    answer: 'No. GHK-Cu is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHK-Cu',
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
