'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FaqCategoryType, FaqItemType } from '@/data/faqs'

const FaqItem = ({ 
  faq, 
  index,
}: { 
  faq: FaqItemType; 
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const num = (index + 1).toString().padStart(2, '0');

  return (
    <React.Fragment>
      {index !== 0 && <div className="w-full h-px bg-ink/5 my-2" />}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="py-5 lg:py-6 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl group cursor-pointer transition-colors duration-300 hover:bg-ink/[0.03]"
        onClick={() => setIsOpen(!isOpen)}
      >
      <div className="flex flex-col w-full justify-between items-start">
        
        {/* Top: Num + Question + Icon */}
        <div className="flex w-full items-start justify-between gap-4 sm:gap-6">
          <div className="flex flex-1 gap-4 sm:gap-6 items-start">
            <span className="font-heading text-lg sm:text-xl font-medium text-ink/40 group-hover:text-primary transition-colors duration-300 shrink-0">
              {num}
            </span>
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tighter text-ink leading-tight pr-4">
              {faq.question}
            </h3>
          </div>
          
          <div className="flex-shrink-0 mt-1">
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-ink/60 group-hover:text-primary group-hover:border-primary/50 transition-colors bg-white"
            >
              <Plus className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Answer Content — always mounted (not conditionally rendered) so every answer ships
            in the server HTML. Non-JS crawlers (AI bots, etc.) never click to expand an
            accordion, so a conditionally-mounted answer is invisible to them; this page's
            entire value is ~150 Q&A pairs, so that would mean almost no crawlable content. */}
        <motion.div
           initial={false}
           animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
           className="overflow-hidden w-full pl-0 sm:pl-[3.25rem] pr-8 lg:pr-16"
        >
          <div
            className="text-ink/80 text-sm md:text-base leading-relaxed pt-4 pb-2 prose prose-sm max-w-none prose-a:text-primary hover:prose-a:text-primary-dark"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </motion.div>
      </div>
    </motion.div>
    </React.Fragment>
  );
};

export function FaqCategorySection({
  category,
}: {
  category: FaqCategoryType;
}) {
  return (
    <div className="mb-20">
      <h2 className="font-heading text-3xl sm:text-4xl font-black text-ink uppercase tracking-tighter mb-8 break-words flex items-center gap-4">
        {category.category}
        <div className="h-px bg-ink/10 flex-1 ml-4 hidden sm:block" />
      </h2>
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-ink/5">
        {category.items.map((faq, index) => (
          <FaqItem 
            key={index} 
            faq={faq} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

