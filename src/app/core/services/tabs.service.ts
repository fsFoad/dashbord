import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';

export interface AppTab {
  /** identity = pathname (query ignored) */
  key: string;
  /** full url to restore (latest query params included) */
  url: string;
  titleKey: string;
  closable: boolean;
}

const HOME: AppTab = { key: '/dashboard', url: '/dashboard', titleKey: 'menu.dashboard.overview', closable: false };
const MAX_TABS = 8;
const EXCLUDED = ['/auth', '/site', '/404', '/403', '/500'];
const keyFor = (uid: number) => `app.tabs.${uid}`;

/**
 * Browser-style multi-tab INSIDE the app, implemented purely with Signals
 * behind this facade (swappable for NgRx later without touching consumers).
 * Every visited dashboard page becomes a tab; tabs persist per user.
 */
@Injectable({ providedIn: 'root' })
export class TabsService {
  private readonly router = inject(Router);
  private readonly session = inject(SessionStore);
  private readonly storage = inject(StorageService);

  private readonly _tabs = signal<AppTab[]>([HOME]);
  readonly tabs = this._tabs.asReadonly();
  readonly activeKey = signal<string>(HOME.key);

  readonly count = computed(() => this._tabs().length);

  constructor() {
    // restore per user
    effect(() => {
      const u = this.session.user();
      const saved = u ? this.storage.read<AppTab[]>(keyFor(u.id), [HOME]) : [HOME];
      const tabs = saved.length ? saved : [HOME];
      if (!tabs.some((t) => t.key === HOME.key)) tabs.unshift(HOME);
      this._tabs.set(tabs.slice(0, MAX_TABS));
    });

    // persist
    effect(() => {
      const u = this.session.user();
      if (u) this.storage.write(keyFor(u.id), this._tabs());
    });

    // track navigation → upsert tab
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe((e) => this.track((e as NavigationEnd).urlAfterRedirects));
  }

  activate(tab: AppTab): void {
    this.router.navigateByUrl(tab.url);
  }

  close(key: string): void {
    const tabs = this._tabs();
    const idx = tabs.findIndex((t) => t.key === key);
    if (idx < 0 || !tabs[idx].closable) return;

    const next = tabs.filter((t) => t.key !== key);
    this._tabs.set(next);

    if (this.activeKey() === key) {
      const fallback = next[Math.min(idx, next.length - 1)] ?? HOME;
      this.router.navigateByUrl(fallback.url);
    }
  }

  closeOthers(key: string): void {
    this._tabs.update((tabs) => tabs.filter((t) => !t.closable || t.key === key));
    const keep = this._tabs().find((t) => t.key === key);
    if (keep) this.router.navigateByUrl(keep.url);
  }

  private track(url: string): void {
    const key = url.split('?')[0].split('#')[0];
    if (EXCLUDED.some((p) => key === p || key.startsWith(p + '/'))) return;

    const titleKey = this.currentTitleKey() ?? 'menu.dashboard';
    this.activeKey.set(key);

    this._tabs.update((tabs) => {
      const existing = tabs.find((t) => t.key === key);
      if (existing) {
        return tabs.map((t) => (t.key === key ? { ...t, url, titleKey } : t));
      }
      const next = [...tabs, { key, url, titleKey, closable: key !== HOME.key }];
      // overflow: drop the oldest closable tab
      while (next.length > MAX_TABS) {
        const victim = next.find((t) => t.closable && t.key !== key);
        if (!victim) break;
        next.splice(next.indexOf(victim), 1);
      }
      return next;
    });
  }

  private currentTitleKey(): string | null {
    let s: ActivatedRouteSnapshot | null | undefined = this.router.routerState?.snapshot?.root;
    let title: string | null = null;
    while (s) {
      const k = s.data?.['titleKey'] as string | undefined;
      if (k) title = k;
      s = s.firstChild;
    }
    return title;
  }
}
