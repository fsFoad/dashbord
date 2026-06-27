# Enterprise Admin Dashboard

A fully-featured, production-grade admin dashboard built from scratch with
**Angular 21** (standalone, zoneless, Signals), **PrimeNG 21** (Aura preset),
**Tailwind CSS v4**, and **Transloco** for runtime i18n.

Trilingual (**Persian / English / Arabic**) with runtime RTL ⇄ LTR, a Jalali
(Shamsi) calendar engine, three independent appearance layers (font, color
theme, brand color), and a swappable mock backend.

---

## Quick start

```bash
npm install
npm start            # dev server at http://localhost:4200
npm run build        # production build (stamps the service worker version)
npm test             # unit tests (Vitest)
npm run e2e          # end-to-end tests (Playwright)
```

**Demo accounts** (mock): `admin@demo.com` / `user@demo.com`, password `123456`.
The admin account has 2FA enabled — the OTP in demo mode is always `123456`.

---

## Tech stack

| Concern        | Choice |
|----------------|--------|
| Framework      | Angular 21 — standalone components, **zoneless**, **Signals** for all state |
| UI components   | PrimeNG 21 (Aura preset, `@primeuix/themes`) |
| Styling        | Tailwind CSS v4 + `tailwindcss-primeui` (single CSS-variable source of truth) |
| i18n           | Transloco (runtime language + RTL switching) |
| Charts         | Chart.js (via `p-chart`), lazy-loaded |
| PDF export     | jsPDF + html2canvas, dynamically imported |
| State          | Signals throughout; **no NgRx** (multi-tab uses a Signals facade) |
| Testing        | Vitest (unit) + Playwright (e2e) |

---

## Project structure

```
src/
  app/
    core/                    # app-wide singletons (no UI)
      config/                # branding, menu, theme presets, fonts, changelog
      guards/                # authGuard, guestGuard, roleGuard
      interceptors/          # base-url, auth, loading, error, mock-backend
      models/                # typed API + domain models
      mock/                  # in-memory mock database
      routing/               # TabReuseStrategy (keeps tab state alive)
      services/              # SettingsStore, SessionStore, Theme, Language, …
      utils/                 # jalali engine, chart theming
    features/                # one folder per feature (all lazy-loaded)
      dashboard/ projects/ team/ calendar/ files/ auth/ profile/ …
      components-demo/        # gallery + form-builder + date-picker demos
    layout/                  # dashboard / site / auth / blank shells + topbar/sidebar/footer
    shared/
      components/            # date-picker, dynamic-form, saved-views, command-palette, …
      directives/            # focus-trap, has-role
      pipes/                 # localized-date (appDate)
      utils/                 # optimistic helper
  assets/i18n/               # fa.json · en.json · ar.json
  environments/              # environment.ts · environment.prod.ts
  styles.css                 # Tailwind + PrimeNG layer order + global tokens
public/                       # manifest.webmanifest, sw.js, icons
scripts/stamp-sw.mjs          # stamps the SW cache with the app version (postbuild)
```

---

## Architecture highlights

- **Three appearance layers** are independent: changing the **font** never
  touches colors, the **color theme** never touches the font, and a **custom
  brand color** generates a 50–950 ramp via PrimeNG's `palette()` API.
- **Anti-FOUC**: an inline script in `index.html` applies persisted settings
  (theme, dark mode, language, direction) before Angular boots.
- **Tab state survives tab switches** via a custom `RouteReuseStrategy`
  (`core/routing/tab-reuse.strategy.ts`) that detaches/reattaches the live
  component instead of destroying it — so Signals, filters and scroll persist.
- **Optimistic UI** (`shared/utils/optimistic.ts`) applies changes instantly
  and rolls back on failure (Kanban, comments, team, files).

---

## Customizing for a new project (branding)

Everything project-specific lives in **`src/app/core/config/branding.config.ts`**:

