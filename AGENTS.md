# AGENTS.md

Guidance for AI assistants working in this repository. Read this first, then
consult `README.md` for the product-facing tour (demo accounts, branding, PWA,
backend swap). This file focuses on **how the code is structured and the
conventions you must follow when editing it**.

---

## What this is

A production-grade, single-page **admin dashboard** built with **Angular 21**
(standalone, **zoneless**, **Signals** for all state), **PrimeNG 21** (Aura
preset), **Tailwind CSS v4**, and **Transloco** for runtime i18n. Trilingual
(Persian / English / Arabic) with runtime RTL ⇄ LTR switching and a Jalali
(Shamsi) calendar engine. The backend is an in-app **mock interceptor** —
there is no server in this repo.

There is **no NgRx and no Zone.js**. Do not add them. All state is held in
Angular Signals.

---

## Commands

```bash
npm install          # install (uses legacy-peer-deps, see .npmrc)
npm start            # dev server → http://localhost:4200
npm run build        # production build + service-worker version stamp
npm run watch        # dev build in watch mode
npm test             # unit tests (Vitest, single run)
npm run test:watch   # Vitest watch
npm run test:ui      # Vitest UI
npm run e2e          # Playwright e2e (auto-starts the dev server)
npm run analyze      # prod build + source-map-explorer
```

Demo logins (mock): `admin@demo.com` / `user@demo.com`, password `123456`.
The admin account has 2FA — the demo OTP is always `123456`.

There is **no lint script and no CI config** in the repo. Type-safety is
enforced by the very strict `tsconfig.json` (`strict`, `strictTemplates`,
`noPropertyAccessFromIndexSignature`, `noImplicitOverride`, etc.) — a clean
`npm run build` is the de-facto correctness gate. Run it before declaring work
done.

---

## Source layout

```
src/
  app/
    core/                  # app-wide singletons, NO UI
      config/              # branding, menu, theme presets/packs, fonts, changelog
      guards/              # authGuard, guestGuard, roleGuard(roles)
      directives/          # has-role.directive (*appHasRole)
      handlers/            # global-error-handler
      i18n/                # transloco-loader
      interceptors/        # base-url, auth, loading, error, mock-backend, http-context
      models/              # api / menu-item / settings / user typed models
      mock/                # mock-db.ts (in-memory data)
      routing/             # tab-reuse.strategy (RouteReuseStrategy)
      services/            # SettingsStore, SessionStore, Theme, Font, Language, … (~28)
      utils/               # jalali engine (+ spec), chart-theme
    features/              # one folder per feature, ALL lazy-loaded standalone pages
      auth/ dashboard/ projects/ team/ calendar/ files/ profile/
      admin/ landing/ playground/ error/ components-demo/ projects-demo/
    layout/                # shells + chrome
      dashboard-layout/ auth-layout/ site-layout/ blank-layout/
      components/          # topbar, sidebar, tab-bar, breadcrumb, footer,
                           # settings-panel, tour, …
    shared/
      components/          # date-picker, dynamic-form, command-palette, saved-views,
                           # whats-new, file-upload, skeleton
      directives/          # focus-trap, …
      pipes/               # localized-date (appDate)
      utils/               # optimistic.ts (+ spec)
    app.config.ts          # providers: router, http+interceptors, PrimeNG, Transloco
    app.routes.ts          # the full route table (single source)
  assets/i18n/             # fa.json · en.json · ar.json  (keep all three in sync)
  environments/            # environment.ts · environment.prod.ts (useMock / apiBaseUrl)
  styles.css               # @layer order: theme, base, primeng, components, utilities
  styles/                  # primeng-overrides.reference.css (reference only)
public/                    # manifest.webmanifest, sw.js, icons
scripts/stamp-sw.mjs       # stamps SW cache with the changelog version (postbuild)
e2e/                       # Playwright specs
```

TypeScript path aliases (`tsconfig.json`): `@core/*`, `@layout/*`,
`@features/*`. Vitest also aliases `@app` → `/src/app`.

> Note: `dashbord.zip` and `src7.rar` in the repo root are stale archive
> snapshots — ignore them; never edit or extract them as part of a change.

---

## Conventions — follow these exactly

### Components
- **Standalone** only. No NgModules. List dependencies in the component's
  `imports: [...]`.
- **`changeDetection: ChangeDetectionStrategy.OnPush`** on every component
  (the CLI schematic defaults to this — keep it).
- Selector prefix is **`app-`** (e.g. `app-login`).
- **File naming has no `.component` suffix.** A component lives in
  `name.ts` with an optional sibling `name.html` template
  (e.g. `dashboard.ts` + `dashboard.html`, `login.ts` with an inline template).
  Match the neighbour you are editing — small components inline the template,
  larger ones use a `.html` file.
- Use the **new control-flow syntax** (`@if`, `@for`, `@switch`) in templates,
  **not** `*ngIf` / `*ngFor`. The one structural-directive exception is the
  custom `*appHasRole`.

### State & DI
- Use **Signals** (`signal`, `computed`, `effect`) for all reactive state —
  not BehaviorSubject-based stores, not NgRx.
- Inject with the **`inject()` function**, not constructor parameters
  (`private readonly foo = inject(Foo);`).
- Use **`input()` / `output()` / `model()`** signal APIs for component I/O,
  not the `@Input()` / `@Output()` decorators.
