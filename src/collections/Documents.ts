import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { revalidateStorefrontPages } from '../lib/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
  slug: 'documents',
  hooks: {
    // The certificates page lists these, and it is cached: show a new or removed report right away.
    afterChange: [
      ({ doc }) => {
        revalidateStorefrontPages()
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateStorefrontPages()
        return doc
      },
    ],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin' || user.role === 'staff'
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/documents'),
    mimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
  },
}
