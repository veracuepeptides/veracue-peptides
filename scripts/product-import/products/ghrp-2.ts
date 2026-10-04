import { runProduct, h4, h5, p, ul, kvTable, table, esc } from '../lib'

// GHRP-2. Research-use-only copy: molecular identity, GHS-R1a receptor pharmacology at assay level,
// analytical documentation. Facts come from docs/product-contents-1/ghrp-2-veracue-product-page (1).json;
// all human study, approval, anti-doping, dosing and drug-name content is intentionally left out.

const NAME = 'GHRP-2'
const SLUG = 'ghrp-2'

const SKU_CODE = 'GHRP2'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '10mg', image: 'VERACUE_GHRP_2_10mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'GHRP-2 Research Peptide (GHS-R1a Agonist)'
const SEO_DESCRIPTION =
  "GHRP-2 and GHRP-6 look alike on paper. See how the sequence, mass and CAS 158861-67-7 tell them apart. 10 mg vial. Research use only."
const DESCRIPTION =
  "GHRP-2 (Growth Hormone Releasing Peptide-2) is a synthetic hexapeptide amide with the sequence D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2. It binds the ghrelin receptor, GHS-R1a, in research systems and belongs to the same family as GHRP-6 and hexarelin. The free base has the formula C45H55N9O6, a molecular weight of 817.99 g/mol and CAS 158861-67-7. A single 10 mg vial size is offered, intended only for laboratory use."
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
    h4('What Is GHRP-2?'),
    p('GHRP-2, short for Growth Hormone Releasing Peptide-2, is a synthetic hexapeptide amide with the sequence D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2. It binds the ghrelin receptor (GHS-R1a) in research systems. Its molecular formula is C45H55N9O6, its molecular weight is 817.99 g/mol and its CAS number is 158861-67-7.'),
    p('Chemically, GHRP-2 is an analogue of met-enkephalin: six amino acid residues capped with a C-terminal amide. It is structurally related to GHRP-6, GHRP-1 and hexarelin, all of which grew out of the same line of research begun by endocrinologist Cyril Y. Bowers and collaborators in the 1980s. Veracue supplies GHRP-2 strictly for laboratory use.'),
    h4('GHRP-2 at a Glance'),
    kvTable([
      ['Product name', 'GHRP-2 (Growth Hormone Releasing Peptide-2)'],
      ['Class', 'Growth hormone secretagogue (GHS), GHRP subfamily'],
      ['Molecular target', 'Growth hormone secretagogue receptor 1a (GHS-R1a), the ghrelin receptor'],
      ['Sequence', 'D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2 (hexapeptide amide)'],
      ['Structural relatives', 'Met-enkephalin analogue; related to GHRP-1, GHRP-6 and hexarelin'],
      ['Molecular formula', 'C45H55N9O6'],
      ['Molecular weight (free base)', '817.99 g/mol'],
      ['CAS Registry Number', '158861-67-7'],
      ['Research designation', 'Research Use Only'],
    ]),
    `<p><em>Formula and identifiers from the PubChem record (CID 6852372, free base).</em></p>`,
    p('Physical form, salt or counterion, purity, lot results and storage conditions are reported on the documentation for each lot. Request lot documentation through the contact page.', { links: CONTACT }),
    h4('What GHRP-2 Is Not'),
    ul([
      'Not a hormone itself. It is a small synthetic molecule that mimics ghrelin closely enough to activate ghrelin’s own receptor.',
      'Not the same thing as the broader term “GHRP”, which names a whole class of peptides.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What are the other names for GHRP-2?'),
    p('GHRP-2 is the common research name, and Growth Hormone Releasing Peptide-2 is the spelled-out form. It comes from the original series of peptides developed by Bowers alongside GHRP-1 and GHRP-6, which is a useful thing to know when reading older literature.'),
    h5('What does the structure look like?'),
    p('GHRP-2 is six residues long: D-Ala, D-2-Naphthylalanine, Ala, Trp, D-Phe and Lys, with an amidated C-terminus. Two of those residues are D-amino acids and one is the non-standard D-2-Nal, which are typical features of this peptide family. The PubChem record for the free base (CID 6852372) lists the formula C45H55N9O6 and the InChIKey HRNLPPBUBKMZMT-RDRUQFPZSA-N.'),
    h5('Why does the salt form matter?'),
    p('A certificate of analysis may report the free base, an acetate salt or another counterion form, and each one has a different molecular weight. A COA should say which form its identity and mass figures refer to.'),

    h4('Receptor Profile and Mechanism'),
    table(
      ['Attribute', 'Detail'],
      [
        ['Receptor', 'GHS-R1a, the same receptor ghrelin naturally binds'],
        ['Activity in assays', 'Agonist at GHS-R1a'],
        ['Related pathway', 'GHRH receptor, a separate receptor that also converges on growth hormone release'],
        ['Peptide family', 'GHRP-1, GHRP-2, GHRP-6, hexarelin'],
      ],
    ),
    h5('Why do researchers study GHRP-2?'),
    p('It was among the first peptides to show that a receptor distinct from the GHRH receptor, later identified as GHS-R1a, could drive pulsatile growth hormone release on its own. Much of the foundational pharmacology of the GHS-R1a class, including later peptides such as ipamorelin and hexarelin and several non-peptide secretagogues, traces back to comparative work with GHRP-2 and GHRP-6.'),
    p('It also serves as a reference point in comparative GHS-R1a pharmacology. Newer secretagogues designed for greater receptor selectivity are typically characterized against the earlier, less selective GHRPs such as GHRP-2 and GHRP-6.'),

    h4('GHRP-2 vs GHRP-6'),
    p('Both are hexapeptide agonists of GHS-R1a that come from the same original research program. GHRP-6 was the earlier compound, and GHRP-2 was developed later as part of the same structure-activity series that also produced GHRP-1 and hexarelin. This comparison stays at the level of structure and receptor pharmacology, and it is not a ranking.'),
    table(
      ['Attribute', 'GHRP-2', 'GHRP-6'],
      [
        ['Sequence', 'D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2', 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2'],
        ['Length', 'Six residues, C-terminal amide', 'Six residues, C-terminal amide'],
        ['Receptor', 'GHS-R1a agonist', 'GHS-R1a agonist'],
        ['Origin', 'Bowers series, developed after GHRP-6', 'Bowers series, the earlier compound'],
      ],
    ),
    p('Because the two peptides activate the same receptor and were characterized in overlapping research programs, they are often discussed together. Claims that one is flatly “stronger” or “cleaner” than the other usually rest on informal secondary sources rather than on a controlled side-by-side comparison, so treat them with caution.'),

    h4('Research Questions, Answered'),
    qa({
      h: 'What receptor does GHRP-2 act on, and how does that differ from GHRH?',
      problem: 'Both GHRP-2 and GHRH-class peptides are linked to growth hormone release, so it is easy to treat them as the same thing.',
      answer: 'GHRP-2 activates GHS-R1a, the receptor ghrelin naturally binds. Growth hormone-releasing hormone (GHRH) acts on a separate receptor, the GHRH receptor. Both pathways converge on the same somatotroph cells, which is why the two classes are often studied side by side in research on how the signals combine.',
      takeaway: 'Two receptors, one shared downstream outcome.',
    }),
    qa({
      h: 'How does GHRP-2 differ from GHRH-class peptides like CJC-1295 or sermorelin?',
      problem: 'Peptide catalogs often list secretagogues together, which hides the fact that they act on different receptors.',
      answer: 'GHRH-class peptides such as sermorelin, CJC-1295 and tesamorelin bind the GHRH receptor, while GHRP-2 binds GHS-R1a. Research on the two pathways describes them as converging before growth hormone release, and combining a GHS-R1a agonist with a GHRH-receptor agonist is a common design in comparative studies.',
      takeaway: 'Match the peptide to its receptor before comparing results.',
    }),
    qa({
      h: 'Why do researchers distinguish GHRP-2 from the broader term “GHRP”?',
      problem: '“GHRP” appears in many papers and product listings, and it does not always mean GHRP-2.',
      answer: 'GHRP is a class name covering GHRP-1, GHRP-2, GHRP-6, hexarelin and related compounds. They share a discovery lineage and a receptor, but they differ in exact sequence and receptor affinity. Treating “GHRP” and “GHRP-2” as interchangeable hides real differences between family members.',
      takeaway: 'Always name the specific family member.',
    }),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a GHRP-2 Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist.'),
    table(
      ['COA item', 'What it tells you', 'What it does not establish'],
      [
        ['Lot or batch number', 'Links the report to a specific production lot', 'Anything about quality unless it matches the vial label'],
        ['HPLC purity (%)', 'Share of detected signal in the main peak under stated conditions', 'Identity, net peptide content, sterility or biological activity'],
        ['Mass spectrometry / LC-MS', 'Whether an observed mass is consistent with C45H55N9O6', 'Purity, or the amount of material present'],
        ['Net peptide content', 'How much of the vial’s mass is peptide rather than salts, acetate or water', 'Chromatographic purity'],
        ['Salt or counterion form', 'Whether the reported mass refers to the free base or an acetate or other salt', 'Identity by itself, since it must be paired with MS data'],
        ['Laboratory name and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
      ],
    ),
    h5('A quick five-point check'),
    ul([
      'The lot number on the COA matches the vial label.',
      'The purity method is named, not just a percentage.',
      'The identity result states expected versus observed mass against C45H55N9O6.',
      'The salt form (free base or acetate) is stated.',
      'The testing laboratory and date are shown.',
    ]),
    p('HPLC alone does not prove identity, and mass spectrometry alone does not prove purity. If a lot-specific certificate is available, use it as the primary source for that lot’s reported analytical results. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Analytical Note'),
    p('GHRP-2 has a calculated molecular weight of 817.99 g/mol for the free base. An observed m/z value is not automatically the same number as the calculated mass. Instruments can report protonated species, adducts or multiply charged ions, and the counterion form changes the mass of the bulk material. Identity and purity are also separate questions. Mass data speak to what a material is, while chromatographic purity speaks to how much of the detected signal belongs to a single component.'),

    h4('Verification Questions, Answered'),
    qa({
      h: 'How do I confirm that the material is actually GHRP-2?',
      problem: 'Related hexapeptides such as GHRP-6 look alike in catalogs, and a name on a label tells you what a material is called, not what it is.',
      answer: 'Identity comes from analytical data compared with a defined reference. For GHRP-2 the reference is the published structure: D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2, formula C45H55N9O6. Mass spectrometry can support that match by showing an observed mass consistent with the reference, whereas a clean chromatography peak only shows that a sample is uniform.',
      takeaway: 'A name is not an analytical identity. Ask which reference and which method a report used.',
    }),
    qa({
      h: 'What can a product page establish, and what needs lot-specific documentation?',
      problem: 'A product page can read like a guarantee, but the material in a vial is a specific lot.',
      answer: 'Identity, purity, net peptide content, physical form and storage details belong to the lot record, and a report for one lot does not describe another. The product page provides molecular and research context, and lot documentation provides the analytical results reported for that particular material. The certificate page explains how to request lot documentation.',
      takeaway: 'Use the page to understand the molecule and the lot record to understand the material.',
      links: CERT,
    }),

    h4('Need lot documentation for GHRP-2?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the site FAQ</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('GHRP-2 is supplied for laboratory research use only. It is not a drug, cosmetic, dietary supplement or food, and it is not intended for human or veterinary use. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. Purchasers are responsible for using this material lawfully and within an appropriate research setting. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is GHRP-2?',
    answer: 'GHRP-2 is a synthetic hexapeptide that activates the ghrelin receptor (GHS-R1a) in research systems. Veracue supplies it as a laboratory research material only.',
  },
  {
    question: 'What is the sequence of GHRP-2?',
    answer: 'D-Ala-D-2-Naphthylalanine-Ala-Trp-D-Phe-Lys-NH2. That is six amino acid residues with a C-terminal amide, and the peptide is classed as a met-enkephalin analogue.',
  },
  {
    question: 'What is the molecular weight and CAS number of GHRP-2?',
    answer: 'GHRP-2 has the formula C45H55N9O6, a molecular weight of 817.99 g/mol for the free base and CAS number 158861-67-7. A salt form will have a different mass.',
  },
  {
    question: 'Which receptor does GHRP-2 act on?',
    answer: 'The growth hormone secretagogue receptor 1a (GHS-R1a), which is the same receptor ghrelin naturally binds. It is separate from the GHRH receptor.',
  },
  {
    question: 'What is the difference between GHRP-2 and GHRP-6?',
    answer: 'Both are hexapeptide GHS-R1a agonists from the same research lineage, but their sequences differ: GHRP-2 is D-Ala-D-2-Nal-Ala-Trp-D-Phe-Lys-NH2 and GHRP-6 is His-D-Trp-Ala-Trp-D-Phe-Lys-NH2.',
  },
  {
    question: 'Is GHRP-2 the same as GHRP?',
    answer: 'No. GHRP is a class name covering several related peptides, and GHRP-2 is one specific member of that class.',
  },
  {
    question: 'How does GHRP-2 differ from GHRH analogues like CJC-1295?',
    answer: 'They act on different receptors: GHRP-2 on GHS-R1a and GHRH analogues on the GHRH receptor. Both pathways converge on growth hormone release.',
  },
  {
    question: 'What should a GHRP-2 COA include?',
    answer: 'A matching lot number, a named purity method (typically HPLC), a mass spectrometry identity result stated against the correct salt form, net peptide content, and the testing laboratory’s name and date.',
  },
  {
    question: 'Why does the salt form matter on a COA?',
    answer: 'Free base and acetate forms have different molecular weights, so a mass figure only makes sense when the COA says which form it refers to.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for GHRP-2?',
    answer: 'No. GHRP-2 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'GHRP-2',
  variants: VARIANTS,
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/pralmorelin/i, /KP-102/i, /GPA-748/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
