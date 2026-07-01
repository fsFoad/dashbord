import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MockSocketService } from './mock-socket.service';
import { SessionStore } from './session.store';
import { ToastService } from './toast.service';
/**
 * Notification center: seeds from the API, then receives LIVE items from the
 * (mock) socket while the user is signed in. Unread count drives the topbar
 * bell badge reactively.
 */
let NotificationService = class NotificationService {
    http = inject(HttpClient);
    socket = inject(MockSocketService);
    session = inject(SessionStore);
    toast = inject(ToastService);
    _items = signal([]);
    items = this._items.asReadonly();
    unread = computed(() => this._items().filter((n) => !n.read).length);
    seeded = false;
    constructor() {
        // start/stop with the session
        effect(() => {
            if (this.session.isAuthenticated()) {
                this.seed();
                this.socket.connect();
            }
            else {
                this.socket.disconnect();
                this._items.set([]);
                this.seeded = false;
            }
        });
        this.socket.messages$.pipe(takeUntilDestroyed()).subscribe((n) => {
            this._items.update((list) => [n, ...list].slice(0, 30));
            this.toast.info(n.messageKey, n.messageParams);
        });
    }
    markRead(id) {
        this._items.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }
    markAllRead() {
        this._items.update((list) => list.map((n) => ({ ...n, read: true })));
    }
    /** Demo helper for the playground/testing. */
    pushDemo() {
        this.socket.emitNow();
    }
    seed() {
        if (this.seeded)
            return;
        this.seeded = true;
        this.http.get('/api/notifications').subscribe({
            next: (list) => this._items.update((cur) => {
                const known = new Set(cur.map((n) => n.id));
                return [...cur, ...list.filter((n) => !known.has(n.id))];
            }),
        });
    }
};
NotificationService = __decorate([
    Injectable({ providedIn: 'root' })
], NotificationService);
export { NotificationService };
