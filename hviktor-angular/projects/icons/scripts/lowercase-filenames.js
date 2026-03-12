const fs = require('fs');
const path = require('path');

const webcomponentsDir = path.join(__dirname, '..', 'src', 'lib', 'webcomponents');

if (!fs.existsSync(webcomponentsDir)) {
  console.log('No webcomponents folder found.');
  process.exit(0);
}

console.log('Renaming files to lowercase...');

const files = fs.readdirSync(webcomponentsDir).filter(f => f.endsWith('.webcomponent.ts'));

let renamedCount = 0;

files.forEach(file => {
  const lowerFile = file.toLowerCase();
  
  if (file !== lowerFile) {
    const oldPath = path.join(webcomponentsDir, file);
    const newPath = path.join(webcomponentsDir, lowerFile);
    
    // Check if lowercase version already exists
    if (fs.existsSync(newPath)) {
      console.log(`⚠️  Skipping ${file}: lowercase version already exists`);
      // Delete the uppercase version since lowercase exists
      fs.unlinkSync(oldPath);
      console.log(`  ✗ Removed duplicate: ${file}`);
      return;
    }
    
    fs.renameSync(oldPath, newPath);
    console.log(`✓ Renamed: ${file} → ${lowerFile}`);
    renamedCount++;
  }
});

if (renamedCount === 0) {
  console.log('\n✅ All files are already lowercase!');
} else {
  console.log(`\n✅ Renamed ${renamedCount} files to lowercase!`);
  console.log('\nRun "npm run convert" to regenerate the index file with correct imports.');
}
