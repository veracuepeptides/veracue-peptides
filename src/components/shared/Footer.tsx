'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Loader2, Mail, Phone, PenTool } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useTranslations } from 'next-intl'

// ============================================================================
// PAYMENT BADGES (Pixel-perfect monochrome typography & icons)
// ============================================================================
const ApplePayBadge = () => (
  <div className="flex items-center gap-1.5 select-none" title="Apple Pay">
    <svg className="h-4 sm:h-5 w-auto" viewBox="0 0 170 170" fill="currentColor">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.19-9.56-10.98-20.43-14.38-32.61-3.41-12.18-5.12-23.78-5.12-34.8 0-14.75 3.73-27.14 11.2-37.17 7.46-10.04 16.92-15.19 28.37-15.45 5.11 0 10.81 1.34 17.09 4.02 6.28 2.68 10.3 4.08 12.06 4.2 1.45-.25 5.69-1.68 12.74-4.29 7.05-2.61 12.92-3.79 17.62-3.53 10.04.66 18.36 4.41 24.97 11.26 6.61 6.84 10.74 14.86 12.39 24.06-8.91 5.37-13.31 12.77-13.2 22.2.11 8.24 3.3 15.15 9.58 20.73 6.28 5.58 13.58 8.95 21.9 10.11-1.89 5.88-4.14 11.83-6.75 17.85zM119.22 31.84c0-7.17 2.6-13.9 7.8-20.19 5.2-6.29 11.59-10.39 19.18-12.31.22 1.45.33 2.8.33 4.04 0 7.39-2.73 14.35-8.19 20.89-5.46 6.54-12.08 10.45-19.86 11.73-.23-1.34-.35-2.72-.35-4.16z" />
    </svg>
    <span className="font-semibold text-sm sm:text-base tracking-tight leading-none">Pay</span>
  </div>
)

const PayPalBadge = () => (
  <span className="font-bold italic text-sm sm:text-base tracking-tight leading-none select-none" title="PayPal">
    PayPal
  </span>
)

const MastercardBadge = () => (
  <div className="flex items-center select-none" title="Mastercard">
    <svg className="h-4 sm:h-5 w-auto" viewBox="0 0 38 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.95" />
      <circle cx="26" cy="12" r="11" fill="currentColor" fillOpacity="0.35" />
      <path
        d="M19 4.8a10.95 10.95 0 0 1 3.6 7.2A10.95 10.95 0 0 1 19 19.2a10.95 10.95 0 0 1-3.6-7.2A10.95 10.95 0 0 1 19 4.8Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
    </svg>
  </div>
)

const VisaBadge = () => (
  <span className="font-black italic text-sm sm:text-base tracking-wider leading-none select-none" title="VISA">
    VISA
  </span>
)

