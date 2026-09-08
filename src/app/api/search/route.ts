import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Fuse from 'fuse.js'

// Force dynamic rendering because this route uses searchParams (request.url)
export const dynamic = 'force-dynamic'

const FALLBACK_RESEARCH_COMPOUNDS = [
  {
    id: 'prod-bpc157',
    name: 'BPC-157 10mg',
    slug: 'bpc-157-10mg',
    descriptor: '10mg Lyophilized Peptide Vial',
    description: 'Body Protection Compound-157 is a pentadecapeptide investigated for cellular cytoprotection, angiogenic modulation, and soft tissue repair pathways.',
    price: 64.99,
    salePrice: 54.99,
    imageUrl: '/veracue-images/veracue-research-grade-50mg-studio-portrait.png',
    categories: 'Cellular Repair & Healing Recovery Research',
    categoryList: [{ id: '1', name: 'Cellular Repair & Healing', slug: 'cellular-repair' }],
    coaPurity: 99.8,
    coaBatchNumber: 'BPC-2603-A',
    stock: 150,
  },
  {
    id: 'prod-ghkcu',
    name: 'GHK-Cu 50mg',
    slug: 'ghk-cu-50mg',
    descriptor: '50mg Lyophilized Peptide Vial',
    description: 'Copper tripeptide-1 complex evaluated for collagen synthesis, fibroblast stimulation, extracellular matrix remodeling, and dermal signaling integrity.',
    price: 79.99,
    salePrice: 69.99,
    imageUrl: '/veracue-images/veracue-ghk-cu-50mg-ice-bed-warm.webp',
    categories: 'Longevity & Anti-Aging Cellular Repair',
    categoryList: [{ id: '2', name: 'Longevity & Anti-Aging', slug: 'longevity' }],
    coaPurity: 99.6,
    coaBatchNumber: 'GHK-2604-C',
    stock: 120,
  },
  {
    id: 'prod-nadplus',
    name: 'NAD+ 500mg',
    slug: 'nad-plus-500mg',
    descriptor: '500mg High-Purity Research Lyophilized Solid',
    description: 'Nicotinamide Adenine Dinucleotide coenzyme essential for mitochondrial electron transport, sirtuin enzyme activation, and cellular bioenergetics.',
    price: 89.99,
    salePrice: 79.99,
    imageUrl: '/veracue-images/veracue-nad-plus-500mg-pedestal-white.webp',
    categories: 'Weight Loss & Metabolic Longevity & Anti-Aging',
    categoryList: [{ id: '3', name: 'Weight Loss & Metabolic', slug: 'metabolic' }],
    coaPurity: 99.9,
    coaBatchNumber: 'NAD-2601-B',
    stock: 95,
  },
  {
    id: 'prod-epithalon',
    name: 'Epithalon 50mg',
    slug: 'epithalon-50mg',
    descriptor: '50mg Lyophilized Peptide Vial',
    description: 'Synthetic pineal tetrapeptide studied for telomerase upregulation, pineal peptide synthesis, and biological clock chronoregulation.',
    price: 74.99,
    salePrice: null,
    imageUrl: '/veracue-images/veracue-epithalon-50mg-water-ripples-portrait.webp',
    categories: 'Longevity & Anti-Aging Bioregulators',
    categoryList: [{ id: '4', name: 'Longevity & Anti-Aging', slug: 'longevity' }],
    coaPurity: 99.7,
    coaBatchNumber: 'EPI-2602-E',
    stock: 80,
  },
  {
    id: 'prod-retatrutide',
    name: 'Retatrutide 10mg',
    slug: 'retatrutide-10mg',
    descriptor: '10mg Triple Receptor Agonist Lyophilized Solid',
    description: 'Triple GIP/GLP-1/glucagon receptor agonist investigated for metabolic efficiency, glycemic modulation, and adipose lipolysis signaling.',
    price: 139.99,
    salePrice: 119.99,
    imageUrl: '/veracue-images/veracue-research-grade-50mg-dish-leaf-droplets.png',
    categories: 'Weight Loss & Metabolic Receptor Agonists',
    categoryList: [{ id: '5', name: 'Weight Loss & Metabolic', slug: 'metabolic' }],
    coaPurity: 99.5,
    coaBatchNumber: 'RET-2605-R',
    stock: 65,
  },
  {
    id: 'prod-glutathione',
    name: 'Glutathione 200mg',
    slug: 'glutathione-200mg',
    descriptor: '200mg Reduced Tripeptide Lyophilized Vial',
    description: 'Master antioxidant tripeptide investigated for intracellular redox homeostasis, reactive oxygen species scavenging, and mitochondrial protection.',
    price: 49.99,
    salePrice: null,
    imageUrl: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    categories: 'Cellular Repair & Healing Essentials',
    categoryList: [{ id: '6', name: 'Cellular Repair & Healing', slug: 'cellular-repair' }],
    coaPurity: 99.8,
    coaBatchNumber: 'GLU-2601-G',
    stock: 200,
  },
  {
    id: 'prod-semaglutide',
    name: 'Semaglutide 5mg',
    slug: 'semaglutide-5mg',
    descriptor: '5mg Lyophilized GLP-1 Analog Vial',
    description: 'Synthetic glucagon-like peptide-1 analog engineered for extended receptor affinity and metabolic signaling evaluation.',
    price: 84.99,
    salePrice: 74.99,
    imageUrl: '/veracue-images/veracue-research-grade-50mg-ice-dropper.png',
    categories: 'Weight Loss & Metabolic Receptor Agonists',
    categoryList: [{ id: '7', name: 'Weight Loss & Metabolic', slug: 'metabolic' }],
    coaPurity: 99.6,
    coaBatchNumber: 'SEM-2603-S',
    stock: 110,
  },
  {
    id: 'prod-tb500',
    name: 'Thymosin Beta-4 (TB-500) 10mg',
    slug: 'tb-500-10mg',
    descriptor: '10mg Actin-Regulating Peptide Vial',
    description: 'Synthetic 43-amino acid peptide evaluated for actin sequestering, cellular migration, vascular remodeling, and tissue homeostasis.',
    price: 69.99,
    salePrice: 59.99,
    imageUrl: '/veracue-images/veracue-research-grade-50mg-molecular-helix.png',
    categories: 'Cellular Repair & Healing Recovery Research',
    categoryList: [{ id: '8', name: 'Cellular Repair & Healing', slug: 'cellular-repair' }],
    coaPurity: 99.4,
    coaBatchNumber: 'TB4-2602-T',
    stock: 90,
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    // Nothing to search — return empty list
    if (!query) {
      return NextResponse.json([])
    }

    const payload = await getPayload({ config: configPromise })
    const locale = searchParams.get('locale') || 'en'

    let products: any[] = []

    try {
      const productsRes = await payload.find({
        collection: 'products',
        where: {
          status: { equals: 'active' },
        },
        overrideAccess: true,
        locale: locale as 'en' | 'es',
        fallbackLocale: 'en',
        depth: 1,
        limit: 500,
      })

      if (productsRes.docs && productsRes.docs.length > 0) {
        products = productsRes.docs.map((doc: any) => {
          const categoryNames = doc.categories?.map((c: any) => c.title || c.name).join(' ') || ''
          const productName = typeof doc.name === 'string' ? doc.name : (doc.name?.en || doc.name?.es || '')
          const productDesc = typeof doc.description === 'string' ? doc.description : (doc.description?.en || doc.seoDescription?.en || doc.seoDescription || '')

          let imageUrl = null
          if (doc.images?.[0]?.image?.url) {
            imageUrl = doc.images[0].image.url
          } else if (typeof doc.images?.[0]?.image === 'string') {
            imageUrl = doc.images[0].image
          }

          return {
            id: doc.id,
            name: productName,
            slug: doc.slug,
            description: productDesc,
            price: doc.price,
            salePrice: doc.salePrice || null,
            imageUrl,
            categories: categoryNames,
            categoryList: doc.categories?.map((c: any) => ({
              id: c.id,
              name: c.title || c.name || '',
              slug: c.slug || '',
            })) || [],
            descriptor: doc.descriptor || '',
            coaPurity: doc.coaPurity || null,
            coaBatchNumber: doc.coaBatchNumber || null,
            stock: doc.stock ?? 100,
          }
        })
      }
    } catch (dbErr) {
      console.warn('Payload products fetch warning, falling back to research catalog:', dbErr)
    }

    // If database has 0 products (e.g. empty dev database), use fallback research catalog
    if (products.length === 0) {
      products = FALLBACK_RESEARCH_COMPOUNDS
    }

    // Configure Fuse.js for fuzzy searching
    const fuse = new Fuse(products, {
      keys: [
        { name: 'name', weight: 4 },
        { name: 'descriptor', weight: 2 },
        { name: 'categories', weight: 1.5 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.32,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
    })

    const results = fuse.search(query)
    
    // Extract top 10 results
    const matchedProducts = results.slice(0, 10).map(result => result.item)

    return NextResponse.json(matchedProducts)
  } catch (error: any) {
    console.error('Search API Error:', error)
    return NextResponse.json({ error: 'Failed to perform search' }, { status: 500 })
  }
}
