import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TabsService } from '../../../core/services/tabs.service';
/** Browser-like tab strip for opened pages (Signals-powered, per-user persisted). */
let TabBar = class TabBar {
    tabs = inject(TabsService);
};
TabBar = __decorate([
    Component({
        selector: 'app-tab-bar',
        imports: [TranslocoModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    @if (tabs.count() > 1) {
      <div class="thin-scroll flex items-end gap-1 overflow-x-auto border-b border-surface-200 bg-surface-0/95 px-2 pt-1.5 dark:border-surface-800 dark:bg-surface-900/95">
        @for (t of tabs.tabs(); track t.key) {
          <div
            class="group flex max-w-44 shrink-0 cursor-pointer items-center gap-1.5 rounded-t-lg border border-b-0 px-3 py-1.5 text-xs font-medium transition-colors"
            [class.bg-surface-50]="tabs.activeKey() === t.key"
            [class.dark:bg-surface-950]="tabs.activeKey() === t.key"
            [class.border-surface-200]="tabs.activeKey() === t.key"
            [class.dark:border-surface-800]="tabs.activeKey() === t.key"
            [class.border-transparent]="tabs.activeKey() !== t.key"
            [class.text-muted-color]="tabs.activeKey() !== t.key"
            [class.hover:bg-surface-100]="tabs.activeKey() !== t.key"
            [class.dark:hover:bg-surface-800]="tabs.activeKey() !== t.key"
            (click)="tabs.activate(t)"
            (auxclick)="t.closable && tabs.close(t.key)"
          >
            @if (!t.closable) { <i class="pi pi-home text-[10px]"></i> }
            <span class="truncate-1">{{ t.titleKey | transloco }}</span>
            @if (t.closable) {
              <span
                role="button"
                (click)="$event.stopPropagation(); tabs.close(t.key)"
                class="grid size-4 place-items-center rounded-full text-muted-color opacity-0 transition-opacity hover:bg-surface-200 group-hover:opacity-100 dark:hover:bg-surface-700"
              ><i class="pi pi-times text-[9px]"></i></span>
            }
          </div>
        }
      </div>
    }
  `,
    })
], TabBar);
export { TabBar };
