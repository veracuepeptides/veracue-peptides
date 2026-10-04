// src/collections/Categories.ts
import type { CollectionConfig } from 'payload'
import { access } from '@/access/categories'
import { beforeChangeGenerateSlug } from '@/hooks/categories'
import { validateSlugFormat } from '@/lib/slug/validate'
import { revalidateCategoryData } from '@/lib/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  access,
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'seoTitle', type: 'text', localized: true },
    { name: 'seoDescription', type: 'textarea', localized: true },
    { name: 'slug', type: 'text', unique: true, validate: validateSlugFormat, admin: { position: 'sidebar' } },
    { name: 'parent', type: 'relationship', relationTo: 'categories', hasMany: false },
    { name: 'isVisible', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', admin: { position: 'sidebar' } },
  ],
  hooks: {
    beforeChange: [beforeChangeGenerateSlug],
    afterChange: [
      ({ doc }) => {
        revalidateCategoryData()
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCategoryData()
        return doc
      },
    ],
  },
}
