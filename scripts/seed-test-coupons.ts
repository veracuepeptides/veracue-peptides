import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });

  const codes = ['TEST10', 'TESTIO', 'TEST1O'];

  for (const code of codes) {
    const existing = await payload.find({
      collection: 'coupons',
      where: { code: { equals: code } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      const coupon = existing.docs[0];
      await payload.update({
        collection: 'coupons',
        id: coupon.id,
        data: {
          isActive: true,
          type: 'percentage',
          value: 10,
          applicableProductTypes: 'all',
          appliesTo: 'all',
        },
        overrideAccess: true,
      });
      console.log(`Updated coupon ${code}`);
    } else {
      await payload.create({
        collection: 'coupons',
        data: {
          code: code,
          type: 'percentage',
          value: 10,
          isActive: true,
          applicableProductTypes: 'all',
          appliesTo: 'all',
        },
        overrideAccess: true,
      });
      console.log(`Created coupon ${code}`);
    }
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
