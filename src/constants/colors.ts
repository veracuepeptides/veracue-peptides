/**
 * Veracue Official Brand Color Palette
 * Strict design system constraint: only use these 7 colors across UI, SVGs, and components.
 */
export const VERACUE_PALETTE = {
  terracotta: '#cb997e', // Primary warm accent & hover states
  almond: '#eddcd2',     // Light surface borders & outlines
  linen: '#fff1e6',      // Light card surfaces & badge fills
  alabaster: '#f0efeb',  // Base page background
  sand: '#ddbea9',       // Intermediate warm tone & badges
  sage: '#a5a58d',       // Header background & global focus ring
  stone: '#b7b7a4',      // Subtle borders & muted accents
} as const

export type VeracueColorName = keyof typeof VERACUE_PALETTE
export type VeracueColorHex = (typeof VERACUE_PALETTE)[VeracueColorName]
