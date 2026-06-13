import { ChangeDetectionStrategy, Component, computed, inject, model } from '@angular/core';
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
  protected readonly settings = inject(SettingsStore);
  protected readonly language = inject(LanguageService);
  private readonly toast = inject(ToastService);
  private readonly fontLoader = inject(FontLoaderService);

  protected readonly presets = THEME_PRESETS;
  protected readonly surfaces = SURFACE_PALETTES;
  protected readonly fonts = FONT_OPTIONS;

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

  protected applyCustomColor(hex: string): void {
    // ColorPicker emits without a leading '#'; normalize it.
    const value = hex?.startsWith('#') ? hex : `#${hex}`;
    this.settings.setCustomPrimaryColor(value);
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
}
