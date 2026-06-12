import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// PWA: register the service worker in production builds only.
if (!isDevMode() && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => void 0);
}
