/**
 * Felles hjelpefunksjoner for ikonskriptene:
 * - scripts/import-nav-icons-from-svg.js (Aksel-ikoner)
 * - scripts/import-custom-icons.js (egenutviklede ikoner)
 * - scripts/generate-icon-metadata.js (ikonsiden i demoappen)
 */

const fs = require('fs');
const path = require('path');

const ICONS_ROOT = path.join(__dirname, '../projects/icons');
const ICONS_SRC = path.join(ICONS_ROOT, 'src');
const AKSEL_ICONS_DIR = path.join(ICONS_SRC, 'lib/components');
const CUSTOM_ICONS_DIR = path.join(ICONS_SRC, 'lib/custom');
const CUSTOM_SVG_DIR = path.join(ICONS_ROOT, 'custom/svg');
const CUSTOM_METADATA_PATH = path.join(ICONS_ROOT, 'custom/metadata.json');
const AKSEL_SVG_DIR = path.join(__dirname, '../node_modules/@navikt/aksel-icons/dist/svg');
const INDEX_PATH = path.join(ICONS_SRC, 'index.ts');
const ALL_ICONS_PATH = path.join(ICONS_SRC, 'all-icons.ts');
const PACKAGE_NAME = '@helsevestikt/hviktor-icons';

/**
 * Ikonkildene, i den rekkefølgen de eksporteres fra index.ts.
 * Aksel-ikonene ligger i lib/components og eies av import-nav-icons-from-svg.js.
 * Egenutviklede ikoner ligger i lib/custom og eies av import-custom-icons.js.
 */
const ICON_SOURCES = [
  { source: 'aksel', dir: AKSEL_ICONS_DIR, importDir: './lib/components' },
  {
    source: 'custom',
    dir: CUSTOM_ICONS_DIR,
    importDir: './lib/custom',
    heading: 'Egenutviklede ikoner (kilde: projects/icons/custom/svg)',
  },
];

/**
 * Filnavn (PascalCase eller kebab-case) til PascalCase.
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

function componentFileName(kebabName) {
  return `icon-${kebabName}.component.ts`;
}

/**
 * Henter d-attributtet fra alle <path>-elementer. Flere paths slås sammen til én.
 */
function extractPathFromSvg(svgContent) {
  const pathMatches = [...svgContent.matchAll(/<path[^>]+d="([^"]+)"/g)];

  if (pathMatches.length === 0) {
    return null;
  }

  return pathMatches.map((match) => match[1]).join(' ');
}

/**
 * Lager innholdet i en ikonkomponent. Aksel-ikoner og egenutviklede ikoner bruker samme mal,
 * slik at de oppfører seg helt likt for de som bruker pakken.
 */
function generateComponentFile(componentName, kebabName, svgPath, header = '') {
  const className = `HviIcon${componentName}`;

  return `${header}import { ChangeDetectionStrategy, Component } from '@angular/core';
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
 * Leser alle ikonkomponentene fra begge kildene. Kaster feil hvis samme klassenavn finnes to steder.
 */
function readIconComponents() {
  const seen = new Map();

  return ICON_SOURCES.flatMap(({ source, dir, importDir }) => {
    if (!fs.existsSync(dir)) {
      return [];
    }

    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.component.ts'))
      .sort()
      .map((file) => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const className = content.match(/export class (\w+)/)?.[1];
        if (!className) {
          throw new Error(`Fant ingen eksportert klasse i ${file}`);
        }
        if (seen.has(className)) {
          throw new Error(
            `${className} finnes både blant ${seen.get(className)}-ikonene og ${source}-ikonene. Fjern ett av dem.`,
          );
        }
        seen.set(className, source);

        const fileName = file.replace(/\.ts$/, '');
        return {
          source,
          file,
          className,
          content,
          importPath: `${importDir}/${fileName}`,
        };
      });
  });
}

/**
 * Skriver src/index.ts og src/all-icons.ts på nytt fra ikonkomponentene på disk (begge kildene).
 */
function writeEntryFiles() {
  const components = readIconComponents();

  const exportLines = ICON_SOURCES.flatMap(({ source, heading }) => {
    const lines = components
      .filter((component) => component.source === source)
      .map(({ className, importPath }) => `export { ${className} } from '${importPath}';`);
    if (lines.length === 0) {
      return [];
    }
    return heading ? ['', `// ${heading}`, ...lines] : lines;
  });

  const index = [
    '// Export all Angular icon components',
    '// Import and include icons in a component imports array',
    `// Usage: import { HviIconAirplane } from '${PACKAGE_NAME}';`,
    ...exportLines,
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

  const customCount = components.filter(({ source }) => source === 'custom').length;
  console.log(
    `✅ Skrev index.ts og all-icons.ts med ${components.length} ikoner (${components.length - customCount} fra Aksel, ${customCount} egenutviklet)`,
  );
}

module.exports = {
  AKSEL_ICONS_DIR,
  AKSEL_SVG_DIR,
  CUSTOM_ICONS_DIR,
  CUSTOM_METADATA_PATH,
  CUSTOM_SVG_DIR,
  componentFileName,
  extractPathFromSvg,
  fileNameToComponentName,
  generateComponentFile,
  readIconComponents,
  toKebab,
  writeEntryFiles,
};
