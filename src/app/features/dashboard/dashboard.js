import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { StatsApiService } from '../../core/services/stats-api.service';
import { DashboardWidgetsService, } from '../../core/services/dashboard-widgets.service';
import { HasRoleDirective } from '../../core/directives/has-role.directive';
import { KpiWidget } from './widgets/kpi-widget';
import { RevenueChart } from './widgets/revenue-chart';
import { StatusChart } from './widgets/status-chart';
import { TasksChart } from './widgets/tasks-chart';
import { RecentActivity } from './recent-activity';
import { AiInsight } from './widgets/ai-insight';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
/**
 * Overview dashboard: a 12-column widget grid the user can rearrange with
 * drag & drop (edit mode) and hide/show widgets. Layout persists per user.
 * Heavy chart widgets are wrapped in @defer with skeleton placeholders.
 */
let Dashboard = class Dashboard {
    api = inject(StatsApiService);
    widgets = inject(DashboardWidgetsService);
    stats = toSignal(this.api.stats(), { initialValue: null });
    dragIndex = signal(null);
    overIndex = signal(null);
    onDragStart(i) {
        this.dragIndex.set(i);
    }
    onDragOver(e, i) {
        if (this.dragIndex() === null)
            return;
        e.preventDefault();
        this.overIndex.set(i);
    }
    onDrop(i) {
        const from = this.dragIndex();
        if (from !== null && from !== i)
            this.widgets.move(from, i);
        this.dragIndex.set(null);
        this.overIndex.set(null);
    }
    onDragEnd() {
        this.dragIndex.set(null);
        this.overIndex.set(null);
    }
    hide(id) {
        this.widgets.hide(id);
    }
};
Dashboard = __decorate([
    Component({
        selector: 'app-dashboard-page',
        imports: [
            TranslocoModule, ButtonModule, Tooltip, HasRoleDirective,
            KpiWidget, RevenueChart, StatusChart, TasksChart, RecentActivity, SkeletonCard, AiInsight
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './dashboard.html',
    })
], Dashboard);
export { Dashboard };
