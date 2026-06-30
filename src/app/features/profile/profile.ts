import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import {
  AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { MenuCustomizer } from '../../layout/components/sidebar/menu-customizer/menu-customizer';
import { AuthService } from '../../core/services/auth.service';
import { SessionStore } from '../../core/services/session.store';
import { SettingsStore } from '../../core/services/settings.store';
import { ToastService } from '../../core/services/toast.service';

function matchValidator(group: AbstractControl): ValidationErrors | null {
  const a = group.get('next')?.value;
  const b = group.get('confirm')?.value;
  return a && b && a !== b ? { mismatch: true } : null;
}

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, TranslocoModule, ButtonModule, InputTextModule, Password, TagModule, FormsModule, ToggleSwitch, MenuCustomizer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'profile.title' | transloco }}
    </h1>

    <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <!-- Account info -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 dark:border-surface-800 dark:bg-surface-900">
        <div class="flex items-center gap-4">
          <span class="grid size-16 place-items-center rounded-2xl bg-primary text-2xl font-bold text-primary-contrast">
            {{ initials() }}
          </span>
          <div class="min-w-0">
            <div class="truncate-1 text-lg font-semibold">{{ user()?.name }}</div>
            <div class="truncate-1 text-sm text-muted-color" dir="ltr">{{ user()?.email }}</div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              @for (r of user()?.roles; track r) {
                <p-tag [value]="('role.' + r) | transloco" [severity]="r === 'admin' ? 'danger' : 'secondary'" />
              }
            </div>
          </div>
        </div>

        <form [formGroup]="nameForm" (ngSubmit)="saveName()" class="mt-6 flex flex-col gap-3">
          <label for="pname" class="text-sm font-medium">{{ 'profile.name' | transloco }}</label>
          <input pInputText id="pname" formControlName="name" />
          @if (nameForm.controls.name.touched && nameForm.controls.name.invalid) {
            <small class="text-red-500">{{ 'validation.required' | transloco }}</small>
          }
          <div>
            <p-button type="submit" [label]="'profile.save' | transloco" icon="pi pi-check"
              size="small" [loading]="savingName()" />
          </div>
        </form>
      </div>

      <!-- Change password -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 dark:border-surface-800 dark:bg-surface-900">
        <h2 class="font-semibold">{{ 'profile.password.title' | transloco }}</h2>

        <form [formGroup]="passForm" (ngSubmit)="changePassword()" class="mt-4 flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="cur" class="text-sm font-medium">{{ 'profile.password.current' | transloco }}</label>
            <p-password inputId="cur" formControlName="current" [feedback]="false" [toggleMask]="true"
              styleClass="w-full" inputStyleClass="w-full" autocomplete="current-password" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="nxt" class="text-sm font-medium">{{ 'profile.password.new' | transloco }}</label>
            <p-password inputId="nxt" formControlName="next" [toggleMask]="true"
              styleClass="w-full" inputStyleClass="w-full" autocomplete="new-password" />
            @if (passForm.controls.next.touched && passForm.controls.next.invalid) {
              <small class="text-red-500">{{ 'validation.min' | transloco: { n: 6 } }}</small>
            }
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="cnf" class="text-sm font-medium">{{ 'profile.password.confirm' | transloco }}</label>
            <p-password inputId="cnf" formControlName="confirm" [feedback]="false" [toggleMask]="true"
              styleClass="w-full" inputStyleClass="w-full" autocomplete="new-password" />
            @if (passForm.touched && passForm.hasError('mismatch')) {
              <small class="text-red-500">{{ 'auth.passwordMismatch' | transloco }}</small>
            }
          </div>

          @if (passErrorKey()) {
            <div class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
              {{ passErrorKey()! | transloco }}
            </div>
          }

          <div>
            <p-button type="submit" [label]="'profile.password.change' | transloco" icon="pi pi-lock"
              size="small" severity="secondary" [loading]="savingPass()" />
          </div>
        </form>
      </div>

      <!-- Two-factor authentication -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 dark:border-surface-800 dark:bg-surface-900">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-semibold">{{ 'profile.2fa.title' | transloco }}</h2>
            <p class="mt-1 text-sm text-muted-color">{{ 'profile.2fa.desc' | transloco }}</p>
          </div>
          <p-toggleswitch [ngModel]="twoFactor()" (ngModelChange)="toggleTwoFactor($event)" [disabled]="savingTwoFactor()" />
        </div>
        <div class="mt-3 flex items-center gap-2 text-sm" [class.text-green-600]="twoFactor()" [class.text-muted-color]="!twoFactor()">
          <i [class]="twoFactor() ? 'pi pi-shield' : 'pi pi-lock-open'"></i>
          {{ (twoFactor() ? 'profile.2fa.on' : 'profile.2fa.off') | transloco }}
        </div>
      </div>

      <!-- Sidebar menu behaviour -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 dark:border-surface-800 dark:bg-surface-900">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-semibold">{{ 'profile.menu.title' | transloco }}</h2>
            <p class="mt-1 text-sm text-muted-color">{{ 'profile.menu.desc' | transloco }}</p>
          </div>
          <p-toggleswitch [ngModel]="menuCollapsible()" (ngModelChange)="settings.setMenuCollapsible($event)" />
        </div>
        <div class="mt-3 flex items-center gap-2 text-sm text-muted-color">
          <i [class]="menuCollapsible() ? 'pi pi-chevron-down' : 'pi pi-bars'"></i>
          {{ (menuCollapsible() ? 'profile.menu.collapsible' : 'profile.menu.flat') | transloco }}
        </div>
      </div>

      <!-- Menu customization (pin / hide items) -->
      <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 dark:border-surface-800 dark:bg-surface-900">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-semibold">{{ 'menu.customize.title' | transloco }}</h2>
            <p class="mt-1 text-sm text-muted-color">{{ 'menu.customize.hint' | transloco }}</p>
          </div>
        </div>
        <div class="mt-4">
          <p-button [label]="'menu.customize' | transloco" icon="pi pi-sliders-v"
            size="small" severity="secondary" (onClick)="customizerOpen.set(true)" />
        </div>
      </div>
    </div>

    <app-menu-customizer [(visible)]="customizerOpen" />
  `,
})
export class Profile {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly session = inject(SessionStore);
  protected readonly settings = inject(SettingsStore);
  protected readonly menuCollapsible = this.settings.menuCollapsible;

  protected readonly twoFactor = signal(false);
  protected readonly savingTwoFactor = signal(false);
  protected readonly customizerOpen = signal(false);

  constructor() {
    this.auth.getTwoFactor().subscribe({ next: (r) => this.twoFactor.set(r.enabled) });
  }

  protected readonly user = this.session.user;
  protected readonly savingName = signal(false);
  protected readonly savingPass = signal(false);
  protected readonly passErrorKey = signal<string | null>(null);

  protected readonly initials = computed(() => {
    const name = this.user()?.name ?? '';
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p.charAt(0))
      .join('');
  });

  protected readonly nameForm = this.fb.nonNullable.group({
    name: [this.user()?.name ?? '', Validators.required],
  });

  protected readonly passForm = this.fb.nonNullable.group(
    {
      current: ['', Validators.required],
      next: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
    },
    { validators: matchValidator },
  );

  protected saveName(): void {
    if (this.nameForm.invalid) {
      this.nameForm.markAllAsTouched();
      return;
    }
    this.savingName.set(true);
    this.auth.updateMe(this.nameForm.getRawValue().name).subscribe({
      next: () => {
        this.savingName.set(false);
        this.toast.success('profile.saved');
      },
      error: () => this.savingName.set(false),
    });
  }

  protected toggleTwoFactor(enabled: boolean): void {
    this.savingTwoFactor.set(true);
    this.auth.setTwoFactor(enabled).subscribe({
      next: (res) => {
        this.twoFactor.set(res.enabled);
        this.savingTwoFactor.set(false);
        this.toast.success(res.enabled ? 'profile.2fa.enabled' : 'profile.2fa.disabled');
      },
      error: () => this.savingTwoFactor.set(false),
    });
  }

  protected changePassword(): void {
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched();
      return;
    }
    this.savingPass.set(true);
    this.passErrorKey.set(null);
    const { current, next } = this.passForm.getRawValue();
    this.auth.changePassword(current, next).subscribe({
      next: () => {
        this.savingPass.set(false);
        this.passForm.reset();
        this.toast.success('profile.password.changed');
      },
      error: (err: unknown) => {
        this.savingPass.set(false);
        this.passErrorKey.set(
          err instanceof HttpErrorResponse && err.status === 400
            ? 'profile.password.wrongCurrent'
            : 'errors.unknown',
        );
      },
    });
  }
}
