import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DataTable, TableColumn, TagMap, RowMenuItem } from '../../../shared/components/data-table';
import { ButtonModule } from 'primeng/button';
import { GalleryCard } from './gallery-section';

interface Transaction {
  id: string;
  payee: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

/**
 * نمونه‌ی استفاده از رپر <app-data-table>.
 * نشان می‌دهد: تعریف ستون‌ها، typeهای آماده (currency/tag/date)، ستون سفارشی
 * با ng-template #cell (عملیات)، انتخاب، و جستجو. حالت آرایه‌ی محلی (lazy=false).
 */
@Component({
  selector: 'app-gallery-table',
  imports: [DataTable, ButtonModule, GalleryCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-gallery-card title="DataTable (رپر سفارشی)" hint="جستجو، مرتب‌سازی، انتخاب، صفحه‌بندی — موبایل: کارت + infinite scroll">
      <app-data-table
        class="w-full"
        [data]="transactions"
        [columns]="columns"
        [config]="{ selectable: true, rows: 8, rowsPerPageOptions: [8, 15, 30], columnToggle: true, exportable: true, caption: 'فهرست تراکنش‌ها' }"
        dataKey="id"
        stateKey="gallery-transactions"
        [rowMenu]="rowMenu"
        searchPlaceholder="جستجوی تراکنش...">

        <!-- ستون سفارشی: عملیات (با ng-template #cell) -->
        <ng-template #cell let-row let-col="col" let-value="value">
          @if (col.field === 'actions') {
            <div class="flex gap-1">
              <p-button icon="pi pi-eye" [text]="true" [rounded]="true" size="small" severity="secondary" />
              <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" size="small" severity="secondary" />
            </div>
          } @else {
            <span>{{ value }}</span>
          }
        </ng-template>
      </app-data-table>
      <p class="mt-2 text-xs text-muted-color">💡 روی هر ردیف راست‌کلیک کنید تا منوی عملیات باز شود.</p>
      @if (lastAction()) {
        <div class="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary">
          <i class="pi pi-info-circle"></i> آخرین عملیات: {{ lastAction() }}
        </div>
      }
    </app-gallery-card>
  `,
})
export class GalleryTable {
  protected readonly lastAction = signal('');

  private readonly typeMap: TagMap = {
    satna: { label: 'ساتنا', severity: 'info' },
    paya: { label: 'پایا', severity: 'secondary' },
    internal: { label: 'داخلی', severity: 'contrast' },
    bill: { label: 'قبض', severity: 'warn' },
  };

  private readonly statusMap: TagMap = {
    success: { label: 'موفق', severity: 'success' },
    pending: { label: 'در انتظار', severity: 'warn' },
    failed: { label: 'ناموفق', severity: 'danger' },
  };

  protected readonly columns: TableColumn<Transaction>[] = [
    { field: 'id', header: 'شناسه', sortable: true, mobileTitle: true, width: '9rem', frozen: true },
    { field: 'payee', header: 'ذینفع', sortable: true },
    { field: 'type', header: 'نوع', type: 'tag', tagMap: this.typeMap, align: 'center' },
    { field: 'amount', header: 'مبلغ (﷼)', type: 'currency', sortable: true, align: 'end' },
    { field: 'date', header: 'تاریخ', type: 'date', sortable: true },
    { field: 'status', header: 'وضعیت', type: 'tag', tagMap: this.statusMap, align: 'center' },
    { field: 'actions', header: 'عملیات', type: 'custom', filterable: false, width: '6rem', showOnMobile: true },
  ];

  protected readonly rowMenu: RowMenuItem<Transaction>[] = [
    { label: 'مشاهده', icon: 'pi pi-eye', action: (r) => this.lastAction.set('مشاهده ' + r.id) },
    { label: 'ویرایش', icon: 'pi pi-pencil', action: (r) => this.lastAction.set('ویرایش ' + r.id) },
    { label: 'حذف', icon: 'pi pi-trash', danger: true, action: (r) => this.lastAction.set('حذف ' + r.id) },
  ];

  protected readonly transactions: Transaction[] = [
    { id: 'TRX-1001', payee: 'شرکت آلفا تجارت', type: 'satna', amount: 125_000_000, date: '۱۴۰۴/۰۴/۰۵', status: 'success' },
    { id: 'TRX-1002', payee: 'بازرگانی پارس', type: 'paya', amount: 48_500_000, date: '۱۴۰۴/۰۴/۰۵', status: 'pending' },
    { id: 'TRX-1003', payee: 'تأمین قطعات صنعت', type: 'internal', amount: 12_300_000, date: '۱۴۰۴/۰۴/۰۴', status: 'success' },
    { id: 'TRX-1004', payee: 'گروه ساختمانی مهر', type: 'satna', amount: 890_000_000, date: '۱۴۰۴/۰۴/۰۴', status: 'failed' },
    { id: 'TRX-1005', payee: 'پخش دارویی البرز', type: 'bill', amount: 6_750_000, date: '۱۴۰۴/۰۴/۰۳', status: 'success' },
    { id: 'TRX-1006', payee: 'فناوری اطلاعات نوین', type: 'paya', amount: 230_000_000, date: '۱۴۰۴/۰۴/۰۳', status: 'success' },
    { id: 'TRX-1007', payee: 'صنایع غذایی به‌روز', type: 'internal', amount: 34_900_000, date: '۱۴۰۴/۰۴/۰۲', status: 'pending' },
    { id: 'TRX-1008', payee: 'حمل و نقل سریع', type: 'satna', amount: 156_000_000, date: '۱۴۰۴/۰۴/۰۲', status: 'success' },
    { id: 'TRX-1009', payee: 'مشاوران مالی آرمان', type: 'bill', amount: 9_200_000, date: '۱۴۰۴/۰۴/۰۱', status: 'success' },
    { id: 'TRX-1010', payee: 'تجارت الکترونیک رضا', type: 'paya', amount: 71_400_000, date: '۱۴۰۴/۰۴/۰۱', status: 'failed' },
    { id: 'TRX-1011', payee: 'پتروشیمی جنوب', type: 'satna', amount: 1_240_000_000, date: '۱۴۰۴/۰۳/۳۱', status: 'success' },
    { id: 'TRX-1012', payee: 'نساجی کاشان', type: 'internal', amount: 18_600_000, date: '۱۴۰۴/۰۳/۳۱', status: 'pending' },
    { id: 'TRX-1013', payee: 'لوازم خانگی پارمیس', type: 'paya', amount: 95_000_000, date: '۱۴۰۴/۰۳/۳۰', status: 'success' },
    { id: 'TRX-1014', payee: 'خدمات بیمه‌ای ایمن', type: 'bill', amount: 4_300_000, date: '۱۴۰۴/۰۳/۳۰', status: 'success' },
    { id: 'TRX-1015', payee: 'صادرات خشکبار', type: 'satna', amount: 312_000_000, date: '۱۴۰۴/۰۳/۲۹', status: 'failed' },
    { id: 'TRX-1016', payee: 'کشت و صنعت سبز', type: 'internal', amount: 27_800_000, date: '۱۴۰۴/۰۳/۲۹', status: 'success' },
    { id: 'TRX-1017', payee: 'فولاد مبارکه تأمین', type: 'satna', amount: 2_100_000_000, date: '۱۴۰۴/۰۳/۲۸', status: 'pending' },
    { id: 'TRX-1018', payee: 'دیجیتال مارکتینگ رشد', type: 'paya', amount: 53_200_000, date: '۱۴۰۴/۰۳/۲۸', status: 'success' },
    { id: 'TRX-1019', payee: 'تجهیزات پزشکی سلامت', type: 'bill', amount: 14_900_000, date: '۱۴۰۴/۰۳/۲۷', status: 'success' },
    { id: 'TRX-1020', payee: 'بازرگانی بین‌الملل', type: 'satna', amount: 478_000_000, date: '۱۴۰۴/۰۳/۲۷', status: 'success' },
  ];
}
