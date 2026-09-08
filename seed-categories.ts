import { config } from 'dotenv'
config({ path: '.env' })
config({ path: '.env.local' })

import { getPayload } from 'payload'
import configPromise from './src/payload.config'

const categories = [
  "GLP-1 & Metabolic",
  "Healing & Recovery",
  "Cosmetic & Skin",
  "Sexual & Hormonal",
  "Growth Hormone Secretagogue",
  "Cognitive & Nootropic",
  "Longevity & Anti-Aging",
  "Performance & Energy"
];

async function seed() {
  const payload = await getPayload({ config: configPromise });
  
  for (const name of categories) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    try {
      // First check if it already exists
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: slug } },
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'categories',
          data: {
            name,
            slug,
            isVisible: true,
            sortOrder: categories.indexOf(name) + 1,
          },
        });
        console.log(`Created category: ${name}`);
      } else {
        console.log(`Category already exists: ${name}`);
      }
    } catch (e) {
      console.error(`Error creating ${name}:`, e);
    }
  }
  
  process.exit(0);
}

seed();
