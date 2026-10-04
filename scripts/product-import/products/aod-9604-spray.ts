import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// AOD 9604 Spray: the same 16-residue hGH(177-191)-derived fragment documented on the live AOD 9604
// vial listing (scripts/product-import/aod-9604.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (sequence, formula, mass, CAS, PubChem CID) are reused
// unchanged from the vial page since it is the same compound; everything else is written fresh and
// focused on what "Spray" means as a packaging/dispensing descriptor, lot verification for this
// format, and format-specific comparisons. The source draft at docs/product-contents-2/aod9604-spray.json
// is mined for structure only: its weight-loss/fat-loss/adiposity framing, human clinical trial history
// (OPTIONS study, Phase I/IIa/IIb), regulatory/approval language and dosage discussion are all left out
// per site policy. Research Use Only copy only, consistent with scripts/product-import/aod-9604.ts and
// the two locked spray templates (sermorelin-spray.ts, bpc-157-spray.ts).

const NAME = 'AOD 9604 Spray'
const SLUG = 'aod-9604-spray'

const SKU_CODE = 'AOD9604-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_Spray_AOD_9604_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_Spray_AOD_9604_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate library', href: '/certificates' }]
const AOD_LINK = [{ phrase: 'AOD 9604 vial listing', href: '/product/aod-9604' }]

const SEO_TITLE = 'AOD 9604 Spray (hGH 177-191)'
const SEO_DESCRIPTION =
  'Veracue packages the 16-residue AOD 9604 fragment as a lab-ready spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'AOD 9604 Spray is Veracue’s spray-dispensed form of AOD 9604, a 16-residue fragment of human growth hormone, sequence YLRIVQCRSVEGSCGF, closed by a Cys7-Cys14 disulfide bond and carrying an added N-terminal tyrosine not present in the native hormone. Its free-base reference values are C78H123N23O23S2, about 1815.1 g/mol, CAS 221231-10-3. In receptor-binding assays the fragment does not compete with intact growth hormone, a useful check when confirming a lot against the parent molecule. Available in 5 mg and 10 mg for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is AOD 9604 Spray?'),
    p('AOD 9604 Spray is Veracue’s spray-dispensed packaging of AOD 9604, a synthetic 16-amino-acid peptide built from residues 177-191 of human growth hormone with an added N-terminal tyrosine and a disulfide bond linking Cys7 and Cys14. The underlying molecule is identical to the one documented on Veracue’s AOD 9604 vial listing; only the packaging and dispensing format differ between the two listings.', { links: AOD_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('AOD 9604 at a Glance'),
    kvTable([
      ['Product name', 'AOD 9604 Spray (molecule also written AOD9604, AOD-9604, LAT8881)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'YLRIVQCRSVEGSCGF'],
      ['Length', '16 amino acids'],
      ['Disulfide bond', 'Cys7-Cys14'],
      ['Molecular formula (free-base reference value)', 'C78H123N23O23S2'],
      ['Molecular weight (free-base reference value)', 'About 1815.1 g/mol (average)'],
      ['Monoisotopic mass (reference value)', '1813.860 Da'],
      ['CAS Registry Number', '221231-10-3'],
      ['PubChem CID', '71300630'],
      ['Sizes offered', '5 mg and 10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists AOD 9604 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What AOD 9604 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the AOD 9604 documented on the vial listing.',
      'Not intact human growth hormone, only a short fragment of its C-terminal end.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('AOD 9604 Spray and Veracue’s AOD 9604 vial listing describe one molecule: a 16-residue chain, Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe, closed into a loop by a disulfide bond between the cysteines at positions 7 and 14. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: AOD_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same hGH(177-191)-derived fragment reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('AOD 9604 vs. Related Growth-Hormone-Derived Sequences'),
    table(
      ['Feature', 'AOD 9604', 'Native hGH 176-191', 'Tesamorelin'],
      [
        ['Structure', '16-residue fragment, N-terminal tyrosine added, Cys7-Cys14 loop', '16-residue native hGH fragment, begins with phenylalanine', 'Full 44-residue GHRH sequence with N-terminal trans-3-hexenoyl group'],
        ['Sequence start', 'Tyr-Leu-Arg', 'Phe-Leu-Arg', 'Tyr-Ala-Asp'],
        ['Peptide length', '16 residues', '16 residues', '44 residues'],
        ['Receptor binding (growth-hormone-receptor assays)', 'Did not compete with hGH for receptor binding in cell assays', 'Native hGH fragment, not evaluated the same way on this listing', 'Engages the GHRH receptor'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not offered', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular structure and receptor-assay context only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which sequence a given listing describes.'),

    h4('Receptor and Pathway Context'),
    h5('What has been observed about AOD 9604 at the receptor level?'),
    p('In cell-based assays, AOD 9604 did not compete with growth hormone for binding at the growth-hormone receptor and did not drive receptor-dependent cell growth in those systems. This molecular target has not been established, and these are observations from specific laboratory models rather than a confirmed pathway. Research interest in this fragment centers on lipolysis-pathway terminology at the receptor and signaling level, examining how a short C-terminal fragment of a larger hormone behaves in these assay systems compared with the intact protein.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for AOD 9604 Spray are established the same way as for any AOD 9604 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the AOD 9604 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with AOD 9604', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence, including disulfide connectivity', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate library explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the disulfide bond matter for verification?'),
    p('AOD 9604’s Cys7-Cys14 disulfide bond closes part of the chain into a loop, and an unformed or mismatched disulfide shifts the observed mass away from the reference value. A thorough identity check accounts for the expected disulfide state rather than only matching a bare amino-acid composition.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('AOD 9604 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is AOD 9604 Spray?',
    answer: 'AOD 9604 Spray is Veracue’s spray-dispensed packaging of AOD 9604, a synthetic 16-amino-acid peptide built from residues 177-191 of human growth hormone with an added N-terminal tyrosine and one internal disulfide bond.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in AOD 9604 Spray different from the AOD 9604 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence YLRIVQCRSVEGSCGF, free-base formula C78H123N23O23S2, average mass about 1815.1 g/mol, CAS 221231-10-3. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for AOD 9604?',
    answer: 'The CAS number is 221231-10-3 and the PubChem CID is 71300630, the same identifiers that apply to AOD 9604 regardless of packaging format.',
  },
  {
    question: 'Is AOD 9604 the same as human growth hormone?',
    answer: 'No. Human growth hormone is a much larger 191-residue protein. AOD 9604 is a 16-residue fragment derived from its C-terminal end, and in cell assays it did not compete with growth hormone for receptor binding.',
  },
  {
    question: 'Is AOD 9604 the same as native hGH Fragment 176-191?',
    answer: 'Not quite. Native hGH residues 176-191 begin with phenylalanine (FLRIVQCRSVEGSCGF), while AOD 9604 adds a tyrosine ahead of residues 177-191 (YLRIVQCRSVEGSCGF). Sequence, disulfide state and mass are a more reliable way to tell listings apart than the name alone.',
  },
  {
    question: 'Why does Veracue list AOD 9604 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is AOD 9604 Spray characterized?',
    answer: 'The same way as any AOD 9604 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an AOD 9604 Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for AOD 9604 Spray?',
    answer: 'No. AOD 9604 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['weight-loss-metabolic'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'AOD 9604 Spray',
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
