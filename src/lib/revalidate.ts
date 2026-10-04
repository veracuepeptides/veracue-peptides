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

// Files generated from the CMS on an hourly cache: refresh them right away when content changes.
export function revalidateGeneratedFiles() {
  safely(() => {
    revalidatePath('/sitemap.xml')
    revalidatePath('/llms.txt')
    revalidatePath('/llms-full.txt')
  })
}

export function revalidateCategoryData() {
  safely(() => revalidateTag('categories', 'max'))
  revalidateGeneratedFiles()
}
