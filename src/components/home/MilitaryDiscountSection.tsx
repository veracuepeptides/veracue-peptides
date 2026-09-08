'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Mail, 
  ChevronDown, 
  Upload, 
  CheckCircle2, 
  X, 
  Award, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Shield, 
  FileCheck 
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function MilitaryDiscountSection() {
  const t = useTranslations('home.militaryDiscount');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dignified US Flag & Great Seal Military Honor Image (Zero Human Faces, Zero Helix Bio Assets)
  const usFlagImage = {
    src: '/veracue-images/veracue-military-us-flag.jpg',
    alt: 'Dignified American US flag with embroidered stars and bronze military seal honoring service members'
  };

  const branches = [
    { id: 'army', key: 'army', label: 'US Army' },
    { id: 'navy', key: 'navy', label: 'US Navy' },
    { id: 'airforce', key: 'airforce', label: 'US Air Force' },
    { id: 'marines', key: 'marines', label: 'US Marine Corps' },
    { id: 'coastguard', key: 'coastguard', label: 'US Coast Guard' },
    { id: 'spaceforce', key: 'spaceforce', label: 'US Space Force' },
    { id: 'other', key: 'other', label: 'Veteran / First Responder' }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileSelect = (file: File) => {
    setErrorMsg(null);
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      setErrorMsg("Please upload a valid image (JPEG, PNG, WEBP) or PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Document must be smaller than 5MB.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedBranch) {
      setErrorMsg("Please select your service branch.");
      return;
    }
    if (!selectedFile) {
      setErrorMsg("Please upload your military or veteran ID document.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg("Document size exceeds 5MB limit.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("branch", selectedBranch);
    formData.append("idPhoto", selectedFile);

    setIsLoading(true);
    try {
      const res = await fetch('/api/military/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMsg(data?.error || "There was an error submitting your verification. Please try again.");
      }
    } catch {
      setErrorMsg("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="military-discount" className="w-full bg-[#f0efeb] pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-20 sm:pb-24 md:pb-32 lg:pb-36 xl:pb-40 relative font-sans overflow-hidden border-0">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#eddcd2]/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#a5a58d]/30 rounded-full blur-3xl" />
      </div>

      {/* FULL WIDTH CONTAINER: Edge-to-edge layout with generous horizontal gutters */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Streamlined 2-Column Grid: Balanced horizontally to keep section compact vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch">
          
          {/* LEFT COLUMN: US Flag & Military Honor Visual Stage */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#20221c] border border-[#20221c]/10 shadow-[0_20px_50px_rgba(32,34,28,0.12)] flex flex-col justify-between p-5 sm:p-7 group">
              
              {/* US Flag & Brass Seal Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={usFlagImage.src}
                  alt={usFlagImage.alt}
                  fill 
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Rich Multi-Layer Gradient Overlays for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#20221c] via-[#20221c]/40 to-[#20221c]/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

              {/* Top Row: Honor Badge & Discount Chip */}
              <div className="relative z-20 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20221c]/85 backdrop-blur-md border border-white/20 text-[#fff1e6] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#cb997e] animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase font-mono">
                    HONORING DEFENSE & SERVICE
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#a5a58d] text-[#fff1e6] text-xs font-black tracking-widest uppercase shadow-md">
                  <Award className="w-3.5 h-3.5 text-[#fff1e6]" />
                  <span>30% OFF</span>
                </div>
              </div>

              {/* Middle Subtle Quote / Watermark Badge (Shown on tablet/desktop for breathing room) */}
              <div className="hidden sm:block relative z-20 my-auto py-4">
                <div className="inline-block bg-black/40 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10 max-w-sm">
                  <div className="text-[11px] font-mono font-bold tracking-widest text-[#fff1e6]/70 uppercase mb-0.5">
                    VERACUE PEPTIDES
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#fff1e6] leading-snug">
                    Standing dedication to active duty military, veterans, and first responders.
                  </div>
                </div>
              </div>

              {/* Bottom Security Card Inside Visual Frame */}
              <div className="relative z-20 bg-white/95 backdrop-blur-md rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 border border-white/80 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#a5a58d]/20 text-[#20221c] flex items-center justify-center shrink-0 mt-0.5 border border-[#a5a58d]/30">
                    <ShieldCheck className="w-4 h-4 text-[#20221c]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs sm:text-sm font-black text-[#20221c] tracking-wider uppercase font-heading">
                        {t('privacyNoticeTitle')}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#a5a58d] uppercase px-2 py-0.5 rounded bg-[#f0efeb]">
                        AES-256
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-[12px] leading-relaxed text-[#20221c]/80 font-medium">
                      {t.rich('privacyNoticeText', {
                        redact: (chunks) => <span className="font-bold text-[#20221c] underline decoration-[#cb997e] decoration-2 underline-offset-2">{chunks}</span>,
                        destroyed: (chunks) => <span className="font-bold text-[#20221c]">{chunks}</span>
                      })}
                    </p>
                    
                    {/* Micro Badges */}
                    <div className="mt-2.5 pt-2 border-t border-[#20221c]/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-[#20221c]/70 uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#a5a58d]" /> Encrypted
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#a5a58d]" /> Zero Archival
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#a5a58d]" /> &lt;2h Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Compact, High-Efficiency Form & Value Console */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            
            {/* Elevated Form Card: Integrated with compact header and 2-column fields */}
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 xl:p-9 border border-[#20221c]/10 shadow-[0_20px_50px_rgba(32,34,28,0.05)] relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="military-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4 sm:gap-5"
                  >
                    {/* Compact Integrated Header */}
                    <div className="pb-3 border-b border-[#20221c]/10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0efeb] border border-[#20221c]/10">
                          <Sparkles className="w-3 h-3 text-[#cb997e]" />
                          <span className="text-[#a5a58d] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono">
                            {t('eyebrow')}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold uppercase tracking-wider font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          SSL Secured Session
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading uppercase text-[#20221c] leading-[1.05] tracking-tight mb-2">
                        <span>{t('titleLine1')}</span>{' '}
                        <span className="text-[#a5a58d]">{t('titleLine2')}</span>
                      </h2>

                      <p className="text-xs sm:text-sm text-[#20221c]/70 font-medium leading-relaxed max-w-2xl">
                        {t('description')}
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Compact Two-Column Input Fields Grid */}
                    <div className="space-y-3.5 sm:space-y-4">
                      
                      {/* Row 1: Full Name & Email Address (Side-by-Side on sm+) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        
                        {/* Field 1: Full Legal Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="fullName" className="text-[11px] font-bold text-[#20221c] uppercase tracking-wider flex items-center justify-between">
                            <span>{t('fullNameLabel')} <span className="text-[#cb997e]">*</span></span>
                            <span className="text-[10px] text-[#20221c]/40 font-normal">as on ID</span>
                          </label>
                          <div className="relative flex items-center bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus-within:bg-white focus-within:border-[#20221c] focus-within:ring-2 focus-within:ring-[#20221c]/10 rounded-xl border border-[#20221c]/15 transition-all duration-200">
                            <div className="pl-3.5 pr-1 text-[#a5a58d]">
                              <User className="w-4 h-4" />
                            </div>
                            <input 
                              required 
                              type="text" 
                              name="fullName" 
                              id="fullName"
                              placeholder={t('fullNamePlaceholder')} 
                              className="w-full bg-transparent px-2.5 py-3 outline-none text-xs sm:text-sm font-semibold text-[#20221c] placeholder:text-[#20221c]/35" 
                            />
                          </div>
                        </div>

                        {/* Field 2: Email Address */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[11px] font-bold text-[#20221c] uppercase tracking-wider flex items-center justify-between">
                            <span>{t('emailLabel')} <span className="text-[#cb997e]">*</span></span>
                            <span className="text-[10px] text-[#20221c]/40 font-normal">code delivery</span>
                          </label>
                          <div className="relative flex items-center bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus-within:bg-white focus-within:border-[#20221c] focus-within:ring-2 focus-within:ring-[#20221c]/10 rounded-xl border border-[#20221c]/15 transition-all duration-200">
                            <div className="pl-3.5 pr-1 text-[#a5a58d]">
                              <Mail className="w-4 h-4" />
                            </div>
                            <input 
                              required 
                              type="email" 
                              name="email" 
                              id="email"
                              placeholder={t('emailPlaceholder')} 
                              className="w-full bg-transparent px-2.5 py-3 outline-none text-xs sm:text-sm font-semibold text-[#20221c] placeholder:text-[#20221c]/35" 
                            />
                          </div>
                        </div>

                      </div>

                      {/* Row 2: Service Branch Selector & ID Upload Dropzone (Side-by-Side on sm+) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-start">
                        
                        {/* Field 3: Service Branch Custom Dropdown */}
                        <div className="flex flex-col gap-1.5 relative z-30" ref={dropdownRef}>
                          <label className="text-[11px] font-bold text-[#20221c] uppercase tracking-wider flex items-center justify-between">
                            <span>{t('serviceBranchLabel')} <span className="text-[#cb997e]">*</span></span>
                            <span className="text-[10px] text-[#20221c]/40 font-normal">select branch</span>
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                            className={`w-full flex items-center justify-between bg-[#f0efeb]/40 hover:bg-[#f0efeb]/70 focus:bg-white rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
                              isDropdownOpen 
                                ? 'border-[#20221c] ring-2 ring-[#20221c]/10 bg-white' 
                                : 'border-[#20221c]/15'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <Award className="w-4 h-4 text-[#a5a58d] shrink-0" />
                              <span className={`text-xs sm:text-sm font-semibold truncate ${selectedBranch ? 'text-[#20221c]' : 'text-[#20221c]/40'}`}>
                                {selectedBranch 
                                  ? (branches.find(b => b.id === selectedBranch)?.label || t(`branches.${selectedBranch}`))
                                  : t('selectBranchPlaceholder')}
                              </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#20221c]/50 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#20221c]' : ''}`} />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-50 w-full top-full mt-1.5 bg-white rounded-xl border border-[#20221c]/15 shadow-2xl overflow-hidden p-1.5"
                                role="listbox"
                              >
                                {branches.map((branch) => {
                                  const isSelected = selectedBranch === branch.id;
                                  return (
                                    <button
                                      key={branch.id}
                                      type="button"
                                      onClick={() => {
                                        setSelectedBranch(branch.id);
                                        setIsDropdownOpen(false);
                                      }}
                                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                        isSelected
                                          ? 'bg-[#a5a58d] text-[#fff1e6]'
                                          : 'text-[#20221c] hover:bg-[#f0efeb]'
                                      }`}
                                      role="option"
                                      aria-selected={isSelected}
                                    >
                                      <span>{branch.label}</span>
                                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#fff1e6]" />}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Field 4: Compact ID Document Upload Dropzone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#20221c] uppercase tracking-wider flex items-center justify-between">
                            <span>{t('idPhotoLabel')} <span className="text-[#cb997e]">*</span></span>
                            <span className="text-[10px] text-[#20221c]/50 font-normal">redact SSN • max 5MB</span>
                          </label>

                          <input 
                            type="file" 
                            accept="image/*,.pdf" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                handleFileSelect(e.target.files[0]);
                              }
                            }}
                          />

                          {!selectedFile ? (
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={`cursor-pointer rounded-xl border border-dashed px-3.5 py-2.5 transition-all duration-200 flex items-center justify-between gap-3 group ${
                                isDragging 
                                  ? 'border-[#20221c] bg-[#f0efeb]' 
                                  : 'border-[#20221c]/25 hover:border-[#20221c]/50 bg-[#f0efeb]/30 hover:bg-[#f0efeb]/60'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-white border border-[#20221c]/10 flex items-center justify-center shrink-0">
                                  <Upload className="w-3.5 h-3.5 text-[#a5a58d] group-hover:text-[#20221c] transition-colors" />
                                </div>
                                <div className="min-w-0 text-left">
                                  <div className="text-xs font-bold text-[#20221c] truncate">
                                    Upload ID or <span className="text-[#cb997e] underline">browse</span>
                                  </div>
                                  <div className="text-[10px] text-[#20221c]/50 truncate">
                                    CAC, VA Card, DD-214 (PDF, JPG)
                                  </div>
                                </div>
                              </div>

                              <span className="px-2.5 py-1 rounded-md bg-white border border-[#20221c]/10 text-[10px] font-bold text-[#20221c] uppercase tracking-wider shrink-0 shadow-2xs">
                                Choose
                              </span>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-[#20221c]/15 bg-[#f0efeb]/40 px-3 py-2 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-[#20221c] truncate max-w-[130px] sm:max-w-[150px]">
                                    {selectedFile.name}
                                  </div>
                                  <div className="text-[10px] text-[#20221c]/50 font-mono">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-2 py-0.5 rounded bg-white border border-[#20221c]/15 text-[10px] font-bold text-[#20221c] hover:bg-[#f0efeb]"
                                >
                                  Replace
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedFile(null)}
                                  className="p-1 rounded text-[#20221c]/50 hover:text-rose-600"
                                  aria-label="Remove attached file"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* Trust Perks Inline Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-2 py-1 border-t border-[#20221c]/10 text-[10px] sm:text-[11px] font-bold text-[#20221c]/75 uppercase tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#a5a58d] shrink-0" />
                        <span>&lt;2h Review</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3 h-3 text-[#a5a58d] shrink-0" />
                        <span>Standing 30%</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-[#a5a58d] shrink-0" />
                        <span>Zero Archival</span>
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#20221c] hover:bg-[#a5a58d] active:scale-[0.99] text-[#fff1e6] font-heading font-black text-xs sm:text-sm tracking-widest uppercase py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_10px_25px_rgba(32,34,28,0.15)] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed group"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#fff1e6] border-t-transparent rounded-full animate-spin" />
                            <span>ENCRYPTING & TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <span>{t('submitButton')}</span>
                            <ShieldCheck className="w-4 h-4 text-[#fff1e6] transition-transform group-hover:scale-110" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Micro Security Footnote */}
                    <div className="text-center">
                      <p className="text-[10px] text-[#20221c]/50 font-medium">
                        Verification is strictly confidential under AES-256 protocol. Credentials are destroyed immediately upon code generation.
                      </p>
                    </div>

                  </motion.form>
                ) : (
                  /* High-Dignity Confirmation Panel */
                  <motion.div
                    key="military-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-8 sm:py-10 px-4"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f0efeb] border border-[#20221c]/15 flex items-center justify-center mb-4 shadow-sm">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#20221c] flex items-center justify-center text-[#fff1e6]">
                        <CheckCircle2 className="w-6 h-6 text-[#fff1e6]" />
                      </div>
                    </div>

                    <div className="inline-block px-3 py-0.5 rounded-full bg-[#eddcd2]/50 text-[#cb997e] text-[10px] font-bold font-mono uppercase tracking-widest mb-2">
                      TRANSMISSION SECURED
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black font-heading text-[#20221c] uppercase tracking-tight mb-2">
                      {t('successTitle')}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#20221c]/70 font-medium leading-relaxed max-w-md mb-5">
                      {t('successText')}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#f0efeb]/60 border border-[#20221c]/10 text-xs text-[#20221c]/80 font-medium max-w-sm mb-6 space-y-1 text-left">
                      <div className="font-bold text-[#20221c] uppercase tracking-wider text-[11px]">What happens next?</div>
                      <div className="text-[11px]">Our verification team will review your credentials within 2 hours and email your private 30% discount code.</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSelectedFile(null);
                        setSelectedBranch("");
                      }}
                      className="text-xs font-bold uppercase tracking-widest text-[#20221c]/60 hover:text-[#20221c] transition-colors border-b border-[#20221c]/30 hover:border-[#20221c] pb-1"
                    >
                      {t('submitAnother')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
