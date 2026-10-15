#!/usr/bin/env node

/**
 * Importerer Nav Aksel-ikoner fra SVG-filer som Angular-komponenter.
 *
 * Skriptet:
 * 1. Leser SVG-filer (standard: node_modules/@navikt/aksel-icons/dist/svg)
 * 2. Lager en komponent per nytt ikon i projects/icons/src/lib/components
 * 3. Skriver src/index.ts og src/all-icons.ts på nytt (inkludert egenutviklede ikoner i lib/custom)
 * 4. Kjører generate-icon-metadata.js for ikonsiden i demoappen
 *
 * Egenutviklede ikoner (projects/icons/src/lib/custom) røres aldri. Hvis Aksel får et ikon med
 * samme navn som et egenutviklet ikon, beholdes vårt og Aksel-ikonet hoppes over.
 *
 * Bruk:
 *   npm run import:nav-icons                       # fra @navikt/aksel-icons i node_modules
 *   npm run import:nav-icons -- <svg-mappe>        # fra en annen mappe, f.eks. utpakket zip
 *   npm run import:nav-icons -- --force            # oppdater også SVG-path i eksisterende ikoner
 *   npm run import:nav-icons -- --entries          # skriv bare index.ts og all-icons.ts på nytt
 *
 * Se projects/icons/UPDATING_ICONS.md og projects/icons/CUSTOM_ICONS.md.
 */

const fs = require('fs');
const path = require('path');
const {
  AKSEL_ICONS_DIR,
  AKSEL_SVG_DIR,
  CUSTOM_ICONS_DIR,
  componentFileName,
  extractPathFromSvg,
  fileNameToComponentName,
  generateComponentFile,
  toKebab,
  writeEntryFiles,
} = require('./icon-utils');

const args = process.argv.slice(2);
const force = args.includes('--force');
const svgSourceDir = args.find((arg) => !arg.startsWith('--')) ?? AKSEL_SVG_DIR;

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
 * Main function to import all icons
 */
async function importIcons() {
  console.log('🚀 Importerer Aksel-ikoner fra SVG-filer...\n');
  console.log(`📁 Kilde: ${svgSourceDir}\n`);

  // Ensure icons directory exists
  if (!fs.existsSync(AKSEL_ICONS_DIR)) {
    fs.mkdirSync(AKSEL_ICONS_DIR, { recursive: true });
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
  const collisions = [];

  for (const svgFile of svgFiles) {
    const svgPath = path.join(svgSourceDir, svgFile);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');

    const componentName = fileNameToComponentName(svgFile);
    const kebabName = toKebab(componentName);
    const fileName = componentFileName(kebabName);
    const filePath = path.join(AKSEL_ICONS_DIR, fileName);

    // Egenutviklede ikoner vinner alltid over Aksel-ikoner med samme navn
    if (fs.existsSync(path.join(CUSTOM_ICONS_DIR, fileName))) {
      collisions.push(componentName);
      continue;
    }

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

  if (collisions.length > 0) {
    console.warn(
      `\n⚠️  Aksel har ${collisions.length} ikon(er) med samme navn som egenutviklede ikoner. Våre beholdes, Aksel-versjonen er ikke importert:`,
    );
    console.warn(`   ${collisions.join(', ')}`);
    console.warn(
      '   Vurder å bytte til Aksel-ikonet (breaking change), se projects/icons/CUSTOM_ICONS.md.',
    );
  }

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

// Run the script
importIcons().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
