// Veracue's category set, taken from the 99 Purity Peptides catalog (names, slugs and order). Their
// "Peptide Bundles" category is left out because Veracue sells no bundles. On 99 Purity every vial sits
// in exactly one compound category and every spray sits only in "Nasal Sprays"; this file follows that.
// Descriptions are Veracue's own wording, not copied from 99 Purity.

export const CATEGORIES = [
  { slug: 'glp-1-metabolic-research-compounds', name: 'GLP-1 & Metabolic Research Compounds', sortOrder: 1, description: 'Advanced GLP-1, GIP, and glucagon receptor agonists formulated for metabolic research and glucose regulation studies.' },
  { slug: 'healing-recovery-research-compounds', name: 'Healing & Recovery Research Compounds', sortOrder: 2, description: 'Regenerative signaling peptides investigated for tissue repair, gut mucosal integrity, and angiogenic research.' },
  { slug: 'longevity-anti-aging-research-compounds', name: 'Longevity & Anti-Aging Research Compounds', sortOrder: 3, description: 'Telomere maintenance, cellular senescence regulators, and NAD+ precursors supporting longevity biology.' },
  { slug: 'cognitive-nootropic-research-compounds', name: 'Cognitive & Nootropic Research Compounds', sortOrder: 4, description: 'Neuropeptides and neurotrophic factors studied for synaptic plasticity, memory retention, and neurogenesis.' },
  { slug: 'growth-hormone-secretagogue-research-compounds', name: 'Growth Hormone Secretagogue Research Compounds', sortOrder: 5, description: 'Ghrelin mimetics and GHRH analogues formulated for pituitary signaling and protein synthesis assays.' },
  { slug: 'sexual-hormonal-research-compounds', name: 'Sexual & Hormonal Research Compounds', sortOrder: 6, description: 'Melanocortin receptor peptides and gonadotropin-axis signaling compounds supplied for hormone pathway research.' },
  { slug: 'cosmetic-skin-research-compounds', name: 'Cosmetic & Skin Research Compounds', sortOrder: 7, description: 'Copper-binding peptides and short signal sequences used in fibroblast and extracellular matrix culture research.' },
  { slug: 'nasal-sprays', name: 'Nasal Sprays', sortOrder: 8, description: 'Spray-format versions of Veracue research compounds, supplied for laboratory research use only.' },
]

const GLP = 'glp-1-metabolic-research-compounds'
const HEAL = 'healing-recovery-research-compounds'
const LONG = 'longevity-anti-aging-research-compounds'
const COG = 'cognitive-nootropic-research-compounds'
const GH = 'growth-hormone-secretagogue-research-compounds'
const SEX = 'sexual-hormonal-research-compounds'
const COS = 'cosmetic-skin-research-compounds'

// Category of every vial or supply product by slug. null means no category, as on 99 Purity.
// Best fit, because 99 Purity lists no category for it: h-frag, l-carnitine (uncategorised there),
// dihexa and oxytocin (99 Purity sells only their sprays).
export const VIAL_CATEGORY: Record<string, string | null> = {
  'glp-3rta': GLP, 'glp-t': GLP, 'glp-s': GLP, cagrilintide: GLP, 'aod-9604': GLP, 'lipo-c': GLP, 'mots-c': GLP, 'nad-plus': GLP, '5-amino-1mq': GLP, 'h-frag': GLP, 'l-carnitine': GLP,
  'bpc-157': HEAL, 'bpc-tb-500': HEAL, 'll-37': HEAL, 'tb-500': HEAL, 'ara-290': HEAL, glow: HEAL, klow: HEAL, kpv: HEAL, 'thymosin-alpha-1': HEAL, vip: HEAL,
  epithalon: LONG, 'ss-31': LONG, glutathione: LONG,
  semax: COG, selank: COG, 'semax-selank': COG, dsip: COG, dihexa: COG,
  'cjc-ipamorelin': GH, 'ghrp-2': GH, 'ghrp-6': GH, ipamorelin: GH, sermorelin: GH, tesamorelin: GH, 'tesa-ipa': GH, 'igf-lr3': GH, 'cjc-1295-no-dac': GH, 'cjc-1295-w-dac': GH,
  hcg: SEX, kisspeptin: SEX, 'melanotan-1': SEX, 'melanotan-ii': SEX, 'pt-141': SEX, oxytocin: SEX,
  'ahk-cu': COS, 'ghk-cu': COS, snap8: COS,
  'bacteriostatic-water': null, '10-needles': null,
}

// The category slug a product belongs in, or null. Throws for a slug nobody has mapped yet.
export function categoryFor(slug: string): string | null {
  if (slug.endsWith('-spray')) return 'nasal-sprays'
  if (!(slug in VIAL_CATEGORY)) throw new Error(`No category mapped for "${slug}", add it to VIAL_CATEGORY in categories.ts`)
  return VIAL_CATEGORY[slug]
}
