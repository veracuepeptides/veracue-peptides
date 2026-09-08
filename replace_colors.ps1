$files = @(
  "src\components\home\Hero.tsx",
  "src\components\home\FeaturedProductsSection.tsx",
  "src\components\home\CategoriesSection.tsx",
  "src\components\home\WhatSetsUsApart.tsx",
  "src\components\home\FaqSection.tsx",
  "src\components\home\HomeFeaturedProductCard.tsx"
)

foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $c = $c -replace 'bg-black', 'bg-cream'
  $c = $c -replace 'bg-\[\#0a0a0a\]', 'bg-cream'
  $c = $c -replace 'text-white', 'text-ink'
  $c = $c -replace 'border-white', 'border-ink'
  $c = $c -replace 'text-gray-400', 'text-slate-500'
  $c = $c -replace 'bg-gradient-to-br from-\[\#590000\] via-\[\#850000\] to-\[\#3a0000\]', 'bg-cream'
  $c = $c -replace 'from-black', 'from-cream'
  $c = $c -replace 'via-black', 'via-cream'
  $c = $c -replace 'bg-white', 'bg-ink'
  $c = $c -replace 'text-black', 'text-cream'
  $c = $c -replace 'hover:bg-gray-200', 'hover:bg-slate-700'
  $c = $c -replace 'hover:bg-black', 'hover:bg-cream'
  $c = $c -replace 'hover:text-white', 'hover:text-ink'
  Set-Content $f -Value $c
}
