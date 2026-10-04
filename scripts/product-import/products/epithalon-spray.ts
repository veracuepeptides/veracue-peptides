import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Epithalon Spray: the same AEDG tetrapeptide documented on the live Epithalon vial listing
// (scripts/product-import/epithalon.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts established on the vial page (sequence, length, relationship
// to epithalamin, tissue-analog research tradition) are reused unchanged since it is the
// same compound. Reference-database formula, average mass and PubChem CID, which the vial page
// does not state, are added here from docs/product-contents-2/epithalon-spray.json with the same
// "reference value, not a lot result" caveat used on other first-time identity additions in this
// batch; the CAS number is left unstated rather than guessed, since public databases list more
// than one for this sequence. Everything else is written fresh and focused on what "Spray" means
// as a packaging/dispensing format, lot verification for this format, and format-specific
// comparisons. Research-use-only copy only: no human trial, dosing, or outcome/indication content,
// consistent with scripts/product-import/epithalon.ts.

const NAME = 'Epithalon Spray'
const SLUG = 'epithalon-spray'

const SKU_CODE = 'EPITH-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_Epithalon_10mg.jpg' },
  { strength: '50mg', image: 'VERACUE_Spray_Epithalon_50mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const EPITHALON_LINK = [{ phrase: 'Epithalon vial listing', href: '/product/epithalon' }]

const SEO_TITLE = 'Epithalon Spray Research Peptide (AEDG)'
const SEO_DESCRIPTION =
  'Veracue packages the AEDG tetrapeptide Epithalon as a lab-ready spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'Epithalon Spray supplies the four-amino-acid peptide Ala-Glu-Asp-Gly (AEDG), also written Epitalon or Epithalone, developed as a sequence-defined synthetic counterpart to epithalamin, an earlier pineal-tissue preparation. Reference-database values put its formula at C14H22N4O9 and average mass near 390.35 g/mol, PubChem CID 219042; CAS registration for this sequence varies across public sources, so confirm it on a lot’s own paperwork. Veracue offers this spray-dispensed peptide in 10 mg and 50 mg sizes, for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Epithalon Spray?'),
    p('Epithalon Spray is Veracue’s spray-dispensed packaging of Epithalon, a synthetic tetrapeptide built from four amino acids with the sequence Ala-Glu-Asp-Gly (AEDG). The underlying molecule is identical to the one documented on Veracue’s Epithalon vial listing; only the packaging and dispensing format differ between the two listings.', { links: EPITHALON_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Epithalon at a Glance'),
    kvTable([
      ['Product name', 'Epithalon Spray (molecule also written Epitalon, Epithalone, AEDG)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Ala-Glu-Asp-Gly (AEDG)'],
      ['Length', '4 amino acids, linear tetrapeptide'],
      ['Molecular formula (reference value)', 'C14H22N4O9'],
      ['Molecular weight (reference value)', 'About 390.35 g/mol (average)'],
      ['PubChem CID', '219042'],
      ['Related material', 'Epithalamin, a pineal-tissue preparation'],
      ['Sizes offered', '10 mg and 50 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Formula, mass and PubChem figures above are reference-database values for the AEDG sequence and are not a Veracue lot result. CAS registration for this sequence varies across public databases, so a lot-specific CAS value should be confirmed on that lot’s own documentation rather than assumed from this page.</em></p>`,
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Epithalon in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Epithalon Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Epithalon documented on the vial listing.',
      'Not the same material as epithalamin, the tissue-derived preparation it was designed to mirror.',
      'Not a consumer, dietary or cosmetic product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Epithalon Spray and Veracue’s Epithalon vial listing describe one molecule: a linear four-residue chain of alanine, glutamic acid, aspartic acid and glycine, developed as a sequence-defined counterpart to epithalamin, an earlier pineal-tissue preparation. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: EPITHALON_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same AEDG tetrapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Epithalon Alongside Other Short Tissue-Analog Peptides'),
    table(
      ['Feature', 'Epithalon', 'Thymalin', 'Cartalax'],
      [
        ['Tissue of origin studied', 'Pineal gland (epithalamin)', 'Thymus', 'Cartilage'],
        ['Structure', 'Linear tetrapeptide, Ala-Glu-Asp-Gly', 'Short synthetic peptide', 'Short synthetic peptide'],
        ['Research tradition', 'Same tissue-analog research program', 'Same tissue-analog research program', 'Same tissue-analog research program'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not currently listed', 'Not currently listed'],
      ],
    ),
    p('This table compares research lineage and structure only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and shared research lineage does not mean shared findings across these materials.'),

    h4('Research Context'),
    h5('What does the published Epithalon literature cover, regardless of packaging?'),
    p('Published work on the AEDG sequence spans cell-culture studies, including telomerase- and telomere-related endpoints, animal studies, and older research-tradition publications associated with pineal-gland and circadian biology. Each finding is specific to the model and conditions used in that study, and none of it should be read as an established mechanism or outcome for this or any packaging format.'),
    h5('How should packaging format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Epithalon Spray are established the same way as for any Epithalon lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related short peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Epithalon at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Epithalon', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated sequence, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('Short peptides such as Epithalon can be supplied as the free peptide or as a salt form, and different forms do not share one formula weight. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Epithalon Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Epithalon Spray?',
    answer: 'Epithalon Spray is Veracue’s spray-dispensed packaging of Epithalon, a synthetic tetrapeptide built from four amino acids with the sequence Ala-Glu-Asp-Gly (AEDG).',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Epithalon Spray different from the Epithalon vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Ala-Glu-Asp-Gly (AEDG), reference formula C14H22N4O9, reference average mass about 390.35 g/mol, PubChem CID 219042. Only the packaging format differs.',
  },
  {
    question: 'What is the Epithalon sequence?',
    answer: 'Ala-Glu-Asp-Gly, abbreviated AEDG, four amino acids in total, identical across every packaging format Veracue offers.',
  },
  {
    question: 'Is Epitalon the same as Epithalon Spray?',
    answer: 'Yes. Epitalon and Epithalon are alternate spellings of the same AEDG tetrapeptide, and the difference is a spelling variant, not a different compound.',
  },
  {
    question: 'What is the difference between Epithalon and epithalamin?',
    answer: 'Epithalamin is the earlier pineal-tissue preparation. Epithalon was developed afterward as a sequence-defined synthetic counterpart to it. They are related by research history, not identical materials.',
  },
  {
    question: 'How is Epithalon related to Thymalin and Cartalax?',
    answer: 'All three come from the same short-peptide, tissue-analog research tradition, each associated with a different tissue of origin: pineal gland for Epithalon, thymus for Thymalin and cartilage for Cartalax. Each has its own separate literature.',
  },
  {
    question: 'Why does Veracue list Epithalon in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Epithalon Spray characterized?',
    answer: 'The same way as any Epithalon lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and amino acid analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an Epithalon Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Epithalon Spray?',
    answer: 'No. Epithalon Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['longevity-anti-aging'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Epithalon Spray',
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
