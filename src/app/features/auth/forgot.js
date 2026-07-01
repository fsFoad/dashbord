import { __decorate } from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { AuthService } from '../../core/services/auth.service';
let Forgot = class Forgot {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    busy = signal(false);
    verified = signal(false);
    errorKey = signal(null);
    challenge = signal(null);
    otp = '';
    form = this.fb.nonNullable.group({
        // Iranian mobile: 09xxxxxxxxx (11 digits) or +989xxxxxxxxx (with +98 prefix).
        phone: ['', [Validators.required, Validators.pattern(/^(?:\+98|0)9\d{9}$/)]],
    });
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.busy.set(true);
        this.errorKey.set(null);
        this.auth.requestPasswordOtp(this.form.getRawValue().phone).subscribe({
            next: (res) => {
                this.busy.set(false);
                this.challenge.set({ challengeId: res.challengeId, hint: res.hint });
            },
            error: () => this.busy.set(false),
        });
    }
    verify() {
        const c = this.challenge();
        if (!c || this.otp.length < 6)
            return;
        this.busy.set(true);
        this.errorKey.set(null);
        this.auth.verifyPasswordOtp(c.challengeId, this.otp).subscribe({
            next: () => {
                this.busy.set(false);
                this.verified.set(true);
            },
            error: (err) => {
                this.busy.set(false);
                this.errorKey.set(err instanceof HttpErrorResponse && err.status === 422
                    ? 'auth.forgot.otpInvalid'
                    : 'errors.unknown');
            },
        });
    }
    backToPhone() {
        this.challenge.set(null);
        this.otp = '';
        this.errorKey.set(null);
    }
};
Forgot = __decorate([
    Component({
        selector: 'app-forgot',
        imports: [ReactiveFormsModule, FormsModule, RouterLink, TranslocoModule, ButtonModule, InputTextModule, InputOtpModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    @if (!challenge()) {

      <!-- Step 1: enter mobile number -->
      <h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
        {{ 'auth.forgot.title' | transloco }}
      </h1>
      <p class="mt-1 text-sm text-muted-color">{{ 'auth.forgot.phoneHint' | transloco }}</p>

      <form [formGroup]="form" (ngSubmit)="submit()" class="mt-5 flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="fphone" class="text-sm font-medium">{{ 'auth.forgot.phone' | transloco }}</label>
          <input pInputText id="fphone" type="tel" inputmode="tel" formControlName="phone"
                 autocomplete="tel" dir="ltr" maxlength="13" placeholder="09xxxxxxxxx" />
          @if (form.controls.phone.touched && form.controls.phone.invalid) {
            <small class="text-red-500">{{ 'validation.phone' | transloco }}</small>
          }
        </div>
        <p-button type="submit" styleClass="w-full" [label]="'auth.forgot.sendOtp' | transloco"
          [loading]="busy()" [disabled]="busy()" />
      </form>

    } @else if (!verified()) {

      <!-- Step 2: enter the OTP -->
      <h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
        {{ 'auth.forgot.otpTitle' | transloco }}
      </h1>
      <p class="mt-1 text-sm text-muted-color">
        {{ 'auth.forgot.otpHint' | transloco: { hint: challenge()!.hint } }}
      </p>

      <div class="mt-5 flex flex-col items-center gap-5">
        <p-inputotp [(ngModel)]="otp" [length]="6" [integerOnly]="true" dir="ltr" (keydown.enter)="verify()" />

        @if (errorKey()) {
          <div class="w-full rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700
                      dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {{ errorKey()! | transloco }}
          </div>
        }

        <p-button styleClass="w-full" [label]="'auth.forgot.verify' | transloco"
          [loading]="busy()" [disabled]="otp.length < 6 || busy()" (onClick)="verify()" />

        <button type="button" (click)="backToPhone()"
          class="text-sm text-muted-color hover:text-surface-900 dark:hover:text-surface-0 transition-colors">
          {{ 'auth.forgot.back' | transloco }}
        </button>
      </div>

    } @else {

      <!-- Step 3: success -->
      <div class="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
        <i class="pi pi-check-circle me-2"></i>{{ 'auth.forgot.success' | transloco }}
      </div>

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
], Forgot);
export { Forgot };
