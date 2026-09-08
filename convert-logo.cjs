const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function convertLogo() {
  const input = path.join(__dirname, 'public', 'HelixBio Images', 'hb-logo.png');
  const output = path.join(__dirname, 'public', 'HelixBio Images', 'hb-logo.webp');
  
  if (!fs.existsSync(input)) {
    console.log('Logo not found');
    return;
  }
  
  await sharp(input).webp({ quality: 90, effort: 6 }).toFile(output);
  console.log('Logo converted successfully to webp');
}

convertLogo();
