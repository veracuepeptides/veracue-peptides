'use client'

import { useEffect, useState, type MouseEvent } from 'react'
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
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#cb997e]/70 bg-[#cb997e]/10 px-2.5 py-0.5 normal-case tracking-normal font-bold text-[#fff1e6] transition-colors hover:border-[#cb997e] hover:bg-[#cb997e]/20 cursor-pointer ${FOCUS_RING}`}
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

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const messages = [
    {
      key: 'newCustomer',
      icon: Percent,
      href: undefined as string | undefined,
      content: (
        <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>{t('messages.newCustomer')}</span>
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
    if (paused || dismissed) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), ROTATE_MS)
    return () => clearInterval(id)
    // messages is rebuilt every render but always has the same length, so this only
    // needs to react to paused/dismissed changing.
  }, [paused, dismissed])

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
    <div
      id="site-announcement-bar"
      className="relative z-[60] h-10 sm:h-11 w-full bg-[#20221c] text-[#fff1e6] print:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false)
      }}
    >
      <div className="relative h-full flex items-center justify-center px-9 sm:px-12">
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
    </div>
  )
}
