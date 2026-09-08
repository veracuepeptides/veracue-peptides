import { config } from 'dotenv'
config({ path: '.env' })
config({ path: '.env.local' })

import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function activate() {
  const payload = await getPayload({ config: configPromise });
  
  const products = await payload.find({
    collection: 'products',
    where: { status: { equals: 'draft' } },
    limit: 100,
  });

  for (const product of products.docs) {
    try {
      await payload.update({
        collection: 'products',
        id: product.id,
        data: { status: 'active', isVisible: true } as any
      });
      console.log(`Activated product: ${product.name}`);
    } catch (e) {
      console.error(`Error activating product ${product.name}:`, e);
    }
  }
  
  console.log('All draft products activated!');
  process.exit(0);
}

activate();
