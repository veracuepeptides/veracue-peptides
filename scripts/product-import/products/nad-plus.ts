import { runProduct, h4, h5, p, ul, kvTable, table } from '../lib'

// NAD+ (nicotinamide adenine dinucleotide). A dinucleotide coenzyme, not a peptide. Research-use-only copy:
// molecular identity, related-compound separation, assay-level biochemistry, analytical documentation.
// Facts come from docs/product-contents-1/veracue-nad-plus-product-page-deliverable.json; human study content,
// regulatory framing, ageing and wellness framing, prices and unverified specs are intentionally left out.

const NAME = 'NAD+'
const SLUG = 'nad-plus'

const SKU_CODE = 'NADPLUS'
const WEIGHT_KG = 0.05
const VARIANTS = [
  { strength: '500mg', image: 'VERACUE_NAD_Plus_500mg.jpg' },
  { strength: '1000mg', image: 'VERACUE_NAD_Plus_1000mg.jpg' },
]

const CONTACT = [{ phrase: 'contact page', href: '/contact-us' }]
const CERT = [{ phrase: 'certificate page', href: '/certificates' }]

const SEO_TITLE = 'NAD+ Research Compound (CAS 53-84-9)'
const SEO_DESCRIPTION =
  "NAD+ is a coenzyme, not a peptide (CAS 53-84-9). See how it differs from NADH and NMN. 500 and 1000 mg vials, research use only."
const DESCRIPTION =
  "NAD+ is oxidized nicotinamide adenine dinucleotide, a dinucleotide coenzyme rather than a peptide (CAS 53-84-9, PubChem CID 5892). It is written C21H28N7O14P2 as the cation or C21H27N7O14P2 as the neutral inner salt, which is why two molecular weights circulate for the same compound. Its reduced partner NADH and the precursor NMN are separate compounds, so identity checks matter. Vials come in 500 mg and 1000 mg for laboratory research use only."
function productDetails(): string {
  return [
    h4('What Is NAD+?'),
    p('NAD+ is nicotinamide adenine dinucleotide in its oxidized form, a coenzyme that acts as a redox cofactor in cellular biochemistry. It is a dinucleotide, not a peptide. Veracue supplies it as a research compound under CAS 53-84-9 for laboratory use only.'),
    p('NAD+ is built from two nucleotides, one carrying nicotinamide and one carrying adenine, joined through a ribose-phosphate-phosphate-ribose bridge. Peptides are chains of amino acids linked by peptide bonds, and NAD+ contains neither. That matters for testing, because sequence confirmation, truncation analysis and amino acid analysis are peptide tools. For NAD+ the useful questions are anomeric configuration, redox state, water content and chromatographic purity under a stated method.'),
    h4('NAD+ at a Glance'),
    kvTable([
      ['Product name', 'NAD+ (nicotinamide adenine dinucleotide)'],
      ['Scientific name', 'beta-Nicotinamide adenine dinucleotide'],
      ['USAN/INN', 'Nadide'],
      ['Other names', 'Coenzyme I, Cozymase, DPN, beta-NAD'],
      ['CAS Registry Number', '53-84-9'],
      ['PubChem CID', '5892'],
      ['ChEBI', 'CHEBI:15846'],
      ['KEGG', 'C00003'],
      ['Formula (cation)', 'C21H28N7O14P2+'],
      ['Formula (zwitterion)', 'C21H27N7O14P2'],
      ['Average molecular weight', '664.44 (cation) / 663.43 (zwitterion)'],
      ['Oxidation state', 'Oxidized'],
      ['Classification', 'Dinucleotide coenzyme'],
      ['Research designation', 'Research Use Only'],
    ]),
    p('Identifiers and formulas are from the PubChem record and related public databases and describe the reference structure. They are not a statement about the form Veracue supplies. Salt form, hydrate form, water content, physical form, purity, lot results and storage conditions are reported on each lot’s documentation and can be requested through the contact page.', { links: CONTACT }),
    h4('What NAD+ Is Not'),
    ul([
      'Not a peptide. It has no amino acids and no peptide bonds.',
      'Not the same as NADH, NADP+, NADPH, NMN, NR or nicotinamide, which are related but distinct compounds.',
      'Not a consumer or dietary product.',
      'Not intended for human or veterinary use.',
    ]),
  ].join('\n')
}

