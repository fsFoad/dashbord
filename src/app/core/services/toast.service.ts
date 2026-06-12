import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@jsverse/transloco';

type Severity = 'success' | 'info' | 'warn' | 'error';

/**
 * Global toast facade. Accepts i18n KEYS (translated at call time so the
 * active language is always respected) and de-duplicates identical messages
 * fired in quick succession (e.g. several failing requests at once).
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly msg = inject(MessageService);
  private readonly t = inject(TranslocoService);

  /** key -> last shown timestamp, for dedupe. */
  private readonly recent = new Map<string, number>();
  private static readonly DEDUPE_MS = 2_500;

  success(detailKey: string, params?: Record<string, unknown>): void {
    this.show('success', detailKey, params);
  }
  info(detailKey: string, params?: Record<string, unknown>): void {
    this.show('info', detailKey, params);
  }
  warn(detailKey: string, params?: Record<string, unknown>): void {
    this.show('warn', detailKey, params);
  }
  error(detailKey: string, params?: Record<string, unknown>): void {
    this.show('error', detailKey, params, 6_000);
  }

  private show(
    severity: Severity,
    detailKey: string,
    params?: Record<string, unknown>,
    life = 4_000,
  ): void {
    const now = Date.now();
    const last = this.recent.get(detailKey) ?? 0;
    if (now - last < ToastService.DEDUPE_MS) return;
    this.recent.set(detailKey, now);

    this.msg.add({
      severity,
      summary: this.t.translate(`toast.${severity}`),
      detail: this.t.translate(detailKey, params),
      life,
    });
  }
}
