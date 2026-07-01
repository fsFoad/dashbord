import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/** Loads /assets/i18n/<lang>.json at runtime. */
let TranslocoHttpLoader = class TranslocoHttpLoader {
    http = inject(HttpClient);
    getTranslation(lang) {
        return this.http.get(`/assets/i18n/${lang}.json`);
    }
};
TranslocoHttpLoader = __decorate([
    Injectable({ providedIn: 'root' })
], TranslocoHttpLoader);
export { TranslocoHttpLoader };
