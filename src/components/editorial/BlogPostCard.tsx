'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, Calendar } from 'lucide-react'

export function BlogPostCard({
  slug,
  title,
  category,
  excerpt,
  imageSrc,
  readTime,
  date,
}: {
  slug: string
  title: string
  category: string
  excerpt: string
  imageSrc: string
  readTime: string
  date?: string
}) {
  return (
    <Link href={`/${slug}`} className="group block h-full select-none">
      <article className="bg-white rounded-2xl sm:rounded-[22px] p-3 sm:p-4 border border-[#eddcd2]/80 shadow-[0_4px_20px_rgba(32,34,28,0.03)] hover:shadow-[0_12px_36px_rgba(32,34,28,0.08)] hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col">
        {/* Visual Thumbnail */}
        <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-[18px] overflow-hidden mb-4 sm:mb-5 bg-zinc-900 border border-[#eddcd2]/50">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

          {/* Floating Category Tag */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#20221c] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm border border-white/60">
              {category || 'Research'}
            </span>
          </div>

          {/* Read time pill floating bottom right */}
          {readTime && (
            <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-wide">
                <Clock className="w-3 h-3 text-white/80" />
                {readTime}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="px-1 sm:px-1.5 flex flex-col flex-1">
          <h3 className="text-[16px] sm:text-[18px] lg:text-[19px] font-bold text-[#20221c] leading-[1.3] font-heading group-hover:text-[#cb997e] transition-colors duration-300 mb-2.5 line-clamp-2">
            {title}
          </h3>

          <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-2 font-normal">
            {excerpt}
          </p>

          {/* Card Footer */}
          <div className="mt-auto pt-3.5 border-t border-[#eddcd2]/60 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cb997e]" />
              <span className="font-semibold text-[11px] sm:text-xs text-[#20221c]/80">
                Veracue Research
              </span>
              {date && (
                <>
                  <span className="text-neutral-300">&bull;</span>
                  <span className="text-[11px] text-neutral-400 hidden xs:inline-block">
                    {date}
                  </span>
                </>
              )}
            </div>

            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f0efeb] group-hover:bg-[#20221c] text-[#20221c] group-hover:text-[#fff1e6] flex items-center justify-center transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
