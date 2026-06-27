import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { StatsApiService } from '../../core/services/stats-api.service';
import {
  DashboardWidgetsService, WidgetId,
} from '../../core/services/dashboard-widgets.service';
import { HasRoleDirective } from '../../core/directives/has-role.directive';
import { KpiWidget } from './widgets/kpi-widget';
import { RevenueChart } from './widgets/revenue-chart';
import { StatusChart } from './widgets/status-chart';
import { TasksChart } from './widgets/tasks-chart';
import { RecentActivity } from './recent-activity';
import { AiInsight } from './widgets/ai-insight';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
import {SettingsStore} from "@core/services/settings.store";

/**
 * Overview dashboard: a 12-column widget grid the user can rearrange with
 * drag & drop (edit mode) and hide/show widgets. Layout persists per user.
 * Heavy chart widgets are wrapped in @defer with skeleton placeholders.
 */
@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink, TranslocoModule, ButtonModule, Tooltip, HasRoleDirective,
    KpiWidget, RevenueChart, StatusChart, TasksChart, RecentActivity, SkeletonCard, AiInsight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly api = inject(StatsApiService);
  protected readonly widgets = inject(DashboardWidgetsService);

  protected readonly stats = toSignal(this.api.stats(), { initialValue: null });

  private readonly dragIndex = signal<number | null>(null);
  protected readonly overIndex = signal<number | null>(null);
  private readonly settings = inject(SettingsStore);
  constructor() {
    this.settings.setThemePack('aurora');
  }
  protected onDragStart(i: number): void {
    this.dragIndex.set(i);
  }

  protected onDragOver(e: DragEvent, i: number): void {
    if (this.dragIndex() === null) return;
    e.preventDefault();
    this.overIndex.set(i);
  }

  protected onDrop(i: number): void {
    const from = this.dragIndex();
    if (from !== null && from !== i) this.widgets.move(from, i);
    this.dragIndex.set(null);
    this.overIndex.set(null);
  }

  protected onDragEnd(): void {
    this.dragIndex.set(null);
    this.overIndex.set(null);
  }

  protected hide(id: WidgetId): void {
    this.widgets.hide(id);
  }
}
