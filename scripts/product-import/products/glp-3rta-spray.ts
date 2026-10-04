import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// GLP-3RTA Spray: the same lipid-conjugated triple-receptor molecule documented on the live
// GLP-3RTA vial listing (scripts/product-import/glp-3rta.ts), offered here in Veracue's
// spray-dispensed packaging format. Molecular identity facts (research code, formula, mass,
// CAS, lipid attachment, receptor targets) are reused unchanged from the vial page since it is
// the same compound; everything else is written fresh and focused on what "Spray" means as a
// packaging/dispensing descriptor, lot verification for this format, and format-specific
// framing. Research-use-only copy only: no human trial, weight-related, or dosing content,
// consistent with scripts/product-import/glp-3rta.ts. The underlying drug/chemical name is
// never used anywhere in this file; the catalog code name GLP-3RTA is used throughout instead.

const NAME = 'GLP-3RTA Spray'
const SLUG = 'glp-3rta-spray'

const SKU_CODE = 'GLP3RTA-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_GLP_3RTA_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Spray_GLP_3RTA_20mg.jpg' },
  { strength: '30mg', image: 'VERACUE_Spray_GLP_3RTA_30mg.jpg' },
  { strength: '60mg', image: 'VERACUE_Spray_GLP_3RTA_60mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const GLP3RTA_LINK = [{ phrase: 'GLP-3RTA vial listing', href: '/product/glp-3rta' }]

const SEO_TITLE = 'GLP-3RTA Spray Research Peptide'
const SEO_DESCRIPTION =
  "GLP-3RTA Spray is Veracue's liquid dispensing format of the triple-receptor research peptide, with identity data provided strictly for laboratory research."
const DESCRIPTION =
  'GLP-3RTA Spray delivers GLP-3RTA, research code LY3437943, a 39-amino-acid peptide backbone conjugated to a C20 fatty diacid at the lysine in position 17. This single engineered molecule is studied for activity across three receptor targets, GIPR, GLP-1R and GCGR, rather than acting as a blend of separate compounds. Its reference values are C221H342N46O68, about 4,731 g/mol average mass, CAS 2381089-83-2. Veracue offers this spray-dispensed peptide in 10 mg, 20 mg, 30 mg and 60 mg sizes, strictly for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is GLP-3RTA Spray?'),
    p('GLP-3RTA Spray is Veracue’s spray-dispensed packaging of GLP-3RTA, a synthetic peptide engineered as a single molecule that carries a lipid attachment and is studied for activity across three receptor systems at once. The underlying molecule is identical to the one documented on Veracue’s GLP-3RTA vial listing; only the packaging and dispensing format differ between the two listings.', { links: GLP3RTA_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('GLP-3RTA Spray at a Glance'),
    kvTable([
      ['Product name', 'GLP-3RTA Spray'],
      ['Research code', 'LY3437943 (also LY-3437943)'],
      ['Packaging format', 'Spray-dispensed liquid, Research Use Only'],
      ['Molecular class', '39-amino-acid peptide conjugated to a C20 fatty diacid'],
      ['Receptor targets', 'GIPR, GLP-1R and GCGR (agonist activity in receptor assays)'],
      ['Lipid attachment', 'C20 fatty diacid through a linker at lysine 17'],
      ['Molecular formula', 'C221H342N46O68'],
      ['Molecular weight (average)', 'About 4,731 g/mol'],
      ['Monoisotopic mass', 'About 4,728.47 Da'],
      ['CAS Registry Number', '2381089-83-2'],
      ['Sizes offered', '10 mg, 20 mg, 30 mg and 60 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists GLP-3RTA in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What GLP-3RTA Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the GLP-3RTA documented on the vial listing.',
      'Not a physical mixture of three separate peptides or hormones.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('GLP-3RTA Spray and Veracue’s GLP-3RTA vial listing describe one engineered molecule: a 39-amino-acid peptide backbone carrying a C20 fatty diacid through a linker at lysine 17, built so that a single structure can engage three receptor systems rather than relying on a blend of separate compounds. Packaging format has no bearing on formula or mass, so these values are identical across both listings.', { links: GLP3RTA_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same lipid-conjugated peptide reported under the vial listing, research code LY3437943. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('One Molecule, Three Receptor Systems'),
    p('GLP-3RTA Spray carries over a central identity point unchanged from the vial listing: it is one engineered molecule, not three compounds mixed together. In reported receptor assays it shows a distinct balance of activity across the GIP, GLP-1 and glucagon receptors. "Spray" describes how this listing is packaged and dispensed; it has no bearing on which receptors the molecule engages or how.'),
    table(
      ['Receptor', 'Full name', 'Research background'],
      [
        ['GIPR', 'Glucose-dependent insulinotropic polypeptide receptor', 'Linked to glucose-dependent insulin secretion'],
        ['GLP-1R', 'Glucagon-like peptide-1 receptor', 'Linked to glucose-dependent insulin secretion'],
        ['GCGR', 'Glucagon receptor', 'Mainly known for glucagon’s role in glucose and energy metabolism'],
      ],
    ),
    p('This table describes receptor biology only. It applies equally to the vial and spray-dispensed packaging of GLP-3RTA, since packaging format does not change which receptors a given molecule engages.'),

    h4('Receptor Context'),
    h5('What does each receptor contribute in research systems?'),
    p('GIPR and GLP-1R are both linked to glucose-dependent insulin secretion, while GCGR is mainly known for glucagon’s role in glucose and energy metabolism. Researchers have proposed that engaging all three receptors from one molecule may produce signaling patterns that differ from single- or dual-receptor peptides. How the three signals interact remains an open research question, independent of which Veracue packaging format a lot was supplied in.'),
    h5('How should packaging format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by research code, formula or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for GLP-3RTA Spray are established the same way as for any GLP-3RTA lot. Because the molecule is a lipid-conjugated peptide rather than a simple chain, liquid chromatography paired with mass spectrometry is used to confirm that an intact mass matches the molecule’s theoretical value. Chromatography alone shows that most detected material elutes together; it does not by itself confirm identity, since a related lipidated peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same formula and mass references listed on the GLP-3RTA Spray at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['LC-MS / ESI-MS', 'Intact mass consistent with GLP-3RTA', 'Chromatographic purity'],
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['Tandem MS', 'Sequence or fragment evidence', 'Quantity or purity'],
        ['Charge-state deconvolution', 'Neutral mass derived from multiply charged ions', 'Identity on its own'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, chromatography result, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the lipid attachment still need to be confirmed?'),
    p('GLP-3RTA’s C20 fatty diacid is part of its identity, not an incidental feature. An identity result should show a mass consistent with the intact conjugate rather than the bare peptide backbone alone. Confirm this on the lot’s certificate regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GLP-3RTA Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GLP-3RTA Spray?',
    answer: 'GLP-3RTA Spray is Veracue’s spray-dispensed packaging of GLP-3RTA, a synthetic peptide engineered as a single molecule carrying a lipid attachment, studied for activity across three receptor systems at once.',
  },
  {
    question: 'Does "Spray" mean this listing has a different concentration or route than the vial listing?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in GLP-3RTA Spray different from the GLP-3RTA vial listing?',
    answer: 'No. Both listings describe the same compound: a 39-amino-acid peptide backbone with a C20 fatty diacid at lysine 17, formula C221H342N46O68, about 4,731 g/mol, research code LY3437943, CAS 2381089-83-2. Only the packaging format differs.',
  },
  {
    question: 'What is the research code and CAS number for GLP-3RTA?',
    answer: 'The research code is LY3437943, also written LY-3437943, and the CAS Registry Number is 2381089-83-2, the same identifiers that apply regardless of packaging format.',
  },
  {
    question: 'Is GLP-3RTA a single peptide or a blend of three peptides?',
    answer: 'It is one engineered molecule, not a mixture. A 39-amino-acid backbone carrying a C20 fatty diacid is built so that a single structure can engage three receptors rather than combining separate compounds.',
  },
  {
    question: 'Which receptors does GLP-3RTA Spray engage?',
    answer: 'In receptor assays, the molecule shows activity at GIPR, GLP-1R and GCGR. These receptor targets are a property of the molecule itself and do not change between the vial and spray packaging formats.',
  },
  {
    question: 'Why does Veracue list GLP-3RTA in more than one packaging format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is GLP-3RTA Spray characterized?',
    answer: 'The same way as any GLP-3RTA lot: liquid chromatography paired with mass spectrometry to confirm an intact mass consistent with the lipid-conjugated structure. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a GLP-3RTA Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with a chromatography result and a mass spectrometry result showing observed against theoretical mass for the intact conjugate.',
  },
  {
    question: 'Why does the lipid attachment matter when verifying a lot?',
    answer: 'The C20 fatty diacid is part of the molecule’s identity, so an identity result should confirm a mass consistent with the full conjugate rather than the bare peptide backbone alone, regardless of packaging format.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for GLP-3RTA Spray?',
    answer: 'No. GLP-3RTA Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GLP-3RTA Spray',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/retatrutide/i, /reta/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
