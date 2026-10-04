import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Snap8 Spray: the same Ac-EEMQRRAD-NH2 octapeptide documented on the live Snap8 vial listing
// (scripts/product-import/snap8.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, weight, CAS, PubChem CID) are reused unchanged from
// the vial page since it is the same compound; everything else is written fresh and focused on what
// "Spray" means as a packaging/dispensing descriptor, lot verification for this format, and
// format-specific comparisons. Research-use-only copy only: no human trial, dosing, cosmetic or
// skin/wrinkle outcome content, consistent with scripts/product-import/snap8.ts. Facts are drawn from
// docs/product-contents-2/snap8-spray-v2.json for structure only; its human-study, clinical, cosmetic
// outcome and dosing content is intentionally left out to match site policy.

const NAME = 'Snap8 Spray'
const SLUG = 'snap8-spray'

const SKU_CODE = 'SNAP8-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_Snap8_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Spray_Snap8_20mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const SNAP8_LINK = [{ phrase: 'Snap8 vial listing', href: '/product/snap8' }]

const SEO_TITLE = 'Snap8 Spray Peptide (Ac-EEMQRRAD-NH2)'
const SEO_DESCRIPTION =
  "Veracue offers the Snap8 octapeptide, CAS 868844-74-0, in a spray-dispensed packaging format with identity data for laboratory research only."
const DESCRIPTION =
  'Snap8 Spray delivers Snap8, a synthetic eight-residue peptide, sequence Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2, modeled on a short stretch of SNAP-25, a protein that forms part of the SNARE membrane-fusion complex. Its formula is C41H70N16O16S, molecular weight 1075.2 g/mol, CAS 868844-74-0, PubChem CID 76283482. The acetylated N-terminus and amidated C-terminus distinguish it from a plain SNAP-25 fragment of the same length. Available in 10 mg and 20 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Snap8 Spray?'),
    p('Snap8 Spray is Veracue’s spray-dispensed packaging of Snap8, a synthetic octapeptide built from eight amino acids and modeled on a short stretch of SNAP-25, a protein that forms part of the SNARE membrane-fusion complex. The underlying molecule is identical to the one documented on Veracue’s Snap8 vial listing; only the packaging and dispensing format differ between the two listings.', { links: SNAP8_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Snap8 at a Glance'),
    kvTable([
      ['Product name', 'Snap8 Spray (molecule also written Snap-8 or SNAP-8)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2 (Ac-EEMQRRAD-NH2)'],
      ['Length', '8 residues, N-terminally acetylated, C-terminally amidated'],
      ['Molecular formula', 'C41H70N16O16S'],
      ['Molecular weight', '1075.2 g/mol'],
      ['CAS Registry Number', '868844-74-0'],
      ['PubChem CID', '76283482'],
      ['Sizes offered', '10 mg and 20 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Snap8 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Snap8 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Snap8 documented on the vial listing.',
      'Not SNAP-25 itself, and not a natural fragment isolated from it.',
      'Not the same as Argireline, which is a shorter six-residue peptide.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Snap8 Spray and Veracue’s Snap8 vial listing describe one molecule: a linear eight-residue chain, Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2, carrying an acetyl group at the N-terminus and an amide at the C-terminus in place of a free carboxylic acid. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: SNAP8_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same Ac-EEMQRRAD-NH2 octapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Snap8 vs. Argireline and GHK-Cu'),
    table(
      ['Feature', 'Snap8', 'Argireline', 'GHK-Cu'],
      [
        ['Structure', 'Synthetic linear octapeptide, Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2', 'Synthetic linear hexapeptide, Ac-Glu-Glu-Met-Gln-Arg-Arg-NH2', 'Copper(II) complex of the tripeptide Gly-His-Lys'],
        ['Length', '8 residues', '6 residues', '3 amino acids plus a coordinated copper ion'],
        ['Molecular formula', 'C41H70N16O16S', 'Shorter related sequence core, distinct formula', 'Distinct formula from either peptide'],
        ['Design association', 'Modeled on a short sequence from SNAP-25', 'Shares the same sequence core as Snap8, modeled on SNAP-25', 'Unrelated design lineage; copper-peptide chemistry'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not currently listed', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and design lineage only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which sequence a given peptide carries.'),

    h4('SNAP-25 and the SNARE Complex'),
    h5('What is SNAP-25, and how does Snap8 relate to it?'),
    p('SNAP-25 is a well-characterized protein that, together with syntaxin-1 and VAMP/synaptobrevin, forms the core SNARE complex involved in vesicle docking and membrane fusion. Snap8 corresponds to a short stretch of the SNAP-25 sequence, near its N-terminal region, and is studied at the molecular level as a reference material for SNARE-related assay work in either packaging format Veracue offers.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Snap8 Spray are established the same way as for any Snap8 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value of 1075.2 g/mol. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide such as Argireline can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Snap8 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Snap8', 'Sequence order; purity'],
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
    p('Some third-party listings describe Snap8 as an acetate salt rather than the free peptide, and the two forms carry slightly different expected masses. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Snap8 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Snap8 Spray?',
    answer: 'Snap8 Spray is Veracue’s spray-dispensed packaging of Snap8, a synthetic eight-residue peptide, Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2, modeled on a short stretch of SNAP-25, a protein involved in the SNARE membrane-fusion complex.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Snap8 Spray different from the Snap8 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Ac-Glu-Glu-Met-Gln-Arg-Arg-Ala-Asp-NH2, formula C41H70N16O16S, molecular weight 1075.2 g/mol, CAS 868844-74-0. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Snap8?',
    answer: 'The CAS number is 868844-74-0 and the PubChem CID is 76283482, the same identifiers that apply to Snap8 regardless of packaging format.',
  },
  {
    question: 'Is Snap8 the same as Argireline?',
    answer: 'No. Argireline is a related, shorter six-residue peptide, Ac-Glu-Glu-Met-Gln-Arg-Arg-NH2. Snap8 extends that sequence by two residues, alanine and aspartic acid, giving a distinct eight-residue compound with its own formula, weight and CAS registration.',
  },
  {
    question: 'Is Snap8 related to SNAP-25?',
    answer: 'Yes, by design. Snap8 is a synthetic peptide corresponding to a short sequence from SNAP-25, a protein that forms part of the SNARE complex. It is not SNAP-25 itself, not a natural fragment, and does not replace it.',
  },
  {
    question: 'How is Snap8 different from GHK-Cu?',
    answer: 'They are unrelated compounds. Snap8 is a synthetic eight-residue peptide modeled on a short SNAP-25 sequence, while GHK-Cu is a copper(II) complex of the tripeptide Gly-His-Lys.',
  },
  {
    question: 'Why does Veracue list Snap8 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Snap8 Spray characterized?',
    answer: 'The same way as any Snap8 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Snap8 Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Snap8 Spray?',
    answer: 'No. Snap8 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Snap8 Spray',
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