```ts
export const BRANDING = {
  appName: 'My Dashboard',
  logo: '/assets/logo.svg',
  defaults: {
    themePreset: 'indigo',     // one of the 12 presets in theme-presets.ts
    surface: 'navy',           // surface ramp (navy = deep-blue dark mode)
    customPrimaryColor: null,  // or a hex like '#7c3aed' to override the preset
    fontFamily: '"Vazirmatn", system-ui, sans-serif',
    darkMode: false,
    language: 'fa',
    density: 'normal',
  },
};
```

Change these and the whole app re-themes — no other file needs editing.

---

## Adding a new language

1. Add the code to the union in `core/models/settings.model.ts`:
   `export type AppLanguage = 'fa' | 'en' | 'ar' | 'tr';`
2. Register it in `app.config.ts` → `availableLangs: ['fa','en','ar','tr']`.
3. Add metadata in `core/services/language.service.ts` → `LANGUAGES` array
   (label, dir, flag). Add the code to `RTL_LANGS` if it's right-to-left.
4. Create `src/assets/i18n/<code>.json`. Missing keys fall back to the
   `fallbackLang` (English) automatically, so you can translate incrementally.

That's it — the language picker, RTL handling and `<html lang/dir>` update
automatically.

---

## Connecting a real backend

The app talks to `/api/*` everywhere. A mock interceptor serves those in dev.
To point at a real backend, edit **`src/environments/environment.ts`** (and
`environment.prod.ts`):

```ts
export const environment = {
  production: false,
  useMock: false,                       // turn the mock OFF
  apiBaseUrl: 'https://api.example.com', // your server ('' = same origin)
};
```

- `useMock: false` disables the mock interceptor (it becomes a no-op).
- `baseUrlInterceptor` prefixes `/api/*` with `apiBaseUrl`.
- **No services or components change** — they all call `/api/...` as before.

The expected API surface is documented by the mock in
`core/interceptors/mock-backend.interceptor.ts` (endpoints, methods, payloads).
The mock WebSocket lives in `core/services/mock-socket.service.ts`; swap its
internals for a real socket and consumers stay the same.

---

## PWA & cache invalidation

The service worker (`public/sw.js`) uses a **versioned cache** stamped at build
time from the changelog version (`scripts/stamp-sw.mjs`, run via `postbuild`).
On every release:

- the new worker activates immediately (`skipWaiting` + `clients.claim`),
- **all caches not matching the current version are deleted**, and
- the open tab reloads once automatically — the user always gets the fresh
  build, never a stale cache, without any prompt.

> The SW only registers in production builds; `ng serve` is unaffected.

---

## Versioning & release notes

`core/config/changelog.config.ts` is the **single source of truth** for the
version. Add a release object to the top; `APP_VERSION` derives from it and the
"What's new" dialog shows once per user per version. Entries are bilingual and
typed (`feature` / `improvement` / `fix`).

---

## Testing

- **Unit (Vitest)** — pure logic: Jalali conversion, RBAC, optimistic rollback,
  form-schema validators. Run `npm test` (or `npm run test:watch`).
- **E2E (Playwright)** — critical journeys: auth + RBAC, theme/RTL, 2FA step,
  Kanban. Run `npm run e2e` (starts the dev server automatically).

---

## Accessibility

- Focus-trap on custom overlays (command palette, tour) via `appFocusTrap`.
- Skip-to-content link, `role="main"`, keyboard focus-visible rings, ARIA on
  the palette/menus. PrimeNG dialogs trap focus natively.

---

## Scripts

| Script              | What it does |
|---------------------|--------------|
| `npm start`         | Dev server |
| `npm run build`     | Production build + SW version stamp |
| `npm test`          | Unit tests (Vitest) |
| `npm run test:ui`   | Vitest UI |
| `npm run e2e`       | Playwright e2e |
| `npm run analyze`   | Production build + source-map-explorer |
