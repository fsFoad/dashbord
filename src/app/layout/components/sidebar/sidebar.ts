import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { MenuItemComponent } from './menu-item/menu-item';
import { MenuCustomizer } from './menu-customizer/menu-customizer';
import { BRANDING } from '../../../core/config/branding.config';
import { LayoutService } from '../../../core/services/layout.service';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, TranslocoModule, Tooltip, MenuItemComponent, MenuCustomizer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly layout = inject(LayoutService);
  protected readonly menuService = inject(MenuService);

  protected readonly branding = BRANDING;
  protected readonly slim = computed(() => this.layout.isSlim());
  protected readonly customizerOpen = signal(false);
}
