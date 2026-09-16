import React from 'react'

const COLS = 6
const ROWS = 7

/**
 * Tiled background of a repeated error code (e.g. "404"/"500") — a still
 * grid of big, low-opacity digits. Every few seconds every row takes one
 * quick step-scroll horizontally (odd rows one way, even rows the other),
 * then ~1s later every column takes one quick step-scroll vertically (odd
 * columns one way, even columns the other), looping. See
 * .error-tile-rd/-ru/-ld/-lu in globals.css.
 */
export function TiledErrorCode({ code }: { code: string }) {
  const cells = Array.from({ length: COLS * ROWS })

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.035]"
      style={{ '--tile-w': '34vw', '--tile-h': '28vh' } as React.CSSProperties}
    >
      <div
        className="grid"
        style={{
          position: 'absolute',
          top: 'calc(var(--tile-h) * -1)',
          left: 'calc(var(--tile-w) * -1)',
          gridTemplateColumns: `repeat(${COLS}, var(--tile-w))`,
          gridAutoRows: 'var(--tile-h)',
        }}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / COLS)
          const col = i % COLS
          const isOddRow = row % 2 === 0 // the 1st, 3rd, 5th... row
          const isOddCol = col % 2 === 0 // the 1st, 3rd, 5th... column
          // one combined class carries both the row-axis and column-axis
          // animation for this cell (see globals.css for why they can't
          // be two separate classes)
          const moveClass = isOddRow
            ? isOddCol
              ? 'error-tile-rd'
              : 'error-tile-ru'
            : isOddCol
              ? 'error-tile-ld'
              : 'error-tile-lu'

          return (
            <span
              key={i}
              className={`flex items-center justify-center overflow-hidden font-heading font-black text-[#20221c] leading-none ${moveClass}`}
              style={{ fontSize: 'calc(var(--tile-w) * 0.4)' }}
            >
              {code}
            </span>
          )
        })}
      </div>
    </div>
  )
}
