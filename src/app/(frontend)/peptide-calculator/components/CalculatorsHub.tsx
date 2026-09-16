'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { PeptideReconstitution } from './PeptideReconstitution'
import { BmiBmrCalculator } from './BmiBmrCalculator'
import { UnitConverter } from './UnitConverter'
import { CreatinineClearance } from './CreatinineClearance'
import { FadeUp } from '@/components/motion/FadeUp'
import { Syringe, Scale, ArrowRightLeft, FlaskConical } from 'lucide-react'

type CalculatorTab = 'reconstitution' | 'bmi' | 'unit' | 'creatinine';

export function CalculatorsHub() {
  const t = useTranslations('calculator.hub')
  const [activeTab, setActiveTab] = useState<CalculatorTab>('reconstitution');

  const TABS: { id: CalculatorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'reconstitution', label: t('tabReconstitution'), icon: <Syringe className="w-4 h-4" /> },
    { id: 'bmi', label: t('tabBmiBmr'), icon: <Scale className="w-4 h-4" /> },
    { id: 'unit', label: t('tabUnitConverter'), icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: 'creatinine', label: t('tabCreatinineClearance'), icon: <FlaskConical className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-8 sm:pt-12 pb-16 sm:pb-24 relative z-10 font-sans">
      
      <FadeUp className="w-full max-w-5xl mx-auto mb-8 sm:mb-12 flex justify-center px-3 sm:px-6">
        {/* Navigation Tabs - Olive Green & Clean White Design */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-white rounded-2xl border border-[#b7b7a4]/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative group z-20">
          
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-[13.5px] font-sans font-bold transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-neutral-700 hover:text-neutral-950 hover:bg-[#a5a58d]/15'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#a5a58d] rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                
                {/* Icon Container with subtle pop */}
                <div className={`relative z-10 shrink-0 flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110 text-white' : 'text-[#a5a58d]'}`}>
                  {tab.icon}
                </div>
                
                {/* Label with slide effect */}
                <span className={`relative z-10 hidden sm:inline-block transition-transform duration-300 ${isActive ? 'translate-x-0.5' : ''}`}>
                  {tab.label}
                </span>
                
                {/* Active dot indicator for mobile instead of full text */}
                {isActive && <div className="sm:hidden w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                
                {/* Mobile Animated Bubble Popup */}
                <AnimatePresence>
                  {isActive && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 sm:hidden pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="bg-[#a5a58d] text-white border border-[#b7b7a4]/50 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-lg whitespace-nowrap flex items-center justify-center relative"
                      >
                        {tab.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#a5a58d] rotate-45 border-r border-b border-[#b7b7a4]/50" />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>
      </FadeUp>

      {/* Calculator Content Area - Full Width matching Header */}
      <div className="w-full mx-auto min-h-[520px] relative px-3 sm:px-6 md:px-10">
        <AnimatePresence mode="wait">
          {activeTab === 'reconstitution' && (
            <motion.div
              key="reconstitution"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <PeptideReconstitution />
            </motion.div>
          )}
          {activeTab === 'bmi' && (
            <motion.div
              key="bmi"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <BmiBmrCalculator />
            </motion.div>
          )}
          {activeTab === 'unit' && (
            <motion.div
              key="unit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <UnitConverter />
            </motion.div>
          )}
          {activeTab === 'creatinine' && (
            <motion.div
              key="creatinine"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <CreatinineClearance />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
