import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// IGF-LR3 Spray: the same Long-[Arg3]-IGF-I analog documented on the live IGF-LR3 vial listing
// (scripts/product-import/igf-lr3.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, mass, CAS, UNII) are reused unchanged from the vial
// page since it is the same molecule; everything else is written fresh and focused on what "Spray"
// means as a packaging/dispensing descriptor for a large disulfide-bonded protein, lot verification
// for this format, and format-specific comparisons. Research-use-only copy only: no human trial,
// dosing, or outcome/performance content, consistent with scripts/product-import/igf-lr3.ts.

const NAME = 'IGF-LR3 Spray'
const SLUG = 'igf-lr3-spray'

const SKU_CODE = 'IGFLR3-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '1mg', image: 'VERACUE_Spray_IGF_LR3_1mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const IGFLR3_LINK = [{ phrase: 'IGF-LR3 vial listing', href: '/product/igf-lr3' }]

const SEO_TITLE = 'IGF-LR3 Spray (Long R3 IGF-I)'
const SEO_DESCRIPTION =
  'An 83-residue IGF-1 analog in Veracue’s spray-dispensed format, with identity data and lot verification notes for laboratory research only.'
const DESCRIPTION =
  'IGF-LR3 Spray supplies IGF-LR3, also written Long R3 IGF-I or Long-[Arg3]-IGF-I, an 83-amino-acid analog of IGF-1 carrying a 13-residue N-terminal extension and an arginine substituted for glutamate at position 3. Three intramolecular disulfide bonds give it a calculated mass near 9.1 kDa, well above the short peptides elsewhere in this catalog, and it is registered under CAS 143045-27-6. Its larger size and folded structure call for identity checks beyond simple HPLC purity. Offered as a 1 mg spray-dispensed size for laboratory research use only.'
