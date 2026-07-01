import { __decorate } from "tslib";
import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { findFont } from '../config/fonts.config';
import { FontLoaderService } from './font-loader.service';
import { SettingsStore } from './settings.store';
/** Applies the selected font (independent of the color theme) to --app-font. */
let FontService = class FontService {
    settings = inject(SettingsStore);
    loader = inject(FontLoaderService);
    doc = inject(DOCUMENT);
    constructor() {
        effect(() => {
            const value = this.settings.fontFamily();
            // Make sure on-demand fonts are fetched (no-op for ready fonts), then apply.
            void this.loader.ensure(findFont(value));
            this.doc.documentElement.style.setProperty('--app-font', value);
        });
    }
};
FontService = __decorate([
    Injectable({ providedIn: 'root' })
], FontService);
export { FontService };
