#!/usr/bin/env node

import { run } from '../src/cli.js';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';

// ─── Update Notifier ─────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = JSON.parse(readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));

async function checkForUpdates() {
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg.name}/latest`, {
      signal: AbortSignal.timeout(3000), // Don't block CLI if network is slow
    });
    if (!res.ok) return;
    const data = await res.json();
    const latest = data.version;
    if (latest !== pkg.version) {
      console.log(
        `\n  \x1b[33m╭───────────────────────────────────────────╮\x1b[0m` +
        `\n  \x1b[33m│\x1b[0m  Update available: \x1b[31m${pkg.version}\x1b[0m → \x1b[32m${latest}\x1b[0m${' '.repeat(Math.max(0, 14 - pkg.version.length - latest.length))}\x1b[33m│\x1b[0m` +
        `\n  \x1b[33m│\x1b[0m  Run \x1b[36mnpx ${pkg.name}@latest\x1b[0m to update    \x1b[33m│\x1b[0m` +
        `\n  \x1b[33m╰───────────────────────────────────────────╯\x1b[0m\n`
      );
    }
  } catch {
    // Network error — silently ignore
  }
}

// Run the CLI first, then check for updates in background
await run();
checkForUpdates();
