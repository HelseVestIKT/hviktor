#!/usr/bin/env node

/**
 * Changeset tag-script (hybrid-modell)
 *
 * Kjøres av changesets/action etter at "Version Packages" PR merges.
 * Leser versjonen fra projects/hviktor/package.json og oppretter en git tag.
 * Tagen trigger den eksisterende publish-npm.yml workflowen.
 *
 * Brukes via: npm run changeset:tag
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', 'projects', 'hviktor', 'package.json');

function run(cmd) {
  console.log(`$ ${cmd}`);
  return execSync(cmd, { encoding: 'utf-8', stdio: 'inherit' });
}

const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
const version = pkg.version;
const tag = `v${version}`;

// Sjekk om tagen allerede finnes (changesets kan kjøre scriptet flere ganger)
try {
  execSync(`git rev-parse ${tag}`, { encoding: 'utf-8', stdio: 'pipe' });
  console.log(`Tag ${tag} finnes allerede — hopper over.`);
  process.exit(0);
} catch {
  // Tagen finnes ikke, opprett den
}

console.log(`\n🏷️  Oppretter tag: ${tag}\n`);
run(`git tag ${tag}`);
run(`git push origin ${tag}`);

console.log(`\n✅ Tag ${tag} pushet — publish-npm.yml vil trigge publisering.\n`);
