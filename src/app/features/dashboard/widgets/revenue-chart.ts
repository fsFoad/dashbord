import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Skeleton } from 'primeng/skeleton';
import { DashboardStats } from '../../../core/models/api.model';
import { baseChartOptions, chartColors, monthLabels } from '../../../core/utils/chart-theme';
import { ChartBase } from './chart-base';

@Component({
  selector: 'app-revenue-chart',
  imports: [TranslocoModule, ChartModule, Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="surface-card h-full p-5">
      <h2 class="mb-4 flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
        <i class="pi pi-chart-line text-primary"></i>
        {{ 'charts.revenue' | transloco }}
      </h2>
      @if (chartData()) {
        <div class="h-64" dir="ltr">
          <p-chart type="line" [data]="chartData()" [options]="chartOptions()" />
        </div>
      } @else {
        <p-skeleton height="16rem" borderRadius="0.75rem" />
      }
    </div>
  `,
})
export class RevenueChart extends ChartBase {
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
    const lang = this.settings.language();
    const c = chartColors();
    this.chartData.set({
      labels: monthLabels(lang),
      datasets: [
        {
          label: this.transloco.translate('charts.revenue'),
          data: s.revenue,
          borderColor: c.primary,
          backgroundColor: c.primary + '22',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          borderWidth: 2,
        },
      ],
    });
    this.chartOptions.set(baseChartOptions(this.settings.isRtl()));
  }
}
