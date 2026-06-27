import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { SettingsStore } from './settings.store';
import { AppLanguage } from '../models/settings.model';

/** RTL languages (script direction is right-to-left). */
const RTL_LANGS: AppLanguage[] = ['fa', 'ar'];

export interface LanguageMeta {
  code: AppLanguage;
  /** native endonym shown in the picker */
  label: string;
  dir: 'rtl' | 'ltr';
  flag: string;
  /** Path to an SVG flag (renders consistently across all OSes, unlike emoji). */
  flagSrc: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷', flagSrc: '/flags/ir.svg' },
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇬🇧', flagSrc: '/flags/gb.svg' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦', flagSrc: '/flags/sa.svg' },
];

export function dirOf(lang: AppLanguage): 'rtl' | 'ltr' {
  return RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}

/**
 * Runtime language switching with Transloco + automatic direction handling.
 * RTL for Persian & Arabic, LTR otherwise. Updates <html lang> and <html dir>
 * so both our components and PrimeNG mirror correctly without a reload.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly settings = inject(SettingsStore);
  private readonly transloco = inject(TranslocoService);
  private readonly doc = inject(DOCUMENT);

  readonly languages = LANGUAGES;

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
  toggle(): void {
    const order = LANGUAGES.map((l) => l.code);
    const i = order.indexOf(this.settings.language());
    this.settings.setLanguage(order[(i + 1) % order.length]);
  }

  set(lang: AppLanguage): void {
    this.settings.setLanguage(lang);
  }
}
