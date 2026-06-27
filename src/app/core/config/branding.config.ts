import { AppSettings } from '../models/settings.model';

/**
 * Per-project branding. This is the ONE file each new project edits
 * to re-brand the whole app. Nothing here is hardcoded elsewhere.
 */
export interface BrandingConfig {
  /** App name shown in the sidebar / topbar / document title. */
  appName: string;
  /** Short name shown when the sidebar is collapsed to icon mode. */
  appShortName: string;
  /** Logo: an inline SVG path or an asset URL. Kept simple for Phase 1. */
  logoUrl: string | null;
  /** Defaults applied on first run (before the user customizes anything). */
  defaults: AppSettings;
}

export const BRANDING: BrandingConfig = {
  appName: 'Dashboard',
  appShortName: 'DB',
  logoUrl: null,
  defaults: {
    language: 'fa',
    darkMode: false,
    themePreset: 'indigo',
    surface: 'navy',
    customPrimaryColor: null,
    fontFamily: '"Vazirmatn", system-ui, sans-serif',
    layout: 'dashboard',
    menuMode: 'static',
    sidebarCollapsed: false,
    density: 'normal',
    surfaceStyle: 'glass',
    themePack: 'meridian',
  },
};
