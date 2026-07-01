import { __decorate } from "tslib";
import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
const STEPS = [
    { target: 'menu', titleKey: 'tour.menu.title', bodyKey: 'tour.menu.body' },
    { target: 'menu-toggle', titleKey: 'tour.toggle.title', bodyKey: 'tour.toggle.body' },
    { target: 'palette', titleKey: 'tour.palette.title', bodyKey: 'tour.palette.body' },
    { target: 'bell', titleKey: 'tour.bell.title', bodyKey: 'tour.bell.body' },
    { target: 'settings', titleKey: 'tour.settings.title', bodyKey: 'tour.settings.body' },
];
const keyFor = (uid) => `app.tour.${uid}`;
/** Lightweight onboarding tour: highlights [data-tour] targets, once per user. */
let TourService = class TourService {
    doc = inject(DOCUMENT);
    session = inject(SessionStore);
    storage = inject(StorageService);
    index = signal(null);
    rect = signal(null);
    step = computed(() => {
        const i = this.index();
        return i === null ? null : STEPS[i];
    });
    total = STEPS.length;
    /** Auto-start once per user (call after the dashboard renders). */
    maybeAutoStart() {
        const u = this.session.user();
        if (!u || this.storage.read(keyFor(u.id), false))
            return;
        setTimeout(() => this.start(), 1200);
    }
    start() {
        this.goTo(0);
    }
    next() {
        const i = this.index();
        if (i === null)
            return;
        if (i + 1 >= STEPS.length)
            this.finish();
        else
            this.goTo(i + 1);
    }
    prev() {
        const i = this.index();
        if (i !== null && i > 0)
            this.goTo(i - 1);
    }
    finish() {
        this.index.set(null);
        this.rect.set(null);
        const u = this.session.user();
        if (u)
            this.storage.write(keyFor(u.id), true);
    }
    remeasure() {
        const s = this.step();
        if (!s)
            return;
        const el = this.doc.querySelector(`[data-tour="${s.target}"]`);
        this.rect.set(el ? el.getBoundingClientRect() : null);
    }
    goTo(i, hops = 0) {
        if (hops >= STEPS.length) {
            this.finish();
            return;
        }
        const el = this.doc.querySelector(`[data-tour="${STEPS[i].target}"]`);
        if (!el) {
            // target not on screen (e.g. mobile) → skip forward
            const ni = i + 1;
            if (ni >= STEPS.length)
                this.finish();
            else
                this.goTo(ni, hops + 1);
            return;
        }
        this.index.set(i);
        this.rect.set(el.getBoundingClientRect());
    }
};
TourService = __decorate([
    Injectable({ providedIn: 'root' })
], TourService);
export { TourService };
