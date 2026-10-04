import {
  Inter,
  Plus_Jakarta_Sans,
  Sora,
  Tenor_Sans,
  Cormorant_Garamond,
  Space_Grotesk,
} from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
})

export const tenor = Tenor_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-tenor',
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const fontVariables = [
  inter.variable,
  jakarta.variable,
  sora.variable,
  tenor.variable,
  cormorant.variable,
  spaceGrotesk.variable,
].join(' ')
