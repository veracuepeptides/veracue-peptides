import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Glow Spray: the same three-component research blend documented on the live Glow vial listing
// (scripts/product-import/glow.ts), offered here in Veracue's spray-dispensed packaging format.
// Composition facts (components named, each component's sequence/formula/CAS) are reused unchanged
// from the vial page since it is the same blend; everything else is written fresh and focused on
// what "Spray" means as a packaging/dispensing descriptor for a multi-component product, lot
// verification for this format, and format-specific comparisons. Research-use-only copy only: no
// human-study, clinical, skin/cosmetic or dosing content, consistent with scripts/product-import/glow.ts.
// The owner has not confirmed Glow's exact composition; whatever glow.ts states is treated as the
// single source of truth here and is not second-guessed or changed.

const NAME = 'Glow Spray'
const SLUG = 'glow-spray'

const SKU_CODE = 'GLOW-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '70mg', image: 'VERACUE_Spray_Glow_70mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GLOW_LINK = [{ phrase: 'Glow vial listing', href: '/product/glow' }]

const SEO_TITLE = 'Glow Spray Research Blend'
const SEO_DESCRIPTION =
  "Glow Spray is Veracue's spray-dispensed packaging of its GHK-Cu, BPC-157 and TB-500 blend, with identity data provided for laboratory research use only."
