import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStore } from '../services/session.store';

/** Attaches the bearer token to every /api request. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) return next(req);
  const token = inject(SessionStore).token();
  return next(
    token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req,
  );
};
