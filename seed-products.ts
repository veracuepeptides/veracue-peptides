import { config } from 'dotenv'
config({ path: '.env' })
config({ path: '.env.local' })

import { getPayload } from 'payload'
import configPromise from './src/payload.config'

const productsToSeed = [
  {
    name: 'BPC-157 (5mg)',
    slug: 'bpc-157-5mg',
    description: 'BPC-157 is a synthetic peptide that is being investigated for its regenerative effects. It is derived from a protective protein found in the stomach. Research suggests it may help with tissue repair, joint health, and gut healing.',
    seoTitle: 'Buy BPC-157 (5mg) Peptide',
    seoDescription: 'High-purity BPC-157 5mg research peptide for laboratory use. Available in single vials, 10-vial kits, and bulk bundles.',
    price: 40,
    stock: 1000,
    hasVariants: true,
    categoryName: 'Healing & Recovery',
    variants: [
      {
        sku: 'BPC157-5MG-1V',
        isKit: false,
        price: 40,
        stock: 500,
        options: [{ key: 'Size', value: '1 Vial' }]
      },
      {
        sku: 'BPC157-5MG-1K',
        isKit: true,
        price: 350,
        stock: 100,
        options: [{ key: 'Size', value: '1 Kit (10 Vials)' }]
      },
      {
        sku: 'BPC157-5MG-5K',
        isKit: true,
        price: 1500,
        stock: 50,
        options: [{ key: 'Size', value: '5 Kits (50 Vials)' }]
      }
    ]
  },
  {
    name: 'TB-500 (5mg)',
    slug: 'tb-500-5mg',
    description: 'TB-500 is a synthetic fraction of the protein thymosin beta-4, which is present in virtually all human and animal cells. Research focuses on its potential to promote healing, increase flexibility, and reduce inflammation.',
    seoTitle: 'Buy TB-500 (5mg) Peptide',
    seoDescription: 'High-purity TB-500 5mg research peptide. Available in single vials and bulk kits.',
    price: 45,
    stock: 1000,
    hasVariants: true,
    categoryName: 'Healing & Recovery',
    variants: [
      {
        sku: 'TB500-5MG-1V',
        isKit: false,
        price: 45,
        stock: 500,
        options: [{ key: 'Size', value: '1 Vial' }]
      },
      {
        sku: 'TB500-5MG-1K',
        isKit: true,
        price: 400,
        stock: 100,
        options: [{ key: 'Size', value: '1 Kit (10 Vials)' }]
      },
      {
        sku: 'TB500-5MG-5K',
        isKit: true,
        price: 1750,
        stock: 50,
        options: [{ key: 'Size', value: '5 Kits (50 Vials)' }]
      }
    ]
  },
  {
    name: 'Semaglutide (5mg)',
    slug: 'semaglutide-5mg',
    description: 'Semaglutide is a GLP-1 receptor agonist widely studied for its effects on glycemic control and weight management in metabolic research.',
    seoTitle: 'Buy Semaglutide (5mg) Peptide',
    seoDescription: 'High-purity Semaglutide 5mg research peptide for laboratory use.',
    price: 90,
    stock: 1000,
    hasVariants: true,
    categoryName: 'GLP-1 & Metabolic',
    variants: [
      {
        sku: 'SEMA-5MG-1V',
        isKit: false,
        price: 90,
        stock: 500,
        options: [{ key: 'Size', value: '1 Vial' }]
      },
      {
        sku: 'SEMA-5MG-1K',
        isKit: true,
        price: 800,
        stock: 100,
        options: [{ key: 'Size', value: '1 Kit (10 Vials)' }]
      },
      {
        sku: 'SEMA-5MG-5K',
        isKit: true,
        price: 3500,
        stock: 50,
        options: [{ key: 'Size', value: '5 Kits (50 Vials)' }]
      }
    ]
  },
  {
    name: 'Tirzepatide (10mg)',
    slug: 'tirzepatide-10mg',
    description: 'Tirzepatide is a novel dual GIP and GLP-1 receptor agonist. It is heavily researched for its synergistic effects on metabolic pathways and glucose homeostasis.',
    seoTitle: 'Buy Tirzepatide (10mg) Peptide',
    seoDescription: 'High-purity Tirzepatide 10mg research peptide. Available in bulk and single vials.',
    price: 120,
    stock: 1000,
    hasVariants: true,
    categoryName: 'GLP-1 & Metabolic',
    variants: [
      {
        sku: 'TIRZ-10MG-1V',
        isKit: false,
        price: 120,
        stock: 500,
        options: [{ key: 'Size', value: '1 Vial' }]
      },
      {
        sku: 'TIRZ-10MG-1K',
        isKit: true,
        price: 1050,
        stock: 100,
        options: [{ key: 'Size', value: '1 Kit (10 Vials)' }]
      },
      {
        sku: 'TIRZ-10MG-5K',
        isKit: true,
        price: 4800,
        stock: 50,
        options: [{ key: 'Size', value: '5 Kits (50 Vials)' }]
      }
    ]
  },
  {
    name: 'CJC-1295 / Ipamorelin Blend (5mg/5mg)',
    slug: 'cjc-ipamorelin-blend-10mg',
    description: 'A synergistic blend of CJC-1295 (without DAC) and Ipamorelin. Often studied together to observe amplified pulsatile release of growth hormone in research models.',
    seoTitle: 'Buy CJC-1295 / Ipamorelin Blend Peptide',
    seoDescription: 'High-purity CJC-1295 and Ipamorelin blend (5mg/5mg) research peptide.',
    price: 55,
    stock: 1000,
    hasVariants: true,
    categoryName: 'Growth Hormone Secretagogue',
    variants: [
      {
        sku: 'CJCIPA-1V',
        isKit: false,
        price: 55,
        stock: 500,
        options: [{ key: 'Size', value: '1 Vial' }]
      },
      {
        sku: 'CJCIPA-1K',
        isKit: true,
        price: 480,
        stock: 100,
        options: [{ key: 'Size', value: '1 Kit (10 Vials)' }]
      },
      {
        sku: 'CJCIPA-5K',
        isKit: true,
        price: 2100,
        stock: 50,
        options: [{ key: 'Size', value: '5 Kits (50 Vials)' }]
      }
    ]
  }
];

async function seed() {
  const payload = await getPayload({ config: configPromise });
  
  for (const product of productsToSeed) {
    try {
      // Find category
      const categoryQuery = await payload.find({
        collection: 'categories',
        where: { name: { equals: product.categoryName } }
      });
      
      let categoryIds = [];
      if (categoryQuery.docs.length > 0) {
        categoryIds.push(categoryQuery.docs[0].id);
      }

      // Check if product exists
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: product.slug } }
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'products',
          data: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            seoTitle: product.seoTitle,
            seoDescription: product.seoDescription,
            price: product.price,
            stock: product.stock,
            hasVariants: product.hasVariants,
            categories: categoryIds,
            variants: product.variants,
          } as any
        });
        console.log(`Created product: ${product.name}`);
      } else {
        console.log(`Product already exists: ${product.name}`);
      }
    } catch (e) {
      console.error(`Error creating product ${product.name}:`, e);
    }
  }
  
  process.exit(0);
}

seed();
