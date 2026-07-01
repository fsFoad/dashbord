import { __decorate } from "tslib";
import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { CommandPaletteService } from './command-palette.service';
import { LayoutService } from './layout.service';
/**
 * Global keyboard shortcuts:
 *   Ctrl/Cmd + K → command palette
 *   Ctrl/Cmd + B → toggle sidebar
 *   Shift + ?    → shortcuts help (when not typing)
 */
let ShortcutService = class ShortcutService {
    doc = inject(DOCUMENT);
    palette = inject(CommandPaletteService);
    layout = inject(LayoutService);
    helpOpen = signal(false);
    installed = false;
    install() {
        if (this.installed)
            return;
        this.installed = true;
        this.doc.addEventListener('keydown', (e) => {
            const mod = e.ctrlKey || e.metaKey;
            if (mod && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.palette.toggle();
                return;
            }
            if (mod && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                this.layout.toggleSidebar();
                return;
            }
            if (e.key === '?' && !this.isTyping(e)) {
                e.preventDefault();
                this.helpOpen.set(true);
            }
            if (e.key === 'Escape') {
                this.helpOpen.set(false);
            }
        });
    }
    isTyping(e) {
        const el = e.target;
        const tag = el?.tagName?.toLowerCase();
        return tag === 'input' || tag === 'textarea' || tag === 'select' || !!el?.isContentEditable;
    }
};
ShortcutService = __decorate([
    Injectable({ providedIn: 'root' })
], ShortcutService);
export { ShortcutService };
