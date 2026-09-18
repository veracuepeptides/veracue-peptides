import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMG_DIR = path.resolve(__dirname, '../public/veracue-images')

function loadImage(filename: string) {
  const filePath = path.join(IMG_DIR, filename)
  const data = fs.readFileSync(filePath)
  const ext = path.extname(filename).slice(1)
  const mimetype = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`
  return { data, mimetype, name: filename, size: data.length }
}

const PRODUCT_DETAILS_HTML = `
<h4>What Is Selank?</h4>
<p>Selank is a synthetic peptide studied in laboratory research, classified structurally as a heptapeptide, a chain of seven amino acid residues. Its published sequence is Thr-Lys-Pro-Arg-Pro-Gly-Pro, with an approximate molecular weight of 751 g/mol. It is described in chemical reference literature as a structural analog of tuftsin, a shorter, naturally occurring peptide.</p>
<p>That sequence and molecular weight are properties of the Selank molecule itself and can be independently verified through standard analytical chemistry, regardless of which laboratory or supplier a given sample originates from. What that identity does not establish is anything about a specific vial. Purity, testing history, and documentation are properties of an individual research material, not properties of the molecule's published structure.</p>

<h4>Product Snapshot</h4>
<table>
  <tbody>
    <tr><td>Product</td><td>Selank</td></tr>
    <tr><td>Amount</td><td>Available in 5mg and 10mg research vials</td></tr>
    <tr><td>Form</td><td>Lyophilized powder</td></tr>
    <tr><td>Purity</td><td>Pending lot-specific testing for this listing</td></tr>
    <tr><td>Identity Testing</td><td>Pending lot-specific testing for this listing</td></tr>
    <tr><td>Certificate of Analysis</td><td>Not yet published for this listing</td></tr>
    <tr><td>Research Designation</td><td>Research Use Only</td></tr>
  </tbody>
</table>

<h4>Product Highlights</h4>
<ul>
  <li>Synthetic heptapeptide, structurally classified as a tuftsin analog</li>
  <li>Published sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro, approximate molecular weight 751 g/mol</li>
  <li>Supplied as a lyophilized research powder in 5mg and 10mg vials</li>
  <li>Labelled for laboratory research use only, not for human or veterinary use</li>
</ul>
`.trim()

const RESEARCH_FOCUS_HTML = `
<table>
  <tbody>
    <tr><td>Compound</td><td>Selank (synthetic heptapeptide)</td></tr>
    <tr><td>Sequence</td><td>Thr-Lys-Pro-Arg-Pro-Gly-Pro</td></tr>
    <tr><td>Approx. molecular weight</td><td>~751 g/mol</td></tr>
    <tr><td>Structural classification</td><td>Tuftsin analog</td></tr>
    <tr><td>Research designation</td><td>Research Use Only</td></tr>
  </tbody>
</table>

<h4>What Researchers Study About Selank</h4>
<p>Selank's published research profile spans a few connected areas of laboratory investigation. Receptor-level work has characterized it as a modulator of GABA-A receptor binding in radioligand-based experiments. Neurobiological signaling studies have examined enkephalin-degrading enzyme activity and hippocampal BDNF expression in animal models. Broader peptide-signaling research has also looked at its structural relationship with tuftsin.</p>
<p>These are research areas, not outcomes. A finding that a molecule interacts with a receptor in an isolated binding assay, or produces a measurable change in an animal model, describes that specific experimental system. It does not describe what happens in a human being, and it does not describe the properties of any particular research vial sold under the Selank name. This page uses precise language for that reason: research has investigated, studies have examined, findings have been reported in specific experimental models. It does not say that Selank does something for a person.</p>

<h4>Evidence Boundaries</h4>
<p>Published literature exists on Selank, spanning cell-based, animal, and observational research contexts, but findings generated under those specific research conditions should not be interpreted as evidence that a commercial research material is suitable for, or intended for, human use. This page does not attempt to summarize that literature comprehensively or present it as a case for any outcome. Researchers working with the primary literature should evaluate study design, species, and methodology directly rather than relying on a supplier's summary of it. Veracue's own documentation for a specific Selank lot, meaning purity and identity testing, is a separate matter from that published literature, addressed later on this page.</p>

<h4>Molecular Identity vs. Product-Specific Verification</h4>
<p>It's worth separating two questions that are easy to conflate. The first is: what is Selank, structurally? That question has a stable, published answer: a heptapeptide with a defined sequence and molecular weight, independent of supplier. The second is: has this specific Veracue research material been tested and confirmed to match that structure, at a stated purity? That question can only be answered by lot-specific analytical documentation, and it has not yet been established for this listing. A well-documented molecule does not make a specific vial self-verifying. The chemistry describes the target, and the testing describes the sample.</p>

<h4>Analytical Characterization: HPLC and Mass Spectrometry</h4>
<p>Two analytical methods do most of the work in characterizing a research peptide, and they answer different questions. High-performance liquid chromatography (HPLC), typically run in reverse-phase mode for peptides, characterizes chromatographic purity: the proportion of material in a sample that resolves as a single, well-defined peak, distinct from impurities or incomplete synthesis byproducts. It's usually reported as a percentage of peak area.</p>
<p>Mass spectrometry (commonly ESI-MS or MALDI-TOF for peptides) is used separately to evaluate whether the measured molecular mass of the sample is consistent with the intended peptide's theoretical mass, for Selank approximately 751 g/mol, typically within a stated tolerance. Neither test substitutes for the other. An HPLC result describes cleanliness, not identity. A mass spectrometry result describes identity, not necessarily overall sample purity. Complete analytical characterization for a given lot reports both. Veracue's confirmed, site-wide standard for its published products applies a minimum 99.0% HPLC threshold and mass spectrometry confirmation within roughly 0.5 Da of theoretical mass, using named third-party laboratories. That describes Veracue's general testing approach, not a stated Selank-specific result.</p>

<table>
  <thead>
    <tr><th>COA element</th><th>What it tells you</th></tr>
  </thead>
  <tbody>
    <tr><td>Lot/batch number</td><td>Which specific manufacturing run the result applies to</td></tr>
    <tr><td>HPLC result</td><td>Chromatographic purity, the proportion resolving as a single clean peak</td></tr>
    <tr><td>Mass spectrometry result</td><td>Whether measured mass is consistent with Selank's theoretical mass (~751 g/mol)</td></tr>
    <tr><td>Testing lab and date</td><td>Who performed the test and how current it is</td></tr>
  </tbody>
</table>
`.trim()

const QUALITY_PURITY_HTML = `
<h4>How to Evaluate a Selank Certificate of Analysis</h4>
<p>A certificate of analysis documents one specific manufacturing lot. It is not a general statement about the compound Selank, and it should not be treated as valid for a different lot than the one it names. When reviewing any Selank COA, the fields worth checking are the product name and lot number matched against the number on the physical vial, the test date and testing laboratory, the specification the sample was tested against referencing Selank's known sequence and molecular weight, the reported HPLC result against that specification, and the reported mass spectrometry result including stated tolerance. A document that doesn't tie these results to a specific, matching lot number provides materially weaker assurance than one that does, even when the printed figures look identical.</p>

<h4>Documented vs. Not Yet Verified for This Listing</h4>
<table>
  <thead>
    <tr><th>Documented (general chemistry)</th><th>Not yet verified (this listing)</th></tr>
  </thead>
  <tbody>
    <tr><td>Selank's amino acid sequence and molecular weight</td><td>Purity and identity test results for this lot</td></tr>
    <tr><td>General classification as a tuftsin-structural-analog peptide</td><td>Lot number, testing lab, and test date</td></tr>
    <tr><td>Veracue's site-wide HPLC/MS testing standard</td><td>Whether this specific lot has been tested to it</td></tr>
    <tr><td>Research Use Only designation</td><td>Certificate of Analysis link</td></tr>
  </tbody>
</table>

<h4>Research Peptide Evaluation Checklist</h4>
<table>
  <thead>
    <tr><th>Item</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Exact product identity and labeled amount</td><td>Check against listing</td></tr>
    <tr><td>Lot-specific COA (not generic)</td><td>Pending</td></tr>
    <tr><td>HPLC result</td><td>Pending</td></tr>
    <tr><td>Mass spectrometry identity result</td><td>Pending</td></tr>
    <tr><td>Storage/handling conditions stated</td><td>Pending</td></tr>
    <tr><td>Explicit Research Use Only designation</td><td>Confirmed, site-wide</td></tr>
  </tbody>
</table>

<h4>How to Evaluate a Research Peptide Supplier</h4>
<p>A few checks apply regardless of which peptide is being reviewed. Confirm the COA is tied to a specific, matching lot number rather than a generic certificate reused across batches. Confirm both an HPLC purity result and a separate mass spectrometry identity result are reported, since purity and identity are independent measurements and a sample can be highly pure while still being the wrong molecule. Confirm testing was performed by a named, independent third-party laboratory rather than an in-house or unnamed source. Confirm product-specific storage guidance is stated rather than assumed from a different product. Veracue publishes a stated site-wide testing standard covering its confirmed catalog; whether this Selank listing has been tested to that standard is noted above as pending.</p>

<h4>Storage &amp; Handling</h4>
<p>Store according to the conditions stated on this lot's documentation and label. Handle as a laboratory chemical using appropriate personal protective equipment.</p>
`.trim()

const COMPLIANCE_NOTICE_HTML = `
<p>Research Use Only. Selank is intended exclusively for laboratory research, scientific investigation, and analytical characterization. It is not intended for human or veterinary use, ingestion, injection, or any form of administration, and it has not been evaluated by the FDA for safety or efficacy.</p>
<p>Searches referencing dosage, administration, or personal use of Selank are common, and it's worth addressing that directly rather than ignoring it. As a Research Use Only product, Veracue does not provide human dosing, administration, or usage guidance of any kind. Researchers determine experimental concentrations and protocols through their own validated study design, not through supplier-provided instructions. This page focuses exclusively on molecular identity, published research context, and analytical documentation.</p>
`.trim()

const FAQS = [
  {
    question: 'What is Selank?',
    answer:
      'Selank is a synthetic peptide studied in laboratory research, classified as a heptapeptide with the sequence Thr-Lys-Pro-Arg-Pro-Gly-Pro.',
  },
  {
    question: 'What is the molecular identity of Selank?',
    answer:
      'A heptapeptide with an approximate molecular weight of 751 g/mol, structurally classified as an analog of tuftsin.',
  },
  {
    question: 'What is the Selank peptide sequence?',
    answer: 'Thr-Lys-Pro-Arg-Pro-Gly-Pro.',
  },
  {
    question: 'What is Selank studied for in laboratory research?',
    answer:
      'Published research has examined Selank in relation to GABA-A receptor binding, enkephalin-degrading enzyme activity, and BDNF expression, primarily in cell-based and animal research models. This describes research areas, not outcomes.',
  },
  {
    question: 'How do researchers verify Selank identity?',
    answer:
      "Through mass spectrometry, comparing a sample's measured molecular mass against Selank's known theoretical mass, ideally tied to a specific lot number.",
  },
  {
    question: 'What does HPLC tell you about Selank?',
    answer:
      'It characterizes chromatographic purity, the proportion of a sample resolving as a single, clean peak distinct from impurities.',
  },
  {
    question: 'What does mass spectrometry tell you?',
    answer:
      "It evaluates whether a sample's measured molecular mass is consistent with Selank's theoretical mass, which is a separate question from purity.",
  },
  {
    question: 'What is a Selank Certificate of Analysis?',
    answer:
      'A certificate of analysis documenting the testing results, HPLC and mass spectrometry, for one specific manufacturing lot.',
  },
  {
    question: 'Why does lot-specific testing matter?',
    answer:
      "Because a certificate tied to a different lot than the one physically received doesn't confirm the material in hand. Matching lot numbers is what makes a COA meaningful.",
  },
  {
    question: 'What is the difference between peptide purity and identity?',
    answer:
      'Purity describes how clean a sample is relative to impurities. Identity confirms the sample is actually the intended molecule. A complete analytical picture reports both.',
  },
  {
    question: 'Does Veracue provide a Selank Certificate of Analysis?',
    answer:
      'Not yet. A lot-specific certificate for this listing has not been published. Contact Veracue directly for the current documentation status.',
  },
  {
    question: 'What does Research Use Only mean?',
    answer:
      'It means the material is intended strictly for laboratory research, scientific investigation, and analytical characterization, not for human or veterinary use, and it has not been evaluated by the FDA for safety or efficacy.',
  },
  {
    question: 'Can Selank research findings be treated as evidence for a commercial research product?',
    answer:
      "No. Published findings describe results under specific experimental conditions. They do not confirm the identity, purity, or documentation status of any individual commercial material, including Veracue's.",
  },
  {
    question: 'How should researchers evaluate a Selank supplier?',
    answer:
      'By reviewing lot-specific COA documentation, confirming both HPLC and mass spectrometry results, checking stated storage conditions, and confirming a consistent, named third-party testing standard.',
  },
  {
    question: 'How should a Selank research material be documented?',
    answer:
      "With a lot number matching the physical vial, a dated COA from a named testing laboratory, and reported HPLC and mass spectrometry results referencing Selank's known specification.",
  },
  {
    question: 'Does Veracue provide dosing or usage guidance for Selank?',
    answer:
      'No. As a Research Use Only product, Veracue does not provide human dosing, administration, or usage guidance of any kind. Researchers determine experimental parameters through their own validated study design.',
  },
  {
    question: "What's the difference between the 5mg and 10mg vials?",
    answer:
      'They contain the same lyophilized Selank powder at different total quantities per vial, allowing researchers to select a vial size that matches the scale of their protocol.',
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  const slug = 'selank'
  const existing = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log(`Product with slug "${slug}" already exists (id ${existing.docs[0].id}). Aborting to avoid duplicating.`)
    process.exit(0)
  }

  const categories = await payload.find({ collection: 'categories', limit: 20 })
  const cognitive = categories.docs.find((c: any) => c.slug === 'cognitive-neuro-protection')
  const categoryIds = [cognitive?.id].filter(Boolean)

  // No Selank-specific photography exists anywhere in the codebase (confirmed in the source
  // brief). Reuse already-uploaded NAD+ vial photography purely as neutral placeholder imagery
  // (no lifestyle/administration framing) rather than uploading anything new, and reuse GHK-Cu
  // photography as a second fallback if those aren't found either.
  async function findExistingMedia(filename: string) {
    const res = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
    return res.docs[0] || null
  }
  async function createMedia(filename: string, alt: string) {
    const file = loadImage(filename)
    return payload.create({ collection: 'media', data: { alt }, file })
  }

  console.log('Resolving placeholder product images...')

  let main5 = await findExistingMedia('veracue-nad-plus-10mg-studio.webp')
  let main10 = await findExistingMedia('veracue-nad-plus-50mg-water-caustics.webp')
  let variant5Img = await findExistingMedia('veracue-nad-plus-500mg-pedestal-white.webp')
  let variant10Img = await findExistingMedia('veracue-nad-plus-500mg-sunlight-branches.webp')

  if (!main5) main5 = await createMedia('veracue-ghk-cu-50mg-ice-bed-white.webp', 'Veracue Selank 5mg research vial (placeholder photography, no Selank-specific photo exists yet)')
  if (!main10) main10 = await createMedia('veracue-ghk-cu-30mg-studio-shadow.webp', 'Veracue Selank 10mg research vial (placeholder photography, no Selank-specific photo exists yet)')
  if (!variant5Img) variant5Img = main5
  if (!variant10Img) variant10Img = main10

  console.log('Creating product...')

  const product = await payload.create({
    collection: 'products',
    data: {
      name: 'Selank',
      description:
        'Veracue Selank is a Research Use Only synthetic peptide intended for laboratory research. This page provides information about Selank\'s documented molecular identity and the analytical information researchers should review when evaluating a specific research material.',
      images: [{ image: main5!.id }, { image: main10!.id }],
      seoTitle: 'Selank Peptide | Research Use Only | Veracue',
      seoDescription:
        'Veracue Selank research peptide: molecular identity, analytical characterization (HPLC/MS), and COA documentation. Strictly Research Use Only, for laboratory and analytical use only.',
      slug,
      price: 39,
      salePrice: 34,
      stock: 180,
      weight: 0.05,
      dimensions: { length: 5, width: 5, height: 8 },
      categories: categoryIds,
      hasVariants: true,
      variants: [
        {
          sku: 'SELANK-5MG',
          isKit: false,
          images: [{ image: variant5Img!.id }],
          price: 39,
          salePrice: 34,
          stock: 180,
          options: [{ key: 'Strength', value: '5mg' }],
        },
        {
          sku: 'SELANK-10MG',
          isKit: false,
          images: [{ image: variant10Img!.id }],
          price: 69,
          salePrice: 59,
          stock: 130,
          options: [{ key: 'Strength', value: '10mg' }],
        },
      ],
      productDetailsTitle: 'Product Details',
      productDetailsDescription: PRODUCT_DETAILS_HTML,
      researchFocusTitle: 'Research Focus & Mechanism Overview',
      researchFocusDescription: RESEARCH_FOCUS_HTML,
      qualityPurityTitle: 'Quality & Purity Standards',
      qualityPurityDescription: QUALITY_PURITY_HTML,
      complianceNoticeTitle: 'Compliance Notice',
      complianceNoticeDescription: COMPLIANCE_NOTICE_HTML,
      faqs: FAQS,
      status: 'active',
      isVisible: true,
      isBestSeller: false,
    },
  })

  console.log(`\nCreated product "${product.name}" (id ${product.id}, slug /${product.slug})`)
  console.log('NOTE: price ($39/5mg, $69/10mg), SKUs, stock, vial sizes, and category are placeholder values chosen for testing, not real Veracue data. No purity %, batch number, lab name, or COA link were fabricated anywhere in the copy, per the source brief\'s explicit compliance requirement. The source document also asked for noindex until real data is confirmed; there is currently no robots/noindex field or logic anywhere in this codebase (generateMetadata hardcodes robots: undefined for every product), so this page is fully indexable like any other active product until that gap is addressed in code.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
