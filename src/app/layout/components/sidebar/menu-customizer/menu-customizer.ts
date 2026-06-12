import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MenuService } from '../../../../core/services/menu.service';

/**
 * Per-user menu customization: hide items, pin favorites to the top.
 * Preferences persist per signed-in user.
 */
@Component({
  selector: 'app-menu-customizer',
  imports: [TranslocoModule, Dialog, ButtonModule, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [draggable]="false"
      [style]="{ width: '28rem', maxWidth: '94vw' }"
      [header]="'menu.customize.title' | transloco"
    >
      <p class="mb-4 text-xs text-muted-color">{{ 'menu.customize.hint' | transloco }}</p>

      <ul class="thin-scroll flex max-h-[55vh] flex-col gap-0.5 overflow-y-auto pe-1">
        @for (row of menu.flatRows(); track row.item.id) {
          @if (row.isSection) {
            <li class="px-1 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-color/70">
              {{ row.item.labelKey | transloco }}
            </li>
          } @else {
            <li
              class="flex items-center gap-2 rounded-lg px-2 py-1.5"
              [class.opacity-45]="menu.isHidden(row.item.id)"
              [style.padding-inline-start.rem]="0.5 + row.depth * 1.1"
            >
              @if (row.item.icon) {
                <i [class]="row.item.icon" class="shrink-0 text-sm text-muted-color"></i>
              }
              <span class="truncate-1 flex-1 text-sm">{{ row.item.labelKey | transloco }}</span>

              @if (row.pinnable && !menu.isHidden(row.item.id)) {
                <button
                  type="button"
                  (click)="menu.togglePin(row.item.id)"
                  [pTooltip]="'menu.customize.pin' | transloco"
                  tooltipPosition="top"
                  class="grid size-8 place-items-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                  [class.text-primary]="menu.isPinned(row.item.id)"
                  [class.text-muted-color]="!menu.isPinned(row.item.id)"
                >
                  <i class="pi text-sm" [class.pi-star-fill]="menu.isPinned(row.item.id)" [class.pi-star]="!menu.isPinned(row.item.id)"></i>
                </button>
              }
              <button
                type="button"
                (click)="menu.toggleHidden(row.item.id)"
                [pTooltip]="'menu.customize.show' | transloco"
                tooltipPosition="top"
                class="grid size-8 place-items-center rounded-lg text-muted-color hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <i class="pi text-sm" [class.pi-eye]="!menu.isHidden(row.item.id)" [class.pi-eye-slash]="menu.isHidden(row.item.id)"></i>
              </button>
            </li>
          }
        }
      </ul>

      <ng-template #footer>
        <p-button
          [label]="'menu.customize.reset' | transloco"
          icon="pi pi-refresh"
          severity="secondary"
          [text]="true"
          size="small"
          (onClick)="menu.reset()"
        />
        <p-button
          [label]="'common.done' | transloco"
          size="small"
          (onClick)="visible.set(false)"
        />
      </ng-template>
    </p-dialog>
  `,
})
export class MenuCustomizer {
  protected readonly menu = inject(MenuService);
  readonly visible = model<boolean>(false);
}