function researchFocus(): string {
  return [
    h4('Molecular Identity'),
    h5('Which NAD+ formula and molecular weight should I use?'),
    p('It depends on how the molecule is written. The plus sign in NAD+ refers to the positive charge on the nicotinamide ring nitrogen. Written strictly as that cation, the formula is C21H28N7O14P2+ with an average mass of 664.44. Most chemical databases, including PubChem CID 5892, publish the neutral inner-salt form instead, where a phosphate oxygen carries the balancing negative charge. That form is C21H27N7O14P2 at 663.43.'),
    p('It is the same substance with the same CAS number, one proton apart in bookkeeping. There is a second, larger correction that matters more in practice. Published molecular weights are anhydrous values. If beta-NAD is supplied as a hydrate, water can be a meaningful fraction of what is in the vial, and salt forms shift the number again. For an accurate molar concentration, work from the water content and form reported on the lot documentation rather than a database value.'),
    h5('How does NAD+ differ from related compounds?'),
    p('Four related molecules get confused with NAD+ often, and confusing them can move evidence from one compound to another where it does not belong. Results generated with a precursor are not results for NAD+.'),
    table(
      ['Entity', 'What it is', 'Relationship to NAD+', 'Formula and average mass'],
      [
        ['NAD+', 'Oxidized nicotinamide adenine dinucleotide', 'The reference entity', 'C21H28N7O14P2+, 664.44'],
        ['NADH', 'The reduced form of the same coenzyme', 'Redox partner. Same molecule, different electron state', 'C21H29N7O14P2, 665.4'],
        ['NADP+', 'A phosphorylated cofactor', 'A separate cofactor system. Not interchangeable', 'C21H28N7O17P3+, 744.4'],
        ['NADPH', 'The reduced form of NADP+', 'Distinct from NADH in its metabolic role', 'C21H30N7O17P3, 745.4'],
        ['Nicotinamide (NAM)', 'A B3-related metabolite', 'Released when NAD+ is consumed, and fed back through salvage', 'C6H6N2O, 122.12'],
        ['NR', 'Nicotinamide riboside', 'An upstream precursor, converted toward NMN', 'C11H15N2O5+, 255.25 (free base)'],
        ['NMN', 'Nicotinamide mononucleotide', 'The immediate precursor, converted to NAD+ by NMNAT', 'C11H15N2O8P, 334.22'],
      ],
    ),
    p('NR is usually sold as the chloride salt, which has a different mass of 290.70. Sodium salt forms of NAD+ also carry a different mass again, so the form always has to come from the lot documentation.'),

    h4('Mechanism and Laboratory Context'),
    h5('What does NAD+ do in biochemical systems?'),
    p('Two roles, and they lead to different research questions. First, NAD+ is a redox cofactor. It accepts a hydride to become NADH, and NADH donates electrons downstream. That NAD+/NADH couple runs through glycolysis, the TCA cycle and oxidative phosphorylation, which is why NAD+ appears in so many bioenergetics protocols.'),
    p('Second, NAD+ is a consumed co-substrate. Sirtuins, PARPs and the NADases CD38 and CD157 cleave NAD+ rather than cycling it. Each of these reactions releases nicotinamide, which feeds back into the salvage pathway.'),
    h5('How is NAD+ made in cells?'),
    p('Cells rebuild NAD+ through three routes. The de novo route starts from tryptophan through the kynurenine pathway. The Preiss-Handler route starts from nicotinic acid. The salvage pathway converts nicotinamide to NMN through NAMPT, then NMN to NAD+ through NMNAT.'),
    p('None of this is a claim about what happens when NAD+ is applied to a living system. Biochemical centrality is not an outcome, and compartmentalization means a change in one pool does not imply a change in another.'),

    h4('Where NAD+ Is Used in Research'),
    p('NAD+ appears as a reagent, a substrate or a measured analyte across several fields. These are research contexts and not statements about any result from using this material.'),
    ul([
      'Enzyme kinetics. As the cofactor in dehydrogenase assays, where NADH formation is tracked spectrophotometrically.',
      'Redox biology. NAD+/NADH ratio measurement in cells, tissues and isolated mitochondria.',
      'Sirtuin assays. As the obligate co-substrate in deacetylation assays.',
      'PARP assays. Following NAD+ consumption when the enzyme is activated in vitro.',
      'CD38 and NADase work. As substrate for cyclase and hydrolase activity assays.',
      'Metabolomics. As an analytical standard for NAD-pathway metabolite panels.',
      'Comparative pathway studies. Alongside NMN, NR and nicotinamide, where the difference between compounds is the point of the experiment.',
    ]),
  ].join('\n')
}

