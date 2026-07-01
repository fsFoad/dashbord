import { __decorate } from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { InputOtpModule } from 'primeng/inputotp';
import { isTwoFactor } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { SettingsStore } from '../../core/services/settings.store';
let Login = class Login {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    settings = inject(SettingsStore);
    busy = signal(false);
    errorKey = signal(null);
    challenge = signal(null);
    showPassword = signal(false);
    otp = '';
    form = this.fb.nonNullable.group({
        username: ['1', [Validators.required]],
        password: ['1', Validators.required],
    });
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy.set(true);
        this.errorKey.set(null);
        const { username, password } = this.form.getRawValue();
        this.auth.login(username, password).subscribe({
            next: (res) => {
                this.busy.set(false);
                if (isTwoFactor(res)) {
                    this.challenge.set({ challengeId: res.challengeId, hint: res.hint });
                }
                else {
                    this.goAfterAuth();
                }
            },
            error: (err) => {
                this.busy.set(false);
                this.errorKey.set(err instanceof HttpErrorResponse && err.status === 401
                    ? 'auth.invalidCredentials'
                    : 'errors.unknown');
            },
        });
    }
    verify() {
        const c = this.challenge();
        if (!c || this.otp.length < 6)
            return;
        this.busy.set(true);
        this.errorKey.set(null);
        this.auth.verifyTwoFactor(c.challengeId, this.otp).subscribe({
            next: () => this.goAfterAuth(),
            error: (err) => {
                this.busy.set(false);
                this.errorKey.set(err instanceof HttpErrorResponse && err.status === 422
                    ? 'auth.2fa.invalid'
                    : 'errors.unknown');
            },
        });
    }
    backToLogin() {
        this.challenge.set(null);
        this.otp = '';
        this.errorKey.set(null);
    }
    goAfterAuth() {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/dashboard');
    }
};
Login = __decorate([
    Component({
        selector: 'app-login',
        imports: [ReactiveFormsModule, FormsModule, RouterLink, TranslocoModule, InputOtpModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    @if (!challenge()) {

      <!-- Title -->
      <div class="text-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800
                   dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-2">
          {{ 'auth.login.title' | transloco }}
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ 'auth.login.subtitle' | transloco }}</p>
      </div>

      <!-- Error alert -->
      @if (errorKey()) {
        <div class="mb-5 relative overflow-hidden rounded-2xl border px-5 py-4 shadow-sm backdrop-blur-sm
                    bg-gradient-to-r from-red-50/95 to-orange-50/80 dark:from-red-900/30 dark:to-red-900/20
                    text-red-800 dark:text-red-100 border-red-200/80 dark:border-red-800/50">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border
                        border-red-200/80 dark:border-red-800/50
                        bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/50 dark:to-red-900/30">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="flex-1 pt-1 font-semibold leading-relaxed text-sm">{{ errorKey()! | transloco }}</p>
          </div>
        </div>
      }

      <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">

        <!-- Username -->
        <div class="space-y-1.5">
          <label for="username" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            {{ 'auth.username' | transloco }}
          </label>
          <div class="relative group">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/0 to-purple-500/0
                        group-focus-within:from-sky-500/10 group-focus-within:to-purple-500/5 transition-all duration-300 pointer-events-none">
            </div>
            <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg class="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors duration-300"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <input
              id="username"
              type="text"
              formControlName="username"
              autocomplete="username"
              [dir]="settings.isRtl() ? 'rtl' : 'ltr'"
              class="relative w-full rounded-2xl border border-slate-200 dark:border-slate-700
                     bg-white/80 dark:bg-slate-800/80 ps-12 pe-4 py-3.5
                     text-sm sm:text-base text-slate-900 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent
                     transition-all duration-300 backdrop-blur-sm"
              [placeholder]="'auth.username' | transloco"
            />
          </div>
          @if (form.controls.username.touched && form.controls.username.invalid) {
            <p class="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"/>
              </svg>
              {{ 'validation.required' | transloco }}
            </p>
          }
        </div>

        <!-- Password -->
        <div class="space-y-1.5">
          <label for="password" class="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            {{ 'auth.password' | transloco }}
          </label>
          <div class="relative group">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/0 to-purple-500/0
                        group-focus-within:from-sky-500/10 group-focus-within:to-purple-500/5 transition-all duration-300 pointer-events-none">
            </div>
            <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <svg class="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors duration-300"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"/>
              </svg>
            </div>
            <input
              id="password"
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="password"
              autocomplete="current-password"
              [dir]="settings.isRtl() ? 'rtl' : 'ltr'"
              class="relative w-full rounded-2xl border border-slate-200 dark:border-slate-700
                     bg-white/80 dark:bg-slate-800/80 ps-12 pe-12 py-3.5
                     text-sm sm:text-base text-slate-900 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent
                     transition-all duration-300 backdrop-blur-sm"
              [placeholder]="'auth.password' | transloco"
            />
            <button
              type="button"
              (click)="showPassword.set(!showPassword())"
              class="absolute inset-y-0 end-0 flex items-center pe-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              @if (showPassword()) {
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              } @else {
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              }
            </button>
          </div>
          @if (form.controls.password.touched && form.controls.password.invalid) {
            <p class="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"/>
              </svg>
              {{ 'validation.required' | transloco }}
            </p>
          }
        </div>

        <!-- Forgot password -->
        <div class="flex justify-start">
          <a routerLink="/auth/forgot"
             class="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors">
            {{ 'auth.login.forgot' | transloco }}
          </a>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          [disabled]="form.invalid || busy()"
          class="relative mt-2 w-full overflow-hidden rounded-2xl
                 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900
                 hover:from-indigo-900 hover:via-slate-900 hover:to-indigo-900
                 px-5 py-3.5 text-sm sm:text-base font-semibold text-white
                 shadow-lg shadow-indigo-950/60
                 focus:outline-none focus:ring-2 focus:ring-indigo-700/50 focus:ring-offset-2
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/40 hover:-translate-y-0.5 group"
        >
          <!-- Shimmer on hover -->
          <div class="pointer-events-none absolute inset-0 z-0
                      bg-gradient-to-r from-white/0 via-white/15 to-white/0
                      translate-x-[-100%] group-hover:translate-x-[100%]
                      transition-transform duration-1000">
          </div>

          @if (busy()) {
            <div class="relative z-10 flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938L6 17.291z"/>
              </svg>
              <span>در حال پردازش...</span>
            </div>
          } @else {
            <div class="relative z-10 flex items-center justify-center gap-3">
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-4-4l4-4m0 0l-4-4m4 4H3"/>
              </svg>
              <span>{{ 'auth.login.submit' | transloco }}</span>
            </div>
          }
        </button>

      </form>

    } @else {

      <!-- 2FA step -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">تأیید هویت دومرحله‌ای</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ 'auth.2fa.sentTo' | transloco: { hint: challenge()!.hint } }}
        </p>
      </div>

      <div class="flex flex-col items-center gap-5">
        <p-inputotp [(ngModel)]="otp" [length]="6" [integerOnly]="true" dir="ltr" (keydown.enter)="verify()" />

        @if (errorKey()) {
          <div class="w-full rounded-2xl border px-4 py-3 text-sm
                      bg-red-50/95 dark:bg-red-900/30 text-red-700 dark:text-red-200
                      border-red-200/80 dark:border-red-800/50">
            {{ errorKey()! | transloco }}
          </div>
        }

        <button
          type="button"
          (click)="verify()"
          [disabled]="otp.length < 6 || busy()"
          class="w-full rounded-2xl bg-[#16193A] hover:bg-[#282C66] px-5 py-3.5
                 text-sm font-semibold text-white shadow-lg
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-300">
          @if (busy()) {
            <svg class="animate-spin h-5 w-5 mx-auto text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938L6 17.291z"/>
            </svg>
          } @else {
            {{ 'auth.2fa.verify' | transloco }}
          }
        </button>

        <button type="button" (click)="backToLogin()"
                class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          {{ 'auth.2fa.back' | transloco }}
        </button>
      </div>

    }
  `,
    })
], Login);
export { Login };
