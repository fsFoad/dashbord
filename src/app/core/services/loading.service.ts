import { Injectable, computed, signal } from '@angular/core';

/** Counts in-flight API requests; drives the global top progress bar. */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly count = signal(0);
  readonly active = computed(() => this.count() > 0);

  start(): void { this.count.update((c) => c + 1); }
  stop(): void { this.count.update((c) => Math.max(0, c - 1)); }
}
