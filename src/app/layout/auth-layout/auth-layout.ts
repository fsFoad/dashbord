import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BRANDING } from '../../core/config/branding.config';

/** Centered single-card shell for login / register / forgot-password (Phase 3). */
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative grid min-h-dvh place-items-center overflow-hidden bg-surface-50 p-4 dark:bg-surface-950">
      <!-- animated aurora background -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span class="aurora-blob aurora-1"></span>
        <span class="aurora-blob aurora-2"></span>
        <span class="aurora-blob aurora-3"></span>
      </div>

      <div class="relative w-full max-w-md animate-fade-up">
        <div class="mb-6 flex items-center justify-center gap-3">
          <span class="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-lg font-bold text-primary-contrast shadow-lg shadow-primary/30">
            {{ branding.appShortName }}
          </span>
          <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            {{ branding.appName }}
          </span>
        </div>
        <div class="surface-card p-6 sm:p-8">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .aurora-blob {
        position: absolute;
        width: 32rem;
        height: 32rem;
        border-radius: 9999px;
        filter: blur(80px);
        opacity: 0.5;
        will-change: transform;
      }
      .aurora-1 {
        inset-block-start: -8rem;
        inset-inline-start: -6rem;
        background: var(--p-primary-500);
        animation: app-aurora 14s ease-in-out infinite;
      }
      .aurora-2 {
        inset-block-end: -10rem;
        inset-inline-end: -8rem;
        background: var(--p-primary-300);
        animation: app-aurora 18s ease-in-out infinite reverse;
      }
      .aurora-3 {
        inset-block-start: 30%;
        inset-inline-end: 20%;
        width: 22rem;
        height: 22rem;
        background: color-mix(in srgb, var(--p-primary-700) 70%, #06b6d4);
        animation: app-aurora 22s ease-in-out infinite;
      }
      :host-context(.app-dark) .aurora-blob {
        opacity: 0.35;
      }
    `,
  ],
})
export class AuthLayout {
  protected readonly branding = BRANDING;
}
