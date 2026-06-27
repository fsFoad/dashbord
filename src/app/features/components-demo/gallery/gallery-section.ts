import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A titled card that frames one PrimeNG component demo in the gallery. */
@Component({
  selector: 'app-gallery-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-full flex-col rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
      <div class="mb-4">
        <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-0">{{ title() }}</h3>
        @if (hint()) {
          <p class="mt-0.5 text-xs text-muted-color">{{ hint() }}</p>
        }
      </div>
      <div class="flex flex-1 flex-wrap items-start gap-3">
        <ng-content />
      </div>
    </div>
  `,
})
export class GalleryCard {
  readonly title = input.required<string>();
  readonly hint = input<string>('');
}
