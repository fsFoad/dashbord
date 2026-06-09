import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { MenuItem } from '../../../../core/models/menu-item.model';
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
@Component({
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
            <i
              class="pi shrink-0 text-xs transition-transform"
              [class.pi-angle-down]="!expanded()"
              [class.pi-angle-up]="expanded()"
            ></i>
          }
        </button>

        @if (expanded() && !slim()) {
          <ul class="space-y-0.5">
            @for (child of it.children; track child.id) {
              <app-menu-item [item]="child" [level]="level() + 1" />
            }
          </ul>
        }
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
          class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          [class.bg-primary]="rla.isActive"
          [class.text-primary-contrast]="rla.isActive"
          [class.text-surface-700]="!rla.isActive"
          [class.hover:bg-surface-100]="!rla.isActive"
          [class.dark:text-surface-200]="!rla.isActive"
          [class.dark:hover:bg-surface-800]="!rla.isActive"
          [style.padding-inline-start.rem]="indent()"
        >
          @if (it.icon) {
            <i [class]="it.icon" class="shrink-0 text-base"></i>
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
export class MenuItemComponent {
  private readonly layout = inject(LayoutService);
  private readonly settings = inject(SettingsStore);

  readonly item = input.required<MenuItem>();
  readonly level = input<number>(0);

  readonly slim = computed(() => this.layout.isSlim());
  protected readonly expanded = signal(false);

  /** Logical indent grows with nesting depth (RTL/LTR safe). */
  protected readonly indent = computed(() => 0.75 + this.level() * 0.85);

  /** Tooltip opens toward the content side, away from the sidebar. */
  protected readonly tooltipPos = computed(() => (this.settings.isRtl() ? 'left' : 'right'));

  /**
   * Heuristic: deep or verbose items likely truncate, so always offer the
   * tooltip for them. (Exact overflow detection arrives with the per-user
   * menu service in Phase 3.)
   */
  protected readonly isLong = computed(() => this.item().labelKey.length > 24 || this.level() >= 2);

  protected toggle(): void {
    this.expanded.update((v) => !v);
  }
}
