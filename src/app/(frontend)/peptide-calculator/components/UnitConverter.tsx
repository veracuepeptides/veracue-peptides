'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeUp } from '@/components/motion/FadeUp'
import { RefreshCw, ArrowRight, ChevronDown } from 'lucide-react'

type Unit = 'mg' | 'mcg' | 'mL' | 'IU';

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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#fff1e6] rounded-2xl shadow-xl border border-[#eddcd2] overflow-hidden z-50 min-w-[120px]"
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

export function UnitConverter() {
  const t = useTranslations('calculator.unitConverter')
  
  const [val, setVal] = useState('5');
  const [fromUnit, setFromUnit] = useState<Unit>('mg');
  const [toUnit, setToUnit] = useState<Unit>('mcg');

  const handleFromChange = (newFrom: string) => {
    const unit = newFrom as Unit;
    setFromUnit(unit);
    if (unit === 'mg' && toUnit !== 'mcg' && toUnit !== 'mg') setToUnit('mcg');
    if (unit === 'mcg' && toUnit !== 'mg' && toUnit !== 'mcg') setToUnit('mg');
    if (unit === 'mL' && toUnit !== 'IU' && toUnit !== 'mL') setToUnit('IU');
    if (unit === 'IU' && toUnit !== 'mL' && toUnit !== 'IU') setToUnit('mL');
  }

  const getToOptions = () => {
    if (fromUnit === 'mg' || fromUnit === 'mcg') {
      return [{label: 'mg', value: 'mg'}, {label: 'mcg', value: 'mcg'}];
    }
    return [{label: 'mL', value: 'mL'}, {label: 'IU', value: 'IU'}];
  }

  const numericVal = parseFloat(val) || 0;
  let result = 0;
  let formattedResult = '—';

  if (numericVal > 0) {
    if (fromUnit === 'mg' && toUnit === 'mcg') result = numericVal * 1000;
    else if (fromUnit === 'mcg' && toUnit === 'mg') result = numericVal / 1000;
    else if (fromUnit === 'mL' && toUnit === 'IU') result = numericVal * 100;
    else if (fromUnit === 'IU' && toUnit === 'mL') result = numericVal / 100;
    else result = numericVal; 
    
    formattedResult = result.toLocaleString(undefined, { maximumFractionDigits: 3 });
  }

  return (
    <section className="w-full rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-14 font-sans">
      
      {/* Left: Conversational Form */}
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d]" />
              <span>Universal Unit Converter</span>
            </div>
            
            <button
              type="button"
              onClick={() => { setVal('5'); setFromUnit('mg'); setToUnit('mcg'); }}
              className="w-8 h-8 rounded-full border border-[#b7b7a4]/50 bg-[#f0efeb] hover:bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
              title="Reset parameters"
              aria-label="Reset parameters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-heading font-light text-neutral-900 tracking-tight leading-[1.7] md:leading-[1.75] relative z-10">
            I want to convert <DynamicInput value={val} onChange={setVal} /> 
            <DynamicSelect 
              value={fromUnit} 
              onChange={handleFromChange}
              options={[{label: 'mg', value: 'mg'}, {label: 'mcg', value: 'mcg'}, {label: 'mL', value: 'mL'}, {label: 'IU', value: 'IU'}]} 
            /> 
            into 
            <DynamicSelect 
              value={toUnit} 
              onChange={(v) => setToUnit(v as Unit)}
              options={getToOptions()} 
            />.
          </div>

          <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
            *Instant bidirectional conversion between mass (mg &bull; mcg) and volumetric liquid units (mL &bull; IU).
          </p>
        </FadeUp>
      </div>

      {/* Right: Result Display */}
      <div className="w-full lg:w-[420px] shrink-0">
        <FadeUp delay={0.15} className="h-full">
          <div className="bg-[#20221c] rounded-2xl border border-[#32352a] p-8 md:p-10 flex flex-col items-center justify-center text-center h-full shadow-lg min-h-[360px] relative text-[#fff1e6]">
            
            <span className="absolute top-8 font-sans font-bold uppercase tracking-[0.2em] text-[#a5a58d] text-[10.5px]">
              Converted Result
            </span>
            
            {/* Visual Conversion Graphic */}
            <div className="flex items-center gap-5 my-8">
               <div className="text-2xl sm:text-3xl font-heading font-extrabold text-neutral-400 uppercase">
                 {fromUnit}
               </div>
               <div className="w-16 h-px bg-[#eddcd2] relative flex items-center justify-center">
                  <motion.div 
                    animate={{ x: [-8, 8, -8] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <ArrowRight className="w-4 h-4 text-[#cb997e]" />
                  </motion.div>
               </div>
               <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#cb997e] uppercase">
                 {toUnit}
               </div>
            </div>

            <div className="relative w-full flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={formattedResult + toUnit}
                  initial={{ scale: 0.88, opacity: 0, y: 8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="text-6xl sm:text-7xl font-price font-bold text-[#cb997e] tracking-tight leading-none mb-3"
                >
                  {formattedResult}
                </motion.div>
              </AnimatePresence>
              
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-600">
                {toUnit}
              </div>
            </div>

            {fromUnit === 'mL' && toUnit === 'IU' && (
              <div className="absolute bottom-6 text-[10.5px] font-sans font-bold uppercase tracking-widest text-neutral-400">
                *Assumes standard U-100 syringe
              </div>
            )}
            
          </div>
        </FadeUp>
      </div>

    </section>
  )
}
