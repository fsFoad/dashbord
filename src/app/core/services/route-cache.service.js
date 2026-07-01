import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
/**
 * Holds detached route components (one per open tab) so switching tabs keeps
 * each page ALIVE — signals, filters, scroll and charts all survive.
 * TabsService clears entries when tabs close; everything is destroyed on
 * user switch to prevent leaks and cross-user state.
 */
let RouteCacheService = class RouteCacheService {
    handles = new Map();
    has(key) {
        return this.handles.has(key);
    }
    get(key) {
        return this.handles.get(key) ?? null;
    }
    store(key, handle) {
        this.handles.set(key, handle);
    }
    /** Remove ONE cached page and properly destroy its component tree. */
    clear(key) {
        this.destroy(this.handles.get(key));
        this.handles.delete(key);
    }
    /** Drop everything (called on user change / logout). */
    clearAll() {
        for (const h of this.handles.values())
            this.destroy(h);
        this.handles.clear();
    }
    destroy(handle) {
        // Angular stores the ComponentRef on the handle; destroying it runs
        // ngOnDestroy / DestroyRef callbacks and releases DOM + subscriptions.
        const ref = handle?.componentRef;
        try {
            ref?.destroy();
        }
        catch {
            /* already destroyed */
        }
    }
};
RouteCacheService = __decorate([
    Injectable({ providedIn: 'root' })
], RouteCacheService);
export { RouteCacheService };