// ============================================================================
// SOCIAL ICONS (Focused selection: Instagram & X / Twitter)
// ============================================================================
const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TwitterXIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// ============================================================================
// MAIN FOOTER CONTENT COMPONENT
// ============================================================================
const FooterContent = () => {
  const t = useTranslations('footer')
  const sectionRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      setMessage('Subscribed! Thank you for joining.')
      const form = e.target as HTMLFormElement
      form.reset()

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 4000)
    } catch (err: any) {
      console.error(err)
      setStatus('error')
      setMessage(err.message || 'Subscription failed. Please try again.')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 4000)
    }
  }

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.8,
        easing: (progress: number) => Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={sectionRef}
      id="site-footer"
      className="w-full relative z-30 font-sans bg-[#f0efeb] pt-6 sm:pt-10 md:pt-14 pb-8 sm:pb-12 text-[#20221c] overflow-hidden select-none"
    >
      {/* Ambient warm dusk glow in the background matching the organic palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1200px] h-[550px] bg-gradient-to-tr from-[#eddcd2]/60 via-[#ddbea9]/30 to-[#cb997e]/20 blur-[130px] pointer-events-none rounded-full" />

      {/* ==================================================================== */}
      {/* PRE-FOOTER CTA SECTION (Minimalist & Modern, Matching Reference)     */}
      {/* ==================================================================== */}
      <div id="pre-footer-cta" className="w-full mx-auto px-3 sm:px-6 md:px-10 max-w-[1920px] relative z-10 pt-4 sm:pt-10 md:pt-16 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-5xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] font-bold tracking-tight leading-[1.05] text-[#20221c]">
            Ready to elevate your research?
          </h2>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] font-medium tracking-tight leading-[1.05] text-[#20221c]/40 mt-1 sm:mt-2">
            Let’s make it happen
          </p>

          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center gap-5 sm:gap-7">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-3.5 text-base sm:text-lg font-semibold text-[#20221c] hover:text-[#cb997e] transition-colors"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#cb997e] text-[#fff1e6] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                <ArrowUpRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.4} />
              </div>
              <span className="border-b-2 border-transparent group-hover:border-[#cb997e] transition-all">
                Contact our team
              </span>
            </Link>

            <span className="text-[#20221c]/25 text-sm hidden sm:inline">&bull;</span>

            <Link
              href="/shop"
              className="text-sm sm:text-base font-medium text-[#20221c]/65 hover:text-[#20221c] transition-colors underline underline-offset-4 decoration-[#20221c]/25 hover:decoration-[#cb997e]"
            >
              Explore research catalogue &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Container matching site standard width */}
      <div className="w-full mx-auto px-3 sm:px-6 md:px-10 max-w-[1920px] relative z-10">
        
        {/* ==================================================================== */}
        {/* FLOATING LUXURY CARD (Faithful to Reference Design)                   */}
        {/* ==================================================================== */}
        <div className="bg-[#fff1e6] border border-[#eddcd2] rounded-2xl sm:rounded-3xl md:rounded-[36px] lg:rounded-[44px] p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 shadow-[0_16px_40px_-15px_rgba(203,153,126,0.12),0_4px_16px_-4px_rgba(32,34,28,0.03)] relative overflow-hidden">
          
          {/* TOP ROW: Brand Logo, Headline & Input on Left, Complete Links on Right */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-14 xl:gap-20">
            
            {/* LEFT COLUMN: Editorial Headline, Form & Direct Contacts */}
            <div className="w-full lg:w-[46%] xl:w-[44%] flex flex-col justify-between">
              <div>
                {/* Editorial Display Headline */}
                <h2 className="font-heading font-extrabold uppercase text-[#20221c] tracking-tight leading-[1.08] text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] max-w-xl">
                  Receive peptide synthesis updates, purity analyses &amp; research protocols in your inbox.
                </h2>
              </div>

              {/* Minimalist Underline Input Form */}
              <div className="mt-8 sm:mt-10 md:mt-12 max-w-md w-full">
                <form onSubmit={handleNewsletterSubmit} className="w-full relative group">
                  <div className="relative flex items-center border-b border-[#20221c]/30 group-focus-within:border-[#cb997e] transition-colors pb-3 sm:pb-3.5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      required
                      disabled={status === 'loading' || status === 'success'}
                      className="w-full bg-transparent text-[#20221c] placeholder:text-[#20221c]/45 text-base sm:text-lg outline-none pr-10 font-normal transition-all"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading' || status === 'success'}
                      aria-label="Subscribe to newsletter"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#20221c] hover:text-[#cb997e] transition-all duration-200 group-hover:translate-x-1 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin text-[#cb997e]" />
                      ) : status === 'success' ? (
                        <Check className="w-5 h-5 text-[#cb997e]" strokeWidth={2.5} />
                      ) : (
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>

                  {/* Inline Message */}
                  {message && (
                    <p
                      className={`text-xs mt-2.5 font-medium transition-opacity ${
                        status === 'success' ? 'text-[#cb997e]' : 'text-red-600'
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </form>

                {/* Direct Contact Details: Email & Phone */}
                <div className="mt-7 pt-6 border-t border-[#eddcd2]/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-[#20221c]">
                  <a
                    href="mailto:support@veracuepeptides.com"
                    className="flex items-center gap-2 text-[#20221c]/80 hover:text-[#cb997e] transition-colors group font-medium"
                    title="Email Support"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#20221c]/5 flex items-center justify-center text-[#20221c] group-hover:bg-[#cb997e] group-hover:text-white transition-colors shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span>support@veracuepeptides.com</span>
                  </a>
                  <a
                    href="tel:+18008372283"
                    className="flex items-center gap-2 text-[#20221c]/80 hover:text-[#cb997e] transition-colors group font-medium"
                    title="Phone Support"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#20221c]/5 flex items-center justify-center text-[#20221c] group-hover:bg-[#cb997e] group-hover:text-white transition-colors shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span>+1 (800) 837-2283</span>
                  </a>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: All Site Pages Links (Products & Lab, Company & Support, Policies & Legal) */}
            <div className="w-full lg:w-[54%] xl:w-[56%]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 xl:gap-12 lg:justify-end">
                
                {/* Column 1: Products & Lab */}
                <div className="flex flex-col min-w-[120px]">
                  <h3 className="text-[#20221c] font-semibold text-sm sm:text-base tracking-normal mb-4 sm:mb-5">
                    Products &amp; Lab
                  </h3>
                  <nav className="flex flex-col gap-2.5">
                    {[
                      { label: 'Shop All Peptides', href: '/shop' },
                      { label: 'Certificates (COA)', href: '/certificates' },
                      { label: 'Peptide Calculator', href: '/peptide-calculator' },
                      { label: 'Research Articles', href: '/blog' },
                      { label: 'Client Account', href: '/account' },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[#20221c]/70 hover:text-[#20221c] text-sm sm:text-[15px] font-normal leading-relaxed hover:translate-x-1 transition-all duration-150 block py-0.5"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Column 2: Company & Support */}
                <div className="flex flex-col min-w-[125px]">
                  <h3 className="text-[#20221c] font-semibold text-sm sm:text-base tracking-normal mb-4 sm:mb-5">
                    Company &amp; Support
                  </h3>
                  <nav className="flex flex-col gap-2.5">
                    {[
                      { label: 'About Veracue', href: '/about-us' },
                      { label: 'Help & FAQ', href: '/faq' },
                      { label: 'Affiliate Program', href: '/affiliates' },
                      { label: 'Contact Us', href: '/contact-us' },
                      { label: 'Shopping Cart', href: '/cart' },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[#20221c]/70 hover:text-[#20221c] text-sm sm:text-[15px] font-normal leading-relaxed hover:translate-x-1 transition-all duration-150 block py-0.5"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Column 3: Policies & Legal */}
                <div className="flex flex-col min-w-[130px] col-span-2 sm:col-span-1">
                  <h3 className="text-[#20221c] font-semibold text-sm sm:text-base tracking-normal mb-4 sm:mb-5">
                    Policies &amp; Legal
                  </h3>
                  <nav className="flex flex-col gap-2.5">
                    {[
                      { label: 'Shipping Policy', href: '/shipping-policy' },
                      { label: 'Refund Policy', href: '/refund-policy' },
                      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                      { label: 'Privacy Policy', href: '/privacy-policy' },
                      { label: 'Medical Disclaimer', href: '/medical-disclaimer' },
                    ].map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-[#20221c]/70 hover:text-[#20221c] text-sm sm:text-[15px] font-normal leading-relaxed hover:translate-x-1 transition-all duration-150 block py-0.5"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

              </div>

              {/* Big Logo in the Marked Area (Underneath Navigation Links) */}
              <div className="mt-8 sm:mt-12 md:mt-16 pt-2 sm:pt-4 flex items-center justify-start">
                <Link
                  href="/"
                  className="inline-block hover:opacity-85 transition-opacity"
                  aria-label="Veracue Home"
                >
                  <Image
                    src="/veracue-images/logo-header.png"
                    alt="Veracue"
                    width={600}
                    height={180}
                    className="w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] h-auto object-contain object-left select-none"
                  />
                </Link>
              </div>

            </div>

          </div>

          {/* ================================================================== */}
          {/* BOTTOM ROW INSIDE CARD: Payment Badges, Social Circles & Top Button*/}
          {/* ================================================================== */}
          <div className="mt-14 sm:mt-18 md:mt-24 pt-6 sm:pt-8 border-t border-[#eddcd2]/80 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
            
            {/* Payment Method Badges (Monochrome Sleek Icons) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-8 text-[#20221c]/80 hover:text-[#20221c] transition-colors">
              <ApplePayBadge />
              <PayPalBadge />
              <MastercardBadge />
              <VisaBadge />
            </div>

            {/* Social Media Badges (Focused Instagram & X) & Back to Top Triangle */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#20221c] text-[#fff1e6] hover:bg-[#cb997e] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#20221c] text-[#fff1e6] hover:bg-[#cb997e] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <TwitterXIcon />
              </a>

              {/* Enhanced, Intuitive Back to Top Button */}
              <button
                onClick={handleScrollToTop}
                aria-label="Scroll back to top"
                className="group flex items-center gap-2 pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 py-2 sm:py-2.5 rounded-full bg-[#20221c] text-[#fff1e6] hover:bg-[#cb997e] hover:text-white transition-all duration-300 shadow-sm hover:-translate-y-0.5 cursor-pointer ml-1 select-none"
              >
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase">Back to top</span>
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform duration-200">
                  <ArrowUp className="w-3 h-3 text-current" strokeWidth={2.5} />
                </div>
              </button>
            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* OUTSIDE CARD FOOTER AREA: Regulatory Disclaimer & Copyright Bar      */}
        {/* ==================================================================== */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-5 text-xs text-[#20221c]/60 px-2 sm:px-4">
          {/* Regulatory RUO Compliance Text */}
          <p className="text-[11px] sm:text-xs leading-relaxed max-w-5xl text-center sm:text-left">
            <span className="font-bold text-[#20221c]/80 uppercase tracking-wider mr-1.5">
              {t('disclaimerLabel')}:
            </span>
            {t('disclaimerText')}
          </p>

          {/* Bottom Copyright & Credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-[#eddcd2]/80 text-[#20221c]/60 text-xs text-center sm:text-left">
            <p className="font-medium">
              &copy; {new Date().getFullYear()} Veracue. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="font-medium tracking-wide">
                Research Use Only (RUO) &bull; USA Formulated &amp; Tested
              </span>
              <span className="font-normal">
                {t('designedBy')}{' '}
                <a
                  href="https://belkdigital.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#20221c]/80 hover:text-[#cb997e] transition-colors"
                >
                  Belk Digital
                </a>
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export function Footer() {
  const [footerHeight, setFooterHeight] = useState(0)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].contentRect.height)
    })
    resizeObserver.observe(footerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      id="global-footer"
      ref={footerRef}
      className="w-full relative z-40 bg-[#f0efeb] print:hidden"
      style={{ pointerEvents: 'auto' }}
    >
      <FooterContent />
    </div>
  )
}
