'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart } from 'lucide-react'
import { useWishlistStore } from '@/lib/wishlist/store'
import { useCartStore } from '@/lib/cart/store'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { HeroButton } from '@/components/ui/hero-button'

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  descriptor: string;
  price: string;
  hasVariants?: boolean;
}

export interface AccountWishlistProps {
  items: WishlistItem[];
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

export function WishlistClient({ items: serverItems }: AccountWishlistProps) {
  const t = useTranslations('account.wishlist')
  const { removeItem, setItems } = useWishlistStore()
  const cartStore = useCartStore()
  const router = useRouter()

  useEffect(() => {
    setItems(serverItems.map(({ id, name, slug, image }) => ({ id, name, slug, image })))
  }, [])

  const [displayItems, setDisplayItems] = useState(serverItems)
  
  useEffect(() => {
    setDisplayItems(serverItems)
  }, [serverItems])

  const addToCart = (item: WishlistItem) => {
    if (item.hasVariants) {
      toast.info(t('selectVariantRequired', { name: item.name }) || `Please select a variant for ${item.name}`)
      router.push(`/product/${item.slug}`)
      return
    }

    cartStore.addItem(
      { id: item.id, name: item.name, imageUrl: item.image, slug: item.slug },
      'Default',
      1,
      parsePrice(item.price)
    )
    toast.success(t('addToCart'), { action: { label: 'View Cart', onClick: cartStore.openCart } })
  }

  const moveAllToCart = () => {
    let itemsNeedingVariants = 0
    let itemsAdded = 0
    
    displayItems.forEach((item) => {
      if (item.hasVariants) {
        itemsNeedingVariants++
      } else {
        cartStore.addItem(
          { id: item.id, name: item.name, imageUrl: item.image, slug: item.slug },
          'Default',
          1,
          parsePrice(item.price)
        )
        itemsAdded++
      }
    })

    if (itemsAdded > 0) {
      cartStore.openCart()
    }
    
    if (itemsNeedingVariants > 0) {
      toast.info(t('selectVariantRequired', { name: 'Item' }) || `${itemsNeedingVariants} item(s) require you to choose a variant first.`)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 w-full font-sans"
    >
      
      {/* 1. Header Banner & Move All To Cart CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-3 border-b border-[#dce0d6]/70">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-[#a5a58d]">
            Saved Research
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1f16] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-sm text-[#525b4c] font-light">
            {t('itemsSaved', { count: displayItems.length })}
          </p>
        </div>

        <HeroButton
          onClick={moveAllToCart}
          disabled={displayItems.length === 0}
          size="sm"
          className="shrink-0 self-start sm:self-auto"
        >
          <ShoppingBag size={14} />
          <span>{t('moveAllToCart')}</span>
        </HeroButton>
      </div>

      {/* 2. Wishlist Grid or Elevated Empty State */}
      <AnimatePresence mode="wait">
        {displayItems.length > 0 ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {displayItems.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white rounded-[22px] border border-[#dce0d6] p-4 sm:p-5 shadow-[0_1px_4px_rgba(40,49,33,0.02)] hover:border-[#a5a58d]/70 hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                {/* Product Image Box */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#f5f6f2] rounded-xl mb-3.5">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
                    <Image
                      src={product.image || '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Remove Button Top Right */}
                  <button 
                    type="button"
                    aria-label="Remove item"
                    onClick={async (e) => {
                      e.preventDefault()
                      const currentItems = displayItems
                      setDisplayItems(prev => prev.filter(i => i.id !== product.id))
                      try {
                        await removeItem(product.id)
                      } catch {
                        setDisplayItems(currentItems)
                        toast.error('Failed to remove item')
                      }
                    }}
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs text-[#525b4c] hover:text-rose-600 hover:bg-rose-50 shadow-xs flex items-center justify-center transition-all border border-[#dce0d6]/80 hover:border-rose-300"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#a5a58d] mb-1 truncate">
                    {/* @ts-ignore */}
                    {product.descriptor || t('productFallback')}
                  </span>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm sm:text-base font-semibold text-[#1a1f16] group-hover:text-[#3a442e] transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 border-t border-[#dce0d6]/60 flex items-center justify-between gap-3">
                    <span className="text-base sm:text-lg font-semibold text-[#1a1f16]">
                      {/* @ts-ignore */}
                      {product.price || product.priceRange || ''}
                    </span>
                  </div>

                  <HeroButton
                    onClick={() => addToCart(product)}
                    size="sm"
                    className="w-full mt-3"
                  >
                    <ShoppingBag size={13} className="text-amber-300" />
                    <span>{t('addToCart')}</span>
                  </HeroButton>
                </div>
                
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-white rounded-[24px] border border-[#dce0d6] p-8 sm:p-14 text-center max-w-xl mx-auto shadow-[0_1px_6px_rgba(40,49,33,0.02)] my-6 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/70 shadow-xs flex items-center justify-center mb-4">
              <Heart size={28} className="fill-rose-500/20" strokeWidth={1.75} />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1f16] tracking-tight mb-2">
              {t('emptyTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#525b4c] font-light max-w-sm mb-6 leading-relaxed">
              {t('emptyDescription')}
            </p>
            <HeroButton href="/shop" size="sm">
              {t('startBrowsing')}
            </HeroButton>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
