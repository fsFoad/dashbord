/**
 * Fonts are a SEPARATE config from the theme on purpose: changing the font
 * never touches colors and vice-versa. FontService writes `value` to the
 * --app-font CSS variable; FontLoaderService fetches `cssUrl` on demand.
 *
 * Persian webfonts are served from jsDelivr (open-source, by @rastikerdar /
 * @aminabedi68). To pin them offline, download the dist folders into
 * /public/fonts and replace cssUrl with a local path.
 */
export const FONT_OPTIONS = [
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
export function findFont(value) {
    return FONT_OPTIONS.find((f) => f.value === value) ?? FONT_OPTIONS[0];
}
/** A font is usable if it's ready OR we can fetch it on demand. */
export function isFontUsable(f) {
    return f.ready || !!f.cssUrl;
}
