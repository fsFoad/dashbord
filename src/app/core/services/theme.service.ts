import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import {
  palette,
  updatePrimaryPalette,
  updateSurfacePalette,
} from '@primeuix/themes';
import { SettingsStore } from './settings.store';
import { findPreset, findSurface } from '../config/theme-presets';

/**
 * Single source of truth for COLOR. Reacting to the settings store, it:
 *  - sets the PrimeNG primary palette (from a preset OR a custom brand color)
 *  - sets the surface (neutral) palette
 *  - toggles the .app-dark class on <html>
 *
 * Because our custom Tailwind components use bg-primary / text-surface-* and
 * PrimeNG components read the same CSS variables, all three layers update at
 * once with a single change here.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly settings = inject(SettingsStore);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    // Primary color: a custom hex (turned into a full ramp by palette())
    // takes precedence over the chosen preset.
    effect(() => {
      const custom = this.settings.customPrimaryColor();
      const html = this.doc.documentElement;
      if (custom) {
        updatePrimaryPalette(
          palette(custom) as Parameters<typeof updatePrimaryPalette>[0],
        );
      } else {
        updatePrimaryPalette(
          findPreset(this.settings.themePreset()).palette as Parameters<typeof updatePrimaryPalette>[0],
        );
      }

      html.classList.remove(
          'theme-default',
          'theme-aurora',
          'theme-glass',
          'theme-ocean',
          'theme-sunset',
          'theme-cyber',
          'theme-banking',
          'theme-premium-dark'
      );

      html.classList.add(
          `theme-${this.settings.themePack()}`
      );
      console.log('themePack');
      console.log(this.settings.themePack());
    });

    // Surface (neutral) palette.
    effect(() => {
      updateSurfacePalette(
        findSurface(this.settings.surface()).palette as Parameters<typeof updateSurfacePalette>[0],
      );
    });

    // Density (compact/normal) → consumed by CSS rules in styles.css.
    effect(() => {
      this.doc.documentElement.setAttribute('data-density', this.settings.density());
    });

    // Dark mode — kept in sync with PrimeNG's darkModeSelector ('.app-dark').
    effect(() => {
      this.doc.documentElement.classList.toggle('app-dark', this.settings.darkMode());
    });
  }
}
