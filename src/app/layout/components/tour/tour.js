import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { TourService } from '../../../core/services/tour.service';
/**
 * Onboarding tour overlay: dims the screen, draws a highlight ring around the
 * current [data-tour] target and shows a step card next to it.
 */
let Tour = class Tour {
    tour = inject(TourService);
    /** Place the card under the target if there's room, otherwise above; clamp to viewport. */
    cardTop = computed(() => {
        const r = this.tour.rect();
        if (!r)
            return 80;
        const below = r.bottom + 14;
        return below + 190 < window.innerHeight ? below : Math.max(12, r.top - 200);
    });
    cardLeft = computed(() => {
        const r = this.tour.rect();
        if (!r)
            return 16;
        const w = 288;
        return Math.min(Math.max(12, r.left + r.width / 2 - w / 2), window.innerWidth - w - 12);
    });
};
Tour = __decorate([
    Component({
        selector: 'app-tour',
        imports: [TranslocoModule, ButtonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        host: { '(window:resize)': 'tour.remeasure()' },
        template: `
    @if (tour.step(); as step) {
      <div class="fixed inset-0 z-[1400]">
        <!-- backdrop -->
        <div class="absolute inset-0 bg-black/50" (click)="tour.finish()"></div>

        <!-- highlight ring -->
        @if (tour.rect(); as r) {
          <div
            class="pointer-events-none absolute rounded-xl ring-4 ring-primary transition-all duration-200"
            [style.top.px]="r.top - 6"
            [style.left.px]="r.left - 6"
            [style.width.px]="r.width + 12"
            [style.height.px]="r.height + 12"
            style="box-shadow: 0 0 0 9999px rgba(0,0,0,.5)"
          ></div>

          <!-- step card -->
          <div
            class="absolute w-72 max-w-[88vw] rounded-2xl border border-surface-200 bg-surface-0 p-4 shadow-2xl dark:border-surface-700 dark:bg-surface-900"
            [style.top.px]="cardTop()"
            [style.left.px]="cardLeft()"
          >
            <div class="mb-1 text-[11px] font-semibold text-primary">
              {{ (tour.index() ?? 0) + 1 }} / {{ tour.total }}
            </div>
            <h3 class="text-sm font-bold">{{ step.titleKey | transloco }}</h3>
            <p class="mt-1.5 text-xs leading-relaxed text-muted-color">{{ step.bodyKey | transloco }}</p>

            <div class="mt-4 flex items-center justify-between">
              <button type="button" (click)="tour.finish()" class="text-xs text-muted-color hover:underline">
                {{ 'tour.skip' | transloco }}
              </button>
              <div class="flex gap-2">
                @if ((tour.index() ?? 0) > 0) {
                  <p-button [label]="'wizard.back' | transloco" severity="secondary" [text]="true" size="small" (onClick)="tour.prev()" />
                }
                <p-button
                  [label]="((tour.index() ?? 0) + 1 >= tour.total ? 'tour.done' : 'wizard.next') | transloco"
                  size="small"
                  (onClick)="tour.next()"
                />
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
    })
], Tour);
export { Tour };
