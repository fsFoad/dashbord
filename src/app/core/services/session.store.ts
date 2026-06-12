import { Injectable, computed, inject, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthResponse, Role, User } from '../models/user.model';

const KEY = 'app.auth';

/**
 * Holds the authenticated session (token + user) in Signals, persisted to
 * localStorage. Deliberately HTTP-free so interceptors and guards can inject
 * it without dependency cycles.
 */
@Injectable({ providedIn: 'root' })
export class SessionStore {
  private readonly storage = inject(StorageService);

  private readonly state = signal<AuthResponse | null>(
    this.storage.read<AuthResponse | null>(KEY, null),
  );

  readonly token = computed(() => this.state()?.token ?? null);
  readonly user = computed(() => this.state()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this.state()?.token);
  readonly roles = computed<Role[]>(() => this.state()?.user.roles ?? []);

  hasAnyRole(roles: Role[]): boolean {
    if (!roles.length) return true;
    const mine = new Set(this.roles());
    return roles.some((r) => mine.has(r));
  }

  set(session: AuthResponse): void {
    this.state.set(session);
    this.storage.write(KEY, session);
  }

  updateUser(user: User): void {
    const s = this.state();
    if (!s) return;
    this.set({ ...s, user });
  }

  clear(): void {
    this.state.set(null);
    this.storage.remove(KEY);
  }
}
