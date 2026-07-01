import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { SettingsStore } from '../../core/services/settings.store';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { JALALI_MONTHS, dateToJalali, faDigits, jalaliMonthLength, jalaliToDate, } from '../../core/utils/jalali';
import { EN_MONTHS, FA_WEEKDAYS, EN_WEEKDAYS } from '../../core/utils/chart-theme';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker';
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
/**
 * Month-view event calendar built on the same Jalali engine as the date
 * picker: the grid itself is laid out in the ACTIVE calendar system (Jalali
 * for fa). Click a day to create an event, click an event to edit/delete.
 */
let CalendarPage = class CalendarPage {
    http = inject(HttpClient);
    settings = inject(SettingsStore);
    toast = inject(ToastService);
    confirm = inject(ConfirmService);
    events = signal([]);
    cal = computed(() => this.settings.language() === 'fa' ? 'jalali' : 'gregorian');
    weekdays = computed(() => this.cal() === 'jalali' ? FA_WEEKDAYS : EN_WEEKDAYS);
    viewY = signal(0);
    viewM = signal(1);
    headerLabel = computed(() => {
        const y = this.viewY();
        const m = this.viewM();
        return this.cal() === 'jalali'
            ? `${JALALI_MONTHS[m - 1]} ${faDigits(y)}`
            : `${EN_MONTHS[m - 1]} ${y}`;
    });
    cells = computed(() => {
        const cal = this.cal();
        const y = this.viewY();
        const m = this.viewM();
        if (!y)
            return [];
        const first = cal === 'jalali' ? jalaliToDate(y, m, 1) : new Date(y, m - 1, 1, 12);
        const len = cal === 'jalali' ? jalaliMonthLength(y, m) : new Date(y, m, 0).getDate();
        const offset = cal === 'jalali' ? (first.getDay() + 1) % 7 : first.getDay();
        const byDay = new Map();
        for (const e of this.events()) {
            const k = dayKey(new Date(e.date));
            byDay.set(k, [...(byDay.get(k) ?? []), e]);
        }
        const todayKey = dayKey(new Date());
        const out = Array.from({ length: offset }, () => null);
        for (let d = 1; d <= len; d++) {
            const date = cal === 'jalali' ? jalaliToDate(y, m, d) : new Date(y, m - 1, d, 12);
            const iso = dayKey(date);
            out.push({ day: d, date, iso, today: iso === todayKey, events: byDay.get(iso) ?? [] });
        }
        while (out.length % 7 !== 0)
            out.push(null);
        return out;
    });
    // ---- event dialog ----
    dialogOpen = signal(false);
    saving = signal(false);
    editingId = null;
    draft = {
        title: '', date: null, color: 'primary',
    };
    colors = ['primary', 'green', 'amber', 'red'];
    constructor() {
        this.goToday();
        this.http.get('/api/events').subscribe({ next: (e) => this.events.set(e) });
    }
    goToday() {
        const now = new Date();
        if (this.cal() === 'jalali') {
            const j = dateToJalali(now);
            this.viewY.set(j.y);
            this.viewM.set(j.m);
        }
        else {
            this.viewY.set(now.getFullYear());
            this.viewM.set(now.getMonth() + 1);
        }
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
    dayLabel(d) {
        return this.cal() === 'jalali' ? faDigits(d) : String(d);
    }
    openCreate(cell) {
        this.editingId = null;
        this.draft = { title: '', date: cell.date, color: 'primary' };
        this.dialogOpen.set(true);
    }
    openEdit(e, ev) {
        ev.stopPropagation();
        this.editingId = e.id;
        this.draft = { title: e.title, date: new Date(e.date), color: e.color };
        this.dialogOpen.set(true);
    }
    save() {
        if (!this.draft.title.trim() || !this.draft.date)
            return;
        this.saving.set(true);
        const body = {
            title: this.draft.title.trim(),
            date: this.draft.date.toISOString(),
            color: this.draft.color,
        };
        const req = this.editingId
            ? this.http.put(`/api/events/${this.editingId}`, body)
            : this.http.post('/api/events', body);
        req.subscribe({
            next: (saved) => {
                this.events.update((list) => this.editingId
                    ? list.map((x) => (x.id === saved.id ? saved : x))
                    : [...list, saved]);
                this.saving.set(false);
                this.dialogOpen.set(false);
                this.toast.success('cal.saved');
            },
            error: () => this.saving.set(false),
        });
    }
    async remove() {
        if (!this.editingId)
            return;
        if (!(await this.confirm.delete(this.draft.title)))
            return;
        const id = this.editingId;
        const previous = this.events();
        this.events.set(previous.filter((e) => e.id !== id)); // optimistic
        this.dialogOpen.set(false);
        this.http.delete(`/api/events/${id}`).subscribe({
            error: () => this.events.set(previous),
        });
    }
    chipClass(c) {
        switch (c) {
            case 'green': return 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400';
            case 'amber': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400';
            case 'red': return 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400';
            default: return 'bg-primary/15 text-primary';
        }
    }
    swatchClass(c) {
        switch (c) {
            case 'green': return 'bg-green-500';
            case 'amber': return 'bg-amber-500';
            case 'red': return 'bg-red-500';
            default: return 'bg-primary';
        }
    }
};
CalendarPage = __decorate([
    Component({
        selector: 'app-calendar-page',
        imports: [
            FormsModule, TranslocoModule, ButtonModule, InputTextModule, Dialog, DatePickerComponent,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './calendar.html',
    })
], CalendarPage);
export { CalendarPage };
