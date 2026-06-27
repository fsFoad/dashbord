import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GalleryCard } from './gallery-section';

/** Misc & advanced: carousel, file upload, treetable. */
@Component({
  selector: 'app-gallery-misc',
  imports: [
    FormsModule, CarouselModule, FileUploadModule, TreeTableModule, ToggleButtonModule, GalleryCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="Carousel">
        <p-carousel [value]="cards" [numVisible]="1" [numScroll]="1" class="w-full">
          <ng-template let-card #item>
            <div class="m-1 rounded-xl border border-surface-200 p-4 text-center dark:border-surface-800">
              <p class="text-sm font-semibold">{{ card.title }}</p>
              <p class="mt-1 text-lg font-bold text-primary">{{ card.value }}</p>
            </div>
          </ng-template>
        </p-carousel>
      </app-gallery-card>

      <app-gallery-card title="FileUpload" hint="حالت basic">
        <p-fileupload mode="basic" chooseLabel="انتخاب فایل" [auto]="false" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="TreeTable">
        <p-treetable [value]="treeData" class="w-full">
          <ng-template #header>
            <tr>
              <th>نام</th>
              <th>مبلغ</th>
            </tr>
          </ng-template>
          <ng-template #body let-rowNode let-rowData="rowData">
            <tr>
              <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
              </td>
              <td>{{ rowData.amount }}</td>
            </tr>
          </ng-template>
        </p-treetable>
      </app-gallery-card>
    </div>
  `,
})
export class GalleryMisc {
  protected readonly cards = [
    { title: 'موجودی کل', value: '۸٬۵۲۴٬۶۰۰' },
    { title: 'حواله‌های امروز', value: '۱۲۳' },
    { title: 'تراکنش‌ها', value: '۴۵۶' },
  ];

  protected readonly treeData: TreeNode[] = [
    {
      data: { name: 'مدیریت حساب', amount: '—' }, expanded: true,
      children: [
        { data: { name: 'حساب ریالی', amount: '۱۲٬۰۰۰٬۰۰۰' } },
        { data: { name: 'حساب ارزی', amount: '۸٬۵۰۰٬۰۰۰' } },
      ],
    },
  ];
}
