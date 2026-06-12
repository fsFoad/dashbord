import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { CalEvent, EventColor } from '../../core/models/api.model';
import { SettingsStore } from '../../core/services/settings.store';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import {
  JALALI_MONTHS, dateToJalali, faDigits, jalaliMonthLength, jalaliToDate,
} from '../../core/utils/jalali';
import { EN_MONTHS, FA_WEEKDAYS, EN_WEEKDAYS } from '../../core/utils/chart-theme';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker';

interface DayCell {
  day: number;
  date: Date;
  iso: string; // yyyy-mm-dd key
  today: boolean;
  events: CalEvent[];
}

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * Month-view event calendar built on the same Jalali engine as the date
 * picker: the grid itself is laid out in the ACTIVE calendar system (Jalali
 * for fa). Click a day to create an event, click an event to edit/delete.
 */
@Component({
  selector: 'app-calendar-page',
  imports: [
    FormsModule, TranslocoModule, ButtonModule, InputTextModule, Dialog, DatePickerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.html',
})
export class CalendarPage {
  private readonly http = inject(HttpClient);
  private readonly settings = inject(SettingsStore);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly events = signal<CalEvent[]>([]);

  protected readonly cal = computed(() =>
    this.settings.language() === 'fa' ? 'jalali' : 'gregorian',
  );
  protected readonly weekdays = computed(() =>
    this.cal() === 'jalali' ? FA_WEEKDAYS : EN_WEEKDAYS,
  );

  private readonly viewY = signal(0);
  private readonly viewM = signal(1);

  protected readonly headerLabel = computed(() => {
    const y = this.viewY();
    const m = this.viewM();
    return this.cal() === 'jalali'
      ? `${JALALI_MONTHS[m - 1]} ${faDigits(y)}`
      : `${EN_MONTHS[m - 1]} ${y}`;
  });

  protected readonly cells = computed<(DayCell | null)[]>(() => {
    const cal = this.cal();
    const y = this.viewY();
    const m = this.viewM();
    if (!y) return [];
    const first = cal === 'jalali' ? jalaliToDate(y, m, 1) : new Date(y, m - 1, 1, 12);
    const len = cal === 'jalali' ? jalaliMonthLength(y, m) : new Date(y, m, 0).getDate();
    const offset = cal === 'jalali' ? (first.getDay() + 1) % 7 : first.getDay();

    const byDay = new Map<string, CalEvent[]>();
    for (const e of this.events()) {
      const k = dayKey(new Date(e.date));
      byDay.set(k, [...(byDay.get(k) ?? []), e]);
    }

    const todayKey = dayKey(new Date());
    const out: (DayCell | null)[] = Array.from({ length: offset }, () => null);
    for (let d = 1; d <= len; d++) {
      const date = cal === 'jalali' ? jalaliToDate(y, m, d) : new Date(y, m - 1, d, 12);
      const iso = dayKey(date);
      out.push({ day: d, date, iso, today: iso === todayKey, events: byDay.get(iso) ?? [] });
    }
    while (out.length % 7 !== 0) out.push(null);
    return out;
  });

  // ---- event dialog ----
  protected readonly dialogOpen = signal(false);
  protected readonly saving = signal(false);
  protected editingId: number | null = null;
  protected draft: { title: string; date: Date | null; color: EventColor } = {
    title: '', date: null, color: 'primary',
  };
  protected readonly colors: EventColor[] = ['primary', 'green', 'amber', 'red'];

  constructor() {
    this.goToday();
    this.http.get<CalEvent[]>('/api/events').subscribe({ next: (e) => this.events.set(e) });
  }

  protected goToday(): void {
    const now = new Date();
    if (this.cal() === 'jalali') {
      const j = dateToJalali(now);
      this.viewY.set(j.y);
      this.viewM.set(j.m);
    } else {
      this.viewY.set(now.getFullYear());
      this.viewM.set(now.getMonth() + 1);
    }
  }

  protected addMonth(delta: number): void {
    let m = this.viewM() + delta;
    let y = this.viewY();
    if (m < 1) { m = 12; y--; }
    if (m > 12) { m = 1; y++; }
    this.viewM.set(m);
    this.viewY.set(y);
  }

  protected dayLabel(d: number): string {
    return this.cal() === 'jalali' ? faDigits(d) : String(d);
  }

  protected openCreate(cell: DayCell): void {
    this.editingId = null;
    this.draft = { title: '', date: cell.date, color: 'primary' };
    this.dialogOpen.set(true);
  }

  protected openEdit(e: CalEvent, ev: Event): void {
    ev.stopPropagation();
    this.editingId = e.id;
    this.draft = { title: e.title, date: new Date(e.date), color: e.color };
    this.dialogOpen.set(true);
  }

  protected save(): void {
    if (!this.draft.title.trim() || !this.draft.date) return;
    this.saving.set(true);
    const body = {
      title: this.draft.title.trim(),
      date: this.draft.date.toISOString(),
      color: this.draft.color,
    };
    const req = this.editingId
      ? this.http.put<CalEvent>(`/api/events/${this.editingId}`, body)
      : this.http.post<CalEvent>('/api/events', body);
    req.subscribe({
      next: (saved) => {
        this.events.update((list) =>
          this.editingId
            ? list.map((x) => (x.id === saved.id ? saved : x))
            : [...list, saved],
        );
        this.saving.set(false);
        this.dialogOpen.set(false);
        this.toast.success('cal.saved');
      },
      error: () => this.saving.set(false),
    });
  }

  protected async remove(): Promise<void> {
    if (!this.editingId) return;
    if (!(await this.confirm.delete(this.draft.title))) return;
    const id = this.editingId;
    const previous = this.events();
    this.events.set(previous.filter((e) => e.id !== id)); // optimistic
    this.dialogOpen.set(false);
    this.http.delete(`/api/events/${id}`).subscribe({
      error: () => this.events.set(previous),
    });
  }

  protected chipClass(c: EventColor): string {
    switch (c) {
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400';
      case 'amber': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400';
      case 'red': return 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400';
      default: return 'bg-primary/15 text-primary';
    }
  }

  protected swatchClass(c: EventColor): string {
    switch (c) {
      case 'green': return 'bg-green-500';
      case 'amber': return 'bg-amber-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-primary';
    }
  }
}
