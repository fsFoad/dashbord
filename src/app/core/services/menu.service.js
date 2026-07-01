import { __decorate } from "tslib";
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { APP_MENU } from '../config/menu.config';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
const EMPTY = { pinned: [], hidden: [] };
const keyFor = (userId) => `app.menu.${userId}`;
/**
 * Builds the sidebar menu for the CURRENT user:
 *  - filters items by the user's roles (recursively)
 *  - applies per-user preferences (hidden items, pinned favorites)
 *  - exposes a flat list for the "customize menu" dialog
 * Preferences persist per user id in localStorage.
 */
let MenuService = class MenuService {
    session = inject(SessionStore);
    storage = inject(StorageService);
    prefs = signal(EMPTY);
    constructor() {
        // (Re)load preferences whenever the signed-in user changes.
        effect(() => {
            const user = this.session.user();
            this.prefs.set(user ? this.storage.read(keyFor(user.id), EMPTY) : EMPTY);
        });
    }
    /** The final tree rendered by the sidebar. */
    menu = computed(() => {
        const { pinned, hidden } = this.prefs();
        const hiddenSet = new Set(hidden);
        const tree = this.cleanSeparators(this.filterTree(APP_MENU, hiddenSet));
        const pinnedLeaves = pinned
            .map((id) => this.findById(APP_MENU, id))
            .filter((it) => !!it && !hiddenSet.has(it.id) && this.roleOk(it))
            .map((it) => ({ ...it, children: undefined }));
        if (!pinnedLeaves.length)
            return tree;
        return [
            { id: '__pinned', labelKey: 'menu.section.pinned', separator: true },
            ...pinnedLeaves,
            ...tree,
        ];
    });
    /** Flat, role-filtered rows for the customizer (hidden items included). */
    flatRows = computed(() => {
        this.prefs(); // recompute when prefs change (pin/hide state shown per row)
        const rows = [];
        const walk = (items, depth) => {
            for (const it of items) {
                if (!this.roleOk(it))
                    continue;
                rows.push({
                    item: it,
                    depth,
                    isSection: !!it.separator,
                    pinnable: !!(it.route || it.href),
                });
                if (it.children?.length)
                    walk(it.children, depth + 1);
            }
        };
        walk(APP_MENU, 0);
        return rows;
    });
    isPinned(id) { return this.prefs().pinned.includes(id); }
    isHidden(id) { return this.prefs().hidden.includes(id); }
    togglePin(id) {
        this.update((p) => ({
            ...p,
            pinned: p.pinned.includes(id) ? p.pinned.filter((x) => x !== id) : [...p.pinned, id],
        }));
    }
    toggleHidden(id) {
        this.update((p) => ({
            ...p,
            hidden: p.hidden.includes(id) ? p.hidden.filter((x) => x !== id) : [...p.hidden, id],
            // hiding an item also unpins it
            pinned: p.hidden.includes(id) ? p.pinned : p.pinned.filter((x) => x !== id),
        }));
    }
    reset() { this.update(() => EMPTY); }
    // ---- internals ----
    update(fn) {
        this.prefs.update(fn);
        const user = this.session.user();
        if (user)
            this.storage.write(keyFor(user.id), this.prefs());
    }
    roleOk(item) {
        return !item.roles?.length || this.session.hasAnyRole(item.roles);
    }
    filterTree(items, hidden) {
        const out = [];
        for (const it of items) {
            if (hidden.has(it.id) || !this.roleOk(it))
                continue;
            if (it.children?.length) {
                const children = this.filterTree(it.children, hidden);
                if (!children.length && !it.route && !it.href)
                    continue; // empty group
                out.push({ ...it, children: children.length ? children : undefined });
            }
            else {
                out.push(it);
            }
        }
        return out;
    }
    /** Drop separators that have no items after them (or duplicates in a row). */
    cleanSeparators(items) {
        const out = [];
        for (const it of items) {
            if (it.separator && (out.length === 0 || out[out.length - 1].separator)) {
                if (out.length && out[out.length - 1].separator)
                    out.pop();
            }
            out.push(it);
        }
        while (out.length && out[out.length - 1].separator)
            out.pop();
        return out;
    }
    findById(items, id) {
        for (const it of items) {
            if (it.id === id)
                return it;
            const inChild = it.children ? this.findById(it.children, id) : null;
            if (inChild)
                return inChild;
        }
        return null;
    }
};
MenuService = __decorate([
    Injectable({ providedIn: 'root' })
], MenuService);
export { MenuService };
