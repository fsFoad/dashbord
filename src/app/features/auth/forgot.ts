import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, RouterLink, TranslocoModule, ButtonModule, InputTextModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'auth.forgot.title' | transloco }}
    </h1>
    <p class="mt-1 text-sm text-muted-color">{{ 'auth.forgot.hint' | transloco }}</p>

    @if (sent()) {
      <div class="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
        <i class="pi pi-check-circle me-2"></i>{{ 'auth.forgot.sent' | transloco }}
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" class="mt-5 flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="femail" class="text-sm font-medium">{{ 'auth.email' | transloco }}</label>
          <input pInputText id="femail" type="email" formControlName="email" autocomplete="email" dir="ltr" />
          @if (form.controls.email.touched && form.controls.email.invalid) {
            <small class="text-red-500">{{ 'validation.email' | transloco }}</small>
          }
        </div>
        <p-button type="submit" styleClass="w-full" [label]="'auth.forgot.send' | transloco"
          [loading]="busy()" [disabled]="busy()" />
      </form>
    }

    <div class="mt-5 text-center text-sm">
      <a routerLink="/auth/login" class="text-primary hover:underline">
        <i class="pi pi-arrow-right me-1 text-xs ltr:hidden"></i>
        <i class="pi pi-arrow-left me-1 text-xs rtl:hidden"></i>
        {{ 'auth.forgot.back' | transloco }}
      </a>
    </div>
  `,
})
export class Forgot {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  protected readonly busy = signal(false);
  protected readonly sent = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    this.auth.forgotPassword(this.form.getRawValue().email).subscribe({
      next: () => this.sent.set(true),
      error: () => {
        this.busy.set(false);
        this.sent.set(true); // never reveal whether the email exists
      },
    });
  }
}
