import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { GalleryForm } from './section-form';
import { GalleryButton } from './section-button';
import { GalleryPanel } from './section-panel';
import { GalleryOverlay } from './section-overlay';
import { GalleryData } from './section-data';
import { GalleryInput } from './section-input';
import { GalleryNav } from './section-nav';
import { GalleryMisc } from './section-misc';
import { GalleryExtra } from './section-extra';
import { GalleryTable } from './section-table';
/**
 * Live gallery of PrimeNG components — a developer reference and a quick way
 * to eyeball theme / dark-mode / RTL across the whole component set. Each
 * section is deferred so only the active one renders.
 */
let ComponentsGallery = class ComponentsGallery {
    active = signal('form');
    sections = [
        { id: 'form', labelKey: 'gallery.form', icon: 'pi pi-pencil' },
        { id: 'button', labelKey: 'gallery.button', icon: 'pi pi-stop' },
        { id: 'panel', labelKey: 'gallery.panel', icon: 'pi pi-th-large' },
        { id: 'input', labelKey: 'gallery.input', icon: 'pi pi-pencil' },
        { id: 'table', labelKey: 'gallery.table', icon: 'pi pi-table' },
        { id: 'data', labelKey: 'gallery.data', icon: 'pi pi-database' },
        { id: 'nav', labelKey: 'gallery.nav', icon: 'pi pi-sitemap' },
        { id: 'overlay', labelKey: 'gallery.overlay', icon: 'pi pi-clone' },
        { id: 'misc', labelKey: 'gallery.misc', icon: 'pi pi-ellipsis-h' },
        { id: 'extra', labelKey: 'gallery.extra', icon: 'pi pi-plus-circle' },
    ];
};
ComponentsGallery = __decorate([
    Component({
        selector: 'app-components-gallery',
        imports: [TranslocoModule, GalleryForm, GalleryInput, GalleryButton, GalleryPanel, GalleryData, GalleryNav, GalleryOverlay, GalleryMisc, GalleryExtra, GalleryTable],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
        {{ 'gallery.title' | transloco }}
      </h1>
      <p class="mt-1 text-sm text-muted-color">{{ 'gallery.subtitle' | transloco }}</p>
    </div>

    <!-- section selector -->
    <!-- mobile: 2-column grid of buttons (reliable tap targets, no native select) -->
    <div class="mb-5 grid grid-cols-2 gap-1.5 sm:hidden">
      @for (s of sections; track s.id) {
        <button
          type="button"
          (click)="active.set(s.id)"
          class="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors"
          [class.border-primary]="active() === s.id"
          [class.bg-primary]="active() === s.id"
          [class.text-primary-contrast]="active() === s.id"
          [class.border-surface-200]="active() !== s.id"
          [class.bg-surface-0]="active() !== s.id"
          [class.text-surface-700]="active() !== s.id"
          [class.dark:border-surface-700]="active() !== s.id"
          [class.dark:bg-surface-900]="active() !== s.id"
          [class.dark:text-surface-200]="active() !== s.id"
        >
          <i [class]="s.icon" class="shrink-0 text-sm"></i>
          <span class="truncate">{{ s.labelKey | transloco }}</span>
        </button>
      }
    </div>

    <!-- desktop: horizontal tabs (wraps to multiple rows so all are reachable) -->
    <div class="mb-5 hidden flex-wrap gap-1 rounded-xl bg-surface-100 p-1 dark:bg-surface-800/60 sm:flex">
      @for (s of sections; track s.id) {
        <button
          type="button"
          (click)="active.set(s.id)"
          class="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          [class.bg-surface-0]="active() === s.id"
          [class.shadow-sm]="active() === s.id"
          [class.dark:bg-surface-900]="active() === s.id"
          [class.text-primary]="active() === s.id"
          [class.text-muted-color]="active() !== s.id"
        >
          <i [class]="s.icon"></i>
          {{ s.labelKey | transloco }}
        </button>
      }
    </div>

    @switch (active()) {
      @case ('form') { <app-gallery-form /> }
      @case ('button') { <app-gallery-button /> }
      @case ('panel') { <app-gallery-panel /> }
      @case ('input') { <app-gallery-input /> }
      @case ('table') { <app-gallery-table /> }
      @case ('data') { <app-gallery-data /> }
      @case ('nav') { <app-gallery-nav /> }
      @case ('overlay') { <app-gallery-overlay /> }
      @case ('misc') { <app-gallery-misc /> }
      @case ('extra') { <app-gallery-extra /> }
    }
  `,
    })
], ComponentsGallery);
export { ComponentsGallery };
