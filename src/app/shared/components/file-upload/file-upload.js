import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, model, signal, } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ToastService } from '../../../core/services/toast.service';
/**
 * Drag & drop multi-file upload (custom, Tailwind). Upload progress is
 * simulated; swapping in a real upload later only changes addFiles().
 * Two-way bind the list: <app-file-upload [(files)]="files" />
 */
let FileUpload = class FileUpload {
    toast = inject(ToastService);
    destroyRef = inject(DestroyRef);
    files = model([]);
    multiple = input(true);
    accept = input('');
    maxSizeMB = input(10);
    dragging = signal(false);
    timers = new Map();
    constructor() {
        this.destroyRef.onDestroy(() => this.timers.forEach((t) => clearInterval(t)));
    }
    onDragOver(e) {
        e.preventDefault();
        this.dragging.set(true);
    }
    onDrop(e) {
        e.preventDefault();
        this.dragging.set(false);
        if (e.dataTransfer?.files?.length)
            this.addFiles(e.dataTransfer.files);
    }
    onInput(e) {
        const el = e.target;
        if (el.files?.length)
            this.addFiles(el.files);
        el.value = '';
    }
    remove(id) {
        const timer = this.timers.get(id);
        if (timer) {
            clearInterval(timer);
            this.timers.delete(id);
        }
        this.files.update((list) => list.filter((f) => f.id !== id));
    }
    humanSize(bytes) {
        if (bytes < 1024)
            return `${bytes} B`;
        if (bytes < 1024 ** 2)
            return `${(bytes / 1024).toFixed(0)} KB`;
        return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    }
    addFiles(list) {
        const max = this.maxSizeMB() * 1024 * 1024;
        for (const file of Array.from(list)) {
            if (file.size > max) {
                this.toast.warn('upload.tooLarge', { name: file.name, n: this.maxSizeMB() });
                continue;
            }
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            this.files.update((l) => [...l, { id, name: file.name, size: file.size, progress: 0, done: false }]);
            this.simulate(id);
            if (!this.multiple())
                break;
        }
    }
    /** Simulated upload progress (replace with a real HTTP upload later). */
    simulate(id) {
        const timer = setInterval(() => {
            this.files.update((list) => list.map((f) => {
                if (f.id !== id || f.done)
                    return f;
                const progress = Math.min(100, f.progress + 8 + Math.random() * 18);
                return { ...f, progress, done: progress >= 100 };
            }));
            const current = this.files().find((f) => f.id === id);
            if (!current || current.done) {
                clearInterval(timer);
                this.timers.delete(id);
            }
        }, 180);
        this.timers.set(id, timer);
    }
};
FileUpload = __decorate([
    Component({
        selector: 'app-file-upload',
        imports: [TranslocoModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <!-- Drop zone -->
    <label
      class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-colors"
      [class.border-primary]="dragging()"
      [class.bg-primary/5]="dragging()"
      [class.border-surface-300]="!dragging()"
      [class.dark:border-surface-600]="!dragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="dragging.set(false)"
      (drop)="onDrop($event)"
    >
      <i class="pi pi-cloud-upload text-3xl text-primary"></i>
      <span class="text-sm font-medium">{{ 'upload.drop' | transloco }}</span>
      <span class="text-xs text-muted-color">
        {{ 'upload.maxSize' | transloco: { n: maxSizeMB() } }}
      </span>
      <input type="file" class="hidden" [multiple]="multiple()" [accept]="accept()" (change)="onInput($event)" />
    </label>

    <!-- File list -->
    @if (files().length) {
      <ul class="mt-3 flex flex-col gap-2">
        @for (f of files(); track f.id) {
          <li class="flex items-center gap-3 rounded-xl border border-surface-200 bg-surface-0 p-3 dark:border-surface-700 dark:bg-surface-900">
            <i class="pi pi-file shrink-0 text-lg text-muted-color"></i>
            <div class="min-w-0 flex-1">
              <div class="flex items-baseline justify-between gap-2">
                <span class="truncate-1 text-sm font-medium">{{ f.name }}</span>
                <span class="shrink-0 text-xs text-muted-color">{{ humanSize(f.size) }}</span>
              </div>
              <div class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
                <div
                  class="h-full rounded-full transition-[width] duration-200"
                  [class.bg-primary]="!f.done"
                  [class.bg-green-500]="f.done"
                  [style.width.%]="f.progress"
                ></div>
              </div>
            </div>
            @if (f.done) {
              <i class="pi pi-check-circle shrink-0 text-green-500"></i>
            }
            <button
              type="button"
              (click)="remove(f.id)"
              class="grid size-8 shrink-0 place-items-center rounded-lg text-muted-color hover:bg-surface-100 hover:text-red-500 dark:hover:bg-surface-800"
              aria-label="remove"
            >
              <i class="pi pi-trash text-sm"></i>
            </button>
          </li>
        }
      </ul>
    }
  `,
    })
], FileUpload);
export { FileUpload };
