/**
 * Release history — the single source of truth for the app version.
 *
 * Developer workflow (best practice):
 *  1. Ship a release → add a new object to the TOP of CHANGELOG.
 *  2. APP_VERSION / APP_RELEASE_DATE derive automatically from it.
 *  3. Users who had seen an older version get the "What's new" dialog
 *     exactly once (handled by WhatsNewService, per user).
 *
 * Entries are bilingual on purpose: the changelog is authored by developers,
 * not translators, so keeping fa/en together beats scattering i18n keys.
 */
export type ChangeType = 'feature' | 'improvement' | 'fix';

export interface ChangelogEntry {
  type: ChangeType;
  fa: string;
  en: string;
}

export interface Release {
  version: string;
  /** ISO date of the release. */
  date: string;
  entries: ChangelogEntry[];
}

export const CHANGELOG: Release[] = [
  {
    version: '1.1.0',
    date: '2026-06-13',
    entries: [
      { type: 'fix', fa: 'حفظ کامل وضعیت هر صفحه هنگام جابه‌جایی بین تب‌ها (فیلترها، اسکرول و نمودارها دیگر از بین نمی‌روند)', en: 'Each tab now fully preserves its state when switching (filters, scroll and charts no longer reset)' },
      { type: 'feature', fa: 'دانلود خودکار فونت‌های فارسی هنگام انتخاب، بدون نیاز به نصب چیزی روی دستگاه', en: 'On-demand download of Persian fonts when selected — nothing to install on the device' },
      { type: 'feature', fa: 'امکان ورود (Import) فایل تنظیمات کنار خروجی گرفتن', en: 'Import a settings file alongside export' },
      { type: 'improvement', fa: 'حالت تیره‌ی سرمه‌ای به‌جای مشکی، به‌صورت پیش‌فرض', en: 'Navy dark mode by default instead of near-black' },
      { type: 'improvement', fa: 'اعمال واقعی حالت فشرده (Compact) روی جدول‌ها و منوها', en: 'Compact density now genuinely applies to tables and menus' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-06-12',
    entries: [
      { type: 'feature', fa: 'جستجوی سراسری و دستورات سریع با Ctrl+K', en: 'Global command palette with Ctrl+K' },
      { type: 'feature', fa: 'تب‌های چندگانه داخل برنامه با ذخیره‌سازی برای هر کاربر', en: 'In-app multi-tab with per-user persistence' },
      { type: 'feature', fa: 'تور معرفی امکانات برای کاربران جدید', en: 'Onboarding tour for new users' },
      { type: 'feature', fa: 'قابلیت نصب به‌صورت اپلیکیشن (PWA)', en: 'Installable as an app (PWA)' },
      { type: 'improvement', fa: 'بهبود فاصله‌گذاری دیالوگ‌ها و پنل‌ها در سراسر برنامه', en: 'More comfortable spacing across dialogs and panels' },
    ],
  },
  {
    version: '0.9.0',
    date: '2026-06-11',
    entries: [
      { type: 'feature', fa: 'مرکز اعلان‌ها با دریافت زنده (WebSocket)', en: 'Notification center with live (WebSocket) delivery' },
      { type: 'feature', fa: 'تقویم رویدادها با پشتیبانی کامل شمسی', en: 'Event calendar with full Jalali support' },
      { type: 'feature', fa: 'مدیریت تیم: نقش‌ها، دعوت عضو و فعال/غیرفعال‌سازی', en: 'Team management: roles, invitations and activation' },
      { type: 'feature', fa: 'مدیریت فایل‌ها با نمای شبکه‌ای و فهرستی', en: 'File manager with grid and list views' },
    ],
  },
  {
    version: '0.8.0',
    date: '2026-06-10',
    entries: [
      { type: 'feature', fa: 'برد کانبان با کشیدن و رهاکردن آنی (Optimistic)', en: 'Kanban board with optimistic drag & drop' },
      { type: 'feature', fa: 'نمودار گانت با برچسب ماه‌های شمسی', en: 'Gantt chart with Jalali month labels' },
      { type: 'feature', fa: 'داشبورد ویجتی با چیدمان قابل شخصی‌سازی', en: 'Widget dashboard with customizable layout' },
      { type: 'fix', fa: 'رفع اشکال نمایش بردکرامب در اولین بارگذاری', en: 'Fixed breadcrumb crash on first render' },
    ],
  },
];

export const APP_VERSION = CHANGELOG[0].version;
export const APP_RELEASE_DATE = CHANGELOG[0].date;
