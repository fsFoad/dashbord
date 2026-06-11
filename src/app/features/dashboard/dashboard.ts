import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RecentActivity } from './recent-activity';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
import { HasRoleDirective } from '../../core/directives/has-role.directive';

interface Kpi {
  titleKey: string;
  value: string;
  delta: string;
  up: boolean;
  icon: string;
}

/**
 * Phase-1 demo page. Its only job is to prove the foundation works:
 * custom Tailwind cards AND PrimeNG components both follow the active
 * theme/custom color/surface/dark mode/font — and the page is responsive.
 */
@Component({
  selector: 'app-dashboard-page',
  imports: [TranslocoModule, ButtonModule, TagModule, RecentActivity, SkeletonCard, HasRoleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
          {{ 'dashboard.title' | transloco }}
        </h1>
        <p class="mt-1 text-sm text-muted-color">{{ 'dashboard.subtitle' | transloco }}</p>
      </div>
      <div class="flex items-center gap-2">
        <p-button
          *appHasRole="'admin'"
          [label]="'dashboard.adminOnly' | transloco"
          icon="pi pi-shield"
          severity="secondary"
          [outlined]="true"
        />
        <p-button [label]="'dashboard.newProject' | transloco" icon="pi pi-plus" />
      </div>
    </div>

    <!-- KPI cards: pure Tailwind, themed via primeui tokens -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      @for (k of kpis; track k.titleKey) {
        <div
          class="rounded-2xl border border-surface-200 bg-surface-0 p-5 transition-shadow hover:shadow-md dark:border-surface-800 dark:bg-surface-900"
        >
          <div class="flex items-start justify-between">
            <span class="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <i [class]="k.icon" class="text-lg"></i>
            </span>
            <p-tag
              [value]="k.delta"
              [severity]="k.up ? 'success' : 'danger'"
              [icon]="k.up ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"
            />
          </div>
          <div class="mt-4 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ k.value }}</div>
          <div class="mt-1 truncate-1 text-sm text-muted-color">{{ k.titleKey | transloco }}</div>
        </div>
      }
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <!-- Deferred section: loads lazily, skeleton until ready -->
      <div class="xl:col-span-1">
        @defer (on viewport; prefetch on idle) {
          <app-recent-activity />
        } @placeholder {
          <app-skeleton-card [rows]="5" />
        } @loading (minimum 300ms) {
          <app-skeleton-card [rows]="5" />
        }
      </div>

      <!-- Placeholder for Phase 5 charts -->
      <div
        class="grid min-h-64 place-items-center rounded-2xl border border-dashed border-surface-300 text-sm text-muted-color dark:border-surface-700 xl:col-span-2"
      >
        {{ 'dashboard.chartsComingSoon' | transloco }}
      </div>
    </div>
  `,
})
export class Dashboard {
  protected readonly kpis: Kpi[] = [
    { titleKey: 'dashboard.kpi.projects', value: '24', delta: '12%', up: true, icon: 'pi pi-folder' },
    { titleKey: 'dashboard.kpi.tasks', value: '186', delta: '8%', up: true, icon: 'pi pi-check-square' },
    { titleKey: 'dashboard.kpi.members', value: '32', delta: '3%', up: true, icon: 'pi pi-users' },
    { titleKey: 'dashboard.kpi.overdue', value: '7', delta: '2%', up: false, icon: 'pi pi-clock' },
  ];
}
