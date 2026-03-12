const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'src', 'lib', 'icons');

// Convert PascalCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Read all icon component files
const files = fs.readdirSync(iconsDir).filter(f => f.startsWith('icon-') && f.endsWith('.component.ts'));

console.log(`Found ${files.length} icon components to update...`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find the selector
  const selectorMatch = content.match(/selector:\s*['"]hvi-icon-([^'"]+)['"]/);
  
  if (!selectorMatch) {
    console.warn(`⚠️  Skipping ${file}: Could not find selector`);
    return;
  }
  
  const originalIconName = selectorMatch[1];
  const kebabIconName = toKebabCase(originalIconName);
  
  if (originalIconName === kebabIconName) {
    console.log(`  ${file}: Already in kebab-case`);
    return;
  }
  
  const oldSelector = `hvi-icon-${originalIconName}`;
  const newSelector = `hvi-icon-${kebabIconName}`;
  
  // Replace the selector
  content = content.replace(
    /selector:\s*['"]hvi-icon-[^'"]+['"]/,
    `selector: '${newSelector}'`
  );
  
  // Write back to file
  fs.writeFileSync(filePath, content, 'utf-8');
  updatedCount++;
  
  console.log(`✓ ${file}: ${oldSelector} → ${newSelector}`);
});

console.log(`\n✅ Updated ${updatedCount} icon selectors to kebab-case!`);
console.log(`\nNote: Remember to run 'npm run convert' to update web components with new selectors.`);
