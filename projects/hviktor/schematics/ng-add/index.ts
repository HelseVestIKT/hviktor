import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Schema } from './schema';

const HVIKTOR_PACKAGE = '@helsevestikt/hviktor-angular';
const HVIKTOR_IMPORT = `@import '${HVIKTOR_PACKAGE}/styles.css';`;

const ICONS_PACKAGE = '@helsevestikt/hviktor-icons';
// Ikonpakken releases alltid med samme versjon som denne pakken
const ICONS_VERSION = `^${JSON.parse(readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf-8')).version}`;
const ICONS_DOCS_URL = 'https://www.npmjs.com/package/@helsevestikt/hviktor-icons';

const TAILWIND_V4_IMPORT = `@import 'tailwindcss';`;
const TAILWIND_V3_IMPORT = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

const HVIKTOR_TAILWIND_IMPORT = `@import '${HVIKTOR_PACKAGE}/tailwind.css';`;

/** Står over de utkommenterte Tailwind-importene når Tailwind ikke settes opp. */
const TAILWIND_HINT =
  '/* Bruker du Tailwind CSS v4? Fjern kommentarene rundt de to importene under, så blir ' +
  'temaets farger Tailwind-klasser (f.eks. bg-background-tinted). Se README for ' +
  `${HVIKTOR_PACKAGE}. */`;

