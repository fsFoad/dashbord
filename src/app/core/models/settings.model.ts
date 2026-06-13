/** Supported UI languages. Extend this union to add more. */
export type AppLanguage = 'fa' | 'en';

/** High-level layout types (each is a distinct, separate config). */
export type LayoutType = 'dashboard' | 'site';

/** Variants of the dashboard navigation. */
export type MenuMode = 'static' | 'overlay' | 'slim' | 'horizontal';

/** Spacing density for tables/cards/layout. */
export type Density = 'compact' | 'normal';

/**
 * The complete, serializable settings object.
 * This is exactly what gets persisted to localStorage and what the
 * anti-FOUC script in index.html reads. Keep it JSON-safe.
 */
export interface AppSettings {
  /** Settings schema version (for silent migrations). */
  _v?: number;
  language: AppLanguage;
  darkMode: boolean;
  /** Key into THEME_PRESETS. */
  themePreset: string;
  /** Key into SURFACE_PALETTES. */
  surface: string;
  /** A custom brand color (hex). When set it overrides themePreset's primary. */
  customPrimaryColor: string | null;
  /** A CSS font-family string (value of an entry in FONT_OPTIONS). */
  fontFamily: string;
  layout: LayoutType;
  menuMode: MenuMode;
  sidebarCollapsed: boolean;
  density: Density;
}
