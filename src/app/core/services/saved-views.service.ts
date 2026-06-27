import { Injectable, inject } from '@angular/core';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';

/**
 * A saved "view" = a named snapshot of a table's UI state (filters, sort,
 * visible columns, page size…). Generic over the state shape <T>, scoped per
 * user AND per table key, persisted in localStorage. Swap the storage backend
 * for an API later without touching consumers.
 */
export interface SavedView<T = unknown> {
  id: string;
  name: string;
  state: T;
  createdAt: string;
}

const keyFor = (uid: number, table: string) => `app.views.${uid}.${table}`;

@Injectable({ providedIn: 'root' })
export class SavedViewsService {
  private readonly session = inject(SessionStore);
  private readonly storage = inject(StorageService);

  list<T>(table: string): SavedView<T>[] {
    const uid = this.session.user()?.id;
    if (!uid) return [];
    return this.storage.read<SavedView<T>[]>(keyFor(uid, table), []);
  }

  save<T>(table: string, name: string, state: T): SavedView<T> {
    const view: SavedView<T> = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      state,
      createdAt: new Date().toISOString(),
    };
    this.persist(table, [...this.list<T>(table), view]);
    return view;
  }

  remove(table: string, id: string): void {
    this.persist(table, this.list(table).filter((v) => v.id !== id));
  }

  rename(table: string, id: string, name: string): void {
    this.persist(
      table,
      this.list(table).map((v) => (v.id === id ? { ...v, name: name.trim() } : v)),
    );
  }

  private persist<T>(table: string, views: SavedView<T>[]): void {
    const uid = this.session.user()?.id;
    if (uid) this.storage.write(keyFor(uid, table), views);
  }
}
