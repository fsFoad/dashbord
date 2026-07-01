import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, input, signal, } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { LayoutService } from '../../../../core/services/layout.service';
import { SettingsStore } from '../../../../core/services/settings.store';
/**
 * Recursive sidebar item. Supports:
 *  - unlimited nesting via `children`
 *  - section separators
 *  - long labels: single-line truncation + full text in a tooltip
 *  - slim (icon-only) mode with tooltips
 *  - RTL/LTR-safe indentation via logical padding-inline-start
 */
let MenuItemComponent = class MenuItemComponent {
    layout = inject(LayoutService);
    settings = inject(SettingsStore);
    item = input.required();
    level = input(0);
    slim = computed(() => this.layout.isSlim());
    /** Whether groups are collapsible (accordion) vs. always fully expanded. */
    collapsible = computed(() => this.settings.menuCollapsible());
    expanded = signal(false);
    /**
     * A group is open when expanded by the user, OR when collapsing is disabled
     * (then the whole menu stays open with no expand/collapse interaction).
     */
    open = computed(() => !this.collapsible() || this.expanded());
    /** Logical indent grows with nesting depth (RTL/LTR safe). */
    indent = computed(() => 0.75 + this.level() * 0.85);
    /** Tooltip opens toward the content side, away from the sidebar. */
    tooltipPos = computed(() => (this.settings.isRtl() ? 'left' : 'right'));
    /**
     * Heuristic: deep or verbose items likely truncate, so always offer the
     * tooltip for them. (Exact overflow detection arrives with the per-user
     * menu service in Phase 3.)
     */
    isLong = computed(() => this.item().labelKey.length > 24 || this.level() >= 2);
    toggle() {
        if (!this.collapsible())
            return; // flat mode: groups stay open, header is inert
        this.expanded.update((v) => !v);
    }
    /** Run a built-in menu action (currently just opening the settings drawer). */
    runAction(action) {
        if (action === 'openSettings')
            this.layout.openSettings();
    }
};
MenuItemComponent = __decorate([
    Component({
        selector: 'app-menu-item',
        imports: [RouterLink, RouterLinkActive, TranslocoModule, Tooltip],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    @let it = item();

    @if (it.separator) {
      @if (!slim()) {
        <li class="truncate-1 px-3 pt-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-color/70">
          {{ it.labelKey | transloco }}
        </li>
      } @else {
        <li class="mx-3 my-3 border-t border-surface-200 dark:border-surface-700"></li>
      }
    } @else if (it.children?.length) {
      <!-- Branch node: expandable group -->
      <li>
        <button
          type="button"
          (click)="toggle()"
          [pTooltip]="(slim() || isLong()) ? (it.labelKey | transloco) : ''"
          [tooltipPosition]="tooltipPos()"
          class="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                 text-surface-700 transition-colors hover:bg-surface-100
                 dark:text-surface-200 dark:hover:bg-surface-800"
          [style.padding-inline-start.rem]="indent()"
        >
          @if (it.icon) {
            <i [class]="it.icon" class="shrink-0 text-base"></i>
          }
          @if (!slim()) {
            <span class="truncate-1 flex-1 text-start">{{ it.labelKey | transloco }}</span>
            @if (collapsible()) {
              <i
                class="pi shrink-0 text-xs transition-transform"
                [class.pi-angle-down]="!open()"
                [class.pi-angle-up]="open()"
              ></i>
            }
          }
        </button>

        @if (open() && !slim()) {
          <ul class="space-y-0.5">
            @for (child of it.children; track child.id) {
              <app-menu-item [item]="child" [level]="level() + 1" />
            }
          </ul>
        }
      </li>
    } @else if (it.action) {
      <!-- Action leaf (e.g. open the settings drawer) -->
      <li>
        <button
          type="button"
          (click)="runAction(it.action)"
          [pTooltip]="(slim() || isLong()) ? (it.labelKey | transloco) : ''"
          [tooltipPosition]="tooltipPos()"
          class="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                 text-surface-700 transition-colors hover:bg-surface-100
                 dark:text-surface-200 dark:hover:bg-surface-800"
          [style.padding-inline-start.rem]="indent()"
        >
          @if (it.icon) {
            <i [class]="it.icon" class="shrink-0 text-base transition-transform duration-200 group-hover:scale-110"></i>
          }
          @if (!slim()) {
            <span class="truncate-1 flex-1 text-start">{{ it.labelKey | transloco }}</span>
          }
        </button>
      </li>
    } @else if (it.href) {
      <!-- External link leaf -->
      <li>
        <a
          [href]="it.href"
          target="_blank"
          rel="noopener"
          [pTooltip]="(slim() || isLong()) ? (it.labelKey | transloco) : ''"
          [tooltipPosition]="tooltipPos()"
          class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                 text-surface-700 transition-colors hover:bg-surface-100
                 dark:text-surface-200 dark:hover:bg-surface-800"
          [style.padding-inline-start.rem]="indent()"
        >
          @if (it.icon) {
            <i [class]="it.icon" class="shrink-0 text-base"></i>
          }
          @if (!slim()) {
            <span class="truncate-1 flex-1 text-start">{{ it.labelKey | transloco }}</span>
            <i class="pi pi-external-link shrink-0 text-[10px] opacity-50"></i>
          }
        </a>
      </li>
    } @else {
      <!-- Router link leaf -->
      <li>
        <a
          [routerLink]="it.route"
          routerLinkActive
          #rla="routerLinkActive"
          [pTooltip]="(slim() || isLong()) ? (it.labelKey | transloco) : ''"
          [tooltipPosition]="tooltipPos()"
          class="group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
          [class.text-primary-contrast]="rla.isActive"
          [class.bg-primary]="rla.isActive"
          [class.shadow-md]="rla.isActive"
          [class.shadow-primary/30]="rla.isActive"
          [class.text-surface-700]="!rla.isActive"
          [class.hover:bg-surface-100]="!rla.isActive"
          [class.dark:text-surface-200]="!rla.isActive"
          [class.dark:hover:bg-surface-800]="!rla.isActive"
          [style.padding-inline-start.rem]="indent()"
        >
          <!-- sliding active indicator on the inline-start edge -->
          <span
            class="absolute inset-y-1.5 start-0 w-1 rounded-full bg-primary-contrast/90 transition-all duration-300"
            [class.opacity-100]="rla.isActive"
            [class.opacity-0]="!rla.isActive"
            [class.scale-y-100]="rla.isActive"
            [class.scale-y-0]="!rla.isActive"
          ></span>
          @if (it.icon) {
            <i [class]="it.icon" class="shrink-0 text-base transition-transform duration-200 group-hover:scale-110"></i>
          }
          @if (!slim()) {
            <span class="truncate-1 flex-1 text-start">{{ it.labelKey | transloco }}</span>
            @if (it.badgeKey) {
              <span class="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {{ it.badgeKey | transloco }}
              </span>
            }
          }
        </a>
      </li>
    }
  `,
        styles: [':host { display: contents; }'],
    })
], MenuItemComponent);
export { MenuItemComponent };
