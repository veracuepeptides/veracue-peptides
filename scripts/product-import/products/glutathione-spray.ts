import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Glutathione Spray: the same reduced-glutathione (GSH) tripeptide documented on the live Glutathione
// vial listing (scripts/product-import/glutathione.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (composition, formula, mass, CAS, PubChem CID, assumed
// reduced GSH form) are reused unchanged from the vial page since it is the same compound; everything
// else is written fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot
// verification for this format, and format-specific comparisons. Research-use-only copy only: no
// human trial, dosing, antioxidant-health-outcome, or tolerability content, consistent with
// scripts/product-import/glutathione.ts.

const NAME = 'Glutathione Spray'
const SLUG = 'glutathione-spray'

const SKU_CODE = 'GLUT-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '600mg', image: 'VERACUE_Spray_Glutathione_600mg.jpg' },
  { strength: '1500mg', image: 'VERACUE_Spray_Glutathione_1500mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GLUTATHIONE_LINK = [{ phrase: 'Glutathione vial listing', href: '/product/glutathione' }]

const SEO_TITLE = 'Glutathione Spray Peptide (GSH)'
const SEO_DESCRIPTION =
  'Veracue packages the GSH tripeptide Glutathione as a lab-ready spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'Glutathione Spray supplies reduced L-glutathione (GSH), chemical name gamma-L-glutamyl-L-cysteinyl-glycine, a tripeptide built from glutamate, cysteine and glycine with a free thiol on the cysteine residue. Its formula is C10H17N3O6S, molecular weight 307.32 g/mol, CAS 70-18-8, PubChem CID 124886. The oxidized counterpart, GSSG, is a chemically distinct molecule with roughly twice the mass and its own separate CAS number, so the exact form should always be confirmed on a lot’s documentation. Offered in 600 mg and 1500 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Glutathione Spray?'),
    p('Glutathione Spray is Veracue’s spray-dispensed packaging of Glutathione, a tripeptide built from L-glutamate, L-cysteine and glycine. The underlying molecule is identical to the one documented on Veracue’s Glutathione vial listing, assumed in both cases to be the reduced form (GSH, the thiol form) unless a lot’s own documentation states otherwise; only the packaging and dispensing format differ between the two listings.', { links: GLUTATHIONE_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Glutathione at a Glance'),
    kvTable([
      ['Product name', 'Glutathione Spray (reduced L-glutathione, GSH)'],
      ['Chemical name', 'gamma-L-Glutamyl-L-cysteinyl-glycine (reduced)'],
      ['Class', 'Tripeptide; thiol-containing small molecule'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Molecular formula', 'C10H17N3O6S'],
      ['Molecular weight', '307.32 g/mol'],
      ['CAS Registry Number', '70-18-8'],
      ['PubChem CID', '124886'],
      ['Redox form', 'Reduced (free thiol, -SH)'],
      ['Stereochemistry', 'L-amino acid configuration throughout'],
      ['Sizes offered', '600 mg and 1500 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These identifiers describe reduced glutathione as a reference structure. They are not a statement about salt or counterion form, physical form, purity, lot results or storage conditions. Those are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Glutathione in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Glutathione Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not the same compound as oxidized glutathione (GSSG), which has a different formula, mass and CAS number.',
      'Not a conventional long-chain synthetic peptide. At 307.32 g/mol it is much smaller, and its gamma-glutamyl bond is unusual.',
      'Not a consumer, dietary or cosmetic product, and not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Glutathione Spray and Veracue’s Glutathione vial listing describe one molecule: a tripeptide of L-glutamate, L-cysteine and glycine joined by a gamma-glutamyl linkage and a standard peptide bond, with a free thiol (-SH) on the cysteine residue. Packaging format has no bearing on composition, formula or mass, so these values are identical across both listings.', { links: GLUTATHIONE_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same reduced glutathione (GSH) reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Reduced Glutathione (GSH) vs. Oxidized Glutathione (GSSG)'),
    p('GSSG forms when two GSH molecules are joined by a disulfide bond between their cysteine residues during oxidation. The result is a different molecule with roughly twice the mass, a different formula and a different CAS number. A document that says only "glutathione" and gives no CAS number leaves the form open, and this applies to a spray-format lot exactly as it applies to a vial.'),
    table(
      ['Attribute', 'Reduced glutathione (GSH)', 'Oxidized glutathione (GSSG)'],
      [
        ['Molecular formula', 'C10H17N3O6S', 'C20H32N6O12S2'],
        ['Molecular weight', '307.32 g/mol', '612.63 g/mol'],
        ['CAS number', '70-18-8', '27025-41-8'],
        ['Redox form', 'Reduced (free thiol, -SH)', 'Oxidized (disulfide, -S-S-)'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not currently listed'],
      ],
    ),
    p('This table compares molecular identity only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which redox state a given lot actually contains.'),

    h4('Biochemical Context'),
    h5('What role does the thiol group play in biochemical assays?'),
    p('The free thiol on the cysteine residue is the redox-active site of the molecule. Glutathione peroxidases use GSH to reduce hydrogen peroxide and lipid peroxides, becoming GSSG in the process, and glutathione reductase converts GSSG back to two GSH molecules using NADPH. Glutathione S-transferases separately conjugate GSH to electrophilic compounds, a pathway studied in drug-metabolism research. Glutathione, in either packaging format Veracue offers, is studied as a reference compound in these enzyme systems.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by formula or CAS number and state the redox form tested, then separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Glutathione Spray are established the same way as for any Glutathione lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically LC-MS or ESI-MS) to confirm that the observed mass matches the molecule’s theoretical value for the stated redox form. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, and it cannot tell GSH from GSSG without a mass result or reference standard.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same formula and mass references, listed on the Glutathione at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity, or whether the sample is GSH or GSSG'],
        ['LC-MS or ESI-MS', 'Mass consistent with GSH (307.32) or GSSG (612.63)', 'Purity'],
        ['MS/MS fragmentation', 'Structural confirmation from fragment ions', 'A standalone purity measurement'],
        ['Electrochemical or UV assay kits', 'Thiol redox activity in solution', 'Specificity without chromatography; not designed for raw material purity'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received, and confirm which redox form the certificate actually covers.'),
    p('A complete certificate separates product identity, lot number, redox form and CAS number, HPLC result, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated redox form, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the redox form still need to be stated?'),
    p('GSH and GSSG share a chemical relationship but carry different formulas, masses and CAS numbers. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching molecular weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated redox form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Glutathione Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. It is not a drug, dietary supplement, cosmetic or food. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Glutathione Spray?',
    answer: 'Glutathione Spray is Veracue’s spray-dispensed packaging of Glutathione, a tripeptide of L-glutamate, L-cysteine and glycine, supplied for laboratory research use only.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Glutathione Spray different from the Glutathione vial listing?',
    answer: 'No. Both listings describe the same compound: reduced glutathione (GSH), formula C10H17N3O6S, average molecular weight 307.32 g/mol, CAS 70-18-8. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Glutathione?',
    answer: 'The CAS number for reduced glutathione (GSH) is 70-18-8 and the PubChem CID is 124886, the same identifiers that apply regardless of packaging format. Oxidized glutathione (GSSG) carries a different CAS number, 27025-41-8.',
  },
  {
    question: 'Is Glutathione the same as GSSG?',
    answer: 'No. GSH is the reduced, free-thiol form of glutathione. GSSG is the oxidized disulfide formed when two GSH molecules join at their cysteine residues, with its own formula, mass and CAS number.',
  },
  {
    question: 'What enzymes come up around Glutathione in research?',
    answer: 'Glutathione peroxidases use GSH to reduce peroxides, glutathione reductase recycles GSSG back to GSH using NADPH, and glutathione S-transferases conjugate GSH to electrophilic compounds. These are biochemical roles studied at the molecular and cellular level.',
  },
  {
    question: 'Why does Veracue list Glutathione in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Glutathione Spray characterized?',
    answer: 'The same way as any Glutathione lot: reverse-phase HPLC for purity and mass spectrometry to confirm the mass matches the stated redox form. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Glutathione Spray certificate of analysis include?',
    answer: 'It should state the redox form and CAS number, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Glutathione Spray?',
    answer: 'No. Glutathione Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Glutathione Spray',
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