function qualityPurity(): string {
  return [
    h4('What Each NAD+ Test Actually Shows'),
    p('A percentage on its own does not tell a researcher much, because different methods measure different things and each one leaves a specific blind spot.'),
    table(
      ['Method', 'What it establishes', 'What it does not establish'],
      [
        ['RP-HPLC with UV detection, reported as area %', 'Chromatographic purity under one stated column, mobile phase and detection wavelength', 'Molecular identity. Anything that does not elute or does not absorb. Water content. Salt form'],
        ['LC-MS', 'A measured mass consistent with the expected molecule', 'Purity. Anything mass-identical, including isomers'],
        ['LC-MS/MS', 'Accurate mass plus fragmentation consistent with the expected structure', 'Absolute purity. Anomeric configuration, since alpha-NAD and beta-NAD share a mass'],
        ['UV scan, A260 and A340', 'Redox state. NADH absorbs strongly near 340 nm, NAD+ effectively does not', 'Purity against impurities that do not absorb in that region'],
        ['Enzymatic assay tracking change in A340', 'Functional NAD+ content, using the NADH extinction coefficient of roughly 6.2 to 6.3 x 10^3 L per mol per cm', 'The identity of whatever is not NAD+'],
        ['Karl Fischer titration', 'Water content, which converts an as-supplied figure to an anhydrous-basis figure', 'Chemical purity'],
        ['Endotoxin (LAL)', 'Endotoxin level', 'Sterility, identity or purity'],
      ],
    ),
    h5('Are chromatographic purity and content the same number?'),
    p('No. An HPLC area percentage says what fraction of the detected peak area belongs to the main peak. An assay value says how much NAD+ is present per unit mass. A hydrated material can show excellent chromatographic purity and still contain less anhydrous NAD+ per milligram than the label weight implies.'),
    h5('Can mass spectrometry tell the alpha and beta anomers apart?'),
    p('No. Beta-NAD is the biologically active configuration, and the alpha-anomer is an isomer with an identical molecular mass. Chromatographic resolution or an enzymatic assay is what settles that question.'),
    h5('Why does redox state need its own check?'),
    p('NAD+ and NADH differ by two mass units and behave very differently in the UV. A UV scan is the simple way to show that material is in the oxidized state.'),

    h4('How to Read a NAD+ Certificate of Analysis'),
    p('Certificates vary between laboratories and testing programs, so treat this as what a COA may include rather than a fixed checklist. A number without a method behind it is not verification.'),
    ul([
      'Product name stated as NAD+ or beta-nicotinamide adenine dinucleotide, with CAS 53-84-9',
      'The specific form, meaning free acid, salt or hydrate, since this changes the molar math',
      'A lot or batch number that matches the label on the vial in hand',
      'Test date and the issuing laboratory',
      'Purity result with the method named, not just a number',
      'Assay or content result, stated on an anhydrous basis where relevant',
      'Water content, if the material is hydrated',
      'Identity confirmation method',
      'Specification limits, so the result can be read against a standard rather than in isolation',
    ]),
    p('Any field above depends on the lot’s own documentation, and Veracue confirms a field only when the lot certificate reports it. The certificate page explains how to request lot documentation.', { links: CERT }),

    h4('General Handling Properties of NAD+'),
    p('NAD+ is hygroscopic, and its degradation routes are well characterized in the literature. Absorbed water accelerates hydrolysis, heat speeds degradation, stability is best near neutral to slightly acidic pH, and UV or near-UV light can drive photodegradation. Solutions are less stable than the solid. These are general properties of the compound. Storage details for a specific lot belong to that lot’s own documentation, which accounts for its form, water content and packaging.'),

    h4('Need lot documentation for NAD+?'),
    p('Ask the Veracue team about the documentation available for a specific lot, or browse the certificate library.'),
    `<ul><li><a href="/contact-us">Request lot documentation</a></li><li><a href="/certificates">View certificates</a></li><li><a href="/shop">Browse the research catalog</a></li></ul>`,
  ].join('\n')
}

