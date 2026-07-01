import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
/** Tiny, safe wrapper around localStorage (won't throw in private mode / SSR). */
let StorageService = class StorageService {
    get ls() {
        try {
            return typeof localStorage !== 'undefined' ? localStorage : null;
        }
        catch {
            return null;
        }
    }
    read(key, fallback) {
        try {
            const raw = this.ls?.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        }
        catch {
            return fallback;
        }
    }
    write(key, value) {
        try {
            this.ls?.setItem(key, JSON.stringify(value));
        }
        catch {
            /* ignore quota / unavailable */
        }
    }
    remove(key) {
        try {
            this.ls?.removeItem(key);
        }
        catch {
            /* ignore */
        }
    }
};
StorageService = __decorate([
    Injectable({ providedIn: 'root' })
], StorageService);
export { StorageService };
