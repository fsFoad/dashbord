import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { SettingsStore } from './settings.store';

/** Applies the selected font (independent of the color theme) to --app-font. */
@Injectable({ providedIn: 'root' })
export class FontService {
  private readonly settings = inject(SettingsStore);
  private readonly doc = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.doc.documentElement.style.setProperty('--app-font', this.settings.fontFamily());
    });
  }
}
