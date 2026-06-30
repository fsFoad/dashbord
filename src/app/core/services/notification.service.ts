import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationItem } from '../models/api.model';
import { MockSocketService } from './mock-socket.service';
import { SessionStore } from './session.store';
import { ToastService } from './toast.service';

/**
 * Notification center: seeds from the API, then receives LIVE items from the
 * (mock) socket while the user is signed in. Unread count drives the topbar
 * bell badge reactively.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly socket = inject(MockSocketService);
  private readonly session = inject(SessionStore);
  private readonly toast = inject(ToastService);

  private readonly _items = signal<NotificationItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly unread = computed(() => this._items().filter((n) => !n.read).length);

  private seeded = false;

  constructor() {
    // start/stop with the session
    effect(() => {
      if (this.session.isAuthenticated()) {
        this.seed();
        this.socket.connect();
      } else {
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

  markRead(id: number): void {
    this._items.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllRead(): void {
    this._items.update((list) => list.map((n) => ({ ...n, read: true })));
  }

  /** Demo helper for the playground/testing. */
  pushDemo(): void {
    this.socket.emitNow();
  }

  private seed(): void {
    if (this.seeded) return;
    this.seeded = true;
    this.http.get<NotificationItem[]>('/api/notifications').subscribe({
      next: (list) =>
        this._items.update((cur) => {
          const known = new Set(cur.map((n) => n.id));
          return [...cur, ...list.filter((n) => !known.has(n.id))];
        }),
    });
  }
}
