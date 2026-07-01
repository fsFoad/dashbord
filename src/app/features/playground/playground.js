import { __decorate } from "tslib";
import { HttpClient, HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { TIMEOUT_MS } from '../../core/interceptors/http-context';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePicker } from '../../shared/components/date-picker/date-picker';
import { SkeletonTable } from '../../shared/components/skeleton/skeleton-table';
import { Breadcrumb } from '../../layout/components/breadcrumb/breadcrumb';
/**
 * Phase-2 playground: every button triggers one piece of the technical core
 * (mock API, loading bar, retry, timeout, status mapping, toasts, confirm,
 * global error handler) so it can be verified by eye.
 */
let Playground = class Playground {
    http = inject(HttpClient);
    api = inject(ProjectsApiService);
    toast = inject(ToastService);
    confirm = inject(ConfirmService);
    notifications = inject(NotificationService);
    busy = signal(false);
    projects = signal([]);
    // breadcrumb overflow showcase: a 50-level trail (last item is the current page)
    demoCrumbs = Array.from({ length: 50 }, (_, i) => ({
        label: `سطح ${i + 1}`,
        route: i < 49 ? '/playground' : undefined,
    }));
    // a trail whose labels are individually very long, to show per-crumb truncation
    demoLongCrumbs = [
        { label: 'پروژه‌ها', route: '/playground' },
        { label: 'گزارش جامع بین‌بخشی فصلی واحدهای تابعه و ستادی سازمان', route: '/playground' },
        { label: 'پیوست شماره دوازده با عنوان بسیار طولانی برای آزمایش بریدن تک‌خطی' },
    ];
    // date-picker showcase models
    pDate = null;
    pRange = null;
    pTime = null;
    pTimeRange = null;
    loadProjects() {
        this.busy.set(true);
        this.api.list({ page: 1, size: 6 }).subscribe({
            next: (res) => {
                this.projects.set(res.items);
                this.busy.set(false);
                this.toast.success('playground.success.toast', { n: res.total });
            },
            error: () => this.busy.set(false), // toast already shown by interceptor
        });
    }
    fire(status) {
        this.http.get(`/api/demo/error/${status}`).subscribe({ error: () => { } });
    }
    network() {
        // Fails with status 0 → retried twice by the interceptor, then toasted.
        this.http.get('/api/demo/network').subscribe({ error: () => { } });
    }
    timeoutDemo() {
        // Server "answers" after 8s, but this request allows only 3s.
        const context = new HttpContext().set(TIMEOUT_MS, 3_000);
        this.http.get('/api/demo/slow', { params: { ms: 8_000 }, context }).subscribe({ error: () => { } });
    }
    async confirmDemo() {
        const yes = await this.confirm.delete('پروژه نمونه');
        if (yes)
            this.toast.success('playground.confirm.done');
        else
            this.toast.info('playground.confirm.cancelled');
    }
    crash() {
        // Reaches the GlobalErrorHandler (console + generic toast).
        throw new Error('Playground demo crash — everything is fine!');
    }
};
Playground = __decorate([
    Component({
        selector: 'app-playground',
        imports: [JsonPipe, FormsModule, TranslocoModule, ButtonModule, SkeletonTable, DatePicker, Breadcrumb],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'playground.title' | transloco }}
    </h1>
    <p class="mt-1 text-sm text-muted-color">{{ 'playground.subtitle' | transloco }}</p>

    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <!-- success -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.success.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.success.hint' | transloco }}</p>
        <p-button
          icon="pi pi-check"
          severity="success"
          [label]="'playground.success.btn' | transloco"
          [loading]="busy()"
          (onClick)="loadProjects()"
        />
      </div>

      <!-- http error statuses -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.errors.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.errors.hint' | transloco }}</p>
        <div class="flex flex-wrap gap-2">
          <p-button label="404" severity="warn" size="small" (onClick)="fire(404)" />
          <p-button label="403" severity="warn" size="small" (onClick)="fire(403)" />
          <p-button label="409" severity="warn" size="small" (onClick)="fire(409)" />
          <p-button label="500" severity="danger" size="small" (onClick)="fire(500)" />
        </div>
      </div>

      <!-- network + retry -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.network.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.network.hint' | transloco }}</p>
        <p-button
          icon="pi pi-wifi"
          severity="danger"
          [label]="'playground.network.btn' | transloco"
          (onClick)="network()"
        />
      </div>

      <!-- timeout -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.timeout.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.timeout.hint' | transloco }}</p>
        <p-button
          icon="pi pi-clock"
          severity="secondary"
          [label]="'playground.timeout.btn' | transloco"
          (onClick)="timeoutDemo()"
        />
      </div>

      <!-- confirm -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.confirm.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.confirm.hint' | transloco }}</p>
        <p-button
          icon="pi pi-trash"
          severity="danger"
          [outlined]="true"
          [label]="'playground.confirm.btn' | transloco"
          (onClick)="confirmDemo()"
        />
      </div>

      <!-- live notification (mock websocket) -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.socket.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.socket.hint' | transloco }}</p>
        <p-button
          icon="pi pi-bell"
          severity="info"
          [label]="'playground.socket.btn' | transloco"
          (onClick)="notifications.pushDemo()"
        />
      </div>

      <!-- runtime crash -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <h3 class="font-semibold">{{ 'playground.crash.title' | transloco }}</h3>
        <p class="mb-4 mt-1 text-xs text-muted-color">{{ 'playground.crash.hint' | transloco }}</p>
        <p-button
          icon="pi pi-bolt"
          severity="contrast"
          [label]="'playground.crash.btn' | transloco"
          (onClick)="crash()"
        />
      </div>
    </div>

    <!-- Universal date/time picker showcase -->
    <h2 class="mt-10 text-lg font-bold text-surface-900 dark:text-surface-0">
      {{ 'playground.picker.title' | transloco }}
    </h2>
    <p class="mt-1 text-sm text-muted-color">{{ 'playground.picker.hint' | transloco }}</p>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-4 dark:border-surface-800 dark:bg-surface-900">
        <h4 class="mb-2 text-sm font-semibold">{{ 'playground.picker.date' | transloco }}</h4>
        <app-date-picker mode="date" [(ngModel)]="pDate" />
        <code class="mt-2 block truncate-1 text-[11px] text-muted-color" dir="ltr">{{ pDate | json }}</code>
      </div>
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-4 dark:border-surface-800 dark:bg-surface-900">
        <h4 class="mb-2 text-sm font-semibold">{{ 'playground.picker.range' | transloco }}</h4>
        <app-date-picker mode="date-range" [(ngModel)]="pRange" />
        <code class="mt-2 block truncate-1 text-[11px] text-muted-color" dir="ltr">{{ pRange | json }}</code>
      </div>
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-4 dark:border-surface-800 dark:bg-surface-900">
        <h4 class="mb-2 text-sm font-semibold">{{ 'playground.picker.time' | transloco }}</h4>
        <app-date-picker mode="time" [(ngModel)]="pTime" />
        <code class="mt-2 block truncate-1 text-[11px] text-muted-color" dir="ltr">{{ pTime | json }}</code>
      </div>
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-4 dark:border-surface-800 dark:bg-surface-900">
        <h4 class="mb-2 text-sm font-semibold">{{ 'playground.picker.timeRange' | transloco }}</h4>
        <app-date-picker mode="time-range" [(ngModel)]="pTimeRange" />
        <code class="mt-2 block truncate-1 text-[11px] text-muted-color" dir="ltr">{{ pTimeRange | json }}</code>
      </div>
    </div>

    <!-- Breadcrumb overflow showcase (50 levels) -->
    <h2 class="mt-10 text-lg font-bold text-surface-900 dark:text-surface-0">
      {{ 'playground.breadcrumb.title' | transloco }}
    </h2>
    <p class="mt-1 text-sm text-muted-color">{{ 'playground.breadcrumb.hint' | transloco }}</p>
    <div class="mt-4 flex flex-col gap-4">
      <!-- Mimics the topbar width budget: breadcrumb on the start, fixed actions on the end -->
      <div class="flex items-center gap-2 rounded-2xl border border-surface-200 bg-surface-0 p-3 dark:border-surface-800 dark:bg-surface-900">
        <div class="min-w-0 flex-1">
          <app-breadcrumb [items]="demoCrumbs" />
        </div>
        <div class="flex shrink-0 items-center gap-1 text-muted-color">
          <span class="grid size-9 place-items-center rounded-lg border border-surface-200 dark:border-surface-700"><i class="pi pi-search text-sm"></i></span>
          <span class="grid size-9 place-items-center rounded-lg border border-surface-200 dark:border-surface-700"><i class="pi pi-bell text-sm"></i></span>
        </div>
      </div>
      <!-- A single very long crumb to show per-item truncation -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-3 dark:border-surface-800 dark:bg-surface-900">
        <app-breadcrumb [items]="demoLongCrumbs" />
      </div>
    </div>

    <!-- result area: skeleton while loading, then the data -->
    <div class="mt-6">
      @if (busy()) {
        <app-skeleton-table [rows]="5" [cols]="4" />
      } @else if (projects().length) {
        <div class="overflow-hidden rounded-2xl border border-surface-200 bg-surface-0 dark:border-surface-800 dark:bg-surface-900">
          <div class="grid grid-cols-12 gap-2 border-b border-surface-200 p-3 text-xs font-semibold text-muted-color dark:border-surface-800">
            <span class="col-span-5">{{ 'playground.table.name' | transloco }}</span>
            <span class="col-span-3">{{ 'playground.table.owner' | transloco }}</span>
            <span class="col-span-2">{{ 'playground.table.status' | transloco }}</span>
            <span class="col-span-2">{{ 'playground.table.progress' | transloco }}</span>
          </div>
          @for (p of projects(); track p.id) {
            <div class="grid grid-cols-12 items-center gap-2 border-b border-surface-100 p-3 text-sm last:border-0 dark:border-surface-800/60">
              <span class="truncate-1 col-span-5 font-medium">{{ p.name }}</span>
              <span class="truncate-1 col-span-3 text-muted-color">{{ p.owner }}</span>
              <span class="col-span-2">
                <span
                  class="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  [class.bg-green-100]="p.status === 'active'"
                  [class.text-green-700]="p.status === 'active'"
                  [class.bg-amber-100]="p.status === 'paused'"
                  [class.text-amber-700]="p.status === 'paused'"
                  [class.bg-surface-200]="p.status === 'done'"
                  [class.text-surface-600]="p.status === 'done'"
                >
                  {{ 'status.' + p.status | transloco }}
                </span>
              </span>
              <span class="col-span-2">
                <span class="block h-1.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
                  <span class="block h-full bg-primary" [style.width.%]="p.progress"></span>
                </span>
              </span>
            </div>
          }
        </div>
      }
    </div>
  `,
    })
], Playground);
export { Playground };
