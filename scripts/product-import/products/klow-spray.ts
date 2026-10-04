import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// KLOW Spray: the same multi-component research blend documented on the live KLOW vial listing
// (scripts/product-import/klow.ts), offered here in Veracue's spray-dispensed packaging format.
// Composition facts (the four components most often named under the KLOW name, and the fact that
// a blend carries no single sequence, formula or molecular weight) are reused unchanged from the
// vial page since both listings describe the same blend; everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, blend-level COA guidance,
// and format-specific comparisons. Research-use-only copy only: no human trial, dosing, outcome
// or cosmetic-benefit content, consistent with scripts/product-import/klow.ts. The client draft at
// docs/product-contents-2/klow-spray.json was mined for section structure only; its benefit framing,
// evidence-level language, dosage/search-intent sections and reference list were left out to match
// site policy, and its purity/COA claims attributed to the vial SKU were not carried over since
// klow.ts does not state them.

const NAME = 'KLOW Spray'
const SLUG = 'klow-spray'

const SKU_CODE = 'KLOW-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '80mg', image: 'VERACUE_Spray_KLOW_80mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const KLOW_LINK = [{ phrase: 'KLOW vial listing', href: '/product/klow' }]

const SEO_TITLE = 'KLOW Spray Research Blend'
const SEO_DESCRIPTION =
  'KLOW Spray is Veracue’s spray-dispensed packaging of the KLOW research blend, with component identity and COA guidance for laboratory research use only.'
