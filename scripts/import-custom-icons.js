#!/usr/bin/env node

/**
 * Importerer egenutviklede ikoner (laget i Figma) som Angular-komponenter.
 *
 * Kilden er SVG-filene i projects/icons/custom/svg. De er "source of truth": komponentene i
 * projects/icons/src/lib/custom genereres fra dem hver gang, og skal ikke redigeres manuelt.
 *
 * Skriptet:
 * 1. Validerer hver SVG (24×24 viewBox, bare fylte paths, ingen strek/transform/andre former)
 * 2. Stopper navn som kolliderer med et Aksel-ikon
 * 3. Lager eller oppdaterer én komponent per SVG i projects/icons/src/lib/custom
 * 4. Skriver src/index.ts og src/all-icons.ts på nytt
 * 5. Kjører generate-icon-metadata.js (kategori og nøkkelord fra projects/icons/custom/metadata.json)
 *
 * Bruk: npm run import:custom-icons
 *
 * Se projects/icons/CUSTOM_ICONS.md.
 */

const fs = require('fs');
const path = require('path');
const {
  AKSEL_ICONS_DIR,
  AKSEL_SVG_DIR,
  CUSTOM_ICONS_DIR,
  CUSTOM_METADATA_PATH,
  CUSTOM_SVG_DIR,
  componentFileName,
  extractPathFromSvg,
  fileNameToComponentName,
  generateComponentFile,
  toKebab,
  writeEntryFiles,
} = require('./icon-utils');

const UNSUPPORTED_ELEMENTS = [
  'circle',
  'ellipse',
  'rect',
  'line',
  'polyline',
  'polygon',
  'use',
  'image',
  'text',
  'mask',
  'pattern',
  'linearGradient',
  'radialGradient',
  'filter',
];

/**
 * Sjekker at SVG-en kan bli et ikon som oppfører seg som Aksel-ikonene:
 * én farge (currentColor), 24×24 og bare fylte paths.
 */
function validateSvg(svgContent) {
  const errors = [];
  const warnings = [];

  // Figma legger ofte på en clip-path for rammen i <defs>. Den trengs ikke.
  let svg = svgContent;
  if (/<defs>[\s\S]*?<\/defs>/.test(svg)) {
    svg = svg.replace(/<defs>[\s\S]*?<\/defs>/g, '');
    warnings.push('<defs> (f.eks. clip-path fra Figma) ignoreres');
  }

  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  if (viewBox?.trim().replace(/\s+/g, ' ') !== '0 0 24 24') {
    errors.push(
      `viewBox må være "0 0 24 24" (fant ${viewBox ? `"${viewBox}"` : 'ingen'}). Eksporter fra en 24×24-ramme i Figma.`,
    );
  }

  const elementPattern = new RegExp(`<(${UNSUPPORTED_ELEMENTS.join('|')})\\b`, 'g');
  const elements = [...new Set([...svg.matchAll(elementPattern)].map((match) => match[1]))];
  if (elements.length > 0) {
    errors.push(
      `Inneholder <${elements.join('>, <')}>. Gjør alt om til path i Figma (Outline stroke + Flatten).`,
    );
  }

  if (/\sstroke="(?!none")[^"]*"/.test(svg) || /\sstroke-width=/.test(svg)) {
    errors.push('Inneholder strek (stroke). Bruk Outline stroke i Figma, så blir alt fyll.');
  }

  if (/\stransform=/.test(svg)) {
    errors.push('Inneholder transform. Bruk Flatten i Figma.');
  }

  if (/\s(fill-)?opacity="/.test(svg)) {
    warnings.push('Gjennomsiktighet (opacity) ignoreres, ikonet tegnes i én farge');
  }

  const pathCount = (svg.match(/<path\b/g) ?? []).length;
  if (pathCount === 0) {
    errors.push('Fant ingen <path>.');
  } else if (pathCount > 1) {
    warnings.push(
      `${pathCount} paths slås sammen til én. Overlappende former kan bli hull (fill-rule evenodd), så slå dem sammen med Union + Flatten i Figma.`,
    );
  }

  return { errors, warnings, svg };
}

function readCustomMetadata() {
  if (!fs.existsSync(CUSTOM_METADATA_PATH)) {
    return {};
  }
  try {
    return JSON.parse(fs.readFileSync(CUSTOM_METADATA_PATH, 'utf-8'));
  } catch (error) {
    console.error(`❌ Kunne ikke lese ${CUSTOM_METADATA_PATH}: ${error.message}`);
    process.exit(1);
  }
}

function readAkselNames() {
  if (!fs.existsSync(AKSEL_SVG_DIR)) {
    console.warn(
      '⚠️  Fant ikke @navikt/aksel-icons i node_modules. Kan ikke sjekke navnekollisjoner mot Aksel (kjør npm install).\n',
    );
    return new Set();
  }
  return new Set(
    fs
      .readdirSync(AKSEL_SVG_DIR)
      .filter((file) => file.endsWith('.svg'))
      .map(fileNameToComponentName),
  );
}

