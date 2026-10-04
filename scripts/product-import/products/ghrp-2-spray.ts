import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GHRP-2 Spray: the same hexapeptide amide molecule documented on the live GHRP-2 vial listing
// (scripts/product-import/ghrp-2.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, molecular weight, CAS, PubChem CID) are reused
// unchanged from the vial page since it is the same compound; everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific comparisons. Research-use-only copy only: no human trial, dosing, or
// tolerability content, consistent with scripts/product-import/ghrp-2.ts.

const NAME = 'GHRP-2 Spray'
const SLUG = 'ghrp-2-spray'

const SKU_CODE = 'GHRP2-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_GHRP_2_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GHRP2_LINK = [{ phrase: 'GHRP-2 vial listing', href: '/product/ghrp-2' }]

const SEO_TITLE = 'GHRP-2 Spray Peptide (GHS-R1a Agonist)'
const SEO_DESCRIPTION =
  "GHRP-2 Spray reuses the verified sequence, formula and CAS data from Veracue's GHRP-2 vial listing, for laboratory research use only."
const DESCRIPTION =
  'GHRP-2 Spray contains GHRP-2, a synthetic hexapeptide amide, sequence D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2, studied as an agonist at the growth hormone secretagogue receptor, GHS-R1a. Its free-base reference values are C45H55N9O6, 817.99 g/mol, CAS 158861-67-7. The sequence shares its receptor target with GHRP-6 and Ipamorelin but is chemically distinct from both, so identity should rest on sequence and CAS rather than name alone. Veracue supplies a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is GHRP-2 Spray?'),
    p(
      'GHRP-2 Spray is Veracue’s spray-dispensed packaging of GHRP-2, a synthetic hexapeptide amide with the sequence D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2 that binds the ghrelin receptor, GHS-R1a, in research systems. The underlying molecule is identical to the one documented on Veracue’s GHRP-2 vial listing; only the packaging and dispensing format differ between the two listings.',
      { links: GHRP2_LINK },
    ),
    p(
      '"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, net peptide content, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.',
      { links: CONTACT },
    ),
    h4('GHRP-2 at a Glance'),
    kvTable([
      ['Product name', 'GHRP-2 Spray (molecule also written Growth Hormone Releasing Peptide-2)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Class', 'Growth hormone secretagogue (GHS), GHRP subfamily'],
      ['Molecular target', 'Growth hormone secretagogue receptor 1a (GHS-R1a), the ghrelin receptor'],
      ['Sequence', 'D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2 (hexapeptide amide)'],
      ['Molecular formula (free-base reference value)', 'C45H55N9O6'],
      ['Molecular weight (free-base reference value)', '817.99 g/mol'],
      ['CAS Registry Number', '158861-67-7'],
      ['Sizes offered', '10 mg only'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Formula and identifiers from the PubChem record (CID 6852372, free base), carried over unchanged from the GHRP-2 vial listing.</em></p>`,
    h4('Why a Separate Listing for the Same Molecule?'),
    p(
      'Veracue lists GHRP-2 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.',
    ),
    h4('What GHRP-2 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the GHRP-2 documented on the vial listing.',
      'Not growth hormone itself, and not GHRP-6, GHRP-1 or hexarelin.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p(
      'GHRP-2 Spray and Veracue’s GHRP-2 vial listing describe one molecule: a six-residue chain capped with a C-terminal amide, built from D-Ala, D-2-Naphthylalanine, Ala, Trp, D-Phe and Lys. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.',
      { links: GHRP2_LINK },
    ),
    h5('Does the spray format change the molecule?'),
    p(
      'No. The compound reported under this listing is the same GHS-R1a-binding hexapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.',
    ),

    h4('What "Spray" Describes, and What It Does Not'),
    p(
      'In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.',
    ),
    p(
      'Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.',
    ),

    h4('GHRP-2 vs. GHRP-6'),
    table(
      ['Attribute', 'GHRP-2', 'GHRP-6'],
      [
        ['Sequence', 'D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2'],
        ['Length', 'Six residues, C-terminal amide', 'Six residues, C-terminal amide'],
        ['Receptor', 'GHS-R1a agonist', 'GHS-R1a agonist'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p(
      'This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given peptide engages.',
    ),

    h4('Receptor Context'),
    h5('What does GHS-R1a do in research systems?'),
    p(
      'GHS-R1a, the growth hormone secretagogue receptor, is a G protein-coupled receptor expressed on pituitary somatotroph cells and is the same receptor that binds ghrelin. GHRP-2, in either packaging format Veracue offers, is studied as a reference ligand at this receptor, distinct from the separate GHRH receptor that growth hormone-releasing hormone analogues engage.',
    ),
    h5('How should format be recorded in a methods section?'),
    p(
      'Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue does not provide dosing guidance of any kind.',
    ),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p(
      'Identity and purity for GHRP-2 Spray are established the same way as for any GHRP-2 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value against C45H55N9O6. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related hexapeptide such as GHRP-6 can produce an equally clean trace.',
    ),
    p(
      'Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the GHRP-2 at a Glance table above.',
    ),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with GHRP-2', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Net peptide content analysis', 'Share of vial mass that is peptide rather than salts or water', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p(
      'A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.',
    ),
    p(
      'A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where net content or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.',
      { links: CERT },
    ),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p(
      'No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.',
    ),
    h5('Why does chemical form still need to be stated?'),
    p(
      'GHRP-2 is typically supplied as the free base, and a salt or counterion form would carry a different molecular weight. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.',
    ),
    h5('What should a procurement record include for this listing?'),
    p(
      'For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.',
    ),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p(
      'GHRP-2 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.',
      {
        links: [
          { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
          { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        ],
      },
    ),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHRP-2 Spray?',
    answer:
      'GHRP-2 Spray is Veracue’s spray-dispensed packaging of GHRP-2, a synthetic hexapeptide amide that binds the ghrelin receptor, GHS-R1a, in research systems. It is supplied for laboratory research use only.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer:
      'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in GHRP-2 Spray different from the GHRP-2 vial listing?',
    answer:
      'No. Both listings describe the same compound: sequence D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2, free-base formula C45H55N9O6, molecular weight 817.99 g/mol, CAS 158861-67-7. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for GHRP-2?',
    answer:
      'The CAS number is 158861-67-7, the same identifier that applies to GHRP-2 regardless of packaging format. The PubChem record for the free base is CID 6852372.',
  },
  {
    question: 'Is GHRP-2 the same as growth hormone?',
    answer:
      'No. Growth hormone is a much larger pituitary protein. GHRP-2 is a synthetic six-residue peptide that activates the ghrelin receptor, GHS-R1a, a separate receptor from the one growth hormone-releasing hormone acts on.',
  },
  {
    question: 'How is GHRP-2 different from GHRP-6?',
    answer:
      'Both are hexapeptide GHS-R1a agonists, but their sequences differ: GHRP-2 is D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2 and GHRP-6 is His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. Veracue offers both as vial and spray formats.',
  },
  {
    question: 'Why does Veracue list GHRP-2 in more than one format?',
    answer:
      'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is GHRP-2 Spray characterized?',
    answer:
      'The same way as any GHRP-2 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a GHRP-2 Spray certificate of analysis include?',
    answer:
      'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'Why does the salt form matter on a GHRP-2 certificate?',
    answer:
      'Free base and acetate forms have different molecular weights, so a mass figure only makes sense when the certificate states which form it refers to.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer:
      'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHRP-2 Spray?',
    answer:
      'No. GHRP-2 Spray is offered for laboratory research use only, and Veracue does not provide dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHRP-2 Spray',
  variants: VARIANTS,
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/pralmorelin/i, /KP-102/i, /GPA-748/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
