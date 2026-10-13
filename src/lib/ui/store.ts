import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>()((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}))

interface AnnouncementBarState {
  dismissed: boolean
  dismiss: () => void
  // Mirrors ClientHeader's own scroll-direction hide/show state, so the bar appears and
  // disappears in exact lockstep with the floating header rather than running a second,
  // independently-timed scroll listener that could drift out of sync with it.
  headerHidden: boolean
  setHeaderHidden: (hidden: boolean) => void
}

// Persisted, unlike the mobile-menu state above: a visitor who closes the announcement bar
// shouldn't see it pop back open on their next visit. headerHidden is excluded from persistence
// (via partialize) since it's a live scroll-position derivative, not a real user preference —
// every page load should start from "not hidden", not whatever scroll state was last saved.
export const useAnnouncementBarStore = create<AnnouncementBarState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true }),
      headerHidden: false,
      setHeaderHidden: (headerHidden) => set({ headerHidden }),
    }),
    { name: 'veracue-announcement-bar', partialize: (state) => ({ dismissed: state.dismissed }) },
  ),
)
