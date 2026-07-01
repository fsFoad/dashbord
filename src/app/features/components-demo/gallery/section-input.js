import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputOtpModule } from 'primeng/inputotp';
import { ListboxModule } from 'primeng/listbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ImageModule } from 'primeng/image';
import { GalleryCard } from './gallery-section';
/** Inputs & fields: text, textarea, float label, icon field, OTP, lists, selects. */
let GalleryInput = class GalleryInput {
    text = '';
    longText = '';
    otp = '';
    cities = [
        { name: 'تهران', code: 'THR' }, { name: 'اصفهان', code: 'ISF' }, { name: 'شیراز', code: 'SHZ' },
    ];
    selectedCity = null;
    nodes = [
        { key: '0', label: 'مدیریت حساب', children: [{ key: '0-0', label: 'ریالی' }, { key: '0-1', label: 'ارزی' }] },
        { key: '1', label: 'مدیریت پرداخت', children: [{ key: '1-0', label: 'ساتنا' }] },
    ];
    selectedNode = null;
    cascadeChildren = ['states', 'cities'];
    selectedCascade = null;
    // typed as any[] so the template type-checker doesn't try to reconcile the
    // nested group shape against CascadeSelect's option-group typings.
    countries = [
        {
            name: 'ایران', code: 'IR',
            states: [
                { name: 'تهران', cities: [{ cname: 'تهران' }, { cname: 'ری' }] },
                { name: 'فارس', cities: [{ cname: 'شیراز' }, { cname: 'مرودشت' }] },
            ],
        },
    ];
};
GalleryInput = __decorate([
    Component({
        selector: 'app-gallery-input',
        imports: [
            FormsModule, InputTextModule, TextareaModule, FloatLabelModule, IconFieldModule,
            InputIconModule, InputOtpModule, ListboxModule, TreeSelectModule, CascadeSelectModule,
            ImageModule, GalleryCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="InputText">
        <input pInputText [(ngModel)]="text" placeholder="نام و نام خانوادگی" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Textarea">
        <textarea pTextarea [(ngModel)]="longText" rows="3" placeholder="توضیحات..." class="w-full"></textarea>
      </app-gallery-card>

      <app-gallery-card title="Float Label">
        <p-floatlabel class="w-full">
          <input pInputText id="fl" [(ngModel)]="text" class="w-full" />
          <label for="fl">عنوان</label>
        </p-floatlabel>
      </app-gallery-card>

      <app-gallery-card title="Icon Field">
        <p-iconfield class="w-full">
          <p-inputicon class="pi pi-search" />
          <input pInputText [(ngModel)]="text" placeholder="جستجو" class="w-full" />
        </p-iconfield>
      </app-gallery-card>

      <app-gallery-card title="Input OTP">
        <p-inputotp [(ngModel)]="otp" [length]="5" />
      </app-gallery-card>

      <app-gallery-card title="Listbox">
        <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="TreeSelect">
        <p-treeselect [(ngModel)]="selectedNode" [options]="nodes" placeholder="انتخاب کنید" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="CascadeSelect">
        <p-cascadeselect
          [(ngModel)]="selectedCascade"
          [options]="countries"
          optionLabel="cname"
          optionGroupLabel="name"
          [optionGroupChildren]="cascadeChildren"
          placeholder="انتخاب شهر"
          styleClass="w-full" />
      </app-gallery-card>

      <app-gallery-card title="ImageModule (preview)">
        <p-image src="/flags/ir.svg" alt="پرچم" width="60" [preview]="true" />
      </app-gallery-card>
    </div>
  `,
    })
], GalleryInput);
export { GalleryInput };
