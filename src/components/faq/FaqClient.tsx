'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { faqData } from '@/data/faqs'
import { FaqCategorySection } from './FaqCategorySection'
import { FaqHero } from './FaqHero'

export function FaqClient() {
  const t = useTranslations('content.faqClient')
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0]?.category || '');
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(115); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.querySelector('.fixed.top-0.inset-x-0.z-sticky');
      if (headerEl) {
        setHeaderHeight(headerEl.getBoundingClientRect().height);
      }
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    const observer = new MutationObserver(updateHeaderHeight);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 20) {
      if (difference > 0 && y > 150) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      lastYRef.current = y;
    }
  });

  // Intersection Observer for highlighting active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSection = entry.target.getAttribute('data-category');
            break; 
          }
        }
        if (visibleSection && !searchQuery) {
          setActiveCategory(visibleSection);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [searchQuery]);

  // Auto-scroll active pill into view when activeCategory changes
  useEffect(() => {
    const container = pillContainerRef.current;
    if (!container || !activeCategory) return;
    
    const slug = activeCategory.replace(/\s+/g, '-').toLowerCase();
    const activeButton = document.getElementById(`pill-category-${slug}`);
    
    if (activeButton) {
      // Calculate scroll position to center the button
      const scrollLeft = activeButton.offsetLeft - (container.clientWidth / 2) + (activeButton.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(`faq-category-${category.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      // Dynamic offset
      const offset = 180;
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      
      const html = document.documentElement;
      html.style.setProperty('scroll-behavior', 'auto', 'important');
      window.scrollTo(0, y);
      html.style.removeProperty('scroll-behavior');
    }
  };

  // Filter logic
  const filteredFaqData = faqData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="bg-[#FAFAFA] min-h-screen relative font-sans text-ink">
      
      {/* Hero Header */}
      <FaqHero />

      {/* Search Bar */}
      <section className="px-4 md:px-6 mt-12 max-w-2xl mx-auto w-full relative z-30">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <input 
            type="text" 
            placeholder={false ? 'Buscar preguntas...' : 'Search questions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full px-6 py-4 pl-12 rounded-full border border-ink/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-ink placeholder-ink/40 font-medium text-sm md:text-base"
          />
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </section>

      {/* Floating Filter Pills */}
      {!searchQuery && (
        <section 
          className="sticky z-40 px-4 md:px-6 mb-12 mt-12 w-full mx-auto flex justify-center transition-all duration-300 ease-out"
          style={{ top: headerHidden ? '20px' : `${headerHeight + 20}px` }}
        >
          <div className="relative flex w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-full shadow-md border border-ink/10">
            <div 
              ref={pillContainerRef}
              className="flex items-center gap-2 overflow-x-auto snap-x p-2 relative z-0 rounded-full min-w-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
              {filteredFaqData.map((categoryData) => (
                <button
                  key={categoryData.category}
                  id={`pill-category-${categoryData.category.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => scrollToCategory(categoryData.category)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 snap-center shrink-0 relative z-20 ${
                    activeCategory === categoryData.category
                      ? 'bg-ink text-white shadow-md' 
                      : 'bg-transparent text-ink/60 hover:text-ink hover:bg-ink/5'
                  }`}
                >
                  {categoryData.category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1600px] mx-auto flex flex-col relative pb-32">
        {/* Main Content */}
        <main className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="w-full">
            {filteredFaqData.length > 0 ? (
              filteredFaqData.map((categoryData, i) => (
                <div 
                  key={categoryData.category}
                  id={`faq-category-${categoryData.category.replace(/\s+/g, '-').toLowerCase()}`}
                  data-category={categoryData.category}
                  ref={(el) => { sectionRefs.current[i] = el; }}
                  className="pt-8 scroll-mt-[180px]"
                >
                  <FaqCategorySection category={categoryData} />
                </div>
              ))
            ) : (
              <div className="w-full py-24 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-ink/5 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-ink mb-2">
                  {false ? 'No se encontraron resultados' : 'No results found'}
                </h3>
                <p className="text-ink/60 max-w-md">
                  {false 
                    ? 'No pudimos encontrar ninguna pregunta frecuente que coincida con tu búsqueda. Intenta con otras palabras.' 
                    : 'We couldn\'t find any FAQs matching your search. Try different keywords.'}
                </p>
              </div>
            )}
            
            {/* Research Disclaimer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mt-24 pt-8"
            >
              <div className="relative overflow-hidden rounded-3xl bg-ink/10 p-[1px] group transition-all duration-500 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative bg-ink h-full w-full rounded-[23px] p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 overflow-hidden">
                  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15] mix-blend-screen z-0">
                    <filter id="faq-noise">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#faq-noise)" />
                  </svg>
                  
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  
                  <div className="relative z-10 text-cream/70 text-sm md:text-base font-light leading-relaxed">
                    <span className="font-heading font-bold text-primary tracking-[0.15em] uppercase text-xs block mb-1.5">
                      {t('disclaimerLabel')}
                    </span>
                    {t.rich('disclaimerText', {
                      strong: (chunks) => <strong className="text-white font-medium">{chunks}</strong>,
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

