const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'src', 'lib', 'icons');
const dataFile = path.join(__dirname, '..', 'src', 'lib', 'icons-data.json');
const outputDir = path.join(__dirname, '..', 'src', 'lib', 'webcomponents');
const declarationsFile = path.join(__dirname, '..', 'src', 'lib', 'icons.d.ts');
const indexFile = path.join(__dirname, '..', 'src', 'index.ts');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let iconData = [];

// Try to load from icons-data.json first
if (fs.existsSync(dataFile)) {
  console.log('Loading icon data from icons-data.json...');
  iconData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  console.log(`Found ${iconData.length} icons in data file`);
} else if (fs.existsSync(iconsDir)) {
  // Fall back to reading from Angular components
  console.log('Loading icon data from Angular components...');
  const files = fs.readdirSync(iconsDir).filter(f => f.startsWith('icon-') && f.endsWith('.component.ts'));
  
  files.forEach(file => {
    const filePath = path.join(iconsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);
    const pathMatch = content.match(/protected override readonly path\s*=\s*['"]([^'"]+)['"]/);
    const classMatch = content.match(/export class (\w+)/);
    
    if (selectorMatch && pathMatch && classMatch) {
      iconData.push({
        selector: selectorMatch[1],
        className: classMatch[1],
        path: pathMatch[1]
      });
    }
  });
  
  console.log(`Found ${iconData.length} icons in components folder`);
} else {
  console.error('❌ Error: Neither icons-data.json nor icons folder found!');
  console.error('Run "npm run extract-data" first to extract icon data.');
  process.exit(1);
}

console.log('\nGenerating Web Components...');

const iconNames = [];
const webComponentImports = [];

iconData.forEach(({ selector, className, path: pathData }) => {
  const webComponentClassName = className.replace('Component', '').replace(/^HviIcon/, 'HviIcon');
  const fileName = selector.replace('hvi-icon-', 'icon-') + '.webcomponent.ts';
  
  iconNames.push({ selector, className: webComponentClassName, fileName: fileName.replace('.ts', '') });
  
  // Generate Web Component file
  const webComponentCode = `import { HviIconBase } from '../base-icon.webcomponent';

export class ${webComponentClassName} extends HviIconBase {
  protected get path(): string {
    return '${pathData}';
  }
}

// Register the custom element (only in browser environment)
if (typeof customElements !== 'undefined' && !customElements.get('${selector}')) {
  customElements.define('${selector}', ${webComponentClassName});
}
`;
  
  const outputFile = path.join(outputDir, fileName);
  fs.writeFileSync(outputFile, webComponentCode);
  webComponentImports.push(`import './lib/webcomponents/${fileName.replace('.ts', '')}';`);
  
  console.log(`✓ Generated ${fileName}`);
});

console.log(`\n✅ Generated ${iconNames.length} web components!`);

// Generate TypeScript declarations for IntelliSense
console.log('\nGenerating TypeScript declarations...');

const declarations = `// This file provides IntelliSense for Angular and other TypeScript frameworks
// It extends the global HTMLElementTagNameMap to include our custom elements

declare global {
  namespace JSX {
    interface IntrinsicElements {
${iconNames.map(({ selector }) => `      '${selector}': HviIconAttributes;`).join('\n')}
    }
  }

  interface HTMLElementTagNameMap {
${iconNames.map(({ selector, className }) => `    '${selector}': ${className};`).join('\n')}
  }
}

export interface HviIconAttributes {
  size?: 'sm' | 'md' | 'lg';
}

export interface HviIconElement extends HTMLElement {
  size: 'sm' | 'md' | 'lg';
}

${iconNames.map(({ className }) => `export interface ${className} extends HviIconElement {}`).join('\n')}

export {};
`;

fs.writeFileSync(declarationsFile, declarations);
console.log(`✓ Generated ${declarationsFile}`);

// Generate main entry point (exports classes, auto-registers on import)
console.log('\nGenerating main entry point...');

const classExports = iconNames.map(({ className, fileName }) => 
  `export { ${className} } from './lib/webcomponents/${fileName}';`
).join('\n');

const indexCode = `// Export all icon classes
// Importing any icon automatically registers it as a custom element
// Usage: import { HviIconAirplaneWebComponent } from '@helsevestikt/hviktor-icons';
${classExports}

// Export base class if consumers want to extend it
export { HviIconBase } from './lib/base-icon.webcomponent';
`;

fs.writeFileSync(indexFile, indexCode);
console.log(`✓ Generated ${indexFile}`);

// Generate all.ts for importing everything
const allFile = path.join(__dirname, '..', 'src', 'all.ts');
const allCode = `// Import ALL icons at once
// Only use this if you need all icons in your app
// For better bundle size, import individual icons instead

${webComponentImports.join('\n')}

export { HviIconBase } from './lib/base-icon.webcomponent';
`;

fs.writeFileSync(allFile, allCode);
console.log(`✓ Generated ${allFile}`);

console.log('\n✅ Conversion complete!');
console.log(`\nYou can now safely delete the src/lib/icons folder if you want.`);
console.log(`The icons-data.json file is now your source of truth.`);
console.log(`\nNext steps:`);
console.log(`1. Build your library`);
console.log(`2. In Angular apps, import: import '@helsevestikt/hviktor-icons';`);
console.log(`3. Add CUSTOM_ELEMENTS_SCHEMA to your Angular config`);
console.log(`4. Use in templates: <hvi-icon-airplane size="lg"></hvi-icon-airplane>`);
