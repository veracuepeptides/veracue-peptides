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
<p>AHK-Cu is a small copper peptide: the tripeptide alanine-histidine-lysine bound to a copper(II) ion. The name is simply the one-letter codes of its three amino acids plus the metal. Ingredient suppliers commonly list it under the cosmetic ingredient name Copper Tripeptide-3, which keeps it distinct from Copper Tripeptide-1, the name used for GHK-Cu.</p>
<p>Researchers usually encounter AHK-Cu through hair-follicle biology. Its single most-cited paper, published in Archives of Pharmacal Research in 2007 by a dermatology group at Seoul National University, examined how AHK-Cu affected human hair follicles in organ culture and cultured dermal papilla cells &mdash; the specialised fibroblasts at the base of the follicle.</p>
<p>That narrow evidence base is the most important thing to understand about the compound. A large share of what circulates online about AHK-Cu &mdash; collagen synthesis, wound repair, extracellular matrix remodelling, broad signalling pathways &mdash; comes from research on GHK-Cu or copper peptides as a class, not from studies of AHK-Cu itself. This page separates the two.</p>

<h4>Intended Use</h4>
<p>This material is offered for in vitro and laboratory research &mdash; for example, cell-culture and tissue-culture work in hair-follicle and dermal biology, copper-peptide chemistry, or analytical method development. It is not a drug, cosmetic, supplement or food, and it is not intended for administration to humans or animals.</p>
<p>Research-use positioning is not only a label. Nothing on this page provides, or should be read as, dosing, application, reconstitution-for-administration or treatment information.</p>

<h4>Product Highlights</h4>
<ul>
  <li>Copper(II) complex of the tripeptide Ala-His-Lys (AHK-Cu), also listed by ingredient suppliers as Copper Tripeptide-3</li>
  <li>Supplied as a lyophilized research powder in 50mg and 100mg vials</li>
  <li>Sealed vial packaging, shipped for laboratory delivery</li>
  <li>Labelled for laboratory research use only &mdash; not for human or veterinary use</li>
</ul>
`.trim()

const RESEARCH_FOCUS_HTML = `
<table>
  <tbody>
    <tr><td>Name</td><td>AHK-Cu</td></tr>
    <tr><td>Other names</td><td>Copper Tripeptide-3; Ala-His-Lys-Cu; L-alanyl-L-histidyl-L-lysine copper(II)</td></tr>
    <tr><td>Peptide sequence</td><td>Ala-His-Lys (A-H-K), three amino acids</td></tr>
    <tr><td>Metal</td><td>Copper(II)</td></tr>
    <tr><td>Closest relative</td><td>GHK-Cu (Gly-His-Lys copper), differing only in the first amino acid</td></tr>
    <tr><td>Direct evidence base</td><td>One 2007 study: ex vivo human hair follicles and in vitro dermal papilla cells</td></tr>
    <tr><td>Human clinical data</td><td>None identified</td></tr>
  </tbody>
</table>

<h4>Molecular Identity and Composition</h4>
<p>The peptide portion is L-alanyl-L-histidyl-L-lysine. Chemical database nomenclature for the copper complex describes copper(II) bound through nitrogen atoms of the alanine terminus and the histidine residue, with two of the peptide's N&ndash;H protons removed as the metal binds.</p>
<p>There is no single molecular weight for &ldquo;AHK-Cu&rdquo; that applies to every product &mdash; published values differ because sources describe different forms: the free peptide, the copper complex written with different proton counts, or a hydrochloride salt. The table below shows how each common representation produces a different number, so a researcher can match a Certificate of Analysis or catalogue value to the form it actually describes.</p>

<table>
  <thead>
    <tr><th>Representation</th><th>Formula</th><th>MW (g/mol)</th><th>Where you will see it</th></tr>
  </thead>
  <tbody>
    <tr><td>Uncomplexed tripeptide (AHK, no copper)</td><td>C15H26N6O4</td><td>354.41</td><td>Peptide-only calculations</td></tr>
    <tr><td>Neutral Cu(II) complex, two N&ndash;H protons removed</td><td>C15H24CuN6O4</td><td>415.94</td><td>Some catalogue listings (~416)</td></tr>
    <tr><td>Cu(II) complex written with one additional proton</td><td>C15H25CuN6O4</td><td>416.95</td><td>Common &ldquo;~416.9&rdquo; listing value</td></tr>
    <tr><td>Hydrochloride form (PubChem CID 168431292)</td><td>C15H24ClCuN6O4</td><td>451.39</td><td>PubChem and several supplier pages</td></tr>
    <tr><td>Hydrochloride form, alternative hydrogen count</td><td>C15H25ClCuN6O4</td><td>452.40</td><td>Some chemical supplier listings</td></tr>
  </tbody>
