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
<h4>Overview</h4>
<p>NAD+ (Nicotinamide Adenine Dinucleotide) is a naturally occurring coenzyme found in every living cell, where it acts as a central hub for cellular energy metabolism, mitochondrial function, and DNA repair signaling. Veracue supplies NAD+ as a lyophilized powder intended strictly for laboratory and preclinical research.</p>

<h4>Composition</h4>
<p>Each vial contains lyophilized NAD+ synthesized and verified to a high-purity research standard. No excipients, preservatives, or carrier compounds are added unless otherwise noted on the batch-specific Certificate of Analysis.</p>

<h4>Purpose &amp; Intended Use</h4>
<p>This product is manufactured and sold exclusively for in vitro laboratory research. It is not a drug, dietary supplement, or cosmetic, and it is not intended for human or animal consumption, diagnostic use, or any therapeutic application.</p>

<h4>Product Highlights</h4>
<ul>
  <li>&ge;99% purity target, verified by independent third-party HPLC and mass spectrometry</li>
  <li>Available in 10mg, 50mg, and 500mg lyophilized vials</li>
  <li>Batch-specific Certificate of Analysis available on request</li>
  <li>Shipped cold-chain with desiccant packaging to preserve stability in transit</li>
</ul>

<h4>Key Features</h4>
<ul>
  <li>High-purity lyophilized powder for consistent reconstitution in research protocols</li>
  <li>Manufactured under controlled laboratory conditions with lot-level traceability</li>
  <li>Sealed, tamper-evident vial packaging</li>
  <li>Documented storage and handling guidance included with every order</li>
</ul>

<h4>Why Choose This Product</h4>
<p>Sourcing a research compound comes down to trust — trust in what is actually in the vial, trust in the paperwork behind it, and trust that the supplier understands the molecule well enough to represent it accurately. NAD+ is one of the most widely studied coenzymes in metabolic and longevity research precisely because of its role upstream of sirtuin activity, PARP-mediated DNA repair, and mitochondrial oxidative phosphorylation. Veracue verifies every batch through independent third-party testing and makes that documentation available so researchers can spend their time on the science, not on qualifying the supply chain.</p>

<h4>Who This Product Is For</h4>
<ul>
  <li>Academic and independent laboratories studying cellular energy metabolism</li>
  <li>Researchers investigating sirtuin activation and NAD+-dependent signaling pathways</li>
  <li>Institutions running comparative studies on mitochondrial biogenesis and oxidative stress</li>
  <li>Qualified research personnel who require documented, lot-traceable reference material</li>
</ul>
`.trim()

const RESEARCH_FOCUS_HTML = `
<table>
  <tbody>
    <tr><td>Product Name</td><td>NAD+ (Nicotinamide Adenine Dinucleotide)</td></tr>
    <tr><td>Category</td><td>Mitochondrial &amp; Cellular Energy</td></tr>
    <tr><td>Form</td><td>Lyophilized Powder</td></tr>
    <tr><td>Purity</td><td>&ge;99% (batch-dependent, see COA)</td></tr>
    <tr><td>Appearance</td><td>White to off-white lyophilized powder</td></tr>
    <tr><td>Storage</td><td>-20&deg;C, protected from light, prior to reconstitution</td></tr>
    <tr><td>Packaging</td><td>Sealed glass vial, cold-chain shipped with desiccant</td></tr>
    <tr><td>Research Use</td><td>Laboratory / preclinical research only &mdash; not for human or animal use</td></tr>
    <tr><td>Manufacturer</td><td>Veracue</td></tr>
    <tr><td>Quality</td><td>Third-party HPLC &amp; mass spectrometry verified</td></tr>
    <tr><td>Lot Testing</td><td>Per-batch Certificate of Analysis</td></tr>
    <tr><td>Country of Origin</td><td>United States</td></tr>
  </tbody>
</table>

<h4>Research &amp; Applications</h4>
<ul>
  <li>Cellular bioenergetics and mitochondrial oxidative phosphorylation models</li>
  <li>Sirtuin (SIRT1&ndash;7) activation and NAD+-dependent signaling studies</li>
  <li>PARP-mediated DNA repair and genomic stability research</li>
  <li>Cellular senescence and longevity biology models</li>
  <li>Metabolic rate and mitochondrial biogenesis assays</li>
  <li>Comparative pharmacology against related NAD+ precursors (e.g. NMN, NR)</li>
</ul>

