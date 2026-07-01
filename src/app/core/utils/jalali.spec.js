import { describe, expect, it } from 'vitest';
import { dateToJalali, faDigits, formatDate, isLeapJalali, jalaliMonthLength, jalaliToDate, pad2, } from './jalali';
describe('jalali date conversion', () => {
    it('converts known Gregorian → Jalali dates', () => {
        // 2024-03-20 is Nowruz 1403/01/01
        expect(dateToJalali(new Date(2024, 2, 20))).toEqual({ y: 1403, m: 1, d: 1 });
        // 2026-01-01 → 1404/10/11
        expect(dateToJalali(new Date(2026, 0, 1))).toEqual({ y: 1404, m: 10, d: 11 });
    });
    it('round-trips Jalali → Gregorian → Jalali', () => {
        for (const [y, m, d] of [[1403, 1, 1], [1404, 10, 11], [1399, 12, 30], [1402, 6, 31]]) {
            const g = jalaliToDate(y, m, d);
            expect(dateToJalali(g)).toEqual({ y, m, d });
        }
    });
    it('returns Date at noon to avoid DST edge cases', () => {
        expect(jalaliToDate(1403, 1, 1).getHours()).toBe(12);
    });
    it('knows month lengths', () => {
        expect(jalaliMonthLength(1403, 1)).toBe(31); // first 6 months
        expect(jalaliMonthLength(1403, 8)).toBe(30); // months 7-11
        expect(jalaliMonthLength(1402, 12)).toBe(29); // common year esfand
        expect(jalaliMonthLength(1403, 12)).toBe(30); // 1403 is leap → 30
    });
    it('identifies leap years', () => {
        expect(isLeapJalali(1403)).toBe(true);
        expect(isLeapJalali(1402)).toBe(false);
    });
    it('formats dates per calendar with correct digits', () => {
        const d = new Date(2024, 2, 20);
        expect(formatDate(d, 'gregorian')).toBe('2024/03/20');
        expect(formatDate(d, 'jalali')).toBe('۱۴۰۳/۰۱/۰۱'); // Persian digits
    });
    it('converts digits and pads', () => {
        expect(faDigits('2026')).toBe('۲۰۲۶');
        expect(faDigits(7)).toBe('۷');
        expect(pad2(3)).toBe('03');
        expect(pad2(11)).toBe('11');
    });
});
