import { Pipe, PipeTransform } from '@angular/core';

/** عدد را با جداکننده‌ی هزارگانِ فارسی نمایش می‌دهد. */
@Pipe({ name: 'faNumber' })
export class FaNumberPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value == null || value === '') return '—';
    const n = Number(value);
    if (Number.isNaN(n)) return String(value);
    return n.toLocaleString('fa-IR');
  }
}

/** مبلغ ریالی با جداکننده + واحد. */
@Pipe({ name: 'faCurrency' })
export class FaCurrencyPipe implements PipeTransform {
  transform(value: unknown, unit = '﷼'): string {
    if (value == null || value === '') return '—';
    const n = Number(value);
    if (Number.isNaN(n)) return String(value);
    return `${n.toLocaleString('fa-IR')} ${unit}`;
  }
}

/**
 * تاریخ را با اعداد فارسی نمایش می‌دهد. اگر ورودی از قبل رشته‌ی فارسی باشد،
 * همان را برمی‌گرداند؛ اگر Date یا قابل‌تبدیل باشد، با الگوی ساده فرمت می‌کند.
 * نکته: برای تقویم شمسیِ دقیق، بهتر است تاریخ از سرور به‌صورت رشته‌ی آماده بیاید.
 */
@Pipe({ name: 'faDate' })
export class FaDatePipe implements PipeTransform {
  transform(value: unknown, withTime = false): string {
    if (value == null || value === '') return '—';
    // اگر از قبل رشته‌ی فارسی/آماده است
    if (typeof value === 'string' && /[۰-۹]/.test(value)) return value;

    const d = value instanceof Date ? value : new Date(value as string);
    if (Number.isNaN(d.getTime())) return String(value);

    const date = d.toLocaleDateString('fa-IR');
    if (!withTime) return date;
    const time = d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  }
}

/** بله/خیر برای مقادیر بولی. */
@Pipe({ name: 'faBoolean' })
export class FaBooleanPipe implements PipeTransform {
  transform(value: unknown): string {
    return value ? 'بله' : 'خیر';
  }
}
