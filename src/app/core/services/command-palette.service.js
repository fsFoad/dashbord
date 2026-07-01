import { __decorate } from "tslib";
import { Injectable, signal } from '@angular/core';
/** Open/close state of the global command palette (Ctrl+K). */
let CommandPaletteService = class CommandPaletteService {
    open = signal(false);
    toggle() { this.open.update((v) => !v); }
    show() { this.open.set(true); }
    hide() { this.open.set(false); }
};
CommandPaletteService = __decorate([
    Injectable({ providedIn: 'root' })
], CommandPaletteService);
export { CommandPaletteService };
