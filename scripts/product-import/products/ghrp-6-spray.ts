import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GHRP-6 Spray: the same six-residue hexapeptide documented on the live GHRP-6 vial listing
// (scripts/product-import/ghrp-6.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, mass, CAS, developmental code, receptor target) are
// reused unchanged from the vial page since it is the same compound; everything else is written
// fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification
// for this format, and format-specific comparisons. Research-use-only copy only: no human-study,
// dosing, or appetite/body-weight content, consistent with scripts/product-import/ghrp-6.ts. The
// raw draft in docs/product-contents-2/ghrp6-spray-page.json was mined for structure only; its
// human-trial, appetite/feeding-physiology and dosage-search content was intentionally left out.

const NAME = 'GHRP-6 Spray'
const SLUG = 'ghrp-6-spray'

const SKU_CODE = 'GHRP6-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_GHRP_6_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GHRP6_LINK = [{ phrase: 'GHRP-6 vial listing', href: '/product/ghrp-6' }]

const SEO_TITLE = 'GHRP-6 Spray Research Peptide'
const SEO_DESCRIPTION =
  'Veracue packages GHRP-6, the GHS-R1a-targeting hexapeptide, in a spray-dispensed research format with identity data for laboratory research use only.'
const DESCRIPTION =
  'GHRP-6 Spray supplies GHRP-6, also developed under the code SKF-110679, a synthetic hexapeptide with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 that acts as a reference ligand for GHS-R1a, the ghrelin receptor. Its free-peptide values are C46H56N12O6, 872.45 g/mol average mass, CAS 87616-84-0, with 145177-42-0 listed for an acetate salt form in supplier databases. CD36 has also been reported as a secondary binding target for this sequence. Offered in a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is GHRP-6 Spray?'),
    p('GHRP-6 Spray is Veracue’s spray-dispensed packaging of GHRP-6, a synthetic six-amino-acid peptide built with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. The underlying molecule is identical to the one documented on Veracue’s GHRP-6 vial listing; only the packaging and dispensing format differ between the two listings.', { links: GHRP6_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('GHRP-6 Spray at a Glance'),
    kvTable([
      ['Product name', 'GHRP-6 Spray'],
      ['Reference molecule', 'GHRP-6, also written GHRP 6 (growth hormone-releasing hexapeptide)'],
      ['Developmental code', 'SKF-110679'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2'],
      ['Length', '6 residues, linear hexapeptide, C-terminal amide'],
      ['Molecular formula (free peptide)', 'C46H56N12O6'],
      ['Molecular weight (free peptide)', '872.45 g/mol (average)'],
      ['CAS Registry Number', '87616-84-0 (free peptide); 145177-42-0 listed for the acetate salt in supplier chemical databases'],
      ['Receptor target', 'GHS-R1a (ghrelin receptor)'],
      ['Sizes offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists GHRP-6 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What GHRP-6 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the GHRP-6 documented on the vial listing.',
      'Not the same compound as ghrelin, the endogenous hormone that GHS-R1a naturally responds to.',
      'Not the same compound as GHRP-2, although the two share a receptor.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('GHRP-6 Spray and Veracue’s GHRP-6 vial listing describe one molecule: a C-terminally amidated hexapeptide with two D-amino acids, D-Trp and D-Phe, at positions 2 and 5. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: GHRP6_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same hexapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('GHRP-6 vs. GHRP-2'),
    p('GHRP-2 and GHRP-6 are the two most-referenced compounds in the growth hormone secretagogue literature. They are related, not interchangeable, and the comparison below is descriptive, not a ranking.'),
    table(
      ['Parameter', 'GHRP-6', 'GHRP-2'],
      [
        ['Sequence', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2', 'D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2'],
        ['Molecular weight', '872.45 g/mol (free peptide)', 'About 818 g/mol (free peptide)'],
        ['Generation', 'First-generation GHRP', 'Second-generation GHRP'],
        ['Receptor', 'GHS-R1a; CD36 reported as a secondary target', 'GHS-R1a'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given peptide engages.'),

    h4('Receptor Context'),
    h5('What does GHS-R1a do in assays?'),
    p('GHS-R1a is the ghrelin receptor, expressed on pituitary somatotroph cells and on a subset of hypothalamic arcuate-nucleus neurons. Receptor activation is reported to engage Gq and phospholipase-C signaling with downstream calcium mobilization, a route distinct from the cAMP-driven signaling used by GHRH-receptor agonists such as sermorelin or CJC-1295. GHRP-6, in either packaging format Veracue offers, is studied as an early reference ligand on the GHS-R1a side of this receptor pharmacology.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for GHRP-6 Spray are established the same way as for any GHRP-6 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related hexapeptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the GHRP-6 Spray at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with GHRP-6', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('GHRP-6 free peptide and GHRP-6 acetate share one sequence but not one formula weight; supplier chemical databases list CAS 87616-84-0 for the free peptide and CAS 145177-42-0 for the acetate salt. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GHRP-6 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHRP-6 Spray?',
    answer: 'GHRP-6 Spray is Veracue’s spray-dispensed packaging of GHRP-6, a synthetic hexapeptide with the sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 that acts as a reference ligand for GHS-R1a, the ghrelin receptor.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in GHRP-6 Spray different from the GHRP-6 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence His-D-Trp-Ala-Trp-D-Phe-Lys-NH2, free-peptide formula C46H56N12O6, molecular weight 872.45 g/mol, CAS 87616-84-0. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for GHRP-6?',
    answer: 'The free peptide carries CAS 87616-84-0. Supplier chemical databases list CAS 145177-42-0 for the acetate salt, the same identifiers that apply regardless of packaging format.',
  },
  {
    question: 'What receptor does GHRP-6 act on?',
    answer: 'Primarily GHS-R1a, the ghrelin receptor, expressed on pituitary somatotroph cells. Laboratory model research has also reported CD36 as a secondary binding site.',
  },
  {
    question: 'How is GHRP-6 different from GHRP-2?',
    answer: 'Both bind GHS-R1a, but they differ in sequence and in molecular weight. GHRP-6 is the first-generation compound at 872.45 g/mol, and GHRP-2 the second-generation compound at about 818 g/mol.',
  },
  {
    question: 'Why does Veracue list GHRP-6 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is GHRP-6 Spray characterized?',
    answer: 'The same way as any GHRP-6 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a GHRP-6 Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHRP-6 Spray?',
    answer: 'No. GHRP-6 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHRP-6 Spray',
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
