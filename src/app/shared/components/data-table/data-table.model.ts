import { TemplateRef } from '@angular/core';

/** فرمت‌های آماده‌ی سلول که wrapper خودش رندر می‌کند. */
export type CellType =
  | 'text' | 'number' | 'currency' | 'date' | 'datetime'
  | 'tag' | 'boolean' | 'badge' | 'custom';

export type Align = 'start' | 'center' | 'end';

/** نوع فیلتر ستون (column filter). */
export type ColumnFilterType = 'text' | 'numeric' | 'date' | 'boolean' | 'select';

/** نگاشت مقدار → شدت رنگ برای ستون‌های نوع tag. */
export interface TagMap {
  [value: string]: {
    label?: string;
    severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
  };
}

/** گزینه‌ی فیلتر select. */
export interface FilterOption { label: string; value: unknown; }

/** تعریف یک ستون. */
export interface TableColumn<T = any> {
  field: string;
  header: string;
  type?: CellType;
  sortable?: boolean;
  filterable?: boolean;                 // در جستجوی سراسری لحاظ شود
  /** فیلتر اختصاصی ستون (منوی فیلتر). نوع را مشخص کنید تا فعال شود. */
  columnFilter?: ColumnFilterType;
  /** گزینه‌های فیلترِ select (وقتی columnFilter='select'). */
  filterOptions?: FilterOption[];
  align?: Align;
  width?: string;
  tagMap?: TagMap;
  dateFormat?: string;
  showOnMobile?: boolean;
  mobileTitle?: boolean;
  frozen?: boolean;
  /** در حالت column-toggle، آیا به‌صورت پیش‌فرض نمایش داده شود. */
  defaultVisible?: boolean;
  /** آیا این ستون اصلاً قابل مخفی‌شدن هست (در منوی toggle). پیش‌فرض true. */
  toggleable?: boolean;
  /** قابل ویرایش درون‌خطی (نیاز به config.editable). */
  editable?: boolean;
  /** نوع ادیتور درون‌خطی. پیش‌فرض 'text'. */
  editorType?: 'text' | 'number';
  value?: (row: T) => unknown;
  cellTemplate?: TemplateRef<unknown>;
}

/** رویداد lazy load که به والد ارسال می‌شود تا داده از سرور بگیرد. */
export interface LazyLoadEvent {
  first: number;
  rows: number;
  sortField?: string | string[];
  sortOrder?: number;
  multiSortMeta?: { field: string; order: number }[];
  globalFilter?: string;
  filters?: Record<string, unknown>;
}

/** رویداد ذخیره‌ی ویرایش درون‌خطی. */
export interface CellEditEvent<T = any> {
  row: T;
  field: string;
  value: unknown;
}

/** تنظیمات سراسری/پیش‌فرض تیبل. */
export interface TableConfig {
  // pagination
  paginator?: boolean;
  rows?: number;
  rowsPerPageOptions?: number[];
  showCurrentPageReport?: boolean;
  // search & filter
  globalSearch?: boolean;
  columnFilters?: boolean;              // فعال‌سازی فیلتر ستونی
  // selection
  selectable?: boolean;                 // انتخاب چندتایی (checkbox)
  selectionMode?: 'multiple' | 'single';
  // sorting
  sortMode?: 'single' | 'multiple';     // مرتب‌سازی تک یا چندستونه
  // appearance
  striped?: boolean;
  gridlines?: boolean;
  size?: 'small' | 'normal' | 'large';
  // columns
  columnToggle?: boolean;               // منوی نمایش/مخفی ستون‌ها
  // rows
  rowExpansion?: boolean;               // باز شدن ردیف (جزئیات)
  reorderableRows?: boolean;            // جابه‌جایی ردیف با drag
  editable?: boolean;                   // ویرایش درون‌خطی
  // scrolling
  virtualScroll?: boolean;              // اسکرول مجازی
  virtualScrollItemSize?: number;       // ارتفاع هر ردیف (px) برای virtual
  scrollHeight?: string;                // ارتفاع ناحیه‌ی اسکرول (مثلاً '24rem')
  // export
  exportable?: boolean;                 // دکمه‌ی خروجی CSV
  exportFilename?: string;
  // misc
  caption?: string;                     // عنوان بالای جدول
  dateFormat?: string;
  mobileBreakpoint?: number;
  mobilePageSize?: number;
  emptyMessage?: string;
}

/** پیش‌فرض‌های کارخانه‌ای. */
export const DEFAULT_TABLE_CONFIG: Required<TableConfig> = {
  paginator: true,
  rows: 10,
  rowsPerPageOptions: [10, 20, 50],
  showCurrentPageReport: true,
  globalSearch: true,
  columnFilters: false,
  selectable: false,
  selectionMode: 'multiple',
  sortMode: 'single',
  striped: true,
  gridlines: false,
  size: 'normal',
  columnToggle: false,
  rowExpansion: false,
  reorderableRows: false,
  editable: false,
  virtualScroll: false,
  virtualScrollItemSize: 46,
  scrollHeight: '',
  exportable: false,
  exportFilename: 'export',
  caption: '',
  dateFormat: 'yyyy/MM/dd',
  mobileBreakpoint: 768,
  mobilePageSize: 10,
  emptyMessage: 'موردی یافت نشد.',
};
