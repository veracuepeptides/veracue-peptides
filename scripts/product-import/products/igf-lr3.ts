import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// IGF-LR3 (Long-[Arg3]-IGF-I). Research-use-only copy: molecular identity, IGF-binding-protein and receptor
// context at assay level, analytical notes for a large disulfide-bonded protein. Facts come from
// docs/product-contents-1/veracue-igf-1-lr3-FINAL.json; animal and human content, references and
// regulatory framing are intentionally left out.

const NAME = 'IGF-LR3'
const SLUG = 'igf-lr3'

const SKU_CODE = 'IGFLR3'
const WEIGHT_KG = 0.05
const VARIANTS = [{ strength: '1mg', image: 'VERACUE_IGF_LR3_1mg.jpg' }]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'IGF-LR3 Research Protein (Long R3 IGF-I)'
const SEO_DESCRIPTION =
  "IGF-LR3 is an 83-residue analog, longer than native IGF-1 (CAS 143045-27-6). Read the identity and COA notes. 1 mg vial, research use only."
const DESCRIPTION =
  'IGF-LR3 is a long, engineered analog of insulin-like growth factor-1, an 83-amino-acid protein of about 9.1 kDa rather than a short peptide. It carries a 13-residue N-terminal extension and a Glu-to-Arg change at position 3 of the IGF-1 sequence, and it is listed under CAS 143045-27-6 with the formula C400H625N111O115S9 for the reduced chain. It is easily confused with native IGF-1, which has 70 residues. Veracue offers it as a 1 mg vial for laboratory research use only.'

