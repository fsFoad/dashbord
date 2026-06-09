import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { BRANDING } from '../../../core/config/branding.config';

@Component({
  selector: 'app-footer',
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="flex flex-col items-center justify-between gap-1 border-t border-surface-200 px-4 py-3 text-xs text-muted-color dark:border-surface-800 sm:flex-row"
    >
      <span>© {{ year }} {{ branding.appName }}</span>
      <span>{{ 'common.builtWith' | transloco }}</span>
    </footer>
  `,
})
export class Footer {
  protected readonly branding = BRANDING;
  protected readonly year = new Date().getFullYear();
}
