import {
  ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject,
  input, output, signal, TemplateRef, viewChild, ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
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

import { TableColumn, TableConfig, LazyLoadEvent, CellEditEvent, FilterOption } from './data-table.model';
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
@Component({
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
export class DataTable<T extends Record<string, any> = any> {
  // ---- inputs ----
  readonly data = input<T[]>([]);
  readonly columns = input.required<TableColumn<T>[]>();
  readonly config = input<Partial<TableConfig>>({});
  readonly dataKey = input<string>('id');
  readonly lazy = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly totalCount = input<number>(0);
  readonly searchPlaceholder = input<string>('جستجو...');
  /**
   * کلید ذخیره‌ی وضعیت در localStorage. اگر مقدار بدهید، وضعیت جدول
   * (جستجوی سراسری، ستون‌های مخفی، ردیف‌های بازشده) ذخیره و پس از
   * بارگذاری مجدد بازیابی می‌شود. خالی = بدون ذخیره‌سازی.
   */
  readonly stateKey = input<string>('');

  // ---- outputs ----
  readonly selectionChange = output<T[]>();
  readonly onLazyLoad = output<LazyLoadEvent>();
  readonly searchChange = output<string>();
  readonly cellEdit = output<CellEditEvent<T>>();
  readonly rowReorder = output<T[]>();

  // ---- custom templates (from consumer) ----
  protected readonly cellTpl = contentChild<TemplateRef<unknown>>('cell');
  protected readonly expansionTpl = contentChild<TemplateRef<unknown>>('expansion');

  // ---- global defaults merged with local config ----
  private readonly defaults = inject(TABLE_DEFAULTS);
  protected readonly cfg = computed<Required<TableConfig>>(() => ({ ...this.defaults, ...this.config() }));

  // ---- state ----
  protected readonly search = signal('');
  protected selectionModel: T[] | T | null = null;
  protected readonly isMobile = signal(false);
  private readonly mobileCount = signal(0);
  protected expandedRows: Record<string, boolean> = {};
  private stateRestored = false;

  // ---- column visibility (toggle) ----
  protected readonly hiddenFields = signal<Set<string>>(new Set());
  protected readonly visibleColumns = computed(() =>
    this.columns().filter((c) => !this.hiddenFields().has(c.field)));
  protected readonly toggleableColumns = computed(() =>
    this.columns().filter((c) => c.toggleable !== false));

  constructor() {
    if (typeof window !== 'undefined') {
      const mq = () => this.isMobile.set(window.innerWidth < this.cfg().mobileBreakpoint);
      mq();
      window.addEventListener('resize', mq);
    }
    // initialize hidden columns from defaultVisible:false
    effect(() => {
      const init = new Set<string>();
      for (const c of this.columns()) if (c.defaultVisible === false) init.add(c.field);
      this.hiddenFields.set(init);
    });
    // restore persisted state (once columns are known), then auto-save on change
    effect(() => {
      this.columns();                    // depend on columns so restore runs after they're set
      if (this.stateKey() && !this.stateRestored) {
        this.restoreState();
        this.stateRestored = true;
      }
    });
    // auto-save whenever search or hidden columns change
    effect(() => {
      const snapshot = { search: this.search(), hidden: [...this.hiddenFields()] };
      if (this.stateKey() && this.stateRestored) this.saveState(snapshot);
    });
    effect(() => { this.data(); this.search(); this.mobileCount.set(this.cfg().mobilePageSize); });
    effect(() => { if (this.isMobile()) queueMicrotask(() => this.observeSentinel()); });
  }

  // ---- derived data (local mode) ----
  protected readonly filtered = computed(() => {
    if (this.lazy()) return this.data();
    const q = this.search().trim().toLowerCase();
    let rows = this.data();
    if (q) {
      const fields = this.filterFields();
      rows = rows.filter((row) => fields.some((f) => String(this.get(row, f) ?? '').toLowerCase().includes(q)));
    }
    return rows;
  });

  protected readonly pagedData = computed(() => this.filtered());
  protected readonly totalRecords = computed(() => this.lazy() ? this.totalCount() : this.filtered().length);
  protected readonly mobileRows = computed(() =>
    this.lazy() ? this.data() : this.filtered().slice(0, this.mobileCount()));

  // ---- column helpers ----
  protected readonly filterFields = computed(() =>
    this.columns().filter((c) => c.filterable !== false && (c.type ?? 'text') !== 'custom').map((c) => c.field));
  protected readonly mobileColumns = computed(() =>
    this.visibleColumns().filter((c) => c.showOnMobile !== false && !c.mobileTitle));
  protected readonly titleColumn = computed(() =>
    this.columns().find((c) => c.mobileTitle) ?? this.columns()[0]);
  protected readonly minWidth = computed(() => `${Math.max(this.visibleColumns().length * 9, 40)}rem`);
  protected readonly colspan = computed(() =>
    this.visibleColumns().length + (this.cfg().selectable ? 1 : 0) + (this.cfg().rowExpansion ? 1 : 0) + (this.cfg().reorderableRows ? 1 : 0));

  protected readonly tableClass = computed(() => {
    const c = this.cfg();
    const parts = ['text-sm'];
    if (c.striped) parts.push('p-datatable-striped');
    if (c.gridlines) parts.push('p-datatable-gridlines');
    if (c.size === 'small') parts.push('p-datatable-sm');
    if (c.size === 'large') parts.push('p-datatable-lg');
    return parts.join(' ');
  });

  protected readonly sortMode = computed(() => this.cfg().sortMode);
  protected readonly selectionType = computed(() => this.cfg().selectable ? this.cfg().selectionMode : undefined);

  // ---- value extraction ----
  protected cellValue(row: T, col: TableColumn<T>): unknown {
    return col.value ? col.value(row) : this.get(row, col.field);
  }
  private get(row: T, path: string): unknown {
    return path.split('.').reduce<any>((acc, k) => acc?.[k], row);
  }
  private set(row: T, path: string, val: unknown): void {
    const keys = path.split('.');
    const last = keys.pop()!;
    const target = keys.reduce<any>((acc, k) => acc?.[k], row);
    if (target) target[last] = val;
  }

  protected resolveHeader(col: TableColumn<T>): string { return col.header; }

  protected cellTemplateFor(col: TableColumn<T>): TemplateRef<unknown> | null {
    return col.cellTemplate ?? (col.type === 'custom' ? this.cellTpl() ?? null : null) ?? this.cellTpl() ?? null;
  }

  protected tagFor(col: TableColumn<T>, value: unknown) {
    const map = col.tagMap?.[String(value)];
    if (!map) return null;
    return { label: map.label ?? String(value), severity: map.severity };
  }

  // ---- search ----
  protected onSearch(q: string): void {
    this.search.set(q);
    this.searchChange.emit(q);
    if (this.lazy()) this.emitLazy();
  }

  // ---- selection ----
  protected onSelectionChange(sel: T[] | T | null): void {
    this.selectionModel = sel;
    this.selectionSignal.set(sel);
    const arr = Array.isArray(sel) ? sel : sel ? [sel] : [];
    this.selectionChange.emit(arr);
  }

  /** تعداد ردیف‌های انتخاب‌شده. */
  protected readonly selectedCount = computed(() => {
    const s = this.selectionSignal();
    return Array.isArray(s) ? s.length : s ? 1 : 0;
  });

  /** سیگنالی که با هر تغییر انتخاب به‌روز می‌شود (برای شمارنده‌ی واکنش‌گرا). */
  protected readonly selectionSignal = signal<T[] | T | null>(null);

  /** انتخاب همه‌ی رکوردها (کل داده، نه فقط صفحه‌ی فعلی). */
  protected selectAllRecords(): void {
    const all = this.lazy() ? this.data() : this.filtered();
    this.selectionModel = [...all];
    this.selectionSignal.set(this.selectionModel);
    this.selectionChange.emit(all);
  }

  /** پاک‌کردن کل انتخاب. */
  protected clearSelection(): void {
    this.selectionModel = this.cfg().selectionMode === 'single' ? null : [];
    this.selectionSignal.set(this.selectionModel);
    this.selectionChange.emit([]);
  }

  /** آیا همه‌ی رکوردها (کل داده) انتخاب شده‌اند. */
  protected readonly allRecordsSelected = computed(() => {
    const total = this.lazy() ? this.totalCount() : this.filtered().length;
    return total > 0 && this.selectedCount() === total;
  });

  // ---- column toggle ----
  protected onColumnToggle(visible: TableColumn<T>[]): void {
    const visibleSet = new Set(visible.map((c) => c.field));
    const hidden = new Set<string>();
    for (const c of this.toggleableColumns()) if (!visibleSet.has(c.field)) hidden.add(c.field);
    this.hiddenFields.set(hidden);
  }
  protected readonly selectedToggleColumns = computed(() =>
    this.toggleableColumns().filter((c) => !this.hiddenFields().has(c.field)));

  // ---- inline edit ----
  protected setEdit(row: T, col: TableColumn<T>, value: unknown): void {
    this.set(row, col.field, value);
    this.cellEdit.emit({ row, field: col.field, value });
  }
  protected onEditComplete(row: T, col: TableColumn<T>): void {
    this.cellEdit.emit({ row, field: col.field, value: this.get(row, col.field) });
  }

  // ---- row reorder ----
  protected onRowReorder(): void {
    this.rowReorder.emit(this.lazy() ? this.data() : this.filtered());
  }

  // ---- export CSV ----
  protected exportCsv(): void {
    const cols = this.visibleColumns().filter((c) => c.type !== 'custom');
    const header = cols.map((c) => this.resolveHeader(c)).join(',');
    const rows = (this.lazy() ? this.data() : this.filtered()).map((row) =>
      cols.map((c) => {
        const v = this.cellValue(row, c);
        const s = v == null ? '' : String(v).replace(/"/g, '""');
        return /[",\n]/.test(s) ? `"${s}"` : s;
      }).join(','));
    const csv = '\uFEFF' + [header, ...rows].join('\n');   // BOM برای فارسی
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.cfg().exportFilename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---- lazy ----
  protected onLazy(e: TableLazyLoadEvent): void {
    if (!this.lazy()) return;
    this.onLazyLoad.emit({
      first: e.first ?? 0,
      rows: e.rows ?? this.cfg().rows,
      sortField: (e.sortField as string) ?? undefined,
      sortOrder: e.sortOrder ?? undefined,
      multiSortMeta: e.multiSortMeta?.map((m) => ({ field: m.field, order: m.order ?? 1 })),
      globalFilter: this.search() || undefined,
    });
  }
  private emitLazy(): void {
    this.onLazyLoad.emit({ first: 0, rows: this.cfg().rows, globalFilter: this.search() || undefined });
  }

  // ---- mobile selection ----
  protected isSelected(row: T): boolean {
    return Array.isArray(this.selectionModel) && this.selectionModel.includes(row);
  }
  protected toggleSelect(row: T): void {
    const arr = Array.isArray(this.selectionModel) ? this.selectionModel : [];
    this.selectionModel = this.isSelected(row) ? arr.filter((r) => r !== row) : [...arr, row];
    this.selectionSignal.set(this.selectionModel);
    this.selectionChange.emit(this.selectionModel as T[]);
  }

  protected trackRow(i: number, row: T): unknown { return this.get(row, this.dataKey()) ?? i; }

  // ---- state persistence (localStorage) ----
  private get storageKey(): string { return `dt-state:${this.stateKey()}`; }

  private saveState(state: { search: string; hidden: string[] }): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch { /* سهمیه‌ی localStorage پر است یا در دسترس نیست */ }
  }

  private restoreState(): void {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const state = JSON.parse(raw) as { search?: string; hidden?: string[] };
      if (state.search) this.search.set(state.search);
      if (Array.isArray(state.hidden)) this.hiddenFields.set(new Set(state.hidden));
    } catch { /* state خراب است — نادیده بگیر */ }
  }

  /** پاک‌کردن وضعیت ذخیره‌شده و بازنشانی به حالت اولیه. */
  clearState(): void {
    try { localStorage.removeItem(this.storageKey); } catch { /* noop */ }
    this.search.set('');
    const init = new Set<string>();
    for (const c of this.columns()) if (c.defaultVisible === false) init.add(c.field);
    this.hiddenFields.set(init);
  }

  // ---- infinite scroll ----
  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');
  private observer?: IntersectionObserver;
  private observeSentinel(): void {
    const el = this.sentinel()?.nativeElement;
    if (!el) return;
    this.observer?.disconnect();
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) this.loadMoreMobile();
    }, { rootMargin: '120px' });
    this.observer.observe(el);
  }
  private loadMoreMobile(): void {
    if (this.lazy()) {
      this.onLazyLoad.emit({ first: this.data().length, rows: this.cfg().mobilePageSize, globalFilter: this.search() || undefined });
    } else if (this.mobileCount() < this.filtered().length) {
      this.mobileCount.update((n) => n + this.cfg().mobilePageSize);
    }
  }
}
