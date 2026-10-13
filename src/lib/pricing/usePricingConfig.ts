'use client'

import { useEffect, useState } from 'react'
import { FALLBACK_SHIPPING_METHODS, type ShippingMethodLike } from './shipping'

export type PricingFee = { name: string; amount: number; type: 'percentage' | 'fixed_amount' }
export type PricingConfig = { methods: ShippingMethodLike[]; fees: PricingFee[] }

// One request per page load, shared by every component that asks (cart page and cart drawer).
let cached: PricingConfig | null = null
let inflight: Promise<PricingConfig> | null = null

function load(): Promise<PricingConfig> {
  if (cached) return Promise.resolve(cached)
  if (!inflight) {
    inflight = fetch('/api/pricing-config')
      .then((res) => {
        if (!res.ok) throw new Error(`pricing-config ${res.status}`)
        return res.json()
      })
      .then((data) => {
        cached = {
          methods: Array.isArray(data?.methods) && data.methods.length > 0 ? data.methods : FALLBACK_SHIPPING_METHODS,
          fees: Array.isArray(data?.fees) ? data.fees : [],
        }
        return cached
      })
      .catch((error) => {
        console.error('Could not load pricing config', error)
        inflight = null
        return { methods: FALLBACK_SHIPPING_METHODS, fees: [] } as PricingConfig
      })
  }
  return inflight
}

/**
 * Shipping methods and processing fees for the cart estimate. `ready` is false until the first
 * answer arrives, so callers can show a spinner instead of a total that silently leaves the fees
 * out. Pass `enabled = false` to defer the request (the drawer waits until a cart exists).
 */
export function usePricingConfig(enabled = true): { config: PricingConfig; ready: boolean } {
  const [config, setConfig] = useState<PricingConfig>(
    cached ?? { methods: FALLBACK_SHIPPING_METHODS, fees: [] },
  )
  const [ready, setReady] = useState(cached !== null)

  useEffect(() => {
    if (!enabled || ready) return
    let active = true
    load().then((result) => {
      if (!active) return
      setConfig(result)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [enabled, ready])

  return { config, ready }
}
