import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { GalleryCard } from './gallery-section';

/**
 * Extra components: date picker, confirm dialog, mega menu, galleria,
 * organization chart, context menu. (PrimeNG Editor is omitted — it needs the
 * external `quill` package which isn't installed.)
 */
@Component({
  selector: 'app-gallery-extra',
  imports: [
    FormsModule, DatePickerModule, ConfirmDialogModule, MegaMenuModule, GalleriaModule,
    OrganizationChartModule, ContextMenuModule, ButtonModule, GalleryCard,
  ],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="DatePicker">
        <p-datepicker [(ngModel)]="date" [showIcon]="true" dateFormat="yy/mm/dd" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="ConfirmDialog">
        <p-button label="حذف" icon="pi pi-trash" severity="danger" size="small" (onClick)="confirm()" />
        <p-confirmdialog />
      </app-gallery-card>

      <app-gallery-card title="MegaMenu">
        <p-megamenu [model]="megaItems" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Galleria">
        <p-galleria [value]="images" [numVisible]="3" [containerStyle]="{ 'max-width': '100%' }"
                    [showThumbnails]="false" [showIndicators]="true">
          <ng-template #item let-item>
            <div class="flex h-32 w-full items-center justify-center rounded-xl text-primary-contrast"
                 [style.background]="item.bg">
              {{ item.title }}
            </div>
          </ng-template>
        </p-galleria>
      </app-gallery-card>

      <app-gallery-card title="ContextMenu" hint="راست‌کلیک روی کادر">
        <div #ctxZone class="grid h-20 w-full place-items-center rounded-xl border border-dashed border-surface-300 text-sm text-muted-color dark:border-surface-600">
          راست‌کلیک کنید
        </div>
        <p-contextmenu [target]="ctxZone" [model]="ctxItems" />
      </app-gallery-card>

      <app-gallery-card title="OrganizationChart">
        <p-organizationchart [value]="orgData" class="w-full" />
      </app-gallery-card>
    </div>
  `,
})
export class GalleryExtra {
  protected date: Date | null = null;

  constructor(private readonly confirmation: ConfirmationService) {}

  protected confirm(): void {
    this.confirmation.confirm({
      message: 'آیا از حذف این مورد مطمئن هستید؟',
      header: 'تأیید حذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
    });
  }

  protected readonly megaItems: MegaMenuItem[] = [
    {
      label: 'حساب‌ها', icon: 'pi pi-wallet',
      items: [
        [{ label: 'ریالی', items: [{ label: 'لیست حساب‌ها' }, { label: 'گردش وجوه' }] }],
        [{ label: 'ارزی', items: [{ label: 'حساب‌های ارزی' }] }],
      ],
    },
    {
      label: 'پرداخت', icon: 'pi pi-send',
      items: [
        [{ label: 'حواله', items: [{ label: 'ساتنا' }, { label: 'پایا' }] }],
      ],
    },
  ];

  protected readonly images = [
    { title: 'تصویر ۱', bg: '#3b82f6' },
    { title: 'تصویر ۲', bg: '#10b981' },
    { title: 'تصویر ۳', bg: '#f59e0b' },
  ];

  protected readonly ctxItems: MenuItem[] = [
    { label: 'ویرایش', icon: 'pi pi-pencil' },
    { label: 'کپی', icon: 'pi pi-copy' },
    { separator: true },
    { label: 'حذف', icon: 'pi pi-trash' },
  ];

  protected readonly orgData: TreeNode[] = [
    {
      label: 'مدیرعامل', expanded: true,
      children: [
        { label: 'معاونت مالی', expanded: true, children: [{ label: 'حسابداری' }, { label: 'خزانه‌داری' }] },
        { label: 'معاونت فناوری', children: [{ label: 'توسعه' }, { label: 'زیرساخت' }] },
      ],
    },
  ];
}
