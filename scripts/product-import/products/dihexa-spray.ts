import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Dihexa Spray: the same angiotensin IV-derived oligopeptide (PNB-0408) documented on the live
// Dihexa vial listing (scripts/product-import/dihexa.ts), offered here in Veracue's spray-dispensed
// packaging format. Molecular identity facts (structure, formula, mass, CAS) are reused unchanged
// from the vial page since it is the same compound; everything else is written fresh and focused on
// what "Spray" means as a packaging/dispensing descriptor, lot verification for this format, and
// format-specific framing. Research-use-only copy only: no human trial, clinical, disease-indication
// or dosing content, consistent with scripts/product-import/dihexa.ts. The client draft at
// docs/product-contents-2/dihexa-spray.json was mined for structure only; its disease-model framing
// (Alzheimer's, Parkinson's, Huntington's), retraction/citation discussion and clinical-evidence
// commentary are intentionally left out to match site policy.

const NAME = 'Dihexa Spray'
const SLUG = 'dihexa-spray'

const SKU_CODE = 'DIHEXA-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_Spray_Dihexa_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const DIHEXA_LINK = [{ phrase: 'Dihexa vial listing', href: '/product/dihexa' }]

const SEO_TITLE = 'Dihexa Spray (PNB-0408) Research Peptide'
const SEO_DESCRIPTION =
  "Veracue's Dihexa Spray packages the angiotensin IV-derived peptide PNB-0408 in a liquid format for laboratory research use only."
