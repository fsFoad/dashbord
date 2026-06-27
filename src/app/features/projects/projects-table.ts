import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { Project, ProjectStatus } from '../../core/models/api.model';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker';
import { SavedViews } from '../../shared/components/saved-views/saved-views';

interface ColumnDef { field: string; labelKey: string }

/** Serializable snapshot of the table UI for Saved Views. */
export interface TableViewState {
  q: string;
  statusFilter: ProjectStatus[];
  columns: string[];
  sortField: string | null;
  sortOrder: number;
  rows: number;
}

/**
 * Advanced DataTable: server-side (mock) pagination + sorting, global search,
 * status filter, column visibility, multi-row selection with bulk delete,
 * CSV export, and an edit dialog that uses the universal date picker.
 */
@Component({
  selector: 'app-projects-table',
  imports: [
    RouterLink,
    FormsModule, TranslocoModule, TableModule, ButtonModule, InputTextModule,
    MultiSelect, Select, Dialog, TagModule, Tooltip, LocalizedDatePipe, DatePickerComponent,
    SavedViews,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects-table.html',
})
export class ProjectsTable {
  private readonly api = inject(ProjectsApiService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);

  // ---- table state ----
  protected readonly rows = signal<Project[]>([]);
  protected readonly total = signal(0);
  protected readonly loading = signal(true);
  protected readonly selected = signal<Project[]>([]);
  protected readonly pageSize = 8;

  private lastEvent: TableLazyLoadEvent = { first: 0, rows: this.pageSize };

  // ---- filters ----
  protected q = '';
  private qTimer: ReturnType<typeof setTimeout> | null = null;
  protected statusFilter: ProjectStatus[] = [];

  /** Snapshot persisted by Saved Views. */
  protected snapshot(): TableViewState {
    return {
      q: this.q,
      statusFilter: [...this.statusFilter],
      columns: this.visibleColumns.map((c) => c.field),
      sortField: (Array.isArray(this.lastEvent.sortField) ? this.lastEvent.sortField[0] : this.lastEvent.sortField) ?? null,
      sortOrder: this.lastEvent.sortOrder ?? 1,
      rows: this.lastEvent.rows ?? this.pageSize,
    };
  }

  protected applyView(s: TableViewState): void {
    this.q = s.q;
    this.statusFilter = [...s.statusFilter];
    this.visibleColumns = this.allColumns.filter((c) => s.columns.includes(c.field));
    this.lastEvent = {
      ...this.lastEvent,
      first: 0,
      rows: s.rows,
      sortField: s.sortField ?? undefined,
      sortOrder: s.sortOrder,
    };
    this.load(this.lastEvent);
  }

  protected clearView(): void {
    this.q = '';
    this.statusFilter = [];
    this.visibleColumns = this.allColumns.filter((c) => c.field !== 'updatedAt');
    this.reload();
  }

  // ---- columns ----
  protected readonly allColumns: ColumnDef[] = [
    { field: 'owner', labelKey: 'table.owner' },
    { field: 'status', labelKey: 'table.status' },
    { field: 'progress', labelKey: 'table.progress' },
    { field: 'dueDate', labelKey: 'table.dueDate' },
    { field: 'updatedAt', labelKey: 'table.updatedAt' },
  ];
  protected visibleColumns: ColumnDef[] = this.allColumns.filter((c) => c.field !== 'updatedAt');
  protected isCol(field: string): boolean {
    return this.visibleColumns.some((c) => c.field === field);
  }

  protected readonly statusOptions = [
    { value: 'active' as const }, { value: 'paused' as const }, { value: 'done' as const },
  ];

  protected readonly selectedCount = computed(() => this.selected().length);

  // ---- edit dialog ----
  protected readonly editOpen = signal(false);
  protected readonly saving = signal(false);
  protected editDraft: { id: number; name: string; status: ProjectStatus; progress: number; dueDate: Date | null } = {
    id: 0, name: '', status: 'active', progress: 0, dueDate: null,
  };

  // ---- data loading ----
  protected load(event: TableLazyLoadEvent): void {
    this.lastEvent = event;
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;
    const sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;

    this.loading.set(true);
    this.api
      .list({
        page: Math.floor(first / rows) + 1,
        size: rows,
        q: this.q.trim() || undefined,
        statuses: this.statusFilter.length ? this.statusFilter : undefined,
        sortField: sortField ?? undefined,
        sortOrder: event.sortOrder ?? 1,
      })
      .subscribe({
        next: (res) => {
          this.rows.set(res.items);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  protected reload(resetPage = true): void {
    if (resetPage) this.lastEvent = { ...this.lastEvent, first: 0 };
    this.load(this.lastEvent);
  }

  protected onSearch(value: string): void {
    this.q = value;
    if (this.qTimer) clearTimeout(this.qTimer);
    this.qTimer = setTimeout(() => this.reload(), 350);
  }

  protected onStatusFilter(): void {
    this.reload();
  }

  // ---- actions ----
  protected newProject(): void {
    this.router.navigate(['/projects/new']);
  }

  protected edit(p: Project): void {
    this.editDraft = {
      id: p.id, name: p.name, status: p.status, progress: p.progress,
      dueDate: p.dueDate ? new Date(p.dueDate) : null,
    };
    this.editOpen.set(true);
  }

  protected saveEdit(): void {
    if (!this.editDraft.name.trim()) return;
    this.saving.set(true);
    const d = this.editDraft;
    this.api
      .update(d.id, {
        name: d.name.trim(),
        status: d.status,
        progress: d.progress,
        dueDate: d.dueDate ? d.dueDate.toISOString() : undefined,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.editOpen.set(false);
          this.toast.success('table.saved');
          this.reload(false);
        },
        error: () => this.saving.set(false),
      });
  }

  protected async deleteOne(p: Project): Promise<void> {
    if (!(await this.confirm.delete(p.name))) return;
    this.api.remove(p.id).subscribe({
      next: () => {
        this.toast.success('table.deleted', { n: 1 });
        this.selected.set(this.selected().filter((s) => s.id !== p.id));
        this.reload(false);
      },
    });
  }

  protected async deleteSelected(): Promise<void> {
    const items = this.selected();
    if (!items.length) return;
    const yes = await this.confirm.ask({
      titleKey: 'confirm.deleteTitle',
      messageKey: 'table.bulkDeleteMessage',
      messageParams: { n: items.length },
      destructive: true,
    });
    if (!yes) return;
    this.api.bulkDelete(items.map((p) => p.id)).subscribe({
      next: () => {
        this.toast.success('table.deleted', { n: items.length });
        this.selected.set([]);
        this.reload();
      },
    });
  }

  protected exportCsv(): void {
    const t = (k: string) => this.transloco.translate(k);
    const head = [t('table.name'), t('table.owner'), t('table.status'), t('table.progress'), t('table.dueDate')];
    const lines = this.rows().map((p) =>
      [p.name, p.owner, t('status.' + p.status), `${p.progress}%`, p.dueDate?.slice(0, 10) ?? '']
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(','),
    );
    const csv = '\uFEFF' + [head.join(','), ...lines].join('\n'); // BOM → Excel-friendly UTF-8
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  protected statusSeverity(s: ProjectStatus): 'success' | 'warn' | 'secondary' {
    return s === 'active' ? 'success' : s === 'paused' ? 'warn' : 'secondary';
  }
}
