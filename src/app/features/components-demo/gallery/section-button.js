import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { Badge } from 'primeng/badge';
import { OverlayBadge } from 'primeng/overlaybadge';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Skeleton } from 'primeng/skeleton';
import { GalleryCard } from './gallery-section';
/** Buttons, status indicators and loaders. */
let GalleryButton = class GalleryButton {
    progress = signal(72);
    items = [
        { label: 'ذخیره و بستن', icon: 'pi pi-check' },
        { label: 'ذخیره به‌عنوان', icon: 'pi pi-copy' },
        { separator: true },
        { label: 'حذف', icon: 'pi pi-trash' },
    ];
};
GalleryButton = __decorate([
    Component({
        selector: 'app-gallery-button',
        imports: [
            FormsModule, ButtonModule, SplitButton, TagModule, ChipModule, Badge, OverlayBadge,
            Avatar, AvatarGroup, ProgressBar, ProgressSpinner, Skeleton, GalleryCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <app-gallery-card title="Button — severities">
        <p-button label="Primary" />
        <p-button label="Secondary" severity="secondary" />
        <p-button label="Success" severity="success" />
        <p-button label="Warn" severity="warn" />
        <p-button label="Danger" severity="danger" />
        <p-button label="Info" severity="info" />
        <p-button label="Contrast" severity="contrast" />
      </app-gallery-card>

      <app-gallery-card title="Button — variants">
        <p-button label="Outlined" [outlined]="true" />
        <p-button label="Text" [text]="true" />
        <p-button label="Rounded" [rounded]="true" />
        <p-button icon="pi pi-check" [rounded]="true" />
        <p-button icon="pi pi-search" label="Icon" />
        <p-button label="Loading" [loading]="true" />
      </app-gallery-card>

      <app-gallery-card title="SplitButton">
        <p-splitbutton label="ذخیره" [model]="items" />
      </app-gallery-card>

      <app-gallery-card title="Tag">
        <p-tag value="Active" severity="success" />
        <p-tag value="Pending" severity="warn" />
        <p-tag value="Closed" severity="danger" icon="pi pi-times" />
        <p-tag value="Info" severity="info" [rounded]="true" />
      </app-gallery-card>

      <app-gallery-card title="Chip">
        <p-chip label="Angular" icon="pi pi-prime" />
        <p-chip label="Removable" [removable]="true" />
        <p-chip label="سارا" image="https://i.pravatar.cc/40?img=5" />
      </app-gallery-card>

      <app-gallery-card title="Badge / OverlayBadge">
        <p-badge [value]="8" />
        <p-badge value="New" severity="success" />
        <p-overlaybadge value="4"><i class="pi pi-bell text-2xl"></i></p-overlaybadge>
        <p-overlaybadge severity="danger"><i class="pi pi-envelope text-2xl"></i></p-overlaybadge>
      </app-gallery-card>

      <app-gallery-card title="Avatar / AvatarGroup">
        <p-avatar label="ف" shape="circle" />
        <p-avatar icon="pi pi-user" shape="circle" />
        <p-avatar image="https://i.pravatar.cc/40?img=12" shape="circle" />
        <p-avatargroup>
          <p-avatar image="https://i.pravatar.cc/40?img=1" shape="circle" />
          <p-avatar image="https://i.pravatar.cc/40?img=2" shape="circle" />
          <p-avatar image="https://i.pravatar.cc/40?img=3" shape="circle" />
          <p-avatar label="+5" shape="circle" />
        </p-avatargroup>
      </app-gallery-card>

      <app-gallery-card title="ProgressBar">
        <div class="w-full">
          <p-progressbar [value]="progress()" />
          <p-progressbar mode="indeterminate" [style]="{ height: '6px' }" styleClass="mt-3" />
        </div>
      </app-gallery-card>

      <app-gallery-card title="Spinner / Skeleton">
        <p-progressspinner [style]="{ width: '44px', height: '44px' }" strokeWidth="4" />
        <div class="flex-1">
          <p-skeleton width="100%" height="1rem" styleClass="mb-2" />
          <p-skeleton width="70%" height="1rem" />
        </div>
      </app-gallery-card>
    </div>
  `,
    })
], GalleryButton);
export { GalleryButton };
