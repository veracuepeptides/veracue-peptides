import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Melanotan 1 Spray: the same linear alpha-MSH analogue ([Nle4, D-Phe7]-alpha-MSH) documented on
// the live Melanotan 1 vial listing (scripts/product-import/melanotan-1.ts), offered here in
// Veracue's spray-dispensed packaging format. Molecular identity facts (sequence, formula, mass,
// CAS) are reused unchanged from the vial page since it is the same compound; everything else is
// written fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot
// verification for this format, and format-specific framing. Research-use-only copy only: no
// human trial, dosing, tanning or pigmentation-outcome content, consistent with
// scripts/product-import/melanotan-1.ts. The source draft at
// docs/product-contents-2/melanotan-1-spray-schema.json is only a JSON-LD schema stub (no hero
// copy, no tabs); its FAQ list and alternate-name list informed this file, but its pigmentation
// and afamelanotide references were left out as outcome/indication and regulatory framing that
// the site policy does not allow.

const NAME = 'Melanotan 1 Spray'
const SLUG = 'melanotan-1-spray'

const SKU_CODE = 'MT1-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_Melanotan_1_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const MT1_LINK = [{ phrase: 'Melanotan 1 vial listing', href: '/product/melanotan-1' }]

const SEO_TITLE = 'Melanotan 1 Spray Peptide (MT-1)'
const SEO_DESCRIPTION =
  'Veracue packages the linear 13-residue Melanotan 1 peptide, CAS 75921-69-6, in a spray-top research format, documented for laboratory research use only.'
const DESCRIPTION =
  'Melanotan 1 Spray supplies Melanotan 1, structural name [Nle4, D-Phe7]-alpha-MSH, a linear 13-residue analogue of alpha-MSH carrying norleucine in place of methionine at position 4 and D-phenylalanine in place of phenylalanine at position 7. Its formula is C78H111N21O19, reference molecular weight about 1,646.8 g/mol, CAS 75921-69-6. It is a different, linear molecule from the cyclic heptapeptide Melanotan 2, and the two should never be confused when comparing masses. Available as a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Melanotan 1 Spray?'),
    p('Melanotan 1 Spray is Veracue’s spray-dispensed packaging of Melanotan 1, a synthetic melanocortin peptide analogue built on the structure of alpha-MSH, with norleucine in place of methionine at position 4 and D-phenylalanine in place of phenylalanine at position 7. The underlying molecule is identical to the one documented on Veracue’s Melanotan 1 vial listing; only the packaging and dispensing format differ between the two listings.', { links: MT1_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Melanotan 1 at a Glance'),
    kvTable([
      ['Product name', 'Melanotan 1 Spray'],
      ['Also written', 'Melanotan-1, Melanotan-I, MT-1, MT1'],
      ['Structural name', '[Nle4, D-Phe7]-alpha-MSH'],
      ['Peptide class', 'Synthetic melanocortin peptide; alpha-MSH analogue'],
      ['Packaging format', 'Spray-top bottle, Research Use Only'],
      ['Length', '13 residues, linear'],
      ['Sequence', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2'],
      ['Molecular formula', 'C78H111N21O19'],
      ['Reference molecular weight', 'Approximately 1,646.8 g/mol'],
      ['CAS Registry Number', '75921-69-6'],
      ['Size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Melanotan 1 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Melanotan 1 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Melanotan 1 documented on the vial listing.',
      'Not Melanotan 2, which is a different, cyclic molecule with a different mass.',
      'Not the native hormone alpha-MSH, which lacks the norleucine and D-phenylalanine substitutions.',
      'Not a consumer, cosmetic or dietary product, and not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Melanotan 1 Spray and Veracue’s Melanotan 1 vial listing describe one molecule: a linear tridecapeptide with an acetylated N-terminus and an amidated C-terminus, full structural name [Nle4, D-Phe7]-alpha-MSH. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: MT1_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same alpha-MSH analogue reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Melanotan 1 vs Melanotan 2'),
    p('The two names are often used as if they were interchangeable. They are different molecules that share a receptor-recognition motif, and the comparison here is scientific only.'),
    table(
      ['Attribute', 'Melanotan 1', 'Melanotan 2'],
      [
        ['Molecular class', 'Linear alpha-MSH analogue', 'Cyclic alpha-MSH analogue'],
        ['Structure', 'Linear tridecapeptide', 'Cyclic heptapeptide (lactam-bridged)'],
        ['Sequence', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2'],
        ['Approximate molecular weight', '1,646.8 g/mol', '1,024.2 g/mol'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial'],
      ],
    ),
    p('This table compares molecular structure only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and figures quoted for Melanotan 2 should not be applied to Melanotan 1.'),

    h4('Receptor Context'),
    h5('Which receptor is involved?'),
    p('The research interest centres on the melanocortin 1 receptor (MC1R), which responds to alpha-MSH and its analogues. In receptor-expressing cell systems, activation of the receptor raises intracellular cyclic AMP. A stable analogue like Melanotan 1, in either packaging format Veracue offers, gives researchers a practical tool for probing that signalling under controlled laboratory conditions.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Melanotan 1 Spray are established the same way as for any Melanotan 1 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Melanotan 1 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Melanotan 1', 'Sequence order; purity'],
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
    h5('Why do mass figures sometimes differ between sources?'),
    p('Conventions vary. A source may report average or monoisotopic mass, and it may describe the free peptide or a salt form. When comparing figures for a spray-format lot against a reference value, check which convention is in use before assuming two numbers disagree about identity.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),

    h4('Need lot documentation for Melanotan 1 Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Melanotan 1 Spray is supplied for laboratory research and analytical characterization only. It is not a drug, cosmetic, dietary supplement or food, and it is not intended for human or veterinary use, ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Melanotan 1 Spray?',
    answer: 'Melanotan 1 Spray is Veracue’s spray-dispensed packaging of Melanotan 1, a synthetic alpha-MSH analogue with norleucine at position 4 and D-phenylalanine at position 7, supplied as a Research Use Only material.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Melanotan 1 Spray different from the Melanotan 1 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2, formula C78H111N21O19, reference weight about 1,646.8 g/mol, CAS 75921-69-6. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number and molecular formula for Melanotan 1?',
    answer: 'The CAS Registry Number is 75921-69-6 and the molecular formula is C78H111N21O19, the same identifiers that apply to Melanotan 1 regardless of packaging format.',
  },
  {
    question: 'What is the difference between Melanotan 1 and Melanotan 2?',
    answer: 'They are different molecules. Melanotan 1 is a linear tridecapeptide at roughly 1,646.8 g/mol, while Melanotan 2 is a shorter cyclic heptapeptide at roughly 1,024.2 g/mol. Neither is presented as preferable.',
  },
  {
    question: 'Which receptor is Melanotan 1 studied at?',
    answer: 'Mainly the melanocortin 1 receptor (MC1R), where it is described in the literature as acting predominantly. In receptor-expressing cell systems, activation raises intracellular cyclic AMP.',
  },
  {
    question: 'Why does Veracue list Melanotan 1 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Melanotan 1 Spray characterized?',
    answer: 'The same way as any Melanotan 1 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Melanotan 1 Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Melanotan 1 Spray?',
    answer: 'No. Melanotan 1 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Melanotan 1 Spray',
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