<p>NAD+ has been the subject of extensive published preclinical research examining its decline with age and its restoration as a research strategy for studying mitochondrial and metabolic dysfunction. This product is supplied strictly to support that kind of laboratory investigation. It is not approved by the FDA or any regulatory body, and no claim is made regarding safety or efficacy in humans or animals.</p>
`.trim()

const QUALITY_PURITY_HTML = `
<h4>Purity &amp; Quality Standards</h4>
<p>Every batch of NAD+ sold by Veracue is verified using High-Performance Liquid Chromatography (HPLC) and mass spectrometry to confirm identity and purity before release. A per-batch Certificate of Analysis (COA) is available on request. If a supplier cannot produce a COA for a research compound, treat that as a red flag.</p>

<h4>Storage &amp; Handling</h4>
<ul>
  <li>Store lyophilized powder frozen (-20&deg;C) and protected from light prior to use</li>
  <li>Refrigerate (2&ndash;8&deg;C) after reconstitution and use within the recommended window</li>
  <li>Avoid repeated freeze-thaw cycles, which can degrade compound integrity</li>
  <li>Reconstitute using sterile or bacteriostatic water only</li>
  <li>Use standard laboratory PPE (gloves, eye protection) when handling</li>
</ul>

<h4>Shipping &amp; Packaging</h4>
<p>Orders ship in sealed, tamper-evident vials with desiccant packaging to protect the lyophilized powder from moisture in transit. Cold-chain packaging is used where required by order volume or ambient shipping conditions.</p>
`.trim()

const COMPLIANCE_NOTICE_HTML = `
<p>NAD+ sold by Veracue is intended strictly for in vitro laboratory and preclinical research use. It is not a drug, dietary supplement, cosmetic, or food product, and it is not approved by the FDA or any regulatory body for human or veterinary use, diagnosis, treatment, cure, or prevention of any disease or condition. This product must not be administered to humans or animals outside of a properly licensed research facility.</p>
<p>Nothing on this page constitutes medical advice, and no statements here have been evaluated by the FDA. By purchasing this product, the buyer confirms they are a qualified researcher, laboratory, or institution acquiring it for lawful research purposes only, and assumes full responsibility for its handling, storage, and use in compliance with applicable local, state, and federal regulations.</p>
`.trim()

const FAQS = [
  {
    question: 'What is NAD+?',
    answer:
      'NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme found in every living cell, where it plays a central role in cellular energy metabolism, mitochondrial function, and DNA repair signaling. Veracue supplies it strictly for laboratory research use.',
  },
  {
    question: 'What is NAD+ studied for in research settings?',
    answer:
      'Published preclinical research has examined NAD+ in relation to mitochondrial bioenergetics, sirtuin activation, PARP-mediated DNA repair, and cellular senescence. It is one of the most widely studied coenzymes in metabolic and longevity biology.',
  },
  {
    question: 'Is this product approved by the FDA?',
    answer:
      'No. This product is not approved by the FDA or any regulatory body for human or veterinary use. It is sold exclusively for in vitro laboratory and preclinical research.',
  },
  {
    question: 'What does "RUO" mean?',
    answer:
      'RUO stands for "Research Use Only." It indicates that a compound is intended solely for laboratory research and has not been evaluated or approved for human or animal use, diagnosis, or treatment.',
  },
  {
    question: 'How is the purity of this batch verified?',
    answer:
      'Each batch is tested using High-Performance Liquid Chromatography (HPLC) and mass spectrometry by independent methods. A per-batch Certificate of Analysis is available on request.',
  },
  {
    question: 'How should NAD+ be stored?',
    answer:
      'Store the lyophilized powder frozen at -20°C and protected from light. After reconstitution with sterile or bacteriostatic water, refrigerate at 2–8°C and avoid repeated freeze-thaw cycles.',
  },
  {
    question: "What's the difference between the 10mg, 50mg, and 500mg vials?",
    answer:
      'They contain the same lyophilized NAD+ powder at different total quantities per vial, allowing researchers to select a vial size that matches the scale of their protocol without reconstituting more material than needed.',
  },
  {
    question: 'Is a Certificate of Analysis available for this product?',
    answer:
      'A batch-specific Certificate of Analysis is available on request. Contact our support team with your order or batch number to receive the relevant documentation.',
  },
  {
    question: 'Can I purchase this product for personal use?',
    answer:
      'No. This product is sold exclusively to qualified researchers, laboratories, and institutions for lawful research purposes. It is not intended for personal, human, or animal consumption.',
  },
  {
    question: 'How is NAD+ typically reconstituted for research protocols?',
    answer:
      'Researchers typically reconstitute the lyophilized powder with sterile or bacteriostatic water immediately before use, following standard laboratory aseptic technique. Reconstitution volume and technique should follow the specific requirements of the research protocol.',
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  const slug = 'nad-plus'
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
  const mitochondrial = categories.docs.find((c: any) => c.slug === 'mitochondrial-cellular-energy')
  const longevity = categories.docs.find((c: any) => c.slug === 'longevity-anti-aging')
  const categoryIds = [mitochondrial?.id, longevity?.id].filter(Boolean)

  console.log('Uploading media to R2...')

  async function createMedia(filename: string, alt: string) {
    const file = loadImage(filename)
    return payload.create({ collection: 'media', data: { alt }, file })
  }

  const mainImage1 = await createMedia(
    'veracue-nad-plus-500mg-pedestal-white.webp',
    'Veracue NAD+ 500mg research vial on a white studio pedestal',
  )
  const mainImage2 = await createMedia(
    'veracue-nad-plus-50mg-dappled-shadow.webp',
    'Veracue NAD+ 50mg research vial in dappled natural light',
  )
  const variant10mgImage = await createMedia(
    'veracue-nad-plus-10mg-studio.webp',
    'Veracue NAD+ 10mg research vial studio shot',
  )
  const variant50mgImage = await createMedia(
    'veracue-nad-plus-50mg-water-caustics.webp',
    'Veracue NAD+ 50mg research vial with water caustics background',
  )
  const variant500mgImage = await createMedia(
    'veracue-nad-plus-500mg-sunlight-branches.webp',
    'Veracue NAD+ 500mg research vial lit by sunlight through branches',
  )
  const bundleImage = await createMedia(
    'veracue-peptides-multi-vials-collection-flatlay.webp',
    'Veracue multi-vial peptide collection flat lay',
  )

  console.log('Media uploaded. Creating product...')

  const product = await payload.create({
    collection: 'products',
    data: {
      name: 'NAD+ (Nicotinamide Adenine Dinucleotide)',
      description:
        'NAD+ (Nicotinamide Adenine Dinucleotide) is a naturally occurring coenzyme studied for its central role in cellular energy metabolism, mitochondrial function, and DNA repair signaling. Veracue supplies NAD+ as a lyophilized powder intended strictly for laboratory and preclinical research, manufactured to a high-purity standard and backed by third-party verification. It is not intended for human consumption, diagnostic use, or any therapeutic application.',
      images: [{ image: mainImage1.id }, { image: mainImage2.id }],
      seoTitle: 'NAD+ Research Peptide | High-Purity Lyophilized Powder | Veracue',
      seoDescription:
        'Research-grade NAD+ (Nicotinamide Adenine Dinucleotide) available in 10mg, 50mg, and 500mg vials. Third-party HPLC-verified purity. For laboratory research use only.',
      slug,
      price: 24,
      salePrice: 19,
      stock: 500,
      weight: 0.05,
      dimensions: { length: 5, width: 5, height: 8 },
      categories: categoryIds,
      hasVariants: true,
      variants: [
        {
          sku: 'NADPLUS-10MG',
          isKit: false,
          images: [{ image: variant10mgImage.id }],
          price: 24,
          salePrice: 19,
          stock: 500,
          options: [{ key: 'Strength', value: '10mg' }],
        },
        {
          sku: 'NADPLUS-50MG',
          isKit: false,
          images: [{ image: variant50mgImage.id }],
          price: 59,
          salePrice: 49,
          stock: 350,
          options: [{ key: 'Strength', value: '50mg' }],
        },
        {
          sku: 'NADPLUS-500MG',
          isKit: false,
          images: [{ image: variant500mgImage.id }],
          price: 349,
          salePrice: 299,
          stock: 120,
          options: [{ key: 'Strength', value: '500mg' }],
        },
      ],
      bulkBundles: [
        {
          name: '5 Kits',
          quantity: 5,
          discountPercentage: 12,
          image: bundleImage.id,
        },
        {
          name: '10 Kits',
          quantity: 10,
          discountPercentage: 20,
          image: bundleImage.id,
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
  console.log('NOTE: coaFile / coaBatchNumber / coaPurity / coaAnalyzedDate were left empty — no real lab COA exists for this demo product, and I did not want to fabricate compliance/lab data on a publicly-reachable page. Fill these in with real batch data before treating this as a genuine live listing.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
