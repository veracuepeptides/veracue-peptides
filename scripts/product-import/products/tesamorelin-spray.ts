import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Tesamorelin Spray: the same 44-residue GRF(1-44) analog documented on the live Tesamorelin vial
// listing (scripts/product-import/tesamorelin.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (sequence, formula, mass, CAS numbers, PubChem CID,
// receptor context) are reused unchanged from the vial page since it is the same compound;
// everything else is written fresh and focused on what "Spray" means as a packaging/dispensing
// descriptor, lot verification for this format, and format-specific comparisons. Research-use-only
// copy only: no human-study, approval, indication or dosing content, consistent with
// scripts/product-import/tesamorelin.ts. The source draft at
// docs/product-contents-2/tesamorelin-spray-product-page-v2.json was mined for structure only; its
// approved-drug, indication, body-composition and clinical-outcome content is intentionally left out
// to match site policy.

const NAME = 'Tesamorelin Spray'
const SLUG = 'tesamorelin-spray'

const SKU_CODE = 'TESA-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_Tesamorelin_10mg.jpg' },
  { strength: '20mg', image: 'VERACUE_Spray_Tesamorelin_20mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const TESAMORELIN_LINK = [{ phrase: 'Tesamorelin vial listing', href: '/product/tesamorelin' }]

const SEO_TITLE = 'Tesamorelin Spray Peptide (GRF 1-44)'
const SEO_DESCRIPTION =
  "Veracue packages the 44-residue GHRH analog Tesamorelin as a spray-dispensed research format, with identity data for laboratory research use only."
const DESCRIPTION =
  'Tesamorelin Spray supplies Tesamorelin, also written GRF 1-44, a 44-residue growth hormone-releasing factor analog carrying a trans-3-hexenoyl group on its N-terminal tyrosine and an amidated C-terminus, sequence YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH2. Its free-base reference values are C221H366N72O67S, about 5135.9 g/mol, CAS 218949-48-5, with CAS 901758-09-6 listed for a commonly supplied acetate salt. The N-terminal modification is what distinguishes it from the plain 29-residue GHRH fragment used elsewhere in this catalog. Offered in 10 mg and 20 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Tesamorelin Spray?'),
    p('Tesamorelin Spray is Veracue’s spray-dispensed packaging of Tesamorelin, a synthetic peptide that keeps the complete native 44-residue GRF chain and adds a trans-3-hexenoyl group to the N-terminal tyrosine, with an amidated C-terminus. The underlying molecule is identical to the one documented on Veracue’s Tesamorelin vial listing; only the packaging and dispensing format differ between the two listings.', { links: TESAMORELIN_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Tesamorelin at a Glance'),
    kvTable([
      ['Product name', 'Tesamorelin Spray (molecule also written GRF 1-44)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Compound class', 'Growth hormone-releasing factor (GRF) analog'],
      ['Sequence', 'YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH2'],
      ['Length', '44 amino acids, linear, C-terminal amide'],
      ['N-terminal modification', 'trans-3-hexenoyl group on the N-terminal tyrosine'],
      ['Molecular formula (free-base reference value)', 'C221H366N72O67S'],
      ['Molecular weight (free-base reference value)', 'About 5135.9 g/mol (average)'],
      ['CAS Registry Number (free base)', '218949-48-5'],
      ['CAS Registry Number (acetate salt)', '901758-09-6'],
      ['PubChem CID', '16137828'],
      ['Receptor context', 'GHRH receptor (GHRHR)'],
      ['Sizes offered', '10 mg and 20 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Tesamorelin in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Tesamorelin Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Tesamorelin documented on the vial listing.',
      'Not native GRF(1-44) itself, which lacks the N-terminal trans-3-hexenoyl group.',
      'Not CJC-1295, modified GRF(1-29), or Sermorelin, each of which carries its own distinct sequence.',
      'Not a ghrelin-receptor agonist such as Ipamorelin.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('Tesamorelin Spray and Veracue’s Tesamorelin vial listing describe one molecule: the complete native GRF(1-44) chain with L-alanine at position 2 and a trans-3-hexenoyl group added to the N-terminal tyrosine. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: TESAMORELIN_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same GRF(1-44) analog reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Tesamorelin vs. Sermorelin, Ipamorelin and CJC-1295'),
    table(
      ['Feature', 'Tesamorelin', 'Sermorelin', 'Ipamorelin', 'CJC-1295'],
      [
        ['Structure', 'GRF(1-44) with N-terminal trans-3-hexenoyl group', 'Unmodified GRF(1-29) amide', 'Synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2)', 'GRF(1-29) with four substitutions plus a modified lysine'],
        ['Peptide length', '44 residues', '29 residues', '5 residues', '29 residues plus modified lysine'],
        ['Position 2', 'L-alanine', 'L-alanine', 'Not applicable', 'D-alanine'],
        ['Receptor', 'GHRH receptor', 'GHRH receptor', 'Ghrelin (GHS) receptor', 'GHRH receptor'],
        ['Signaling context', 'Adenylyl cyclase / cAMP', 'Adenylyl cyclase / cAMP', 'Phospholipase C / calcium', 'Adenylyl cyclase / cAMP'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray', 'Vial and spray', 'Not currently offered as a separate Veracue listing'],
      ],
    ),
    p('This table compares molecular structure and receptor context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given peptide engages.'),

    h4('Why Two CAS Numbers?'),
    h5('Free base or acetate: why does it matter?'),
    p('The free peptide carries CAS 218949-48-5, and a commonly supplied acetate salt carries its own number, CAS 901758-09-6. Both describe the identical 44-residue sequence; the counterion sitting alongside the chain is what differs, not the sequence itself. A vial or spray-top unit filled by total mass holds peptide plus counterion plus residual water, so net peptide content runs lower than the fill weight, and that figure is lot-specific rather than something the catalog listing can state.'),
    p('Confirming which form a given lot carries, free base or acetate, matters before any mass-based calculation is attempted, since using the wrong reference weight can carry a silent error through the rest of the math. The form actually supplied is reported on the lot’s own certificate, regardless of packaging format.'),

    h4('Receptor Context'),
    h5('What does the GHRH receptor do in assays?'),
    p('The GHRH receptor is a class B G protein-coupled receptor expressed on pituitary somatotroph cells and signals mainly through adenylyl cyclase and cyclic AMP. Tesamorelin, in either packaging format Veracue offers, is studied as a reference ligand on the GHRH side of this receptor family, separate from ghrelin-receptor agonists such as Ipamorelin that reach the same downstream cell type through a different receptor.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Tesamorelin Spray are established the same way as for any Tesamorelin lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the Tesamorelin at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with Tesamorelin', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Ion chromatography', 'Which counterion (free base vs. acetate) is present', 'Peptide purity or identity'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form (free base or acetate), HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('Tesamorelin free base and Tesamorelin acetate share one sequence but carry two different CAS numbers and reference masses. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching reference weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Tesamorelin Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Tesamorelin Spray?',
    answer: 'Tesamorelin Spray is Veracue’s spray-dispensed packaging of Tesamorelin, a synthetic 44-residue peptide built on the native growth hormone-releasing factor chain with a trans-3-hexenoyl group added to the N-terminal tyrosine.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Tesamorelin Spray different from the Tesamorelin vial listing?',
    answer: 'No. Both listings describe the same compound: sequence YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL-NH2, free-base formula C221H366N72O67S, average mass about 5135.9 g/mol. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Tesamorelin?',
    answer: 'The free peptide is CAS 218949-48-5 and the acetate salt is CAS 901758-09-6. The PubChem CID is 16137828, the same identifiers that apply regardless of packaging format.',
  },
  {
    question: 'Is Tesamorelin the same as native GRF(1-44)?',
    answer: 'The chain is the same. Tesamorelin adds a trans-3-hexenoyl group on the N-terminal tyrosine, which native GRF(1-44) does not carry.',
  },
  {
    question: 'Is position 2 of Tesamorelin D-alanine?',
    answer: 'No, it is L-alanine. The D-alanine substitution at that position belongs to CJC-1295 and modified GRF(1-29), so a source showing D-alanine for Tesamorelin describes a different molecule.',
  },
  {
    question: 'How is Tesamorelin different from Sermorelin?',
    answer: 'Sermorelin is the unmodified 29-residue GRF(1-29) fragment. Tesamorelin carries the full 44-residue chain plus the N-terminal trans-3-hexenoyl group. Both are studied at the GHRH receptor.',
  },
  {
    question: 'How is Tesamorelin different from Ipamorelin?',
    answer: 'Tesamorelin acts at the GHRH receptor, which signals mainly through cAMP. Ipamorelin is an unrelated pentapeptide acting at the ghrelin (GHS) receptor, which couples to phospholipase C and calcium.',
  },
  {
    question: 'How is Tesamorelin different from CJC-1295?',
    answer: 'CJC-1295 is based on GRF(1-29) with four substitutions, including D-alanine at position 2, plus a modified lysine. Tesamorelin keeps the full native 44-residue chain with L-alanine at position 2 and the N-terminal hexenoyl modification instead.',
  },
  {
    question: 'Why does Veracue list Tesamorelin in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Tesamorelin Spray characterized?',
    answer: 'The same way as any Tesamorelin lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and ion chromatography for counterion identification adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Tesamorelin Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form (free base or acetate), a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Tesamorelin Spray?',
    answer: 'No. Tesamorelin Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Tesamorelin Spray',
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
