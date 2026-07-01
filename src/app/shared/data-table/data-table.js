import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, contentChild, effect, inject, input, output, signal, viewChild, ViewEncapsulation, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { TABLE_DEFAULTS } from './data-table.config';
import { FaNumberPipe, FaCurrencyPipe, FaDatePipe } from './pipes/table-cell.pipe';
/**
 * رپر کامل و قابل‌استفاده‌ی مجدد برای جدول PrimeNG. تقریباً همه‌ی امکانات
 * جدول را پوشش می‌دهد و از دو مسیر قابل تنظیم است:
 *   - سراسری: provideTableDefaults({...}) در app.config.ts
 *   - موضعی: input [config]="{...}" روی همان تیبل
 *
 * امکانات: مرتب‌سازی تک/چندستونه، جستجوی سراسری، فیلتر ستونی، انتخاب تکی/چندتایی،
 * صفحه‌بندی، lazy، ستون frozen، resize/reorder ستون، toggle ستون، row expansion،
 * reorder ردیف، ویرایش درون‌خطی، virtual scroll، خروجی CSV، و حالت موبایل
 * (کارت + infinite scroll).
 */
let DataTable = class DataTable {
    // ---- inputs ----
    data = input([]);
    columns = input.required();
    config = input({});
    dataKey = input('id');
    lazy = input(false);
    loading = input(false);
    totalCount = input(0);
    searchPlaceholder = input('جستجو...');
    // ---- outputs ----
    selectionChange = output();
    onLazyLoad = output();
    searchChange = output();
    cellEdit = output();
    rowReorder = output();
    // ---- custom templates (from consumer) ----
    cellTpl = contentChild('cell');
    expansionTpl = contentChild('expansion');
    // ---- global defaults merged with local config ----
    defaults = inject(TABLE_DEFAULTS);
    cfg = computed(() => ({ ...this.defaults, ...this.config() }));
    // ---- state ----
    search = signal('');
    selectionModel = null;
    isMobile = signal(false);
    mobileCount = signal(0);
    expandedRows = {};
    // ---- column visibility (toggle) ----
    hiddenFields = signal(new Set());
    visibleColumns = computed(() => this.columns().filter((c) => !this.hiddenFields().has(c.field)));
    toggleableColumns = computed(() => this.columns().filter((c) => c.toggleable !== false));
    constructor() {
        if (typeof window !== 'undefined') {
            const mq = () => this.isMobile.set(window.innerWidth < this.cfg().mobileBreakpoint);
            mq();
            window.addEventListener('resize', mq);
        }
        // initialize hidden columns from defaultVisible:false
        effect(() => {
            const init = new Set();
            for (const c of this.columns())
                if (c.defaultVisible === false)
                    init.add(c.field);
            this.hiddenFields.set(init);
        });
        effect(() => { this.data(); this.search(); this.mobileCount.set(this.cfg().mobilePageSize); });
        effect(() => { if (this.isMobile())
            queueMicrotask(() => this.observeSentinel()); });
    }
    // ---- derived data (local mode) ----
    filtered = computed(() => {
        if (this.lazy())
            return this.data();
        const q = this.search().trim().toLowerCase();
        let rows = this.data();
        if (q) {
            const fields = this.filterFields();
            rows = rows.filter((row) => fields.some((f) => String(this.get(row, f) ?? '').toLowerCase().includes(q)));
        }
        return rows;
    });
    pagedData = computed(() => this.filtered());
    totalRecords = computed(() => this.lazy() ? this.totalCount() : this.filtered().length);
    mobileRows = computed(() => this.lazy() ? this.data() : this.filtered().slice(0, this.mobileCount()));
    // ---- column helpers ----
    filterFields = computed(() => this.columns().filter((c) => c.filterable !== false && (c.type ?? 'text') !== 'custom').map((c) => c.field));
    mobileColumns = computed(() => this.visibleColumns().filter((c) => c.showOnMobile !== false && !c.mobileTitle));
    titleColumn = computed(() => this.columns().find((c) => c.mobileTitle) ?? this.columns()[0]);
    minWidth = computed(() => `${Math.max(this.visibleColumns().length * 9, 40)}rem`);
    colspan = computed(() => this.visibleColumns().length + (this.cfg().selectable ? 1 : 0) + (this.cfg().rowExpansion ? 1 : 0) + (this.cfg().reorderableRows ? 1 : 0));
    tableClass = computed(() => {
        const c = this.cfg();
        const parts = ['text-sm'];
        if (c.striped)
            parts.push('p-datatable-striped');
        if (c.gridlines)
            parts.push('p-datatable-gridlines');
        if (c.size === 'small')
            parts.push('p-datatable-sm');
        if (c.size === 'large')
            parts.push('p-datatable-lg');
        return parts.join(' ');
    });
    sortMode = computed(() => this.cfg().sortMode);
    selectionType = computed(() => this.cfg().selectable ? this.cfg().selectionMode : undefined);
    // ---- value extraction ----
    cellValue(row, col) {
        return col.value ? col.value(row) : this.get(row, col.field);
    }
    get(row, path) {
        return path.split('.').reduce((acc, k) => acc?.[k], row);
    }
    set(row, path, val) {
        const keys = path.split('.');
        const last = keys.pop();
        const target = keys.reduce((acc, k) => acc?.[k], row);
        if (target)
            target[last] = val;
    }
    resolveHeader(col) { return col.header; }
    cellTemplateFor(col) {
        return col.cellTemplate ?? (col.type === 'custom' ? this.cellTpl() ?? null : null) ?? this.cellTpl() ?? null;
    }
    tagFor(col, value) {
        const map = col.tagMap?.[String(value)];
        if (!map)
            return null;
        return { label: map.label ?? String(value), severity: map.severity };
    }
    // ---- search ----
    onSearch(q) {
        this.search.set(q);
        this.searchChange.emit(q);
        if (this.lazy())
            this.emitLazy();
    }
    // ---- selection ----
    onSelectionChange(sel) {
        this.selectionModel = sel;
        const arr = Array.isArray(sel) ? sel : sel ? [sel] : [];
        this.selectionChange.emit(arr);
    }
    // ---- column toggle ----
    onColumnToggle(visible) {
        const visibleSet = new Set(visible.map((c) => c.field));
        const hidden = new Set();
        for (const c of this.toggleableColumns())
            if (!visibleSet.has(c.field))
                hidden.add(c.field);
        this.hiddenFields.set(hidden);
    }
    selectedToggleColumns = computed(() => this.toggleableColumns().filter((c) => !this.hiddenFields().has(c.field)));
    // ---- inline edit ----
    setEdit(row, col, value) {
        this.set(row, col.field, value);
        this.cellEdit.emit({ row, field: col.field, value });
    }
    onEditComplete(row, col) {
        this.cellEdit.emit({ row, field: col.field, value: this.get(row, col.field) });
    }
    // ---- row reorder ----
    onRowReorder() {
        this.rowReorder.emit(this.lazy() ? this.data() : this.filtered());
    }
    // ---- export CSV ----
    exportCsv() {
        const cols = this.visibleColumns().filter((c) => c.type !== 'custom');
        const header = cols.map((c) => this.resolveHeader(c)).join(',');
        const rows = (this.lazy() ? this.data() : this.filtered()).map((row) => cols.map((c) => {
            const v = this.cellValue(row, c);
            const s = v == null ? '' : String(v).replace(/"/g, '""');
            return /[",\n]/.test(s) ? `"${s}"` : s;
        }).join(','));
        const csv = '\uFEFF' + [header, ...rows].join('\n'); // BOM برای فارسی
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.cfg().exportFilename}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
    // ---- lazy ----
    onLazy(e) {
        if (!this.lazy())
            return;
        this.onLazyLoad.emit({
            first: e.first ?? 0,
            rows: e.rows ?? this.cfg().rows,
            sortField: e.sortField ?? undefined,
            sortOrder: e.sortOrder ?? undefined,
            multiSortMeta: e.multiSortMeta?.map((m) => ({ field: m.field, order: m.order ?? 1 })),
            globalFilter: this.search() || undefined,
        });
    }
    emitLazy() {
        this.onLazyLoad.emit({ first: 0, rows: this.cfg().rows, globalFilter: this.search() || undefined });
    }
    // ---- mobile selection ----
    isSelected(row) {
        return Array.isArray(this.selectionModel) && this.selectionModel.includes(row);
    }
    toggleSelect(row) {
        const arr = Array.isArray(this.selectionModel) ? this.selectionModel : [];
        this.selectionModel = this.isSelected(row) ? arr.filter((r) => r !== row) : [...arr, row];
        this.selectionChange.emit(this.selectionModel);
    }
    trackRow(i, row) { return this.get(row, this.dataKey()) ?? i; }
    // ---- infinite scroll ----
    sentinel = viewChild('sentinel');
    observer;
    observeSentinel() {
        const el = this.sentinel()?.nativeElement;
        if (!el)
            return;
        this.observer?.disconnect();
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting)
                this.loadMoreMobile();
        }, { rootMargin: '120px' });
        this.observer.observe(el);
    }
    loadMoreMobile() {
        if (this.lazy()) {
            this.onLazyLoad.emit({ first: this.data().length, rows: this.cfg().mobilePageSize, globalFilter: this.search() || undefined });
        }
        else if (this.mobileCount() < this.filtered().length) {
            this.mobileCount.update((n) => n + this.cfg().mobilePageSize);
        }
    }
};
DataTable = __decorate([
    Component({
        selector: 'app-data-table',
        imports: [
            NgTemplateOutlet, FormsModule, TableModule, TagModule, ButtonModule, IconFieldModule,
            InputIconModule, InputTextModule, InputNumberModule, ProgressSpinnerModule,
            MultiSelectModule, SelectModule, PopoverModule, TooltipModule,
            FaNumberPipe, FaCurrencyPipe, FaDatePipe,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        templateUrl: './data-table.html',
    })
], DataTable);
export { DataTable };
