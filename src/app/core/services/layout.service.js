import { __decorate } from "tslib";
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { SettingsStore } from './settings.store';
import { ResponsiveService } from './responsive.service';
/**
 * Coordinates layout behaviour. The chosen layout type & menu mode live in the
 * persisted settings store; transient UI state (is the mobile drawer open) lives
 * here. On handheld devices the static sidebar collapses into an overlay drawer.
 */
let LayoutService = class LayoutService {
    settings = inject(SettingsStore);
    responsive = inject(ResponsiveService);
    /** Transient: mobile/overlay drawer visibility. */
    _mobileDrawerOpen = signal(false);
    mobileDrawerOpen = this._mobileDrawerOpen.asReadonly();
    /** Transient: settings panel (theme/font/lang) visibility. */
    _settingsOpen = signal(false);
    settingsOpen = this._settingsOpen.asReadonly();
    layout = this.settings.layout;
    menuMode = this.settings.menuMode;
    isRtl = this.settings.isRtl;
    /** Should the sidebar render as a slide-over overlay rather than docked? */
    isOverlayMode = computed(() => this.responsive.isHandheld() || this.settings.menuMode() === 'overlay');
    /** Icon-only docked rail (desktop "slim" mode or user-collapsed). */
    isSlim = computed(() => !this.responsive.isHandheld() &&
        (this.settings.menuMode() === 'slim' || this.settings.sidebarCollapsed()));
    constructor() {
        // Auto-close the mobile drawer when growing back to desktop.
        effect(() => {
            if (this.responsive.isDesktop())
                this._mobileDrawerOpen.set(false);
        });
    }
    openMobileDrawer() { this._mobileDrawerOpen.set(true); }
    closeMobileDrawer() { this._mobileDrawerOpen.set(false); }
    openSettings() { this._settingsOpen.set(true); }
    closeSettings() { this._settingsOpen.set(false); }
    setSettingsOpen(v) { this._settingsOpen.set(v); }
    /** Topbar hamburger: opens the drawer on handheld, toggles slim on desktop. */
    toggleSidebar() {
        if (this.responsive.isHandheld()) {
            this._mobileDrawerOpen.update((v) => !v);
        }
        else {
            this.settings.toggleSidebar();
        }
    }
};
LayoutService = __decorate([
    Injectable({ providedIn: 'root' })
], LayoutService);
export { LayoutService };
