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

export function BmiBmrCalculator() {
  const t = useTranslations('calculator.bmiBmr')
  const [system, setSystem] = useState<System>('imperial');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('30');
  
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('10');
  const [lbs, setLbs] = useState('170');
  
  const [cm, setCm] = useState('178');
  const [kg, setKg] = useState('77');

  const handleSystemChange = (newSystem: System) => {
    if (newSystem === system) return;
    
    if (newSystem === 'metric') {
      const f = parseInt(feet) || 0;
      const i = parseInt(inches) || 0;
      const hCm = (f * 12 + i) * 2.54;
      setCm(Math.round(hCm).toString());
      const wKg = (parseFloat(lbs) || 0) / 2.20462;
      setKg(wKg.toFixed(1));
    } else {
      const hCm = parseFloat(cm) || 0;
      const totalInches = hCm / 2.54;
      const f = Math.floor(totalInches / 12);
      const i = Math.round(totalInches % 12);
      setFeet(f.toString());
      setInches(i.toString());
      const wKg = parseFloat(kg) || 0;
      const wLbs = wKg * 2.20462;
      setLbs(Math.round(wLbs).toString());
    }
    setSystem(newSystem);
  }

  let heightCm = 0;
  let weightKg = 0;
  const parsedAge = parseInt(age) || 0;

  if (system === 'imperial') {
    const f = parseInt(feet) || 0;
    const i = parseInt(inches) || 0;
    heightCm = (f * 12 + i) * 2.54;
    weightKg = (parseFloat(lbs) || 0) / 2.20462;
  } else {
    heightCm = parseFloat(cm) || 0;
    weightKg = parseFloat(kg) || 0;
  }

  let bmi = 0;
  let bmr = 0;
  let category = '—';
  let categoryBadgeBg = 'bg-[#eddcd2]/50 text-neutral-600';

  if (heightCm > 0 && weightKg > 0 && parsedAge > 0) {
    const heightM = heightCm / 100;
    bmi = weightKg / (heightM * heightM);
    
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * parsedAge;
    bmr += (gender === 'male' ? 5 : -161);

    if (bmi < 18.5) { 
      category = t('categoryUnderweight'); 
      categoryBadgeBg = 'bg-[#eddcd2] text-[#20221c]'; 
    } else if (bmi < 25) { 
      category = t('categoryNormal'); 
      categoryBadgeBg = 'bg-[#55724a]/15 text-[#55724a]'; 
    } else if (bmi < 30) { 
      category = t('categoryOverweight'); 
      categoryBadgeBg = 'bg-[#cb997e]/20 text-[#cb997e]'; 
    } else { 
      category = t('categoryObese'); 
      categoryBadgeBg = 'bg-red-500/15 text-red-700'; 
    }
  }

  const isValid = bmi > 0;
  const minBmi = 15;
  const maxBmi = 40;
  const pointerPercentage = isValid ? Math.max(0, Math.min(100, ((bmi - minBmi) / (maxBmi - minBmi)) * 100)) : 0;

  return (
    <section className="w-full rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-14 font-sans">
      
      {/* Left: Conversational Form */}
      <div className="flex-1 flex flex-col justify-center">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d]" />
              <span>BMI &amp; BMR Calculator</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Imperial / Metric Pill Toggle */}
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
                  setAge('30'); setFeet('5'); setInches('10'); setLbs('170'); setCm('178'); setKg('77');
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
            standing
            {system === 'imperial' ? (
              <> <DynamicInput value={feet} onChange={setFeet} /> ft <DynamicInput value={inches} onChange={setInches} /> in </>
            ) : (
              <> <DynamicInput value={cm} onChange={setCm} minWidth={3} /> cm </>
            )}
            tall, weighing 
            {system === 'imperial' ? (
              <> <DynamicInput value={lbs} onChange={setLbs} minWidth={3} /> lbs. </>
            ) : (
              <> <DynamicInput value={kg} onChange={setKg} minWidth={3} /> kg. </>
            )}
          </div>

          <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
            *Mifflin-St Jeor formula applied for basal metabolic rate. Standard WHO criteria for adult body mass index calculation.
          </p>
        </FadeUp>
      </div>

      {/* Right: Result Display */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col gap-4">
        
        {/* BMI Card */}
        <FadeUp delay={0.15} className="flex-1">
          <div className="bg-[#20221c] rounded-2xl border border-[#32352a] p-6 flex flex-col items-center justify-center text-center shadow-lg min-h-[190px] relative text-[#fff1e6]">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-[#a5a58d] text-[10.5px] mb-2">
              Body Mass Index (BMI)
            </span>
            
            <div className="relative w-full flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={isValid ? bmi.toFixed(1) : 'empty'}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl sm:text-6xl font-price font-bold text-white tracking-tight leading-none mb-2"
                >
                  {isValid ? bmi.toFixed(1) : '—'}
                </motion.div>
              </AnimatePresence>
              
              <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${categoryBadgeBg}`}>
                {category}
              </span>
            </div>

            {/* BMI Range Bar */}
            <div className="w-full max-w-[240px] relative h-2 rounded-full overflow-visible mt-1 flex">
              <div className="h-full w-[14%] bg-[#ddbea9] rounded-l-full" />
              <div className="h-full w-[26%] bg-[#55724a]" />
              <div className="h-full w-[20%] bg-[#cb997e]" />
              <div className="h-full w-[40%] bg-neutral-700 rounded-r-full" />
              
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#20221c] rounded-full shadow-md z-10"
                style={{ left: `calc(${pointerPercentage}% - 8px)` }}
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: `calc(${pointerPercentage}% - 8px)`, opacity: isValid ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
            </div>
            
            <div className="w-full max-w-[240px] flex justify-between mt-1 text-[8.5px] font-price font-bold text-neutral-400 uppercase">
              <span>15</span>
              <span>40+</span>
            </div>
          </div>
        </FadeUp>

        {/* BMR Card */}
        <FadeUp delay={0.25} className="flex-1">
          <div className="bg-[#20221c] rounded-2xl border border-[#32352a] p-6 flex flex-col items-center justify-center text-center shadow-lg min-h-[170px] text-[#fff1e6]">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-[#a5a58d] text-[10.5px] mb-2">
              Basal Metabolic Rate
            </span>
            
            <div className="relative w-full flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={isValid ? Math.round(bmr) : 'empty2'}
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-price font-bold text-[#cb997e] tracking-tight leading-none mb-1.5"
                >
                  {isValid ? Math.round(bmr).toLocaleString() : '—'}
                </motion.div>
              </AnimatePresence>
              <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-400">
                Calories / Day
              </div>
            </div>
          </div>
        </FadeUp>

      </div>

    </section>
  )
}
