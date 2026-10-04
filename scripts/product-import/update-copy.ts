import fs from 'fs'
import { boot } from './lib'

// Updates only `description` and `seoDescription` on existing products from a JSON file
// ({ slug: { description, seoDescription } }). Used when copy changes but nothing else does.
async function run() {
  const file = process.env.COPY_JSON
  if (!file) throw new Error('Set COPY_JSON to the path of the copy file')
  const copy: Record<string, { description: string; seoDescription: string }> = JSON.parse(fs.readFileSync(file, 'utf8'))
  const payload = await boot()
  for (const [slug, c] of Object.entries(copy)) {
    const found = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
    const doc: any = found.docs[0]
    if (!doc) { console.log(`skip ${slug}: not found`); continue }
    await payload.update({ collection: 'products', id: doc.id, data: { description: c.description, seoDescription: c.seoDescription } })
    console.log(`updated ${slug}`)
  }
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
