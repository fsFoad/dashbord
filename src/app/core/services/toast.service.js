var ToastService_1;
import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';
/**
 * Global toast facade. Accepts i18n KEYS (translated at call time so the
 * active language is always respected) and de-duplicates identical messages
 * fired in quick succession (e.g. several failing requests at once).
 */
let ToastService = class ToastService {
    static { ToastService_1 = this; }
    msg = inject(MessageService);
    t = inject(TranslocoService);
    /** key -> last shown timestamp, for dedupe. */
    recent = new Map();
    static DEDUPE_MS = 2_500;
    success(detailKey, params) {
        this.show('success', detailKey, params);
    }
    info(detailKey, params) {
        this.show('info', detailKey, params);
    }
    warn(detailKey, params) {
        this.show('warn', detailKey, params);
    }
    error(detailKey, params) {
        this.show('error', detailKey, params, 6_000);
    }
    show(severity, detailKey, params, life = 4_000) {
        const now = Date.now();
        const last = this.recent.get(detailKey) ?? 0;
        if (now - last < ToastService_1.DEDUPE_MS)
            return;
        this.recent.set(detailKey, now);
        this.msg.add({
            severity,
            summary: this.t.translate(`toast.${severity}`),
            detail: this.t.translate(detailKey, params),
            life,
        });
    }
};
ToastService = ToastService_1 = __decorate([
    Injectable({ providedIn: 'root' })
], ToastService);
export { ToastService };