function productDetails(): string {
  return [
    h4('What Is IGF-LR3 Spray?'),
    p('IGF-LR3 Spray is Veracue’s spray-dispensed packaging of IGF-LR3, also written Long R3 IGF-I or Long-[Arg3]-IGF-I, an 83-amino-acid analog of IGF-1 built with a 13-residue N-terminal extension, an arginine in place of glutamate at position 3, and three disulfide bonds. The underlying molecule is identical to the one documented on Veracue’s IGF-LR3 vial listing; only the packaging and dispensing format differ between the two listings.', { links: IGFLR3_LINK }),
    p('At 83 residues and about 9.1 kDa, IGF-LR3 is considerably larger than the short peptides found elsewhere in Veracue’s catalog, and it behaves more like a small folded protein than a linear peptide chain. That size and the three disulfide bonds shape how the molecule is characterized and how its certificate of analysis should be read, regardless of packaging format.'),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('IGF-LR3 at a Glance'),
    kvTable([
      ['Product name', 'IGF-LR3 Spray (molecule also written Long R3 IGF-I, Long-[Arg3]-IGF-I)'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Length', '83 amino acids'],
      ['Structural changes', '13-residue N-terminal extension; Glu-to-Arg at position 3 of the IGF-1 domain'],
      ['Calculated mass', 'About 9.1 kDa (9,117.6 Da reduced chain; 9,111.5 Da with three disulfide bonds)'],
      ['CAS Registry Number', '143045-27-6'],
      ['UNII', 'M9L22Y19H9'],
      ['Size offered', '1 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Masses are calculated reference values for the molecule in general, not measured results for a Veracue lot. Physical form, salt or counterion, formulation, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists IGF-LR3 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What IGF-LR3 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not a different molecule from the IGF-LR3 documented on the vial listing.',
      'Not the same molecule as native IGF-1, which has 70 residues, or as R3-IGF-I or Des(1-3)-IGF-I.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('IGF-LR3 Spray and Veracue’s IGF-LR3 vial listing describe one molecule: an 83-residue analog with a 13-residue N-terminal extension, a Glu-to-Arg substitution at position 3 of the IGF-1 domain, and six cysteines forming three intramolecular disulfide bonds. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: IGFLR3_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same Long-[Arg3]-IGF-I analog reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers, and the risk is no different for a large analog like IGF-LR3 than for a short peptide. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('IGF-LR3 vs. Native IGF-1 and Related Analogs'),
    table(
      ['Molecule', 'Residues', 'Structural change', 'IGFBP interaction'],
      [
        ['Native IGF-1', '70', 'Reference sequence', 'Normal'],
        ['IGF-LR3', '83', '13-residue N-terminal extension plus Glu3-to-Arg', 'Markedly reduced'],
        ['R3-IGF-I', '70', 'Glu3-to-Arg without the extension', 'Reduced'],
        ['Des(1-3)-IGF-I', '67', 'First three residues absent', 'Reduced'],
      ],
    ),
    p('This table compares molecular structure and binding-protein interaction only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which receptor a given analog engages or how it interacts with IGF-binding proteins.'),

    h4('Receptor and Binding-Protein Context'),
    h5('Why does a large protein need more context than a short peptide?'),
    p('At 83 residues and three disulfide bonds, IGF-LR3 folds into a defined tertiary structure rather than existing as a flexible chain, which is why its research literature discusses folding and binding-protein interaction alongside receptor activation. IGF-LR3, in either packaging format Veracue offers, is studied as a tool for separating receptor engagement from IGF-binding-protein interaction, since the analog activates the type I IGF receptor while interacting with IGFBPs far less than native IGF-1 does.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence, CAS number or UNII, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for IGF-LR3 Spray are established the same way as for any IGF-LR3 lot: intact-mass analysis to confirm the observed mass against the expected reduced-chain or disulfide-bonded form, and reverse-phase HPLC for chromatographic purity. Because IGF-LR3 is a disulfide-rich analog rather than a short linear peptide, intact mass alone cannot separate correctly folded material from a mispaired disulfide isomer, since the two share the same mass.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the IGF-LR3 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['Intact-mass MS', 'Mass consistent with the reduced chain or three-disulfide form', 'Correct disulfide pairing; purity'],
        ['RP-HPLC', 'Chromatographic purity (area %) under stated conditions', 'Identity or folding'],
        ['Structural or folding evidence, where available', 'Whether the main species behaves like correctly folded protein', 'Lot activity in any particular assay'],
        ['Formulation', 'What else is in the vial and how much protein it holds', 'Chromatographic purity'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, the mass form the observed result was matched against, RP-HPLC result, folding or structural evidence where available, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    h5('Does a spray-format listing need different verification than a vial?'),
    p('No. The verification question is the same: does this lot match the stated 83-residue sequence, and is the mass result paired with its named form and a purity figure from the same lot. Packaging format does not change what counts as adequate documentation.'),
    h5('Why does the mass form still need to be stated?'),
    p('IGF-LR3’s reduced chain and its three-disulfide-bonded form differ by about six daltons, roughly 9,117.6 Da against 9,111.5 Da. If a lot’s documentation leaves the form unstated, a mass comparison can appear to pass or fail based on which reference value was assumed. Confirm the form on the lot’s certificate and use the matching reference mass, regardless of packaging format.'),
    h5('What should a procurement record include for this listing?'),
    p('For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated mass form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.'),
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('IGF-LR3 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is IGF-LR3 Spray?',
    answer: 'IGF-LR3 Spray is Veracue’s spray-dispensed packaging of IGF-LR3, also called Long R3 IGF-I or Long-[Arg3]-IGF-I, an 83-amino-acid analog of IGF-1 with a 13-residue N-terminal extension and an arginine at position 3.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in IGF-LR3 Spray different from the IGF-LR3 vial listing?',
    answer: 'No. Both listings describe the same analog: 83 amino acids, a 13-residue N-terminal extension, a Glu-to-Arg change at position 3, CAS 143045-27-6 and UNII M9L22Y19H9. Only the packaging format differs.',
  },
  {
    question: 'What is the CAS number for IGF-LR3?',
    answer: 'The CAS Registry Number is 143045-27-6 and the UNII is M9L22Y19H9, the same identifiers that apply to IGF-LR3 regardless of packaging format.',
  },
  {
    question: 'Is IGF-LR3 the same as native IGF-1?',
    answer: 'No. Native IGF-1 has 70 residues. IGF-LR3 adds a 13-residue N-terminal extension and an arginine at position 3, giving it 83 residues and markedly reduced interaction with IGF-binding proteins.',
  },
  {
    question: 'Is IGF-LR3 a peptide or a protein?',
    answer: 'At 83 residues with three disulfide bonds, IGF-LR3 behaves more like a small folded protein than a short peptide, which is why folding and intact-mass evidence matter when reading its certificate regardless of packaging format.',
  },
  {
    question: 'How is IGF-LR3 different from R3-IGF-I and Des(1-3)-IGF-I?',
    answer: 'R3-IGF-I carries the same arginine substitution without the N-terminal extension and has 70 residues. Des(1-3)-IGF-I has the first three residues removed and has 67 residues. IGF-LR3 is distinct from both, at 83 residues.',
  },
  {
    question: 'Why does Veracue list IGF-LR3 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is IGF-LR3 Spray characterized?',
    answer: 'The same way as any IGF-LR3 lot: intact-mass analysis to confirm the mass against the reduced chain or three-disulfide form, and reverse-phase HPLC for purity. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should an IGF-LR3 Spray certificate of analysis include?',
    answer: 'It should state product identity, the mass form the observed result was matched against, a lot number matching the container received, RP-HPLC purity with its method, test date and testing laboratory, with structural or folding evidence where available.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for IGF-LR3 Spray?',
    answer: 'No. IGF-LR3 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'IGF-LR3 Spray',
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
