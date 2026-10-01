#!/usr/bin/env node

/**
 * Genererer metadata (kategori, nøkkelord, variant) for ikonsiden i demoappen.
 *
 * Leser ikonkomponentene i projects/icons og slår dem opp i metadataene til
 * @navikt/aksel-icons. Resultatet skrives til src/app/demo/pages/icons/icon-metadata.json.
 *
 * Bruk: npm run generate:icon-metadata
 */

const fs = require('fs');
const path = require('path');
const akselMetadata = require('@navikt/aksel-icons/metadata');

const ICONS_DIR = path.join(__dirname, '../projects/icons/src/lib/components');
const OUTPUT_PATH = path.join(__dirname, '../src/app/demo/pages/icons/icon-metadata.json');
const FALLBACK_CATEGORY = 'Other';

const files = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith('.component.ts'))
  .sort();

const missing = [];

const icons = files.map((file) => {
  const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
  const className = content.match(/export class (\w+)/)?.[1];
  const selector = content.match(/selector:\s*'([^']+)'/)?.[1];
  const svgPath = content.match(/readonly path =\s*'([^']+)'/)?.[1];
  if (!className || !selector || !svgPath) {
    throw new Error(`Fant ikke klassenavn, selector eller path i ${file}`);
  }

  // Klassenavnet er riktig for de fleste; noen få (f.eks. HviIcon for Component) må utledes fra selectoren
  const fromClass = className.replace(/^HviIcon/, '');
  const fromSelector = selector
    .replace(/^hvi-icon-/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  const name = akselMetadata[fromClass] || !akselMetadata[fromSelector] ? fromClass : fromSelector;
  const meta = akselMetadata[name];
  if (!meta) {
    missing.push(name);
  }

  return {
    name,
    className,
    selector,
    category: (meta?.category ?? FALLBACK_CATEGORY).replace(/\s+/g, ' '),
    keywords: [...new Set((meta?.keywords ?? []).map((k) => k.replace(/\s+/g, ' ').trim()))],
    variant: /Fill(ed)?$/.test(name) ? 'fill' : 'stroke',
    path: svgPath,
  };
});

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(icons, null, 2)}\n`, 'utf-8');

console.log(
  `✅ Skrev metadata for ${icons.length} ikoner til ${path.relative(process.cwd(), OUTPUT_PATH)}`,
);
if (missing.length > 0) {
  console.warn(
    `⚠️  ${missing.length} ikoner mangler i @navikt/aksel-icons og får kategorien "${FALLBACK_CATEGORY}":`,
  );
  console.warn(`   ${missing.join(', ')}`);
}
