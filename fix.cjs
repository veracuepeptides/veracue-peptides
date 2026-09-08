const fs = require('fs');
let c = fs.readFileSync('src/components/home/WhatSetsUsApart.tsx', 'utf8');
c = c.replace(/text-red-100\/80/g, 'text-ink/80');
c = c.replace(/text-red-800/g, 'text-primary');
c = c.replace(/stroke="white"/g, 'stroke="#5984c4"');
c = c.replace(/fill="white"/g, 'fill="#5984c4"');
fs.writeFileSync('src/components/home/WhatSetsUsApart.tsx', c, 'utf8');
console.log('Fixed WhatSetsUsApart');
