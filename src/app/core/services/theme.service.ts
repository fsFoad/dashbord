import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import {
  palette,
  updatePrimaryPalette,
  updateSurfacePalette,
} from '@primeuix/themes';
import { SettingsStore } from './settings.store';
import { findPreset, findSurface } from '../config/theme-presets';
import { findPack } from '../config/theme-packs.config';

/**
 * Single source of truth for COLOR. Reacts to the settings store and updates
 * the PrimeNG primary/surface palettes + the .app-dark class.
 *
 * Guards: each palette update only runs when its resolved value actually
 * changed, so toggling unrelated settings (surface style, density, language)
 * never re-runs the expensive PrimeNG palette recalculation. The palette work
 * is also deferred to a microtask so a rapid burst of setting changes coalesces
 * and never blocks the click handler / main thread synchronously.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly settings = inject(SettingsStore);
  private readonly doc = inject(DOCUMENT);

  private lastPrimaryKey = '';
  private lastSurfaceKey = '';
  private primaryQueued = false;
  private surfaceQueued = false;

  constructor() {
    // Primary color: a custom hex takes precedence over the chosen preset.
    effect(() => {
      const custom = this.settings.customPrimaryColor();
      const preset = this.settings.themePreset();
      const key = custom ? `c:${custom}` : `p:${preset}`;
      if (key === this.lastPrimaryKey || this.primaryQueued) return;
      this.lastPrimaryKey = key;
      this.primaryQueued = true;
      queueMicrotask(() => {
        this.primaryQueued = false;
        const ramp = custom ? palette(custom) : findPreset(preset).palette;
        updatePrimaryPalette(ramp as Parameters<typeof updatePrimaryPalette>[0]);
      });
    });

    // Surface (neutral) palette.
    effect(() => {
      const surface = this.settings.surface();
      if (surface === this.lastSurfaceKey || this.surfaceQueued) return;
      this.lastSurfaceKey = surface;
      this.surfaceQueued = true;
      queueMicrotask(() => {
        this.surfaceQueued = false;
        updateSurfacePalette(
          findSurface(surface).palette as Parameters<typeof updateSurfacePalette>[0],
        );
      });
    });

    // Density → CSS attribute.
    effect(() => {
      this.doc.documentElement.setAttribute('data-density', this.settings.density());
    });

    // Surface style (solid|glass|soft|neon) → CSS attribute.
    effect(() => {
      this.doc.documentElement.setAttribute('data-surface-style', this.settings.surfaceStyle());
    });

    // Theme pack — coordinated tokens (background color, surface color, border,
    // shadow, radius). Pushed as CSS variables on <html>; consumed in styles.css
    // so the page background AND the sidebar/cards pick up the pack's tint.
    effect(() => {
      const pack = findPack(this.settings.themePack());
      const dark = this.settings.darkMode();
      const html = this.doc.documentElement;
      html.setAttribute('data-theme-pack', pack.key);
      const s = html.style;
      s.setProperty('--pack-bg-color', dark ? pack.bgDark : pack.bgLight);
      s.setProperty('--pack-surface-color', dark ? pack.surfaceDark : pack.surfaceLight);
      s.setProperty('--pack-sidebar-color', dark ? pack.sidebarDark : pack.sidebarLight);
      s.setProperty('--pack-radius', pack.radius);
      s.setProperty('--pack-border', dark ? pack.borderDark : pack.border);
      s.setProperty('--pack-shadow', dark ? pack.shadowDark : pack.shadow);
    });

    // Dark mode → .app-dark class.
    effect(() => {
      this.doc.documentElement.classList.toggle('app-dark', this.settings.darkMode());
    });
  }
}
