import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
/** عدد را با جداکننده‌ی هزارگانِ فارسی نمایش می‌دهد. */
let FaNumberPipe = class FaNumberPipe {
    transform(value) {
        if (value == null || value === '')
            return '—';
        const n = Number(value);
        if (Number.isNaN(n))
            return String(value);
        return n.toLocaleString('fa-IR');
    }
};
FaNumberPipe = __decorate([
    Pipe({ name: 'faNumber' })
], FaNumberPipe);
export { FaNumberPipe };
/** مبلغ ریالی با جداکننده + واحد. */
let FaCurrencyPipe = class FaCurrencyPipe {
    transform(value, unit = '﷼') {
        if (value == null || value === '')
            return '—';
        const n = Number(value);
        if (Number.isNaN(n))
            return String(value);
        return `${n.toLocaleString('fa-IR')} ${unit}`;
    }
};
FaCurrencyPipe = __decorate([
    Pipe({ name: 'faCurrency' })
], FaCurrencyPipe);
export { FaCurrencyPipe };
/**
 * تاریخ را با اعداد فارسی نمایش می‌دهد. اگر ورودی از قبل رشته‌ی فارسی باشد،
 * همان را برمی‌گرداند؛ اگر Date یا قابل‌تبدیل باشد، با الگوی ساده فرمت می‌کند.
 * نکته: برای تقویم شمسیِ دقیق، بهتر است تاریخ از سرور به‌صورت رشته‌ی آماده بیاید.
 */
let FaDatePipe = class FaDatePipe {
    transform(value, withTime = false) {
        if (value == null || value === '')
            return '—';
        // اگر از قبل رشته‌ی فارسی/آماده است
        if (typeof value === 'string' && /[۰-۹]/.test(value))
            return value;
        const d = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(d.getTime()))
            return String(value);
        const date = d.toLocaleDateString('fa-IR');
        if (!withTime)
            return date;
        const time = d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
        return `${date} ${time}`;
    }
};
FaDatePipe = __decorate([
    Pipe({ name: 'faDate' })
], FaDatePipe);
export { FaDatePipe };
/** بله/خیر برای مقادیر بولی. */
let FaBooleanPipe = class FaBooleanPipe {
    transform(value) {
        return value ? 'بله' : 'خیر';
    }
};
FaBooleanPipe = __decorate([
    Pipe({ name: 'faBoolean' })
], FaBooleanPipe);
export { FaBooleanPipe };
