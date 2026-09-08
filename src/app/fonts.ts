import { Inter, Michroma, Space_Grotesk, Sora, Syne } from 'next/font/google'

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const fontHeading = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heading',
})

export const fontSora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
})

export const fontSyne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

// Temporary fallback for Big Shoulders
export const fontBigShoulders = fontSans

