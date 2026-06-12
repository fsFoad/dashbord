import { HttpContextToken } from '@angular/common/http';

/** Suppress the global error toast for this request (caller handles errors). */
export const SILENT_ERRORS = new HttpContextToken<boolean>(() => false);

/** Exclude this request from the global loading indicator. */
export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

/** Disable automatic retry for this request. */
export const NO_RETRY = new HttpContextToken<boolean>(() => false);

/** Per-request timeout in milliseconds. */
export const TIMEOUT_MS = new HttpContextToken<number>(() => 15_000);
