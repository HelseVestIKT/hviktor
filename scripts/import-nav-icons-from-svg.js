#!/usr/bin/env node

/**
 * Import NAV Aksel icons from SVG files
 *
 * This script:
 * 1. Reads SVG files from a directory
 * 2. Extracts the path data from each SVG
 * 3. Generates an icon component file for each icon
 * 4. Regenerates src/index.ts and src/all-icons.ts from all icon components
 *
 * Usage:
 * 1. Download icons from: https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip
 * 2. Extract to a folder (e.g., temp/nav-icons/)
 * 3. Run: node scripts/import-nav-icons-from-svg.js temp/nav-icons/svg
 *
 * Regenerate only the entry files: node scripts/import-nav-icons-from-svg.js --entries
 */

const fs = require('fs');
const path = require('path');

const ICONS_SRC = path.join(__dirname, '../projects/icons/src');
const ICONS_DIR = path.join(ICONS_SRC, 'lib/components');
const INDEX_PATH = path.join(ICONS_SRC, 'index.ts');
const ALL_ICONS_PATH = path.join(ICONS_SRC, 'all-icons.ts');
const PACKAGE_NAME = '@helsevestikt/hviktor-icons';

const [, , svgSourceDir] = process.argv;

if (svgSourceDir === '--entries') {
  writeEntryFiles();
  process.exit(0);
}

if (!svgSourceDir) {
  console.error('❌ Please provide the path to SVG files directory');
  console.error('   Usage: node scripts/import-nav-icons-from-svg.js <svg-directory>');
  console.error('');
  console.error('   Example:');
  console.error('   1. Download: https://cdn.nav.no/aksel/icons/zip/aksel-icons.zip');
  console.error('   2. Extract the zip file');
  console.error('   3. Run: node scripts/import-nav-icons-from-svg.js ./aksel-icons/svg');
  process.exit(1);
}

if (!fs.existsSync(svgSourceDir)) {
  console.error(`❌ Directory not found: ${svgSourceDir}`);
  process.exit(1);
}

/**
 * Convert filename to component name
 * Example: "chevron-down.svg" -> "ChevronDown"
 */
function fileNameToComponentName(fileName) {
  return fileName
    .replace('.svg', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Extract path data from SVG file
 */
function extractPathFromSvg(svgContent) {
  // Match path d attribute
  const pathMatches = [...svgContent.matchAll(/<path[^>]+d="([^"]+)"/g)];

  if (pathMatches.length === 0) {
    return null;
  }

  // If multiple paths, combine them
  if (pathMatches.length > 1) {
    return pathMatches.map((match) => match[1]).join(' ');
  }

  return pathMatches[0][1];
}

/**
 * Generate icon component file content
 */
function generateComponentFile(componentName, kebabName, svgPath) {
  const className = `HviIcon${componentName}`;

  return `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HviIconBase } from '../base-icon.component';

@Component({
  selector: 'hvi-icon-${kebabName}',
  standalone: true,
  template: \`<svg
    [attr.width]="sizePx()"
    [attr.height]="sizePx()"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" [attr.d]="path" />
  </svg>\`,
  styles: [':host { display: inline-block; line-height: 0; }', 'svg { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${className} extends HviIconBase {
  protected override readonly path =
    '${svgPath}';
}
`;
}

/**
 * Main function to import all icons
 */
async function importIcons() {
  console.log('🚀 Importing NAV Aksel icons from SVG files...\n');
  console.log(`📁 Source directory: ${svgSourceDir}\n`);

  // Ensure icons directory exists
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // Read all SVG files
  const svgFiles = fs.readdirSync(svgSourceDir).filter((file) => file.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.error('❌ No SVG files found in directory');
    process.exit(1);
  }

  console.log(`Found ${svgFiles.length} SVG files\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgSourceDir, svgFile);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    const kebabName = svgFile.replace('.svg', '');
    const componentName = fileNameToComponentName(svgFile);
    const fileName = `icon-${kebabName}.component.ts`;
    const filePath = path.join(ICONS_DIR, fileName);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${kebabName} (already exists)`);
      skipCount++;
      continue;
    }

    // Extract SVG path
    const pathData = extractPathFromSvg(svgContent);

    if (!pathData) {
      console.error(`❌ Failed to extract path from ${svgFile}`);
      errorCount++;
      continue;
    }

    // Generate component file
    const componentContent = generateComponentFile(componentName, kebabName, pathData);
    fs.writeFileSync(filePath, componentContent, 'utf-8');

    console.log(`✅ Generated ${fileName}`);
    successCount++;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Created: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);

  writeEntryFiles();

  console.log('\n🎉 Done!');
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Run: npm run build:icons`);
  console.log(`   2. Test the icons in the demo app`);
}

/**
 * Regenerate index.ts and all-icons.ts from the icon components on disk
 */
function writeEntryFiles() {
  const components = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith('.component.ts'))
    .sort()
    .map((file) => {
      const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
      const match = content.match(/export class (\w+)/);
      if (!match) {
        throw new Error(`Fant ingen eksportert klasse i ${file}`);
      }
      return { fileName: file.replace('.ts', ''), className: match[1] };
    });

  const index = [
    '// Export all Angular icon components',
    '// Import and include icons in a component imports array',
    `// Usage: import { HviIconAirplane } from '${PACKAGE_NAME}';`,
    ...components.map(
      ({ fileName, className }) => `export { ${className} } from './lib/components/${fileName}';`,
    ),
    '',
    '// Export base class if consumers want to extend it',
    "export { HviIconBase } from './lib/base-icon.component';",
    '',
  ].join('\n');

  const classNames = [...components.map(({ className }) => className), 'HviIconBase'];
  // Imports the package itself so the all-icons entry point reuses the main bundle's classes
  const allIcons = [
    '// Optional convenience entrypoint: import all icons at once.',
    '// Prefer named per-icon imports in production bundle-size-sensitive apps.',
    'import {',
    ...classNames.map((name) => `  ${name},`),
    `} from '${PACKAGE_NAME}';`,
    '',
    'export const HVI_ALL_ICONS = [',
    ...classNames.map((name) => `  ${name},`),
    '] as const;',
    '',
    'export type HviAllIcons = (typeof HVI_ALL_ICONS)[number];',
    '',
  ].join('\n');

  fs.writeFileSync(INDEX_PATH, index, 'utf-8');
  fs.writeFileSync(ALL_ICONS_PATH, allIcons, 'utf-8');
  console.log(`✅ Skrev index.ts og all-icons.ts med ${components.length} ikoner`);
}

// Run the script
importIcons().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
