# Dashboard — Phase 1 (Foundation & Shell)

Modern, minimal, feature-rich admin foundation built with **Angular 21 + PrimeNG 21 + Tailwind v4 + Transloco**.
Fully responsive (mobile drawer), runtime **RTL/LTR + fa/en**, **12 color themes + custom brand color picker + dark mode**, and **font as an independent config**.

## Run it

```bash
npm install
npm start          # http://localhost:4200
```

> Requires Node 20+ and a fresh `npm install` (PrimeNG 21 / Angular 21 / Tailwind 4 / Transloco are pinned in package.json — no paid packages, all MIT).

## What's inside (Phase 1 scope)

| Area | Where |
|---|---|
| Branding (per-project) | `src/app/core/config/branding.config.ts` |
| 12 color presets + 5 surfaces | `src/app/core/config/theme-presets.ts` |
| Fonts (independent config) | `src/app/core/config/fonts.config.ts` |
| Multi-level menu sample | `src/app/core/config/menu.config.ts` |
| Signals settings store (auto-persist) | `src/app/core/services/settings.store.ts` |
| Theme / Font / Language services | `src/app/core/services/` |
| Responsive + Layout services | `src/app/core/services/` |
| Layout shells (dashboard / site / auth / blank) | `src/app/layout/` |
| Sidebar (recursive, truncation+tooltip, slim) | `src/app/layout/components/sidebar/` |
| Topbar / Footer / Breadcrumb / Settings panel | `src/app/layout/components/` |
| i18n (flat keys) | `src/assets/i18n/fa.json`, `en.json` |

## Try these after `npm start`

1. **Settings panel** (sliders icon in the topbar): switch any of the 12 themes → sidebar, custom cards **and** PrimeNG buttons/tags all change together.
2. **Custom brand color**: pick any hex → a full 50–950 palette is generated (`palette()` + `updatePrimaryPalette`). "Back to preset" clears it.
3. **Dark mode** toggle, **language fa/en** (whole app mirrors RTL↔LTR instantly, no reload).
4. **Font** selection — independent from the theme (`--app-font`).
5. Shrink the window below `lg` → the sidebar becomes a slide-over drawer (hamburger).
6. Open **پروژه‌ها → گزارش‌ها** → the long Persian label truncates with a hover tooltip; 3-level nesting works.
7. Visit `/site` for the separate public "site" layout; any bad URL hits the 404 page.
8. Settings persist in `localStorage` (`app.settings`) with an anti-FOUC bootstrap in `index.html`; **Export theme** downloads them as JSON.

## Persian fonts note

Vazirmatn (+ Inter/Roboto/Poppins/Open Sans) load from Google Fonts out of the box.
Estedad / Sahel / Shabnam / Yekan Bakh are listed in the font picker but disabled until you drop their font files into `public/fonts/` and add matching `@font-face` rules in `src/styles.css`, then flip `ready: true` in `fonts.config.ts`.

## Next phases

2) Mock API + full error interceptor + toast/confirm + skeletons + `@defer`
3) Auth + RBAC + per-user configurable menu
4) Universal date/time picker (Jalali+Gregorian, single/range) + advanced DataTable + forms
5) Dashboard charts & draggable widgets … then projects/Kanban/Gantt, notifications (mock WS), multi-tab, onboarding tour.
