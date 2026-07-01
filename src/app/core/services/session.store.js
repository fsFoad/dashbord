import { __decorate } from "tslib";
import { Injectable, computed, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
const KEY = 'app.auth';
/**
 * Holds the authenticated session (token + user) in Signals, persisted to
 * localStorage. Deliberately HTTP-free so interceptors and guards can inject
 * it without dependency cycles.
 */
let SessionStore = class SessionStore {
    storage = inject(StorageService);
    state = signal(this.storage.read(KEY, null));
    token = computed(() => this.state()?.token ?? null);
    user = computed(() => this.state()?.user ?? null);
    isAuthenticated = computed(() => !!this.state()?.token);
    roles = computed(() => this.state()?.user.roles ?? []);
    hasAnyRole(roles) {
        if (!roles.length)
            return true;
        const mine = new Set(this.roles());
        return roles.some((r) => mine.has(r));
    }
    set(session) {
        this.state.set(session);
        this.storage.write(KEY, session);
    }
    updateUser(user) {
        const s = this.state();
        if (!s)
            return;
        this.set({ ...s, user });
    }
    clear() {
        this.state.set(null);
        this.storage.remove(KEY);
    }
};
SessionStore = __decorate([
    Injectable({ providedIn: 'root' })
], SessionStore);
export { SessionStore };
