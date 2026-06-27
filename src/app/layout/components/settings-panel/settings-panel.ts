import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { Drawer } from 'primeng/drawer';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ColorPicker } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';

import { LayoutService } from '../../../core/services/layout.service';
import { SettingsStore } from '../../../core/services/settings.store';
import { LanguageService } from '../../../core/services/language.service';
import { THEME_PRESETS, SURFACE_PALETTES } from '../../../core/config/theme-presets';
import { THEME_PACKS } from '../../../core/config/theme-packs.config';
import { FONT_OPTIONS, FontOption, isFontUsable } from '../../../core/config/fonts.config';
import { FontLoaderService, FontStatus } from '../../../core/services/font-loader.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-settings-panel',
  imports: [
    FormsModule,
    TranslocoModule,
    Drawer,
    SelectButton,
    ToggleSwitch,
    ColorPicker,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings-panel.html',
})
export class SettingsPanel {
  protected readonly layout = inject(LayoutService);
  private readonly router = inject(Router);
  protected readonly settings = inject(SettingsStore);
  protected readonly language = inject(LanguageService);
  private readonly toast = inject(ToastService);
  private readonly fontLoader = inject(FontLoaderService);

  protected readonly packGroups = [
    { category: 'enterprise', labelKey: 'themePack.cat.enterprise', icon: 'pi pi-building',
      packs: THEME_PACKS.filter((p) => p.category === 'enterprise') },
    { category: 'startup', labelKey: 'themePack.cat.startup', icon: 'pi pi-bolt',
      packs: THEME_PACKS.filter((p) => p.category === 'startup') },
  ];
  protected readonly presets = THEME_PRESETS;
  protected readonly surfaces = SURFACE_PALETTES;
  protected readonly fonts = FONT_OPTIONS;

  /** The four selectable visual surface styles (with a mini preview look). */
  protected readonly surfaceStyles = [
    { key: 'solid' as const, labelKey: 'settings.style.solid', icon: 'pi pi-stop',
      previewClass: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-200' },
    { key: 'glass' as const, labelKey: 'settings.style.glass', icon: 'pi pi-clone',
      previewClass: 'bg-white/60 text-primary ring-1 ring-white/50 dark:bg-white/10' },
    { key: 'soft' as const, labelKey: 'settings.style.soft', icon: 'pi pi-circle',
      previewClass: 'bg-primary/10 text-primary shadow-lg shadow-primary/20' },
    { key: 'neon' as const, labelKey: 'settings.style.neon', icon: 'pi pi-bolt',
      previewClass: 'bg-surface-900 text-primary ring-1 ring-primary/50 shadow-[0_0_12px_-2px_var(--p-primary-500)]' },
  ];

  // Two-way bound to the drawer's visible state.
  readonly visible = model<boolean>(false);

  // Local color-picker model (hex). Defaults to the active preset swatch.
  protected readonly customColor = computed(
    () => this.settings.customPrimaryColor() ?? this.activeSwatch(),
  );

  protected readonly langOptions = [
    { label: 'فارسی', value: 'fa' as const },
    { label: 'English', value: 'en' as const },
  ];
  protected readonly menuModeOptions = [
    { label: 'menu.mode.static', value: 'static' as const },
    { label: 'menu.mode.overlay', value: 'overlay' as const },
    { label: 'menu.mode.slim', value: 'slim' as const },
  ];
  protected readonly densityOptions = [
    { label: 'settings.density.compact', value: 'compact' as const },
    { label: 'settings.density.normal', value: 'normal' as const },
  ];

  private activeSwatch(): string {
    return this.presets.find((p) => p.key === this.settings.themePreset())?.swatch ?? '#6366f1';
  }

  protected pickPreset(key: string): void { this.settings.setThemePreset(key); }
  protected pickSurface(key: string): void { this.settings.setSurface(key); }
  protected usable(f: FontOption): boolean {
    return isFontUsable(f);
  }

  protected fontStatus(f: FontOption): FontStatus {
    return this.fontLoader.statusOf(f.value)();
  }

  protected async pickFont(f: FontOption): Promise<void> {
    if (!this.usable(f)) return;
    const ok = await this.fontLoader.ensure(f);
    if (ok) {
      this.settings.setFontFamily(f.value);
    } else {
      this.toast.error('settings.font.failed');
    }
  }

  private colorDebounce: ReturnType<typeof setTimeout> | null = null;

  protected applyCustomColor(hex: string): void {
    // PrimeNG's ColorPicker fires ngModelChange continuously while the user
    // drags across the spectrum (dozens of times per second). Each change
    // would rebuild the whole primary palette (heavy) and restyle the page —
    // doing that on every frame locks the tab. So we DEBOUNCE: only apply the
    // palette once the user pauses (120ms), which keeps dragging smooth.
    const value = hex?.startsWith('#') ? hex : `#${hex}`;
    if (this.colorDebounce !== null) clearTimeout(this.colorDebounce);
    this.colorDebounce = setTimeout(() => {
      this.colorDebounce = null;
      this.settings.setCustomPrimaryColor(value);
    }, 120);
  }
  protected clearCustomColor(): void { this.settings.setCustomPrimaryColor(null); }

  protected onImport(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    file.text().then((json) => {
      if (this.settings.import(json)) this.toast.success('settings.importOk');
      else this.toast.error('settings.importBad');
    });
  }

  protected exportSettings(): void {
    const blob = new Blob([this.settings.export()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  protected reset(): void { this.settings.reset(); }
  /** Current URL as a signal (updates on each navigation). */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );
  /** True when the app is currently showing the public "site" shell. */
  protected readonly isSiteMode = computed(() => this.currentUrl().startsWith('/site'));

  /** Navigate to a shell (dashboard or site) and close the panel. */
  /** Navigate to a shell (dashboard or site). Close the panel FIRST so the
   * drawer can remove its body-level mask, then navigate on the next tick —
   * otherwise navigating mid-open unmounts the drawer and leaves its dark
   * mask stuck over the new page, blocking all clicks. */
  protected goTo(path: string): void {
    this.layout.setSettingsOpen(false);
    setTimeout(() => this.router.navigateByUrl(path), 180);
  }
}
