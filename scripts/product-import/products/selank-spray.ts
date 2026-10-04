import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Selank Spray: the same tuftsin-analogue heptapeptide documented on the live Selank vial listing
// (scripts/product-import/selank.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, length, approximate molecular weight) are reused unchanged
// from the vial page since it is the same compound; the vial listing does not publish a CAS number
// or molecular formula, so none is invented here either. Everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific comparisons. Research-use-only copy only: no human trial, clinical,
// dosing, or anxiolytic/mood/behavioral-outcome content, consistent with selank.ts; receptor and
// enzyme research mentions are kept at the assay level only, mirroring the vial listing's own framing.

const NAME = 'Selank Spray'
const SLUG = 'selank-spray'

const SKU_CODE = 'SELANK-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_Selank_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const SELANK_LINK = [{ phrase: 'Selank vial listing', href: '/product/selank' }]

const SEO_TITLE = 'Selank Spray Research Peptide (TKPRPGP)'
const SEO_DESCRIPTION =
  'Veracue packages the tuftsin analogue Selank (TKPRPGP) as a lab-ready spray format, with identity and lot verification for laboratory research use only.'
const DESCRIPTION =
  'Selank Spray delivers Selank, a synthetic seven-residue peptide, sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro, built as a structural analogue of tuftsin with an added Pro-Gly-Pro tail. Its approximate molecular weight runs near 751 g/mol. The added tail distinguishes it from plain tuftsin and from Semax, a different heptapeptide built on an unrelated ACTH-derived backbone that is sometimes mentioned alongside it. Supplied as a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Selank Spray?'),
    p('Selank Spray is Veracue’s spray-dispensed packaging of Selank, a synthetic heptapeptide built as a structural analogue of tuftsin. The underlying molecule is identical to the one documented on Veracue’s Selank vial listing; only the packaging and dispensing format differ between the two listings.', { links: SELANK_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Selank at a Glance'),
    kvTable([
      ['Product name', 'Selank Spray'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP)'],
      ['Length', '7 amino acids'],
      ['Approximate molecular weight', 'About 751 g/mol'],
      ['Structural relationship', 'Analogue of tuftsin, extended with a Pro-Gly-Pro tail'],
      ['Size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Selank in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Selank Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Selank documented on the vial listing.',
      'Not the same molecule as tuftsin, which is a shorter four-residue peptide, or as Semax, which has a different sequence.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Selank Spray and Veracue’s Selank vial listing describe one molecule: a linear seven-residue chain, Thr-Lys-Pro-Arg-Pro-Gly-Pro, built on the four-residue tuftsin core (Thr-Lys-Pro-Arg) with an added Pro-Gly-Pro extension. Packaging format has no bearing on sequence or mass, so these values are identical across both listings.', { links: SELANK_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same tuftsin analogue reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Selank vs. Semax'),
    table(
      ['Attribute', 'Selank', 'Semax'],
      [
        ['Sequence', 'TKPRPGP (Thr-Lys-Pro-Arg-Pro-Gly-Pro)', 'MEHFPGP (Met-Glu-His-Phe-Pro-Gly-Pro)'],
        ['General identity', 'Tuftsin-related synthetic peptide', 'ACTH-related synthetic peptide'],
        ['Length', '7 amino acids', '7 amino acids'],
        ['Approximate molecular weight', 'About 751 g/mol', 'About 814 g/mol'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and identity only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself.'),

    h4('Receptor and Enzyme Context'),
    h5('What do researchers study about Selank?'),
    p('Published laboratory work has looked at Selank in radioligand binding experiments involving GABA-A receptors, in assays of enkephalin-degrading enzyme activity, and in hippocampal BDNF expression in animal models. It also sits within broader peptide-signaling research because of its structural link to tuftsin, in either packaging format Veracue offers.'),
    h5('Are these findings outcomes?'),
    p('No. They are research areas. A result from an isolated binding assay or an animal model describes that experimental system only, and it says nothing about any particular research vial or spray-format unit sold under the Selank name. When reading a paper, note the species or system, the comparator, the endpoint and the chemical form.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Selank Spray are established the same way as for any Selank lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass is consistent with the molecule’s theoretical value near 751 g/mol. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence and mass references listed on the Selank at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Selank', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('How is Selank distinguished from Semax on paperwork?'),
    p('Selank and Semax share a Pro-Gly-Pro ending and the same seven-residue length, which makes them easy to confuse on a label. Confirm the full sequence rather than the length alone: Selank is TKPRPGP and Semax is MEHFPGP, with different masses, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Selank Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Selank Spray?',
    answer: 'Selank Spray is Veracue’s spray-dispensed packaging of Selank, a synthetic seven-residue peptide built as a structural analogue of tuftsin.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Selank Spray different from the Selank vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro (TKPRPGP), a tuftsin analogue with a molecular weight of about 751 g/mol. Only the packaging format differs.',
  },
  {
    question: 'What is the Selank sequence?',
    answer: 'Thr-Lys-Pro-Arg-Pro-Gly-Pro, written TKPRPGP in one-letter code, seven residues in total, the same sequence reported on the vial listing regardless of packaging format.',
  },
  {
    question: 'How is Selank related to tuftsin?',
    answer: 'Selank is described in chemical references as a structural analogue of tuftsin. It extends tuftsin’s four-residue core (Thr-Lys-Pro-Arg) with an added Pro-Gly-Pro sequence.',
  },
  {
    question: 'What is the difference between Selank and Semax?',
    answer: 'They are different seven-residue peptides. Selank (TKPRPGP) is tuftsin-related, while Semax (MEHFPGP) is ACTH-related, and their masses and first four residues differ.',
  },
  {
    question: 'Why does Veracue list Selank in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Selank Spray characterized?',
    answer: 'The same way as any Selank lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and amino acid analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Selank Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What do researchers study about Selank?',
    answer: 'Published laboratory work has examined GABA-A receptor binding, enkephalin-degrading enzyme activity and hippocampal BDNF expression in animal models. These are research areas, not outcomes, regardless of packaging format.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Selank Spray?',
    answer: 'No. Selank Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Selank Spray',
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
