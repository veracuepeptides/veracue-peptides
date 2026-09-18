import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null

  return (
    <div className="bg-white rounded-[1.5rem] border border-[#eddcd2] p-6 sm:p-8 shadow-[0_4px_20px_rgba(32,34,28,0.03)]">
      <span className="text-label-md uppercase tracking-wider text-[#a5732f] mb-4 block">
        Key Takeaways
      </span>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#a5a58d] shrink-0 mt-0.5" />
            <span className="text-body-md sm:text-body-lg text-[#20221c]/85 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
