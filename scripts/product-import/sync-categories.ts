import { boot } from './lib'
import { CATEGORIES, categoryFor } from './categories'

// Makes the categories collection match categories.ts and assigns every product its category. Existing
// categories are updated in place by id (so product links survive a rename) and missing ones are created.
// Nothing else on a product changes.
//   --dry   print every change without saving
//   Rename map: old slug -> new slug for the categories that already exist.
const RENAME: Record<string, string> = {
  'weight-loss-metabolic': 'glp-1-metabolic-research-compounds',
  'cellular-repair-healing': 'healing-recovery-research-compounds',
  'longevity-anti-aging': 'longevity-anti-aging-research-compounds',
  'cognitive-neuro-protection': 'cognitive-nootropic-research-compounds',
  'growth-hormone-secretagogues': 'growth-hormone-secretagogue-research-compounds',
}

async function main() {
  const dry = process.argv.includes('--dry')
  const payload = await boot()
  const existing = (await payload.find({ collection: 'categories', limit: 100, depth: 0, pagination: false })).docs as any[]
  const bySlug = new Map(existing.map((c) => [c.slug, c]))
  const ids = new Map<string, number | string>()

  for (const c of CATEGORIES) {
    const oldSlug = Object.keys(RENAME).find((k) => RENAME[k] === c.slug)
    const doc = bySlug.get(c.slug) || (oldSlug ? bySlug.get(oldSlug) : undefined)
    const data = { name: c.name, slug: c.slug, description: c.description, sortOrder: c.sortOrder, isVisible: true }
    if (doc) {
      console.log(`category ${doc.id}: ${doc.slug} -> ${c.slug} | ${c.name}`)
      ids.set(c.slug, doc.id)
      if (!dry) await payload.update({ collection: 'categories', id: doc.id, data })
    } else {
      console.log(`category NEW: ${c.slug} | ${c.name}`)
      if (dry) ids.set(c.slug, `new:${c.slug}`)
      else ids.set(c.slug, (await payload.create({ collection: 'categories', data })).id)
    }
  }

  const byId = new Map(existing.map((c) => [c.id, c.slug]))
  const products = (await payload.find({ collection: 'products', limit: 500, depth: 0, pagination: false })).docs as any[]
  let changed = 0
  for (const p of products) {
    const target = categoryFor(p.slug)
    const next = target ? [ids.get(target)!] : []
    const current: any[] = (p.categories || []).map((c: any) => (typeof c === 'object' ? c.id : c))
    if (current.length === next.length && current.every((id, i) => id === next[i])) continue
    changed++
    console.log(`product ${p.slug}: [${current.map((id) => byId.get(id) ?? id).join(', ')}] -> [${target ?? ''}]`)
    if (!dry) await payload.update({ collection: 'products', id: p.id, data: { categories: next } as any })
  }

  console.log(`${dry ? '[dry] ' : ''}${products.length} products checked, ${changed} ${dry ? 'would change' : 'changed'}`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
