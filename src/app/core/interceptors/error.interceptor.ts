import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutError, catchError, retry, throwError, timeout, timer } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { SessionStore } from '../services/session.store';
import { NO_RETRY, SILENT_ERRORS, TIMEOUT_MS } from './http-context';

/** Statuses considered transient → eligible for automatic retry. */
const TRANSIENT = new Set([0, 502, 503, 504]);
const MAX_RETRIES = 2;

/** Map an HTTP status to an i18n error key. */
export function statusToKey(status: number): string {
  if (status === 0) return 'errors.network';
  if (status === 400 || status === 422) return 'errors.validation';
  if (status === 401) return 'errors.unauthorized';
  if (status === 403) return 'errors.forbidden';
  if (status === 404) return 'errors.notFound';
  if (status === 409) return 'errors.conflict';
  if (status === 429) return 'errors.tooMany';
  if (status >= 500) return 'errors.server';
  return 'errors.unknown';
}

/**
 * Complete centralized HTTP error handling:
 *  - per-request timeout (TIMEOUT_MS context, default 15s)
 *  - automatic retry with linear back-off for transient failures (GET only)
 *  - status → i18n message mapping, shown via the global toast
 *  - opt-outs per request: SILENT_ERRORS / NO_RETRY / TIMEOUT_MS
 *  - always rethrows, so callers can still react if they want to
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const session = inject(SessionStore);
  const router = inject(Router);
  const isApi = req.url.startsWith('/api/');

  return next(req).pipe(
    timeout(req.context.get(TIMEOUT_MS)),
    retry({
      count: MAX_RETRIES,
      delay: (error, retryCount) => {
        const retryable =
          isApi &&
          req.method === 'GET' &&
          !req.context.get(NO_RETRY) &&
          error instanceof HttpErrorResponse &&
          TRANSIENT.has(error.status);
        if (retryable) return timer(400 * retryCount);
        return throwError(() => error);
      },
    }),
    catchError((error: unknown) => {
      if (isApi && !req.context.get(SILENT_ERRORS)) {
        if (error instanceof TimeoutError) {
          toast.error('errors.timeout');
        } else if (error instanceof HttpErrorResponse) {
          // Prefer a human message provided by the backend, else map the status.
          const serverMsg = (error.error as { message?: string } | null)?.message;
          if (serverMsg) {
            toast.error('errors.serverMessage', { message: serverMsg });
          } else {
            toast.error(statusToKey(error.status));
          }
        } else {
          toast.error('errors.unknown');
        }
      }
      // Expired/invalid session anywhere outside the auth endpoints →
      // drop the session and send the user to the login page.
      if (
        isApi &&
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.startsWith('/api/auth/')
      ) {
        session.clear();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
