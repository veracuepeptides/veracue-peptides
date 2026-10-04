import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// MOTS-C Spray: the same mitochondrial-derived peptide documented on the live MOTS-C vial listing
// (scripts/product-import/mots-c.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, mass, CAS, PubChem CID, genomic origin) are reused
// unchanged from the vial page since it is the same compound; everything else below is written fresh
// and focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific comparisons. Research-use-only copy only: molecular-level and
// assay-level pathway context, no human trial, metabolic-outcome, weight-adjacent or dosing content,
// consistent with scripts/product-import/mots-c.ts and scripts/product-import/sermorelin-spray.ts.

const NAME = 'MOTS-C Spray'
const SLUG = 'mots-c-spray'

const SKU_CODE = 'MOTSC-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_MOTS_C_10mg.jpg' },
  { strength: '40mg', image: 'VERACUE_Spray_MOTS_C_40mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const MOTSC_LINK = [{ phrase: 'MOTS-C vial listing', href: '/product/mots-c' }]

const SEO_TITLE = 'MOTS-C Spray Research Peptide'
const SEO_DESCRIPTION =
  'Veracue packages the mitochondrial-derived peptide MOTS-C in a lab-ready spray format, with identity data and lot checks for laboratory research use only.'
const DESCRIPTION =
  'MOTS-C Spray delivers MOTS-C, a 16-amino-acid peptide, sequence MRWQEMGYIFYPRKLR, encoded in a short reading frame inside the mitochondrial 12S rRNA gene rather than the nuclear genome most proteins come from. Its free-peptide values are C101H152N28O22S2, average mass about 2174.6 g/mol, CAS 1627580-64-6, PubChem CID 146675088. Two methionines and a tryptophan in the sequence are the residues most prone to oxidation and worth tracking across lots. Offered in 10 mg and 40 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is MOTS-C Spray?'),
    p('MOTS-C Spray is Veracue’s spray-dispensed packaging of MOTS-C, a 16-amino-acid peptide encoded in a short open reading frame inside the mitochondrial 12S rRNA gene and classed as a mitochondrial-derived peptide. The underlying molecule is identical to the one documented on Veracue’s MOTS-C vial listing; only the packaging and dispensing format differ between the two listings.', { links: MOTSC_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('MOTS-C at a Glance'),
    kvTable([
      ['Product name', 'MOTS-C Spray (also written MOTS-c, MOTSc)'],
      ['Full name', 'Mitochondrial open reading frame of the 12S rRNA-c'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'MRWQEMGYIFYPRKLR'],
      ['Length', '16 amino acids'],
      ['Molecular formula (free peptide)', 'C101H152N28O22S2'],
      ['Molecular weight (average)', 'About 2174.6 g/mol'],
      ['Monoisotopic mass (calculated)', '2173.11 Da'],
      ['CAS Registry Number', '1627580-64-6 (as listed in reference databases)'],
      ['PubChem CID', '146675088'],
      ['Genomic origin', 'Short open reading frame within the mitochondrial 12S rRNA gene (MT-RNR1)'],
      ['Sizes offered', '10 mg and 40 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists MOTS-C in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What MOTS-C Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the MOTS-C documented on the vial listing.',
      'Not humanin, which is a separate mitochondrial-derived peptide from the 16S rRNA gene.',
      'Not SS-31, which is a synthetic tetrapeptide and is not encoded by mitochondrial DNA.',
      'Not a drug, supplement, food or cosmetic, and not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('MOTS-C Spray and Veracue’s MOTS-C vial listing describe one molecule: a linear 16-residue peptide with a free amine at one end, a free carboxylic acid at the other, three arginines and a lysine set against a single glutamate, and two methionines plus a tryptophan as the residues most prone to oxidation. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: MOTSC_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same mitochondrial-derived peptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('MOTS-C vs. Other Mitochondrial-Context Compounds'),
    table(
      ['Attribute', 'MOTS-C', 'Humanin', 'SS-31'],
      [
        ['Compound class', 'Mitochondrial-derived peptide', 'Mitochondrial-derived peptide', 'Synthetic aromatic-cationic tetrapeptide'],
        ['Origin', 'Short ORF in the mitochondrial 12S rRNA gene', 'Short ORF in the mitochondrial 16S rRNA gene', 'Designed synthetic peptide'],
        ['Size', '16 amino acids', '24 amino acids (cytoplasmic translation); 21 (mitochondrial translation)', '4 residues: D-Arg-Dmt-Lys-Phe-NH2'],
        ['Structural features', 'All L-amino acids; free C-terminal acid; two Met, one Trp', 'Length variant depends on translation context', 'D-arginine, 2′,6′-dimethyltyrosine, C-terminal amide'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not listed', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and origin only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which pathway a given peptide is studied against.'),

    h4('Assay-Level Pathway Context'),
    h5('What pathway terminology appears in MOTS-C research?'),
    p('In cultured cells, MOTS-C has been examined for effects on folate-linked purine signaling, with reports describing accumulation of the purine intermediate AICAR and activation of AMPK, the cell’s energy-sensing kinase. This page reports that pathway terminology at the enzyme and signaling level only, as reported in cell-based assay systems.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general assay-level context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for MOTS-C Spray are established the same way as for any MOTS-C lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the MOTS-C at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with MOTS-C', 'Sequence order; purity'],
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
    h5('Why does methionine oxidation matter for verification?'),
    p('MOTS-C has methionines at positions 1 and 6, so oxidized species at +16 Da (2189.10 Da) and +32 Da (2205.10 Da) can appear in a mass spectrometry dataset regardless of packaging format. A thorough certificate addresses these species instead of ignoring them.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('MOTS-C Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is MOTS-C Spray?',
    answer: 'MOTS-C Spray is Veracue’s spray-dispensed packaging of MOTS-C, a 16-amino-acid peptide encoded in a short open reading frame of the mitochondrial 12S rRNA gene and classed as a mitochondrial-derived peptide.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in MOTS-C Spray different from the MOTS-C vial listing?',
    answer: 'No. Both listings describe the same compound: sequence MRWQEMGYIFYPRKLR, free-peptide formula C101H152N28O22S2, average mass about 2174.6 g/mol, CAS 1627580-64-6. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for MOTS-C?',
    answer: 'Reference databases list CAS 1627580-64-6 and PubChem CID 146675088, the same identifiers that apply to MOTS-C regardless of packaging format.',
  },
  {
    question: 'Is MOTS-C Spray the same as humanin or SS-31?',
    answer: 'No. Humanin is a different mitochondrial-derived peptide, 24 residues long, from the 16S rRNA gene. SS-31 is a synthetic cardiolipin-targeting tetrapeptide and is not encoded by mitochondrial DNA.',
  },
  {
    question: 'What pathway terminology appears in MOTS-C research?',
    answer: 'Cell-based assay work has reported folate-linked purine signaling changes alongside AMPK activation. This listing reports that terminology at the enzyme and pathway level only, as described in those assay systems.',
  },
  {
    question: 'Why does Veracue list MOTS-C in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is MOTS-C Spray characterized?',
    answer: 'The same way as any MOTS-C lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a MOTS-C Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'Why does methionine oxidation matter for MOTS-C?',
    answer: 'MOTS-C has methionines at positions 1 and 6, so oxidized species at +16 Da (2189.10 Da) and +32 Da (2205.10 Da) can appear in an MS dataset. A good COA addresses them instead of ignoring them.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for MOTS-C Spray?',
    answer: 'No. MOTS-C Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'MOTS-C Spray',
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
