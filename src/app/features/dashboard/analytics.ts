import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DashboardStats } from '../../core/models/api.model';
import { StatsApiService } from '../../core/services/stats-api.service';
import {
  DatePickerComponent, DateRange,
} from '../../shared/components/date-picker/date-picker';
import { KpiWidget } from './widgets/kpi-widget';
import { RevenueChart } from './widgets/revenue-chart';
import { StatusChart } from './widgets/status-chart';
import { TasksChart } from './widgets/tasks-chart';

/**
 * Second dashboard type: analytics. A Jalali-aware date-range filter drives
 * the (mock) stats endpoint — change the range and watch every chart update.
 */
@Component({
  selector: 'app-analytics',
  imports: [
    TranslocoModule, FormsModule, ButtonModule,
    DatePickerComponent, KpiWidget, RevenueChart, StatusChart, TasksChart,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
          {{ 'analytics.title' | transloco }}
        </h1>
        <p class="mt-1 text-sm text-muted-color">{{ 'analytics.subtitle' | transloco }}</p>
      </div>
      <div class="flex items-center gap-2">
        <app-date-picker
          mode="date-range"
          class="w-64"
          [ngModel]="range()"
          (ngModelChange)="onRange($event)"
        />
        <p-button icon="pi pi-refresh" severity="secondary" size="small" (onClick)="reload()" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <app-kpi-widget [stats]="stats()" />
      </div>
      <div class="col-span-12 xl:col-span-7">
        <app-revenue-chart [stats]="stats()" />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <app-status-chart [stats]="stats()" />
      </div>
      <div class="col-span-12">
        <app-tasks-chart [stats]="stats()" />
      </div>
    </div>
  `,
})
export class Analytics {
  private readonly api = inject(StatsApiService);

  protected readonly stats = signal<DashboardStats | null>(null);
  protected readonly range = signal<DateRange | null>({
    start: new Date(Date.now() - 30 * 864e5),
    end: new Date(),
  });

  constructor() {
    effect(() => {
      const r = this.range();
      // refetch whenever a complete range is picked
      if (r && r.start && !r.end) return;
      this.fetch(r);
    });
  }

  protected onRange(r: DateRange | null): void {
    this.range.set(r);
  }

  protected reload(): void {
    this.fetch(this.range());
  }

  private fetch(r: DateRange | null): void {
    this.stats.set(null); // show skeletons
    this.api.stats({ from: r?.start ?? null, to: r?.end ?? null }).subscribe({
      next: (s) => this.stats.set(s),
    });
  }
}
