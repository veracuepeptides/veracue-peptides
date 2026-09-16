const fs = require('fs');

const cleanCsv = 'C:\\Users\\aquib\\Downloads\\emails_clean.csv';
const lines = fs.readFileSync(cleanCsv, 'utf8').trim().split('\n');
const header = lines[0];
const emails = lines.slice(1);

const batchSize = 1000;
const totalBatches = Math.ceil(emails.length / batchSize);

console.log(`Total emails to split: ${emails.length} into ${totalBatches} batches.`);

for (let i = 0; i < totalBatches; i++) {
  const start = i * batchSize;
  const end = Math.min(start + batchSize, emails.length);
  const batchEmails = emails.slice(start, end);
  const batchFile = `C:\\Users\\aquib\\Downloads\\batch_${i + 1}_${batchEmails.length}_emails.csv`;
  fs.writeFileSync(batchFile, header + '\n' + batchEmails.join('\n') + '\n', 'utf8');
  console.log(`Created: ${batchFile}`);
}
