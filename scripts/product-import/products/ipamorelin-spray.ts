import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Ipamorelin Spray: the same GHS-R1a-selective pentapeptide documented on the live Ipamorelin vial
// listing (scripts/product-import/ipamorelin.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts (sequence, formula, mass, CAS, PubChem CID) are reused unchanged
// from the vial page since it is the same compound; everything else is written fresh and focused on
// what "Spray" means as a packaging/dispensing descriptor, lot verification for this format, and
// format-specific comparisons. Research-use-only copy only: no human trial, dosing, or tolerability
// content, consistent with scripts/product-import/ipamorelin.ts. The vial page intentionally omits a
// specific lot number, purity percentage, testing lab name and test date (pending an owner decision),
// so this page stays at the same general molecular-identity level and does not add any of those
// specifics either. Structure mined from docs/product-contents-2/ipamorelin_spray_page.json; its
// human-study, clinical, approval and dosing content is left out to match site policy.

const NAME = 'Ipamorelin Spray'
const SLUG = 'ipamorelin-spray'

const SKU_CODE = 'IPA-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_Spray_Ipamorelin_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_Spray_Ipamorelin_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const IPAMORELIN_LINK = [{ phrase: 'Ipamorelin vial listing', href: '/product/ipamorelin' }]

const SEO_TITLE = 'Ipamorelin Spray Peptide (GHS-R1a)'
const SEO_DESCRIPTION =
  'Veracue packages the GHS-R1a-selective pentapeptide Ipamorelin as a lab-ready spray format, with identity data for laboratory research use only.'
const DESCRIPTION =
  'Ipamorelin Spray delivers Ipamorelin, a synthetic pentapeptide with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2, including the non-standard residues aminoisobutyric acid and D-2-naphthylalanine, studied as a selective agonist at the ghrelin receptor, GHS-R1a. Its reference values are C38H49N9O5, about 711.85 g/mol, CAS 170851-70-4. Unlike GHRP-6 and GHRP-2, which share the same receptor target, Ipamorelin’s short, modified sequence sets it apart chemically. Available in 5 mg and 10 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Ipamorelin Spray?'),
    p('Ipamorelin Spray is Veracue’s spray-dispensed packaging of Ipamorelin, a synthetic pentapeptide with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2, including non-standard residues such as aminoisobutyric acid (Aib) and D-2-naphthylalanine. The underlying molecule is identical to the one documented on Veracue’s Ipamorelin vial listing; only the packaging and dispensing format differ between the two listings.', { links: IPAMORELIN_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Ipamorelin at a Glance'),
    kvTable([
      ['Product name', 'Ipamorelin Spray'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2'],
      ['Length', '5 residues, includes non-standard residues and a C-terminal amide'],
      ['Molecular formula', 'C38H49N9O5'],
      ['Molecular weight (average)', 'About 711.85 g/mol'],
      ['CAS Registry Number', '170851-70-4'],
      ['Receptor target', 'GHS-R1a (ghrelin receptor), agonist activity in receptor assays'],
      ['Sizes offered', '5 mg and 10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Ipamorelin in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Ipamorelin Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Ipamorelin documented on the vial listing.',
      'Not ghrelin itself, and not GHRP-6, CJC-1295 or Sermorelin.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Ipamorelin Spray and Veracue’s Ipamorelin vial listing describe one molecule: a linear five-residue chain built from Aib (aminoisobutyric acid), histidine, D-2-naphthylalanine, D-phenylalanine and lysine, with a C-terminal amide. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: IPAMORELIN_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same GHS-R1a-selective pentapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Ipamorelin vs. Ghrelin, GHRP-6, CJC-1295 and Sermorelin'),
    table(
      ['Feature', 'Ipamorelin', 'Native ghrelin', 'GHRP-6', 'CJC-1295 / Sermorelin'],
      [
        ['Structure', 'Synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2)', 'Endogenous 28-residue peptide hormone', 'Synthetic hexapeptide secretagogue', 'GHRH(1-29)-based analogs'],
        ['Peptide length', '5 residues', '28 residues', '6 residues', '29 residues (plus modifications on CJC-1295)'],
        ['Receptor', 'Ghrelin (GHS-R1a) receptor', 'Ghrelin (GHS-R1a) receptor, endogenous ligand', 'Ghrelin (GHS-R1a) receptor', 'GHRH receptor'],
        ['Signaling context', 'Phospholipase C / calcium', 'Phospholipase C / calcium', 'Phospholipase C / calcium', 'Adenylyl cyclase / cAMP'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not offered', 'Vial and spray', 'Sermorelin: vial and spray. CJC-1295: not offered'],
      ],
    ),
    p('This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given peptide engages.'),

    h4('Receptor Context'),
    h5('What does the GHS-R1a receptor do in assays?'),
    p('The GHS-R1a receptor, also called the ghrelin receptor, is a G protein-coupled receptor studied for its role in growth-hormone-secretagogue pharmacology, signaling mainly through phospholipase C and calcium. Ipamorelin, in either packaging format Veracue offers, is studied as a selective agonist at this receptor in receptor assays, in contrast to GHRH-receptor agonists such as CJC-1295 or Sermorelin.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity for Ipamorelin Spray is established the same way as for any Ipamorelin lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Ipamorelin at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Ipamorelin', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, and mass spectrometry result with observed and theoretical mass. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does identity verification matter for a short peptide like Ipamorelin?'),
    p('A pentapeptide’s small size keeps its expected mass easy to compare with an observed mass-spectrometry value, but a close mass match still needs to be paired with chromatographic data before it supports an identity conclusion on its own. Confirm both figures on the lot’s certificate, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Ipamorelin Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Ipamorelin Spray?',
    answer: 'Ipamorelin Spray is Veracue’s spray-dispensed packaging of Ipamorelin, a synthetic pentapeptide studied as a selective ghrelin receptor (GHS-R1a) agonist, with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Ipamorelin Spray different from the Ipamorelin vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2, molecular formula C38H49N9O5, average mass about 711.85 g/mol, CAS 170851-70-4. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Ipamorelin?',
    answer: 'The CAS Registry Number is 170851-70-4, the same identifier that applies to Ipamorelin regardless of packaging format.',
  },
  {
    question: 'Is Ipamorelin the same as ghrelin or GHRP-6?',
    answer: 'No. Ghrelin is the endogenous hormone that activates the GHS-R1a receptor. Ipamorelin is a synthetic pentapeptide designed to engage the same receptor. GHRP-6 is a separate synthetic hexapeptide secretagogue. All three are chemically distinct, despite sharing a receptor target.',
  },
  {
    question: 'How is Ipamorelin different from CJC-1295 and Sermorelin?',
    answer: 'Ipamorelin acts at the ghrelin (GHS-R1a) receptor, which signals mainly through phospholipase C and calcium. CJC-1295 and Sermorelin act at the GHRH receptor instead, which couples to adenylyl cyclase and cAMP.',
  },
  {
    question: 'Why does Veracue list Ipamorelin in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Ipamorelin Spray characterized?',
    answer: 'The same way as any Ipamorelin lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an Ipamorelin Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, and a lot number matching the container received, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Ipamorelin Spray?',
    answer: 'No. Ipamorelin Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Ipamorelin Spray',
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
