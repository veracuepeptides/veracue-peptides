import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// NAD+ Spray: the same oxidized nicotinamide adenine dinucleotide documented on the live NAD+ vial
// listing (scripts/product-import/nad-plus.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts (names, formula, mass, CAS, PubChem CID, ChEBI, KEGG) are reused
// unchanged from the vial page since it is the same compound; everything else below is written fresh
// and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific analytical notes. Research-use-only copy only: NAD+ is described at the
// molecular and enzyme/pathway level (redox cofactor, sirtuins, PARPs, CD38/CD157) with no outcome,
// anti-aging, longevity or energy-boost framing, no human trial content, and no dosing content beyond
// the single allowed negation, consistent with scripts/product-import/nad-plus.ts and
// scripts/product-import/sermorelin-spray.ts. docs/product-contents-2/veracue-nad-plus-spray-page.json
// was reviewed for structure only; its intranasal animal/cell-study citations, formulation-unknown
// framing and dosage-question framing are left out as inconsistent with site policy.

const NAME = 'NAD+ Spray'
const SLUG = 'nad-plus-spray'

const SKU_CODE = 'NADPLUS-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '500mg', image: 'VERACUE_Spray_NAD_Plus_500mg.jpg' },
  { strength: '1000mg', image: 'VERACUE_Spray_NAD_Plus_1000mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const NAD_LINK = [{ phrase: 'NAD+ vial listing', href: '/product/nad-plus' }]

const SEO_TITLE = 'NAD+ Spray Compound (CAS 53-84-9)'
const SEO_DESCRIPTION =
  'Veracue packages NAD+, the dinucleotide redox coenzyme behind CAS 53-84-9, as a lab-ready spray format with identity data for laboratory research use only.'
const DESCRIPTION =
  'NAD+ Spray supplies oxidized nicotinamide adenine dinucleotide, also known as Coenzyme I, Cozymase or beta-NAD, filed under CAS 53-84-9 and PubChem CID 5892. Written strictly as the cation it is C21H28N7O14P2+ at 664.44 g/mol average mass; most chemical databases instead publish the neutral inner-salt form, C21H27N7O14P2 at 663.43, one proton apart in bookkeeping for the same substance. Confirm which representation a certificate reports before comparing figures. Available in 500 mg and 1000 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is NAD+ Spray?'),
    p('NAD+ Spray is Veracue’s spray-dispensed packaging of NAD+, nicotinamide adenine dinucleotide in its oxidized form, a dinucleotide coenzyme built from a nicotinamide nucleotide and an adenine nucleotide joined through a ribose-phosphate-phosphate-ribose bridge. The underlying molecule is identical to the one documented on Veracue’s NAD+ vial listing; only the packaging and dispensing format differ between the two listings.', { links: NAD_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, hydrate state, concentration and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('NAD+ at a Glance'),
    kvTable([
      ['Product name', 'NAD+ Spray'],
      ['Scientific name', 'beta-Nicotinamide adenine dinucleotide'],
      ['USAN/INN', 'Nadide'],
      ['Other names', 'Coenzyme I, Cozymase, DPN, beta-NAD'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['CAS Registry Number', '53-84-9'],
      ['PubChem CID', '5892'],
      ['ChEBI', 'CHEBI:15846'],
      ['KEGG', 'C00003'],
      ['Formula (cation)', 'C21H28N7O14P2+'],
      ['Formula (zwitterion)', 'C21H27N7O14P2'],
      ['Average molecular weight', '664.44 (cation) / 663.43 (zwitterion)'],
      ['Oxidation state', 'Oxidized'],
      ['Classification', 'Dinucleotide coenzyme'],
      ['Sizes offered', '500 mg and 1000 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists NAD+ in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What NAD+ Spray Is Not'),
    ul([
      'Not a peptide. It has no amino acids and no peptide bonds.',
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the NAD+ documented on the vial listing.',
      'Not the same as NADH, NADP+, NADPH, NMN, NR or nicotinamide, which are related but distinct compounds.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('NAD+ Spray and Veracue’s NAD+ vial listing describe one molecule. The plus sign refers to the positive charge on the nicotinamide ring nitrogen; written strictly as that cation the formula is C21H28N7O14P2+ with an average mass of 664.44, while most chemical databases, including PubChem CID 5892, instead publish the neutral inner-salt form, C21H27N7O14P2 at 663.43. Both describe the same substance under the same CAS number, 53-84-9. Packaging format has no bearing on which formula or mass applies, so these values are identical across both listings.', { links: NAD_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same oxidized dinucleotide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone, and should still confirm whether the lot in hand is a hydrate, since published molecular weights are anhydrous values.'),

    h4('NAD+ Alongside Related Coenzymes'),
    p('Several molecules are easily confused with NAD+. The table below is for orientation only: it compares molecular identity, not research outcomes.'),
    table(
      ['Entity', 'What it is', 'Relationship to NAD+'],
      [
        ['NAD+', 'Oxidized nicotinamide adenine dinucleotide', 'The reference entity on this listing'],
        ['NADH', 'The reduced form of the same coenzyme', 'Redox partner; same molecule, different electron state'],
        ['NADP+', 'A phosphorylated cofactor, C21H28N7O17P3+', 'A separate cofactor system, not interchangeable'],
        ['NADPH', 'The reduced form of NADP+', 'Distinct from NADH in its metabolic role'],
        ['Nicotinamide (NAM)', 'A B3-related metabolite, C6H6N2O', 'Released when NAD+ is consumed, fed back through salvage'],
        ['NMN', 'Nicotinamide mononucleotide, C11H15N2O8P', 'The immediate precursor, converted to NAD+ by NMNAT'],
      ],
    ),
    p('Results generated with a related molecule, such as NMN or nicotinamide, are not results for NAD+ itself, and the table above should be read as a map of distinct identifiers rather than a ranking.'),

    h4('Enzyme and Pathway Context'),
    h5('What roles does NAD+ have in biochemical systems?'),
    p('Two roles are documented for this coenzyme at the enzyme level. As a redox cofactor, NAD+ accepts a hydride to form NADH, and that couple runs through the enzymes of glycolysis, the TCA cycle and oxidative phosphorylation. Separately, NAD+ acts as a consumed co-substrate: sirtuins and PARPs cleave it rather than cycling it, as do the NADases CD38 and CD157, and each of these reactions releases nicotinamide, which can re-enter the salvage pathway through NAMPT and NMNAT.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by CAS number or formula, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general enzyme-level context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and content for NAD+ Spray are established the same way as for any NAD+ lot: reverse-phase HPLC with UV detection for chromatographic purity, mass spectrometry to confirm an observed mass consistent with the molecule, a UV scan to confirm redox state, and Karl Fischer titration to establish water content on a hydrated lot. Packaging format has no bearing on which analytical methods apply.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC (UV, area %)', 'Chromatographic purity under one stated method', 'Molecular identity; water content; salt form'],
        ['LC-MS', 'A measured mass consistent with the expected molecule', 'Purity; anything mass-identical, including isomers'],
        ['UV scan, A260 and A340', 'Redox state. NADH absorbs near 340 nm, NAD+ does not', 'Purity against impurities that do not absorb there'],
        ['Karl Fischer titration', 'Water content, converting an as-supplied figure to anhydrous', 'Chemical purity'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity and CAS number, the specific form (free acid, salt or hydrate), lot number, purity result with method named, assay or content result, water content where relevant, test date and testing laboratory. Where concentration figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule and form, and is the purity figure paired with a mass or assay result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('The cation and zwitterion forms of NAD+ carry slightly different reference masses, and a hydrate or salt form shifts the figure again. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching reference mass, regardless of packaging format.'),
    h5('Can chromatographic purity alone confirm the anomeric configuration?'),
    p('No. Beta-NAD is the biologically relevant configuration, and the alpha-anomer is an isomer with an identical molecular mass, so HPLC and mass spectrometry alone cannot separate the two. Chromatographic resolution under a method suited to that distinction, or an enzymatic assay, is what settles the question.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('NAD+ Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is NAD+ Spray?',
    answer: 'NAD+ Spray is Veracue’s spray-dispensed packaging of NAD+, nicotinamide adenine dinucleotide in its oxidized form, a dinucleotide coenzyme rather than a peptide, supplied under CAS 53-84-9.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in NAD+ Spray different from the NAD+ vial listing?',
    answer: 'No. Both listings describe the same compound under CAS 53-84-9 and PubChem CID 5892, written as the cation C21H28N7O14P2+ at 664.44 or as the zwitterion C21H27N7O14P2 at 663.43. Only the packaging format differs.',
  },
  {
    question: 'Is NAD+ a peptide?',
    answer: 'No. NAD+ is a dinucleotide coenzyme built from a nicotinamide nucleotide and an adenine nucleotide joined through a ribose-phosphate bridge. It contains no amino acids and no peptide bonds.',
  },
  {
    question: 'What is the difference between NAD+ and NADH?',
    answer: 'They are the two redox states of the same coenzyme. NAD+ is the oxidized form and accepts a hydride to become NADH, the reduced form. NADH absorbs strongly near 340 nm and NAD+ effectively does not.',
  },
  {
    question: 'Is NAD+ the same as NMN or NR?',
    answer: 'No. NMN (nicotinamide mononucleotide, C11H15N2O8P) is the immediate precursor converted to NAD+ by NMNAT, and NR (nicotinamide riboside) is an upstream precursor converted toward NMN. Both are separate, smaller molecules from NAD+.',
  },
  {
    question: 'Why does Veracue list NAD+ in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'What enzymes consume NAD+ in biochemical research?',
    answer: 'Sirtuins and PARPs cleave NAD+ as a co-substrate rather than cycling it, as do the NADases CD38 and CD157. Each reaction releases nicotinamide, which can re-enter the salvage pathway through NAMPT and NMNAT.',
  },
  {
    question: 'How is NAD+ Spray characterized?',
    answer: 'The same way as any NAD+ lot: reverse-phase HPLC with UV detection for purity, mass spectrometry for identity, a UV scan for redox state, and Karl Fischer titration for water content. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a NAD+ Spray certificate of analysis include?',
    answer: 'It should state product identity and CAS number, the specific form (free acid, salt or hydrate), a lot number matching the container received, purity and assay results with methods named, water content where relevant, test date and testing laboratory.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for NAD+ Spray?',
    answer: 'No. NAD+ Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'NAD+ Spray',
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
