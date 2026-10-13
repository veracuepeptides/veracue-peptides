'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Percent, ShieldCheck, Truck, X } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useAnnouncementBarStore } from '@/lib/ui/store'

const COUPON_CODE = 'NEW10'
const ROTATE_MS = 5000
const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cb997e] focus-visible:outline-offset-2'

function CodePill({ code, label, onCopied }: { code: string; label: string; onCopied: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      onCopied()
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable (e.g. an insecure context) — the code is still visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 align-middle rounded-full border border-dashed border-[#cb997e]/70 bg-[#cb997e]/10 px-2.5 py-0.5 normal-case tracking-normal font-bold text-[#fff1e6] transition-colors hover:border-[#cb997e] hover:bg-[#cb997e]/20 cursor-pointer ${FOCUS_RING}`}
    >
      <span className="tracking-wider">{code}</span>
      {copied ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <Copy className="w-3 h-3" strokeWidth={2.5} />}
    </button>
  )
}

export function AnnouncementBar() {
  const t = useTranslations('announcementBar')
  const dismissed = useAnnouncementBarStore((state) => state.dismissed)
  const dismiss = useAnnouncementBarStore((state) => state.dismiss)
  // Driven by ClientHeader's own scroll-direction state, so the bar shows/hides in exact
  // lockstep with the floating header rather than running its own separate scroll listener.
  const headerHidden = useAnnouncementBarStore((state) => state.headerHidden)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // The tallest height the bar has had. On a phone the rotating messages wrap to one or two lines;
  // holding the bar at the tallest keeps the page below it from moving every time the message changes.
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined)
  const barRef = useRef<HTMLDivElement>(null)

  const messages = [
    {
      key: 'newCustomer',
      icon: Percent,
      href: undefined as string | undefined,
      content: (
        // Plain inline flow, not flex: flexbox wraps whole items as boxes, so a short pill
        // after wrapped text would always drop to its own new line even with room to spare.
        // Inline flow lets the pill flow like a word and share the text's last line when it fits.
        <span>
          {t('messages.newCustomer')}{' '}
          <CodePill
            code={COUPON_CODE}
            label={t('clickToCopy')}
            onCopied={() =>
              toast.success(t('copiedTitle'), { description: t('copiedDescription', { code: COUPON_CODE }) })
            }
          />
        </span>
      ),
    },
    {
      key: 'freeShipping',
      icon: Truck,
      href: '/shipping-policy',
      content: <span>{t('messages.freeShipping')}</span>,
    },
    {
      key: 'military',
      icon: ShieldCheck,
      href: '/#military-discount',
      content: <span>{t('messages.military')}</span>,
    },
  ]

  useEffect(() => {
    if (paused || dismissed || headerHidden) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), ROTATE_MS)
    return () => clearInterval(id)
    // messages is rebuilt every render but always has the same length, so this only
    // needs to react to paused/dismissed/headerHidden changing.
  }, [paused, dismissed, headerHidden])

  // Publishes the bar's real rendered height as a CSS variable so ClientHeader (and the
  // homepage hero) can reserve exactly the right amount of space — the content can wrap to
  // extra lines on very narrow screens, so a fixed guessed height isn't reliable here.
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const publish = () => {
      const height = el.offsetHeight
      document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`)
      setMinHeight((previous) => (previous === undefined || height > previous ? height : previous))
    }
    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(el)
    // A different screen width wraps the text differently, so measure again from scratch.
    const remeasure = () => setMinHeight(undefined)
    window.addEventListener('resize', remeasure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', remeasure)
    }
  }, [])

  if (dismissed) return null

  const active = messages[index]
  const ActiveIcon = active.icon

  const body = (
    <span className="inline-flex items-center gap-2">
      <ActiveIcon className="w-3.5 h-3.5 shrink-0 text-[#cb997e]" strokeWidth={2} />
      {active.content}
    </span>
  )

  return (
    <motion.div
      ref={barRef}
      layout
      id="site-announcement-bar"
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: '-100%', opacity: 0 } }}
      initial="visible"
      animate={headerHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      style={{ pointerEvents: headerHidden ? 'none' : 'auto', minHeight }}
      className="fixed top-0 inset-x-0 z-[60] w-full flex flex-col justify-center bg-[#20221c] text-[#fff1e6] print:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
    >
      <div className="relative flex items-center justify-center py-2 sm:py-2.5 px-9 sm:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-center"
          >
            {active.href ? (
              <Link href={active.href} className={`rounded-sm transition-colors hover:text-[#cb997e] ${FOCUS_RING}`}>
                {body}
              </Link>
            ) : (
              body
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t('closeLabel')}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[#fff1e6]/60 transition-colors hover:bg-white/10 hover:text-[#fff1e6] cursor-pointer ${FOCUS_RING}`}
        >
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  )
}

/**
 * Space in the page for the announcement bar. The bar is fixed to the top of the screen and the header is
 * pushed down to clear it, but pages are laid out from the top of the document, so without this the
 * header covers the first 40 to 55px of every page. This keeps each page in the same position relative to
 * the header as it was before the bar existed, and goes away once the bar is dismissed. The bar's height
 * is published as --announcement-bar-height; the fallbacks cover the moment before it has been measured.
 */
export function AnnouncementBarSpacer() {
  const dismissed = useAnnouncementBarStore((state) => state.dismissed)
  // The dismissed flag comes from localStorage, which the server cannot see. Waiting until after mount keeps
  // the first client render identical to the server's.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (mounted && dismissed) return null
  return (
    <div
      aria-hidden="true"
      className="shrink-0 print:hidden h-[var(--announcement-bar-height,3.5rem)] sm:h-[var(--announcement-bar-height,2.5rem)]"
    />
  )
}
