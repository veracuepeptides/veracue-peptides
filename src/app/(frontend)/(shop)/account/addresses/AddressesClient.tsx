'use client'

import React, { useState } from 'react'
import { Plus, Edit2, Trash2, MapPin, CheckCircle2, Phone, Building, X, Loader2 } from 'lucide-react'
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from '@/components/ui/sheet'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { COUNTRIES } from '@/lib/countries'
import { HeroButton } from '@/components/ui/hero-button'

export interface AddressItem {
  id: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface AccountAddressesProps {
  addresses: AddressItem[];
}

export function AddressesClient({ addresses }: AccountAddressesProps) {
  const t = useTranslations('account.addresses')
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()
  
  const editingAddress = editingId ? addresses.find(a => a.id === editingId) : null

  async function handleAddSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        if (editingId) {
          const { updateAddress } = await import('./actions')
          const result = await updateAddress(editingId, formData)
          if (!result?.success) {
            toast.error(result?.error || t('toastUpdateFailed'))
            return
          }
          toast.success(t('toastUpdateSuccess'))
        } else {
          const { addAddress } = await import('./actions')
          const result = await addAddress(formData)
          if (!result?.success) {
            toast.error(result?.error || t('toastSaveFailed'))
            return
          }
          toast.success(t('toastSaveSuccess'))
        }
        setOpen(false)
        setEditingId(null)
      } catch (error: any) {
        toast.error(error.message || t('toastUnexpectedError'))
      }
    })
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        const { deleteAddress } = await import('./actions')
        await deleteAddress(id)
        toast.success(t('toastDeleteSuccess'))
      } catch {
        toast.error(t('toastUnexpectedError'))
      }
    })
  }

  function handleEdit(id: string) {
    setEditingId(id)
    setOpen(true)
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setEditingId(null)
      }, 300)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 w-full font-sans"
    >
      
      {/* 1. Header Banner & Add Address Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-3 border-b border-[#dce0d6]/70">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d]">
            Shipping Destinations
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-[#525b4c] font-light">
            {t('subtitle')}
          </p>
        </div>

        <HeroButton 
          onClick={() => { setEditingId(null); setOpen(true); }}
          size="sm"
          className="shrink-0 self-start sm:self-auto"
        >
          <Plus size={14} className="shrink-0 stroke-[2.5]" />
          <span>{t('addNewAddress')}</span>
        </HeroButton>
      </div>

      {/* 2. Slide-out Sheet Drawer (Add / Edit) */}
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent 
          side="right" 
          showCloseButton={false}
          className="sm:max-w-[540px] md:max-w-[580px] w-full p-0 bg-white border-l border-[#dce0d6] flex flex-col shadow-2xl rounded-l-none sm:rounded-l-[28px] overflow-hidden"
        >
          <form action={handleAddSubmit} key={editingId || 'new'} className="flex flex-col h-full">
            
            {/* Drawer Header */}
            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-[#dce0d6]/70 flex items-start justify-between gap-3 bg-[#fafaf8]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs flex items-center justify-center shrink-0">
                  <Building size={19} />
                </div>
                <SheetHeader className="p-0 text-left">
                  <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d] block">
                    Destination Ledger
                  </span>
                  <SheetTitle className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[#1a1f16]">
                    {editingId ? t('editAddressTitle') : t('addAddressTitle')}
                  </SheetTitle>
                </SheetHeader>
              </div>

              <SheetClose asChild>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#edf0e8] text-[#525b4c] hover:text-[#1a1f16] flex items-center justify-center transition-colors border border-[#dce0d6] cursor-pointer shrink-0 shadow-2xs"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </SheetClose>
            </div>

            {/* Subtitle / Description */}
            <div className="px-5 sm:px-8 pt-3.5">
              <SheetDescription className="text-xs sm:text-[13px] text-[#525b4c] font-light leading-relaxed">
                {editingId ? t('editAddressDescription') : t('addAddressDescription')}
              </SheetDescription>
            </div>
            
            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-4 space-y-4 sm:space-y-4.5 custom-scrollbar" data-lenis-prevent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="firstName" className="text-xs font-semibold text-[#1a1f16]">
                    {t('firstName')}
                  </Label>
                  <Input 
                    name="firstName" 
                    id="firstName" 
                    defaultValue={editingAddress?.firstName || ''} 
                    required 
                    placeholder="Recipient First Name" 
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lastName" className="text-xs font-semibold text-[#1a1f16]">
                    {t('lastName')}
                  </Label>
                  <Input 
                    name="lastName" 
                    id="lastName" 
                    defaultValue={editingAddress?.lastName || ''} 
                    required 
                    placeholder="Recipient Last Name" 
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="line1" className="text-xs font-semibold text-[#1a1f16]">
                  {t('streetAddress')}
                </Label>
                <Input 
                  name="line1" 
                  id="line1" 
                  defaultValue={editingAddress?.line1 || ''} 
                  required 
                  placeholder="e.g. 100 Innovation Way" 
                  className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="line2" className="text-xs font-semibold text-[#1a1f16]">
                  {t('apartmentOptional')}
                </Label>
                <Input 
                  name="line2" 
                  id="line2" 
                  defaultValue={editingAddress?.line2 || ''} 
                  placeholder="Suite, Lab #, Unit, Floor (optional)" 
                  className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                />
              </div>

              {/* City, State, ZIP - Responsive 2/3 Column Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                  <Label htmlFor="city" className="text-xs font-semibold text-[#1a1f16]">
                    {t('city')}
                  </Label>
                  <Input 
                    name="city" 
                    id="city" 
                    defaultValue={editingAddress?.city || ''} 
                    required 
                    placeholder={t('city')} 
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-1">
                  <Label htmlFor="state" className="text-xs font-semibold text-[#1a1f16]">
                    {t('state')}
                  </Label>
                  <Input 
                    name="state" 
                    id="state" 
                    defaultValue={editingAddress?.state || ''} 
                    required 
                    placeholder={t('state')} 
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-1">
                  <Label htmlFor="zip" className="text-xs font-semibold text-[#1a1f16]">
                    {t('zipCode')}
                  </Label>
                  <Input 
                    name="zip" 
                    id="zip" 
                    defaultValue={editingAddress?.postalCode || ''} 
                    required 
                    placeholder={t('zipCode')} 
                    className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold text-[#1a1f16]">
                  {t('phone')}
                </Label>
                <Input 
                  name="phone" 
                  id="phone" 
                  defaultValue={editingAddress?.phone || ''} 
                  required 
                  type="tel" 
                  placeholder="(555) 000-0000" 
                  className="h-11 bg-[#f5f6f2]/40 hover:bg-white focus:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country" className="text-xs font-semibold text-[#1a1f16]">
                  {t('country')}
                </Label>
                <Select name="country" defaultValue={editingAddress?.country || 'US'} required>
                  <SelectTrigger id="country" className="h-11 bg-[#f5f6f2]/40 hover:bg-white border border-[#dce0d6] focus:border-[#2c3327] focus-visible:ring-2 focus-visible:ring-[#2c3327]/10 rounded-xl px-3.5 text-sm text-[#1a1f16] w-full">
                    <SelectValue placeholder={t('country')} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 rounded-2xl border-[#dce0d6] bg-white p-1.5 shadow-xl">
                    {COUNTRIES.map((c) => (
                      <SelectItem
                        key={c.code}
                        value={c.code}
                        className="rounded-xl py-2 px-3 text-xs font-medium cursor-pointer"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Set as Default Luxury Card Toggle */}
              <label
                htmlFor="default"
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#dce0d6]/80 bg-[#f5f6f2]/40 hover:bg-[#edf0e8]/50 transition-colors cursor-pointer mt-2"
              >
                <Checkbox 
                  name="isDefault" 
                  id="default" 
                  defaultChecked={editingAddress?.isDefault || false} 
                  className="border-[#a5a58d] data-[state=checked]:bg-[#2c3327] data-[state=checked]:border-[#2c3327] rounded-md" 
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1a1f16]">{t('setAsDefault')}</span>
                  <span className="text-[11px] text-[#737c6d] font-light">Use this address automatically for express checkout & billing</span>
                </div>
              </label>
            </div>

            {/* Drawer Actions */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-t border-[#dce0d6]/70 bg-[#fafaf8] flex items-center justify-end gap-3 shrink-0">
              <SheetClose asChild>
                <button 
                  type="button" 
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#525b4c] hover:text-[#1a1f16] hover:bg-[#edf0e8] transition-all cursor-pointer"
                >
                  {t('cancel')}
                </button>
              </SheetClose>

              <HeroButton 
                disabled={isPending} 
                type="submit" 
                size="sm"
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin" />
                    <span>{t('saving')}</span>
                  </span>
                ) : (
                  <span>{t('saveAddress')}</span>
                )}
              </HeroButton>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* 3. Address Ledger Cards Grid */}
      <div>
        {addresses.length === 0 ? (
          <div className="w-full bg-white rounded-[24px] border border-[#dce0d6] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-[0_1px_6px_rgba(40,49,33,0.02)] my-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-xs flex items-center justify-center mb-4">
              <MapPin size={28} strokeWidth={1.75} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1f16] tracking-tight mb-2">
              No Addresses Found
            </h2>
            <p className="text-xs sm:text-sm text-[#525b4c] font-light max-w-sm mb-6 leading-relaxed">
              You haven't saved any laboratory or clinical shipping destinations yet.
            </p>
            <HeroButton 
              onClick={() => { setEditingId(null); setOpen(true); }}
              size="sm"
            >
              <Plus size={14} className="shrink-0 stroke-[2.5]" />
              <span>{t('addNewAddress')}</span>
            </HeroButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence>
              {addresses.map((address, i) => (
                <motion.div 
                  key={address.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="bg-white rounded-[22px] border border-[#dce0d6] p-6 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-emerald-400/50 hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Top Bar: Icon + Default Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-xs flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>

                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#2c3327] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                          <CheckCircle2 size={10} className="text-emerald-400" />
                          {t('default')}
                        </span>
                      )}
                    </div>

                    {/* Name & Address */}
                    <h3 className="text-base font-semibold text-[#1a1f16] tracking-tight mb-2">
                      {address.firstName} {address.lastName}
                    </h3>

                    <div className="flex flex-col text-xs text-[#525b4c] font-light leading-relaxed">
                      <span>{address.line1}</span>
                      {address.line2 && <span>{address.line2}</span>}
                      <span>{address.city}, {address.state} {address.postalCode}</span>
                      <span className="font-medium text-[#1a1f16] mt-0.5">{address.country}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-1.5 text-xs text-[#525b4c] font-light mt-3 pt-3 border-t border-[#dce0d6]/60">
                      <Phone size={12} className="text-emerald-600" />
                      <span>{address.phone}</span>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-end gap-3 pt-4 mt-5 border-t border-[#dce0d6]/70">
                    <button 
                      disabled={isPending} 
                      onClick={() => handleEdit(address.id)} 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#2c3327] hover:text-[#1a1f16] hover:bg-emerald-50 transition-all disabled:opacity-50"
                    >
                      <Edit2 size={13} className="text-emerald-700" />
                      <span>{t('edit')}</span>
                    </button>
                    
                    <button 
                      disabled={isPending} 
                      onClick={() => handleDelete(address.id)} 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all disabled:opacity-50"
                    >
                      <Trash2 size={13} className="text-rose-600" />
                      <span>{t('delete')}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

    </motion.div>
  )
}
