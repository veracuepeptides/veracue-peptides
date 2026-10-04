import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// SS-31 Spray: the same D-Arg-Dmt-Lys-Phe-NH2 tetrapeptide documented on the live SS-31 vial
// listing (scripts/product-import/ss-31.ts), offered here in Veracue's spray-dispensed packaging
// format. Molecular identity facts (sequence, formula, mass, CAS, PubChem CID, alternate names)
// are reused unchanged from the vial page since it is the same compound; everything else is
// written fresh and focused on what "Spray" means as a packaging/dispensing descriptor, lot
// verification for this format, and format-specific comparisons. Research-use-only copy only: no
// human trial, clinical, disease, or dosing content, consistent with scripts/product-import/ss-31.ts.
// The source draft at docs/product-contents-2/ss31-spray-final.json carries extensive human
// clinical-trial and disease-indication material (Barth syndrome, heart failure, mitochondrial
// myopathy, dry AMD, etc.) that is banned under site policy; only its structural ideas (aliases,
// packaging-format framing, MOTS-c comparison, verification checklist) are reused here, rewritten
// at the molecular/laboratory-model level with no outcome or indication claims.

const NAME = 'SS-31 Spray'
const SLUG = 'ss-31-spray'

const SKU_CODE = 'SS31-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '10mg', image: 'VERACUE_Spray_SS_31_10mg.jpg' },
  { strength: '50mg', image: 'VERACUE_Spray_SS_31_50mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const SS31_LINK = [{ phrase: 'SS-31 vial listing', href: '/product/ss-31' }]

const SEO_TITLE = 'SS-31 Spray Peptide (Elamipretide)'
const SEO_DESCRIPTION =
  'Veracue packages SS-31, a mitochondria-targeted tetrapeptide, as a spray-dispensed research format with identity data for laboratory research use only.'
const DESCRIPTION =
  'SS-31 Spray supplies SS-31, also listed as elamipretide, MTP-131 or Bendavia, a synthetic four-residue peptide, sequence D-Arg-Dmt-Lys-Phe-NH2, built around the non-standard residue 2,6-dimethyltyrosine. Its formula is C32H49N9O5, average mass about 639.8 g/mol, CAS 736992-21-5, PubChem CID 11764719. Unlike receptor-targeted peptides, SS-31 is studied for its association with the inner mitochondrial membrane and cardiolipin rather than a specific cell-surface receptor. Offered in 10 mg and 50 mg spray-dispensed sizes for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is SS-31 Spray?'),
    p('SS-31 Spray is Veracue’s spray-dispensed packaging of SS-31, a synthetic tetrapeptide built from D-arginine, 2,6-dimethyltyrosine (Dmt), lysine and a C-terminal phenylalanine amide. The underlying molecule is identical to the one documented on Veracue’s SS-31 vial listing; only the packaging and dispensing format differ between the two listings.', { links: SS31_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('SS-31 at a Glance'),
    kvTable([
      ['Product name', 'SS-31 Spray'],
      ['Other names', 'Elamipretide; MTP-131; Bendavia'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'D-Arg-Dmt-Lys-Phe-NH2 (D-arginyl-2,6-dimethyl-L-tyrosyl-L-lysyl-L-phenylalaninamide)'],
      ['Peptide length', '4 residues'],
      ['Molecular formula (parent compound)', 'C32H49N9O5'],
      ['Molecular weight (parent compound)', 'About 639.8 g/mol'],
      ['CAS Registry Number', '736992-21-5 (parent compound)'],
      ['PubChem CID', '11764719'],
      ['Sizes offered', '10 mg and 50 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists SS-31 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What SS-31 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the SS-31 documented on the vial listing.',
      'Not MOTS-c, and not an ordinary, unmodified Arg-Tyr-Lys-Phe peptide.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('SS-31 Spray and Veracue’s SS-31 vial listing describe one molecule: a four-residue chain built from D-arginine, 2,6-dimethyltyrosine, lysine and a C-terminal phenylalanine amide, also referenced in the literature as elamipretide, MTP-131 and Bendavia. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: SS31_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same tetrapeptide reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('Cardiolipin Association in Laboratory Models'),
    h5('Why is SS-31 studied at the mitochondrial membrane?'),
    p('SS-31 carries a net positive charge paired with an aromatic surface, a combination studied for its affinity toward mitochondrial membranes. Within that broader affinity, it has a documented interaction with cardiolipin, a phospholipid concentrated in the inner mitochondrial membrane. This association is examined in laboratory model systems such as liposomes, bicelles and isolated mitochondria, independent of which packaging format a research sample arrives in.'),
    h5('What does "mitochondria-targeted" mean in this context?'),
    p('It describes an affinity for a membrane component, observed in defined laboratory systems. It does not establish selective behavior toward particular mitochondria, and packaging format, spray or vial, has no bearing on this structural property, since format is a question of dispensing, not chemistry.'),

    h4('SS-31 vs. MOTS-c'),
    table(
      ['Feature', 'SS-31', 'MOTS-c'],
      [
        ['Molecular origin', 'Fully synthetic tetrapeptide, C32H49N9O5', 'Peptide encoded within mitochondrial DNA (12S rRNA region)'],
        ['Peptide length', '4 residues, including D-arginine and 2,6-dimethyltyrosine', '16 residues, standard L-amino acids'],
        ['Studied association', 'Localizes to the inner mitochondrial membrane and associates with cardiolipin', 'Studied for a signaling role in cellular stress models'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Vial and spray'],
      ],
    ),
    p('This table compares molecular origin and studied association only. Catalog format is listed separately because it is a packaging detail, not a property of either molecule, and it does not change which model systems a given peptide is studied in.'),

    h4('Recording Format in a Methods Section'),
    h5('How should format be recorded alongside identity?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for SS-31 Spray are established the same way as for any SS-31 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS) to confirm the observed mass matches the stated chemical form. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the SS-31 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS', 'Mass consistent with a stated chemical form', 'Chemical form itself; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Chemical Form and Mass, Independent of Packaging'),
    p('SS-31 may be supplied as the parent compound or as a hydrochloride, TFA or di-TFA salt, and each form carries a different molecular weight than the approximately 639.8 g/mol parent-compound reference value. This holds regardless of whether a lot is packaged as a spray or a vial, so the chemical form should be confirmed on the lot’s own certificate before any mass-based calculation is made.'),
    p('Electrospray ionization commonly produces multiply charged ions for a basic peptide such as SS-31, since it carries both an arginine and a lysine available to protonate. An observed mass-to-charge ratio should be read alongside its charge state, and alongside any adducts, before it is compared with the parent-compound reference value.'),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated molecule and chemical form, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does chemical form still need to be stated?'),
    p('SS-31 and its salt forms share one sequence but not one formula weight. If a lot’s documentation leaves the form unstated, any mass-based calculation can carry a silent error. Confirm the form on the lot’s certificate and use the matching formula weight, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('SS-31 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is SS-31 Spray?',
    answer: 'SS-31 Spray is Veracue’s spray-dispensed packaging of SS-31, a synthetic tetrapeptide built from D-arginine, 2,6-dimethyltyrosine, lysine and a C-terminal phenylalanine amide.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in SS-31 Spray different from the SS-31 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence D-Arg-Dmt-Lys-Phe-NH2, molecular formula C32H49N9O5, average mass about 639.8 g/mol, CAS 736992-21-5. Only the packaging format differs.',
  },
  {
    question: 'Is SS-31 the same as elamipretide?',
    answer: 'Yes. SS-31 is the research name and elamipretide is the generic name for the same molecule. MTP-131 and Bendavia are other names that appear in reference sources for this compound.',
  },
  {
    question: 'What is the CAS number for SS-31?',
    answer: 'The CAS number is 736992-21-5 and the PubChem CID is 11764719, the same identifiers that apply to the parent compound regardless of packaging format.',
  },
  {
    question: 'Why does SS-31 associate with cardiolipin?',
    answer: 'Cardiolipin is a phospholipid concentrated in the inner mitochondrial membrane. SS-31’s charged and aromatic residues give it affinity for that lipid environment, as examined in laboratory models such as liposomes and isolated mitochondria.',
  },
  {
    question: 'How is SS-31 different from MOTS-c?',
    answer: 'SS-31 is a fully synthetic four-residue peptide studied for membrane and cardiolipin association. MOTS-c is a 16-residue peptide encoded in mitochondrial DNA, studied for a signaling role in cellular stress models. The two have different origins and are studied in different contexts.',
  },
  {
    question: 'Why does Veracue list SS-31 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is SS-31 Spray characterized?',
    answer: 'The same way as any SS-31 lot: reverse-phase HPLC for purity and mass spectrometry for a chemical form consistent with the stated identity. Packaging format does not change which methods apply.',
  },
  {
    question: 'Why might an SS-31 mass spectrum not show 639.8?',
    answer: 'The parent-compound reference value is approximately 639.8 g/mol, but hydrochloride, TFA and di-TFA salt forms carry different masses, and electrospray ionization often produces multiply charged ions. Chemical form and charge state should be identified before comparing an observed mass to the reference value.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for SS-31 Spray?',
    answer: 'No. SS-31 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'SS-31 Spray',
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
