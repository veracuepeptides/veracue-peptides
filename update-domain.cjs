const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
        if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
            walkDir(dirPath, callback);
        }
    } else {
      callback(dirPath);
    }
  });
}

function processFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.ts', '.tsx', '.js', '.jsx', '.json', '.md'].includes(ext)) {
        const basename = path.basename(filePath);
        if (!basename.startsWith('.env')) {
            return;
        }
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(/helixbio\.com/g, 'helixbiochem.com');
        newContent = newContent.replace(/Helixbio\.com/g, 'Helixbiochem.com');
        newContent = newContent.replace(/HelixBio\.com/g, 'HelixBiochem.com');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
}

// Run on src/
walkDir(path.join(__dirname, 'src'), processFile);

// Check .env files in root
fs.readdirSync(__dirname).forEach(f => {
    if (f.startsWith('.env')) {
        processFile(path.join(__dirname, f));
    }
});

console.log('Domain update complete.');