</table>
<p>CAS 682809-81-0 is widely listed by suppliers for AHK-Cu, and at least one chemical supplier assigns it specifically to the hydrochloride while listing a separate CAS for the free base. Because suppliers attach these numbers to different forms, treat any single CAS number as approximate rather than definitive for a specific lot.</p>

<h4>What the AHK-Cu Research Actually Shows</h4>
<p>The direct evidence for AHK-Cu is laboratory evidence. In a 2007 study, AHK-Cu at 10<sup>-12</sup> to 10<sup>-9</sup> M stimulated elongation of isolated human hair follicles in culture and increased proliferation of cultured human dermal papilla cells. The authors proposed that AHK-Cu promotes follicle growth through dermal papilla cell proliferation and reduced apoptosis. None of this was tested in living people.</p>

<h4>The 2007 Pyo et al. Study, Step by Step</h4>
<p><em>Pyo HK, Yoo HG, Won CH, Lee SH, Kang YJ, Eun HC, Cho KH, Kim KH. The effect of tripeptide-copper complex on human hair growth in vitro. Arch Pharm Res. 2007;30(7):834&ndash;839.</em></p>
<ul>
  <li><strong>Hair follicle organ culture (ex vivo).</strong> Individual follicles isolated from human scalp were maintained in culture and exposed to AHK-Cu across a range of concentrations. 240 follicles from three donors were cultured for 12 days, with 30 follicles per condition. Follicle elongation increased at 10<sup>-12</sup> to 10<sup>-9</sup> M compared with vehicle.</li>
  <li><strong>Dermal papilla cell proliferation (in vitro).</strong> Cultured human dermal papilla cells showed increased proliferation over the same 10<sup>-12</sup> to 10<sup>-9</sup> M range, measured with an MTT viability-based assay.</li>
  <li><strong>Apoptosis (in vitro).</strong> At 10<sup>-9</sup> M, flow cytometry with Annexin V/propidium iodide showed fewer apoptotic dermal papilla cells, but the authors report that this decrease was not statistically significant.</li>
  <li><strong>Apoptosis-related proteins (in vitro).</strong> At 10<sup>-9</sup> M, the Bcl-2/Bax ratio rose and cleaved caspase-3 and cleaved PARP fell &mdash; molecular markers consistent with, but not proof of, reduced apoptotic signalling.</li>
</ul>

<h4>A Common Misattribution: VEGF and TGF-&beta;1</h4>
<p>Many pages state that AHK-Cu raised VEGF and lowered TGF-&beta;1 in dermal papilla cells. In the published abstract, those effects appear as background on the tripeptide-copper complex in dermal fibroblasts, citing earlier work &mdash; not as endpoints this study reports measuring in dermal papilla cells. VEGF and TGF-&beta;1 changes should not be read as findings of AHK-Cu in dermal papilla cells.</p>

<table>
  <thead>
    <tr><th>Question</th><th>Evidence type</th><th>Finding</th><th>Limitation</th></tr>
  </thead>
  <tbody>
    <tr><td>Does AHK-Cu affect human hair follicle length in culture?</td><td>Ex vivo human tissue</td><td>Elongation increased at 10<sup>-12</sup>&ndash;10<sup>-9</sup> M</td><td>Isolated follicles from three donors; single laboratory</td></tr>
    <tr><td>Does it affect dermal papilla cell proliferation?</td><td>In vitro human cells</td><td>Proliferation increased at 10<sup>-12</sup>&ndash;10<sup>-9</sup> M</td><td>Cultured cells; short-term viability-based assay</td></tr>
    <tr><td>Does it reduce dermal papilla cell apoptosis?</td><td>In vitro human cells</td><td>Fewer apoptotic cells at 10<sup>-9</sup> M, not statistically significant</td><td>Marker changes are not a demonstrated functional outcome</td></tr>
    <tr><td>Does it change VEGF or TGF-&beta;1 in dermal papilla cells?</td><td>Background statement about dermal fibroblasts</td><td>No direct AHK-Cu dermal papilla finding identified</td><td>Frequently misattributed online</td></tr>
    <tr><td>Does it grow hair in people?</td><td>Insufficient evidence</td><td>Not established</td><td>No clinical trial, dose, duration or safety data</td></tr>
    <tr><td>Is AHK-Cu better than GHK-Cu?</td><td>Evidence gap</td><td>No superiority conclusion possible</td><td>Different research histories, not a measured difference</td></tr>
  </tbody>
