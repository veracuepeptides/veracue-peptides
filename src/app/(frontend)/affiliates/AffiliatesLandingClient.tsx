'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from '@/components/motion/FadeUp'
import { AffiliateHero } from '@/components/affiliates/AffiliateHero'
import { AffiliateDifferenceSection } from '@/components/affiliates/AffiliateDifferenceSection'
import { HeroButton } from '@/components/ui/hero-button'
import { SharedFaqSection } from '@/components/shared/SharedFaqSection'
import { submitAffiliateApplication } from './actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AFFILIATE_FALLBACKS } from '@/lib/affiliates/landingFallbacks'
import {
  DollarSign,
  Clock,
  ShieldCheck,
  BarChart3,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Share2,
  Percent,
  CreditCard,
  ArrowRight,
  Loader2,
  SlidersHorizontal,
  Check,
  TrendingUp,
  Activity,
  Copy,
  Sparkles,
  Phone,
  Lock,
} from 'lucide-react'

export type UserAffiliateStatus =
  | 'guest'
  | 'user'
  | 'pending_application'
  | 'affiliate_approved'
  | 'affiliate_pending'
  | 'affiliate_rejected'

interface Props {
  userStatus: UserAffiliateStatus
  initialPhone?: string
  initialDisplayName?: string
  userEmail?: string
}

const FAQ_KEYS = [
  'faq1',
  'faq2',
  'faq3',
  'faq4',
  'faq5',
  'faq6',
  'faq7',
  'faq8',
  'faq9',
  'faq10',
  'faq11',
  'faq12',
  'faq13',
] as const



