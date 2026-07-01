import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';
/** Promise-based wrapper over PrimeNG ConfirmationService with i18n. */
let ConfirmService = class ConfirmService {
    confirmation = inject(ConfirmationService);
    t = inject(TranslocoService);
    ask(opts) {
        return new Promise((resolve) => {
            this.confirmation.confirm({
                header: this.t.translate(opts.titleKey ?? 'confirm.title'),
                message: this.t.translate(opts.messageKey, opts.messageParams),
                icon: opts.icon ?? 'pi pi-exclamation-triangle',
                acceptLabel: this.t.translate('confirm.accept'),
                rejectLabel: this.t.translate('confirm.reject'),
                acceptButtonStyleClass: opts.destructive ? 'p-button-danger' : undefined,
                rejectButtonStyleClass: 'p-button-text',
                accept: () => resolve(true),
                reject: () => resolve(false),
            });
        });
    }
    /** Common case: confirm deletion of a named item. */
    delete(itemName) {
        return this.ask({
            titleKey: 'confirm.deleteTitle',
            messageKey: 'confirm.deleteMessage',
            messageParams: { item: itemName },
            destructive: true,
        });
    }
};
ConfirmService = __decorate([
    Injectable({ providedIn: 'root' })
], ConfirmService);
export { ConfirmService };
