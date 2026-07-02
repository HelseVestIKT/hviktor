/**
 * Enhetstester for ng-add-schematicen.
 *
 * Testene kjører mot den BYGGEDE schematicen i dist/hviktor-lib/schematics,
 * så husk å bygge først (håndteres av test:schematics-scriptet):
 *
 *   npm run test:schematics
 *
 * Å teste mot dist i stedet for kilden er bevisst: da verifiserer testene
 * også at collection.json, schema.json og kompilert JS faktisk havner
 * riktig i pakken – feilklassen enhetstester vanligvis ikke fanger.
 */
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const collectionPath = fileURLToPath(
  new URL('../../../../dist/hviktor-lib/schematics/collection.json', import.meta.url),
);

interface WorkspaceOptions {
  angularVersion: string;
  builder?: string;
  sourceRoot?: string;
  stylesContent?: string;
}

/** Lager et falskt Angular-workspace i et virtuelt tre. */
function createWorkspace(options: WorkspaceOptions): Tree {
  const tree = Tree.empty();

  tree.create(
    '/package.json',
    JSON.stringify(
      {
        name: 'test-app',
        dependencies: { '@angular/core': options.angularVersion },
        devDependencies: {},
      },
      null,
      2,
    ),
  );

  tree.create(
    '/angular.json',
    JSON.stringify(
      {
        version: 1,
        projects: {
          'test-app': {
            root: '',
            sourceRoot: options.sourceRoot ?? 'src',
            architect: {
              build: {
                builder: options.builder ?? '@angular-devkit/build-angular:application',
                options: { styles: ['src/styles.css'] },
              },
            },
          },
        },
      },
      null,
      2,
    ),
  );

  tree.create('/src/styles.css', options.stylesContent ?? '');
  return tree;
}

function runNgAdd(tree: Tree, options: object = {}): Promise<UnitTestTree> {
  const runner = new SchematicTestRunner('hviktor', collectionPath);
  return runner.runSchematic('ng-add', { tailwind: true, icons: true, ...options }, tree);
}

describe('ng-add', () => {
  describe('Tailwind-versjonsvalg', () => {
    it('setter opp Tailwind v3 for Angular 17', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: '^17.3.0' }));
      const pkg = JSON.parse(tree.readContent('/package.json'));
      const styles = tree.readContent('/src/styles.css');

      expect(pkg.devDependencies.tailwindcss).toMatch(/^\^3/);
      expect(tree.exists('/tailwind.config.js')).toBe(true);
      expect(tree.exists('/.postcssrc.json')).toBe(false);
      expect(styles).toContain('@tailwind base');
    });

    it('setter opp Tailwind v4 for Angular 19+', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: '^19.0.0' }));
      const pkg = JSON.parse(tree.readContent('/package.json'));
      const styles = tree.readContent('/src/styles.css');

      expect(pkg.devDependencies.tailwindcss).toMatch(/^\^4/);
      expect(pkg.devDependencies['@tailwindcss/postcss']).toBeDefined();
      expect(tree.exists('/.postcssrc.json')).toBe(true);
      expect(tree.exists('/tailwind.config.js')).toBe(false);
      expect(styles).toContain(`@import 'tailwindcss';`);
    });

    it('velger v3 for gammel webpack-builder selv på nyere Angular', async () => {
      const tree = await runNgAdd(
        createWorkspace({
          angularVersion: '^19.0.0',
          builder: '@angular-devkit/build-angular:browser',
        }),
      );
      const pkg = JSON.parse(tree.readContent('/package.json'));
      expect(pkg.devDependencies.tailwindcss).toMatch(/^\^3/);
    });

    it('faller tilbake til v3 når Angular-versjonen ikke kan bestemmes', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: 'workspace:*' }));
      const pkg = JSON.parse(tree.readContent('/package.json'));
      expect(pkg.devDependencies.tailwindcss).toMatch(/^\^3/);
    });

    it('bruker prosjektets sourceRoot i tailwind.config.js', async () => {
      const tree = await runNgAdd(
        createWorkspace({ angularVersion: '^17.0.0', sourceRoot: 'apps/portal/src' }),
      );
      const config = tree.readContent('/tailwind.config.js');
      expect(config).toContain(`'./apps/portal/src/**/*.{html,ts}'`);
    });

    it('hopper over Tailwind-oppsett i styles når tailwind=false', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: '^19.0.0' }), {
        tailwind: false,
      });
      const pkg = JSON.parse(tree.readContent('/package.json'));
      const styles = tree.readContent('/src/styles.css');

      expect(pkg.devDependencies?.tailwindcss).toBeUndefined();
      expect(styles).toContain('hviktor-angular/styles.css');
    });
  });

  describe('styles.css-håndtering', () => {
    it('legger hviktor-importen etter Tailwind', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: '^19.0.0' }));
      const styles = tree.readContent('/src/styles.css');

      expect(styles.indexOf(`@import 'tailwindcss'`)).toBeLessThan(
        styles.indexOf('hviktor-angular/styles.css'),
      );
    });

    it('setter hviktor-importen etter eksisterende Tailwind uten å duplisere', async () => {
      const tree = await runNgAdd(
        createWorkspace({
          angularVersion: '^19.0.0',
          stylesContent: `@import 'tailwindcss';\n\nbody { margin: 0; }\n`,
        }),
      );
      const styles = tree.readContent('/src/styles.css');

      expect(styles.indexOf(`@import 'tailwindcss'`)).toBeLessThan(
        styles.indexOf('hviktor-angular/styles.css'),
      );
      expect(styles.match(/@import 'tailwindcss'/g)).toHaveLength(1);
    });

    it('er idempotent ved gjentatt kjøring', async () => {
      const first = await runNgAdd(createWorkspace({ angularVersion: '^19.0.0' }));
      const second = await runNgAdd(first);
      const styles = second.readContent('/src/styles.css');

      expect(styles.match(/hviktor-angular\/styles\.css/g)).toHaveLength(1);
      expect(styles.match(/@import 'tailwindcss'/g)).toHaveLength(1);
    });
  });

  describe('ikoner', () => {
    it('installerer hviktor-icons med semver-range uten å røre main.ts', async () => {
      const base = createWorkspace({ angularVersion: '^19.0.0' });
      base.create(
        '/src/main.ts',
        `import { bootstrapApplication } from '@angular/platform-browser';\n`,
      );
      const tree = await runNgAdd(base);
      const pkg = JSON.parse(tree.readContent('/package.json'));

      expect(pkg.dependencies['@helsevestikt/hviktor-icons']).toMatch(/^\^/);
      expect(tree.readContent('/src/main.ts')).not.toContain('hviktor-icons');
    });

    it('installerer ikke hviktor-icons når icons=false', async () => {
      const tree = await runNgAdd(createWorkspace({ angularVersion: '^19.0.0' }), {
        icons: false,
      });
      const pkg = JSON.parse(tree.readContent('/package.json'));
      expect(pkg.dependencies?.['@helsevestikt/hviktor-icons']).toBeUndefined();
    });
  });
});