- App-wide state belongs in a `core/services/*.store.ts` (`SettingsStore`,
  `SessionStore`) — `@Injectable({ providedIn: 'root' })`, persisted to
  localStorage via `StorageService`.

### Styling
- **Tailwind utilities** for layout/spacing; **PrimeNG components** for
  widgets. The `@layer` order in `styles.css`
  (`theme, base, primeng, components, utilities`) is load-bearing — Tailwind
  utilities must win over PrimeNG. Don't reorder it.
- **Dark mode** is the `.app-dark` class on `<html>` (driven by
  `ThemeService`, mirrored by PrimeNG's `darkModeSelector`). Use the
  `dark:` variant and PrimeNG surface tokens (`text-surface-900`,
  `dark:text-surface-0`, `text-muted-color`, `bg-primary/10`, …) rather than
  hard-coded colors, so theme/brand changes flow through.
- Components are themed entirely through **CSS variables**. The three
  appearance layers (font, color theme, brand color) are independent — never
  couple them.

### i18n
- **No hard-coded user-facing strings.** Every label goes through the
  `transloco` pipe / service with a key in `src/assets/i18n/{fa,en,ar}.json`.
- When you add a key, add it to **all three** locale files (English is the
  `fallbackLang`, so missing keys degrade gracefully, but keep them in sync).
- Routes carry a `data.titleKey` translation key — set one for new routes.
- RTL is automatic from the language; don't special-case direction in
  components — use logical Tailwind utilities (`ms-`, `me-`, `ps-`, `pe-`)
  where possible.

### Routing
- All feature pages are **lazy-loaded** via `loadComponent`. Add new pages to
  `app.routes.ts` under the correct layout shell, with `canActivate` guards and
  a `data.titleKey`. Admin-only pages use `roleGuard(['admin'])`.
- Open tabs keep their live component instance (and Signal state, scroll,
  filters) across tab switches via `core/routing/tab-reuse.strategy.ts`. Don't
  rely on `ngOnDestroy` for cleanup of routed components — they may be detached,
  not destroyed.

### Data / backend
- Everything talks to **`/api/*`** through `HttpClient`. In dev these are
  served by `core/interceptors/mock-backend.interceptor.ts` against
  `core/mock/mock-db.ts`. The interceptor's header comment lists the endpoint
  contract — treat it as the API spec.
- Switching to a real backend is a one-line change in `environments/*.ts`
  (`useMock: false`, set `apiBaseUrl`); **no service or component should
  change**. Keep that invariant: services call `/api/...`, never an absolute
  URL.
- Interceptor order (in `app.config.ts`) is intentional:
  `baseUrl → auth → loading → error → mockBackend`. Preserve it.
- Optimistic mutations use the helper in `shared/utils/optimistic.ts` (apply
  immediately, roll back on failure) — reuse it for Kanban/comments/team/files
  style interactions instead of re-implementing.

---

## Configuration is data, not code

Project-level behaviour is driven by typed config files in
`core/config/` — prefer editing these over touching components:

- `branding.config.ts` — app name, logo, and **all appearance defaults**
  (theme preset, surface, font, language, density). Re-themes the whole app.
- `menu.config.ts` — the sidebar / navigation tree.
- `theme-presets.ts`, `theme-packs.config.ts` — the 12 color presets and packs.
- `fonts.config.ts` — selectable fonts.
- `changelog.config.ts` — **single source of truth for the app version.**
  Add a release object to the **top**; `APP_VERSION` derives from it, the
  service worker cache is stamped from it (`scripts/stamp-sw.mjs`, runs on
  `postbuild`), and the "What's new" dialog shows once per user per version.
  Entries are bilingual (`fa`/`en`) and typed (`feature`/`improvement`/`fix`).
  **Bump this when you ship a user-visible change.**

---

## Testing

- **Unit — Vitest** (`vitest.config.ts`, jsdom). Tests cover **pure logic
  only**, no `TestBed`: Jalali date math (`core/utils/jalali.spec.ts`), RBAC
  (`core/services/session.store.spec.ts`), optimistic rollback
  (`shared/utils/optimistic.spec.ts`), form-schema validators
  (`shared/components/dynamic-form/form-schema.spec.ts`). Specs live next to
  their source as `*.spec.ts`. Keep new tests pure-logic where possible — that
  is the established pattern.
- **E2E — Playwright** (`playwright.config.ts`, `e2e/`). Critical journeys:
  auth + RBAC, theme/RTL, Kanban optimistic move. The config auto-starts
  `npm start`.

---

## Accessibility (don't regress)

Focus-trap on custom overlays (`appFocusTrap` — command palette, tour),
skip-to-content link, `role="main"`, focus-visible rings, ARIA on menus and the
command palette. Custom interactive widgets must remain keyboard-operable.

---

## Working agreement

- **Match the surrounding code** — its naming, comment density, and idioms.
  The codebase favours short doc-comments on services/configs explaining
  *why*; mirror that.
- Don't introduce new dependencies or state-management libraries without a
  clear need; the stack is deliberately small (Signals over NgRx, mock over a
  real server, CSS variables over a theme library).
- After changes, run `npm run build` (strict templates catch most errors) and,
  when logic changed, `npm test`.
- Keep `fa.json` / `en.json` / `ar.json` in sync, and bump
  `changelog.config.ts` for user-visible changes.
