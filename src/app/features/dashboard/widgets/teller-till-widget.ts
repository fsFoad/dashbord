import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { TagModule } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { TellerApiService } from '../../../core/services/teller-api.service';
import { SystemStatusLevel } from '../../../core/models/teller.model';

const STATUS_SEVERITY: Record<SystemStatusLevel, 'success' | 'warn' | 'danger'> = {
  online: 'success',
  degraded: 'warn',
  offline: 'danger',
};

/**
 * Optional widget: shows the signed-in teller's identity, cash-drawer (till)
 * balance and core banking system status. Hidden by default (see
 * DEFAULT_HIDDEN in DashboardWidgetsService) since it's only relevant to
 * branch/teller users — enable it from "hidden widgets" in edit mode.
 * Data is mocked today (GET /api/teller/dashboard); swapping the mock
 * interceptor for a real endpoint at that same URL is the whole migration.
 */
@Component({
  selector: 'app-teller-till-widget',
  imports: [TranslocoModule, TagModule, Skeleton, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="surface-card p-5">
      <h2 class="mb-4 flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
        <i class="pi pi-wallet text-primary"></i>
        {{ 'widgets.tellerTill' | transloco }}
      </h2>

      @if (data(); as d) {
        <div class="grid grid-cols-1 gap-5 @container lg:grid-cols-3">
          <!-- Profile -->
          <div class="flex items-start gap-3">
            <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-contrast shadow-lg shadow-primary/30">
              <i class="pi pi-user text-lg"></i>
            </span>
            <div class="min-w-0">
              <div class="truncate font-semibold text-surface-900 dark:text-surface-0">{{ d.profile.fullName }}</div>
              <div class="mt-0.5 text-xs text-muted-color">
                {{ 'teller.personnelNo' | transloco }}: {{ d.profile.personnelNo }}
              </div>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <p-tag [value]="d.profile.roleKey | transloco" severity="info" />
                <p-tag [value]="d.profile.branchCode + ' — ' + d.profile.branchName" severity="secondary" />
                <p-tag [value]="d.profile.accessLevelKey | transloco" severity="secondary" />
              </div>
            </div>
          </div>

          <!-- Till balance -->
          <div>
            <div class="text-xs text-muted-color">{{ 'teller.till.title' | transloco }} · {{ d.till.currency }}</div>
            <dl class="mt-2 flex flex-col gap-1.5">
              <div class="flex items-center justify-between text-sm">
                <dt class="text-muted-color">{{ 'teller.till.cash' | transloco }}</dt>
                <dd class="font-semibold text-surface-900 dark:text-surface-0">{{ d.till.cash | number }}</dd>
              </div>
              <div class="flex items-center justify-between text-sm">
                <dt class="text-muted-color">{{ 'teller.till.transfer' | transloco }}</dt>
                <dd class="font-semibold text-surface-900 dark:text-surface-0">{{ d.till.transfer | number }}</dd>
              </div>
            </dl>
            @if (d.till.others.length) {
              <div class="mt-3 text-xs text-muted-color">{{ 'teller.till.others' | transloco }}</div>
              <div class="mt-1 flex flex-col gap-1">
                @for (c of d.till.others; track c.code) {
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-muted-color">{{ c.code }}</span>
                    <span class="font-medium text-surface-900 dark:text-surface-0">{{ c.amount | number }}</span>
                  </div>
                }
              </div>
            }
          </div>

          <!-- System status -->
          <div>
            <div class="text-xs text-muted-color">{{ 'teller.system.title' | transloco }}</div>
            <div class="mt-2 flex flex-col gap-2">
              @for (s of d.systemStatus; track s.key) {
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-color">{{ s.labelKey | transloco }}</span>
                  <p-tag [value]="('teller.system.level.' + s.level) | transloco" [severity]="severity(s.level)" />
                </div>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <p-skeleton height="4rem" />
          <p-skeleton height="4rem" />
          <p-skeleton height="4rem" />
        </div>
      }
    </div>
  `,
})
export class TellerTillWidget {
  private readonly api = inject(TellerApiService);

  protected readonly data = toSignal(this.api.dashboard(), { initialValue: null });

  protected severity(level: SystemStatusLevel): 'success' | 'warn' | 'danger' {
    return STATUS_SEVERITY[level];
  }
}
