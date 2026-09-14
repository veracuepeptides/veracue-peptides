const https = require('https');

https.get('https://www.globalgenpharmacy.com', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const matches = html.match(/https?:\/\/[^"'\s]+logo[^"'\s]+/gi);
    console.log('Matches:', [...new Set(matches)]);
  });
});
