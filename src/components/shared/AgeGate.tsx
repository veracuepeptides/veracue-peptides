'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Image from 'next/image'
import { Lock, Check } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { FluidButton } from '@/components/ui/fluid-button'

// Matches the site's signature "out-quart" easing (tailwind.config.ts) used across
// hero/section motion, and the curtain-lift exit already established by the homepage
// preloader (HomePreloaderWrapper) — keeping this gate's choreography consistent with it.
const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
}

export function AgeGate() {
  const t = useTranslations('ageGate')
  const [isVisible, setIsVisible] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)
  const [isDenied, setIsDenied] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const lenis = useLenis()
  const primaryActionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHasHydrated(true)
    const isVerified = /(?:^|;\s*)age_verified=true(?:;|$)/.test(document.cookie)
    if (!isVerified) {
      setIsVisible(true)
    }
  }, [])

  // Move focus into the dialog (primary action) once it is shown
  useEffect(() => {
    if (!isVisible) return
    const id = window.setTimeout(() => {
      primaryActionRef.current?.querySelector('button')?.focus()
    }, 60)
    return () => window.clearTimeout(id)
  }, [isVisible])

  // Lock scroll and videos globally when visible
  useEffect(() => {
    const videos = document.querySelectorAll('video')
    if (isVisible) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      lenis?.stop()
      videos.forEach(v => v.pause())
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      lenis?.start()
      videos.forEach(v => v.play().catch(() => {}))
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      lenis?.start()
      videos.forEach(v => v.play().catch(() => {}))
    }
  }, [isVisible, lenis])

  const handleVerify = () => {
    if (isConfirming) return
    setIsConfirming(true)
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `age_verified=true; max-age=31536000; path=/; SameSite=Lax${secure}`
    // Let the confirm micro-interaction (checkmark swap) read before the curtain lifts
    setTimeout(() => {
      setIsVisible(false)
    }, 550)
  }

  const handleDeny = () => setIsDenied(true)

  const handleGoBack = () => setIsDenied(false)

  if (!hasHydrated) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={isDenied ? 'age-gate-denied-title' : 'age-gate-title'}
          className="fixed inset-0 z-[999999] pointer-events-auto flex flex-col lg:flex-row bg-white overflow-y-auto lg:overflow-hidden"
          data-lenis-prevent="true"
          initial={{ y: 0, scale: 1 }}
          exit={{ y: '-100%', scale: 0.97, transition: { duration: 0.75, ease: EASE_OUT_QUART } }}
        >
          {/* Left Side: Image Pane */}
          <motion.div
            className="relative w-full lg:w-1/2 h-64 md:h-80 lg:h-screen shrink-0 order-first overflow-hidden bg-black"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
          >
            <Image
              src="/veracue-images/veracue-glow-50mg-water-splash-portrait.webp"
              alt="Veracue Laboratory Synthesis"
              fill
              className={`object-cover transition-[transform,opacity,filter] duration-1000 will-change-[transform,opacity,filter] ${isDenied ? 'opacity-30 scale-110 grayscale blur-md' : 'opacity-90 hover:scale-105'}`}
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            {/* Denied Gradient — deep rust rather than stock red, to stay in the brand's warm palette */}
            <div className={`absolute inset-0 bg-[#3a1512]/85 pointer-events-none transition-opacity duration-1000 will-change-opacity ${isDenied ? 'opacity-100' : 'opacity-0'}`} />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isDenied ? 0.2 : 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_QUART }}
              className="absolute top-6 left-6 md:top-12 md:left-12 w-36 md:w-56 h-10 md:h-16 pointer-events-none"
            >
              <Image
                src="/veracue-images/logo-header.webp"
                alt="Veracue Logo"
                fill
                className="object-contain drop-shadow-2xl brightness-0 invert"
              />
            </motion.div>

            {/* Purity / HPLC Trust Badge — reuses the same frosted-pill pattern as the on-site trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isDenied ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: EASE_OUT_QUART }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 inline-flex items-center gap-2 bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3.5 md:px-4 py-1.5 md:py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e] shrink-0" />
              <span className="text-[#fff1e6] text-[9px] md:text-[11px] font-bold tracking-[0.14em] uppercase font-editorial whitespace-nowrap">
                {t('hplcVerifiedLine1')} {t('hplcVerifiedLine2')}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Side: Content Pane */}
          <div
            className="relative w-full lg:w-1/2 flex-1 lg:h-screen flex flex-col bg-white order-last lg:overflow-y-auto overflow-x-hidden"
            data-lenis-prevent="true"
          >
            <AnimatePresence mode="wait">
              {!isDenied ? (
                <motion.div
                  key="verify"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
                  className="w-full max-w-2xl px-6 py-8 md:py-10 md:px-16 lg:px-24 flex flex-col lg:justify-center min-h-full mx-auto"
                >
                  <div className="flex-shrink-0">
                    <motion.p variants={itemVariants} className="font-bold tracking-[0.3em] uppercase text-[#20221c]/60 text-[10px] md:text-sm mb-3">
                      {t('restrictedAccess')}
                    </motion.p>
                    <motion.h2 id="age-gate-title" variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-black text-[#20221c] mb-6 tracking-tighter font-heading uppercase leading-none">
                      {t('titleLine1')}<br /> {t('titleLine2')}
                    </motion.h2>

                    <motion.div variants={itemVariants} className="w-12 h-[4px] bg-[#cb997e] mb-8 origin-left" />

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row w-full gap-4 max-w-lg mb-10">
                      <div className="flex-1" ref={primaryActionRef}>
                        <FluidButton
                          onClick={handleVerify}
                          text={t('confirmButton')}
                          variant="dark"
                          disabled={isConfirming}
                          icon={isConfirming ? <Check size={16} strokeWidth={3} /> : undefined}
                          className={`w-full min-w-full transition-transform duration-300 ${isConfirming ? 'scale-[0.98]' : ''}`}
                        />
                      </div>
                      <button
                        onClick={handleDeny}
                        disabled={isConfirming}
                        className="flex-1 bg-transparent text-[#20221c] border-2 border-[#20221c]/20 px-6 py-4 rounded-[10px] font-bold uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-black/5 hover:border-black/50 transition-all active:scale-95 duration-200 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        {t('denyButton')}
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-[#20221c]/80 text-sm md:text-lg leading-relaxed mb-10 space-y-4 md:space-y-6 font-medium">
                      <p>
                        <strong className="text-[#20221c] block mb-2 text-base md:text-xl uppercase tracking-widest">{t('disclaimerLabel')}</strong>
                        {t.rich('disclaimerText', { strong: (chunks) => <strong>{chunks}</strong> })}
                      </p>
                      <p className="font-bold text-[#20221c] text-base md:text-xl">
                        {t('consentText')}
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-8 text-[#20221c]/60 text-[9px] md:text-[10px] uppercase tracking-[0.2em] pb-10 lg:pb-0">
                      {t('agreementPrefix')} <Link href="/terms-and-conditions" className="hover:text-[#cb997e] transition-colors underline underline-offset-4 font-bold">{t('termsLink')}</Link>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-xl px-6 py-10 md:px-16 flex flex-col items-center justify-start lg:justify-center text-center min-h-full mx-auto"
                >
                  <div className="flex flex-col items-center flex-shrink-0 pb-10 lg:pb-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                      className="w-24 h-24 bg-[#8c2f2f] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(140,47,47,0.35)] mb-10"
                    >
                      <Lock className="w-12 h-12 text-white" />
                    </motion.div>

                    <h2 id="age-gate-denied-title" className="text-5xl md:text-7xl font-black text-[#8c2f2f] mb-6 tracking-tighter font-heading uppercase leading-none">
                      {t('deniedTitle')}
                    </h2>

                    <div className="w-16 h-[4px] bg-[#8c2f2f] mb-8 mx-auto" />

                    <div className="text-[#20221c]/80 text-base md:text-xl leading-relaxed mb-12 max-w-md font-medium mx-auto">
                      <p>
                        {t('deniedText')}
                      </p>
                    </div>

                    <button
                      onClick={handleGoBack}
                      className="text-sm uppercase tracking-[0.2em] font-bold text-[#20221c]/40 hover:text-[#20221c] transition-colors border-b-2 border-[#20221c]/20 pb-1 hover:border-[#20221c]"
                    >
                      {t('goBack')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
