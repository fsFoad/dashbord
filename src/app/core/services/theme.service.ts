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
      if (custom) {
        updatePrimaryPalette(
          palette(custom) as Parameters<typeof updatePrimaryPalette>[0],
        );
      } else {
        updatePrimaryPalette(
          findPreset(this.settings.themePreset()).palette as Parameters<typeof updatePrimaryPalette>[0],
        );
      }
    });

    // Surface (neutral) palette.
    effect(() => {
      updateSurfacePalette(
        findSurface(this.settings.surface()).palette as Parameters<typeof updateSurfacePalette>[0],
      );
    });

    // Dark mode — kept in sync with PrimeNG's darkModeSelector ('.app-dark').
    effect(() => {
      this.doc.documentElement.classList.toggle('app-dark', this.settings.darkMode());
    });
  }
}
