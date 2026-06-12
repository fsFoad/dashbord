import { Directive, effect, inject, signal } from '@angular/core';
import { SettingsStore } from '../../../core/services/settings.store';

/**
 * Base for chart widgets: re-renders the chart whenever the theme, custom
 * brand color, surface, dark mode or language changes. The tiny timeout lets
 * ThemeService write the new CSS variables before we read them.
 */
@Directive()
export abstract class ChartBase {
  protected readonly settings = inject(SettingsStore);

  protected readonly chartData = signal<Record<string, unknown> | null>(null);
  protected readonly chartOptions = signal<Record<string, unknown>>({});

  constructor() {
    effect(() => {
      // theme/locale dependencies:
      this.settings.darkMode();
      this.settings.themePreset();
      this.settings.customPrimaryColor();
      this.settings.surface();
      this.settings.language();
      this.trigger();
      setTimeout(() => this.rebuild(), 40);
    });
  }

  /** Extra reactive dependency (e.g. the stats input). */
  protected abstract trigger(): void;
  protected abstract rebuild(): void;
}
