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
}

// Persisted, unlike the mobile-menu state above: a visitor who closes the announcement bar
// shouldn't see it pop back open on their next visit.
export const useAnnouncementBarStore = create<AnnouncementBarState>()(
  persist(
    (set) => ({
      dismissed: false,
      dismiss: () => set({ dismissed: true }),
    }),
    { name: 'veracue-announcement-bar' },
  ),
)
