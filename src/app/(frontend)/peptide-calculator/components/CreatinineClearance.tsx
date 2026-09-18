'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeUp } from '@/components/motion/FadeUp'
import { RefreshCw, ChevronDown } from 'lucide-react'

type System = 'imperial' | 'metric';
type Gender = 'male' | 'female';

const DynamicInput = ({ value, onChange, minWidth = 2 }: { value: string, onChange: (v: string) => void, minWidth?: number }) => (
  <input 
    type="text" 
    value={value} 
    onChange={(e) => {
      const val = e.target.value;
      if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
        onChange(val);
      }
    }} 
    className="bg-transparent border-b-2 border-[#eddcd2] hover:border-[#cb997e]/60 text-[#cb997e] focus:outline-none focus:border-[#cb997e] px-1.5 mx-1 text-center font-price font-bold transition-colors inline-block"
    style={{ width: `${Math.max(minWidth, value.length || 1) + 0.6}ch` }}
  />
)

const DynamicSelect = ({ value, options, onChange }: { value: string, options: {label: string, value: string}[], onChange: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(o => o.value == value)?.label;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block mx-1" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-b-2 border-[#eddcd2] hover:border-[#cb997e]/60 text-[#cb997e] focus:outline-none focus:border-[#cb997e] px-1.5 mx-1 font-sans font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 8, scale: 0.96 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#fff1e6] rounded-2xl shadow-xl border border-[#eddcd2] overflow-hidden z-50 min-w-[130px]"
          >
            <div className="flex flex-col p-1">
              {options.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => { onChange(String(opt.value)); setIsOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-bold transition-colors cursor-pointer ${
                    value == opt.value ? 'bg-[#20221c] text-[#fff1e6]' : 'text-neutral-800 hover:bg-[#eddcd2]/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CreatinineClearance() {
  const t = useTranslations('calculator.creatinineClearance')
  const [system, setSystem] = useState<System>('imperial');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('50');
  const [lbs, setLbs] = useState('170');
  const [kg, setKg] = useState('77');
  const [creatinine, setCreatinine] = useState('1.2');

  const handleSystemChange = (newSystem: System) => {
    if (newSystem === system) return;
    
    if (newSystem === 'metric') {
      const wKg = (parseFloat(lbs) || 0) / 2.20462;
      setKg(wKg.toFixed(1));
    } else {
      const wKg = parseFloat(kg) || 0;
      const wLbs = wKg * 2.20462;
      setLbs(Math.round(wLbs).toString());
    }
    
    setSystem(newSystem);
  }

  let weightKg = 0;
  if (system === 'imperial') {
    weightKg = (parseFloat(lbs) || 0) / 2.20462;
  } else {
    weightKg = parseFloat(kg) || 0;
  }

  const parsedAge = parseInt(age) || 0;
  const parsedCreatinine = parseFloat(creatinine) || 0;

  let crcl = 0;
  let category = '—';
  let categoryBadgeBg = 'bg-[#eddcd2]/50 text-neutral-600';

  if (parsedAge > 0 && weightKg > 0 && parsedCreatinine > 0) {
    crcl = ((140 - parsedAge) * weightKg) / (72 * parsedCreatinine);
    if (gender === 'female') {
      crcl *= 0.85;
    }

    if (crcl > 90) { 
      category = t('categoryNormalOrHigh'); 
      categoryBadgeBg = 'bg-[#55724a]/15 text-[#55724a]'; 
    } else if (crcl >= 60) { 
      category = t('categoryMildlyDecreased'); 
      categoryBadgeBg = 'bg-[#ddbea9]/30 text-[#20221c]'; 
    } else if (crcl >= 45) { 
      category = t('categoryMildToModerateDecrease'); 
      categoryBadgeBg = 'bg-[#cb997e]/20 text-[#cb997e]'; 
    } else if (crcl >= 30) { 
      category = t('categoryModerateToSevereDecrease'); 
      categoryBadgeBg = 'bg-[#cb997e]/30 text-[#cb997e]'; 
    } else if (crcl >= 15) { 
      category = t('categorySeverelyDecreased'); 
      categoryBadgeBg = 'bg-red-500/15 text-red-600'; 
    } else { 
      category = t('categoryKidneyFailure'); 
      categoryBadgeBg = 'bg-red-600/20 text-red-700'; 
    }
  }

  const isValid = crcl > 0;
  const maxCrCl = 150;
  const pointerPercentage = isValid ? Math.max(0, Math.min(100, (crcl / maxCrCl) * 100)) : 0;

  return (
    <section className="w-full rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-14 font-sans">
      
      {/* Left: Conversational Form */}
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d]" />
              <span>Creatinine Clearance Calculator</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-[#f0efeb] p-1 rounded-xl border border-[#b7b7a4]/50">
                {(['imperial', 'metric'] as System[]).map(sys => (
                  <button
                    type="button"
                    key={sys}
                    onClick={() => handleSystemChange(sys)}
                    className={`px-3 py-1 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      system === sys 
                        ? 'bg-[#a5a58d] text-white shadow-2xs' 
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setAge('50'); setLbs('170'); setKg('77'); setCreatinine('1.2');
                }}
                className="w-8 h-8 rounded-full border border-[#b7b7a4]/50 bg-[#f0efeb] hover:bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs"
                title="Reset parameters"
                aria-label="Reset parameters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-heading font-light text-neutral-900 tracking-tight leading-[1.7] md:leading-[1.75]">
            For a subject who is <DynamicInput value={age} onChange={setAge} /> years old,
            <DynamicSelect
              value={gender}
              onChange={(v) => setGender(v as Gender)}
              options={[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}]}
            />,
            weighing
            {system === 'imperial' ? (
              <> <DynamicInput value={lbs} onChange={setLbs} minWidth={3} /> lbs, </>
            ) : (
              <> <DynamicInput value={kg} onChange={setKg} minWidth={3} /> kg, </>
            )}
            with a serum creatinine of <DynamicInput value={creatinine} onChange={setCreatinine} minWidth={3} /> mg/dL.
          </div>

          <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
            *Cockcroft-Gault equation applied. Estimates creatinine clearance (CrCl) as a research proxy for Glomerular Filtration Rate (GFR).
          </p>
        </FadeUp>
      </div>

      {/* Right: Result Display */}
      <div className="w-full lg:w-[420px] shrink-0">
        <FadeUp delay={0.15} className="h-full">
          <div className="bg-[#20221c] rounded-2xl border border-[#32352a] p-6 sm:p-8 flex flex-col items-center justify-center text-center h-full shadow-lg min-h-[360px] relative text-[#fff1e6]">
            
            <span className="absolute top-8 font-sans font-bold uppercase tracking-[0.2em] text-[#a5a58d] text-[10.5px]">
              Estimated CrCl
            </span>
            
            <div className="relative w-full flex flex-col items-center mt-6">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={isValid ? crcl.toFixed(1) : 'empty'}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl sm:text-7xl font-price font-bold text-[#cb997e] tracking-tight leading-none mb-2"
                >
                  {isValid ? crcl.toFixed(1) : '—'}
                </motion.div>
              </AnimatePresence>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-600 mb-6">
                mL / min
              </div>
            </div>

            {/* Dynamic Kidney Function Gauge */}
            <div className="w-full max-w-[260px] mt-2 mb-6">
              <div className="w-full relative h-2 rounded-full flex overflow-visible">
                <div className="h-full w-[10%] bg-red-600 rounded-l-full" />
                <div className="h-full w-[10%] bg-red-400" />
                <div className="h-full w-[10%] bg-[#cb997e]" />
                <div className="h-full w-[10%] bg-[#ddbea9]" />
                <div className="h-full w-[20%] bg-[#a5a58d]" />
                <div className="h-full w-[40%] bg-[#55724a] rounded-r-full" />
                
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#20221c] rounded-full shadow-md z-10"
                  style={{ left: `calc(${pointerPercentage}% - 8px)` }}
                  initial={{ left: 0, opacity: 0 }}
                  animate={{ left: `calc(${pointerPercentage}% - 8px)`, opacity: isValid ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </div>
              <div className="w-full flex justify-between mt-1 text-[8.5px] font-price font-bold text-neutral-400 uppercase">
                <span>0</span>
                <span>150+</span>
              </div>
            </div>

            <div className="w-full text-center mt-auto border-t border-[#eddcd2] pt-4">
              <div className="text-[10px] uppercase font-sans font-bold text-neutral-500 mb-1 tracking-widest">
                Renal Function Reference Range
              </div>
              <span className={`inline-block text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full ${categoryBadgeBg}`}>
                {category}
              </span>
            </div>

          </div>
        </FadeUp>
      </div>

    </section>
  )
}
