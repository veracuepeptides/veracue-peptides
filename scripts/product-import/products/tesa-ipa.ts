import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// Tesa/IPA (tesamorelin + ipamorelin). Research-use-only copy: molecular identity of each component,
// receptor context at assay level, two-component COA reading. Facts come from
// docs/product-contents-1/veracue-tesamorelin-ipamorelin-page.json; approval, lipodystrophy, outcome,
// brand-name and usage content is intentionally left out.

const NAME = 'Tesa/IPA'
const SLUG = 'tesa-ipa'

const SKU_CODE = 'TESAIPA'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '6mg/3mg', image: 'VERACUE_Tesa_IPA_6_3mg.jpg' },
  { strength: '13mg/3mg', image: 'VERACUE_Tesa_IPA_13_3mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'Tesa/IPA Research Blend (GHRH + GHS-R1a)'
const SEO_DESCRIPTION =
  "Tesa/IPA is two peptides in one vial, tesamorelin and ipamorelin, so a COA should confirm both. 6/3 and 13/3 mg vials, research use only."
const DESCRIPTION =
  "Tesa/IPA is a two-peptide research blend of tesamorelin, a 44-residue GHRH analog (CAS 218949-48-5, about 5,136 g/mol), and ipamorelin, the pentapeptide Aib-His-D-2-Nal-D-Phe-Lys-NH2 (CAS 170851-70-4, 711.9 g/mol). It is easy to confuse with either single peptide, so a certificate should confirm both. Vials come as 6 mg/3 mg and 13 mg/3 mg, tesamorelin over ipamorelin, and are for laboratory research use only, not for human or veterinary use."

function productDetails(): string {
  return [
    h4('What Is Tesa/IPA?'),
    p('Tesa/IPA is a research blend of two separate peptides, tesamorelin and ipamorelin. Tesamorelin is a 44-residue analog of growth hormone-releasing hormone (GHRH), and ipamorelin is a five-residue peptide studied at the ghrelin receptor. The two are not chemically related, and Veracue supplies the blend for laboratory research only.'),
    p('The vial label reads Tesa/IPA followed by two numbers, such as 6/3 mg. The first number is the tesamorelin content and the second is the ipamorelin content. Each component keeps its own identity, so this page describes them one at a time.'),
    h4('Tesa/IPA at a Glance'),
    kvTable([
      ['Product name', 'Tesa/IPA (tesamorelin + ipamorelin)'],
      ['Components', 'Tesamorelin (TH9507) and ipamorelin'],
      ['Vial sizes', '6 mg/3 mg and 13 mg/3 mg (tesamorelin mg / ipamorelin mg)'],
      ['Tesamorelin identity', 'C221H366N72O67S, about 5,136 g/mol, CAS 218949-48-5'],
      ['Ipamorelin identity', 'C38H49N9O5, 711.9 g/mol, CAS 170851-70-4'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Physical form, vehicle, storage conditions, purity and lot results are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What Tesa/IPA Is Not'),
    ul([
      'Not a single molecule. It is two peptides in one product.',
      'Not the same as tesamorelin alone or ipamorelin alone.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Component Identity'),
    h5('What is tesamorelin?'),
    p('Tesamorelin (research synonym TH9507) is a synthetic 44-residue peptide built on the GHRH(1-44) sequence. It carries an N-terminal trans-3-hexenoyl group on the tyrosine residue, a modification that increases resistance to enzymatic breakdown compared with the unmodified sequence. In assays it is studied as an agonist at the GHRH receptor (GHRHR).'),
    h5('What is ipamorelin?'),
    p('Ipamorelin (research synonym NNC-26-0161) is a synthetic pentapeptide with the sequence Aib-His-D-2-Nal-D-Phe-Lys-NH2 and a C-terminal amide. It is studied as a selective agonist at the ghrelin receptor, also called the growth hormone secretagogue receptor (GHS-R1a). It is not a GHRH-pathway molecule, so it belongs to a different compound class from tesamorelin.'),
    h4('Tesamorelin vs. Ipamorelin at a Glance'),
    table(
      ['Attribute', 'Tesamorelin', 'Ipamorelin'],
      [
        ['Molecular class', '44-residue GHRH(1-44) analog with N-terminal hexenoyl group', '5-residue pentapeptide'],
        ['Sequence', 'Full residue order in the PubChem record (CID 16137828)', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2'],
        ['Molecular formula', 'C221H366N72O67S', 'C38H49N9O5'],
        ['Molecular weight', 'About 5,136 g/mol', 'About 711.9 g/mol'],
        ['CAS number', '218949-48-5', '170851-70-4'],
        ['PubChem CID', '16137828', '9831659'],
        ['Receptor studied', 'GHRH receptor (GHRHR)', 'Ghrelin / GHS-R1a'],
        ['Synonym', 'TH9507', 'NNC-26-0161'],
      ],
    ),
    p('The table compares identity only. It does not rank the two peptides, and neither is a variant of the other.'),

    h4('Research Context'),
    h5('How are the two receptor systems described?'),
    p('Tesamorelin research centers on GHRH-receptor signaling, and ipamorelin research centers on the separate ghrelin-receptor pathway. Because these are different receptors with different signaling routes, findings about one peptide do not automatically describe the other.'),
    h5('Does evidence for one component describe the blend?'),
    p('No. A result obtained with tesamorelin alone says nothing on its own about the pair, and the same is true for ipamorelin. The reference material for this blend is molecular identity and receptor-level description for each component, and nothing on this page describes a combined effect.'),
    h5('What do the names Tesa/IPA, tesa ipa blend and tesamorelin and ipamorelin mean?'),
    p('They all point to the same two peptides. Tesa/IPA is the shorthand printed on the Veracue vial, and the other spellings are common search phrasing. None of the names states a ratio, so the per-vial milligram figures on the label are the part to rely on. Listings that write “tesamorelin+pamorelin” contain a typing error and mean ipamorelin.'),
    h5('What can and cannot this page tell me?'),
    p('This page reports molecular reference information and general research context. It cannot establish what is in a particular vial. Veracue does not provide dosing, administration or usage guidance of any kind.'),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('How to Read a Tesa/IPA Certificate of Analysis'),
    p('A blend certificate has more to check than a single-peptide one. It should confirm the identity of both tesamorelin and ipamorelin in the same lot, not just one of them. A certificate that covers only one component says nothing about the presence or purity of the other.'),
    table(
      ['COA item', 'What it helps establish'],
      [
        ['Lot number', 'Which production run the results describe. It should match the vial label.'],
        ['Identity of tesamorelin', 'Whether the measured mass fits the tesamorelin reference mass of about 5,136 g/mol.'],
        ['Identity of ipamorelin', 'Whether the measured mass fits the ipamorelin reference mass of about 711.9 g/mol.'],
        ['Purity and method', 'The chromatographic purity value and the method behind it, ideally stated for each peptide.'],
        ['Quantity of each peptide', 'The milligrams of tesamorelin and ipamorelin, so they can be compared with the label, for example 6 mg/3 mg.'],
        ['Testing laboratory and test date', 'Who ran the analysis and how recent it is.'],
        ['Formulation covered', 'Whether the report describes this blend, not a generic single-peptide sheet.'],
      ],
    ),
    p('Certificates vary between laboratories, so treat this as what a COA may include rather than a fixed checklist. Veracue confirms a field only when the lot certificate reports it, and the certificate page explains how to request lot documentation.', { links: CERT }),

    h4('Chromatography and Mass Spectrometry for a Two-Peptide Product'),
    p('HPLC helps assess chromatographic purity, and mass spectrometry helps assess molecular identity and mass. Neither one alone establishes every aspect of material quality. In a blend, the chromatogram should show a separate peak for each peptide, and the mass result should match each expected mass separately.'),
    table(
      ['Component', 'Reference mass', 'Formula'],
      [
        ['Tesamorelin', 'About 5,136 g/mol', 'C221H366N72O67S'],
        ['Ipamorelin', 'About 711.9 g/mol', 'C38H49N9O5'],
      ],
    ),
    p('The two masses sit far apart, roughly 5,136 against 712, so their signals should not be confused. An overall purity percentage can also hide a shortfall in one component, which is why a value for each peptide is more informative than a single blended figure. Observed m/z values depend on charge state and adduct conditions, so read them against the method reported with the spectrum.'),

    h4('Verification Questions, Answered'),
    h5('How do I confirm that the vial contains both peptides?'),
    p('Match each component to its identifiers: tesamorelin at C221H366N72O67S with CAS 218949-48-5, and ipamorelin at C38H49N9O5 with CAS 170851-70-4. Those identifiers describe the molecules, not a vial. Confirming a lot takes analytical data tied to that lot number, with an identity result for each peptide and a quantity for each.'),
    h5('What does purity mean for a two-peptide product?'),
    p('Purity describes how much of the detected material, by a stated method, is the intended compound and not an impurity. For a blend it is most useful when reported for each peptide separately.'),
    h5('What if a field is not on the certificate?'),
    p('Then it is not confirmed. Physical form, storage conditions and other formulation details are reported on each lot’s documentation, and you can ask for anything missing through the contact page.', { links: CONTACT }),

    h4('Need lot documentation for Tesa/IPA?'),
    p('Ask the Veracue team about available documentation for a specific lot, or review the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li><li><a href="/faq">Read the FAQ</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('Tesa/IPA is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, cosmetic, supplement or food, and it is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration. It has not been evaluated by the FDA. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is Tesa/IPA?',
    answer: 'Tesa/IPA is a blend of two separate peptides, tesamorelin and ipamorelin, supplied by Veracue for laboratory research only. It is not a single molecule.',
  },
  {
    question: 'What does 6/3 mg on the vial mean?',
    answer: 'The first number is the tesamorelin content and the second is the ipamorelin content, so 6/3 mg means 6 mg of tesamorelin and 3 mg of ipamorelin. The larger vial, 13/3 mg, carries 13 mg of tesamorelin and 3 mg of ipamorelin.',
  },
  {
    question: 'What is tesamorelin?',
    answer: 'Tesamorelin (TH9507) is a synthetic 44-residue analog of the GHRH(1-44) sequence with an N-terminal trans-3-hexenoyl group on tyrosine. It is studied as a GHRH-receptor agonist.',
  },
  {
    question: 'What is ipamorelin?',
    answer: 'Ipamorelin is a synthetic pentapeptide, Aib-His-D-2-Nal-D-Phe-Lys-NH2, studied as a selective agonist of the ghrelin receptor (GHS-R1a). Its research synonym is NNC-26-0161.',
  },
  {
    question: 'What are the formulas and weights of the two components?',
    answer: 'Tesamorelin is C221H366N72O67S at about 5,136 g/mol (CAS 218949-48-5). Ipamorelin is C38H49N9O5 at 711.9 g/mol (CAS 170851-70-4).',
  },
  {
    question: 'What is the difference between tesamorelin and ipamorelin?',
    answer: 'They differ in size, sequence and receptor. Tesamorelin is a 44-residue peptide studied at GHRHR, while ipamorelin is a five-residue peptide studied at GHS-R1a.',
  },
  {
    question: 'Is a tesa ipa blend one compound?',
    answer: 'No. The name refers to two peptides in one product, and it does not state a ratio. The per-vial milligram figures on the label are what describe the content.',
  },
  {
    question: 'What should a Tesa/IPA COA include?',
    answer: 'It should confirm the identity of both peptides in the lot, report a quantity and purity method for each, and show the lot number, testing laboratory and test date. The lot number should match the vial.',
  },
  {
    question: 'Why does a blend COA need two identity checks?',
    answer: 'Because each peptide has its own expected mass, and a result for one says nothing about the other. Tesamorelin sits near 5,136 g/mol and ipamorelin near 711.9 g/mol.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer: 'It means the material is supplied for laboratory research, not for human or veterinary use, and it has not been evaluated by the FDA.',
  },
  {
    question: 'Does Veracue provide usage instructions for Tesa/IPA?',
    answer: 'No. Tesa/IPA is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['growth-hormone-secretagogues'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'Tesa/IPA',
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
