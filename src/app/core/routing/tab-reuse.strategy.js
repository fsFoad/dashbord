import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { RouteCacheService } from '../services/route-cache.service';
/** Stable identity of a tab page = its full path (query params ignored). */
export function routeKey(route) {
    const path = route.pathFromRoot
        .flatMap((r) => r.url.map((seg) => seg.path))
        .filter(Boolean)
        .join('/');
    return '/' + path;
}
/**
 * Browser-like tabs need browser-like pages: leaving a tab DETACHES its
 * component (kept alive in RouteCacheService) instead of destroying it, and
 * returning re-ATTACHES the very same instance — so Signals state persists.
 *
 * Opt-in criterion: only leaf routes that carry `data.titleKey` (exactly the
 * routes the tab bar tracks). Auth / error / site pages are untouched.
 */
let TabReuseStrategy = class TabReuseStrategy {
    cache = inject(RouteCacheService);
    isTabPage(route) {
        return !!route.routeConfig && !!route.data?.['titleKey'];
    }
    shouldDetach(route) {
        return this.isTabPage(route);
    }
    store(route, handle) {
        if (handle && this.isTabPage(route)) {
            this.cache.store(routeKey(route), handle);
        }
    }
    shouldAttach(route) {
        return this.isTabPage(route) && this.cache.has(routeKey(route));
    }
    retrieve(route) {
        if (!this.isTabPage(route))
            return null;
        return this.cache.get(routeKey(route));
    }
    shouldReuseRoute(future, curr) {
        return future.routeConfig === curr.routeConfig;
    }
};
TabReuseStrategy = __decorate([
    Injectable()
], TabReuseStrategy);
export { TabReuseStrategy };
