import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { SessionStore } from '../../core/services/session.store';
import { ToastService } from '../../core/services/toast.service';
import { DatePickerComponent, } from '../../shared/components/date-picker/date-picker';
import { FileUpload } from '../../shared/components/file-upload/file-upload';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
/**
 * Three-step "new project" wizard built with a custom Tailwind stepper:
 *   1. basics  2. schedule (universal date/time picker)  3. files + review
 */
let ProjectWizard = class ProjectWizard {
    api = inject(ProjectsApiService);
    toast = inject(ToastService);
    router = inject(Router);
    session = inject(SessionStore);
    step = signal(0);
    submitting = signal(false);
    stepKeys = ['wizard.step1', 'wizard.step2', 'wizard.step3'];
    // --- step 1: basics ---
    name = '';
    description = '';
    status = 'active';
    priority = 'medium';
    statusOptions = [
        { value: 'active' }, { value: 'paused' }, { value: 'done' },
    ];
    priorityOptions = [
        { value: 'low' }, { value: 'medium' }, { value: 'high' },
    ];
    // --- step 2: schedule (signals so canNext() reacts) ---
    dateRange = signal(null);
    workHours = signal(null);
    // --- step 3: files ---
    files = signal([]);
    triedNext = signal(false);
    canNext = computed(() => {
        switch (this.step()) {
            case 0: return this.name.trim().length >= 3;
            case 1: {
                const r = this.dateRange();
                return !!r?.start && !!r?.end;
            }
            default: return true;
        }
    });
    next() {
        this.triedNext.set(true);
        if (!this.canNext())
            return;
        this.triedNext.set(false);
        this.step.update((s) => Math.min(2, s + 1));
    }
    back() {
        this.triedNext.set(false);
        this.step.update((s) => Math.max(0, s - 1));
    }
    /** Re-evaluate canNext when template-driven fields change. */
    poke() {
        this.triedNext.update((v) => v);
        // signals above already drive reactivity; this nudges name validation:
        this.step.update((s) => s);
    }
    submit() {
        const range = this.dateRange();
        if (!this.name.trim() || !range?.end)
            return;
        this.submitting.set(true);
        this.api
            .create({
            name: this.name.trim(),
            status: this.status,
            owner: this.session.user()?.name ?? '—',
            startDate: range.start ? range.start.toISOString() : undefined,
            dueDate: range.end.toISOString(),
        })
            .subscribe({
            next: () => {
                this.toast.success('wizard.created', { name: this.name.trim() });
                this.router.navigate(['/projects']);
            },
            error: () => this.submitting.set(false),
        });
    }
};
ProjectWizard = __decorate([
    Component({
        selector: 'app-project-wizard',
        imports: [
            FormsModule, TranslocoModule, ButtonModule, InputTextModule, Select, SelectButton,
            DatePickerComponent, FileUpload, LocalizedDatePipe,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './project-wizard.html',
    })
], ProjectWizard);
export { ProjectWizard };
