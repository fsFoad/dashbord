import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { CommandPaletteService } from './command-palette.service';
import { LayoutService } from './layout.service';

/**
 * Global keyboard shortcuts:
 *   Ctrl/Cmd + K → command palette
 *   Ctrl/Cmd + B → toggle sidebar
 *   Shift + ?    → shortcuts help (when not typing)
 */
@Injectable({ providedIn: 'root' })
export class ShortcutService {
  private readonly doc = inject(DOCUMENT);
  private readonly palette = inject(CommandPaletteService);
  private readonly layout = inject(LayoutService);

  readonly helpOpen = signal(false);
  private installed = false;

  install(): void {
    if (this.installed) return;
    this.installed = true;

    this.doc.addEventListener('keydown', (e: KeyboardEvent) => {
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

  private isTyping(e: KeyboardEvent): boolean {
    const el = e.target as HTMLElement | null;
    const tag = el?.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || !!el?.isContentEditable;
  }
}
