import React from 'react'
import { ExternalLink } from 'lucide-react'

export function ReferencesList({
  references,
}: {
  references: { citationText: string; url: string }[]
}) {
  if (!references || references.length === 0) return null

  return (
    <ol className="space-y-3">
      {references.map((ref, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#525b4c] leading-relaxed">
          <span className="text-[#a5a58d] font-bold tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#20221c] transition-colors inline-flex items-start gap-1.5 underline underline-offset-4 decoration-[#eddcd2] hover:decoration-[#cb997e]"
          >
            <span>{ref.citationText}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          </a>
        </li>
      ))}
    </ol>
  )
}
