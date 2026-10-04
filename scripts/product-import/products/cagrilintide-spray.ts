import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Cagrilintide Spray: the same AM833 lipidated amylin-analogue molecule documented on the live
// Cagrilintide vial listing (scripts/product-import/cagrilintide.ts), offered here in Veracue's
// spray-dispensed packaging format. Molecular identity facts (sequence, formula, mass, CAS) are
// reused unchanged from the vial page since it is the same compound; everything else is written
// fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification
// for this format, and receptor-context research framing. Research-use-only copy only: no human
// trial, clinical, weight-adjacent, or dosing content, consistent with scripts/product-import/cagrilintide.ts.
// The client draft at docs/product-contents-2/cagrilintide-spray.json mixed usable structure with
// policy-violating material (CagriSema combination trials, weight/appetite framing, regulatory
// status commentary); none of that content is reused here.

const NAME = 'Cagrilintide Spray'
const SLUG = 'cagrilintide-spray'

const SKU_CODE = 'CAGRI-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_Cagrilintide_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const CAGRI_LINK = [{ phrase: 'Cagrilintide vial listing', href: '/product/cagrilintide' }]

const SEO_TITLE = 'Cagrilintide Spray Peptide (AM833)'
const SEO_DESCRIPTION =
  'Veracue packages the amylin analogue Cagrilintide, AM833, as a spray-dispensed liquid with identity data and lot checks for laboratory research only.'
const DESCRIPTION =
  'Cagrilintide Spray delivers Cagrilintide, development code AM833, a 37-residue amylin analogue carrying a C20 fatty diacid attached at the lysine in position 1 through a hydrophilic linker. The sequence is KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP, folded by an intramolecular disulfide bridge, with free-acid formula C194H312N54O59S2, about 4,409 g/mol, CAS 1415456-99-3. The lipid attachment is what separates it from unmodified amylin fragments and should be confirmed on any lot’s documentation. Offered as a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Cagrilintide Spray?'),
    p('Cagrilintide Spray is Veracue’s spray-dispensed packaging of Cagrilintide, a synthetic, lipidated analogue of amylin coded AM833. The underlying molecule is identical to the one documented on Veracue’s Cagrilintide vial listing; only the packaging and dispensing format differ between the two listings.', { links: CAGRI_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Cagrilintide at a Glance'),
    kvTable([
      ['Product name', 'Cagrilintide Spray'],
      ['Development code', 'AM833'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Molecular class', 'Acylated (lipidated) amylin analogue'],
      ['Backbone', '37-amino-acid linear peptide with an intramolecular disulfide bridge'],
      ['Lipid attachment', 'C20 fatty diacid on the lysine at position 1, through a hydrophilic linker'],
      ['Sequence', 'KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP'],
      ['Molecular formula (free acid)', 'C194H312N54O59S2'],
      ['Molecular weight (free acid)', 'About 4,409 g/mol'],
      ['CAS Registry Number', '1415456-99-3'],
      ['Size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Cagrilintide in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Cagrilintide Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not native amylin. It shares the backbone but is a deliberately modified molecule.',
      'Not a blend or a product combining several peptides.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Cagrilintide Spray and Veracue’s Cagrilintide vial listing describe one molecule: a 37-amino-acid linear peptide with an intramolecular disulfide bridge and a C20 fatty diacid conjugated at the lysine in position 1. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: CAGRI_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same AM833 lipidated amylin analogue reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Receptor Context'),
    p('Receptor pharmacology work characterizes Cagrilintide as a nonselective agonist across calcitonin-family G protein-coupled receptors, with reported binding at amylin receptors and the calcitonin receptor. It is commonly described in the literature as a dual amylin and calcitonin receptor agonist, a classification that holds for Cagrilintide regardless of which packaging format a lot is supplied in.'),
    table(
      ['Item', 'Detail'],
      [
        ['Receptor systems', 'Amylin receptors (AMY1 to AMY3) and the calcitonin receptor (CTR)'],
        ['Activity type', 'Nonselective agonist in receptor assays'],
        ['Receptor family', 'Calcitonin-family G protein-coupled receptors'],
        ['Catalog formats Veracue offers', 'Vial and spray'],
      ],
    ),
    p('This table reports receptor-binding classification only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptors a given lot engages.'),

    h4('Why the Lipid Modification Matters for Identity Checks'),
    p('The C20 fatty diacid attached at position 1 adds substantial mass relative to the unmodified 37-residue backbone, which is why a mass-spectrometry comparison against the lipidated reference mass, rather than against the mass of native amylin, is the correct identity check for this molecule in either packaging format.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Cagrilintide Spray are established the same way as for any Cagrilintide lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry to confirm that the observed mass matches the molecule’s theoretical lipidated mass. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related or non-lipidated peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references listed on the Cagrilintide at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['Mass spectrometry', 'Mass consistent with lipidated Cagrilintide', 'Sequence order; purity'],
        ['Net peptide content', 'Peptide mass versus salts or residual water', 'Identity of impurities'],
        ['Molecular form declared', 'Which chemical form the reported data applies to', 'Purity or identity on its own'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with method stated, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the declared chemical form still matter?'),
    p('Cagrilintide’s lipidated structure means its reference mass differs substantially from native amylin or from a non-lipidated analogue. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching reference mass, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Cagrilintide Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Cagrilintide Spray?',
    answer: 'Cagrilintide Spray is Veracue’s spray-dispensed packaging of Cagrilintide, a synthetic, lipidated analogue of amylin carrying the development code AM833.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Cagrilintide Spray different from the Cagrilintide vial listing?',
    answer: 'No. Both listings describe the same compound: a 37-residue backbone, sequence KCNTATCATQRLAEFLRHSSNNFGPILPPTNVGSNTP, formula C194H312N54O59S2, about 4,409 g/mol as the free acid, CAS 1415456-99-3. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Cagrilintide?',
    answer: 'The CAS number is 1415456-99-3, the same identifier that applies to Cagrilintide regardless of packaging format.',
  },
  {
    question: 'Is Cagrilintide the same as native amylin?',
    answer: 'No. Cagrilintide shares the native amylin backbone but is a deliberately modified molecule, carrying a C20 fatty diacid conjugated at the lysine in position 1.',
  },
  {
    question: 'Which receptors does Cagrilintide act on in research?',
    answer: 'Published receptor pharmacology work reports it as a nonselective agonist at amylin receptors (AMY1 to AMY3) and the calcitonin receptor, commonly described as a dual amylin and calcitonin receptor agonist.',
  },
  {
    question: 'Why does Veracue list Cagrilintide in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Cagrilintide Spray characterized?',
    answer: 'The same way as any Cagrilintide lot: reverse-phase HPLC for purity and mass spectrometry for identity against the lipidated reference mass, with net peptide content adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Cagrilintide Spray certificate of analysis include?',
    answer: 'It should state product identity, declared chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Cagrilintide Spray?',
    answer: 'No. Cagrilintide Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Cagrilintide Spray',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/cagrisema/i, /retatrutide/i, /semaglutide/i, /tirzepatide/i, /novo\s*nordisk/i, /redefine/i, /reimagine/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
