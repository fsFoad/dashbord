import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { BRANDING } from '../config/branding.config';
import {
  AppLanguage,
  AppSettings,
  Density,
  LayoutType,
  MenuMode,
} from '../models/settings.model';

const STORAGE_KEY = 'app.settings';
const SETTINGS_VERSION = 2;

/** Silent, additive migrations for previously persisted settings. */
function migrate(s: AppSettings): AppSettings {
  const out = { ...s };
  if ((out._v ?? 1) < 2) {
    // v2: navy became the default surface; move users still on the old default.
    if (out.surface === 'slate') out.surface = 'navy';
  }
  out._v = SETTINGS_VERSION;
  return out;
}

/**
 * Central application settings, held entirely in Signals (no NgRx).
 * Every UI preference lives here; an effect persists the whole object to
 * localStorage whenever anything changes. Services (theme/font/language/
 * layout) read these signals and apply the side-effects.
 */
@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly storage = inject(StorageService);

  private readonly state = signal<AppSettings>(
    migrate(this.storage.read<AppSettings>(STORAGE_KEY, BRANDING.defaults)),
  );

  // ---- Read-only selectors ----
  readonly all = this.state.asReadonly();
  readonly language = computed(() => this.state().language);
  readonly darkMode = computed(() => this.state().darkMode);
  readonly themePreset = computed(() => this.state().themePreset);
  readonly surface = computed(() => this.state().surface);
  readonly customPrimaryColor = computed(() => this.state().customPrimaryColor);
  readonly fontFamily = computed(() => this.state().fontFamily);
  readonly layout = computed(() => this.state().layout);
  readonly menuMode = computed(() => this.state().menuMode);
  readonly sidebarCollapsed = computed(() => this.state().sidebarCollapsed);
  readonly density = computed(() => this.state().density);
  readonly isRtl = computed(() => this.state().language === 'fa');

  constructor() {
    // Persist on any change.
    effect(() => this.storage.write(STORAGE_KEY, this.state()));
  }

  // ---- Mutations ----
  private patch(p: Partial<AppSettings>): void {
    this.state.update((s) => ({ ...s, ...p }));
  }

  setLanguage(language: AppLanguage): void { this.patch({ language }); }
  setDarkMode(darkMode: boolean): void { this.patch({ darkMode }); }
  toggleDarkMode(): void { this.patch({ darkMode: !this.state().darkMode }); }
  setThemePreset(themePreset: string): void { this.patch({ themePreset, customPrimaryColor: null }); }
  setSurface(surface: string): void { this.patch({ surface }); }
  setCustomPrimaryColor(customPrimaryColor: string | null): void { this.patch({ customPrimaryColor }); }
  setFontFamily(fontFamily: string): void { this.patch({ fontFamily }); }
  setLayout(layout: LayoutType): void { this.patch({ layout }); }
  setMenuMode(menuMode: MenuMode): void { this.patch({ menuMode }); }
  setSidebarCollapsed(sidebarCollapsed: boolean): void { this.patch({ sidebarCollapsed }); }
  toggleSidebar(): void { this.patch({ sidebarCollapsed: !this.state().sidebarCollapsed }); }
  setDensity(density: Density): void { this.patch({ density }); }

  /** Reset everything back to the project branding defaults. */
  reset(): void { this.state.set({ ...BRANDING.defaults }); }

  /** Export current settings (e.g. to share a brand theme as JSON). */
  export(): string { return JSON.stringify(this.state(), null, 2); }

  /** Import a previously exported settings JSON. Invalid input is ignored. */
  import(json: string): boolean {
    try {
      const parsed = JSON.parse(json) as Partial<AppSettings>;
      this.state.set({ ...BRANDING.defaults, ...parsed });
      return true;
    } catch {
      return false;
    }
  }
}
