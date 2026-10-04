import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Semax Spray: the same ACTH(4-7)-Pro-Gly-Pro heptapeptide documented on the live Semax vial
// listing (scripts/product-import/semax.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts (sequence, formula, mass, CAS, PubChem CID, UNII) are reused
// unchanged from the vial page since it is the same compound; everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific comparisons. Research-use-only copy only: no human-study, dosing, or
// cognitive/mood-outcome content, consistent with scripts/product-import/semax.ts. Pathway language
// is kept at the enzyme/receptor level (TrkB autophosphorylation, downstream signaling branches)
// rather than tied to any outcome claim.

const NAME = 'Semax Spray'
const SLUG = 'semax-spray'

const SKU_CODE = 'SEMAX-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_Semax_10mg.jpg' },
  { strength: '30mg', image: 'VERACUE_Spray_Semax_30mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const SEMAX_LINK = [{ phrase: 'Semax vial listing', href: '/product/semax' }]

const SEO_TITLE = 'Semax Spray Peptide (MEHFPGP)'
const SEO_DESCRIPTION =
  'Veracue packages the ACTH(4-7)-derived peptide Semax (MEHFPGP) as a spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'Semax Spray supplies Semax, a synthetic heptapeptide joining the ACTH(4-7) fragment Met-Glu-His-Phe to a synthetic Pro-Gly-Pro tail, sequence MEHFPGP. Its free-peptide reference values are C37H51N9O10S, about 813.93 g/mol, CAS 80714-61-0, PubChem CID 9811102. The added tail is what separates it from the native ACTH fragment it is built from, and from Selank, an unrelated tuftsin-based peptide that carries the same tail. Offered in 10 mg and 30 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Semax Spray?'),
    p('Semax Spray is Veracue’s spray-dispensed packaging of Semax, a synthetic heptapeptide built by joining the ACTH(4-7) fragment, Met-Glu-His-Phe, to a synthetic Pro-Gly-Pro tripeptide tail. The underlying molecule is identical to the one documented on Veracue’s Semax vial listing; only the packaging and dispensing format differ between the two listings.', { links: SEMAX_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Semax at a Glance'),
    kvTable([
      ['Product name', 'Semax Spray (molecule also written ACTH(4-7)-Pro-Gly-Pro)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)'],
      ['Length', '7 residues, linear'],
      ['Molecular formula (free-peptide reference value)', 'C37H51N9O10S'],
      ['Molecular weight (free-peptide reference value)', 'About 813.93 g/mol (average)'],
      ['Monoisotopic mass (reference value)', 'About 813.348 Da'],
      ['CAS Registry Number', '80714-61-0'],
      ['PubChem CID', '9811102'],
      ['UNII', 'I5FAL2585H'],
      ['Sizes offered', '10 mg and 30 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Semax in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Semax Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Semax documented on the vial listing.',
      'Not full-length ACTH, which is a 39-amino-acid hormone, and not interchangeable with N-acetyl Semax or Adamax.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Semax Spray and Veracue’s Semax vial listing describe one molecule: a linear seven-residue chain joining the ACTH(4-7) fragment, Met-Glu-His-Phe, to a synthetic Pro-Gly-Pro tail. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: SEMAX_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same ACTH(4-7)-Pro-Gly-Pro heptapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Semax vs. Selank at a Glance'),
    table(
      ['Attribute', 'Semax', 'Selank'],
      [
        ['Sequence', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)', 'TKPRPGP (Thr-Lys-Pro-Arg-Pro-Gly-Pro)'],
        ['Structural origin', 'ACTH(4-7) fragment plus a Pro-Gly-Pro tail', 'Tuftsin-derived fragment plus a Pro-Gly-Pro tail'],
        ['Length', '7 residues', '7 residues'],
        ['Molecular weight (average, free peptide)', 'About 813.93 g/mol', 'About 751.9 g/mol'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself.'),

    h4('Enzyme- and Pathway-Level Research Terminology'),
    h5('What pathway language appears in Semax research?'),
    p('Published laboratory work on the ACTH(4-7)-Pro-Gly-Pro sequence frequently uses BDNF/TrkB pathway terminology at the enzyme level. TrkB is a receptor tyrosine kinase that autophosphorylates on ligand engagement and couples to downstream MAPK/ERK and PI3K/Akt signaling branches, the same pathway components studied for other neurotrophin-related sequences. This is enzyme- and pathway-level language describing how the pathway is examined in gene-expression and cell-signaling assays.'),
    h5('How should this pathway language be read on this listing?'),
    p('References to BDNF, TrkB or related signaling components on this page describe laboratory assay targets and reaction mechanisms reported in the literature. They are not a statement about any outcome from using this product, in any system, and this page makes no such claim. Veracue provides no dosing, administration or usage guidance of any kind.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research terminology only.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Semax Spray are established the same way as for any Semax lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Semax at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Semax', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),
    table(
      ['Value', 'Figure'],
      [
        ['Calculated monoisotopic mass', 'About 813.348 Da'],
        ['Average molecular weight', 'About 813.93 g/mol'],
      ],
    ),
    p('The observed m/z depends on the charge state and on ion or adduct conditions, so a report should not be judged against one universal value. Methionine oxidation can produce a mass shift of about +16 Da, so oxidation-related species may appear in an MS dataset regardless of packaging format.'),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Is Semax the same as Semax acetate?'),
    p('Semax acetate is the acetate salt of the same peptide and is listed as a separate substance from the free peptide. Some certificates titled Semax Acetate carry the free peptide’s CAS number, formula and molecular weight, which leaves the described substance unclear. Confirm the chemical form on the lot’s certificate, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Semax Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Semax Spray?',
    answer: 'Semax Spray is Veracue’s spray-dispensed packaging of Semax, a synthetic heptapeptide joining the ACTH(4-7) fragment, Met-Glu-His-Phe, to a synthetic Pro-Gly-Pro tail.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Semax Spray different from the Semax vial listing?',
    answer: 'No. Both listings describe the same compound: sequence MEHFPGP, free-peptide formula C37H51N9O10S, average mass about 813.93 g/mol, CAS 80714-61-0. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Semax?',
    answer: 'The CAS number is 80714-61-0, the PubChem CID is 9811102 and the UNII is I5FAL2585H, the same identifiers that apply to Semax regardless of packaging format.',
  },
  {
    question: 'Is Semax the same as ACTH?',
    answer: 'No. ACTH is a 39-amino-acid hormone, while Semax is a seven-residue synthetic peptide related to a short region of it, MEHF plus an added Pro-Gly-Pro tail.',
  },
  {
    question: 'How is Semax different from Selank?',
    answer: 'Semax (MEHFPGP) is built from the ACTH(4-7) fragment, while Selank (TKPRPGP) is built from a tuftsin-derived fragment. Both carry a Pro-Gly-Pro tail but differ in their first four residues and in mass.',
  },
  {
    question: 'What pathway terminology appears in Semax research?',
    answer: 'Published laboratory work frequently references the BDNF/TrkB pathway at the enzyme level, including TrkB receptor tyrosine kinase autophosphorylation and downstream MAPK/ERK and PI3K/Akt signaling branches, described as assay targets rather than as a product outcome.',
  },
  {
    question: 'Why does Veracue list Semax in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Semax Spray characterized?',
    answer: 'The same way as any Semax lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Semax Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Semax Spray?',
    answer: 'No. Semax Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Semax Spray',
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
