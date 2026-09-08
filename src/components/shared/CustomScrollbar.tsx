'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useCartStore } from '@/lib/cart/store'

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll()
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)

  const isCartOpen = useCartStore((state) => state.isOpen)
  const lenis = useLenis()

  // macOS / iOS auto-hide: visible while scrolling or hovering, discrete when idle
  useEffect(() => {
    return scrollYProgress.on('change', () => {
      setScrolling(true)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
      hideTimeout.current = setTimeout(() => {
        setScrolling(false)
      }, 1100)
    })
  }, [scrollYProgress])

  // Hide when mobile menu is open
  useEffect(() => {
    const checkMenu = () => {
      setIsMenuOpen(document.body.classList.contains('mobile-menu-open'))
    }
    const observer = new MutationObserver(checkMenu)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const trackerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const trackerTranslateY = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

  if (isCartOpen || isMenuOpen) return null

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = Math.max(0, Math.min(1, clickY / rect.height))

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    if (lenis) {
      lenis.scrollTo(scrollableHeight * percentage, { lerp: 0.08 })
    } else {
      window.scrollTo({ top: scrollableHeight * percentage, behavior: 'smooth' })
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.current = true
    setDragging(true)
    document.body.style.userSelect = 'none'

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    let y = e.clientY - rect.top
    y = Math.max(0, Math.min(y, rect.height))
    const percentage = y / rect.height

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

    if (lenis) {
      lenis.scrollTo(scrollableHeight * percentage, { immediate: false, lerp: 0.12 })
    } else {
      window.scrollTo({ top: scrollableHeight * percentage, behavior: 'auto' })
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    setDragging(false)
    document.body.style.userSelect = ''
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  const isVisible = scrolling || hovered || dragging

  return (
    <div className="fixed top-3 bottom-3 right-1 sm:right-1.5 z-[9999] hidden sm:flex pointer-events-none print:hidden select-none">
      {/* Interactive Rail Track */}
      <div
        ref={trackRef}
        className="relative h-full w-5 pointer-events-auto cursor-pointer flex justify-center items-center group"
        onClick={handleTrackClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Whisper-subtle Track Rail on Hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-[2.5px] h-full rounded-full bg-[#20221c]/8"
        />

        {/* Minimalist Floating Luxury Thumb */}
        <motion.div
          className="absolute right-[8px] pointer-events-auto flex items-center cursor-grab active:cursor-grabbing"
          style={{
            top: trackerTop,
            y: trackerTranslateY,
          }}
          onPointerDown={handlePointerDown}
        >
          {/* Expanded Touch/Click Area */}
          <div className="absolute inset-[-12px] bg-transparent" />

          {/* Precision Capsule */}
          <motion.div
            animate={{
              opacity: isVisible ? 1 : 0.15,
              height: dragging ? 64 : hovered ? 50 : 38,
              width: dragging ? 5 : hovered ? 5 : 3.5,
              backgroundColor: dragging
                ? 'rgba(32, 34, 28, 0.85)'
                : hovered
                ? 'rgba(32, 34, 28, 0.65)'
                : 'rgba(32, 34, 28, 0.38)',
            }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 26,
              opacity: { duration: 0.3 },
            }}
            className="rounded-full backdrop-blur-md border border-white/30 shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
          />
        </motion.div>
      </div>
    </div>
  )
}
