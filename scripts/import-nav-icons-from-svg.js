#!/usr/bin/env node

/**
 * Importerer Nav Aksel-ikoner fra SVG-filer som Angular-komponenter.
 *
 * Skriptet:
 * 1. Leser SVG-filer (standard: node_modules/@navikt/aksel-icons/dist/svg)
 * 2. Lager en komponent per nytt ikon i projects/icons/src/lib/components
 * 3. Skriver src/index.ts og src/all-icons.ts på nytt
 * 4. Kjører generate-icon-metadata.js for ikonsiden i demoappen
 *
 * Bruk:
 *   npm run import:nav-icons                       # fra @navikt/aksel-icons i node_modules
 *   npm run import:nav-icons -- <svg-mappe>        # fra en annen mappe, f.eks. utpakket zip
 *   npm run import:nav-icons -- --force            # oppdater også SVG-path i eksisterende ikoner
 *   npm run import:nav-icons -- --entries          # skriv bare index.ts og all-icons.ts på nytt
 *
 * Se projects/icons/UPDATING_ICONS.md.
 */

const fs = require('fs');
const path = require('path');

const ICONS_SRC = path.join(__dirname, '../projects/icons/src');
const ICONS_DIR = path.join(ICONS_SRC, 'lib/components');
const INDEX_PATH = path.join(ICONS_SRC, 'index.ts');
const ALL_ICONS_PATH = path.join(ICONS_SRC, 'all-icons.ts');
const PACKAGE_NAME = '@helsevestikt/hviktor-icons';
const DEFAULT_SVG_DIR = path.join(__dirname, '../node_modules/@navikt/aksel-icons/dist/svg');

const args = process.argv.slice(2);
const force = args.includes('--force');
const svgSourceDir = args.find((arg) => !arg.startsWith('--')) ?? DEFAULT_SVG_DIR;

if (args.includes('--entries')) {
  writeEntryFiles();
  process.exit(0);
}

if (!fs.existsSync(svgSourceDir)) {
  console.error(`❌ Fant ikke mappen: ${svgSourceDir}`);
  console.error('   Kjør `npm install` eller oppgi en mappe med SVG-filer.');
  process.exit(1);
}

/**
 * Aksel-filnavn (PascalCase eller kebab-case) til PascalCase.
 * Eksempel: "ChevronDown.svg" og "chevron-down.svg" -> "ChevronDown"
 */
function fileNameToComponentName(fileName) {
  return fileName
    .replace('.svg', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * PascalCase til kebab-case.
 * Eksempel: "ChevronDown" -> "chevron-down", "XMark" -> "x-mark", "Buildings2Fill" -> "buildings2-fill"
 */
function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
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
  console.log('🚀 Importerer Aksel-ikoner fra SVG-filer...\n');
  console.log(`📁 Kilde: ${svgSourceDir}\n`);

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
  let updateCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgSourceDir, svgFile);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    const componentName = fileNameToComponentName(svgFile);
    const kebabName = toKebab(componentName);
    const fileName = `icon-${kebabName}.component.ts`;
    const filePath = path.join(ICONS_DIR, fileName);

    const pathData = extractPathFromSvg(svgContent);

    if (!pathData) {
      console.error(`❌ Fant ingen path i ${svgFile}`);
      errorCount++;
      continue;
    }

    if (fs.existsSync(filePath)) {
      if (force && updatePath(filePath, pathData)) {
        console.log(`🔄 Oppdaterte ${fileName}`);
        updateCount++;
      } else {
        skipCount++;
      }
      continue;
    }

    const componentContent = generateComponentFile(componentName, kebabName, pathData);
    fs.writeFileSync(filePath, componentContent, 'utf-8');

    console.log(`✅ Laget ${fileName}`);
    successCount++;
  }

  console.log(`\n📊 Oppsummering:`);
  console.log(`   ✅ Nye: ${successCount}`);
  if (force) {
    console.log(`   🔄 Oppdatert: ${updateCount}`);
  }
  console.log(`   ⏭️  Uendret: ${skipCount}`);
  console.log(`   ❌ Feil: ${errorCount}`);

  writeEntryFiles();
  require('./generate-icon-metadata.js');

  console.log('\n💡 Neste steg:');
  console.log('   1. Se over endringene med git status / git diff');
  console.log('   2. npm run build:icons');
  console.log('   3. Sjekk /ikoner i demoappen');
}

/**
 * Bytter ut SVG-path i en eksisterende komponent. Returnerer true hvis innholdet endret seg.
 */
function updatePath(filePath, pathData) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.replace(/(readonly path =\s*')[^']*(')/, `$1${pathData}$2`);
  if (updated === content) {
    return false;
  }
  fs.writeFileSync(filePath, updated, 'utf-8');
  return true;
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
