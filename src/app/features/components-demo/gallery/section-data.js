import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { TreeModule } from 'primeng/tree';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { DataViewModule } from 'primeng/dataview';
import { MeterGroupModule } from 'primeng/metergroup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { GalleryCard } from './gallery-section';
/** Data display: paginator, tree, lists, dataview, meter, scrolltop. */
let GalleryData = class GalleryData {
    meter = [
        { label: 'حساب‌ها', color: '#3b82f6', value: 40 },
        { label: 'حواله‌ها', color: '#10b981', value: 30 },
        { label: 'تسهیلات', color: '#f59e0b', value: 20 },
    ];
    treeNodes = [
        {
            label: 'مدیریت حساب', expanded: true,
            children: [
                { label: 'حساب‌های ریالی' },
                { label: 'حساب‌های ارزی' },
                { label: 'گردش وجوه' },
            ],
        },
        {
            label: 'مدیریت پرداخت',
            children: [{ label: 'حواله ساتنا' }, { label: 'حواله پایا' }],
        },
    ];
    products = [
        { code: 'p1', name: 'حساب جاری', price: '۱۲٬۰۰۰٬۰۰۰' },
        { code: 'p2', name: 'حساب پس‌انداز', price: '۸٬۵۰۰٬۰۰۰' },
        { code: 'p3', name: 'سپرده بلندمدت', price: '۵۰٬۰۰۰٬۰۰۰' },
    ];
    cities = [
        { name: 'تهران' }, { name: 'اصفهان' }, { name: 'شیراز' }, { name: 'مشهد' }, { name: 'تبریز' },
    ];
    source = [{ name: 'گزینه ۱' }, { name: 'گزینه ۲' }, { name: 'گزینه ۳' }];
    target = [];
};
GalleryData = __decorate([
    Component({
        selector: 'app-gallery-data',
        imports: [
            FormsModule, PaginatorModule, TreeModule, OrderListModule, PickListModule,
            DataViewModule, MeterGroupModule, ScrollTopModule, GalleryCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="Paginator">
        <p-paginator [rows]="10" [totalRecords]="120" [rowsPerPageOptions]="[10, 20, 30]" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="MeterGroup">
        <p-metergroup [value]="meter" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Tree">
        <p-tree [value]="treeNodes" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="DataView">
        <p-dataview [value]="products" class="w-full">
          <ng-template #list let-items>
            @for (item of items; track item.code) {
              <div class="flex items-center justify-between border-b border-surface-100 py-2 dark:border-surface-800">
                <span class="text-sm">{{ item.name }}</span>
                <span class="text-sm font-semibold text-primary">{{ item.price }}</span>
              </div>
            }
          </ng-template>
        </p-dataview>
      </app-gallery-card>

      <app-gallery-card title="OrderList">
        <p-orderlist [value]="cities" [listStyle]="{ 'max-height': '12rem' }" class="w-full">
          <ng-template #item let-city>
            <span class="text-sm">{{ city.name }}</span>
          </ng-template>
        </p-orderlist>
      </app-gallery-card>

      <app-gallery-card title="PickList">
        <p-picklist [source]="source" [target]="target" [sourceStyle]="{ 'max-height': '10rem' }"
                    [targetStyle]="{ 'max-height': '10rem' }" class="w-full">
          <ng-template #item let-item>
            <span class="text-sm">{{ item.name }}</span>
          </ng-template>
        </p-picklist>
      </app-gallery-card>
    </div>

    <p-scrolltop />
  `,
    })
], GalleryData);
export { GalleryData };
