'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeUp } from '@/components/motion/FadeUp'
import { RefreshCw, ChevronDown, Calculator, Sparkles } from 'lucide-react'

type SyringeVolume = 0.3 | 0.5 | 1.0;
type MassUnit = 'mg' | 'mcg';

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
    className="bg-transparent border-b-2 border-[#a5a58d] hover:border-[#20221c] text-neutral-900 focus:outline-none focus:border-[#cb997e] px-1.5 mx-1 text-center font-price font-bold transition-colors inline-block"
    style={{ width: `${Math.max(minWidth, value.length || 1) + 0.6}ch` }}
  />
)

const DynamicSelect = ({ value, options, onChange }: { value: string | number, options: {label: string, value: string | number}[], onChange: (v: string) => void }) => {
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
        className="bg-transparent border-b-2 border-[#a5a58d] hover:border-[#20221c] text-[#a5a58d] hover:text-neutral-900 focus:outline-none focus:border-[#cb997e] px-1.5 mx-1 font-sans font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
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
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-xl border border-[#b7b7a4]/50 overflow-hidden z-50 min-w-[130px]"
          >
            <div className="flex flex-col p-1">
              {options.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => { onChange(String(opt.value)); setIsOpen(false); }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans font-bold transition-colors cursor-pointer ${
                    value == opt.value ? 'bg-[#a5a58d] text-white' : 'text-neutral-800 hover:bg-[#f0efeb]'
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

export function PeptideReconstitution() {
  const t = useTranslations('calculator.main.tabs.reconstitution')

  const [peptideAmount, setPeptideAmount] = useState('5')
  const [waterMl, setWaterMl] = useState('2')
  const [desiredDose, setDesiredDose] = useState('250')
  const [doseUnit, setDoseUnit] = useState<MassUnit>('mcg')
  const [syringeVolume, setSyringeVolume] = useState<SyringeVolume>(1.0)

  const vAmt = parseFloat(peptideAmount) || 0
  const wMl = parseFloat(waterMl) || 0
  const dAmt = parseFloat(desiredDose) || 0

  const totalPeptideMcg = vAmt * 1000
  const targetDoseMcg = doseUnit === 'mg' ? dAmt * 1000 : dAmt

  const isValid = totalPeptideMcg > 0 && wMl > 0 && targetDoseMcg > 0
  let concentrationStr = '—'
  let volumePerDoseStr = '—'
  let tickMarksStr = '0'
  let errorMsg = ''
  let fillPercentage = 0
  const maxUnits = syringeVolume * 100

  if (isValid) {
    const concentration = totalPeptideMcg / wMl
    concentrationStr = `${concentration.toLocaleString(undefined, { maximumFractionDigits: 1 })} mcg/mL`
    
    const volumePerDose = targetDoseMcg / concentration
    volumePerDoseStr = `${volumePerDose.toLocaleString(undefined, { maximumFractionDigits: 3 })}mL`
    
    const tickMarks = volumePerDose * 100
    tickMarksStr = tickMarks.toLocaleString(undefined, { maximumFractionDigits: 1 })
    
    if (volumePerDose > syringeVolume) {
      errorMsg = t('doseExceedsCapacity', { doseVolume: volumePerDose.toFixed(2), syringeVolume })
      tickMarksStr = 'ERR'
      fillPercentage = 100
    } else {
      fillPercentage = (tickMarks / maxUnits) * 100
    }
  }

  const getSyringeTicks = () => {
    const steps = syringeVolume === 1.0 ? 10 : 5;
    const ticks = [];
    for (let i = maxUnits; i >= 0; i -= steps) {
      ticks.push(i);
    }
    return ticks;
  }

  return (
    <section className="w-full rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 border border-[#b7b7a4]/50 shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-14 font-sans">
      
      {/* Left: Interactive Conversational Form */}
      <div className="flex-1 flex flex-col justify-between">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/15 border border-[#a5a58d]/35 text-[#a5a58d] text-xs font-bold tracking-[0.2em] uppercase">
              <Calculator size={13} className="text-[#a5a58d]" />
              <span>Interactive Reconstitution Engine</span>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setPeptideAmount('5'); setWaterMl('2'); setDesiredDose('250'); setDoseUnit('mcg'); setSyringeVolume(1.0);
              }}
              className="w-8 h-8 rounded-full border border-[#b7b7a4]/50 bg-[#f0efeb] hover:bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
              title="Reset parameters"
              aria-label="Reset parameters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-heading font-light text-neutral-900 tracking-tight leading-[1.7] md:leading-[1.75]">
            I have a <DynamicInput value={peptideAmount} onChange={setPeptideAmount} /> mg vial of peptide. 
            I will reconstitute it using <DynamicInput value={waterMl} onChange={setWaterMl} /> mL of bacteriostatic water. 
            My desired dose is <DynamicInput value={desiredDose} onChange={setDesiredDose} minWidth={3} />
            <DynamicSelect 
              value={doseUnit} 
              onChange={(v) => setDoseUnit(v as MassUnit)}
              options={[{label: 'mcg', value: 'mcg'}, {label: 'mg', value: 'mg'}]} 
            /> 
            and I am using a 
            <DynamicSelect 
              value={syringeVolume} 
              onChange={(v) => setSyringeVolume(parseFloat(v) as SyringeVolume)}
              options={[{label: '1.0mL', value: 1.0}, {label: '0.5mL', value: 0.5}, {label: '0.3mL', value: 0.3}]} 
            /> syringe.
          </div>

          {/* Interactive Dose Quick Presets */}
          <div className="mt-8 pt-6 border-t border-[#b7b7a4]/30">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 mr-1 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#a5a58d]" />
                Common Research Presets:
              </span>
              {[
                { label: '100 mcg', dose: '100', unit: 'mcg' as MassUnit },
                { label: '250 mcg', dose: '250', unit: 'mcg' as MassUnit },
                { label: '500 mcg', dose: '500', unit: 'mcg' as MassUnit },
                { label: '1 mg', dose: '1', unit: 'mg' as MassUnit },
                { label: '2.5 mg', dose: '2.5', unit: 'mg' as MassUnit },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setDesiredDose(preset.dose)
                    setDoseUnit(preset.unit)
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-price font-bold border transition-all cursor-pointer ${
                    desiredDose === preset.dose && doseUnit === preset.unit
                      ? 'bg-[#a5a58d] text-white border-[#a5a58d] shadow-xs'
                      : 'bg-[#f0efeb] text-neutral-700 border-[#b7b7a4]/50 hover:border-[#a5a58d] hover:bg-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
            *Parameters update calculations instantaneously. All formulas assume standard laboratory-grade U-100 syringe graduations unless specified.
          </p>
        </FadeUp>
      </div>

      {/* Right: Obsidian Precision Result Display with Calibrated Syringe */}
      <div className="w-full lg:w-[420px] shrink-0 flex flex-col">
        <FadeUp delay={0.15} className="h-full">
          <div className="bg-[#20221c] rounded-2xl border border-[#32352a] p-6 sm:p-8 flex flex-col items-center justify-between text-center h-full shadow-lg min-h-[380px] relative text-[#fff1e6]">
            
            <div className="w-full flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 my-4">
              
              {/* Calculated Draw readout */}
              <div className="flex flex-col items-center">
                <span className="font-sans font-bold uppercase tracking-[0.2em] text-[#a5a58d] text-[10.5px] mb-2">
                  Calculated Draw
                </span>
                
                {errorMsg ? (
                  <div className="text-red-400 text-xs font-bold my-4 max-w-[180px] leading-relaxed">
                    {errorMsg}
                  </div>
                ) : (
                  <div className="relative w-full flex flex-col items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div 
                        key={tickMarksStr}
                        initial={{ scale: 0.88, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl sm:text-7xl md:text-[80px] font-price font-bold text-[#cb997e] tracking-tight leading-none mb-2"
                      >
                        {tickMarksStr}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-xs font-sans font-bold uppercase tracking-widest text-neutral-300">
                      Units <span className="font-medium font-price text-neutral-400">({volumePerDoseStr})</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Natural Syringe Visualization */}
              <div className="relative h-[210px] w-12 flex justify-center shrink-0 mt-4 sm:mt-0">
                
                {/* External Tick Numbers */}
                <div className="absolute right-full mr-2.5 top-0 bottom-0 flex flex-col justify-between py-1 pointer-events-none text-right z-30">
                  {getSyringeTicks().map((tick, i) => (
                    <span key={i} className={`text-[10px] font-price font-bold leading-none tracking-tighter ${tick % (syringeVolume === 1.0 ? 20 : 10) === 0 ? 'text-neutral-400' : 'text-transparent'}`}>
                      {tick}
                    </span>
                  ))}
                </div>

                {/* Plunger Assembly */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-[85%] z-20 flex flex-col items-center justify-end pointer-events-none"
                  animate={{ bottom: `${fillPercentage}%` }}
                  transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                  style={{ height: '120%' }}
                >
                  {/* Rod */}
                  <div className="w-2 flex-1 bg-gradient-to-r from-neutral-300 to-neutral-400 border-x border-neutral-500 relative">
                    {/* Thumb rest */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-neutral-400 border border-neutral-500 rounded-sm shadow-sm" />
                  </div>
                  {/* Rubber Head */}
                  <div className="w-full h-3 bg-neutral-900 rounded-b-sm rounded-t-[1px] border-b-2 border-black flex flex-col items-center justify-evenly py-[1px] shadow-sm">
                    <div className="w-full h-px bg-white/20" />
                    <div className="w-full h-px bg-white/20" />
                  </div>
                </motion.div>

                {/* Barrel */}
                <div className="w-full h-full border-2 border-white/20 relative bg-white/10 backdrop-blur-sm overflow-hidden flex flex-col justify-end z-20 rounded-t-sm shadow-inner">
                  {/* Fluid Fill with Brand Gradient */}
                  <motion.div 
                    className={`w-full ${errorMsg ? 'bg-red-500/80' : 'bg-gradient-to-t from-[#cb997e] to-[#ddbea9]'} relative z-30 border-t border-white/60`}
                    initial={{ height: 0 }}
                    animate={{ height: `${fillPercentage}%` }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    style={{ originY: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent mix-blend-overlay" />
                  </motion.div>
                  
                  {/* Tick Line Overlays */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none z-50">
                    {getSyringeTicks().map((tick, i) => {
                      const isMajor = tick % (syringeVolume === 1.0 ? 20 : 10) === 0;
                      const isMid = tick % (syringeVolume === 1.0 ? 10 : 5) === 0;
                      let width = 'w-[30%]';
                      if (isMajor) width = 'w-[80%]';
                      else if (isMid) width = 'w-[50%]';
                      
                      return (
                        <div key={i} className="flex items-center gap-1 w-full">
                          <div className={`h-px bg-white/40 ${width}`} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Hub & Needle */}
                <div className="absolute top-full flex flex-col items-center z-20">
                  <div className="w-4 h-2 bg-[#cb997e] rounded-b-sm border-x border-b border-[#b7846c] z-10 shadow-sm" />
                  <div className="w-0.5 h-8 bg-neutral-400 relative z-0" />
                </div>
              </div>
            </div>
            
            {/* Bottom Resulting Concentration Strip */}
            <div className="w-full text-center border-t border-white/15 pt-4 mt-auto">
              <div className="text-[10px] uppercase font-sans font-bold text-[#a5a58d] mb-0.5 tracking-widest">
                Resulting Concentration
              </div>
              <div className="text-base sm:text-lg font-price font-bold text-white">
                {concentrationStr}
              </div>
            </div>

          </div>
        </FadeUp>
      </div>

    </section>
  )
}
