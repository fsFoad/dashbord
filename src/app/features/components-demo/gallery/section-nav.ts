import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepperModule } from 'primeng/stepper';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DockModule } from 'primeng/dock';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { GalleryCard } from './gallery-section';

/** Navigation & layout: breadcrumb, stepper, menus, dock, speeddial, toolbar, splitter. */
@Component({
  selector: 'app-gallery-nav',
  imports: [
    FormsModule, BreadcrumbModule, StepperModule, PanelMenuModule, TieredMenuModule,
    ContextMenuModule, DockModule, SpeedDialModule, ToolbarModule, SplitterModule,
    ButtonModule, GalleryCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <app-gallery-card title="Breadcrumb">
        <p-breadcrumb [model]="crumbs" [home]="home" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Toolbar">
        <p-toolbar class="w-full">
          <ng-template #start>
            <p-button icon="pi pi-plus" label="جدید" size="small" />
          </ng-template>
          <ng-template #end>
            <p-button icon="pi pi-download" severity="secondary" size="small" [text]="true" />
          </ng-template>
        </p-toolbar>
      </app-gallery-card>

      <app-gallery-card title="Stepper">
        <p-stepper [value]="1" class="w-full">
          <p-step-list>
            <p-step [value]="1">ثبت‌نام</p-step>
            <p-step [value]="2">اتصال</p-step>
            <p-step [value]="3">پایان</p-step>
          </p-step-list>
        </p-stepper>
      </app-gallery-card>

      <app-gallery-card title="PanelMenu">
        <p-panelmenu [model]="panelItems" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="TieredMenu">
        <p-tieredmenu [model]="tieredItems" class="w-full" />
      </app-gallery-card>

      <app-gallery-card title="Splitter">
        <p-splitter [style]="{ height: '8rem' }" class="w-full">
          <ng-template #panel>
            <div class="flex items-center justify-center p-3 text-sm text-muted-color">پنل ۱</div>
          </ng-template>
          <ng-template #panel>
            <div class="flex items-center justify-center p-3 text-sm text-muted-color">پنل ۲</div>
          </ng-template>
        </p-splitter>
      </app-gallery-card>

      <app-gallery-card title="SpeedDial" hint="پایین گوشه">
        <div class="relative h-24 w-full">
          <p-speeddial [model]="dialItems" direction="up" [style]="{ position: 'absolute', right: '1rem', bottom: '0' }" />
        </div>
      </app-gallery-card>

      <app-gallery-card title="Dock">
        <p-dock [model]="dockItems" position="bottom" class="w-full" />
      </app-gallery-card>
    </div>
  `,
})
export class GalleryNav {
  protected readonly home: MenuItem = { icon: 'pi pi-home', label: 'خانه' };
  protected readonly crumbs: MenuItem[] = [
    { label: 'مدیریت حساب' }, { label: 'حواله بانکی' }, { label: 'ثبت حواله' },
  ];

  protected readonly panelItems: MenuItem[] = [
    {
      label: 'مدیریت حساب', icon: 'pi pi-wallet',
      items: [{ label: 'حساب‌های ریالی', icon: 'pi pi-money-bill' }, { label: 'حساب‌های ارزی', icon: 'pi pi-dollar' }],
    },
    {
      label: 'مدیریت پرداخت', icon: 'pi pi-send',
      items: [{ label: 'حواله ساتنا' }, { label: 'حواله پایا' }],
    },
  ];

  protected readonly tieredItems: MenuItem[] = [
    { label: 'فایل', icon: 'pi pi-file', items: [{ label: 'جدید' }, { label: 'باز کردن' }] },
    { label: 'ویرایش', icon: 'pi pi-pencil', items: [{ label: 'کپی' }, { label: 'برش' }] },
  ];

  protected readonly dialItems: MenuItem[] = [
    { icon: 'pi pi-plus' }, { icon: 'pi pi-pencil' }, { icon: 'pi pi-trash' },
  ];

  protected readonly dockItems: MenuItem[] = [
    { icon: 'pi pi-home' }, { icon: 'pi pi-chart-bar' }, { icon: 'pi pi-cog' }, { icon: 'pi pi-user' },
  ];
}
