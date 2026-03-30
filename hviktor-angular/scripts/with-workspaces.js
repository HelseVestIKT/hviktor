#!/usr/bin/env node

/**
 * Kjører en changeset-kommando med npm workspaces midlertidig aktivert.
 *
 * Changesets trenger workspaces for å oppdage pakker, men workspaces
 * bryter Angular-bygget (npm symlinker kildekoden i stedet for dist/).
 * Denne wrapperen aktiverer workspaces kun under changeset-kjøring.
 *
 * Bruk: node scripts/with-workspaces.js <kommando>
 * Eksempler:
 *   node scripts/with-workspaces.js changeset
 *   node scripts/with-workspaces.js changeset version
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const pkgPath = path.resolve(__dirname, '..', 'package.json');
const original = fs.readFileSync(pkgPath, 'utf-8');

// Legg til workspaces midlertidig
const pkg = JSON.parse(original);
pkg.workspaces = ['projects/hviktor'];
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const args = process.argv.slice(2).join(' ');

try {
  execSync(`npx ${args}`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
} finally {
  // Gjenopprett original package.json (uten workspaces)
  fs.writeFileSync(pkgPath, original);
}