function compliance(): string {
  return [
    h4('Research Use Only Notice'),
    p('NAD+ is supplied for laboratory research, scientific investigation and analytical characterization only. It is not a drug, dietary supplement, cosmetic or food product, and it is not intended for human or veterinary use, or for ingestion, injection, inhalation or any form of administration. This page contains no dosing, administration or usage guidance of any kind. See the Medical Disclaimer and the Terms and Conditions for sitewide policies.', {
      links: [
        { phrase: 'Medical Disclaimer', href: '/medical-disclaimer' },
        { phrase: 'Terms and Conditions', href: '/terms-and-conditions' },
      ],
    }),
  ].join('\n')
}

const FAQS = [
  {
    question: 'What is NAD+?',
    answer: 'NAD+ is nicotinamide adenine dinucleotide in its oxidized form, a coenzyme that works as a redox cofactor and as a consumed co-substrate for sirtuins, PARPs and CD38. Veracue supplies it as a research compound under CAS 53-84-9.',
  },
  {
    question: 'Is NAD+ a peptide?',
    answer: 'No. NAD+ is a dinucleotide coenzyme, built from a nicotinamide nucleotide and an adenine nucleotide joined through a ribose-phosphate bridge. It contains no amino acids and no peptide bonds.',
  },
  {
    question: 'What is the difference between NAD+ and NADH?',
    answer: 'They are the two redox states of the same coenzyme. NAD+ is the oxidized form and accepts a hydride to become NADH, the reduced form. NADH absorbs strongly near 340 nm and NAD+ effectively does not.',
  },
  {
    question: 'Is NAD+ the same as NMN?',
    answer: 'No. NMN, nicotinamide mononucleotide, is the immediate precursor to NAD+ in the salvage pathway, converted by NMNAT. Its formula is C11H15N2O8P at 334.22 g/mol, roughly half the mass of NAD+.',
  },
  {
    question: 'Is NAD+ the same as NR?',
    answer: 'No. NR, nicotinamide riboside, is an upstream precursor converted toward NMN and then to NAD+. Its formula is C11H15N2O5+ at 255.25 g/mol for the free base, and it is usually sold as the chloride salt at 290.70.',
  },
  {
    question: 'What is the difference between NAD+ and NADP+?',
    answer: 'NADP+ is a separate phosphorylated cofactor with the formula C21H28N7O17P3+ at roughly 744.4 g/mol. It carries an extra phosphate group, and the two are not interchangeable, nor are their reduced forms NADPH and NADH.',
  },
  {
    question: 'What is the molecular weight and CAS number of NAD+?',
    answer: 'The CAS number is 53-84-9. As the cation C21H28N7O14P2+ the average molecular weight is 664.44 g/mol, and as the neutral inner-salt form C21H27N7O14P2 published by PubChem CID 5892 it is 663.43 g/mol. Both are anhydrous values.',
  },
  {
    question: 'Why does the molecular weight in my calculation not match the label?',
    answer: 'Usually one of three reasons. The catalog figure is anhydrous and the material is hydrated, the material is a salt form with a different mass, or the cation and zwitterion figures are being mixed. Check the lot documentation for form and water content before calculating molarity.',
  },
  {
    question: 'How is NAD+ tested for identity and purity?',
    answer: 'Typically by reverse-phase HPLC with UV detection for chromatographic purity and by mass spectrometry for identity. A UV scan can confirm redox state, an enzymatic assay tracking absorbance at 340 nm can measure functional NAD+ content, and Karl Fischer titration measures water content.',
  },
  {
    question: 'Does HPLC alone prove the identity of a NAD+ sample?',
    answer: 'No. HPLC reports what fraction of the detected peak area belongs to the main peak under one specific method, and it does not identify the molecule. Even with mass spectrometry added, the alpha and beta anomers cannot be separated, because they share a molecular mass.',
  },
  {
    question: 'What should a NAD+ certificate of analysis contain?',
    answer: 'Product name and CAS, the specific form, a lot number matching the vial, the test date and issuing laboratory, a purity result with the method named, an assay or content result, water content where relevant, identity confirmation and specification limits. A purity figure with no method attached is not verification.',
  },
  {
    question: 'Does Veracue provide usage instructions for NAD+?',
    answer: 'No. NAD+ is offered for laboratory research use only, and Veracue does not provide dosing, administration or usage guidance of any kind.',
  },
]

runProduct({
  name: NAME,
  slug: SLUG,
  categorySlugs: ['mitochondrial-cellular-energy'],
  skuCode: SKU_CODE,
  weightKg: WEIGHT_KG,
  imageLabel: 'NAD+',
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
