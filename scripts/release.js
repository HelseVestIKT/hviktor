#!/usr/bin/env node

/**
 * Release-script for @helsevestikt/hviktor-angular og @helsevestikt/hviktor-icons
 *
 * Begge pakkene har alltid samme versjon, og versjonen synkroniseres med git tag.
 *
 * Bruk:
 *   npm run release patch    # 0.0.23 → 0.0.24
 *   npm run release minor    # 0.0.23 → 0.1.0
 *   npm run release major    # 0.0.23 → 1.0.0
 *   npm run release 1.2.3    # Eksplisitt versjon (påkrevd hvis pakkene har ulik versjon)
 *
 * Scriptet gjør følgende:
 *   1. Sjekker at du er på main-branch
 *   2. Sjekker at working directory er rent
 *   3. Beregner ny versjon (patch/minor/major eller eksplisitt)
 *   4. Oppdaterer version i package.json for begge pakkene
 *   5. Committer endringen
 *   6. Oppretter git tag (v<versjon>)
 *   7. Pusher commit og tag til origin
 *
 * CI-workflowen (publish-npm.yml) plukker opp tagen og publiserer begge pakkene til npm.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const PACKAGES = [
  { name: '@helsevestikt/hviktor-angular', dir: 'projects/hviktor' },
  { name: '@helsevestikt/hviktor-icons', dir: 'projects/icons' },
].map((p) => ({ ...p, packageJsonPath: path.join(ROOT, p.dir, 'package.json') }));
const CHANGELOG_PATH = path.join(ROOT, 'projects', 'hviktor', 'CHANGELOG.md');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8', cwd: path.resolve(__dirname, '..') }).trim();
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

function bumpVersion(current, type) {
  const [major, minor, patch] = current.split('.').map(Number);
  switch (type) {
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'major':
      return `${major + 1}.0.0`;
    default:
      fail(`Ugyldig bump-type: ${type}`);
  }
}

function isValidSemver(version) {
  return /^\d+\.\d+\.\d+$/.test(version);
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    }),
  );
}

function updateChangelog(version) {
  const today = new Date().toISOString().slice(0, 10);
  const packageSections = PACKAGES.map(
    ({ name }) => `### ${name}\n\n#### Added\n\n- \n\n#### Changed\n\n- \n\n#### Fixed\n\n- \n`,
  ).join('\n');
  const template = `## [${version}] – ${today}\n\n${packageSections}\n`;

  let content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  const marker = content.match(/^## \[/m);
  if (marker) {
    const pos = marker.index;
    content = content.slice(0, pos) + template + content.slice(pos);
  } else {
    content += '\n' + template;
  }
  fs.writeFileSync(CHANGELOG_PATH, content);
}

function openEditorSync() {
  try {
    execSync(`code --wait "${CHANGELOG_PATH}"`, { stdio: 'inherit' });
  } catch {
    // VS Code ikke tilgjengelig — bruk systemets standardeditor
    execSync(`start "" /wait "${CHANGELOG_PATH}"`, { stdio: 'inherit', shell: true });
  }
}

function cleanChangelog() {
  let content = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  // Fjern tomme seksjoner (#### Header\n\n- \n)
  content = content.replace(/#### \w+\n\n- \n\n?/g, '');
  // Pakker uten endringer får en tydelig tekst, slik Digdir gjør i sine release notes
  for (const { name } of PACKAGES) {
    const emptySection = new RegExp(`(### ${name}\n)\n*(?=### |## \\[|$)`, 'g');
    content = content.replace(emptySection, '$1\nIngen endringer i denne releasen.\n\n');
  }
  // Fjern doble blank linjer
  content = content.replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(CHANGELOG_PATH, content);
}

// --- Sjekker ---

(async () => {
  const arg = process.argv[2];
  if (!arg) {
    console.log(`
Bruk: npm run release <patch|minor|major|x.y.z>

Eksempler:
  npm run release patch    # Bump patch-versjon
  npm run release minor    # Bump minor-versjon
  npm run release major    # Bump major-versjon
  npm run release 1.0.0    # Sett eksplisitt versjon
`);
    process.exit(0);
  }

  // 1. Sjekk branch
  const branch = run('git rev-parse --abbrev-ref HEAD');
  if (branch !== 'main') {
    fail(`Du må være på main-branch for å release. Nåværende branch: ${branch}`);
  }

  // 2. Sjekk at working directory er rent
  const status = run('git status --porcelain');
  if (status) {
    fail('Working directory er ikke rent. Commit eller stash endringene dine først.');
  }

  // 3. Pull siste endringer
  console.log('📥 Henter siste endringer fra origin...');
  run('git pull --rebase origin main');

  // 4. Les nåværende versjon
  const pkgs = PACKAGES.map((p) => ({
    ...p,
    json: JSON.parse(fs.readFileSync(p.packageJsonPath, 'utf-8')),
  }));
  const versions = new Set(pkgs.map((p) => p.json.version));
  const currentVersion = pkgs[0].json.version;

  // 5. Beregn ny versjon
  let newVersion;
  if (['patch', 'minor', 'major'].includes(arg)) {
    if (versions.size > 1) {
      fail(
        `Pakkene har ulik versjon (${pkgs.map((p) => `${p.name}@${p.json.version}`).join(', ')}). ` +
          'Oppgi en eksplisitt versjon, f.eks. npm run release 1.0.0',
      );
    }
    newVersion = bumpVersion(currentVersion, arg);
  } else if (isValidSemver(arg)) {
    newVersion = arg;
  } else {
    fail(
      `Ugyldig argument: "${arg}". Bruk patch, minor, major, eller et semver-nummer (f.eks. 1.0.0)`,
    );
  }

  for (const p of pkgs) {
    console.log(`\n📦 ${p.name}: ${p.json.version} → ${newVersion}`);
  }
  console.log('');

  // 6. Oppdater package.json
  for (const p of pkgs) {
    p.json.version = newVersion;
    fs.writeFileSync(p.packageJsonPath, JSON.stringify(p.json, null, 2) + '\n');
    console.log(`✅ Oppdatert ${path.relative(process.cwd(), p.packageJsonPath)}`);
  }

  // 7. Oppdater CHANGELOG
  console.log('\n📝 Oppdaterer CHANGELOG...');
  updateChangelog(newVersion);

  const answer = await ask('\nVil du redigere CHANGELOG.md nå? (Y/n) ');
  if (!answer || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('Åpner CHANGELOG i editor – lagre og lukk filen når du er ferdig...');
    openEditorSync();
  }

  cleanChangelog();
  console.log(`✅ CHANGELOG oppdatert`);

  // 8. Commit
  const packageJsonPaths = pkgs.map((p) => `"${p.packageJsonPath}"`).join(' ');
  run(`git add ${packageJsonPaths} "${CHANGELOG_PATH}"`);
  run(`git commit -m "chore: release v${newVersion}"`);
  console.log(`✅ Committet: chore: release v${newVersion}`);

  // 9. Tag
  run(`git tag v${newVersion}`);
  console.log(`✅ Tag opprettet: v${newVersion}`);

  // 10. Push
  console.log('\n🚀 Pusher til origin...');
  run('git push origin main');
  run(`git push origin v${newVersion}`);

  console.log(`
✅ Release v${newVersion} fullført!

Neste steg:
  1. Gå til GitHub Actions og verifiser at publish-workflowen kjører
  2. Godkjenn "npm-publish" environment i GitHub
  3. Verifiser pakkene på npm:
     https://www.npmjs.com/package/@helsevestikt/hviktor-angular
     https://www.npmjs.com/package/@helsevestikt/hviktor-icons
`);
})().catch((err) => {
  console.error(`\n❌ ${err.message}\n`);
  process.exit(1);
});
