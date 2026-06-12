import { Injectable, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';

export interface ConfirmOptions {
  titleKey?: string;
  messageKey: string;
  messageParams?: Record<string, unknown>;
  icon?: string;
  /** Renders the accept button as destructive (red). */
  destructive?: boolean;
}

/** Promise-based wrapper over PrimeNG ConfirmationService with i18n. */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly confirmation = inject(ConfirmationService);
  private readonly t = inject(TranslocoService);

  ask(opts: ConfirmOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
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
  delete(itemName: string): Promise<boolean> {
    return this.ask({
      titleKey: 'confirm.deleteTitle',
      messageKey: 'confirm.deleteMessage',
      messageParams: { item: itemName },
      destructive: true,
    });
  }
}
