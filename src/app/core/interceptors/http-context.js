import { HttpContextToken } from '@angular/common/http';
/** Suppress the global error toast for this request (caller handles errors). */
export const SILENT_ERRORS = new HttpContextToken(() => false);
/** Exclude this request from the global loading indicator. */
export const SKIP_LOADING = new HttpContextToken(() => false);
/** Disable automatic retry for this request. */
export const NO_RETRY = new HttpContextToken(() => false);
/** Per-request timeout in milliseconds. */
export const TIMEOUT_MS = new HttpContextToken(() => 15_000);