function importCustomIcons() {
  console.log('🎨 Importerer egenutviklede ikoner...\n');
  console.log(`📁 Kilde: ${path.relative(process.cwd(), CUSTOM_SVG_DIR)}\n`);

  if (!fs.existsSync(CUSTOM_SVG_DIR)) {
    console.error(`❌ Fant ikke mappen: ${CUSTOM_SVG_DIR}`);
    process.exit(1);
  }
  fs.mkdirSync(CUSTOM_ICONS_DIR, { recursive: true });

  const metadata = readCustomMetadata();
  const akselNames = readAkselNames();
  const svgFiles = fs
    .readdirSync(CUSTOM_SVG_DIR)
    .filter((file) => file.endsWith('.svg'))
    .sort();

  const counts = { created: 0, updated: 0, unchanged: 0, errors: 0 };
  const expectedFiles = new Set();
  const names = new Set();

  for (const svgFile of svgFiles) {
    const componentName = fileNameToComponentName(svgFile);
    const kebabName = toKebab(componentName);
    const fileName = componentFileName(kebabName);
    const filePath = path.join(CUSTOM_ICONS_DIR, fileName);
    const alreadyExists = fs.existsSync(filePath);
    expectedFiles.add(fileName);
    names.add(componentName);

    const problems = [];
    const notes = [];

    if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
      problems.push('Ugyldig filnavn. Bruk PascalCase uten mellomrom, f.eks. TextBold.svg.');
    }

    const collidesWithAksel =
      akselNames.has(componentName) || fs.existsSync(path.join(AKSEL_ICONS_DIR, fileName));
    if (collidesWithAksel && alreadyExists) {
      notes.push(
        `Aksel har nå et ikon som heter ${componentName}. Vårt beholdes, men vurder å bytte til Aksel-ikonet.`,
      );
    } else if (collidesWithAksel) {
      problems.push(
        `Aksel har allerede et ikon som heter ${componentName}. Bruk det, eller gi vårt et annet navn.`,
      );
    }

    const { errors, warnings, svg } = validateSvg(
      fs.readFileSync(path.join(CUSTOM_SVG_DIR, svgFile), 'utf-8'),
    );
    problems.push(...errors);
    notes.push(...warnings);

    if (!metadata[componentName]) {
      notes.push(
        'Mangler i custom/metadata.json, så det får kategorien "Other" og ingen nøkkelord',
      );
    }

    if (problems.length > 0) {
      console.error(`❌ ${svgFile}`);
      problems.forEach((problem) => console.error(`   - ${problem}`));
      counts.errors++;
      continue;
    }

    const header = [
      `// Generert fra projects/icons/custom/svg/${svgFile} av scripts/import-custom-icons.js.`,
      '// Ikke rediger denne filen. Endre SVG-en og kjør `npm run import:custom-icons`.',
      '',
    ].join('\n');
    const content = generateComponentFile(
      componentName,
      kebabName,
      extractPathFromSvg(svg),
      header,
    );

    if (!alreadyExists) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Laget ${fileName} (<hvi-icon-${kebabName}>)`);
      counts.created++;
    } else if (fs.readFileSync(filePath, 'utf-8') !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`🔄 Oppdaterte ${fileName}`);
      counts.updated++;
    } else {
      counts.unchanged++;
    }
    notes.forEach((note) => console.warn(`   ⚠️  ${svgFile}: ${note}`));
  }

  // Komponenter uten SVG slettes ikke automatisk – det er en breaking change for de som bruker pakken
  const orphans = fs
    .readdirSync(CUSTOM_ICONS_DIR)
    .filter((file) => file.endsWith('.component.ts') && !expectedFiles.has(file));
  if (orphans.length > 0) {
    console.warn(
      `\n⚠️  Disse komponentene har ingen SVG i custom/svg lenger. Slett dem manuelt hvis det er meningen (breaking change):`,
    );
    orphans.forEach((file) => console.warn(`   ${file}`));
  }

  const unusedMetadata = Object.keys(metadata).filter((name) => !names.has(name));
  if (unusedMetadata.length > 0) {
    console.warn(
      `\n⚠️  custom/metadata.json har oppføringer uten SVG: ${unusedMetadata.join(', ')}`,
    );
  }

  console.log(`\n📊 Oppsummering:`);
  console.log(`   ✅ Nye: ${counts.created}`);
  console.log(`   🔄 Oppdatert: ${counts.updated}`);
  console.log(`   ⏭️  Uendret: ${counts.unchanged}`);
  console.log(`   ❌ Feil: ${counts.errors}\n`);

  writeEntryFiles();
  require('./generate-icon-metadata.js');

  console.log('\n💡 Neste steg:');
  console.log('   1. Se over endringene med git status / git diff');
  console.log('   2. npm run build:icons');
  console.log('   3. Sjekk /ikoner i demoappen');

  if (counts.errors > 0) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  importCustomIcons();
}

module.exports = { validateSvg };
