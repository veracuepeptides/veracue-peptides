import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// TB-500 Spray. The same Ac-LKKTETQ fragment documented on the live TB-500 vial listing
// (scripts/product-import/tb-500.ts), offered here in Veracue's spray-dispensed packaging format.
// Molecular identity facts (sequence, formula, mass, CAS, PubChem CID) and the naming-ambiguity
// framing versus full-length thymosin beta-4 are reused unchanged from the vial page since it is
// the same compound; everything else is written fresh and focused on what "Spray" means as a
// packaging/dispensing descriptor, lot verification for this format, and format-specific
// comparisons. The raw client draft in docs/product-contents-2/tb-500-spray.json mixes usable
// structure with policy-violating material (human/animal study citations, dosing figures,
// angiogenesis/tissue-repair outcome framing, safety claims); none of that outcome, citation or
// dosing content is reused here, consistent with site policy and with tb-500.ts.

const NAME = 'TB-500 Spray'
const SLUG = 'tb-500-spray'

const SKU_CODE = 'TB500-SPR'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_Spray_TB_500_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_Spray_TB_500_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]
const TB500_LINK = [{ phrase: 'TB-500 vial listing', href: '/product/tb-500' }]

const SEO_TITLE = 'TB-500 Spray Peptide (Ac-LKKTETQ)'
const SEO_DESCRIPTION =
  'TB-500 Spray packages the Ac-LKKTETQ fragment in a lab-ready spray format, with identity data and lot verification for laboratory research use only.'
const DESCRIPTION =
  'TB-500 Spray contains TB-500, the synthetic seven-residue fragment Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ), corresponding to residues 17 through 23 of the 43-residue protein thymosin beta-4, not another name for the full protein itself. Its formula is C38H68N10O14, average mass about 889.01 g/mol, CAS 885340-08-9, PubChem CID 62707662. Because "TB-500" is applied inconsistently across suppliers, confirming sequence and CAS against a lot’s documentation is the only reliable way to know which material is in hand. Offered in 5 mg and 10 mg spray-dispensed sizes for laboratory research use only.'
function qa(q: { h: string; problem: string; answer: string; takeaway: string; links?: any[] }) {
  return (
    h5(q.h) +
    p(q.problem) +
    p(q.answer, { links: q.links }) +
    `<p><strong>Researcher takeaway:</strong> ${esc(q.takeaway)}</p>`
  )
}

