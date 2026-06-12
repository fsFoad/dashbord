import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { ProjectStatus } from '../../core/models/api.model';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { SessionStore } from '../../core/services/session.store';
import { ToastService } from '../../core/services/toast.service';
import {
  DatePickerComponent, DateRange, TimeRange,
} from '../../shared/components/date-picker/date-picker';
import { FileUpload, UploadedFile } from '../../shared/components/file-upload/file-upload';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';

/**
 * Three-step "new project" wizard built with a custom Tailwind stepper:
 *   1. basics  2. schedule (universal date/time picker)  3. files + review
 */
@Component({
  selector: 'app-project-wizard',
  imports: [
    FormsModule, TranslocoModule, ButtonModule, InputTextModule, Select, SelectButton,
    DatePickerComponent, FileUpload, LocalizedDatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-wizard.html',
})
export class ProjectWizard {
  private readonly api = inject(ProjectsApiService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly session = inject(SessionStore);

  protected readonly step = signal(0);
  protected readonly submitting = signal(false);
  protected readonly stepKeys = ['wizard.step1', 'wizard.step2', 'wizard.step3'];

  // --- step 1: basics ---
  protected name = '';
  protected description = '';
  protected status: ProjectStatus = 'active';
  protected priority: 'low' | 'medium' | 'high' = 'medium';

  protected readonly statusOptions = [
    { value: 'active' as const }, { value: 'paused' as const }, { value: 'done' as const },
  ];
  protected readonly priorityOptions = [
    { value: 'low' as const }, { value: 'medium' as const }, { value: 'high' as const },
  ];

  // --- step 2: schedule (signals so canNext() reacts) ---
  protected readonly dateRange = signal<DateRange | null>(null);
  protected readonly workHours = signal<TimeRange | null>(null);

  // --- step 3: files ---
  protected readonly files = signal<UploadedFile[]>([]);

  protected readonly triedNext = signal(false);

  protected readonly canNext = computed(() => {
    switch (this.step()) {
      case 0: return this.name.trim().length >= 3;
      case 1: {
        const r = this.dateRange();
        return !!r?.start && !!r?.end;
      }
      default: return true;
    }
  });

  protected next(): void {
    this.triedNext.set(true);
    if (!this.canNext()) return;
    this.triedNext.set(false);
    this.step.update((s) => Math.min(2, s + 1));
  }

  protected back(): void {
    this.triedNext.set(false);
    this.step.update((s) => Math.max(0, s - 1));
  }

  /** Re-evaluate canNext when template-driven fields change. */
  protected poke(): void {
    this.triedNext.update((v) => v);
    // signals above already drive reactivity; this nudges name validation:
    this.step.update((s) => s);
  }

  protected submit(): void {
    const range = this.dateRange();
    if (!this.name.trim() || !range?.end) return;
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
}
