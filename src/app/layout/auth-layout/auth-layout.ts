import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BRANDING } from '../../core/config/branding.config';

/** Centered single-card shell for login / register / forgot-password (Phase 3). */
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid min-h-dvh place-items-center bg-surface-50 p-4 dark:bg-surface-950">
      <div class="w-full max-w-md">
        <div class="mb-6 flex items-center justify-center gap-3">
          <span class="grid size-11 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-contrast">
            {{ branding.appShortName }}
          </span>
          <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            {{ branding.appName }}
          </span>
        </div>
        <div class="rounded-2xl border border-surface-200 bg-surface-0 p-6 shadow-sm dark:border-surface-800 dark:bg-surface-900 sm:p-8">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class AuthLayout {
  protected readonly branding = BRANDING;
}
