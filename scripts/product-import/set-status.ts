import { boot } from './lib'

// Sets the status of products (draft, active or archived) and changes no other field. Visitors only
// ever see "active" products, so "draft" takes a product off the storefront without deleting it.
//   SLUGS=dihexa,oxytocin STATUS=draft   which products and the new status (both required)
//   --dry                                print the changes without saving
const STATUSES = ['draft', 'active', 'archived']

async function main() {
  const dry = process.argv.includes('--dry')
  const slugs = (process.env.SLUGS || '').split(',').map((s) => s.trim()).filter(Boolean)
  const status = process.env.STATUS || ''
  if (!slugs.length || !STATUSES.includes(status)) {
    throw new Error(`Set SLUGS=<slug,slug> and STATUS=${STATUSES.join('|')}`)
  }

  const payload = await boot()
  let changed = 0
  for (const slug of slugs) {
    const found = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
    const doc: any = found.docs[0]
    if (!doc) {
      console.warn(`missing product: ${slug}`)
      continue
    }
    if (doc.status === status) {
      console.log(`${slug} (id ${doc.id}) is already ${status}`)
      continue
    }
    console.log(`${slug} (id ${doc.id}): ${doc.status} -> ${status}`)
    changed++
    if (!dry) await payload.update({ collection: 'products', id: doc.id, data: { status } as any })
  }

  console.log(`${dry ? '[dry] ' : ''}${changed} products ${dry ? 'would change' : 'changed'}`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
