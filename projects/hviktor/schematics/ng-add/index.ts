import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

const HVIKTOR_PACKAGE = '@helsevestikt/hviktor-angular';
const HVIKTOR_IMPORT = `@import '${HVIKTOR_PACKAGE}/styles.css';`;

const ICONS_PACKAGE = '@helsevestikt/hviktor-icons';
const ICONS_VERSION = '^0.0.51';
const ICONS_DOCS_URL = 'https://www.npmjs.com/package/@helsevestikt/hviktor-icons';

const TAILWIND_V4_IMPORT = `@import 'tailwindcss';`;
const TAILWIND_V3_IMPORT = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

/**
 * Kjennetegn på at Tailwind allerede er satt opp i en styles-fil,
 * uavhengig av versjon og fnutt-type.
 */
const TAILWIND_MARKERS = [
  `@import 'tailwindcss'`,
  `@import "tailwindcss"`,
  '@tailwind base',
  '@tailwind components',
  '@tailwind utilities',
];

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
  if (summary.tailwind && summary.tailwindMajor === 3) {
    context.logger.info(`${check} Tailwind CSS v3 satt opp (tailwind.config.js)`);
    context.logger.info(
      `  ${DIM}Angular-oppsettet ditt støtter ikke Tailwind v4 sitt PostCSS-oppsett,` +
        ` så v3 ble valgt automatisk.${RESET}`,
    );
  }

  if (summary.icons) {
    context.logger.info(`${check} ${ICONS_PACKAGE} er installert`);
    context.logger.info('');
    context.logger.info(`   ${BOLD}Slik bruker du ikonene:${RESET}`);
    context.logger.info(`   Importer kun ikonene du trenger, ett og ett:`);
    context.logger.info('');
    context.logger.info(
      `   ${LIGHT_BLUE}import '@helsevestikt/hviktor-icons/icon-person.webcomponent';${RESET}`,
    );
    context.logger.info(`   ${LIGHT_BLUE}<hvi-icon-person size="md"></hvi-icon-person>${RESET}`);
    context.logger.info('');
    context.logger.info(
      `   ${DIM}Husk CUSTOM_ELEMENTS_SCHEMA i komponenten som bruker ikonene.${RESET}`,
    );
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
 * Finner posisjonen rett etter eksisterende Tailwind-oppsett i styles-filen,
 * slik at nye imports (spesielt Hviktor) alltid havner etter Tailwind.
 * Returnerer 0 hvis Tailwind ikke finnes fra før (prepend øverst).
 */
function findInsertIndexAfterTailwind(content: string): number {
  let index = 0;
  for (const marker of TAILWIND_MARKERS) {
    const pos = content.indexOf(marker);
    if (pos === -1) {
      continue;
    }
    const lineEnd = content.indexOf('\n', pos);
    const end = lineEnd === -1 ? content.length : lineEnd + 1;
    if (end > index) {
      index = end;
    }
  }
  return index;
}

function updateStylesCss(tree: Tree, stylesPath: string, imports: string[]): void {
  const existing = tree.read(stylesPath);
  const content = existing ? existing.toString('utf-8') : '';

  const hasTailwindAlready = TAILWIND_MARKERS.some((marker) => content.includes(marker));

  const newImports = imports.filter((imp) => {
    // Hopp over imports som allerede finnes ordrett
    if (content.includes(imp)) {
      return false;
    }
    // Hopp over Tailwind-import hvis filen allerede har Tailwind i en
    // annen variant (f.eks. v3-direktiver når vi ville lagt til v4-import)
    const isTailwindImport = imp === TAILWIND_V3_IMPORT || imp === TAILWIND_V4_IMPORT;
    if (isTailwindImport && hasTailwindAlready) {
      return false;
    }
    return true;
  });

  if (newImports.length === 0) {
    return;
  }

  const block = newImports.join('\n') + '\n';
  const insertIndex = findInsertIndexAfterTailwind(content);
  const updatedContent =
    insertIndex === 0
      ? block + content
      : content.slice(0, insertIndex) + block + content.slice(insertIndex);

  if (existing) {
    tree.overwrite(stylesPath, updatedContent);
  } else {
    tree.create(stylesPath, updatedContent);
  }
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

    const styleImports: string[] = [];
    let tailwindMajor: 3 | 4 | null = null;

    // Betinget: sett opp Tailwind CSS i riktig versjon for prosjektet
    if (options.tailwind) {
      tailwindMajor = resolveTailwindMajor(tree, context, options.project);

      if (tailwindMajor === 4) {
        setupTailwindV4(tree);
        styleImports.push(TAILWIND_V4_IMPORT);
      } else {
        setupTailwindV3(tree, options.project);
        styleImports.push(TAILWIND_V3_IMPORT);
      }
    }

    // Betinget: installer hviktor-icons.
    // Ikonene importeres enkeltvis der de brukes, så vi legger ikke inn
    // noen global import i main.ts – bare avhengigheten + veiledning.
    if (options.icons !== false) {
      addPackageJsonDependency(tree, ICONS_PACKAGE, ICONS_VERSION, false);
    }

    // Hviktor-importen skal alltid komme etter Tailwind
    styleImports.push(HVIKTOR_IMPORT);
    const stylesPath = getStylesPath(tree, options.project);
    updateStylesCss(tree, stylesPath, styleImports);

    // Planlegg npm install
    context.addTask(new NodePackageInstallTask());

    printSummary(context, {
      tailwind: !!options.tailwind,
      tailwindMajor,
      icons: options.icons !== false,
      stylesPath,
    });

    return tree;
  };
}
