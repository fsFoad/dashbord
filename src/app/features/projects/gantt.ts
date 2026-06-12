import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { map } from 'rxjs';
import { Project } from '../../core/models/api.model';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { SettingsStore } from '../../core/services/settings.store';
import { JALALI_MONTHS, dateToJalali } from '../../core/utils/jalali';
import { EN_MONTHS } from '../../core/utils/chart-theme';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonTable } from '../../shared/components/skeleton/skeleton-table';

interface GanttRow {
  project: Project;
  /** percentages relative to the visible window (logical start side) */
  start: number;
  width: number;
  clippedStart: boolean;
  clippedEnd: boolean;
}

/**
 * Custom Gantt/timeline (pure Tailwind): a 6-month window with project bars
 * positioned by their start→due dates. RTL-safe via inset-inline positioning;
 * month labels follow the active calendar (Jalali for fa).
 */
@Component({
  selector: 'app-gantt',
  imports: [RouterLink, TranslocoModule, Tooltip, LocalizedDatePipe, SkeletonTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gantt.html',
})
export class Gantt {
  private readonly api = inject(ProjectsApiService);
  private readonly settings = inject(SettingsStore);

  /** Window: from 2 months ago to 4 months ahead (month-aligned). */
  private readonly winStart = (() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth() - 2, 1, 12);
  })();
  private readonly winEnd = (() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth() + 4, 1, 12);
  })();
  private readonly total = this.winEnd.getTime() - this.winStart.getTime();

  protected readonly loading = computed(() => this.rowsRaw() === null);

  private readonly rowsRaw = toSignal<Project[] | null>(
      this.api.list({ size: 50, sortField: 'dueDate', sortOrder: 1 }).pipe(
          map((r) => r.items)
      ),
      { initialValue: null },
  );
  protected readonly months = computed(() => {
    const lang = this.settings.language();
    const out: { label: string; width: number }[] = [];
    for (let k = 0; k < 6; k++) {
      const a = new Date(this.winStart.getFullYear(), this.winStart.getMonth() + k, 1, 12);
      const b = new Date(this.winStart.getFullYear(), this.winStart.getMonth() + k + 1, 1, 12);
      const label =
        lang === 'fa' ? JALALI_MONTHS[dateToJalali(a).m - 1] : EN_MONTHS[a.getMonth()];
      out.push({ label, width: ((b.getTime() - a.getTime()) / this.total) * 100 });
    }
    return out;
  });

  protected readonly todayPos = computed(() => {
    const t = Date.now();
    return Math.min(100, Math.max(0, ((t - this.winStart.getTime()) / this.total) * 100));
  });

  protected readonly rows = computed<GanttRow[]>(() => {
    const list = this.rowsRaw() ?? [];
    return list
      .map((project) => {
        const s = new Date(project.startDate).getTime();
        const e = new Date(project.dueDate).getTime();
        const cs = Math.max(s, this.winStart.getTime());
        const ce = Math.min(e, this.winEnd.getTime());
        if (ce <= this.winStart.getTime() || cs >= this.winEnd.getTime()) return null;
        const start = ((cs - this.winStart.getTime()) / this.total) * 100;
        const width = Math.max(1.2, ((ce - cs) / this.total) * 100);
        return {
          project,
          start,
          width,
          clippedStart: s < this.winStart.getTime(),
          clippedEnd: e > this.winEnd.getTime(),
        } satisfies GanttRow;
      })
      .filter((r): r is GanttRow => r !== null);
  });

  protected barClass(p: Project): string {
    if (p.status === 'done') return 'bg-surface-400 dark:bg-surface-500';
    if (p.status === 'paused') return 'bg-amber-400';
    return 'bg-primary';
  }
}
