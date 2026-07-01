import { __decorate } from "tslib";
import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { SettingsStore } from './settings.store';
/** RTL languages (script direction is right-to-left). */
const RTL_LANGS = ['fa', 'ar'];
export const LANGUAGES = [
    { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷', flagSrc: '/flags/ir.svg' },
    { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧', flagSrc: '/flags/gb.svg' },
    { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦', flagSrc: '/flags/sa.svg' },
];
export function dirOf(lang) {
    return RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}
/**
 * Runtime language switching with Transloco + automatic direction handling.
 * RTL for Persian & Arabic, LTR otherwise. Updates <html lang> and <html dir>
 * so both our components and PrimeNG mirror correctly without a reload.
 */
let LanguageService = class LanguageService {
    settings = inject(SettingsStore);
    transloco = inject(TranslocoService);
    doc = inject(DOCUMENT);
    languages = LANGUAGES;
    constructor() {
        effect(() => {
            const lang = this.settings.language();
            this.transloco.setActiveLang(lang);
            const html = this.doc.documentElement;
            html.setAttribute('lang', lang);
            html.setAttribute('dir', dirOf(lang));
        });
    }
    /** Cycle through the available languages (used by the quick toggle). */
    toggle() {
        const order = LANGUAGES.map((l) => l.code);
        const i = order.indexOf(this.settings.language());
        this.settings.setLanguage(order[(i + 1) % order.length]);
    }
    set(lang) {
        this.settings.setLanguage(lang);
    }
};
LanguageService = __decorate([
    Injectable({ providedIn: 'root' })
], LanguageService);
export { LanguageService };
