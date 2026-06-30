import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { MenuItemComponent } from './menu-item/menu-item';
import { BRANDING } from '../../../core/config/branding.config';
import { LayoutService } from '../../../core/services/layout.service';
import { MenuService } from '../../../core/services/menu.service';
import { WhatsNewService } from '../../../core/services/whats-new.service';
import { APP_RELEASE_DATE, APP_VERSION } from '../../../core/config/changelog.config';
import { LocalizedDatePipe } from '../../../shared/pipes/localized-date.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, TranslocoModule, Tooltip, MenuItemComponent, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly layout = inject(LayoutService);
  protected readonly menuService = inject(MenuService);
  protected readonly whatsNew = inject(WhatsNewService);

  protected readonly version = APP_VERSION;
  protected readonly releaseDate = APP_RELEASE_DATE;

  protected readonly branding = BRANDING;
  protected readonly slim = computed(() => this.layout.isSlim());
}
