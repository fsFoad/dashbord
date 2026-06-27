import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { BRANDING } from '../../../core/config/branding.config';
import { APP_RELEASE_DATE, APP_VERSION } from '../../../core/config/changelog.config';
import { WhatsNewService } from '../../../core/services/whats-new.service';
import { WhatsNew } from '../../../shared/components/whats-new/whats-new';
import { LocalizedDatePipe } from '../../../shared/pipes/localized-date.pipe';

/**
 * Shared footer (dashboard + site layouts). Shows the app version with the
 * release date; clicking it opens the release notes. Also performs the
 * once-per-version "What's new" auto-check after the shell renders.
 */
@Component({
  selector: 'app-footer',
  imports: [TranslocoModule, Tooltip, WhatsNew, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
 <!--   <footer
      class="flex flex-col items-center justify-between gap-2 border-t border-surface-200 px-4 py-3 text-xs text-muted-color dark:border-surface-800 sm:flex-row"
    >
      <span>© {{ year }} {{ branding.appName }}</span>

      <button
        type="button"
        (click)="whatsNew.show()"
        [pTooltip]="'whatsnew.title' | transloco"
        tooltipPosition="top"
        class="flex items-center gap-1.5 rounded-full border border-surface-200 px-2.5 py-1 transition-colors hover:border-primary hover:text-primary dark:border-surface-700"
      >
        <i class="pi pi-tag text-[10px]"></i>
        <span dir="ltr" class="font-semibold">v{{ version }}</span>
        <span class="opacity-60">·</span>
        <span>{{ releaseDate | appDate }}</span>
      </button>
      <span>{{ 'common.builtWith' | transloco }}</span>
    </footer>-->

    <app-whats-new />
  `,
})
export class Footer {
  protected readonly whatsNew = inject(WhatsNewService);

  protected readonly branding = BRANDING;
  protected readonly year = new Date().getFullYear();
  protected readonly version = APP_VERSION;
  protected readonly releaseDate = APP_RELEASE_DATE;

  constructor() {
    // Defer slightly so it never races the first render / onboarding tour.
    setTimeout(() => this.whatsNew.autoCheck(), 800);
  }
}
