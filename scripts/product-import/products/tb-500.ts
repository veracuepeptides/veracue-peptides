import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// TB-500 (Ac-LKKTETQ). Research-use-only copy: molecular identity, the relationship to thymosin beta-4,
// actin-biology context at assay level, analytical documentation. Facts come from
// docs/product-contents-1/veracue-tb-500-product-page.json; human, outcome, regulatory and dosing content is left out.

const NAME = 'TB-500'
const SLUG = 'tb-500'

const SKU_CODE = 'TB500'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5mg', image: 'VERACUE_TB_500_5mg.jpg' },
  { strength: '10mg', image: 'VERACUE_TB_500_10mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'TB-500 Research Peptide (Ac-LKKTETQ)'
const SEO_DESCRIPTION =
  "Is TB-500 the same as thymosin beta-4? Not quite: it's the Ac-LKKTETQ fragment (CAS 885340-08-9). 5 and 10 mg vials, research use only."
const DESCRIPTION =
  "TB-500 is a short synthetic peptide with the sequence Ac-LKKTETQ, seven amino acids with an acetyl group at the N-terminus. It corresponds to residues 17 to 23 of thymosin beta-4, a much larger 43-residue protein, so it is a fragment and not another name for the full molecule. As the free base it has the formula C38H68N10O14, a mass of about 889 g/mol and CAS 885340-08-9. Available in 5 mg and 10 mg vials, for laboratory research only."
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
    h4('What Is TB-500?'),
    p('TB-500 is the common name for a synthetic peptide with the sequence Ac-LKKTETQ, seven amino acids with an acetyl group on the N-terminus. It matches residues 17 to 23 of thymosin beta-4, a much larger 43-residue protein, so it is related to thymosin beta-4 but is a separate molecule. The free base has the formula C38H68N10O14, a molecular weight of about 889.01 g/mol and CAS number 885340-08-9.'),
    p('TB-500 is a trade name rather than a formal chemical name, which is why it helps to anchor on the sequence and identifiers. Veracue supplies TB-500 strictly for laboratory use, and lot documentation is available on request.'),
    h4('TB-500 at a Glance'),
    kvTable([
      ['Product name', 'TB-500'],
      ['Sequence', 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH (Ac-LKKTETQ)'],
      ['Length', '7 residues'],
      ['Terminal modification', 'N-terminal acetylation; free C-terminal acid'],
      ['Molecular formula (free base)', 'C38H68N10O14'],
      ['Molecular weight (free base)', 'About 889.01 g/mol'],
      ['CAS Registry Number', '885340-08-9 (free base)'],
      ['PubChem CID', '62707662 (free base)'],
      ['Relationship to thymosin beta-4', 'Corresponds to residues 17 to 23 of the 43-residue protein; a fragment of it, not another name for it'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Identity values are drawn from chemical databases for the free base and are not a Veracue lot result.</em></p>`,
    p('Physical form, salt or counterion, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What TB-500 Is Not'),
    ul([
      'Not the same substance as full-length thymosin beta-4.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('TB-500 and Thymosin Beta-4: Two Related but Different Molecules'),
    p('Thymosin beta-4 is a naturally occurring 43-residue protein found throughout the body. TB-500 is a synthetic fragment built from just seven of those residues. They share a sequence overlap, not an identity.'),
    p('The size difference is substantial. Thymosin beta-4 weighs roughly 4,963 g/mol, while TB-500 comes in at about 889 g/mol, a little over a fifth of the mass. Many sources use the two names interchangeably, but they are separate substances.'),
    table(
      ['Attribute', 'TB-500', 'Full-length thymosin beta-4'],
      [
        ['Sequence', 'Ac-LKKTETQ (residues 17 to 23)', '43-residue full sequence'],
        ['Length', '7 residues', '43 residues'],
        ['Molecular weight', 'About 889 g/mol', 'About 4,963 g/mol'],
        ['Chemical form', 'Synthetic fragment, N-acetylated', 'Naturally occurring protein'],
      ],
    ),

    h4('Molecular Identity'),
    h5('Names and identifiers'),
    p('TB-500 is the name Veracue uses for this material. Because the name has no formal chemical designation, different suppliers have at times used it for different salt forms of the same peptide. Sequence, formula and CAS number together describe a specific, checkable molecule, and that makes them more reliable than the name alone.'),
    h5('Terminal chemistry'),
    p('The reference sequence is acetylated at the N-terminal leucine and carries a free acid at the C-terminus. The non-acetylated version of the same seven residues is a separate compound, about 42 g/mol lighter, with a different charge and behavior. Findings for one form should not be assumed to carry over to the other.'),

    h4('Research Context'),
    h5('Established actin biology'),
    `<p><em>Established.</em> Thymosin beta-4 and related peptides take part in regulating the balance between unpolymerized (G-actin) and filamentous (F-actin) actin, which underlies cell shape and motility. The sequence LKKTET is conventionally described as thymosin beta-4's actin-binding motif, and TB-500 contains it.</p>`,
    h5('Proposed rationale'),
    `<p><em>Hypothesis.</em> The idea behind TB-500 is that the short LKKTETQ sequence might share some of the actin-buffering behavior of the full-length protein. Structural work suggests that nearly the full length of the parent protein contacts actin, not only this short stretch, so carrying the motif does not by itself show that TB-500 reproduces the parent's behavior. This remains an open research question.</p>`,

    h4('Research Questions, Answered'),
    qa({
      h: 'Is TB-500 the same molecule as full-length thymosin beta-4?',
      problem: 'The two names are often used interchangeably, which can suggest they share one body of research.',
      answer: 'They do not share an identity. TB-500 is a synthetic seven-residue fragment drawn from thymosin beta-4, while the parent protein has 43 residues and is roughly five times heavier. Results for one should not be treated as automatically applicable to the other.',
      takeaway: 'Related sequence, separate molecules.',
    }),
    qa({
      h: 'How can I tell whether a study tested TB-500 or thymosin beta-4?',
      problem: 'Reference material cited for TB-500 sometimes turns out to describe a different material.',
      answer: 'Check the methods section rather than the abstract. Look for an explicit statement of acetylation and the residue count used, since 43 residues signals the full-length protein and a non-acetylated seven-residue sequence is a different compound.',
      takeaway: 'Confirm the exact material before borrowing a finding.',
    }),
    qa({
      h: 'What does the LKKTET motif mean?',
      problem: 'The motif is often quoted as if it defines TB-500 completely.',
      answer: 'LKKTET is the stretch conventionally described as the actin-binding region of thymosin beta-4, and it forms most of the TB-500 sequence. It identifies where the fragment comes from without settling how the fragment behaves in an assay.',
      takeaway: 'A shared motif describes origin, not equivalence.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a TB-500 Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Chemical form', 'Whether the report describes the free base or a named salt'],
        ['Lot number', 'Links the report to a specific batch'],
        ['Identity method', 'How identity was assessed, with expected and observed mass'],
        ['HPLC or other purity method', 'Reports analytical purity under the stated conditions'],
        ['Counterion and water content', 'Where reported, explains differences between peptide content and purity'],
        ['Test date', 'Establishes when testing occurred'],
        ['Laboratory', 'Identifies who performed the analysis'],
      ],
    ),
    p('Which fields appear varies by supplier and by lot, so check the specific document rather than assuming a standard set of tests was run. If a lot-specific certificate is available, use it as the primary source for that lot’s reported results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('A few points come up often when reviewing TB-500 mass-spectrometry data. Average molecular weight and monoisotopic mass are related but distinct figures. The free base averages about 889.01 g/mol, while the monoisotopic mass is closer to 888.5 Da. The mass an instrument reports (m/z) also depends on charge state, so a doubly charged ion appears at roughly half the singly charged mass. Salt or counterion choice shifts the observed mass as well, and comparing expected and observed mass only makes sense once both refer to the same chemical form.'),
    table(
      ['Form', 'Average molecular weight'],
      [
        ['TB-500 free base (Ac-LKKTETQ)', 'About 889.01 g/mol'],
        ['Non-acetylated LKKTETQ', 'About 846.98 g/mol'],
      ],
    ),

    h4('Verification Questions, Answered'),
    qa({
      h: 'How do I confirm what TB-500 actually refers to?',
      problem: 'TB-500 is a common name, so the same label has been used for different forms of the underlying peptide.',
      answer: 'Anchor on chemical identifiers rather than the name alone: the sequence Ac-LKKTETQ, CAS number 885340-08-9 for the free base, and formula C38H68N10O14. Stated together, they describe a specific molecule instead of a label.',
      takeaway: 'Ask which form, which identifiers and which method a report used.',
    }),
    qa({
      h: 'Why do different sources list different molecular weights for TB-500?',
      problem: 'A few supplier pages can show several different weights for what is labeled as the same compound.',
      answer: 'Most differences come from which form is being described. The free base is around 889 g/mol, adding a salt such as acetate raises that figure, and the non-acetylated sequence is a separate, lighter compound. When a number does not match, the form usually was not specified.',
      takeaway: 'Compare numbers only on the same chemical-form basis.',
    }),
    qa({
      h: 'What should I verify on a TB-500 COA?',
      problem: 'A purity percentage alone does not confirm what is in a vial, particularly when more than one salt form circulates.',
      answer: 'A useful certificate states the exact chemical form, an identity result showing expected and observed mass, chromatographic purity with its detection method, and the lot number, laboratory and test date. Confirming the stated form first avoids most mismatches.',
      takeaway: 'Read a COA for form, method and lot, not just the percentage.',
    }),
    qa({
      h: 'What can a product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'The published identity of TB-500 does not establish the purity, form or specifications of any individual vial. Those are lot-specific properties confirmed by the certificate of analysis and label for that lot. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for TB-500?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('TB-500 is supplied for laboratory research use only and is not intended for human or veterinary use. It is not a drug, cosmetic, dietary supplement or food, and it has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is TB-500 peptide?',
    answer: 'TB-500 is the common name for a synthetic seven-residue peptide, Ac-LKKTETQ, corresponding to a region of thymosin beta-4. Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is TB-500 the same as thymosin beta-4?',
    answer: 'No. Thymosin beta-4 is a naturally occurring 43-residue protein, while TB-500 is a synthetic 7-residue fragment related to it, with a different mass and a separate body of research.',
  },
  {
    question: 'What is the TB-500 sequence?',
    answer: 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln-OH, corresponding to residues 17 to 23 of thymosin beta-4.',
  },
  {
    question: 'What is the molecular weight of TB-500?',
    answer: 'The free base has a molecular weight of about 889.01 g/mol and the formula C38H68N10O14. Salt forms carry a different mass.',
  },
  {
    question: 'What is the CAS number for TB-500?',
    answer: '885340-08-9 is the CAS number associated with TB-500 free base in chemical databases.',
  },
  {
    question: 'Why do different sources list different molecular weights for TB-500?',
    answer: 'Mainly because sources describe different chemical forms: the free base, a salt form, or the non-acetylated version of the sequence. Each has its own mass.',
  },
  {
    question: 'Does thymosin beta-4 research apply to TB-500?',
    answer: 'Not automatically. Several studies often cited for TB-500 actually used full-length thymosin beta-4 or the non-acetylated fragment, so check the exact material before comparing findings.',
  },
  {
    question: 'What does the LKKTET motif mean?',
    answer: 'LKKTET is the sequence conventionally described as the actin-binding region of thymosin beta-4, and it is part of what TB-500 is built from. Containing the motif does not by itself confirm that TB-500 reproduces every function of the full-length protein.',
  },
  {
    question: 'What should a TB-500 COA contain?',
    answer: 'Useful fields include the stated chemical form, an identity result with expected and observed mass, the purity method and detection conditions, and the lot number, laboratory and test date.',
  },
  {
    question: 'How should TB-500 mass-spectrometry data be interpreted?',
    answer: 'Compare expected and observed mass on the same chemical-form basis, and account for the ion’s charge state, since observed m/z shifts with charge.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for TB-500?',
    answer: 'No. TB-500 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['cellular-repair-healing'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'TB-500',
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
