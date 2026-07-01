import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { TagModule } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
/**
 * Four KPI cards. Uses CSS *container queries* (@container) so the cards
 * adapt to the WIDGET's own width — not the viewport — which matters once
 * widgets can be rearranged into narrow columns.
 */
let KpiWidget = class KpiWidget {
    stats = input.required();
    cards = computed(() => {
        const s = this.stats();
        return [
            { titleKey: 'dashboard.kpi.projects', icon: 'pi pi-folder', value: s?.kpis.projects ?? 0, delta: s?.kpis.deltas[0] ?? 0 },
            { titleKey: 'dashboard.kpi.tasks', icon: 'pi pi-check-square', value: s?.kpis.tasks ?? 0, delta: s?.kpis.deltas[1] ?? 0 },
            { titleKey: 'dashboard.kpi.members', icon: 'pi pi-users', value: s?.kpis.members ?? 0, delta: s?.kpis.deltas[2] ?? 0 },
            { titleKey: 'dashboard.kpi.overdue', icon: 'pi pi-clock', value: s?.kpis.overdue ?? 0, delta: s?.kpis.deltas[3] ?? 0 },
        ];
    });
    abs(n) {
        return Math.abs(n);
    }
};
KpiWidget = __decorate([
    Component({
        selector: 'app-kpi-widget',
        imports: [TranslocoModule, TagModule, Skeleton, CountUpDirective],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="@container">
      <div class="grid grid-cols-1 gap-4 @md:grid-cols-2 @3xl:grid-cols-4">
        @for (k of cards(); track k.titleKey) {
          <div class="surface-card lift animate-fade-up p-5">
            @if (stats(); as s) {
              <div class="flex items-start justify-between">
                <span class="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-contrast shadow-lg shadow-primary/30">
                  <i [class]="k.icon" class="text-lg"></i>
                </span>
                <p-tag
                  [value]="abs(k.delta) + '%'"
                  [severity]="k.delta >= 0 ? 'success' : 'danger'"
                  [icon]="k.delta >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"
                />
              </div>
              <div class="mt-4 text-3xl font-bold text-surface-900 dark:text-surface-0">
                <span [appCountUp]="k.value">{{ k.value }}</span>
              </div>
              <div class="truncate-1 mt-1 text-sm text-muted-color">{{ k.titleKey | transloco }}</div>
            } @else {
              <p-skeleton width="2.75rem" height="2.75rem" borderRadius="0.75rem" />
              <p-skeleton width="50%" height="1.8rem" styleClass="mt-4!" />
              <p-skeleton width="70%" height="0.9rem" styleClass="mt-2!" />
            }
          </div>
        }
      </div>
    </div>
  `,
    })
], KpiWidget);
export { KpiWidget };
