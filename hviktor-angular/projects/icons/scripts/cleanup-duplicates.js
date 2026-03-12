const fs = require('fs');
const path = require('path');

const webcomponentsDir = path.join(__dirname, '..', 'src', 'lib', 'webcomponents');

if (!fs.existsSync(webcomponentsDir)) {
  console.log('No webcomponents folder found.');
  process.exit(0);
}

console.log('Scanning for duplicate files...');

const files = fs.readdirSync(webcomponentsDir).filter(f => f.endsWith('.webcomponent.ts'));

// Group files by their kebab-case equivalent
const fileGroups = new Map();

files.forEach(file => {
  // Extract the icon name part (after 'icon-' and before '.webcomponent.ts')
  const match = file.match(/^icon-(.+)\.webcomponent\.ts$/);
  if (!match) return;
  
  const iconName = match[1];
  
  // Convert to kebab-case to use as key
  const kebabName = iconName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  
  if (!fileGroups.has(kebabName)) {
    fileGroups.set(kebabName, []);
  }
  
  fileGroups.get(kebabName).push({ file, iconName });
});

// Find and remove duplicates (keep kebab-case, remove PascalCase)
let removedCount = 0;

fileGroups.forEach((files, kebabName) => {
  if (files.length > 1) {
    // Sort to keep kebab-case version (should be equal to kebabName)
    files.sort((a, b) => {
      if (a.iconName === kebabName) return -1;
      if (b.iconName === kebabName) return 1;
      return 0;
    });
    
    // Keep the first (kebab-case), remove the rest
    const toKeep = files[0];
    const toRemove = files.slice(1);
    
    console.log(`\nFound duplicates for: ${kebabName}`);
    console.log(`  ✓ Keeping: ${toKeep.file}`);
    
    toRemove.forEach(({ file }) => {
      const filePath = path.join(webcomponentsDir, file);
      fs.unlinkSync(filePath);
      console.log(`  ✗ Removed: ${file}`);
      removedCount++;
    });
  }
});

if (removedCount === 0) {
  console.log('\n✅ No duplicates found!');
} else {
  console.log(`\n✅ Removed ${removedCount} duplicate files!`);
  console.log('\nRun "npm run convert" to regenerate the index file with correct imports.');
}
