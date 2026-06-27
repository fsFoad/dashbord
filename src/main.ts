import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

/**
 * PWA registration (production only).
 *
 * The service worker uses a versioned cache and skipWaiting/clients.claim, so
 * a new release activates immediately and purges old caches. To make the OPEN
 * tab show the new version without asking, we reload ONCE when control passes
 * to a new worker (`controllerchange`). The reload guard prevents loops.
 */
if (!isDevMode() && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    // Periodically check for a new build (e.g. every 60s while the tab is open).
    setInterval(() => reg.update().catch(() => void 0), 60_000);
  }).catch(() => void 0);

  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloaded) return;
    reloaded = true;
    // Bring the open tab up to the freshly activated version automatically.
    window.location.reload();
  });
}
