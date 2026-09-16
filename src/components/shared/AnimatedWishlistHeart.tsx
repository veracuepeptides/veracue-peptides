'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'

interface AnimatedWishlistHeartProps {
  /** Currently in the wishlist (renders the filled/bounced heart state) */
  inWishlist: boolean
  /** A wishlist request is in flight (renders a spinner instead of the heart) */
  isPending?: boolean
  /** Fire the glow + shockwave rings + particle burst once (flip true -> false) */
  showBurst: boolean
  /** Icon size in px */
  size?: number
}

/**
 * The wishlist "add" celebration — a soft glow flash, two staggered shockwave
 * rings, and a 16-particle burst, plus a springy heart bounce. Drop this
 * inside any `relative` (ideally `overflow-visible`) wishlist button so every
 * wishlist toggle in the app celebrates the same way, regardless of that
 * button's own size/shape/colors.
 */
export function AnimatedWishlistHeart({ inWishlist, isPending = false, showBurst, size = 18 }: AnimatedWishlistHeartProps) {
  return (
    <>
      {/* Soft radial glow flash */}
      <AnimatePresence>
        {showBurst && (
          <motion.span
            key="glow"
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 4.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(203,153,126,0.55) 0%, rgba(203,153,126,0) 70%)' }}
          />
        )}
      </AnimatePresence>

      {/* Expanding shockwave rings (double, staggered) */}
      <AnimatePresence>
        {showBurst && (
          <>
            <motion.span
              key="ring1"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 3.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#cb997e] pointer-events-none"
            />
            <motion.span
              key="ring2"
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 2.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.12 }}
              className="absolute inset-0 rounded-full border-2 border-[#a5a58d] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Radiating particle burst */}
      <AnimatePresence>
        {showBurst && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[...Array(16)].map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180
              const isAccent = i % 2 === 0
              const distance = isAccent ? 70 : 52
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1.8, 0],
                    opacity: [1, 1, 0],
                    rotate: isAccent ? 180 : -90,
                  }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: i * 0.02 }}
                  className={`absolute rounded-full ${isAccent ? 'w-2.5 h-2.5 bg-[#cb997e]' : 'w-1.5 h-1.5 bg-[#a5a58d]'}`}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {isPending ? (
        <Loader2 style={{ width: size, height: size }} className="animate-spin relative z-10" />
      ) : (
        <motion.span
          animate={inWishlist ? { scale: [1, 1.9, 0.75, 1.25, 1], rotate: [0, -18, 14, -6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center justify-center relative z-10"
        >
          <Heart style={{ width: size, height: size }} strokeWidth={2} fill={inWishlist ? 'currentColor' : 'none'} />
        </motion.span>
      )}
    </>
  )
}
