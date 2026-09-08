const fs = require('fs');
const path = require('path');

const files = [
  "src/components/home/Hero.tsx",
  "src/components/home/FeaturedProductsSection.tsx",
  "src/components/home/CategoriesSection.tsx",
  "src/components/home/WhatSetsUsApart.tsx",
  "src/components/home/FaqSection.tsx",
  "src/components/home/HomeFeaturedProductCard.tsx"
];

for (const f of files) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/bg-black/g, 'bg-cream');
  c = c.replace(/bg-\[\#0a0a0a\]/g, 'bg-cream');
  c = c.replace(/text-white/g, 'text-ink');
  c = c.replace(/border-white/g, 'border-ink');
  c = c.replace(/text-gray-400/g, 'text-slate-500');
  c = c.replace(/bg-gradient-to-br from-\[\#590000\] via-\[\#850000\] to-\[\#3a0000\]/g, 'bg-cream');
  c = c.replace(/from-black/g, 'from-cream');
  c = c.replace(/via-black/g, 'via-cream');
  c = c.replace(/bg-white/g, 'bg-ink');
  c = c.replace(/text-black/g, 'text-cream');
  c = c.replace(/hover:bg-gray-200/g, 'hover:bg-slate-700');
  c = c.replace(/hover:bg-black/g, 'hover:bg-cream');
  c = c.replace(/hover:text-white/g, 'hover:text-ink');
  fs.writeFileSync(p, c, 'utf8');
}
console.log('done');
