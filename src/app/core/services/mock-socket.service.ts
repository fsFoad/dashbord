import { DestroyRef, Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationItem } from '../models/api.model';
import { LIVE_NOTIF_TEMPLATES } from '../mock/mock-db';

/**
 * WebSocket SIMULATION. Exposes the same surface a real socket wrapper would
 * (connect / disconnect / messages$), but emits a random notification every
 * 20–45 seconds. Swap the internals for a real WebSocket later — consumers
 * won't change.
 */
@Injectable({ providedIn: 'root' })
export class MockSocketService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly subject = new Subject<NotificationItem>();
  readonly messages$ = this.subject.asObservable();

  private timer: ReturnType<typeof setTimeout> | null = null;
  private seq = 1000;

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnect());
  }

/*  connect(): void {
    if (this.timer) return;
    this.schedule();
  }*/

  disconnect(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  /** For demos: push a notification right now. */
  emitNow(): void {
    this.subject.next(this.random());
  }

/*  private schedule(): void {
    const delay = 20_000 + Math.random() * 25_000;
    this.timer = setTimeout(() => {
      this.subject.next(this.random());
      this.schedule();
    }, delay);
  }*/

  private random(): NotificationItem {
    const t = LIVE_NOTIF_TEMPLATES[Math.floor(Math.random() * LIVE_NOTIF_TEMPLATES.length)];
    return {
      ...t,
      id: this.seq++,
      createdAt: new Date().toISOString(),
      read: false,
    };
  }
}