function FormLeftFlank() {
  return (
    <div className="hidden xl:flex flex-col items-center absolute left-1 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-[220px] 2xl:w-[260px]">
      {/* Ambient Olive Glow */}
      <div className="absolute -left-10 top-1/4 w-60 h-60 rounded-full bg-[#a5a58d]/25 blur-[70px] -z-10" />

      {/* Scientific Peptide & Molecular Architecture Vector Art */}
      <svg
        viewBox="0 0 280 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[#a5a58d]"
      >
        {/* Alignment Crosshairs */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.45">
          <line x1="15" y1="35" x2="35" y2="35" />
          <line x1="25" y1="25" x2="25" y2="45" />
          <line x1="245" y1="545" x2="265" y2="545" />
          <line x1="255" y1="535" x2="255" y2="555" />
        </g>

        {/* Concentric Calibration Reticle */}
        <circle cx="140" cy="270" r="125" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
        <circle cx="140" cy="270" r="90" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <circle cx="140" cy="270" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.2" />

        {/* Hexagonal Molecular Ring 1 (Top) */}
        <polygon
          points="85,95 120,75 155,95 155,135 120,155 85,135"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line x1="95" y1="130" x2="120" y2="145" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="145" y1="100" x2="145" y2="130" stroke="currentColor" strokeWidth="1" opacity="0.4" />

        {/* Connecting Chemical Bond */}
        <line x1="155" y1="115" x2="195" y2="138" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="195" cy="138" r="4" fill="currentColor" opacity="0.75" />

        {/* Molecular Ring 2 (Center) */}
        <line x1="195" y1="138" x2="195" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <polygon
          points="160,210 195,190 230,210 230,250 195,270 160,250"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.65"
        />
        <circle cx="195" cy="190" r="3.5" fill="currentColor" opacity="0.6" />
        <circle cx="230" cy="250" r="3.5" fill="currentColor" opacity="0.6" />

        {/* Functional Group Branch */}
        <line x1="230" y1="230" x2="265" y2="210" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="265" cy="210" r="3" fill="currentColor" opacity="0.5" />

        {/* Peptide Synthesis Linkage */}
        <line x1="160" y1="250" x2="120" y2="310" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <polygon
          points="85,330 120,310 155,330 155,370 120,390 85,370"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="120" cy="310" r="4" fill="currentColor" opacity="0.75" />
        <circle cx="120" cy="390" r="3.5" fill="currentColor" opacity="0.6" />

        {/* Sequential Amino Backbone */}
        <path
          d="M120 390 L120 440 L80 465 L80 510 L120 535"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeDasharray="4 3"
          opacity="0.45"
        />
        <circle cx="80" cy="465" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="80" cy="510" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="120" cy="535" r="4" fill="currentColor" opacity="0.75" />

        {/* Scientific Laboratory Microcopy */}
        <text x="35" y="55" fill="currentColor" opacity="0.5" fontSize="8" fontFamily="monospace" letterSpacing="0.18em">
          PEPTIDE LATTICE // RUO-01
        </text>
        <text x="35" y="68" fill="currentColor" opacity="0.38" fontSize="7" fontFamily="monospace">
          HPLC SEQ: 99%+ ACCREDITED
        </text>
        <text x="85" y="565" fill="currentColor" opacity="0.45" fontSize="8" fontFamily="monospace" letterSpacing="0.16em">
          BATCH: LAB VERIFIED
        </text>
      </svg>

      {/* Floating Mini Glass Trust Badge */}
      <div className="w-full mt-2 bg-white/85 backdrop-blur-md border border-[#b7b7a4]/60 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-500">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-7 h-7 rounded-full bg-[#a5a58d]/20 flex items-center justify-center text-[#20221c] shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#20221c]" />
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-widest text-[#a5a58d] uppercase font-mono block">
              STANDARD
            </span>
            <span className="text-xs font-bold text-neutral-900 font-heading">
              ≥99% HPLC Purity
            </span>
          </div>
        </div>
        <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
          Every peptide cataloged with transparent third-party HPLC and MS testing.
        </p>
      </div>
    </div>
  )
}

function FormRightFlank() {
  return (
    <div className="hidden xl:flex flex-col items-center absolute right-1 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-[220px] 2xl:w-[260px]">
      {/* Ambient Warm Sage Glow */}
      <div className="absolute -right-10 top-1/3 w-60 h-60 rounded-full bg-[#a5a58d]/25 blur-[70px] -z-10" />

      {/* Growth & Telemetry Vector Art */}
      <svg
        viewBox="0 0 280 580"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[#a5a58d]"
      >
        {/* Alignment Crosshairs */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.45">
          <line x1="245" y1="35" x2="265" y2="35" />
          <line x1="255" y1="25" x2="255" y2="45" />
          <line x1="15" y1="545" x2="35" y2="545" />
          <line x1="25" y1="535" x2="25" y2="555" />
        </g>

        {/* Concentric Telemetry Radar Grid */}
        <circle cx="140" cy="270" r="130" stroke="currentColor" strokeWidth="1" opacity="0.18" />
        <circle cx="140" cy="270" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.25" />
        <circle cx="140" cy="270" r="68" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="140" cy="270" r="34" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />

        {/* Telemetry Axis Guidelines */}
        <line x1="140" y1="110" x2="140" y2="430" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
        <line x1="20" y1="270" x2="260" y2="270" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />

        {/* Attributed Growth Curve */}
        <path
          d="M30 450 C 75 430, 95 360, 135 300 C 175 240, 205 170, 245 110"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Data Points Along Curve */}
        <circle cx="30" cy="450" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="90" cy="385" r="4.5" fill="currentColor" opacity="0.65" />
        <circle cx="135" cy="300" r="5" fill="currentColor" opacity="0.8" />
        <circle cx="185" cy="200" r="4.5" fill="currentColor" opacity="0.75" />
        <circle cx="245" cy="110" r="6" fill="currentColor" opacity="0.95" />

        {/* Dynamic Measurement Ticks */}
        <line x1="135" y1="300" x2="205" y2="300" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.35" />
        <line x1="205" y1="295" x2="205" y2="305" stroke="currentColor" strokeWidth="1" opacity="0.4" />

        <line x1="245" y1="110" x2="245" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="245" cy="60" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />

        {/* Satellite Data Orbiters */}
        <circle cx="65" cy="180" r="3" fill="currentColor" opacity="0.45" />
        <line x1="65" y1="180" x2="105" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.25" />
        <circle cx="215" cy="370" r="3.5" fill="currentColor" opacity="0.45" />
        <line x1="215" y1="370" x2="175" y2="330" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.25" />

        {/* Technical Typography Callouts */}
        <text x="140" y="55" fill="currentColor" opacity="0.5" fontSize="8" fontFamily="monospace" letterSpacing="0.18em">
          TELEMETRY // ENGINE
        </text>
        <text x="140" y="68" fill="currentColor" opacity="0.38" fontSize="7" fontFamily="monospace">
          DUAL-ATTRIBUTION PROTOCOL
        </text>
        <text x="35" y="565" fill="currentColor" opacity="0.45" fontSize="8" fontFamily="monospace" letterSpacing="0.16em">
          COMMISSION: 15% RECURRING
        </text>
      </svg>

      {/* Floating Mini Glass Telemetry Badge */}
      <div className="w-full mt-2 bg-white/85 backdrop-blur-md border border-[#b7b7a4]/60 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-transform duration-500">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-7 h-7 rounded-full bg-[#a5a58d]/20 flex items-center justify-center text-[#20221c] shrink-0">
            <TrendingUp className="w-4 h-4 text-[#20221c]" />
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-widest text-[#a5a58d] uppercase font-mono block">
              ATTRIBUTION
            </span>
            <span className="text-xs font-bold text-neutral-900 font-heading">
              15% Base Payout
            </span>
          </div>
        </div>
        <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
          Custom coupon code and direct referral link tracked with 7-day cookie windows.
        </p>
      </div>
    </div>
  )
}

function AttributionTrajectorySvg({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#fff1e6]/80 border border-[#eddcd2] p-4 sm:p-5 shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b7b7a4] mb-3">
        <span className="flex items-center gap-1.5 font-bold text-[#20221c]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
          Referral Conversion Funnel
        </span>
        <span className="text-[#a5a58d] font-semibold">Attribution Window: 7 Days</span>
      </div>
      <svg
        viewBox="0 0 520 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-24 sm:max-h-28"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="attrCurveGradient"
            x1="0"
            y1="0"
            x2="520"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#cb997e" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a5a58d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#20221c" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="attrAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#cb997e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#cb997e" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Technical Dotted Grid Lines */}
        <line x1="0" y1="30" x2="520" y2="30" stroke="#eddcd2" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="0" y1="70" x2="520" y2="70" stroke="#eddcd2" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="0" y1="110" x2="520" y2="110" stroke="#eddcd2" strokeWidth="1" />

        {/* Shaded Area Under Curve */}
        <path
          d="M 20 100 Q 140 95 240 65 T 500 20 L 500 110 L 20 110 Z"
          fill="url(#attrAreaGradient)"
        />

        {/* Dynamic Trajectory Bezier Curve */}
        <path
          d="M 20 100 Q 140 95 240 65 T 500 20"
          stroke="url(#attrCurveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Milestone Node 1: Initial Click */}
        <circle cx="20" cy="100" r="4.5" fill="#fff" stroke="#cb997e" strokeWidth="2.5" />
        <text x="20" y="118" fill="#b7b7a4" fontSize="9" fontFamily="monospace" textAnchor="start">
          Link Click
        </text>

        {/* Milestone Node 2: 7-Day Cookie Window */}
        <circle cx="250" cy="63" r="5" fill="#fff" stroke="#a5a58d" strokeWidth="2.5" />
        <rect x="208" y="38" width="84" height="18" rx="9" fill="#fff1e6" stroke="#eddcd2" strokeWidth="1" />
        <text x="250" y="50.5" fill="#20221c" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          7-Day Cookie
        </text>

        {/* Milestone Node 3: 15% Verified Commission */}
        <circle cx="500" cy="20" r="5.5" fill="#20221c" stroke="#fff" strokeWidth="2" />
        <rect x="435" y="0" width="80" height="18" rx="9" fill="#20221c" />
        <text x="475" y="12" fill="#fff1e6" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          15% Payout
        </text>
      </svg>
    </div>
  )
}

function TelemetryMatrixSvg({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-black/45 border border-[#a5a58d]/25 p-4 sm:p-5 shadow-2xs ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#b7b7a4] mb-3">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e] animate-pulse" />
          Real-Time Commission Telemetry
        </span>
        <span className="text-[#a5a58d] font-semibold font-mono">Status: Live</span>
      </div>
      <svg
        viewBox="0 0 380 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-24 sm:max-h-28"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="darkTelemetryArea" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a5a58d" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a5a58d" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="darkTelemetryPulse" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a5a58d" />
            <stop offset="50%" stopColor="#ddbea9" />
            <stop offset="100%" stopColor="#cb997e" />
          </linearGradient>
        </defs>

        {/* Ambient Grid Lines */}
        <line x1="0" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="110" x2="380" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Pulse Area */}
        <path
          d="M 15 95 L 60 90 L 100 80 L 135 85 L 180 50 L 220 58 L 260 35 L 310 40 L 365 15 L 365 110 L 15 110 Z"
          fill="url(#darkTelemetryArea)"
        />

        {/* Dynamic Activity Waveform */}
        <path
          d="M 15 95 L 60 90 L 100 80 L 135 85 L 180 50 L 220 58 L 260 35 L 310 40 L 365 15"
          stroke="url(#darkTelemetryPulse)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Key Event Markers */}
        <circle cx="180" cy="50" r="4" fill="#a5a58d" stroke="#191b16" strokeWidth="2" />
        <circle cx="260" cy="35" r="4" fill="#a5a58d" stroke="#191b16" strokeWidth="2" />
        <circle cx="365" cy="15" r="5" fill="#cb997e" stroke="#fff" strokeWidth="2" />

        {/* Dynamic Telemetry Tags */}
        <text x="180" y="38" fill="#b7b7a4" fontSize="8" fontFamily="monospace" textAnchor="middle">
          +Order #8491
        </text>
        <text x="365" y="8" fill="#cb997e" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="end">
          Payout Verified
        </text>

        {/* Coordinate ticks */}
        <circle cx="60" cy="90" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="100" cy="80" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="135" cy="85" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="220" cy="58" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="310" cy="40" r="1.5" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  )
}

export function AffiliatesLandingClient({
  userStatus,
  initialPhone = '',
  initialDisplayName = '',
  userEmail = '',
}: Props) {
  const tRaw = useTranslations('affiliate.landing')
  const t = (key: string): string => {
    try {
      if (tRaw.has(key as any)) {
        return tRaw(key as any)
      }
    } catch {
      // ignore
    }
    return AFFILIATE_FALLBACKS[key] || key
  }
  const router = useRouter()

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    displayName: initialDisplayName,
    phone: initialPhone,
    websiteUrl: '',
    platform: 'youtube',
    socialUrl: '',
    reach: '1k-10k',
    niche: '',
    methods: '',
  })

  // Restore draft if saved
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('veracue_affiliate_form_draft')
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData((prev) => ({
          ...prev,
          displayName: initialDisplayName || parsed.displayName || '',
          phone: initialPhone || parsed.phone || '',
          websiteUrl: parsed.websiteUrl || '',
          platform: parsed.platform || 'youtube',
          socialUrl: parsed.socialUrl || '',
          reach: parsed.reach || '1k-10k',
          niche: parsed.niche || '',
          methods: parsed.methods || '',
        }))
      }
    } catch {
      // ignore
    }
  }, [initialDisplayName, initialPhone])

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: val }
      try {
        sessionStorage.setItem('veracue_affiliate_form_draft', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const handleSignInRedirect = () => {
    try {
      sessionStorage.setItem('veracue_affiliate_form_draft', JSON.stringify(formData))
    } catch {}
    router.push('/login?redirect=/affiliates#apply')
  }

  // Interactive 4-Step Accordion State
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isAccordionHovered, setIsAccordionHovered] = useState(false)

  // Interactive Calculator State
  const [monthlyOrders, setMonthlyOrders] = useState(25)
  const [averageOrderValue, setAverageOrderValue] = useState(220)

  // Copy referral URL state & campaign routing
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeChannel, setActiveChannel] = useState('default')

  // Dynamic calculations
  const totalVolume = monthlyOrders * averageOrderValue
  const dynamicCommissionRate =
    monthlyOrders >= 100 ? 0.2 : monthlyOrders >= 50 ? 0.175 : 0.15
  const monthlyCommission = totalVolume * dynamicCommissionRate
  const annualCommission = monthlyCommission * 12

  // Auto-cycle the 4-step accordion when not hovered
  useEffect(() => {
    if (isAccordionHovered) return
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 4)
    }, 4500)
    return () => clearInterval(timer)
  }, [isAccordionHovered])

  // Copy URL Helper
  const handleCopyLink = (channel?: string) => {
    const ch = channel || activeChannel
    const url =
      ch && ch !== 'default'
        ? `https://veracuepeptides.com/ref/partner-id?c=${ch}`
        : 'https://veracuepeptides.com/ref/partner-id'
    navigator.clipboard.writeText(url)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  // Copy Code Helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText('VERA-RESEARCH15')
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Application Form Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // If guest, save draft and redirect to login
    if (userStatus === 'guest') {
      try {
        sessionStorage.setItem('veracue_affiliate_form_draft', JSON.stringify(formData))
      } catch {}
      setIsSubmitting(false)
      router.push('/login?redirect=/affiliates#apply')
      return
    }

    const data = new FormData(e.currentTarget)
    data.set('displayName', formData.displayName)
    data.set('phone', formData.phone)
    data.set('websiteUrl', formData.websiteUrl)
    data.set('platform', formData.platform)
    data.set('socialUrl', formData.socialUrl)
    data.set('reach', formData.reach)
    data.set('niche', formData.niche)
    data.set('methods', formData.methods)

    const result = await submitAffiliateApplication(data)

    setIsSubmitting(false)

    if (result.success) {
      try {
        sessionStorage.removeItem('veracue_affiliate_form_draft')
      } catch {}
      setSubmitted(true)
      scrollToSection('apply')
    } else {
      if (result.error === 'Unauthorized. Please log in to apply.') {
        try {
          sessionStorage.setItem('veracue_affiliate_form_draft', JSON.stringify(formData))
        } catch {}
        router.push('/login?redirect=/affiliates#apply')
      } else {
        setError(result.error || t('formErrorGeneric'))
      }
    }
  }

  const ACCORDION_STEPS = [
    {
      id: 0,
      title: t('step1Title'),
      desc: t('step1Desc'),
      tag: t('step1Tag'),
      microcopy: t('step1Microcopy'),
      icon: CheckCircle2,
      image: '/veracue-images/veracue-peptides-multi-vials-collection-flatlay.webp',
    },
    {
      id: 1,
      title: t('step2Title'),
      desc: t('step2Desc'),
      tag: t('step2Tag'),
      microcopy: t('step2Microcopy'),
      icon: LinkIcon,
      image: '/veracue-images/veracue-research-grade-50mg-gloved-hand.png',
    },
    {
      id: 2,
      title: t('step3Title'),
      desc: t('step3Desc'),
      tag: t('step3Tag'),
      microcopy: t('step3Microcopy'),
      icon: Share2,
      image: '/veracue-images/veracue-research-grade-50mg-dish-leaf-droplets.png',
    },
    {
      id: 3,
      title: t('step4Title'),
      desc: t('step4Desc'),
      tag: t('step4Tag'),
      microcopy: t('step4Microcopy'),
      icon: DollarSign,
      image: '/veracue-images/veracue-research-grade-50mg-ice-dropper.png',
    },
  ]

  return (
    <div className="w-full bg-[#f0efeb] text-neutral-900 font-sans selection:bg-[#a5a58d]/30 selection:text-neutral-900 overflow-x-clip">
      {/* 1. Signature Homepage Hero Architecture */}
      <AffiliateHero />

      {/* 2. Partner Application Portal (Positioned directly below header/hero as 2nd section) */}
      <section
        id="apply"
        className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 pt-4 sm:pt-6 md:pt-8 mb-16 sm:mb-24 relative z-20 scroll-mt-24 sm:scroll-mt-28"
      >
        {/* Left Side Organic Molecular SVG Design & Laboratory Badge */}
        <FormLeftFlank />

        {/* Right Side Telemetry & Attribution SVG Design & Telemetry Badge */}
        <FormRightFlank />

        {/* Centered Luxury Form Card */}
        <div className="w-full max-w-4xl mx-auto relative z-10">
          <FadeUp>
            <div className="relative w-full bg-white rounded-3xl sm:rounded-[36px] border border-[#eddcd2] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)]">
            <div className="mb-8 sm:mb-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff1e6] border border-[#eddcd2] text-[11px] font-bold tracking-[0.2em] text-[#a5a58d] uppercase font-mono mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a5a58d]" />
                {t('applyEyebrow')}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 font-heading tracking-tight leading-tight">
                {t('applyTitle')}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-xl leading-relaxed">
                Join the Veracue Partner Network. Submit your details below for automated onboarding and partner portal access.
              </p>
            </div>

            {/* Status Conditional Rendering */}
            {userStatus === 'affiliate_approved' ? (
              <div className="text-center py-12 max-w-lg mx-auto">
                <div className="w-20 h-20 bg-[#fff1e6] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#a5a58d]/50">
                  <Activity className="w-10 h-10 text-[#a5a58d]" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 font-heading mb-3">
                  {t('approvedTitle')}
                </h3>
                <p className="text-neutral-600 text-base leading-relaxed mb-8">
                  {t('approvedDesc')}
                </p>
                <HeroButton href="/affiliates/dashboard">
                  {t('approvedButton')}
                </HeroButton>
              </div>
            ) : userStatus === 'affiliate_pending' ||
              userStatus === 'pending_application' ||
              submitted ? (
              <div className="text-center py-12 max-w-lg mx-auto">
                <div className="w-20 h-20 bg-[#a5a58d]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#a5a58d]/40">
                  <CheckCircle2 className="w-10 h-10 text-[#20221c]" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 font-heading mb-3">
                  {t('pendingTitle')}
                </h3>
                <p className="text-neutral-600 text-base leading-relaxed">
                  {t('pendingDesc')}
                </p>
              </div>
            ) : userStatus === 'affiliate_rejected' ? (
              <div className="text-center py-12 max-w-lg mx-auto">
                <div className="w-20 h-20 bg-[#fff1e6] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#eddcd2]">
                  <XCircle className="w-10 h-10 text-[#cb997e]" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 font-heading mb-3">
                  {t('rejectedTitle')}
                </h3>
                <p className="text-neutral-600 text-base leading-relaxed">
                  {t('rejectedDesc')}
                </p>
              </div>
            ) : userStatus === 'guest' ? (
              <div className="text-center py-10 sm:py-14 max-w-xl mx-auto">
                <div className="w-20 h-20 bg-[#fff1e6] rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#eddcd2] shadow-sm text-neutral-800">
                  <Lock className="w-9 h-9 text-[#20221c]" />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fff1e6] border border-[#eddcd2] text-[11px] font-bold tracking-[0.18em] text-[#a5a58d] uppercase font-mono mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
                  Authentication Required
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-heading mb-3 tracking-tight">
                  {t('signInToApplyTitle')}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
                  {t('signInToApplyDesc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 max-w-md mx-auto">
                  <HeroButton href="/login?redirect=/affiliates#apply">
                    {t('signInToApplyButton')}
                  </HeroButton>
                  <HeroButton
                    href="/register?redirect=/affiliates#apply"
                    variant="secondary"
                  >
                    {t('createAccountButton')}
                  </HeroButton>
                </div>

                <div className="mt-12 pt-8 border-t border-[#eddcd2] grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
                  <div className="bg-[#fff1e6] p-4 rounded-2xl border border-[#eddcd2]">
                    <div className="flex items-center gap-2 mb-1">
                      <Percent className="w-4 h-4 text-[#cb997e]" />
                      <span className="text-xs font-bold text-neutral-900 font-heading uppercase tracking-wider">
                        15% Base Rate
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">
                      Recurring commission on every qualified referral.
                    </p>
                  </div>
                  <div className="bg-[#fff1e6] p-4 rounded-2xl border border-[#eddcd2]">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#cb997e]" />
                      <span className="text-xs font-bold text-neutral-900 font-heading uppercase tracking-wider">
                        7-Day Cookie
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">
                      Extended attribution window for all link visits.
                    </p>
                  </div>
                  <div className="bg-[#fff1e6] p-4 rounded-2xl border border-[#eddcd2]">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-[#cb997e]" />
                      <span className="text-xs font-bold text-neutral-900 font-heading uppercase tracking-wider">
                        Monthly Payouts
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">
                      Reliable direct deposits with zero minimum threshold.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-[#fff1e6] text-[#cb997e] p-4 rounded-xl border border-[#eddcd2] text-sm font-semibold flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#cb997e] shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Verified Member Status Banner */}
                <div className="bg-[#fff1e6] border border-[#a5a58d]/50 rounded-2xl px-4 py-3.5 flex items-center gap-2.5 text-xs text-[#20221c] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#a5a58d] shrink-0" />
                  <span>
                    {t('applyingAsUser')}{' '}
                    <strong className="font-semibold">
                      {userEmail || formData.displayName || 'Verified Member'}
                    </strong>
                    . Your phone number will update your profile automatically.
                  </span>
                </div>

                {/* Section 01: Basic Information */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#eddcd2] pb-3">
                    <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase font-heading flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#f0efeb] text-[#20221c] text-[10px] font-mono font-bold flex items-center justify-center">
                        01
                      </span>
                      {t('basicInfoTitle')}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-medium">* Required fields</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Display Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="displayName"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                      >
                        {t('displayNameLabel')} <span className="text-[#cb997e]">*</span>
                      </Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        required
                        value={formData.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        placeholder={t('displayNamePlaceholder')}
                        className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4 placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading flex items-center justify-between"
                      >
                        <span>
                          {t('phoneLabel')} <span className="text-[#cb997e]">*</span>
                        </span>
                        <span className="text-[10px] text-neutral-500 font-normal lowercase tracking-normal">e.g. +1 555-0100</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder={t('phonePlaceholder')}
                          className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all pl-10 pr-4 placeholder:text-neutral-400"
                        />
                        <Phone className="w-4 h-4 text-[#a5a58d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="websiteUrl"
                      className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                    >
                      {t('websiteUrlLabel')}
                    </Label>
                    <Input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                      placeholder="https://yourwebsite.com or portfolio"
                      className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4 placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Section 02: Primary Platform */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#eddcd2] pb-3">
                    <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase font-heading flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#f0efeb] text-[#20221c] text-[10px] font-mono font-bold flex items-center justify-center">
                        02
                      </span>
                      {t('primaryPlatformTitle')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Platform Select */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="platform"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                      >
                        {t('platformLabel')} <span className="text-[#cb997e]">*</span>
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(val) => handleInputChange('platform', val)}
                        name="platform"
                        required
                      >
                        <SelectTrigger
                          id="platform"
                          className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4"
                        >
                          <SelectValue placeholder={t('platformPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white border border-[#eddcd2] text-neutral-900 shadow-2xl">
                          <SelectItem value="youtube">{t('platformYoutube')}</SelectItem>
                          <SelectItem value="instagram">{t('platformInstagram')}</SelectItem>
                          <SelectItem value="tiktok">{t('platformTiktok')}</SelectItem>
                          <SelectItem value="twitter">{t('platformTwitter')}</SelectItem>
                          <SelectItem value="reddit">{t('platformReddit')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Profile URL / Username */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="socialUrl"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                      >
                        {t('profileUrlLabel')}
                      </Label>
                      <Input
                        id="socialUrl"
                        name="socialUrl"
                        type="text"
                        value={formData.socialUrl}
                        onChange={(e) => handleInputChange('socialUrl', e.target.value)}
                        placeholder="https://youtube.com/@channel or @handle"
                        className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 03: Audience & Strategy */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#eddcd2] pb-3">
                    <span className="text-xs font-bold text-neutral-900 tracking-wider uppercase font-heading flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#f0efeb] text-[#20221c] text-[10px] font-mono font-bold flex items-center justify-center">
                        03
                      </span>
                      {t('audienceStrategyTitle')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Monthly Reach */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="reach"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                      >
                        {t('reachLabel')} <span className="text-[#cb997e]">*</span>
                      </Label>
                      <Select
                        value={formData.reach}
                        onValueChange={(val) => handleInputChange('reach', val)}
                        name="reach"
                        required
                      >
                        <SelectTrigger
                          id="reach"
                          className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4"
                        >
                          <SelectValue placeholder={t('reachPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl bg-white border border-[#eddcd2] text-neutral-900 shadow-2xl">
                          <SelectItem value="<1k">{t('reachLess1k')}</SelectItem>
                          <SelectItem value="1k-10k">{t('reach1k10k')}</SelectItem>
                          <SelectItem value="10k-100k">{t('reach10k100k')}</SelectItem>
                          <SelectItem value="100k+">{t('reach100kPlus')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Niche */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="niche"
                        className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                      >
                        {t('nicheLabel')}
                      </Label>
                      <Input
                        id="niche"
                        name="niche"
                        value={formData.niche}
                        onChange={(e) => handleInputChange('niche', e.target.value)}
                        placeholder={t('nichePlaceholder')}
                        className="h-12 sm:h-13 rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all px-4 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Promotion Methods Textarea */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="methods"
                      className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-heading"
                    >
                      {t('methodsLabel')} <span className="text-[#cb997e]">*</span>
                    </Label>
                    <Textarea
                      id="methods"
                      name="methods"
                      required
                      value={formData.methods}
                      onChange={(e) => handleInputChange('methods', e.target.value)}
                      placeholder={t('methodsPlaceholder')}
                      className="min-h-[120px] rounded-xl bg-white border border-[#eddcd2] hover:border-[#a5a58d] focus:border-[#a5a58d] focus-visible:border-[#a5a58d] focus-visible:shadow-focus focus-visible:outline-none text-neutral-900 text-sm font-medium transition-all p-4 resize-y leading-relaxed placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Section 04: Terms & Action */}
                <div className="pt-4 sm:pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 border-t border-[#eddcd2]">
                  <div className="flex flex-row items-start space-x-3.5 bg-[#fff1e6]/60 p-4 sm:p-5 rounded-2xl border border-[#eddcd2] flex-1">
                    <Checkbox
                      id="terms"
                      name="terms"
                      required
                      className="mt-0.5 border-[#a5a58d] data-[state=checked]:bg-[#20221c] data-[state=checked]:border-[#20221c] data-[state=checked]:text-white transition-colors"
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="terms"
                        className="text-xs sm:text-sm font-bold text-neutral-900 cursor-pointer font-heading block"
                      >
                        {t('termsLabel')}
                      </Label>
                      <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                        {t('termsDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex justify-end">
                    <HeroButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto h-13 px-8 text-sm sm:text-base font-bold justify-center shadow-lg shadow-black/5"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('submitting')}</span>
                        </span>
                      ) : (
                        t('submitNow')
                      )}
                    </HeroButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </FadeUp>
        </div>
      </section>

      {/* 3. Top Stats Triad Pill Bar */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 mb-16 sm:mb-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          {/* Stat 1: 15% Base Commission */}
          <FadeUp delay={0.1}>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[24px] p-6 sm:p-7 border border-[#b7b7a4]/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-[-0.03em] text-[#20221c] font-heading leading-none">
                  15%
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 uppercase tracking-widest mt-2 font-heading">
                  Base Commission
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#a5a58d]/20 text-[#20221c] border border-[#a5a58d]/40">
                EARN
              </span>
            </div>
          </FadeUp>

          {/* Stat 2: 7-Day Cookie Duration */}
          <FadeUp delay={0.2}>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[24px] p-6 sm:p-7 border border-[#b7b7a4]/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-[-0.03em] text-[#20221c] font-heading leading-none">
                  7-DAY
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-neutral-600 uppercase tracking-widest mt-2 font-heading">
                  Cookie Duration
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#eddcd2] text-[#20221c] border border-[#ddbea9]/60">
                TRACK
              </span>
            </div>
          </FadeUp>

          {/* Stat 3: Monthly Schedule */}
          <FadeUp delay={0.3}>
            <div className="bg-[#20221c] text-white rounded-2xl sm:rounded-[24px] p-6 sm:p-7 border border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-[-0.03em] text-[#fff1e6] font-heading leading-none">
                  MONTHLY
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/70 uppercase tracking-widest mt-2 font-heading">
                  Payout Schedule
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/15 text-white border border-white/20">
                AUTOMATED
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-20 relative z-10">
        {/* 4. Section: Intro & Asymmetrical Bento Grid */}
        <section className="mb-24 sm:mb-32">
          <FadeUp>
            <div className="max-w-3xl mb-10 sm:mb-14">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-7 h-px bg-[#a5a58d]" />
                <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#20221c] uppercase font-serif">
                  {t('introEyebrow')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-neutral-900 leading-tight mb-4 font-heading">
                {t('introTitle')}
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                {t('introDescription')}
              </p>
            </div>
          </FadeUp>

          {/* Enhanced Responsive Bento Cards with Minimal SVGs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Wide Warm Luxury Card (Linen & Terracotta accent) */}
            <FadeUp delay={0.1} className="w-full md:col-span-1 lg:col-span-7 flex flex-col">
              <div className="bg-[#fff1e6] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-9 lg:p-10 border border-[#eddcd2] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(203,153,126,0.14)] transition-all duration-500 h-full flex flex-col justify-between">
                <div className="relative z-10">
                  {/* Top Bar with Modern Squircle Badge & Status Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#20221c] text-[#fff1e6] flex items-center justify-center border border-neutral-700/60 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <Percent className="w-6 h-6 text-[#cb997e]" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#eddcd2] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#cb997e] uppercase shadow-2xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cb997e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cb997e]" />
                      </span>
                      Dual Attribution Engine
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-neutral-900 tracking-tight font-heading mb-3 leading-snug">
                    {t('benefit1')}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 font-normal">
                    {t('benefit2')}
                  </p>

                  {/* Minimal Trajectory SVG Artwork */}
                  <div className="mb-6">
                    <AttributionTrajectorySvg />
                  </div>

                  {/* Feature Value Pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6">
                    <span className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#eddcd2] text-xs font-bold text-neutral-800 font-heading shadow-2xs">
                      15% Base Commission
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#eddcd2] text-xs font-bold text-neutral-800 font-heading shadow-2xs">
                      15% Customer Coupon
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#eddcd2] text-xs font-bold text-neutral-800 font-heading shadow-2xs">
                      7-Day Cookie Window
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pt-4 sm:pt-5 border-t border-[#eddcd2] flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-neutral-700 font-heading">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#a5a58d] shrink-0" />
                    <span className="uppercase tracking-wider text-[11px] sm:text-xs">
                      Guaranteed verified order attribution
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#b7b7a4] font-normal">
                    Dual-Code & Link Tracking
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Card 2: Deep Obsidian/Charcoal Contrast Card */}
            <FadeUp delay={0.2} className="w-full md:col-span-1 lg:col-span-5 flex flex-col">
              <div className="bg-[#20221c] text-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-9 lg:p-10 border border-[#a5a58d]/30 shadow-[0_12px_40px_rgba(0,0,0,0.16)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 h-full flex flex-col justify-between">
                <div className="relative z-10">
                  {/* Top Bar with Modern Squircle Badge & Status Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#a5a58d]/20 text-[#fff1e6] flex items-center justify-center border border-[#a5a58d]/35 shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <ShieldCheck className="w-6 h-6 text-[#fff1e6]" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-[#a5a58d] uppercase shadow-2xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a5a58d] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a5a58d]" />
                      </span>
                      Live Ledger Tracking
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-extrabold text-[#fff1e6] tracking-tight font-heading mb-3 leading-snug">
                    {t('benefit3')}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal">
                    {t('benefit4')}
                  </p>

                  {/* Minimal Telemetry SVG Artwork */}
                  <div className="mb-6">
                    <TelemetryMatrixSvg />
                  </div>

                  {/* Feature Value Pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6">
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white/90 font-heading">
                      Direct Bank ACH
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white/90 font-heading">
                      Wire Transfer
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white/90 font-heading">
                      Crypto / USDC
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pt-4 sm:pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-white/70 font-heading">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#a5a58d] shrink-0" />
                    <span className="uppercase tracking-wider text-[11px] sm:text-xs">
                      Disbursed Monthly • Zero Minimum
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#a5a58d]/90 font-normal">
                    Automated Settlement
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 5. Section: How It Works & Interactive 4-Step Accordion */}
        <section className="mb-24 sm:mb-32">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#b7b7a4]/50 text-xs font-semibold uppercase tracking-widest text-neutral-700 font-serif mb-3">
                <span>✦</span>
                <span>Simple Roadmap</span>
                <span>✦</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] text-neutral-900 font-heading mb-3.5 leading-tight">
                {t('howItWorksTitle')}
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {t('howItWorksSubtitle')}
              </p>
            </div>

            {/* 2 Dual Value Proposition Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-14">
              {/* Card 1: Commission for Partner */}
              <div className="bg-white rounded-2xl sm:rounded-[26px] p-6 sm:p-9 border border-[#b7b7a4]/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#a5a58d]/20 text-[#20221c] flex items-center justify-center border border-[#a5a58d]/40">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#20221c] text-[#fff1e6] font-heading">
                      15%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading tracking-tight mb-2.5">
                    {t('commissionCardTitle')}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {t('commissionCardDesc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-widest font-heading">
                  <span>{t('commissionCardMicrocopy')}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Card 2: Discount for Customers */}
              <div className="bg-white rounded-2xl sm:rounded-[26px] p-6 sm:p-9 border border-[#b7b7a4]/40 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#cb997e]/20 text-[#20221c] flex items-center justify-center border border-[#cb997e]/40">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#cb997e] text-white font-heading">
                      15%
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading tracking-tight mb-2.5">
                    {t('discountCardTitle')}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {t('discountCardDesc')}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-widest font-heading">
                  <span>{t('discountCardMicrocopy')}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>

            {/* Interactive 4-Step Accordion with Photography */}
            <div
              className="w-full h-[520px] sm:h-[580px] md:h-[620px] flex flex-col md:flex-row gap-3 sm:gap-4 select-none"
              onMouseEnter={() => setIsAccordionHovered(true)}
              onMouseLeave={() => setIsAccordionHovered(false)}
            >
              {ACCORDION_STEPS.map((step, index) => {
                const isActive = activeStepIndex === index
                const Icon = step.icon

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActiveStepIndex(index)}
                    onMouseEnter={() => setActiveStepIndex(index)}
                    animate={{ flex: isActive ? 4.5 : 1 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-2xl sm:rounded-[28px] overflow-hidden cursor-pointer flex flex-col md:flex-row shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${
                      isActive
                        ? 'bg-[#20221c] text-white border border-neutral-700/60'
                        : 'bg-white text-neutral-900 border border-[#b7b7a4]/50 hover:bg-[#fff1e6]/40'
                    }`}
                  >
                    {/* Background Photographic Image (Crossfades when active) */}
                    <div
                      className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
                        isActive ? 'opacity-40' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className={`object-cover ${
                          isActive ? 'scale-100' : 'scale-110'
                        } transition-transform duration-1000 ease-out`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 pointer-events-none" />
                    </div>

                    {/* Watermark Step Number */}
                    <div
                      className={`absolute -bottom-6 md:-bottom-8 right-3 md:-right-4 font-heading font-black leading-none transition-all duration-700 pointer-events-none z-10 select-none ${
                        isActive
                          ? 'text-[110px] md:text-[200px] text-white/[0.04]'
                          : 'text-[50px] md:text-[80px] text-black/[0.03]'
                      }`}
                    >
                      0{index + 1}
                    </div>

                    {/* Accordion Content Container */}
                    <div className="relative z-20 flex flex-col md:flex-row w-full h-full p-5 sm:p-7 md:p-8">
                      {/* Left/Top Icon Column */}
                      <div
                        className={`flex md:flex-col items-center justify-between md:justify-start gap-3 md:w-14 shrink-0 transition-all duration-500 ${
                          isActive ? '' : 'w-full'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                            isActive
                              ? 'bg-[#a5a58d]/30 border-white/30 text-white shadow-sm'
                              : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                        </div>

                        {/* Vertical Title when collapsed */}
                        <div
                          className={`transition-all duration-500 flex-1 flex md:items-center justify-center md:pt-6 ${
                            isActive
                              ? 'opacity-0 w-0 h-0 hidden md:block'
                              : 'opacity-100 w-full'
                          }`}
                        >
                          <h3 className="font-heading font-bold uppercase tracking-widest whitespace-nowrap text-xs sm:text-sm md:text-base md:[writing-mode:vertical-rl] md:rotate-180 text-neutral-600">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Expanded Content Area */}
                      <div
                        className={`flex flex-col justify-end overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? 'opacity-100 flex-1 ml-0 md:ml-6 mt-4 md:mt-0'
                            : 'opacity-0 w-0 h-0'
                        }`}
                      >
                        <div className="min-w-[220px]">
                          <span className="text-[#cb997e] font-mono tracking-widest text-xs font-bold uppercase mb-2 block">
                            STEP 0{index + 1} • {step.microcopy}
                          </span>
                          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading tracking-tight mb-3 leading-tight">
                            {step.title}
                          </h4>
                          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-md font-normal leading-relaxed mb-4">
                            {step.desc}
                          </p>
                          <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 tracking-wider uppercase font-heading">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            {step.tag}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </FadeUp>
        </section>

        {/* 6. Section: Commission Structure, Live Calculation & Interactive Calculator */}
        <section id="calculator" className="mb-24 sm:mb-32 scroll-mt-28">
          <div className="w-full bg-[#20221c] text-white rounded-3xl sm:rounded-[36px] p-4 sm:p-8 md:p-12 lg:p-16 shadow-[0_16px_50px_rgba(0,0,0,0.2)] border border-neutral-800 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Commission Structure, Stats & Live Example (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-8 h-px bg-[#a5a58d]" />
                    <span className="text-xs uppercase font-serif tracking-[0.24em] text-[#a5a58d] font-semibold">
                      {t('commissionStructureTitle')}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fff1e6] font-heading tracking-tight mb-4 leading-tight">
                    Industry-Leading <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eddcd2] to-white/60">
                      Transparent Payouts.
                    </span>
                  </h2>

                  <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg font-normal">
                    {t('commissionStructureDesc')}
                  </p>

                  {/* 2 Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <span className="block text-3xl font-black text-white font-heading mb-1">
                        {t('statCookieValue')}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#a5a58d] mb-1.5 block font-heading">
                        {t('statCookieLabel')}
                      </span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {t('statCookieDesc')}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                      <span className="block text-3xl font-black text-white font-heading mb-1">
                        {t('statDualValue')}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#cb997e] mb-1.5 block font-heading">
                        {t('statDualLabel')}
                      </span>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {t('statDualDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example Order Breakdown Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 flex justify-between items-center font-heading">
                    <span>{t('commissionExampleTitle')}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px]">
                      BENCHMARK
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                      <span className="text-white/60 font-medium">
                        {t('commissionExampleOrderValueLabel')}
                      </span>
                      <span className="font-mono text-white font-bold">$200.00</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                      <span className="text-white/60 font-medium">
                        {t('commissionExampleDiscountLabel')}
                      </span>
                      <span className="font-mono text-[#cb997e] font-semibold">
                        -$30.00
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#a5a58d] font-bold text-xs uppercase tracking-wider font-heading">
                        {t('commissionExampleYourCommissionLabel')}
                      </span>
                      <span className="font-mono text-2xl font-black text-[#fff1e6]">
                        $30.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Dual-Slider Calculator (6 cols) */}
              <div className="lg:col-span-6 bg-black/40 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 sm:mb-8 pb-3.5 sm:pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-[#cb997e] shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white font-heading truncate">
                      Earnings Simulator
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-[#a5a58d]/20 text-[#a5a58d] border border-[#a5a58d]/30 font-heading shrink-0">
                    {(dynamicCommissionRate * 100).toFixed(1)}% Tier
                  </span>
                </div>

                {/* Slider 1: Monthly Referred Orders */}
                <div className="mb-6 sm:mb-7">
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 font-heading">
                      Monthly Referred Orders
                    </label>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white">
                      {monthlyOrders}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={200}
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#cb997e]"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-white/40 mt-1.5">
                    <span>1 order</span>
                    <span>50 (17.5% Tier)</span>
                    <span>100+ (20% Tier)</span>
                  </div>
                </div>

                {/* Slider 2: Average Cart Value */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 font-heading">
                      Average Cart Value
                    </label>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white">
                      ${averageOrderValue}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={500}
                    step={10}
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#a5a58d]"
                  />
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-white/40 mt-1.5">
                    <span>$80</span>
                    <span>$220 (Catalog Avg)</span>
                    <span>$500+</span>
                  </div>
                </div>

                {/* Projected Earnings Output Badges */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 sm:mb-8">
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-wider block font-heading mb-1 truncate">
                      Monthly Payout
                    </span>
                    <span className="font-mono text-xl xs:text-2xl sm:text-3xl font-black text-[#fff1e6] block truncate">
                      ${monthlyCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-wider block font-heading mb-1 truncate">
                      Annual Projected
                    </span>
                    <span className="font-mono text-xl xs:text-2xl sm:text-3xl font-black text-[#cb997e] block truncate">
                      ${annualCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Benchmark Reference Milestones */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 font-heading">
                    {t('monthlyEarningsTitle')}
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center">
                    {[
                      { orders: '10', payout: '$330', featured: false },
                      { orders: '25', payout: '$825', featured: false },
                      { orders: '50', payout: '$1,925', featured: true },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2 sm:p-2.5 rounded-xl border flex flex-col justify-between min-w-0 transition-all ${
                          item.featured
                            ? 'bg-[#cb997e]/20 border-[#cb997e]/40 shadow-xs'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="mb-1">
                          <span className="font-heading font-bold text-xs sm:text-sm text-white block leading-none mb-1">
                            {item.orders}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-white/50 block tracking-tight truncate leading-tight uppercase">
                            referrals
                          </span>
                        </div>
                        <div className="pt-1 border-t border-white/10">
                          <span
                            className={`font-mono font-bold text-[11px] xs:text-xs sm:text-sm block truncate ${
                              item.featured ? 'text-[#fff1e6] font-black' : 'text-white'
                            }`}
                          >
                            {item.payout}
                            <span className="text-[9px] font-normal text-white/50">/mo</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply CTA from calculator */}
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <HeroButton href="#apply" direction="up" className="w-full justify-between">
                    Apply to Start Earning
                  </HeroButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Section: Comprehensive Management Tools (4 Bento Cards) */}
        <section className="mb-24 sm:mb-32">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a5a58d] font-serif block mb-2">
                {t('managementToolsTitle')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 font-heading">
                Everything You Need to Scale.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Tool 1: Real-Time Analytics (Wide, Dark Bento Card) */}
              <div className="md:col-span-2 bg-[#20221c] text-white rounded-3xl sm:rounded-[32px] p-4 sm:p-7 md:p-9 border border-[#a5a58d]/25 shadow-[0_12px_40px_rgba(0,0,0,0.18)] relative overflow-hidden group flex flex-col justify-between">
                <div>
                  {/* Header Row: Icon + Eyebrow + Live Ping Pill */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 text-[#fff1e6] flex items-center justify-center border border-white/15 backdrop-blur-md shadow-xs group-hover:scale-105 group-hover:border-[#cb997e]/50 transition-all duration-300 shrink-0">
                        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#cb997e]" strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#a5a58d] uppercase block">
                          {t('tool1Tag')} • {t('tool1Microcopy')}
                        </span>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold font-heading text-[#fff1e6] tracking-tight">
                          {t('tool1Title')}
                        </h3>
                      </div>
                    </div>

                    {/* Live Telemetry Streaming Pill */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-[#a5a58d]/30 text-[10px] sm:text-[11px] font-mono text-[#eddcd2] shadow-inner shrink-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cb997e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cb997e]" />
                      </span>
                      <span className="font-semibold tracking-wide">LIVE STREAMING</span>
                      <span className="text-[#a5a58d] hidden sm:inline">• &lt;45ms</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mb-5 sm:mb-6">
                    {t('tool1Desc')}
                  </p>

                  {/* Micro Metric Stat Badges */}
                  <div className="relative z-10 grid grid-cols-3 gap-1.5 sm:gap-4 mb-6 p-2.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                    <div className="border-r border-white/10 pr-1.5 sm:pr-2 min-w-0">
                      <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50 truncate">
                        Clicks
                      </span>
                      <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5 min-w-0">
                        <span className="text-sm xs:text-base sm:text-xl font-bold font-mono text-white truncate">1,842</span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#a5a58d] hidden sm:inline">
                          +24%
                        </span>
                      </div>
                    </div>
                    <div className="border-r border-white/10 pr-1.5 sm:pr-2 pl-1.5 sm:pl-2 min-w-0">
                      <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50 truncate">
                        Orders
                      </span>
                      <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5 min-w-0">
                        <span className="text-sm xs:text-base sm:text-xl font-bold font-mono text-white truncate">114</span>
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#cb997e] hidden sm:inline">
                          6.2% CVR
                        </span>
                      </div>
                    </div>
                    <div className="pl-1.5 sm:pl-2 min-w-0">
                      <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50 truncate">
                        Earned
                      </span>
                      <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5 min-w-0">
                        <span className="text-sm xs:text-base sm:text-xl font-black font-mono text-[#fff1e6] truncate">
                          $2,480<span className="hidden xs:inline text-xs text-[#cb997e]">.00</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Modern Telemetry Bar Chart with Days of Week & Floating Peak Tooltip */}
                <div className="relative z-10 pt-2">
                  <div className="flex justify-start sm:justify-end mb-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#191b16] border border-[#cb997e]/40 text-[9px] xs:text-[10px] font-mono text-[#fff1e6] shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
                      <span>Peak Saturday: <strong className="text-[#cb997e]">$520</strong> (24 orders)</span>
                    </div>
                  </div>

                  <div className="relative flex items-end gap-1.5 xs:gap-2 sm:gap-3 h-24 sm:h-28 px-1 sm:px-2 pt-2 border-b border-white/15">
                    {/* Horizontal guide lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                      <div className="border-b border-dashed border-white/40 w-full" />
                      <div className="border-b border-dashed border-white/40 w-full" />
                      <div className="border-b border-dashed border-white/40 w-full" />
                    </div>

                    {[
                      { day: 'Mon', height: 42, amount: '$180' },
                      { day: 'Tue', height: 68, amount: '$310' },
                      { day: 'Wed', height: 55, amount: '$240' },
                      { day: 'Thu', height: 85, amount: '$420' },
                      { day: 'Fri', height: 72, amount: '$360' },
                      { day: 'Sat', height: 100, amount: '$520', peak: true },
                      { day: 'Sun', height: 88, amount: '$450' },
                    ].map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group/bar relative">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none bg-black/90 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#fff1e6] whitespace-nowrap z-20 shadow-md">
                          {item.amount}
                        </div>
                        <div
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            item.peak
                              ? 'bg-gradient-to-t from-[#a5a58d] via-[#cb997e] to-[#fff1e6] shadow-[0_0_12px_rgba(203,153,126,0.5)]'
                              : 'bg-gradient-to-t from-[#a5a58d]/50 to-[#cb997e]/80 group-hover/bar:from-[#a5a58d] group-hover/bar:to-[#cb997e]'
                          }`}
                          style={{ height: `${item.height}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Day Labels */}
                  <div className="flex justify-between px-2 pt-2 text-[10px] font-mono text-white/40 uppercase">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span className="text-[#cb997e] font-bold">Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Tool 2: Link Management with Multi-Channel Routing Hub */}
              <div className="md:col-span-1 bg-white rounded-3xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-[#eddcd2] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-[#cb997e]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div>
                  {/* Header: Icon + Chip */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#eddcd2] text-[#20221c] flex items-center justify-center border border-[#ddbea9] shadow-2xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <LinkIcon className="w-6 h-6 text-[#20221c]" strokeWidth={2} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#f0efeb] border border-[#eddcd2] text-[10px] font-mono font-bold text-[#a5a58d] uppercase tracking-wider">
                      7-Day Cookie
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a5a58d] uppercase block mb-1">
                    {t('tool2Tag')} • {t('tool2Microcopy')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading mb-2.5">
                    {t('tool2Title')}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                    {t('tool2Desc')}
                  </p>

                  {/* Channel Campaign Filter Pills */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
                      Campaign Routing:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'default', label: 'Main Link' },
                        { id: 'youtube', label: 'YouTube' },
                        { id: 'newsletter', label: 'Newsletter' },
                        { id: 'social', label: 'Social Bio' },
                      ].map((channel) => (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => setActiveChannel(channel.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                            activeChannel === channel.id
                              ? 'bg-[#20221c] text-[#fff1e6] font-bold shadow-xs'
                              : 'bg-[#f0efeb] text-neutral-600 hover:bg-[#eddcd2] hover:text-neutral-900'
                          }`}
                        >
                          {channel.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Referral Link Box & Interactive Copy Button */}
                <div className="mt-4 pt-4 border-t border-[#eddcd2]">
                  <div className="relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#f0efeb]/70 border border-[#eddcd2] hover:border-[#cb997e] transition-colors duration-200">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-2 h-2 rounded-full bg-[#cb997e] shrink-0" />
                      <span className="text-xs font-mono truncate text-neutral-600">
                        veracue.com/ref/<span className="font-bold text-neutral-900">partner-id{activeChannel !== 'default' ? `?c=${activeChannel}` : ''}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(activeChannel)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-[#20221c] hover:bg-[#cb997e] text-[#fff1e6] text-xs font-medium font-heading transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      {copiedUrl ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#fff1e6]" />
                          <span className="font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mini Attribution Proof Chip */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-2.5 px-1">
                    <span className="flex items-center gap-1 text-[#a5a58d] font-semibold">
                      <Sparkles className="w-3 h-3" /> Auto-Applies Tracking
                    </span>
                    <span>426 clicks logged</span>
                  </div>
                </div>
              </div>

              {/* Tool 3: Discount Code Management (Coupon Simulator & Webhook Ping) */}
              <div className="md:col-span-1 bg-white rounded-3xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 border border-[#eddcd2] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-[#a5a58d]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                <div>
                  {/* Header: Icon + Chip */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#fff1e6] text-[#cb997e] flex items-center justify-center border border-[#eddcd2] shadow-2xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <Percent className="w-6 h-6 text-[#cb997e]" strokeWidth={2.2} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#fff1e6] border border-[#eddcd2] text-[10px] font-mono font-bold text-[#cb997e] uppercase tracking-wider">
                      Direct Checkout
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a5a58d] uppercase block mb-1">
                    {t('tool3Tag')} • {t('tool3Microcopy')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading mb-2.5">
                    {t('tool3Title')}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                    {t('tool3Desc')}
                  </p>

                  {/* Voucher Ticket UI Graphic */}
                  <div className="p-3 sm:p-4 rounded-2xl bg-[#fff1e6] border border-dashed border-[#eddcd2] relative overflow-hidden shadow-xs mb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#a5a58d] font-bold">
                        Audience Code
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#cb997e] text-white text-[10px] font-mono font-black tracking-wide">
                        15% DISCOUNT
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white px-2.5 sm:px-3 py-2 rounded-xl border border-[#eddcd2]">
                      <span className="font-mono font-black text-xs sm:text-sm tracking-wider text-[#20221c] truncate">
                        VERA-RESEARCH15
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="text-neutral-400 hover:text-[#cb997e] transition-colors text-[11px] font-mono font-semibold flex items-center gap-1 shrink-0"
                      >
                        {copiedCode ? (
                          <span className="text-[#a5a58d] font-bold">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-500 mt-2 leading-tight">
                      Buyers save 15% at checkout. Your 15% commission syncs automatically.
                    </p>
                  </div>
                </div>

                {/* Real-Time Webhook Status Footer */}
                <div className="mt-auto pt-4 border-t border-[#eddcd2] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cb997e] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#cb997e]" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#20221c] font-heading">
                      Live Checkout Webhooks
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a5a58d] font-bold">
                    INSTANT SYNC
                  </span>
                </div>
              </div>

              {/* Tool 4: Commission Reports & Resources (Wide, Solid Linen) */}
              <div className="md:col-span-2 bg-[#fff1e6] rounded-3xl sm:rounded-[32px] p-4 sm:p-7 md:p-9 border border-[#eddcd2] shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 group">

                {/* Left Content Column */}
                <div className="max-w-md relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#20221c] flex items-center justify-center border border-[#eddcd2] shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <FileText className="w-6 h-6 text-[#20221c]" strokeWidth={1.8} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/80 border border-[#eddcd2] text-[10px] font-mono font-bold text-[#20221c] uppercase tracking-wider shadow-2xs">
                      Monthly Payouts • Zero Minimums
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#a5a58d] uppercase block mb-1">
                    {t('tool4Tag')} • {t('tool4Microcopy')}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 font-heading mb-2.5 tracking-tight">
                    {t('tool4Title')}
                  </h3>
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-5">
                    {t('tool4Desc')}
                  </p>

                  {/* Feature bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-neutral-700 font-heading">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#a5a58d]" />
                      <span>Monthly PDF Statements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#a5a58d]" />
                      <span>Raw CSV Attribution Logs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#a5a58d]" />
                      <span>Batch COA Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#a5a58d]" />
                      <span>3D Peptide Renders & Banners</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Resource Deck */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto relative z-10">
                  {/* Resource Tile 1: Creative Library */}
                  <div className="p-4 rounded-2xl bg-white border border-[#ddbea9] shadow-xs hover:border-[#cb997e] hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group/tile cursor-pointer w-full sm:w-64">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fff1e6] text-[#cb997e] flex items-center justify-center border border-[#eddcd2] shrink-0">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-neutral-900 font-heading block group-hover/tile:text-[#cb997e] transition-colors">
                          Creative Asset Kit
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">
                          48+ Renders & Banners
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover/tile:text-[#cb997e] group-hover/tile:translate-x-1 transition-all shrink-0" />
                  </div>

                  {/* Resource Tile 2: COA Embeds */}
                  <div className="p-4 rounded-2xl bg-[#20221c] text-[#fff1e6] border border-white/10 shadow-xs hover:border-[#a5a58d]/50 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group/coa cursor-pointer w-full sm:w-64">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-[#a5a58d] flex items-center justify-center border border-white/15 shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#a5a58d]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#fff1e6] font-heading block group-hover/coa:text-[#cb997e] transition-colors">
                          COA Embed Widget
                        </span>
                        <span className="text-[11px] font-mono text-white/60">
                          Live HPLC Badges
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover/coa:text-[#cb997e] group-hover/coa:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* 8. Section: Research Standards & Product Quality (Full Width, Olive Green with Interactive Kinetic Marquee Animation) */}
      <AffiliateDifferenceSection />

      {/* 9. Section: Standards & Prohibitions (Side-by-Side Cards) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24 relative z-10">
        <section>
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Prohibited Practices (Warning / Terracotta tone) */}
              <div className="bg-[#20221c] text-white rounded-2xl sm:rounded-[30px] p-7 sm:p-10 border border-[#cb997e]/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3.5 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-[#cb997e]/15 text-[#cb997e] flex items-center justify-center border border-[#cb997e]/30">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                    {t('prohibitedTitle')}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start gap-3.5">
                      <XCircle className="w-5 h-5 text-[#cb997e] shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm sm:text-base leading-relaxed">
                        {t(`prohibited${num}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Content Standards (Verified / Sage tone) */}
              <div className="bg-white rounded-2xl sm:rounded-[30px] p-7 sm:p-10 border border-[#eddcd2] shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <div className="flex items-center gap-3.5 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-[#fff1e6] text-[#a5a58d] flex items-center justify-center border border-[#eddcd2]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading tracking-tight">
                    {t('contentStandardsTitle')}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-[#a5a58d] shrink-0 mt-0.5" />
                      <span className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                        {t(`content${num}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </section>
      </div>

      {/* 10. Section: FAQ Section (Full Width, same as Homepage) */}
      <SharedFaqSection
        subtitle="FREQUENTLY ASKED QUESTIONS"
        title={
          <>
            Have<br />questions?
          </>
        }
        faqs={FAQ_KEYS.map((key) => ({
          question: t(`${key}Question`),
          answer: t(`${key}Answer`),
        }))}
        contactHeading="Still have questions?"
        contactSubtext="Reach out directly through our contact page and our affiliate team will assist you."
        contactButtonText="Contact Us"
        contactHref="/contact"
      />

      {/* 11. Section: Final CTA & Disclaimers */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-20 relative z-10">
        <section className="w-full">
          <div className="bg-[#20221c] text-white rounded-3xl sm:rounded-[36px] p-7 sm:p-10 md:p-14 lg:p-16 flex flex-col lg:flex-row gap-10 md:gap-14 relative overflow-hidden shadow-2xl border border-[#eddcd2]/15">
            {/* Left Column: Heading, Subtitle & Action */}
            <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#fff1e6] font-heading tracking-tight mb-4 leading-tight">
                {t('finalCtaTitle')}
              </h2>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal max-w-lg">
                {t('finalCtaDesc')}
              </p>
              <p className="text-white/60 text-xs sm:text-sm font-medium mb-8 flex flex-wrap items-center gap-1.5 font-heading">
                <span>{t('finalCtaQuestions')}</span>
                <a
                  href="mailto:support@veracuepeptides.com"
                  className="text-white hover:text-[#cb997e] transition-colors font-bold underline underline-offset-4"
                >
                  support@veracuepeptides.com
                </a>
              </p>
              <div>
                <HeroButton
                  onClick={() => scrollToSection('apply')}
                  direction="up"
                  className="w-full sm:w-auto"
                >
                  {t('finalCtaButton')}
                </HeroButton>
              </div>
            </div>

            {/* Right Column: 6 Checklist Badges */}
            <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {(
                  [
                    'finalCtaBullet1',
                    'finalCtaBullet2',
                    'finalCtaBullet3',
                    'finalCtaBullet4',
                    'finalCtaBullet5',
                    'finalCtaBullet6',
                  ] as const
                ).map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3.5 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-[#20221c] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <span className="text-white font-bold text-xs sm:text-sm leading-snug font-heading">
                      {t(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Research Disclaimers & Copyright */}
          <div className="mt-12 text-center max-w-4xl mx-auto px-4">
            <p className="text-neutral-500 text-[11px] sm:text-xs leading-relaxed mb-3 font-medium uppercase tracking-wider">
              <span className="text-[#cb997e] font-bold">
                {t('footerResearchLabel')}
              </span>{' '}
              {t('footerResearchText')}
            </p>
            <p className="text-neutral-400 text-xs font-semibold">
              {t('footerCopyright')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
