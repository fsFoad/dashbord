export interface FontOption {
  /** i18n-free display name shown in the dropdown. */
  label: string;
  /** The CSS font-family value applied to --app-font. */
  value: string;
  /** 'fa' = Persian script, 'en' = Latin. Used only to group the dropdown. */
  script: 'fa' | 'en';
  /**
   * true  = ready to use (loaded in index.html via Google Fonts).
   * false = needs local @font-face files added to the project first.
   */
  ready: boolean;
}

/**
 * Fonts are a SEPARATE config from the theme on purpose: changing the font
 * never touches colors and vice-versa. FontService writes `value` to the
 * --app-font CSS variable.
 *
 * Vazirmatn, Inter, Roboto, Poppins and Open Sans are loaded out-of-the-box.
 * The remaining Persian faces are listed so the UI is complete — drop their
 * font files + an @font-face rule in styles.css and flip `ready` to true.
 */
export const FONT_OPTIONS: FontOption[] = [
  // Persian
  { label: 'وزیرمتن (Vazirmatn)', value: '"Vazirmatn", system-ui, sans-serif', script: 'fa', ready: true },
  { label: 'استعداد (Estedad)', value: '"Estedad", "Vazirmatn", sans-serif', script: 'fa', ready: false },
  { label: 'ساحل (Sahel)', value: '"Sahel", "Vazirmatn", sans-serif', script: 'fa', ready: false },
  { label: 'شبنم (Shabnam)', value: '"Shabnam", "Vazirmatn", sans-serif', script: 'fa', ready: false },
  { label: 'یکان بخ (Yekan Bakh)', value: '"YekanBakh", "Vazirmatn", sans-serif', script: 'fa', ready: false },
  // Latin
  { label: 'Inter', value: '"Inter", system-ui, sans-serif', script: 'en', ready: true },
  { label: 'Roboto', value: '"Roboto", system-ui, sans-serif', script: 'en', ready: true },
  { label: 'Poppins', value: '"Poppins", system-ui, sans-serif', script: 'en', ready: true },
  { label: 'Open Sans', value: '"Open Sans", system-ui, sans-serif', script: 'en', ready: true },
];

export function findFont(value: string): FontOption {
  return FONT_OPTIONS.find((f) => f.value === value) ?? FONT_OPTIONS[0];
}
