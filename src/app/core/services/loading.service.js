import { __decorate } from "tslib";
import { Injectable, computed, signal } from '@angular/core';
/** Counts in-flight API requests; drives the global top progress bar. */
let LoadingService = class LoadingService {
    count = signal(0);
    active = computed(() => this.count() > 0);
    start() { this.count.update((c) => c + 1); }
    stop() { this.count.update((c) => Math.max(0, c - 1)); }
};
LoadingService = __decorate([
    Injectable({ providedIn: 'root' })
], LoadingService);
export { LoadingService };
