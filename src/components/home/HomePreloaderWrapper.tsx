import React from 'react'

// The homepage preloader has been retired; this wrapper is kept as a pass-through
// so existing imports keep working.
export function HomePreloaderWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
