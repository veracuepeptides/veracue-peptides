import { boot } from './lib'
import { PRICES } from './prices'

// Writes the variant prices in prices.ts to the database through Payload, keeping every other field and
// variant row id as it is. The product-level price is set to the first variant's price, as runProduct does.
//   --dry         print the changes without saving
//   ONLY=<slug>   limit the run to one product (trial run)
async function main() {
  const dry = process.argv.includes('--dry')
  const only = process.env.ONLY
  const payload = await boot()
  let products = 0
  let variantsChanged = 0

  for (const [slug, prices] of Object.entries(PRICES)) {
    if (only && slug !== only) continue
    const found = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
    const doc: any = found.docs[0]
    if (!doc) {
      console.warn(`missing product: ${slug}`)
      continue
    }

    const variants = (doc.variants || []).map((v: any) => {
      const strength = v.options?.[0]?.value
      const next = strength ? prices[strength] : undefined
      if (next === undefined) {
        console.warn(`  no price listed for ${slug} ${strength}, left as is`)
        return v
      }
      if (Number(v.price) !== next) {
        console.log(`${slug} ${strength}: ${v.price} -> ${next}`)
        variantsChanged++
      }
      return { ...v, price: next }
    })

    const base = variants[0]?.price
    const unchanged = Number(doc.price) === Number(base) && variants.every((v: any, i: number) => Number(v.price) === Number(doc.variants[i].price))
    if (unchanged) continue // already up to date, nothing to write
    products++
    if (!dry) await payload.update({ collection: 'products', id: doc.id, data: { price: base, variants } })
  }

  console.log(`${dry ? "[dry] " : ""}${products} products with changes, ${variantsChanged} variant prices ${dry ? 'would change' : 'changed'}`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
