import { __decorate } from "tslib";
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { BRANDING } from '../config/branding.config';
const STORAGE_KEY = 'app.settings';
const SETTINGS_VERSION = 2;
/** Silent, additive migrations for previously persisted settings. */
function migrate(s) {
    const out = { ...s };
    if ((out._v ?? 1) < 2) {
        // v2: navy became the default surface; move users still on the old default.
        if (out.surface === 'slate')
            out.surface = 'navy';
    }
    if (out.surfaceStyle === undefined)
        out.surfaceStyle = 'glass';
    if (out.themePack === undefined)
        out.themePack = 'meridian';
    if (out.menuCollapsible === undefined)
        out.menuCollapsible = true;
    out._v = SETTINGS_VERSION;
    return out;
}
/**
 * Central application settings, held entirely in Signals (no NgRx).
 * Every UI preference lives here; an effect persists the whole object to
 * localStorage whenever anything changes. Services (theme/font/language/
 * layout) read these signals and apply the side-effects.
 */
let SettingsStore = class SettingsStore {
    storage = inject(StorageService);
    state = signal(migrate(this.storage.read(STORAGE_KEY, BRANDING.defaults)));
    // ---- Read-only selectors ----
    all = this.state.asReadonly();
    language = computed(() => this.state().language);
    darkMode = computed(() => this.state().darkMode);
    themePreset = computed(() => this.state().themePreset);
    surface = computed(() => this.state().surface);
    customPrimaryColor = computed(() => this.state().customPrimaryColor);
    fontFamily = computed(() => this.state().fontFamily);
    layout = computed(() => this.state().layout);
    menuMode = computed(() => this.state().menuMode);
    sidebarCollapsed = computed(() => this.state().sidebarCollapsed);
    menuCollapsible = computed(() => this.state().menuCollapsible);
    density = computed(() => this.state().density);
    surfaceStyle = computed(() => this.state().surfaceStyle);
    themePack = computed(() => this.state().themePack);
    isRtl = computed(() => this.state().language === 'fa' || this.state().language === 'ar');
    constructor() {
        // Persist on any change.
        effect(() => this.storage.write(STORAGE_KEY, this.state()));
    }
    // ---- Mutations ----
    patch(p) {
        this.state.update((s) => ({ ...s, ...p }));
    }
    setLanguage(language) { this.patch({ language }); }
    setDarkMode(darkMode) { this.patch({ darkMode }); }
    toggleDarkMode() { this.patch({ darkMode: !this.state().darkMode }); }
    setThemePreset(themePreset) { this.patch({ themePreset, customPrimaryColor: null }); }
    setSurface(surface) { this.patch({ surface }); }
    setCustomPrimaryColor(customPrimaryColor) { this.patch({ customPrimaryColor }); }
    setFontFamily(fontFamily) { this.patch({ fontFamily }); }
    setLayout(layout) { this.patch({ layout }); }
    setMenuMode(menuMode) { this.patch({ menuMode }); }
    setSidebarCollapsed(sidebarCollapsed) { this.patch({ sidebarCollapsed }); }
    toggleSidebar() { this.patch({ sidebarCollapsed: !this.state().sidebarCollapsed }); }
    setMenuCollapsible(menuCollapsible) { this.patch({ menuCollapsible }); }
    setDensity(density) { this.patch({ density }); }
    setSurfaceStyle(surfaceStyle) { this.patch({ surfaceStyle }); }
    /**
     * Apply a theme pack in ONE patch so the palette recalculates exactly once
     * (multiple patches would trigger several expensive palette rebuilds).
     */
    applyThemePack(pack) {
        this.patch({
            themePack: pack.key,
            themePreset: pack.themePreset,
            customPrimaryColor: pack.customColor ?? null,
            surface: pack.surface,
            surfaceStyle: pack.surfaceStyle,
            darkMode: pack.dark,
        });
    }
    /** Reset everything back to the project branding defaults. */
    reset() { this.state.set({ ...BRANDING.defaults }); }
    /** Export current settings (e.g. to share a brand theme as JSON). */
    export() { return JSON.stringify(this.state(), null, 2); }
    /** Import a previously exported settings JSON. Invalid input is ignored. */
    import(json) {
        try {
            const parsed = JSON.parse(json);
            this.state.set({ ...BRANDING.defaults, ...parsed });
            return true;
        }
        catch {
            return false;
        }
    }
};
SettingsStore = __decorate([
    Injectable({ providedIn: 'root' })
], SettingsStore);
export { SettingsStore };
