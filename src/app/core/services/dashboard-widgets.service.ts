import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';

export type WidgetId = 'kpis' | 'ai' | 'revenue' | 'status' | 'tasks' | 'activity' | 'tellerTill';

interface WidgetPrefs {
  order: WidgetId[];
  hidden: WidgetId[];
}

export const ALL_WIDGETS: WidgetId[] = ['kpis', 'ai', 'revenue', 'status', 'tasks', 'activity', 'tellerTill'];

/** Widgets that only make sense for some users, so they start hidden until opted in. */
const DEFAULT_HIDDEN: WidgetId[] = ['tellerTill'];

const DEFAULTS: WidgetPrefs = { order: [...ALL_WIDGETS], hidden: [...DEFAULT_HIDDEN] };
const keyFor = (uid: number) => `app.dashboard.${uid}`;

/** Grid column span per widget (12-col grid, all full-width on mobile). */
const SPANS: Record<WidgetId, string> = {
  kpis: 'col-span-12',
  ai: 'col-span-12',
  revenue: 'col-span-12 lg:col-span-8',
  status: 'col-span-12 lg:col-span-4',
  tasks: 'col-span-12 lg:col-span-6',
  activity: 'col-span-12 lg:col-span-6',
  tellerTill: 'col-span-12',
};

/**
 * Per-user dashboard layout: widget order (drag & drop) + hidden widgets,
 * persisted per signed-in user. `editMode` drives the rearrange UI.
 */
@Injectable({ providedIn: 'root' })
export class DashboardWidgetsService {
  private readonly session = inject(SessionStore);
  private readonly storage = inject(StorageService);

  private readonly prefs = signal<WidgetPrefs>(DEFAULTS);
  readonly editMode = signal(false);

  constructor() {
    effect(() => {
      const u = this.session.user();
      const loaded = u ? this.storage.read<WidgetPrefs>(keyFor(u.id), DEFAULTS) : DEFAULTS;
      // keep unknown/new widgets working across versions:
      const newWidgets = ALL_WIDGETS.filter((id) => !loaded.order.includes(id));
      const order = [...loaded.order.filter((id) => ALL_WIDGETS.includes(id)), ...newWidgets];
      // widgets newly introduced after this user's prefs were saved start hidden,
      // same as a first-time user, unless they opt in via "hidden widgets":
      const hidden = [
        ...loaded.hidden.filter((id) => ALL_WIDGETS.includes(id)),
        ...newWidgets.filter((id) => DEFAULT_HIDDEN.includes(id)),
      ];
      this.prefs.set({ order, hidden });
    });
  }

  readonly visible = computed(() =>
    this.prefs().order.filter((id) => !this.prefs().hidden.includes(id)),
  );
  readonly hidden = computed(() => this.prefs().hidden);

  spanFor(id: WidgetId): string {
    return SPANS[id];
  }

  /** Move the widget at `from` (within visible list) before position `to`. */
  move(from: number, to: number): void {
    if (from === to) return;
    const vis = [...this.visible()];
    const [item] = vis.splice(from, 1);
    vis.splice(to, 0, item);
    // rebuild full order: visible in new order + hidden keep relative spots at end
    this.update((p) => ({ ...p, order: [...vis, ...p.order.filter((id) => p.hidden.includes(id))] }));
  }

  hide(id: WidgetId): void {
    this.update((p) => ({ ...p, hidden: [...new Set([...p.hidden, id])] }));
  }

  show(id: WidgetId): void {
    this.update((p) => ({ ...p, hidden: p.hidden.filter((x) => x !== id) }));
  }

  reset(): void {
    this.update(() => ({ order: [...ALL_WIDGETS], hidden: [] }));
  }

  private update(fn: (p: WidgetPrefs) => WidgetPrefs): void {
    this.prefs.update(fn);
    const u = this.session.user();
    if (u) this.storage.write(keyFor(u.id), this.prefs());
  }
}
