'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SearchOverlay } from '@/components/shared/SearchOverlay'
import { TiledErrorCode } from '@/components/shared/TiledErrorCode'
import { HeroButton } from '@/components/ui/hero-button'
import { useReducedMotion } from '@/components/motion/useReducedMotion'

// Floating particles component for luxury biotech feel
function MolecularBackground() {
  const reduced = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || reduced) return null

  // Generate 12 elegant floating particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full border border-[#cb997e]/20 bg-[#cb997e]/5 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: ['0%', '-30%', '0%'],
            x: ['0%', '10%', '0%'],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export function NotFoundClient() {
  const [searchOpen, setSearchOpen] = useState(false)
  const t = useTranslations('notFound')

  return (
    <div className="relative min-h-[100dvh] bg-[#f0efeb] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-[140px] pb-12 px-4 sm:px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        #global-footer { display: none !important; }
      `}} />
      <MolecularBackground />

      {/* Tiled 404 Watermark */}
      <TiledErrorCode code="404" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto my-auto"
      >
        {/* Glassmorphism Card */}
        <div className="bg-white/70 backdrop-blur-2xl border border-[#eddcd2] shadow-[0_12px_40px_rgba(32,34,28,0.07)] rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#cb997e]/10 text-[#cb997e] rounded-full flex items-center justify-center mb-8 shadow-inner">
            <Search size={32} strokeWidth={1.5} className="sm:hidden" />
            <Search size={40} strokeWidth={1.5} className="hidden sm:block" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#20221c] tracking-tight mb-4">
            Formula <span className="font-semibold text-[#cb997e]">Not Found</span>
          </h1>

          <p className="text-sm sm:text-base text-[#20221c]/55 max-w-md mx-auto mb-10 leading-relaxed">
            The specific compound or sequence you are looking for does not exist in our current registry. It may have been archived or moved.
          </p>

          {/* Integrated Search Bar Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full max-w-md mx-auto group relative flex items-center bg-[#20221c]/[0.04] hover:bg-[#20221c]/[0.08] transition-colors rounded-full h-14 sm:h-16 px-6 mb-10 text-left"
          >
            <Search size={20} className="text-[#20221c]/40 mr-4" />
            <span className="text-[#20221c]/50 text-sm sm:text-base flex-1">Search the registry...</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#20221c] group-hover:bg-[#cb997e] group-hover:text-white group-hover:scale-110 transition-all">
              <ArrowRight size={16} />
            </div>
          </button>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
            <HeroButton href="/">Return Home</HeroButton>
            <HeroButton href="/shop" variant="secondary">Browse Products</HeroButton>
          </div>

          {/* Secondary links */}
          <nav aria-label="Helpful pages" className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#20221c]/55">
            <Link href="/shop" className="hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">Shop</Link>
            <Link href="/blog" className="hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">Blog</Link>
            <Link href="/faq" className="hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">FAQ</Link>
            <Link href="/" className="hover:text-[#cb997e] transition-colors underline-offset-4 hover:underline">Home</Link>
          </nav>

        </div>
      </motion.div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