function productDetails(): string {
  return [
    h4('What Is IGF-LR3?'),
    p('IGF-LR3, also written Long R3 IGF-I or Long-[Arg3]-IGF-I, is an 83-amino-acid analog of IGF-1. It has a 13-residue N-terminal extension and an arginine in place of glutamate at position 3, and it is held together by three disulfide bonds. Veracue supplies it for laboratory research only.'),
    p('At 83 residues it is closer to a small protein than a short peptide, which shapes how it is characterized and how its certificate should be read. The name itself records the changes: “Long” is the extension and “R3” is the arginine at position 3.'),
    h4('IGF-LR3 at a Glance'),
    kvTable([
      ['Product name', 'IGF-LR3 (Long-(Arg3) insulin-like growth factor-I)'],
      ['Also known as', 'IGF-1 LR3; Long R3 IGF-1; Long R3 IGF-I; Long-[Arg3]-IGF-I; LR3 IGF-1'],
      ['Length', '83 amino acids'],
      ['Structural changes', '13-residue N-terminal extension; Glu-to-Arg at position 3 of the IGF-1 domain'],
      ['Calculated mass', 'About 9.1 kDa (9,117.6 Da reduced chain; 9,111.5 Da with three disulfide bonds)'],
      ['CAS Registry Number', '143045-27-6'],
      ['UNII', 'M9L22Y19H9'],
      ['Size offered', '1 mg vial'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Masses are calculated reference values for the molecule in general, not measured results for a Veracue lot. Physical form, salt or counterion, formulation, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What IGF-LR3 Is Not'),
    ul([
      'Not the same molecule as native IGF-1, which has 70 residues.',
      'Not the same as R3-IGF-I (arginine change, no extension) or Des(1-3)-IGF-I (first three residues absent).',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('What do “Long” and “R3” mean?'),
    p('“R3” marks the replacement of glutamate with arginine at position 3 of the mature IGF-1 sequence. “Long” marks a 13-residue extension at the N-terminus, MFPAMPLSSLFVN. In the original 1992 constructs, that extension was the first 11 residues of a methionyl porcine growth hormone followed by Val-Asn. A listing that lacks either feature describes a different molecule.'),
    p('The reference sequence has 83 residues: MFPAMPLSSL FVNGPRTLCG AELVDALQFV CGDRGFYFNK PTGYGSSSRR APQTGIVDEC CFRSCDLRRL EMYCAPLKPA KSA. Six cysteines form three intramolecular disulfide bonds in the native folded structure.'),
    h5('How does IGF-LR3 compare with native IGF-1 and related analogs?'),
    table(
      ['Molecule', 'Residues', 'Structural change', 'IGFBP interaction'],
      [
        ['Native IGF-1', '70', 'Reference sequence', 'Normal'],
        ['IGF-LR3', '83', '13-residue N-terminal extension plus Glu3-to-Arg', 'Markedly reduced'],
        ['R3-IGF-I', '70', 'Glu3-to-Arg without the extension', 'Reduced'],
        ['Des(1-3)-IGF-I', '67', 'First three residues absent', 'Reduced'],
      ],
    ),
    p('Recombinant material with the native 70-residue sequence, sold under the name mecasermin, is a different molecular entity from IGF-LR3. Findings about one should not be carried over to the other.'),

    h4('Binding-Protein and Receptor Context'),
    h5('Why does IGF-binding-protein interaction matter?'),
    p('IGF-binding proteins (IGFBPs) hold IGF-1 in complex and can keep it away from its receptor in a test system. So the amount of IGF-1 added and the amount that acts can differ. Foundational work reported that Long-[Arg3]-IGF-I interacts with IGFBPs far less than native IGF-1 does while still activating its receptor, which makes it useful for separating the two questions.'),
    p('Solution NMR structures (Laajoki et al., PDB 3LRI) found that the IGF domain closely resembles IGF-1, with the main differences at the N-terminus, where the first three residues are reoriented. The authors linked that change to the lower IGFBP affinity. Reduced binding is a property of the molecule, and its effect depends on the system it is used in.'),
    h5('Which receptors does it engage in assays?'),
    p('IGF-LR3 activates the type I IGF receptor, and that is the property most cell-based work relies on. It should not be assumed to act only there. In HEK293 cells, it, insulin and native IGF-1 each activated both the type I IGF receptor and the insulin receptor, and at lower concentrations the analog produced greater activation of both than either comparator. A readout on its own does not say which receptor produced it, so receptor-specific readouts and comparators help assign the signal.'),
    h5('What does serum-free culture research look at?'),
    p('Serum-free media remove the factors serum normally supplies, so cultures need a substitute, traditionally insulin. Reports have examined IGF-LR3 as an insulin alternative in CHO and HEK293 cultures. Responses depend on the cell line and even the clone, so titration in the system under study belongs in the methods.'),
    h5('Why is it studied as a folding model?'),
    p('Native IGF-1 can refold into more than one disulfide arrangement. In one in vitro refolding comparison, IGF-1 gave about 45% of the native structure and 24% of a mispaired one, while the Long-[Arg3] analog gave about 85% and 10%. That makes it a common model for how a disulfide-rich protein reaches its fold. It also shows why analytical documentation should address folding, because a mispaired isomer has the same composition, and the same intact mass, as the native protein.'),

    h4('Questions Worth Asking Before You Compare Results'),
    ul([
      'Which molecule was tested: native IGF-1, R3-IGF-I, Des(1-3)-IGF-I or IGF-LR3?',
      'Which receptor readout and which cell line or clone were used?',
      'Were binding proteins present in the system?',
      'Does the mass in the supplier document match the reduced chain or the form with three disulfide bonds?',
    ]),
    p('This page gives molecular reference information and general research context. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read an IGF-LR3 Certificate of Analysis'),
    p('Procurement teams learn more from a certificate that answers a few specific questions than from one purity figure, especially for a protein with three disulfide bonds. The table shows what each item can and cannot tell you.'),
    table(
      ['COA element', 'What it tells you', 'What it does not establish'],
      [
        ['Lot number', 'Links the report to the vial in hand', 'Anything about quality unless it matches the label'],
        ['Identity and reference sequence', 'The material was compared with the stated 83-residue sequence', 'Correct folding or purity'],
        ['Observed intact mass and mass form', 'Whether the measured mass fits the expected species, about 9,117.6 Da reduced or about 9,111.5 Da with three disulfide bonds', 'Purity, amount of material or correct disulfide pairing'],
        ['RP-HPLC purity and method', 'Share of detected signal in the main peak under stated conditions', 'Identity, folding or biological activity'],
        ['Structural or folding evidence, where available', 'Whether the main species behaves like correctly folded protein', 'Lot potency in any particular assay'],
        ['Formulation', 'What else is in the vial and how much protein it holds', 'Chromatographic purity'],
        ['Testing laboratory and test date', 'Who tested the lot and when', 'Independence, unless the relationship is disclosed'],
        ['Endotoxin, if applicable', 'Endotoxin level in the tested lot', 'Identity or fold'],
      ],
    ),
    p('Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Why a Large Protein Needs More Than One Number'),
    h5('What can mass spectrometry tell me about IGF-LR3?'),
    p('At about 9.1 kDa, intact-mass work is a standard identity check. The calculated average mass is about 9,117.6 Da for the reduced chain (C400H625N111O115S9) and about 9,111.5 Da with three disulfide bonds (C400H619N111O115S9). A report should name which form its observed mass was matched against, because the two differ by a few daltons.'),
    h5('Why is purity alone not enough?'),
    p('Chromatographic purity shows the share of signal in the main peak under one set of conditions. It does not show correct disulfide pairing, and intact mass cannot separate disulfide isomers, since they share the same mass. Look for the method, the mass form and some structural or folding evidence, shown and not implied.'),
    h4('Quick COA check'),
    ul([
      'Lot number matches the vial label',
      'Mass result names the form it was matched against',
      'Purity method is named, not just a percentage',
      'Some evidence of correct folding is shown',
      'Formulation is stated',
      'Testing laboratory and date are shown',
    ]),
    h4('Molecule Identity Versus Lot Identity'),
    p('The sequence, CAS number and UNII describe IGF-LR3 in general. Only lot-specific analytical documentation describes a particular lot. Keep the intended-use statement, receipt and storage records with the purchase file, and follow the conditions on the lot documentation and label for storage.'),

    h4('Need lot documentation for IGF-LR3?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('IGF-LR3 is supplied solely for laboratory research and analytical characterization. It is not intended for human or veterinary use, and it is not a drug, a dietary supplement or medical advice. This page provides no dosing, administration or usage guidance of any kind. Purchasers are responsible for using the material lawfully and within an appropriate research setting. See the Medical Disclaimer and the Terms and Conditions for sitewide policies, or the FAQ for general questions.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
        { phrase: 'FAQ', href: '/faq' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is IGF-LR3?',
    answer: 'IGF-LR3 is an 83-amino-acid analog of IGF-1, also called Long R3 IGF-I or Long-[Arg3]-IGF-I. It has a 13-residue N-terminal extension and an arginine at position 3, and Veracue supplies it for laboratory research only.',
  },
  {
    question: 'What does LR3 mean?',
    answer: '“L” stands for “Long,” the 13-residue N-terminal extension, and “R3” stands for arginine replacing glutamate at position 3. Together they separate it from native IGF-1 and from R3-IGF-I, which has the substitution but no extension.',
  },
  {
    question: 'What is the IGF-LR3 sequence and length?',
    answer: 'It has 83 amino acids: MFPAMPLSSL FVNGPRTLCG AELVDALQFV CGDRGFYFNK PTGYGSSSRR APQTGIVDEC CFRSCDLRRL EMYCAPLKPA KSA. The first 13 residues form the extension, and six cysteines form three disulfide bonds.',
  },
  {
    question: 'How is IGF-LR3 different from native IGF-1?',
    answer: 'Native IGF-1 has 70 residues. IGF-LR3 adds a 13-residue extension and replaces Glu3 with Arg, which markedly reduces its interaction with IGF-binding proteins while it still activates the IGF-1 receptor.',
  },
  {
    question: 'What is the molecular weight of IGF-LR3?',
    answer: 'About 9.1 kDa. The calculated average mass is roughly 9,117.6 Da for the reduced chain and 9,111.5 Da with three disulfide bonds. Both are reference values, not measured results for a Veracue lot.',
  },
  {
    question: 'What are the CAS number and formula?',
    answer: 'The CAS number is 143045-27-6 and the UNII is M9L22Y19H9. The calculated formula is C400H625N111O115S9 for the reduced chain and C400H619N111O115S9 with three disulfide bonds.',
  },
  {
    question: 'Is IGF-LR3 a peptide or a protein?',
    answer: 'Many suppliers list it as a peptide, but at 83 residues with three disulfide bonds it behaves more like a small protein. That is why folding and intact-mass evidence matter when reading its certificate.',
  },
  {
    question: 'Which receptors does IGF-LR3 engage in laboratory assays?',
    answer: 'It activates the type I IGF receptor. In HEK293 cells it also activated the insulin receptor, so receptor-specific readouts help show which receptor produced a signal.',
  },
  {
    question: 'What should an IGF-LR3 COA include?',
    answer: 'A useful certificate shows the lot number, identity against the reference sequence, observed intact mass with its form named, RP-HPLC purity with its method, and the formulation. Folding evidence, testing laboratory, test date and endotoxin where relevant complete it.',
  },
  {
    question: 'Does purity prove the disulfide bonds are correct?',
    answer: 'No. Chromatographic purity does not show correct disulfide pairing, and intact mass cannot separate disulfide isomers because they share the same mass.',
  },
  {
    question: 'Does Veracue provide usage instructions for IGF-LR3?',
    answer: 'No. IGF-LR3 is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'IGF-LR3',
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
