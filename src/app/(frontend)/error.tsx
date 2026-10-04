'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { TiledErrorCode } from '@/components/shared/TiledErrorCode'
import { useReducedMotion } from '@/components/motion/useReducedMotion'
import { HeroButton } from '@/components/ui/hero-button'

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
          className="absolute rounded-full border border-[#a5a58d]/20 bg-[#a5a58d]/5 blur-[1px]"
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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught an error:', error)
  }, [error])

  return (
    <div className="relative min-h-[100dvh] bg-[#f0efeb] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-[140px] pb-12 px-4 sm:px-6">
      <style dangerouslySetInnerHTML={{ __html: `
        #global-footer { display: none !important; }
      `}} />
      <MolecularBackground />

      {/* Tiled 500 Watermark */}
      <TiledErrorCode code="500" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto my-auto"
      >
        {/* Glassmorphism Card */}
        <div className="bg-white/70 backdrop-blur-2xl border border-[#eddcd2] shadow-[0_12px_40px_rgba(32,34,28,0.07)] rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#a5a58d]/10 text-[#a5a58d] rounded-full flex items-center justify-center mb-8 shadow-inner">
            <AlertCircle size={32} strokeWidth={1.5} className="sm:hidden" />
            <AlertCircle size={40} strokeWidth={1.5} className="hidden sm:block" />
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-[#20221c] tracking-tight mb-4">
            System <span className="font-semibold text-[#cb997e]">Error</span>
          </h2>

          <p className="text-sm sm:text-base text-[#20221c]/55 max-w-md mx-auto mb-10 leading-relaxed">
            We encountered an unexpected anomaly while processing your request. Our synthesis team has been notified.
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
            <HeroButton onClick={() => reset()} icon={<RotateCcw size={14} strokeWidth={2.5} />}>
              Try Again
            </HeroButton>
            <HeroButton href="/" variant="secondary">Return Home</HeroButton>
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

