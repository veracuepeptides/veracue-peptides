const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'HelixBio Images');
const files = ['hero-1.png', 'hero-2.png', 'hero-3.png'];

async function compress() {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    if (!fs.existsSync(inputPath)) {
        console.log(`File not found: ${inputPath}`);
        continue;
    }
    
    const outputPath = path.join(dir, file.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 }) // quality 80 is great, effort 6 is max compression for webp
        .toFile(outputPath);
      
      const inStats = fs.statSync(inputPath);
      const outStats = fs.statSync(outputPath);
      console.log(`Converted ${file} to webp. Size reduced from ${(inStats.size / 1024 / 1024).toFixed(2)}MB to ${(outStats.size / 1024 / 1024).toFixed(2)}MB`);
      
      // Delete original
      fs.unlinkSync(inputPath);
      console.log(`Deleted original ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

compress();
