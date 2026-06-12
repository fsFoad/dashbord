import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { AuthService } from '../../core/services/auth.service';

function matchValidator(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pass && confirm && pass !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TranslocoModule, ButtonModule, InputTextModule, Password],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'auth.register.title' | transloco }}
    </h1>

    <form [formGroup]="form" (ngSubmit)="submit()" class="mt-5 flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="name" class="text-sm font-medium">{{ 'auth.name' | transloco }}</label>
        <input pInputText id="name" formControlName="name" autocomplete="name" />
        @if (form.controls.name.touched && form.controls.name.invalid) {
          <small class="text-red-500">{{ 'validation.required' | transloco }}</small>
        }
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="remail" class="text-sm font-medium">{{ 'auth.email' | transloco }}</label>
        <input pInputText id="remail" type="email" formControlName="email" autocomplete="email" dir="ltr" />
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <small class="text-red-500">{{ 'validation.email' | transloco }}</small>
        }
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="rpass" class="text-sm font-medium">{{ 'auth.password' | transloco }}</label>
        <p-password inputId="rpass" formControlName="password" [toggleMask]="true"
          styleClass="w-full" inputStyleClass="w-full" autocomplete="new-password" />
        @if (form.controls.password.touched && form.controls.password.invalid) {
          <small class="text-red-500">{{ 'validation.min' | transloco: { n: 6 } }}</small>
        }
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="rconfirm" class="text-sm font-medium">{{ 'auth.confirmPassword' | transloco }}</label>
        <p-password inputId="rconfirm" formControlName="confirm" [feedback]="false" [toggleMask]="true"
          styleClass="w-full" inputStyleClass="w-full" autocomplete="new-password" />
        @if (form.touched && form.hasError('mismatch')) {
          <small class="text-red-500">{{ 'auth.passwordMismatch' | transloco }}</small>
        }
      </div>

      @if (errorKey()) {
        <div class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {{ errorKey()! | transloco }}
        </div>
      }

      <p-button type="submit" styleClass="w-full" [label]="'auth.register.submit' | transloco"
        [loading]="busy()" [disabled]="busy()" />
    </form>

    <div class="mt-5 text-center text-sm">
      <span class="text-muted-color">{{ 'auth.register.haveAccount' | transloco }}</span>
      <a routerLink="/auth/login" class="ms-1 text-primary hover:underline">{{ 'auth.register.loginLink' | transloco }}</a>
    </div>
  `,
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly busy = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
    },
    { validators: matchValidator },
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    this.errorKey.set(null);
    const { name, email, password } = this.form.getRawValue();
    this.auth.register(name, email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err: unknown) => {
        this.busy.set(false);
        this.errorKey.set(
          err instanceof HttpErrorResponse && err.status === 409
            ? 'auth.emailTaken'
            : 'errors.unknown',
        );
      },
    });
  }
}
