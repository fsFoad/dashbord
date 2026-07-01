import { __decorate } from "tslib";
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
export const ALL_WIDGETS = ['kpis', 'ai', 'revenue', 'status', 'tasks', 'activity'];
const DEFAULTS = { order: [...ALL_WIDGETS], hidden: [] };
const keyFor = (uid) => `app.dashboard.${uid}`;
/** Grid column span per widget (12-col grid, all full-width on mobile). */
const SPANS = {
    kpis: 'col-span-12',
    ai: 'col-span-12',
    revenue: 'col-span-12 lg:col-span-8',
    status: 'col-span-12 lg:col-span-4',
    tasks: 'col-span-12 lg:col-span-6',
    activity: 'col-span-12 lg:col-span-6',
};
/**
 * Per-user dashboard layout: widget order (drag & drop) + hidden widgets,
 * persisted per signed-in user. `editMode` drives the rearrange UI.
 */
let DashboardWidgetsService = class DashboardWidgetsService {
    session = inject(SessionStore);
    storage = inject(StorageService);
    prefs = signal(DEFAULTS);
    editMode = signal(false);
    constructor() {
        effect(() => {
            const u = this.session.user();
            const loaded = u ? this.storage.read(keyFor(u.id), DEFAULTS) : DEFAULTS;
            // keep unknown/new widgets working across versions:
            const order = [
                ...loaded.order.filter((id) => ALL_WIDGETS.includes(id)),
                ...ALL_WIDGETS.filter((id) => !loaded.order.includes(id)),
            ];
            this.prefs.set({ order, hidden: loaded.hidden.filter((id) => ALL_WIDGETS.includes(id)) });
        });
    }
    visible = computed(() => this.prefs().order.filter((id) => !this.prefs().hidden.includes(id)));
    hidden = computed(() => this.prefs().hidden);
    spanFor(id) {
        return SPANS[id];
    }
    /** Move the widget at `from` (within visible list) before position `to`. */
    move(from, to) {
        if (from === to)
            return;
        const vis = [...this.visible()];
        const [item] = vis.splice(from, 1);
        vis.splice(to, 0, item);
        // rebuild full order: visible in new order + hidden keep relative spots at end
        this.update((p) => ({ ...p, order: [...vis, ...p.order.filter((id) => p.hidden.includes(id))] }));
    }
    hide(id) {
        this.update((p) => ({ ...p, hidden: [...new Set([...p.hidden, id])] }));
    }
    show(id) {
        this.update((p) => ({ ...p, hidden: p.hidden.filter((x) => x !== id) }));
    }
    reset() {
        this.update(() => ({ order: [...ALL_WIDGETS], hidden: [] }));
    }
    update(fn) {
        this.prefs.update(fn);
        const u = this.session.user();
        if (u)
            this.storage.write(keyFor(u.id), this.prefs());
    }
};
DashboardWidgetsService = __decorate([
    Injectable({ providedIn: 'root' })
], DashboardWidgetsService);
export { DashboardWidgetsService };
