#!/usr/bin/env node

/**
 * Genererer metadata (kategori, nøkkelord, variant, kilde) for ikonsiden i demoappen.
 *
 * Leser ikonkomponentene i projects/icons og slår dem opp i:
 * - metadataene til @navikt/aksel-icons (Aksel-ikoner i lib/components)
 * - projects/icons/custom/metadata.json (egenutviklede ikoner i lib/custom)
 *
 * Resultatet skrives til src/app/demo/pages/icons/icon-metadata.json.
 *
 * Bruk: npm run generate:icon-metadata
 */

const fs = require('fs');
const path = require('path');
const akselMetadata = require('@navikt/aksel-icons/metadata');
const { CUSTOM_METADATA_PATH, readIconComponents } = require('./icon-utils');

const OUTPUT_PATH = path.join(__dirname, '../src/app/demo/pages/icons/icon-metadata.json');
const FALLBACK_CATEGORY = 'Other';

const customMetadata = fs.existsSync(CUSTOM_METADATA_PATH)
  ? JSON.parse(fs.readFileSync(CUSTOM_METADATA_PATH, 'utf-8'))
  : {};

const missing = [];

const icons = readIconComponents().map(({ source, file, className, content }) => {
  const selector = content.match(/selector:\s*'([^']+)'/)?.[1];
  const svgPath = content.match(/readonly path =\s*'([^']+)'/)?.[1];
  if (!selector || !svgPath) {
    throw new Error(`Fant ikke selector eller path i ${file}`);
  }

  const fromClass = className.replace(/^HviIcon/, '');
  let name = fromClass;
  let meta;

  if (source === 'custom') {
    meta = customMetadata[name];
  } else {
    // Klassenavnet er riktig for de fleste; noen få (f.eks. HviIcon for Component) må utledes fra selectoren
    const fromSelector = selector
      .replace(/^hvi-icon-/, '')
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    name = akselMetadata[fromClass] || !akselMetadata[fromSelector] ? fromClass : fromSelector;
    meta = akselMetadata[name];
  }

  if (!meta) {
    missing.push(source === 'custom' ? `${name} (egenutviklet)` : name);
  }

  return {
    name,
    className,
    selector,
    source,
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
    `⚠️  ${missing.length} ikoner mangler metadata og får kategorien "${FALLBACK_CATEGORY}":`,
  );
  console.warn(`   ${missing.join(', ')}`);
  console.warn(
    '   Aksel-ikoner: mangler i @navikt/aksel-icons. Egenutviklede: legg dem til i projects/icons/custom/metadata.json.',
  );
}
