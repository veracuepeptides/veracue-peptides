import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

const CATEGORIES_DATA = [
  {
    name: {
      en: 'Weight Loss & Metabolic',
      es: 'Pérdida de Peso y Metabólico',
    },
    slug: 'weight-loss-metabolic',
    description: {
      en: 'Advanced GLP-1, GIP, and glucagon receptor agonists formulated for metabolic research and glucose regulation studies.',
      es: 'Agonistas avanzados de receptores GLP-1, GIP y glucagón para investigación metabólica.',
    },
    sortOrder: 1,
    isVisible: true,
  },
  {
    name: {
      en: 'Cellular Repair & Healing',
      es: 'Reparación Celular y Curación',
    },
    slug: 'cellular-repair-healing',
    description: {
      en: 'Regenerative signaling peptides investigated for tissue repair, gut mucosal integrity, and angiogenic research.',
      es: 'Péptidos de señalización regenerativa para la reparación de tejidos e integridad de la mucosa.',
    },
    sortOrder: 2,
    isVisible: true,
  },
  {
    name: {
      en: 'Longevity & Anti-Aging',
      es: 'Longevidad y Antienvejecimiento',
    },
    slug: 'longevity-anti-aging',
    description: {
      en: 'Telomere maintenance, cellular senescence regulators, and NAD+ precursors supporting longevity biology.',
      es: 'Mantenimiento de telómeros, senescencia celular y precursores de NAD+ para la biología de longevidad.',
    },
    sortOrder: 3,
    isVisible: true,
  },
  {
    name: {
      en: 'Cognitive & Neuro-Protection',
      es: 'Cognitivo y Neuroprotección',
    },
    slug: 'cognitive-neuro-protection',
    description: {
      en: 'Neuropeptides and neurotrophic factors studied for synaptic plasticity, memory retention, and neurogenesis.',
      es: 'Neuropéptidos y factores neurotróficos estudiados para la plasticidad sináptica y neurogénesis.',
    },
    sortOrder: 4,
    isVisible: true,
  },
  {
    name: {
      en: 'Growth Hormone Secretagogues',
      es: 'Secretagogos de Hormona de Crecimiento',
    },
    slug: 'growth-hormone-secretagogues',
    description: {
      en: 'Ghrelin mimetics and GHRH analogues formulated for pituitary signaling and protein synthesis assays.',
      es: 'Miméticos de grelina y análogos de GHRH formulados para la señalización pituitaria.',
    },
    sortOrder: 5,
    isVisible: true,
  },
  {
    name: {
      en: 'Immune Modulation',
      es: 'Modulación Inmunológica',
    },
    slug: 'immune-modulation',
    description: {
      en: 'Host defense peptides and immunomodulatory sequences investigating innate defense mechanisms.',
      es: 'Péptidos de defensa del huésped y secuencias inmunomoduladoras.',
    },
    sortOrder: 6,
    isVisible: true,
  },
  {
    name: {
      en: 'Mitochondrial & Cellular Energy',
      es: 'Energía Mitocondrial y Celular',
    },
    slug: 'mitochondrial-cellular-energy',
    description: {
      en: 'Targeted mitochondrial-derived peptides engineered for oxidative phosphorylation and metabolic homeostasis.',
      es: 'Péptidos derivados de mitocondrias para la fosforilación oxidativa y homeostasis.',
    },
    sortOrder: 7,
    isVisible: true,
  },
];

async function seed() {
  const payload = await getPayload({ config: configPromise });
  console.log('Seeding 7 categories...');

  for (const cat of CATEGORIES_DATA) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`Updating existing category: ${cat.slug}`);
      await payload.update({
        collection: 'categories',
        id: existing.docs[0].id,
        data: {
          name: cat.name.en,
          description: cat.description.en,
          sortOrder: cat.sortOrder,
          isVisible: cat.isVisible,
        },
      });
    } else {
      console.log(`Creating category: ${cat.slug}`);
      await payload.create({
        collection: 'categories',
        data: {
          name: cat.name.en,
          slug: cat.slug,
          description: cat.description.en,
          sortOrder: cat.sortOrder,
          isVisible: cat.isVisible,
        },
      });
    }
  }

  const result = await payload.find({ collection: 'categories', limit: 100 });
  console.log(`Success! Total categories in Payload now: ${result.totalDocs}`);
  for (const c of result.docs) {
    console.log(`- [${c.sortOrder}] ${c.name} (${c.slug})`);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
