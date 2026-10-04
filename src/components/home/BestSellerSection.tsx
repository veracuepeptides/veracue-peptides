'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { HeroButton } from '@/components/ui/hero-button'
import { useTranslations } from 'next-intl'
import { ProductCard } from '@/components/shared/ProductCard'

export function BestSellerSection({ products = [] }: { products?: any[] }) {
  const t = useTranslations('home.bestSeller')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Real products only (the caller already tops up with other live products).
  const displayProducts = products.slice(0, 8)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (card) {
        const scrollAmount = card.offsetWidth + 24;
        scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }
  }

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDraggingRef = useRef(false);
  const isHovered = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      // Pause auto-scroll when user is dragging or hovering over any card
      if (!isDown.current && !isHovered.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDown.current = true;
    isDraggingRef.current = false;
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.scrollSnapType = 'none';
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    isHovered.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current);
    if (Math.abs(walk) > 10) {
      isDraggingRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (displayProducts.length === 0) return null

  return (
    <section className="font-sans relative z-30 py-10 sm:py-14 md:py-18 px-3 sm:px-6 md:px-10 bg-[#f0efeb]">
      <div className="bg-[#eddcd2]/30 border border-[#eddcd2] rounded-2xl md:rounded-[18px] p-5 sm:p-8 md:p-12 lg:p-14 w-full mx-auto overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        
        {/* Header Split */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 sm:mb-12 md:mb-14 gap-5 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-block border border-[#eddcd2] rounded-full max-w-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 bg-white shadow-sm">
              <span className="text-[#6b705c] text-[9px] xs:text-[9.5px] sm:text-xs font-bold tracking-[0.02em] xs:tracking-[0.06em] sm:tracking-[0.2em] uppercase font-editorial whitespace-nowrap">{t('eyebrow')}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.08] tracking-tight uppercase">
              {t('title')}
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative -mx-5 sm:-mx-8 md:-mx-12 lg:-mx-14 px-5 sm:px-8 md:px-12 lg:px-14">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 pt-2 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={(e) => {
              if (isDraggingRef.current) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
          >
            {displayProducts.map((product, idx) => (
              <div 
                key={`${product.slug || product.key}-${idx}`}
                className="shrink-0 w-[80vw] max-w-[310px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start snap-always"
                onMouseEnter={() => { isHovered.current = true; }}
                onMouseLeave={() => { isHovered.current = false; }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions - Mobile & Tablet Responsive */}
        <div className="mt-6 sm:mt-8 flex flex-row justify-between items-center gap-3 sm:gap-5 w-full">
          {/* CTA Button - Matches Hero button sizing and responsive behavior */}
          <HeroButton href="/shop">
            {t('ctaText')}
          </HeroButton>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => scroll('left')} 
              aria-label="Previous product" 
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#a5a58d] border border-[#a5a58d] flex items-center justify-center hover:bg-[#8f8f75] hover:border-[#8f8f75] transition-colors shadow-sm text-white active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              aria-label="Next product" 
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#a5a58d] border border-[#a5a58d] flex items-center justify-center hover:bg-[#8f8f75] hover:border-[#8f8f75] transition-colors shadow-sm text-white active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        
      </div>
    </section>
  )
}