</table>

<h4>What This Research Does Not Show</h4>
<ul>
  <li>That AHK-Cu grows hair, prevents hair loss or treats any condition in humans</li>
  <li>That concentrations effective in culture medium translate to any real-world amount or route</li>
  <li>That AHK-Cu is safe for human or animal use</li>
  <li>That the 2007 findings have been independently replicated</li>
  <li>That collagen, wound-healing or gene-expression findings reported for GHK-Cu apply to AHK-Cu</li>
</ul>

<h4>AHK-Cu vs GHK-Cu</h4>
<p>AHK-Cu and GHK-Cu are not the same compound. Both are copper(II) complexes of a tripeptide ending in histidine-lysine, but AHK-Cu starts with alanine and GHK-Cu starts with glycine. GHK-Cu is a naturally occurring human plasma peptide with a far larger literature; AHK-Cu's direct literature centres on one hair-follicle study. No controlled study comparing the two was identified, so neither can be called stronger or better.</p>
<table>
  <thead>
    <tr><th>Attribute</th><th>AHK-Cu</th><th>GHK-Cu</th></tr>
  </thead>
  <tbody>
    <tr><td>Sequence</td><td>Ala-His-Lys + Cu(II)</td><td>Gly-His-Lys + Cu(II)</td></tr>
    <tr><td>Common ingredient name</td><td>Copper Tripeptide-3</td><td>Copper Tripeptide-1</td></tr>
    <tr><td>Size of direct evidence base</td><td>Small &mdash; principally Pyo et al., 2007</td><td>Large &mdash; decades of in vitro, animal and some human research</td></tr>
    <tr><td>Dominant direct research model</td><td>Ex vivo human hair follicles; in vitro dermal papilla cells</td><td>Wide range, including skin cells, wound models and gene-expression studies</td></tr>
    <tr><td>Head-to-head comparison</td><td>None identified</td><td>None identified</td></tr>
  </tbody>
</table>
`.trim()

const QUALITY_PURITY_HTML = `
<h4>Reading an AHK-Cu Certificate of Analysis</h4>
<p>A purity percentage on its own answers only one question. A useful AHK-Cu Certificate of Analysis (COA) should let you confirm what the material is, how pure it is by a stated method, how much is actually in the vial, and that the report belongs to the lot you received.</p>
<p>Copper complexes add a wrinkle: the expected mass and molecular weight depend on whether a result refers to the free peptide, the copper complex or a salt form. A report should state which species its identity result was matched against.</p>

<table>
  <thead>
    <tr><th>COA element</th><th>What it tells you</th><th>What it does not establish</th></tr>
  </thead>
  <tbody>
    <tr><td>Lot or batch number</td><td>Links the report to a specific production lot</td><td>Anything about quality unless it matches the vial label</td></tr>
    <tr><td>HPLC purity (%)</td><td>Share of detected signal in the main peak under stated conditions</td><td>Identity, net peptide content, sterility or biological activity</td></tr>
    <tr><td>Mass spectrometry / LC-MS</td><td>Whether an observed mass is consistent with the expected species</td><td>Purity, or the amount of material present</td></tr>
    <tr><td>Net peptide content</td><td>How much of the vial's mass is peptide rather than salts or water</td><td>Chromatographic purity</td></tr>
    <tr><td>Copper content (if tested)</td><td>Whether copper is present at the expected ratio to peptide</td><td>Purity of the peptide portion</td></tr>
    <tr><td>Stated form and formula</td><td>Which molecular weight applies to the material</td><td>Identity by itself &mdash; must be supported by analytical data</td></tr>
    <tr><td>Laboratory name and test date</td><td>Who tested the lot and when</td><td>Independence, unless the relationship is disclosed</td></tr>
  </tbody>
</table>

<h4>Quick COA Check</h4>
<ul>
  <li>Lot number on the COA matches the vial label</li>
  <li>Purity method is named, not just a percentage</li>
  <li>Identity result states the expected and observed values and the species matched</li>
  <li>Molecular form (free complex, hydrochloride, other) is stated</li>
  <li>Testing laboratory and date are shown</li>
  <li>Any extra panels are reported with results, not just listed as &ldquo;tested&rdquo;</li>
