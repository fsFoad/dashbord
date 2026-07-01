/** Supported UI languages. Extend this union to add more. */
export type AppLanguage = 'fa' | 'en' | 'ar';

/** High-level layout types (each is a distinct, separate config). */
export type LayoutType = 'dashboard' | 'site';

/** Variants of the dashboard navigation. */
export type MenuMode = 'static' | 'overlay' | 'slim' | 'horizontal';

/** Spacing density for tables/cards/layout. */
export type Density = 'compact' | 'normal';

/**
 * Visual surface style — an independent appearance layer (like theme/font).
 * Controls how cards, sidebar, topbar and dialogs are rendered:
 *   solid = clean & opaque · glass = blurred translucency ·
 *   soft = pastel soft-shadows · neon = high-contrast glow on dark.
 */
export type SurfaceStyle = 'solid' | 'glass' | 'soft' | 'neon';

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
  /**
   * When true, sidebar groups are collapsible (accordion: click to expand/collapse).
   * When false, the whole menu is shown fully expanded with no collapse/expand.
   */
  menuCollapsible: boolean;
  density: Density;
  /** Visual surface style (solid | glass | soft | neon). */
  surfaceStyle: SurfaceStyle;
  /** Selected theme pack key (coordinated look). */
  themePack: string;
}
