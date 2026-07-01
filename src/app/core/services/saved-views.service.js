import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
const keyFor = (uid, table) => `app.views.${uid}.${table}`;
let SavedViewsService = class SavedViewsService {
    session = inject(SessionStore);
    storage = inject(StorageService);
    list(table) {
        const uid = this.session.user()?.id;
        if (!uid)
            return [];
        return this.storage.read(keyFor(uid, table), []);
    }
    save(table, name, state) {
        const view = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: name.trim(),
            state,
            createdAt: new Date().toISOString(),
        };
        this.persist(table, [...this.list(table), view]);
        return view;
    }
    remove(table, id) {
        this.persist(table, this.list(table).filter((v) => v.id !== id));
    }
    rename(table, id, name) {
        this.persist(table, this.list(table).map((v) => (v.id === id ? { ...v, name: name.trim() } : v)));
    }
    persist(table, views) {
        const uid = this.session.user()?.id;
        if (uid)
            this.storage.write(keyFor(uid, table), views);
    }
};
SavedViewsService = __decorate([
    Injectable({ providedIn: 'root' })
], SavedViewsService);
export { SavedViewsService };
