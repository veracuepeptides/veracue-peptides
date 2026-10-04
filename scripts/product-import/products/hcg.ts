import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// HCG (alpha/beta glycoprotein). Research-use-only copy: molecular identity, subunits, glycosylation,
// IU vs mass, receptor-level assay context and COA reading. Facts come from docs/product-contents-1/hcg-final.json;
// pregnancy, fertility, hormone-level, human-study, dosing, injection and regulatory content plus references are left out.

const NAME = 'HCG'
const SLUG = 'hcg'

const SKU_CODE = 'HCG'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '5000 IU', image: 'VERACUE_HCG_5000_IU.jpg' },
  { strength: '10000 IU', image: 'VERACUE_HCG_10000_IU.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'HCG Research Protein (Glycoprotein)'
const SEO_DESCRIPTION =
  "HCG is a glycoprotein, so it is measured in IU, not milligrams. Learn how that changes COA reading. 5000 and 10000 IU, research use only."
const DESCRIPTION =
  "HCG is a two-chain glycoprotein, not a short peptide: an alpha subunit of 92 amino acids pairs with a beta subunit of 145, and sugar chains make up about 30% of its roughly 37 kDa mass. Because glycosylation varies, its amount is stated in international units, a bioassay measure, rather than in milligrams. It is often confused with LH, which shares the alpha chain and the same receptor. Vials come in 5000 IU and 10000 IU for laboratory research use only."

function productDetails(): string {
  return [
    h4('What Is HCG?'),
    p('HCG (human chorionic gonadotropin, written hCG in papers) is a heterodimeric glycoprotein hormone. It has a 92-amino-acid alpha subunit and a 145-amino-acid beta subunit, and it activates the luteinizing hormone/choriogonadotropin receptor (LHCGR). Veracue supplies it as a research material for laboratory work.'),
    p('The beta subunit gives HCG its specificity, while the alpha chain is shared with LH, FSH and TSH. Sugar chains make up roughly 30% of the mass, so HCG behaves differently from a short synthetic peptide in the lab.'),
    h4('HCG at a Glance'),
    kvTable([
      ['Product name', 'HCG (also written hCG)'],
      ['Molecular class', 'Heterodimeric glycoprotein'],
      ['Alpha subunit', '92 amino acids; shared with LH, FSH and TSH'],
      ['Beta subunit', '145 amino acids; specific to HCG'],
      ['Amino acids, both subunits', '237 (polypeptide backbone only)'],
      ['Carbohydrate share', 'About 30% of mass (reported range 25 to 40%)'],
      ['Approximate molecular mass', 'About 37 kDa; published values run from roughly 36 to 39 kDa'],
      ['Receptor', 'LHCGR'],
      ['Potency unit', 'International Unit (IU)'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('These values describe HCG as a molecule in general and do not describe any specific Veracue lot. Source, formulation, purity, potency method and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What HCG Is Not'),
    ul([
      'Not a short peptide. “HCG peptide” is common search shorthand, but HCG is a glycosylated protein of 237 amino acids.',
      'Not the same as LH, although the two share an alpha chain and a receptor.',
      'Not a diagnostic test.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Is HCG a peptide?'),
    p('Not in the conventional sense. Across its two subunits HCG has 237 amino acids, its mass is near 37 kDa, and about 30% of that mass is carbohydrate. Short synthetic peptides are much smaller and typically carry no sugar chains.'),
    p('As a result, several peptide conventions do not carry over. Molecular weight is a range rather than one value, potency is usually expressed in international units, and a mass-spectrometry identity reflects a distribution of glycoforms instead of one exact mass.'),
    h5('What do the alpha and beta subunits do?'),
    p('The two chains associate without covalent bonds. Isolated subunits do not act on the receptor, and recombining them restores nearly full activity in dissociation and reassociation experiments. A free beta subunit also occurs as a variant, and it behaves differently from the intact dimer in assays and cell models.'),
    table(
      ['Property', 'General scientific value'],
      [
        ['Alpha subunit glycosylation', '2 N-linked chains (Asn52, Asn78)'],
        ['Beta subunit glycosylation', '2 N-linked chains (Asn13, Asn30) and 4 O-linked chains (Ser121, Ser127, Ser132, Ser138)'],
        ['Numbering', 'Mature-subunit numbering'],
        ['Receptor', 'LHCGR, a 675-amino-acid class A G protein-coupled receptor'],
        ['Genes', 'CGA for the alpha subunit (chromosome 6); a CGB gene cluster for the beta subunit (chromosome 19)'],
      ],
    ),
    p('The beta chain is about 80% homologous to LH-beta. It also carries a C-terminal extension that LH-beta lacks, and that extension holds the O-linked glycans. Sources give the extension as roughly 24 to 34 residues, depending on where they draw its boundary.'),
    h5('Why does glycosylation matter?'),
    p('Sugar chains vary from molecule to molecule, so no single molecular weight fits every preparation. Reviews describe several forms with the same amino acid sequence: regular, hyperglycosylated and sulfated HCG, the free beta subunit and a hyperglycosylated free beta subunit. Nicked forms and the beta-core fragment are described as well. Sialic acid and other glycan features change receptor binding, activity and clearance, so glycoform analysis is a research field of its own.'),

    h4('HCG vs LH at a Glance'),
    table(
      ['Feature', 'HCG', 'LH'],
      [
        ['Structure', 'Alpha/beta glycoprotein heterodimer', 'Alpha/beta glycoprotein heterodimer'],
        ['Subunits', 'Shared alpha (92 amino acids); beta of 145 amino acids', 'Shared alpha (92 amino acids); a different beta chain'],
        ['Beta chain', 'Carries a C-terminal extension with O-linked glycans', 'About 80% homologous to HCG-beta, without that extension'],
        ['Receptor', 'LHCGR', 'LHCGR'],
        ['Cell-assay signaling', 'Different cAMP and beta-arrestin 2 responses from LH', 'Different responses from HCG in the same readouts'],
        ['Glycosylation', '4 N-linked and 4 O-linked chains; about 30% carbohydrate', 'Sugar composition differs from HCG, which affects bioactivity and degradation rate'],
        ['Key difference', 'The beta extension and its glycans', 'A different beta chain and sugar structure'],
      ],
    ),
    p('The comparison is descriptive and does not rank either molecule.'),

    h4('Receptor-Level Research Context'),
    h5('Which receptor does HCG activate?'),
    p('HCG binds LHCGR, a class A G protein-coupled receptor with a large extracellular domain that also binds LH. The receptor couples mainly to Gαs, which drives adenylyl cyclase, cAMP and protein kinase A signaling. It can also activate ERK and AKT pathways, and at high hormone and receptor levels it couples to Gαq, which raises intracellular calcium.'),
    h5('What do cell studies show?'),
    p('In one HEK293 model expressing human LHCGR, either HCG or LH raised cAMP within five minutes. Separate work compared recombinant HCG and LH in HEK293 cells and in mouse Leydig tumor cells and reported differences in cAMP and beta-arrestin 2 responses. These are cell-line findings, and which pathway dominates depends on receptor level, cell type and the hormone used.'),
    h5('What do these findings not tell me?'),
    p('A receptor-level result describes a measured difference in a defined cell system. Cell-line responses depend on receptor level, cell type and species, and rodent and human cells already behave differently. Findings for one preparation may not apply to another, because recombinant and urine-derived material differ in glycosylation. This page gives no dosing, administration or usage guidance of any kind.'),

    h4('Research Areas'),
    ul([
      'LHCGR signaling: receptor-expressing cell lines allow cAMP, beta-arrestin recruitment and related readouts to be measured.',
      'Glycoprotein characterization: glycan features such as sialic acid influence receptor binding, activity and clearance.',
      'Assay research: reference materials exist for HCG and several of its molecular forms, and laboratories test how assays recognise each form.',
      'Subunit biochemistry: the shared alpha chain and hormone-specific beta chain are a standing comparison across four glycoprotein hormones.',
    ]),

    h4('Beta-hCG and Assay Method Labels'),
    p('Because the beta chain differs from LH-beta, antibodies aimed at it can separate HCG from LH. The two beta chains are about 80% homologous, and early polyclonal assays suffered LH interference for that reason.'),
    p('In testing, “beta-hCG” usually refers to assays directed at the beta chain. Some assays detect intact HCG only, and others detect intact HCG plus the free beta subunit, which laboratories call total beta-hCG. Method labels therefore matter. In one split-sample study, 9.3% of participating laboratories (22 of 235) reported intact HCG results as total beta-hCG, and 13.1% (8 of 61) reported total beta-hCG as intact HCG. That finding concerns reporting practice and does not rank assays by accuracy.'),
    p('Research material sold under Research Use Only terms is a laboratory reagent, not a diagnostic test.'),

    h4('Research Questions Worth Asking'),
    ul([
      'Which form is meant: intact dimer, free beta subunit or a fragment?',
      'Is the material urine-derived, recombinant or another source? Glycosylation follows the source.',
      'Is potency given in IU, and by which assay type?',
      'What else is in the vial? Excipients and carrier change the relationship between vial mass and hormone mass.',
    ]),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('IU vs Milligrams: Reading HCG Amounts'),
    p('An international unit measures biological activity, not mass. WHO International Standards define it, and the value depends on the assay method. The 5th WHO International Standard for HCG carries 162 IU per ampoule by bioassay and 179 IU per ampoule by immunoassay, so the method belongs next to the number.'),
    p('IU and mass are not interchangeable without the preparation’s specific activity. Some reference preparations also contain albumin and buffer salts, so vial mass differs from hormone mass. Veracue lists these vials as 5000 IU and 10000 IU.'),

    h4('How to Read an HCG Certificate of Analysis'),
    p('A certificate of analysis reports the tests a laboratory ran on one lot, with the methods and results it chooses to show. It ties a report to a lot number. It does not show that the lot performs in your assay, that another lot matches it, or that the material suits your model.'),
    table(
      ['COA item', 'What to check', 'Why it matters for HCG'],
      [
        ['Identity', 'Method and result that match HCG', 'Intact mass is a glycoform distribution, so one exact mass is not expected'],
        ['Source', 'Urine-derived, recombinant or other', 'Glycosylation follows the source and affects activity and clearance'],
        ['Purity', 'The named method behind the figure', 'A single percentage does not describe glycoform pattern or biological activity'],
        ['Potency', 'The unit and the assay type', 'IU values differ between bioassay and immunoassay'],
        ['Protein content', 'Amount in the stated unit', 'IU and mass are not interchangeable'],
        ['Formulation', 'Excipients and carrier', 'Vial mass can differ from hormone mass'],
        ['Variant information', 'Intact dimer versus free subunits or fragments', 'Assays and cell responses treat variants differently'],
        ['Endotoxin and sterility', 'Reported results, if relevant', 'Matters for cell-based work'],
        ['Lot traceability', 'A lot number that matches the label', 'Ties the data to the material in hand'],
        ['Analytical method', 'Named method, laboratory and date', 'Lets you judge whether the result fits your use'],
      ],
    ),
    p('Where documentation is missing for an attribute, treat that attribute as unverified. Source, formulation, purity, potency method and lot results are reported on each lot’s documentation, and the certificate page explains how to request it.', { links: CERT }),

    h4('Analytical Notes'),
    p('A purity percentage alone cannot describe glycoform distribution or potency. Mass-spectrometry identity for a glycoprotein reflects a distribution of glycoforms rather than one exact mass, and a potency figure is only meaningful with the assay that produced it. General research does not establish the quality of a specific lot, and only lot-specific analytical documentation can describe a particular material.'),

    h4('Need lot documentation for HCG?'),
    p('Ask the Veracue team about documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/faq">Read the FAQ</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('HCG is supplied for laboratory and scientific research only. Veracue’s site policy states that its products are not intended for human or veterinary use, ingestion, injection or any form of administration. HCG research material is not a diagnostic test, and nothing on this page is medical advice. This page provides no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is HCG?',
    answer: 'HCG is a glycoprotein hormone made of an alpha subunit (92 amino acids) and a beta subunit (145 amino acids). It activates the luteinizing hormone/choriogonadotropin receptor (LHCGR), and Veracue supplies it for laboratory research only.',
  },
  {
    question: 'Is HCG a peptide?',
    answer: 'Not in the conventional sense. “HCG peptide” is search shorthand, but HCG is a glycosylated heterodimeric protein of about 237 amino acids, roughly 37 kDa and about 30% carbohydrate.',
  },
  {
    question: 'What is beta-hCG?',
    answer: 'Beta-hCG is the beta subunit, the HCG-specific chain, so many assays target it. Intact HCG contains both subunits, and a free beta subunit also occurs as a variant.',
  },
  {
    question: 'How does HCG differ from LH?',
    answer: 'Both are alpha/beta glycoprotein hormones that share an alpha subunit and act on LHCGR. Their beta chains differ, HCG-beta carries a C-terminal extension with O-linked glycans, and cell studies report different signaling responses.',
  },
  {
    question: 'What receptor does HCG activate?',
    answer: 'LHCGR, a class A G protein-coupled receptor that also responds to LH. It couples mainly to Gαs and cAMP, and it can engage ERK, AKT and, at high levels, Gαq pathways.',
  },
  {
    question: 'What does IU mean for HCG?',
    answer: 'IU stands for international unit, a measure of biological activity rather than mass. WHO International Standards define it, and values depend on the assay: the 5th standard carries 162 IU by bioassay and 179 IU by immunoassay.',
  },
  {
    question: 'Why can HCG preparations differ?',
    answer: 'Source, glycosylation, purity and formulation can all differ between preparations. Recombinant and urine-derived material, for example, differ in their glycan structures.',
  },
  {
    question: 'What sizes of HCG does Veracue offer?',
    answer: 'HCG is offered as 5000 IU and 10000 IU vials for laboratory research use only. Amounts are stated in international units rather than milligrams.',
  },
  {
    question: 'What should researchers check on an HCG COA?',
    answer: 'Check the lot number, the source, potency with its assay, the amount with its unit, the purity method, excipients and identity data. A COA describes one lot and does not guarantee performance in your assay.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means laboratory and scientific research only. Veracue’s site policy states that its products are not intended for human or veterinary use, and this material is not a diagnostic test.',
  },
  {
    question: 'Does Veracue provide usage instructions for HCG?',
    answer: 'No. HCG is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: [],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'HCG',
  variants: VARIANTS.map((v) => ({ strength: v.strength, image: v.image })),
  seoTitle: SEO_TITLE,
  seoDescription: SEO_DESCRIPTION,
  description: DESCRIPTION,
  tabs: { details: productDetails(), research: researchFocus(), quality: qualityPurity(), compliance: compliance() },
  faqs: FAQS,
  forbidNames: [/choriogonadotropin alfa|ovitrelle|pregnyl|novarel/i, /pregnan|placent|fertil|testosterone|ovulat/i],
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
