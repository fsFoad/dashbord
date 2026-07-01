import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SentryContextService {
  setUser(user: unknown): void {}
  setTag(key: string, val: string): void {}
}
