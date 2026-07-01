import { __decorate } from "tslib";
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LIVE_NOTIF_TEMPLATES } from '../mock/mock-db';
/**
 * WebSocket SIMULATION. Exposes the same surface a real socket wrapper would
 * (connect / disconnect / messages$), but emits a random notification every
 * 20–45 seconds. Swap the internals for a real WebSocket later — consumers
 * won't change.
 */
let MockSocketService = class MockSocketService {
    destroyRef = inject(DestroyRef);
    subject = new Subject();
    messages$ = this.subject.asObservable();
    timer = null;
    seq = 1000;
    constructor() {
        this.destroyRef.onDestroy(() => this.disconnect());
    }
    connect() {
        if (this.timer)
            return;
        this.schedule();
    }
    disconnect() {
        if (this.timer)
            clearTimeout(this.timer);
        this.timer = null;
    }
    /** For demos: push a notification right now. */
    emitNow() {
        this.subject.next(this.random());
    }
    schedule() {
        const delay = 20_000 + Math.random() * 25_000;
        this.timer = setTimeout(() => {
            this.subject.next(this.random());
            this.schedule();
        }, delay);
    }
    random() {
        const t = LIVE_NOTIF_TEMPLATES[Math.floor(Math.random() * LIVE_NOTIF_TEMPLATES.length)];
        return {
            ...t,
            id: this.seq++,
            createdAt: new Date().toISOString(),
            read: false,
        };
    }
};
MockSocketService = __decorate([
    Injectable({ providedIn: 'root' })
], MockSocketService);
export { MockSocketService };
