import { Injectable } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';

/**
 * Holds detached route components (one per open tab) so switching tabs keeps
 * each page ALIVE — signals, filters, scroll and charts all survive.
 * TabsService clears entries when tabs close; everything is destroyed on
 * user switch to prevent leaks and cross-user state.
 */
@Injectable({ providedIn: 'root' })
export class RouteCacheService {
  private readonly handles = new Map<string, DetachedRouteHandle>();

  has(key: string): boolean {
    return this.handles.has(key);
  }

  get(key: string): DetachedRouteHandle | null {
    return this.handles.get(key) ?? null;
  }

  store(key: string, handle: DetachedRouteHandle): void {
    this.handles.set(key, handle);
  }

  /** Remove ONE cached page and properly destroy its component tree. */
  clear(key: string): void {
    this.destroy(this.handles.get(key));
    this.handles.delete(key);
  }

  /** Drop everything (called on user change / logout). */
  clearAll(): void {
    for (const h of this.handles.values()) this.destroy(h);
    this.handles.clear();
  }

  private destroy(handle: DetachedRouteHandle | undefined): void {
    // Angular stores the ComponentRef on the handle; destroying it runs
    // ngOnDestroy / DestroyRef callbacks and releases DOM + subscriptions.
    const ref = (handle as { componentRef?: { destroy(): void } } | undefined)?.componentRef;
    try {
      ref?.destroy();
    } catch {
      /* already destroyed */
    }
  }
}
