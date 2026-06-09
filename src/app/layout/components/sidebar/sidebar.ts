import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItemComponent } from './menu-item/menu-item';
import { APP_MENU } from '../../../core/config/menu.config';
import { BRANDING } from '../../../core/config/branding.config';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, TranslocoModule, MenuItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly layout = inject(LayoutService);

  protected readonly menu = APP_MENU;
  protected readonly branding = BRANDING;
  protected readonly slim = computed(() => this.layout.isSlim());
}
