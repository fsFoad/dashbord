import { __decorate } from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
/**
 * Catches UNCAUGHT runtime errors (template errors, event handlers, unhandled
 * promise rejections via provideBrowserGlobalErrorListeners). HTTP errors are
 * already toasted by the error interceptor, so they are only logged here.
 */
let GlobalErrorHandler = class GlobalErrorHandler {
    injector = inject(Injector);
    lastToast = 0;
    handleError(error) {
        // Always log the real error for developers.
        console.error('[GlobalErrorHandler]', error);
        if (this.isHttpError(error))
            return; // interceptor already informed the user
        const now = Date.now();
        if (now - this.lastToast < 3_000)
            return; // avoid toast storms
        this.lastToast = now;
        try {
            this.injector.get(ToastService).error('errors.unexpected');
        }
        catch {
            /* toast infrastructure itself failed — nothing more we can do */
        }
    }
    isHttpError(error) {
        if (error instanceof HttpErrorResponse)
            return true;
        const rejection = error?.rejection;
        return rejection instanceof HttpErrorResponse;
    }
};
GlobalErrorHandler = __decorate([
    Injectable()
], GlobalErrorHandler);
export { GlobalErrorHandler };
