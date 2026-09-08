import { config } from 'dotenv'
config({ path: '.env' })
config({ path: '.env.local' })

import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import path from 'path'
import fs from 'fs'

const productsToSeed = [
  {
    name: 'BPC-157',
    slug: 'bpc-157',
    imageFile: 'BPC 157 5MG.png',
    description: 'BPC-157 is a synthetic peptide that is being investigated for its profound regenerative effects. Derived from a protective protein found in the stomach, research suggests it may help with tissue repair, joint health, gut healing, and accelerated angiogenesis.',
    seoTitle: 'Buy BPC-157 Research Peptide',
    seoDescription: 'High-purity BPC-157 research peptide for laboratory use. Available in multiple sizes.',
    hasVariants: true,
    categoryName: 'Healing & Recovery',
    productDetailsTitle: 'Product Details',
    productDetailsDescription: 'BPC-157, or Body Protection Compound 157, is a synthetic peptide composed of 15 amino acids. It is a partial sequence of body protection compound that is discovered in and isolated from human gastric juice. Experimentally, it has been demonstrated to accelerate the healing of many different wounds, including tendon-to-bone healing and superior healing of damaged ligaments. Our BPC-157 is synthesized with extreme precision, achieving over 99% purity, ensuring reliable and reproducible results for in vitro and in vivo animal research models. Each vial is lyophilized under strict sterility protocols to guarantee maximum shelf life and stability.',
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: 'The primary mechanism of action for BPC-157 revolves around its interaction with the nitric oxide (NO) system and its ability to upregulate growth factors. Studies indicate that BPC-157 powerfully promotes angiogenesis—the formation of new blood vessels—by stimulating the expression of VEGF (Vascular Endothelial Growth Factor). Furthermore, research highlights its modulating effect on the serotonergic and dopaminergic systems, pointing towards potential neuroprotective properties. Investigators frequently utilize BPC-157 in models of muscular injury, severe burns, and inflammatory bowel diseases to observe accelerated cellular migration and collagen reorganization.',
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: 'Our peptides are manufactured in ISO-certified facilities employing state-of-the-art Solid Phase Peptide Synthesis (SPPS). Every batch of BPC-157 undergoes rigorous third-party analytical testing, including High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS). We guarantee a minimum purity of 99%, with negligible levels of trifluoroacetic acid (TFA) salts and heavy metals. Certificates of Analysis (COAs) are available for all lots, providing researchers with absolute confidence in the integrity and exact molecular weight of the compound they are studying.',
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: 'This product is strictly for research and laboratory use only. It is not intended for human or animal consumption, diagnostic, therapeutic, or prophylactic purposes. All researchers handling this material must be properly trained and operate within a certified laboratory environment. By purchasing, you agree to abide by our Terms and Conditions and acknowledge that Helix Bio assumes no liability for the improper use or mishandling of this chemical.',
    faqs: [
      { question: 'What is the molecular weight of BPC-157?', answer: 'The molecular weight of BPC-157 is approximately 1419.5 g/mol. Exact batch specifications can be found on the provided Certificate of Analysis.' },
      { question: 'How should lyophilized BPC-157 be stored?', answer: 'Lyophilized BPC-157 should be stored at -20°C for long-term stability. Short-term storage (up to a few weeks) at room temperature is generally acceptable if kept away from direct light and heat.' },
      { question: 'What is the recommended reconstitution solvent?', answer: 'For most research applications, bacteriostatic water or sterile saline is recommended as the reconstitution solvent. Ensure gentle swirling and avoid vigorous shaking.' }
    ],
    variantsData: [
      { strength: '5mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '10mg', sizes: ['Single', '5 Kit', '10 Kit'] },
    ]
  },
  {
    name: 'TB-500',
    slug: 'tb-500',
    imageFile: 'TB500 5MG.png',
    description: 'TB-500 is a synthetic fraction of the protein thymosin beta-4, which is present in virtually all human and animal cells. Research focuses on its potential to promote healing, increase flexibility, and reduce inflammation.',
    seoTitle: 'Buy TB-500 Research Peptide',
    seoDescription: 'High-purity TB-500 research peptide. Available in various strengths and bulk kits.',
    hasVariants: true,
    categoryName: 'Healing & Recovery',
    productDetailsTitle: 'Product Details',
    productDetailsDescription: 'TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. It plays a vital role in building new blood vessels, new small muscle tissue fibers, cell migration, and blood cell reproduction. If you are conducting research involving rapid tissue repair, particularly in muscle and connective tissues, TB-500 is a critical compound. Our formulation ensures exactly sequenced amino acids, providing a highly stable and potent powder ready for reconstitution. It is supplied as a lyophilized white powder in sealed vials.',
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: 'TB-500 primarily works by upregulating actin, a cellular building block essential for muscle contraction and cell movement. By binding to actin, TB-500 promotes cell migration—specifically of endothelial cells and keratinocytes—which is the fundamental process required for tissue regeneration and wound healing. It does not bind to the extracellular matrix, which allows it to travel easily through tissues and exert systemic effects. Research models often focus on its efficacy in myocardial infarction recovery, corneal healing, and severe skeletal muscle trauma.',
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: 'All Helix Bio TB-500 batches are synthesized utilizing advanced purification techniques. Each lot is verified via HPLC to be >99% pure. We ensure that the peptide retains its structural integrity without premature degradation. Mass spectrometry confirms the exact sequence of the peptide. We stand by our rigorous testing standards to provide researchers with a sterile, contaminant-free product that performs consistently in delicate assays.',
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: 'This compound is for Research Use Only (RUO). TB-500 is not approved by the FDA for human use. The information provided is for educational purposes regarding in vitro and animal models. Purchasers are solely responsible for ensuring safe handling and adherence to all local and federal regulations concerning laboratory chemicals.',
    faqs: [
      { question: 'Is TB-500 the exact same as Thymosin Beta-4?', answer: 'TB-500 is a synthetic segment (amino acids 17-23) of the larger Thymosin Beta-4 protein. It contains the active actin-binding domain responsible for most of the regenerative properties.' },
      { question: 'Does TB-500 degrade rapidly at room temperature?', answer: 'While in its lyophilized state, it is relatively stable at room temperature for short periods during shipping. However, upon arrival, it should be stored in the freezer.' }
    ],
    variantsData: [
      { strength: '5mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '10mg', sizes: ['Single', '5 Kit', '10 Kit'] },
    ]
  },
  {
    name: 'Semaglutide',
    slug: 'semaglutide',
    imageFile: 'SEMAGLUTIDE 5MG.png',
    description: 'Semaglutide is a GLP-1 receptor agonist widely studied for its profound effects on glycemic control, gastric emptying, and weight management in metabolic research.',
    seoTitle: 'Buy Semaglutide Peptide for Research',
    seoDescription: 'High-purity Semaglutide research peptide for laboratory use. Exceptional quality.',
    hasVariants: true,
    categoryName: 'GLP-1 & Metabolic',
    productDetailsTitle: 'Product Details',
    productDetailsDescription: 'Semaglutide is a peptide-based Glucagon-Like Peptide-1 (GLP-1) receptor agonist. It shares 94% sequence homology with human GLP-1 but includes structural modifications—such as the addition of a C18 fatty acid diacid—that significantly extend its half-life by promoting albumin binding and resisting DPP-4 degradation. This makes it an ideal candidate for long-term metabolic studies. Our Semaglutide is synthesized for maximum purity and is intended strictly for rigorous analytical and in vitro/in vivo laboratory research.',
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: 'In research models, Semaglutide acts by selectively binding to and activating the GLP-1 receptor. It stimulates insulin secretion in a glucose-dependent manner and suppresses glucagon secretion. Furthermore, it slows gastric emptying, which is a major focal point for studies concerning satiety and weight management. Researchers are currently exploring its neuroprotective potential, its impact on cardiovascular outcomes in obese models, and its efficacy in beta-cell preservation.',
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: 'Metabolic peptides require the highest degree of precision to ensure reproducible binding affinities. Our Semaglutide undergoes strict HPLC/MS testing, ensuring a minimum of 99% purity. We rigorously screen for synthesis truncations and by-products. Vials are lyophilized and vacuum-sealed in a sterile environment. A comprehensive COA is available for every manufactured lot.',
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: 'Semaglutide sold by Helix Bio is designated exclusively for laboratory research. It is strictly prohibited to use this chemical for human or veterinary diagnostics, therapeutics, or consumption. Researchers must handle this compound according to established laboratory safety guidelines.',
    faqs: [
      { question: 'Why does Semaglutide have a longer half-life than natural GLP-1?', answer: 'Its structure includes an aminoisobutyric acid substitution at position 8 to prevent DPP-4 breakdown, and an acylation at position 26 that allows it to bind to albumin, reducing renal clearance.' },
      { question: 'What concentration is recommended for cellular assays?', answer: 'Concentration depends highly on the specific cell line and assay. Review the current literature; typically, researchers start with nanomolar (nM) concentrations.' }
    ],
    variantsData: [
      { strength: '5mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '10mg', sizes: ['Single', '5 Kit', '10 Kit'] },
    ]
  },
  {
    name: 'Tirzepatide',
    slug: 'tirzepatide',
    imageFile: 'TIRZEPATIDE 20MG.png',
    description: 'Tirzepatide is a novel dual GIP and GLP-1 receptor agonist. It represents a significant advancement in metabolic research, demonstrating synergistic effects on insulin secretion and lipid metabolism.',
    seoTitle: 'Buy Tirzepatide Research Peptide',
    seoDescription: 'High-purity Tirzepatide (GIP/GLP-1) research peptide for laboratory use.',
    hasVariants: true,
    categoryName: 'GLP-1 & Metabolic',
    productDetailsTitle: 'Product Details',
    productDetailsDescription: 'Tirzepatide is an innovative 39-amino-acid synthetic peptide that functions as a dual agonist for both the Glucose-dependent Insulinotropic Polypeptide (GIP) and Glucagon-Like Peptide-1 (GLP-1) receptors. Its structure is based on the native GIP sequence but is heavily modified with a C20 fatty diacid moiety to extend its pharmacokinetic profile. This dual-action approach makes Tirzepatide a premier subject for contemporary research into metabolic syndrome, obesity, and type 2 diabetes pathology.',
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: 'Research demonstrates that Tirzepatide’s dual agonism yields a synergistic effect that surpasses single GLP-1 agonism. It significantly enhances glucose-dependent insulin secretion, improves insulin sensitivity, and profoundly impacts lipid metabolism and fat deposition. Investigators utilize Tirzepatide in models to study its effects on white and brown adipose tissue, hepatic fat reduction, and overarching energy homeostasis.',
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: 'Due to its large 39-amino-acid chain and complex lipid modification, synthesizing Tirzepatide requires advanced solid-phase peptide synthesis methodologies. We guarantee >99% purity, validated by high-resolution mass spectrometry to ensure the lipid moiety is perfectly attached and intact. Each batch is extensively tested to ensure absence of endotoxins and contaminants, making it ideal for sensitive in vivo models.',
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: 'Tirzepatide is provided solely for scientific research and development. It is not an FDA-approved drug for human use when purchased through Helix Bio. Any form of human ingestion, injection, or topical application is strictly forbidden.',
    faqs: [
      { question: 'What makes Tirzepatide different from Semaglutide?', answer: 'While Semaglutide targets only the GLP-1 receptor, Tirzepatide targets both GLP-1 and GIP receptors, providing a dual mechanism of action.' },
      { question: 'Is the lipid modification prone to degradation?', answer: 'The C20 fatty diacid is chemically stable. However, to maintain integrity, the lyophilized powder must be stored at -20°C.' }
    ],
    variantsData: [
      { strength: '10mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '20mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '30mg', sizes: ['Single', '5 Kit', '10 Kit'] },
    ]
  },
  {
    name: 'CJC-1295 / Ipamorelin',
    slug: 'cjc-ipamorelin',
    imageFile: 'CJC NO DAC 5MG.png', // Reusing CJC image as an example
    description: 'A synergistic blend of CJC-1295 (a GHRH analog) and Ipamorelin (a GHRP). This combination is widely researched for its ability to pulse growth hormone release without elevating cortisol or prolactin.',
    seoTitle: 'Buy CJC-1295 / Ipamorelin Blend',
    seoDescription: 'High-purity CJC-1295 and Ipamorelin research peptide blend.',
    hasVariants: true,
    categoryName: 'Anti-Aging & Growth',
    productDetailsTitle: 'Product Details',
    productDetailsDescription: 'This product is a precise stoichiometric blend of two highly regarded peptides: CJC-1295 (without DAC, also known as Mod GRF 1-29) and Ipamorelin. CJC-1295 acts at the pituitary to stimulate the release of growth hormone, while Ipamorelin acts via the ghrelin receptor to amplify this release. By combining a Growth Hormone Releasing Hormone (GHRH) with a Growth Hormone Releasing Peptide (GHRP), researchers can study the synergistic effects on the somatotropic axis in animal models.',
    researchFocusTitle: 'Research Focus & Mechanism Overview',
    researchFocusDescription: 'The combined mechanism aims to mimic the natural pulsatile release of growth hormone. Unlike older secretagogues, Ipamorelin is highly selective and does not significantly spike cortisol or prolactin levels. Research focuses on the blend’s ability to increase lean muscle mass, improve sleep architecture, enhance bone density, and accelerate recovery in aged or injured models.',
    qualityPurityTitle: 'Quality & Purity Standards',
    qualityPurityDescription: 'Blending two distinct peptides requires extreme precision to ensure uniform distribution in the lyophilized cake. Our blend contains equal parts (or specific ratios) of >99% pure CJC-1295 and Ipamorelin. Each component is synthesized and purified separately before the final sterile blending and lyophilization process. We provide comprehensive analytical data for both compounds to ensure research integrity.',
    complianceNoticeTitle: 'Compliance Notice',
    complianceNoticeDescription: 'For Research Use Only. This blend is not intended for clinical, diagnostic, or therapeutic use. It must be handled by qualified professionals in a laboratory setting.',
    faqs: [
      { question: 'Does this contain DAC (Drug Affinity Complex)?', answer: 'No, this specific formulation utilizes CJC-1295 without DAC (Mod GRF 1-29) to study natural pulsatile GH release rather than continuous elevation.' },
      { question: 'Why combine a GHRH and a GHRP?', answer: 'Research shows that combining these two classes of peptides results in a synergistic, multiplicative release of growth hormone compared to using either alone.' }
    ],
    variantsData: [
      { strength: '5mg/5mg', sizes: ['Single', '5 Kit', '10 Kit'] },
      { strength: '10mg/10mg', sizes: ['Single', '5 Kit', '10 Kit'] },
    ]
  }
]

// Price logic mapping
const basePrices: Record<string, number> = {
  'Single': 1, // multiplier
  '5 Kit': 4.5, // slightly discounted
  '10 Kit': 8.5, // discounted more
}
const strengthBase: Record<string, number> = {
  '5mg': 40,
  '10mg': 70,
  '20mg': 120,
  '30mg': 160,
  '5mg/5mg': 60,
  '10mg/10mg': 100,
}

async function runSeed() {
  const payload = await getPayload({ config: configPromise })

  console.log('--- Starting Heavy Seeding Process ---')

  // 1. Wipe existing products
  console.log('Wiping existing products...')
  await payload.delete({ collection: 'products', where: {} })

  // 2. Locate or create categories
  const categories = await payload.find({ collection: 'categories' })
  const categoryMap: Record<string, string | number> = {}
  
  for (const cat of categories.docs) {
    categoryMap[cat.name] = cat.id as string | number
  }

  const getOrCreateCategory = async (name: string) => {
    if (categoryMap[name]) return categoryMap[name]
    const newCat = await payload.create({
      collection: 'categories',
      data: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
    })
    categoryMap[name] = newCat.id
    return newCat.id
  }

  // 3. Process products
  for (const prodData of productsToSeed) {
    console.log(`Processing: ${prodData.name}`)

    // Create image media
    const imgPath = path.join(process.cwd(), 'public', 'Helix Bio product images', prodData.imageFile)
    let mediaId = null

    if (fs.existsSync(imgPath)) {
      console.log(`  Uploading image: ${prodData.imageFile}`)
      const fileData = fs.readFileSync(imgPath)
      const mediaDoc = await payload.create({
        collection: 'media',
        data: { alt: prodData.name },
        file: {
          data: fileData,
          mimetype: 'image/png',
          name: prodData.imageFile,
          size: fileData.length
        }
      })
      mediaId = mediaDoc.id
    } else {
      console.warn(`  Image not found: ${imgPath}`)
    }

    const catId = await getOrCreateCategory(prodData.categoryName)

    // Generate Variants
    const generatedVariants = []
    let variantIndex = 1

    for (const vData of prodData.variantsData) {
      for (const size of vData.sizes) {
        const isKit = size !== 'Single'
        const basePrice = strengthBase[vData.strength] || 50
        const multiplier = basePrices[size] || 1
        const price = Math.round(basePrice * multiplier)

        generatedVariants.push({
          sku: `${prodData.slug.toUpperCase()}-${vData.strength.toUpperCase().replace('/', '')}-${size.replace(' ', '').toUpperCase()}`,
          isKit,
          price,
          stock: 500,
          options: [
            { key: 'Strength', value: vData.strength },
            { key: 'Size', value: size }
          ]
        })
        variantIndex++
      }
    }

    // Insert Product
    await payload.create({
      collection: 'products',
      data: {
        name: prodData.name,
        slug: prodData.slug,
        description: prodData.description,
        seoTitle: prodData.seoTitle,
        seoDescription: prodData.seoDescription,
        status: 'active',
        isVisible: true,
        price: generatedVariants[0]?.price || 50, // default price based on first variant
        stock: 1000,
        hasVariants: true,
        categories: [catId as any],
        images: mediaId ? [{ image: mediaId }] : [],
        // Heavy Content Tabs
        productDetailsTitle: prodData.productDetailsTitle,
        productDetailsDescription: prodData.productDetailsDescription,
        researchFocusTitle: prodData.researchFocusTitle,
        researchFocusDescription: prodData.researchFocusDescription,
        qualityPurityTitle: prodData.qualityPurityTitle,
        qualityPurityDescription: prodData.qualityPurityDescription,
        complianceNoticeTitle: prodData.complianceNoticeTitle,
        complianceNoticeDescription: prodData.complianceNoticeDescription,
        faqs: prodData.faqs,
        // Variants
        variants: generatedVariants
      }
    })

    console.log(`  -> Successfully created ${prodData.name} with ${generatedVariants.length} variants.`)
  }

  console.log('--- Seeding Complete! ---')
  process.exit(0)
}

runSeed().catch(console.error)
