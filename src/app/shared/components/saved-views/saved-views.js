import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { SavedViewsService } from '../../../core/services/saved-views.service';
import { ToastService } from '../../../core/services/toast.service';
/**
 * Reusable "Saved views" control for any table. The parent owns the actual
 * state: it passes `currentState` (for saving) and reacts to `apply`/`cleared`.
 *
 *   <app-saved-views
 *      tableKey="projects"
 *      [currentState]="snapshot()"
 *      (apply)="restore($event)"
 *      (cleared)="resetFilters()" />
 */
let SavedViews = class SavedViews {
    svc = inject(SavedViewsService);
    toast = inject(ToastService);
    tableKey = input.required();
    currentState = input.required();
    apply = output();
    cleared = output();
    newName = '';
    bump = signal(0);
    activeId = signal(null);
    views = computed(() => {
        this.bump();
        return this.svc.list(this.tableKey());
    });
    activeName = computed(() => {
        const id = this.activeId();
        return id ? (this.views().find((v) => v.id === id)?.name ?? '') : '';
    });
    saveCurrent() {
        const name = this.newName.trim();
        if (!name)
            return;
        const view = this.svc.save(this.tableKey(), name, this.currentState());
        this.newName = '';
        this.bump.update((n) => n + 1);
        this.activeId.set(view.id);
        this.toast.success('views.saved', { name });
    }
    applyView(v) {
        this.activeId.set(v.id);
        this.apply.emit(v.state);
    }
    del(v) {
        this.svc.remove(this.tableKey(), v.id);
        if (this.activeId() === v.id)
            this.activeId.set(null);
        this.bump.update((n) => n + 1);
    }
    clear() {
        this.activeId.set(null);
        this.cleared.emit();
    }
};
SavedViews = __decorate([
    Component({
        selector: 'app-saved-views',
        imports: [FormsModule, TranslocoModule, ButtonModule, InputTextModule, Popover],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <p-button
      [label]="(activeName() || ('views.title' | transloco))"
      icon="pi pi-bookmark"
      [badge]="views().length ? views().length.toString() : undefined"
      severity="secondary"
      [outlined]="true"
      size="small"
      (onClick)="panel.toggle($event)"
    />

    <p-popover #panel [style]="{ width: '20rem', maxWidth: '92vw' }">
      <div class="flex flex-col gap-3">
        <!-- existing views -->
        @if (views().length) {
          <ul class="flex max-h-56 flex-col gap-1 overflow-y-auto">
            @for (v of views(); track v.id) {
              <li
                class="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-surface-100 dark:hover:bg-surface-800"
                [class.bg-primary/10]="activeId() === v.id"
              >
                <button type="button" (click)="applyView(v)" class="flex flex-1 items-center gap-2 text-start">
                  <i class="pi pi-bookmark-fill text-xs" [class.text-primary]="activeId() === v.id" [class.text-muted-color]="activeId() !== v.id"></i>
                  <span class="truncate-1">{{ v.name }}</span>
                </button>
                <button
                  type="button"
                  (click)="del(v)"
                  class="grid size-6 place-items-center rounded text-muted-color opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                >
                  <i class="pi pi-trash text-xs"></i>
                </button>
              </li>
            }
          </ul>
          <div class="border-t border-surface-200 dark:border-surface-800"></div>
        } @else {
          <p class="text-xs text-muted-color">{{ 'views.empty' | transloco }}</p>
        }

        <!-- save current -->
        <div class="flex items-center gap-2">
          <input
            pInputText
            [(ngModel)]="newName"
            (keydown.enter)="saveCurrent()"
            [placeholder]="'views.namePlaceholder' | transloco"
            class="h-9 flex-1 text-sm"
          />
          <p-button icon="pi pi-plus" size="small" (onClick)="saveCurrent()" />
        </div>

        @if (activeId()) {
          <button type="button" (click)="clear()" class="text-start text-xs text-primary hover:underline">
            {{ 'views.clear' | transloco }}
          </button>
        }
      </div>
    </p-popover>
  `,
    })
], SavedViews);
export { SavedViews };
