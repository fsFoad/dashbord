import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { APP_MENU } from '../config/menu.config';
import { MenuItem } from '../models/menu-item.model';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';

export interface MenuPrefs {
  pinned: string[];
  hidden: string[];
}

export interface FlatMenuRow {
  item: MenuItem;
  depth: number;
  /** Sections are headers in the customizer, not toggleable. */
  isSection: boolean;
  /** Only navigable leaves can be pinned. */
  pinnable: boolean;
}

const EMPTY: MenuPrefs = { pinned: [], hidden: [] };
const keyFor = (userId: number) => `app.menu.${userId}`;

/**
 * Builds the sidebar menu for the CURRENT user:
 *  - filters items by the user's roles (recursively)
 *  - applies per-user preferences (hidden items, pinned favorites)
 *  - exposes a flat list for the "customize menu" dialog
 * Preferences persist per user id in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly session = inject(SessionStore);
  private readonly storage = inject(StorageService);

  private readonly prefs = signal<MenuPrefs>(EMPTY);

  constructor() {
    // (Re)load preferences whenever the signed-in user changes.
    effect(() => {
      const user = this.session.user();
      this.prefs.set(user ? this.storage.read(keyFor(user.id), EMPTY) : EMPTY);
    });
  }

  /** The final tree rendered by the sidebar. */
  readonly menu = computed<MenuItem[]>(() => {
    const { pinned, hidden } = this.prefs();
    const hiddenSet = new Set(hidden);

    const tree = this.cleanSeparators(this.filterTree(APP_MENU, hiddenSet));

    const pinnedLeaves = pinned
      .map((id) => this.findById(APP_MENU, id))
      .filter((it): it is MenuItem => !!it && !hiddenSet.has(it.id) && this.roleOk(it))
      .map((it) => ({ ...it, children: undefined }));

    if (!pinnedLeaves.length) return tree;
    return [
      { id: '__pinned', labelKey: 'menu.section.pinned', separator: true },
      ...pinnedLeaves,
      ...tree,
    ];
  });

  /** Flat, role-filtered rows for the customizer (hidden items included). */
  readonly flatRows = computed<FlatMenuRow[]>(() => {
    this.prefs(); // recompute when prefs change (pin/hide state shown per row)
    const rows: FlatMenuRow[] = [];
    const walk = (items: MenuItem[], depth: number) => {
      for (const it of items) {
        if (!this.roleOk(it)) continue;
        rows.push({
          item: it,
          depth,
          isSection: !!it.separator,
          pinnable: !!(it.route || it.href),
        });
        if (it.children?.length) walk(it.children, depth + 1);
      }
    };
    walk(APP_MENU, 0);
    return rows;
  });

  isPinned(id: string): boolean { return this.prefs().pinned.includes(id); }
  isHidden(id: string): boolean { return this.prefs().hidden.includes(id); }

  togglePin(id: string): void {
    this.update((p) => ({
      ...p,
      pinned: p.pinned.includes(id) ? p.pinned.filter((x) => x !== id) : [...p.pinned, id],
    }));
  }

  toggleHidden(id: string): void {
    this.update((p) => ({
      ...p,
      hidden: p.hidden.includes(id) ? p.hidden.filter((x) => x !== id) : [...p.hidden, id],
      // hiding an item also unpins it
      pinned: p.hidden.includes(id) ? p.pinned : p.pinned.filter((x) => x !== id),
    }));
  }

  reset(): void { this.update(() => EMPTY); }

  // ---- internals ----
  private update(fn: (p: MenuPrefs) => MenuPrefs): void {
    this.prefs.update(fn);
    const user = this.session.user();
    if (user) this.storage.write(keyFor(user.id), this.prefs());
  }

  private roleOk(item: MenuItem): boolean {
    return !item.roles?.length || this.session.hasAnyRole(item.roles);
  }

  private filterTree(items: MenuItem[], hidden: Set<string>): MenuItem[] {
    const out: MenuItem[] = [];
    for (const it of items) {
      if (hidden.has(it.id) || !this.roleOk(it)) continue;
      if (it.children?.length) {
        const children = this.filterTree(it.children, hidden);
        if (!children.length && !it.route && !it.href) continue; // empty group
        out.push({ ...it, children: children.length ? children : undefined });
      } else {
        out.push(it);
      }
    }
    return out;
  }

  /** Drop separators that have no items after them (or duplicates in a row). */
  private cleanSeparators(items: MenuItem[]): MenuItem[] {
    const out: MenuItem[] = [];
    for (const it of items) {
      if (it.separator && (out.length === 0 || out[out.length - 1].separator)) {
        if (out.length && out[out.length - 1].separator) out.pop();
      }
      out.push(it);
    }
    while (out.length && out[out.length - 1].separator) out.pop();
    return out;
  }

  private findById(items: MenuItem[], id: string): MenuItem | null {
    for (const it of items) {
      if (it.id === id) return it;
      const inChild = it.children ? this.findById(it.children, id) : null;
      if (inChild) return inChild;
    }
    return null;
  }
}
