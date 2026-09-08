'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useWishlistStore } from '@/lib/wishlist/store'
import { useCartStore } from '@/lib/cart/store'
import { toast } from 'sonner'
import { Product } from '@/components/shop/PrimaryProductCard'

export interface ProductCardProps {
  product: Product | any
}

export function ProductCard({ product }: ProductCardProps) {
  // Resolve lifestyle editorial images alternating between vp-product-vial.jpeg and vp-product-vial2.jpeg
  const getImageUrl = (prod: any) => {
    if (prod.imageUrl?.includes('vp-product-vial') || prod.image?.includes('vp-product-vial')) {
      return prod.imageUrl || prod.image
    }
    const str = String(prod.slug || prod.key || prod.name || prod.id || '')
    let hash = 0
    for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i)
    return hash % 2 === 0 
      ? '/veracue-images/vp-product-vial.jpeg' 
      : '/veracue-images/vp-product-vial2.jpeg'
  }

  const getCategory = (prod: any) => prod.category || prod.categories?.[0]?.title || 'RESEARCH PEPTIDE'
  
  const getDescription = (prod: any) => 
    prod.meta?.description || 
    prod.shortDescription || 
    prod.description || 
    'High-purity research grade synthetic peptide formulated for laboratory analysis and cellular evaluation.'

  // Clean price values
  const rawPrice = prodPrice(product)
  const priceVal = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9.]/g, '')) : Number(rawPrice) || 45
  const compareVal = product.compareAtPrice 
    ? Number(product.compareAtPrice) 
    : Math.round(priceVal * 1.25)
  const discountPercent = Math.round(((compareVal - priceVal) / compareVal) * 100)
  const discountBadge = discountPercent > 0 ? `-${discountPercent}%` : 'BESTSELLER'

  const addWishlistItem = useWishlistStore(state => state.addItem)
  const removeWishlistItem = useWishlistStore(state => state.removeItem)
  const isWishlistedGlobal = useWishlistStore(state => product.id ? state.hasItem(product.id) : false)
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const cartStore = useCartStore()
  const router = useRouter()

  const [inWishlist, setInWishlist] = useState(isWishlistedGlobal)
  const [isPending, setIsPending] = useState(false)

  React.useEffect(() => {
    setInWishlist(isWishlistedGlobal)
  }, [isWishlistedGlobal])

  const handleWishlistClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isSignedIn) {
      toast.error('Sign in required', { description: 'Please log in to add items to your wishlist.' })
      return
    }

    if (!product.id) {
      toast.error('Product ID missing', { description: 'Unable to add this product to wishlist.' })
      return
    }

    setIsPending(true)
    try {
      if (inWishlist) {
        await removeWishlistItem(product.id)
        setInWishlist(false)
        toast('Removed from wishlist', { description: `${product.name} has been removed.` })
      } else {
        await addWishlistItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: getImageUrl(product),
          priceRange: String(priceVal),
        })
        setInWishlist(true)
        toast.success('Added to wishlist', { description: `${product.name} is now in your wishlist.` })
      }
    } catch (error: any) {
      toast.error('Failed to update wishlist', { description: error.message || 'An unexpected error occurred.' })
    } finally {
      setIsPending(false)
    }
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.hasVariants) {
      router.push(`/product/${product.slug}`)
      return
    }

    cartStore.addItem(
      { id: product.id || product.slug, name: product.name, imageUrl: getImageUrl(product), slug: product.slug },
      'Default',
      1,
      priceVal
    )
    toast.success('Added to cart', { action: { label: 'VIEW CART', onClick: cartStore.openCart } })
    cartStore.openCart()
  }

  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[34px] p-2.5 sm:p-3.5 pb-4 sm:pb-5 border border-[#eddcd2]/80 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col relative select-none">
      {/* Clickable Card Overlay */}
      <Link
        draggable={false}
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10 rounded-[28px] sm:rounded-[34px]"
        aria-label={product.name}
      />

      {/* Inner Image Canvas */}
      <div className="relative w-full aspect-[1/1.08] rounded-[20px] sm:rounded-[24px] bg-[#f0efeb] overflow-hidden">
        
        {/* Full-Cover Lifestyle Product Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(product)}
            alt={`${product.name}`}
            fill
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 320px"
            draggable={false}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          />
        </div>

        {/* Floating Top-Left Discount Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 pointer-events-none">
          <span className="bg-[#20221c]/90 backdrop-blur-sm text-[#fff1e6] px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide shadow-md">
            {discountBadge}
          </span>
        </div>

        {/* Signature Scooped Corner Dock (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 z-20 bg-white pt-2.5 pl-2.5 sm:pt-3 sm:pl-3 rounded-tl-[18px] sm:rounded-tl-[22px]">
          {/* Concave fillet above the dock */}
          <svg
            className="absolute -top-[19.5px] right-0 w-5 h-5 text-white pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M 20 0 C 20 11.046 11.046 20 0 20 L 20 20 Z" />
          </svg>

          {/* Concave fillet to the left of the dock */}
          <svg
            className="absolute bottom-0 -left-[19.5px] w-5 h-5 text-white pointer-events-none"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M 20 0 C 20 11.046 11.046 20 0 20 L 20 20 Z" />
          </svg>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistClick}
              disabled={isPending}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-[14px] sm:rounded-[18px] bg-[#f0efeb] hover:bg-[#eddcd2] flex items-center justify-center transition-all duration-300 pointer-events-auto active:scale-90 ${
                inWishlist ? 'text-rose-600 bg-rose-50' : 'text-neutral-700 hover:text-rose-600'
              }`}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-neutral-600" />
              ) : (
                <Heart
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  strokeWidth={1.75}
                  fill={inWishlist ? 'currentColor' : 'none'}
                />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-[14px] sm:rounded-[18px] bg-[#f0efeb] hover:bg-[#eddcd2] text-neutral-800 hover:text-neutral-950 flex items-center justify-center transition-all duration-300 pointer-events-auto active:scale-90 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.75} />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Info Block */}
      <div className="pt-3 sm:pt-3.5 px-1 flex flex-col gap-1.5">
        {/* Row 1: Left (Eyebrow & Name) + Right (Pricing) */}
        <div className="flex items-start justify-between gap-2.5">
          {/* Left Column: Eyebrow & Name */}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] text-[#a5a58d] uppercase mb-0.5 truncate font-editorial">
              {getCategory(product)}
            </p>
            <h3 className="text-sm sm:text-base lg:text-lg font-heading font-bold text-neutral-900 tracking-tight line-clamp-1 group-hover:text-[#cb997e] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Right Column: Pricing */}
          <div className="shrink-0 text-right flex flex-col items-end pt-0.5">
            {compareVal > priceVal && (
              <span className="text-[11px] sm:text-xs text-neutral-400 line-through font-medium leading-none mb-1">
                ${compareVal}
              </span>
            )}
            <span className="text-base sm:text-lg lg:text-xl font-heading font-bold text-neutral-900 leading-none tracking-tight">
              ${priceVal}
            </span>
          </div>
        </div>

        {/* 2-line Description below product name */}
        <p className="text-neutral-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2 font-sans">
          {getDescription(product)}
        </p>
      </div>
    </div>
  )
}

function prodPrice(prod: any) {
  if (prod.isFrom && prod.price) return prod.price
  return prod.priceRange ?? prod.price ?? 45
}
