import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function main() {
  const payload = await getPayload({ config: configPromise });
  const cats = await payload.find({
    collection: 'categories',
    limit: 100,
  });

  console.log(`Total categories in Payload: ${cats.totalDocs}`);
  for (const c of cats.docs) {
    console.log(`- ID: ${c.id} | Name: "${c.name}" | Slug: "${c.slug}" | Visible: ${c.isVisible}`);
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
