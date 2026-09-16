'use client'

import React from 'react'

/**
 * Minimalist Architectural Hairline Rails (Desktop Gutters)
 * 
 * Whisper-quiet, ultra-minimal vertical guidelines with subtle datum markers.
 * Elegant framing that prevents desktop margins from feeling empty while
 * remaining completely unobtrusive and non-distracting.
 * 
 * Strict Brand Palette:
 * - #cb997e (Terracotta)
 * - #a5a58d (Olive / Sage)
 * - #b7b7a4 (Stone / Muted Sage)
 * - #eddcd2 (Almond)
 */

export function LegalLeftGutterArt() {
  return (
    <div className="w-10 2xl:w-12 flex flex-col items-center select-none pointer-events-none">
      <svg
        viewBox="0 0 40 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="minimalSpineFadeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cb997e" stopOpacity="0.0" />
            <stop offset="8%" stopColor="#cb997e" stopOpacity="0.6" />
            <stop offset="35%" stopColor="#a5a58d" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#b7b7a4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b7b7a4" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Top Minimal Datum Crosshair */}
        <g transform="translate(20, 24)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#cb997e" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#cb997e" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#cb997e" />
        </g>

        {/* Primary Vertical Hairline Spine */}
        <line
          x1="20"
          y1="36"
          x2="20"
          y2="690"
          stroke="url(#minimalSpineFadeLeft)"
          strokeWidth="0.75"
        />

        {/* Minimal Subtle Ticks */}
        {[120, 220, 320, 420, 520, 620].map((y, i) => (
          <g key={y}>
            <line
              x1={i % 2 === 0 ? 14 : 16}
              y1={y}
              x2={i % 2 === 0 ? 26 : 24}
              y2={y}
              stroke={i === 2 ? '#cb997e' : '#a5a58d'}
              strokeWidth={i === 2 ? 1 : 0.75}
              opacity={i === 2 ? 0.75 : 0.45}
            />
          </g>
        ))}

        {/* Mid-point Delicate Micro-Diamond */}
        <g transform="translate(20, 320)">
          <polygon
            points="0,-4 4,0 0,4 -4,0"
            stroke="#cb997e"
            strokeWidth="0.8"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* Bottom Minimal Dot */}
        <circle cx="20" cy="690" r="1.5" fill="#b7b7a4" opacity="0.5" />
      </svg>
    </div>
  )
}

export function LegalRightGutterArt() {
  return (
    <div className="w-10 2xl:w-12 flex flex-col items-center select-none pointer-events-none">
      <svg
        viewBox="0 0 40 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="minimalSpineFadeRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a5a58d" stopOpacity="0.0" />
            <stop offset="8%" stopColor="#a5a58d" stopOpacity="0.6" />
            <stop offset="35%" stopColor="#cb997e" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#b7b7a4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b7b7a4" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Top Minimal Datum Crosshair */}
        <g transform="translate(20, 24)">
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#a5a58d" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#a5a58d" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#a5a58d" />
        </g>

        {/* Primary Vertical Hairline Spine */}
        <line
          x1="20"
          y1="36"
          x2="20"
          y2="690"
          stroke="url(#minimalSpineFadeRight)"
          strokeWidth="0.75"
        />

        {/* Minimal Subtle Ticks */}
        {[120, 220, 320, 420, 520, 620].map((y, i) => (
          <g key={y}>
            <line
              x1={i % 2 === 0 ? 14 : 16}
              y1={y}
              x2={i % 2 === 0 ? 26 : 24}
              y2={y}
              stroke={i === 2 ? '#a5a58d' : '#cb997e'}
              strokeWidth={i === 2 ? 1 : 0.75}
              opacity={i === 2 ? 0.75 : 0.45}
            />
          </g>
        ))}

        {/* Mid-point Delicate Micro-Diamond */}
        <g transform="translate(20, 320)">
          <polygon
            points="0,-4 4,0 0,4 -4,0"
            stroke="#a5a58d"
            strokeWidth="0.8"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* Bottom Minimal Dot */}
        <circle cx="20" cy="690" r="1.5" fill="#b7b7a4" opacity="0.5" />
      </svg>
    </div>
  )
}
