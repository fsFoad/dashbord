/**
 * Stamps the built service worker with the current app version so its cache
 * name changes on every release (→ old caches auto-purged on activate).
 *
 * Reads the version from src/app/core/config/changelog.config.ts (single
 * source of truth) and writes it into the built sw.js under dist after `ng build`.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const changelog = readFileSync('src/app/core/config/changelog.config.ts', 'utf8');
const m = changelog.match(/version:\s*'([\d.]+)'/);
const version = m ? m[1] : '0.0.0';

function findSw(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      const found = findSw(full);
      if (found) return found;
    } else if (entry === 'sw.js') {
      return full;
    }
  }
  return null;
}

const distRoot = 'dist';
if (!existsSync(distRoot)) {
  console.warn('[stamp-sw] dist/ not found — run after ng build');
  process.exit(0);
}

const swPath = findSw(distRoot);
if (!swPath) {
  console.warn('[stamp-sw] sw.js not found in dist/');
  process.exit(0);
}

const sw = readFileSync(swPath, 'utf8').replaceAll('__APP_VERSION__', version);
writeFileSync(swPath, sw);
console.log(`[stamp-sw] stamped ${swPath} with version ${version}`);
