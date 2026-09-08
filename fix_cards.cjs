const fs = require('fs');
let c = fs.readFileSync('src/components/home/WhatSetsUsApart.tsx', 'utf8');
c = c.replace(/bg-\[\#f4f4f5\]/g, 'bg-white border border-ink/5');
c = c.replace(/shadow-2xl/g, 'shadow-lg hover:shadow-xl hover:border-primary/20');
fs.writeFileSync('src/components/home/WhatSetsUsApart.tsx', c, 'utf8');
console.log('Fixed cards');
