export interface VerifiedCOA {
  id: string | number
  product: string
  category: string
  purity: string
  batch: string
  analyzed: string
  lab: string
  formula?: string
  molecularWeight?: string
  observedWeight?: string
  method?: string
  status?: string
  coaUrl?: string | null
  productSlug?: string
  notes?: string
}
