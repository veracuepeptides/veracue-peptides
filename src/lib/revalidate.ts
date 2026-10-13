import { revalidatePath, revalidateTag } from 'next/cache'

// Payload hooks also run outside a Next.js request (import scripts, seeds), where the revalidate
// helpers throw. Editors saving in the admin panel are in a request, so the calls work there.
function safely(fn: () => void) {
  try {
    fn()
  } catch {
    // Not inside a Next.js request scope; nothing to revalidate.
  }
}

// Public pages that read catalog, blog or certificate data are cached and each has a time-based
// `revalidate` as a safety net. Saving content refreshes them straight away instead of waiting for
// that timer, so an edited price or a published post shows up immediately. Pages with no cache
// entry yet are simply rendered on their next visit.
export function revalidateStorefrontPages() {
  safely(() => {
    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/product/[slug]', 'page')
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/certificates')
    revalidatePath('/[slug]', 'page')
  })
}

// Files generated from the CMS on an hourly cache: refresh them right away when content changes.
// Also refreshes the cached storefront pages, since the same edits change what they show.
export function revalidateGeneratedFiles() {
  safely(() => {
    revalidatePath('/sitemap.xml')
    revalidatePath('/llms.txt')
    revalidatePath('/llms-full.txt')
  })
  revalidateStorefrontPages()
}

// The checkout reads the payment options through a tagged cache, and the generated llms files
// describe them. Expire the cache at once (not "stale while revalidate") so an option switched off in
// the admin disappears from checkout straight away.
export function revalidatePaymentMethods() {
  safely(() => revalidateTag('payment-methods', { expire: 0 }))
  revalidateGeneratedFiles()
}

export function revalidateCategoryData() {
  safely(() => revalidateTag('categories', 'max'))
  revalidateGeneratedFiles()
}
