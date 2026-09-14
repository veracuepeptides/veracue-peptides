# Veracue Official Brand Color Palette

> [!IMPORTANT]
> **Strict Design Rule**: All UI elements, cards, typography, backgrounds, borders, and SVGs must strictly adhere to this curated 7-color palette. Do not introduce outside blues, purples, generic grays, or arbitrary hex codes.

---

## The 7 Brand Colors

| Swatch | Color Name | Hex Code | RGB | Role & Usage |
| :--- | :--- | :--- | :--- | :--- |
| <img src="https://via.placeholder.com/24/cb997e/000000?text=+" width="24" height="24" /> | **Terracotta** | `#cb997e` | `rgb(203, 153, 126)` | Primary accent, CTA hover states, conversion graphs, high-priority indicators, warm highlight glow |
| <img src="https://via.placeholder.com/24/eddcd2/000000?text=+" width="24" height="24" /> | **Almond / Linen Soft** | `#eddcd2` | `rgb(237, 220, 210)` | Card borders, secondary surface strokes, pill container outlines, soft dividing lines |
| <img src="https://via.placeholder.com/24/fff1e6/000000?text=+" width="24" height="24" /> | **Linen / Pale Shell** | `#fff1e6` | `rgb(255, 241, 230)` | Elevated light card surfaces, pill badge fills, light contrast containers, button label text on dark bases |
| <img src="https://via.placeholder.com/24/f0efeb/000000?text=+" width="24" height="24" /> | **Alabaster / Pebble** | `#f0efeb` | `rgb(240, 239, 235)` | Signature page background, subtle container fills, light neutral foundational canvas |
| <img src="https://via.placeholder.com/24/ddbea9/000000?text=+" width="24" height="24" /> | **Warm Sand** | `#ddbea9` | `rgb(221, 190, 169)` | Intermediate warm tone, secondary badges, telemetry nodes, warm ambient shading |
| <img src="https://via.placeholder.com/24/a5a58d/000000?text=+" width="24" height="24" /> | **Olive Green / Sage** | `#a5a58d` | `rgb(165, 165, 141)` | Signature header background, global focus rings, lab badges, institutional trust accents |
| <img src="https://via.placeholder.com/24/b7b7a4/000000?text=+" width="24" height="24" /> | **Stone / Muted Sage** | `#b7b7a4` | `rgb(183, 183, 164)` | Subtle neutral borders, secondary icons, muted captions, table dividers, flank line art |

---

## Tailwind CSS Utility Classes

Configured in `tailwind.config.ts` under `theme.extend.colors.aesthetic`:

```tsx
// Backgrounds
className="bg-aesthetic-terracotta" // #cb997e
className="bg-aesthetic-almond"     // #eddcd2
className="bg-aesthetic-linen"      // #fff1e6
className="bg-aesthetic-alabaster"  // #f0efeb
className="bg-aesthetic-sand"       // #ddbea9
className="bg-aesthetic-sage"       // #a5a58d
className="bg-aesthetic-stone"      // #b7b7a4

// Text Colors
className="text-aesthetic-terracotta"
className="text-aesthetic-sage"
className="text-aesthetic-stone"

// Borders & Rings
className="border-aesthetic-almond"
className="border-aesthetic-stone/40"
className="focus:ring-aesthetic-sage"
```

---

## Dark Mode & Deep Contrast Pairing
When high contrast or institutional dark cards are required (such as telemetry ledgers and deep charcoal hero elements):
- **Base Obsidian / Charcoal**: `#20221c` (deep olive-charcoal) or `#191b16`
- **Text on Dark**: `#fff1e6` (Linen) and `#dcdacb`
- **Accents on Dark**: `#a5a58d` (Olive Green) and `#cb997e` (Terracotta)
- **Borders on Dark**: `#32352a` or `#2d3025`
