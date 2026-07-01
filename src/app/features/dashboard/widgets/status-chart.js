import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ChartModule } from 'primeng/chart';
import { Skeleton } from 'primeng/skeleton';
import { baseChartOptions, chartColors } from '../../../core/utils/chart-theme';
import { ChartBase } from './chart-base';
let StatusChart = class StatusChart extends ChartBase {
    stats = input.required();
    transloco = inject(TranslocoService);
    trigger() {
        this.stats();
    }
    rebuild() {
        const s = this.stats();
        if (!s) {
            this.chartData.set(null);
            return;
        }
        const t = (k) => this.transloco.translate(k);
        const c = chartColors();
        this.chartData.set({
            labels: [t('status.active'), t('status.paused'), t('status.done')],
            datasets: [
                {
                    data: [s.byStatus.active, s.byStatus.paused, s.byStatus.done],
                    backgroundColor: c.series,
                    borderWidth: 0,
                },
            ],
        });
        const opts = baseChartOptions(this.settings.isRtl());
        delete opts['scales'];
        opts.cutout = '62%';
        this.chartOptions.set(opts);
    }
};
StatusChart = __decorate([
    Component({
        selector: 'app-status-chart',
        imports: [TranslocoModule, ChartModule, Skeleton],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="surface-card h-full p-5">
      <h2 class="mb-4 flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
        <i class="pi pi-chart-pie text-primary"></i>
        {{ 'charts.byStatus' | transloco }}
      </h2>
      @if (chartData()) {
        <div class="grid h-64 place-items-center">
          <p-chart type="doughnut" [data]="chartData()" [options]="chartOptions()" styleClass="h-full" />
        </div>
      } @else {
        <p-skeleton height="16rem" borderRadius="0.75rem" />
      }
    </div>
  `,
    })
], StatusChart);
export { StatusChart };
