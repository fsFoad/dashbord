import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

/**
 * Catches UNCAUGHT runtime errors (template errors, event handlers, unhandled
 * promise rejections via provideBrowserGlobalErrorListeners). HTTP errors are
 * already toasted by the error interceptor, so they are only logged here.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly injector = inject(Injector);
  private lastToast = 0;

  handleError(error: unknown): void {
    // Always log the real error for developers.
    console.error('[GlobalErrorHandler]', error);

    if (this.isHttpError(error)) return; // interceptor already informed the user

    const now = Date.now();
    if (now - this.lastToast < 3_000) return; // avoid toast storms
    this.lastToast = now;

    try {
      this.injector.get(ToastService).error('errors.unexpected');
    } catch {
      /* toast infrastructure itself failed — nothing more we can do */
    }
  }

  private isHttpError(error: unknown): boolean {
    if (error instanceof HttpErrorResponse) return true;
    const rejection = (error as { rejection?: unknown })?.rejection;
    return rejection instanceof HttpErrorResponse;
  }
}
