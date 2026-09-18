import React from 'react'
import Image from 'next/image'
import { Mail } from 'lucide-react'

const PUBLISHER_EMAIL = 'support@veracuepeptides.com'

export function AuthorCard({
  name,
  title,
  bio,
  credentials,
  photoUrl,
}: {
  name: string
  title?: string
  bio?: string
  credentials?: string
  photoUrl?: string
}) {
  return (
    <div className="bg-white rounded-[1.5rem] border border-[#eddcd2] p-6 sm:p-8 shadow-[0_4px_20px_rgba(32,34,28,0.03)] flex flex-col sm:flex-row gap-6 items-start">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#f0efeb] border border-[#eddcd2] shrink-0">
        {photoUrl ? (
          <Image src={photoUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#a5a58d] font-heading font-black text-xl">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1">
        <span className="text-label-md uppercase tracking-wider text-[#a5732f] mb-1 block">
          Published by
        </span>
        <h4 className="font-heading font-bold text-lg text-[#20221c] mb-1">{name}</h4>
        {title && <p className="text-sm text-[#525b4c] font-medium mb-2">{title}</p>}
        {bio && <p className="text-sm text-[#525b4c] leading-relaxed mb-3">{bio}</p>}
        {credentials && (
          <p className="text-xs text-[#a5a58d] font-bold uppercase tracking-wider mb-3">{credentials}</p>
        )}
        <a
          href={`mailto:${PUBLISHER_EMAIL}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#525b4c] hover:text-[#20221c] font-medium transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          {PUBLISHER_EMAIL}
        </a>
      </div>
    </div>
  )
}
