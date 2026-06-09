import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BRANDING } from '../../core/config/branding.config';
import { SettingsStore } from '../../core/services/settings.store';
import { LanguageService } from '../../core/services/language.service';
import { Footer } from '../components/footer/footer';

/**
 * "Site" layout — a separate shell for public-facing pages:
 * horizontal top navigation + content + footer. No sidebar.
 */
@Component({
  selector: 'app-site-layout',
  imports: [RouterLink, RouterOutlet, TranslocoModule, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-dvh flex-col bg-surface-50 dark:bg-surface-950">
      <header
        class="sticky top-0 z-40 flex h-[var(--topbar-height)] items-center gap-4 border-b border-surface-200 bg-surface-0/80 px-4 backdrop-blur dark:border-surface-800 dark:bg-surface-900/80 sm:px-8"
      >
        <a routerLink="/site" class="flex items-center gap-3">
          <span class="grid size-9 place-items-center rounded-xl bg-primary font-bold text-primary-contrast">
            {{ branding.appShortName }}
          </span>
          <span class="text-lg font-semibold text-surface-900 dark:text-surface-0">
            {{ branding.appName }}
          </span>
        </a>

        <nav class="ms-auto hidden items-center gap-6 text-sm font-medium text-surface-600 dark:text-surface-300 sm:flex">
          <a routerLink="/site" class="hover:text-primary">{{ 'site.home' | transloco }}</a>
          <a routerLink="/dashboard" class="hover:text-primary">{{ 'site.dashboard' | transloco }}</a>
        </nav>

        <div class="ms-auto flex items-center gap-1 sm:ms-4">
          <button
            type="button"
            (click)="language.toggle()"
            class="h-10 min-w-10 rounded-lg px-2 text-sm font-semibold text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          >
            {{ settings.language() === 'fa' ? 'EN' : 'فا' }}
          </button>
          <button
            type="button"
            (click)="settings.toggleDarkMode()"
            class="grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            aria-label="Toggle dark mode"
          >
            <i class="pi" [class.pi-moon]="!settings.darkMode()" [class.pi-sun]="settings.darkMode()"></i>
          </button>
        </div>
      </header>

      <main class="mx-auto w-full max-w-[80rem] flex-1 p-4 sm:p-8">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
})
export class SiteLayout {
  protected readonly branding = BRANDING;
  protected readonly settings = inject(SettingsStore);
  protected readonly language = inject(LanguageService);
}
