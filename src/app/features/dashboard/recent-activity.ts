import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { ProjectsApiService } from '../../core/services/projects-api.service';

/**
 * Recent activity feed. Loaded lazily via @defer on the dashboard; fetches
 * from the mock API so the skeleton placeholder is actually visible.
 */
@Component({
  selector: 'app-recent-activity',
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
      <h2 class="mb-4 flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
        <i class="pi pi-history text-primary"></i>
        {{ 'dashboard.activity.title' | transloco }}
      </h2>

      <ul class="flex flex-col gap-1">
        @for (a of items(); track a.id) {
          <li class="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-surface-50 dark:hover:bg-surface-800">
            <span class="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <i [class]="a.icon" class="text-sm"></i>
            </span>
            <div class="min-w-0">
              <p class="text-sm text-surface-800 dark:text-surface-100">
                {{ a.messageKey | transloco: a.messageParams }}
              </p>
              <p class="mt-0.5 text-xs text-muted-color">
                @if (a.minutesAgo < 60) {
                  {{ 'time.minutesAgo' | transloco: { n: a.minutesAgo } }}
                } @else {
                  {{ 'time.hoursAgo' | transloco: { n: hours(a.minutesAgo) } }}
                }
              </p>
            </div>
          </li>
        } @empty {
          <li class="py-6 text-center text-sm text-muted-color">
            {{ 'dashboard.activity.empty' | transloco }}
          </li>
        }
      </ul>
    </div>
  `,
})
export class RecentActivity {
  private readonly api = inject(ProjectsApiService);
  protected readonly items = toSignal(this.api.activity(), { initialValue: [] });

  protected hours(minutes: number): number {
    return Math.round(minutes / 60);
  }
}
