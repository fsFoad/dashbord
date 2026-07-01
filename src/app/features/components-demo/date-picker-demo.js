import { __decorate } from "tslib";
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { SelectButton } from 'primeng/selectbutton';
import { DatePickerComponent, } from '../../shared/components/date-picker/date-picker';
/** Interactive showcase for the universal date/time picker (all five modes). */
let DatePickerDemo = class DatePickerDemo {
    calendar = signal('auto');
    calendarOptions = [
        { value: 'auto', labelKey: 'pickerDemo.auto' },
        { value: 'jalali', labelKey: 'pickerDemo.jalali' },
        { value: 'gregorian', labelKey: 'pickerDemo.gregorian' },
    ];
    single = signal(null);
    range = signal(null);
    dt = signal(null);
    time = signal(null);
    timeRange = signal(null);
};
DatePickerDemo = __decorate([
    Component({
        selector: 'app-date-picker-demo',
        imports: [FormsModule, JsonPipe, TranslocoModule, SelectButton, DatePickerComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
          {{ 'pickerDemo.title' | transloco }}
        </h1>
        <p class="mt-1 text-sm text-muted-color">{{ 'pickerDemo.subtitle' | transloco }}</p>
      </div>
      <p-selectbutton
        [options]="calendarOptions"
        optionValue="value"
        [allowEmpty]="false"
        [ngModel]="calendar()"
        (ngModelChange)="calendar.set($event)"
      >
        <ng-template #item let-o>{{ o.labelKey | transloco }}</ng-template>
      </p-selectbutton>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div class="demo-card">
        <h3 class="demo-title">{{ 'pickerDemo.date' | transloco }}</h3>
        <app-date-picker mode="date" [calendarSystem]="calendar()" [ngModel]="single()" (ngModelChange)="single.set($event)" />
        <pre class="demo-out">{{ single() | json }}</pre>
      </div>

      <div class="demo-card">
        <h3 class="demo-title">{{ 'pickerDemo.range' | transloco }}</h3>
        <app-date-picker mode="date-range" [calendarSystem]="calendar()" [ngModel]="range()" (ngModelChange)="range.set($event)" />
        <pre class="demo-out">{{ range() | json }}</pre>
      </div>

      <div class="demo-card">
        <h3 class="demo-title">{{ 'pickerDemo.datetime' | transloco }}</h3>
        <app-date-picker mode="datetime" [calendarSystem]="calendar()" [ngModel]="dt()" (ngModelChange)="dt.set($event)" />
        <pre class="demo-out">{{ dt() | json }}</pre>
      </div>

      <div class="demo-card">
        <h3 class="demo-title">{{ 'pickerDemo.time' | transloco }}</h3>
        <app-date-picker mode="time" [ngModel]="time()" (ngModelChange)="time.set($event)" />
        <pre class="demo-out">{{ time() | json }}</pre>
      </div>

      <div class="demo-card">
        <h3 class="demo-title">{{ 'pickerDemo.timeRange' | transloco }}</h3>
        <app-date-picker mode="time-range" [ngModel]="timeRange()" (ngModelChange)="timeRange.set($event)" />
        <pre class="demo-out">{{ timeRange() | json }}</pre>
      </div>
    </div>
  `,
        styles: [
            `
      .demo-card {
        border: 1px solid var(--p-surface-200);
        background: var(--p-surface-0);
        border-radius: 1rem;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      :host-context(.app-dark) .demo-card {
        border-color: var(--p-surface-800);
        background: var(--p-surface-900);
      }
      .demo-title { font-weight: 600; font-size: 0.95rem; }
      .demo-out {
        margin: 0;
        direction: ltr;
        text-align: left;
        font-size: 0.7rem;
        color: var(--p-text-muted-color);
        background: var(--p-surface-50);
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
        overflow-x: auto;
        min-height: 2.2rem;
      }
      :host-context(.app-dark) .demo-out { background: var(--p-surface-800); }
    `,
        ],
    })
], DatePickerDemo);
export { DatePickerDemo };
