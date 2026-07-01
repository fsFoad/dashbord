import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, forwardRef, inject, input, signal, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { SettingsStore } from '../../../core/services/settings.store';
import { JALALI_MONTHS, JALALI_WEEKDAYS, dateToJalali, faDigits, formatDate, jalaliMonthLength, jalaliToDate, pad2, } from '../../../core/utils/jalali';
const GREGORIAN_MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const GREGORIAN_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const sameDay = (a, b) => !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
/**
 * Universal date/time picker — one component, five modes:
 *   date | date-range | time | time-range | datetime
 * Supports BOTH Jalali (Shamsi) and Gregorian calendars, switchable at
 * runtime ('auto' follows the active language). RTL/LTR safe, implements
 * ControlValueAccessor so it plugs into reactive forms like any input.
 *
 * Emitted value shapes:
 *   date / datetime  → Date | null
 *   date-range       → { start: Date|null, end: Date|null } | null
 *   time             → 'HH:mm' | null
 *   time-range       → { start: 'HH:mm'|null, end: 'HH:mm'|null } | null
 */
let DatePickerComponent = class DatePickerComponent {
    settings = inject(SettingsStore);
    host = inject((ElementRef));
    // ---- Inputs ----
    mode = input('date');
    /** 'auto' follows the active language (fa → jalali). */
    calendarSystem = input('auto');
    showClear = input(true);
    // ---- State ----
    open = signal(false);
    disabled = signal(false);
    dateValue = signal(null);
    range = signal({ start: null, end: null });
    hour = signal(12);
    minute = signal(0);
    hourEnd = signal(13);
    minuteEnd = signal(0);
    viewY = signal(2000);
    viewM = signal(1);
    hours = Array.from({ length: 24 }, (_, i) => i);
    minutes = Array.from({ length: 60 }, (_, i) => i);
    onChange = () => { };
    onTouched = () => { };
    cal = computed(() => {
        const c = this.calendarSystem();
        if (c !== 'auto')
            return c;
        return this.settings.language() === 'fa' ? 'jalali' : 'gregorian';
    });
    hasCalendar = computed(() => this.mode() !== 'time' && this.mode() !== 'time-range');
    hasTime = computed(() => this.mode() === 'time' || this.mode() === 'time-range' || this.mode() === 'datetime');
    weekdays = computed(() => this.cal() === 'jalali' ? JALALI_WEEKDAYS : GREGORIAN_WEEKDAYS);
    headerLabel = computed(() => {
        const y = this.viewY();
        const m = this.viewM();
        if (this.cal() === 'jalali')
            return `${JALALI_MONTHS[m - 1]} ${faDigits(y)}`;
        return `${GREGORIAN_MONTHS[m - 1]} ${y}`;
    });
    /** Flat list of 42 cells (nulls = leading/trailing blanks). */
    cells = computed(() => {
        const cal = this.cal();
        const y = this.viewY();
        const m = this.viewM();
        const first = cal === 'jalali' ? jalaliToDate(y, m, 1) : new Date(y, m - 1, 1, 12);
        const len = cal === 'jalali' ? jalaliMonthLength(y, m) : new Date(y, m, 0).getDate();
        const offset = cal === 'jalali' ? (first.getDay() + 1) % 7 : first.getDay();
        const today = new Date();
        const { start, end } = this.range();
        const selected = this.dateValue();
        const isRange = this.mode() === 'date-range';
        const out = Array.from({ length: offset }, () => null);
        for (let d = 1; d <= len; d++) {
            const date = cal === 'jalali' ? jalaliToDate(y, m, d) : new Date(y, m - 1, d, 12);
            const rangeStart = isRange && sameDay(date, start);
            const rangeEnd = isRange && sameDay(date, end);
            out.push({
                day: d,
                date,
                today: sameDay(date, today),
                selected: !isRange && sameDay(date, selected),
                rangeStart,
                rangeEnd,
                inRange: isRange && !!start && !!end && !rangeStart && !rangeEnd &&
                    date.getTime() > start.getTime() && date.getTime() < end.getTime(),
            });
        }
        while (out.length % 7 !== 0)
            out.push(null);
        return out;
    });
    display = computed(() => {
        const cal = this.cal();
        const fa = cal === 'jalali';
        const time = (h, mi) => {
            const t = `${pad2(h)}:${pad2(mi)}`;
            return fa ? faDigits(t) : t;
        };
        switch (this.mode()) {
            case 'date': {
                const d = this.dateValue();
                return d ? formatDate(d, cal) : '';
            }
            case 'datetime': {
                const d = this.dateValue();
                return d ? `${formatDate(d, cal)} — ${time(this.hour(), this.minute())}` : '';
            }
            case 'date-range': {
                const { start, end } = this.range();
                if (!start)
                    return '';
                return end ? `${formatDate(start, cal)} ← ${formatDate(end, cal)}` : formatDate(start, cal);
            }
            case 'time':
                return this.touchedTime() ? time(this.hour(), this.minute()) : '';
            case 'time-range':
                return this.touchedTime()
                    ? `${time(this.hour(), this.minute())} ← ${time(this.hourEnd(), this.minuteEnd())}`
                    : '';
        }
    });
    touchedTime = signal(false);
    constructor() {
        // Keep the visible month in the right calendar system.
        effect(() => {
            this.cal();
            this.jumpToValueOrToday();
        });
    }
    // ---- UI handlers ----
    toggle() {
        if (this.disabled())
            return;
        this.open() ? this.close() : (this.jumpToValueOrToday(), this.open.set(true));
    }
    close() {
        if (!this.open())
            return;
        this.open.set(false);
        this.onTouched();
    }
    onDocClick(e) {
        if (this.open() && !this.host.nativeElement.contains(e.target))
            this.close();
    }
    pick(cell) {
        const m = this.mode();
        if (m === 'date') {
            this.dateValue.set(cell.date);
            this.emit();
            this.close();
        }
        else if (m === 'datetime') {
            this.dateValue.set(cell.date);
            this.emit();
        }
        else if (m === 'date-range') {
            const { start, end } = this.range();
            if (!start || (start && end)) {
                this.range.set({ start: cell.date, end: null });
            }
            else if (cell.date.getTime() < start.getTime()) {
                this.range.set({ start: cell.date, end: null });
            }
            else {
                this.range.set({ start, end: cell.date });
                this.emit();
                this.close();
                return;
            }
            this.emit();
        }
    }
    setTime(which, e) {
        const v = Number(e.target.value);
        this[which].set(v);
        this.touchedTime.set(true);
        this.emit();
    }
    addMonth(delta) {
        let m = this.viewM() + delta;
        let y = this.viewY();
        if (m < 1) {
            m = 12;
            y--;
        }
        if (m > 12) {
            m = 1;
            y++;
        }
        this.viewM.set(m);
        this.viewY.set(y);
    }
    addYear(delta) {
        this.viewY.update((y) => y + delta);
    }
    goToday() {
        const now = new Date();
        if (this.mode() === 'date' || this.mode() === 'datetime') {
            this.dateValue.set(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12));
            this.emit();
        }
        this.jumpTo(now);
    }
    clear(e) {
        e.stopPropagation();
        this.dateValue.set(null);
        this.range.set({ start: null, end: null });
        this.touchedTime.set(false);
        this.onChange(null);
    }
    dayLabel(d) {
        return this.cal() === 'jalali' ? faDigits(d) : String(d);
    }
    pad(n) {
        return this.cal() === 'jalali' ? faDigits(pad2(n)) : pad2(n);
    }
    // ---- value plumbing ----
    emit() {
        switch (this.mode()) {
            case 'date': {
                this.onChange(this.dateValue());
                break;
            }
            case 'datetime': {
                const d = this.dateValue();
                if (!d) {
                    this.onChange(null);
                    break;
                }
                this.onChange(new Date(d.getFullYear(), d.getMonth(), d.getDate(), this.hour(), this.minute()));
                break;
            }
            case 'date-range': {
                const { start, end } = this.range();
                this.onChange(start || end ? { start, end } : null);
                break;
            }
            case 'time':
                this.onChange(`${pad2(this.hour())}:${pad2(this.minute())}`);
                break;
            case 'time-range':
                this.onChange({
                    start: `${pad2(this.hour())}:${pad2(this.minute())}`,
                    end: `${pad2(this.hourEnd())}:${pad2(this.minuteEnd())}`,
                });
                break;
        }
    }
    jumpToValueOrToday() {
        const ref = this.dateValue() ?? this.range().start ?? new Date();
        this.jumpTo(ref);
    }
    jumpTo(date) {
        if (this.cal() === 'jalali') {
            const j = dateToJalali(date);
            this.viewY.set(j.y);
            this.viewM.set(j.m);
        }
        else {
            this.viewY.set(date.getFullYear());
            this.viewM.set(date.getMonth() + 1);
        }
    }
    parseTime(t) {
        if (!t)
            return null;
        const m = /^(\d{1,2}):(\d{1,2})$/.exec(t);
        if (!m)
            return null;
        return [Math.min(23, Number(m[1])), Math.min(59, Number(m[2]))];
    }
    // ---- ControlValueAccessor ----
    writeValue(value) {
        const mode = this.mode();
        if (value == null) {
            this.dateValue.set(null);
            this.range.set({ start: null, end: null });
            this.touchedTime.set(false);
            return;
        }
        if (mode === 'date' || mode === 'datetime') {
            const d = value instanceof Date ? value : new Date(value);
            if (!isNaN(d.getTime())) {
                this.dateValue.set(d);
                if (mode === 'datetime') {
                    this.hour.set(d.getHours());
                    this.minute.set(d.getMinutes());
                    this.touchedTime.set(true);
                }
                this.jumpTo(d);
            }
        }
        else if (mode === 'date-range') {
            const r = value;
            this.range.set({ start: r?.start ?? null, end: r?.end ?? null });
            if (r?.start)
                this.jumpTo(r.start);
        }
        else if (mode === 'time') {
            const t = this.parseTime(value);
            if (t) {
                this.hour.set(t[0]);
                this.minute.set(t[1]);
                this.touchedTime.set(true);
            }
        }
        else if (mode === 'time-range') {
            const r = value;
            const s = this.parseTime(r?.start);
            const e = this.parseTime(r?.end);
            if (s) {
                this.hour.set(s[0]);
                this.minute.set(s[1]);
            }
            if (e) {
                this.hourEnd.set(e[0]);
                this.minuteEnd.set(e[1]);
            }
            if (s || e)
                this.touchedTime.set(true);
        }
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(isDisabled) { this.disabled.set(isDisabled); }
};
DatePickerComponent = __decorate([
    Component({
        selector: 'app-date-picker',
        imports: [TranslocoModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
        ],
        host: { class: 'relative block', '(document:click)': 'onDocClick($event)' },
        template: `
    <!-- Trigger -->
    <button
      type="button"
      (click)="toggle()"
      [disabled]="disabled()"
      class="flex w-full items-center gap-2 rounded-lg border border-surface-300 bg-surface-0 px-3 py-2 text-start text-sm
             transition-colors hover:border-surface-400 focus:outline-none focus:ring-2 focus:ring-primary/40
             disabled:cursor-not-allowed disabled:opacity-50
             dark:border-surface-600 dark:bg-surface-900 dark:hover:border-surface-500"
      [class.border-primary!]="open()"
    >
      <i class="pi shrink-0 text-muted-color" [class.pi-calendar]="hasCalendar()" [class.pi-clock]="!hasCalendar()"></i>
      @if (display()) {
        <span class="flex-1 truncate-1">{{ display() }}</span>
      } @else {
        <span class="flex-1 truncate-1 text-muted-color">{{ 'picker.select' | transloco }}</span>
      }
      @if (display() && showClear() && !disabled()) {
        <span
          role="button"
          tabindex="0"
          (click)="clear($event)"
          (keydown.enter)="clear($event)"
          class="grid size-5 shrink-0 place-items-center rounded-full text-muted-color hover:bg-surface-200 dark:hover:bg-surface-700"
        ><i class="pi pi-times text-xs"></i></span>
      }
    </button>

    <!-- Panel -->
    @if (open()) {
      <div
        class="absolute start-0 top-full z-50 mt-2 w-72 rounded-xl border border-surface-200 bg-surface-0 p-3 shadow-lg
               dark:border-surface-700 dark:bg-surface-900"
      >
        @if (hasCalendar()) {
          <!-- Month / year navigation -->
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center">
              <button type="button" (click)="addYear(-1)" class="nav-btn" aria-label="prev year">
                <i class="pi pi-angle-double-right rtl:rotate-0 ltr:rotate-180 text-xs"></i>
              </button>
              <button type="button" (click)="addMonth(-1)" class="nav-btn" aria-label="prev month">
                <i class="pi pi-angle-right rtl:rotate-0 ltr:rotate-180 text-xs"></i>
              </button>
            </div>
            <div class="text-sm font-semibold">{{ headerLabel() }}</div>
            <div class="flex items-center">
              <button type="button" (click)="addMonth(1)" class="nav-btn" aria-label="next month">
                <i class="pi pi-angle-left rtl:rotate-0 ltr:rotate-180 text-xs"></i>
              </button>
              <button type="button" (click)="addYear(1)" class="nav-btn" aria-label="next year">
                <i class="pi pi-angle-double-left rtl:rotate-0 ltr:rotate-180 text-xs"></i>
              </button>
            </div>
          </div>

          <!-- Weekday header -->
          <div class="grid grid-cols-7 text-center">
            @for (w of weekdays(); track $index) {
              <span class="py-1 text-[11px] font-semibold text-muted-color">{{ w }}</span>
            }
          </div>

          <!-- Day grid -->
          <div class="grid grid-cols-7 gap-y-0.5 text-center">
            @for (cell of cells(); track $index) {
              @if (cell) {
                <button
                  type="button"
                  (click)="pick(cell)"
                  class="relative mx-auto grid size-8 place-items-center rounded-full text-sm transition-colors"
                  [class.bg-primary]="cell.selected || cell.rangeStart || cell.rangeEnd"
                  [class.text-primary-contrast]="cell.selected || cell.rangeStart || cell.rangeEnd"
                  [class.bg-primary/15]="cell.inRange"
                  [class.text-primary]="(cell.today && !cell.selected && !cell.rangeStart && !cell.rangeEnd) || cell.inRange"
                  [class.font-bold]="cell.today"
                  [class.hover:bg-surface-100]="!cell.selected && !cell.rangeStart && !cell.rangeEnd && !cell.inRange"
                  [class.dark:hover:bg-surface-800]="!cell.selected && !cell.rangeStart && !cell.rangeEnd && !cell.inRange"
                >
                  {{ dayLabel(cell.day) }}
                </button>
              } @else {
                <span class="size-8"></span>
              }
            }
          </div>
        }

        <!-- Time section -->
        @if (hasTime()) {
          <div class="flex flex-col gap-2" [class.mt-3]="hasCalendar()" [class.border-t]="hasCalendar()"
               [class.border-surface-200]="hasCalendar()" [class.dark:border-surface-700]="hasCalendar()"
               [class.pt-3]="hasCalendar()">
            <div class="flex items-center gap-2">
              @if (mode() === 'time-range') {
                <span class="w-8 text-xs text-muted-color">{{ 'picker.from' | transloco }}</span>
              }
              <select [value]="hour()" (change)="setTime('hour', $event)" class="time-select" dir="ltr">
                @for (h of hours; track h) { <option [value]="h">{{ pad(h) }}</option> }
              </select>
              <span class="font-bold">:</span>
              <select [value]="minute()" (change)="setTime('minute', $event)" class="time-select" dir="ltr">
                @for (m of minutes; track m) { <option [value]="m">{{ pad(m) }}</option> }
              </select>
            </div>
            @if (mode() === 'time-range') {
              <div class="flex items-center gap-2">
                <span class="w-8 text-xs text-muted-color">{{ 'picker.to' | transloco }}</span>
                <select [value]="hourEnd()" (change)="setTime('hourEnd', $event)" class="time-select" dir="ltr">
                  @for (h of hours; track h) { <option [value]="h">{{ pad(h) }}</option> }
                </select>
                <span class="font-bold">:</span>
                <select [value]="minuteEnd()" (change)="setTime('minuteEnd', $event)" class="time-select" dir="ltr">
                  @for (m of minutes; track m) { <option [value]="m">{{ pad(m) }}</option> }
                </select>
              </div>
            }
          </div>
        }

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between border-t border-surface-200 pt-2 dark:border-surface-700">
          @if (hasCalendar()) {
            <button type="button" (click)="goToday()" class="text-xs font-medium text-primary hover:underline">
              {{ 'picker.today' | transloco }}
            </button>
          } @else { <span></span> }
          <button type="button" (click)="close()" class="text-xs font-medium text-muted-color hover:underline">
            {{ 'common.done' | transloco }}
          </button>
        </div>
      </div>
    }
  `,
        styles: [
            `
      .nav-btn {
        display: grid;
        place-items: center;
        width: 1.9rem;
        height: 1.9rem;
        border-radius: 0.5rem;
        color: var(--p-text-muted-color);
      }
      .nav-btn:hover { background: var(--p-surface-100); }
      :host-context(.app-dark) .nav-btn:hover { background: var(--p-surface-800); }
      .time-select {
        flex: 1;
        border: 1px solid var(--p-surface-300);
        border-radius: 0.5rem;
        background: var(--p-surface-0);
        padding: 0.4rem 0.5rem;
        font-size: 0.875rem;
        text-align: center;
      }
      :host-context(.app-dark) .time-select {
        border-color: var(--p-surface-600);
        background: var(--p-surface-900);
        color: var(--p-surface-0);
      }
    `,
        ],
    })
], DatePickerComponent);
export { DatePickerComponent };
/** Back-compat alias: the component is also exported as `DatePicker`. */
export { DatePickerComponent as DatePicker };
