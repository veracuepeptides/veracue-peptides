import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// KPV Spray: the same Lys-Pro-Val tripeptide documented on the live KPV vial listing
// (scripts/product-import/kpv.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, mass, CAS, PubChem CID) are reused unchanged from
// the vial page since it is the same compound; everything else is written fresh and focused on
// what "Spray" means as a packaging/dispensing descriptor, lot verification for this format, and
// format-specific comparisons. Research-use-only copy only: no human trial, disease-indication, or
// dosing content, consistent with scripts/product-import/kpv.ts.

const NAME = 'KPV Spray'
const SLUG = 'kpv-spray'

const SKU_CODE = 'KPV-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_KPV_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificates page', href: '/certificates' }]
const KPV_LINK = [{ phrase: 'KPV vial listing', href: '/product/kpv' }]

const SEO_TITLE = 'KPV Spray Research Peptide (Lys-Pro-Val)'
const SEO_DESCRIPTION =
  'Veracue offers the Lys-Pro-Val tripeptide KPV in a spray-dispensed format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'KPV Spray supplies KPV, the tripeptide Lys-Pro-Val, identical to the final three residues of alpha-melanocyte-stimulating hormone. As the free acid its formula is C16H30N4O4, average mass about 342.44 g/mol, CAS 67727-97-3, PubChem CID 125672. Its small size means appearance alone cannot confirm identity, since several short peptides share a similar molecular weight; sequence and mass spectrometry together are the more reliable check. Offered as a 10 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is KPV Spray?'),
    p(
      "KPV Spray is Veracue's spray-dispensed packaging of KPV, a synthetic tripeptide built from lysine, proline and valine (Lys-Pro-Val), the same three residues that form the C-terminal end of alpha-melanocyte-stimulating hormone. The underlying molecule is identical to the one documented on Veracue's KPV vial listing; only the packaging and dispensing format differ between the two listings.",
      { links: KPV_LINK },
    ),
    p(
      '"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot\'s own documentation and can be requested through the contact page.',
      { links: CONTACT },
    ),
    h4('KPV at a Glance'),
    kvTable([
      ['Product name', 'KPV Spray (molecule also written Lys-Pro-Val, alpha-MSH (11-13))'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Lys-Pro-Val (K-P-V)'],
      ['Length', '3 residues, linear tripeptide'],
      ['Molecular formula (free-acid reference value)', 'C16H30N4O4'],
      ['Molecular weight (free-acid reference value)', 'About 342.44 g/mol (average)'],
      ['Monoisotopic mass (free-acid reference value)', '342.2267 Da'],
      ['CAS Registry Number', '67727-97-3'],
      ['PubChem CID', '125672'],
      ['Size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p(
      'Veracue lists KPV in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.',
    ),
    h4('What KPV Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the KPV documented on the vial listing.',
      'Not the same molecule as alpha-MSH, a 13-residue hormone, or as KdPT, GHK-Cu or BPC-157.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p(
      'KPV Spray and Veracue\'s KPV vial listing describe one molecule: a three-residue chain with a lysine contributing two basic amino groups, a proline that restricts backbone flexibility, and a valine closing the chain with a small hydrophobic side group. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.',
      { links: KPV_LINK },
    ),
    h5('Does the spray format change the molecule?'),
    p(
      'No. The compound reported under this listing is the same Lys-Pro-Val tripeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.',
    ),

    h4('What "Spray" Describes, and What It Does Not'),
    p(
      'In Veracue\'s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.',
    ),
    p(
      'Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot\'s own documentation for format-specific details rather than inferring them from the word "Spray" alone.',
    ),

    h4('KPV, Alpha-MSH and KdPT Compared'),
    table(
      ['Attribute', 'KPV', 'Alpha-MSH', 'KdPT'],
      [
        ['Sequence', 'Lys-Pro-Val', 'Ac-Ser-Tyr-Ser-Met-Glu-His-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2', 'Lys-D-Pro-Thr'],
        ['Length', '3 residues', '13 residues', '3 residues'],
        ['Average MW', '342.44 g/mol (free acid)', 'About 1664.9 g/mol', '344.41 g/mol'],
        ['Relationship', 'C-terminal residues 11 to 13 of alpha-MSH', 'Parent hormone, derived from POMC', 'KPV-related derivative with a D-proline substitution'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not offered', 'Not offered'],
      ],
    ),
    p(
      'This table compares molecular structure and parentage only, not strength, safety or ranking. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself.',
    ),

    h4('Transporter and Receptor Context'),
    h5('What transporter research exists for KPV?'),
    p(
      'In published work, KPV in either packaging format Veracue offers is studied for uptake through PepT1, a di- and tripeptide transporter examined in cultured epithelial and T-cell lines. That transport question is studied at the cell and model level, independent of packaging format.',
    ),
    h5('Does KPV engage melanocortin receptors?'),
    p(
      'Some reported effects of KPV in cell-based systems have been described as at least partly independent of the MC1R melanocortin receptor, with other groups proposing interference with IL-1 beta signaling instead. These remain separate, unreconciled research questions at the receptor and signaling level, not a settled mechanism, regardless of packaging format.',
    ),
    h5('How should format be recorded in a methods section?'),
    p(
      'Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.',
    ),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p(
      'Identity and purity for KPV Spray are established the same way as for any KPV lot: reversed-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or LC-MS) to confirm that the observed mass matches the molecule\'s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a sequence isomer or closely related tripeptide can produce an equally clean trace.',
    ),
    p(
      'Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references listed on the KPV at a Glance table above.',
    ),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / LC-MS', 'Mass consistent with KPV in the stated form', 'Residue order; stereochemistry; purity'],
        ['Tandem MS (MS/MS)', 'Residue sequence from fragment ions', 'Quantity or purity'],
        ['Chiral or amino acid analysis', 'D/L configuration; net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p(
      'A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.',
    ),
    p(
      "A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot's own documentation rather than inferred from the catalog listing. The certificates page explains how to request lot documentation for either format.",
      { links: CERT },
    ),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p(
      'No. The verification question is the same: does this lot match the stated sequence, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.',
    ),
    h5('Why does chemical form still need to be stated?'),
    p(
      'KPV is commonly supplied as the free acid, a C-terminal amide, or an acetate salt, and these forms differ in formula weight. If a lot\'s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot\'s certificate and use the matching formula weight, regardless of packaging format.',
    ),
    h5('What should a procurement record include for this listing?'),
    p(
      'For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.',
    ),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p(
      'KPV Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue\'s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.',
      {
        links: [
          { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
          { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        ],
      },
    ),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is KPV Spray?',
    answer:
      "KPV Spray is Veracue's spray-dispensed packaging of KPV, a synthetic tripeptide, Lys-Pro-Val, identical to the last three residues of alpha-MSH.",
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer:
      'No. "Spray" describes Veracue\'s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in KPV Spray different from the KPV vial listing?',
    answer:
      'No. Both listings describe the same compound: sequence Lys-Pro-Val, free-acid formula C16H30N4O4, average mass 342.44 g/mol, CAS number 67727-97-3. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for KPV?',
    answer:
      'The free-acid reference form has CAS number 67727-97-3 and PubChem CID 125672, the same identifiers that apply to KPV regardless of packaging format.',
  },
  {
    question: 'Is KPV the same as alpha-MSH?',
    answer:
      'No. Alpha-MSH is a 13-residue hormone, and KPV is only its final three residues. KPV lacks the His-Phe-Arg-Trp core that melanocortin receptor binding depends on.',
  },
  {
    question: 'How is KPV different from KdPT?',
    answer:
      'KdPT (Lys-D-Pro-Thr) is a KPV-related derivative with a D-proline and a Val-to-Thr swap, giving it a different formula and average mass (344.41 g/mol versus 342.44 g/mol for KPV).',
  },
  {
    question: 'How is KPV different from GHK-Cu and BPC-157?',
    answer:
      'Each is a chemically distinct material with its own sequence, molecular formula and research history. GHK-Cu is a copper-binding tripeptide complex, and BPC-157 is a synthetic 15-residue peptide, neither related in sequence to KPV.',
  },
  {
    question: 'Why does Veracue list KPV in more than one format?',
    answer:
      'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is KPV Spray characterized?',
    answer:
      'The same way as any KPV lot: reversed-phase HPLC for purity and mass spectrometry for identity, with tandem MS and chiral analysis adding further confidence where needed. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a KPV Spray certificate of analysis include?',
    answer:
      'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer:
      'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for KPV Spray?',
    answer:
      'No. KPV Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['immune-modulation'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'KPV Spray',
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
