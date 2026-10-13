// Share-image size. The width is fixed; the height follows the picture's own aspect ratio, so a portrait
// product photo is shown whole instead of being cropped into a 1200x630 frame. The height is kept between
// a landscape card (630) and 1800, beyond which platforms would crop or reject the image anyway.
export const OG_WIDTH = 1200
export const OG_MIN_HEIGHT = 630
export const OG_MAX_HEIGHT = 1800

export function ogHeightForAspect(width?: number | null, height?: number | null): number {
  if (!width || !height || width <= 0 || height <= 0) return OG_MIN_HEIGHT
  const scaled = Math.round((OG_WIDTH * height) / width)
  return Math.min(OG_MAX_HEIGHT, Math.max(OG_MIN_HEIGHT, scaled))
}
