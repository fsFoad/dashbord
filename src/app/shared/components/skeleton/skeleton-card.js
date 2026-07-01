import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
/** Card-shaped loading placeholder. Use inside @placeholder of @defer blocks. */
let SkeletonCard = class SkeletonCard {
    rows = input(4);
    header = input(true);
    rowsArray() {
        return Array.from({ length: this.rows() });
    }
};
SkeletonCard = __decorate([
    Component({
        selector: 'app-skeleton-card',
        imports: [Skeleton],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
      @if (header()) {
        <div class="mb-4 flex items-center gap-3">
          <p-skeleton shape="circle" size="2.5rem" />
          <p-skeleton width="40%" height="1rem" />
        </div>
      }
      <div class="flex flex-col gap-3">
        @for (row of rowsArray(); track $index) {
          <p-skeleton [width]="$index % 3 === 2 ? '60%' : '100%'" height="0.9rem" />
        }
      </div>
    </div>
  `,
    })
], SkeletonCard);
export { SkeletonCard };
