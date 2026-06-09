import { Injectable } from '@angular/core';

/** Tiny, safe wrapper around localStorage (won't throw in private mode / SSR). */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private get ls(): Storage | null {
    try {
      return typeof localStorage !== 'undefined' ? localStorage : null;
    } catch {
      return null;
    }
  }

  read<T>(key: string, fallback: T): T {
    try {
      const raw = this.ls?.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  write<T>(key: string, value: T): void {
    try {
      this.ls?.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota / unavailable */
    }
  }

  remove(key: string): void {
    try {
      this.ls?.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}
