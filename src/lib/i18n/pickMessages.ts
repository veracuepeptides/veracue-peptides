import type { AbstractIntlMessages } from 'next-intl'

/**
 * Builds a subset of the full messages tree containing only the given
 * namespace paths (dot-separated, e.g. 'shop.shopClient'). Used so each
 * route's client-side NextIntlClientProvider only ships the translation
 * data it actually reads, instead of the entire site-wide messages file.
 */
export function pickMessages(
  messages: AbstractIntlMessages,
  keys: readonly string[],
): AbstractIntlMessages {
  const result: Record<string, any> = {}

  for (const key of keys) {
    const parts = key.split('.')
    let source: any = messages
    let target = result

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      source = source?.[part]
      if (source === undefined) break

      if (i === parts.length - 1) {
        target[part] = source
      } else {
        target[part] = target[part] || {}
        target = target[part]
      }
    }
  }

  return result
}

/** Namespaces needed by components mounted on every page (header, footer, age gate, etc). */
export const GLOBAL_MESSAGE_KEYS = [
  'ageGate',
  'footer',
  'mobileMenu',
  'searchOverlay',
  'checkout.cartDrawer',
] as const
