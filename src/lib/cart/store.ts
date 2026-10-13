import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { syncCartToPayload } from '@/app/(frontend)/actions/cart'
import { MAX_LINE_QUANTITY } from '@/lib/orders/checkoutLines'

const CART_STORAGE_KEY = 'veracue-cart-storage'

// One-time migration of a cart persisted under the previous storage key.
if (typeof window !== 'undefined') {
  try {
    const legacy = window.localStorage.getItem('Helix Bio-cart-storage')
    if (legacy && !window.localStorage.getItem(CART_STORAGE_KEY)) {
      window.localStorage.setItem(CART_STORAGE_KEY, legacy)
    }
    if (legacy) window.localStorage.removeItem('Helix Bio-cart-storage')
  } catch {
    // storage unavailable; ignore
  }
}

// A line is a whole number from 1 up to the per-line limit the server enforces at checkout, so the
// cart can never hold a quantity checkout would reject.
function clampQuantity(quantity: number) {
  const whole = Math.floor(Number(quantity))
  if (!Number.isFinite(whole)) return 1
  return Math.min(MAX_LINE_QUANTITY, Math.max(1, whole))
}

function generateLineId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15)
}

export type MinimalProduct = {
  id: string
  name: string
  imageUrl: string | null
  slug?: string | null
}

export type CartLine = {
  lineId: string
  productId: string
  variantSku: string | null
  variantTitle?: string | null
  quantity: number
  priceSnapshot: number
  product: MinimalProduct
}

interface CartState {
  items: CartLine[]
  couponCode: string | null
  isOpen: boolean

  setItems: (items: CartLine[]) => void
  addItem: (
    product: MinimalProduct,
    variantSku: string | null,
    quantity: number,
    priceSnapshot: number,
    variantTitle?: string | null
  ) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
  clear: () => void
  setCoupon: (code: string | null) => void
  toggleDrawer: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => {
      return {
      items: [],
      couponCode: null,
      isOpen: false,

      setItems: (items) => set({ items }),

      addItem: (product, variantSku, quantity, priceSnapshot, variantTitle) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => String(item.productId) === String(product.id) && item.variantSku === variantSku,
          )

          if (existingItemIndex > -1) {
            // Copy the line rather than editing the stored object in place.
            const newItems = [...state.items]
            const existing = newItems[existingItemIndex]
            newItems[existingItemIndex] = {
              ...existing,
              quantity: clampQuantity(existing.quantity + quantity),
              priceSnapshot,
              ...(variantTitle ? { variantTitle } : {}),
            }
            syncCartToPayload(newItems).catch(console.error)
            return { items: newItems, isOpen: true }
          }

          const newItems = [
            ...state.items,
            {
              lineId: generateLineId(),
              productId: product.id,
              variantSku,
              variantTitle: variantTitle || variantSku,
              quantity: clampQuantity(quantity),
              priceSnapshot,
              product,
            },
          ]

          syncCartToPayload(newItems).catch(console.error)

          return {
            items: newItems,
            isOpen: true,
          }
        })

      },

      removeItem: (lineId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.lineId !== lineId)
          syncCartToPayload(newItems).catch(console.error)
          return { items: newItems }
        })
      },

      updateQuantity: (lineId, quantity) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.lineId === lineId ? { ...item, quantity: clampQuantity(quantity) } : item,
          )
          syncCartToPayload(newItems).catch(console.error)
          return { items: newItems }
        })
      },

      clear: () => {
        set({ items: [], couponCode: null })
        syncCartToPayload([]).catch(console.error)
      },

      setCoupon: (code) => set({ couponCode: code }),

      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      }
    },
    {
      name: CART_STORAGE_KEY,
      // Only the cart is stored. Saving the drawer's open flag reopened the drawer over every page after a reload.
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode }),
      // Also ignores an open flag saved by an earlier build, so the drawer always starts closed.
      merge: (persisted, current) => ({ ...current, ...(persisted as Partial<CartState>), isOpen: false }),
    },
  ),
)
