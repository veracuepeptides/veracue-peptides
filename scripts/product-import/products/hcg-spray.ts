import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// HCG Spray: the same alpha/beta glycoprotein hormone documented on the live HCG vial listing
// (scripts/product-import/hcg.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (subunit lengths, glycosylation sites, receptor, mass range, IU
// standards) are reused unchanged from the vial page since it is the same hormone; everything
// else is written fresh and focused on what "Spray" means as a packaging/dispensing descriptor,
// lot verification for this format, and format-specific comparisons. Research-use-only copy
// only: no pregnancy, fertility, human-trial, dosing or regulatory content, consistent with
// scripts/product-import/hcg.ts.

const NAME = 'HCG Spray'
const SLUG = 'hcg-spray'

const SKU_CODE = 'HCG-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5000 IU', image: 'VERACUE_Spray_HCG_5000_IU.jpg' },
  { strength: '10000 IU', image: 'VERACUE_Spray_HCG_10000_IU.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const HCG_LINK = [{ phrase: 'HCG vial listing', href: '/product/hcg' }]

const SEO_TITLE = 'HCG Spray Research Protein (Glycoprotein)'
const SEO_DESCRIPTION =
  "HCG Spray packages the same alpha/beta glycoprotein hormone as Veracue's HCG vial, with subunit data and COA guidance for laboratory research use only."
const DESCRIPTION =
  'HCG Spray contains human chorionic gonadotropin (HCG), a heterodimeric glycoprotein built from a 92-amino-acid alpha subunit shared with LH, FSH and TSH, paired with a 145-amino-acid beta subunit specific to HCG. Carbohydrate makes up roughly 30 percent of its mass, and the finished protein runs close to 37 kDa, acting through the LHCGR receptor. Potency here is reported in International Units rather than by weight alone, since glycosylation affects how the protein behaves in an assay. Available in 5000 IU and 10000 IU for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is HCG Spray?'),
    p('HCG Spray is Veracue\'s spray-dispensed packaging of human chorionic gonadotropin (HCG, written hCG in papers), a heterodimeric glycoprotein hormone built from a 92-amino-acid alpha subunit and a 145-amino-acid beta subunit that together activate the luteinizing hormone/choriogonadotropin receptor (LHCGR). The underlying molecule is identical to the one documented on Veracue\'s HCG vial listing; only the packaging and dispensing format differ between the two listings.', { links: HCG_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, carrier, fill volume and storage conditions are reported on each lot\'s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('HCG at a Glance'),
    kvTable([
      ['Product name', 'HCG Spray (molecule also written hCG, human chorionic gonadotropin)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Molecular class', 'Heterodimeric glycoprotein'],
      ['Alpha subunit', '92 amino acids; shared with LH, FSH and TSH'],
      ['Beta subunit', '145 amino acids; specific to HCG'],
      ['Amino acids, both subunits', '237 (polypeptide backbone only)'],
      ['Carbohydrate share', 'About 30% of mass (reported range 25 to 40%)'],
      ['Approximate molecular mass', 'About 37 kDa; published values run from roughly 36 to 39 kDa'],
      ['Receptor', 'LHCGR'],
      ['Potency unit', 'International Unit (IU)'],
      ['Sizes offered', '5000 IU and 10000 IU'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe HCG as a molecule in general and do not describe any specific Veracue lot. Source, formulation, carrier, potency method and lot results are reported on each lot\'s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists HCG in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What HCG Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the HCG documented on the listing above.',
      'Not a short peptide. "HCG peptide" is common search shorthand, but HCG is a glycosylated protein of 237 amino acids.',
      'Not the same as LH, although the two share an alpha chain and a receptor.',
      'Not a diagnostic test.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Listing Above'),
    p('HCG Spray and Veracue\'s HCG vial listing describe one molecule: a disulfide-free alpha/beta heterodimer in which the alpha chain is shared with LH, FSH and TSH, and the beta chain carries HCG\'s hormone-specific identity. Packaging format has no bearing on subunit length, glycosylation or receptor target, so these values are identical across both listings.', { links: HCG_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same alpha/beta glycoprotein reported under the listing above. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue\'s catalog, "Spray" is a packaging and dispensing term, comparable to other container terms used on other listings. It tells a researcher how the product is dispensed from its spray-top bottle. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot\'s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Subunit Structure and Glycosylation'),
    table(
      ['Property', 'General scientific value'],
      [
        ['Alpha subunit glycosylation', '2 N-linked chains (Asn52, Asn78)'],
        ['Beta subunit glycosylation', '2 N-linked chains (Asn13, Asn30) and 4 O-linked chains (Ser121, Ser127, Ser132, Ser138)'],
        ['Numbering', 'Mature-subunit numbering'],
        ['Receptor', 'LHCGR, a 675-amino-acid class A G protein-coupled receptor'],
        ['Genes', 'CGA for the alpha subunit (chromosome 6); a CGB gene cluster for the beta subunit (chromosome 19)'],
      ],
    ),
    p('The beta chain is about 80% homologous to LH-beta. It also carries a C-terminal extension that LH-beta lacks, and that extension holds the O-linked glycans. Sources give the extension as roughly 24 to 34 residues, depending on where they draw its boundary. None of these figures change between packaging formats.'),

    h4('HCG vs LH at a Glance'),
    table(
      ['Feature', 'HCG', 'LH'],
      [
        ['Structure', 'Alpha/beta glycoprotein heterodimer', 'Alpha/beta glycoprotein heterodimer'],
        ['Subunits', 'Shared alpha (92 amino acids); beta of 145 amino acids', 'Shared alpha (92 amino acids); a different beta chain'],
        ['Beta chain', 'Carries a C-terminal extension with O-linked glycans', 'About 80% homologous to HCG-beta, without that extension'],
        ['Receptor', 'LHCGR', 'LHCGR'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not offered'],
      ],
    ),
    p('This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given hormone engages.'),

    h4('Receptor Context'),
    h5('What does the LHCGR receptor do in assays?'),
    p('LHCGR is a class A G protein-coupled receptor with a large extracellular domain that binds both HCG and LH. It couples mainly to Gαs, which drives adenylyl cyclase and cAMP/PKA signaling, and it can also activate ERK and AKT pathways; at high hormone and receptor levels it couples to Gαq, which raises intracellular calcium. HCG, in either packaging format Veracue offers, is studied as a reference ligand on this receptor.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and other container terms describe packaging rather than chemistry, a methods section should still name the hormone precisely by subunit composition, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('IU vs Milligrams: Reading HCG Spray Amounts'),
    p('An international unit measures biological activity, not mass. WHO International Standards define it, and the value depends on the assay method. The 5th WHO International Standard for HCG carries 162 IU per ampoule by bioassay and 179 IU per ampoule by immunoassay, so the method belongs next to the number. This does not change between packaging formats.'),
    p('IU and mass are not interchangeable without the preparation\'s specific activity. Some reference preparations also contain carrier excipients, so container contents can differ from hormone mass alone. Veracue lists HCG Spray in 5000 IU and 10000 IU.'),

    h4('Analytical Characterization'),
    p('Identity and potency for HCG Spray are established the same way as for any HCG lot: immunochemical or chromatographic methods targeting subunit-specific regions to confirm identity, and a bioassay or immunoassay to establish potency against a reference standard. Mass-spectrometry identity for a glycoprotein reflects a distribution of glycoforms rather than one exact mass, so a single reported figure should be read with that in mind.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same hormone are verified against the same subunit, glycosylation and receptor references, listed on the HCG at a Glance table above.'),
    table(
      ['COA item', 'What to check', 'Why it matters for HCG Spray'],
      [
        ['Identity', 'Method and result that match HCG', 'Intact mass is a glycoform distribution, so one exact mass is not expected'],
        ['Source', 'Urine-derived, recombinant or other', 'Glycosylation follows the source and affects activity'],
        ['Potency', 'The unit and the assay type', 'IU values differ between bioassay and immunoassay'],
        ['Formulation', 'Excipients and carrier', 'Container contents can differ from hormone mass'],
        ['Lot traceability', 'A lot number that matches the label', 'Ties the data to the spray-format unit received'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a hormone in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, source, potency with its assay type, test date and testing laboratory. Where carrier or fill-volume figures are relevant to a spray-format unit, they are reported on that lot\'s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than other formats?'),
    p('No. The verification question is the same: does this lot match the stated hormone, and is the potency figure paired with the assay type that produced it. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does source still need to be stated?'),
    p('Recombinant and urine-derived HCG differ in glycosylation, which affects activity and clearance. If a lot\'s documentation leaves the source unstated, any potency comparison can carry a silent gap. Confirm the source on the lot\'s certificate regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated source, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('HCG Spray is supplied for laboratory and scientific research only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. HCG research material is not a diagnostic test, and this page contains no dosing, administration or usage guidance of any kind. The word "Spray" in the product name describes Veracue\'s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is HCG Spray?',
    answer: 'HCG Spray is Veracue\'s spray-dispensed packaging of human chorionic gonadotropin (HCG), a heterodimeric glycoprotein hormone built from a 92-amino-acid alpha subunit and a 145-amino-acid beta subunit that together activate the LHCGR receptor.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue\'s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in HCG Spray different from the HCG vial listing?',
    answer: 'No. Both listings describe the same hormone: a 92-amino-acid alpha subunit paired with a 145-amino-acid beta subunit, activating the LHCGR receptor. Only the packaging format differs.',
  },
  {
    question: 'Is HCG Spray a peptide?',
    answer: 'Not in the conventional sense. Across its two subunits HCG has 237 amino acids and carries carbohydrate chains making up about 30% of its mass. Short synthetic peptides are much smaller and typically carry no sugar chains.',
  },
  {
    question: 'How does HCG differ from LH?',
    answer: 'Both are alpha/beta glycoprotein hormones that share an alpha subunit and act on LHCGR. Their beta chains differ, HCG-beta carries a C-terminal extension with O-linked glycans, and the two chains are about 80% homologous.',
  },
  {
    question: 'What does IU mean for HCG Spray?',
    answer: 'IU stands for international unit, a measure of biological activity rather than mass. WHO International Standards define it, and values depend on the assay: the 5th standard carries 162 IU by bioassay and 179 IU by immunoassay.',
  },
  {
    question: 'What sizes does Veracue offer for HCG Spray?',
    answer: 'HCG Spray is offered in 5000 IU and 10000 IU for laboratory research use only. Amounts are stated in international units rather than milligrams.',
  },
  {
    question: 'Why does Veracue list HCG in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is HCG Spray characterized?',
    answer: 'The same way as any HCG lot: immunochemical or chromatographic identity methods and a bioassay or immunoassay for potency against a reference standard. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an HCG Spray certificate of analysis include?',
    answer: 'It should state product identity, source, a lot number matching the container received, potency with its assay type, test date and testing laboratory.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory and scientific research, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for HCG Spray?',
    answer: 'No. HCG Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'HCG Spray',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/choriogonadotropin alfa|ovitrelle|pregnyl|novarel/i, /pregnan|placent|fertil|testosterone|ovulat/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
