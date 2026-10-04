import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GHK-Cu Spray: the same copper(II) tripeptide complex documented on the live GHK-Cu vial listing
// (scripts/product-import/ghk-cu.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, molecular weight, CAS numbers) are reused unchanged
// from the vial page since it is the same compound; everything else is written fresh and focused on
// what "Spray" means as a packaging/dispensing descriptor, lot verification for this format, and
// format-specific comparisons. Research-use-only copy only, at the molecular level: no skin, hair,
// wound, collagen or human-study framing, and no dosing content beyond the one allowed negation,
// consistent with scripts/product-import/ghk-cu.ts.

const NAME = 'GHK-Cu Spray'
const SLUG = 'ghk-cu-spray'

const SKU_CODE = 'GHKCU-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '50mg', image: 'VERACUE_Spray_GHK_Cu_50mg.jpg' },
  { strength: '100mg', image: 'VERACUE_Spray_GHK_Cu_100mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GHKCU_LINK = [{ phrase: 'GHK-Cu vial listing', href: '/product/ghk-cu' }]

const SEO_TITLE = 'GHK-Cu Spray Research Peptide'
const SEO_DESCRIPTION =
  "GHK-Cu Spray packages the copper-tripeptide complex from Veracue's GHK-Cu listing, with identity data and lot checks for laboratory research use only."
const DESCRIPTION =
  'GHK-Cu Spray delivers GHK-Cu, the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine, also known as Copper Tripeptide-1 or prezatide copper. Copper binds through nitrogen donors from the glycine terminus and the histidine side chain in a standard 1:1 complex, formula C14H22CuN6O4, about 401.91 g/mol, CAS 89030-95-5; the free peptide GHK carries its own separate CAS, 49557-75-7. Several documented forms of this complex exist, so confirm which one a certificate reports before comparing masses. Available in 50 mg and 100 mg for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is GHK-Cu Spray?'),
    p('GHK-Cu Spray is Veracue’s spray-dispensed packaging of GHK-Cu, the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine (Gly-His-Lys). The underlying molecule is identical to the one documented on Veracue’s GHK-Cu vial listing; only the packaging and dispensing format differ between the two listings.', { links: GHKCU_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, copper content, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('GHK-Cu Spray at a Glance'),
    kvTable([
      ['Product name', 'GHK-Cu Spray'],
      ['Other names', 'Copper Tripeptide-1; prezatide copper; glycyl-L-histidyl-L-lysine copper(II)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Peptide sequence', 'Gly-His-Lys (G-H-K), three amino acids'],
      ['Metal', 'Copper(II), one ion per peptide in the standard 1:1 complex'],
      ['Neutral 1:1 complex formula', 'C14H22CuN6O4'],
      ['Molecular weight (neutral 1:1 complex)', 'About 401.91 g/mol'],
      ['Copper complex CAS', '89030-95-5'],
      ['Free peptide (GHK) CAS', '49557-75-7'],
      ['Sizes offered', '50 mg and 100 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists GHK-Cu in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What GHK-Cu Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the GHK-Cu documented on the vial listing.',
      'Not the same as GHK, which is the bare tripeptide without copper.',
      'Not the same as AHK-Cu, a related copper tripeptide that starts with alanine instead of glycine.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('GHK-Cu Spray and Veracue’s GHK-Cu vial listing describe one molecule: the copper(II) complex of glycyl-L-histidyl-L-lysine, with copper binding through nitrogen donors from the glycine terminus and the histidine side chain. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: GHKCU_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same copper tripeptide complex reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Why Do Molecular Weight Values Differ for GHK-Cu?'),
    p('Several distinct species are catalogued under the GHK-Cu name, each with its own formula and mass. The table below lists the two most commonly cited; the GHK-Cu vial listing carries the full set of documented representations, including the cationic form and the acetate salt.', { links: GHKCU_LINK }),
    table(
      ['Representation', 'Formula', 'MW (g/mol)', 'CAS or source'],
      [
        ['Free tripeptide, no copper (GHK)', 'C14H24N6O4', '340.38', 'CAS 49557-75-7'],
        ['Neutral 1:1 Cu(II) complex', 'C14H22CuN6O4', '401.91', 'CAS 89030-95-5; the value most research suppliers quote'],
      ],
    ),
    p('A catalog value or COA figure only means something once it is checked against the species it describes. Packaging format, spray or vial, does not change which species a given lot actually is; that is an analytical question, not a packaging one.'),

    h4('GHK-Cu vs. AHK-Cu'),
    table(
      ['Feature', 'GHK-Cu', 'AHK-Cu'],
      [
        ['First residue', 'Glycine', 'Alanine'],
        ['Full sequence', 'Gly-His-Lys', 'Ala-His-Lys'],
        ['Metal', 'Copper(II), 1:1 standard complex', 'Copper(II), 1:1 standard complex'],
        ['Ingredient name', 'Copper Tripeptide-1', 'Copper Tripeptide-3'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('The two are often mixed up on supplier pages, and findings reported for one should not be attributed to the other. This table compares molecular structure only; catalog format is listed separately because it is a packaging detail, not a property of the molecule itself.'),

    h4('Receptor Context'),
    h5('What is the proposed mechanism?'),
    p('In 1980 Pickart and colleagues proposed in a Nature paper that the peptide works largely by shuttling copper into cells. That copper-transport framing is still where most mechanistic work starts. It is a laboratory-model proposal about copper handling, and it says nothing about any particular product or packaging format.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence, formula or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for GHK-Cu Spray are established the same way as for any GHK-Cu lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value for the species named. Copper complexes make the identity question sharper than it is for ordinary peptides, because the free peptide and the various copper-bound species carry different masses.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the GHK-Cu Spray at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with the named species', 'Which species was tested; purity'],
        ['Copper content testing', 'Whether copper is present at the expected ratio', 'Purity of the peptide portion'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, stated chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where copper content or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule and species, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated for a copper complex?'),
    p('GHK-Cu, the free peptide GHK, and other copper-bound species circulate under overlapping names but carry different formula weights. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),

    h4('Want the paperwork for a GHK-Cu Spray lot?'),
    p('Ask the Veracue team for the documentation that belongs to a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GHK-Cu Spray is supplied for laboratory research and analytical characterization only. It is not a drug, cosmetic, dietary supplement or food, and it is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHK-Cu Spray?',
    answer: 'GHK-Cu Spray is Veracue’s spray-dispensed packaging of GHK-Cu, the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine (Gly-His-Lys).',
  },
  {
    question: 'Does "Spray" mean this product is for nasal or topical use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in GHK-Cu Spray different from the GHK-Cu vial listing?',
    answer: 'No. Both listings describe the same compound: the neutral 1:1 copper(II) complex, formula C14H22CuN6O4, about 401.91 g/mol, CAS 89030-95-5. Only the packaging format differs.',
  },
  {
    question: 'Is GHK the same as GHK-Cu?',
    answer: 'No. GHK is the free tripeptide, C14H24N6O4, 340.38 g/mol, CAS 49557-75-7. GHK-Cu is the copper complex, CAS 89030-95-5, about 401.91 g/mol for the neutral 1:1 form.',
  },
  {
    question: 'What is the CAS number for GHK-Cu?',
    answer: 'The copper complex is registered as CAS 89030-95-5, the same identifier that applies regardless of packaging format. The free peptide GHK carries a separate number, CAS 49557-75-7.',
  },
  {
    question: 'Why do sources list different molecular weights for GHK-Cu?',
    answer: 'Several distinct species are catalogued under the GHK-Cu name, including the free peptide at 340.38 g/mol and the neutral 1:1 copper complex at 401.91 g/mol. A catalog value only applies once matched to the species it describes, regardless of packaging format.',
  },
  {
    question: 'What is the difference between GHK-Cu and AHK-Cu?',
    answer: 'One amino acid. GHK-Cu starts with glycine and AHK-Cu starts with alanine, which gives them separate CAS numbers and ingredient names, Copper Tripeptide-1 and Copper Tripeptide-3 respectively.',
  },
  {
    question: 'Why does Veracue list GHK-Cu in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is GHK-Cu Spray characterized?',
    answer: 'The same way as any GHK-Cu lot: reverse-phase HPLC for purity and mass spectrometry for identity, with copper content testing and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a GHK-Cu Spray certificate of analysis include?',
    answer: 'It should state product identity, stated chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass for the named species.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHK-Cu Spray?',
    answer: 'No. GHK-Cu Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHK-Cu Spray',
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
