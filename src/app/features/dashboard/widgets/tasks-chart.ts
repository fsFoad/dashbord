import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ChartModule } from 'primeng/chart';
import { Skeleton } from 'primeng/skeleton';
import { DashboardStats } from '../../../core/models/api.model';
import { baseChartOptions, chartColors, weekdayLabels } from '../../../core/utils/chart-theme';
import { ChartBase } from './chart-base';

@Component({
  selector: 'app-tasks-chart',
  imports: [TranslocoModule, ChartModule, Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-full rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
      <h2 class="mb-4 flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
        <i class="pi pi-chart-bar text-primary"></i>
        {{ 'charts.tasksWeekly' | transloco }}
      </h2>
      @if (chartData()) {
        <div class="h-64" dir="ltr">
          <p-chart type="bar" [data]="chartData()" [options]="chartOptions()" />
        </div>
      } @else {
        <p-skeleton height="16rem" borderRadius="0.75rem" />
      }
    </div>
  `,
})
export class TasksChart extends ChartBase {
  readonly stats = input.required<DashboardStats | null>();
  private readonly transloco = inject(TranslocoService);

  protected trigger(): void {
    this.stats();
  }

  protected rebuild(): void {
    const s = this.stats();
    if (!s) {
      this.chartData.set(null);
      return;
    }
    const t = (k: string) => this.transloco.translate(k);
    const c = chartColors();
    this.chartData.set({
      labels: weekdayLabels(this.settings.language()),
      datasets: [
        { label: t('charts.tasksNew'), data: s.tasksNew, backgroundColor: c.series[1], borderRadius: 6 },
        { label: t('charts.tasksDone'), data: s.tasksDone, backgroundColor: c.primary, borderRadius: 6 },
      ],
    });
    this.chartOptions.set(baseChartOptions(this.settings.isRtl()));
  }
}