</ul>

<h4>Storage &amp; Handling</h4>
<p>Store according to the conditions stated on this lot's documentation and label. Handle as a laboratory chemical using appropriate personal protective equipment.</p>
`.trim()

const COMPLIANCE_NOTICE_HTML = `
<p>AHK-Cu supplied by Veracue is intended solely for laboratory research. It is not a drug, cosmetic, dietary supplement or food, and it is not intended to diagnose, treat, cure or prevent any disease. It must not be administered to humans or animals. The scientific information on this page describes published laboratory studies and is not medical advice or a statement of efficacy or safety. Purchasers are responsible for using the material lawfully and within an appropriate research setting.</p>
`.trim()

const FAQS = [
  {
    question: 'What is AHK-Cu?',
    answer:
      'AHK-Cu is the copper(II) complex of the tripeptide alanine-histidine-lysine (Ala-His-Lys). It is often listed as Copper Tripeptide-3 and is supplied here as a laboratory research material.',
  },
  {
    question: 'Is AHK-Cu the same as GHK-Cu?',
    answer:
      'No. They share the histidine-lysine end and both bind copper, but AHK-Cu starts with alanine and GHK-Cu starts with glycine. Their evidence bases are separate, and GHK-Cu findings should not be applied to AHK-Cu.',
  },
  {
    question: 'What is Copper Tripeptide-3?',
    answer:
      'Copper Tripeptide-3 is the ingredient name commonly used for AHK-Cu, while Copper Tripeptide-1 is used for GHK-Cu. Because suppliers may sell different salt forms under the same name, the Certificate of Analysis — not the name — should confirm what a specific product contains.',
  },
  {
    question: 'What does the published AHK-Cu research show?',
    answer:
      'A 2007 study found that AHK-Cu at 10⁻¹² to 10⁻⁹ M lengthened isolated human hair follicles in culture and increased proliferation of cultured dermal papilla cells. It also reported apoptosis-related protein changes at 10⁻⁹ M, although the reduction in apoptotic cells was not statistically significant.',
  },
  {
    question: 'Is AHK-Cu proven to grow hair?',
    answer:
      'No. The evidence comes from ex vivo follicles and in vitro cells, not living people. It does not establish hair growth, treatment of hair loss or safety in humans.',
  },
  {
    question: 'Are there clinical trials of AHK-Cu?',
    answer:
      'No published human clinical trial or registered trial specifically of AHK-Cu was identified during this review. Researchers should check ClinicalTrials.gov and PubMed directly for any newer records.',
  },
  {
    question: 'Did the AHK-Cu study show increased VEGF in dermal papilla cells?',
    answer:
      'Not according to the published abstract. VEGF and TGF-β1 are mentioned there as earlier findings for the tripeptide-copper complex in dermal fibroblasts, not as results measured in dermal papilla cells in this study.',
  },
  {
    question: 'Why do sources list different molecular weights for AHK-Cu?',
    answer:
      'Because they describe different forms. The free AHK peptide is about 354.4 g/mol, the copper complex about 416 g/mol depending on how protons are counted, and the hydrochloride form about 451–452 g/mol. The correct value for a product is the one matching the form stated on its COA.',
  },
  {
    question: 'What is the CAS number for AHK-Cu?',
    answer:
      'CAS 682809-81-0 is the number most often listed by suppliers, and some assign it to the hydrochloride form with a different number for the free base. A CAS number is only meaningful when tied to the exact documented form of the material.',
  },
  {
    question: 'What should an AHK-Cu Certificate of Analysis include?',
    answer:
      'At minimum: a lot number matching the vial, a named purity method and result, an identity result with expected and observed values, the molecular form, and the testing laboratory and date.',
  },
  {
    question: 'Does high HPLC purity mean AHK-Cu is safe or biologically active?',
    answer:
      'No. HPLC purity measures the proportion of detected signal in the main chromatographic peak. It does not confirm identity on its own, and it says nothing about sterility, endotoxin, biological activity or suitability for any use in living organisms.',
  },
  {
    question: 'What does research use only mean for this product?',
    answer:
      'It means the material is supplied for laboratory and in vitro research, not for human or veterinary administration, diagnosis or treatment. The page therefore provides no dosing or application guidance.',
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  const slug = 'ahk-cu'
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
  const cellularRepair = categories.docs.find((c: any) => c.slug === 'cellular-repair-healing')
  const longevity = categories.docs.find((c: any) => c.slug === 'longevity-anti-aging')
  const categoryIds = [cellularRepair?.id, longevity?.id].filter(Boolean)

  // Prefer real, already-uploaded AHK-Cu product photography if it still exists in the
  // media library; fall back to the GHK-Cu vial photography checked into the repo (same
  // copper-peptide family) purely as a visual placeholder so the page can be reviewed.
  async function findExistingMedia(filename: string) {
    const res = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
    return res.docs[0] || null
  }
  async function createMedia(filename: string, alt: string) {
    const file = loadImage(filename)
    return payload.create({ collection: 'media', data: { alt }, file })
  }

  console.log('Resolving product images...')

  let main50 = await findExistingMedia('AHK-CU 50MG.webp')
  let main100 = await findExistingMedia('AHK-CU 100MG.webp')
  let variant50Img = await findExistingMedia('AHK-CU 50MG-1.webp')
  let variant100Img = await findExistingMedia('AHK-CU 100MG-1.webp')

  const usingRealPhotos = Boolean(main50 && main100 && variant50Img && variant100Img)

  if (!usingRealPhotos) {
    console.log('Real AHK-Cu media not fully found in the library — uploading GHK-Cu placeholder vial photography instead.')
    main50 = main50 || (await createMedia('veracue-ghk-cu-50mg-ice-bed-white.webp', 'Veracue AHK-Cu 50mg research vial (placeholder photography)'))
    main100 = main100 || (await createMedia('veracue-ghk-cu-30mg-studio-shadow.webp', 'Veracue AHK-Cu 100mg research vial (placeholder photography)'))
    variant50Img = variant50Img || (await createMedia('veracue-ghk-cu-50mg-ice-bed-warm.webp', 'Veracue AHK-Cu 50mg research vial, alternate angle (placeholder photography)'))
    variant100Img = variant100Img || (await createMedia('veracue-ghk-cu-30mg-textured-fabric.webp', 'Veracue AHK-Cu 100mg research vial, alternate angle (placeholder photography)'))
  } else {
    console.log('Using existing AHK-Cu product photography already in the media library.')
  }

  console.log('Creating product...')

  const product = await payload.create({
    collection: 'products',
    data: {
      name: 'AHK-Cu (Copper Tripeptide-3)',
      description:
        'AHK-Cu is the copper(II) complex of the tripeptide L-alanyl-L-histidyl-L-lysine (Ala-His-Lys), listed by many ingredient suppliers as Copper Tripeptide-3. Veracue supplies it as a research material for laboratory work. The most directly relevant published study (Pyo et al., 2007) tested AHK-Cu on isolated human scalp hair follicles and cultured human dermal papilla cells — ex vivo and in vitro evidence only. No human clinical trial of AHK-Cu was identified, so this material does not establish hair growth, treatment effect or safety in people.',
      images: [{ image: main50!.id }, { image: main100!.id }],
      seoTitle: 'AHK-Cu Research Peptide (Copper Tripeptide-3) | Veracue',
      seoDescription:
        'AHK-Cu, the copper complex of Ala-His-Lys, for lab research: molecular identity, what the 2007 hair follicle study tested, AHK-Cu vs GHK-Cu, and COA checks.',
      slug,
      price: 59,
      salePrice: 49,
      stock: 200,
      weight: 0.05,
      dimensions: { length: 5, width: 5, height: 8 },
      categories: categoryIds,
      hasVariants: true,
      variants: [
        {
          sku: 'AHKCU-50MG',
          isKit: false,
          images: [{ image: variant50Img!.id }],
          price: 59,
          salePrice: 49,
          stock: 200,
          options: [{ key: 'Strength', value: '50mg' }],
        },
        {
          sku: 'AHKCU-100MG',
          isKit: false,
          images: [{ image: variant100Img!.id }],
          price: 99,
          salePrice: 84,
          stock: 150,
          options: [{ key: 'Strength', value: '100mg' }],
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
  console.log(`Used ${usingRealPhotos ? 'REAL existing AHK-Cu photography' : 'GHK-Cu PLACEHOLDER photography'} for images.`)
  console.log('NOTE: price ($59/50mg, $99/100mg), SKUs, stock, and categories are placeholder values I chose for testing — not real Veracue pricing/inventory. coaFile / coaBatchNumber / coaPurity / coaAnalyzedDate were left empty since no real lab COA exists for this product yet. Replace all of this with real data before treating it as a genuine live listing.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
