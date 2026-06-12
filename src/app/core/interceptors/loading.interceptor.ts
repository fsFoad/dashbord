import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { SKIP_LOADING } from './http-context';

/** Tracks /api/* requests in the LoadingService (assets/i18n are ignored). */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/') || req.context.get(SKIP_LOADING)) {
    return next(req);
  }
  const loading = inject(LoadingService);
  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};
