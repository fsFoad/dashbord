export interface FontOption {
  /** Display name shown in the dropdown. */
  label: string;
  /** The CSS font-family value applied to --app-font. */
  value: string;
  /** 'fa' = Persian script, 'en' = Latin. Used only to group the dropdown. */
  script: 'fa' | 'en';
  /**
   * true  = available immediately (bundled or loaded in index.html).
   * false = loaded ON DEMAND from `cssUrl` the first time it's selected.
   *         The CLIENT INSTALLS NOTHING — it's a normal web font (@font-face),
   *         fetched by the browser just like the rest of the site's assets.
   */
  ready: boolean;
  /**
   * Optional CDN stylesheet that declares the @font-face rules. When set,
   * FontLoaderService injects it the first time the font is picked, so the
   * font works even though it isn't bundled. Omit for commercial faces that
   * can't be hotlinked — those still need local files.
   */
  cssUrl?: string;
}

/**
 * Fonts are a SEPARATE config from the theme on purpose: changing the font
 * never touches colors and vice-versa. FontService writes `value` to the
 * --app-font CSS variable; FontLoaderService fetches `cssUrl` on demand.
 *
 * Persian webfonts are served from jsDelivr (open-source, by @rastikerdar /
 * @aminabedi68). To pin them offline, download the dist folders into
 * /public/fonts and replace cssUrl with a local path.
 */
export const FONT_OPTIONS: FontOption[] = [
  // Persian
  { label: 'وزیرمتن (Vazirmatn)', value: '"Vazirmatn", system-ui, sans-serif', script: 'fa', ready: true },
  {
    label: 'استعداد (Estedad)', value: '"Estedad", "Vazirmatn", sans-serif', script: 'fa', ready: false,
    cssUrl: 'https://cdn.jsdelivr.net/gh/aminabedi68/Estedad@v7.3.0/dist/Estedad-FD/Estedad-FD.css',
  },
  {
    label: 'ساحل (Sahel)', value: '"Sahel", "Vazirmatn", sans-serif', script: 'fa', ready: false,
    cssUrl: 'https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css',
  },
  {
    label: 'شبنم (Shabnam)', value: '"Shabnam", "Vazirmatn", sans-serif', script: 'fa', ready: false,
    cssUrl: 'https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css',
  },
  // Commercial — needs local files, so no cssUrl:
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

/** A font is usable if it's ready OR we can fetch it on demand. */
export function isFontUsable(f: FontOption): boolean {
  return f.ready || !!f.cssUrl;
}
