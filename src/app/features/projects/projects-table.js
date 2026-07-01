import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker';
import { SavedViews } from '../../shared/components/saved-views/saved-views';
/**
 * Advanced DataTable: server-side (mock) pagination + sorting, global search,
 * status filter, column visibility, multi-row selection with bulk delete,
 * CSV export, and an edit dialog that uses the universal date picker.
 */
let ProjectsTable = class ProjectsTable {
    api = inject(ProjectsApiService);
    toast = inject(ToastService);
    confirm = inject(ConfirmService);
    router = inject(Router);
    transloco = inject(TranslocoService);
    // ---- table state ----
    rows = signal([]);
    total = signal(0);
    loading = signal(true);
    selected = signal([]);
    pageSize = 8;
    lastEvent = { first: 0, rows: this.pageSize };
    // ---- filters ----
    q = '';
    qTimer = null;
    statusFilter = [];
    /** Snapshot persisted by Saved Views. */
    snapshot() {
        return {
            q: this.q,
            statusFilter: [...this.statusFilter],
            columns: this.visibleColumns.map((c) => c.field),
            sortField: (Array.isArray(this.lastEvent.sortField) ? this.lastEvent.sortField[0] : this.lastEvent.sortField) ?? null,
            sortOrder: this.lastEvent.sortOrder ?? 1,
            rows: this.lastEvent.rows ?? this.pageSize,
        };
    }
    applyView(s) {
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
    clearView() {
        this.q = '';
        this.statusFilter = [];
        this.visibleColumns = this.allColumns.filter((c) => c.field !== 'updatedAt');
        this.reload();
    }
    // ---- columns ----
    allColumns = [
        { field: 'owner', labelKey: 'table.owner' },
        { field: 'status', labelKey: 'table.status' },
        { field: 'progress', labelKey: 'table.progress' },
        { field: 'dueDate', labelKey: 'table.dueDate' },
        { field: 'updatedAt', labelKey: 'table.updatedAt' },
    ];
    visibleColumns = this.allColumns.filter((c) => c.field !== 'updatedAt');
    isCol(field) {
        return this.visibleColumns.some((c) => c.field === field);
    }
    statusOptions = [
        { value: 'active' }, { value: 'paused' }, { value: 'done' },
    ];
    selectedCount = computed(() => this.selected().length);
    // ---- edit dialog ----
    editOpen = signal(false);
    saving = signal(false);
    editDraft = {
        id: 0, name: '', status: 'active', progress: 0, dueDate: null,
    };
    // ---- data loading ----
    load(event) {
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
    reload(resetPage = true) {
        if (resetPage)
            this.lastEvent = { ...this.lastEvent, first: 0 };
        this.load(this.lastEvent);
    }
    onSearch(value) {
        this.q = value;
        if (this.qTimer)
            clearTimeout(this.qTimer);
        this.qTimer = setTimeout(() => this.reload(), 350);
    }
    onStatusFilter() {
        this.reload();
    }
    // ---- actions ----
    newProject() {
        this.router.navigate(['/projects/new']);
    }
    edit(p) {
        this.editDraft = {
            id: p.id, name: p.name, status: p.status, progress: p.progress,
            dueDate: p.dueDate ? new Date(p.dueDate) : null,
        };
        this.editOpen.set(true);
    }
    saveEdit() {
        if (!this.editDraft.name.trim())
            return;
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
    async deleteOne(p) {
        if (!(await this.confirm.delete(p.name)))
            return;
        this.api.remove(p.id).subscribe({
            next: () => {
                this.toast.success('table.deleted', { n: 1 });
                this.selected.set(this.selected().filter((s) => s.id !== p.id));
                this.reload(false);
            },
        });
    }
    async deleteSelected() {
        const items = this.selected();
        if (!items.length)
            return;
        const yes = await this.confirm.ask({
            titleKey: 'confirm.deleteTitle',
            messageKey: 'table.bulkDeleteMessage',
            messageParams: { n: items.length },
            destructive: true,
        });
        if (!yes)
            return;
        this.api.bulkDelete(items.map((p) => p.id)).subscribe({
            next: () => {
                this.toast.success('table.deleted', { n: items.length });
                this.selected.set([]);
                this.reload();
            },
        });
    }
    exportCsv() {
        const t = (k) => this.transloco.translate(k);
        const head = [t('table.name'), t('table.owner'), t('table.status'), t('table.progress'), t('table.dueDate')];
        const lines = this.rows().map((p) => [p.name, p.owner, t('status.' + p.status), `${p.progress}%`, p.dueDate?.slice(0, 10) ?? '']
            .map((v) => `"${String(v).replaceAll('"', '""')}"`)
            .join(','));
        const csv = '\uFEFF' + [head.join(','), ...lines].join('\n'); // BOM → Excel-friendly UTF-8
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'projects.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
    statusSeverity(s) {
        return s === 'active' ? 'success' : s === 'paused' ? 'warn' : 'secondary';
    }
};
ProjectsTable = __decorate([
    Component({
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
], ProjectsTable);
export { ProjectsTable };