const IMPORT_PATTERNS = {
  tailwindV4: /@import\s+['"]tailwindcss['"][^;\n]*;?/,
  tailwindV3: /@tailwind\s+(?:base|components|utilities)\s*;?/,
  tailwindAny:
    /@import\s+['"]tailwindcss['"][^;\n]*;?|@tailwind\s+(?:base|components|utilities)\s*;?/,
  hviktorStyles: new RegExp(
    `@import\\s+['"]${escapeRegExp(HVIKTOR_PACKAGE)}/styles\\.css['"]\\s*;?`,
  ),
  hviktorTailwind: new RegExp(
    `@import\\s+['"]${escapeRegExp(HVIKTOR_PACKAGE)}/tailwind\\.css['"]\\s*;?`,
  ),
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ANSI-farger for terminal-output
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const BLUE = '\x1b[34m';
const LIGHT_BLUE = '\x1b[94m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';

// ---------------------------------------------------------------------------
// Terminal-output
// ---------------------------------------------------------------------------

function printBanner(context: SchematicContext): void {
  const lines = [
    '',
    `   ${BLUE}⬤  ◯${RESET}    ${BOLD}Hviktor${RESET}`,
    `   ${LIGHT_BLUE}⬤${RESET}  ${BLUE}⬤${RESET}    ${DIM}Designsystemet til Helse Vest IKT${RESET}`,
    `   ${DIM}────────────────────────────────────────${RESET}`,
    '',
  ];
  for (const line of lines) {
    context.logger.info(line);
  }
}

interface SummaryOptions {
  tailwind: boolean;
  tailwindMajor: 3 | 4 | null;
  tailwindExisting: boolean;
  stylesSetup: 3 | 4 | null;
  icons: boolean;
  stylesPath: string;
}

function printSummary(context: SchematicContext, summary: SummaryOptions): void {
  const check = `${GREEN}✔${RESET}`;

  context.logger.info(`${check} ${HVIKTOR_PACKAGE} er konfigurert (${summary.stylesPath})`);

  if (summary.tailwind && summary.tailwindMajor === 4) {
    context.logger.info(
      `${check} Tailwind CSS v4 satt opp (.postcssrc.json + @import 'tailwindcss')`,
    );
  }
  if (summary.stylesSetup === 4) {
    context.logger.info(
      `${check} Temaets farger er Tailwind-klasser, f.eks. ${LIGHT_BLUE}bg-background-tinted${RESET}`,
    );
  }
  if (summary.stylesSetup === null) {
    context.logger.info(
      `  ${DIM}Tailwind-importene ligger utkommentert i ${summary.stylesPath}.` +
        ` Fjern kommentarene hvis du tar i bruk Tailwind CSS v4.${RESET}`,
    );
  }
  if (summary.tailwind && summary.tailwindMajor === 3) {
    context.logger.info(`${check} Tailwind CSS v3 satt opp (tailwind.config.js)`);
    context.logger.info(
      summary.tailwindExisting
        ? `  ${DIM}Prosjektet bruker allerede Tailwind v3, så det ble beholdt.${RESET}`
        : `  ${DIM}Angular-oppsettet ditt støtter ikke Tailwind v4 sitt PostCSS-oppsett,` +
            ` så v3 ble valgt automatisk.${RESET}`,
    );
  }

  if (summary.icons) {
    context.logger.info(`${check} ${ICONS_PACKAGE} er installert`);
    context.logger.info('');
    context.logger.info(`   ${BOLD}Slik bruker du ikonene:${RESET}`);
    context.logger.info(`   Importer ikonene du trenger og legg dem i komponentens imports:`);
    context.logger.info('');
    context.logger.info(
      `   ${LIGHT_BLUE}import { HviIconPerson } from '${ICONS_PACKAGE}';${RESET}`,
    );
    context.logger.info(`   ${LIGHT_BLUE}imports: [HviIconPerson]${RESET}`);
    context.logger.info(`   ${LIGHT_BLUE}<hvi-icon-person size="md" />${RESET}`);
    context.logger.info('');
    context.logger.info(`   ${DIM}Full dokumentasjon: ${ICONS_DOCS_URL}${RESET}`);
  }

  context.logger.info('');
  context.logger.info(`${BLUE}⬤${RESET} God fornøyelse!`);
  context.logger.info('');
}

// ---------------------------------------------------------------------------
// Prosjekt- og versjonsoppslag
// ---------------------------------------------------------------------------

function getProjectConfig(tree: Tree, project?: string): any | null {
  const angularJsonContent = tree.read('/angular.json');
  if (!angularJsonContent) {
    return null;
  }

  const angularJson = JSON.parse(angularJsonContent.toString('utf-8'));
  const projectName =
    project ?? angularJson.defaultProject ?? Object.keys(angularJson.projects ?? {})[0];
  return angularJson.projects?.[projectName] ?? null;
}

function getBuildTarget(tree: Tree, project?: string): any | null {
  const projectConfig = getProjectConfig(tree, project);
  if (!projectConfig) {
    return null;
  }
  return projectConfig.architect?.build ?? projectConfig.targets?.build ?? null;
}

function getStylesPath(tree: Tree, project?: string): string {
  const projectConfig = getProjectConfig(tree, project);
  if (!projectConfig) {
    return 'src/styles.css';
  }

  const buildTarget = getBuildTarget(tree, project);
  const styles: (string | { input: string })[] = buildTarget?.options?.styles ?? [];

  for (const style of styles) {
    const stylePath = typeof style === 'string' ? style : style.input;
    if (
      (stylePath.endsWith('.css') || stylePath.endsWith('.scss')) &&
      !stylePath.startsWith('node_modules/')
    ) {
      return stylePath;
    }
  }

  const sourceRoot = projectConfig.sourceRoot ?? 'src';
  return `${sourceRoot}/styles.css`;
}

/**
 * Leser major-versjonen av Angular fra @angular/core i package.json.
 * Returnerer null om den ikke kan bestemmes (f.eks. "workspace:*" eller
 * "file:"-referanser uten tall).
 */
function getAngularMajorVersion(tree: Tree): number | null {
  const content = tree.read('/package.json');
  if (!content) {
    return null;
  }

  const json = JSON.parse(content.toString('utf-8'));
  const version: string | undefined =
    json.dependencies?.['@angular/core'] ?? json.devDependencies?.['@angular/core'];
  if (!version) {
    return null;
  }

  const match = version.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Den gamle webpack-baserte builderen (@angular-devkit/build-angular:browser)
 * støtter ikke egendefinert PostCSS-konfig uansett Angular-versjon.
 */
function isPostcssCapableBuilder(tree: Tree, project?: string): boolean {
  const buildTarget = getBuildTarget(tree, project);
  const builder: string | undefined = buildTarget?.builder;
  if (!builder) {
    // Uten kjent build-target kan vi ikke garantere PostCSS-støtte.
    return false;
  }
  return builder !== '@angular-devkit/build-angular:browser';
}

/**
 * Tailwind v4 krever støtte for egendefinerte PostCSS-konfigfiler
 * (.postcssrc.json), som kom i application-builderen i Angular 18.
 *
 * Vi velger v4 kun når vi positivt vet at oppsettet støtter det
 * (Angular >= 18 og en PostCSS-kompatibel builder). I alle andre
 * tilfeller – inkludert når versjonen ikke kan bestemmes – faller vi
 * tilbake til v3, som Angular CLI har innebygd støtte for via
 * tailwind.config.js. Det gir i verste fall et litt eldre Tailwind,
 * aldri et build som feiler.
 */
function resolveTailwindMajor(tree: Tree, context: SchematicContext, project?: string): 3 | 4 {
  const angularMajor = getAngularMajorVersion(tree);

  if (angularMajor === null) {
    context.logger.warn(
      `${YELLOW}Kunne ikke bestemme Angular-versjonen fra package.json – ` +
        `setter opp Tailwind v3 som en trygg standard.${RESET}`,
    );
    return 3;
  }

  if (angularMajor < 18) {
    return 3;
  }

  if (!isPostcssCapableBuilder(tree, project)) {
    return 3;
  }

  return 4;
}

// ---------------------------------------------------------------------------
// Filendringer
// ---------------------------------------------------------------------------

function addPackageJsonDependency(
  tree: Tree,
  name: string,
  version: string,
  devDependency: boolean,
): void {
  const packageJsonPath = '/package.json';
  const content = tree.read(packageJsonPath);
  if (!content) {
    throw new Error('Fant ikke package.json i prosjektet.');
  }

  const json = JSON.parse(content.toString('utf-8'));
  const key = devDependency ? 'devDependencies' : 'dependencies';

  if (!json[key]) {
    json[key] = {};
  }

  if (json[key][name]) {
    return;
  }

  json[key][name] = version;
  tree.overwrite(packageJsonPath, JSON.stringify(json, null, 2) + '\n');
}

/**
 * Bytter ut kommentarer med mellomrom, så vi bare finner importer som er i bruk,
 * men beholder posisjonene i teksten.
 */
function maskComments(content: string): string {
  return content.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

interface Match {
  start: number;
  end: number;
}

/** Finner alle importer som ikke står i en kommentar. */
function findActive(content: string, pattern: RegExp): Match[] {
  const masked = maskComments(content);
  const global = new RegExp(pattern.source, 'g');
  return [...masked.matchAll(global)].map((m) => ({ start: m.index, end: m.index + m[0].length }));
}

function hasActive(content: string, pattern: RegExp): boolean {
  return findActive(content, pattern).length > 0;
}

function lineStart(content: string, index: number): number {
  return content.lastIndexOf('\n', index - 1) + 1;
}

function lineEnd(content: string, index: number): number {
  const newline = content.indexOf('\n', index);
  return newline === -1 ? content.length : newline + 1;
}

/** Setter inn hele linjer på en linjegrense. */
function insertLines(content: string, index: number, lines: string[]): string {
  const needsNewline = index > 0 && index === content.length && !content.endsWith('\n');
  const block = (needsNewline ? '\n' : '') + lines.join('\n') + '\n';
  return content.slice(0, index) + block + content.slice(index);
}

/** Tar i bruk importene som ble lagt inn utkommentert ved en tidligere kjøring uten Tailwind. */
function uncommentTailwindImports(content: string): string {
  let result = content.replace(TAILWIND_HINT + '\n', '');
  for (const imp of [HVIKTOR_TAILWIND_IMPORT, TAILWIND_V4_IMPORT]) {
    result = result.replace(`/* ${imp} */`, imp);
  }
  return result;
}

/**
 * Tailwind v4: tailwind.css først, så hviktor, så Tailwind. tailwind.css setter
 * lagrekkefølgen slik at Tailwinds reset kommer før Designsystemet og
 * Tailwind-klassene etter. Eksisterende linjer flyttes ikke.
 */
function applyTailwindV4Imports(content: string, context: SchematicContext): string {
  let result = uncommentTailwindImports(content);
  const { hviktorTailwind, hviktorStyles, tailwindV4 } = IMPORT_PATTERNS;

  if (
    !hasActive(result, hviktorTailwind) &&
    !hasActive(result, hviktorStyles) &&
    !hasActive(result, tailwindV4)
  ) {
    return insertLines(result, 0, [HVIKTOR_TAILWIND_IMPORT, HVIKTOR_IMPORT, TAILWIND_V4_IMPORT]);
  }

  if (!hasActive(result, hviktorStyles)) {
    const [tailwind] = findActive(result, tailwindV4);
    const [theme] = findActive(result, hviktorTailwind);
    const index = tailwind ? lineStart(result, tailwind.start) : lineEnd(result, theme.end);
    result = insertLines(result, index, [HVIKTOR_IMPORT]);
  }

  if (!hasActive(result, tailwindV4)) {
    const [styles] = findActive(result, hviktorStyles);
    result = insertLines(result, lineEnd(result, styles.end), [TAILWIND_V4_IMPORT]);
  }

  if (!hasActive(result, hviktorTailwind)) {
    const first = Math.min(
      findActive(result, hviktorStyles)[0].start,
      findActive(result, tailwindV4)[0].start,
    );
    result = insertLines(result, lineStart(result, first), [HVIKTOR_TAILWIND_IMPORT]);
  }

  const [theme] = findActive(result, hviktorTailwind);
  const [styles] = findActive(result, hviktorStyles);
  const [tailwind] = findActive(result, tailwindV4);
  if (!(theme.start < styles.start && styles.start < tailwind.start)) {
    context.logger.warn(
      `${YELLOW}Importene i styles står ikke i anbefalt rekkefølge. ` +
        `For at Tailwind-klassene skal virke som forventet bør de stå slik:${RESET}\n` +
        `  ${HVIKTOR_TAILWIND_IMPORT}\n  ${HVIKTOR_IMPORT}\n  ${TAILWIND_V4_IMPORT}`,
    );
  }

  return result;
}

/** Tailwind v3: hviktor etter Tailwind-direktivene. tailwind.css krever v4 og legges ikke inn. */
function applyTailwindV3Imports(content: string, addTailwind: boolean): string {
  const lines: string[] = [];
  if (addTailwind && !hasActive(content, IMPORT_PATTERNS.tailwindAny)) {
    lines.push(TAILWIND_V3_IMPORT);
  }
  if (!hasActive(content, IMPORT_PATTERNS.hviktorStyles)) {
    lines.push(HVIKTOR_IMPORT);
  }
  if (lines.length === 0) {
    return content;
  }

  const tailwindMatches = findActive(content, IMPORT_PATTERNS.tailwindAny);
  const index = tailwindMatches.length
    ? lineEnd(content, Math.max(...tailwindMatches.map((m) => m.end)))
    : 0;
  return insertLines(content, index, lines);
}

/** Uten Tailwind: hviktor-importen, med Tailwind-importene klare til å kommenteres inn. */
function applyImportsWithoutTailwind(content: string): string {
  if (hasActive(content, IMPORT_PATTERNS.hviktorStyles)) {
    return content;
  }
  return insertLines(content, 0, [
    TAILWIND_HINT,
    `/* ${HVIKTOR_TAILWIND_IMPORT} */`,
    HVIKTOR_IMPORT,
    `/* ${TAILWIND_V4_IMPORT} */`,
  ]);
}

/**
 * Finner Tailwind-versjonen prosjektet allerede bruker, fra importene i
 * styles-fila eller fra tailwindcss i package.json. Returnerer null uten Tailwind.
 * Må sjekkes før avhengigheter legges til, så et v3-prosjekt ikke får v4-oppsett i tillegg.
 */
function detectExistingTailwind(tree: Tree, stylesPath: string): 3 | 4 | null {
  const styles = tree.read(stylesPath)?.toString('utf-8') ?? '';
  if (hasActive(styles, IMPORT_PATTERNS.tailwindV4)) {
    return 4;
  }
  if (hasActive(styles, IMPORT_PATTERNS.tailwindV3)) {
    return 3;
  }

  const packageJson = tree.read('/package.json');
  if (!packageJson) {
    return null;
  }
  const json = JSON.parse(packageJson.toString('utf-8'));
  const version: string | undefined =
    json.devDependencies?.tailwindcss ?? json.dependencies?.tailwindcss;
  const major = version?.match(/(\d+)/);
  if (!major) {
    return null;
  }
  return parseInt(major[1], 10) >= 4 ? 4 : 3;
}

/**
 * Oppdaterer styles-fila. Tailwind som allerede er satt opp i fila styrer
 * oppsettet, ellers versjonen vi installerer (null = uten Tailwind).
 * Returnerer oppsettet som ble brukt.
 */
function updateStylesCss(
  tree: Tree,
  stylesPath: string,
  tailwindMajor: 3 | 4 | null,
  context: SchematicContext,
): 3 | 4 | null {
  const existing = tree.read(stylesPath);
  const content = existing ? existing.toString('utf-8') : '';

  let setup = tailwindMajor;
  if (hasActive(content, IMPORT_PATTERNS.tailwindV4)) {
    setup = 4;
  } else if (hasActive(content, IMPORT_PATTERNS.tailwindV3)) {
    setup = 3;
  }

  const updatedContent =
    setup === 4
      ? applyTailwindV4Imports(content, context)
      : setup === 3
        ? applyTailwindV3Imports(content, tailwindMajor === 3)
        : applyImportsWithoutTailwind(content);

  if (updatedContent === content) {
    return setup;
  }

  if (existing) {
    tree.overwrite(stylesPath, updatedContent);
  } else {
    tree.create(stylesPath, updatedContent);
  }
  return setup;
}

function setupTailwindV4(tree: Tree): void {
  addPackageJsonDependency(tree, 'tailwindcss', '^4.0.0', true);
  addPackageJsonDependency(tree, '@tailwindcss/postcss', '^4.0.0', true);
  addPackageJsonDependency(tree, 'postcss', '^8.5.0', true);

  const configPath = '/.postcssrc.json';
  if (!tree.exists(configPath)) {
    const config = {
      plugins: {
        '@tailwindcss/postcss': {},
      },
    };
    tree.create(configPath, JSON.stringify(config, null, 2) + '\n');
  }
}

function setupTailwindV3(tree: Tree, project?: string): void {
  addPackageJsonDependency(tree, 'tailwindcss', '^3.4.0', true);
  addPackageJsonDependency(tree, 'postcss', '^8.4.31', true);
  addPackageJsonDependency(tree, 'autoprefixer', '^10.4.0', true);

  const configPath = '/tailwind.config.js';
  if (!tree.exists(configPath)) {
    const projectConfig = getProjectConfig(tree, project);
    const sourceRoot: string = projectConfig?.sourceRoot ?? 'src';

    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./${sourceRoot}/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    tree.create(configPath, config);
  }
}

// ---------------------------------------------------------------------------
// ng add
// ---------------------------------------------------------------------------

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    printBanner(context);

    const stylesPath = getStylesPath(tree, options.project);
    const existingTailwind = detectExistingTailwind(tree, stylesPath);
    let tailwindMajor: 3 | 4 | null = null;

    // Betinget: sett opp Tailwind CSS i riktig versjon for prosjektet.
    // Har prosjektet Tailwind fra før, beholdes den versjonen.
    if (options.tailwind) {
      tailwindMajor = existingTailwind ?? resolveTailwindMajor(tree, context, options.project);

      if (tailwindMajor === 4) {
        setupTailwindV4(tree);
      } else {
        setupTailwindV3(tree, options.project);
      }
    }

    // Betinget: installer hviktor-icons.
    // Ikonene importeres enkeltvis der de brukes, så vi legger ikke inn
    // noen global import i main.ts – bare avhengigheten + veiledning.
    if (options.icons !== false) {
      addPackageJsonDependency(tree, ICONS_PACKAGE, ICONS_VERSION, false);
    }

    const stylesSetup = updateStylesCss(tree, stylesPath, tailwindMajor, context);

    // Planlegg npm install
    context.addTask(new NodePackageInstallTask());

    printSummary(context, {
      tailwind: !!options.tailwind,
      tailwindMajor,
      tailwindExisting: existingTailwind !== null,
      stylesSetup,
      icons: options.icons !== false,
      stylesPath,
    });

    return tree;
  };
}