const DESCRIPTION =
  'KLOW Spray is Veracue’s spray-dispensed form of KLOW, a blend name used in the research-peptide market rather than a defined single molecule. Listings using this name most often name four components: KPV (Lys-Pro-Val), GHK-Cu (copper-bound Gly-His-Lys), BPC-157 (the 15-residue GEPPPGKPADDAGLV) and TB-500 (the fragment Ac-LKKTETQ). Because KLOW is a mixture, no single sequence, formula or molecular weight applies to it as a whole; each named component carries its own identity and CAS number. Supplied as an 80 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is KLOW Spray?'),
    p('KLOW Spray is Veracue’s spray-dispensed packaging of KLOW, a blend name used in the research-peptide market rather than a single peptide molecule. The underlying blend is identical to the one documented on Veracue’s KLOW vial listing; only the packaging and dispensing format differ between the two listings.', { links: KLOW_LINK }),
    p('A single peptide name points to one sequence, one formula and one molecular weight. KLOW points to a mixture, so none of those apply to the blend as a whole, regardless of which packaging format it is supplied in. Combining the components does not create a new molecule.'),
    h4('What "Spray" Means on This Listing'),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Component ratio, chemical form, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('KLOW Spray at a Glance'),
    kvTable([
      ['Product name', 'KLOW Spray'],
      ['Product type', 'Multi-component research blend'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Size offered', '80 mg'],
      ['Components most often named in listings', 'KPV, GHK-Cu, BPC-157 and TB-500'],
      ['Single sequence or molecular weight', 'None applies, because the product is a mixture'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Component amounts, ratio, physical form, excipients, purity and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What KLOW Spray Is Not'),
    ul([
      'Not a single peptide or one defined amino acid sequence.',
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not the same as any one of its components on its own.',
      'Not a standardized composition. Supplier blends sold under the same name can differ, so only the documentation for a specific lot describes that unit.',
      'Not a consumer, dietary or cosmetic product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Component Identity, Carried Over From the Vial Listing'),
    p('KLOW Spray and Veracue’s KLOW vial listing describe one blend. The four components below are the ones most often named in listings that use the KLOW name, and packaging format has no bearing on which components are named or how each is identified.', { links: KLOW_LINK }),
    h5('What is KPV?'),
    p('KPV is a tripeptide made of lysine, proline and valine. Its sequence corresponds to the C-terminal region of alpha-melanocyte-stimulating hormone.'),
    h5('What is GHK-Cu?'),
    p('GHK-Cu is the copper(II) complex of the tripeptide glycyl-L-histidyl-L-lysine. It is a peptide-copper complex, not an unmodified peptide, so both the peptide identity and the copper content need to be specified.'),
    h5('What is BPC-157?'),
    p('BPC-157 is a synthetic pentadecapeptide, meaning a chain of fifteen amino acids. Its sequence corresponds to a partial sequence of a larger protein found in gastric juice.'),
    h5('What is TB-500?'),
    p('TB-500 is a market term whose meaning can vary between suppliers. It can refer to a short synthetic fragment of thymosin beta-4 or, in some listings, to the full-length protein. The exact species should be taken from the product documentation or lot-specific analytical record rather than assumed from the label.'),
    table(
      ['Component', 'Molecular class', 'Identity note'],
      [
        ['KPV', 'Tripeptide (Lys-Pro-Val)', 'Corresponds to the C-terminal region of alpha-melanocyte-stimulating hormone'],
        ['GHK-Cu', 'Peptide-copper complex', 'Copper(II) complex of Gly-His-Lys; copper content is its own measurement'],
        ['BPC-157', 'Pentadecapeptide', 'Synthetic; partial sequence of a larger protein found in gastric juice'],
        ['TB-500', 'Thymosin beta-4 fragment or full-length protein', 'Species varies between suppliers and should be confirmed from lot documentation'],
      ],
    ),

    h4('Why a Separate Listing for the Same Blend?'),
    p('Veracue lists KLOW in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h5('Does the spray format change the composition?'),
    p('No. The blend reported under this listing is the same KLOW composition reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not which components are named or how each is identified.'),

    h4('Research Context'),
    h5('Does research on one component describe the blend?'),
    p('No. Each component has its own separate literature, tied to its own models and materials. A finding for one peptide answers a question about that peptide, not about a four-component mixture, and no direct study of the KLOW combination was identified. Nothing here describes a combined effect, in either packaging format.'),
    h5('Is KLOW Spray the same as Glow?'),
    p('Not necessarily. KLOW and Glow are market blend names whose compositions can vary by supplier. Market usage often distinguishes KLOW by the addition of KPV, but that is not a universal formulation, so compare documentation rather than names.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than composition, a methods section should still name each component precisely by sequence or CAS number where applicable, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a KLOW Spray Certificate of Analysis'),
    p('A blend certificate has to answer more questions than a single-peptide one, because one headline number cannot describe several molecules. It should name the lot, identify every component and make clear which component each result refers to. Packaging format has no bearing on which analytical methods apply; a spray-dispensed lot and a vial lot of the same blend are verified against the same component identities listed in the table above.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to one production lot', 'Anything at all unless it matches the unit label'],
        ['Component identities', 'Which molecules the report says are present', 'That each is present at the stated amount'],
        ['Component-level results', 'How each individual component performed under test', 'Blend-level behavior in solution'],
        ['HPLC purity', 'Share of detected signal in the stated peak or peaks', 'Identity or component amounts'],
        ['Mass spectrometry and identity data', 'Whether observed masses match the expected species', 'Purity, or how much material is present'],
        ['Purity scope (blend or component)', 'Whether the number covers the mixture or one ingredient', 'Component-level certainty, if the figure is blend-level'],
        ['Testing laboratory and date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    p('A generic certificate for one component does not prove the identity, composition or purity of the finished blend. Certificates vary between laboratories, so treat this as what a COA may include, and see the certificate page for how lot documentation is published.', { links: CERT }),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a blend in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('For the copper complex, copper content should be confirmed as its own measurement rather than assumed from the peptide result alone, regardless of which packaging format the lot was supplied in.'),

    h4('Verification Questions, Answered'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot identify every component, and is each component’s identity result paired with the method used to produce it. Packaging format does not change what counts as adequate documentation.'),
    h5('Is the purity blend-level or component-level?'),
    p('The report should say which. A single blended percentage can hide a shortfall in one component, so a value for each is more informative, in either packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated component list, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('KLOW Spray is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, cosmetic, supplement or food, and it is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. Handle the material as a laboratory chemical, with appropriate protective equipment and institutional safety practice. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is KLOW Spray?',
    answer: 'KLOW Spray is Veracue’s spray-dispensed packaging of KLOW, a blend name used in the research-peptide market, not a single peptide molecule or a defined amino acid sequence.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the blend in KLOW Spray different from the KLOW vial listing?',
    answer: 'No. Both listings describe the same blend, most often associated with four components: KPV, GHK-Cu, BPC-157 and TB-500. Only the packaging format differs.',
  },
  {
    question: 'What is in KLOW Spray?',
    answer: 'Listings that use the KLOW name most often describe four components: KPV, GHK-Cu, BPC-157 and TB-500. Component amounts and ratio are reported on each lot’s documentation and can be requested through the contact page.',
  },
  {
    question: 'What size does KLOW Spray come in?',
    answer: 'The size offered is 80 mg. That figure describes the unit, and it does not state how the material divides between components.',
  },
  {
    question: 'Is the KLOW Spray composition standardized?',
    answer: 'No. Supplier compositions can differ under the same blend name, so only the documentation for a specific lot describes that unit.',
  },
  {
    question: 'Is KLOW Spray the same as Glow?',
    answer: 'Not necessarily. Both are market blend names whose compositions can vary by supplier. Market usage often distinguishes KLOW by the addition of KPV, but that is not a universal formulation.',
  },
  {
    question: 'Why does Veracue list KLOW in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'What should a KLOW Spray certificate of analysis include?',
    answer: 'It should state the lot number, identify every component, name the method behind each result, say whether purity is blend-level or component-level, and give the testing laboratory and date. A certificate for one component alone does not prove the finished blend.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for KLOW Spray?',
    answer: 'No. KLOW Spray is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'KLOW Spray',
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
