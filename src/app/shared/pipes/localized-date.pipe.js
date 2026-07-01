import { __decorate } from "tslib";
import { Pipe, inject } from '@angular/core';
import { SettingsStore } from '../../core/services/settings.store';
import { faDigits, formatDate, pad2 } from '../../core/utils/jalali';
/**
 * Formats a Date/ISO string in the calendar of the ACTIVE language:
 * fa → Jalali (Persian digits), en → Gregorian.
 * Impure so values re-render when the language switches at runtime.
 */
let LocalizedDatePipe = class LocalizedDatePipe {
    settings = inject(SettingsStore);
    transform(value, withTime = false) {
        if (!value)
            return '';
        const d = typeof value === 'string' ? new Date(value) : value;
        if (isNaN(d.getTime()))
            return '';
        const jalali = this.settings.language() === 'fa';
        let out = formatDate(d, jalali ? 'jalali' : 'gregorian');
        if (withTime) {
            const t = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
            out += ` ${jalali ? faDigits(t) : t}`;
        }
        return out;
    }
};
LocalizedDatePipe = __decorate([
    Pipe({ name: 'appDate', pure: false })
], LocalizedDatePipe);
export { LocalizedDatePipe };
