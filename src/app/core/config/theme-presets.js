/**
 * Color themes. Each maps the semantic `primary` palette to one of PrimeNG's
 * built-in primitive color ramps (token references like '{indigo.500}').
 * ThemeService feeds these into updatePrimaryPalette() at runtime, so a
 * change instantly affects the layout, our custom components AND PrimeNG.
 *
 * There are 12 here (>10 as requested). Add more by referencing any
 * primitive ramp shipped with Aura: slate, gray, zinc, neutral, stone, red,
 * orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo,
 * violet, purple, fuchsia, pink, rose.
 */
function ramp(name) {
    return {
        50: `{${name}.50}`,
        100: `{${name}.100}`,
        200: `{${name}.200}`,
        300: `{${name}.300}`,
        400: `{${name}.400}`,
        500: `{${name}.500}`,
        600: `{${name}.600}`,
        700: `{${name}.700}`,
        800: `{${name}.800}`,
        900: `{${name}.900}`,
        950: `{${name}.950}`,
    };
}
export const THEME_PRESETS = [
    { key: 'indigo', swatch: '#6366f1', palette: ramp('indigo') },
    { key: 'blue', swatch: '#3b82f6', palette: ramp('blue') },
    { key: 'sky', swatch: '#0ea5e9', palette: ramp('sky') },
    { key: 'cyan', swatch: '#06b6d4', palette: ramp('cyan') },
    { key: 'teal', swatch: '#14b8a6', palette: ramp('teal') },
    { key: 'emerald', swatch: '#10b981', palette: ramp('emerald') },
    { key: 'green', swatch: '#22c55e', palette: ramp('green') },
    { key: 'amber', swatch: '#f59e0b', palette: ramp('amber') },
    { key: 'orange', swatch: '#f97316', palette: ramp('orange') },
    { key: 'rose', swatch: '#f43f5e', palette: ramp('rose') },
    { key: 'violet', swatch: '#8b5cf6', palette: ramp('violet') },
    { key: 'purple', swatch: '#a855f7', palette: ramp('purple') },
];
/** Hand-tuned navy ramp: dark mode becomes deep blue instead of near-black. */
const NAVY = {
    50: '#f4f7fb', 100: '#e6ecf5', 200: '#cdd9ec', 300: '#a9bdd9', 400: '#7f97bd',
    500: '#5e75a0', 600: '#485d85', 700: '#3a4a6b', 800: '#232f4e', 900: '#16203c',
    950: '#0d1530',
};
export const SURFACE_PALETTES = [
    { key: 'navy', swatch: '#16203c', palette: NAVY },
    { key: 'slate', swatch: '#64748b', palette: ramp('slate') },
    { key: 'gray', swatch: '#6b7280', palette: ramp('gray') },
    { key: 'zinc', swatch: '#71717a', palette: ramp('zinc') },
    { key: 'neutral', swatch: '#737373', palette: ramp('neutral') },
    { key: 'stone', swatch: '#78716c', palette: ramp('stone') },
];
export function findPreset(key) {
    return THEME_PRESETS.find((p) => p.key === key) ?? THEME_PRESETS[0];
}
export function findSurface(key) {
    return SURFACE_PALETTES.find((s) => s.key === key) ?? SURFACE_PALETTES[0];
}
