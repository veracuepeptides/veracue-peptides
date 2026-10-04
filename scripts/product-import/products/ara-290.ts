import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// ARA-290 (cibinetide, pEQLERALNSS). Research-use-only copy: molecular identity, receptor-model context
// at assay level, analytical documentation. Facts come from
// docs/product-contents-1/veracue-ara-290-product-page-package.json; human study content, nerve and
// tissue model outcomes, orphan-designation and approval status, references and internal notes are left out.

const NAME = 'ARA-290'
const SLUG = 'ara-290'

const SKU_CODE = 'ARA290'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_ARA_290_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'ARA-290 Research Peptide (Cibinetide)'
const SEO_DESCRIPTION =
  "ARA-290 is an 11-residue peptide modeled on erythropoietin's helix B surface (CAS 1208243-50-8). Offered as a 10 mg vial, research use only."
const DESCRIPTION =
  "ARA-290 is an 11-residue synthetic peptide, pEQLERALNSS, with an N-terminal pyroglutamate. It is modeled on the helix B surface of erythropoietin (EPO) and is also written ARA290 or pHBSP. The formula is C51H84N16O21, the average mass is about 1257.3 g/mol and the CAS number is 1208243-50-8. It appears in innate repair receptor (IRR) signaling models. Supplied as a 10 mg vial for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is ARA-290?'),
    p('ARA-290 is a synthetic 11-amino-acid peptide with the sequence pEQLERALNSS, built around the helix B surface region of erythropoietin (EPO). Cibinetide is the International Nonproprietary Name for the same molecule (CAS 1208243-50-8). Veracue supplies it for laboratory research only.'),
    p('ARA-290 was its development code name, and both terms describe one compound. It was designed by Araim Pharmaceuticals to ask whether the signaling linked to EPO could be studied separately from EPO’s classical red-blood-cell activity.'),
    h4('ARA-290 at a Glance'),
    kvTable([
      ['Product name', 'ARA-290 (INN: cibinetide)'],
      ['Also written', 'ARA290, ARA 290, pHBSP, Pyroglutamate Helix B Surface Peptide'],
      ['Sequence', 'pEQLERALNSS (pE-Glu-Gln-Leu-Glu-Arg-Ala-Leu-Asn-Ser-Ser)'],
      ['Length', '11 amino acids'],
      ['Molecular formula', 'C51H84N16O21'],
      ['Average molecular weight', '1257.3 g/mol (1257.324 g/mol per PubChem)'],
      ['CAS Registry Number', '1208243-50-8'],
      ['FDA UNII', '9W5677JKDA'],
      ['PubChem CID', '91810664'],
      ['Structural origin', 'Modeled on the helix B surface domain of erythropoietin'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Formula and identifiers describe the free peptide as a reference structure, taken from the PubChem record and the FDA substance registry. Salt or counterion form, physical form, net peptide amount, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What ARA-290 Is Not'),
    ul([
      'Not erythropoietin. It is a short fragment built around one surface region of a much larger 165-amino-acid glycoprotein hormone.',
      'Not recombinant EPO, and not a growth-hormone peptide.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What does the ARA-290 sequence tell me?'),
    p('pEQLERALNSS is eleven residues: pyroglutamate, glutamic acid, glutamine, leucine, glutamic acid, arginine, alanine, leucine, asparagine, serine and serine. The N-terminal pE is a cyclized glutamine residue at position 1.'),
    p('The notation trips people up. Some reference sources write the sequence with an X in place of the pyroglutamate, so pEQLERALNSS and XEQLERALNSS describe the same molecule. A genuine ARA-290 record should resolve to these same eleven residues in this order.'),
    h5('Is ARA-290 the same as EPO?'),
    p('No. ARA-290 is a short peptide taken from one surface region of the much larger EPO protein. It is not intact EPO, and the literature treats it as pharmacologically distinct from EPO. Findings about one molecule should not be carried over to the other.'),
    h5('Why does the molecular weight vary between listings?'),
    p('Free peptide and salt forms have different masses. The 1257.3 g/mol figure here is the free-peptide value, while a commonly cited acetate figure is roughly 1,317 g/mol. Which form a given vial contains is a lot-level fact and should not be assumed from the parent molecular weight.'),

    h4('Receptor Model Context'),
    h5('What is the proposed innate repair receptor?'),
    p('EPO’s classical activity runs through the EPO receptor homodimer (EPOR/EPOR) on erythroid precursor cells. Researchers also proposed that a different complex, EPOR paired with the beta-common receptor (βcR/CD131), mediates EPO’s effects in other cell types at higher concentrations. That proposed complex is called the innate repair receptor (IRR).'),
    p('ARA-290 was developed around this model: a peptide built from the EPO helix B surface, meant to engage IRR-linked signaling without engaging the EPOR homodimer.'),
    h5('Is the IRR model settled?'),
    p('No. A 2018 biophysical study tested the extracellular domains of EPOR and the beta-common receptor directly, with and without EPO and with and without ARA-290. It used surface plasmon resonance, microscale thermophoresis, size-exclusion chromatography, pull-down assays and analytical ultracentrifugation, and found no detectable physical association between the two domains.'),
    p('The authors noted that transmembrane or intracellular regions, which that study did not test, remain a possible site of interaction. So whether the two receptors associate at the molecular level is still an open, actively discussed question.'),
    table(
      ['Item', 'Detail'],
      [
        ['Classical EPO receptor', 'EPOR homodimer (EPOR/EPOR) on erythroid precursor cells'],
        ['Proposed alternative complex', 'EPOR paired with the beta-common receptor (βcR/CD131), called the IRR'],
        ['ARA-290 design rationale', 'Helix B surface peptide intended to engage IRR-linked signaling'],
        ['Status of the model', 'Research framework; direct extracellular EPOR to βc association not detected in a 2018 biophysical study'],
      ],
    ),
    h5('How should I read ARA-290 literature?'),
    p('Treat the IRR as a research model and not as a confirmed drug target. When you read a paper, ask four questions: which system was used, which comparator, which endpoint, and which chemical form of the peptide. Many papers do not say whether they used the free peptide or a salt, so they cannot be matched to a specific lot.'),
    p('Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an ARA-290 Certificate of Analysis'),
    p('A purity percentage alone does not show that a vial contains ARA-290. A useful COA ties together identity, purity and lot traceability, not just a number. Certificates vary between laboratories, so treat the list below as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Peptide identity', 'The compound name, which should agree with the formula and weight shown.'],
        ['Sequence', 'Whether the record ties the material to pEQLERALNSS.'],
        ['Lot or batch number', 'Which production run the results describe. It should match the vial label.'],
        ['Purity method', 'The method behind the purity value, for example RP-HPLC.'],
        ['Mass spectrometry or identity result', 'Whether the measured mass fits the molecular form in the vial.'],
        ['Salt or counterion', 'Free peptide or a salt form such as acetate, where applicable.'],
        ['Net peptide content', 'Peptide content, where documented.'],
        ['Testing laboratory and test date', 'Who ran the analysis and how recent it is.'],
      ],
    ),
    p('Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation, and an ARA-290 record may not be listed there yet, so ask through the contact page rather than assuming a COA exists.', { links: [...CERT, ...CONTACT] }),

    h4('Chromatography and Mass Spectrometry: Two Different Questions'),
    p('HPLC helps assess chromatographic purity. Mass spectrometry helps assess molecular identity and mass. Neither one alone establishes every aspect of material quality, so read the purity value together with the method reported on the analytical record.'),
    table(
      ['Value', 'Figure'],
      [
        ['Average molecular weight (free peptide, reference)', '1257.3 g/mol'],
        ['Molecular formula', 'C51H84N16O21'],
      ],
    ),
    p('The 1257.3 g/mol figure is a reference value for the free peptide and not an observed lot-specific result. A COA should report what was actually measured for that lot, and the observed mass should correspond to the molecular form in the vial, free peptide or salt.'),

    h4('A Quick Check Before You Rely on a COA'),
    ul([
      'Does the lot number on the COA match the product label?',
      'Does the stated identity correspond to ARA-290 or cibinetide specifically?',
      'Does the stated sequence match pEQLERALNSS?',
      'Is the analytical method named, for example RP-HPLC or ESI-MS, and not just a result?',
      'Does the observed mass correspond to the form in the vial?',
      'Are the testing laboratory and test date identified?',
    ]),
    p('Molecule identity and lot identity are different things. CAS, PubChem and UNII data describe the reference molecule in general, while a specific vial is confirmed only by that lot’s own sequence or mass match, purity result and lot number together.'),

    h4('Need lot documentation for ARA-290?'),
    p('Ask the Veracue team about the documentation available for a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('ARA-290 supplied by Veracue is intended solely for laboratory and analytical research. It is not a drug, dietary supplement, cosmetic or food, and it is not intended to diagnose, treat, cure or prevent any disease. It must not be administered to humans or animals, and it is not for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies. Purchasers are responsible for using this material lawfully and within an appropriate research setting.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is ARA-290?',
    answer: 'ARA-290 is a synthetic 11-amino-acid peptide with the sequence pEQLERALNSS, built from the helix B surface region of erythropoietin (EPO). Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is ARA-290 the same as cibinetide?',
    answer: 'Yes. Cibinetide is the International Nonproprietary Name for the peptide developed under the code name ARA-290, and both share CAS 1208243-50-8 and PubChem CID 91810664.',
  },
  {
    question: 'What is the ARA-290 sequence?',
    answer: 'It is pEQLERALNSS, an 11-residue sequence with an N-terminal pyroglutamate (pE), written pE-Glu-Gln-Leu-Glu-Arg-Ala-Leu-Asn-Ser-Ser.',
  },
  {
    question: 'What is the molecular weight of ARA-290?',
    answer: 'The free peptide has an average molecular weight of 1257.3 g/mol and the formula C51H84N16O21. Salt forms such as an acetate have a different weight, so confirm the form on the lot documentation.',
  },
  {
    question: 'What is ARA-290 derived from?',
    answer: 'It is built around the helix B surface domain of erythropoietin, a defined region of the much larger EPO protein, rather than being EPO itself.',
  },
  {
    question: 'How does ARA-290 relate to erythropoietin?',
    answer: 'It was designed to ask whether signaling associated with EPO could be studied apart from EPO’s classical red-blood-cell activity. It is not intact EPO and not recombinant EPO.',
  },
  {
    question: 'What is the proposed innate repair receptor?',
    answer: 'It is a proposed complex of the EPO receptor and the beta-common receptor (βcR/CD131). A 2018 biophysical study did not detect a direct association between their extracellular domains, so it remains a research model and not settled receptor biology.',
  },
  {
    question: 'Why do ARA-290 pyroglutamate notations differ between sources?',
    answer: 'pE or pGlu marks pyroglutamate, a cyclized glutamine at position 1. Some references write it as X, so pEQLERALNSS and XEQLERALNSS describe the same molecule.',
  },
  {
    question: 'What should an ARA-290 COA include?',
    answer: 'A useful COA names the analytical method, reports an observed identity or mass result and not just the reference mass, and ties both to a lot number and test date. The quality tab lists a full checklist.',
  },
  {
    question: 'Is a purity percentage enough to confirm ARA-290?',
    answer: 'No. Purity and identity are separate questions, so look for an observed mass or sequence result tied to the same lot number as your vial.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for ARA-290?',
    answer: 'No. ARA-290 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'ARA-290',
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