const DESCRIPTION =
  'Dihexa Spray is Veracue’s spray-dispensed form of Dihexa, also catalogued under the developmental code PNB-0408, an angiotensin IV-derived oligopeptide built from N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group. Its molecular formula is C27H44N4O5, average mass about 504.7 g/mol, CAS 1401708-83-5. In the lab it is studied in connection with the HGF/c-Met signaling pathway, a different target from the angiotensin receptors its parent peptide engages. Supplied as a 10 mg size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is Dihexa Spray?'),
    p("Dihexa Spray is Veracue's spray-dispensed packaging of Dihexa, a synthetic oligopeptide derived from angiotensin IV and also catalogued under the developmental code PNB-0408. The underlying molecule is identical to the one documented on Veracue's Dihexa vial listing; only the packaging and dispensing format differ between the two listings.", { links: DIHEXA_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot\'s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Dihexa at a Glance'),
    kvTable([
      ['Product name', 'Dihexa Spray (also catalogued under the developmental code PNB-0408)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Compound class', 'Angiotensin IV-derived oligopeptide'],
      ['Structure', 'N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group'],
      ['Research focus', 'HGF/c-Met pathway research'],
      ['Molecular formula', 'C27H44N4O5'],
      ['Molecular weight', 'About 504.7 g/mol (sources report 504.66 to 504.672)'],
      ['CAS Registry Number', '1401708-83-5'],
      ['Size offered', '10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists Dihexa in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What Dihexa Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the Dihexa documented on the vial listing.',
      'Not the same molecule as angiotensin IV itself, which is a shorter parent peptide.',
      'Not a drug, supplement or consumer product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p("Dihexa Spray and Veracue's Dihexa vial listing describe one molecule: N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group, with the molecular formula C27H44N4O5, an average mass near 504.7 g/mol and CAS number 1401708-83-5. Packaging format has no bearing on structure, formula or mass, so these values are identical across both listings.", { links: DIHEXA_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same angiotensin IV-derived oligopeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue\'s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot\'s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Mechanism and Pathway Context'),
    h5('What does HGF/c-Met research look at?'),
    p('HGF and its receptor c-Met form a tyrosine kinase signaling pathway studied across several fields, including tissue biology and neurobiology. In the Dihexa literature, the reported mechanism is binding to HGF, which in turn potentiates HGF activity at c-Met. One cited binding value is a dissociation constant (Kd) near 65 picomolar. Packaging format has no bearing on this reported mechanism, since it describes the molecule itself.'),
    h5('Where does angiotensin IV fit in?'),
    p('Angiotensin IV has a long research history tied to a binding site once called the AT4 receptor, later linked by some researchers to insulin-regulated aminopeptidase (IRAP). A separate line of work proposed that several effects reported for angiotensin IV-derived peptides depend on the HGF/c-Met system instead. Dihexa was developed within that second line, as a stabilized analog for probing the pathway more directly, and that research lineage is the same whichever packaging format a lot is supplied in.'),

    h4('Research Questions, Answered'),
    h5('Why does the compound name matter when reading papers?'),
    p('Angiotensin IV research spans decades and several receptor hypotheses. Findings about angiotensin IV itself should not be blended with findings about Dihexa. Check the methods section for the exact compound, by name or CAS number, before applying a result, regardless of which Veracue packaging format a lot was drawn from.'),
    h5('How should mechanistic findings be read?'),
    p('A finding that Dihexa potentiates HGF activity at c-Met explains how a compound might act in a given assay. It does not mean the same outcome appears in every system. Check the assay conditions, meaning the cell type, concentration range and readout, before assuming a result carries over to a different model.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by structure or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for Dihexa Spray are established the same way as for any Dihexa lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or LC-MS) to confirm that the observed mass matches the molecule\'s theoretical value near 504.7 g/mol for C27H44N4O5. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related compound can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same structure, formula and mass references, listed on the Dihexa at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / LC-MS', 'Mass consistent with C27H44N4O5', 'Net peptide content; purity'],
        ['Elemental analysis', 'Composition consistent with the reference formula', 'Identity of trace impurities'],
        ['Reference comparison', 'Agreement with CAS 1401708-83-5', 'Quantity or purity on its own'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot\'s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('Dihexa is sold under more than one name across suppliers, including PNB-0408. If a lot\'s documentation leaves the stated identifier unclear, any mass-based comparison can carry a silent error. Confirm the name and CAS number on the lot\'s certificate and use the matching reference formula, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Dihexa Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no administration or usage guidance of any kind, and Veracue provides no dosing guidance for this or any research material. The word "Spray" in the product name describes Veracue\'s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Dihexa Spray?',
    answer: "Dihexa Spray is Veracue's spray-dispensed packaging of Dihexa, a synthetic oligopeptide derived from angiotensin IV and also catalogued under the developmental code PNB-0408.",
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue\'s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in Dihexa Spray different from the Dihexa vial listing?',
    answer: 'No. Both listings describe the same compound: N-hexanoyl-Tyr-Ile linked to a 6-aminohexanoic amide group, molecular formula C27H44N4O5, average mass about 504.7 g/mol, CAS 1401708-83-5. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for Dihexa?',
    answer: 'The CAS number is 1401708-83-5, the same identifier that applies to Dihexa regardless of packaging format.',
  },
  {
    question: 'Is Dihexa the same as angiotensin IV?',
    answer: 'No. Angiotensin IV is a shorter, four-residue fragment of the renin-angiotensin system. Dihexa is a structurally modified analog derived from it, not the same molecule.',
  },
  {
    question: 'What is PNB-0408?',
    answer: 'PNB-0408 is the developmental code name for the same compound listed elsewhere as Dihexa, identified by CAS 1401708-83-5. Both names refer to one research entity across Veracue\'s packaging formats.',
  },
  {
    question: 'What pathway is Dihexa studied in?',
    answer: 'It is studied for its reported interaction with hepatocyte growth factor (HGF) and the HGF receptor, c-Met, with one cited binding value near 65 picomolar.',
  },
  {
    question: 'Why does Veracue list Dihexa in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is Dihexa Spray characterized?',
    answer: 'The same way as any Dihexa lot: reverse-phase HPLC for purity and mass spectrometry for identity against the reference formula C27H44N4O5. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a Dihexa Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for Dihexa Spray?',
    answer: 'No. Dihexa Spray is offered for laboratory research use only, and Veracue provides no dosing guidance of any kind, consistent with the Dihexa vial listing.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cognitive-neuro-protection'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Dihexa Spray',
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
