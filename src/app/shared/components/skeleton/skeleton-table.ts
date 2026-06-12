import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

/** Table-shaped loading placeholder (header row + N data rows). */
@Component({
  selector: 'app-skeleton-table',
  imports: [Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-hidden rounded-2xl border border-surface-200 bg-surface-0 dark:border-surface-800 dark:bg-surface-900">
      <div class="flex gap-4 border-b border-surface-200 p-4 dark:border-surface-800">
        @for (c of colsArray(); track $index) {
          <p-skeleton class="flex-1" height="1rem" />
        }
      </div>
      @for (r of rowsArray(); track $index) {
        <div class="flex gap-4 p-4" [class.bg-surface-50]="$index % 2 === 1" [class.dark:bg-surface-800]="$index % 2 === 1">
          @for (c of colsArray(); track $index) {
            <p-skeleton class="flex-1" height="0.85rem" />
          }
        </div>
      }
    </div>
  `,
})
export class SkeletonTable {
  readonly rows = input<number>(5);
  readonly cols = input<number>(4);

  protected rowsArray(): unknown[] { return Array.from({ length: this.rows() }); }
  protected colsArray(): unknown[] { return Array.from({ length: this.cols() }); }
}
