/**
 * Development / default environment.
 *
 *   useMock    → when true, requests to /api/* are served by the in-app mock
 *                interceptor. Set false to hit a real backend.
 *   apiBaseUrl → prepended to /api/* paths when useMock is false
 *                (e.g. 'https://api.example.com'). Leave '' for same-origin.
 *
 * Switching to a real backend is a ONE-LINE change: set useMock: false and
 * point apiBaseUrl at your server. No component or service changes needed —
 * they all call '/api/...' exactly as before.
 */
export const environment = {
    production: false,
    useMock: true,
    apiBaseUrl: '',
};
