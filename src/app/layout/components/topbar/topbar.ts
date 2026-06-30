import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { LayoutService } from '../../../core/services/layout.service';

/**
 * Topbar: just the sidebar toggle and the breadcrumb. All global actions
 * (search, language, theme, notifications, profile, season) now live at the
 * top of the sidebar — see `SidebarActions`.
 */
@Component({
  selector: 'app-topbar',
  imports: [TranslocoModule, Tooltip, Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.html',
})
export class Topbar {
  private readonly layout = inject(LayoutService);

  protected toggleSidebar(): void { this.layout.toggleSidebar(); }
}