const DESCRIPTION =
  'Glow Spray is Veracue’s spray-dispensed form of Glow, a research blend most often described as combining three named peptides: GHK-Cu (copper-bound Gly-His-Lys, CAS 89030-95-5), BPC-157 (the 15-residue sequence GEPPPGKPADDAGLV, CAS 137525-51-0) and TB-500 (the fragment Ac-LKKTETQ, CAS 885340-08-9). Because it is a mixture, no single molecular weight or CAS number applies to Glow as a whole; each named component carries its own separate identity. Supplied as a 70 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Glow Spray?'),
    p('Glow Spray is Veracue’s spray-dispensed packaging of Glow, a research blend that combines GHK-Cu, BPC-157 and TB-500 in one container. The underlying composition is identical to the one documented on Veracue’s Glow vial listing; only the packaging and dispensing format differ between the two listings.', { links: GLOW_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Per-component amounts, salt form, carrier and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Glow Spray at a Glance'),
    kvTable([
      ['Product name', 'Glow Spray'],
      ['Type', 'Multi-component research blend'],
      ['Components named', 'GHK-Cu, BPC-157, TB-500'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Size offered', '70 mg'],
      ['CAS number for the blend', 'None; each component has its own'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Blend?'),
    p('Veracue lists Glow in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Glow Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a single peptide, and not a substance with its own molecular weight or CAS number.',
      'Not a different blend from the Glow documented on the vial listing.',
      'Not the same as KLOW, a related blend that should be compared at the composition level, not by name.',
      'Not a consumer, dietary or cosmetic product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Component Identity, Carried Over From the Vial Listing'),
    p('Glow Spray and Veracue’s Glow vial listing describe the same three named components: GHK-Cu, BPC-157 and TB-500. Packaging format has no bearing on sequence, formula or mass, so the identifiers below are identical across both listings.', { links: GLOW_LINK }),
    table(
      ['Component', 'Sequence or structure', 'Formula', 'CAS', 'Also listed as'],
      [
        ['GHK-Cu', 'Gly-His-Lys coordinated to Cu(II)', 'C14H22CuN6O4 (complex)', '89030-95-5 (complex); 49557-75-7 (free peptide)', 'Copper Tripeptide-1, Cu-GHK'],
        ['BPC-157', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV), 15 residues', 'C62H98N16O22', '137525-51-0', 'Body Protection Compound-157, PL 14736, Bepecin'],
        ['TB-500', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln (Ac-LKKTETQ), 7 residues', 'C38H68N10O14', '885340-08-9', 'Thymosin beta-4 fragment (17-23)'],
      ],
    ),
    h5('Does the spray format change the blend?'),
    p('No. The three components reported under this listing are the same GHK-Cu, BPC-157 and TB-500 reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not the identity of what is combined.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers, and it matters more for a blend than for a single peptide, since a packaging claim could otherwise be mistaken for a statement about ratio or concentration of any one component.'),

    h4('Why Doesn’t Glow Have One Molecular Weight?'),
    p('Glow is a mixture, not a single molecule, so it is not assigned one CAS number, one molecular formula, or one molecular weight regardless of packaging format. Each named component carries its own separate identity, listed in the table above, and that stays true whether the blend is packaged as a vial or as a spray-dispensed container.'),

    h4('Glow Spray vs. KLOW'),
    p('Glow and KLOW are both supplier naming conventions rather than fixed chemical definitions. Some descriptions present KLOW as Glow with KPV added, but formulations sold under either name can differ between suppliers. The two should be compared by stated composition, not by name alone, and that comparison applies equally to this spray-dispensed listing and to the vial listing.'),

    h4('TB-500 Identity Note'),
    h5('Which TB-500 is in Glow Spray?'),
    p('TB-500 is the most ambiguous name among the three components. The defined entity is the seven-residue acetylated fragment Ac-LKKTETQ, about 889 Da, the actin-binding motif of thymosin beta-4 (residues 17 to 23). Full-length thymosin beta-4 is a different molecule, a 43-residue protein of roughly 4963 Da. Material sold as TB-500 is sometimes the fragment and sometimes the full protein, and the mass spectrometry result on a lot certificate is what settles which species is present, regardless of packaging format.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name each component precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization for a Blend'),
    p('Identity and purity for Glow Spray are established the same way as for any Glow lot: reverse-phase HPLC to see how detected signal spreads across the three component peaks, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that each observed mass is consistent with the expected component. A single overall purity figure is the least informative way a blend can be documented, since it leaves open which peak belongs to which component and whether any one of them is short.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same blend are verified against the same component sequences, formulas and masses listed on the Glow Spray at a Glance table and the component identity table above.'),
    table(
      ['COA element', 'What it establishes for a blend', 'What it does not establish'],
      [
        ['HPLC purity, single figure', 'Share of detected signal in the main peaks under stated conditions', 'Which component each peak is, or whether the ratio matches the label'],
        ['HPLC with per-component assignment', 'Separation and relative area of each named component, if the method is validated for this blend', 'Absolute amount of each component without reference standards'],
        ['LC-MS or ESI-MS', 'Whether observed masses are consistent with each expected component', 'Purity, ratio, or how much material is present'],
        ['Copper content', 'Whether copper is present at the expected ratio to the GHK peptide', 'Purity of the peptide portion'],
        ['Lot number and test date', 'That the report belongs to the container in hand', 'Anything at all, unless it matches the label'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a blend in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, each component’s chemical form, HPLC result with per-component assignment where available, mass spectrometry result with observed and theoretical mass for each component, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated components, and is each purity figure paired with a mass result for the same component from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Does 70 mg mean 70 mg of peptide?'),
    p('Not necessarily. Synthetic peptides are normally supplied as acetate or trifluoroacetate salts, and residual counterion and water are part of the weighed mass. Net peptide content is the figure that answers this question, and it belongs on the lot certificate rather than the catalog listing.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, each component’s stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Glow Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Glow Spray?',
    answer: 'Glow Spray is Veracue’s spray-dispensed packaging of Glow, a research blend that combines GHK-Cu, BPC-157 and TB-500 in one container.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the blend in Glow Spray different from the Glow vial listing?',
    answer: 'No. Both listings name the same three components: GHK-Cu (CAS 89030-95-5), BPC-157 (CAS 137525-51-0) and TB-500 (CAS 885340-08-9). Only the packaging format differs.',
  },
  {
    question: 'Is Glow Spray a single peptide or a blend?',
    answer: 'A blend. Each named component has its own sequence, molecular weight and CAS number, so Glow Spray has no single CAS number or molecular weight of its own, regardless of packaging format.',
  },
  {
    question: 'What is the CAS number for each component in Glow Spray?',
    answer: 'GHK-Cu is CAS 89030-95-5 (complex form), BPC-157 is CAS 137525-51-0, and TB-500 is CAS 885340-08-9, the same identifiers that apply to the Glow vial listing.',
  },
  {
    question: 'Which TB-500 is in Glow Spray, the fragment or the full protein?',
    answer: 'The defined entity TB-500 is the acetylated heptapeptide Ac-LKKTETQ at about 889 Da, while full-length thymosin beta-4 is a 43-residue protein of roughly 4963 Da. The species supplied is reported on each lot’s documentation, and the observed mass on the certificate distinguishes them.',
  },
  {
    question: 'How is Glow Spray different from KLOW?',
    answer: 'Glow and KLOW are both supplier naming conventions, not fixed chemical definitions. Some descriptions present KLOW as Glow with KPV added, but formulations sold under either name can differ between suppliers, so composition should be compared directly rather than by name.',
  },
  {
    question: 'Why does Veracue list Glow in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Glow Spray characterized?',
    answer: 'The same way as any Glow lot: reverse-phase HPLC to see how signal spreads across the three component peaks, and mass spectrometry to confirm each observed mass against its expected component. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Glow Spray certificate of analysis include?',
    answer: 'It should name each component, state the chemical form for each, show HPLC results with per-component assignment where available, pair mass spectrometry results with observed and theoretical mass per component, and list the lot number, test date and testing laboratory.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Glow Spray?',
    answer: 'No. Glow Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Glow Spray',
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
