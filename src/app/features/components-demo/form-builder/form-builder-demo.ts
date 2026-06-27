import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { FormSchema } from '../../../shared/components/dynamic-form/form-schema';

const SAMPLE: FormSchema = {
  title: 'فرم ثبت‌نام رویداد',
  description: 'این فرم به‌صورت کامل از روی JSON ساخته شده است.',
  submitLabel: 'ثبت‌نام',
  fields: [
    { key: 'fullName', type: 'text', label: 'نام و نام خانوادگی', col: 2, validators: { required: true, minLength: 3 } },
    { key: 'email', type: 'email', label: 'ایمیل', col: 2, validators: { required: true, email: true } },
    { key: 'role', type: 'select', label: 'نقش', col: 2, placeholder: 'انتخاب کنید…',
      options: [
        { label: 'توسعه‌دهنده', value: 'dev' },
        { label: 'طراح', value: 'design' },
        { label: 'مدیر', value: 'manager' },
      ], validators: { required: true } },
    { key: 'experience', type: 'slider', label: 'سال‌های تجربه', col: 2, defaultValue: 3 },
    { key: 'interests', type: 'multiselect', label: 'حوزه‌های علاقه‌مندی',
      options: [
        { label: 'فرانت‌اند', value: 'fe' },
        { label: 'بک‌اند', value: 'be' },
        { label: 'موبایل', value: 'mobile' },
        { label: 'هوش مصنوعی', value: 'ai' },
      ] },
    { key: 'bio', type: 'textarea', label: 'درباره شما', placeholder: 'چند خط بنویسید…' },
    { key: 'startDate', type: 'date', label: 'تاریخ شروع همکاری', col: 2 },
    { key: 'rating', type: 'rating', label: 'میزان رضایت', col: 2, defaultValue: 4 },
    { key: 'newsletter', type: 'switch', label: 'عضویت در خبرنامه', defaultValue: true },
    { key: 'terms', type: 'checkbox', label: 'قوانین را می‌پذیرم', validators: { required: true } },
  ],
};

/**
 * Form-builder playground: edit a JSON schema on the left, see the live form
 * on the right, submit to inspect the typed value. Demonstrates the
 * schema-driven DynamicForm renderer.
 */
@Component({
  selector: 'app-form-builder-demo',
  imports: [JsonPipe, FormsModule, TranslocoModule, ButtonModule, DynamicForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
          {{ 'formBuilder.title' | transloco }}
        </h1>
        <p class="mt-1 text-sm text-muted-color">{{ 'formBuilder.subtitle' | transloco }}</p>
      </div>
      <p-button [label]="'formBuilder.reset' | transloco" icon="pi pi-refresh" severity="secondary" size="small" (onClick)="reset()" />
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <!-- schema editor -->
      <div class="flex flex-col rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-sm font-semibold">{{ 'formBuilder.schema' | transloco }}</h2>
          <p-button [label]="'formBuilder.apply' | transloco" icon="pi pi-play" size="small" (onClick)="applySchema()" />
        </div>
        <textarea
          [(ngModel)]="schemaText"
          spellcheck="false"
          dir="ltr"
          class="thin-scroll min-h-96 flex-1 resize-none rounded-lg border border-surface-300 bg-surface-50 p-3 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-surface-700 dark:bg-surface-950"
        ></textarea>
        @if (parseError()) {
          <div class="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {{ 'formBuilder.invalidJson' | transloco }}: {{ parseError() }}
          </div>
        }
      </div>

      <!-- live preview -->
      <div class="flex flex-col gap-4">
        <div class="rounded-2xl border border-surface-200 bg-surface-0 p-5 dark:border-surface-800 dark:bg-surface-900">
          @if (schema(); as s) {
            @if (s.title) { <h2 class="text-lg font-bold">{{ s.title }}</h2> }
            @if (s.description) { <p class="mb-4 mt-1 text-sm text-muted-color">{{ s.description }}</p> }
            <app-dynamic-form [schema]="s" (submitted)="onSubmit($event)" />
          }
        </div>

        @if (result()) {
          <div class="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/30">
            <h3 class="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
              <i class="pi pi-check-circle"></i>{{ 'formBuilder.result' | transloco }}
            </h3>
            <pre class="thin-scroll overflow-x-auto text-xs text-surface-700 dark:text-surface-200" dir="ltr">{{ result() | json }}</pre>
          </div>
        }
      </div>
    </div>
  `,
})
export class FormBuilderDemo {
  protected schemaText = JSON.stringify(SAMPLE, null, 2);
  protected readonly schema = signal<FormSchema | null>(SAMPLE);
  protected readonly parseError = signal<string | null>(null);
  protected readonly result = signal<Record<string, unknown> | null>(null);

  protected applySchema(): void {
    try {
      const parsed = JSON.parse(this.schemaText) as FormSchema;
      if (!Array.isArray(parsed.fields)) throw new Error('fields[] required');
      this.schema.set(parsed);
      this.parseError.set(null);
      this.result.set(null);
    } catch (e) {
      this.parseError.set(e instanceof Error ? e.message : String(e));
    }
  }

  protected onSubmit(value: Record<string, unknown>): void {
    this.result.set(value);
  }

  protected reset(): void {
    this.schemaText = JSON.stringify(SAMPLE, null, 2);
    this.applySchema();
  }
}
