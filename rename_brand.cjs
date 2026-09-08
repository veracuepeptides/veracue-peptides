const fs = require('fs');
const path = require('path');

const DIRS_TO_SCAN = ['src', 'messages'];
const EXTENSIONS = ['.tsx', '.ts', '.json', '.md'];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Replace "99 Purity Peptides" and "99 Purity" with "Helix Bio"
  newContent = newContent.replace(/99 Purity Peptides/gi, 'Helix Bio');
  newContent = newContent.replace(/99 Purity/gi, 'Helix Bio');
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const ext = path.extname(file);
      if (EXTENSIONS.includes(ext)) {
        replaceInFile(fullPath);
      }
    }
  }
}

DIRS_TO_SCAN.forEach(dir => {
  const fullDirPath = path.join(__dirname, dir);
  if (fs.existsSync(fullDirPath)) {
    scanDir(fullDirPath);
  }
});

console.log('Brand name replacement complete.');
