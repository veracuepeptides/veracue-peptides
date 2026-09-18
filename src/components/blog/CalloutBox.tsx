import React from 'react'
import { Info, Lightbulb, AlertTriangle } from 'lucide-react'

const STYLES = {
  info: { icon: Info, bg: 'bg-[#f0efeb]', border: 'border-[#dce0d6]', text: 'text-[#525b4c]', iconColor: 'text-[#a5a58d]' },
  tip: { icon: Lightbulb, bg: 'bg-[#edf0e8]', border: 'border-[#a5a58d]/40', text: 'text-[#2c3327]', iconColor: 'text-[#3a442e]' },
  warning: { icon: AlertTriangle, bg: 'bg-[#fdf1ec]', border: 'border-[#cb997e]/40', text: 'text-[#7a4a34]', iconColor: 'text-[#cb997e]' },
} as const

export function CalloutBox({
  style = 'info',
  text,
}: {
  style?: keyof typeof STYLES
  text: string
}) {
  const { icon: Icon, bg, border, text: textColor, iconColor } = STYLES[style] || STYLES.info

  return (
    <div className={`rounded-[1.25rem] border p-6 sm:p-7 flex items-start gap-3.5 ${bg} ${border}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
      <p className={`text-sm sm:text-base leading-relaxed ${textColor}`}>{text}</p>
    </div>
  )
}
