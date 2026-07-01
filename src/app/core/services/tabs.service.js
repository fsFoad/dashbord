import { __decorate } from "tslib";
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteCacheService } from './route-cache.service';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
const HOME = { key: '/dashboard', url: '/dashboard', titleKey: 'menu.dashboard.overview', closable: false };
const MAX_TABS = 8;
const EXCLUDED = ['/auth', '/site', '/404', '/403', '/500'];
const keyFor = (uid) => `app.tabs.${uid}`;
/**
 * Browser-style multi-tab INSIDE the app, implemented purely with Signals
 * behind this facade (swappable for NgRx later without touching consumers).
 * Every visited dashboard page becomes a tab; tabs persist per user.
 */
let TabsService = class TabsService {
    router = inject(Router);
    session = inject(SessionStore);
    storage = inject(StorageService);
    cache = inject(RouteCacheService);
    _tabs = signal([HOME]);
    tabs = this._tabs.asReadonly();
    activeKey = signal(HOME.key);
    count = computed(() => this._tabs().length);
    constructor() {
        // restore per user (and drop every cached page from the previous user)
        effect(() => {
            const u = this.session.user();
            this.cache.clearAll();
            const saved = u ? this.storage.read(keyFor(u.id), [HOME]) : [HOME];
            const tabs = saved.length ? saved : [HOME];
            if (!tabs.some((t) => t.key === HOME.key))
                tabs.unshift(HOME);
            this._tabs.set(tabs.slice(0, MAX_TABS));
        });
        // persist
        effect(() => {
            const u = this.session.user();
            if (u)
                this.storage.write(keyFor(u.id), this._tabs());
        });
        // track navigation → upsert tab
        this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
            .subscribe((e) => this.track(e.urlAfterRedirects));
    }
    activate(tab) {
        this.router.navigateByUrl(tab.url);
    }
    close(key) {
        const tabs = this._tabs();
        const idx = tabs.findIndex((t) => t.key === key);
        if (idx < 0 || !tabs[idx].closable)
            return;
        const next = tabs.filter((t) => t.key !== key);
        this._tabs.set(next);
        this.cache.clear(key); // free the detached component
        if (this.activeKey() === key) {
            const fallback = next[Math.min(idx, next.length - 1)] ?? HOME;
            this.router.navigateByUrl(fallback.url);
        }
    }
    closeOthers(key) {
        for (const t of this._tabs()) {
            if (t.closable && t.key !== key)
                this.cache.clear(t.key);
        }
        this._tabs.update((tabs) => tabs.filter((t) => !t.closable || t.key === key));
        const keep = this._tabs().find((t) => t.key === key);
        if (keep)
            this.router.navigateByUrl(keep.url);
    }
    track(url) {
        const key = url.split('?')[0].split('#')[0];
        if (EXCLUDED.some((p) => key === p || key.startsWith(p + '/')))
            return;
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
                if (!victim)
                    break;
                this.cache.clear(victim.key);
                next.splice(next.indexOf(victim), 1);
            }
            return next;
        });
    }
    currentTitleKey() {
        let s = this.router.routerState?.snapshot?.root;
        let title = null;
        while (s) {
            const k = s.data?.['titleKey'];
            if (k)
                title = k;
            s = s.firstChild;
        }
        return title;
    }
};
TabsService = __decorate([
    Injectable({ providedIn: 'root' })
], TabsService);
export { TabsService };
