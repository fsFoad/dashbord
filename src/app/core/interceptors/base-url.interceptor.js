import { environment } from '../../../environments/environment';
/**
 * Prefixes relative /api/* URLs with the configured backend base URL when the
 * app is NOT using the mock. With the mock on, URLs stay relative so the mock
 * interceptor matches them. This is the single seam between mock and real API.
 */
export const baseUrlInterceptor = (req, next) => {
    if (environment.useMock || !req.url.startsWith('/api/') || !environment.apiBaseUrl) {
        return next(req);
    }
    return next(req.clone({ url: environment.apiBaseUrl.replace(/\/$/, '') + req.url }));
};
