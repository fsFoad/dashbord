import { InjectionToken } from '@angular/core';
import { DEFAULT_TABLE_CONFIG } from './data-table.model';
/**
 * توکن تزریق برای تنظیمات سراسری تیبل. در app.config.ts با provideTableDefaults
 * مقداردهی می‌شود تا همه‌ی تیبل‌ها این پیش‌فرض‌ها را بگیرند. هر تیبل می‌تواند
 * با input [config] این‌ها را به‌صورت موضعی override کند.
 */
export const TABLE_DEFAULTS = new InjectionToken('TABLE_DEFAULTS', {
    providedIn: 'root',
    factory: () => DEFAULT_TABLE_CONFIG,
});
/**
 * هِلپر برای ثبت تنظیمات سراسری تیبل در app.config.ts.
 *
 * مثال:
 *   providers: [
 *     provideTableDefaults({ rows: 15, striped: true, size: 'small' })
 *   ]
 */
export function provideTableDefaults(config) {
    return {
        provide: TABLE_DEFAULTS,
        useValue: { ...DEFAULT_TABLE_CONFIG, ...config },
    };
}
