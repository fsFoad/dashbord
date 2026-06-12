import { Injectable, signal } from '@angular/core';

/** Open/close state of the global command palette (Ctrl+K). */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  readonly open = signal(false);
  toggle(): void { this.open.update((v) => !v); }
  show(): void { this.open.set(true); }
  hide(): void { this.open.set(false); }
}
