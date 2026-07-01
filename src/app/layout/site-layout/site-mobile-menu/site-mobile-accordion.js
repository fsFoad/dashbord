import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
/**
 * Recursive accordion row for the site's mobile menu. Renders a single
 * MenuItem: if it has children, it's a collapsible header that reveals nested
 * rows (which are themselves <app-site-mobile-accordion>); if it's a leaf, it's
 * a router link. `depth` drives the indentation. Emits `navigate` so the parent
 * can close the whole menu after a leaf is tapped.
 */
let SiteMobileAccordion = class SiteMobileAccordion {
    item = input.required();
    depth = input(0);
    navigate = output();
    open = signal(false);
};
SiteMobileAccordion = __decorate([
    Component({
        selector: 'app-site-mobile-accordion',
        imports: [RouterLink, TranslocoModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    @if (item().children?.length) {
      <!-- collapsible group -->
      <button
        type="button"
        (click)="open.set(!open())"
        class="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
        [style.padding-inline-start.rem]="0.75 + depth() * 0.85"
      >
        @if (item().icon) { <i [class]="item().icon" class="shrink-0 text-sm text-primary"></i> }
        <span class="flex-1 text-start">{{ item().labelKey | transloco }}</span>
        <i class="pi pi-chevron-down text-xs text-muted-color transition-transform" [class.rotate-180]="open()"></i>
      </button>
      @if (open()) {
        <div class="flex flex-col">
          @for (child of item().children; track child.id) {
            <app-site-mobile-accordion
              [item]="child"
              [depth]="depth() + 1"
              (navigate)="navigate.emit()" />
          }
        </div>
      }
    } @else {
      <!-- leaf link -->
      <a
        [routerLink]="item().route"
        [fragment]="item().fragment"
        (click)="navigate.emit()"
        class="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-surface-600 transition-colors hover:bg-primary/10 hover:text-primary dark:text-surface-300"
        [style.padding-inline-start.rem]="0.75 + depth() * 0.85"
      >
        @if (item().icon) { <i [class]="item().icon" class="shrink-0 text-sm"></i> }
        <span class="flex-1 text-start">{{ item().labelKey | transloco }}</span>
      </a>
    }
  `,
    })
], SiteMobileAccordion);
export { SiteMobileAccordion };
