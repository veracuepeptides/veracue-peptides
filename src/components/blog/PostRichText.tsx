import React from 'react'
import Image from 'next/image'
import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { CalloutBox } from './CalloutBox'

function nodeText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('')
  return ''
}

// Same slug rules as TableOfContents so ids match, but generated at render time
// (server HTML) rather than after hydration.
const slugifyHeading = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

const createConverters = (): JSXConvertersFunction => {
  const seen = new Set<string>()
  return ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = (node as any).tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const base = slugifyHeading(nodeText(node))
    let id: string | undefined
    if (base) {
      id = base
      let counter = 1
      while (seen.has(id)) {
        id = `${base}-${counter}`
        counter++
      }
      seen.add(id)
    }
    return <Tag id={id}>{nodesToJSX({ nodes: node.children })}</Tag>
  },
  upload: ({ node }) => {
    const value = node.value as any
    if (!value?.url) return null
    return (
      <figure>
        <Image
          src={value.url}
          alt={value.alt || ''}
          width={value.width || 1200}
          height={value.height || 800}
          className="w-full h-auto"
        />
        {value.caption && (
          <figcaption className="text-body-sm italic text-[#525b4c] mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    )
  },
  blocks: {
    calloutBox: ({ node }: { node: any }) => (
      <CalloutBox style={node.fields.style as any} text={node.fields.text as string} />
    ),
  },
  table: ({ node, nodesToJSX }) => (
    <div className="overflow-x-auto my-8 -mx-1 rounded-2xl border border-[#eddcd2] [-webkit-overflow-scrolling:touch]">
      <table className="min-w-full w-max border-collapse text-sm sm:text-base">
        <tbody>{nodesToJSX({ nodes: node.children })}</tbody>
      </table>
    </div>
  ),
  tablerow: ({ node, nodesToJSX }) => (
    <tr className="border-b border-[#eddcd2] last:border-0">
      {nodesToJSX({ nodes: node.children })}
    </tr>
  ),
  tablecell: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    const isHeader = (node as any).headerState > 0
    const Tag = isHeader ? 'th' : 'td'
    return (
      <Tag
        colSpan={(node as any).colSpan > 1 ? (node as any).colSpan : undefined}
        className={
          isHeader
            ? 'text-left font-heading font-bold text-[#20221c] uppercase tracking-wide text-xs sm:text-sm bg-[#f0efeb] px-3 sm:px-4 py-3 whitespace-nowrap'
            : 'px-3 sm:px-4 py-3 align-top whitespace-nowrap text-[#525b4c]'
        }
      >
        {children}
      </Tag>
    )
  },
  })
}

export function PostRichText({ content }: { content: any }) {
  if (!content) return null
  return <RichText data={content} converters={createConverters()} className="prose-article" />
}
