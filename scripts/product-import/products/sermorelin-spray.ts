import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Sermorelin Spray: the same GHRH(1-29) amide molecule documented on the live Sermorelin vial
// listing (scripts/product-import/sermorelin.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (sequence, formula, mass, CAS, PubChem CID) are
// reused unchanged from the vial page since it is the same compound; everything else is written
// fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification
// for this format, and format-specific comparisons. Research-use-only copy only: no human trial,
// dosing, or tolerability content, consistent with scripts/product-import/sermorelin.ts.

const NAME = 'Sermorelin Spray'
const SLUG = 'sermorelin-spray'

const SKU_CODE = 'SERM-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_Sermorelin_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Spray_Sermorelin_20mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const SERMORELIN_LINK = [{ phrase: 'Sermorelin vial listing', href: '/product/sermorelin' }]

const SEO_TITLE = 'Sermorelin Spray Peptide (GRF 1-29)'
const SEO_DESCRIPTION =
  'Veracue packages the GHRH(1-29) peptide Sermorelin as a lab-ready spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'Sermorelin Spray delivers the 29-amino-acid peptide YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2, the shortened, amidated reference fragment of growth hormone-releasing hormone used across GHRH-receptor research. Its free-base formula works out to C149H246N44O42S, an average mass near 3357.9 g/mol, filed under CAS 86168-78-7. The sequence carries three arginines, two lysines and a single methionine, details that matter when tracking oxidation or counterion binding in a given lot. Veracue supplies this spray format in 10 mg and 20 mg sizes, strictly for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Sermorelin Spray?'),
    p('Sermorelin Spray is Veracue’s spray-dispensed packaging of Sermorelin, a synthetic peptide built from the first 29 amino acids of growth hormone-releasing hormone (GHRH) with a C-terminal amide. The underlying molecule is identical to the one documented on Veracue’s Sermorelin vial listing; only the packaging and dispensing format differ between the two listings.', { links: SERMORELIN_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Sermorelin at a Glance'),
    kvTable([
      ['Product name', 'Sermorelin Spray (molecule also written GRF 1-29, GHRH(1-29) amide)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2'],
      ['Length', '29 residues, linear, C-terminal amide'],
      ['Molecular formula (free-base reference value)', 'C149H246N44O42S'],
      ['Molecular weight (free-base reference value)', 'About 3357.9 g/mol (average)'],
      ['CAS Registry Number', '86168-78-7'],
      ['PubChem CID', '16132413'],
      ['Sizes offered', '10 mg and 20 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Sermorelin in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Sermorelin Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Sermorelin documented on the vial listing.',
      'Not growth hormone itself, and not Tesamorelin, CJC-1295 or Ipamorelin.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Sermorelin Spray and Veracue’s Sermorelin vial listing describe one molecule: a linear 29-residue chain with no cysteine and no disulfide bonds, three arginines, two lysines, a free N-terminal amine and a methionine at position 27. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: SERMORELIN_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same GHRH(1-29) amide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Sermorelin vs. Ipamorelin, Tesamorelin and CJC-1295'),
    table(
      ['Feature', 'Sermorelin', 'Ipamorelin', 'Tesamorelin', 'CJC-1295'],
      [
        ['Structure', 'Unmodified GHRH(1-29) amide', 'Synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2)', 'GHRH(1-44) with N-terminal trans-3-hexenoyl group', 'GHRH(1-29) with four substitutions plus a modified lysine'],
        ['Peptide length', '29 residues', '5 residues', '44 residues', '29 residues plus modified lysine'],
        ['Receptor', 'GHRH receptor', 'Ghrelin (GHS) receptor', 'GHRH receptor', 'GHRH receptor'],
        ['Signaling context', 'Adenylyl cyclase / cAMP', 'Phospholipase C / calcium', 'Adenylyl cyclase / cAMP', 'Adenylyl cyclase / cAMP'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray', 'Vial and spray', 'Not offered'],
      ],
    ),
    p('This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given peptide engages.'),

    h4('Receptor Context'),
    h5('What does the GHRH receptor do in assays?'),
    p('The GHRH receptor is a G protein-coupled receptor expressed on pituitary somatotroph cells, related to the receptors for VIP and secretin, and signals mainly through adenylyl cyclase and cyclic AMP. Sermorelin, in either packaging format Veracue offers, is studied as a reference ligand on the GHRH side of this receptor family.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Sermorelin Spray are established the same way as for any Sermorelin lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Sermorelin at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Sermorelin', 'Sequence order; purity'],
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
    p('Sermorelin and Sermorelin acetate share one sequence but not one formula weight. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Sermorelin Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Sermorelin Spray?',
    answer: 'Sermorelin Spray is Veracue’s spray-dispensed packaging of Sermorelin, a synthetic 29-residue peptide built from the first 29 amino acids of growth hormone-releasing hormone with a C-terminal amide.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Sermorelin Spray different from the Sermorelin vial listing?',
    answer: 'No. Both listings describe the same compound: sequence YADAIFTNSYRKVLGQLSARKLLQDIMSR-NH2, free-base formula C149H246N44O42S, average mass about 3357.9 g/mol, CAS 86168-78-7. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Sermorelin?',
    answer: 'The CAS number is 86168-78-7 and the PubChem CID is 16132413, the same identifiers that apply to Sermorelin regardless of packaging format.',
  },
  {
    question: 'Is Sermorelin the same as growth hormone?',
    answer: 'No. Growth hormone is a much larger pituitary protein. Sermorelin is a 29-residue fragment of GHRH, the peptide that acts on the GHRH receptor.',
  },
  {
    question: 'How is Sermorelin different from Ipamorelin?',
    answer: 'Sermorelin acts at the GHRH receptor, which signals mainly through cAMP. Ipamorelin is an unrelated pentapeptide acting at the ghrelin (GHS) receptor, which couples to phospholipase C and calcium.',
  },
  {
    question: 'How is Sermorelin different from Tesamorelin and CJC-1295?',
    answer: 'Tesamorelin is the full 44-residue GHRH sequence with an N-terminal hexenoyl group, and CJC-1295 carries four substitutions plus a modified lysine. Sermorelin is the unmodified 29-residue fragment. All three engage the GHRH receptor.',
  },
  {
    question: 'Why does Veracue list Sermorelin in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Sermorelin Spray characterized?',
    answer: 'The same way as any Sermorelin lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Sermorelin Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Sermorelin Spray?',
    answer: 'No. Sermorelin Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Sermorelin Spray',
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
