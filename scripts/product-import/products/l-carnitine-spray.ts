import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// L-Carnitine Spray: the same levocarnitine small molecule documented on the live L-Carnitine vial
// listing (scripts/product-import/l-carnitine.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (formula, mass, CAS, PubChem CID, related-form data)
// are reused unchanged from the vial page since it is the same compound; everything else is written
// fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for
// this format, and format-specific context. Research-use-only copy only: no human trial, dosing,
// weight-loss, fat-metabolism-outcome, energy-expenditure or exercise-performance content, consistent
// with scripts/product-import/l-carnitine.ts.

const NAME = 'L-Carnitine Spray'
const SLUG = 'l-carnitine-spray'

const SKU_CODE = 'LCARN-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '400mg', image: 'VERACUE_Spray_L_Carnitine_400mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const LCARNITINE_LINK = [{ phrase: 'L-Carnitine vial listing', href: '/product/l-carnitine' }]

const SEO_TITLE = 'L-Carnitine Spray (C7H15NO3)'
const SEO_DESCRIPTION =
  'Veracue packages levocarnitine, C7H15NO3, CAS 541-15-1, in a spray-dispensed research format with lot verification, for laboratory research use only.'
const DESCRIPTION =
  'L-Carnitine Spray delivers L-carnitine, also called levocarnitine, a small quaternary ammonium compound rather than a peptide, with one stereocenter whose L-form is the (R)-enantiomer. Its formula is C7H15NO3, average molecular weight 161.20 g/mol, exact mass 161.1052 Da, CAS 541-15-1, PubChem CID 10917. Related forms, including the hydrochloride and L-tartrate salts and acetyl-L-carnitine, each carry a different formula weight and CAS number, so the exact form matters for any mass-based calculation. Offered as a 400 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is L-Carnitine Spray?'),
    p('L-Carnitine Spray is Veracue’s spray-dispensed packaging of L-carnitine (levocarnitine), a small quaternary ammonium compound with the formula C7H15NO3. The underlying molecule is identical to the one documented on Veracue’s L-Carnitine vial listing; only the packaging and dispensing format differ between the two listings.', { links: LCARNITINE_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('L-Carnitine at a Glance'),
    kvTable([
      ['Product name', 'L-Carnitine Spray (molecule also written levocarnitine)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Chemical type', 'Small molecule, not a peptide'],
      ['Molecular formula', 'C7H15NO3'],
      ['Molecular weight (average)', '161.20 g/mol'],
      ['Exact mass', '161.1052 Da, calculated'],
      ['CAS Registry Number', '541-15-1'],
      ['PubChem CID', '10917'],
      ['Stereochemistry', 'One stereocenter; the L-form is the (R)-enantiomer'],
      ['Size offered', '400 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists L-Carnitine in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What L-Carnitine Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the L-Carnitine documented on the vial listing.',
      'Not interchangeable with acetyl-L-carnitine, the hydrochloride or the tartrate, which have their own formulas and weights.',
      'Not a consumer, dietary or cosmetic product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('L-Carnitine Spray and Veracue’s L-Carnitine vial listing describe one molecule: a zwitterionic quaternary ammonium compound, systematic name (R)-3-carboxy-2-hydroxy-N,N,N-trimethyl-1-propanaminium, inner salt, InChIKey PHIQHXFUZVPYII-ZCFIWIBFSA-N. Packaging format has no bearing on formula, mass or stereochemistry, so these values are identical across both listings.', { links: LCARNITINE_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same levocarnitine reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('L-Carnitine vs. Related Forms'),
    table(
      ['Form', 'Formula', 'Molecular weight', 'CAS'],
      [
        ['L-Carnitine (levocarnitine)', 'C7H15NO3', '161.20 g/mol', '541-15-1'],
        ['L-Carnitine hydrochloride', 'C7H16ClNO3', '197.66 g/mol', '6645-46-1'],
        ['L-Carnitine L-tartrate (2:1)', 'C18H36N2O12', '472.49 g/mol', '36687-82-8'],
        ['Acetyl-L-carnitine', 'C9H17NO4', '203.24 g/mol', '3040-38-8'],
      ],
    ),
    p('These figures hold regardless of packaging format. Salts and derivatives have their own formulas and weights, so a molecular weight alone cannot tell you which form a material is, and a spray-format lot is verified against the same free-molecule reference values as a vial-format lot.'),

    h4('Transport Pathway Context'),
    h5('What role does carnitine play in mitochondrial fatty-acid transport?'),
    p('Long-chain fatty acyl groups cannot cross the inner mitochondrial membrane unassisted, so the carnitine shuttle moves them across in a three-step relay: CPT1 forms an acylcarnitine at the outer membrane, CACT (carnitine-acylcarnitine translocase) exchanges it for free carnitine across the inner membrane, and CPT2 returns the acyl group to coenzyme A inside the matrix. L-Carnitine, in either packaging format Veracue offers, is studied as a reference compound within this pathway.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by formula or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for L-Carnitine Spray are established the same way as for any L-Carnitine lot: an identity method such as titration, HPLC or mass spectrometry, with the result tied to the stated chemical form. Peptide-style checks such as sequence confirmation do not apply here, since L-Carnitine is a single small molecule rather than an amino acid chain.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same formula and mass references, listed on the L-Carnitine at a Glance table above.'),
    table(
      ['COA field', 'What to look for'],
      [
        ['Material identity', 'The name and CAS number should match the compound you intend to use.'],
        ['Form / salt', 'Free L-carnitine, the hydrochloride, the tartrate and acetyl-L-carnitine have different formulas. Confirm which one the certificate describes.'],
        ['Lot number', 'It should match the lot on your spray-top bottle or order.'],
        ['Assay or purity, if reported', 'Note the value, the basis it is reported on (as received or anhydrous) and whether a specification appears beside it.'],
        ['Analytical method', 'The certificate should name the method actually used, such as titration, HPLC or mass spectrometry.'],
        ['Testing date and laboratory', 'Confirm when the analysis was done and who performed it, if reported.'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the spray-top bottle and the order record for the unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, assay or purity result with its method, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with an identity result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('L-Carnitine, its hydrochloride, its tartrate and acetyl-L-carnitine share overlapping names but not one formula weight. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('L-Carnitine Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is L-Carnitine Spray?',
    answer: 'L-Carnitine Spray is Veracue’s spray-dispensed packaging of L-carnitine (levocarnitine), a small quaternary ammonium compound with the formula C7H15NO3 and an average molecular weight of 161.20 g/mol.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in L-Carnitine Spray different from the L-Carnitine vial listing?',
    answer: 'No. Both listings describe the same compound: formula C7H15NO3, average molecular weight 161.20 g/mol, CAS 541-15-1, PubChem CID 10917. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for L-Carnitine?',
    answer: 'The CAS number is 541-15-1 and the PubChem CID is 10917, the same identifiers that apply to L-Carnitine regardless of packaging format.',
  },
  {
    question: 'Is L-Carnitine Spray a peptide?',
    answer: 'No. L-Carnitine is a single small molecule with no amino acid chain or peptide bonds, in either packaging format Veracue offers.',
  },
  {
    question: 'Is L-Carnitine Spray the same as acetyl-L-carnitine?',
    answer: 'No. Acetyl-L-carnitine is the O-acetyl ester of L-carnitine (C9H17NO4, 203.24 g/mol). The two are related through metabolism but are different compounds with separate literature.',
  },
  {
    question: 'Why does Veracue list L-Carnitine in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is L-Carnitine Spray characterized?',
    answer: 'The same way as any L-Carnitine lot: an identity method such as titration, HPLC or mass spectrometry, tied to the stated chemical form. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an L-Carnitine Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the spray-top bottle received, test date and testing laboratory, with an assay or purity result and the method used.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for L-Carnitine Spray?',
    answer: 'No. L-Carnitine Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'L-Carnitine Spray',
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
