import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';
import { RouteCacheService } from '../services/route-cache.service';

/** Stable identity of a tab page = its full path (query params ignored). */
export function routeKey(route: ActivatedRouteSnapshot): string {
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
@Injectable()
export class TabReuseStrategy implements RouteReuseStrategy {
  private readonly cache = inject(RouteCacheService);

  private isTabPage(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!route.data?.['titleKey'];
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isTabPage(route);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (handle && this.isTabPage(route)) {
      this.cache.store(routeKey(route), handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.isTabPage(route) && this.cache.has(routeKey(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!this.isTabPage(route)) return null;
    return this.cache.get(routeKey(route));
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
