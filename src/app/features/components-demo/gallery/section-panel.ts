import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { Panel } from 'primeng/panel';
import { Fieldset } from 'primeng/fieldset';
import { Card } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { Divider } from 'primeng/divider';
import { Timeline } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { GalleryCard } from './gallery-section';

/** Containers, panels and data display. */
@Component({
  selector: 'app-gallery-panel',
  imports: [
    FormsModule, AccordionModule, Panel, Fieldset, Card, TabsModule, Divider,
    Timeline, TableModule, GalleryCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="Accordion">
        <p-accordion [value]="['0']" class="w-full">
          @for (tab of tabs; track tab.title; let i = $index) {
            <p-accordion-panel [value]="i.toString()">
              <p-accordion-header>{{ tab.title }}</p-accordion-header>
              <p-accordion-content>
                <p class="text-sm text-muted-color">{{ tab.body }}</p>
              </p-accordion-content>
            </p-accordion-panel>
          }
        </p-accordion>
      </app-gallery-card>

      <app-gallery-card title="Tabs">
        <p-tabs value="0" class="w-full">
          <p-tablist>
            <p-tab value="0">پروفایل</p-tab>
            <p-tab value="1">تنظیمات</p-tab>
            <p-tab value="2">امنیت</p-tab>
          </p-tablist>
          <p-tabpanels>
            <p-tabpanel value="0"><p class="text-sm text-muted-color">محتوای پروفایل</p></p-tabpanel>
            <p-tabpanel value="1"><p class="text-sm text-muted-color">محتوای تنظیمات</p></p-tabpanel>
            <p-tabpanel value="2"><p class="text-sm text-muted-color">محتوای امنیت</p></p-tabpanel>
          </p-tabpanels>
        </p-tabs>
      </app-gallery-card>

      <app-gallery-card title="Panel (toggleable)">
        <p-panel header="عنوان پنل" [toggleable]="true" class="w-full">
          <p class="text-sm text-muted-color">محتوای پنل که می‌تواند باز و بسته شود.</p>
        </p-panel>
      </app-gallery-card>

      <app-gallery-card title="Fieldset">
        <p-fieldset legend="اطلاعات" [toggleable]="true" class="w-full">
          <p class="text-sm text-muted-color">یک گروه‌بندی با عنوان و قابلیت جمع‌شدن.</p>
        </p-fieldset>
      </app-gallery-card>

      <app-gallery-card title="Card">
        <p-card header="عنوان کارت" subheader="زیرعنوان" class="w-full">
          <p class="text-sm text-muted-color">بدنه‌ی کارت با هدر و زیرعنوان.</p>
        </p-card>
      </app-gallery-card>

      <app-gallery-card title="Divider">
        <div class="w-full text-sm">
          بالا
          <p-divider />
          <div class="flex items-center">
            راست
            <p-divider layout="vertical" />
            چپ
          </div>
        </div>
      </app-gallery-card>

      <app-gallery-card title="Timeline">
        <p-timeline [value]="events" class="w-full">
          <ng-template #content let-e>
            <span class="text-sm">{{ e.label }}</span>
          </ng-template>
          <ng-template #opposite let-e>
            <span class="text-xs text-muted-color">{{ e.time }}</span>
          </ng-template>
        </p-timeline>
      </app-gallery-card>

      <app-gallery-card title="Table (basic)">
        <p-table [value]="rows" class="w-full" styleClass="text-sm">
          <ng-template #header>
            <tr><th>نام</th><th>نقش</th></tr>
          </ng-template>
          <ng-template #body let-r>
            <tr><td>{{ r.name }}</td><td>{{ r.role }}</td></tr>
          </ng-template>
        </p-table>
      </app-gallery-card>
    </div>
  `,
})
export class GalleryPanel {
  protected readonly tabs = [
    { title: 'بخش اول', body: 'محتوای بخش اول آکاردیون.' },
    { title: 'بخش دوم', body: 'محتوای بخش دوم آکاردیون.' },
    { title: 'بخش سوم', body: 'محتوای بخش سوم آکاردیون.' },
  ];
  protected readonly events = [
    { label: 'ثبت سفارش', time: '۰۹:۰۰' },
    { label: 'پردازش', time: '۱۰:۳۰' },
    { label: 'ارسال', time: '۱۳:۱۵' },
    { label: 'تحویل', time: '۱۶:۴۰' },
  ];
  protected readonly rows = [
    { name: 'سارا', role: 'مدیر' },
    { name: 'علی', role: 'توسعه‌دهنده' },
    { name: 'مریم', role: 'طراح' },
  ];
}
