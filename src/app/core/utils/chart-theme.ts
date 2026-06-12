import { JALALI_MONTHS } from './jalali';

/** Read a PrimeNG design-token CSS variable at runtime. */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const FA_WEEKDAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
export const EN_WEEKDAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function monthLabels(lang: 'fa' | 'en'): string[] {
  return lang === 'fa' ? JALALI_MONTHS : EN_MONTHS;
}
export function weekdayLabels(lang: 'fa' | 'en'): string[] {
  return lang === 'fa' ? FA_WEEKDAYS : EN_WEEKDAYS;
}

/** Chart.js options matching the active theme, dark mode and direction. */
export function baseChartOptions(rtl: boolean): Record<string, unknown> {
  const text = cssVar('--p-text-muted-color') || '#64748b';
  const grid = cssVar('--p-content-border-color') || 'rgba(128,128,128,.2)';
  const font = { family: 'var(--app-font)' };
  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        rtl,
        labels: { color: text, font, usePointStyle: true, boxWidth: 8 },
      },
      tooltip: { rtl, textDirection: rtl ? 'rtl' : 'ltr' },
    },
    scales: {
      x: { ticks: { color: text, font }, grid: { color: grid, drawBorder: false } },
      y: { ticks: { color: text, font }, grid: { color: grid, drawBorder: false } },
    },
  };
}

/** Primary ramp colors for datasets. */
export function chartColors(): { primary: string; primarySoft: string; series: string[] } {
  const primary = cssVar('--p-primary-500') || '#6366f1';
  return {
    primary,
    primarySoft: cssVar('--p-primary-100') || '#e0e7ff',
    series: [
      primary,
      cssVar('--p-primary-300') || '#a5b4fc',
      cssVar('--p-primary-700') || '#4338ca',
    ],
  };
}
