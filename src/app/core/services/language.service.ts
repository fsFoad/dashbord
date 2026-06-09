import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { SettingsStore } from './settings.store';
import { AppLanguage } from '../models/settings.model';

/**
 * Runtime language switching with Transloco + automatic direction handling.
 * Persian => RTL, others => LTR. Updates <html lang> and <html dir> so both
 * our components and PrimeNG mirror correctly without a reload.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly settings = inject(SettingsStore);
  private readonly transloco = inject(TranslocoService);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const lang = this.settings.language();
      const dir = lang === 'fa' ? 'rtl' : 'ltr';

      this.transloco.setActiveLang(lang);

      const html = this.doc.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', dir);
    });
  }

  toggle(): void {
    this.settings.setLanguage(this.settings.language() === 'fa' ? 'en' : 'fa');
  }

  set(lang: AppLanguage): void {
    this.settings.setLanguage(lang);
  }
}
