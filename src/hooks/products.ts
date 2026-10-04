import type { CollectionBeforeChangeHook } from 'payload'
import slugify from 'slugify'

export const productsBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Ensure slug from the name if not provided (name may be a plain string or a locale object)
  if (data.name && !data.slug) {
    const rawName = typeof data.name === 'string' ? data.name : data.name.en
    if (rawName) data.slug = slugify(rawName, { lower: true, strict: true })
  }

  // Safely check variants to avoid crashing on partial updates
  const hasVariants = data.hasVariants !== undefined ? data.hasVariants : originalDoc?.hasVariants
  const variants = data.variants !== undefined ? data.variants : originalDoc?.variants

  // Validate variants when hasVariants is true
  if (hasVariants) {
    if (!Array.isArray(variants) || variants.length === 0) {
      throw new Error('When hasVariants is true, at least one variant is required')
    }
    // Check for duplicate SKUs within this product
    const skuSet = new Set()
    for (const variant of variants) {
      if (!variant.sku) {
        throw new Error('Each variant must have a SKU')
      }
      if (skuSet.has(variant.sku)) {
        throw new Error(`Duplicate SKU detected: ${variant.sku}`)
      }
      skuSet.add(variant.sku)
    }
  }

  return data
}
