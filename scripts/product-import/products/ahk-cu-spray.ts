import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// AHK-Cu Spray: the same copper(II) tripeptide-3 complex documented on the live AHK-Cu vial listing
// (scripts/product-import/ahk-cu.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, the form-dependent molecular weight table, CAS note) are reused
// unchanged from the vial page since it is the same compound; everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this format,
// and format-specific comparisons. Research-use-only copy only: no human trial, cosmetic/outcome, or
// dosing content, consistent with scripts/product-import/ahk-cu.ts. Mined docs/product-contents-2/
// veracue-ahk-cu-spray-page-v2.json for structure only; its hair-growth study, evidence tables, clinical
// framing and references are intentionally left out to match site policy.

const NAME = 'AHK-Cu Spray'
const SLUG = 'ahk-cu-spray'

const SKU_CODE = 'AHKCU-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '50mg', image: 'VERACUE_Spray_AHK_Cu_50mg.jpg' },
  { strength: '100mg', image: 'VERACUE_Spray_AHK_Cu_100mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const AHKCU_LINK = [{ phrase: 'AHK-Cu vial listing', href: '/product/ahk-cu' }]

const SEO_TITLE = 'AHK-Cu Spray Research Peptide'
const SEO_DESCRIPTION =
  "Veracue packages AHK-Cu, the copper tripeptide-3 complex, in a spray-dispensed research format, with identity data for laboratory research use only."
const DESCRIPTION =
  'AHK-Cu Spray is Veracue’s spray-dispensed format of AHK-Cu, the copper(II) complex of the tripeptide alanine-histidine-lysine, also catalogued as Copper Tripeptide-3. It differs from its better-known relative GHK-Cu by a single amino acid at the first position, and its reported molecular weight depends on which form a source describes, since several related representations circulate under the same CAS number, 682809-81-0. Confirm the exact form on a lot’s own documentation before relying on any single mass figure. Offered in 50 mg and 100 mg for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is AHK-Cu Spray?'),
    p('AHK-Cu Spray is Veracue’s spray-dispensed packaging of AHK-Cu, a copper(II) complex of the tripeptide alanine-histidine-lysine. The underlying molecule is identical to the one documented on Veracue’s AHK-Cu vial listing; only the packaging and dispensing format differ between the two listings.', { links: AHKCU_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Molecular form, formula, concentration and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('AHK-Cu at a Glance'),
    kvTable([
      ['Product name', 'AHK-Cu Spray (compound also listed as Copper Tripeptide-3)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Peptide sequence', 'Ala-His-Lys (A-H-K), three amino acids'],
      ['Metal', 'Copper(II)'],
      ['Closest relative', 'GHK-Cu (Gly-His-Lys copper), differing only in the first amino acid'],
      ['Molecular weight', 'Form-dependent, see the molecular form table'],
      ['CAS Registry Number', '682809-81-0 (widely listed; see note below)'],
      ['Sizes offered', '50 mg and 100 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists AHK-Cu in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What AHK-Cu Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the AHK-Cu documented on the vial listing.',
      'Not the same as GHK-Cu, which starts with glycine instead of alanine.',
      'Not the same as the free AHK peptide, which has no copper.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('AHK-Cu Spray and Veracue’s AHK-Cu vial listing describe one molecule: the tripeptide alanine-histidine-lysine bound to a copper(II) ion through nitrogen atoms of the alanine terminus and the histidine residue. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: AHKCU_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same AHK-Cu reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),
    h5('Why do published molecular weights for AHK-Cu differ?'),
    p('There is no single molecular weight for AHK-Cu that applies to every product, regardless of packaging. Published values differ because sources describe different forms: the free peptide, the copper complex written with different proton counts, or a hydrochloride salt. The table below, carried over unchanged from the vial listing, shows how each common representation produces a different number.'),
    table(
      ['Representation', 'Formula', 'Molecular weight (g/mol)', 'Where you will see it'],
      [
        ['Uncomplexed tripeptide (AHK, no copper)', 'C15H26N6O4', '354.41', 'Peptide-only calculations'],
        ['Neutral Cu(II) complex, two N-H protons removed', 'C15H24CuN6O4', '415.94', 'Some catalogue listings (about 416)'],
        ['Cu(II) complex written with one additional proton', 'C15H25CuN6O4', '416.95', 'Common "about 416.9" listing value'],
        ['Hydrochloride form, PubChem CID 168431292 formula', 'C15H24ClCuN6O4', '451.39', 'PubChem and several supplier pages'],
        ['Hydrochloride form, alternative hydrogen count', 'C15H25ClCuN6O4', '452.40', 'Some chemical supplier listings'],
      ],
    ),
    p('The molecular form, formula and molecular weight for a given lot of either packaging format are reported on that lot’s documentation and can be requested through the contact page.', { links: CONTACT }),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('AHK-Cu vs. GHK-Cu'),
    table(
      ['Attribute', 'AHK-Cu', 'GHK-Cu'],
      [
        ['Sequence', 'Ala-His-Lys + Cu(II)', 'Gly-His-Lys + Cu(II)'],
        ['Common ingredient name', 'Copper Tripeptide-3', 'Copper Tripeptide-1'],
        ['First amino acid', 'Alanine', 'Glycine'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and packaging options only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and findings reported for one compound should not be assumed to apply to the other.'),

    h4('Research Context'),
    h5('Where is AHK-Cu used in the laboratory?'),
    p('Typical contexts are cell-culture and tissue-culture work, copper-peptide chemistry and analytical method development. The material is offered for in vitro and laboratory research only, in either packaging format Veracue carries.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence, formula or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for AHK-Cu Spray are established the same way as for any AHK-Cu lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or LC-MS) to confirm that the observed mass matches the molecular form a report claims. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, and it does not establish copper content.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence and molecular-weight references, listed on the AHK-Cu at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity; copper content'],
        ['ESI-MS / LC-MS', 'Mass consistent with a stated AHK-Cu form', 'Which species was intended; purity'],
        ['Copper content assay (if tested)', 'Whether copper is present at the expected ratio to peptide', 'Purity of the peptide portion'],
        ['Net peptide content', 'How much of a lot’s mass is peptide rather than salts or water', 'Chromatographic purity'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, stated molecular form, HPLC result, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecular form, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the molecular form still need to be stated?'),
    p('AHK-Cu can be reported as the free peptide, the neutral copper complex, or a hydrochloride salt, and these forms carry different formula weights, from 354.41 up to 452.40 g/mol. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated molecular form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('AHK-Cu Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. Veracue provides no dosing guidance for this or any research material. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is AHK-Cu Spray?',
    answer: 'AHK-Cu Spray is Veracue’s spray-dispensed packaging of AHK-Cu, a copper(II) complex of the tripeptide alanine-histidine-lysine, commonly listed as Copper Tripeptide-3.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal or topical use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in AHK-Cu Spray different from the AHK-Cu vial listing?',
    answer: 'No. Both listings describe the same compound, with the same sequence and the same form-dependent molecular weight range. Only the packaging format differs.',
  },
  {
    question: 'Why do sources list different molecular weights for AHK-Cu?',
    answer: 'Because they describe different forms. The free AHK peptide is about 354.41 g/mol, the copper complex about 415.94 to 416.95 g/mol depending on how protons are counted, and the hydrochloride form about 451.39 to 452.40 g/mol. The correct value is the one matching the form stated on a lot’s documentation, regardless of packaging.',
  },
  {
    question: 'What is the CAS number for AHK-Cu?',
    answer: 'CAS 682809-81-0 is widely listed by suppliers, and at least one chemical supplier assigns it specifically to the hydrochloride while listing a separate CAS for the free base. A CAS number is only meaningful when it is tied to the exact documented form.',
  },
  {
    question: 'Is AHK-Cu the same as GHK-Cu?',
    answer: 'No. They share the histidine-lysine end and both bind copper, but AHK-Cu starts with alanine and GHK-Cu starts with glycine. Findings for one should not be applied to the other.',
  },
  {
    question: 'Does Veracue offer GHK-Cu in a spray format too?',
    answer: 'Yes. Veracue carries GHK-Cu in both a vial listing and a spray-dispensed listing, the same two-format approach used for AHK-Cu.',
  },
  {
    question: 'Why does Veracue list AHK-Cu in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is AHK-Cu Spray characterized?',
    answer: 'The same way as any AHK-Cu lot: reverse-phase HPLC for purity and mass spectrometry for identity against the stated molecular form, with a copper content assay adding further confidence where tested. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an AHK-Cu Spray certificate of analysis include?',
    answer: 'It should state product identity, the stated molecular form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for AHK-Cu Spray?',
    answer: 'No. AHK-Cu Spray is offered for laboratory research use only, and Veracue provides no dosing guidance, administration instructions or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'AHK-Cu Spray',
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
