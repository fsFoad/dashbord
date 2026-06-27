/* ============================================================
   Service worker with VERSIONED cache + automatic invalidation.

   How "always fresh on new release" works:
   - CACHE_VERSION is replaced at build time with the app version
     (see scripts/stamp-sw.mjs, run via the prebuild npm script).
   - On `activate`, every cache whose name != current version is DELETED,
     so a new release can never serve stale assets.
   - skipWaiting() + clients.claim() make the new worker take control
     immediately — the user gets the new version without any prompt.
   - Strategy: network-first for navigations & API (always try fresh),
     cache-first for hashed static assets (safe: their URL changes per build).
   ============================================================ */

const CACHE_VERSION = '__APP_VERSION__'; // stamped at build time
const CACHE_NAME = `app-cache-v${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  // Activate this worker as soon as it's installed.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Purge ALL caches that don't belong to the current version.
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't touch cross-origin

  const isNavigation = req.mode === 'navigate';
  const isApi = url.pathname.startsWith('/api/');

  if (isNavigation || isApi) {
    // Network-first: always prefer fresh; fall back to cache offline.
    event.respondWith(networkFirst(req));
  } else {
    // Static assets (hashed filenames) → cache-first for speed/offline.
    event.respondWith(cacheFirst(req));
  }
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(req);
    if (cached) return cached;
    // offline navigation fallback → app shell
    if (req.mode === 'navigate') {
      const shell = await cache.match('/index.html');
      if (shell) return shell;
    }
    throw new Error('offline and not cached');
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;
  const fresh = await fetch(req);
  if (fresh && fresh.status === 200) cache.put(req, fresh.clone());
  return fresh;
}

// Allow the page to tell a waiting worker to activate now (belt & suspenders).
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
