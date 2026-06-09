import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { SettingsStore } from './settings.store';
import { ResponsiveService } from './responsive.service';

/**
 * Coordinates layout behaviour. The chosen layout type & menu mode live in the
 * persisted settings store; transient UI state (is the mobile drawer open) lives
 * here. On handheld devices the static sidebar collapses into an overlay drawer.
 */
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly settings = inject(SettingsStore);
  private readonly responsive = inject(ResponsiveService);

  /** Transient: mobile/overlay drawer visibility. */
  private readonly _mobileDrawerOpen = signal(false);
  readonly mobileDrawerOpen = this._mobileDrawerOpen.asReadonly();

  /** Transient: settings panel (theme/font/lang) visibility. */
  private readonly _settingsOpen = signal(false);
  readonly settingsOpen = this._settingsOpen.asReadonly();

  readonly layout = this.settings.layout;
  readonly menuMode = this.settings.menuMode;
  readonly isRtl = this.settings.isRtl;

  /** Should the sidebar render as a slide-over overlay rather than docked? */
  readonly isOverlayMode = computed(
    () => this.responsive.isHandheld() || this.settings.menuMode() === 'overlay',
  );

  /** Icon-only docked rail (desktop "slim" mode or user-collapsed). */
  readonly isSlim = computed(
    () =>
      !this.responsive.isHandheld() &&
      (this.settings.menuMode() === 'slim' || this.settings.sidebarCollapsed()),
  );

  constructor() {
    // Auto-close the mobile drawer when growing back to desktop.
    effect(() => {
      if (this.responsive.isDesktop()) this._mobileDrawerOpen.set(false);
    });
  }

  openMobileDrawer(): void { this._mobileDrawerOpen.set(true); }
  closeMobileDrawer(): void { this._mobileDrawerOpen.set(false); }

  openSettings(): void { this._settingsOpen.set(true); }
  closeSettings(): void { this._settingsOpen.set(false); }
  setSettingsOpen(v: boolean): void { this._settingsOpen.set(v); }

  /** Topbar hamburger: opens the drawer on handheld, toggles slim on desktop. */
  toggleSidebar(): void {
    if (this.responsive.isHandheld()) {
      this._mobileDrawerOpen.update((v) => !v);
    } else {
      this.settings.toggleSidebar();
    }
  }
}
