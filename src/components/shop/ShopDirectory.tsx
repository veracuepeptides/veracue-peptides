import React from 'react'
import Link from 'next/link'
import type { DirectoryGroup } from '@/lib/shop/directory'

/**
 * Every active product as a plain link, grouped by category. Server-rendered, so the links are in the
 * HTML of /shop even though the product grid above it is filled in by the browser.
 */
export function ShopDirectory({ groups }: { groups: DirectoryGroup[] }) {
  if (groups.length === 0) return null

  return (
    <section
      aria-labelledby="shop-directory-title"
      style={{ backgroundColor: '#f0efeb' }}
      className="w-full font-sans"
    >
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 pb-14 sm:pb-20">
        <div className="border-t border-[#eddcd2] pt-10 sm:pt-14">
          <h2
            id="shop-directory-title"
            className="font-heading font-black text-2xl sm:text-3xl text-[#20221c] tracking-tight"
          >
            All Research Compounds
          </h2>
          <p className="mt-2 text-sm text-[#20221c]/70 max-w-2xl">
            The full Veracue Labs catalog in one list. Every compound is for laboratory research use only, and each page
            lists its vial sizes, pricing and batch documentation details.
          </p>

          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div key={group.name}>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#20221c] pb-2 mb-3 border-b border-[#eddcd2]">
                  {group.name}
                </h3>
                <ul className="space-y-1.5">
                  {group.products.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-sm text-[#20221c]/80 hover:text-[#cb997e] underline-offset-4 hover:underline"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
