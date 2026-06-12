import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsStore } from '../../core/services/settings.store';
import { faDigits, formatDate, pad2 } from '../../core/utils/jalali';

/**
 * Formats a Date/ISO string in the calendar of the ACTIVE language:
 * fa → Jalali (Persian digits), en → Gregorian.
 * Impure so values re-render when the language switches at runtime.
 */
@Pipe({ name: 'appDate', pure: false })
export class LocalizedDatePipe implements PipeTransform {
  private readonly settings = inject(SettingsStore);

  transform(value: string | Date | null | undefined, withTime = false): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(d.getTime())) return '';
    const jalali = this.settings.language() === 'fa';
    let out = formatDate(d, jalali ? 'jalali' : 'gregorian');
    if (withTime) {
      const t = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
      out += ` ${jalali ? faDigits(t) : t}`;
    }
    return out;
  }
}
