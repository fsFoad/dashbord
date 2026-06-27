import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { GalleryCard } from './gallery-section';

interface Transaction {
  id: string;
  payee: string;
  type: 'satna' | 'paya' | 'internal' | 'bill';
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  account: string;
}

type Severity = 'success' | 'warn' | 'danger' | 'info' | 'secondary';

/**
 * A full-featured data table demo: global search, sortable columns, status
 * tags, row selection, responsive horizontal scroll, and pagination with a
 * realistic banking dataset. Showcases the "best-look" table styling.
 */
@Component({
  selector: 'app-gallery-table',
  imports: [
    FormsModule, TableModule, TagModule, ButtonModule,
    IconFieldModule, InputIconModule, InputTextModule, GalleryCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-gallery-card title="DataTable — جدول کامل" hint="جستجو، مرتب‌سازی، انتخاب و صفحه‌بندی">
      <!-- toolbar: global search -->
      <div class="mb-3 flex w-full flex-wrap items-center justify-between gap-2">
        <p-iconfield class="w-full sm:w-72">
          <p-inputicon class="pi pi-search" />
          <input
            pInputText
            [value]="globalFilter()"
            (input)="globalFilter.set($any($event.target).value); dt.filterGlobal($any($event.target).value, 'contains')"
            placeholder="جستجو در همه‌ی ستون‌ها..."
            class="w-full" />
        </p-iconfield>
        <span class="text-xs text-muted-color">{{ transactions.length }} تراکنش</span>
      </div>

      <!-- the table: wrapped in an overflow container so it scrolls on mobile -->
      <div class="w-full overflow-x-auto">
        <p-table
          #dt
          [value]="transactions"
          [paginator]="true"
          [rows]="8"
          [rowsPerPageOptions]="[8, 15, 30]"
          [(selection)]="selected"
          dataKey="id"
          [globalFilterFields]="['payee', 'account', 'id']"
          [tableStyle]="{ 'min-width': '52rem' }"
          styleClass="text-sm"
          currentPageReportTemplate="{first} تا {last} از {totalRecords}"
          [showCurrentPageReport]="true">

          <ng-template #header>
            <tr>
              <th style="width: 3rem">
                <p-tableHeaderCheckbox />
              </th>
              <th pSortableColumn="id">شناسه <p-sortIcon field="id" /></th>
              <th pSortableColumn="payee">ذینفع <p-sortIcon field="payee" /></th>
              <th pSortableColumn="type">نوع <p-sortIcon field="type" /></th>
              <th pSortableColumn="amount" class="text-end">مبلغ (﷼) <p-sortIcon field="amount" /></th>
              <th pSortableColumn="date">تاریخ <p-sortIcon field="date" /></th>
              <th pSortableColumn="status">وضعیت <p-sortIcon field="status" /></th>
              <th style="width: 5rem">عملیات</th>
            </tr>
          </ng-template>

          <ng-template #body let-row>
            <tr>
              <td><p-tableCheckbox [value]="row" /></td>
              <td class="font-mono text-xs text-muted-color">{{ row.id }}</td>
              <td class="font-medium">{{ row.payee }}</td>
              <td>{{ typeLabel(row.type) }}</td>
              <td class="text-end font-semibold tabular-nums" dir="ltr">{{ formatAmount(row.amount) }}</td>
              <td class="text-xs text-muted-color">{{ row.date }}</td>
              <td>
                <p-tag [value]="statusLabel(row.status)" [severity]="statusSeverity(row.status)" />
              </td>
              <td>
                <div class="flex gap-1">
                  <p-button icon="pi pi-eye" [text]="true" [rounded]="true" size="small" severity="secondary" />
                  <p-button icon="pi pi-pencil" [text]="true" [rounded]="true" size="small" severity="secondary" />
                </div>
              </td>
            </tr>
          </ng-template>

          <ng-template #emptymessage>
            <tr>
              <td colspan="8" class="py-8 text-center text-muted-color">موردی یافت نشد.</td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      @if (selected().length) {
        <div class="mt-3 flex w-full items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          <i class="pi pi-check-circle"></i>
          {{ selected().length }} مورد انتخاب شد
        </div>
      }
    </app-gallery-card>
  `,
})
export class GalleryTable {
  protected readonly globalFilter = signal('');
  protected readonly selected = signal<Transaction[]>([]);

  protected readonly transactions: Transaction[] = [
    { id: 'TRX-1001', payee: 'شرکت آلفا تجارت', type: 'satna', amount: 125_000_000, date: '۱۴۰۴/۰۴/۰۵', status: 'success', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1002', payee: 'بازرگانی پارس', type: 'paya', amount: 48_500_000, date: '۱۴۰۴/۰۴/۰۵', status: 'pending', account: '۶۲۷۳۱۱۸۹' },
    { id: 'TRX-1003', payee: 'تأمین قطعات صنعت', type: 'internal', amount: 12_300_000, date: '۱۴۰۴/۰۴/۰۴', status: 'success', account: '۵۸۹۲۱۴۵۶' },
    { id: 'TRX-1004', payee: 'گروه ساختمانی مهر', type: 'satna', amount: 890_000_000, date: '۱۴۰۴/۰۴/۰۴', status: 'failed', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1005', payee: 'پخش دارویی البرز', type: 'bill', amount: 6_750_000, date: '۱۴۰۴/۰۴/۰۳', status: 'success', account: '۷۱۲۲۸۹۰۰' },
    { id: 'TRX-1006', payee: 'فناوری اطلاعات نوین', type: 'paya', amount: 230_000_000, date: '۱۴۰۴/۰۴/۰۳', status: 'success', account: '۶۲۷۳۱۱۸۹' },
    { id: 'TRX-1007', payee: 'صنایع غذایی به‌روز', type: 'internal', amount: 34_900_000, date: '۱۴۰۴/۰۴/۰۲', status: 'pending', account: '۵۸۹۲۱۴۵۶' },
    { id: 'TRX-1008', payee: 'حمل و نقل سریع', type: 'satna', amount: 156_000_000, date: '۱۴۰۴/۰۴/۰۲', status: 'success', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1009', payee: 'مشاوران مالی آرمان', type: 'bill', amount: 9_200_000, date: '۱۴۰۴/۰۴/۰۱', status: 'success', account: '۷۱۲۲۸۹۰۰' },
    { id: 'TRX-1010', payee: 'تجارت الکترونیک رضا', type: 'paya', amount: 71_400_000, date: '۱۴۰۴/۰۴/۰۱', status: 'failed', account: '۶۲۷۳۱۱۸۹' },
    { id: 'TRX-1011', payee: 'پتروشیمی جنوب', type: 'satna', amount: 1_240_000_000, date: '۱۴۰۴/۰۳/۳۱', status: 'success', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1012', payee: 'نساجی کاشان', type: 'internal', amount: 18_600_000, date: '۱۴۰۴/۰۳/۳۱', status: 'pending', account: '۵۸۹۲۱۴۵۶' },
    { id: 'TRX-1013', payee: 'لوازم خانگی پارمیس', type: 'paya', amount: 95_000_000, date: '۱۴۰۴/۰۳/۳۰', status: 'success', account: '۶۲۷۳۱۱۸۹' },
    { id: 'TRX-1014', payee: 'خدمات بیمه‌ای ایمن', type: 'bill', amount: 4_300_000, date: '۱۴۰۴/۰۳/۳۰', status: 'success', account: '۷۱۲۲۸۹۰۰' },
    { id: 'TRX-1015', payee: 'صادرات خشکبار', type: 'satna', amount: 312_000_000, date: '۱۴۰۴/۰۳/۲۹', status: 'failed', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1016', payee: 'کشت و صنعت سبز', type: 'internal', amount: 27_800_000, date: '۱۴۰۴/۰۳/۲۹', status: 'success', account: '۵۸۹۲۱۴۵۶' },
    { id: 'TRX-1017', payee: 'فولاد مبارکه تأمین', type: 'satna', amount: 2_100_000_000, date: '۱۴۰۴/۰۳/۲۸', status: 'pending', account: '۶۱۰۴۳۳۷۸' },
    { id: 'TRX-1018', payee: 'دیجیتال مارکتینگ رشد', type: 'paya', amount: 53_200_000, date: '۱۴۰۴/۰۳/۲۸', status: 'success', account: '۶۲۷۳۱۱۸۹' },
    { id: 'TRX-1019', payee: 'تجهیزات پزشکی سلامت', type: 'bill', amount: 14_900_000, date: '۱۴۰۴/۰۳/۲۷', status: 'success', account: '۷۱۲۲۸۹۰۰' },
    { id: 'TRX-1020', payee: 'بازرگانی بین‌الملل', type: 'satna', amount: 478_000_000, date: '۱۴۰۴/۰۳/۲۷', status: 'success', account: '۶۱۰۴۳۳۷۸' },
  ];

  protected formatAmount(n: number): string {
    return n.toLocaleString('fa-IR');
  }

  protected typeLabel(t: Transaction['type']): string {
    return { satna: 'ساتنا', paya: 'پایا', internal: 'داخلی', bill: 'قبض' }[t];
  }

  protected statusLabel(s: Transaction['status']): string {
    return { success: 'موفق', pending: 'در انتظار', failed: 'ناموفق' }[s];
  }

  protected statusSeverity(s: Transaction['status']): Severity {
    return { success: 'success', pending: 'warn', failed: 'danger' }[s] as Severity;
  }
}
