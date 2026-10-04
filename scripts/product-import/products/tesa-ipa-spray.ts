import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Tesa/IPA Spray: the same two peptides documented on the live Tesa/IPA vial listing
// (scripts/product-import/tesa-ipa.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts for both components (sequence, formula, mass, CAS, PubChem CID) are reused
// unchanged from the vial page since these are the same two compounds, including the vial's mg
// ordering convention (tesamorelin milligrams listed before ipamorelin milligrams); everything else
// is written fresh and focused on what "Spray" means as a packaging/dispensing descriptor for a
// two-peptide listing, lot verification across both components, and format-specific framing.
// Research-use-only copy only: no human trial, outcome, or dosing content, consistent with
// scripts/product-import/tesa-ipa.ts and scripts/product-import/sermorelin-spray.ts. Structure mined
// from docs/product-contents-2/tesa-ipa-spray-final.json; its human-study, clinical, approval,
// pharmaceutical-brand and dosing content is intentionally left out to match site policy.

const NAME = 'Tesa/IPA Spray'
const SLUG = 'tesa-ipa-spray'

const SKU_CODE = 'TESAIPA-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '6mg/3mg', image: 'VERACUE_Spray_Tesa_IPA_6_3mg.jpg' },
  { strength: '13mg/3mg', image: 'VERACUE_Spray_Tesa_IPA_13_3mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const VIAL_LINK = [{ phrase: 'Tesa/IPA vial listing', href: '/product/tesa-ipa' }]

const SEO_TITLE = 'Tesa/IPA Spray Research Blend'
const SEO_DESCRIPTION =
  "Tesa/IPA Spray packages Tesamorelin and Ipamorelin, two separate peptides, in Veracue's spray format, with identity data for laboratory research use only."
const DESCRIPTION =
  'Tesa/IPA Spray combines two separate growth-hormone-axis peptides in one spray-dispensed container. Tesamorelin (TH9507) carries the formula C221H366N72O67S, about 5,136 g/mol, CAS 218949-48-5. Ipamorelin carries the formula C38H49N9O5, about 711.9 g/mol, CAS 170851-70-4. The two act through different receptors, Tesamorelin at the GHRH receptor and Ipamorelin at the ghrelin receptor, so each should be identified and verified independently rather than as a single combined entity. Veracue supplies 6 mg of Tesamorelin with 3 mg of Ipamorelin, or 13 mg with 3 mg, strictly for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Tesa/IPA Spray?'),
    p('Tesa/IPA Spray is Veracue’s spray-dispensed packaging of two distinct synthetic peptides, Tesamorelin and Ipamorelin, documented together on the Tesa/IPA vial listing. The underlying molecules are identical across both listings; only the packaging and dispensing format differs between them.', { links: VIAL_LINK }),
    p('"Spray" in this product’s name is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation for either peptide, and none of those specifics should be inferred from the name. Chemical form, concentration, ratio, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Tesa/IPA Spray at a Glance'),
    kvTable([
      ['Product name', 'Tesa/IPA Spray (Tesamorelin + Ipamorelin)'],
      ['Components', 'Tesamorelin (TH9507) and Ipamorelin (NNC-26-0161)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Tesamorelin identity', 'C221H366N72O67S, about 5,136 g/mol, CAS 218949-48-5'],
      ['Ipamorelin identity', 'C38H49N9O5, 711.9 g/mol, CAS 170851-70-4'],
      ['Sizes offered', '6mg/3mg and 13mg/3mg (tesamorelin mg / ipamorelin mg)'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Values above are reference identity data for each molecule, carried over unchanged from the Tesa/IPA vial listing since both listings describe the same two compounds. Purity, chemical form and lot results are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why a Separate Listing for the Same Two Molecules?'),
    p('Veracue lists Tesa/IPA in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Tesa/IPA Spray Is Not'),
    ul([
      'Not a single peptide. It contains two separate molecules, each with its own sequence and formula.',
      'Not a different pair of molecules from the Tesamorelin and Ipamorelin documented on the vial listing.',
      'Not Tesamorelin alone or Ipamorelin alone, and not Sermorelin or CJC-1295.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity of Each Component, Carried Over From the Vial Listing'),
    p('Tesa/IPA Spray and the Tesa/IPA vial listing describe the same two molecules. Packaging format has no bearing on either peptide’s sequence, formula or mass, so the reference values below are identical across both listings.', { links: VIAL_LINK }),
    table(
      ['Attribute', 'Tesamorelin', 'Ipamorelin'],
      [
        ['Molecular class', '44-residue GHRH(1-44) analog with N-terminal hexenoyl group', '5-residue pentapeptide'],
        ['Sequence', 'Full residue order in the PubChem record (CID 16137828)', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2'],
        ['Molecular formula', 'C221H366N72O67S', 'C38H49N9O5'],
        ['Molecular weight', 'About 5,136 g/mol', 'About 711.9 g/mol'],
        ['CAS number', '218949-48-5', '170851-70-4'],
        ['PubChem CID', '16137828', '9831659'],
        ['Receptor studied', 'GHRH receptor (GHRHR)', 'Ghrelin / GHS-R1a'],
        ['Synonym', 'TH9507', 'NNC-26-0161'],
        ['Catalog formats Veracue offers (standalone)', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('The table compares identity only. It does not rank the two peptides, and neither is a variant of the other. The last row describes each molecule’s own standalone listing, separate from this two-peptide spray listing.'),
    h5('Does the spray format change either molecule?'),
    p('No. The two compounds reported under this listing are the same Tesamorelin and Ipamorelin reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not the chemical identity of either peptide.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a ratio between the two peptides, a carrier, or a route, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('A two-peptide listing makes this distinction more important, not less: a packaging word says nothing about how much of each peptide a given unit contains relative to the other. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray."'),

    h4('Tesamorelin and Ipamorelin Act Through Different Receptors'),
    p('Tesamorelin is studied as an agonist at the GHRH receptor (GHRHR), the same receptor family targeted by growth hormone-releasing hormone. Ipamorelin is studied as a selective agonist at the ghrelin receptor, also called the growth hormone secretagogue receptor (GHS-R1a). These are two distinct G protein-coupled receptor systems, so research findings about one peptide do not automatically describe the other.'),
    h5('Does evidence for one component describe the blend?'),
    p('No. A result obtained with Tesamorelin alone says nothing on its own about the pair, and the same is true for Ipamorelin. The reference material for this listing is molecular identity and receptor-level description for each component, and nothing on this page describes a combined effect between the two.'),
    h5('What does Tesa/IPA Spray establish, and what does it not?'),
    p('This page reports molecular reference information and general research context for each peptide, carried over from the vial listing. It cannot establish what a particular spray-format unit contains. Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a COA for a Two-Peptide Spray Listing'),
    p('A certificate of analysis documents one lot, never a packaging format or a compound in general. For a two-peptide listing like this one, look for each item below to cover both Tesamorelin and Ipamorelin, because a result for one component says nothing about the other.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the container and the order record for the spray-format unit received.'],
        ['Identity of Tesamorelin', 'Whether the measured mass fits the Tesamorelin reference mass of about 5,136 g/mol.'],
        ['Identity of Ipamorelin', 'Whether the measured mass fits the Ipamorelin reference mass of about 711.9 g/mol.'],
        ['HPLC chromatogram and purity result', 'How much of the material elutes as each target peak, ideally reported for each peptide.'],
        ['Quantity of each peptide', 'The milligrams of Tesamorelin and Ipamorelin in the unit, for comparison against the listing name.'],
        ['Test date and laboratory information', 'Who performed the analysis and how recent it is.'],
        ['Chemical form', 'Free peptide, acetate or another salt, for each component separately.'],
      ],
    ),
    p('Packaging format has no bearing on which analytical methods apply or on what a complete certificate should contain. A spray-format lot and a vial-format lot of the same two peptides are verified against the same sequence, formula and mass references listed on the Tesa/IPA Spray at a Glance table above. Request lot documentation through the certificate page.', { links: CERT }),

    h4('Two Identity Checks and Two Masses'),
    p('Because this listing holds two peptides, a full identity check has two parts. Tesamorelin should be matched to formula C221H366N72O67S, average mass about 5,136 g/mol, CAS 218949-48-5. Ipamorelin should be matched to formula C38H49N9O5, average mass about 711.9 g/mol, CAS 170851-70-4. A record confirming only one of the two leaves the other unverified, regardless of packaging format.'),
    table(
      ['Component', 'Reference mass', 'Formula'],
      [
        ['Tesamorelin', 'About 5,136 g/mol', 'C221H366N72O67S'],
        ['Ipamorelin', 'About 711.9 g/mol', 'C38H49N9O5'],
      ],
    ),
    h5('Why do observed mass values differ from the data sheet?'),
    p('A mass spectrometer detects ions, not spray bottles or vials. A peptide can carry one or more charges, so one molecule can show up at several m/z values, and observed signals will not match the molecular weight on a data sheet directly. Adducts and counterions can shift or add signals. The two reference masses here sit far apart, roughly 5,136 against 712, so their signals should not be confused, and interpretation belongs to the analytical record and its stated method conditions.'),
    h5('Does a spray-format lot need different verification than a vial?'),
    p('No. The verification question is the same for either packaging format: does this lot match the stated molecules, and is each purity figure paired with a mass result from that same lot. Packaging format does not change what counts as adequate documentation for a two-peptide listing.'),

    h4('Need lot documentation for Tesa/IPA Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Tesa/IPA Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Tesa/IPA Spray?',
    answer: 'Tesa/IPA Spray is Veracue’s spray-dispensed packaging of two distinct synthetic peptides, Tesamorelin and Ipamorelin, also documented on the Tesa/IPA vial listing. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration, ratio or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Are the Tesamorelin and Ipamorelin molecules in this spray different from the vial listing?',
    answer: 'No. Both listings describe the same two compounds: Tesamorelin (C221H366N72O67S, about 5,136 g/mol, CAS 218949-48-5) and Ipamorelin (C38H49N9O5, 711.9 g/mol, CAS 170851-70-4). Only the packaging format differs.',
  },
  {
    question: 'What is Tesamorelin?',
    answer: 'Tesamorelin (research synonym TH9507) is a synthetic 44-residue peptide built on the GHRH(1-44) sequence with an N-terminal trans-3-hexenoyl group, studied as an agonist at the GHRH receptor.',
  },
  {
    question: 'What is Ipamorelin?',
    answer: 'Ipamorelin (research synonym NNC-26-0161) is a synthetic pentapeptide, Aib-His-D-2-Nal-D-Phe-Lys-NH2, studied as a selective agonist at the ghrelin receptor (GHS-R1a).',
  },
  {
    question: 'What does 6mg/3mg mean on this listing?',
    answer: 'The first number is the Tesamorelin content and the second is the Ipamorelin content, so 6mg/3mg means 6 mg of Tesamorelin and 3 mg of Ipamorelin. The larger size, 13mg/3mg, carries 13 mg of Tesamorelin and 3 mg of Ipamorelin.',
  },
  {
    question: 'Is Tesamorelin or Ipamorelin available on its own, outside this combination listing?',
    answer: 'Both Tesamorelin and Ipamorelin are available on their own, each in both vial and spray formats, documented separately on their individual listings.',
  },
  {
    question: 'Does research show a combined effect of Tesamorelin and Ipamorelin?',
    answer: 'Nothing on this page describes a combined or synergistic effect between the two peptides. Each has its own separate body of research tied to its own receptor.',
  },
  {
    question: 'Why does Veracue list Tesa/IPA in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'What should a Tesa/IPA Spray certificate of analysis include?',
    answer: 'It should name both Tesamorelin and Ipamorelin with their own identifiers, state a lot number matching the container received, and report an HPLC purity result and a mass spectrometry identity result for each peptide, with test date and testing laboratory.',
  },
  {
    question: 'Why do mass spectrometry values not match the listed weights?',
    answer: 'A spectrometer reports m/z for charged ions, so one molecule can appear at several values, and adducts or counterions can shift signals further from the neutral average molecular weight.',
  },
  {
    question: 'Does Veracue provide usage instructions for Tesa/IPA Spray?',
    answer: 'No. Tesa/IPA Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Tesa/IPA Spray',
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
