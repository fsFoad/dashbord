import { environment } from '../../../environments/environment';

/**
 * کنترل منبع داده به‌ازای هر بخش مستقل از هم.
 * true  → داده از mock داخل فرانت خوانده می‌شود (بدون نیاز به بک‌اند)
 * false → داده از API واقعی دریافت می‌شود
 *
 * مقدار پیش‌فرض از environment.useMock گرفته می‌شود اما هر بخش را
 * می‌توان مستقل تنظیم کرد:
 *   portalInfo: false   → فقط این بخش به بک‌اند وصل شود
 */
export const DATA_SOURCE = {
  /** اطلاعات پنل چپ صفحه لاگین (لوگو، نام، توضیحات، فیچرها) */
  portalInfo: environment.useMock,
} as const;
