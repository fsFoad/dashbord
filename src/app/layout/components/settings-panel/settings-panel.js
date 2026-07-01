import { __decorate } from "tslib";
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
import { FONT_OPTIONS, isFontUsable } from '../../../core/config/fonts.config';
import { FontLoaderService } from '../../../core/services/font-loader.service';
import { ToastService } from '../../../core/services/toast.service';
let SettingsPanel = class SettingsPanel {
    layout = inject(LayoutService);
    router = inject(Router);
    settings = inject(SettingsStore);
    language = inject(LanguageService);
    toast = inject(ToastService);
    fontLoader = inject(FontLoaderService);
    packGroups = [
        { category: 'enterprise', labelKey: 'themePack.cat.enterprise', icon: 'pi pi-building',
            packs: THEME_PACKS.filter((p) => p.category === 'enterprise') },
        { category: 'startup', labelKey: 'themePack.cat.startup', icon: 'pi pi-bolt',
            packs: THEME_PACKS.filter((p) => p.category === 'startup') },
    ];
    presets = THEME_PRESETS;
    surfaces = SURFACE_PALETTES;
    fonts = FONT_OPTIONS;
    /** The four selectable visual surface styles (with a mini preview look). */
    surfaceStyles = [
        { key: 'solid', labelKey: 'settings.style.solid', icon: 'pi pi-stop',
            previewClass: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-200' },
        { key: 'glass', labelKey: 'settings.style.glass', icon: 'pi pi-clone',
            previewClass: 'bg-white/60 text-primary ring-1 ring-white/50 dark:bg-white/10' },
        { key: 'soft', labelKey: 'settings.style.soft', icon: 'pi pi-circle',
            previewClass: 'bg-primary/10 text-primary shadow-lg shadow-primary/20' },
        { key: 'neon', labelKey: 'settings.style.neon', icon: 'pi pi-bolt',
            previewClass: 'bg-surface-900 text-primary ring-1 ring-primary/50 shadow-[0_0_12px_-2px_var(--p-primary-500)]' },
    ];
    // Two-way bound to the drawer's visible state.
    visible = model(false);
    // Local color-picker model (hex). Defaults to the active preset swatch.
    customColor = computed(() => this.settings.customPrimaryColor() ?? this.activeSwatch());
    langOptions = [
        { label: 'فارسی', value: 'fa' },
        { label: 'English', value: 'en' },
    ];
    menuModeOptions = [
        { label: 'menu.mode.static', value: 'static' },
        { label: 'menu.mode.overlay', value: 'overlay' },
        { label: 'menu.mode.slim', value: 'slim' },
    ];
    densityOptions = [
        { label: 'settings.density.compact', value: 'compact' },
        { label: 'settings.density.normal', value: 'normal' },
    ];
    activeSwatch() {
        return this.presets.find((p) => p.key === this.settings.themePreset())?.swatch ?? '#6366f1';
    }
    pickPreset(key) { this.settings.setThemePreset(key); }
    pickSurface(key) { this.settings.setSurface(key); }
    usable(f) {
        return isFontUsable(f);
    }
    fontStatus(f) {
        return this.fontLoader.statusOf(f.value)();
    }
    async pickFont(f) {
        if (!this.usable(f))
            return;
        const ok = await this.fontLoader.ensure(f);
        if (ok) {
            this.settings.setFontFamily(f.value);
        }
        else {
            this.toast.error('settings.font.failed');
        }
    }
    colorDebounce = null;
    applyCustomColor(hex) {
        // PrimeNG's ColorPicker fires ngModelChange continuously while the user
        // drags across the spectrum (dozens of times per second). Each change
        // would rebuild the whole primary palette (heavy) and restyle the page —
        // doing that on every frame locks the tab. So we DEBOUNCE: only apply the
        // palette once the user pauses (120ms), which keeps dragging smooth.
        const value = hex?.startsWith('#') ? hex : `#${hex}`;
        if (this.colorDebounce !== null)
            clearTimeout(this.colorDebounce);
        this.colorDebounce = setTimeout(() => {
            this.colorDebounce = null;
            this.settings.setCustomPrimaryColor(value);
        }, 120);
    }
    clearCustomColor() { this.settings.setCustomPrimaryColor(null); }
    onImport(e) {
        const input = e.target;
        const file = input.files?.[0];
        input.value = '';
        if (!file)
            return;
        file.text().then((json) => {
            if (this.settings.import(json))
                this.toast.success('settings.importOk');
            else
                this.toast.error('settings.importBad');
        });
    }
    exportSettings() {
        const blob = new Blob([this.settings.export()], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'app-theme.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    reset() { this.settings.reset(); }
    /** Current URL as a signal (updates on each navigation). */
    currentUrl = toSignal(this.router.events.pipe(filter((e) => e instanceof NavigationEnd), map(() => this.router.url), startWith(this.router.url)), { initialValue: this.router.url });
    /** True when the app is currently showing the public "site" shell. */
    isSiteMode = computed(() => this.currentUrl().startsWith('/site'));
    /** Navigate to a shell (dashboard or site) and close the panel. */
    /** Navigate to a shell (dashboard or site). Close the panel FIRST so the
     * drawer can remove its body-level mask, then navigate on the next tick —
     * otherwise navigating mid-open unmounts the drawer and leaves its dark
     * mask stuck over the new page, blocking all clicks. */
    goTo(path) {
        this.layout.setSettingsOpen(false);
        setTimeout(() => this.router.navigateByUrl(path), 180);
    }
};
SettingsPanel = __decorate([
    Component({
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
], SettingsPanel);
export { SettingsPanel };
