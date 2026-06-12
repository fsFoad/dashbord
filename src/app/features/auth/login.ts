import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslocoModule, ButtonModule, InputTextModule, Password],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'auth.login.title' | transloco }}
    </h1>
    <p class="mt-1 text-sm text-muted-color">{{ 'auth.login.subtitle' | transloco }}</p>

    <!-- Demo credentials quick-fill -->
    <div class="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs">
      <div class="mb-2 font-semibold text-primary">{{ 'auth.demo.hint' | transloco }}</div>
      <div class="flex flex-wrap gap-2">
        <button type="button" (click)="fill('admin@demo.com')"
          class="rounded-lg bg-primary/10 px-2 py-1 font-mono text-primary hover:bg-primary/20">
          admin@demo.com
        </button>
        <button type="button" (click)="fill('user@demo.com')"
          class="rounded-lg bg-primary/10 px-2 py-1 font-mono text-primary hover:bg-primary/20">
          user@demo.com
        </button>
        <span class="self-center text-muted-color">{{ 'auth.demo.password' | transloco }}: <b class="font-mono">123456</b></span>
      </div>
    </div>

    <form [formGroup]="form" (ngSubmit)="submit()" class="mt-5 flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium">{{ 'auth.email' | transloco }}</label>
        <input pInputText id="email" type="email" formControlName="email" autocomplete="email" dir="ltr" />
        @if (form.controls.email.touched && form.controls.email.invalid) {
          <small class="text-red-500">{{ 'validation.email' | transloco }}</small>
        }
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="password" class="text-sm font-medium">{{ 'auth.password' | transloco }}</label>
        <p-password
          inputId="password" formControlName="password" [feedback]="false" [toggleMask]="true"
          styleClass="w-full" inputStyleClass="w-full" autocomplete="current-password"
        />
        @if (form.controls.password.touched && form.controls.password.invalid) {
          <small class="text-red-500">{{ 'validation.required' | transloco }}</small>
        }
      </div>

      @if (errorKey()) {
        <div class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {{ errorKey()! | transloco }}
        </div>
      }

      <p-button
        type="submit" styleClass="w-full" [label]="'auth.login.submit' | transloco"
        [loading]="busy()" [disabled]="busy()"
      />
    </form>

    <div class="mt-5 flex items-center justify-between text-sm">
      <a routerLink="/auth/forgot" class="text-primary hover:underline">{{ 'auth.login.forgot' | transloco }}</a>
      <a routerLink="/auth/register" class="text-primary hover:underline">{{ 'auth.login.registerLink' | transloco }}</a>
    </div>
  `,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly busy = signal(false);
  protected readonly errorKey = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected fill(email: string): void {
    this.form.setValue({ email, password: '123456' });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    this.errorKey.set(null);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/dashboard');
      },
      error: (err: unknown) => {
        this.busy.set(false);
        this.errorKey.set(
          err instanceof HttpErrorResponse && err.status === 401
            ? 'auth.invalidCredentials'
            : 'errors.unknown',
        );
      },
    });
  }
}