function productDetails(): string {
  return [
    h4('What Is TB-500 Spray?'),
    p('TB-500 Spray is Veracue’s spray-dispensed packaging of TB-500, a synthetic peptide with the sequence Ac-LKKTETQ, seven amino acids with an acetyl group on the N-terminus. The underlying molecule is identical to the one documented on Veracue’s TB-500 vial listing; only the packaging and dispensing format differ between the two listings.', { links: TB500_LINK }),
    p('"Spray" is a packaging and dispensing descriptor, nothing more. It does not establish a route, a concentration, or a formulation, and none of those specifics should be inferred from the product name. Chemical form, concentration, fill volume and storage conditions are reported on each lot’s own documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('TB-500 at a Glance'),
    kvTable([
      ['Product name', 'TB-500 Spray'],
      ['Packaging format', 'Spray-dispensed, Research Use Only'],
      ['Sequence', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ)'],
      ['Length', '7 residues'],
      ['Terminal modification', 'N-terminal acetylation; free C-terminal acid'],
      ['Molecular formula (free base)', 'C38H68N10O14'],
      ['Molecular weight (free base)', 'About 889.01 g/mol'],
      ['CAS Registry Number', '885340-08-9 (free base)'],
      ['PubChem CID', '62707662 (free base)'],
      ['Relationship to thymosin beta-4', 'Corresponds to residues 17 to 23 of the 43-residue protein; a fragment of it, not another name for it'],
      ['Sizes offered', '5 mg and 10 mg'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values are drawn from chemical databases for the free base and are not a Veracue lot result.</em></p>`,
    h4('Why a Separate Listing for the Same Molecule?'),
    p('Veracue lists TB-500 in more than one packaging format because research groups source and track material differently depending on how it is packaged. Keeping the formats as separate listings keeps lot records, images and documentation specific to the packaging a researcher actually ordered, rather than mixing records across formats.'),
    h4('What TB-500 Spray Is Not'),
    ul([
      'Not a statement about route of administration. The name "Spray" describes dispensing only.',
      'Not the same substance as full-length thymosin beta-4.',
      'Not a different molecule from the TB-500 documented on the vial listing.',
      'Not a consumer, dietary or veterinary product.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity, Carried Over From the Vial Listing'),
    p('TB-500 Spray and Veracue’s TB-500 vial listing describe one molecule: the seven-residue sequence Ac-LKKTETQ, acetylated at the N-terminal leucine with a free acid at the C-terminus. Packaging format has no bearing on sequence, formula or mass, so these values are identical across both listings.', { links: TB500_LINK }),
    h5('Does the spray format change the molecule?'),
    p('No. The compound reported under this listing is the same Ac-LKKTETQ fragment reported under the vial listing. What differs between the two listings is how the material is packaged and dispensed, not its chemical identity.'),

    h4('What "Spray" Describes, and What It Does Not'),
    p('In Veracue’s catalog, "Spray" is a packaging and dispensing term, comparable to "vial" or "powder" on other listings. It tells a researcher how the product is dispensed from its container. It does not specify a concentration, a carrier, a route, or a formulation, and it is not shorthand for any particular method of use. Those details, where applicable, live in lot-specific documentation rather than in the catalog name.'),
    p('Treating a packaging word as a technical specification is a common source of error when comparing listings across suppliers. A researcher documenting materials in a methods section should cite the lot’s own documentation for format-specific details rather than inferring them from the word "Spray" alone.'),

    h4('TB-500 and Thymosin Beta-4: Two Related but Different Molecules'),
    p('Thymosin beta-4 is a naturally occurring 43-residue protein found throughout the body. TB-500 is a synthetic fragment built from just seven of those residues. They share a sequence overlap, not an identity. The size difference is substantial: thymosin beta-4 weighs roughly 4,963 g/mol, while TB-500 comes in at about 889 g/mol, a little over a fifth of the mass. Many sources use the two names interchangeably, but, as the TB-500 vial listing documents, they are separate substances.', { links: TB500_LINK }),
    table(
      ['Attribute', 'TB-500', 'Full-length thymosin beta-4'],
      [
        ['Sequence', 'Ac-LKKTETQ (residues 17 to 23)', '43-residue full sequence'],
        ['Length', '7 residues', '43 residues'],
        ['Molecular weight', 'About 889 g/mol', 'About 4,963 g/mol'],
        ['Chemical form', 'Synthetic fragment, N-acetylated', 'Naturally occurring protein'],
        ['Catalog formats Veracue offers', 'Vial and spray', 'Not offered'],
      ],
    ),
    p('This table compares molecular identity only. Catalog format is listed separately because it is a packaging detail, not a property of the molecule itself, and it does not change which sequence a given listing describes.'),

    h4('Actin-Binding Context'),
    h5('What does the LKKTET motif describe in assay terms?'),
    p('LKKTET is the stretch conventionally described as the actin-binding region of thymosin beta-4, and it forms most of the TB-500 sequence. In actin biology, this motif sits within the mechanism by which thymosin beta-4 helps buffer the pool of unpolymerized (G-actin) versus filamentous (F-actin) actin that underlies cell shape and motility. TB-500, in either packaging format Veracue offers, is studied for containing this motif, which identifies where the fragment comes from without by itself establishing how the fragment behaves in a given assay.'),
    h5('How should format be recorded in a methods section?'),
    p('Because "Spray" and "vial" describe packaging rather than chemistry, a methods section should still name the molecule precisely by sequence or CAS number, and separately note the catalog format and lot number actually used. This page provides molecular reference information and general research context only, and Veracue provides no dosing, administration or usage guidance of any kind.'),

    h4('Research Questions, Answered'),
    qa({
      h: 'Is TB-500 Spray a different molecule from the TB-500 vial listing?',
      problem: 'Two listings for the same name can look like two different products.',
      answer: 'No. Both listings, including the TB-500 vial listing, describe the same compound: sequence Ac-LKKTETQ, formula C38H68N10O14, CAS 885340-08-9. Only the packaging and dispensing format differs between them.',
      takeaway: 'Confirm sequence and CAS, not the listing title, when comparing formats.',
      links: TB500_LINK,
    }),
    qa({
      h: 'Is TB-500 the same molecule as full-length thymosin beta-4?',
      problem: 'The two names are often used interchangeably, which can suggest they share one body of research.',
      answer: 'They do not share an identity. TB-500 is a synthetic seven-residue fragment drawn from thymosin beta-4, while the parent protein has 43 residues and is roughly five times heavier. Results for one should not be treated as automatically applicable to the other.',
      takeaway: 'Related sequence, separate molecules.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('Analytical Characterization'),
    p('Identity and purity for TB-500 Spray are established the same way as for any TB-500 lot: reverse-phase HPLC for chromatographic purity, and mass spectrometry (typically ESI-MS or MALDI-TOF) to confirm that the observed mass matches the molecule’s theoretical value. HPLC alone shows that most detected material elutes together; it does not by itself confirm identity, since a closely related peptide can produce an equally clean trace.'),
    p('Packaging format has no bearing on which analytical methods apply. A spray-dispensed lot and a vial lot of the same molecule are verified against the same sequence, formula and mass references, listed on the TB-500 at a Glance table above.'),
    table(
      ['Method', 'Tells a researcher', 'Does not prove by itself'],
      [
        ['RP-HPLC', 'Chromatographic purity (area %)', 'Identity'],
        ['ESI-MS / MALDI-TOF', 'Mass consistent with TB-500', 'Sequence order; purity'],
        ['Tandem MS', 'Sequence evidence', 'Quantity or purity'],
        ['Amino acid or elemental analysis', 'Net peptide content', 'Identity of impurities'],
      ],
    ),

    h4('Analytical Note'),
    p('A few points come up often when reviewing TB-500 mass-spectrometry data, regardless of packaging format. Average molecular weight and monoisotopic mass are related but distinct figures. The free base averages about 889.01 g/mol, while the monoisotopic mass is closer to 888.5 Da. The mass an instrument reports (m/z) also depends on charge state, so a doubly charged ion appears at roughly half the singly charged mass. Salt or counterion choice shifts the observed mass as well, and comparing expected and observed mass only makes sense once both refer to the same chemical form.'),
    table(
      ['Form', 'Average molecular weight'],
      [
        ['TB-500 free base (Ac-LKKTETQ)', 'About 889.01 g/mol'],
        ['Non-acetylated LKKTETQ', 'About 846.98 g/mol'],
      ],
    ),

    h4('Verifying a Spray-Format Lot'),
    p('A certificate of analysis describes one lot, never a packaging format or a compound in general. Before relying on any figure, confirm that the lot number on the certificate matches the container and the order record for the spray-format unit received.'),
    p('A complete certificate separates product identity, lot number, chemical form, HPLC result with chromatogram, mass spectrometry result with observed and theoretical mass, test date and testing laboratory. Where concentration or fill-volume figures are relevant to a spray-format unit, they are reported on that lot’s own documentation rather than inferred from the catalog listing. The certificate page explains how to request lot documentation for either format.', { links: CERT }),

    h4('Common Verification Questions'),
    qa({
      h: 'Does a spray-format listing need different verification than a vial?',
      problem: 'A packaging difference can look like a reason for a different verification process.',
      answer: 'No. The verification question is the same: does this lot match the stated molecule, and is the purity figure paired with a mass result from the same lot. Packaging format does not change what counts as adequate documentation.',
      takeaway: 'Verify the lot and the molecule, not the packaging.',
    }),
    qa({
      h: 'What should I verify on a TB-500 Spray COA?',
      problem: 'A purity percentage alone does not confirm what is in a container, particularly when more than one salt form circulates under the same name.',
      answer: 'A useful certificate states the exact chemical form, an identity result showing expected and observed mass with the method used, chromatographic purity with its detection conditions, and the lot number, laboratory and test date. Confirming the stated form first avoids most mismatches.',
      takeaway: 'Read a COA for form, method and lot, not just the percentage.',
    }),
    qa({
      h: 'What should a procurement record include for this listing?',
      problem: 'Multi-format catalogs make it easy to lose track of which record belongs to which packaging.',
      answer: 'For each lot, keep the catalog listing snapshot, the lot-specific certificate, the stated chemical form, the receipt date, labeled storage conditions, and the packaging format actually received. Recording format alongside the usual identity fields keeps multi-format catalogs like this one traceable lot to lot.',
      takeaway: 'Log the packaging format alongside the usual identity fields.',
    }),

    h4('Need lot documentation for TB-500 Spray?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('TB-500 Spray is supplied for laboratory research and analytical characterization only. It is not intended for human or veterinary use, or for ingestion, injection or any form of administration. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind, and the word "Spray" in the product name describes Veracue’s packaging and dispensing format only. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is TB-500 Spray?',
    answer: 'TB-500 Spray is Veracue’s spray-dispensed packaging of TB-500, a synthetic seven-residue peptide, Ac-LKKTETQ, corresponding to a region of thymosin beta-4.',
  },
  {
    question: 'Does "Spray" mean this product is for nasal use?',
    answer: 'No. "Spray" describes Veracue’s packaging and dispensing format only. It is not a claim about route, concentration or formulation, and any such specifics are reported on lot-specific documentation rather than the product name.',
  },
  {
    question: 'Is the molecule in TB-500 Spray different from the TB-500 vial listing?',
    answer: 'No. Both listings describe the same compound: sequence Ac-LKKTETQ, free-base formula C38H68N10O14, molecular weight about 889.01 g/mol, CAS 885340-08-9. Only the packaging format differs.',
  },
  {
    question: 'Is TB-500 the same as thymosin beta-4?',
    answer: 'No. Thymosin beta-4 is a naturally occurring 43-residue protein, while TB-500 is a synthetic 7-residue fragment related to it, with a different mass and a separate body of research.',
  },
  {
    question: 'What is the CAS number for TB-500?',
    answer: '885340-08-9 is the CAS number associated with TB-500 free base in chemical databases, and the PubChem CID is 62707662, regardless of packaging format.',
  },
  {
    question: 'Why do different sources list different molecular weights for TB-500?',
    answer: 'Mainly because sources describe different chemical forms: the free base, a salt form, or the non-acetylated version of the sequence. Each has its own mass.',
  },
  {
    question: 'What does the LKKTET motif mean?',
    answer: 'LKKTET is the sequence conventionally described as the actin-binding region of thymosin beta-4, and it is part of what TB-500 is built from. Containing the motif identifies where the fragment comes from; it does not by itself describe how the fragment behaves in an assay.',
  },
  {
    question: 'Why does Veracue list TB-500 in more than one format?',
    answer: 'Research groups source and track material differently depending on packaging. Listing formats separately keeps lot records, images and documentation specific to the packaging actually ordered.',
  },
  {
    question: 'How is TB-500 Spray characterized?',
    answer: 'The same way as any TB-500 lot: reverse-phase HPLC for purity and mass spectrometry for identity, with tandem MS and net peptide content analysis adding further confidence. Packaging format does not change which methods apply.',
  },
  {
    question: 'What should a TB-500 Spray certificate of analysis include?',
    answer: 'It should state product identity, chemical form, a lot number matching the container received, test date and testing laboratory, with an HPLC result and a mass spectrometry result showing observed against theoretical mass.',
  },
  {
    question: 'What does Research Use Only mean for this listing?',
    answer: 'It means the material is supplied only for laboratory research and analysis, not for human or veterinary use, ingestion, injection or any form of administration, regardless of packaging format.',
  },
  {
    question: 'Does Veracue provide usage instructions for TB-500 Spray?',
    answer: 'No. TB-500 Spray is offered for laboratory research use only, and Veracue provides no dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'TB-500 Spray',
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
