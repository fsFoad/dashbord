import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Drawer } from 'primeng/drawer';
import { Popover } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { Menubar } from 'primeng/menubar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { GalleryCard } from './gallery-section';

/**
 * Overlays, messages and menus. Uses its OWN local ConfirmationService /
 * MessageService (a self-contained demo that doesn't touch the app-wide
 * toast/confirm services), so a developer can copy it as-is.
 */
@Component({
  selector: 'app-gallery-overlay',
  imports: [
    FormsModule, ButtonModule, Dialog, Drawer, Popover, Tooltip, Menu, Menubar,
    ConfirmPopupModule, MessageModule, ToastModule, InplaceModule, InputTextModule, GalleryCard,
  ],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-toast />
    <p-confirmpopup />
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <app-gallery-card title="Dialog">
        <p-button label="باز کردن دیالوگ" icon="pi pi-window-maximize" (onClick)="dialog.set(true)" />
        <p-dialog [(visible)]="dialogVisible" [modal]="true" [draggable]="false" header="دیالوگ نمونه" [style]="{ width: '24rem', maxWidth: '92vw' }">
          <p class="text-sm text-muted-color">این یک دیالوگ مودال است. هر محتوایی می‌تواند داشته باشد.</p>
          <ng-template #footer>
            <p-button label="بستن" size="small" (onClick)="dialog.set(false)" />
          </ng-template>
        </p-dialog>
      </app-gallery-card>

      <app-gallery-card title="Drawer">
        <p-button label="باز کردن کشو" icon="pi pi-bars" severity="secondary" (onClick)="drawer.set(true)" />
        <p-drawer [(visible)]="drawerVisible" header="کشوی کناری" position="left">
          <p class="text-sm text-muted-color">محتوای کشو (Drawer). در RTL از سمت راست باز می‌شود.</p>
        </p-drawer>
      </app-gallery-card>

      <app-gallery-card title="Popover">
        <p-button label="نمایش Popover" severity="secondary" [outlined]="true" (onClick)="pop.toggle($event)" />
        <p-popover #pop>
          <div class="w-48 text-sm">
            <p class="text-muted-color">یک overlay کوچک متصل به دکمه.</p>
          </div>
        </p-popover>
      </app-gallery-card>

      <app-gallery-card title="Tooltip">
        <span [pTooltip]="'متن راهنما'" tooltipPosition="top"><p-button label="بالا" severity="secondary" [text]="true" /></span>
        <span [pTooltip]="'متن راهنما'" tooltipPosition="bottom"><p-button label="پایین" severity="secondary" [text]="true" /></span>
      </app-gallery-card>

      <app-gallery-card title="Menu (popup)">
        <p-button label="منو" icon="pi pi-ellipsis-v" severity="secondary" (onClick)="menu.toggle($event)" />
        <p-menu #menu [model]="menuItems" [popup]="true" />
      </app-gallery-card>

      <app-gallery-card title="ConfirmPopup">
        <p-button label="حذف" severity="danger" [outlined]="true" (onClick)="confirmDel($event)" />
      </app-gallery-card>

      <app-gallery-card title="Message (inline)">
        <div class="flex w-full flex-col gap-2">
          <p-message severity="success" text="با موفقیت ذخیره شد" />
          <p-message severity="warn" text="مقدار نامعتبر است" />
          <p-message severity="error" text="خطا در اتصال" />
          <p-message severity="info" text="یک نکته" />
        </div>
      </app-gallery-card>

      <app-gallery-card title="Toast">
        <p-button label="نمایش Toast" severity="info" (onClick)="showToast()" />
      </app-gallery-card>

      <app-gallery-card title="Inplace (edit in place)">
        <p-inplace>
          <ng-template #display><span class="text-sm text-primary">برای ویرایش کلیک کنید</span></ng-template>
          <ng-template #content>
            <input pInputText [(ngModel)]="inplaceText" />
          </ng-template>
        </p-inplace>
      </app-gallery-card>

      <app-gallery-card title="Menubar">
        <p-menubar [model]="menubarItems" class="w-full" />
      </app-gallery-card>
    </div>
  `,
})
export class GalleryOverlay {
  private readonly confirmation = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  protected readonly dialog = signal(false);
  protected readonly drawer = signal(false);
  protected inplaceText = 'مقدار قابل ویرایش';

  protected pop = viewChild.required<Popover>('pop');
  protected menu = viewChild.required<Menu>('menu');

  // two-way helpers (PrimeNG dialogs use [(visible)])
  protected get dialogVisible(): boolean { return this.dialog(); }
  protected set dialogVisible(v: boolean) { this.dialog.set(v); }
  protected get drawerVisible(): boolean { return this.drawer(); }
  protected set drawerVisible(v: boolean) { this.drawer.set(v); }

  protected readonly menuItems: MenuItem[] = [
    { label: 'مشاهده', icon: 'pi pi-eye' },
    { label: 'ویرایش', icon: 'pi pi-pencil' },
    { separator: true },
    { label: 'حذف', icon: 'pi pi-trash' },
  ];

  protected readonly menubarItems: MenuItem[] = [
    { label: 'خانه', icon: 'pi pi-home' },
    {
      label: 'پروژه‌ها', icon: 'pi pi-folder',
      items: [
        { label: 'همه', icon: 'pi pi-list' },
        { label: 'جدید', icon: 'pi pi-plus' },
      ],
    },
    { label: 'گزارش‌ها', icon: 'pi pi-chart-bar' },
  ];

  protected confirmDel(event: Event): void {
    this.confirmation.confirm({
      target: event.target as EventTarget,
      message: 'از حذف این مورد مطمئن هستید؟',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.message.add({ severity: 'success', summary: 'حذف شد', life: 2000 }),
    });
  }

  protected showToast(): void {
    this.message.add({ severity: 'info', summary: 'اعلان', detail: 'این یک Toast نمونه است', life: 2500 });
  }
}
